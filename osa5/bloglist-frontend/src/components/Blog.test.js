/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

const blog = {
  title: 'Test title',
  author: 'Test Author',
  url: 'Test url',
  user: {
    name: 'Test user'
  }
}

describe('Testing renders of <Blog />', () => {

  test('renders content correctly', () => {
    render(<Blog blog={blog} />)
    screen.getByText(/Test Author/)
  })

  test('clicking View shows togglable content', async () => {
    const mockHandler = jest.fn()
    const { container } = render(<Blog blog={blog} handleLike={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)
    const div = container.querySelector('.togglable')
    expect(div).not.toHaveStyle('display: none')
  })
})

describe('Testing event handler of <Blog />', () => {
  test('Clicking twice fires event twice', async () => {
    const mockHandler = jest.fn()
    render(<Blog blog={blog} handleLike={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('Like')
    await user.click(button)
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe('Testing for correct data passed back by <BlogForm /> callback', () => {
  test('Blog formatted correctly on return', async () => {
    const mockHandler = jest.fn()
    render(<BlogForm handleNewBlog={mockHandler}></BlogForm>)

    const user = userEvent.setup()
    const input = screen.getAllByRole('textbox')
    const button = screen.getByText('Create')

    await user.type(input[0], 'Testing title')
    await user.type(input[1], 'Testing author')
    await user.type(input[2], 'Testing url')
    await user.click(button)
    expect(mockHandler.mock.lastCall[0]).toStrictEqual({
      title: 'Testing title',
      author: 'Testing author',
      url: 'Testing url'
    })
  })
})