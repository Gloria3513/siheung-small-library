import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateProgramSchema } from '@/lib/validators'
import { errorResponse, successResponse, requireAdmin } from '@/lib/utils'

type RouteContext = { params: Promise<{ id: string }> }

// GET /api/programs/:id - 프로그램 상세 조회
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const program = await prisma.program.findUnique({
      where: { id: parseInt(id, 10) },
    })

    if (!program) {
      return errorResponse('NOT_FOUND', '프로그램을 찾을 수 없습니다.', 404)
    }

    return successResponse(program)
  } catch (error) {
    console.error('GET /api/programs/[id] error:', error)
    return errorResponse('SERVER_ERROR', '프로그램 정보를 가져오는 중 오류가 발생했습니다.', 500)
  }
}

// PATCH /api/programs/:id - 프로그램 수정 (관리자)
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return errorResponse('UNAUTHORIZED', '관리자 로그인이 필요합니다.', 401)
    }

    const { id } = await context.params
    const programId = parseInt(id, 10)

    const existing = await prisma.program.findUnique({ where: { id: programId } })
    if (!existing) {
      return errorResponse('NOT_FOUND', '프로그램을 찾을 수 없습니다.', 404)
    }

    const body = await req.json()
    const result = updateProgramSchema.safeParse(body)
    if (!result.success) {
      return errorResponse('VALIDATION_ERROR', result.error.errors[0].message, 400)
    }

    const { startDate, endDate, ...rest } = result.data
    const updateData: Record<string, unknown> = { ...rest }
    if (startDate !== undefined) updateData.startDate = startDate ? new Date(startDate) : null
    if (endDate !== undefined) updateData.endDate = endDate ? new Date(endDate) : null

    const program = await prisma.program.update({
      where: { id: programId },
      data: updateData,
    })

    return successResponse(program)
  } catch (error) {
    console.error('PATCH /api/programs/[id] error:', error)
    return errorResponse('SERVER_ERROR', '프로그램 수정 중 오류가 발생했습니다.', 500)
  }
}

// DELETE /api/programs/:id - 프로그램 삭제 (관리자)
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return errorResponse('UNAUTHORIZED', '관리자 로그인이 필요합니다.', 401)
    }

    const { id } = await context.params
    const programId = parseInt(id, 10)

    const existing = await prisma.program.findUnique({ where: { id: programId } })
    if (!existing) {
      return errorResponse('NOT_FOUND', '프로그램을 찾을 수 없습니다.', 404)
    }

    await prisma.program.delete({ where: { id: programId } })

    return successResponse({ id: programId, deleted: true })
  } catch (error) {
    console.error('DELETE /api/programs/[id] error:', error)
    return errorResponse('SERVER_ERROR', '프로그램 삭제 중 오류가 발생했습니다.', 500)
  }
}
