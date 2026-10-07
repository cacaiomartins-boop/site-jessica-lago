import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { site } from "../config/site";
import { SiteFooter, SiteHeader } from "../components/site-chrome";

function NotFoundComponent() {
  return (
    <>
      <title>Página não encontrada | Jéssica Priscila Lago</title>
      <meta name="robots" content="noindex" />
      <SiteHeader solid />
      <main id="conteudo" tabIndex={-1}>
        <section className="pub-hero"><div className="container">
          <span className="section-label">Erro 404</span>
          <h1 className="section-title">Esta página <em>não foi encontrada.</em></h1>
          <p className="text-copy">O endereço pode ter mudado ou ter sido digitado de outra forma. Você pode voltar ao início ou ver os textos publicados.</p>
        </div></section>
        <section className="pub-section"><div className="container">
          <div className="pub-actions">
            <Link className="btn btn-dark" to="/">Voltar ao início</Link>
            <Link className="btn btn-outline" to="/publicacoes">Ver publicações</Link>
          </div>
        </div></section>
      </main>
      <SiteFooter />
    </>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <>
      <title>Algo deu errado | Jéssica Priscila Lago</title>
      <meta name="robots" content="noindex" />
      <SiteHeader solid />
      <main id="conteudo" tabIndex={-1}>
        <section className="pub-hero"><div className="container">
          <span className="section-label">Algo deu errado</span>
          <h1 className="section-title">Esta página <em>não carregou.</em></h1>
          <p className="text-copy">Houve um problema do nosso lado. Tente atualizar a página ou volte ao início.</p>
        </div></section>
        <section className="pub-section"><div className="container">
          <div className="pub-actions">
            <button className="btn btn-dark" onClick={() => { router.invalidate(); reset(); }}>Tentar de novo</button>
            <a className="btn btn-outline" href="/">Voltar ao início</a>
          </div>
        </div></section>
      </main>
      <SiteFooter />
    </>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#f3f2e9" },
      { name: "author", content: site.name },
      { name: "google-site-verification", content: "RA3pBh63a4uFPV88Fc2dEmFSYV4ilPAScSnNpPXBw5Y" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preload", as: "font", type: "font/woff2", href: "/fonts/fraunces-300-normal.woff2", crossOrigin: "anonymous" },
      { rel: "preload", as: "font", type: "font/woff2", href: "/fonts/fraunces-300-italic.woff2", crossOrigin: "anonymous" },
      { rel: "preload", as: "font", type: "font/woff2", href: "/fonts/inter-var.woff2", crossOrigin: "anonymous" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
