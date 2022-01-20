let progressCompletedBlock = document.querySelector('.progress-сompleted');

if (progressCompletedBlock) {

    // дубликат переделать
    let tokenLogUser = localStorage.getItem('userToken');
    // конец дубликат переделать

    let myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${tokenLogUser}`);
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://api-nodejs-todolist.herokuapp.com/task", requestOptions)
    .then(response => response.text())
    .then(result => {

        let sumAllTask = JSON.parse(result).count;
        console.log(sumAllTask);

        let sumCompletedTask = JSON.parse(result);
        let newArray = sumCompletedTask.filter(function (el) {
            return el.completed = true; 
        });
        console.log(newArray);

    })
    .catch(error => console.log('error', error));

    let progressBar = new ProgressBar.Circle('#progress', {
        color: '#48a868',
        strokeWidth: 14,
        duration: 2000, // milliseconds
        easing: 'easeInOut'
    });

    window.onload = function onLoad() {

       progressBar.animate(0.59); // percent
    };
}

