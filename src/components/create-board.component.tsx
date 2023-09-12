'use client'

import { useCreateBoard } from '@/hooks/use-create-board'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '.'

const createBoardSchema = z.object({
	title: z.string().min(1).max(20),
})

type CreateBoardValues = z.infer<typeof createBoardSchema>

export function CreateBoard() {
	const [isFormOpened, setIsFormOpened] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitted },
	} = useForm<CreateBoardValues>({
		resolver: zodResolver(createBoardSchema),
	})

	const { mutateAsync } = useCreateBoard()

	const onSubmit = handleSubmit(async values => {
		await mutateAsync(values)
		setIsFormOpened(false)
	})

	const openForm = () => setIsFormOpened(true)

	return (
		<div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 cursor-pointer dark:hover:bg-gray-700'>
			{isFormOpened ? (
				<form onSubmit={onSubmit}>
					<Input
						{...register('title')}
						placeholder='Enter board title'
						error={errors.title?.message}
						disabled={isSubmitted}
					/>
				</form>
			) : (
				<h5
					className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'
					onClick={openForm}
				>
					+ Create a new board
				</h5>
			)}
		</div>
	)
}
