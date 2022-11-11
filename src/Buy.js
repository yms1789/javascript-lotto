const { Console, Random } = require("@woowacourse/mission-utils");
const Lotto = require("./Lotto");
const { BUY_MESSAGE, LOTTO_PRICE, RESULT_MESSAGE } = require("./constants");

class Buy {
  constructor() {
    this.lottoNumer = {};
  }
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
      this.lottoNumer[lottoNums] = 0;
      this.printLottoDetails(lottoNums);
    }
  }

  printResult(rank, winningCount) {
    return this.print(`${RESULT_MESSAGE[rank]} - ${winningCount}개`);
  }

  lottoResult() {
    this.print("\n당첨 통계\n---\n");
    for (let index = 6; i >= 2; index--) {
      this.printResult(index, winningCount);
    }
  }

  inputBonusNum() {
    Console.readLine("\n보너스 번호를 입력해 주세요.\n", (bonus) => {
      this.lottoResult();
    });
  }

  inputWinning() {
    Console.readLine("\n당첨 번호를 입력해 주세요.\n", (winning) => {
      const winningNumbers = winning.split(",").map(Number);
      const lotto = new Lotto(winningNumbers);
      this.inputBonusNum();
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
