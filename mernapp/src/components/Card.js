
import { useRef, useState, useEffect } from 'react';
import {useDispatchCart, useCart} from './ContextReducer'
export const Card = (props) => {
let dispatch =useDispatchCart();
let data =useCart()
const priceRef =useRef()
let options = props.options;
let priceOptions = Object.keys(options)

const [qty, setQty] = useState(1)
// Set to the first available size option
const [size, setSize] = useState(priceOptions[0] || ""); 
 
const handleAddToCard = async () => {
  let food = data.find((item) => item.id === props.foodItem._id);

  if (food) {
    if (food.size === size) {
      await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
      return;
    } else if (food.size !== size) {
      await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
      return;
    }
    return;
  }

  await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
};

// Ensure a default value (0 in this case) if options[size] is undefined
let finalPrice = qty * parseInt(options[size] || 0); 
useEffect(()=>{
  setSize(priceRef.current.value)
}, [])
  return (
    <div>
      <div>
        <div className="card my-3" style={{ width: "18rem", maxHeight: "360" }}>
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"200px", objectFit:"fill"}} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.Name}</h5>
            
            <div className="container w-100"></div>
            <select className="m-2 h-100 bg-success" onChange={(e)=> setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
              {priceOptions.map((data)=>{
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
            <div className="d-inline h-100 fs-5">Total Price: {finalPrice}/-</div>
            <hr>
            </hr>
            <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCard}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};
