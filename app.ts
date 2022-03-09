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

const addTodo = e => {
  e.preventDefault()

  const inputValue = e.target.add.value

  if (regex.test(inputValue)) {
    createTodo(inputValue)
  }

  e.target.reset()
}

const deleteParentElement = (el: Element) => {
  if (el.parentElement) {
    el.parentElement.remove()
  }
}

const deleteTodo = e => {
  const hasClassDelete = Array.from(e.target.classList).includes('delete')

  if (hasClassDelete) {
    deleteParentElement(e.target)
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

const filterTodos = e => {
  const searchValue = e.target.value.trim()
  const todoItems = Array.from(todosContainer.children)

  todoItems.forEach(el => {
    const isInputValueIncludes = el.textContent?.toLowerCase().includes(searchValue)

    isInputValueIncludes ? showTodo(el) : hideTodo(el)
  })
}

formAddToDo.addEventListener('submit', addTodo)
todosContainer.addEventListener('click', deleteTodo)
formSearchToDo.addEventListener('input', filterTodos)