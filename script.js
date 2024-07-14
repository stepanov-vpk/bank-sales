"use sctrict";

class Bank {
  constructor() {
    this.info = {
      currencies: [],
      history: [],
    };
  }

  pushHistory(type, lastBalance, res, currency) {
    const date = new Date();

    let dateNow =
      date.getDate() +
      "." +
      date.getMonth() +
      "." +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();

    this.info.history.push(
      `Операция за ${dateNow}. Было ${lastBalance} ${currency}, стало ${res} ${currency}. Тип транзакции: ${type}`
    );
  }

  createCheck(currency) {
    currency = currency.toUpperCase();

    if (currency == "RUB" || currency == "USD") {
      this.info.currencies.push(`${currency}`);
      this.info[`${currency}`] = 0;

      this.pushHistory("Создание счёта", 0, 0, `${currency}`);

      console.log(`Счёт ${currency} успешно создан`);
    } else {
      console.error(`Выбранная валюта (${currency}) не поддерживается`);
    }
  }

  getChecks() {
    console.log(
      `У вас имеются следующие валютные счета: ${this.info.currencies}`
    );
  }

  addMoney(currency, amount) {
    currency = currency.toUpperCase();

    if (currency in this.info == true) {
      if (amount > 0) {
        this.pushHistory(
          `Пополнение счёта ${currency} на ${amount} ${currency}`,
          `${this.info[`${currency}`]}`,
          `${(this.info[`${currency}`] += amount)}`,
          `${currency}`
        );
      } else {
        console.error("Сумма пополнения не может быть отрицательной");
      }
    } else {
      console.error("Выбранный счёт не существует");
    }
  }

  pay(currency, amount) {
    if (currency in this.info == true) {
      if (this.info[`${currency}`] >= amount) {
        this.pushHistory(
          `Списание со счёта ${currency} на сумму ${amount} ${currency}`,
          `${this.info[`${currency}`]}`,
          `${(this.info[`${currency}`] -= amount)}`,
          `${currency}`
        );
      } else {
        console.error(`Недостаточно средств на счету ${currency}`);
      }
    } else {
      console.error("Выбранный счёт не существует");
    }
  }

  getHistory() {
    console.log("Вывод истории транзакций:");

    for (let i = 0; i < this.info.history.length; i++) {
      console.log(this.info.history[i]);
    }
  }
}

const bank = new Bank();

bank.createCheck("RUB");
bank.getChecks();
bank.addMoney("RUB", 100);
bank.pay("RUB", 10);
bank.getHistory();
