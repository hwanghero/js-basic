const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    // 새로운 배열에 값을 넣는거같음
    // toDo에 저장되어있는 id하고 li의 id하고 다를경우 뺀 상태의 배열임
    // 여기서 신기한점은 filter라는 메소드하나로 toDos의 값을 나열한다는점
    // filter가 for each 역할을 한다는점
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    // 그럼 이제 뺄거 다 뺀 배열 상태의 claenToDos의 값을 toDos에 덮어씌어줌
    toDos = cleanToDos;
    // 그리고 저장.
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    if(text !== ""){
        const li = document.createElement("li");
        const delBtn = document.createElement("button");
        const span = document.createElement("span");
        const newId = toDos.length + 1;
        delBtn.innerText = "X";
        delBtn.addEventListener("click", deleteToDo);
        span.innerText = text;
        li.appendChild(delBtn);
        li.appendChild(span);
        li.id = newId;
        toDoList.appendChild(li);
        const toDoObj = {
            text: text,
            id: newId
        };
        toDos.push(toDoObj);
        saveToDos();
    }
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();