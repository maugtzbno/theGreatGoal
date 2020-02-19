const path = require("path");
const router = require("express").Router();
const axios = require("axios");
const db = require("../models");
require("dotenv").config()
const accountSid = process.env.TWILIO_accountSid;
const authToken = process.env.TWILIO_authToken;
const client = require('twilio')(accountSid, authToken);

function ahorro(ingresoMensualBruto, tasaRetencion, gastoMensual, edadActual, edadRetiro, tasaReal, saldoAhorro){
    meses = (edadRetiro - edadActual)*12 +1
    saldoFinal = 0;
    saldoFinalArr = [];
    for (var i=0; i<meses; i++){
        if (i==0) {
            saldoFinal += saldoAhorro
            saldoFinalArr.push(saldoFinal)
        }
        else {
            saldoFinal += ingresoMensualBruto * (1 - tasaRetencion) - gastoMensual
            saldoFinal = saldoFinal * (1 + tasaReal/12)
            saldoFinalArr.push(saldoFinal)
        }
    }
    return [ saldoFinal, saldoFinalArr ]        
}

function gasto(gastoMensual, edadRetiro, edadEsperanza, tasaReal, saldoInicial){
    meses = (edadEsperanza - edadRetiro)*12 +1
    saldoFinal = 0;
    saldoFinalArr = [];
    for (var i=0; i<meses; i++){
        if (i==0) {
            saldoFinal += saldoInicial
            saldoFinalArr.push(saldoFinal)
        }
        else {
            saldoFinal = saldoFinal * (1 + tasaReal/12)
            saldoFinal = saldoFinal - gastoMensual
            saldoFinalArr.push(saldoFinal)
        }
    }
    return [ saldoFinal, saldoFinalArr ] 
}

function calcSaldoInicial(gastoMensual, edadRetiro, edadEsperanza, tasaReal){
    saldoFinal = -1000;
    saldoInicialTest = 0
    i=0;
    while (saldoFinal < 0){
        saldoFinal = gasto(gastoMensual, edadRetiro, edadEsperanza, tasaReal, saldoInicialTest+i*10000)[0]
        i +=1
    }
    return saldoInicialTest+i*10000
}

function calcAhorroInicial(objetivoAhorro, tasaRetencion, gastoMensual, edadActual, edadRetiro, tasaReal, saldoAhorro){
    saldoFinal = -1000;
    ingresoMensualBruto = gastoMensual;
    i=0;
    while(saldoFinal<objetivoAhorro){
        saldoFinal = ahorro(ingresoMensualBruto+i*100, tasaRetencion, gastoMensual, edadActual, edadRetiro, tasaReal, saldoAhorro)[0]
        i+=1
    }
    return ((ingresoMensualBruto+i*100)*(1-tasaRetencion)-gastoMensual)
}

