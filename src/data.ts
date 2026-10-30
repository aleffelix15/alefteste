export const links = {
  siteUrl: "https://portfolio-alef-felix.vercel.app",
  github: "https://github.com/aleffelix15",
  linkedin: "https://www.linkedin.com/in/alef-felix-teixeira-a5030b236/",
  email: "aleffelix81@gmail.com",
  phone: "(62) 98516-3672",
  whatsapp: "https://wa.me/5562985163672?text=Ol%C3%A1%20%C3%81lef%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!",
  disponivel: true,
};

export const cv = {
  url: "/curriculo-alef-felix.pdf",
  fileName: "Curriculo-Alef-Felix.pdf",
  available: true,
  updatedAt: "10/2026",
  sizeLabel: "4.8 KB · PDF",
};

type ProjectScreen = {
  id: string;
  label: string;
  base: string;
  alt: string;
  caption: string;
};

type ProjectCaseStudy = {
  problem: string;
  solution: string;
  technicalDecisions: string[];
};

export type ProjectStory = {
  id: string;
  number: string;
  name: string;
  tagline: string;
  status: "Publicado";
  summary: string;
  architectureNote: string;
  stack: string[];
  liveUrl: string;
  liveDomainLabel: string;
  repoUrl?: string;
  repoLabel?: string;
  screens: ProjectScreen[];
  verifiedFeatures: string[];
  honestLimitations: string[];
  caseStudy: ProjectCaseStudy;
};

export const heroData = {
  spineNumber: "01",
  spineLabel: "PORTFÓLIO 2026",
  statusBadge: "Disponível para oportunidades",
  firstName: "Álef Felix",
  lastName: "Engenharia de Software",
  statement:
    "Desenvolvo aplicações full-stack robustas, experiências 3D interativas e arquiteturas escaláveis. Foco em React, TypeScript, Three.js e alta performance técnica.",
  epigraph: "Tecnologia é sobre pessoas. É sobre resolver problemas reais.",
  ctaPrimary: "Ver projetos",
  ctaSecondary: "Baixar CV",
  cvUrl: cv.url,
  proofMetrics: [
    { value: 12, suffix: "+", label: "Repositórios", detail: "Projetos no GitHub" },
    { value: 3, suffix: "", label: "Deploys Ativos", detail: "Vercel & Produção" },
    { value: 14, suffix: "", label: "Tecnologias", detail: "Stack Principal" },
  ],
  portraitImage: {
    base: "/images/alef-portrait-bw",
    base640: "/images/alef-portrait-bw-640",
    alt: "Retrato em preto e branco de Álef Felix Teixeira, estudante de Engenharia de Software.",
    caption: "ÁLEF FELIX TEIXEIRA · ENGENHARIA DE SOFTWARE",
  },
  studioImage: {
    base: "/images/alef-portrait-bw",
    alt: "Retrato em preto e branco de Álef Felix Teixeira com tratamento duotone azul sutil.",
    caption: "ÁLEF FELIX TEIXEIRA · RETRATO AUTORAL",
  },
};

export const projectsIntro = {
  spineNumber: "02",
  spineLabel: "PROJETOS",
  headline: "Ideias que viram experiências.",
  description:
    "Três projetos autorais que representam meu processo de engenharia de software: e-commerce performático, narrativa interativa de conscientização e experiência 3D de produto financeiro.",
  allProjectsLabel: "Ver todos os projetos no GitHub",
};

