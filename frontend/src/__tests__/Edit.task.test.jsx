import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import EditTask from '../pages/EditTask/EditTask'
import { getTodo, updateTodo } from '../api/todoApi'

vi.mock('../api/todoApi', () => ({
    getTodo: vi.fn(),
    updateTodo: vi.fn(),
}))

describe('EditTask page', () => {
    beforeEach(() => {
        getTodo.mockReset()
        updateTodo.mockReset()
    })

    it('loads todo, pre-fills the form, submits update and navigates home', async () => {
        const sample = { id: 1, title: 'T1', description: 'desc', is_completed: false }
        getTodo.mockResolvedValueOnce({ data: sample })
        updateTodo.mockResolvedValueOnce({})

        render(
            <MemoryRouter initialEntries={["/todos/1/edit"]}>
                <Routes>
                    <Route path="/todos/:id/edit" element={<EditTask />} />
                    <Route path="/" element={<div>home</div>} />
                </Routes>
            </MemoryRouter>
        )

        // form fields should be pre-filled after fetch
        const titleInput = await screen.findByDisplayValue('T1')
        expect(titleInput).toBeInTheDocument()
        const desc = screen.getByDisplayValue('desc')
        expect(desc).toBeInTheDocument()

        // edit title and submit
        await userEvent.clear(titleInput)
        await userEvent.type(titleInput, 'T1 updated')

        const saveBtn = screen.getByRole('button', { name: /save/i })
        await userEvent.click(saveBtn)

        await waitFor(() => {
            expect(updateTodo).toHaveBeenCalledWith('1', { title: 'T1 updated', description: 'desc' })
        })

        // should navigate to home route
        const home = await screen.findByText('home')
        expect(home).toBeInTheDocument()
    })

    it('handles update failure and stays on edit page', async () => {
        const sample = { id: 2, title: 'T2', description: 'd2' }
        getTodo.mockResolvedValueOnce({ data: sample })
        updateTodo.mockRejectedValueOnce(new Error('network'))

        render(
            <MemoryRouter initialEntries={["/todos/2/edit"]}>
                <Routes>
                    <Route path="/todos/:id/edit" element={<EditTask />} />
                    <Route path="/" element={<div>home</div>} />
                </Routes>
            </MemoryRouter>
        )

        const titleInput = await screen.findByDisplayValue('T2')
        const saveBtn = screen.getByRole('button', { name: /save/i })
        await userEvent.click(saveBtn)

        await waitFor(() => {
            expect(updateTodo).toHaveBeenCalled()
        })

        // should NOT navigate to home
        expect(screen.queryByText('home')).not.toBeInTheDocument()
        // save button should be re-enabled
        expect(saveBtn).not.toBeDisabled()
    })
})