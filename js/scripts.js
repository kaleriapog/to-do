// scripts for Drag and Drop to do tasks

const toDo = document.querySelector('.js-to-do');
const complited = document.querySelector('.js-complited');
const taskToDo = document.querySelector('.js-task');

console.log (toDo)
console.log (taskToDo)


// reset
toDo.ondragover = allDrop; 
complited.ondragover = allDrop;

function allDrop(e) {
    e.preventDefault();
}

// при перетаскивании 
taskToDo.ondragstart = drag;

function drag (e){
    e.dataTransfer.setData('id', e.target.id);
    //  скрыть перетискиваемый элемент во время скрытия с того места где он был 
    setTimeout(() =>{
        this.classList.add('hide');
    }, 0) 
    console.log ('ondragstart')

}

//  для зоны куда переносят 
toDo.ondrop = drop;
complited.ondrop = drop;
  
function drop(e) {
    taskToDo.classList.remove('hide'); //  показать перетискиваемый элемент после переноса
    let itemId = e.dataTransfer.getData('id'); // создаем айди для переносимого элемента
    e.target.append(document.getElementById(itemId));  // добавляем переносимый элемент по айди
    console.log ('onondrop')
}