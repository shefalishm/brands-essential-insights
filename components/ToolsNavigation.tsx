import Link from "next/link";
import { toolCategories } from "@/lib/marketing-tools";

export function ToolsNavigation({ active }: { active?: string }) {
  return <nav className="tools-navigation" aria-label="Marketing tool categories">
    <Link href="/marketing-tools" aria-current={!active ? "page" : undefined}>All tools</Link>
    {toolCategories.map((category) => <Link key={category.slug} href={`/marketing-tools/${category.slug}`} aria-current={active === category.slug ? "page" : undefined}>{category.name}</Link>)}
  </nav>;
}
