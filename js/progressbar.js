// let progressCompletedBlock = document.querySelector('.progress-сompleted');
// let progressCompletedPercent = document.querySelector('.progress-сompleted__percent');
// let tasksListsComplited = document.querySelector('.tasks-lists__complited');
// let tasksListsToDo = document.querySelector('.tasks-lists__to-do');

// //  дубликат, переделать
// let clickAddTask = document.querySelector('.js-button-add-task');
// const toDo = document.querySelector('.js-to-do');
// const complited = document.querySelector('.js-complited');
// let wrappListToDo = document.querySelector('.tasks-lists-wrapp');

// // конец дубликат, переделать

// // функция для обновления выполненых дел
// function updateComplited () {

//     if (progressCompletedBlock) {

//         let progressBar = new ProgressBar.Circle('#progress', {
//             color: '#48a868',
//             strokeWidth: 14,
//             duration: 2000, // milliseconds
//             easing: 'easeInOut'
//         });

//         // дубликат переделать
//         let tokenLogUser = localStorage.getItem('userToken');
//         // конец дубликат переделать

//         let myHeaders = new Headers();

//         myHeaders.append("Authorization", `Bearer ${tokenLogUser}`);
//         myHeaders.append("Content-Type", "application/json");

//         let requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//         }; 

//         fetch("https://api-nodejs-todolist.herokuapp.com/task", requestOptions)
//         .then(response => response.text())
//         .then(result => {

//             let sumAllTask = JSON.parse(result).count;
//             console.log('всего задач ' + sumAllTask);
            
//             let newArray = JSON.parse(result).data.filter(function (el) {
//                 return el.completed == true; 
//             });

//             let sumCompletedTask = newArray.length;
//             console.log('всего задач выполн ' + sumCompletedTask);

//             let percentageOfCompletion = (100 * sumCompletedTask) / sumAllTask / 100; 

//             progressBar.animate(percentageOfCompletion); // percent 

//             let percentageOfCompletionText = (percentageOfCompletion * 100) + ''; // преобразуем в строку, чтобы использовать .split('.')[0]
            
//             progressCompletedPercent.innerHTML = percentageOfCompletionText.split('.')[0] + ' %'; // .split('.')[0] обрезать до точки  
            
              
//             // // увеличиваем при клике на добавить количество дел на 1.
//             // let percentageOfCompletionUpdate = ((100 * (sumCompletedTask)) / (sumAllTask + 1) / 100);
//             // let percentageOfCompletionUpdateText = (percentageOfCompletionUpdate * 100) + '';
//             // progressBar.animate(percentageOfCompletionUpdate);

//             // if (percentageOfCompletionUpdateText.slice(0, 1) == 0 ) { // если процент выполненых задачи <0                    

//             //     progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.slice(0, 4) + ' %';

//             // } else {

//             //     progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.split('.')[0] + ' %';
//             // }                
//             // конец update при добавлении дела, точнее при клике на добавить дело  
            
//             // // update при удалении дела
//             // // получаем список кнопок удалить
           
//             // let buttonDeleteForComplited = document.querySelectorAll('.js-delete-task');

//             // buttonDeleteForComplited.forEach(function(elem){

//             //     elem.addEventListener('click', updateComplitedOnClickDeleteTask)                   
//             // }) 

//             // function updateComplitedOnClickDeleteTask (e) {

//             //     // если удаление было в не выполненых задачах
//             //     if (e.target.parentNode.parentNode.parentNode.parentNode.classList.contains('js-to-do')) {

//             //         // уменьшать количество общих дел на 1 и обновлять complited
//             //         let percentageOfCompletionUpdate = ((100 * (sumCompletedTask)) / (sumAllTask - 1) / 100);
//             //         let percentageOfCompletionUpdateText = (percentageOfCompletionUpdate * 100) + '';

//             //         progressBar.animate(percentageOfCompletionUpdate);

//             //         if (percentageOfCompletionUpdateText.slice(0, 1) == 0 ) { // если процент выполненых задачи <0                    

//             //             progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.slice(0, 4) + ' %';

//             //         } else {

//             //             progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.split('.')[0] + ' %';
//             //         }    
                        
//             //     } else {

//             //         // уменьшать количество выполн дел на 1 и обновлять complited
//             //         let percentageOfCompletionUpdate = ((100 * (sumCompletedTask -1)) / (sumAllTask) / 100);
//             //         let percentageOfCompletionUpdateText = (percentageOfCompletionUpdate * 100) + '';

//             //         progressBar.animate(percentageOfCompletionUpdate);

//             //         if (percentageOfCompletionUpdateText.slice(0, 1) == 0 ) { // если процент выполненых задачи <0                    

//             //             progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.slice(0, 4) + ' %';

