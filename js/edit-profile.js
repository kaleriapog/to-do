//получаем профиль пользователя, что вошел в систему
let fieldName = document.getElementById('name');
let fieldAge = document.getElementById('age');
// дубликат, переделать
let tokenLogUser = localStorage.getItem('userToken');

// конец дубликат, переделать

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
            fieldName.value = nameUserFromAPI;
            fieldAge.value = ageUserFromAPI;

            console.log(nameUserFromAPI, ageUserFromAPI);
        })
    .catch(error => console.log('error', error));
}  