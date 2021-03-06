import * as dotenv from "dotenv";
dotenv.config();
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import * as cors from 'cors';
import * as mongoose from "mongoose";
import * as socket from 'socket.io'

const PORT = 3005;

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public mongoUrl: String = "mongodb://localhost:27017/chat_app";

    constructor() { 
        this.initializeMiddlewares();
        this.mongoSetup();
        this.routePrv.routes('/api', this.app);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors({ credentials: true, origin: true }))
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});
    }

}

var server = new App().app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})

// Socket setup
let io = socket(server)
var users = []
io.on('connection',(socket)=>{

    console.log('new connection made.', socket.id);
    socket.on("user_connected", (username)=>{
        users[username] = socket.id

        io.emit("user_connected", username)
    })

    socket.on("send_message", (data)=>{
        var socketId = users[data.receiver]
        io.to(socketId).emit("new_message", data)
    })
});