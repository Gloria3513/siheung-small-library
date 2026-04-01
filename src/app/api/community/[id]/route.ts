import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { updateCommunityPostSchema, verifyPasswordSchema } from '@/lib/validators'
import { errorResponse, successResponse, requireAdmin } from '@/lib/utils'

type RouteContext = { params: Promise<{ id: string }> }

// GET /api/community/:id - 커뮤니티 글 상세 (조회수 +1)
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const postId = parseInt(id, 10)

    const post = await prisma.communityPost.update({
      where: { id: postId },
      data: { viewCount: { increment: 1 } },
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

    if (!post) {
      return errorResponse('NOT_FOUND', '게시글을 찾을 수 없습니다.', 404)
    }

    // 이전/다음 글
    const [prevPost, nextPost] = await Promise.all([
      prisma.communityPost.findFirst({
        where: { id: { lt: postId } },
        orderBy: { id: 'desc' },
        select: { id: true, title: true },
      }),
      prisma.communityPost.findFirst({
        where: { id: { gt: postId } },
        orderBy: { id: 'asc' },
        select: { id: true, title: true },
      }),
    ])

    return successResponse({
      ...post,
      prevPost: prevPost || { id: 0, title: null },
      nextPost: nextPost || { id: 0, title: null },
    })
  } catch (error) {
    console.error('GET /api/community/[id] error:', error)
    return errorResponse('SERVER_ERROR', '게시글을 가져오는 중 오류가 발생했습니다.', 500)
  }
}

// PATCH /api/community/:id - 커뮤니티 글 수정 (비밀번호 확인)
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const postId = parseInt(id, 10)

    const existing = await prisma.communityPost.findUnique({ where: { id: postId } })
    if (!existing) {
      return errorResponse('NOT_FOUND', '게시글을 찾을 수 없습니다.', 404)
    }

    const body = await req.json()
    const result = updateCommunityPostSchema.safeParse(body)
    if (!result.success) {
      return errorResponse('VALIDATION_ERROR', result.error.errors[0].message, 400)
    }

    // 비밀번호 확인
    const isValid = await bcrypt.compare(result.data.password, existing.password)
    if (!isValid) {
      return errorResponse('FORBIDDEN', '비밀번호가 일치하지 않습니다.', 403)
    }

    const { password, ...updateData } = result.data
    const post = await prisma.communityPost.update({
      where: { id: postId },
      data: updateData,
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

    return successResponse(post)
  } catch (error) {
    console.error('PATCH /api/community/[id] error:', error)
    return errorResponse('SERVER_ERROR', '게시글 수정 중 오류가 발생했습니다.', 500)
  }
}

// DELETE /api/community/:id - 커뮤니티 글 삭제 (비밀번호 또는 관리자)
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const postId = parseInt(id, 10)

    const existing = await prisma.communityPost.findUnique({ where: { id: postId } })
    if (!existing) {
      return errorResponse('NOT_FOUND', '게시글을 찾을 수 없습니다.', 404)
    }

    // 관리자인 경우 비밀번호 없이 삭제 가능
    const session = await requireAdmin()
    if (!session) {
      // 비회원인 경우 비밀번호 확인
      const body = await req.json()
      const result = verifyPasswordSchema.safeParse(body)
      if (!result.success) {
        return errorResponse('VALIDATION_ERROR', '비밀번호를 입력해주세요.', 400)
      }

      const isValid = await bcrypt.compare(result.data.password, existing.password)
      if (!isValid) {
        return errorResponse('FORBIDDEN', '비밀번호가 일치하지 않습니다.', 403)
      }
    }

    await prisma.communityPost.delete({ where: { id: postId } })

    return successResponse({ id: postId, deleted: true })
  } catch (error) {
    console.error('DELETE /api/community/[id] error:', error)
    return errorResponse('SERVER_ERROR', '게시글 삭제 중 오류가 발생했습니다.', 500)
  }
}

// POST /api/community/:id - 비밀번호 확인 (verify-password 대체)
export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const postId = parseInt(id, 10)

    const existing = await prisma.communityPost.findUnique({ where: { id: postId } })
    if (!existing) {
      return errorResponse('NOT_FOUND', '게시글을 찾을 수 없습니다.', 404)
    }

    const body = await req.json()
    const result = verifyPasswordSchema.safeParse(body)
    if (!result.success) {
      return errorResponse('VALIDATION_ERROR', '비밀번호를 입력해주세요.', 400)
    }

    const isValid = await bcrypt.compare(result.data.password, existing.password)

    return successResponse({ verified: isValid })
  } catch (error) {
    console.error('POST /api/community/[id] error:', error)
    return errorResponse('SERVER_ERROR', '비밀번호 확인 중 오류가 발생했습니다.', 500)
  }
}
