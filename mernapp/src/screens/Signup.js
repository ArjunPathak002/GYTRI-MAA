import { useState } from 'react';
import { Link } from 'react-router-dom';


export const Signup = () => {
   const [credentials, setcredentials] = useState({name:"",email:"",password:"",geolocation:""})
   const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/createuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password,location:credentials.geolocation}) // Send the form data in the request body
    });
    const json = await response.json()
    console.log(json);
    if(!json.success){
      alert ("Enter Valid Credentials")
    }
}
const onChange =(event)=>{
  setcredentials({...credentials,[event.target.name]:event.target.value})
}
    return (
    <>
    <div className="container">
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="Name" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" aria-describedby="emailHelp"name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control"name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
    <input type="text" className="form-control"name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputAddress"/>
  </div>
  <button type="submit" className="m-3 btn btn-primary">Submit</button>
  <Link className='m-3 btn btn-danger' to="/login" >Already a user</Link>
</form>
</div>
    </>
  )
}