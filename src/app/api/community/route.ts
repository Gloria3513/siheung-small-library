import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { createCommunityPostSchema } from '@/lib/validators'
import {
  getPaginationParams,
  paginatedResponse,
  errorResponse,
  successResponse,
} from '@/lib/utils'

// GET /api/community - 커뮤니티 글 목록
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const { page, limit, skip } = getPaginationParams(searchParams)
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    const where: Record<string, unknown> = {}
    if (category) where.category = category
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
      ]
    }

    const [data, total] = await Promise.all([
      prisma.communityPost.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          content: true,
          category: true,
          authorName: true,
          viewCount: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.communityPost.count({ where }),
    ])

    // Generate excerpt for list view
    const posts = data.map((post) => ({
      ...post,
      excerpt: post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
    }))

    return Response.json(paginatedResponse(posts, total, page, limit))
  } catch (error) {
    console.error('GET /api/community error:', error)
    return errorResponse('SERVER_ERROR', '커뮤니티 글 목록을 가져오는 중 오류가 발생했습니다.', 500)
  }
}

// POST /api/community - 커뮤니티 글 작성 (비회원도 가능)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = createCommunityPostSchema.safeParse(body)
    if (!result.success) {
      return errorResponse('VALIDATION_ERROR', result.error.errors[0].message, 400)
    }

    const { password, ...postData } = result.data
    const hashedPassword = await bcrypt.hash(password, 12)

    const post = await prisma.communityPost.create({
      data: {
        ...postData,
        password: hashedPassword,
      },
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        authorName: true,
        viewCount: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return successResponse(post, 201)
  } catch (error) {
    console.error('POST /api/community error:', error)
    return errorResponse('SERVER_ERROR', '커뮤니티 글 작성 중 오류가 발생했습니다.', 500)
  }
}
