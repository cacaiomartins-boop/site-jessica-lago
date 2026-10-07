import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, BadgeCheck, Clock3, ExternalLink, MapPin, Monitor, ShieldCheck } from "lucide-react";
import { site } from "../config/site";
import { FloatingContact, SiteFooter, SiteHeader } from "../components/site-chrome";
import { homeStructuredData, jsonLd, seo } from "../lib/seo";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

const pageSeo = seo({
  title: "Psicóloga em Brasília e Online | Jéssica Priscila Lago",
  description: "Jéssica Priscila Lago, psicóloga e psicanalista CRP DF 20947 em Brasília e online. Psicologia jurídica, psicanálise, ansiedade e relacionamentos.",
  path: "/",
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageSeo.meta,
    links: pageSeo.links,
    scripts: [jsonLd(homeStructuredData())],
  }),
  component: Home,
});

const InstagramIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>;
const LinkedinIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v5M8 8v.01M12 16v-5M12 13a2.5 2.5 0 0 1 5 0v3"/></svg>;

function Booking({ light = false, label = site.bookingLabel, className = "" }: { light?: boolean; label?: string; className?: string }) {
  return <a className={`btn ${light ? "btn-light" : "btn-dark"} ${className}`} href={site.profileUrl} {...external}>{label}<ArrowRight size={16} strokeWidth={1.5} /></a>;
}

