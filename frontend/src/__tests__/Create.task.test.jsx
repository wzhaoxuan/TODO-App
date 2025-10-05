import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import NewTask from '../pages/NewTask/NewTask'
import { createTodo } from '../api/todoApi'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

vi.mock('../api/todoApi', () => ({
  createTodo: vi.fn(),
}))

describe('NewTask create behavior', () => {
  beforeEach(() => {
    createTodo.mockReset()
  })
  it('creates a todo and navigates back to home', async () => {
    createTodo.mockResolvedValueOnce({ data: { id: 123 }})

    render(
      <MemoryRouter initialEntries={["/add"]}>
        <Routes>
          <Route path="/add" element={<NewTask/>} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    )

    const title = screen.getByLabelText(/title/i)
    const desc = screen.getByLabelText(/description/i)
    const submit = screen.getByRole('button', { name: /add task/i })

    fireEvent.change(title, { target: { value: 'New Title' } })
    fireEvent.change(desc, { target: { value: 'New desc' } })
    fireEvent.click(submit)

    // home should appear after navigation
    const home = await screen.findByText('Home')
    expect(home).toBeInTheDocument()
    expect(createTodo).toHaveBeenCalledWith({ title: 'New Title', description: 'New desc' })
  })

  it('prevents creating todo with empty title', async () => {
    render(
      <MemoryRouter initialEntries={["/add"]}>
        <Routes>
          <Route path="/add" element={<NewTask/>} />
        </Routes>
      </MemoryRouter>
    )

    const submit = screen.getByRole('button', { name: /add task/i })
    fireEvent.click(submit)

    expect(createTodo).not.toHaveBeenCalled()
  })
})
