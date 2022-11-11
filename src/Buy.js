const { Console, Random } = require("@woowacourse/mission-utils");
const Lotto = require("./Lotto");
const { BUY_MESSAGE, LOTTO_PRICE, RESULT_MESSAGE } = require("./constants");

class Buy {
  constructor() {
    this.lottoNumer = {};
    this.winngingNumber;
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

  rankCount(lottoNumber, winningNumbers, bonus) {
    const lottoNums = Object.keys(lottoNumber);
    let sameCount = 0;
    let bonusCount = 0;
    for (let index = 0; i < lottoNums.length; index++) {
      lottoNums[index].forEach((lottoNumber) =>
        winningNumbers.indexOf(lottoNumber)
          ? (sameCount += 1)
          : (sameCount += 0)
      );
      if (lottoNumber.includes(bonus)) bonusCount += 1;
    }
    return [sameCount, bonusCount];
  }
  rankCheck() {
    const [sameCount, bonusCount] = this.rankCount(
      this.lottoNumer,
      this.winngingNumber,
      bonus
    );
  }
  lottoResult() {
    this.print("\n당첨 통계\n---\n");
    for (let index = 6; i >= 2; index--) {
      this.printResult(index, winningCount);
    }
  }

  inputBonusNum() {
    Console.readLine("\n보너스 번호를 입력해 주세요.\n", (bonus) => {
      this.rankCheck(bonus);
      this.lottoResult();
    });
  }

  inputWinning() {
    Console.readLine("\n당첨 번호를 입력해 주세요.\n", (winning) => {
      this.winngingNumber = winning.split(",").map(Number);
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
