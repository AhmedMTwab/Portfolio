import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
    site: "https://AhmedMTwab.github.io",
    base: "/portfolio",

    trailingSlash: "always",

    build: {
        inlineStylesheets: "auto",
    },

    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: {
            themes: {
                light: "github-dark",
                dark: "github-dark",
            },
            langs: [
                "csharp",
                "sql",
                "json",
                "bash",
                "shell",
                "xml",
                "html",
                "css",
                "javascript",
                "typescript",
                "yaml",
                "diff",
                "powershell",
            ],
            wrap: true,
        },
    },

    integrations: [
        mdx(),
        sitemap(),
    ],
});