const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const walletDb={
    20001:{
        id:20001,
        amount: 1000,
        currency: "SGD"
    },
    20002:{
        id:20002,
        amount: 500,
        currency: "SGD"
    }
};

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query{
    wallet(walletId:Int): Wallet
  }
  
 type Wallet{
    id: Int
    amount: Int
    currency: String
    }
`);

// The root provides a resolver function for each API endpoint
const root = {
    wallet: (req) => {
        console.log(walletDb[`${req.walletId}`]);
        return walletDb[`${req.walletId}`];
    },
};

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

const PORT = 4006;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
