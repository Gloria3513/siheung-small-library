import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createProgramSchema } from '@/lib/validators'
import {
  getPaginationParams,
  paginatedResponse,
  errorResponse,
  successResponse,
  requireAdmin,
} from '@/lib/utils'

// GET /api/programs - 프로그램 목록 조회
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const { page, limit, skip } = getPaginationParams(searchParams)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const year = searchParams.get('year')

    const where: Record<string, unknown> = {}
    if (status) where.status = status
    if (category) where.category = category
    if (year) {
      const yearNum = parseInt(year, 10)
      where.startDate = {
        gte: new Date(`${yearNum}-01-01`),
        lt: new Date(`${yearNum + 1}-01-01`),
      }
    }

    const [data, total] = await Promise.all([
      prisma.program.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.program.count({ where }),
    ])

    return Response.json(paginatedResponse(data, total, page, limit))
  } catch (error) {
    console.error('GET /api/programs error:', error)
    return errorResponse('SERVER_ERROR', '프로그램 목록을 가져오는 중 오류가 발생했습니다.', 500)
  }
}

// POST /api/programs - 프로그램 등록 (관리자)
export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return errorResponse('UNAUTHORIZED', '관리자 로그인이 필요합니다.', 401)
    }

    const body = await req.json()
    const result = createProgramSchema.safeParse(body)
    if (!result.success) {
      return errorResponse('VALIDATION_ERROR', result.error.errors[0].message, 400)
    }

    const { startDate, endDate, ...rest } = result.data
    const program = await prisma.program.create({
      data: {
        ...rest,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      },
    })

    return successResponse(program, 201)
  } catch (error) {
    console.error('POST /api/programs error:', error)
    return errorResponse('SERVER_ERROR', '프로그램 등록 중 오류가 발생했습니다.', 500)
  }
}
