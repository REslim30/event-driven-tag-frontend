import * as io from "socket.io-client"

const socket = io("http://192.168.1.28:3000");

socket.on("connect", (value: any) => {
    console.log(value);
});

socket.on("broadcast", (value: number) => {
    console.log(value);
    alert(value);
});
