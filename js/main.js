
const editProfile = document.querySelector('.section-edit-profile');
const clickEditProfile = document.querySelector('.user-info__edit');
const body = document.querySelector('body');
const createTask = document.querySelector('.section-create-task');
const clickAddTask = document.querySelector('.tasks-lists__add-task');
const signIn = document.querySelector('.section-signin');
const clickSignIn = document.querySelector('.singin');
const reg = document.querySelector('.section-reg');
const clickReg = document.querySelector('.reg');

// scripts for open edit profile

if(clickEditProfile !== null) {

    clickEditProfile.addEventListener('click', openEditProfile);

    function openEditProfile() {
        editProfile.classList.add('open-section');
        body.classList.add('hiden');
    }

}

// scripts for open add new task

if(clickAddTask !== null) {

    clickAddTask.addEventListener('click', openCreateTask);

    function openCreateTask() {
        createTask.classList.add('open-section');
        body.classList.add('hiden');
    }

}

// scripts for open sign in
if(clickSignIn !== null) {

    clickSignIn.addEventListener('click', openSignIn);

    function openSignIn() {
        signIn.classList.add('open-section');
        if(reg != null) {
            reg.classList.remove('open-section');
        }    
    }
}
// scripts for open registration
if(clickReg !== null) {

    clickReg.addEventListener('click', openReg);

    function openReg() {
        reg.classList.add('open-section');
        if(signIn != null) {
            signIn.classList.remove('open-section');
        }    
    }
}