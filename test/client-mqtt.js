const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://localhost:8086");
client.on("connect", () => {
        client.subscribe("LED_GET");
});

client.on("message", (topic, message) => {
    if(topic === "LED_GET") {
        client.publish("LED_SEND", process.argv[2]);
    }
})