export const projects: ProjectStory[] = [
  {
    id: "verso",
    number: "01.",
    name: "VERSO",
    tagline: "E-commerce de streetwear (projeto demonstrativo).",
    status: "Publicado",
    summary:
      "Loja digital autoral de streetwear com catálogo interativo, coleções (drops), favoritos salvos localmente no navegador, sacola persistente e cálculo de frete no servidor.",
    architectureNote:
      "Construído com React 19, TypeScript e TanStack Start (SSR/Server Functions), estilizado com Tailwind CSS 4, animações em Framer Motion, visualização 3D com Three.js, validação de esquemas com Zod e testes unitários em Vitest.",
    stack: [
      "React 19",
      "TypeScript",
      "TanStack Start",
      "Tailwind CSS 4",
      "Framer Motion",
      "Three.js",
      "Zod",
      "Vitest",
      "Vercel",
    ],
    liveUrl: "https://verso-five-psi.vercel.app/",
    liveDomainLabel: "verso-five-psi.vercel.app",
    repoUrl: "https://github.com/aleffelix15/verso",
    repoLabel: "github.com/aleffelix15/verso",
    screens: [
      {
        id: "verso-home",
        label: "Capa & Drop 01",
        base: "/screens/verso",
        alt: "Captura real da interface principal do e-commerce Verso.",
        caption: "CAPTURA REAL DA APLICAÇÃO · VERSO-FIVE-PSI.VERCEL.APP",
      },
    ],
    verifiedFeatures: [
      "Rotas completas de loja, ficha de produto, drops, sobre, contato, privacidade, termos e trocas.",
      "Sacola com cálculo de frete executado no servidor em centavos inteiros via server function.",
      "Favoritos persistidos em localStorage no navegador, sem exigir criação de conta.",
      "Estrutura de checkout e rota de webhook com SDK do Mercado Pago e validação Zod.",
      "Elementos 3D com Three.js (@react-three/fiber) e testes automatizados com Vitest.",
    ],
    honestLimitations: [
      "Projeto demonstrativo: os produtos do catálogo utilizam dados de exemplo.",
      "O fluxo de checkout não realiza cobranças comerciais reais nem liquidação em produção.",
    ],
    caseStudy: {
      problem:
        "E-commerces convencionais sofrem com tempos lentos de carregamento inicial (FCP/LCP) e experiências truncadas em catálogo denso causadas por bundlers monolíticos.",
      solution:
        "Implementação com React 19 e TanStack Start pré-renderizando páginas no servidor (SSR) com hidratação seletiva, sacola persistida no cliente e rotas tipadas de ponta a ponta.",
      technicalDecisions: [
        "TanStack Start e Server Functions para tipagem garantida entre cliente e servidor sem duplicar contratos.",
        "Tailwind CSS 4 para compilação com zero overhead em tempo de execução.",
        "Carregamento tardio (lazy loading) nos canvas Three.js para não impactar o First Contentful Paint.",
        "Vitest para testes unitários automatizados com execução instantânea.",
      ],
    },
  },
  {
    id: "decode",
    number: "02.",
    name: "DECODE",
    tagline: "Experiência interativa (Agosto Lilás).",
    status: "Publicado",
    summary:
      "Aplicação interativa de conscientização sobre violência contra a mulher, estruturada com narrativa ramificada em capítulos, módulos de triagem rápida, linha do tempo e canais de ajuda.",
    architectureNote:
      "Desenvolvida em React 18, JavaScript (ES Modules), Vite 5, Tailwind CSS 3 e Lucide React. Executa 100% no navegador (SPA) com gerenciamento de estado dos capítulos e cartas de insights em tempo real.",
    stack: [
      "React 18",
      "JavaScript",
      "Vite 5",
      "Tailwind CSS 3",
      "Lucide React",
      "Vercel",
    ],
    liveUrl: "https://decode-ochre.vercel.app/",
    liveDomainLabel: "decode-ochre.vercel.app",
    repoUrl: "https://github.com/aleffelix15/decode",
    repoLabel: "github.com/aleffelix15/decode",
    screens: [
      {
        id: "decode-cover",
        label: "Abertura",
        base: "/screens/decode",
        alt: "Captura real da tela inicial do projeto DECODE (Agosto Lilás).",
        caption: "CAPTURA REAL 01/02 · TELA DE ABERTURA (DECODE-OCHRE.VERCEL.APP)",
      },
      {
        id: "decode-dashboard",
        label: "Painel & Casos",
        base: "/screens/decode-dashboard",
        alt: "Captura real do painel interno do projeto DECODE com casos Sofia e Marcos e módulos de triagem.",
        caption: "CAPTURA REAL 02/02 · PAINEL DE CAPÍTULOS E TRIAGEM RÁPIDA",
      },
    ],
    verifiedFeatures: [
      "Narrativa interativa dividida em capítulos e casos práticos (Caso 01 Sofia e Caso 02 Marcos).",
      "Módulos interativos: Triagem Rápida, Linha do Tempo, O Algoritmo, Arquivos Ocultos e Firewall.",
      "Cartas de insights desbloqueáveis, visualização de dados (DataLab) e botão de Saída Rápida / Ajuda.",
      "Execução integral client-side rápida e sem dependência de servidor externo.",
    ],
    honestLimitations: [
      "Aplicação 100% client-side (SPA): o progresso é mantido na sessão local do navegador, sem banco de dados externo.",
    ],
    caseStudy: {
      problem:
        "Campanhas educativas de conscientização social tradicionalmente têm baixa retenção por utilizarem formatos de leitura passivos e cartilhas estáticas.",
      solution:
        "Criação de um sistema de capítulos narrativos ramificados onde o usuário investiga dados, identifica padrões de comportamento abusivo e desbloqueia orientações práticas de apoio.",
      technicalDecisions: [
        "Arquitetura 100% client-side sem dependência de servidores de terceiros para garantir disponibilidade permanente.",
        "Botão de emergência 'Saída Rápida' que limpa a tela e redireciona imediatamente, protegendo a usuária.",
        "Vite 5 com árvore de dependências enxuta para tempo de carregamento inferior a 800ms.",
      ],
    },
  },
  {
    id: "nudemo",
    number: "03.",
    name: "NUDEMO",
    tagline: "Landing page 3D de conceito de redesign: conta, cartão e Pix num só app.",
    status: "Publicado",
    summary:
      "Conceito de redesign independente inspirado no Nubank, com cartão 3D em tempo real, mockup de app vetorial e foco em acessibilidade e performance de carregamento.",
    architectureNote:
      "SPA em React 18 e Vite 5 (JavaScript/JSX). Cena 3D com Three.js 0.160 e React Three Fiber 8, animações com Framer Motion 11 (LazyMotion), estilos em CSS próprio com design tokens. Chunks do Three.js e do R3F separados e carregados sob demanda. Deploy na Vercel.",
    stack: [
      "React 18",
      "Vite 5",
      "Three.js",
      "React Three Fiber",
      "Framer Motion",
      "JavaScript",
      "CSS Tokens",
      "Vercel",
    ],
    liveUrl: "https://nudem.vercel.app",
    liveDomainLabel: "nudem.vercel.app",
    repoLabel: "github.com/aleffelix15/nudem",
    screens: [
      {
        id: "nudemo-hero",
        label: "Hero 3D",
        base: "/screens/nudemo-hero",
        alt: "Captura real da página inicial do NUDEMO com o cartão 3D em destaque.",
        caption: "CAPTURA REAL DA APLICAÇÃO · NUDEM.VERCEL.APP",
      },
      {
        id: "nudemo-app",
        label: "App",
        base: "/screens/nudemo-app",
        alt: "Captura real da seção do aplicativo no NUDEMO, com o mockup de celular.",
        caption: "CAPTURA REAL DA APLICAÇÃO · NUDEM.VERCEL.APP",
      },
    ],
    verifiedFeatures: [
      "Cartão 3D em tempo real com React Three Fiber (MeshPhysicalMaterial), rotação guiada por scroll e inclinação pelo cursor.",
      "Fallback automático para cartão 2D (CardFallback) via SceneBoundary e hasWebGL quando não há aceleração gráfica ou em falhas de renderização.",
      "Respeito estrito a prefers-reduced-motion e qualidade gráfica adaptativa por tier (low/high) baseada em viewport e núcleos de CPU.",
      "Carregamento sob demanda com lazy/Suspense, separação em manualChunks (vendor-three, vendor-r3f) e montagem diferida da cena secundária.",
      "Mockup de smartphone com interface vetorial em JSX (Phone.jsx), alternância de abas (Conta/Cartão/Caixinhas), toggle de saldo e cópia de chave Pix simulada.",
    ],
    honestLimitations: [
      "Projeto demonstrativo e conceito de redesign independente, sem vínculo com o Nubank; todos os dados são fictícios.",
      "Nenhuma conta é aberta e nenhum dado é coletado; botões de ação apenas abrem um aviso demonstrativo.",
      "Interface do aplicativo no mockup é recriada em código (vetorial), não é captura do app real.",
      "Sem backend, banco de dados ou testes automatizados; a única verificação automática é o script de regressão do hero no prebuild.",
    ],
    caseStudy: {
      problem:
        "Cenas 3D costumam pesar o carregamento e quebrar em dispositivos sem WebGL ou com pouca capacidade.",
      solution:
        "Cena 3D carregada sob demanda, com fallback 2D automático, qualidade adaptativa e respeito a prefers-reduced-motion.",
      technicalDecisions: [
        "manualChunks separando vendor-three e vendor-r3f e modulePreload filtrado para manter o HTML crítico leve.",
        "SceneBoundary + hasWebGL para trocar para o cartão 2D sem tela em branco.",
        "Tier de qualidade low/high por largura, tipo de ponteiro e núcleos de CPU.",
        "Script guard-hero-swap no prebuild para impedir a regressão do cartão duplicado no hero.",
      ],
    },
  },
];

