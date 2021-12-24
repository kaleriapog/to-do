let formReg = document.forms.regform;
let myStorage = window.localStorage; 
let clickLogOut = document.querySelector('.js-log-out');
let formSignin = document.forms.signinform;
let nameReg;
let emailReg;
let ageReg;
let passwordReg;
let emailSignin;
let passworSignin;
let user;

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

// log out
let tokenLogUser = localStorage.getItem('userToken');
// console.log(tokenLogUser)

if (clickLogOut !== null) {

    clickLogOut.addEventListener('click', logOut)

    function logOut() {
        myHeaders.append("Authorization", `Bearer ${tokenLogUser}`)
        // console.log(`Bearer ${tokenLogUser}`);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://api-nodejs-todolist.herokuapp.com/user/logout", requestOptions)
        .then(response => response.text())
        .then(result => {
            localStorage.removeItem('userToken'),
            document.location.href = 'index.html'
        })
        .catch(error => console.log('error', error));
    }
}