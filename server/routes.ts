import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDiarySchema, insertBlogPostSchema, insertCommentSchema, insertNewsletterSchema, insertContactSchema, insertGalleryImageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Diaries routes
  app.get("/api/diaries", async (req, res) => {
    try {
      const { region, tags, search, limit = "10", offset = "0" } = req.query;
      const diaries = await storage.getDiaries({
        region: region as string,
        tags: tags as string,
        search: search as string,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      });
      res.json(diaries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch diaries" });
    }
  });

  app.get("/api/diaries/:slug", async (req, res) => {
    try {
      const diary = await storage.getDiaryBySlug(req.params.slug);
      if (!diary) {
        return res.status(404).json({ message: "Diary not found" });
      }
      res.json(diary);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch diary" });
    }
  });

  app.post("/api/diaries", async (req, res) => {
    try {
      const validatedData = insertDiarySchema.parse(req.body);
      const diary = await storage.createDiary(validatedData);
      res.status(201).json(diary);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create diary" });
    }
  });

  // Blog posts routes
  app.get("/api/blog", async (req, res) => {
    try {
      const { category, tags, search, limit = "10", offset = "0" } = req.query;
      const posts = await storage.getBlogPosts({
        category: category as string,
        tags: tags as string,
        search: search as string,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  // Comments routes
  app.get("/api/comments/:type/:id", async (req, res) => {
    try {
      const { type, id } = req.params;
      const comments = await storage.getComments(type as 'diary' | 'blog', parseInt(id));
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  app.post("/api/comments", async (req, res) => {
    try {
      const validatedData = insertCommentSchema.parse(req.body);
      const comment = await storage.createComment(validatedData);
      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create comment" });
    }
  });

  // Newsletter routes
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription(validatedData);
      res.status(201).json(subscription);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      if (error.message.includes("unique")) {
        return res.status(409).json({ message: "Email already subscribed" });
      }
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to send contact message" });
    }
  });

  // Gallery routes
  app.get("/api/gallery", async (req, res) => {
    try {
      const { limit = "20", offset = "0" } = req.query;
      const images = await storage.getGalleryImages({
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      });
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery images" });
    }
  });

  app.post("/api/gallery", async (req, res) => {
    try {
      const validatedData = insertGalleryImageSchema.parse(req.body);
      const image = await storage.createGalleryImage(validatedData);
      res.status(201).json(image);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create gallery image" });
    }
  });

  // Search route
  app.get("/api/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ message: "Search query required" });
      }
      const results = await storage.searchContent(q as string);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to search content" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
