const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mockDb={
    20001:{
        id:20001,
        amount: 1000,
        currency: "SGD"
    },
    20001:{
        id:20001,
        amount: 500,
        currency: "SGD"
    }
};
const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.get('/wallet/:walletId', (req, res) => {
    console.log(`get wallet details : ${req.params.walletId}`)
    res.json(mockDb[`${req.params.walletId}`]);
});

