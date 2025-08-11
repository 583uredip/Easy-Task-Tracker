
const taskInput=document.getElementById("taskInput");
const addbtn=document.getElementById("addbtn");
const tasklist=document.getElementById("tasklist");
const totalCount=document.getElementById("totalCount");
const completedCount=document.getElementById("completedCount");
const tasks=[];
function addTask()
{
    const taskText=taskInput.value;
    if(taskText==="")
    {
        alert("Please add task");
        return;
    }
    const task={
        id:Date.now(),
        text:taskText,
        completed:false,
    };
    tasks.push(task);
    taskInput.value="";
    display();
}
addbtn.addEventListener("click",addTask);

function display() {
    tasklist.innerHTML = "";

    if (tasks.length === 0) {
        tasklist.innerHTML = '<div class="empty-massage">No tasks yet! Add one above</div>';
        updateStats();
        return;
    }

    tasks.forEach(task => {
        const taskdiv = document.createElement("div");
        taskdiv.className = "task-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.style.marginRight = "10px";
        checkbox.style.transform = "scale(1.2)";

        const taskTextSpan = document.createElement("span");
        taskTextSpan.className = "task-text";
        taskTextSpan.textContent = task.text;

        if (task.completed)
             {
            taskTextSpan.style.textDecoration = "line-through";
            taskTextSpan.style.color = "gray";
        }

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            if (checkbox.checked) {
                taskTextSpan.style.textDecoration = "line-through";
                taskTextSpan.style.color = "gray";
            } else {
                taskTextSpan.style.textDecoration = "none";
                taskTextSpan.style.color = "black";
            }
            updateStats();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
            const index = tasks.findIndex(t => t.id === task.id);
            if (index > -1) {
                tasks.splice(index, 1);
                display();
            }
        });

        taskdiv.appendChild(checkbox);
        taskdiv.appendChild(taskTextSpan);
        taskdiv.appendChild(deleteBtn);

        tasklist.appendChild(taskdiv);
    });

    updateStats();
}

function updateStats() 
{
    const totalCount = document.getElementById("totalCount");
    const completedCount = document.getElementById("completedCount");

    totalCount.textContent = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    completedCount.textContent = completedTasks;
}
