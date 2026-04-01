import { prisma } from "./prisma";
import {
  dummyPosts,
  dummyLibraries,
  dummyPrograms,
  dummyCommunityPosts,
  dummyResources,
  dummyGalleryAlbums,
} from "./dummy-data";

// DB 조회 시도, 실패하면 더미 데이터 반환

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
      include: { attachments: true },
    });
    return posts.map((p) => ({
      ...p,
      excerpt: p.excerpt ?? undefined,
      images: JSON.parse(p.images) as string[],
      category: p.category as "notice" | "news" | "press",
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  } catch {
    return dummyPosts;
  }
}

export async function getPostById(id: number) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { attachments: true },
    });
    if (!post) return null;
    await prisma.post.update({ where: { id }, data: { viewCount: { increment: 1 } } });

    const [prevPost, nextPost] = await Promise.all([
      prisma.post.findFirst({ where: { id: { lt: id } }, orderBy: { id: "desc" }, select: { id: true, title: true } }),
      prisma.post.findFirst({ where: { id: { gt: id } }, orderBy: { id: "asc" }, select: { id: true, title: true } }),
    ]);

    return {
      ...post,
      excerpt: post.excerpt ?? undefined,
      images: JSON.parse(post.images) as string[],
      category: post.category as "notice" | "news" | "press",
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      prevPost: prevPost || null,
      nextPost: nextPost || null,
    };
  } catch {
    const post = dummyPosts.find((p) => p.id === id);
    return post || null;
  }
}

export async function getLibraries() {
  try {
    const libraries = await prisma.library.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    return libraries.map((lib) => ({
      ...lib,
      lat: lib.lat ?? undefined,
      lng: lib.lng ?? undefined,
      phone: lib.phone ?? undefined,
      hours: lib.hours ?? undefined,
      closedDays: lib.closedDays ?? undefined,
      description: lib.description ?? undefined,
      specialProgram: lib.specialProgram ?? undefined,
      imageUrl: lib.imageUrl ?? undefined,
      homepageUrl: lib.homepageUrl ?? undefined,
      createdAt: lib.createdAt.toISOString(),
      updatedAt: lib.updatedAt.toISOString(),
    }));
  } catch {
    return dummyLibraries;
  }
}

export async function getLibraryById(id: number) {
  try {
    return await prisma.library.findUnique({ where: { id } });
  } catch {
    return dummyLibraries.find((l) => l.id === id) || null;
  }
}

export async function getPrograms() {
  try {
    const programs = await prisma.program.findMany({ orderBy: { startDate: "desc" } });
    return programs.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description ?? undefined,
      content: p.content ?? undefined,
      category: p.category ?? undefined,
      status: p.status as "planned" | "ongoing" | "completed",
      startDate: p.startDate?.toISOString(),
      endDate: p.endDate?.toISOString(),
      imageUrl: p.imageUrl ?? undefined,
      location: p.location ?? undefined,
      targetAudience: p.targetAudience ?? undefined,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  } catch {
    return dummyPrograms;
  }
}

export async function getProgramById(id: number) {
  try {
    return await prisma.program.findUnique({ where: { id } });
  } catch {
    return dummyPrograms.find((p) => p.id === id) || null;
  }
}

export async function getGalleries() {
  try {
    const galleries = await prisma.gallery.findMany({
      orderBy: { date: "desc" },
      include: { images: { orderBy: { order: "asc" } } },
    });
    return galleries.map((g) => ({
      id: g.id,
      title: g.title,
      description: g.description ?? undefined,
      date: g.date.toISOString(),
      imageCount: g.images.length,
      thumbnailUrl: g.images[0]?.imageUrl || undefined,
      images: g.images.map((img) => ({
        id: img.id,
        imageUrl: img.imageUrl,
        caption: img.caption ?? undefined,
        order: img.order,
      })),
      createdAt: g.createdAt.toISOString(),
    }));
  } catch {
    return dummyGalleryAlbums;
  }
}

