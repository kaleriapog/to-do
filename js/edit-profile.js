import {requestInApiShowUserDetails} from './API.js';
import {requestInApiEditUserDetails} from './API.js';
import {requestInApiUpdateAvatar} from './API.js';
import {requestInApiGetAvatar} from './API.js';

let fieldName = document.getElementById('name');
let fieldAge = document.getElementById('age');
let fieldEmail = document.getElementById('email');
let buttonUpdatePhoto = document.querySelector('.button-update-photo');
let updatedSuccessfully = document.querySelector('.updated-successfully');
let blockUserImg = document.querySelector('.user-info__img');
let pageTodo = document.querySelector('.page-to-do');
let blockUserImgUpdate = document.querySelector('.form__img-update');
let blockUserName = document.querySelector('.user-info__name');
let idLogUser = localStorage.getItem('userId');
let editProfileName;
let editProfileEmail;
let editProfileAge;
let editProfilePassword;

const buttonEditProfile = document.querySelector('.button-edit-profile');
const errorEditProfile = document.querySelector('.error-edit-profile');
const sendUpdateBlock = document.querySelector('.send-img__wrapp');
const tokenLogUser = localStorage.getItem('userToken'); 
const avatarUser = localStorage.getItem('avatarUser');
// вывести данные пользователя в форму изменить профиль
if(fieldName) {

    requestInApiShowUserDetails('user/me', tokenLogUser).then(response => response.text())
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
// конец вывести данные пользователя в форму изменить профиль 

// изменить профиль
if (buttonEditProfile) {

    buttonEditProfile.addEventListener('click', editProfile);

    function editProfile(e) {

        e.preventDefault();

        editProfileName = document.querySelector('.edit-profile-name').value;
        editProfileEmail = document.querySelector('.edit-profile-email').value;
        editProfileAge = document.querySelector('.edit-profile-age').value;
        editProfilePassword = document.querySelector('.edit-profile-password').value;
        console.log(editProfileEmail)

        if (editProfileName.length !== 0 && editProfileEmail.length !== 0 && editProfileAge.length !== 0) {
            requestInApiEditUserDetails('user/me', tokenLogUser, editProfileName, editProfileEmail, editProfileAge, editProfilePassword).then(response => response.text())
            .then(result => {
                console.log(editProfileEmail)
                
                console.log(result)
                updatedSuccessfully.classList.add('successful-visible'); 
                localStorage.setItem('userName', editProfileName); // добавляем имя
                blockUserName.innerHTML = `<span>Mr. ${localStorage.getItem('userName')}</span>`;

                setTimeout(() => {

                    updatedSuccessfully.classList.remove('successful-visible');

                }, 2500);
            })

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

// загрузка фото профиля и отобразить a профиле сразу после загрузки
if (buttonUpdatePhoto) {

    buttonUpdatePhoto.addEventListener('click', updateAvatar);

    async function updateAvatar(e) {

        e.preventDefault();
        let fileUpload = document.getElementById('update-photo');
        console.log(fileUpload.files[0]);

        await requestInApiUpdateAvatar('user/me/avatar', tokenLogUser, fileUpload.files[0]).then(response => response.json()).then(result => {console.log(result)});

        await requestInApiGetAvatar(`user/${idLogUser}/avatar`).then(response => response)
            .then(result => {                  
                blockUserImg.innerHTML = `<img src="${result.url}" alt="image avatar">`;
                blockUserImgUpdate.innerHTML = `<img src="${result.url}" alt="image avatar">`;

                sendUpdateBlock.classList.remove('send-img-visible');
        
            })
    }
}    
// конец загрузка фото профиля  

//  получать фото профиля при загрузке страницы дел
if (pageTodo) {

    document.addEventListener("DOMContentLoaded", addImageAvatar);

    function addImageAvatar () {
        
        requestInApiGetAvatar(`user/${idLogUser}/avatar`)
        .then(response => response)
            .then(result => {    
                if (result.status === 200) {
                    blockUserImg.innerHTML = `<img src="${result.url}" alt="image avatar">`;
                    blockUserImgUpdate.innerHTML = `<img src="${result.url}" alt="image avatar">`;
                } 
            })
            .catch(error => console.log('error', error));
    }   
}
//  конец получать фото профиля при загрузке страницы дел
