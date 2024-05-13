import { Server } from "./presentation/server";


(async() => {
    const server = new Server({
        portMqtt: 8086,
        portServer: 8085,
    });

    server.start();
})();