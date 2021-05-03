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

    const onFormSubmit =(event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask").value.trim();
        if(newTask === ""){
            return;
        }
        tasks.push(
            {
                content: newTask,
                done: false,
            }
        );
        render();
    }

    const render = () => {
        let htmlString = "";
        for(const task of tasks){
            htmlString += `
            <li class="taskList__element${task.done ? " taskList__element--done" : ""}" >
            ${task.content}
            </li>
            `;
        }
        document.querySelector(".js-taskList").innerHTML = htmlString;
    }

    const init = () => {
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit)
        render();
    };
    init();
}