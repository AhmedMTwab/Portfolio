import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
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

        bullets: z.array(z.object({
            label: z.string(),
            text: z.string()
        })).default([]),

        order: z.number(),

        date: z.date()
    })
});

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
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