export const aboutData = {
  spineNumber: "03",
  spineLabel: "SOBRE MIM",
  headline: "Engenharia, clareza e atenção aos detalhes.",
  paragraph1:
    "Sou estudante de Engenharia de Software e desenvolvedor web. Meu trabalho é centrado na criação de interfaces eficientes, acessíveis e focadas na experiência do usuário.",
  paragraph2:
    "Tenho interesse em construir aplicações digitais que combinem funcionalidade, organização e atenção aos detalhes.",
  paragraph3:
    "Desenvolvo aplicações utilizando tecnologias web modernas, valorizando arquitetura limpa, código legível e documentação honesta.",
  studioDeskImage: {
    base: "/images/studio-desk",
    alt: "Fotografia em preto e branco de uma mesa de trabalho com teclado mecânico, fones de estúdio e microfone diante de parede de concreto.",
    caption: "ENSAIO CONCEITUAL · AMBIENTE DE ESTÚDIO E PRECISÃO TÉCNICA",
  },
  realPortraitImage: {
    base: "/images/alef-portrait-bw",
    alt: "Retrato real em preto e branco de Álef Felix Teixeira.",
    caption: "RETRATO REAL · ÁLEF FELIX TEIXEIRA (ACERVO ALEF.DEV)",
  },
  processSteps: [
    {
      number: "01",
      title: "Entender",
      description: "Compreensão do problema real, do contexto de uso e das necessidades das pessoas.",
    },
    {
      number: "02",
      title: "Planejar",
      description: "Definição da arquitetura de componentes, rotas, contratos de dados e hierarquia visual.",
    },
    {
      number: "03",
      title: "Desenvolver",
      description: "Construção com código limpo, semântica HTML, responsividade e foco em performance.",
    },
    {
      number: "04",
      title: "Testar",
      description: "Verificação prática de fluxos, estados de interface, contraste e acessibilidade por teclado.",
    },
    {
      number: "05",
      title: "Documentar & Evoluir",
      description: "Registro honesto do que foi implementado, das limitações atuais e dos próximos passos.",
    },
  ],
};

