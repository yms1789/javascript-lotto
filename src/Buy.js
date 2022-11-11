const { Console, Random } = require("@woowacourse/mission-utils");
const Lotto = require("./Lotto");
const { BUY_MESSAGE, LOTTO_PRICE, RESULT_MESSAGE } = require("./constants");

class Buy {
  constructor() {
    this.lottoNumer = [];
    this.winngingNumber;
    this.winningCount = Array(5).fill(0);
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

    for (let index = 0; index < buyLottoCount; index++) {
      let lottoNums = Random.pickUniqueNumbersInRange(1, 45, 6).sort();
      this.lottoNumer.push(lottoNums);
      this.printLottoDetails(lottoNums);
    }
  }

  printResult(rank, winningCount) {
    return this.print(`${RESULT_MESSAGE[rank]} - ${winningCount}개`);
  }

  rankCount(lottoNumber, winningNumbers, bonus) {
    let sameCount = 0;
    let bonusCount = 0;
    console.log(lottoNumber, winningNumbers, bonus);
    lottoNumber.forEach((number) =>
      winningNumbers.indexOf(number) > -1 ? (sameCount += 1) : (sameCount += 0)
    );
    if (lottoNumber.includes(bonus)) bonusCount += 1;
    return [sameCount, bonusCount];
  }
  rankCheck(bonus) {
    let rank = 0;
    for (let index = 0; index < this.lottoNumer.length; index++) {
      const [sameCount, bonusCount] = this.rankCount(
        this.lottoNumer[index],
        this.winngingNumber,
        bonus
      );
      switch (true) {
        case sameCount === 6:
          rank = 1;
          break;
        case sameCount === 5 && bonusCount === 1:
          rank = 2;
          break;
        case sameCount === 5:
          rank = 3;
          break;
        case sameCount === 4:
          rank = 4;
          break;
        case sameCount === 3:
          rank = 5;
          break;
        default:
          break;
      }
      this.winningCount[rank - 1] += 1;
    }
    return this.lottoResult();
  }
  lottoResult() {
    this.print("\n당첨 통계\n---");
    for (let index = 0; index < 5; index++) {
      this.printResult(index + 1, this.winningCount[index]);
    }
  }

  inputBonusNum() {
    Console.readLine("\n보너스 번호를 입력해 주세요.\n", (bonus) => {
      this.rankCheck(bonus);
    });
  }

  inputWinning() {
    Console.readLine("\n당첨 번호를 입력해 주세요.\n", (winning) => {
      const lotto = new Lotto(winning.split(",").map(Number));
      this.winngingNumber = winning.split(",").map(Number);
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
