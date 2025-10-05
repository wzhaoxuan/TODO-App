import { vi } from 'vitest'
import React from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import { getTodos, deleteTodo } from '../api/todoApi'


vi.mock('../api/todoApi', () => ({
  getTodos: vi.fn(),
  deleteTodo: vi.fn(),
}))


describe('Home - delete functionality', () => {
  it('deletes a todo when delete button is clicked', async () => {
    const sampleTodos = [
      { id: 1, title: 'T1', description: 'd1', is_completed: false },
      { id: 2, title: 'T2', description: 'd2', is_completed: true },
    ]

    getTodos.mockResolvedValueOnce({ data: sampleTodos })
    deleteTodo.mockResolvedValueOnce({})

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    const t1 = await screen.findByText('T1')
    expect(t1).toBeInTheDocument()

  // Find delete button inside the first todo card (avoid header "Delete All")
  const card = t1.closest('.card')
  const deleteBtn = within(card).getByText(/delete/i)
  vi.spyOn(window, 'confirm').mockImplementation(() => true)
  await userEvent.click(deleteBtn)

  expect(deleteTodo).toHaveBeenCalledWith(1)

    await waitFor(() => {
      expect(screen.queryByText('T1')).not.toBeInTheDocument()
    })
  })

    it('handles delete API failure gracefully', async () => {
    const sampleTodos = [
      { id: 1, title: 'T1', description: 'd1', is_completed: false },
      { id: 2, title: 'T2', description: 'd2', is_completed: true },
    ]

    getTodos.mockResolvedValueOnce({ data: sampleTodos })
    deleteTodo.mockRejectedValueOnce(new Error('Failed to delete'))

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    const t1 = await screen.findByText('T1')
    expect(t1).toBeInTheDocument()

  const card = t1.closest('.card')
  const deleteBtn = within(card).getByText(/delete/i)
  vi.spyOn(window, 'confirm').mockImplementation(() => true)
  await userEvent.click(deleteBtn)

  expect(deleteTodo).toHaveBeenCalledWith(1)

    await waitFor(() => {
      expect(screen.queryByText('T1')).toBeInTheDocument()
    })
  })
})
