import React, { useContext } from "react";
import { GlobalContext } from "../HOC/Global";
import { Jumbotron } from "react-bootstrap";

function SecuredPage() {
  const { userState } = useContext(GlobalContext);

  return (
    <div>
      If you have reached here then you are authenticated :){" "}

      { userState.user &&  
        <Jumbotron>
            <h1>Profile</h1>
            <small className="text-muted">(Data from store)</small>
            <p>UserId   : {userState.user._id}</p>    
            <p>UserMail : {userState.user.mail}</p>    

        </Jumbotron>
      }
      
      
    </div>
  );
}

export default SecuredPage;
