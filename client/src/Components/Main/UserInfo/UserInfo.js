import React, {useEffect, useState} from "react"
import "./UserInfo.css"

function UserInfo(props){

    return(
        <div class="user-info-box">
        {props.userInfo && Object.keys(props.userInfo).map((key, index) => (
            key!=="_id" &&
                <li key={index} >
                    <span className="user-info-label">{key} : </span> <span className="input-label">{props.userInfo[key]} </span> 
                </li>
            
        ))}
        </div> 
    );
}

export default UserInfo;