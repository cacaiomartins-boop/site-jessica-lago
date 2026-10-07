import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { site, type Publication } from "../config/site";
import { FloatingContact, SiteFooter, SiteHeader } from "../components/site-chrome";
import { jsonLd, publicationsStructuredData, seo } from "../lib/seo";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// Enquanto não houver textos publicados, a página fica fora do Google (noindex); ao adicionar o primeiro, ela é indexada sozinha.
const pageSeo = seo({
  title: "Publicações e textos | Jéssica Priscila Lago",
  description: "Textos e reflexões de Jéssica Priscila Lago, psicóloga e psicanalista CRP DF 20947, sobre psicanálise, saúde mental e cuidado.",
  path: "/publicacoes",
  noindex: site.publications.length === 0,
});

export const Route = createFileRoute("/publicacoes")({
  head: () => ({
    meta: pageSeo.meta,
    links: pageSeo.links,
    scripts: [jsonLd(publicationsStructuredData())],
  }),
  component: Publicacoes,
});

function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <article className="pub">
      <div className="pub-meta">{pub.date ? <span className="pub-date">{pub.date}</span> : null}{pub.type ? <span className="pub-type">{pub.type}</span> : null}</div>
      <div className="pub-body">
        <h2 className="pub-title">{pub.title}</h2>
        <p className="pub-summary">{pub.summary}</p>
        {pub.paragraphs?.length ? <details className="faq-item pub-more"><summary>Ler o texto completo<span className="faq-plus" aria-hidden="true">+</span></summary><div className="pub-text">{pub.paragraphs.map(paragraph => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}</div></details> : null}
        {pub.url ? <a className="inline-link" href={pub.url} {...external}>{pub.linkLabel ?? "Ler na fonte"} <ExternalLink size={14} strokeWidth={1.5}/></a> : null}
      </div>
    </article>
  );
}

function Publicacoes() {
  return <>
    <SiteHeader solid />
    <main id="conteudo" tabIndex={-1}>
      <section className="pub-hero"><div className="container">
        <span className="section-label">Publicações</span>
        <h1 className="section-title">Textos e <em>reflexões.</em></h1>
        <p className="text-copy">Artigos e textos sobre psicanálise, saúde mental e cuidado.</p>
      </div></section>

      <section className="pub-section"><div className="container">
        {site.publications.length
          ? <ol className="pub-list">{site.publications.map(pub => <li key={pub.title}><PublicationCard pub={pub} /></li>)}</ol>
          : <div className="pub-empty">
              <h2>Os primeiros textos estão a caminho.</h2>
              <p>Em breve, você encontra aqui os artigos e reflexões publicados. Enquanto isso, você pode voltar ao início ou agendar uma conversa.</p>
              <div className="pub-actions"><Link className="btn btn-dark" to="/">Voltar ao início</Link><a className="btn btn-outline" href={site.profileUrl} {...external}>Agendar consulta <ArrowRight size={16}/></a></div>
            </div>}
      </div></section>
    </main>
    <SiteFooter />
    <FloatingContact always />
  </>;
}
