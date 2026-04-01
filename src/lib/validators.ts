import { z } from 'zod'

// Libraries
export const createLibrarySchema = z.object({
  name: z.string().min(1, '이름은 필수입니다').max(100),
  address: z.string().min(1, '주소는 필수입니다').max(200),
  lat: z.number().optional(),
  lng: z.number().optional(),
  phone: z.string().max(20).optional(),
  hours: z.string().max(200).optional(),
  closedDays: z.string().optional(),
  description: z.string().optional(),
  specialProgram: z.string().optional(),
  imageUrl: z.string().optional(),
  homepageUrl: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
})

export const updateLibrarySchema = createLibrarySchema.partial()

// Posts
export const createPostSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다').max(200),
  content: z.string().min(1, '내용은 필수입니다'),
  category: z.enum(['notice', 'news', 'press']),
  images: z.array(z.string()).optional(),
  attachments: z
    .array(
      z.object({
        name: z.string(),
        url: z.string(),
        size: z.number(),
      })
    )
    .optional(),
  isPinned: z.boolean().optional(),
})

export const updatePostSchema = createPostSchema.partial()

// Programs
export const createProgramSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다').max(200),
  description: z.string().optional(),
  content: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(['planned', 'ongoing', 'completed']),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  imageUrl: z.string().optional(),
  location: z.string().optional(),
  targetAudience: z.string().optional(),
})

export const updateProgramSchema = createProgramSchema.partial()

// Community Posts
export const createCommunityPostSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다').max(200),
  content: z.string().min(1, '내용은 필수입니다'),
  category: z.enum(['free', 'book-recommend', 'reading-group', 'human-library']),
  authorName: z.string().min(1, '작성자명은 필수입니다').max(50),
  password: z.string().min(4, '비밀번호는 4자 이상이어야 합니다').max(20),
})

export const updateCommunityPostSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).optional(),
  password: z.string().min(4).max(20),
})

export const verifyPasswordSchema = z.object({
  password: z.string().min(1, '비밀번호를 입력해주세요'),
})

// Resources
export const createResourceSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다').max(200),
  description: z.string().optional(),
  category: z.enum(['minutes', 'archive', 'form', 'etc']),
  fileUrl: z.string().min(1, '파일 URL은 필수입니다'),
  fileName: z.string().min(1),
  fileSize: z.number().optional(),
})

export const updateResourceSchema = createResourceSchema.partial()

// Gallery
export const galleryImageSchema = z.object({
  id: z.number().optional(),
  imageUrl: z.string().min(1),
  caption: z.string().optional(),
  order: z.number().int().default(0),
})

export const createGallerySchema = z.object({
  title: z.string().min(1, '제목은 필수입니다').max(200),
  description: z.string().optional(),
  date: z.string().min(1, '날짜는 필수입니다'),
  images: z.array(galleryImageSchema).min(1, '최소 1장의 이미지가 필요합니다'),
})

export const updateGallerySchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  date: z.string().optional(),
  images: z.array(galleryImageSchema).optional(),
})
