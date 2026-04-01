import { writeFile, mkdir, unlink } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp']
const FILE_EXTENSIONS = ['pdf', 'doc', 'docx', 'hwp', 'hwpx', 'xlsx', 'pptx', 'zip']
const GALLERY_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']

const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB
const MAX_GALLERY_SIZE = 10 * 1024 * 1024 // 10MB

type UploadType = 'image' | 'file' | 'gallery'

function getUploadDir(type: UploadType): string {
  const dirs: Record<UploadType, string> = {
    image: 'public/uploads/images',
    file: 'public/uploads/files',
    gallery: 'public/uploads/galleries',
  }
  return dirs[type]
}

function getPublicUrl(type: UploadType, filename: string): string {
  const dirs: Record<UploadType, string> = {
    image: '/uploads/images',
    file: '/uploads/files',
    gallery: '/uploads/galleries',
  }
  return `${dirs[type]}/${filename}`
}

function getAllowedExtensions(type: UploadType): string[] {
  const exts: Record<UploadType, string[]> = {
    image: IMAGE_EXTENSIONS,
    file: FILE_EXTENSIONS,
    gallery: GALLERY_EXTENSIONS,
  }
  return exts[type]
}

function getMaxSize(type: UploadType): number {
  const sizes: Record<UploadType, number> = {
    image: MAX_IMAGE_SIZE,
    file: MAX_FILE_SIZE,
    gallery: MAX_GALLERY_SIZE,
  }
  return sizes[type]
}

export async function handleFileUpload(
  file: File,
  type: UploadType
): Promise<{ url: string; fileName: string; fileSize: number; mimeType: string }> {
  const ext = file.name.split('.').pop()?.toLowerCase() || ''
  const allowedExts = getAllowedExtensions(type)

  if (!allowedExts.includes(ext)) {
    throw new Error(`지원하지 않는 파일 형식입니다. 허용: ${allowedExts.join(', ')}`)
  }

  const maxSize = getMaxSize(type)
  if (file.size > maxSize) {
    throw new Error(`파일 크기가 초과되었습니다. 최대: ${maxSize / 1024 / 1024}MB`)
  }

  const uniqueName = `${uuidv4()}.${ext}`
  const uploadDir = path.join(process.cwd(), getUploadDir(type))

  await mkdir(uploadDir, { recursive: true })

  const buffer = Buffer.from(await file.arrayBuffer())
  const filePath = path.join(uploadDir, uniqueName)
  await writeFile(filePath, buffer)

  return {
    url: getPublicUrl(type, uniqueName),
    fileName: file.name,
    fileSize: file.size,
    mimeType: file.type,
  }
}

export async function deleteUploadedFile(url: string): Promise<void> {
  const filePath = path.join(process.cwd(), 'public', url)
  try {
    await unlink(filePath)
  } catch {
    // File may not exist, ignore
  }
}
