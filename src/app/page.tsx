import { BoardsList } from '@/components'

export default async function Home() {
	// const boards = await prisma.boards.findMany()

	const boards = [
		{
			id: '1',
			title: 'Board 1',
			createdAt: '2000-10-31T01:30:00.000-05:00',
			updatedAt: '2000-10-31T01:30:00.000-05:00',
		},
		{
			id: '2',
			title: 'Board 2',
			createdAt: '2000-10-31T01:30:00.000-05:00',
			updatedAt: '2000-10-31T01:30:00.000-05:00',
		},
	]

	return (
		<div className='container mx-auto'>
			<BoardsList initialData={boards} />
		</div>
	)
}
