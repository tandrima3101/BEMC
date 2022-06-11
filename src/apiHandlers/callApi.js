import { apiSecret, apiUrl, token } from '../constants/defaultValues';

var axios = require('axios');
// api call data required method,data,url as its parameter
export const callApi= async (apiCallData)=>{

    var data={...apiCallData.data,"api_key":`${apiSecret}`}

    let config={
        method: `${apiCallData.method}`,
        url: `${apiUrl}${apiCallData.url}`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data : data
    }

    let response= await axios(config)
    console.log(response)
    return (response)
}

    



