import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';

export const Cart = () => {
  let data = useCart() ?? []; // Use an empty array as a default value if useCart() is false
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        console.error("User email is missing.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });

      if (response.status === 200) {
        dispatch({ type: "DROP" });
      } else {
        console.error("Failed to fetch:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amountss</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={food._id}>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}
export default Cart;