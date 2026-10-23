export const links = {
  siteUrl: "",
  github: "https://github.com/aleffelix15",
  linkedin: "https://www.linkedin.com/in/alef-felix-teixeira-a5030b236/",
  disponivel: true,
};

export type ProjectScreen = {
  id: string;
  label: string;
  base: string;
  alt: string;
  caption: string;
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
};

export const heroData = {
  spineNumber: "01",
  spineLabel: "PORTFÓLIO 2026",
  firstName: "Álef Felix",
  lastName: "Teixeira",
  statement:
    "Estudante de Engenharia de Software. Desenvolvo aplicações web e soluções digitais com foco em experiência, performance e código organizado.",
  epigraph: "Tecnologia é sobre pessoas. É sobre resolver problemas reais.",
  ctaPrimary: "Explorar projetos",
  ctaSecondary: "Entrar em contato",
  studioImage: {
    base: "/images/studio-session",
    alt: "Fotografia conceitual em preto e branco de um estúdio de concreto com poltronas escuras, microfones articulados e notebook aberto com código.",
    caption:
      "ENSAIO CONCEITUAL ILUSTRATIVO · ESTÚDIO EM PRETO E BRANCO (NÃO REPRESENTA RETRATO PESSOAL)",
  },
};

export const projectsIntro = {
  spineNumber: "02",
  spineLabel: "PROJETOS",
  headline: "Ideias que viram experiências.",
  description:
    "Dois projetos que representam meu processo de aprendizado e minha forma de ver a tecnologia: como uma ferramenta para criar, conectar e gerar impacto.",
  allProjectsLabel: "Ver todos os projetos",
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

export type TechItem = {
  index: string;
  name: string;
  role: string;
  brandColor: string;
  projects: ("VERSO" | "DECODE")[];
  provenanceNote: string;
};

export const techChapterData = {
  spineNumber: "04",
  spineLabel: "TECNOLOGIAS",
  headlineLine1: "Ferramentas que",
  headlineAccent: "eu utilizo",
  subtitle:
    "Tecnologias que me ajudam a transformar ideias em soluções reais, eficientes e focadas na experiência do usuário.",
  epigraph:
    "Código não é só sintaxe, é a forma que eu escolho resolver problemas.",
};

export const techIndexData: TechItem[] = [
  {
    index: "01",
    name: "HTML",
    role: "Semântica & Estrutura Web",
    brandColor: "#E34F26",
    projects: ["VERSO", "DECODE"],
    provenanceNote: "Base semântica em todos os projetos",
  },
  {
    index: "02",
    name: "CSS",
    role: "Layout, Tokens & Animações",
    brandColor: "#264DE4",
    projects: ["VERSO", "DECODE"],
    provenanceNote: "CSS moderno, Grid, Flexbox e Keyframes",
  },
  {
    index: "03",
    name: "JavaScript",
    role: "ES Modules & Lógica Interativa",
    brandColor: "#F7DF1E",
    projects: ["VERSO", "DECODE"],
    provenanceNote: "Motor de capítulos no DECODE · Base web no Verso",
  },
  {
    index: "04",
    name: "TypeScript",
    role: "Tipagem Estática & Segurança",
    brandColor: "#3178C6",
    projects: ["VERSO"],
    provenanceNote: "TypeScript 5.8 (Verso & Portfólio)",
  },
  {
    index: "05",
    name: "React",
    role: "Interfaces & Componentização",
    brandColor: "#00D8FF",
    projects: ["VERSO", "DECODE"],
    provenanceNote: "React 19 (Verso) · React 18 (DECODE)",
  },
  {
    index: "06",
    name: "Vite",
    role: "Bundler & Ambiente de Build",
    brandColor: "#BD34FE",
    projects: ["VERSO", "DECODE"],
    provenanceNote: "Vite 8 (Verso) · Vite 5 (DECODE)",
  },
  {
    index: "07",
    name: "Tailwind CSS",
    role: "Design Tokens & Estilização",
    brandColor: "#38BDF8",
    projects: ["VERSO", "DECODE"],
    provenanceNote: "Tailwind CSS 4 (Verso) · Tailwind CSS 3 (DECODE)",
  },
  {
    index: "08",
    name: "TanStack Query",
    role: "SSR, Rotas & Server Functions",
    brandColor: "#FF4154",
    projects: ["VERSO"],
    provenanceNote: "TanStack Start, Router & Query no Verso",
  },
  {
    index: "09",
    name: "Zod",
    role: "Validação de Esquemas",
    brandColor: "#7C3AED",
    projects: ["VERSO"],
    provenanceNote: "Zod 3.25 no checkout e rotas do Verso",
  },
  {
    index: "10",
    name: "Vitest",
    role: "Testes Unitários Automatizados",
    brandColor: "#86EFAC",
    projects: ["VERSO"],
    provenanceNote: "Vitest 4 + Testing Library no Verso",
  },
  {
    index: "11",
    name: "Three.js",
    role: "Renderização 3D & WebGL",
    brandColor: "#E2E8F0",
    projects: ["VERSO"],
    provenanceNote: "Three.js + React Three Fiber / Drei no Verso",
  },
  {
    index: "12",
    name: "Framer Motion",
    role: "Transições & Animações de UI",
    brandColor: "#8B5CF6",
    projects: ["VERSO"],
    provenanceNote: "Framer Motion 14 no Verso",
  },
  {
    index: "13",
    name: "ESLint",
    role: "Qualidade & Padronização de Código",
    brandColor: "#6366F1",
    projects: ["DECODE"],
    provenanceNote: "ESLint 9 auditado no DECODE",
  },
  {
    index: "14",
    name: "Git",
    role: "Versionamento de Código",
    brandColor: "#F05032",
    projects: ["VERSO", "DECODE"],
    provenanceNote: "Controle de versão em todos os projetos",
  },
  {
    index: "15",
    name: "GitHub",
    role: "Repositórios & Código Aberto",
    brandColor: "#F8FAFC",
    projects: ["VERSO", "DECODE"],
    provenanceNote: "github.com/aleffelix15",
  },
  {
    index: "16",
    name: "Vercel",
    role: "Deploy & Hospedagem Web",
    brandColor: "#E2E8F0",
    projects: ["VERSO", "DECODE"],
    provenanceNote: "Publicações ativas na Vercel",
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
