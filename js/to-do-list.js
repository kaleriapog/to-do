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
123123123123
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
            <div class="more-options js-options">
                <span>
                    <span class="more-options__elem">Edit</span>
                    <span class="more-options__elem js-delete-task">Delete</span>
                </span>
                <span class="plus cross">
                    <span class="plus-v"></span>
                    <span class="plus-h"></span>
                </span>
            </div>
        </div>`;

        parentItemsTask.innerHTML += taskItems
    }

    // конец добавать задачу

    // вывести все задачи

    function getAllTask() {

        let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("https://api-nodejs-todolist.herokuapp.com/task", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(JSON.parse(result))
                JSON.parse(result).data.forEach(function(elem){ //elem это мой елемнт на который я вешаю форич
                    addTaskInner(elem.description)
                })
            })
        .catch(error => console.log('error', error));
    }
    getAllTask();

    // удаление задач по айди
    let requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
    };


    
    // let idDelete = '61c5d146a891c40017f8f048';
    
    // const allListsItems = document.querySelectorAll('.tasks-lists__items')

    // allListsItems.forEach(function(item){

    //     item.addEventListener('click', openMoreOptions, true);

    //     function openMoreOptions(e) {

    //         const iconCirclesOpenMoreOptions = document.querySelectorAll('.icon-circles');

    //         iconCirclesOpenMoreOptions.forEach(function(item){
    //             item.addEventListener('click', openMoreOptions);
    //             console.log(item.target)
        
    //             function openMoreOptions(e) {
    //                 let deleteTask = document.querySelectorAll('.js-delete-task');
    //                 console.log(e.target)
    //             }
    //         })
    //     }
    // })
 

   


    // allTask.forEach(function(item){
    //     item.addEventListener('click')
    // })

    // fetch(`https://api-nodejs-todolist.herokuapp.com/task/${idDelete}`, requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));

}