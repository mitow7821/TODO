document.addEventListener('DOMContentLoaded', () => {
    //Buttons
    let addInput = document.querySelector('.add__input');
    const addButton = document.querySelector('.add__button');
    const searchInput = document.querySelector('.search');
    const showOption = document.querySelector('.selectpicker');
    const clearAll = document.querySelector('.clearAll');
    const saveButton = document.querySelector('.saveAs');
    let deleteButton;
    //Tasks
    let taskList;
    let tasks;
    let items;
    const storageTasks = [];
    //Others
    const settings = document.querySelector('.settings');
    const pending = document.querySelector('.pending');
    let countVisible;
    let fileName = document.querySelector('.fileName');


    const updateTasks = function () {
        taskList = document.querySelector('.tasklist');
        tasks = [...document.querySelectorAll('.task')];
        items = [...document.querySelectorAll('.item')];
        deleteButton = document.querySelectorAll('.delete');
    }
    updateTasks()


    const changeSettingStyle = function (val) {
        if (val.length == 0) {
            settings.classList.remove('moreOptions');
            settings.classList.remove('options');
            settings.style.display = 'none';
        }
        else if (val.length < 4) {
            settings.classList.add('options');
            settings.classList.remove('moreOptions');
            settings.style.display = 'block';
        } else {
            settings.classList.add('moreOptions');
            settings.classList.remove('options');
            settings.style.display = 'block';
        }
    }
    changeSettingStyle(tasks)


    const pendindQuantity = function (val) {
        if (val.length === 1) {
            pending.innerHTML = `You have ${val.length} pending item`;
        } else {
            pending.innerHTML = `You have ${val.length} pending items`;
        }
    }
    pendindQuantity(tasks)


    const storeMethod = function () {
        const storageData = [];
        tasks.forEach(task => {
            storageData.push(task.children[1].innerText);
        })
        deleteButton.forEach((button, index) => {
            button.addEventListener('click', () => {
                storageData.splice(index, 1, null);
                localStorage.setItem("tasks", JSON.stringify(storageData));
            })
        })
        localStorage.setItem("tasks", JSON.stringify(storageData));

    }


    const getTasks = function () {
        const retrievedObject = localStorage.getItem("tasks");

        const retrievedTasks = JSON.parse(retrievedObject);
        if (retrievedObject !== null) {
            retrievedTasks.forEach((singleTask) => {
                if (singleTask !== null) {
                    storageTasks.push(singleTask);
                }
            })
        }
    }
    getTasks()


    const createTaskElement = function (val, array) {
        let li = document.createElement('li');
        li.classList.add("task");
        li.style.display = "block";

        let input = document.createElement('input');
        input.classList.add("styled-checkbox");
        input.id = `styled-checkbox-${array + 1}`;
        input.setAttribute('type', 'checkbox');
        input.setAttribute('value', `value${array + 1}`);
        li.appendChild(input);

        let label = document.createElement('label');
        label.setAttribute('for', `styled-checkbox-${array + 1}`);
        label.innerHTML = val;
        label.classList.add("item");
        label.setAttribute('onclick', 'classList.toggle("checked")');
        label.id = `${array + 1}`;
        li.appendChild(label);

        let span = document.createElement('span');
        span.classList.add("delete");
        li.appendChild(span);
        taskList.appendChild(li);
    }


    const createExistingTasks = function () {
        storageTasks.forEach((oneTask, index) => {
            createTaskElement(oneTask, index);
        })
        updateTasks();
        changeSettingStyle(storageTasks);
        pendindQuantity(storageTasks);
        deleteButton.forEach(button => {
            button.addEventListener('click', e => {
                let liElement = e.path[1];
                liElement.remove();
                updateTasks();
                changeSettingStyle(tasks);
                pendindQuantity(tasks);
                selectShow();
                storeMethod();
            })
        })
    }
    createExistingTasks()


    const addTask = function () {
        addInput = document.querySelector('.add__input');
        if (addInput.value !== "") {
            createTaskElement(addInput.value, tasks.length);
            addInput.value = "";
            updateTasks();
            changeSettingStyle(tasks);
            pendindQuantity(tasks);
            deleteItems(deleteButton);
            storeMethod();
        }
    }


    const selectShow = function () {
        countVisible = [];
        if (showOption.value === "Completed") {
            items.forEach((item, index) => {
                tasks[index].style.display = "block";
                !item.className.includes('checked') ? tasks[index].style.display = "none" : countVisible.push(tasks[index]);
            })

            changeSettingStyle(countVisible);
            pendindQuantity(countVisible);
        } else if (showOption.value === "Uncompleted") {
            items.forEach((item, index) => {
                tasks[index].style.display = "block";
                if (item.className.includes('checked')) {
                    tasks[index].style.display = "none";
                } else {
                    countVisible.push(tasks[index]);
                }
            })

            changeSettingStyle(countVisible);
            pendindQuantity(countVisible);
        } else {
            items.forEach((item, index) => {
                tasks[index].style.display = "block";
            })

            changeSettingStyle(tasks);
            pendindQuantity(tasks);
        }
    }


    const search = function () {
        let searchVisible = [];
        if (searchInput.value != '') {

            if (showOption.value === "Completed") {
                countVisible.forEach((item, index) => {
                    if (item.textContent.toLocaleLowerCase().includes(searchInput.value.toLocaleLowerCase())) {
                        countVisible[index].style.display = "block";
                        searchVisible.push(tasks[index]);
                    } else {
                        countVisible[index].style.display = "none";
                    }
                })
                changeSettingStyle(searchVisible);
                pendindQuantity(searchVisible);
            } else if (showOption.value === "Uncompleted") {
                countVisible.forEach((item, index) => {
                    if (item.textContent.toLocaleLowerCase().includes(searchInput.value.toLocaleLowerCase())) {
                        countVisible[index].style.display = "block";
                        searchVisible.push(tasks[index]);
                    } else {
                        countVisible[index].style.display = "none";
                    }
                })
                changeSettingStyle(searchVisible);
                pendindQuantity(searchVisible);
            } else {
                items.forEach((item, index) => {
                    if (item.textContent.toLocaleLowerCase().includes(searchInput.value.toLocaleLowerCase())) {
                        tasks[index].style.display = "block";
                        searchVisible.push(tasks[index]);
                    } else {
                        tasks[index].style.display = "none";
                    }
                })
                changeSettingStyle(searchVisible);
                pendindQuantity(searchVisible);
            }

        } else {
            if (showOption.value === "Completed") {
                selectShow();
            } else if (showOption.value === "Uncompleted") {
                selectShow();
            } else {
                selectShow();
            }
        }
    }


    const deleteItems = function (arr) {
        arr[arr.length - 1].addEventListener('click', e => {
            let liElement = e.path[1];
            liElement.remove();
            updateTasks()
            changeSettingStyle(tasks)
            pendindQuantity(tasks)
            selectShow()
        })
    }


    const clear = function () {
        tasks.forEach(task => { task.remove() })
        updateTasks()
        changeSettingStyle(tasks)
        pendindQuantity(tasks)
        localStorage.removeItem('tasks');
    }


    const updateFileName = function () {
        fileName = document.querySelector('.fileName');
    }


    const saveAsTxt = function () {
        updateTasks()
        const storageData = [];
        tasks.forEach(task => {
            storageData.push("-" + task.children[1].innerText);
        })
        const txt = storageData.join('\n');
        saveButton.setAttribute('href', `data:text/plain;charset=utf-8,${txt}`);
        saveButton.setAttribute('download', fileName.value ? fileName.value : 'Tasks');
    }


    addButton.addEventListener('click', addTask);
    addInput.addEventListener('keypress', e => { e.key === 'Enter' ? addTask() : null; });
    searchInput.addEventListener('input', _.debounce(search));
    clearAll.addEventListener('click', clear);
    showOption.addEventListener('change', selectShow);
    fileName.addEventListener('input', updateFileName);
    saveButton.addEventListener('click', saveAsTxt);
});
