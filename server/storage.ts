import { 
  users, 
  diaries,
  blogPosts,
  comments,
  newsletters,
  contacts,
  galleryImages,
  type User, 
  type InsertUser,
  type Diary,
  type InsertDiary,
  type BlogPost,
  type InsertBlogPost,
  type Comment,
  type InsertComment,
  type Newsletter,
  type InsertNewsletter,
  type Contact,
  type InsertContact,
  type GalleryImage,
  type InsertGalleryImage
} from "@shared/schema";
import { db } from "./db";
import { eq, ilike, or, and, desc, asc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Diary methods
  getDiaries(options: {
    region?: string;
    tags?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<Diary[]>;
  getDiaryBySlug(slug: string): Promise<Diary | undefined>;
  createDiary(diary: InsertDiary): Promise<Diary>;

  // Blog methods
  getBlogPosts(options: {
    category?: string;
    tags?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;

  // Comment methods
  getComments(type: 'diary' | 'blog', id: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;

  // Newsletter methods
  createNewsletterSubscription(subscription: InsertNewsletter): Promise<Newsletter>;

  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;

  // Gallery methods
  getGalleryImages(options: {
    limit?: number;
    offset?: number;
  }): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;

  // Search method
  searchContent(query: string): Promise<{
    diaries: Diary[];
    blogPosts: BlogPost[];
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getDiaries(options: {
    region?: string;
    tags?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<Diary[]> {
    const { region, tags, search, limit = 10, offset = 0 } = options;
    let query = db.select().from(diaries).where(eq(diaries.published, true));

    const conditions = [];

    if (region) {
      conditions.push(eq(diaries.region, region));
    }

    if (search) {
      conditions.push(
        or(
          ilike(diaries.title, `%${search}%`),
          ilike(diaries.excerpt, `%${search}%`),
          ilike(diaries.location, `%${search}%`)
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const result = await query
      .orderBy(desc(diaries.createdAt))
      .limit(limit)
      .offset(offset);

    return result;
  }

  async getDiaryBySlug(slug: string): Promise<Diary | undefined> {
    const [diary] = await db
      .select()
      .from(diaries)
      .where(and(eq(diaries.slug, slug), eq(diaries.published, true)));
    return diary || undefined;
  }

  async createDiary(diary: InsertDiary): Promise<Diary> {
    const [newDiary] = await db
      .insert(diaries)
      .values({
        ...diary,
        updatedAt: new Date(),
      })
      .returning();
    return newDiary;
  }

  async getBlogPosts(options: {
    category?: string;
    tags?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<BlogPost[]> {
    const { category, tags, search, limit = 10, offset = 0 } = options;
    let query = db.select().from(blogPosts).where(eq(blogPosts.published, true));

    const conditions = [];

    if (category) {
      conditions.push(eq(blogPosts.category, category));
    }

    if (search) {
      conditions.push(
        or(
          ilike(blogPosts.title, `%${search}%`),
          ilike(blogPosts.excerpt, `%${search}%`),
          ilike(blogPosts.content, `%${search}%`)
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const result = await query
      .orderBy(desc(blogPosts.createdAt))
      .limit(limit)
      .offset(offset);

    return result;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true)));
    return post || undefined;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db
      .insert(blogPosts)
      .values({
        ...post,
        updatedAt: new Date(),
      })
      .returning();
    return newPost;
  }

  async getComments(type: 'diary' | 'blog', id: number): Promise<Comment[]> {
    const whereCondition = type === 'diary' 
      ? and(eq(comments.diaryId, id), eq(comments.approved, true))
      : and(eq(comments.blogPostId, id), eq(comments.approved, true));

    const result = await db
      .select()
      .from(comments)
      .where(whereCondition)
      .orderBy(desc(comments.createdAt));

    return result;
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const [newComment] = await db
      .insert(comments)
      .values(comment)
      .returning();
    return newComment;
  }

  async createNewsletterSubscription(subscription: InsertNewsletter): Promise<Newsletter> {
    const [newSubscription] = await db
      .insert(newsletters)
      .values(subscription)
      .returning();
    return newSubscription;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db
      .insert(contacts)
      .values(contact)
      .returning();
    return newContact;
  }

  async getGalleryImages(options: {
    limit?: number;
    offset?: number;
  }): Promise<GalleryImage[]> {
    const { limit = 20, offset = 0 } = options;
    const result = await db
      .select()
      .from(galleryImages)
      .orderBy(desc(galleryImages.createdAt))
      .limit(limit)
      .offset(offset);

    return result;
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const [newImage] = await db
      .insert(galleryImages)
      .values(image)
      .returning();
    return newImage;
  }

  async searchContent(query: string): Promise<{
    diaries: Diary[];
    blogPosts: BlogPost[];
  }> {
    const diariesResult = await db
      .select()
      .from(diaries)
      .where(
        and(
          eq(diaries.published, true),
          or(
            ilike(diaries.title, `%${query}%`),
            ilike(diaries.excerpt, `%${query}%`),
            ilike(diaries.location, `%${query}%`),
            ilike(diaries.journey, `%${query}%`)
          )
        )
      )
      .orderBy(desc(diaries.createdAt))
      .limit(10);

    const blogPostsResult = await db
      .select()
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.published, true),
          or(
            ilike(blogPosts.title, `%${query}%`),
            ilike(blogPosts.excerpt, `%${query}%`),
            ilike(blogPosts.content, `%${query}%`)
          )
        )
      )
      .orderBy(desc(blogPosts.createdAt))
      .limit(10);

    return {
      diaries: diariesResult,
      blogPosts: blogPostsResult,
    };
  }
}

export const storage = new DatabaseStorage();