let formReg = document.forms.regform;
let nameReg;
let emailReg;
let ageReg;
let passwordReg;
let formSignin = document.forms.signinform;
let emailSignin;
let passworSignin;
let user;
let myStorage = window.localStorage; 

// for api
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// регистрация

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
        .then(result => localStorage.setItem('userToken', JSON.parse(result).token))
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
        .then(result => {
            localStorage.setItem('userToken', JSON.parse(result).token),
            document.location.href = 'to-do-list.html'
        })
        .catch(error => console.log('error', error));

        return false;
    }
}

// получить профиль залогин пользов
// myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWM0M2MyOWUwMTZiMTAwMTc5YjIwYWEiLCJpYXQiOjE2NDAyNTA0MDl9.DduJjLP8yKdqxaOVNB3PanQ4S1mtHesCyoLdnUveX_s");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// fetch("https://api-nodejs-todolist.herokuapp.com/user/me", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

// // log out

// let clickLogOut = document.querySelector('.js-log-out');

// clickLogOut.addEventListener('click', logOut);

// function logOut() {
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWM0NGM2MWUwMTZiMTAwMTc5YjIwZDQiLCJpYXQiOjE2NDAyNTQ1NjF9.18dYSF7wzmHNfY0tnyuVj2o917PfpgBzmjWSIcQTPf0");

//     var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     redirect: 'follow'
//     };

//     fetch("https://api-nodejs-todolist.herokuapp.com/user/logout", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));
// }

// creat task new

