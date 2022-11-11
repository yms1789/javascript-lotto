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

  printLottoDetails(lottoNums) {
    return this.print(`[${lottoNums}]`);
  }

  lottoPublish(money) {
    const buyLottoCount = Math.floor(money / LOTTO_PRICE);

    for (let i = 0; i < buyLottoCount; i++) {
      let lottoNums = Random.pickUniqueNumbersInRange(1, 45, 6).sort();
      this.printLottoDetails(lottoNums);
    }
  }
  inputWinning() {
    Console.readLine("\n당첨 번호를 입력해 주세요.\n", (winning) => {
      const winningNumbers = winning.split(",").map(Number);
      const lotto = new Lotto(winningNumbers);
    });
  }
  start() {
    Console.readLine("로또 구입 금액을 입력하세요.\n", (money) => {
      this.printLottoCount(money);
      this.lottoPublish(money);
      this.inputWinning();
    });
  }
}

module.exports = Buy;
