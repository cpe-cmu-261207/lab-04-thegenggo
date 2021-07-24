/* Your code here */
let todo = { todoList: [], finishList: [] }

const enterTodoList = (ev) => {
    if (ev.key === "Enter") addTodoList();
}

const loadFromStorage = () => {
    if (localStorage.todo) {
        todo = JSON.parse(localStorage.todo)
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
    const p = document.createElement("p")
    const button = document.createElement("div")
    const doneBtn = document.createElement("button")
    const deleteBtn = document.createElement("button")
    todoList.classList.add("flex")
    todoList.classList.add("space-x-2")
    todoList.classList.add("justify-between")
    todoList.classList.add("h-auto")
    todoList.classList.add("px-4")
    todoList.classList.add("py-2")
    todoList.classList.add("duration-500")
    todoList.classList.add("border-opacity-0")
    todoList.classList.add("border-2")
    todoList.classList.add("rounded-lg")
    todoList.classList.add("border-red-500")
    todoList.classList.add("bg-white")
    todoList.classList.add("relative")
    todoList.classList.add("z-0")
    todoList.classList.add("shadow-md")
    title.classList.add("self-center")
    title.classList.add("w-4/5")
    p.classList.add("text-xl")
    p.classList.add("truncate")
    title.classList.add("h-auto")
    button.classList.add("flex")
    button.classList.add("space-x-2")
    button.classList.add("self-end")
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
        todoList.classList.add("opacity-0")
        setTimeout(function () {
            todoList.remove()
            todo.todoList.splice(index, 1)
            saveToStorage()
            loadFromStorage()
        }, 900);
    })
    todoList.addEventListener("mouseenter", () => {
        todoList.classList.replace("z-0", "z-10")
        todoList.classList.add("transform")
        doneBtn.classList.replace("invisible", "visible")
        deleteBtn.classList.replace("invisible", "visible")
        doneBtn.classList.remove("opacity-0")
        deleteBtn.classList.remove("opacity-0")
        todoList.classList.add("sm:scale-110")
        todoList.classList.remove("border-opacity-0")
        p.classList.remove("truncate")
        p.classList.add("break-all")
    })
    todoList.addEventListener("mouseleave", () => {
        todoList.classList.replace("z-10", "z-0")
        todoList.classList.add("transform")
        doneBtn.classList.replace("visible", "invisible")
        deleteBtn.classList.replace("visible", "invisible")
        doneBtn.classList.add("opacity-0")
        deleteBtn.classList.add("opacity-0")
        todoList.classList.remove("sm:scale-110")
        todoList.classList.add("border-opacity-0")
        p.classList.add("truncate")
        p.classList.remove("break-all")
    })
    p.innerHTML = input
    title.append(p)
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
    newMember.classList.add("justify-between")
    newMember.classList.add("px-4")
    newMember.classList.add("py-2")
    newMember.classList.add("duration-500")
    newMember.classList.add("border-opacity-0")
    newMember.classList.add("border-2")
    newMember.classList.add("rounded-lg")
    newMember.classList.add("border-red-500")
    newMember.classList.add("bg-white")
    newMember.classList.add("relative")
    newMember.classList.add("z-0")
    newMember.classList.add("shadow-md")
    title.classList.add("w-full")
    title.classList.add("text-xl")
    title.classList.add("self-center")
    title.classList.add("truncate")
    newMember.addEventListener("mouseenter", () => {
        newMember.classList.replace("z-0", "z-10")
        newMember.classList.add("transform")
        newMember.classList.add("sm:scale-110")
        newMember.classList.remove("border-opacity-0")
        title.classList.remove("truncate")
        title.classList.add("break-all")
    })
    newMember.addEventListener("mouseleave", () => {
        newMember.classList.replace("z-10", "z-0")
        newMember.classList.add("transform")
        newMember.classList.remove("sm:scale-110")
        newMember.classList.add("border-opacity-0")
        title.classList.add("truncate")
        title.classList.remove("break-all")
    })
    title.innerHTML = input
    title.style.textDecoration = "line-through"
    newMember.append(title)
    finishList.prepend(newMember)
    return newMember
}

loadFromStorage()