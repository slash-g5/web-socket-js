const http = require("http");
const WebSocketServer = require("websocket").server;

console.log("started")
const httpServer = http.createServer((_req, _res)=>{
        console.log("received a request")
    });

let connection = null

const websocket = new WebSocketServer({
        "httpServer": httpServer
    });

websocket.on("request", request => {
        connection = request.accept(null);
        connection.on("open", () => console.log("Opened!"))
        connection.on("close", () => console.log("Closed !"))
        connection.on("message", message => {
            console.log(`Received message ${message.utf8Data}`)
        })
        sendevery5seconds();
    });

httpServer.listen(8080);

const sendevery5seconds = () => {
    connection.send(`message ${Math.random()}`)
    setTimeout(sendevery5seconds, 5000)
}