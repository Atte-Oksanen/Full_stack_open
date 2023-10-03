import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
	query {
		allBooks {
			author {
				bookCount
				born
				name
			}
			genres
			published
			title
		}
	}
`
export const NEW_BOOK = gql`
	mutation addBook($title: String!, $published: String!, $author: String!) {
		addBook(title: $title, published: $published, author: $author) {
			genres
			published
			title
			author {
				name
			}
		}
	}
`
export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			bookCount
			born
			name
		}
	}
`

export const UPDATE_AGE = gql`
	mutation editAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			bookCount
			born
			name
		}
	}
`
