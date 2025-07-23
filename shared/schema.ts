import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const diaries = pgTable("diaries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  location: text("location").notNull(),
  region: text("region").notNull(),
  excerpt: text("excerpt").notNull(),
  featuredImage: text("featured_image").notNull(),
  journey: text("journey").notNull(),
  howToReach: text("how_to_reach").notNull(),
  whereToStay: text("where_to_stay").notNull(),
  whatToEat: text("what_to_eat").notNull(),
  whatToDo: text("what_to_do").notNull(),
  tips: text("tips").notNull(),
  photos: json("photos").$type<string[]>().notNull().default([]),
  closingQuote: text("closing_quote").notNull(),
  tags: json("tags").$type<string[]>().notNull().default([]),
  readTime: integer("read_time").notNull(),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  featuredImage: text("featured_image").notNull(),
  category: text("category").notNull(),
  tags: json("tags").$type<string[]>().notNull().default([]),
  readTime: integer("read_time").notNull(),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  message: text("message").notNull(),
  diaryId: integer("diary_id"),
  blogPostId: integer("blog_post_id"),
  approved: boolean("approved").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribed: boolean("subscribed").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  category: text("category").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  location: text("location").notNull(),
  diaryId: integer("diary_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Relations
export const diariesRelations = relations(diaries, ({ many }) => ({
  comments: many(comments),
  galleryImages: many(galleryImages),
}));

export const blogPostsRelations = relations(blogPosts, ({ many }) => ({
  comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  diary: one(diaries, {
    fields: [comments.diaryId],
    references: [diaries.id],
  }),
  blogPost: one(blogPosts, {
    fields: [comments.blogPostId],
    references: [blogPosts.id],
  }),
}));

export const galleryImagesRelations = relations(galleryImages, ({ one }) => ({
  diary: one(diaries, {
    fields: [galleryImages.diaryId],
    references: [diaries.id],
  }),
}));

// Insert schemas
export const insertDiarySchema = createInsertSchema(diaries).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCommentSchema = createInsertSchema(comments).omit({
  id: true,
  createdAt: true,
  approved: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletters).omit({
  id: true,
  createdAt: true,
  subscribed: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
  read: true,
});

export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Types
export type Diary = typeof diaries.$inferSelect;
export type InsertDiary = z.infer<typeof insertDiarySchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type Comment = typeof comments.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;

export type Newsletter = typeof newsletters.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
