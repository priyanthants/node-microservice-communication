const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");


const PROTO_PATH = "./wallet.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});
const walletProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();
const mockDb={
    20001:{
        id:20001,
        amount: 1000,
        currency: "SGD"
    },
    20002:{
        id:20001,
        amount: 500,
        currency: "SGD"
    }
};


server.addService(walletProto.WalletService.service, {
    get: (call, callback) => {
        console.log(`get wallet details : ${call.request.id}`)
        let wallet = mockDb[`${call.request.id}`];

        if (wallet) {
            callback(null, wallet);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    },
});

server.bind("127.0.0.1:4003", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:4003");
server.start();
