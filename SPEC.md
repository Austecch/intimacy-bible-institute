# Intimacy Bible Institute (IBI) - Learning Management System

## Concept & Vision

A serene, Apple-inspired digital sanctuary for theological education. The platform embodies spiritual intimacy through generous white space, reverent typography, and whisper-soft interactions. Every screen feels like opening a beautifully bound scripture—unhurried, contemplative, and deeply intentional. The design whispers "sacred learning" rather than shouting it.

---

## Design Language

### Aesthetic Direction
**Reference:** Apple meets monastic minimalism—clean geometric layouts with spiritual warmth. Think Notion's whitespace philosophy crossed with a high-end retreat center brochure.

### Color Palette
```css
--color-primary: #1C1917;        /* Stone 900 - primary text */
--color-secondary: #57534E;      /* Stone 600 - secondary text */
--color-muted: #A8A29E;          /* Stone 400 - muted elements */
--color-border: #E7E5E4;         /* Stone 200 - subtle borders */
--color-surface: #FAFAF9;        /* Stone 50 - card backgrounds */
--color-background: #FFFFFF;      /* Pure white - page background */
--color-accent: #7C3AED;         /* Violet 600 - spiritual accent */
--color-accent-light: #EDE9FE;   /* Violet 100 - accent backgrounds */
--color-gold: #B8860B;           /* Dark goldenrod - premium highlights */
--color-success: #059669;        /* Emerald 600 - completion states */
--color-warning: #D97706;         /* Amber 600 - attention states */
```

### Typography
- **Headings:** Inter (weight 600-700), tracking -0.02em
- **Body:** Inter (weight 400-500), line-height 1.6
- **Scripture/Quotes:** Crimson Pro (serif), italic, weight 400
- **Scale:** 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72px

### Spatial System
- Base unit: 4px
- Component padding: 16px, 24px, 32px
- Section spacing: 64px, 80px, 120px
- Card border-radius: 16px
- Button border-radius: 12px
- Input border-radius: 10px

### Motion Philosophy
- **Micro-interactions:** 150-200ms ease-out (hover states, button feedback)
- **Page transitions:** 300ms ease-in-out (route changes, modal opens)
- **Stagger animations:** 50ms delay between items on list reveals
- **Scroll animations:** Subtle fade-up (translateY 20px → 0, opacity 0 → 1)
- **Principle:** Motion should feel like a gentle breath, never jarring

### Visual Assets
- **Icons:** Lucide React (outline style, stroke-width 1.5)
- **Images:** Unsplash (spiritual/educational imagery)
- **Decorative:** Subtle gradient overlays, soft drop shadows (0 4px 24px rgba(0,0,0,0.06))

---

## Layout & Structure

### Global Architecture
```
Public Website (/)
├── Marketing pages (no sidebar)
├── Minimal header (logo + nav + CTA)
└── Full-width content sections

Student Dashboard (/dashboard)
├── Collapsible sidebar (logo, nav, profile)
├── Top bar (search, notifications, quick actions)
└── Content area with breadcrumbs

Admin Dashboard (/admin)
├── Persistent sidebar (full navigation)
├── Top bar with user menu
└── Content area with data tables/forms
```

### Responsive Strategy
- **Mobile-first** with breakpoints at 640px, 768px, 1024px, 1280px
- **Sidebar:** Collapsible on mobile, icon-only on tablet, full on desktop
- **Cards:** Stack on mobile, 2-3 columns on tablet, 4 columns on desktop
- **Navigation:** Bottom tabs on mobile student dashboard

---

## Features & Interactions

### Public Website

#### Navigation
- Sticky header with blur backdrop on scroll
- Mobile: Hamburger menu with slide-out drawer
- Active states: Subtle underline animation
- CTA button: "Apply Now" with hover glow effect

#### Hero Section
- Full-viewport height with centered content
- Gradient overlay on background image
- Animated text reveal (staggered fade-up)
- Primary CTA with ripple effect on click
- Secondary ghost button

#### Course Cards
- Hover: Lift effect (translateY -4px, shadow increase)
- Progress indicator for enrolled courses
- Smooth image zoom on hover (scale 1.05)
- Tag badges for course type/level

#### Testimonials
- Horizontal scroll carousel
- Auto-advance every 5 seconds
- Pause on hover
- Dot indicators with active state animation

### Student Dashboard

#### Course Player
- Video player with custom controls (Apple-style)
- Chapter sidebar (collapsible)
- Lesson notes tab
- Auto-progress save (every 10 seconds)
- Resume playback prompt

#### Progress Tracking
- Circular progress indicator
- Module checklist with strike-through animation
- Confetti animation on course completion
- Certificate preview

#### Quiz Interface
- One question per screen
- Progress bar at top
- Answer options with hover states
- Immediate feedback (correct/incorrect)
- Results summary with breakdown

### Admin Dashboard

#### Data Tables
- Sortable columns
- Row hover highlighting
- Bulk selection with checkboxes
- Pagination with page size selector
- Search with debounced input

#### Course Builder
- Drag-and-drop module ordering
- Inline lesson editing
- Media upload with progress indicator
- Preview mode toggle
- Auto-save indicator

---

## Component Inventory

### Buttons
- **Primary:** Violet background, white text, shadow on hover
- **Secondary:** White background, violet text, border on hover
- **Ghost:** Transparent, text only, underline on hover
- **Icon:** Circular, subtle background on hover
- **States:** Default, hover (lift + shadow), active (scale 0.98), disabled (opacity 0.5)

