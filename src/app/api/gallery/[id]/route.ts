import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateGallerySchema } from '@/lib/validators'
import { errorResponse, successResponse, requireAdmin } from '@/lib/utils'

type RouteContext = { params: Promise<{ id: string }> }

// GET /api/gallery/:id - 앨범 상세 (이미지 포함)
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const gallery = await prisma.gallery.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!gallery) {
      return errorResponse('NOT_FOUND', '갤러리를 찾을 수 없습니다.', 404)
    }

    return successResponse(gallery)
  } catch (error) {
    console.error('GET /api/gallery/[id] error:', error)
    return errorResponse('SERVER_ERROR', '갤러리 정보를 가져오는 중 오류가 발생했습니다.', 500)
  }
}

// PATCH /api/gallery/:id - 앨범 수정 (관리자)
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return errorResponse('UNAUTHORIZED', '관리자 로그인이 필요합니다.', 401)
    }

    const { id } = await context.params
    const galleryId = parseInt(id, 10)

    const existing = await prisma.gallery.findUnique({
      where: { id: galleryId },
      include: { images: true },
    })
    if (!existing) {
      return errorResponse('NOT_FOUND', '갤러리를 찾을 수 없습니다.', 404)
    }

    const body = await req.json()
    const result = updateGallerySchema.safeParse(body)
    if (!result.success) {
      return errorResponse('VALIDATION_ERROR', result.error.errors[0].message, 400)
    }

    const { images, date, ...updateData } = result.data

    // Update gallery metadata
    const galleryUpdateData: Record<string, unknown> = { ...updateData }
    if (date) galleryUpdateData.date = new Date(date)

    // Handle images: delete all existing and re-create
    if (images) {
      await prisma.galleryImage.deleteMany({ where: { galleryId } })
      galleryUpdateData.images = {
        create: images.map((img) => ({
          imageUrl: img.imageUrl,
          caption: img.caption,
          order: img.order,
        })),
      }
    }

    const gallery = await prisma.gallery.update({
      where: { id: galleryId },
      data: galleryUpdateData,
      include: { images: { orderBy: { order: 'asc' } } },
    })

    return successResponse(gallery)
  } catch (error) {
    console.error('PATCH /api/gallery/[id] error:', error)
    return errorResponse('SERVER_ERROR', '갤러리 수정 중 오류가 발생했습니다.', 500)
  }
}

// DELETE /api/gallery/:id - 앨범 삭제 (관리자)
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return errorResponse('UNAUTHORIZED', '관리자 로그인이 필요합니다.', 401)
    }

    const { id } = await context.params
    const galleryId = parseInt(id, 10)

    const existing = await prisma.gallery.findUnique({ where: { id: galleryId } })
    if (!existing) {
      return errorResponse('NOT_FOUND', '갤러리를 찾을 수 없습니다.', 404)
    }

    await prisma.gallery.delete({ where: { id: galleryId } })

    return successResponse({ id: galleryId, deleted: true })
  } catch (error) {
    console.error('DELETE /api/gallery/[id] error:', error)
    return errorResponse('SERVER_ERROR', '갤러리 삭제 중 오류가 발생했습니다.', 500)
  }
}
