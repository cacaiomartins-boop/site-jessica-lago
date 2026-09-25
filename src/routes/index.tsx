import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, CalendarDays, Clock3, ExternalLink, MapPin, Menu, Monitor, ShieldCheck, X } from "lucide-react";
import { site } from "../config/site";

const links = [
  { label: "Sobre", href: "#sobre" },
  { label: "Como trabalho", href: "#como-trabalho" },
  { label: "Atendimento", href: "#atendimento" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Dúvidas", href: "#duvidas" },
];
const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Psicóloga em Brasília e Online | Jéssica Lago" },
      { name: "description", content: "Jéssica Lago, psicóloga e psicanalista CRP DF 20947 em Brasília e online. Psicologia jurídica, psicanálise, ansiedade e relacionamentos." },
      { property: "og:title", content: "Psicóloga em Brasília e Online | Jéssica Lago" },
      { property: "og:description", content: "Psicoterapia e psicologia jurídica com Jéssica Lago, CRP DF 20947. Atendimento presencial em Brasília e online." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [
      { "@type": "Person", name: site.name, jobTitle: "Psicóloga e Psicanalista", identifier: site.registration, url: site.profileUrl },
      { "@type": "MedicalBusiness", name: site.name, description: "Psicologia, psicanálise e serviços em psicologia jurídica", url: site.profileUrl, address: { "@type": "PostalAddress", streetAddress: "SHN, Quadra 1, Bloco D, Sala 1107, Conjunto A, 11º andar, Edifício Fusion Work e Live", addressLocality: "Brasília", addressRegion: "DF", postalCode: "70701-040", addressCountry: "BR" } }
    ] }) }],
  }),
  component: Home,
});

function Booking({ light = false, label = site.bookingLabel, className = "" }: { light?: boolean; label?: string; className?: string }) {
  return <a className={`btn ${light ? "btn-light" : "btn-dark"} ${className}`} href={site.profileUrl} {...external}>{label}<ArrowRight size={16} strokeWidth={1.5} /></a>;
}