//             //         } else {

//             //             progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.split('.')[0] + ' %';
//             //         }  
//             //     }         
//             // }      
                
//             // // конец update при удалении дела

//             // // updete complited при drag drop 
//             // toDo.addEventListener('drop', updateNotComplitedOnDrop);
//             // complited.addEventListener('drop', updateComplitedOnDrop);

//             // function updateComplitedOnDrop () {
//             //     // увеличивать количество выполн дел и обновлять complited
//             //     let percentageOfCompletionUpdate = ((100 * (sumCompletedTask + 1)) / (sumAllTask) / 100);
//             //     let percentageOfCompletionUpdateText = (percentageOfCompletionUpdate * 100) + '';

//             //     progressBar.animate(percentageOfCompletionUpdate);

//             //     if (percentageOfCompletionUpdateText.slice(0, 1) == 0 ) { // если процент выполненых задачи <0                    

//             //         progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.slice(0, 4) + ' %';

//             //     } else {

//             //         progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.split('.')[0] + ' %';
//             //     } 
//             // }

//             // function updateNotComplitedOnDrop () {
//             //     // увеличивать количество выполн дел и обновлять complited
//             //     let percentageOfCompletionUpdate = ((100 * (sumCompletedTask - 1)) / (sumAllTask) / 100);
//             //     let percentageOfCompletionUpdateText = (percentageOfCompletionUpdate * 100) + '';

//             //     progressBar.animate(percentageOfCompletionUpdate);

//             //     if (percentageOfCompletionUpdateText.slice(0, 1) == 0 ) { // если процент выполненых задачи <0                    

//             //         progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.slice(0, 4) + ' %';

//             //     } else {

//             //         progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.split('.')[0] + ' %';
//             //     } 
//             // }

//             // // конец updete complited при drag drop 

//         })
//         .catch(error => console.log('error', error));    
//     }
// }

// updateComplited ();

// //  функция для обновления выполнености при клике на добавить задачу
// // function updateComplitedOnAddTask () {

// //     if (progressCompletedBlock) {

// //         let progressBar = new ProgressBar.Circle('#progress', {
// //             color: '#48a868',
// //             strokeWidth: 14,
// //             duration: 2000, // milliseconds
// //             easing: 'easeInOut'
// //         });

// //         // дубликат переделать
// //         let tokenLogUser = localStorage.getItem('userToken');
// //         // конец дубликат переделать

// //         let myHeaders = new Headers();

// //         myHeaders.append("Authorization", `Bearer ${tokenLogUser}`);
// //         myHeaders.append("Content-Type", "application/json");

// //         let requestOptions = {
// //         method: 'GET',
// //         headers: myHeaders,
// //         redirect: 'follow'
// //         }; 

// //         fetch("https://api-nodejs-todolist.herokuapp.com/task", requestOptions)
// //         .then(response => response.text())
// //         .then(result => {

// //             let sumAllTask = JSON.parse(result).count;
// //             console.log('всего задач ' + sumAllTask);
            
// //             let newArray = JSON.parse(result).data.filter(function (el) {
// //                 return el.completed == true; 
// //             });

// //             let sumCompletedTask = newArray.length;
// //             console.log('всего задач выполн ' + sumCompletedTask);  
  
// //             // увеличиваем при клике на добавить количество дел на 1.
// //             let percentageOfCompletionUpdate = ((100 * (sumCompletedTask)) / (sumAllTask + 1) / 100);
// //             let percentageOfCompletionUpdateText = (percentageOfCompletionUpdate * 100) + '';
// //             progressBar.animate(percentageOfCompletionUpdate);

// //             if (percentageOfCompletionUpdateText.slice(0, 1) == 0 ) { // если процент выполненых задачи <0                    

// //                 progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.slice(0, 4) + ' %';

// //             } else {

// //                 progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.split('.')[0] + ' %';
// //             }                
// //             // конец update при добавлении дела, точнее при клике на добавить дело   
// //         })
// //         .catch(error => console.log('error', error));    
// //     }
// // }
// //  конец функции для обновления выполнености при клике на добавить задачу

// // обновление выполнености при клике на добавить задачу
// clickAddTask.addEventListener('click', () => {

//     let progressBlock = document.querySelector('.progress').lastChild; // удалить прошлое свг с данными о выполнении и записать новое.
//     progressBlock.remove()
//     // updateComplitedOnAddTask(); 
//     updateComplited ();  
// })
// // конец обновление выполнености при клике на добавить задачу

// // обновление выполнености при клике на удалить задачу из комплитед
// function updateCompletedOnDelete () {

//     if (progressCompletedBlock) {

//         let progressBar = new ProgressBar.Circle('#progress', {
//             color: '#48a868',
//             strokeWidth: 14,
//             duration: 2000, // milliseconds
//             easing: 'easeInOut'
//         });

