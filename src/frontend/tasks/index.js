const tasksGetAllURI = "http://localhost:3000/task/";
const taskGetOneURI = "http://localhost:3000/task/";    // Append task ID to URI

const taskContainer = document.getElementById("task-container");

function createTaskCard(taskDetails) {
    return `<div class="task-card" id="${taskDetails._id}">
                                <div class="task-header">
                                    <h3 class="task-title">${taskDetails.title}</h3>
                                    <div class="task-btn-container">
                                        <button class="task-edit-btn task-btn">Edit</button>
                                    </div>
                                </div>
                                ${(taskDetails.description)?`<div class="task-details">
                                    <p>${taskDetails.description}</p>
                                </div>`:""}
                            </div>`;
}

async function loadAllTasks() {
    const response = await fetch(tasksGetAllURI, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        console.log(`HTTP status ${response.status}`);
        return;
    }
    const data = await response.json();
    for (const task of data) {
        console.log(task);
        taskContainer.innerHTML += createTaskCard(task);
    }
}

document.addEventListener("DOMContentLoaded", loadAllTasks);