function retiro(data){

    nombre = data.firstName;
    apellidoPat = data.lastName;
    correo = data.email;

    edadActual =data.age*1;
    edadRetiro = data.retire*1;
    tiempoAnosAhorro = edadRetiro - edadActual;
    tiempoMesesAhorro = tiempoAnosAhorro * 12;
    edadEsperanza = data.expected*1;
    tiempoAnosRetiro = edadEsperanza - edadRetiro;
    tiempoMesesRetiro = tiempoAnosRetiro * 12;

    ingresoMensualBruto = data.income*1;
    tasaRetencion = data.tax/100;    
    ingresoMensualNeto = ingresoMensualBruto * (1 - tasaRetencion);
    gastoMensual = data.expense*1;
    ahorroMensualActual = ingresoMensualNeto - gastoMensual;
    
    saldoActual = data.savings*1;

    tasaRealAhorro = data.rateSavings;
    pronosticoAhorro = ahorro(ingresoMensualBruto, tasaRetencion, gastoMensual, edadActual, edadRetiro, tasaRealAhorro, saldoActual)[0];
    escenarioAhorro = ahorro(ingresoMensualBruto, tasaRetencion, gastoMensual, edadActual, edadRetiro, tasaRealAhorro, saldoActual)[1];
    tasaRealRetiro = data.rateRetire; 
    pronosticoHerencia = gasto(gastoMensual, edadRetiro, edadEsperanza, tasaRealRetiro, pronosticoAhorro)[0]
    escenarioHerencia = gasto(gastoMensual, edadRetiro, edadEsperanza, tasaRealRetiro, pronosticoAhorro)[1]

    objetivoHerencia = 0;
    objetivoAhorro = calcSaldoInicial(gastoMensual, edadRetiro, edadEsperanza, tasaRealRetiro)
    objetivoAhorroMensual = calcAhorroInicial(objetivoAhorro, tasaRetencion, gastoMensual, edadActual, edadRetiro, tasaRealAhorro, saldoActual)
    objetivoGastoMensual = ingresoMensualNeto - objetivoAhorroMensual

    const insData = [
        {
          nombre: nombre,
          apellidoPat: apellidoPat,
          correo: correo,

          edadActual: edadActual,
          edadRetiro: edadRetiro,
          tiempoAnosAhorro: tiempoAnosAhorro,
          tiempoMesesAhorro: tiempoMesesAhorro,
          edadEsperanza: edadEsperanza,
          tiempoAnosRetiro: tiempoAnosRetiro,
          tiempoMesesRetiro: tiempoMesesRetiro,

          ingresoMensualBruto: ingresoMensualBruto,
          tasaRetencion: tasaRetencion,
          ingresoMensualNeto: ingresoMensualNeto,
          gastoMensual: gastoMensual,
          ahorroMensualActual: ahorroMensualActual,
          
          saldoActual: saldoActual,
          
          tasaRealAhorro: tasaRealAhorro,
          pronosticoAhorro: pronosticoAhorro,
          tasaRealRetiro: tasaRealRetiro,
          pronosticoHerencia: pronosticoHerencia,

          objetivoHerencia: objetivoHerencia,
          objetivoAhorro: objetivoAhorro,
          objetivoAhorroMensual: objetivoAhorroMensual,
          objetivoGastoMensual: objetivoGastoMensual,

          escenarioAhorro: escenarioAhorro,
          escenarioHerencia: escenarioHerencia
      }
    ]

    return insData
}

//get all data to create graphs
router.use("/getAllData",function(req,res){
    db.BaseRet
        .find({})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
})

//retrieve calculated data of user
router.use("/getData/:firstName/:lastName/:email", function (req, res){
    db.BaseRet
        .find({"nombre":req.params.firstName, "apellidoPat":req.params.lastName, "correo":req.params.email})
        .then(dbModel =>{
            res.json(dbModel)
        })
        .catch(err =>{
            res.status(422).json(err)
        });
})

//send data to database
router.post("/sendData", function(req, res){
    dataFin = retiro(req.body)
    db.BaseRet.collection
        .insertMany(dataFin)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err));

})

router.post("/getScenario", function (req, res){

    ingresoMensualBruto = req.body.income*1;
    tasaRetencion = req.body.tax/100;
    gastoMensual = req.body.expense*1;
    edadActual =req.body.age*1;
    edadRetiro = req.body.retire*1;
    edadEsperanza = req.body.expected*1;
    saldoActual = req.body.savings*1;
    tasaRealAhorro = req.body.rateSavings;
    tasaRealRetiro = req.body.rateRetire; 

    ahorroFin = ahorro(ingresoMensualBruto, tasaRetencion, gastoMensual, edadActual, edadRetiro, tasaRealAhorro, saldoActual)[0];
    ahorroScen = ahorro(ingresoMensualBruto, tasaRetencion, gastoMensual, edadActual, edadRetiro, tasaRealAhorro, saldoActual)[1];

    gastoFin = gasto(gastoMensual, edadRetiro, edadEsperanza, tasaRealRetiro, ahorroFin)[0]
    gastoScen = gasto(gastoMensual, edadRetiro, edadEsperanza, tasaRealRetiro, ahorroFin)[1]

    data = {ahorroScen, gastoScen}

    res.json(data)
})

//send data to database
router.post("/sendCont", function(req, res){
    dataCon = [{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }]
    db.BaseCont.collection
        .insertMany(dataCon)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err));
})

//get giphy for animation
router.use("/getGiphy", function (req,res){
    axios.get("https://api.giphy.com/v1/gifs/search?q=thinking&api_key=" + process.env.giphyKey + "&limit=10")
        .then((response) => {
            res.json(response.data);
        })
        .catch((err) => {
            res.send(err);
        })
})

//send menssages 
router.post("/twilio", function (req, res) {
    phoneto = process.env.MYPHONE;
    msgbnv = "Registro de contacto";
    client.messages
        .create({
            body: msgbnv,
            from: '+18153907997',
            to: phoneto
        })
        .then(message => {
            res.json({ status: "success" })
        }
        ).catch(
            err => {
                res.json({ status: "error", msg: err })
            }
        );
})

// If no API routes are hit, send the React app
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;