//         // дубликат переделать
//         let tokenLogUser = localStorage.getItem('userToken');
//         // конец дубликат переделать

//         let myHeaders = new Headers();

//         myHeaders.append("Authorization", `Bearer ${tokenLogUser}`);
//         myHeaders.append("Content-Type", "application/json");

//         let requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//         }; 

//         fetch("https://api-nodejs-todolist.herokuapp.com/task", requestOptions)
//         .then(response => response.text())
//         .then(result => {

//             let sumAllTask = JSON.parse(result).count;
//             console.log('всего задач ' + sumAllTask);
            
//             let newArray = JSON.parse(result).data.filter(function (el) {
//                 return el.completed == true; 
//             });

//             let sumCompletedTask = newArray.length;
//             console.log('всего задач выполн ' + sumCompletedTask); 

//             // уменьшать количество выполн дел на 1 и обновлять complited
//             let percentageOfCompletionUpdate = ((100 * (sumCompletedTask - 1)) / (sumAllTask - 1) / 100);
//             let percentageOfCompletionUpdateText = (percentageOfCompletionUpdate * 100) + '';        
                        
//             if (percentageOfCompletionUpdateText.slice(0, 1) == 0 ) { // если процент выполненых задачи <0                    
            
//                 progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.slice(0, 4) + ' %';
            
//             } else {
            
//                 progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.split('.')[0] + ' %';
//             }     
            
//             progressBar.animate(percentageOfCompletionUpdate);
//             // конец update при удалении дела

//         })
//         .catch(error => console.log('error', error));    
//     }
// }
// // конец обновление выполнености при клике на удалить задачу из комплитед

// //  обновление при удалении задач из комплитед
// tasksListsComplited.addEventListener('click', (e) => {
    
//     if (e.target.classList.contains('js-delete-task')) {
//         console.log('gjgfkf')
//         let progressBlock = document.querySelector('.progress').lastChild; // удалить прошлое свг с данными о выполнении и записать новое.
//         progressBlock.remove(); 
//         // updateCompletedOnDelete ();  
//         updateComplited (); 
//     } 
// }) 
// // конец обновление при удалении задач

// // обновление выполнености при клике на удалить задачу из to do
// function updateCompletedOnDeleteinBlockToDo () {

//     if (progressCompletedBlock) {

//         let progressBar = new ProgressBar.Circle('#progress', {
//             color: '#48a868',
//             strokeWidth: 14,
//             duration: 2000, // milliseconds
//             easing: 'easeInOut'
//         });

//         // дубликат переделать
//         let tokenLogUser = localStorage.getItem('userToken');
//         // конец дубликат переделать

//         let myHeaders = new Headers();

//         myHeaders.append("Authorization", `Bearer ${tokenLogUser}`);
//         myHeaders.append("Content-Type", "application/json");

//         let requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//         }; 

//         fetch("https://api-nodejs-todolist.herokuapp.com/task", requestOptions)
//         .then(response => response.text())
//         .then(result => {

//             let sumAllTask = JSON.parse(result).count;
//             console.log('всего задач ' + sumAllTask);
            
//             let newArray = JSON.parse(result).data.filter(function (el) {
//                 return el.completed == true; 
//             });

//             let sumCompletedTask = newArray.length;
//             console.log('всего задач выполн ' + sumCompletedTask); 

//             // уменьшать количество выполн дел на 1 и обновлять complited
//             let percentageOfCompletionUpdate = ((100 * (sumCompletedTask)) / (sumAllTask-1) / 100);
//             let percentageOfCompletionUpdateText = (percentageOfCompletionUpdate * 100) + '';
            
//             progressBar.animate(percentageOfCompletionUpdate);
            
//            // уменьшать количество выполн дел на 1 и обновлять complited
//             if (percentageOfCompletionUpdateText.slice(0, 1) == 0 ) { // если процент выполненых задачи <0                    

//                 progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.slice(0, 4) + ' %';

//             } else {

//                 progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.split('.')[0] + ' %';
//             }                        
//             // конец update при удалении дела

//         })
//         .catch(error => console.log('error', error));    
//     }
// }
// // конец обновление выполнености при клике на удалить задачу из to do

// //  обновление при удалении задач из to do
// tasksListsToDo.addEventListener('click', (e) => {
    
//     if (e.target.classList.contains('js-delete-task')) {
//         console.log('gjgfkf')
//         let progressBlock = document.querySelector('.progress').lastChild; // удалить прошлое свг с данными о выполнении и записать новое.
//         progressBlock.remove(); 
//         // updateComplitedOnDelete ();
//         updateComplited ();  
//     } 
// }) 
// // конец обновление при удалении задач из to do

