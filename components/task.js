export default function Task({ test, onClick }) {
  let tasks = test
  return (
    <div>
      <form>
        {tasks.map(({completed, taskName}) => (
          <>
            <input type='text' placeholder='task' value={taskName} />
            <br />
          </>
        ))}
      </form>
      <button onClick={() => tasks.push({completed: false, taskName: 'hoge'})}> add </button>
    </div>
  )
}
