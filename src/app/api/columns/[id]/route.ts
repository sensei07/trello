import { prisma } from '@/core/prisma'
import { NextResponse } from 'next/server'
import { updateColumnDto } from '../dto'

interface ColumnRouteContext {
	params: {
		id: string
	}
}

export async function PATCH(req: Request, { params }: ColumnRouteContext) {
	const { id } = params
	const bodyRow = await req.json()
	const validateBody = updateColumnDto.safeParse(bodyRow)

	if (!validateBody.success) {
		return NextResponse.json(validateBody.error.issues, { status: 400 })
	}

	const findColumn = await prisma.columns.findUnique({
		where: {
			id,
		},
	})

	if (!findColumn) {
		return NextResponse.json({
			code: 'not_found',
			messages: 'Column not found',
		})
	}

	const updatedColumn = await prisma.columns.update({
		where: {
			id,
		},
		data: validateBody.data,
	})

	return NextResponse.json(updatedColumn)
}

export async function DELETE(req: Request, { params }: ColumnRouteContext) {
	const { id } = params

	const findColumn = await prisma.columns.findUnique({
		where: {
			id,
		},
	})

	if (!findColumn) {
		return NextResponse.json({
			code: 'not_found',
			messages: 'Column not found',
		})
	}

	await prisma.columns.delete({
		where: {
			id,
		},
	})

	return NextResponse.json({}, { status: 200 })
}
