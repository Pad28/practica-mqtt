import mosca from "mosca";
import { Server } from "socket.io";
import { Events } from "../server";

export class MqttController {
    constructor (
        private readonly broker: mosca.Server,
        private readonly socketServer: Server,
    ) {}

    public async listen() {
        this.broker.on("ready", () => {
            console.log(`Broker MQTT en puerto ${this.broker.opts.port}`);
            // this.broker.on("clientConnected", (client: mosca.Client) => console.log(client.id));

            this.broker.on("published", (packet, client) => {
                if(packet.topic === Events.LED_SEND) {
                    const payload = packet.payload.toString();                  
                    this.socketServer.emit(Events.LED_SEND, (payload === "1"));
                }
            });

        });
    }
}