export type TechCategory = "frontend" | "backend" | "engineering";

export type AuditedRepoName =
  | "VERSO"
  | "DECODE"
  | "NUDEMO"
  | "BioStudy"
  | "Loja de Roupa"
  | "ConektaCell"
  | "alef.dev";

export type TechTier = "daily" | "projects";

type TechItem = {
  index: string;
  name: string;
  category: TechCategory;
  tier: TechTier;
  role: string;
  brandColor: string;
  projects: AuditedRepoName[];
  provenanceNote: string;
};

export const techTiers: { id: "ALL" | TechTier; label: string; desc: string }[] = [
  { id: "daily", label: "Uso no dia a dia", desc: "Stack principal utilizada diariamente em produção e estudos" },
  { id: "projects", label: "Já usei em projetos", desc: "Tecnologias utilizadas na prática em projetos publicados" },
  { id: "ALL", label: "Ver todas", desc: "Visão consolidada de todas as ferramentas e tecnologias" },
];

export const techCategories: {
  id: TechCategory;
  number: string;
  title: string;
  description: string;
}[] = [
  {
    id: "frontend",
    number: "01",
    title: "Frontend & Interfaces",
    description:
      "Construção de interfaces reativas, componentização acessível, estilização com tokens e gráficos 3D.",
  },
  {
    id: "backend",
    number: "02",
    title: "Backend, Dados & APIs",
    description:
      "BaaS Supabase com autenticação e políticas RLS, e scripts de automação e dados em Python.",
  },
  {
    id: "engineering",
    number: "03",
    title: "Ferramentas & Deploy",
    description:
      "Controle de versão, repositórios e deploy dos projetos.",
  },
];

