import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createResourceSchema } from '@/lib/validators'
import {
  getPaginationParams,
  paginatedResponse,
  errorResponse,
  successResponse,
  requireAdmin,
} from '@/lib/utils'

// GET /api/resources - 자료 목록
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const { page, limit, skip } = getPaginationParams(searchParams)
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    const where: Record<string, unknown> = {}
    if (category) where.category = category
    if (search) {
      where.title = { contains: search }
    }

    const [data, total] = await Promise.all([
      prisma.resource.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.resource.count({ where }),
    ])

    return Response.json(paginatedResponse(data, total, page, limit))
  } catch (error) {
    console.error('GET /api/resources error:', error)
    return errorResponse('SERVER_ERROR', '자료 목록을 가져오는 중 오류가 발생했습니다.', 500)
  }
}

// POST /api/resources - 자료 등록 (관리자)
export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return errorResponse('UNAUTHORIZED', '관리자 로그인이 필요합니다.', 401)
    }

    const body = await req.json()
    const result = createResourceSchema.safeParse(body)
    if (!result.success) {
      return errorResponse('VALIDATION_ERROR', result.error.errors[0].message, 400)
    }

    const resource = await prisma.resource.create({ data: result.data })

    return successResponse(resource, 201)
  } catch (error) {
    console.error('POST /api/resources error:', error)
    return errorResponse('SERVER_ERROR', '자료 등록 중 오류가 발생했습니다.', 500)
  }
}
