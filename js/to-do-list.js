// добавать задачу
let clickAddTask = document.querySelector('.js-button-add-task');
let tokenLogUser = localStorage.getItem('userToken');
let parentItemsTask = document.querySelector('.js-to-do');

let myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${tokenLogUser}`);
myHeaders.append("Content-Type", "application/json");

// дубликат, переделать
const body = document.querySelector('body');
const createTask = document.querySelector('.section-create-task');

if(createTask !== null) {

    clickAddTask.addEventListener('click', addTask);

    function addTask() {
        let newTask = document.querySelector('.new-task').value;
        // console.log(newTask);

        let raw = JSON.stringify({
            "description": newTask
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api-nodejs-todolist.herokuapp.com/task", requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(JSON.parse(result).data.description),
            createTask.classList.remove('open-section'),
            body.classList.remove('hiden'),
            addTaskInner(JSON.parse(result).data.description)
        
        })
        .catch(error => console.log('error', error));
    }

    function addTaskInner(descriptionText) {
        let idRandom = Math.random().toString(36).substr(2, 15);
        let taskItems = `<div id="${idRandom}" class="tasks-lists__item js-task" draggable="true">
        <p class="tasks-lists__text">${descriptionText}</p>
            <span class="icon-circles">
                <span class="icon-circle"></span>
                <span class="icon-circle"></span>
                <span class="icon-circle"></span>
            </span>
        </div>`;

        parentItemsTask.innerHTML += taskItems
    }

    // конец добавать задачу

    // вывести все задачи

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://api-nodejs-todolist.herokuapp.com/task", requestOptions)
    .then(response => response.text())
    .then(result => {
            JSON.parse(result).data.forEach(function(elem){ //elem это мой елемнт на который я вешаю форич
                addTaskInner(elem.description)
            })
        })
    .catch(error => console.log('error', error));

}