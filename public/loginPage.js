'use strict';
const logIn = new UserForm();
logIn.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            logIn.setLoginErrorMessage(response.error);
        }
    });
}

logIn.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        if (response.success) {
            location.reload();
        } else {
            logIn.setLoginErrorMessage(response.error);
        }
    });
}