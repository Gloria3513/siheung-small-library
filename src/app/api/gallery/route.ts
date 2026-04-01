import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createGallerySchema } from '@/lib/validators'
import {
  getPaginationParams,
  paginatedResponse,
  errorResponse,
  successResponse,
  requireAdmin,
} from '@/lib/utils'

// GET /api/gallery - 갤러리 앨범 목록
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const { page, limit, skip } = getPaginationParams(searchParams, 12)
    const search = searchParams.get('search')
    const year = searchParams.get('year')

    const where: Record<string, unknown> = {}
    if (search) {
      where.title = { contains: search }
    }
    if (year) {
      const yearNum = parseInt(year, 10)
      where.date = {
        gte: new Date(`${yearNum}-01-01`),
        lt: new Date(`${yearNum + 1}-01-01`),
      }
    }

    const [data, total] = await Promise.all([
      prisma.gallery.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'desc' },
        include: {
          _count: { select: { images: true } },
          images: {
            take: 1,
            orderBy: { order: 'asc' },
            select: { imageUrl: true },
          },
        },
      }),
      prisma.gallery.count({ where }),
    ])

    const albums = data.map((gallery) => ({
      id: gallery.id,
      title: gallery.title,
      description: gallery.description,
      date: gallery.date,
      thumbnailUrl: gallery.images[0]?.imageUrl || null,
      imageCount: gallery._count.images,
      createdAt: gallery.createdAt,
    }))

    return Response.json(paginatedResponse(albums, total, page, limit))
  } catch (error) {
    console.error('GET /api/gallery error:', error)
    return errorResponse('SERVER_ERROR', '갤러리 목록을 가져오는 중 오류가 발생했습니다.', 500)
  }
}

// POST /api/gallery - 갤러리 앨범 생성 (관리자)
export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return errorResponse('UNAUTHORIZED', '관리자 로그인이 필요합니다.', 401)
    }

    const body = await req.json()
    const result = createGallerySchema.safeParse(body)
    if (!result.success) {
      return errorResponse('VALIDATION_ERROR', result.error.errors[0].message, 400)
    }

    const { images, ...galleryData } = result.data
    const gallery = await prisma.gallery.create({
      data: {
        ...galleryData,
        date: new Date(galleryData.date),
        images: {
          create: images.map((img) => ({
            imageUrl: img.imageUrl,
            caption: img.caption,
            order: img.order,
          })),
        },
      },
      include: { images: true },
    })

    return successResponse(gallery, 201)
  } catch (error) {
    console.error('POST /api/gallery error:', error)
    return errorResponse('SERVER_ERROR', '갤러리 생성 중 오류가 발생했습니다.', 500)
  }
}
