import {requestInApiReg} from './API.js';
import {requestInApiLogIn} from './API.js';
import {requestInApiLogOut} from './API.js';

let formReg = document.querySelector('.regform');
let clickLogOut = document.querySelector('.js-log-out');
let formSignin = document.querySelector('.signinform');
let buttonReg = document.querySelector('.button-reg');
let buttonSignin = document.querySelector('.button-signin');
let errorName = document.querySelector('.error-name');
let errorEmail = document.querySelector('.error-email');
let errorAge = document.querySelector('.error-age');
let errorPassword = document.querySelector('.error-password');
let successReg = document.querySelector('.success-login');
let crossSuccessful =document.querySelector('.cross-successful');
let errorSignin = document.querySelector('.error-signin');
let errorUserExists = document.querySelector('.error-user-exists');
let titleReg = document.querySelector('.title-reg-js');
let errorValidate = document.querySelector('.error-validate');
const signIn = document.querySelector('.section-signin');
const reg = document.querySelector('.section-reg');
let nameReg;
let emailReg;
let ageReg;
let passwordReg;
let emailSignin;
let passworSignin;

// скрыть блок успешной регистрации
if (crossSuccessful) {

    crossSuccessful.addEventListener('click', () => {
        successReg.classList.remove('success-login-open')
    })
}
// конец скрыть блок успешной регистрации

// регистрация
if(formReg) {
    
    buttonReg.addEventListener('click', newUserRegistration);

    function newUserRegistration(e) {
        e.preventDefault();
        
        nameReg = document.getElementById('namereg').value;
        emailReg = document.getElementById('emailreg').value;
        ageReg = document.getElementById('agereg').value;
        passwordReg = document.getElementById('passwordreg').value;

        // проверка на заполнения всех полей при регистрации
        if (nameReg.length === 0) {

            errorName.classList.add('error-visible');
            console.log('нет имени');
        } else {
            errorName.classList.remove('error-visible');
        }

        if (emailReg.length === 0) {

            errorEmail.classList.add('error-visible');
            console.log('нет почты');
            
        } else {
            errorEmail.classList.remove('error-visible');
        }

        if (ageReg.length === 0) {

            errorAge.classList.add('error-visible');
            console.log('нет возраста');

        } else {

            errorAge.classList.remove('error-visible');
        }

        if (passwordReg.length === 0) {

            errorPassword.classList.add('error-visible');            
            console.log('нет пароля');

        } else {

            errorPassword.classList.remove('error-visible');
        }                      
        // конец проверки на заполнения всех полей при регистрации

        // регистрация пользователя
        if (nameReg.length !== 0 && emailReg.length !== 0 && ageReg.length !== 0 && passwordReg.length !== 0 ) {
            // проверка на валидность email         
            const emailRegValidate = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu; // шаблон проверки email

            function validateEmail(value) { // функция проверки email

                return emailRegValidate.test(value);
            }

            if (validateEmail(emailReg)) { //условие, если почта валидная

                console.log('правильная validate почта');

                requestInApiReg ('user/register', nameReg, emailReg, passwordReg, ageReg).then(response => {
                
                    if(response.status == 400) {
    
                        errorUserExists.classList.add('error-visible');
                        titleReg.style.color = 'tomato';

                        setTimeout(() => {
                            errorUserExists.classList.remove('error-visible');
                            titleReg.style.color = 'black';
                        }, 3500);
                        console.log('400 неуспешная регистрация/пользователь существует');

                    } else {

                        console.log('200 успешная регистрация');
                        return response.text();                     
                    }
                })
                .then(result => {                

                    if (result) { // если 400 то не result, проверка на наличие result
                       
                        console.log('успешно ' + JSON.parse(result).token);                
                        signIn.classList.add('open-section');
                        reg.classList.remove('open-section'); 
                        console.log('переход к логинизации');
                        successReg.classList.add('success-login-open') // открыть блок с успешной регистрац   
                    }
                })         
                
            } else { // условие, если почта не валидная

                errorValidate.classList.add('error-visible');

                setTimeout(() => {
                    errorValidate.classList.remove('error-visible');
                }, 3500);
                console.log('не правильная почта');
            } 
            // конец проверки на валидность email              
        }
        // конец регистрация пользователя
    };
}

// логинизация
if(formSignin) {

    buttonSignin.addEventListener('click', logInUser)
    
    function logInUser(e) {

        e.preventDefault();        
        
        emailSignin = document.querySelector('.emailsignin').value;
        passworSignin = document.querySelector('.passwordsignin').value;
        
        if (emailSignin.length !== 0 && passworSignin.length !== 0) {
          
            requestInApiLogIn('user/login', emailSignin, passworSignin).then(response => response.json()).then(result => {

                if (result == 'Unable to login') {
    
                    errorSignin.classList.add('success-login-open');
                    console.log('неверные данные для входа');

                } else {

                    localStorage.setItem('userToken', result.token);
                    localStorage.setItem('userId', result.user._id); // добавляем id в локалстореж
                    localStorage.setItem('userName', result.user.name); // добавляем имя
                    document.location.href = 'to-do-list.html';
                    console.log('успешный вход ' + result.token, result.user._id);                    
                }    
                                    
            })
        };
    }
}

// log out
let tokenLogUser = localStorage.getItem('userToken');

if (clickLogOut) {

    clickLogOut.addEventListener('click', logOut);    

    function logOut() {

        requestInApiLogOut('user/logout', tokenLogUser).then(response => response.text()).then(result => {

            localStorage.removeItem('userToken');
            localStorage.removeItem('userName');
            localStorage.removeItem('userId'); 
            document.location.href = 'index.html';
        })
    }
}