### Cards
- **Course Card:** Image top, content bottom, progress bar, hover lift
- **Stat Card:** Icon, number, label, trend indicator
- **Testimonial Card:** Quote, avatar, name, role
- **Content Card:** Generic with header, body, footer slots

### Form Elements
- **Input:** Full-width, soft border, focus ring animation
- **Select:** Custom dropdown with smooth open animation
- **Checkbox/Radio:** Custom styled with spring animation
- **Toggle:** iOS-style switch with smooth transition
- **File Upload:** Drag-and-drop zone with preview

### Navigation
- **Sidebar Item:** Icon + label, active state with accent background
- **Breadcrumbs:** Chevron separators, truncate middle items
- **Tabs:** Underline indicator with slide animation
- **Pagination:** Number buttons with ellipsis for large sets

### Feedback
- **Toast:** Slide in from top-right, auto-dismiss with progress
- **Modal:** Backdrop blur, centered content, close on escape
- **Skeleton:** Shimmer animation for loading states
- **Empty State:** Illustration, message, action button

---

## Technical Approach

### Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS with custom configuration
- **Components:** shadcn/ui (customized to design system)
- **Icons:** Lucide React
- **Animation:** Framer Motion
- **State:** React Context + Hooks (or Zustand for complex state)
- **Data Fetching:** Server Components + Server Actions

### File Structure
```
/app
├── (public)/              # Marketing pages
│   ├── page.tsx           # Homepage
│   ├── about/page.tsx
│   ├── programs/page.tsx
│   ├── media/page.tsx
│   ├── admissions/page.tsx
│   ├── testimonials/page.tsx
│   └── contact/page.tsx
├── (auth)/                # Authentication
│   ├── login/page.tsx
│   └── register/page.tsx
├── (dashboard)/          # Student dashboard
│   ├── layout.tsx
│   ├── page.tsx
│   ├── courses/page.tsx
│   ├── courses/[id]/page.tsx
│   ├── assignments/page.tsx
│   ├── certificates/page.tsx
│   ├── downloads/page.tsx
│   ├── profile/page.tsx
│   └── notifications/page.tsx
├── (admin)/               # Admin dashboard
│   ├── layout.tsx
│   ├── page.tsx
│   ├── students/page.tsx
│   ├── courses/page.tsx
│   ├── courses/builder/page.tsx
│   ├── media/page.tsx
│   ├── quizzes/page.tsx
│   ├── reports/page.tsx
│   ├── payments/page.tsx
│   └── settings/page.tsx
└── globals.css
```

### Authentication
- Login/Register forms with validation
- Role-based routing (student, admin)
- Session management with cookies
- Protected routes with middleware

### Data Model (Mock/Interface)
```typescript
User: { id, name, email, role, avatar, enrolledCourses, progress }
Course: { id, title, description, instructor, thumbnail, modules, duration, enrolled }
Module: { id, title, lessons, order }
Lesson: { id, title, type, content, duration, completed }
Quiz: { id, title, questions, passingScore }
Assignment: { id, title, description, dueDate, submitted }
Certificate: { id, courseId, userId, issueDate, verificationCode }
```

---

## Page Specifications

### Public: Homepage
1. Hero (full viewport, centered text, dual CTAs)
2. About Preview (split layout: text + image)
3. Featured Courses (3-card grid)
4. Founder Spotlight (image + bio + quote)
5. Testimonials (carousel)
6. CTA Banner (full-width gradient)
7. Footer (4-column links + social + copyright)

### Public: About Page
1. Hero with mission statement
2. Vision section with imagery
3. The Mandate document
4. Leadership team grid
5. Partners/Affiliations

### Public: Programs Page
1. Hero with program overview
2. Filter tabs by type
3. Course cards grid (6+)
4. Comparison table for programs

### Public: Media Centre
1. Hero section
2. Filter tabs (Sermons, Videos, Teachings)
3. Media grid with thumbnails
4. Video player modal

### Public: Admissions Page
1. Hero with application CTA
2. Requirements list
3. Application form (multi-step)
4. FAQ accordion
5. Contact CTA

### Public: Contact Page
1. Hero
2. Contact form
3. Map/location info
4. Office hours

### Student: Dashboard Home
1. Welcome header with progress summary
2. Continue Learning section (current course)
3. My Courses grid
4. Upcoming Deadlines
5. Recent Activity
6. Quick Stats

### Student: My Courses
1. Filter tabs (All, In Progress, Completed)
2. Course cards with progress
3. Search and sort

### Student: Course Detail
1. Course header (image, title, instructor)
2. Progress overview
3. Module accordion
4. Lesson list with completion states
5. Resources sidebar

### Student: Lesson Player
1. Video/content area
2. Sidebar with chapter list
3. Lesson navigation (prev/next)
4. Notes section
5. Mark complete button

### Admin: Dashboard
1. Stats overview (cards)
2. Enrollment chart
3. Recent activity table
4. Quick actions
5. Notifications

### Admin: Manage Courses
1. Course list table
2. Search and filters
3. Create new course button
4. Edit/delete actions

---

## Polish Details

- Custom scrollbar (thin, stone-200)
- Selection color (violet-100)
- Focus-visible rings (violet-500)
- Smooth scroll behavior
- Backdrop blur for modals
- SVG favicon (intimate "I" monogram)
- Loading skeletons matching component shapes
- Realistic sample content (no Lorem ipsum)
- Error states with helpful messages
- Success confirmations with checkmark animation