function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const visibleNow = (el: HTMLElement) => el.getBoundingClientRect().top < window.innerHeight;
    nodes.forEach(el => { if (visibleNow(el)) el.classList.add("is-visible"); });
    document.documentElement.classList.add("reveal-ready");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } });
    }, { threshold: .08 });
    nodes.filter(el => !visibleNow(el)).forEach(el => observer.observe(el));
    return () => { observer.disconnect(); document.documentElement.classList.remove("reveal-ready"); };
  }, []);

  return <>
    <header className={`site-header ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
      <div className="container header-inner">
        <a className="brand" href="#topo" onClick={() => setMenuOpen(false)} aria-label="Jéssica Lago, voltar ao início"><span className="brand-name">{site.name}</span><span className="brand-detail">{site.profession} · {site.registration}</span></a>
        <nav className="desktop-nav" aria-label="Navegação principal">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
        <a href={site.profileUrl} {...external} className="btn header-cta">Agendar consulta <ArrowRight size={15} strokeWidth={1.5}/></a>
        <button className="menu-toggle" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={24} strokeWidth={1.5}/> : <Menu size={24} strokeWidth={1.5}/>}</button>
      </div>
      <nav className="mobile-nav" aria-label="Navegação para celular">{links.map(link => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}<a className="btn btn-dark" href={site.profileUrl} {...external} onClick={() => setMenuOpen(false)}>Agendar consulta <ArrowRight size={16}/></a></nav>
    </header>

    <main>
      <section className="hero dark-section" id="topo">
        <img className="hero-image" src={site.office} alt="Consultório de Jéssica Lago em Brasília, com poltronas e ampla janela" fetchPriority="high" />
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
            <div className="info-row"><Monitor size={17} strokeWidth={1.5}/><span>Atendimento online por Google Meet</span></div>
            <div className="info-meta">Psicanálise · {site.appointmentDuration} · {site.price}</div>
          </aside>
        </div>
      </section>

      <div className="trust-strip"><div className="container trust-grid">
        <div className="trust-item"><BadgeCheck size={22} strokeWidth={1.5}/><span>{site.registration}</span></div>
        <a href={site.reviewUrl} {...external} className="trust-item"><ShieldCheck size={22} strokeWidth={1.5}/><span>{site.reviewCount} avaliações no Doctoralia</span></a>
        <div className="trust-item"><MapPin size={22} strokeWidth={1.5}/><span>Presencial em Brasília</span></div>
        <div className="trust-item"><Monitor size={22} strokeWidth={1.5}/><span>Atendimento online</span></div>
      </div></div>

      <section className="section" id="para-quem"><div className="container two-col">
        <div className="sticky-intro reveal"><span className="section-label">01 — Para quem é</span><h2 className="section-title">Às vezes, é preciso <em>parar e escutar.</em></h2><p className="text-copy">Atendo adolescentes e adultos em questões que atravessam afetos, relações e momentos de mudança. O trabalho começa pelo que você traz.</p></div>
        <div className="concern-list">{site.concerns.map((item, index) => <div className="concern reveal" key={item.title} style={{ transitionDelay: `${index * 110}ms` }}><span className="concern-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div>
      </div></section>

      <section className="section about" id="sobre"><div className="container two-col about-grid">
        <div className="portrait-wrap reveal"><img className="portrait" loading="lazy" src={site.portrait} alt="Retrato de Jéssica Lago sentada no consultório"/><div className="portrait-caption"><strong>{site.name}</strong><span>{site.profession}</span></div></div>
        <div className="about-content reveal"><span className="section-label">02 — Sobre</span><h2 className="section-title">Sou <em>Jéssica.</em></h2>
          <p>Sou psicóloga e psicanalista. Atendo em consultório particular em Brasília e também online.</p>
          <p>Minha formação em psicanálise é contínua: supervisão, grupos de estudo e escuta clínica fazem parte do meu trabalho.</p>
          <p>Atendo adolescentes e adultos. Também ofereço serviços em psicologia jurídica, como perícia, assistência técnica e elaboração de laudos.</p>
          <div className="quote-line">“É importante dar essa autonomia para quem está recebendo o atendimento, para que se entenda os próprios limites e sentimentos.”</div>
          <ul className="education">{site.education.map(item => <li key={item}>{item}</li>)}</ul>
          <div className="tags">{site.specialties.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><Booking label="Agendar uma conversa" />
        </div>
      </div></section>

      <section className="section work" id="como-trabalho"><div className="container">
        <div className="two-col work-top"><div className="reveal"><span className="section-label">03 — Como trabalho</span><h2 className="section-title">Uma escuta que dá lugar à <em>sua palavra.</em></h2><p className="work-lead">Na psicanálise, o que você vive não é reduzido a uma resposta pronta. É pela conversa que diferentes sentidos podem aparecer.</p><div className="work-callout">O acompanhamento respeita o ritmo e a autonomia de quem procura atendimento.</div></div><div className="reveal"><img className="work-image" loading="lazy" src={site.office} alt="Sala de atendimento com poltronas no consultório em Brasília"/><div className="image-note">Consultório — Brasília, DF</div></div></div>
        <div className="pillars">{[
          ["i.", "Escuta singular", "Cada atendimento parte do que a pessoa traz, sem roteiro único."],
          ["ii.", "Tempo e continuidade", "As sessões duram em média 50 minutos. A frequência é conversada na primeira consulta."],
          ["iii.", "Psicologia jurídica", "Atuo com perícia ou assistência técnica, laudo pericial e quesitos para prova psicológica."],
        ].map(([number, title, text], index) => <div className="pillar reveal" key={title} style={{ transitionDelay: `${index * 110}ms` }}><span className="pillar-index">{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
        <div className="work-panels"><div className="work-panel work-panel-dark reveal"><h3>O que pode ganhar lugar</h3><ul><li><span>→</span>Dar nome ao que inquieta.</li><li><span>→</span>Olhar para o que se repete.</li><li><span>→</span>Reconhecer o próprio tempo.</li></ul></div><div className="work-panel reveal"><h3>O que este trabalho não é</h3><ul><li><span>·</span>Uma resposta igual para todos.</li><li><span>·</span>Uma promessa de resultado imediato.</li><li><span>·</span>Uma decisão tomada por você.</li></ul><p>O acompanhamento é construído em conversa e pode ser revisto ao longo do processo.</p></div></div>
      </div></section>

      <section className="section steps dark-section" id="como-funciona"><div className="container"><span className="section-label reveal">04 — Como funciona</span><h2 className="section-title reveal">Do primeiro contato ao <em>acompanhamento.</em></h2><div className="steps-grid">{[
        ["01", "Primeiro contato", "Escolha um horário disponível pelo perfil no Doctoralia."],
        ["02", "Horário e formato", "Confira a disponibilidade para atendimento presencial ou online."],
        ["03", "Primeira consulta", "Conversamos sobre o que motiva sua procura e a frequência das sessões."],
        ["04", "Acompanhamento", "O processo segue no seu tempo, com possibilidade de rever a frequência."],
      ].map(([number, title, text], index) => <div className="step reveal" style={{ transitionDelay: `${index * 110}ms` }} key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

      <section className="section" id="atendimento"><div className="container"><span className="section-label reveal">05 — Atendimento e valores</span><h2 className="section-title reveal">Formatos de <em>atendimento.</em></h2><p className="text-copy reveal">Atendimento particular, presencial em Brasília ou online. Para serviços jurídicos, consulte condições específicas.</p><div className="services-grid">{site.services.map((service, index) => <article className="service reveal" style={{ transitionDelay: `${index * 110}ms` }} key={service.name}><h3>{service.name}</h3><p>{service.description}</p><div className="service-detail"><Monitor size={16} strokeWidth={1.5}/>{service.mode}</div><div className="service-detail"><Clock3 size={16} strokeWidth={1.5}/>{service.duration}</div><div className="service-bottom"><strong>{service.price}</strong><a href={site.profileUrl} {...external} className="inline-link">Agendar <ArrowRight size={15}/></a></div></article>)}</div></div></section>

      <section className="section reviews" id="depoimentos"><div className="container">
        <div className="reviews-head reveal"><div><span className="section-label">06 — Depoimentos</span><h2 className="section-title">O que dizem os <em>pacientes.</em></h2></div><div className="rating-inline"><strong className="rating-big">{site.rating}</strong><div className="rating-text"><p className="rating-note">de 5 · {site.reviewCount} avaliações no Doctoralia</p><a className="inline-link" href={site.reviewUrl} {...external}>Ver o perfil no Doctoralia <ArrowRight size={16}/></a></div></div></div>
        <div className="reviews-masonry">{site.reviews.map((review, index) => <article className={`review reveal review-${index + 1}`} style={{ transitionDelay: `${index * 110}ms` }} key={review.author}><div className="review-mark">“</div><blockquote>{review.quote}</blockquote><footer>{review.author} · avaliação verificada no Doctoralia</footer></article>)}</div>
      </div></section>

      <section className="section" id="duvidas"><div className="container two-col faq-grid"><div className="sticky-intro reveal"><span className="section-label">07 — Dúvidas</span><h2 className="section-title">Perguntas <em>frequentes.</em></h2><a href={site.profileUrl} {...external} className="btn btn-outline">Perguntar pelo Doctoralia <ArrowRight size={16}/></a></div><div className="faq-list">{[
        ["Como é a primeira consulta?", "É um momento para conversar sobre o que motivou sua procura e combinar como será o acompanhamento."],
        ["Você atende online?", "Sim. O atendimento online acontece pelo Google Meet, por meio de um link privativo fixo."],
        ["Quanto tempo dura cada sessão?", "Cada sessão dura, em média, 50 minutos. Esse tempo pode variar conforme a pessoa ou a sessão."],
        ["Qual é a frequência das sessões?", "A recomendação é de uma a duas vezes por semana. Dependendo do caso, sessões quinzenais podem ser combinadas após o início."],
        ["O atendimento é sigiloso?", "O atendimento psicológico segue os deveres éticos de sigilo profissional. Em serviços de psicologia jurídica, as condições são esclarecidas conforme a demanda."],
        ["Você atende por convênio?", "O atendimento é particular, com emissão de nota fiscal. A nota pode ser usada para solicitar reembolso se o convênio oferecer essa possibilidade."],
        ["Quanto tempo dura o processo?", "Não há um prazo único para o acompanhamento. A decisão de continuar ou encerrar é conversada ao longo do processo."],
        ["Como funciona a psicologia jurídica?", "O perfil oferece perícia ou assistência técnica, laudo pericial e formulação de quesitos para prova pericial psicológica. Consulte disponibilidade e valores para a sua demanda."],
        ["Como posso começar?", "Você pode verificar os horários e agendar uma consulta pelo meu perfil no Doctoralia."],
      ].map(([question, answer], index) => <details className="faq-item reveal" style={{ transitionDelay: `${Math.min(index, 4) * 110}ms` }} key={question} open={index === 0 ? true : undefined}><summary>{question}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>

      <section className="section contact dark-section" id="contato"><div className="container contact-grid"><div className="reveal"><span className="section-label">08 — Contato</span><h2 className="section-title">Comece por uma <em>conversa.</em></h2><p>Se quiser iniciar um atendimento ou consultar um serviço em psicologia jurídica, veja os horários disponíveis no meu perfil.</p><Booking light /></div><div className="reveal"><div className="contact-statement">Uma conversa pode ser o começo de um olhar mais atento para o que você está vivendo.</div><a className="contact-address" href={site.mapUrl} {...external}>{site.address} ↗</a><div className="contact-online">Atendimento online disponível</div></div></div><div className="container"><div className="reveal contact-map-wrap"><iframe title="Mapa do consultório de Jéssica Lago em Brasília" className="contact-map" src="https://maps.google.com/maps?q=-15.7898359,-47.8852539&z=16&hl=pt-BR&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe><div className="contact-map-note"><MapPin size={16} strokeWidth={1.5}/><span>SHN, Edifício Fusion Work e Live — Brasília, DF</span><a className="contact-map-link" href={site.mapUrl} {...external}>Abrir no Google Maps <ExternalLink size={12} className="inline" /></a></div></div></div></section>
    </main>

    <footer className="footer"><div className="container"><div className="footer-grid"><div><h3>{site.name}</h3><p>{site.profession}</p><p>{site.registration}</p></div><div><p>{site.address}</p><a href={site.mapUrl} {...external}>Ver no mapa ↗</a></div><div><a href={site.profileUrl} {...external}>Doctoralia ↗</a><a href={site.reviewUrl} {...external}>Avaliações ↗</a></div></div><nav className="footer-links" aria-label="Links do rodapé">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav><div className="footer-bottom"><p>© {new Date().getFullYear()} · {site.name} · {site.registration} · <em>Escuta em seu tempo.</em></p><p>Em caso de emergência, ligue 188 (CVV) ou 192 (SAMU).</p></div></div></footer>
    <a href={site.profileUrl} {...external} className={`floating-contact ${scrolled ? "visible" : ""}`} aria-label="Agendar consulta no Doctoralia" title="Agendar consulta no Doctoralia"><CalendarDays size={24} strokeWidth={1.5}/></a>
  </>;
}
