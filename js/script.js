{
    let tasks = [
        {
            content: "zjeść",
            done: false
        },
        {
            content: "wypic",
            done: true
        }
    ];

    const addTaskToTasks = (newTask) => {
        tasks = [
            ...tasks,
            { content: newTask },
        ]
        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1)
        ];
        render();
    }

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                done: !tasks[index].done
            },
            ...tasks.slice(index + 1)
        ];
        render();
    }

    const bindRemoveTaskEvent = () => {
        const removeButtons = document.querySelectorAll(".js-removeTask");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    }

    const bindToggleTaskDoneEvent = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-doneTask");

        toggleDoneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const renderButtons = () => {
        let htmlString = "";
        if (tasks.length > 0) {
            htmlString += `
            <button class="buttons__button">Ukryj ukończone</button>
            <button class="buttons__button">Ukończ wszystkie</button>
            `;
        }
        document.querySelector(".js-buttons").innerHTML = htmlString;
    }

    const renderTasks = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
            <li class="taskList__element">
            <button class="taskList__button taskList__button--done js-doneTask">${task.done ? "&check;" : ""}</button>
            <span class="taskList__text${task.done ? " taskList__text--done" : ""}" >${task.content}</span>
            <button class="taskList__button taskList__button--remove js-removeTask">🗑</button>
            </li>
            `;
        }
        document.querySelector(".js-taskList").innerHTML = htmlString;
    }

    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveTaskEvent();
        bindToggleTaskDoneEvent();
    }

    const cleanTaskInput = (newTask) => {
        newTask.value = "";
        newTask.focus();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask");
        const newTaskContent = newTask.value.trim();
        if (!newTaskContent) {
            cleanTaskInput(newTask);
            return;
        }
        cleanTaskInput(newTask);
        addTaskToTasks(newTaskContent);
    };

    const init = () => {
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit)
        render();
    };
    init();
}