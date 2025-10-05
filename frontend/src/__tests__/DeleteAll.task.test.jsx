import { vi } from 'vitest'

vi.mock('../api/todoApi', () => ({
	getTodos: vi.fn(),
	deleteAllTodos: vi.fn(),
}))

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import { getTodos, deleteAllTodos } from '../api/todoApi'

describe('Home - delete all functionality', () => {
	beforeEach(() => {
		getTodos.mockReset()
		deleteAllTodos.mockReset()
	})

	it('calls deleteAllTodos and clears the list on success', async () => {
		const sampleTodos = [
			{ id: 1, title: 'T1', description: 'd1' },
			{ id: 2, title: 'T2', description: 'd2' },
		]
		getTodos.mockResolvedValueOnce({ data: sampleTodos })
		deleteAllTodos.mockResolvedValueOnce({})

		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		)

		// Wait for items to appear
		expect(await screen.findByText('T1')).toBeInTheDocument()

		const btn = screen.getByText(/delete all/i)
		fireEvent.click(btn)

		await waitFor(() => {
			expect(deleteAllTodos).toHaveBeenCalled()
		})

		await waitFor(() => {
			expect(screen.queryByText('T1')).not.toBeInTheDocument()
		})
	})

	it('keeps items on delete failure', async () => {
		const sampleTodos = [
			{ id: 1, title: 'T1', description: 'd1' },
		]
		getTodos.mockResolvedValueOnce({ data: sampleTodos })
		deleteAllTodos.mockRejectedValueOnce(new Error('fail'))

		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		)

		expect(await screen.findByText('T1')).toBeInTheDocument()
		const btn = screen.getByText(/delete all/i)
		fireEvent.click(btn)

		await waitFor(() => {
			expect(deleteAllTodos).toHaveBeenCalled()
		})

		// item should still be present
		expect(screen.getByText('T1')).toBeInTheDocument()
	})
})

