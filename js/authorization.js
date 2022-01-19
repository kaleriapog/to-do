let formReg = document.querySelector('.regform');
let myStorage = window.localStorage; 
let clickLogOut = document.querySelector('.js-log-out');
let formSignin = document.querySelector('.signinform');
let buttonReg = document.querySelector('.button-reg');
let buttonSignin = document.querySelector('.button-signin');
let nameReg;
let emailReg;
let ageReg;
let passwordReg;
let emailSignin;
let passworSignin;
let user;
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
let buttonUpdatePhoto = document.querySelector('.button-update-photo');

// дубликат переделать
const signIn = document.querySelector('.section-signin');
const clickSignIn = document.querySelector('.singin');
const reg = document.querySelector('.section-reg');
// конец дубликат переделать

// скрыть блок успешной регистрации
if (crossSuccessful) {

    crossSuccessful.addEventListener('click', () => {
        successReg.classList.remove('success-login-open')
    })
}
// конец скрыть блок успешной регистрации

// for api
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// регистрация
if(formReg) {
    
    buttonReg.addEventListener('click', newUserRegistration);

    function newUserRegistration() {
        event.preventDefault();
        
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
                // регистрация будет только при валидной почте
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
                .then(response => {
                    // response.text()
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

                        localStorage.setItem('userToken', JSON.parse(result).token);
                        console.log('успешно ' + JSON.parse(result).token);                
                        signIn.classList.add('open-section');
                        reg.classList.remove('open-section'); 
                        console.log('переход к логинизации');
                        successReg.classList.add('success-login-open') // открыть блок с успешной регистрац   
                    }
                })
                .catch(error => console.log('error', error))
                
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
    
    function logInUser() {

        event.preventDefault();        
        
        emailSignin = document.querySelector('.emailsignin').value;
        passworSignin = document.querySelector('.passwordsignin').value;
        
        if (emailSignin.length !== 0 && passworSignin.length !== 0) {

            let raw = JSON.stringify({
                "email": emailSignin,
                "password": passworSignin
            });

            console.log(emailSignin, passworSignin + ' после jsonа')

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://api-nodejs-todolist.herokuapp.com/user/login", requestOptions)          
            .then(response => response.json())
            .then(result => {
                
                if (result == 'Unable to login') {

                    errorSignin.classList.add('success-login-open');
                    console.log('неверные данные для входа');

                } else {

                    localStorage.setItem('userToken', result.token);
                    document.location.href = 'to-do-list.html';
                    console.log('успешный вход ' + result.token);                    
                }                
            })
            .catch(error => {
                console.log('error', error)
            });
        };
    }
}

// log out
let tokenLogUser = localStorage.getItem('userToken');
// console.log(tokenLogUser)

if (clickLogOut) {

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
            localStorage.removeItem('userToken');
            document.location.href = 'index.html';
        })
        .catch(error => console.log('error', error));
    }
}

// загрузка фото профиля
if (buttonUpdatePhoto) {

    buttonUpdatePhoto.addEventListener('click', updateAvatar);

    function updateAvatar() {

        event.preventDefault();
        let fileUpload = document.getElementById('update-photo');
        console.log(fileUpload.files[0])
            
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${tokenLogUser}`);

        let formdata = new FormData();
        formdata.append("avatar", fileUpload.files[0], "blog-header.jpg");

        let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };

        fetch("https://api-nodejs-todolist.herokuapp.com/user/me/avatar", requestOptions)
        .then(response => response.text())
        .then(result => {
            let requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
              
              fetch("https://api-nodejs-todolist.herokuapp.com/user/61e82cd83bc22600170c8e5a/avatar", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result);
                    document.innerHTML = `<img src="${result.url}" alt="image for successful registration">`
                })
                .catch(error => console.log('error', error));
            console.log(result)
        })
        .catch(error => console.log('error', error));
    }
}    
// конец загрузка фото профиля  

// получить картинку профиля из АПИ
// let requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
//   };
  
//   fetch("https://api-nodejs-todolist.herokuapp.com/user/5ddccbec6b55da001759722c/avatar", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));
// конец получить картинку профиля из АПИ
