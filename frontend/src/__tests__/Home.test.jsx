import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Home from '../pages/Home/Home'
import { getTodos } from '../api/todoApi'

// Mock only getTodos for render/empty-state tests
vi.mock('../api/todoApi', () => ({
  getTodos: vi.fn(),
}))

describe('Home - render / empty state', () => {
  it('renders todos when the API returns items', async () => {
    const sampleTodos = [
      { id: 1, title: 'T1', description: 'd1', is_completed: false },
      { id: 2, title: 'T2', description: 'd2', is_completed: true },
    ]
    getTodos.mockResolvedValueOnce({ data: sampleTodos })

    render(<Home />)

    const t1 = await screen.findByText('T1')
    const t2 = await screen.findByText('T2')
    expect(t1).toBeInTheDocument()
    expect(t2).toBeInTheDocument()
  })

  it('shows empty state when there are no todos', async () => {
    getTodos.mockResolvedValueOnce({ data: [] })
    render(<Home />)

    const empty = await screen.findByText(/No Tasks, Add a task to get started!/i)
    expect(empty).toBeInTheDocument()
  })
})
