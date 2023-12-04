'use strict'
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()
const jwt = require('jsonwebtoken')

const DB_URI = process.env.DB_URI

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

mongoose.connect(DB_URI)
  .then(() => {
    console.log('connected to database')
  })
  .catch((error) => {
    console.log('Database connection failed:', error.message)
  })

const typeDefs = `
type Book {
  title: String,
  author: Author!,
  published: String,
  genres: [String]
}
type Author {
  name: String,
  bookCount: Int,
  born: Int
}
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}
type Token {
  value: String!
}
type Query {
    dummy: Int,
    bookCount: Int,
    authorCount: Int,
    allBooks(author: String, genre: String): [Book],
    allAuthors: [Author]
    me: User
  }
type Mutation {
  addBook(
    title: String!,
    published: String!,
    author: String!,
    genres: [String]
  ): Book,
  editAuthor(
    name: String,
    setBornTo: Int
  ): Author
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}
`

const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => {
      return await Author.collection.countDocuments()
    },
    allBooks: async (root, args) => {
      const books = await Book.find({})
      const authors = await Author.find({})
      const booksWithAuthors = []
      for (let i = 0; i < books.length; i++) {
        const author = authors.find(author => author._id.toString() === books[i].author.toString())
        booksWithAuthors.push({
          title: books[i].title,
          published: books[i].published,
          author: author.name,
          genres: books[i].genres || undefined
        })
      }
      if (args.author && args.genre) {
        return booksWithAuthors.filter(
          book => book.genres.includes(args.genres) && book.author === args.author
        )
      }
      if (args.author) {
        return booksWithAuthors.filter((book) => book.author === args.author)
      }
      if (args.genre) {
        return booksWithAuthors.filter((book) => book.genres.includes(args.genre))
      }
      return booksWithAuthors
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors.map(author => author.name)
    },
    me: async (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    name: (root) => {
      return root
    },
    bookCount: async (root) => {
      const bookAuthor = await Author.findOne({ name: root })
      const books = await Book.countDocuments({ author: bookAuthor })
      return books
    },
    born: async (root) => {
      const author = await Author.findOne({ name: root })
      if (author.born) {
        return author.born
      }
      return null
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        author = await newAuthor.save()
      }
      const book = new Book({ ...args, author: author._id })
      await book.save()
      return book
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (author) {
        await Author.findByIdAndUpdate(author._id.toString(), { born: args.setBornTo })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      return user.save()
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'fullstack') {
        throw new GraphQlError('invalid credentials')
      }
      const tokenData = {
        username: user.username,
        id: user._id.toString()
      }
      return { value: jwt.sign(tokenData, process.env.SECRET) }
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
