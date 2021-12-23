let formReg = document.forms.regform;
let nameReg;
let emailReg;
let ageReg;
let passwordReg;
let formSignin = document.forms.signinform;
let emailSignin;
let passworSignin;

// for api
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// форма получение данных

if(formReg !== undefined) {
    document.forms.regform.onsubmit = function() {
        nameReg = this.namereg.value;
        emailReg = this.emailreg.value;
        ageReg = this.agereg.value;
        passwordReg = this.passwordreg.value;

        let raw = JSON.stringify({
            "name": nameReg,
            "email": emailReg,
            "password": passwordReg,
            "age": ageReg
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api-nodejs-todolist.herokuapp.com/user/register", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        return false;
    };
}

// логинизация

if(formSignin !== undefined) {

    document.forms.signinform.onsubmit = function() {
        
        emailSignin = this.emailsignin.value;
        passworSignin = this.passwordsignin.value;

        let raw = JSON.stringify({
        "email": emailSignin,
        "password": passworSignin
        });

        let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://api-nodejs-todolist.herokuapp.com/user/login", requestOptions)
        .then(response => response.text())
        .then(result => document.location.href = 'to-do-list.html')
        .catch(error => console.log('error', error));

        return false;
    }
}
