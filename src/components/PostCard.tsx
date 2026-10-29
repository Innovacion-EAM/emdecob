import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/content/posts";

export function PostCard({
  post,
  reveal = true,
}: {
  post: Post;
  reveal?: boolean;
}) {
  return (
    <Link
      className={`post-card${reveal ? "" : " is-visible"}`}
      href={`/blog/${post.slug}/`}
      data-reveal={reveal ? "" : undefined}
    >
      <div className="post-card__media">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          width={900}
          height={560}
          sizes="(max-width: 760px) 100vw, 33vw"
        />
      </div>
      <div className="post-card__meta">
        <span>{post.category}</span>
        <span>{post.date}</span>
      </div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div className="post-card__foot">
        <span>{post.readingTime} de lectura</span>
        <ArrowUpRight aria-hidden="true" />
      </div>
    </Link>
  );
}
