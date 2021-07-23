/* Your code here */
let todo = {todoList:[], finishList: []}

const enterTodoList = (ev) => {
    if(ev.key === "Enter") addTodoList();
}

const loadFromStorage = () => {
    if(localStorage.todo){
        todo = JSON.parse(localStorage.todo)
    }
    if(todo.todoList[0] && todo.finishList[0]){
        document.getElementById("field").classList.add("divide-y")
        document.getElementById("field").classList.add("divide-red-400")
    } else {
        document.getElementById("field").classList.remove("divide-y")
        document.getElementById("field").classList.remove("divide-red-400")
    }
    document.getElementById("todoList").innerHTML = ""
    document.getElementById("finishList").innerHTML = ""
    for(let x in todo.todoList){
        loadTodoList(todo.todoList[x], x)
    }
    for(let x in todo.finishList){
        loadFinishList(todo.finishList[x])
    }
}

const saveToStorage = () => {
    localStorage.todo = JSON.stringify(todo)
}

const addTodoList = () => {
    const input = document.querySelector("input")
    if (input.value === ""){
        alert("Task cannot be empty")
        return
    }

    todo.todoList.push(input.value)
    input.value = ""
    loadTodoList(todo.todoList[todo.todoList.length-1],todo.todoList.length-1)
    saveToStorage()
    loadFromStorage()
}

const loadTodoList = (input, index) => {
    const todoList = document.createElement("div")
    const title = document.createElement("div")
    const button = document.createElement("div")
    const doneBtn = document.createElement("button")
    const deleteBtn = document.createElement("button")
    todoList.classList.add("flex")
    todoList.classList.add("justify-between")
    todoList.classList.add("h-14")
    todoList.classList.add("px-4")
    todoList.classList.add("py-2")
    title.classList.add("w-full")
    title.classList.add("self-center")
    title.classList.add("text-xl")
    button.classList.add("flex")
    button.classList.add("space-x-2")
    doneBtn.classList.add("text-white")
    doneBtn.classList.add("bg-green-600")
    doneBtn.classList.add("hover:bg-green-700")
    doneBtn.classList.add("rounded-xl")
    doneBtn.classList.add("focus:ring-2")
    doneBtn.classList.add("focus:ring-green-600")
    doneBtn.classList.add("ring-offset-2")
    doneBtn.classList.add("ring-offset-green-200")
    doneBtn.classList.add("p-2")
    deleteBtn.classList.add("text-white")
    deleteBtn.classList.add("bg-red-600")
    deleteBtn.classList.add("hover:bg-red-700")
    deleteBtn.classList.add("rounded-xl")
    deleteBtn.classList.add("focus:ring-2")
    deleteBtn.classList.add("focus:ring-red-600")
    deleteBtn.classList.add("ring-offset-2")
    deleteBtn.classList.add("ring-offset-red-200")
    deleteBtn.classList.add("p-2")
    doneBtn.style.visibility = "hidden"
    deleteBtn.style.visibility = "hidden"
    doneBtn.innerHTML = "Done"
    deleteBtn.innerHTML = "Delete"
    doneBtn.addEventListener("click", () => {
        todoList.remove()
        todo.todoList.splice(index, 1)
        todo.finishList.push(input)
        saveToStorage()
        loadFromStorage()
    })
    deleteBtn.addEventListener("click", () => {
        todoList.remove()
        todo.todoList.splice(index, 1)
        saveToStorage()
        loadFromStorage()
    })
    todoList.addEventListener("mouseenter", () => {
        deleteBtn.style.visibility = "visible"
        doneBtn.style.visibility = "visible"
    })
    todoList.addEventListener("mouseleave", () => {
        deleteBtn.style.visibility = "hidden"
        doneBtn.style.visibility = "hidden"
    })
    title.innerHTML = input
    button.append(doneBtn)
    button.append(deleteBtn)
    todoList.append(title)
    todoList.append(button)
    document.getElementById("todoList").prepend(todoList)
}

const loadFinishList = (input) => {
    const finishList = document.getElementById("finishList")
    const newMember = document.createElement("div")
    const title = document.createElement("div")
    newMember.classList.add("flex")
    newMember.classList.add("h-14")
    newMember.classList.add("px-4")
    newMember.classList.add("py-2")
    title.classList.add("w-full")
    title.classList.add("text-xl")
    title.classList.add("self-center")
    title.innerHTML = input
    title.style.textDecoration = "line-through"
    newMember.append(title)
    finishList.prepend(newMember)
}

loadFromStorage()