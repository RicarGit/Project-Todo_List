const formAddToDo = document.querySelector('.form-add-todo') as HTMLFormElement
const formSearchToDo = document.querySelector('.form-search') as HTMLFormElement
const todosContainer = document.querySelector('.todos-container') as HTMLUListElement
const regex = /.[a-zA-ZçÇ]/

const createTodo = (inputValue: string) => {
  const li = document.createElement('li')
  const span = document.createElement('span')
  const i = document.createElement('i')

  li.classList
    .add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')

  li.appendChild(span)
  span.textContent = inputValue
  li.appendChild(i)
  i.classList.add('far', 'fa-trash-alt', 'delete')

  todosContainer.appendChild(li)
}

const checkIfTodoExists = () => {
  if (!todosContainer.children.length) {
    formSearchToDo.setAttribute('class', 'hidden')
    h3.textContent = 'Não existe nenhum To-do criado, crie um logo abaixo!'
    h3.classList.remove('hidden')
    return
  }

  h3.classList.add('hidden')
  formSearchToDo.classList.remove('hidden')
}
const notFoundTodoMessage = () => {
  h3.textContent = 'Não encontramos nenhum To-do com esse nome!'
  h3.classList.remove('hidden')
}
const addTodo = (e: SubmitEvent) => {
  e.preventDefault()
  const target = e.target as HTMLFormElement

  if (!target) {
    return
  }

  const inputValue: string = target.add.value

  if (regex.test(inputValue)) {
    createTodo(inputValue)
  }

  target.reset()
}

const deleteParentElement = (el: Element) => {
  if (el.parentElement) {
    el.parentElement.remove()
  }
}

const deleteTodo = (e: MouseEvent) => {
  const target = e.target as HTMLButtonElement

  if (!target) {
    return
  }

  const hasClassDelete = Array.from(target.classList).includes('delete')

  if (hasClassDelete) {
    deleteParentElement(target)
  }
}

const showTodo = (el: Element) => {
  el.classList.add('d-flex')
  el.classList.remove('hidden')
}

const hideTodo = (el: Element) => {
  el.classList.remove('d-flex')
  el.classList.add('hidden')
}

const filterTodos = (e: Event) => {
  const target = e.target as HTMLInputElement

  const searchValue = target.value.toLowerCase().trim()
  const todoItems = Array.from(todosContainer.children)

  todoItems.forEach(el => {
    const isInputValueIncludes = el.textContent?.toLowerCase().includes(searchValue)

    isInputValueIncludes ? showTodo(el) : hideTodo(el)
  })
}

formAddToDo.addEventListener('submit', addTodo)
todosContainer.addEventListener('click', deleteTodo)
formSearchToDo.addEventListener('input', filterTodos)
window.addEventListener('load', checkIfTodoExists)