function Home() {
  // No celular, "motivos" e "depoimentos" viram carrosséis; eles precisam ser alcançáveis pelo teclado.
  useEffect(() => {
    const scrollers = Array.from(document.querySelectorAll<HTMLElement>("[data-scroller]"));
    const sync = () => scrollers.forEach(el => {
      if (el.scrollWidth > el.clientWidth + 1) {
        el.tabIndex = 0;
        el.setAttribute("role", "region");
        el.setAttribute("aria-label", el.dataset["scroller"] ?? "");
      } else {
        el.removeAttribute("tabindex");
        el.removeAttribute("role");
        el.removeAttribute("aria-label");
      }
    });
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: number[] = [];
    // Depois que o elemento termina de aparecer, o atraso escalonado sai, para o efeito de hover responder na hora.
    const show = (el: HTMLElement) => {
      el.classList.add("is-visible");
      timers.push(window.setTimeout(() => { el.style.transitionDelay = ""; }, 1500));
    };
    const visibleNow = (el: HTMLElement) => el.getBoundingClientRect().top < window.innerHeight;
    nodes.forEach(el => { if (visibleNow(el)) show(el); });
    document.documentElement.classList.add("reveal-ready");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { show(entry.target as HTMLElement); observer.unobserve(entry.target); } });
    }, { threshold: .08 });
    nodes.filter(el => !visibleNow(el)).forEach(el => observer.observe(el));
    return () => { observer.disconnect(); timers.forEach(window.clearTimeout); document.documentElement.classList.remove("reveal-ready"); };
  }, []);

  return <>
    <SiteHeader />

    <main id="conteudo" tabIndex={-1}>
      <section className="hero dark-section" id="topo">
        <img className="hero-image" {...site.office} sizes="100vw" alt="Consultório de Jéssica Priscila Lago em Brasília, com poltronas e ampla janela" fetchPriority="high" decoding="async" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="hero-kicker">Psicóloga e psicanalista em Brasília · Online</span>
            <h1>Escuta clínica e <em>psicologia jurídica.</em></h1>
            <p className="hero-description">Psicoterapia e psicologia jurídica com escuta cuidadosa, clareza e respeito à singularidade de cada história.</p>
            <div className="hero-action"><Booking light /></div>
          </div>
          <aside className="hero-info" aria-label="Informações do atendimento">
            <div className="hero-rating"><strong>{site.rating}</strong><span>de 5 · {site.reviewCount} avaliações<br/>no Doctoralia</span></div>
            <a className="info-row" href={site.mapUrl} {...external}><MapPin size={17} strokeWidth={1.5}/><span>SHN, Edifício Fusion Work e Live<br/>Brasília, DF <ExternalLink size={11} className="inline" /></span></a>
            <div className="info-row"><Monitor size={17} strokeWidth={1.5}/><span>Atendimento online por Google Meet<br/>Inclusive para brasileiros no exterior</span></div>
            <div className="info-meta">Psicanálise · {site.appointmentDuration} · {site.price}</div>
          </aside>
        </div>
      </section>

      <div className="trust-strip"><div className="container trust-grid">
        <div className="trust-item"><BadgeCheck size={22} strokeWidth={1.5}/><span>{site.registration}</span></div>
        <a href={site.reviewUrl} {...external} className="trust-item"><ShieldCheck size={22} strokeWidth={1.5}/><span>{site.reviewCount} avaliações no Doctoralia</span></a>
        <div className="trust-item"><MapPin size={22} strokeWidth={1.5}/><span>Presencial em Brasília</span></div>
        <div className="trust-item"><Monitor size={22} strokeWidth={1.5}/><span>Online · Brasil e exterior</span></div>
      </div></div>

      <section className="section" id="para-quem"><div className="container two-col">
        <div className="sticky-intro reveal"><span className="section-label">Para quem é</span><h2 className="section-title">Às vezes, é preciso <em>parar e escutar.</em></h2><p className="text-copy">Atendo adolescentes e adultos em questões que atravessam afetos, relações e momentos de mudança. O trabalho começa pelo que você traz.</p></div>
        <div className="concern-list" data-scroller="Motivos de procura">{site.concerns.map((item, index) => <div className="concern reveal" key={item.title} style={{ transitionDelay: `${index * 110}ms` }}><span className="concern-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div>
      </div></section>

      <section className="section about" id="sobre"><div className="container two-col about-grid">
        <div className="portrait-wrap reveal"><img className="portrait" loading="lazy" decoding="async" {...site.portrait} sizes="(max-width: 800px) 86vw, 480px" alt="Retrato de Jéssica Priscila Lago"/><div className="portrait-caption"><strong>{site.name}</strong><span>{site.profession}</span></div></div>
        <div className="about-content reveal"><span className="section-label">Sobre</span><h2 className="section-title">Sou <em>Jéssica.</em></h2>
          <p>Sou psicóloga e psicanalista. Atendo em consultório particular em Brasília e também online.</p>
          <p>Minha formação em psicanálise é contínua: supervisão, grupos de estudo e escuta clínica fazem parte do meu trabalho.</p>
          <p>Atendo adolescentes e adultos. Também ofereço serviços em psicologia jurídica, como perícia, assistência técnica e elaboração de laudos.</p>
          <div className="quote-line">“É importante dar essa autonomia para quem está recebendo o atendimento, para que se entenda os próprios limites e sentimentos.”</div>
          <ul className="education">{site.education.map(item => <li key={item}>{item}</li>)}</ul>
          <div className="tags">{site.specialties.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><Booking label="Agendar uma conversa" />
        </div>
      </div></section>


      <section className="section serenitah" id="serenitah"><div className="container serenitah-inner reveal">
        <div className="serenitah-text"><span className="section-label">Consultório</span><h2 className="section-title">Um espaço compartilhado com <em>outras profissionais.</em></h2><p className="text-copy">Atendo e administro a {site.clinic.name}, clínica que reúne outras profissionais da saúde mental e do cuidado em um mesmo espaço, com atendimento presencial e online.</p></div>
        <figure className="serenitah-photo"><img loading="lazy" decoding="async" {...site.clinic.photo} sizes="(max-width: 800px) 100vw, 600px" alt="Profissionais da Serenitah sentadas na sala de atendimento, com um mapa-múndi na parede ao fundo"/><figcaption><strong>Equipe {site.clinic.name}</strong><span>Brasília, DF</span></figcaption></figure>
        <div className="serenitah-side"><a className="serenitah-card" href={site.clinic.url} {...external}><span className="serenitah-mark">{site.clinic.name}</span><span className="serenitah-sub">{site.clinic.fullName}</span><span className="serenitah-link">{site.clinic.label} <ExternalLink size={14} strokeWidth={1.5}/></span></a><a className="serenitah-map" href={site.clinic.mapUrl} title={site.clinic.address} {...external}><MapPin size={15} strokeWidth={1.5}/>Ver no mapa <ExternalLink size={12} strokeWidth={1.5}/></a></div>
      </div></section>

      <section className="section work" id="como-trabalho"><div className="container">
        <div className="two-col work-top"><div className="reveal"><span className="section-label">Como trabalho</span><h2 className="section-title">Uma escuta que dá lugar à <em>sua palavra.</em></h2><p className="work-lead">Na psicanálise, o que você vive não é reduzido a uma resposta pronta. É pela conversa que diferentes sentidos podem aparecer.</p><div className="work-callout">O acompanhamento respeita o ritmo e a autonomia de quem procura atendimento.</div></div><div className="reveal"><img className="work-image" loading="lazy" decoding="async" {...site.office} sizes="(max-width: 800px) 100vw, 560px" alt="Sala de atendimento com poltronas no consultório em Brasília"/><div className="image-note">Consultório — Brasília, DF</div></div></div>
        <div className="pillars">{[
          ["i.", "Escuta singular", "Cada atendimento parte do que a pessoa traz, sem roteiro único."],
          ["ii.", "Tempo e continuidade", "As sessões duram em média 50 minutos. A frequência é conversada na primeira consulta."],
          ["iii.", "Psicologia jurídica", "Atuo com perícia ou assistência técnica, laudo pericial e quesitos para prova psicológica."],
        ].map(([number, title, text], index) => <div className="pillar reveal" key={title} style={{ transitionDelay: `${index * 110}ms` }}><span className="pillar-index">{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
        <div className="work-panels"><div className="work-panel work-panel-dark reveal"><h3>O que pode ganhar lugar</h3><ul><li><span>→</span>Dar nome ao que inquieta.</li><li><span>→</span>Olhar para o que se repete.</li><li><span>→</span>Reconhecer o próprio tempo.</li></ul><p>O que ganha lugar muda de pessoa para pessoa e aparece aos poucos, no ritmo de cada conversa.</p></div><div className="work-panel reveal"><h3>O que este trabalho não é</h3><ul><li><span>·</span>Uma resposta igual para todos.</li><li><span>·</span>Uma promessa de resultado imediato.</li><li><span>·</span>Uma cura milagrosa e instantânea.</li></ul><p>O acompanhamento é construído em conversa e pode ser revisto ao longo do processo.</p></div></div>
      </div></section>

      <section className="section steps dark-section" id="como-funciona"><div className="container"><span className="section-label reveal">Como funciona</span><h2 className="section-title reveal">Do primeiro contato ao <em>acompanhamento.</em></h2><div className="steps-grid">{[
        ["01", "Primeiro contato", "Escolha um horário disponível pelo perfil no Doctoralia."],
        ["02", "Horário e formato", "Confira a disponibilidade para atendimento presencial ou online."],
        ["03", "Primeira consulta", "Conversamos sobre o que motiva sua procura e a frequência das sessões."],
        ["04", "Acompanhamento", "O processo segue no seu tempo, com possibilidade de rever a frequência."],
      ].map(([number, title, text], index) => <div className="step reveal" style={{ transitionDelay: `${index * 110}ms` }} key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

      <section className="section" id="atendimento"><div className="container"><span className="section-label reveal">Atendimento e valores</span><h2 className="section-title reveal">Formatos de <em>atendimento.</em></h2><p className="text-copy reveal">Atendimento particular, presencial em Brasília ou online, inclusive para brasileiros que moram fora do país. Para serviços jurídicos, consulte condições específicas.</p><div className="services-grid">{site.services.map((service, index) => <article className="service reveal" style={{ transitionDelay: `${index * 110}ms` }} key={service.name}><h3>{service.name}</h3><p>{service.description}</p><div className="service-detail"><Monitor size={16} strokeWidth={1.5}/>{service.mode}</div><div className="service-detail"><Clock3 size={16} strokeWidth={1.5}/>{service.duration}</div><div className="service-bottom"><strong>{service.price}</strong><a href={site.profileUrl} {...external} className="inline-link">Agendar <ArrowRight size={15}/></a></div></article>)}</div></div></section>

      <section className="section reviews" id="depoimentos"><div className="container">
        <div className="reviews-head reveal"><div><span className="section-label">Depoimentos</span><h2 className="section-title">O que dizem os <em>pacientes.</em></h2></div><div className="rating-inline"><strong className="rating-big">{site.rating}</strong><div className="rating-text"><p className="rating-note">de 5 · {site.reviewCount} avaliações no Doctoralia</p><a className="inline-link" href={site.reviewUrl} {...external}>Ver o perfil no Doctoralia <ArrowRight size={16}/></a></div></div></div>
        <div className="reviews-masonry" data-scroller="Depoimentos de pacientes">{site.reviews.map((review, index) => <article className={`review reveal review-${index + 1}`} style={{ transitionDelay: `${index * 110}ms` }} key={review.author}><div className="review-mark">“</div><blockquote>{review.quote}</blockquote><footer>{review.author} · avaliação verificada no Doctoralia</footer></article>)}</div>
      </div></section>

      <section className="section" id="duvidas"><div className="container two-col faq-grid"><div className="sticky-intro reveal"><span className="section-label">Dúvidas</span><h2 className="section-title">Perguntas <em>frequentes.</em></h2><a href={site.profileUrl} {...external} className="btn btn-outline">Perguntar pelo Doctoralia <ArrowRight size={16}/></a></div><div className="faq-list">{site.faq.map(({ question, answer }, index) => <details className="faq-item reveal" style={{ transitionDelay: `${Math.min(index, 4) * 110}ms` }} key={question} open={index === 0 ? true : undefined}><summary>{question}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>

      <section className="section contact dark-section" id="contato"><div className="container contact-grid"><div className="reveal"><span className="section-label">Contato</span><h2 className="section-title">Comece por uma <em>conversa.</em></h2><p>Se quiser iniciar um atendimento ou consultar um serviço em psicologia jurídica, veja os horários disponíveis no meu perfil.</p><Booking light /><div className="contact-social"><a href={site.instagramUrl} {...external}><InstagramIcon/>{site.instagramHandle}</a><a href={site.linkedinUrl} {...external}><LinkedinIcon/>LinkedIn</a></div></div><div className="reveal contact-side"><div className="contact-map-wrap"><iframe title="Mapa do consultório de Jéssica Priscila Lago em Brasília" className="contact-map" src="https://maps.google.com/maps?q=-15.7898359,-47.8852539&z=16&hl=pt-BR&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe><div className="contact-map-note"><MapPin size={16} strokeWidth={1.5}/><span>SHN, Edifício Fusion Work e Live — Brasília, DF</span><a className="contact-map-link" href={site.mapUrl} {...external}>Abrir no Google Maps <ExternalLink size={12} className="inline" /></a></div></div><a className="contact-address" href={site.mapUrl} {...external}>{site.address} ↗</a><div className="contact-online">Atendimento online disponível, inclusive para brasileiros no exterior</div></div></div></section>
    </main>

    <SiteFooter />
    <FloatingContact />
  </>;
}
