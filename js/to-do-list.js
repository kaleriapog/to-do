import {updateComplited} from './progressbar.js';
import {requestInApiGetAllTasks} from './API.js';
import {requestInApiAddTask} from './API.js';
import {requestInApiDeleteTask} from './API.js';
import {requestInApiUpdateTask} from './API.js';
import {requestInApiСompletedTask} from './API.js';

let clickAddTask = document.querySelector('.js-button-add-task');
let tokenLogUser = localStorage.getItem('userToken');
let parentItemsTask = document.querySelector('.js-to-do');
let parentItemsTaskСomplited = document.querySelector('.js-complited');
let newTask = document.querySelector('.new-task');
let updateTask = document.querySelector('.section-update-task');
let textareaUpdateTask = document.querySelector('.update-task');
let myHeaders = new Headers();
const buttonUpdateTask = document.querySelector('.js-button-update-task');
const parentWrappTask = document.querySelectorAll('.tasks-lists__items');
const body = document.querySelector('body');
const createTask = document.querySelector('.section-create-task');
const clickToAddTask = document.querySelector('.tasks-lists__add-task');
const complited = document.querySelector('.js-complited');
const toDo = document.querySelector('.js-to-do');

myHeaders.append("Authorization", `Bearer ${tokenLogUser}`);
myHeaders.append("Content-Type", "application/json");

// сброс знаения поля заполнения при создании дела
if (clickToAddTask) {

    clickToAddTask.addEventListener('click', () => {
        console.log(newTask.value, newTask)
        newTask.value = '';
    })
}

// добавить задачу
if(createTask) {

    clickAddTask.addEventListener('click', addTask);

    function addTask() {

        let newTaskText = document.querySelector('.new-task').value;

       requestInApiAddTask('task', newTaskText).then(response => response.json())
        .then(result => {        
            console.log(result),
            createTask.classList.remove('open-section'),
            body.classList.remove('hiden'),
            addTaskInner(result.data.description, result.data._id, parentItemsTask);
            updateComplited ();            
        })
    }
}
// конец добавать задачу  

// вывести все задачи
if (parentItemsTask) {

    requestInApiGetAllTasks('task', tokenLogUser).then(response => response.json())
        .then(result => {
            // вывести все невыпол задачи
            let newArrayAllTask = result.data.filter(function (el) {
                return el.completed == false; 
            });
            newArrayAllTask.forEach(function(elem) { //elem это мой елемнт на который я вешаю форич

                addTaskInner(elem.description, elem._id, parentItemsTask)                
            })  

            // вывести все выпол задачи
            let newArrayTaskCompleted = result.data.filter(function (el) {
                return el.completed == true; 
            });

            newArrayTaskCompleted.forEach(function(elem) { //elem это мой елемнт на который я вешаю форич
                
                addTaskInner(elem.description, elem._id, parentItemsTaskСomplited)                
            }) 
        }) 
}    
// конец вывести все задачи

// получить айди задачи при клике на удалить и удалить из API, HTML
if (parentWrappTask) {
    parentWrappTask.forEach(function(item) {

        item.addEventListener('click', deleteElementById);

        function deleteElementById(e) {

            // провека если клик был на класс с удалением
            if (e.target.classList.contains('js-delete-task')) {

                let getIdForDeleteAPI = e.target.closest('.js-task').id;
                let getIdForDeleteHtml = document.getElementById(`${getIdForDeleteAPI}`)                            
                
                // удаление задачи из API
                if(getIdForDeleteAPI) { 

                    requestInApiDeleteTask('task/', getIdForDeleteAPI).then(response => response.text())
                    .then(result => {
                        // удаление задачи из HTML
                        getIdForDeleteHtml.remove();
                        console.log('задача удалена успешно из API, HTML');
                        updateComplited ();
                    })


                    // let requestOptions = {
                    //     method: 'DELETE',
                    //     headers: myHeaders,
                    //     redirect: 'follow'
                    // };
                    
                    // fetch(`https://api-nodejs-todolist.herokuapp.com/task/${getIdForDeleteAPI}`, requestOptions)
                    // .then(response => response.text())
                    // .then(result => {
                    //     // удаление задачи из HTML
                    //     getIdForDeleteHtml.remove();
                    //     console.log('задача удалена успешно из API, HTML');
                    // })
                    // .catch(error => console.log('error', error));                    
                }                
            }
        }       
    })   
}        
// конец удаления задач при клике на удалить

// редактирования задач
if (parentWrappTask) {
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
                    requestInApiUpdateTask('task/', getIdForUpdateAPI, newTextUpdate).then(response => response.text())
                    .then(result => {
                        
                        getIdForUpdateHtml.querySelector('.tasks-lists__text').textContent = newTextUpdate // записываем в хтмл новое значение
                        updateTask.classList.remove('open-section');
                        body.classList.remove('hiden');
                        getIdForUpdateHtml.classList.remove('open-more-options');
                    }) 
                }            
                console.log('открыто поле для редактирования ' + getIdForUpdate)
            }
        }       
    })
}
// конец редактирования задач

// при переносе в выполненные
if (complited) {

    complited.addEventListener('drop', completedTask);

    function completedTask(e) {

        let itemId = e.dataTransfer.getData('id');
        let draggedElementId = document.getElementById(itemId).id;
        console.log ('API onondrop in complited ' + draggedElementId);

        requestInApiСompletedTask('task/', draggedElementId, 'true').then(response => response.text())
        .then(result => {

            updateComplited ();
            console.log(result)
        })
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

        requestInApiСompletedTask('task/', draggedElementId, 'false').then(response => response.text())
        .then(result => {

            updateComplited ();
            console.log(result)
        })
    }
}
// конец при переносе в невыполненные

// HTML вид вывода задач
function addTaskInner(descriptionText, idItem, parentTask) {
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

    parentTask.innerHTML += taskItems;
}
//конец HTML видa вывода задач