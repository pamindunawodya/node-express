
import UserContext from "../context/UserContext.tx";
import {useContext} from "react";

function component3():JSX.Element{

   const  user=useContext(UserContext);

   return (
       <div>
           Component 3:{user}
       </div>
   )
}