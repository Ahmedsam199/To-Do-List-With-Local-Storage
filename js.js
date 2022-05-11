const todos=document.querySelector('.ToDo');
const todosbut=document.querySelector('.todo-but');
const todoList=document.querySelector('.todoList');
const todofilter=document.getElementById('todo-filter');
document.addEventListener("DOMContentLoaded", getfromlocal);
todofilter.addEventListener('click',filter);

todosbut.addEventListener('click',add);
todoList.addEventListener('click',trash);

// Creating Div 
function add(event){
  event.preventDefault(); 

const todoDiv=document.createElement('div');
todoDiv.classList.add('todoDiv');
const newdo=document.createElement('li');
newdo.innerText=todos.value;
newdo.classList.add('item');
todoDiv.appendChild(newdo);
// save todos
saveLocalTodos(todos.value);
const comp=document.createElement('button');
comp.classList.add('compbut');
comp.innerHTML='<i class="fas fa-check"></i>';
comp.addEventListener('click',comp);

const trash=document.createElement('button');


trash.innerHTML='<i class="fas fa-trash"></i>';
trash.classList.add('trashbut');
todoDiv.appendChild(trash);
todoDiv.appendChild(comp);

todoList.appendChild(todoDiv);
todos.value="";

}
function trash(e){
   const item =e.target;
   if(item.className  === "trashbut"){
       const todo = item.parentElement;
       todo.classList.add("fall");
       removeLocalTodos(todo);
       todo.addEventListener('transitionend',function(){
        
        todo.remove();
       });
   }

if(item.className ==="compbut"){
    const todo = item.parentElement;
    todo.classList.toggle("Completed"); 
}
// filtering
}
function filter(e){
    const todos=todoList.childNodes;
    const todoinp=document.querySelector('.ToDo')
    todos.forEach(function(todo) {
        switch (e.target.value) {
          case "All":
            todo.style.display = "flex";
            break;
          case "completed":
            if (todo.classList.contains("Completed")) {
              todo.style.display = "flex";
             todosbut.classList.toggle("disable");
            } else {
              todo.style.display = "none";
              
            }
            break;
          case "uncompleted":
            if (!todo.classList.contains("Completed")) {
              todo.style.display = "flex";
            } else {
              todo.style.display = "none";
              
            }
        }
      });

}
// Save in local Storrage
function saveLocalTodos(todo){
let todos;
if(localStorage.getItem("todos") === null){
  todos=[];
}else{
todos=JSON.parse(localStorage.getItem("todos"));

}
todos.push(todo);
localStorage.setItem("todos",JSON.stringify(todos));
}

// Delete From Local Storage
function getfromlocal(){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos=[];
  }else{
  todos=JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo){
    
    const todoDiv=document.createElement('div');
todoDiv.classList.add('todoDiv');
const newdo=document.createElement('li');
newdo.innerText=todo;
newdo.classList.add('item');
todoDiv.appendChild(newdo);
// save todos

const comp=document.createElement('button');
comp.classList.add('compbut');
comp.innerHTML='<i class="fas fa-check"></i>';
comp.addEventListener('click',comp);

const trash=document.createElement('button');


trash.innerHTML='<i class="fas fa-trash"></i>';
trash.classList.add('trashbut');
todoDiv.appendChild(trash);
todoDiv.appendChild(comp);

todoList.appendChild(todoDiv);
  })  
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}