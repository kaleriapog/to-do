// scripts for Drag and Drop to do tasks
const toDo = document.querySelector('.js-to-do');
const complited = document.querySelector('.js-complited');
const taskToDo = document.querySelectorAll('.js-task');

if(toDo !== null) {
  // reset
  toDo.addEventListener('dragover', allDrop); 
  complited.addEventListener('dragover', allDrop); 

  function allDrop(e) {
    e.preventDefault();
  }

  document.addEventListener('dragstart', drag);

  function drag (e){
    if (e.target.closest('.js-task')) {
      e.dataTransfer.setData('id', e.target.id);
      //  скрыть перетискиваемый элемент во время скрытия с того места где он был 
      e.target.classList.add('hide'); 
      console.log ('ondragstart')
    }
  }

  //  при наведении на блок куда можно поместить срабатывает один раз
  toDo.addEventListener('dragenter', dragEnter)
  complited.addEventListener('dragenter', dragEnter)

  function dragEnter(e) {    
    this.classList.add('hovertrue');
    console.log ('dragEnter');
  }

  //  при отведении от блок куда можно поместить срабатывает один раз
  toDo.addEventListener('dragleave', dragLeave)
  complited.addEventListener('dragleave', dragLeave)

    
  function dragLeave(e) {
    this.classList.remove('hovertrue');
    console.log ('dragLeave');
  }

  //  для зоны куда переносят 
  toDo.addEventListener('drop', drop);
  complited.addEventListener('drop', drop);
    
  function drop(e) {
    let itemId = e.dataTransfer.getData('id'); // создаем айди для переносимого элемента
    let draggedElement = document.getElementById(itemId);
    this.classList.remove('hovertrue');
    draggedElement.classList.remove('hide'); //  показать перетискиваемый элемент после переноса
    e.target.append(draggedElement);  // добавляем переносимый элемент по айди
    console.log ('onondrop ' + draggedElement.id);
  } 
}

