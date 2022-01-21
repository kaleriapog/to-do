// добавать задачу
let clickAddTask = document.querySelector('.js-button-add-task');
let tokenLogUser = localStorage.getItem('userToken');
let parentItemsTask = document.querySelector('.js-to-do');
let parentItemsTaskСomplited = document.querySelector('.js-complited');
let wrappListToDo = document.querySelector('.tasks-lists-wrapp');
let newTask = document.querySelector('.new-task');
const clickForUpdateTask = document.querySelectorAll('.js-update-task');
const parentWrappTask = document.querySelectorAll('.tasks-lists__items');
let updateTask = document.querySelector('.section-update-task');
let textareaUpdateTask = document.querySelector('.update-task');
const buttonUpdateTask = document.querySelector('.js-button-update-task');
let allTaskForProgress;

let myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${tokenLogUser}`);
myHeaders.append("Content-Type", "application/json");

// дубликат, переделать
const body = document.querySelector('body');
const createTask = document.querySelector('.section-create-task');
const clickToAddTask = document.querySelector('.tasks-lists__add-task');
const complited = document.querySelector('.js-complited');
const toDo = document.querySelector('.js-to-do');
// конец дубликат, переделать

// сброс знаения поля заполнения при создании дела
if (clickToAddTask) {

    clickToAddTask.addEventListener('click', () => {
        newTask.value = '';
    })
}

// добавить задачу
if(createTask !== null) {

    clickAddTask.addEventListener('click', addTask);

    function addTask() {
        
        let newTask = document.querySelector('.new-task').value;
        
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
            console.log(JSON.parse(result)),
            createTask.classList.remove('open-section'),
            body.classList.remove('hiden'),
            addTaskInner(JSON.parse(result).data.description, JSON.parse(result).data._id)
        })
        .catch(error => console.log('error', error));
    }
}
// конец добавать задачу  

// HTML вид вывода задач
function addTaskInner(descriptionText, idItem) {
    let taskItems = `<div id="${idItem}" class="tasks-lists__item js-task" draggable="true">
    <p class="tasks-lists__text">${descriptionText}</p>
        <span class="icon-circles">
            <span class="icon-circle"></span>
            <span class="icon-circle"></span>
            <span class="icon-circle"></span>
        </span>
        <div class="more-options js-options">
            <span class="more-options__allelem">
                <span class="more-options__elem js-update-task">Edit</span>
                <span class="more-options__elem js-delete-task">Delete</span>
            </span>
            <span class="plus cross">
                <span class="plus-v"></span>
                <span class="plus-h"></span>
            </span>
        </div>
    </div>`;

    parentItemsTask.innerHTML += taskItems;
}
//конец HTML видa вывода задач

// вывести все не выполненные задачи
if (parentItemsTask) {
    function getAllTask() {

        let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("https://api-nodejs-todolist.herokuapp.com/task?completed=false", requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(JSON.parse(result))
            JSON.parse(result).data.forEach(function(elem){ //elem это мой елемнт на который я вешаю форич
                addTaskInner(elem.description, elem._id)
            })            
        })   
        .catch(error => console.log('error', error));
    }

    getAllTask();
}    
// конец вывести все задачи

// получить айди задачи при клике на удалить и удалить из API, HTML
function getTaskforDelete() {
        
    parentWrappTask.forEach(function(item){

        item.addEventListener('click', deleteElementById);

        function deleteElementById(e) {

            // провека если клик был на класс с удалением
            if (e.target.classList.contains('js-delete-task')) {

                let getIdForDeleteAPI = e.target.closest('.tasks-lists__item').id;
                let getIdForDeleteHtml = document.getElementById(`${getIdForDeleteAPI}`)
                
                // удаление задач по айди
                let requestOptions = {
                    method: 'DELETE',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                // удаление задачи из API
                if(getIdForDeleteAPI) { 
                       
                    fetch(`https://api-nodejs-todolist.herokuapp.com/task/${getIdForDeleteAPI}`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        // удаление задачи из HTML
                        getIdForDeleteHtml.remove();
                        console.log('задача удалена успешно из API, HTML');
                    })
                    .catch(error => console.log('error', error));                    
                }                
            }
        }       
    })
}
// конец удаления задач при клике на удалить

