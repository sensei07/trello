import { Boards } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

const getBoardsFn = async () => {
	// const { data } = await api.get<Boards[]>('/api/boards')
	const data = [
		{
			id: '1',
			title: 'Board 1',
		},
		{
			id: '2',
			title: 'Board 2',
		},
	]
	return data
}

interface UseBoardsOptions {
	initialData: Boards[]
}

export const useBoardQueryKey = ['boards']

export const useBoards = ({ initialData }: UseBoardsOptions) => {
	const query = useQuery({
		queryKey: useBoardQueryKey,
		queryFn: getBoardsFn,
		initialData,
	})

	return query
}
