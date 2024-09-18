import { sortBy } from "lodash";

export type Frontmatter = {
  title: string;
  location: string;
  summary: string;
  duration: string;
  authors: string[];
  updated: string; // YYYY-MM-DD
};

export type GuideMeta = {
  slug: string;
  frontmatter: Frontmatter;
};

export async function getGuides(): Promise<GuideMeta[]> {
  const modules = import.meta.glob<{ frontmatter: Frontmatter }>(
    "../guides._guide+/*.index.mdx",
    { eager: true },
  );

  const posts = Object.entries(modules).map(([path, post]) => ({
    slug: path.replace("../guides._guide+/", "").replace(".index.mdx", ""),
    frontmatter: post.frontmatter,
  }));

  return sortBy(posts, ({ frontmatter }) => frontmatter.title);
}
