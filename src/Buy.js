const { Console, Random } = require("@woowacourse/mission-utils");
const Lotto = require("./Lotto");
const { BUY_MESSAGE, LOTTO_PRICE } = require("./constants");

class Buy {
  print(message) {
    return Console.print(message);
  }

  printLottoCount(money) {
    return this.print(
      `\n${Math.floor(money / LOTTO_PRICE)} ${BUY_MESSAGE.BUY}`
    );
  }

  printLottoDetails(buyLottoCount, lottoNums) {
    return this.print(`[${lottoNums}]`);
  }
  
  lottoPublish(money) {
    const buyLottoCount = Math.floor(money / LOTTO_PRICE);

    for (let i = 0; i < buyLottoCount; i++) {
      let lottoNums = Random.pickUniqueNumbersInRange(1, 45, 6);
      this.printLottoDetails(buyLottoCount, lottoNums);
    }
  }
  
  input() {
    Console.readLine("로또 구입 금액을 입력하세요.\n", (money) => {
      this.printLottoCount(money);
      this.lottoPublish(money);
      this.inputWinning();
    });
  }
}

module.exports = Buy;
