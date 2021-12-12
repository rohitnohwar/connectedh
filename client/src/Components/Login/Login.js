import React, {useEffect, useState} from "react"
import {Link, useNavigate,Navigate} from "react-router-dom"
import axios from "axios"
import "./Login.css"

function Login(){
    const navigate=useNavigate();
    const [message, setMessage]=useState("")

    const[input, setInput]=useState({
        username:"",
        password:""
    })

    async function handleChange(event){
        const{name, value}=event.target;
        setInput(prevValue=>{
            return{
                ...prevValue,
                [name]:value
            }
        })
    }

    async function handleClick(event){ 
        event.preventDefault();
        const user={
            username:input.username,
            password:input.password
        };

        await axios.post("/login", user).then(
            (response)=>{
                if(response.data.auth===true){
                    localStorage.setItem('profile', JSON.stringify(response.data.foundUser))
                    navigate("/main")
                }
                else{
                    setMessage(response.data.message)
                }
            }
        )
    }

    return(
        <div>
            <form action="/login" class="register-form" method="POST">
                <div>YOU CAN'T LOGIN IF YOU ARE NOT A REGISTERED USER</div>
                <div><input type="email" placeholder="email address (username)" name="username" class="reg-input" onChange={handleChange} value={input.username} required></input></div>
                <div><input type="password" placeholder="password" name="password" class="reg-input" onChange={handleChange} value={input.password} required></input></div>
                <div><button type="submit" class="reg-button" onClick={handleClick}>LOGIN</button></div>
                <div className="message">{message}</div>
            </form> 
        </div>
    );
}

export default Login;