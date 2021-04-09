import axios from 'axios'


export default()=>{
    return axios.create({
        baseURL: `http://localhost:8081/`
        // si c'est en http on obtiens :  net::ERR_SSL_PROTOCOL_ERROR 
        
    })
}

