{
    const tasks = [
        {
            content: "Zadanie testowe numer 1",
            done: false,
        },
        {
            content: "Zadanie testowe numer 2",
            done: true,
        },
    ];

    const addTaskToTasks = (newTask) => {
        tasks.push(
            {
                content: newTask,
                done: false,
            },
        );
        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    }

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    }

    const addEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeTask");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-doneTask");

        toggleDoneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }
    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
            <li class="taskList__element${task.done ? " taskList__element--done" : ""}" >
            <button class="js-doneTask">Wykonane?</button>
            ${task.content}
            <button class="js-removeTask">Usuń</button>
            </li>
            `;
        }
        document.querySelector(".js-taskList").innerHTML = htmlString;

        addEvents();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask").value.trim();
        if (newTask === "") {
            return;
        }
        addTaskToTasks(newTask);
    };



    const init = () => {
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit)
        render();
    };
    init();
}