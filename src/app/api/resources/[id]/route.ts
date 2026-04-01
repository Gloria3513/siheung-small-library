import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateResourceSchema } from '@/lib/validators'
import { errorResponse, successResponse, requireAdmin } from '@/lib/utils'

type RouteContext = { params: Promise<{ id: string }> }

// GET /api/resources/:id - 자료 상세 (다운로드 카운트 +1)
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const resourceId = parseInt(id, 10)

    const resource = await prisma.resource.update({
      where: { id: resourceId },
      data: { downloadCount: { increment: 1 } },
    })

    if (!resource) {
      return errorResponse('NOT_FOUND', '자료를 찾을 수 없습니다.', 404)
    }

    return successResponse(resource)
  } catch (error) {
    console.error('GET /api/resources/[id] error:', error)
    return errorResponse('SERVER_ERROR', '자료를 가져오는 중 오류가 발생했습니다.', 500)
  }
}

// PATCH /api/resources/:id - 자료 수정 (관리자)
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return errorResponse('UNAUTHORIZED', '관리자 로그인이 필요합니다.', 401)
    }

    const { id } = await context.params
    const resourceId = parseInt(id, 10)

    const existing = await prisma.resource.findUnique({ where: { id: resourceId } })
    if (!existing) {
      return errorResponse('NOT_FOUND', '자료를 찾을 수 없습니다.', 404)
    }

    const body = await req.json()
    const result = updateResourceSchema.safeParse(body)
    if (!result.success) {
      return errorResponse('VALIDATION_ERROR', result.error.errors[0].message, 400)
    }

    const resource = await prisma.resource.update({
      where: { id: resourceId },
      data: result.data,
    })

    return successResponse(resource)
  } catch (error) {
    console.error('PATCH /api/resources/[id] error:', error)
    return errorResponse('SERVER_ERROR', '자료 수정 중 오류가 발생했습니다.', 500)
  }
}

// DELETE /api/resources/:id - 자료 삭제 (관리자)
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return errorResponse('UNAUTHORIZED', '관리자 로그인이 필요합니다.', 401)
    }

    const { id } = await context.params
    const resourceId = parseInt(id, 10)

    const existing = await prisma.resource.findUnique({ where: { id: resourceId } })
    if (!existing) {
      return errorResponse('NOT_FOUND', '자료를 찾을 수 없습니다.', 404)
    }

    await prisma.resource.delete({ where: { id: resourceId } })

    return successResponse({ id: resourceId, deleted: true })
  } catch (error) {
    console.error('DELETE /api/resources/[id] error:', error)
    return errorResponse('SERVER_ERROR', '자료 삭제 중 오류가 발생했습니다.', 500)
  }
}
