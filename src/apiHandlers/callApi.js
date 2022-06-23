import { apiSecret, apiUrl, token } from '../constants/defaultValues';

var axios = require('axios');
// api call data required method,data,url as its parameter
export const callApi= async (apiCallData)=>{
    var data={...apiCallData?.data,"api_key":`${apiSecret}`}

    let config={
        method: apiCallData.method,
        url: `${apiUrl}${apiCallData.url}`,
        // url: `https://backend.dev.bemc.teceads.co.in/api/v1/ramalingampark/event/getEvent`,
        headers: {
          'Authorization': `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*"
        },
        data : data
    }
    let response= await axios(config)
    return (response)
}

    



