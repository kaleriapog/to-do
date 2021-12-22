let formReg = document.forms.regform;
let nameReg = '';
let emailReg = '';
let ageReg = '';
let passwordReg = '';

// for api
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   "name": a,
//   "email": b,
//   "password": "testtesttest2",
//   "age": 152
// });

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("https://api-nodejs-todolist.herokuapp.com/user/register", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

  
// форма получение данных

if(formReg !== null) {
    document.forms.regform.onsubmit = function() {
        nameReg = this.namereg.value;
        emailReg = this.emailreg.value;
        ageReg = this.agereg.value;
        passwordReg = this.passwordreg.value;

        var raw = JSON.stringify({
            "name": nameReg,
            "email": emailReg,
            "password": passwordReg,
            "age": ageReg
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api-nodejs-todolist.herokuapp.com/user/register", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        
        console.log(nameReg)
        console.log(emailReg)
        console.log(ageReg)
        console.log(passwordReg)

        return false;
    };
}
