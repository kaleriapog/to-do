
const editProfile = document.querySelector('.section-edit-profile');
const clickEditProfile = document.querySelector('.user-info__edit');
const body = document.querySelector('body');
const createTask = document.querySelector('.section-create-task');
const clickAddTask = document.querySelector('.tasks-lists__add-task');
const signIn = document.querySelector('.section-signin');
const clickSignIn = document.querySelector('.another-choice');

// scripts for open edit profile
  
clickEditProfile.addEventListener('click', openEditProfile);

function openEditProfile() {
    editProfile.classList.add('open-section');
    body.classList.add('hiden');
}

// scripts for open add new task

clickAddTask.addEventListener('click', openCreateTask);

function openCreateTask() {
    createTask.classList.add('open-section');
    body.classList.add('hiden');
}

// scripts for open sign in

// clickSignIn.addEventListener('click', openSignIn);

// function openSignIn() {
//     signIn.classList.add('open-section');
// }