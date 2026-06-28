# Milestone 3 — Dynamic Content with Astro Content Collections

## Goal

Convert the portfolio from a static HTML website into a content-driven website where projects and blog posts are managed through Markdown files.

After completing this milestone, adding a new project or blog post should only require:

1. Creating a Markdown file.
2. Filling in the frontmatter.
3. Running `git push`.

No HTML editing should be required.

---

# Step 1 — Improve the Content Collection Schema

Update `src/content.config.ts`.

## Projects Collection

```ts
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),

    featured: z.boolean().default(false),

    company: z.string().optional(),

    github: z.string().url().optional(),

    demo: z.string().url().optional(),

    summary: z.string(),

    tech: z.array(z.string()),

    highlights: z.array(z.string()),

    badges: z.array(z.string()).default([]),

    order: z.number(),

    date: z.date()
  })
});

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false)
  })
});

export const collections = {
  projects,
  blog
};
```

---

# Step 2 — Convert Projects to Markdown

Create:

```
src/content/projects/
```

Example:

```
visitor-management.md
```

```md
---
title: Visitor Management System

subtitle: Egyptian Media Production City

featured: true

company: EMPC

order: 1

date: 2025-01-01

summary: >
  Rebuilt a vendor-abandoned Visitor Management System
  serving more than 2,300 employees.

badges:
  - Featured
  - Company Project

highlights:
  - 2300+ Employees
  - 700 Daily Visitors
  - Zero Downtime Migration
  - 7 Modules Rebuilt

tech:
  - ASP.NET Core
  - EF Core
  - SQL Server
  - CQRS
  - MediatR
---

# Overview

...

## Challenge

...

## Solution

...

## Lessons Learned

...
```

Repeat for every project.

---

# Step 3 — Create ProjectCard Component

Create:

```
src/components/ProjectCard.astro
```

The component should receive a single project:

```ts
interface Props {
    project: CollectionEntry<"projects">;
}

const { project } = Astro.props;
```

Replace hardcoded values with data from the collection.

Examples:

```astro
{project.data.title}

{project.data.summary}

{project.data.subtitle}
```

Render arrays dynamically.

Example:

```astro
{
project.data.tech.map(tech => (
    <span class="stack-tag">{tech}</span>
))
}
```

Do the same for:

* highlights
* badges

---

# Step 4 — Generate the Projects Section

Replace all manually written project cards.

```astro
---
import { getCollection } from "astro:content";
import ProjectCard from "./ProjectCard.astro";

const projects = await getCollection("projects");

projects.sort(
    (a, b) => a.data.order - b.data.order
);
---

<div class="projects-list">

{
projects.map(project => (
    <ProjectCard project={project} />
))
}

</div>
```

The Projects component should never require manual updates again.

---

# Step 5 — Create Dynamic Project Pages

Create:

```
src/pages/projects/[slug].astro
```

```astro
---
import { getCollection } from "astro:content";

export async function getStaticPaths() {

    const projects = await getCollection("projects");

    return projects.map(project => ({
        params: {
            slug: project.slug
        },
        props: {
            project
        }
    }));
}

const { project } = Astro.props;

const { Content } = await project.render();
---
```

Each Markdown file will automatically become its own page.

Examples:

```
/projects/visitor-management

/projects/grocery-store

/projects/purchase-analytics
```

---

# Step 6 — Convert the Blog

Create:

```
src/content/blog/
```

Each article becomes one Markdown file.

Example:

```
iis-deployment.md
```

```md
---
title: Deploying ASP.NET Core to IIS

description: Lessons learned from production deployment.

pubDate: 2026-06-29

tags:
- ASP.NET Core
- IIS
- SSL
---

# IIS Deployment

...
```

---

# Step 7 — Blog Listing

Generate blog cards dynamically.

```astro
const posts = await getCollection("blog");

const publishedPosts = posts
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
```

Render using:

```astro
posts.map(...)
```

---

# Step 8 — Dynamic Blog Pages

Create:

```
src/pages/blog/[slug].astro
```

Use the same approach as the project pages.

Every Markdown file automatically becomes a page.

Examples:

```
/blog/iis-deployment

/blog/sql-server-upgrade

/blog/clean-architecture
```

---

# Step 9 — Featured Projects on the Homepage

Instead of manually selecting projects, display only featured ones.

```astro
const featuredProjects =
    projects.filter(project => project.data.featured);
```

Render only those on the homepage.

---

# Final Folder Structure

```
src/
│
├── content/
│   ├── projects/
│   │   visitor-management.md
│   │   grocery-store.md
│   │   purchase-analytics.md
│   │
│   └── blog/
│       iis-deployment.md
│       sql-server-upgrade.md
│
├── components/
│   ├── ProjectCard.astro
│   └── BlogCard.astro
│
├── pages/
│   ├── index.astro
│   │
│   ├── projects/
│   │   └── [slug].astro
│   │
│   └── blog/
│       └── [slug].astro
│
└── content.config.ts
```

---

# Expected Outcome

After this milestone:

* ✅ Projects are managed through Markdown.
* ✅ Blog posts are managed through Markdown.
* ✅ Dynamic project pages are generated automatically.
* ✅ Dynamic blog pages are generated automatically.
* ✅ Homepage displays featured projects automatically.
* ✅ No HTML editing is required when adding new content.

---

# Next Milestone

Milestone 4 will focus on production readiness:

* SEO metadata
* Open Graph images
* RSS feed
* Sitemap
* Syntax highlighting
* Image optimization
* 404 page
* Search
* Performance optimizations

