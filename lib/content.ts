import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { Section } from "@/lib/site";

export type Article = {
  slug: string;
  title: string;
  description: string;
  section: Section;
  date: string;
  readingTime: string;
  featured?: boolean;
  eyebrow?: string;
  image: string;
  imageAlt: string;
  faqs?: { question: string; answer: string }[];
  body: string;
};

const contentDirectory = path.join(process.cwd(), "content");

export const getAllArticles = cache((): Article[] => {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs.readdirSync(contentDirectory)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const { data, content } = matter(fs.readFileSync(path.join(contentDirectory, file), "utf8"));
      return { slug, ...data, body: content } as Article;
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
});

export const getArticle = cache((slug: string) => getAllArticles().find((article) => article.slug === slug));

export const getArticlesBySection = (section: Section) =>
  getAllArticles().filter((article) => article.section === section);
