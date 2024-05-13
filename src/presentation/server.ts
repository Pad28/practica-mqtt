import { createServer, Server as HttpServer } from "http";
import express, { Application } from "express";
import { Server as SocketIoServer } from "socket.io";
import mosca from "mosca";

import { MqttController } from "./mqtt/controller";
import { SocketController } from "./socket/controller";

export enum Events {
    LED_GET = "LED_GET",
    LED_SEND = "LED_SEND", 
    LED_SET = "LED_SET",
}

interface ServerOptions {
    portMqtt: number;
    portServer: number;
}

export class Server {
    private readonly app: Application;
    private readonly server: HttpServer;
    private readonly socketServer: SocketIoServer;
    private readonly broker: mosca.Server;

    constructor(
        private readonly options: ServerOptions,
    ) {
        this.app = express();
        this.server = createServer(this.app);
        this.socketServer = new SocketIoServer(this.server);
        this.broker = new mosca.Server({ port: options.portMqtt });
    }

    public async start() {
        this.server.listen(this.options.portServer, () => {
            console.log(`Servidor esuchando en puerto ${this.options.portServer}`)
        });

        new SocketController(this.socketServer, `mqtt://localhost:${this.options.portMqtt}`).listen();
        new MqttController(this.broker, this.socketServer).listen();
    }


}