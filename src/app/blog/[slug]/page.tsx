import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/PostCard";
import { getPost, posts } from "@/content/posts";
import { asset } from "@/lib/asset";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Artículo no encontrado" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}/`,
      publishedTime: post.dateISO,
      authors: [post.author],
      images: [{ url: post.cover, alt: post.coverAlt }],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "EMDECOB S.A.S." },
    image: `https://emdecob.com${post.cover}`,
    mainEntityOfPage: `https://emdecob.com/blog/${post.slug}/`,
  };

  return (
    <>
      <article className="article-shell">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog/" },
              { label: post.title },
            ]}
          />
          <header className="article-head">
            <div className="post-card__meta" style={{ justifyContent: "center" }}>
              <span>{post.category}</span>
              <span>{post.date}</span>
            </div>
            <h1 className="display">{post.title}</h1>
            <p className="lede" style={{ marginTop: 20 }}>
              {post.excerpt}
            </p>
            <div className="article-head__meta">
              <span>{post.author}</span>
              <span>{post.readingTime} de lectura</span>
            </div>
          </header>

          <div className="article-cover">
            <Image
              src={asset(post.cover)}
              alt={post.coverAlt}
              width={1600}
              height={840}
              priority
              sizes="(max-width: 1100px) 100vw, 1100px"
            />
          </div>

          <div className="article-body">
            {post.body.map((block, index) => {
              if (block.type === "h2") {
                return <h2 key={`${block.type}-${index}`}>{block.text}</h2>;
              }
              if (block.type === "list") {
                return (
                  <ul key={`${block.type}-${index}`}>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote key={`${block.type}-${index}`}>
                    {block.text}
                  </blockquote>
                );
              }
              return <p key={`${block.type}-${index}`}>{block.text}</p>;
            })}
          </div>

          <div className="article-foot">
            <span>
              Publicado por {post.author} · {post.date}
            </span>
            <Link className="link-arrow" href="/blog/">
              Volver al blog
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section section--paper">
          <div className="container">
            <div className="section-head" data-reveal>
              <div>
                <span className="eyebrow">Seguir leyendo</span>
                <h2 className="section-head__title h2">Otros artículos.</h2>
              </div>
              <div className="section-head__aside">
                <Link className="link-arrow" href="/blog/">
                  Ver todo el blog
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="post-grid">
              {related.map((item) => (
                <PostCard post={item} key={item.slug} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="¿Quiere aplicar esto en su operación?"
        text="Conversemos sobre su contexto y las decisiones que necesita tomar."
        primaryLabel="Hablemos"
        secondaryLabel="WhatsApp"
      />
      <JsonLd data={articleJsonLd} />
    </>
  );
}
