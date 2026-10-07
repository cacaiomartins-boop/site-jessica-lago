import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Menu, X } from "lucide-react";
import { site } from "../config/site";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// "hash" aponta para uma seção da home; "to" aponta para outra página.
const navLinks = [
  { label: "Sobre", hash: "sobre" },
  { label: "Como trabalho", hash: "como-trabalho" },
  { label: "Atendimento", hash: "atendimento" },
  { label: "Como funciona", hash: "como-funciona" },
  { label: "Publicações", to: "/publicacoes" },
  { label: "Depoimentos", hash: "depoimentos" },
  { label: "Dúvidas", hash: "duvidas" },
] as const;

function NavItem({ item, home, onClick }: { item: (typeof navLinks)[number]; home: boolean; onClick?: () => void }) {
  if ("to" in item) return <Link to={item.to} onClick={onClick}>{item.label}</Link>;
  return <a href={home ? `#${item.hash}` : `/#${item.hash}`} onClick={onClick}>{item.label}</a>;
}

function useScrolled(initial = false) {
  const [scrolled, setScrolled] = useState(initial);
  useEffect(() => {
    if (initial) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [initial]);
  return scrolled;
}

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  const scrolled = useScrolled(solid);
  const [menuOpen, setMenuOpen] = useState(false);
  const home = !solid;
  const close = () => setMenuOpen(false);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);
  const brandContent = <><span className="brand-name">{site.name}</span><span className="brand-detail">{site.profession} · {site.registration}</span></>;

  return (
    <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className={`site-header ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
      <div className="container header-inner">
        {home
          ? <a className="brand" href="#topo" onClick={close}>{brandContent}</a>
          : <Link className="brand" to="/" onClick={close}>{brandContent}</Link>}
        <nav className="desktop-nav" aria-label="Navegação principal">{navLinks.map(item => <NavItem key={item.label} item={item} home={home} />)}</nav>
        <a href={site.profileUrl} {...external} className="btn header-cta">Agendar consulta <ArrowRight size={15} strokeWidth={1.5}/></a>
        <button className="menu-toggle" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="menu-mobile" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={24} strokeWidth={1.5}/> : <Menu size={24} strokeWidth={1.5}/>}</button>
      </div>
      <nav className="mobile-nav" id="menu-mobile" aria-label="Navegação para celular">{navLinks.map(item => <NavItem key={item.label} item={item} home={home} onClick={close} />)}<a className="btn btn-dark" href={site.profileUrl} {...external} onClick={close}>Agendar consulta <ArrowRight size={16}/></a></nav>
    </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer"><div className="container">
      <div className="footer-top">
        <div className="footer-brand"><h2>{site.name}</h2><p>{site.profession} · {site.registration}</p><p>SHN, Quadra 1, Bloco D, Sala 1107 · Ed. Fusion Work e Live<br/>Brasília — DF · Online para o Brasil e exterior</p><div className="footer-links"><a href={site.mapUrl} {...external}>Mapa ↗</a><a href={site.clinic.url} {...external}>{site.clinic.name} ↗</a><Link to="/publicacoes">Publicações</Link><a href={site.profileUrl} {...external}>Doctoralia ↗</a><a href={site.instagramUrl} {...external}>Instagram ↗</a><a href={site.linkedinUrl} {...external}>LinkedIn ↗</a></div></div>
        <div className="footer-urgent"><h3>É urgente? Ligue para:</h3><div className="footer-urgent-grid">{[
          ["193", "Bombeiros", "Resgate, acidentes, incêndios e risco de suicídio."],
          ["190", "Polícia", "Violência, agressão ou ameaça."],
          ["192", "SAMU", "Urgências e emergências de saúde."],
          ["188", "CVV", "Apoio emocional, 24h e gratuito."],
        ].map(([number, name, text]) => <a className="footer-urgent-item" href={`tel:${number}`} key={number}><strong>{number}</strong><span>{name}</span><p>{text}</p></a>)}</div></div>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} · {site.name} · {site.registration} · <em>Escuta em seu tempo.</em></p></div>
    </div></footer>
  );
}

export function FloatingContact({ always = false }: { always?: boolean }) {
  const scrolled = useScrolled(always);
  return <aside aria-label="Atalho para agendar consulta"><a href={site.profileUrl} {...external} className={`floating-contact ${scrolled ? "visible" : ""}`} aria-label="Agendar consulta no Doctoralia" title="Agendar consulta no Doctoralia" tabIndex={always || scrolled ? undefined : -1}><CalendarDays size={24} strokeWidth={1.5}/></a></aside>;
}
