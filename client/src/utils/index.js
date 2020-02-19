import axios from "axios";

export default {
    // Get all analysis from MongoDB
    getAllData: function(){
        return axios.get('/getAllData')
    },
    
    // Get latest analysis from MongoDB
    getData: function(data){
        var path = "/getData/"+data.firstName+"/"+data.lastName+"/"+data.email
        return axios.get(path)
    },

    //Send data to Server
    sendData: function(data){
        return axios.post('/sendData', data)

    },

    //Get scenario from Server
    getScenario: function(data){
        return axios.post('/getScenario', data)
    },

    //Send data to Server
    sendCont: function(data){
        return axios.post('/sendCont', data)
    },

    //Get Giphy
    getGiphy: function(){
        return axios.get('/getGiphy')
    },

    //Send Notificacion
    sendNot: function(){
        return axios.post("/twilio")
    }
}
