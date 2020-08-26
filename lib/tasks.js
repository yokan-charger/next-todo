const axios = require('axios')
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export async function getAllTasks(email) {
  let tasks = []
  await axios.get(`https://yokan-charger.herokuapp.com/tasks?email=${email}`).then((response) => {
    tasks = response.data
  })
  return tasks
}

export async function addTask(title, email) {
  let task = {}
  await axios.post('https://yokan-charger.herokuapp.com/tasks', {
    title: title,
    completed: false,
    email: email
  }).then((response) => {
    task = response.data
  }).catch((error) => {
    task = null
  })

  return task
}

export async function deleteTask(task) {
  let status = 200

  await axios.delete('https://yokan-charger.herokuapp.com/tasks', {
    params: {
      id: task.id
    }
  }).then((response) => {
    status = response.status
  }).catch((error) => {
    status = error.response.status
  })

  return status
}

export async function putStatus(todo) {
  let status = null

  await axios.put('https://yokan-charger.herokuapp.com/tasks/status', {
    id: todo.id,
    completed: !todo.completed
  }).then((response) => {
    status = response.status
  }).catch((error) => {
    status = error.response.status
  })

  return status
}

export async function putTitle(todo, title) {
  let status = null

  await axios.put('https://yokan-charger.herokuapp.com/tasks/title', {
    id: todo.id,
    title: title
  }).then((response) => {
    status = response.status
  }).catch((error) => {
    status = error.response.status
  })

  return status
}
