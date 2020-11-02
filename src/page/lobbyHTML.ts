
// unfortunately having a separate HTML page
// requires asynchronous loading during runtime
// (synchronous requests are possible but deprecated)
// which sometime causes undefined behaviour
// and the cordova file api seems a bit finicky
// thus the html for different pages is defined here
let lobbyPage: string = `
  <h1>Lobby</h1>
  <ul id="lobby-list">
    <li>Loading Lobby</li>
  </ul>
  <button id="start-button">Start Game</button>
`;
export default lobbyPage;
