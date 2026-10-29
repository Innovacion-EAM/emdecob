"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { PostCard } from "./PostCard";
import type { Post } from "@/content/posts";

export function BlogExplorer({ posts }: { posts: Post[] }) {
  const categories = ["Todas", ...new Set(posts.map((post) => post.category))];
  const [active, setActive] = useState("Todas");
  const filtered =
    active === "Todas"
      ? posts
      : posts.filter((post) => post.category === active);
  const featured = filtered.find((post) => post.featured) ?? filtered[0];
  const rest = filtered.filter((post) => post.slug !== featured?.slug);

  return (
    <>
      <div className="blog-cats" aria-label="Categorías del blog">
        {categories.map((category) => (
          <button
            className="blog-cat"
            type="button"
            key={category}
            aria-pressed={active === category}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {featured && (
        <Link
          className="blog-featured"
          href={`/blog/${featured.slug}/`}
          key={featured.slug}
        >
          <div className="blog-featured__media">
            <Image
              src={featured.cover}
              alt={featured.coverAlt}
              width={1200}
              height={820}
              priority
              sizes="(max-width: 980px) 100vw, 54vw"
            />
          </div>
          <div>
            <div className="post-card__meta">
              <span>Destacado</span>
              <span>{featured.category}</span>
            </div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <div className="blog-featured__meta">
              <span>{featured.date}</span>
              <span>{featured.readingTime} de lectura</span>
            </div>
            <span className="link-arrow" style={{ marginTop: 24 }}>
              Leer artículo
              <ArrowUpRight aria-hidden="true" />
            </span>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <div className="post-grid">
          {rest.map((post) => (
            <PostCard post={post} key={post.slug} reveal={false} />
          ))}
        </div>
      )}

      {active !== "Todas" && (
        <p className="blog-filter-note">
          Mostrando {filtered.length}{" "}
          {filtered.length === 1 ? "artículo" : "artículos"} en {active}.
        </p>
      )}
    </>
  );
}