// редактирования задач
parentWrappTask.forEach(function(item){

    item.addEventListener('click', openFormUpdate);

    function openFormUpdate(e) {
        
        // провека если клик был на класс с редактированием
        if (e.target.classList.contains('js-update-task')) {

            // открыть поле для редактирования
            updateTask.classList.add('open-section');
            body.classList.add('hiden');

            // получить текст дела
            let getIdForUpdate = e.target.closest('.tasks-lists__item').id;
            let getTextForUpdate = e.target.closest('.tasks-lists__item').querySelector('.tasks-lists__text').textContent;

            // записать текст дела в открытое поле для редактирования
            textareaUpdateTask.value = getTextForUpdate;

            // получить новый текст дела в открытом поле для редактирования(новый введенный пользователем текст)
            buttonUpdateTask.addEventListener('click', getNewTextTask);

            function getNewTextTask() {

                let newTextUpdate = textareaUpdateTask.value;
                let getIdForUpdateAPI = e.target.closest('.tasks-lists__item').id;
                let getIdForUpdateHtml = document.getElementById(`${getIdForUpdateAPI}`)
                
                //  добавить новый текст в API и HTML
                let raw = JSON.stringify({
                    "description": newTextUpdate
                });
                  
                let requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                  
                fetch(`https://api-nodejs-todolist.herokuapp.com/task/${getIdForUpdateAPI}`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    // console.log(result)
                    getIdForUpdateHtml.querySelector('.tasks-lists__text').textContent = newTextUpdate // записываем в хтмл новое значение
                    updateTask.classList.remove('open-section');
                    body.classList.remove('hiden');
                    getIdForUpdateHtml.classList.remove('open-more-options');
                })                
                .catch(error => console.log('error', error));
            }            
            console.log('открыто поле для редактирования ' + getIdForUpdate)
        }
    }       
})
// конец редактирования задач

// при переносе в выполненные
if (complited) {

    complited.addEventListener('drop', completedTask);

    function completedTask(e) {

        let itemId = e.dataTransfer.getData('id');
        let draggedElementId = document.getElementById(itemId).id;
        console.log ('API onondrop in complited ' + draggedElementId);

        var raw = JSON.stringify({
            "completed": true
        });
        
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        fetch(`https://api-nodejs-todolist.herokuapp.com/task/${draggedElementId}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
}
// конец при переносе в выполненные

// при переносе в невыполненные
if (toDo) {

    toDo.addEventListener('drop', notCompletedTask);

    function notCompletedTask(e) {
        let itemId = e.dataTransfer.getData('id');
        let draggedElementId = document.getElementById(itemId).id;
        console.log ('API onondrop in todo ' + draggedElementId);

        var raw = JSON.stringify({
            "completed": false
        });
        
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        fetch(`https://api-nodejs-todolist.herokuapp.com/task/${draggedElementId}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
}
// конец при переносе в невыполненные

// вывести выполненые задачи
if(parentItemsTaskСomplited) {

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    fetch("https://api-nodejs-todolist.herokuapp.com/task?completed=true", requestOptions)
    .then(response => response.text())
    .then(result => {
        // console.log(JSON.parse(result))
            JSON.parse(result).data.forEach(function(elem){ //elem это мой елемнт на который я вешаю форич
                addTaskInnerCompleted(elem.description, elem._id)
            })
            getTaskforDelete();
        })
    .catch(error => console.log('error', error));
}    
// конец вывести выполненые задачи

// HTML вид вывода выполненых задач задач
function addTaskInnerCompleted(descriptionText, idItem) {
    
    let taskItems = `<div id="${idItem}" class="tasks-lists__item js-task" draggable="true">
    <p class="tasks-lists__text">${descriptionText}</p>
        <span class="icon-circles">
            <span class="icon-circle"></span>
            <span class="icon-circle"></span>
            <span class="icon-circle"></span>
        </span>
        <div class="more-options js-options">
            <span class="more-options__allelem">
                <span class="more-options__elem js-update-task">Edit</span>
                <span class="more-options__elem js-delete-task">Delete</span>
            </span>
            <span class="plus cross">
                <span class="plus-v"></span>
                <span class="plus-h"></span>
            </span>
        </div>
    </div>`;

    parentItemsTaskСomplited.innerHTML += taskItems;
}