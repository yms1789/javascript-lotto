const Buy = require("./Buy");
class App {
  play() {
    const buy = new Buy();
    buy.input();
  }
}

const app = new App();
app.play();

module.exports = App;
