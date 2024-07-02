import { Server } from "socket.io";
import mqtt from 'mqtt';
import { Events } from "../server";

export class SocketController {
    constructor(
        private readonly socketServer: Server,
        private readonly mqttUrl: string,
    ) {}

    public async listen() {
        this.socketServer.on("connection", (socket) => {
            console.log("Socket client:", socket.id);

            socket.on(Events.LED_SET, async(payload) => {
                const pub = mqtt.connect(this.mqttUrl);
                await pub.publishAsync(Events.LED_SET, payload);
                await pub.endAsync();
            });

            socket.on(Events.LED_GET, async(payload = "get")=> {
                const pub = mqtt.connect(this.mqttUrl);
                await pub.publishAsync(Events.LED_GET, payload);
                await pub.endAsync();
            })

        });
    }
}