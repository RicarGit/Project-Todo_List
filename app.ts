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

const addTodo = (e: Event) => {
  e.preventDefault()
  const inputValue = e.target.add.value

  if (regex.test(inputValue)) {
    createTodo(inputValue)
  }

  e.target.reset()
}

const deleteParentElement = (element: HTMLElement) => element.parentElement.remove()

const deleteTodo = (e: Event) => {
  const hasClassDelete = Array.from(e.target.classList).includes('delete')

  if (hasClassDelete) {
    deleteParentElement(e.target)
  }
}

const showTodo = (element: HTMLElement) => {
  element.classList.add('d-flex')
  element.classList.remove('hidden')
}

const hideTodo = (element: HTMLElement) => {
  element.classList.remove('d-flex')
  element.classList.add('hidden')
}

const filterTodos = (e: Event) => {
  const searchValue = e.target.value.trim()
  const todoItems = Array.from(todosContainer.children)

  todoItems.forEach(element => {
    const isInputValueIncludes = element.textContent
      .toLowerCase().includes(searchValue)

    if (isInputValueIncludes) {
      showTodo(element)
    } else {
      hideTodo(element)
    }
  })
}

formAddToDo.addEventListener('submit', addTodo)
todosContainer.addEventListener('click', deleteTodo)
formSearchToDo.addEventListener('input', filterTodos)