export const techChapterData = {
  spineNumber: "04",
  spineLabel: "TECNOLOGIAS",
  headlineLine1: "Ferramentas que",
  headlineAccent: "eu utilizo",
  subtitle:
    "Tecnologias que uso para transformar ideias em soluções digitais, a partir dos meus projetos públicos no GitHub.",
  epigraph:
    "Código não é só sintaxe, é a forma que eu escolho resolver problemas.",
  auditTransparency: {
    verifiedRepos: [
      { name: "VERSO", url: "https://github.com/aleffelix15/verso", focus: "React 19, TypeScript 5.8, Tailwind CSS 4, Three.js, Supabase REST" },
      { name: "DECODE", url: "https://github.com/aleffelix15/decode", focus: "React 18, JavaScript (ES Modules), Vite 5, Tailwind CSS 3.4" },
      { name: "NUDEMO", url: "https://nudem.vercel.app", focus: "React 18, Vite 5, JavaScript (JSX), Three.js 0.160, CSS com tokens, Vercel" },
      { name: "BioStudy (biomed)", url: "https://github.com/aleffelix15/biomed", focus: "React 18, Supabase (@supabase/supabase-js + RLS), Python (scripts de dados), Vite 5, Three.js" },
      { name: "Loja de Roupa & ConektaCell", url: "https://github.com/aleffelix15", focus: "Next.js 16.2, React 19.2, TypeScript 5.7, Tailwind CSS 4.2, Vercel" },
      { name: "alef.dev (Portfólio)", url: "https://github.com/aleffelix15/alef.dev", focus: "React 18, TypeScript 5.2, Vite 5, Tailwind CSS 3" },
    ],
  },
};