// function updateCompletedonDropToDo () {

//     if (progressCompletedBlock) {

//         let progressBar = new ProgressBar.Circle('#progress', {
//             color: '#48a868',
//             strokeWidth: 14,
//             duration: 2000, // milliseconds
//             easing: 'easeInOut'
//         });

//         // дубликат переделать
//         let tokenLogUser = localStorage.getItem('userToken');
//         // конец дубликат переделать

//         let myHeaders = new Headers();

//         myHeaders.append("Authorization", `Bearer ${tokenLogUser}`);
//         myHeaders.append("Content-Type", "application/json");

//         let requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//         }; 

//         fetch("https://api-nodejs-todolist.herokuapp.com/task", requestOptions)
//         .then(response => response.text())
//         .then(result => {

//             let sumAllTask = JSON.parse(result).count;
//             console.log('всего задач ' + sumAllTask);
            
//             let newArray = JSON.parse(result).data.filter(function (el) {
//                 return el.completed == true; 
//             });

//             let sumCompletedTask = newArray.length;
//             console.log('всего задач выполн ' + sumCompletedTask);

//             // // updete complited при drag drop 
//             toDo.addEventListener('drop', updateCompletedOnDrop);
           
//             function updateCompletedOnDrop () {
//                 // увеличивать количество выполн дел и обновлять complited
//                 let percentageOfCompletionUpdate = ((100 * (sumCompletedTask + 1)) / (sumAllTask) / 100);
//                 let percentageOfCompletionUpdateText = (percentageOfCompletionUpdate * 100) + '';

//                 progressBar.animate(percentageOfCompletionUpdate);

//                 if (percentageOfCompletionUpdateText.slice(0, 1) == 0 ) { // если процент выполненых задачи <0                    

//                     progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.slice(0, 4) + ' %';

//                 } else {

//                     progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.split('.')[0] + ' %';
//                 } 
//             }

//             // // конец updete complited при drag drop 

//         })
//         .catch(error => console.log('error', error));    
//     }
// }

// function updateCompletedonDropCompleted () {

//     if (progressCompletedBlock) {

//         let progressBar = new ProgressBar.Circle('#progress', {
//             color: '#48a868',
//             strokeWidth: 14,
//             duration: 2000, // milliseconds
//             easing: 'easeInOut'
//         });

//         // дубликат переделать
//         let tokenLogUser = localStorage.getItem('userToken');
//         // конец дубликат переделать

//         let myHeaders = new Headers();

//         myHeaders.append("Authorization", `Bearer ${tokenLogUser}`);
//         myHeaders.append("Content-Type", "application/json");

//         let requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//         }; 

//         fetch("https://api-nodejs-todolist.herokuapp.com/task", requestOptions)
//         .then(response => response.text())
//         .then(result => {

//             let sumAllTask = JSON.parse(result).count;
//             console.log('всего задач ' + sumAllTask);
            
//             let newArray = JSON.parse(result).data.filter(function (el) {
//                 return el.completed == true; 
//             });

//             let sumCompletedTask = newArray.length;
//             console.log('всего задач выполн ' + sumCompletedTask);

//             // // updete complited при drag drop
//             complited.addEventListener('drop', updateNotCompletedOnDrop);

//             function updateNotCompletedOnDrop () {
//                 // увеличивать количество выполн дел и обновлять complited
//                 let percentageOfCompletionUpdate = ((100 * (sumCompletedTask - 1)) / (sumAllTask) / 100);
//                 let percentageOfCompletionUpdateText = (percentageOfCompletionUpdate * 100) + '';

//                 progressBar.animate(percentageOfCompletionUpdate);

//                 if (percentageOfCompletionUpdateText.slice(0, 1) == 0 ) { // если процент выполненых задачи <0                    

//                     progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.slice(0, 4) + ' %';

//                 } else {

//                     progressCompletedPercent.innerHTML = percentageOfCompletionUpdateText.split('.')[0] + ' %';
//                 } 
//             }

//             // // конец updete complited при drag drop 

//         })
//         .catch(error => console.log('error', error));    
//     }
// }


// toDo.addEventListener('dragstart', () => {
//     let progressBlock = document.querySelector('.progress').lastChild; // удалить прошлое свг с данными о выполнении и записать новое.
//         progressBlock.remove(); 
//         // updateComplitedOnDelete ();
//         // updateCompletedonDropToDo ();
//         updateComplited ()
// });

// complited.addEventListener('dragstart', () => {
//     let progressBlock = document.querySelector('.progress').lastChild; // удалить прошлое свг с данными о выполнении и записать новое.
//         progressBlock.remove(); 
//         // updateComplitedOnDelete ();
//         // updateCompletedonDropCompleted ();
//         updateComplited ()
// })        