let basicUrl = 'https://api-nodejs-todolist.herokuapp.com/';
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// шаблон функции для регистрации с АПИ
export function requestInApiReg (localUrl, nameReg, emailReg, passwordReg, ageReg) {

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

    return fetch(`${basicUrl}${localUrl}`, requestOptions) 
    .then()
    .then()
    .catch(error => console.log('error', error));   
}

// шаблон функции для логинизации с АПИ
export function requestInApiLogIn (localUrl, emailSignin, passworSignin) {

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
    return fetch(`${basicUrl}${localUrl}`, requestOptions)          
    .then()
    .then()
    .catch(error => {
        console.log('error', error)
    });
}

// шаблон функции для logOut с АПИ
export function requestInApiLogOut (localUrl, tokenLogUser) {

    myHeaders.append('Authorization', `Bearer ${tokenLogUser}`)

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${basicUrl}${localUrl}`, requestOptions) 
    .then()
    .then()
    .catch(error => console.log('error', error));   
}

// шаблон функции для отображение информации профиля с АПИ
export function requestInApiShowUserDetails (localUrl, tokenLogUser) {

    myHeaders.append("Authorization", `Bearer ${tokenLogUser}`);

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${basicUrl}${localUrl}`, requestOptions) 
    .then()
    .then()
    .catch(error => console.log('error', error));  
}

// шаблон функции для редактирования профиля с АПИ
export function requestInApiEditUserDetails (localUrl, tokenLogUser, editProfileName, editProfileEmail, editProfileAge, editProfilePassword) {

    let myHeaders = new Headers(); // без этой строки ошибка авторизации
    myHeaders.append("Content-Type", "application/json"); // без этой строки не меняет данные в АПИ
    myHeaders.append('Authorization', `Bearer ${tokenLogUser}`);

    if (editProfilePassword.length == 0) { // если пароля нет

        let raw = JSON.stringify({
            "name": editProfileName,
            "email": editProfileEmail,
            "age": editProfileAge 
        });

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return fetch(`${basicUrl}${localUrl}`, requestOptions) 
            .then()
            .then()
            .catch(error => console.log('error', error)); 

    } else { // если пароль есть

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

        return fetch(`${basicUrl}${localUrl}`, requestOptions) 
            .then()
            .then()
            .catch(error => console.log('error', error)); 
    }
}

// добавить фото профиля в АПИ
export function requestInApiUpdateAvatar (localUrl, tokenLogUser, fileUpload) {
        
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${tokenLogUser}`);

    let formdata = new FormData();
    formdata.append('avatar', fileUpload, "blog-header.jpg");

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${basicUrl}${localUrl}`, requestOptions) 
    .then()
    .then()
    .catch(error => console.log('error', error)); 
}

// получить фото профиля из АПИ и разместить в  html
export function requestInApiGetAvatar (localUrl) {

    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
              
    return fetch(`${basicUrl}${localUrl}`, requestOptions)
    .then()
    .then()
    .catch(error => console.log('error', error));    
}    

// Апи для получения списка всех дел
export function requestInApiGetAllTasks (localUrl, tokenLogUser) { 

    let myHeaders = new Headers();                                      // без этой строки ошибка
    myHeaders.append('Authorization', `Bearer ${tokenLogUser}`);
    myHeaders.append("Content-Type", "application/json");               // без этой строки ошибка    

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${basicUrl}${localUrl}`, requestOptions)
    .then()
    .then()
    .catch(error => console.log('error', error));        
}

// шаблон добавления задачи в АПИ
export function requestInApiAddTask (localUrl, newTaskText) {   

    let raw = JSON.stringify({
        "description": newTaskText
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
        
    return fetch(`${basicUrl}${localUrl}`, requestOptions) 
    .then()
    .then()
    .catch(error => console.log('error', error));   
}

// шаблон удаления задачи из АПИ
export function requestInApiDeleteTask (localUrl, getIdForDeleteAPI) {   
        
    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    }; 

    return fetch(`${basicUrl}${localUrl}${getIdForDeleteAPI}`, requestOptions) 
    .then()
    .then()
    .catch(error => console.log('error', error));   
}

// шаблон редактированиезадачи из АПИ
export function requestInApiUpdateTask (localUrl, getIdForDeleteAPI, newTextUpdate) {   
        
    let raw = JSON.stringify({
        "description": newTextUpdate
    });
      
    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${basicUrl}${localUrl}${getIdForDeleteAPI}`, requestOptions) 
    .then()
    .then()
    .catch(error => console.log('error', error));   
}

// шаблон изменения стутуса при переноси в выполн или невыполн в АПИ
export function requestInApiСompletedTask (localUrl, draggedElementId, statusToDo) {   
        
    let raw = JSON.stringify({
        "completed": `${statusToDo}` // true/false
    });
    
    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${basicUrl}${localUrl}${draggedElementId}`, requestOptions) 
    .then()
    .then()
    .catch(error => console.log('error', error));   
}
