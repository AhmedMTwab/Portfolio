import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
    const posts = await getCollection("blog", ({ data }) => !data.draft);

    const sortedPosts = posts.sort(
        (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    );

    return rss({
        title: "Ahmed Eltwab — Writing",
        description:
            "Real production lessons from .NET backend work — IIS deployments, SQL Server upgrades, EF Core performance, and clean architecture.",
        site: context.site ?? "https://ahmedeltwab.dev",
        items: sortedPosts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.pubDate,
            categories: post.data.tags,
            link: `/blog/${post.id}/`,
        })),
        customData: `<language>en-us</language>`,
    });
}