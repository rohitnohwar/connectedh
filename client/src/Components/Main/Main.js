import axios from "axios";
import React, {useEffect, useState} from "react"
import {Link, useNavigate,Navigate} from "react-router-dom"
import UserInfo from "./UserInfo/UserInfo";
import SelectionTable from "./SelectionTable/SelectionTable";
import "./Main.css"

function Main(){
    const [auth, setAuth] = useState(localStorage.getItem('profile'))
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('profile')))
    const [products, setProducts] = useState([])
    const [selectedProducts, setSelectedProducts] = useState(localStorage.getItem('selectedProducts')?JSON.parse(localStorage.getItem('selectedProducts')):{})

    async function getProducts(){
        await axios.get("/getproducts").then((response)=>{
            setProducts(response.data.foundProducts)
        })
    }

    useEffect(()=>{
        getProducts()
    },[])

    async function logout(event){
        event.preventDefault()
        localStorage.removeItem("profile")
        setAuth()
    }

    if(auth){
        return(
            <div>
                <UserInfo userInfo={userInfo} />

                <div className="logout-button-div"><button className="logout-button" onClick={logout}>Logout</button></div>
                <hr className="line"></hr>

                <SelectionTable products={products} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts}/>
                <hr className="line"></hr>

                <div className="selected-products-section">
                    <div className="your-products">Products selected by you:-</div>

                    {Object.keys(selectedProducts).map((item, index)=>{
                        return (
                            <div>{index+1}. {item}. Quantity:- {selectedProducts[item]}</div>);
                    })}
                </div>
            </div>
    );
    }
    else {
        return <Navigate to="/" />
    }
}

export default Main;