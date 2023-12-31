import { CreateBoardDto } from '@/app/api/boards/dto'
import { api } from '@/core/api'
import { Boards } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useBoardQueryKey } from './use-boards'

const createBoardFn = async (board: CreateBoardDto) => {
	const { data } = await api.post<Boards>('/api/boards', board)
	return data
}

export const useCreateBoard = () => {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: createBoardFn,
		onSettled: () => {
			queryClient.invalidateQueries(useBoardQueryKey)
		},
	})
	return mutation
}
