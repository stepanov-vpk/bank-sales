"use strict"

class Bank {
    constructor() {

        this.info = {
            currencies: [],
            history: [],
        }

        this.createCheck = function (currency) {
            currency = currency.toUpperCase();

            switch (currency) {
                case "RUB":
                case "USD":
                    this.info[`${currency}`] = 0;
                    this.info.currencies.push(`${currency}`);
                    this.info.history.push(`Операция за ${new Date()}. Тип транзакции: Создание счёта (${currency})`);

                    console.log(`Создан счёт (${currency})`);

                    break;
                default:
                    console.log("Выбранная валюта не поддерживается");

                    break;
            }
        }

        this.getChecks = () => console.log(`У вас есть следующие валютные счета: ${this.info.currencies}`);

        this.addMoney = function (currency, amount) {
            currency = currency.toUpperCase();

            if (currency in this.info == true) {
                this.info.history.push(`Операция за ${new Date()}. Было: ${this.info[`${currency}`]}, стало: ${this.info[`${currency}`] += amount}. Тип транзакции: пополнение счёта (${currency}) на ${amount}`);

                console.log(`Счёт ${currency} пополнен на ${amount}`);
            } else {
                console.log("Такого счёта нет");
            }
        }

        this.pay = function (amount, currency) {
            currency = currency.toUpperCase();

            if (currency in this.info == true) {
                if (this.info[`${currency}`] >= amount) {
                    this.info.history.push(`Операция за ${new Date()}. Было: ${this.info[`${currency}`]}, стало: ${this.info[`${currency}`] -= amount}. Тип транзакции: списание со счёта (${currency}) на сумму ${amount}`);

                    console.log(`Списание со счёта ${currency} на сумму ${amount}`);
                } else {
                    console.log(`Недостаточно средств на счету ${currency}`);
                }
            } else {
                console.log("Такого счёта нет");
            }
        }

        this.getHistory = () => {
            console.log("Вывод истории транзакций:");

            for (let i = 0; i < this.info.history.length; i++) {
                console.log(this.info.history[i]);
            }
        }
    }
}

const bank = new Bank();

// Работа с RUB счётом
bank.createCheck("RUB");
bank.getChecks();
bank.addMoney("RUB", 1000);
bank.pay(100, "RUB");
bank.getHistory();

// Работа с USD счётом
bank.createCheck("USD");
bank.getChecks();
bank.addMoney("USD", 500);
bank.pay(50, "USD");
bank.getHistory();

// Работа с иным валютным счётом
bank.createCheck("CHF");