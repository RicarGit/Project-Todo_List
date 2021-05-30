const formAddToDo = document.querySelector('.form-add-todo')
const formSearchToDo = document.querySelector('.form-search')
const todosContainer = document.querySelector('.todos-container')
const regex = /.[a-zA-ZçÇ]/

formAddToDo.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = event.target.add.value

  const createTodoItem = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${inputValue}</span>
        <i class="far fa-trash-alt delete"></i>
      </li>`

  if (regex.test(inputValue)) {
    todosContainer.innerHTML += createTodoItem
  }

  event.target.reset()
})

todosContainer.addEventListener('click', event => {
  const hasClassDelete = Array.from(event.target.classList).includes('delete')

  if (hasClassDelete) {
    event.target.parentElement.remove()
  }
})

const showSearchElement = element => {
  element.classList.add('d-flex')
  element.classList.remove('hidden')
}

const removeSearchElement = element => {
  element.classList.remove('d-flex')
  element.classList.add('hidden')
}

formSearchToDo.addEventListener('input', event => {
  const searchValue = event.target.value.trim()
  const todoItems = Array.from(todosContainer.children)

  todoItems.forEach(element => {
    const isInputValueIncludes = element.textContent
      .toLowerCase().includes(searchValue)

    if (isInputValueIncludes) {
      showSearchElement(element)
    } else {
      removeSearchElement(element)
    }
  })
})