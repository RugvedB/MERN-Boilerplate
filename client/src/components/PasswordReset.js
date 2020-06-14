import React, { useState } from "react";
import { Form,Button } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SendRequest } from "../helper/HandleRequest";

function PasswordReset() {

    const [Loading, setLoading] = useState(false)
    const [sentMail, setSentMail] = useState(false)
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    

    const sendUserResetCodeMail = async () => {
        toast.info(`Sending Mail to ${mail}`)

        setLoading(true)

        const route = "http://localhost:8000/api/users/forgetPassword"
        const data = { mail }
        const respData = await SendRequest(route,data)
        
        if(respData.success){
            setSentMail(true)
            toast.success(respData.message)
        }
        else{
            setSentMail(false)
            toast.error("Reset Request Failed.")
        }
        setLoading(false)
    }
    
    const verifyResetCodeAndUpdatePassword = async () => {
        toast.info(`Verifying Code ${code}`)
        //mail,password,code
        setLoading(true)

        const route = "http://localhost:8000/api/users/passwordReset"
        const data = { mail ,password ,resetCode : code }
        const respData = await SendRequest(route,data)
        
        if(respData.success){
            setSentMail(false)
            toast.success("Password Reset Successful")

            //Now redirect him to home page
        }
        else{
            setSentMail(false)
            toast.error("Reset Request Failed.")
        }
        setLoading(false)
    }

    const handleClick = (e) => {
        e.preventDefault()
        if(!sentMail){
            //As code was already sent....now this is the reset code entered by user and is asking to verify
            sendUserResetCodeMail()
        }
        else{
            //if mail is now sent then this click is request to send resetCode via mail
            verifyResetCodeAndUpdatePassword()
        }
    }

  return (
      <div className="h-100 d-flex mt-4 align-items-center flex-column">
        <ToastContainer />

        <div style={{ minWidth:"40%" }} className="text-left">
            <Form>
                <h1 className="text-center">Password Reset</h1>
                <hr></hr>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(e) => setMail(e.target.value)} type="email" placeholder="Enter Registered Mail" />
                    
                </Form.Group>

                
                { sentMail &&    
                    <React.Fragment>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Code</Form.Label>
                            <Form.Control onChange={(e) => setCode(e.target.value)} type="text" placeholder="Code" />
                        </Form.Group>
                    </React.Fragment>
                    
                }

                <Button disabled={Loading} block onClick={(e) => handleClick(e)} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>


      </div>
  );
}

export default PasswordReset;
