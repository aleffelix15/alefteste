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
  sizeLabel: "4.7 KB · PDF",
};

export type ProjectScreen = {
  id: string;
  label: string;
  base: string;
  alt: string;
  caption: string;
};

export type ProjectCaseStudy = {
  problem: string;
  solution: string;
  technicalDecisions: string[];
};

export type ProjectStory = {
  id: string;
  number: string;
  name: string;
  tagline: string;
  status: "Demo auditada" | "Publicado";
  summary: string;
  architectureNote: string;
  stack: string[];
  liveUrl: string;
  liveDomainLabel: string;
  requestedUrlNote?: {
    url: string;
    checkedAt: string;
    httpStatus: string;
    explanation: string;
  };
  repoUrl: string;
  repoLabel: string;
  screens: ProjectScreen[];
  verifiedFeatures: string[];
  honestLimitations: string[];
  caseStudy: ProjectCaseStudy;
  isArchitectureDiagram?: boolean;
};

export const heroData = {
  spineNumber: "01",
  spineLabel: "PORTFÓLIO 2026",
  statusBadge: "Disponível para oportunidades",
  firstName: "Álef Felix",
  lastName: "Engenharia de Software",
  statement:
    "Desenvolvo aplicações full-stack robustas, arquiteturas escaláveis e experiências digitais interativas. Foco em React, TypeScript, Java e alta performance técnica.",
  epigraph: "Tecnologia é sobre pessoas. É sobre resolver problemas reais.",
  ctaPrimary: "Ver projetos",
  ctaSecondary: "Baixar CV",
  cvUrl: cv.url,
  proofMetrics: [
    { value: 12, suffix: "+", label: "Repositórios", detail: "Projetos no GitHub" },
    { value: 3, suffix: "", label: "Deploys Ativos", detail: "Vercel & Produção" },
    { value: 18, suffix: "", label: "Tecnologias", detail: "Stack Auditada" },
  ],
  portraitImage: {
    base: "/images/alef-portrait-bw",
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
    "Três projetos autorais que representam meu processo de engenharia de software: e-commerce performático, narrativa interativa de conscientização e arquitetura bancária full-stack.",
  allProjectsLabel: "Ver todos os projetos no GitHub",
};

export const projects: ProjectStory[] = [
  {
    id: "verso",
    number: "01.",
    name: "VERSO",
    tagline: "E-commerce de streetwear (projeto demonstrativo).",
    status: "Demo auditada",
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
    requestedUrlNote: {
      url: "https://verso-sable.vercel.app/",
      checkedAt: "22/10/2026",
      httpStatus: "HTTP 404 (DEPLOYMENT_NOT_FOUND)",
      explanation:
        "A URL histórica verso-sable.vercel.app retorna HTTP 404 na Vercel. O botão 'Visitar projeto' abre diretamente o deploy ativo e verificado do mesmo repositório em verso-five-psi.vercel.app (HTTP 200 OK).",
    },
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
    id: "banktef",
    number: "03.",
    name: "BANKTEF",
    tagline: "Plataforma bancária & TEF full-stack (Java 21 + Spring Boot 3 + React 19).",
    status: "Demo auditada",
    summary:
      "Sistema de gerenciamento bancário e autorização de transações eletrônicas com arquitetura em microsserviços, segurança stateless com JWT, persistência relacional e conteinerização completa.",
    architectureNote:
      "Backend construído em Java 21 LTS com Spring Boot 3.2.3, Spring Security com JWT (io.jsonwebtoken), Spring Data JPA, PostgreSQL e H2. Frontend em React 19, TypeScript, React Router 7, Axios e Tailwind CSS 4. Orquestrado com Docker Compose e builds multi-stage.",
    stack: [
      "Java 21 LTS",
      "Spring Boot 3",
      "Spring Security",
      "JWT",
      "PostgreSQL",
      "React 19",
      "TypeScript",
      "Docker",
      "Tailwind CSS 4",
      "Maven",
    ],
    liveUrl: "https://github.com/aleffelix15/BANKTEF",
    liveDomainLabel: "github.com/aleffelix15/BANKTEF",
    repoUrl: "https://github.com/aleffelix15/BANKTEF",
    repoLabel: "github.com/aleffelix15/BANKTEF",
    isArchitectureDiagram: true,
    screens: [
      {
        id: "banktef-arch",
        label: "Arquitetura SVG",
        base: "/screens/banktef-arch",
        alt: "Diagrama vetorial da arquitetura full-stack do projeto BANKTEF.",
        caption: "DIAGRAMA DE ARQUITETURA TÉCNICA · BANKTEF FULL-STACK",
      },
    ],
    verifiedFeatures: [
      "Autenticação e controle de acesso stateless via Spring Security com tokens JWT e roles de usuário.",
      "Modelagem de dados com JPA/Hibernate cobrindo Contas, Clientes, Cartões e Transações TEF.",
      "Documentação interativa de endpoints com SpringDoc OpenAPI e Swagger UI integrados.",
      "Multi-stage Dockerfiles com imagens leves (eclipse-temurin:21 e node:alpine).",
      "Frontend reativo em React 19 consumindo serviços REST via Axios com tratamento unificado de erros.",
    ],
    honestLimitations: [
      "Ambiente acadêmico/demonstrativo: módulo TEF opera com simulador de transações sem conexão com adquirentes financeiras reais.",
      "Execução em contêineres Docker locais via docker-compose.",
    ],
    caseStudy: {
      problem:
        "Sistemas bancários demandam rigor absoluto em integridade transacional, isolamento de segurança contra ataques comuns e escalabilidade de microsserviços.",
      solution:
        "Estruturação de um backend em Java 21 LTS aplicando o padrão Controller-Service-Repository com DTOs imutáveis, autenticação stateless via JWT e banco relacional ACID (PostgreSQL).",
      technicalDecisions: [
        "Java 21 LTS (Eclipse Temurin) aproveitando estabilidade corporativa e suporte a Virtual Threads.",
        "Spring Security com filtro JWT stateless customizado, desacoplando o servidor de sessões HTTP em memória.",
        "PostgreSQL 15 para garantia de integridade referencial com H2 Database para testes ágeis.",
        "Docker Compose orquestrando backend Java, banco de dados PostgreSQL e frontend Nginx de forma reproduzível.",
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
  | "BANKTEF"
  | "BioStudy"
  | "Loja de Roupa"
  | "ConektaCell"
  | "alef.dev";

export type TechTier = "daily" | "projects" | "learning";

export type TechItem = {
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
  { id: "projects", label: "Já usei em projetos", desc: "Tecnologias comprovadas em projetos e arquiteturas auditadas" },
  { id: "learning", label: "Estudando", desc: "Tópicos de aprofundamento contínuo em engenharia de software" },
  { id: "ALL", label: "Ver todas", desc: "Visão consolidada de todas as ferramentas e tecnologias auditadas" },
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
      "Construção de interfaces reativas, componentização acessível, estilização com tokens, roteamento e gráficos 3D/movimento.",
  },
  {
    id: "backend",
    number: "02",
    title: "Backend, Dados & APIs",
    description:
      "APIs REST em Java e Spring Boot, autenticação stateless com JWT, persistência relacional PostgreSQL/Supabase e documentação OpenAPI.",
  },
  {
    id: "engineering",
    number: "03",
    title: "Engenharia, Qualidade & Infraestrutura",
    description:
      "SSR/Server Functions, validação de esquemas, testes automatizados, containerização Docker, padronização de código e deploy contínuo.",
  },
];

export const techChapterData = {
  spineNumber: "04",
  spineLabel: "TECNOLOGIAS",
  headlineLine1: "Ferramentas que",
  headlineAccent: "eu utilizo",
  subtitle:
    "Tecnologias que me ajudam a transformar ideias em soluções digitais — auditadas diretamente nos manifestos (package.json, pom.xml, Dockerfile e schemas SQL) dos meus repositórios públicos.",
  epigraph:
    "Código não é só sintaxe, é a forma que eu escolho resolver problemas.",
  auditTransparency: {
    verifiedRepos: [
      { name: "VERSO", url: "https://github.com/aleffelix15/verso", focus: "React 19, TS 5.8, TanStack Start/Router/Query, Tailwind 4, Three.js, Framer Motion 14, Zod, Vitest 4, Prettier, Supabase REST + PostgreSQL SQL" },
      { name: "DECODE", url: "https://github.com/aleffelix15/decode", focus: "React 18, JavaScript (ES Modules), Vite 5, Tailwind CSS 3.4, Lucide React" },
      { name: "BANKTEF", url: "https://github.com/aleffelix15/BANKTEF", focus: "Java 21, Spring Boot 3.2.3, Spring Security, Spring Data JPA, JWT (jjwt), PostgreSQL, H2, Maven, Docker Compose, React 19, TS 6, React Router 7, Axios" },
      { name: "BioStudy (biomed)", url: "https://github.com/aleffelix15/biomed", focus: "React 18, Supabase (@supabase/supabase-js + Deno Edge Function TS + PostgreSQL RLS), Python (scripts de dados), Vite 5, Three.js" },
      { name: "Loja de Roupa & ConektaCell", url: "https://github.com/aleffelix15/loja-de-roupa", focus: "Next.js 16.2, React 19.2, TypeScript 5.7, Tailwind CSS 4.2, Radix UI, Zod, Vercel Analytics" },
      { name: "alef.dev (Portfólio)", url: "https://github.com/aleffelix15/alef.dev", focus: "React 18, TypeScript 5.2, Vite 5, Tailwind CSS 3, Framer Motion, ESLint, Google Gemini API" },
    ],
    excludedFromReferenceNote:
      "Transparência de auditoria: 1) AWS, MySQL e Jest não foram encontrados nos manifestos de nenhum dos 7 repositórios (o BANKTEF utiliza PostgreSQL e H2 no pom.xml; o Verso utiliza Vitest e o BANKTEF utiliza JUnit 5) e por isso foram excluídos da grade comprovada. 2) VS Code, Postman, Figma e Linux (Mint/Zorin/Alpine) são ferramentas de ambiente de estudo e desenvolvimento local, diferenciadas das dependências diretas de código.",
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
    projects: ["VERSO", "DECODE", "BANKTEF", "BioStudy", "Loja de Roupa", "ConektaCell"],
    provenanceNote: "React 19 (Verso, BANKTEF, Next) · React 18 (DECODE, BioStudy)",
  },
  {
    index: "02",
    name: "TypeScript",
    category: "frontend",
    tier: "daily",
    role: "Tipagem Estática & Contratos",
    brandColor: "#3178C6",
    projects: ["VERSO", "BANKTEF", "Loja de Roupa", "ConektaCell", "alef.dev"],
    provenanceNote: "TypeScript 5.7–6.0 nos projetos full-stack e frontend",
  },
  {
    index: "03",
    name: "JavaScript",
    category: "frontend",
    tier: "daily",
    role: "ES Modules & Lógica Interativa",
    brandColor: "#F7DF1E",
    projects: ["VERSO", "DECODE", "BioStudy"],
    provenanceNote: "Motor narrativo no DECODE e módulos no BioStudy",
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
    projects: ["VERSO", "DECODE", "BANKTEF", "BioStudy", "alef.dev"],
    provenanceNote: "Vite 8 (Verso, BANKTEF) · Vite 5 (DECODE, BioStudy)",
  },
  {
    index: "06",
    name: "Tailwind CSS",
    category: "frontend",
    tier: "daily",
    role: "Design System & Utilitários CSS",
    brandColor: "#38BDF8",
    projects: ["VERSO", "DECODE", "BANKTEF", "Loja de Roupa", "ConektaCell"],
    provenanceNote: "Tailwind CSS 4 (Verso, BANKTEF) · Tailwind CSS 3 (DECODE)",
  },
  {
    index: "07",
    name: "HTML",
    category: "frontend",
    tier: "daily",
    role: "Semântica & Acessibilidade",
    brandColor: "#E34F26",
    projects: ["VERSO", "DECODE", "BANKTEF", "BioStudy"],
    provenanceNote: "Estrutura semântica e landmarks ARIA",
  },
  {
    index: "08",
    name: "CSS",
    category: "frontend",
    tier: "daily",
    role: "Layout Grid, Tokens & Motion",
    brandColor: "#264DE4",
    projects: ["VERSO", "DECODE", "BANKTEF", "alef.dev"],
    provenanceNote: "CSS Custom Properties, Grid, Flexbox e Keyframes",
  },
  {
    index: "09",
    name: "Framer Motion",
    category: "frontend",
    tier: "projects",
    role: "Transições & Coreografia de UI",
    brandColor: "#8B5CF6",
    projects: ["VERSO", "BANKTEF", "alef.dev"],
    provenanceNote: "Framer Motion 14 (Verso) · 13.4 (BANKTEF)",
  },
  {
    index: "10",
    name: "Three.js",
    category: "frontend",
    tier: "projects",
    role: "Renderização 3D & WebGL",
    brandColor: "#E2E8F0",
    projects: ["VERSO", "BioStudy"],
    provenanceNote: "Three.js 0.186 + React Three Fiber / Drei no Verso",
  },
  {
    index: "11",
    name: "React Router",
    category: "frontend",
    tier: "projects",
    role: "Roteamento SPA Client-Side",
    brandColor: "#F43F5E",
    projects: ["BANKTEF"],
    provenanceNote: "react-router-dom 7.18.4 no frontend do BANKTEF",
  },
  {
    index: "12",
    name: "Lucide React",
    category: "frontend",
    tier: "projects",
    role: "Iconografia Técnica Vetorial",
    brandColor: "#FB7185",
    projects: ["VERSO", "DECODE", "BANKTEF", "BioStudy", "Loja de Roupa"],
    provenanceNote: "Sistema de ícones presente em todos os frontends",
  },

  // 02. BACKEND, DADOS & APIS
  {
    index: "13",
    name: "Java",
    category: "backend",
    tier: "projects",
    role: "Linguagem Backend & OO",
    brandColor: "#F89820",
    projects: ["BANKTEF"],
    provenanceNote: "Java 21 LTS (Eclipse Temurin 21) em BANKTEF/backend",
  },
  {
    index: "14",
    name: "Spring Boot",
    category: "backend",
    tier: "projects",
    role: "API REST, Validação & Camadas",
    brandColor: "#6DB33F",
    projects: ["BANKTEF"],
    provenanceNote: "Spring Boot 3.2.3 (Web, Validation, Test) em BANKTEF",
  },
  {
    index: "15",
    name: "Spring Security",
    category: "backend",
    tier: "projects",
    role: "Autenticação & Filtros de Acesso",
    brandColor: "#6DB33F",
    projects: ["BANKTEF"],
    provenanceNote: "spring-boot-starter-security em BANKTEF/backend/pom.xml",
  },
  {
    index: "16",
    name: "JWT",
    category: "backend",
    tier: "projects",
    role: "Tokens Stateless Assinados",
    brandColor: "#D946EF",
    projects: ["BANKTEF"],
    provenanceNote: "jjwt-api / jjwt-impl / jjwt-jackson 0.11.5 em BANKTEF",
  },
  {
    index: "17",
    name: "Spring Data JPA",
    category: "backend",
    tier: "projects",
    role: "ORM Hibernate & Repositórios",
    brandColor: "#59666C",
    projects: ["BANKTEF"],
    provenanceNote: "spring-boot-starter-data-jpa em BANKTEF/backend",
  },
  {
    index: "18",
    name: "PostgreSQL",
    category: "backend",
    tier: "projects",
    role: "Banco de Dados Relacional SQL",
    brandColor: "#336791",
    projects: ["VERSO", "BANKTEF", "BioStudy"],
    provenanceNote: "Driver PostgreSQL (BANKTEF) e migrations SQL (Verso, BioStudy)",
  },
  {
    index: "19",
    name: "Supabase",
    category: "backend",
    tier: "projects",
    role: "BaaS, Postgres & Row-Level Security",
    brandColor: "#3ECF8E",
    projects: ["VERSO", "BioStudy"],
    provenanceNote: "Persistência REST (Verso) e @supabase/supabase-js + RLS (BioStudy)",
  },
  {
    index: "20",
    name: "H2 Database",
    category: "backend",
    tier: "projects",
    role: "Banco em Memória para Dev/Test",
    brandColor: "#38BDF8",
    projects: ["BANKTEF"],
    provenanceNote: "com.h2database:h2 em BANKTEF/backend/pom.xml",
  },
  {
    index: "21",
    name: "Maven",
    category: "backend",
    tier: "projects",
    role: "Gestão de Dependências & Build Java",
    brandColor: "#C71A36",
    projects: ["BANKTEF"],
    provenanceNote: "Maven 3.9 + spring-boot-maven-plugin em BANKTEF",
  },
  {
    index: "22",
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
    index: "23",
    name: "TanStack Query",
    category: "engineering",
    tier: "projects",
    role: "SSR, Server Functions & Cache",
    brandColor: "#FF4154",
    projects: ["VERSO"],
    provenanceNote: "TanStack Start, Router & React Query 5.101 no Verso",
  },
  {
    index: "24",
    name: "Zod",
    category: "engineering",
    tier: "projects",
    role: "Validação de Schemas & Payloads",
    brandColor: "#7C3AED",
    projects: ["VERSO", "Loja de Roupa", "ConektaCell"],
    provenanceNote: "Zod 3.25 no checkout/webhooks do Verso e formulários",
  },
  {
    index: "25",
    name: "Vitest",
    category: "engineering",
    tier: "projects",
    role: "Testes Unitários Automatizados",
    brandColor: "#86EFAC",
    projects: ["VERSO"],
    provenanceNote: "Vitest 4.1 + Testing Library no Verso",
  },
  {
    index: "26",
    name: "Docker",
    category: "engineering",
    tier: "projects",
    role: "Containers & Multi-Stage Build",
    brandColor: "#2496ED",
    projects: ["BANKTEF"],
    provenanceNote: "Dockerfiles multi-stage (backend Java 21 + frontend) no BANKTEF",
  },
  {
    index: "27",
    name: "Axios",
    category: "engineering",
    tier: "projects",
    role: "Cliente HTTP & Interceptors",
    brandColor: "#5A29E4",
    projects: ["BANKTEF"],
    provenanceNote: "axios 1.20.0 na integração frontend-backend do BANKTEF",
  },
  {
    index: "28",
    name: "ESLint",
    category: "engineering",
    tier: "projects",
    role: "Análise Estática & Qualidade",
    brandColor: "#6366F1",
    projects: ["VERSO", "Loja de Roupa", "ConektaCell", "alef.dev"],
    provenanceNote: "ESLint 9 + typescript-eslint no Verso",
  },
  {
    index: "29",
    name: "Prettier",
    category: "engineering",
    tier: "projects",
    role: "Formatação Padronizada de Código",
    brandColor: "#F7B93E",
    projects: ["VERSO"],
    provenanceNote: "Prettier 3.7.3 + eslint-plugin-prettier no Verso",
  },
  {
    index: "30",
    name: "Git",
    category: "engineering",
    tier: "daily",
    role: "Controle de Versão Distribuído",
    brandColor: "#F05032",
    projects: ["VERSO", "DECODE", "BANKTEF", "BioStudy"],
    provenanceNote: "Versionamento em todos os repositórios",
  },
  {
    index: "31",
    name: "GitHub",
    category: "engineering",
    tier: "daily",
    role: "Repositórios & Código Aberto",
    brandColor: "#F8FAFC",
    projects: ["VERSO", "DECODE", "BANKTEF", "BioStudy"],
    provenanceNote: "7 repositórios públicos em github.com/aleffelix15",
  },
  {
    index: "32",
    name: "Vercel",
    category: "engineering",
    tier: "projects",
    role: "Deploy & Edge Hosting",
    brandColor: "#E2E8F0",
    projects: ["VERSO", "DECODE", "Loja de Roupa", "ConektaCell"],
    provenanceNote: "Deploys ativos e @vercel/analytics",
  },

  // 04. ESTUDANDO (APROFUNDAMENTO CONTÍNUO)
  {
    index: "33",
    name: "Microsserviços",
    category: "engineering",
    tier: "learning",
    role: "Arquitetura Distribuída & Mensageria",
    brandColor: "#49B4FF",
    projects: ["BANKTEF"],
    provenanceNote: "Estudo contínuo de mensageria com RabbitMQ/Kafka e resiliência",
  },
  {
    index: "34",
    name: "CI/CD Actions",
    category: "engineering",
    tier: "learning",
    role: "Pipelines Automatizadas de Build",
    brandColor: "#2088FF",
    projects: ["alef.dev"],
    provenanceNote: "Workflows do GitHub Actions para lint, typecheck e testes automáticos",
  },
  {
    index: "35",
    name: "Testes E2E",
    category: "engineering",
    tier: "learning",
    role: "Playwright & Testes de Integração",
    brandColor: "#45BA4B",
    projects: ["alef.dev"],
    provenanceNote: "Testes automatizados end-to-end simulando navegação de usuários",
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
