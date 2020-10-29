import * as io from "socket.io-client"

var socket = io("3000");

socket.on("connect", (value: any) => {
    console.log(value);
});

socket.on("broadcast", (value: number) => {
    console.log(value);
});

