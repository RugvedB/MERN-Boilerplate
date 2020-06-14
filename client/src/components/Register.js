import React, { useState } from "react";
import { Form,Button } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SendRequest } from "../helper/HandleRequest";

function Register() {

  const [Loading, setLoading] = useState(false)
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e) => {
      e.preventDefault()

      setLoading(true)

      const route = "http://localhost:8000/api/users/saveUser"
      const data = { mail ,password }
      const respData = await SendRequest(route,data)
      
      if(respData.success){
        toast.success("Verification Mail has been sent successful")
        toast.info("Please check your mail for verification")
      }
      else{
        toast.error("Mail operation unsuccessful.")
      }
      setLoading(false)
  }

  return (
    <div style={{ height: "100vh" }}>
      <ToastContainer />
      <div className="h-100 d-flex mt-4 align-items-center flex-column">
        
        <div style={{ minWidth:"40%" }} className="text-left">
            <Form>
                <h1 className="text-center">Register</h1>
                <hr></hr>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(e) => setMail(e.target.value)} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        Verification code will be sent to this mail.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember Me" />
                </Form.Group>
                <Button disabled={Loading} onClick={(e) => handleRegister(e)} block variant="primary" type="submit">
                    Submit
                </Button>
                <Form.Group>
                    <Form.Text className="mt-1">
                        <a href="/login">Already have an account?</a>
                    </Form.Text>
                </Form.Group>
            </Form>
        </div>


      </div>
    </div>
  );
}

export default Register;
