/* import * as io from "socket.io-client" */

/* var socket = io("http://localhost:3000"); */

/* socket.on("connect", (value: any) => { */
/*     console.log(value); */
/* }); */

/* socket.on("broadcast", (value: number) => { */
/*     console.log(value); */
/* }); */

/* console.log("hello-world"); */
/* alert("hello"); */

import * as Rx from "rxjs";

Rx.interval(1000)
    .subscribe((value: number) => {
        alert(value);
    });
