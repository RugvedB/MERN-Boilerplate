import Axios from 'axios'

//const SERVER_BASE_URL="http://localhost:5000"
// console.log(JSON.stringify(route))
// console.log(JSON.stringify(data))
// console.log(JSON.stringify(headers))

export const SendRequest = async (route,data = {},headers = {}) => {    
    
  try{
    const result = await Axios.post(route,data,headers)
    // console.log('result :'+ JSON.stringify(result))
    return result.data
  }
  catch(err){
    return {
        success:false,
        err
    }
  }

};
