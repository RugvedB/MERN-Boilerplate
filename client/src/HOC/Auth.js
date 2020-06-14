// HigherOrderComponent
import React, { useState, useEffect, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SendRequest } from '../helper/HandleRequest';
import { GlobalContext } from './Global';
import { saveUser } from '../store/actions/user';

const AuthHeader = {//IMP
    headers:{
      'authorization':'Bearer '+localStorage.getItem('token'),
    }
}

export default function(Component ,auth){
    //auth = true means ...this Component can be accessed only by autorized user
    //auth = false means ...this Component can be accessed by anyone
    

    function Auth() {
        const { userDispatch } = useContext(GlobalContext)
        const [Loading, setLoading] = useState(auth)

        useEffect(() => {
            if(auth){
                const route = "http://localhost:8000/api/users/securedRoute"
    
                SendRequest(route,{},AuthHeader).then(respData => {
                    const { success } = respData
                    if(success){
                        // This user object has _id , mail , isVerified
                        const { returnedValue : { user } } = respData
                        setLoading(false)
                        userDispatch(saveUser(user)) //Save user in the store
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
           
        }, [userDispatch])

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