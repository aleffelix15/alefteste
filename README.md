# Álef Felix Teixeira — Portfólio Editorial & Engenharia de Software

Portfólio autoral concebido sob direção de arte Editorial Técnica & Cinematográfica em tema escuro único, combinando tipografia editorial de alto contraste (*Playfair Display*, *Bricolage Grotesque*, *DM Mono*), fotografia documental e dados reais auditados dos projetos públicos do GitHub (`@aleffelix15`).

## Tech Stack & Requisitos

- **Ambiente**: Node.js >= 20, npm
- **Core**: React 18, TypeScript 5.5, Vite 6
- **Estilização & Motion**: CSS puro moderno (Design Tokens, Grid, Flexbox), Web Animations API, `IntersectionObserver`, `requestAnimationFrame`
- **Qualidade & Segurança**: CSP estrita, OWASP/HSTS headers, dependências verificadas por `npm audit` no CI

## Comandos & Scripts

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento local
npm run dev

# Gerar build de produção otimizado (TypeScript + Vite)
npm run build

# Pré-visualizar o build localmente
npm run preview

# Executar suíte de testes automatizados (segurança, integridade e assets)
npm test

# Executar auditoria responsiva opcional em 14 viewports (exige: npx playwright install chromium)
npm run audit:responsive

# Verificar vulnerabilidades em dependências
npm audit
```

## Estrutura do Projeto

```text
portfolio-alef-felix/
├── public/              # Assets estáticos (fontes woff2, favicons, OG image, PDF do CV)
│   ├── fonts/           # Subsets de Playfair Display, Bricolage e DM Mono
│   ├── images/          # Retratos e grafismos em AVIF/WebP
│   └── screens/         # Capturas reais de tela dos projetos auditados
├── scripts/             # Scripts de automação (testes de integridade e auditoria responsiva)
├── src/                 # Código-fonte da aplicação
│   ├── components/      # Componentes modulares React (Header, Chapters, Footer)
│   ├── styles/          # Folhas de estilo CSS puro divididas por capítulo e tokens globais
│   ├── data.ts          # Dados canônicos do portfólio, projetos e biografia
│   ├── icons.tsx        # Emblemas e ícones vetoriais inline otimizados
│   └── motion.ts        # Coreografia de animações puras e decodificação monoespaçada
├── .github/             # Automação de CI (GitHub Actions) e Dependabot
├── index.html           # Documento HTML com metadados SEO e preload LCP
└── vercel.json          # Deploy na Vercel com CSP estrita, headers de segurança e cache
```

## Deploy & Infraestrutura

- **Plataforma**: Vercel (Static Site Deployment com `cleanUrls: true`)
- **Segurança**: CSP estrita sem `unsafe-inline`/`unsafe-eval`, HSTS (2 anos), COOP/CORP same-origin, X-Frame-Options DENY, Permissions-Policy
- **Cache**: Headers imutáveis para assets versionados e políticas balanceadas para imagens e fontes

## Licença

UNLICENSED — Todos os direitos reservados. Código e conteúdo autoral de Álef Felix Teixeira.
