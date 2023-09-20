import AnectodeForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnectodeForm />
      <AnecdoteList />
    </div>
  )
}

export default App