export async function getGalleryById(id: number) {
  try {
    const album = await prisma.gallery.findUnique({
      where: { id },
      include: { images: { orderBy: { order: "asc" } } },
    });
    if (!album) return null;
    return {
      ...album,
      description: album.description ?? undefined,
      date: album.date.toISOString(),
      createdAt: album.createdAt.toISOString(),
      images: album.images.map((img) => ({
        id: img.id,
        imageUrl: img.imageUrl,
        caption: img.caption ?? undefined,
        order: img.order,
      })),
    };
  } catch {
    return dummyGalleryAlbums.find((a) => a.id === id) || null;
  }
}

export async function getResources() {
  try {
    const resources = await prisma.resource.findMany({ orderBy: { createdAt: "desc" } });
    return resources.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description ?? undefined,
      category: r.category as "minutes" | "archive" | "form" | "etc",
      fileUrl: r.fileUrl,
      fileName: r.fileName,
      fileSize: r.fileSize,
      downloadCount: r.downloadCount,
      createdAt: r.createdAt.toISOString(),
    }));
  } catch {
    return dummyResources;
  }
}

export async function getCommunityPosts() {
  try {
    const posts = await prisma.communityPost.findMany({ orderBy: { createdAt: "desc" } });
    return posts.map((p) => ({
      id: p.id,
      title: p.title,
      content: p.content,
      excerpt: p.content.replace(/<[^>]+>/g, "").slice(0, 100),
      category: p.category as "free" | "book-recommend" | "reading-group" | "human-library",
      authorName: p.authorName,
      viewCount: p.viewCount,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  } catch {
    return dummyCommunityPosts;
  }
}

export async function getCommunityPostById(id: number) {
  try {
    const post = await prisma.communityPost.findUnique({ where: { id } });
    if (!post) return null;
    await prisma.communityPost.update({ where: { id }, data: { viewCount: { increment: 1 } } });
    return post;
  } catch {
    const post = dummyCommunityPosts.find((p) => p.id === id);
    return post || null;
  }
}

export async function getLatestPosts(limit = 3) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
      take: limit,
    });
    return posts.map((p) => ({
      ...p,
      excerpt: p.excerpt ?? undefined,
      images: JSON.parse(p.images) as string[],
      category: p.category as "notice" | "news" | "press",
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  } catch {
    return dummyPosts.slice(0, limit);
  }
}

export async function getFeaturedLibraries(limit = 4) {
  try {
    const libraries = await prisma.library.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      take: limit,
    });
    return libraries.map((lib) => ({
      ...lib,
      lat: lib.lat ?? undefined,
      lng: lib.lng ?? undefined,
      phone: lib.phone ?? undefined,
      hours: lib.hours ?? undefined,
      closedDays: lib.closedDays ?? undefined,
      description: lib.description ?? undefined,
      specialProgram: lib.specialProgram ?? undefined,
      imageUrl: lib.imageUrl ?? undefined,
      homepageUrl: lib.homepageUrl ?? undefined,
      createdAt: lib.createdAt.toISOString(),
      updatedAt: lib.updatedAt.toISOString(),
    }));
  } catch {
    return dummyLibraries.slice(0, limit);
  }
}

export async function getActivePrograms(limit = 3) {
  try {
    const programs = await prisma.program.findMany({
      where: { status: { not: "completed" } },
      orderBy: { startDate: "asc" },
      take: limit,
    });
    return programs.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description ?? undefined,
      content: p.content ?? undefined,
      category: p.category ?? undefined,
      status: p.status as "planned" | "ongoing" | "completed",
      startDate: p.startDate?.toISOString(),
      endDate: p.endDate?.toISOString(),
      imageUrl: p.imageUrl ?? undefined,
      location: p.location ?? undefined,
      targetAudience: p.targetAudience ?? undefined,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  } catch {
    return dummyPrograms.filter((p) => p.status !== "completed").slice(0, limit);
  }
}
