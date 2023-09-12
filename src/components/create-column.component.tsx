'use client'

import { useCreateColumnMutation } from '@/hooks/use-create-column'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '.'

const createColumnSchema = z.object({
	title: z.string().min(1).max(20),
})

type CreateColumnValues = z.infer<typeof createColumnSchema>

interface CreateColumnProps {
	boardId: string
}

export function CreateColumn({ boardId }: CreateColumnProps) {
	const [isFormOpened, setIsFormOpened] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitted },
	} = useForm<CreateColumnValues>({
		resolver: zodResolver(createColumnSchema),
	})

	const { mutateAsync } = useCreateColumnMutation({ boardId })

	const onSubmit = handleSubmit(async values => {
		await mutateAsync({
			...values,
			boardId,
		})
		setIsFormOpened(false)
	})

	const openForm = () => setIsFormOpened(true)

	return (
		<div className='block h-fit min-w-[12.5rem] w-[12.5rem] max-w-sm p-6 rounded-lg shadow bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-700'>
			{isFormOpened ? (
				<form onSubmit={onSubmit}>
					<Input
						{...register('title')}
						placeholder='Enter column title'
						error={errors.title?.message}
						disabled={isSubmitted}
					/>
				</form>
			) : (
				<h5
					className='text-lg font-bold tracking-tight text-white'
					onClick={openForm}
				>
					+ Create a new column
				</h5>
			)}
		</div>
	)
}
