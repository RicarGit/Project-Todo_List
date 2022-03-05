"use strict";
const formAddToDo = document.querySelector('.form-add-todo');
const formSearchToDo = document.querySelector('.form-search');
const todosContainer = document.querySelector('.todos-container');
const regex = /.[a-zA-ZçÇ]/;
const createTodo = inputValue => {
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
const addTodo = event => {
    event.preventDefault();
    const inputValue = event.target.add.value;
    if (regex.test(inputValue)) {
        createTodo(inputValue);
    }
    event.target.reset();
};
const deleteParentElement = element => element.parentElement.remove();
const deleteTodo = event => {
    const hasClassDelete = Array.from(event.target.classList).includes('delete');
    if (hasClassDelete) {
        deleteParentElement(event.target);
    }
};
const showTodo = element => {
    element.classList.add('d-flex');
    element.classList.remove('hidden');
};
const hideTodo = element => {
    element.classList.remove('d-flex');
    element.classList.add('hidden');
};
const filterTodos = event => {
    const searchValue = event.target.value.trim();
    const todoItems = Array.from(todosContainer.children);
    todoItems.forEach(element => {
        const isInputValueIncludes = element.textContent
            .toLowerCase().includes(searchValue);
        if (isInputValueIncludes) {
            showTodo(element);
        }
        else {
            hideTodo(element);
        }
    });
};
formAddToDo.addEventListener('submit', addTodo);
todosContainer.addEventListener('click', deleteTodo);
formSearchToDo.addEventListener('input', filterTodos);