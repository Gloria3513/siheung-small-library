import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'

export function getPaginationParams(searchParams: URLSearchParams, defaultLimit = 10) {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || String(defaultLimit), 10)))
  const skip = (page - 1) * limit

  return { page, limit, skip }
}

export function paginatedResponse<T>(data: T[], total: number, page: number, limit: number) {
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}

export function errorResponse(
  error: 'VALIDATION_ERROR' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'SERVER_ERROR' | 'FILE_TOO_LARGE' | 'UNSUPPORTED_FILE_TYPE',
  message: string,
  status: number
) {
  return Response.json({ error, message }, { status })
}

export function successResponse<T>(data: T, status = 200) {
  return Response.json({ data }, { status })
}

export async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as { role?: string })?.role !== 'admin') {
    return null
  }
  return session
}

export function generateExcerpt(html: string, maxLength = 150): string {
  const text = html.replace(/<[^>]*>/g, '').trim()
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function getSearchParam(req: NextRequest, key: string): string | null {
  return req.nextUrl.searchParams.get(key)
}
