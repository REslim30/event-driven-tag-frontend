// Script that handles all connection to server
import { fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";
import io from "socket.io-client";
import { ClientFSM } from "./ClientFSM";

window.onload = function () {
  let socket: SocketIOClient.Socket;
  // Initialize ClientFSM
  let clientFSM: ClientFSM = new ClientFSM();

  // Get stream of events from user trying to connect from connectHTML page  
  // Attach relevant info to the stream object
  let connectionQueryStream = fromEvent(<HTMLElement>document.getElementById("app"), "touchend").pipe(
    // Filter only events that come from connection-button
    filter((event: TouchEvent) => {
      return (event.target as HTMLElement).id === "connection-button";
    }),
    // Attach name input and url input
    map((event: TouchEvent) => { 
      return {
        name: (document.getElementById("name-input") as HTMLInputElement)?.value,
        url: (document.getElementById("url-input") as HTMLInputElement)?.value,
        event: event
      }
    })
  );

  // Checks if connectionQuery is valid. connectionQuery is valid iff:
  // name is non-empty
  // url is non-empty
  function isValidQuery(connectionQuery: {name: string, url: string, event: TouchEvent}): boolean {
      return connectionQuery["name"] !== "" && /(http|ws|https):\/\/([a-z\d\.]*):(\d+)/.test(connectionQuery.url);
  }

  // Log Error to invalid connection queries
  connectionQueryStream.pipe(
    // Filter only non-empty names and non-empty urls
    filter((connectionQuery: {name: string; url: string; event: TouchEvent}) => {
      return !isValidQuery(connectionQuery);
    })
  ).subscribe(() => {
    alert("Please enter a valid url (e.g. <protocol>://<ip or domain>:<port>) and name. Note: sockets.io only supports http and ws protocols.");
  });
  

  // Attempt connection if valid query
  connectionQueryStream.pipe(
    filter((connectionQuery: {name: string; url: string; event: TouchEvent}) => {
      return isValidQuery(connectionQuery);
    })
  ).subscribe((connectionQuery) => {
    // Close previous socket if any
    socket?.close();

    alert("Attempting connection to " + connectionQuery.url + " with username " + connectionQuery.name);
    socket = io(connectionQuery.url, {
      reconnection: false,
      query: {
        name: connectionQuery.name
      }
    });

    socket.on("connection", () => {
      console.log("connection occured");
      clientFSM.serverConnect();
    });
  });
};