export const techIndexData: TechItem[] = [
  // 01. FRONTEND & INTERFACES
  {
    index: "01",
    name: "React",
    category: "frontend",
    tier: "daily",
    role: "Interfaces & Componentização",
    brandColor: "#00D8FF",
    projects: ["VERSO", "DECODE", "NUDEMO", "BioStudy", "Loja de Roupa", "ConektaCell"],
    provenanceNote: "React 19 (Verso, Next) · React 18 (DECODE, BioStudy, NUDEMO)",
  },
  {
    index: "02",
    name: "TypeScript",
    category: "frontend",
    tier: "daily",
    role: "Tipagem Estática & Contratos",
    brandColor: "#3178C6",
    projects: ["VERSO", "Loja de Roupa", "ConektaCell", "alef.dev"],
    provenanceNote: "TypeScript 5.7–6.0 nos projetos Verso, Loja de Roupa, ConektaCell e alef.dev",
  },
  {
    index: "03",
    name: "JavaScript",
    category: "frontend",
    tier: "daily",
    role: "ES Modules & Lógica Interativa",
    brandColor: "#F7DF1E",
    projects: ["VERSO", "DECODE", "NUDEMO", "BioStudy"],
    provenanceNote: "ES Modules no DECODE e módulos no BioStudy e NUDEMO",
  },
  {
    index: "04",
    name: "Next.js",
    category: "frontend",
    tier: "projects",
    role: "Framework React & Rotas Híbridas",
    brandColor: "#F8FAFC",
    projects: ["Loja de Roupa", "ConektaCell"],
    provenanceNote: "Next.js 16.2.0 em loja-de-roupa e conektacell",
  },
  {
    index: "05",
    name: "Vite",
    category: "frontend",
    tier: "daily",
    role: "Bundler & Dev Server Rápido",
    brandColor: "#BD34FE",
    projects: ["VERSO", "DECODE", "NUDEMO", "BioStudy", "alef.dev"],
    provenanceNote: "Vite 8 (Verso) · Vite 5 (DECODE, BioStudy, NUDEMO)",
  },
  {
    index: "06",
    name: "Tailwind CSS",
    category: "frontend",
    tier: "daily",
    role: "Design System & Utilitários CSS",
    brandColor: "#38BDF8",
    projects: ["VERSO", "DECODE", "Loja de Roupa", "ConektaCell"],
    provenanceNote: "Tailwind CSS 4 (Verso) · Tailwind CSS 3 (DECODE)",
  },
  {
    index: "07",
    name: "HTML",
    category: "frontend",
    tier: "daily",
    role: "Semântica & Acessibilidade",
    brandColor: "#E34F26",
    projects: ["VERSO", "DECODE", "BioStudy"],
    provenanceNote: "Estrutura semântica e landmarks ARIA",
  },
  {
    index: "08",
    name: "CSS",
    category: "frontend",
    tier: "daily",
    role: "Layout Grid, Tokens & Motion",
    brandColor: "#264DE4",
    projects: ["VERSO", "DECODE", "NUDEMO", "alef.dev"],
    provenanceNote: "CSS Custom Properties, Grid, Flexbox, Keyframes e tokens no NUDEMO",
  },
  {
    index: "09",
    name: "Three.js",
    category: "frontend",
    tier: "projects",
    role: "Renderização 3D & WebGL",
    brandColor: "#E2E8F0",
    projects: ["VERSO", "NUDEMO", "BioStudy"],
    provenanceNote: "Three.js 0.186 + R3F/Drei no Verso · Three.js 0.160 + R3F 8 no NUDEMO",
  },

  // 02. BACKEND, DADOS & APIS
  {
    index: "10",
    name: "Supabase",
    category: "backend",
    tier: "projects",
    role: "BaaS, Postgres & Row-Level Security",
    brandColor: "#3ECF8E",
    projects: ["VERSO", "BioStudy"],
    provenanceNote: "Persistência REST (Verso) e @supabase/supabase-js + RLS (BioStudy)",
  },
  {
    index: "11",
    name: "Python",
    category: "backend",
    tier: "projects",
    role: "Scripts de Automação & Dados",
    brandColor: "#FFD43B",
    projects: ["BioStudy"],
    provenanceNote: "Scripts de curadoria e migração de dados (42.5 KB em biomed/scratch/*.py)",
  },

  // 03. ENGENHARIA, QUALIDADE & FERRAMENTAS
  {
    index: "12",
    name: "Git",
    category: "engineering",
    tier: "daily",
    role: "Controle de Versão Distribuído",
    brandColor: "#F05032",
    projects: ["VERSO", "DECODE", "NUDEMO", "BioStudy"],
    provenanceNote: "Versionamento em todos os repositórios",
  },
  {
    index: "13",
    name: "GitHub",
    category: "engineering",
    tier: "daily",
    role: "Repositórios & Código Aberto",
    brandColor: "#F8FAFC",
    projects: ["VERSO", "DECODE", "NUDEMO", "BioStudy"],
    provenanceNote: "7 repositórios públicos em github.com/aleffelix15",
  },
  {
    index: "14",
    name: "Vercel",
    category: "engineering",
    tier: "projects",
    role: "Deploy & Edge Hosting",
    brandColor: "#E2E8F0",
    projects: ["VERSO", "DECODE", "NUDEMO", "Loja de Roupa", "ConektaCell"],
    provenanceNote: "Deploys ativos (Verso, DECODE, Loja de Roupa, ConektaCell, NUDEMO)",
  },
];

export const contactData = {
  spineNumber: "05",
  spineLabel: "CONTATO",
  headline: "Vamos conversar?",
  text:
    "Se você tem um projeto em mente, uma oportunidade profissional ou quer trocar ideias sobre desenvolvimento e engenharia de software, entre em contato pelos canais oficiais abaixo.",
};

export const footerData = {
  author: "Álef Felix Teixeira",
  role: "Desenvolvedor Web · 2026",
  copyright: `© ${new Date().getFullYear()} Álef Felix Teixeira. Todos os direitos reservados.`,
};
