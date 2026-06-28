
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
    schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        featured: z.boolean().default(false),

        summary: z.string(),

        company: z.string().optional(),

        github: z.string().optional(),

        demo: z.string().optional(),

        tech: z.array(z.string()),

        highlights: z.array(z.string()).optional(),

        date: z.date()
    })
});

const blog = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        tags: z.array(z.string())
    })
});

export const collections = {
    projects,
    blog
};