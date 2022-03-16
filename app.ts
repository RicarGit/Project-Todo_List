const formAddToDo = document.querySelector('.form-add-todo') as HTMLFormElement
const formSearchToDo = document.querySelector('.form-search') as HTMLFormElement
const todosContainer = document.querySelector('.todos-container') as HTMLUListElement
const h3 = document.querySelector('.not-found-todo') as HTMLHRElement
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

const showNotFoundTodoMessage = (message: string) => {
  h3.textContent = message
  h3.classList.remove('hidden')
}

const hideNotFoundTodoMessage = () => h3.classList.add('hidden')

const checkIfTodoExists = () => {
  const notExistsTodo = !todosContainer.children.length

  if (notExistsTodo) {
    formSearchToDo.setAttribute('class', 'hidden')
    showNotFoundTodoMessage('Não existe nenhum To-do criado, crie um logo abaixo!')
    return
  }

  hideNotFoundTodoMessage()
  formSearchToDo.classList.remove('hidden')
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
  checkIfTodoExists()
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
    target.removeEventListener('click', deleteTodo)
  }

  checkIfTodoExists()
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

  const hasHiddenClass = (el: Element) => el.classList.contains('hidden')

  if (todoItems.every(hasHiddenClass)) {
    showNotFoundTodoMessage('Não encontramos nenhum To-do com esse nome!')
    return
  }

  hideNotFoundTodoMessage()
}

formAddToDo.addEventListener('submit', addTodo)
todosContainer.addEventListener('click', deleteTodo)
formSearchToDo.addEventListener('input', filterTodos)
window.addEventListener('load', checkIfTodoExists)