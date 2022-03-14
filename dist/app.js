"use strict";
const formAddToDo = document.querySelector('.form-add-todo');
const formSearchToDo = document.querySelector('.form-search');
const todosContainer = document.querySelector('.todos-container');
const regex = /.[a-zA-ZçÇ]/;
const createTodo = (inputValue) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const i = document.createElement('i');
    li.classList
        .add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    li.appendChild(span);
    span.textContent = inputValue;
    li.appendChild(i);
    i.classList.add('far', 'fa-trash-alt', 'delete');
    todosContainer.appendChild(li);
};
const addTodo = (e) => {
    e.preventDefault();
    const target = e.target;
    if (!target) {
        return;
    }
    const inputValue = target.add.value;
    if (regex.test(inputValue)) {
        createTodo(inputValue);
    }
    target.reset();
};
const deleteParentElement = (el) => {
    if (el.parentElement) {
        el.parentElement.remove();
    }
};
const deleteTodo = (e) => {
    const target = e.target;
    if (!target) {
        return;
    }
    const hasClassDelete = Array.from(target.classList).includes('delete');
    if (hasClassDelete) {
        deleteParentElement(target);
    }
};
const showTodo = (el) => {
    el.classList.add('d-flex');
    el.classList.remove('hidden');
};
const hideTodo = (el) => {
    el.classList.remove('d-flex');
    el.classList.add('hidden');
};
const filterTodos = (e) => {
    const target = e.target;
    const searchValue = target.value.toLowerCase().trim();
    const todoItems = Array.from(todosContainer.children);
    todoItems.forEach(el => {
        var _a;
        const isInputValueIncludes = (_a = el.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchValue);
        isInputValueIncludes ? showTodo(el) : hideTodo(el);
    });
};
formAddToDo.addEventListener('submit', addTodo);
todosContainer.addEventListener('click', deleteTodo);
formSearchToDo.addEventListener('input', filterTodos);
