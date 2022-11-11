const { Console, Random } = require("@woowacourse/mission-utils");
const Lotto = require("./Lotto");
const { BUY_MESSAGE, LOTTO_PRICE } = require("./constants");

const messages = {};

class Buy {
  print(message) {
    return Console.print(message);
  }
  printLottoCount(money) {
    return this.print(`${Math.floor(money / LOTTO_PRICE)} ${BUY_MESSAGE.BUY}`);
  }
  lottoPublish(money) {
    const buyLottoCount = Math.floor(money / LOTTO_PRICE);
    for (let i = 0; i < buyLottoCount; i++){
      printLottoDetails();
    }
  }
  input() {
    Console.readLine("로또 구입 금액을 입력하세요.\n", (money) => {
      this.printLottoCount(money);
    });
  }
}

module.exports = Buy;
