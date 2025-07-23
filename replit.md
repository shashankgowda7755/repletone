# Milesalone Travel Blog

## Overview

Milesalone is a travel blog application documenting a 4-month backpacking journey from Kashmir to Kanyakumari in India. The application serves as a comprehensive platform for sharing travel diaries, blog posts, photos, and connecting with fellow travelers through a newsletter system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: React Query (TanStack Query) for server state and React Context for local state
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API architecture
- **Environment**: Node.js with ES modules

### Project Structure
```
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions and query client
├── server/                # Backend application
│   ├── db.ts             # Database connection
│   ├── routes.ts         # API route handlers
│   ├── storage.ts        # Database operations
│   └── index.ts          # Express server setup
├── shared/               # Shared TypeScript types and schemas
└── migrations/           # Database migrations
```

## Key Components

### Database Schema
The application uses a comprehensive database schema with the following main entities:

1. **Diaries**: Travel diary entries with detailed sections (journey, how to reach, where to stay, what to eat, what to do, tips, photos, closing quote)
2. **Blog Posts**: Philosophy posts, gear reviews, travel tips, and personal reflections
3. **Comments**: User interactions on diaries and blog posts
4. **Newsletter**: Email subscription management
5. **Contacts**: Contact form submissions
6. **Gallery Images**: Photo collection with metadata
7. **Users**: Authentication system (admin access)

### Frontend Components
- **Layout Components**: Navbar with responsive design, Footer with newsletter signup
- **Content Components**: Diary cards, blog cards, gallery grids with masonry layout
- **Forms**: Contact forms, newsletter signup, comment submission
- **Modals**: Newsletter modal, lightbox for image viewing
- **UI Library**: Complete shadcn/ui component set for consistent design

### API Structure
RESTful endpoints for:
- `/api/diaries` - CRUD operations for travel diaries
- `/api/blog` - Blog post management
- `/api/comments` - Comment system
- `/api/newsletter` - Email subscription
- `/api/contact` - Contact form handling
- `/api/gallery` - Image gallery management

## Data Flow

### Content Management
1. Admin creates diary entries with 8 mandatory sections
2. Content is stored in PostgreSQL with rich metadata (tags, regions, read time)
3. Frontend fetches and displays content with filtering and search capabilities

### User Interaction
1. Visitors can browse diaries, blog posts, and gallery
2. Newsletter subscription through multiple touchpoints
3. Contact form for direct communication
4. Comment system for engagement (with moderation)

### Image Handling
1. Gallery images stored with metadata (title, description, location)
2. Lightbox modal for enhanced viewing experience
3. Masonry layout for optimal visual presentation

## External Dependencies

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless component primitives
- **Lucide React**: Icon library
- **Embla Carousel**: Image carousel functionality

### Database and Backend
- **Drizzle ORM**: Type-safe database operations
- **Neon Database**: Serverless PostgreSQL hosting
- **Zod**: Runtime type validation
- **Express**: Web framework

### Development Tools
- **Vite**: Build tool and dev server
- **TypeScript**: Type safety across the stack
- **React Hook Form**: Form state management
- **Date-fns**: Date manipulation utilities

## Deployment Strategy

### Build Process
1. Frontend builds to `dist/public` using Vite
2. Backend compiles with esbuild to `dist/index.js`
3. Single deployment artifact with static assets served by Express

### Database Management
- Drizzle migrations in `migrations/` directory
- Schema defined in `shared/schema.ts`
- Environment-based database URL configuration

### Environment Configuration
- Development: Local development server with HMR
- Production: Optimized builds with static asset serving
- Database migrations managed through `drizzle-kit push`

The application follows a modern full-stack architecture with strong type safety, responsive design, and comprehensive content management capabilities tailored for travel blogging and community engagement.