const axios = require('axios')
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

let tasks = []

export function getAllTasks() {
  axios.get('https://yokan-charger.herokuapp.com/tasks').then((response) => {
    tasks = response.data
  })
  return tasks
}

export function addTask(task) {
  axios.post('https://yokan-charger.herokuapp.com/tasks', {
    title: task,
    completed: false
  })
}
