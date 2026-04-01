import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createLibrarySchema } from '@/lib/validators'
import {
  getPaginationParams,
  paginatedResponse,
  errorResponse,
  successResponse,
  requireAdmin,
} from '@/lib/utils'

// GET /api/libraries - 도서관 목록 조회
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const { page, limit, skip } = getPaginationParams(searchParams, 20)
    const search = searchParams.get('search')

    const where: Record<string, unknown> = {}
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { address: { contains: search } },
      ]
    }

    const [data, total] = await Promise.all([
      prisma.library.findMany({
        where,
        skip,
        take: limit,
        orderBy: { order: 'asc' },
      }),
      prisma.library.count({ where }),
    ])

    return Response.json(paginatedResponse(data, total, page, limit))
  } catch (error) {
    console.error('GET /api/libraries error:', error)
    return errorResponse('SERVER_ERROR', '도서관 목록을 가져오는 중 오류가 발생했습니다.', 500)
  }
}

// POST /api/libraries - 도서관 등록 (관리자)
export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return errorResponse('UNAUTHORIZED', '관리자 로그인이 필요합니다.', 401)
    }

    const body = await req.json()
    const result = createLibrarySchema.safeParse(body)
    if (!result.success) {
      return errorResponse('VALIDATION_ERROR', result.error.errors[0].message, 400)
    }

    const library = await prisma.library.create({ data: result.data })
    return successResponse(library, 201)
  } catch (error) {
    console.error('POST /api/libraries error:', error)
    return errorResponse('SERVER_ERROR', '도서관 등록 중 오류가 발생했습니다.', 500)
  }
}
