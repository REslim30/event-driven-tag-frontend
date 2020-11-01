
// unfortunately having a separate HTML page
// requires asynchronous loading during runtime
// (synchronous requests are possible but deprecated)
// which sometime causes undefined behaviour
// and the cordova file api seems a bit finicky
// thus the html for different pages is defined here
let connectPage: string = `
  <h1>Tag</h1>
  <h3>Your Name:</h3>
  <input type="text" id="name-input">
  <h3>Connect To Server:</h3>
  <input type="text" id="url-input" placeholder="e.g. localhost:3000">
  <br>
  <button id="submit-button">Connect</button>
`;
export default connectPage;
