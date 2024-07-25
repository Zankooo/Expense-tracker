import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from '../../config/axios'
import {login} from '../../services/auth.services'

import { toastError, toastSuccess } from '../../utility/toast';


function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email : "",
    password : ""
  }) 

  useEffect(() => {
    console.log(formData)
  }
  , [formData])

  function handleChange (event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name] : event.target.value // burek
    }));
    
  };

  // funkcija ki poslje na server (backend)
  async function handleSubmit(event){
    // nocemo da se refresha stran ko submitamo
    event.preventDefault();
    // namesto try se izvede catch, in to je problem
    // in pol crasha backend in pol sesporoci da post 
    // ne dela
    try {
      const response = await login(formData);
      console.log("Uspešno!", response)
      navigate("/");
      //kle pa success
      //response.message to damo notr
      // zgleda samo 11 znakcov gre v eno linijo, potem skoci v drugo
      //torej eno besedo v prvih enajst in drugo v drugih enajst
      // zgleda obcasno pa samo 9
      toastSuccess("Login done, Welcome!");

    } catch (error) {
      console.log("Login ne dela ker: " , error)
      // error.response.data.message tole je bolj prav da se da notri
      toastError("Try again");
      //kle je toast error
    }

  }

  return (
    <>
    
    <div id='forma'> 

      <h1 id='burek'>Login</h1>

      <form onSubmit={handleSubmit}>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input name='email' id='email' type='text' onChange={handleChange} ></input>
        </div>

        <div className='form-group'>
          <label htmlFor='pwd'>Password</label>
          <input type='password' id='pwd' name='password' onChange={handleChange}></input>
        </div>

        <button>LOGIN NOW</button>

      </form>
      <br></br>
      <br></br>
      <div style={{fontSize: "13px"}}>
        Need an account? <Link to={'/register'}>SIGN UP</Link>
      </div>
      

      
    </div>
    
    </>
  )
}

export default Login