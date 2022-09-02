const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");

const app = express();
const customerDB={
    10001:{
        id:10001,
        name: "user1",
        walletId: 20001
    },
    10002:{
        id:10002,
        name: "user2",
        walletId: 20002
    }
}
const service2Url="http://localhost:4001/wallet";
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/customer/:customerId', async (req, res) => {
    console.log(`get customer details ${req.params.customerId}`)
    const customer=customerDB[`${req.params.customerId}`];
    request.get(`${service2Url}/${customer.walletId}`, (error, response, body) => {
        if (error){
            console.log(`wallet api call failed : ${error}`);
            res.json({errorCode:500,message:"something went wrong"});
        }else {
            console.log(`wallet api call success : ${body}`);
            const json = JSON.parse(body);
            delete customer.walletId;
            customer.wallet=json;
            res.json(customer);
        }
    });
});
