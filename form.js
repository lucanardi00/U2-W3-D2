const form = document.querySelector('form')
const userName = document.getElementById('user-name')
const deleteBtn = document.getElementById('deleteBtn')

const USER_MEMORY = 'user-memory'

let users = JSON.parse(localStorage.getItem(USER_MEMORY)) || []

const updateLocalStorage = () => {
  localStorage.setItem(USER_MEMORY, JSON.stringify(users))
}

const updateDocUserList = () => {
  userList.innerHTML = ''

  users.forEach((user) => {
    const li = document.createElement('li')
    li.textContent = user
    userList.appendChild(li)
    li.classList.add('list-group-item')
  })
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const user = userName.value

  if (user.length > 0) {
    users.push(user)

    updateLocalStorage()

    console.log(user, 'salvato in memoria')
    updateDocUserList()
  } else {
    alert('Il nome deve contenere almeo un carattere')
  }
})

deleteBtn.addEventListener('click', () => {
  const hasAccepted = confirm("vuoi davvero cancellare l'ultimo user?")

  if (hasAccepted) {
    console.log('accettato')
    users.pop()
    updateLocalStorage()
    form.reset()
    console.log('ultimo user rimosso')
  } else {
    console.log('rifiutato')
    alert("non abbiamo cancellato l'ultimo user")
  }
  updateDocUserList()
})

let timer = sessionStorage.getItem('TIMER_MEMORY')
  ? sessionStorage.getItem('TIMER_MEMORY')
  : 0

let updateTimer = function () {
  timer++
  sessionStorage.setItem('TIMER_MEMORY', timer)
  document.getElementById('timer').textContent = timer
}

let startTimer = function () {
  setInterval(updateTimer, 1000)
}

window.onload = function () {
  document.getElementById('timer').textContent = timer
  updateDocUserList()
  startTimer()
}
