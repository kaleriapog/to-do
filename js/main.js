let fieldPassword = document.getElementById('password');
let pageTodo = document.querySelector('.page-to-do');
let blockUserName = document.querySelector('.user-info__name');
const editProfile = document.querySelector('.section-edit-profile');
const clickEditProfile = document.querySelector('.user-info__edit');
const body = document.querySelector('body');
const createTask = document.querySelector('.section-create-task');
const clickAddTask = document.querySelector('.tasks-lists__add-task');
const signIn = document.querySelector('.section-signin');
const clickSignIn = document.querySelector('.singin');
const reg = document.querySelector('.section-reg');
const clickReg = document.querySelector('.reg');
const crossEditProfile = document.querySelector('.cross-edit-profile');
const clickForOpenBlockUpdate = document.querySelector('.form__img-update');
const crossIconCloseMoreOptions = document.querySelectorAll('.cross');
const allListsItems = document.querySelectorAll('.tasks-lists__items');
const sendUpdateBlock = document.querySelector('.send-img__wrapp');
const closeUpdatePhoto = document.querySelector('.cross-update-photo');
const userInfo = document.querySelector('.user-info');
const userInfoMore = document.querySelector('.user-info__more');
const clickCrossCreateTask = document.querySelector('.cross-create-task');

// scripts for open user info
if (userInfo) {

    userInfo.addEventListener('click', openUserInfo);

    function openUserInfo() {

        userInfoMore.classList.toggle('user-info-open');
    }
}

// scripts for open edit profile
if (clickEditProfile !== null) {

    clickEditProfile.addEventListener('click', openBlockEditProfile);

    function openBlockEditProfile() {

        editProfile.classList.add('open-section');
        body.classList.add('hiden');
        fieldPassword.value = '';
    }
}

// script for close edit profile
if (editProfile) {

    crossEditProfile.addEventListener('click', closeBlockEditProfile);

    function closeBlockEditProfile() {
        
        editProfile.classList.remove('open-section');
        body.classList.remove('hiden');
        // showUserDetails();
    }
}
// scripts for open add new task
if (clickAddTask !== null) {

    clickAddTask.addEventListener('click', openCreateTask);

    function openCreateTask() {
        createTask.classList.add('open-section');
        body.classList.add('hiden');
    }
}

//scripts for close add new task
if (clickCrossCreateTask) {

    clickCrossCreateTask.addEventListener('click', closeCreateTask);

    function closeCreateTask () {

        createTask.classList.remove('open-section');
        body.classList.remove('hiden');
    }
}

// scripts for open sign in
if (clickSignIn) {

    clickSignIn.addEventListener('click', openSignIn);

    function openSignIn() {

        signIn.classList.add('open-section');

        if(reg) {

            reg.classList.remove('open-section');
        }    
    }
}

// scripts for open registration
if (clickReg) {

    clickReg.addEventListener('click', openReg);

    function openReg() {

        reg.classList.add('open-section');

        if (signIn) {
            
            signIn.classList.remove('open-section');
        }    
    }
}

if (allListsItems.length !== 0) { 

    // scripts for open more options
    allListsItems.forEach(function(item){

        item.addEventListener('click', openMoreOptions, true);

        function openMoreOptions(e) {
       
            if (e.target.matches('.icon-circles, .icon-circle')) {
                console.log('???????????????????? ?????????????? ??????????');
                e.target.closest('.tasks-lists__item').classList.add('open-more-options');
                // e.target.parentNode.classList.add('open-more-options');
            }

            if (e.target.matches('.cross, .plus-v, .plus-h')) {
                console.log('???????????????????? ?????????????? ??????????');
                e.target.closest('.tasks-lists__item').classList.remove('open-more-options');
            }
        }
    })
}

// scripts for open block update
if (clickForOpenBlockUpdate) {

    clickForOpenBlockUpdate.addEventListener('click', openBlockUpdate);

    function openBlockUpdate() {

        sendUpdateBlock.classList.add('send-img-visible');
    }

    closeUpdatePhoto.addEventListener('click', closeBlockUpdate);

    function closeBlockUpdate () {

        sendUpdateBlock.classList.remove('send-img-visible');
    }
}

// ???????????? ???? ???????????????? ???????????????? TO-DO.HTML ?????? ??????????????????????, ???????????????????????? ???? ????????
if (pageTodo) {

    if (!localStorage.getItem('userToken')) {

        console.log('?????? userToken')
        document.location.href = 'index.html';
    } 
    
    // ???????????????????? ?????? ?????? ???????????????? ????????????????
    if (localStorage.getItem('userName')) {

        blockUserName.innerHTML = `<span>Mr. ${localStorage.getItem('userName')}</span>`;
    }
}