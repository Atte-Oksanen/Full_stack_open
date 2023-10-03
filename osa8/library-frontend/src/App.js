import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = ({ client }) => {
	const [page, setPage] = useState('authors')

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('add')}>add book</button>
			</div>

			<Authors show={page === 'authors'} graphClient={client} />

			<Books show={page === 'books'} graphClient={client} />

			<NewBook show={page === 'add'} graphClient={client} />
		</div>
	)
}

export default App
