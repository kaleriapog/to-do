import {requestInApiGetAllTasks} from './API.js'

let pageToDo = document.querySelector('.page-to-do');
let progressCompletedPercent = document.querySelector('.progress-сompleted__percent');
let tokenLogUser = localStorage.getItem('userToken');

//  ProgressBar.Circle инициализация
let progressBar = new ProgressBar.Circle('#progress', {
    color: '#48a868',
    strokeWidth: 14,
    duration: 2000, // milliseconds
    easing: 'easeInOut'
});

// функция для обновления выполненых дел
export function updateComplited () {

    requestInApiGetAllTasks('task', tokenLogUser).then(response => response.json())
    .then(result => {
        let sumAllTask = result.count;
        console.log('всего задач ' + sumAllTask);
                    
        let newArray = result.data.filter(function (el) {
            return el.completed == true; 
        });
        
        let sumCompletedTask = newArray.length;
        console.log('всего задач выполн ' + sumCompletedTask);

        let percentageOfCompletion = (100 * sumCompletedTask) / sumAllTask / 100; 
        let percentageOfCompletionText = (percentageOfCompletion * 100) + ''; // преобразуем в строку, чтобы использовать .split('.')[0]
        console.log(percentageOfCompletion*100)
        progressBar.animate(percentageOfCompletion); // percent           

        if ( (percentageOfCompletion*100) <= 0 ) {

            progressCompletedPercent.innerHTML = percentageOfCompletionText.slice(0, 4) + ' %';

        } if ( (percentageOfCompletion*100) > 0 && (percentageOfCompletion*100) < 10)  {                    
            
            progressCompletedPercent.innerHTML = percentageOfCompletionText.slice(0, 3) + ' %';

        } if ( (percentageOfCompletion*100) >= 10 ) {

            progressCompletedPercent.innerHTML = percentageOfCompletionText.split('.')[0] + ' %'; // .split('.')[0] обрезать до точки
        }  

    });  
} 

updateComplited ();
