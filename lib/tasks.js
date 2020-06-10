const axios = require('axios')

let tasks = []

export function getAllTasks() {
  axios.get('https://yokan-charger.herokuapp.com/tasks').then((response) => {
    tasks.push(response.data.title)
  })
  return tasks
}

export function addTask(task) {
  tasks.push(task)
}
