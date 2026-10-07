import { site } from "../config/site";

type SeoInput = {
  title: string;
  description: string;
  /** Caminho da página, começando com "/" (ex.: "/publicacoes"). */
  path: string;
  /** Use true enquanto a página não tiver conteúdo próprio: o Google não a indexa, mas segue os links. */
  noindex?: boolean;
};

const absolute = (path: string) => `${site.url}${path}`;

/** Meta tags e canonical de uma página: título, descrição, Open Graph e Twitter Cards. */
export function seo({ title, description, path, noindex = false }: SeoInput) {
  const url = absolute(path === "/" ? "/" : path);
  const image = absolute(site.ogImage);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.name },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Consultório de Jéssica Priscila Lago em Brasília, com poltronas e ampla janela" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/** Dados estruturados (JSON-LD). Escapa "<" para que o texto nunca feche a tag <script>. */
export function jsonLd(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data).replace(/</g, "\\u003c") };
}

const personId = `${site.url}/#jessica`;
const businessId = `${site.url}/#consultorio`;
const siteId = `${site.url}/#site`;
const sameAs = [site.profileUrl, site.instagramUrl, site.linkedinUrl];

/** Pessoa, consultório (negócio local), site, serviços e perguntas frequentes da página inicial. */
export function homeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": siteId,
        url: `${site.url}/`,
        name: site.name,
        inLanguage: "pt-BR",
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        jobTitle: "Psicóloga e Psicanalista",
        description: "Psicóloga e psicanalista em Brasília, com atendimento online para o Brasil e o exterior.",
        identifier: site.registration,
        url: `${site.url}/`,
        image: `${site.url}${site.portrait.src}`,
        sameAs,
        knowsAbout: [...site.specialties],
        knowsLanguage: "pt-BR",
        alumniOf: { "@type": "CollegeOrUniversity", name: "Centro Universitário de Brasília (UniCEUB)" },
        worksFor: { "@id": businessId },
      },
      {
        "@type": ["MedicalBusiness", "LocalBusiness"],
        "@id": businessId,
        name: `${site.name} · Psicóloga e Psicanalista`,
        description: "Psicoterapia, psicanálise e psicologia jurídica em Brasília e online.",
        url: `${site.url}/`,
        image: [`${site.url}${site.ogImage}`, `${site.url}${site.portrait.src}`],
        sameAs,
        hasMap: site.mapUrl,
        priceRange: site.price,
        currenciesAccepted: "BRL",
        address: {
          "@type": "PostalAddress",
          streetAddress: "SHN, Quadra 1, Bloco D, Sala 1107, Conjunto A, 11º andar, Edifício Fusion Work e Live",
          addressLocality: "Brasília",
          addressRegion: "DF",
          postalCode: "70701-040",
          addressCountry: "BR",
        },
        geo: { "@type": "GeoCoordinates", latitude: -15.7898359, longitude: -47.8852539 },
        areaServed: [
          { "@type": "Country", name: "Brasil" },
          { "@type": "AdministrativeArea", name: "Brasileiros no exterior (atendimento online)" },
        ],
        founder: { "@id": personId },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Atendimento e valores",
          itemListElement: site.services.map((service) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: service.name, description: service.description },
            ...(service.price.startsWith("R$")
              ? { price: service.price.replace("R$", "").trim().replace(",", "."), priceCurrency: "BRL" }
              : {}),
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: site.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

/** Migalhas de pão da página de publicações. */
export function publicationsStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Publicações", item: `${site.url}/publicacoes` },
    ],
  };
}
