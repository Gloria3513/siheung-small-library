import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateLibrarySchema } from '@/lib/validators'
import { errorResponse, successResponse, requireAdmin } from '@/lib/utils'

type RouteContext = { params: Promise<{ id: string }> }

// GET /api/libraries/:id - 도서관 상세 조회
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const library = await prisma.library.findUnique({
      where: { id: parseInt(id, 10) },
    })

    if (!library) {
      return errorResponse('NOT_FOUND', '도서관을 찾을 수 없습니다.', 404)
    }

    return successResponse(library)
  } catch (error) {
    console.error('GET /api/libraries/[id] error:', error)
    return errorResponse('SERVER_ERROR', '도서관 정보를 가져오는 중 오류가 발생했습니다.', 500)
  }
}

// PATCH /api/libraries/:id - 도서관 수정 (관리자)
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return errorResponse('UNAUTHORIZED', '관리자 로그인이 필요합니다.', 401)
    }

    const { id } = await context.params
    const libraryId = parseInt(id, 10)

    const existing = await prisma.library.findUnique({ where: { id: libraryId } })
    if (!existing) {
      return errorResponse('NOT_FOUND', '도서관을 찾을 수 없습니다.', 404)
    }

    const body = await req.json()
    const result = updateLibrarySchema.safeParse(body)
    if (!result.success) {
      return errorResponse('VALIDATION_ERROR', result.error.errors[0].message, 400)
    }

    const library = await prisma.library.update({
      where: { id: libraryId },
      data: result.data,
    })

    return successResponse(library)
  } catch (error) {
    console.error('PATCH /api/libraries/[id] error:', error)
    return errorResponse('SERVER_ERROR', '도서관 수정 중 오류가 발생했습니다.', 500)
  }
}

// DELETE /api/libraries/:id - 도서관 삭제 (관리자)
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return errorResponse('UNAUTHORIZED', '관리자 로그인이 필요합니다.', 401)
    }

    const { id } = await context.params
    const libraryId = parseInt(id, 10)

    const existing = await prisma.library.findUnique({ where: { id: libraryId } })
    if (!existing) {
      return errorResponse('NOT_FOUND', '도서관을 찾을 수 없습니다.', 404)
    }

    await prisma.library.delete({ where: { id: libraryId } })

    return successResponse({ id: libraryId, deleted: true })
  } catch (error) {
    console.error('DELETE /api/libraries/[id] error:', error)
    return errorResponse('SERVER_ERROR', '도서관 삭제 중 오류가 발생했습니다.', 500)
  }
}
