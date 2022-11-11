const { Console, Random } = require("@woowacourse/mission-utils");
const Lotto = require("./Lotto");
const { BUY_MESSAGE } = require("./constants");

const messages = {};
class Buy {
  print(message) {
    return Console.print(message);
  }
  printLottoCount(money) {
    return this.print(`${Math.floor(money / 1000)} ${BUY_MESSAGE.BUY}`);
  }
  input() {
    Console.readLine("로또 구입 금액을 입력하세요.\n", (money) => {
      this.printLottoCount(money);
    });
  }
}

module.exports = Buy;
