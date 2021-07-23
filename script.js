/* Your code here */
let todo = { todoList: [], finishList: [] }

const enterTodoList = (ev) => {
    if (ev.key === "Enter") addTodoList();
}

const loadFromStorage = () => {
    if (localStorage.todo) {
        todo = JSON.parse(localStorage.todo)
    }
    if (todo.todoList[0] && todo.finishList[0]) {
        document.getElementById("field").classList.add("divide-y")
        document.getElementById("field").classList.add("divide-red-400")
    } else {
        document.getElementById("field").classList.remove("divide-y")
        document.getElementById("field").classList.remove("divide-red-400")
    }
    document.getElementById("todoList").innerHTML = ""
    document.getElementById("finishList").innerHTML = ""
    let lastTodoList
    let lastFinishList
    for (let x in todo.todoList) {
        lastTodoList = loadTodoList(todo.todoList[x], x)
    }
    for (let x in todo.finishList) {
        lastFinishList = loadFinishList(todo.finishList[x])
    }
    return { lastFinishList, lastTodoList }
}

const saveToStorage = () => {
    localStorage.todo = JSON.stringify(todo)
}

const addTodoList = () => {
    const input = document.querySelector("input")
    if (input.value === "") {
        alert("Task cannot be empty")
        return
    }
    todo.todoList.push(input.value)
    input.value = ""
    loadTodoList(todo.todoList[todo.todoList.length - 1], todo.todoList.length - 1)
    saveToStorage()
    const temp = loadFromStorage()
    temp.lastTodoList.classList.add("opacity-0")
    temp.lastTodoList.classList.add("transform")
    temp.lastTodoList.classList.add("duration-1000")
    setTimeout(function () {
        temp.lastTodoList.classList.remove("opacity-0")
    }, 100);
}

const smoothclear = () => {
    localStorage.clear()
    location.reload()
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
    doneBtn.classList.add("transform")
    doneBtn.classList.add("duration-500")
    doneBtn.classList.add("hover:scale-125")
    doneBtn.classList.add("invisible")
    doneBtn.classList.add("opacity-0")
    doneBtn.classList.add("shadow-md")
    deleteBtn.classList.add("text-white")
    deleteBtn.classList.add("bg-red-600")
    deleteBtn.classList.add("hover:bg-red-700")
    deleteBtn.classList.add("rounded-xl")
    deleteBtn.classList.add("focus:ring-2")
    deleteBtn.classList.add("focus:ring-red-600")
    deleteBtn.classList.add("ring-offset-2")
    deleteBtn.classList.add("ring-offset-red-200")
    deleteBtn.classList.add("p-2")
    deleteBtn.classList.add("transform")
    deleteBtn.classList.add("duration-500")
    deleteBtn.classList.add("hover:scale-125")
    deleteBtn.classList.add("invisible")
    deleteBtn.classList.add("opacity-0")
    deleteBtn.classList.add("shadow-md")
    doneBtn.innerHTML = "Done"
    deleteBtn.innerHTML = "Delete"
    doneBtn.addEventListener("click", () => {
        deleteBtn.disabled = true
        doneBtn.disabled = true
        doneBtn.classList.add("animate-ping")
        todoList.classList.add("transform")
        todoList.classList.add("duration-1000")
        todoList.classList.add("opacity-0")
        setTimeout(function () {
            todoList.remove()
            todo.todoList.splice(index, 1)
            todo.finishList.push(input)
            saveToStorage()
            const temp = loadFromStorage()
            temp.lastFinishList.classList.add("opacity-0")
            temp.lastFinishList.classList.add("transform")
            temp.lastFinishList.classList.add("duration-1000")
            setTimeout(function () {
                temp.lastFinishList.classList.remove("opacity-0")
            }, 100);
        }, 900);
    })
    deleteBtn.addEventListener("click", () => {
        deleteBtn.disabled = true
        doneBtn.disabled = true
        deleteBtn.classList.add("animate-ping")
        todoList.classList.add("transform")
        todoList.classList.add("duration-1000")
        todoList.classList.add("opacity-0")
        setTimeout(function () {
            todoList.remove()
            todo.todoList.splice(index, 1)
            saveToStorage()
            loadFromStorage()
        }, 900);
    })
    todoList.addEventListener("mouseenter", () => {
        doneBtn.classList.replace("invisible", "visible")
        deleteBtn.classList.replace("invisible", "visible")
        doneBtn.classList.remove("opacity-0")
        deleteBtn.classList.remove("opacity-0")
    })
    todoList.addEventListener("mouseleave", () => {
        doneBtn.classList.replace("visible", "invisible")
        deleteBtn.classList.replace("visible", "invisible")
        doneBtn.classList.add("opacity-0")
        deleteBtn.classList.add("opacity-0")
    })
    title.innerHTML = input
    button.append(doneBtn)
    button.append(deleteBtn)
    todoList.append(title)
    todoList.append(button)
    document.getElementById("todoList").prepend(todoList)
    return todoList
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
    return newMember
}

loadFromStorage()