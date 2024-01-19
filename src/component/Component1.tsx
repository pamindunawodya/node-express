 import UserContext from "../context/UserContext.tx";
import Component2 from "./Component2";
 import {useState} from "react";

function Component1():JSX.Element{
    const[user,setUser]=useState("IJSE");
    return (
        <UserContext.Provide value={user}>
            Component1
            <Component2 user={user}/>
        </UserContext.Provide>
    )

}

export default Component1;