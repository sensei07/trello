import { ColumnsList } from '@/components'
import { prisma } from '@/core/prisma'
import { notFound } from 'next/navigation'

interface PageParams {
	id: string
}

interface PageProps {
	params: PageParams
}

export default async function BoardPage(props: PageProps) {
	const board = await prisma.boards.findUnique({
		where: {
			id: props.params.id,
		},
		include: {
			columns: {
				orderBy: {
					order: 'asc',
				},
				include: {
					cards: true,
				},
			},
		},
	})

	if (!board) {
		return notFound()
	}

	return (
		<>
			<div className='container mx-auto  flex flex-col'>
				<h1 className='text-white text-4xl text-center mb-8'>{board.title}</h1>
			</div>
			<ColumnsList board={board} />
		</>
	)
}
