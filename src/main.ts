import './style.css' 
interface ToDo {
  title:string;
  isCompleted : boolean;
  readonly id: string;
}
const todos:ToDo[] = [];

const todosContainer = document.querySelector(".todoContainer") as HTMLDivElement;

const todoInput = <HTMLInputElement>document.getElementsByName("title")[0];

const myForm = <HTMLFormElement>document.getElementById("myForm");

myForm.onsubmit=(e: SubmitEvent)=> {
  e.preventDefault();
  const todo:ToDo={
    title:todoInput.value,
    isCompleted:false,
    id: String(Math.random()*1000),
  }
  todos.push(todo);
  todoInput.value= "";
  renderTodo (todos);
};
const generateTodoItem=(title: string  , isCompleted: boolean , id: string)=>{
  const todo:HTMLDivElement = document.createElement("div");
  todo.className = "todo";

  const checkBox : HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type","checkbox");
  checkBox.className="isCompleted";
  checkBox.checked = isCompleted;


  const paragraph : HTMLParagraphElement = document.createElement("p");
  paragraph.innerText=title;
  paragraph.className = isCompleted ?"textCut":"";
  const btn : HTMLButtonElement = document.createElement("button");
  btn.innerText="X";
  btn.className = "deleteBtn";
  btn.onclick=()=>{
    deleteTodo(id);
  }

  checkBox.onchange=()=>{
    paragraph.className = checkBox.checked?"textCut":"";
    todos.find((item) => {
      if (item.id === id) item.isCompleted = checkBox.checked;
    })
  }

  todo.append(checkBox,paragraph,btn);
  todosContainer.append(todo);

};


const deleteTodo = (id:string) =>{
  const idx = todos.findIndex((item)=> item.id === id);
  todos.splice(idx,1);
  renderTodo(todos);
}

const renderTodo = (todos : ToDo[]) => {
  todosContainer.innerText="";
  todos.forEach(item => {
    generateTodoItem(item.title,item.isCompleted,item.id);
  } )
}
