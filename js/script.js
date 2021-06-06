{
    let tasks = [];
    let hideDoneTask = false;

    const addTaskToTasks = newTask => {
        tasks = [
            ...tasks,
            { content: newTask },
        ]
        render();
    };

    const removeTask = index => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1)
        ];
        render();
    }

    const toggleTaskDone = index => {
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

    const makeAllTaskDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true
        }));
        render();
    }

    const hideAllTaskDone = () => {
        hideDoneTask = !hideDoneTask;
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

    const bindButtonsEvent = () => {
        const toggleAllDoneButtons = document.querySelector(".js-doneAllTask");
        if (toggleAllDoneButtons) {
            toggleAllDoneButtons.addEventListener("click", makeAllTaskDone)
        }

        const toggleAllHideTaskButton = document.querySelector(".js-toggleDoneAllTask");
        if (toggleAllHideTaskButton) {
            toggleAllHideTaskButton.addEventListener("click", hideAllTaskDone)
        }
    }

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (tasks.length > 0) {
            buttonsElement.innerHTML = `
            <button class="buttons__button js-toggleDoneAllTask" ${tasks.every(({ done }) => !done) ? "disabled" : ""}>
                ${hideDoneTask ? "Pokaż ukończone" : "Ukryj ukończone"}
            </button>
            <button class="buttons__button  js-doneAllTask" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button>
            `;
        }
    }

    const renderTasks = () => {
        const taskChangeToHTML = task => `
            <li class="taskList__element ${(task.done && hideDoneTask) ? "taskList__element--hidden" : ""}">
                <button class="taskList__button taskList__button--done js-doneTask">
                    ${task.done ? "&check;" : ""}
                </button>
                <span class="taskList__text${task.done ? " taskList__text--done" : ""}">
                    ${task.content}
                </span>
                <button class="taskList__button taskList__button--remove js-removeTask">
                    🗑
                </button>
            </li>
            `;

        const taskElement = document.querySelector(".js-taskList");
        taskElement.innerHTML = tasks.map(taskChangeToHTML).join("");
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveTaskEvent();
        bindToggleTaskDoneEvent();
        bindButtonsEvent();
    }

    const cleanTaskInput = newTask => {
        newTask.value = "";
    }

    const onFormSubmit = event => {
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