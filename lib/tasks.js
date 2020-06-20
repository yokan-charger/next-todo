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
