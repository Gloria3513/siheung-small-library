import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updatePostSchema } from '@/lib/validators'
import { errorResponse, successResponse, requireAdmin, generateExcerpt } from '@/lib/utils'

type RouteContext = { params: Promise<{ id: string }> }

// GET /api/posts/:id - 게시글 상세 조회 (조회수 +1)
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const postId = parseInt(id, 10)

    const post = await prisma.post.update({
      where: { id: postId },
      data: { viewCount: { increment: 1 } },
      include: { attachments: true },
    })

    if (!post) {
      return errorResponse('NOT_FOUND', '게시글을 찾을 수 없습니다.', 404)
    }

    // 이전/다음 게시글
    const [prevPost, nextPost] = await Promise.all([
      prisma.post.findFirst({
        where: { id: { lt: postId }, category: post.category },
        orderBy: { id: 'desc' },
        select: { id: true, title: true },
      }),
      prisma.post.findFirst({
        where: { id: { gt: postId }, category: post.category },
        orderBy: { id: 'asc' },
        select: { id: true, title: true },
      }),
    ])

    return successResponse({
      ...post,
      images: JSON.parse(post.images),
      prevPost: prevPost || { id: 0, title: null },
      nextPost: nextPost || { id: 0, title: null },
    })
  } catch (error) {
    console.error('GET /api/posts/[id] error:', error)
    return errorResponse('SERVER_ERROR', '게시글을 가져오는 중 오류가 발생했습니다.', 500)
  }
}

// PATCH /api/posts/:id - 게시글 수정 (관리자)
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return errorResponse('UNAUTHORIZED', '관리자 로그인이 필요합니다.', 401)
    }

    const { id } = await context.params
    const postId = parseInt(id, 10)

    const existing = await prisma.post.findUnique({ where: { id: postId } })
    if (!existing) {
      return errorResponse('NOT_FOUND', '게시글을 찾을 수 없습니다.', 404)
    }

    const body = await req.json()
    const result = updatePostSchema.safeParse(body)
    if (!result.success) {
      return errorResponse('VALIDATION_ERROR', result.error.errors[0].message, 400)
    }

    const { attachments, images, ...postData } = result.data

    // Update attachments: delete existing and create new ones
    if (attachments) {
      await prisma.attachment.deleteMany({ where: { postId } })
    }

    const updateData: Record<string, unknown> = { ...postData }
    if (images) updateData.images = JSON.stringify(images)
    if (postData.content) updateData.excerpt = generateExcerpt(postData.content)
    if (attachments) {
      updateData.attachments = { create: attachments }
    }

    const post = await prisma.post.update({
      where: { id: postId },
      data: updateData,
      include: { attachments: true },
    })

    return successResponse({ ...post, images: JSON.parse(post.images) })
  } catch (error) {
    console.error('PATCH /api/posts/[id] error:', error)
    return errorResponse('SERVER_ERROR', '게시글 수정 중 오류가 발생했습니다.', 500)
  }
}

// DELETE /api/posts/:id - 게시글 삭제 (관리자)
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return errorResponse('UNAUTHORIZED', '관리자 로그인이 필요합니다.', 401)
    }

    const { id } = await context.params
    const postId = parseInt(id, 10)

    const existing = await prisma.post.findUnique({ where: { id: postId } })
    if (!existing) {
      return errorResponse('NOT_FOUND', '게시글을 찾을 수 없습니다.', 404)
    }

    await prisma.post.delete({ where: { id: postId } })

    return successResponse({ id: postId, deleted: true })
  } catch (error) {
    console.error('DELETE /api/posts/[id] error:', error)
    return errorResponse('SERVER_ERROR', '게시글 삭제 중 오류가 발생했습니다.', 500)
  }
}
