//получаем профиль пользователя, что вошел в систему
let fieldName = document.getElementById('name');
let fieldAge = document.getElementById('age');
let fieldEmail = document.getElementById('email');
let buttonUpdatePhoto = document.querySelector('.button-update-photo');
let updatedSuccessfully = document.querySelector('.updated-successfully');
let blockUserImg = document.querySelector('.user-info__img');
let pageTodo = document.querySelector('.page-to-do');
let blockUserImgUpdate = document.querySelector('.form__img-update');
let blockUserName = document.querySelector('.user-info__name');
let editProfileName;
let editProfileEmail;
let editProfileAge;
let editProfilePassword;

const buttonEditProfile = document.querySelector('.button-edit-profile');
const errorEditProfile = document.querySelector('.error-edit-profile');

// дубликат, переделать
const sendUpdateBlock = document.querySelector('.send-img__wrapp');
let tokenLogUser = localStorage.getItem('userToken'); 

// конец дубликат, переделать

// вывести данные пользователя в форму изменить профиль
export function showUserDetails() {

    if(fieldName) {

        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${tokenLogUser}`);

        let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("https://api-nodejs-todolist.herokuapp.com/user/me", requestOptions)
            .then(response => response.text())
            .then(result => {
                
                console.log('пользователь ' + result);
                let nameUserFromAPI = JSON.parse(result).name;
                let ageUserFromAPI = JSON.parse(result).age;
                let emailUserFromAPI = JSON.parse(result).email;
                
                fieldName.value = nameUserFromAPI;
                fieldAge.value = ageUserFromAPI;
                fieldEmail.value = emailUserFromAPI; 
                console.log(nameUserFromAPI, ageUserFromAPI, emailUserFromAPI);
            })
        .catch(error => console.log('error', error));
    }
}

showUserDetails();
// конец вывести данные пользователя в форму изменить профиль 

// изменить профиль
if (buttonEditProfile) {

    buttonEditProfile.addEventListener('click', editProfile);

    function editProfile() {
        event.preventDefault();

        editProfileName = document.querySelector('.edit-profile-name').value;
        editProfileEmail = document.querySelector('.edit-profile-email').value;
        editProfileAge = document.querySelector('.edit-profile-age').value;
        editProfilePassword = document.querySelector('.edit-profile-password').value;

        if (editProfileName.length !== 0 && editProfileEmail.length !== 0 && editProfileAge.length !== 0) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${tokenLogUser}`);
        
            if (editProfilePassword.length == 0) {

                let raw = JSON.stringify({
                    "name": editProfileName,
                    "email": editProfileEmail,
                    "age": editProfileAge,                       
                });
                let requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                
                fetch("https://api-nodejs-todolist.herokuapp.com/user/me", requestOptions)
                .then(response => response.text())
                .then(result => {
                    
                    console.log(result)
                    updatedSuccessfully.classList.add('successful-visible'); 
                    localStorage.setItem('userName', editProfileName); // добавляем имя
                    blockUserName.innerHTML = `<span>Mr. ${localStorage.getItem('userName')}</span>`;

                    setTimeout(() => {

                        updatedSuccessfully.classList.remove('successful-visible');

                    }, 2500);
                })
                .catch(error => console.log('error', error));

            } else {

                let raw = JSON.stringify({
                    "name": editProfileName,
                    "email": editProfileEmail,
                    "age": editProfileAge,
                    "password": editProfilePassword   
                });

                let requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                
                fetch("https://api-nodejs-todolist.herokuapp.com/user/me", requestOptions)
                .then(response => response.text())
                .then(result => {

                    console.log(result)
                    updatedSuccessfully.classList.add('successful-visible');
                    localStorage.setItem('userName', editProfileName); // добавляем имя
                    blockUserName.innerHTML = `<span>Mr. ${localStorage.getItem('userName')}</span>`;

                    setTimeout(() => {

                        updatedSuccessfully.classList.remove('successful-visible');

                    }, 2500);
                })
                .catch(error => console.log('error', error));
            } 

        } else {

            errorEditProfile.classList.add('error-visible');

            setTimeout(() => {

                errorEditProfile.classList.remove('error-visible');
            }, 2500)
            console.log('заполните все поля')
        }
    }
}
// конец изменить профиль

// загрузка фото профиля
if (buttonUpdatePhoto) {

    buttonUpdatePhoto.addEventListener('click', updateAvatar);

    function updateAvatar() {

        let idLogUser = localStorage.getItem('userId'); 

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
        .then(response => response.json())
        .then(result => {
            //  получить фото пользователя и разместить в  html
            let requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
              
              fetch(`https://api-nodejs-todolist.herokuapp.com/user/${idLogUser}/avatar`, requestOptions)
                .then(response => response)
                .then(result => {                   
                    
                    blockUserImg.innerHTML = `<img src="${result.url}" alt="image avatar">`;
                    blockUserImgUpdate.innerHTML = `<img src="${result.url}" alt="image avatar">`;

                    sendUpdateBlock.classList.remove('send-img-visible');

                })
                .catch(error => console.log('error', error));
            console.log(result)
        })
        .catch(error => console.log('error', error));
    }
}    
// конец загрузка фото профиля  

//  получать фото профиля при загрузке страницы дел
if (pageTodo) {

    document.addEventListener("DOMContentLoaded", addImageAvatar);

    function addImageAvatar () {

        let idLogUser = localStorage.getItem('userId');
        let nameLogUser = localStorage.getItem('userName');
        
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch(`https://api-nodejs-todolist.herokuapp.com/user/${idLogUser}/avatar`, requestOptions)
        .then(response => response)
        .then(result => {
            if (result.ok == true) {
                blockUserImg.innerHTML = `<img src="${result.url}" alt="image avatar">`;
                blockUserImgUpdate.innerHTML = `<img src="${result.url}" alt="image avatar">`;
                blockUserName.innerHTML = `<span>Mr. ${nameLogUser}</span>`;
            }
        })
        .catch(error => console.log('error', error));
    }
}
//  конец получать фото профиля при загрузке страницы дел
