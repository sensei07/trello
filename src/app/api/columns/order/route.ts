import { prisma } from '@/core/prisma'
import { NextResponse } from 'next/server'
import { updateColumnsOrderDto } from '../dto'

export async function PUT(req: Request) {
	const bodyRow = await req.json()
	const validateBody = updateColumnsOrderDto.safeParse(bodyRow)

	if (!validateBody.success) {
		return NextResponse.json(validateBody.error.issues, { status: 400 })
	}

	const queries = validateBody.data.map(({ id, order }) =>
		prisma.columns.update({
			where: {
				id,
			},
			data: {
				order,
			},
		})
	)
	await prisma.$transaction(queries)

	return NextResponse.json({}, { status: 200 })
}
