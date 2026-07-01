
let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let allBtn = document.getElementById("allBtn");
let activeBtn = document.getElementById("activeBtn");
let completedBtn = document.getElementById("completedBtn");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        if(currentFilter === "active" && task.completed){
            return;
        }

        if(currentFilter === "completed" && !task.completed){
            return;
        }

        let li = document.createElement("li");

        li.innerHTML = `
            <input type="checkbox" class="check" ${task.completed ? "checked" : ""}>

            <span style="
                text-decoration:${task.completed ? "line-through" : "none"};
                color:${task.completed ? "green" : "black"};
                flex:1;
            ">
                ${task.text}
            </span>

            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        `;

        // Complete
        li.querySelector(".check").addEventListener("change", function(){

            tasks[index].completed = this.checked;

            saveTasks();

            displayTasks();

        });
        li.querySelector(".editBtn").addEventListener("click", function(){

            let newTask = prompt("Edit Task", tasks[index].text);

            if(newTask !== null && newTask.trim() !== ""){

                tasks[index].text = newTask;

                saveTasks();

                displayTasks();

            }

        });
        li.querySelector(".deleteBtn").addEventListener("click", function(){

            tasks.splice(index,1);

            saveTasks();

            displayTasks();

        });

        taskList.appendChild(li);

    });

}
addBtn.addEventListener("click", function(){

    if(taskInput.value.trim() === ""){

        alert("Please enter a task");

        return;

    }

    tasks.push({

        text: taskInput.value,

        completed: false

    });

    saveTasks();

    displayTasks();

    taskInput.value = "";

});

allBtn.addEventListener("click", function(){

    currentFilter = "all";

    displayTasks();

});


activeBtn.addEventListener("click", function(){

    currentFilter = "active";

    displayTasks();

});


completedBtn.addEventListener("click", function(){

    currentFilter = "completed";

    displayTasks();

});


displayTasks();

