import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createPostSchema } from '@/lib/validators'
import {
  getPaginationParams,
  paginatedResponse,
  errorResponse,
  successResponse,
  requireAdmin,
  generateExcerpt,
} from '@/lib/utils'

// GET /api/posts - 게시글 목록 조회
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const { page, limit, skip } = getPaginationParams(searchParams)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const pinned = searchParams.get('pinned')

    const where: Record<string, unknown> = {}
    if (category) where.category = category
    if (pinned === 'true') where.isPinned = true
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
      ]
    }

    const [data, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
        include: { attachments: true },
      }),
      prisma.post.count({ where }),
    ])

    // Parse images JSON string to array for response
    const posts = data.map((post) => ({
      ...post,
      images: JSON.parse(post.images),
    }))

    return Response.json(paginatedResponse(posts, total, page, limit))
  } catch (error) {
    console.error('GET /api/posts error:', error)
    return errorResponse('SERVER_ERROR', '게시글 목록을 가져오는 중 오류가 발생했습니다.', 500)
  }
}

// POST /api/posts - 게시글 작성 (관리자)
export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return errorResponse('UNAUTHORIZED', '관리자 로그인이 필요합니다.', 401)
    }

    const body = await req.json()
    const result = createPostSchema.safeParse(body)
    if (!result.success) {
      return errorResponse('VALIDATION_ERROR', result.error.errors[0].message, 400)
    }

    const { attachments, images, ...postData } = result.data

    const post = await prisma.post.create({
      data: {
        ...postData,
        images: JSON.stringify(images || []),
        excerpt: generateExcerpt(postData.content),
        attachments: attachments
          ? { create: attachments }
          : undefined,
      },
      include: { attachments: true },
    })

    return successResponse(
      { ...post, images: JSON.parse(post.images) },
      201
    )
  } catch (error) {
    console.error('POST /api/posts error:', error)
    return errorResponse('SERVER_ERROR', '게시글 작성 중 오류가 발생했습니다.', 500)
  }
}
