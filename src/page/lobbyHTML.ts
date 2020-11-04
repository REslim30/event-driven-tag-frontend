
// unfortunately having a separate HTML page
// requires asynchronous loading during runtime
// (synchronous requests are possible but deprecated)
// which sometime causes undefined behaviour
// and the cordova file api seems a bit finicky
// thus the html for different pages is defined here
let lobbyPage: string = `
  <div class="flex-container">

    <h1 class="title is-1">Lobby</h1>

    <table class="table is-fullwidth is-striped is-bordered">
      <thead>
        <tr>
          <th>
            Members
          </th>
        </tr>
      </thead>

      <tbody id = "lobby-list">
      </tbody>
    </table>
    <button id="start-button" class="button is-primary">Start Game</button>

  </div>
`;
export default lobbyPage;
