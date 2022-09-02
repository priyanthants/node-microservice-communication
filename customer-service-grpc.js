const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const express = require("express");
const bodyParser = require("body-parser");

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

const PROTO_PATH = "./wallet.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});
const WalletService = grpc.loadPackageDefinition(packageDefinition).WalletService;
const client = new WalletService(
    "localhost:4003",
    grpc.credentials.createInsecure()
);


app.get('/customer/:customerId', async (req, res) => {
    console.log(`get customer details ${req.params.customerId}`)
    const customer=customerDB[`${req.params.customerId}`];
    client.get({id:customer.walletId}, (err, data) => {
        if (!err) {
            console.log(`wallet api call success : ${data}`);
            delete customer.walletId;
            customer.wallet=data;
            res.json(customer);
        }
    });
});

const PORT = 4002;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
