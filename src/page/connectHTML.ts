
// unfortunately having a separate HTML page
// requires asynchronous loading during runtime
// (synchronous requests are possible but deprecated)
// which sometime causes undefined behaviour
// and the cordova file api seems a bit finicky
// thus the html for different pages is defined here
let connectPage: string = `
  <div class="flex-container">
    <h1 class="title is-1">Tag</h1>

    <div class="field">
      <label class="label">Username</label>
      <div class="control has-icons-left has-icons-right">
        <input id="name-input" class="input" type="text" placeholder="Username">
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Connect To Server</label>
      <div class="control has-icons-left has-icons-right">
        <input id="url-input" class="input" type="text" placeholder="e.g. http://10.0.2.2:3000">
        <span class="icon is-small is-left">
          <i class="fas fa-server"></i>
        </span>
      </div>
    </div>

    <br>
    <button id="connection-button" class="button is-primary">Connect</button>
  </div>
`;
export default connectPage;
