"use strict";
const formAddToDo = document.querySelector('.form-add-todo');
const formSearchToDo = document.querySelector('.form-search');
const todosContainer = document.querySelector('.todos-container');
const h3 = document.querySelector('.not-found-todo');
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
const notFoundTodoMessage = (message) => {
    h3.textContent = message;
    h3.classList.remove('hidden');
};
const checkIfTodoExists = () => {
    const notExistsTodo = !todosContainer.children.length;
    if (notExistsTodo) {
        formSearchToDo.setAttribute('class', 'hidden');
        notFoundTodoMessage('Não existe nenhum To-do criado, crie um logo abaixo!');
        return;
    }
    h3.classList.add('hidden');
    formSearchToDo.classList.remove('hidden');
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
    checkIfTodoExists();
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
        target.removeEventListener('click', deleteTodo);
    }
    checkIfTodoExists();
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
    const hasHiddenClass = (el) => el.classList.contains('hidden');
    if (todoItems.every(hasHiddenClass)) {
        notFoundTodoMessage('Não encontramos nenhum To-do com esse nome!');
        return;
    }
    h3.classList.add('hidden');
};
formAddToDo.addEventListener('submit', addTodo);
todosContainer.addEventListener('click', deleteTodo);
formSearchToDo.addEventListener('input', filterTodos);
window.addEventListener('load', checkIfTodoExists);
