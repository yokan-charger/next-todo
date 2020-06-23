const axios = require('axios')
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

let tasks = []

export function getAllTasks() {
  axios.get('https://yokan-charger.herokuapp.com/tasks').then((response) => {
    tasks = response.data
  })
  return tasks
}

export async function addTask(title) {
  let task = {}
  await axios.post('https://yokan-charger.herokuapp.com/tasks', {
    title: title,
    completed: false
  }).then((response) => {
    task = response.data
  })

  return task
}

export function deleteTask(task) {
  axios.delete('https://yokan-charger.herokuapp.com/tasks', {
    params: {
      id: task.id
    }
  })
}

export async function putStatus(todo) {
  let status = null

  await axios.put('https://yokan-charger.herokuapp.com/tasks/status', {
    id: todo.id,
    completed: !todo.completed
  }).then((response) => {
    status = response.status
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
  })

  return status
}
