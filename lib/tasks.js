const axios = require('axios')

let tasks = []

export function getAllTasks() {
  axios.get('https://yokan-charger.herokuapp.com/tasks').then((response) => {
    tasks.push(response.data)
  })
  return tasks[0]
}

export function addTask(task) {
  tasks.push(task)
}
