// HigherOrderComponent
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SendRequest } from '../helper/HandleRequest';

const AuthHeader = {//IMP
    headers:{
      'authorization':'Bearer '+localStorage.getItem('token'),
    }
}

export default function(Component ,auth){
    //auth = true means ...this Component can be accessed only by autorized user
    //auth = false means ...this Component can be accessed by anyone

    function Auth() {
        const [Loading, setLoading] = useState(auth)

        useEffect(() => {
            if(auth){
                const route = "http://localhost:8000/api/users/securedRoute"
    
                SendRequest(route,{},AuthHeader).then(respData => {
                    const { success , returnedValue : { user } } = respData
                    if(success){
                        // This user object has _id , mail , isVerified
                        // console.log(JSON.stringify(user))
                        setLoading(false)
                    }
                    else{
                        toast.error('Need to Login First')   
                        toast.info('Redirecting to Login Page')
                        setTimeout(() => {
                            window.location.href = "http://localhost:3000/login"
                        },3000)
                    }
                })
            }
           
        }, [])

        return (
            <>
                <ToastContainer />
                {Loading && <h1>Loading...</h1>}
                {!Loading && <Component /> }
            </>
        )
    }
    
    return Auth
    
}