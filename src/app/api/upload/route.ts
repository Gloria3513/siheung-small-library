import { NextRequest } from 'next/server'
import { errorResponse, successResponse, requireAdmin } from '@/lib/utils'
import { handleFileUpload, deleteUploadedFile } from '@/lib/upload'

// POST /api/upload - 파일 업로드 (관리자)
export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return errorResponse('UNAUTHORIZED', '관리자 로그인이 필요합니다.', 401)
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const files = formData.getAll('files') as File[]
    const type = (formData.get('type') as string) || 'image'

    if (!['image', 'file', 'gallery'].includes(type)) {
      return errorResponse('VALIDATION_ERROR', '올바른 파일 타입을 지정해주세요. (image, file, gallery)', 400)
    }

    const uploadType = type as 'image' | 'file' | 'gallery'

    // 다중 파일 업로드
    if (files.length > 0 && !file) {
      if (files.length > 20) {
        return errorResponse('VALIDATION_ERROR', '한 번에 최대 20개 파일까지 업로드할 수 있습니다.', 400)
      }

      const results = []
      for (const f of files) {
        try {
          const result = await handleFileUpload(f, uploadType)
          results.push(result)
        } catch (err) {
          return errorResponse(
            'VALIDATION_ERROR',
            err instanceof Error ? err.message : '파일 업로드 실패',
            400
          )
        }
      }

      return successResponse(results)
    }

    // 단일 파일 업로드
    if (!file) {
      return errorResponse('VALIDATION_ERROR', '파일을 선택해주세요.', 400)
    }

    try {
      const result = await handleFileUpload(file, uploadType)
      return successResponse(result)
    } catch (err) {
      const message = err instanceof Error ? err.message : '파일 업로드 실패'
      if (message.includes('파일 형식')) {
        return errorResponse('UNSUPPORTED_FILE_TYPE', message, 415)
      }
      if (message.includes('파일 크기')) {
        return errorResponse('FILE_TOO_LARGE', message, 413)
      }
      return errorResponse('VALIDATION_ERROR', message, 400)
    }
  } catch (error) {
    console.error('POST /api/upload error:', error)
    return errorResponse('SERVER_ERROR', '파일 업로드 중 오류가 발생했습니다.', 500)
  }
}

// DELETE /api/upload - 업로드된 파일 삭제 (관리자)
export async function DELETE(req: NextRequest) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return errorResponse('UNAUTHORIZED', '관리자 로그인이 필요합니다.', 401)
    }

    const body = await req.json()
    const { url } = body

    if (!url || typeof url !== 'string') {
      return errorResponse('VALIDATION_ERROR', '삭제할 파일 URL을 지정해주세요.', 400)
    }

    // Ensure the URL is within uploads directory
    if (!url.startsWith('/uploads/')) {
      return errorResponse('VALIDATION_ERROR', '올바른 업로드 파일 URL이 아닙니다.', 400)
    }

    await deleteUploadedFile(url)

    return successResponse({ deleted: true })
  } catch (error) {
    console.error('DELETE /api/upload error:', error)
    return errorResponse('SERVER_ERROR', '파일 삭제 중 오류가 발생했습니다.', 500)
  }
}
