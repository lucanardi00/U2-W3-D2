const form = document.querySelector('form')
const userName = document.getElementById('user-name')
const deleteBtn = document.getElementById('deleteBtn')

const USER_MEMORY = 'user-memory'

let users = JSON.parse(localStorage.getItem(USER_MEMORY)) || []

const updateLocalStorage = () => {
  localStorage.setItem(USER_MEMORY, JSON.stringify(users))
}

const updateUIUserList = () => {
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
    updateUIUserList()
  } else {
    alert('Il nome deve contenere almeo un carattere')
  }
})

deleteBtn.addEventListener('click', () => {
  const hasAccepted = confirm('vuoi davvero resettare?')

  if (hasAccepted) {
    console.log('accettato')
    users.pop()
    updateLocalStorage()
    form.reset()
    console.log('Ultimo user rimosso')
  } else {
    console.log('rifiutato')
    alert('non abbiamo cancellato i dati')
  }
  updateUIUserList()
})

let updateTimer = function () {
  let timer = sessionStorage.getItem('timer')

  if (!timer) {
    timer = 0
  } else {
    timer = parseInt(timer)
  }

  document.getElementById('timer').textContent = timer
  timer++
  sessionStorage.setItem('timer', timer)
}

let startTimer = function () {
  updateTimer()

  setInterval(updateTimer, 1000)
}

window.onload = startTimer
