const io =  require("socket.io-client");

if(!process.argv[2]) throw new Error(`Evento faltante`);

const socket = io("http://localhost:8085");
socket.emit(process.argv[2]);
if(process.argv[2] === "LED_SET") {
    setTimeout(() => process.exit(1), 100);
}

socket.on("LED_SEND", (data) => {
    console.log(data);
    process.exit(1);
})

