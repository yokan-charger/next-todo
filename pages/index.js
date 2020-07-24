import Head from 'next/head'
import Task from '../components/task'
import {getAllTasks, addTask, deleteTask, putStatus, putTitle} from '../lib/tasks'
import { useState } from 'react';
import { Button, TextField, Checkbox, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSession, signin, signout } from 'next-auth/client'

export default function Home({tasks}) {
  const [todos, setTodos] = useState(tasks)
  const [tmpTodo, setTmpTodo] = useState("")
  const [tmpTodoError, setTmpTodoError] = useState(false)
  const [error, setError] = useState(tasks === null)
  const [ session, loading ] = useSession()

  const addTodo = async () => {
    if (!tmpTodo) {
      setTmpTodoError(true)
      return
    }

    let task = await addTask(tmpTodo)

   if(!task) {
     setError('エラーが発生しました、時間をおいて再度お試しください')
     return
   }

    setTmpTodoError(false)

    setTodos([...todos, task])
    setTmpTodo("")
  }

  const deleteTodo = async delTodo => {
    let status = await deleteTask(delTodo)
    console.log(status)
    if (status == 500) {
      setError('エラーが発生しました、時間をおいて再度お試しください')
      return
    }

    let newTodos = todos.filter((todo, i) => {
      return delTodo.id !== todo.id
    })
    setTodos(newTodos)
  }

  const updateStatus = async (todo) => {
    let status = await putStatus(todo)

    if (status == 500) {
      setError('エラーが発生しました、時間をおいて再度お試しください')
      return
    }

    let tmpTodos = []
    todos.forEach((t) => {
      if ( t.id == todo.id ) {
        t.completed = !todo.completed
      }
      tmpTodos.push(t)
    })
    setTodos(tmpTodos)
  }

  const updateTitle = async (todo, title) => {
    if (!title || title != todo.title) return

    let status = await putTitle(todo, title)

    if (status == 500) {
      setError('エラーが発生しました、時間をおいて再度お試しください')
      return
    }
  }

  const setTitle = (todo, title) => {
    let tmpTodos = []
    todos.forEach((t) => {
      if ( t.id == todo.id ) {
        t.title = title
      }
      tmpTodos.push(t)
    })
    setTodos(tmpTodos)
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!session && <>
          <a href='/sign_in'> sign up </a>
        </>}
        {session && <>
          { error && <Alert severity="error" style={{margin: '20px'}}>{error}</Alert> }
          <div>
            <TextField
              variant='outlined'
              error={tmpTodoError}
              label="Todoタイトル"
              helperText={tmpTodoError && 'Todoタイトルが必須です'}
              onChange={e => setTmpTodo(e.target.value)}
              value={tmpTodo}
            />
            <Button variant="contained" size="large" color="primary" onClick={addTodo}> Add </Button>
          </div>
          <ul>
            {todos.filter(todo => !todo.completed).map((todo, index) => {
              return (
                <li key={index}>
                  <Checkbox checked={todo.completed} onClick={() => updateStatus(todo)} inputProps={{ 'aria-label': 'primary checkbox' }}/>
                  <TextField
                    variant='outlined'
                    error={!todo.title}
                    helperText={!todo.title && 'Todoタイトルが必須です'}
                    value={todo.title}
                    onChange={(e) => setTitle(todo, e.target.value)}
                    onBlur={(e) => updateTitle(todo, e.target.value)}
                  />
                  <IconButton aria-label="delete" onClick={() => deleteTodo(todo)}><DeleteIcon /></IconButton>
                </li>
              )
            })}
            <div>------------------------------------------------------------------</div>
            {todos.filter(todo => todo.completed).map((todo, index) => {
              return (
                <li key={index}>
                  <Checkbox checked={todo.completed} onClick={() => updateStatus(todo)} inputProps={{ 'aria-label': 'primary checkbox' }}/>
                  <TextField
                    variant='outlined'
                    error={!todo.title}
                    helperText={!todo.title && 'Todoタイトルが必須です'}
                    value={todo.title}
                    onChange={(e) => setTitle(todo, e.target.value)}
                    onBlur={(e) => updateTitle(todo, e.target.value)}
                  />
                  <IconButton aria-label="delete" onClick={() => deleteTodo(todo)}><DeleteIcon /></IconButton>
                </li>
              )
            })}

          </ul>
          Signed in as {session.user.email} <br/>
          <button onClick={signout}>Sign out</button>
        </>}
        {/* <Task test={tasks} onClick={() => {addTask({completed: false, taskName: 'hoge'})}} /> */}
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export async function getServerSideProps() {
  const tasks = getAllTasks()
  return {
    props: {
      tasks
    }
  }
}
