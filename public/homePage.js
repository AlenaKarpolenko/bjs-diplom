'use strict';
const logout = new LogoutButton();
logout.action = function () {
    ApiConnector.logout(function (response) {
        if (response.success) {
            location.reload();
        }
    });
}

ApiConnector.current(function (response) {
    if (response.success) {
        ProfileWidget.showProfile(response.success);
    }
});

const rates = new RatesBoard();
const exchangeRate =()=> {
    ApiConnector.getStocks( (response)=> {
        if (response.success) {
            rates.clearTable();
            rates.fillTable(response.data);
        }
    });
}

 exchangeRate();
    setInterval(exchangeRate, 60000);


const money = new MoneyManager();
money.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success, `Баланс пополнен`);
        } else {
            money.setMessage(response.success,response.error);
        }
    });
}

money.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success,`Конвертировано успешно`);
        } else {
            money.setMessage(response.success,response.error);
        }
    });
}

money.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, (response) => {
        console.log(response);
        if (response.success) {
            ProfileWidget.showProfile(response.success);
            money.setMessage(response.success,`Перевод успешно произведен`);
        } else {
            money.setMessage(response.success,response.error);
        }
    });
}

const favorite = new FavoritesWidget();
ApiConnector.getFavorites(function (response) {
    if (response.success) {
        console.log(response);
        favorite.clearTable();
        favorite.fillTable(response.success);
        money.updateUsersList(response.success);
    }
});

favorite.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favorite.clearTable();
            favorite.fillTable(response.data);
            money.updateUsersList(response.data);
            favorite.setMessage( tresponse.success,`Добавлено`);
        } else {
            favorite.setMessage(response.success,response.error);
        }
    });
}

favorite.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favorite.clearTable();
            favorite.fillTable(response.data);
            money.updateUsersList(response.data);
            favorite.setMessage( true,`Удалено`);
        } else {
            favorite.setMessage(response.success,response.error);
        }
    });
}