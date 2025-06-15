// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.forEach(taskText => addTask(taskText, false)); // false prevents saving during load
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Get and trim input value (for user input)
        taskText = taskText || taskInput.value.trim();

        // Check if input is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create list item
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");

        // Add click event to remove button
        removeButton.onclick = () => {
            taskList.removeChild(li);
            // Update Local Storage after removal
            const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            const updatedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        };

        // Append remove button to list item
        li.appendChild(removeButton);

        // Append list item to task list
        taskList.appendChild(li);

        // Save to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            storedTasks.push(taskText);
            localStorage.setItem("tasks", JSON.stringify(storedTasks));
        }

        // Clear input field
        if (taskInput.value) {
            taskInput.value = "";
        }
    }

    // Add event listener to Add Task button
    addButton.addEventListener("click", () => addTask());

    // Add event listener for Enter key on input
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Load tasks on page load
    loadTasks();
});
