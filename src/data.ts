export const links = {
  siteUrl: "", // configurável quando o domínio próprio estiver definido
  github: "https://github.com/aleffelix15",
  linkedin: "https://www.linkedin.com/in/alef-felix-teixeira-a5030b236/",
  disponivel: true,
};

export type ProjectStory = {
  id: string;
  number: string;
  chapterTag: string;
  name: string;
  subtitle: string;
  status: "Demo auditada" | "Publicado";
  year: string;
  lead: string;
  narrativeParagraph1: string;
  narrativeParagraph2: string;
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
  imageBase: string;
  imageAlt: string;
  imageCaption: string;
  imageType: "Captura real da aplicação";
  verifiedFeatures: string[];
  honestLimitations: string[];
};

export const heroData = {
  issueTag: "EDIÇÃO DOCUMENTAL N.º 01 // DOSSIÊ DE ENGENHARIA & INTERFACES",
  chapterLabel: "Abertura — A pessoa por trás do código",
  firstName: "Álef Felix",
  lastName: "Teixeira",
  statement:
    "Estudante de Engenharia de Software. Desenvolvo aplicações web e soluções digitais com foco em experiência, performance e código organizado.",
  editorialNote:
    "Mais do que empilhar telas, construir para a web exige silêncio visual, decisões claras de arquitetura e respeito por quem está do outro lado da interface. Este portfólio foi concebido como um caderno editorial sobre como penso, estudo e desenvolvo software.",
  ctaPrimary: "Explorar projetos",
  ctaSecondary: "Entrar em contato",
  studioImage: {
    base: "/images/studio-session",
    alt: "Fotografia conceitual em preto e branco de um estúdio de concreto com duas poltronas de couro escuro, microfones de estúdio articulados e um notebook aberto com código sobre mesa baixa.",
    caption:
      "FIG. 00 — Ensaio conceitual ilustrativo: o estúdio como metáfora de escuta, rigor técnico e diálogo entre engenharia e direção de arte.",
  },
  pillars: [
    {
      index: "01",
      title: "Experiência & Silêncio Visual",
      detail: "Interfaces sem ruído, guiadas por tipografia, contraste e hierarquia clara de leitura.",
    },
    {
      index: "02",
      title: "Performance & Semântica",
      detail: "Carregamento enxuto, acessibilidade por teclado e respeito às preferências do sistema.",
    },
    {
      index: "03",
      title: "Código Organizado & Honesto",
      detail: "Componentização modular, tipagem explícita e documentação transparente sobre o que cada projeto faz.",
    },
  ],
};

export const projects: ProjectStory[] = [
  {
    id: "verso",
    number: "01",
    chapterTag: "CRÔNICA DE CONSTRUÇÃO // 01 DE 02",
    name: "Verso",
    subtitle: "E-commerce demonstrativo de streetwear & arquitetura full-stack em React 19",
    status: "Demo auditada",
    year: "2026",
    lead:
      "Como projetar uma loja digital de moda autoral em que a atmosfera gráfica caminha lado a lado com regras reais de negócio, validação de dados e cálculo de frete no servidor.",
    narrativeParagraph1:
      "Verso nasceu como um estudo aprofundado de arquitetura para e-commerce de streetwear. Em vez de tratar o catálogo apenas como uma vitrine estática, o projeto estrutura rotas completas de loja, coleções (drops), página de produto, sacola persistente e favoritos armazenados localmente no navegador sem exigir cadastro prévio.",
    narrativeParagraph2:
      "No código, a aplicação combina React 19, TypeScript e TanStack Start com Tailwind CSS 4, validação em Zod, elementos interativos em Three.js e animações coordenadas com Framer Motion, além de testes automatizados com Vitest e estrutura de integração com o SDK do Mercado Pago.",
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
      checkedAt: "22 de outubro de 2026",
      httpStatus: "HTTP 404 (DEPLOYMENT_NOT_FOUND)",
      explanation:
        "A URL histórica verso-sable.vercel.app foi reavaliada e permanece desativada na Vercel (HTTP 404). O link principal acima aponta diretamente para o deploy ativo e verificado (HTTP 200 OK) do mesmo repositório em verso-five-psi.vercel.app.",
    },
    repoUrl: "https://github.com/aleffelix15/verso",
    repoLabel: "github.com/aleffelix15/verso",
    imageBase: "/screens/verso",
    imageAlt: "Captura real da página inicial do projeto Verso exibindo a manchete Fé que veste e fotografia sobre parede de concreto.",
    imageCaption: "FIG. 01 — Captura real da aplicação Verso em execução (1200×750 px).",
    imageType: "Captura real da aplicação",
    verifiedFeatures: [
      "Páginas completas de loja, produto, drops, sobre, contato, privacidade, termos e trocas.",
      "Sacola com cálculo de frete executado no servidor em centavos inteiros via server function.",
      "Sistema de favoritos persistido em localStorage no navegador, sem fricção de login.",
      "Estrutura de checkout e rota de webhook com SDK do Mercado Pago e validação de esquemas com Zod.",
      "Componentes 3D interativos com Three.js (@react-three/fiber) e suíte de testes unitários com Vitest.",
    ],
    honestLimitations: [
      "Projeto demonstrativo: os itens do catálogo utilizam dados de exemplo.",
      "O fluxo de checkout não processa compras comerciais reais nem liquidação financeira em produção.",
    ],
  },
  {
    id: "decode",
    number: "02",
    chapterTag: "CRÔNICA DE CONSTRUÇÃO // 02 DE 02",
    name: "DECODE",
    subtitle: "Experiência interativa de conscientização sobre violência contra a mulher (Agosto Lilás)",
    status: "Publicado",
    year: "2026",
    lead:
      "A tecnologia usada como veículo de escuta e percepção: uma narrativa interativa em capítulos que ajuda a identificar sinais sutis de violência doméstica e psicológica.",
    narrativeParagraph1:
      "Associado à campanha Agosto Lilás, o DECODE afasta-se do formato tradicional de folheto informativo para propor uma jornada ativa no navegador. O visitante percorre cenários cotidianos, analisa diálogos e toma decisões que revelam como comportamentos abusivos frequentemente se disfarçam de zelo ou cuidado.",
    narrativeParagraph2:
      "Construída com React 18, JavaScript, Vite 5, Tailwind CSS 3 e ícones Lucide React, a aplicação funciona integralmente no cliente (SPA), articulando capítulos ramificados, dinâmica de triagem de sinais de risco, cartas de insights e informações diretas sobre canais de ajuda.",
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
    imageBase: "/screens/decode",
    imageAlt: "Captura real da tela de abertura do projeto DECODE associado à campanha Agosto Lilás.",
    imageCaption: "FIG. 02 — Captura real da aplicação DECODE publicada em decode-ochre.vercel.app.",
    imageType: "Captura real da aplicação",
    verifiedFeatures: [
      "Narrativa interativa estruturada em capítulos com tomada de decisão pelo usuário.",
      "Jogos de triagem para identificação prática de padrões e comportamentos de risco.",
      "Cartas de insights educativos e telas dedicadas a orientação e canais de suporte.",
      "Execução 100% client-side rápida e autônoma no navegador, sem dependência de servidor externo.",
    ],
    honestLimitations: [
      "Aplicação estritamente client-side (SPA): não possui banco de dados, autenticação ou persistência em servidor.",
    ],
  },
];

export const aboutData = {
  chapterNumber: "Capítulo 02",
  chapterTitle: "Sobre mim",
  headline: "Arquitetura limpa, interfaces que respiram e compromisso com o que é real.",
  paragraph1:
    "Sou estudante de Engenharia de Software e desenvolvedor web. Meu trabalho é centrado na criação de interfaces eficientes, acessíveis e focadas na experiência do usuário.",
  paragraph2:
    "Desenvolvo aplicações utilizando tecnologias web modernas, valorizando arquitetura organizada, código legível e documentação honesta.",
  interviewBlocks: [
    {
      question: "01 // Por que a estética de estúdio e publicação editorial?",
      answer:
        "Porque um bom software nasce do mesmo princípio de uma boa conversa em estúdio: escuta atenta, ausência de distrações e clareza na mensagem. Quando removemos efeitos gratuitos, sobra o que importa — tipografia legível, engenharia sólida e respeito pelo tempo do usuário.",
    },
    {
      question: "02 // Como você equilibra forma visual e engenharia de software?",
      answer:
        "Não separo a camada visual da estrutura do código. Componentes bem delimitados, tipagem previsível e estados claros tornam a interface mais rápida de manter, testar e evoluir sem regressões.",
    },
    {
      question: "03 // Qual é o papel da transparência técnica nos seus projetos?",
      answer:
        "Documentar exatamente o que está implementado e quais são os limites atuais de cada projeto demonstra maturidade de engenharia. Prefiro apresentar código auditável e funcional a prometer recursos fictícios.",
    },
  ],
  processSteps: [
    {
      number: "01",
      title: "Entender",
      description: "Leitura do problema, do contexto de uso e do objetivo real de quem vai utilizar a interface.",
    },
    {
      number: "02",
      title: "Planejar",
      description: "Definição da hierarquia de informação, arquitetura de componentes e ferramentas adequadas.",
    },
    {
      number: "03",
      title: "Desenvolver",
      description: "Implementação com código organizado, semântica HTML, responsividade e controle de estado.",
    },
    {
      number: "04",
      title: "Testar",
      description: "Validação de funcionamento, contraste, navegação por teclado e desempenho em diferentes telas.",
    },
    {
      number: "05",
      title: "Evoluir",
      description: "Refinamento contínuo e documentação honesta do escopo e das próximas etapas.",
    },
  ],
  studioDeskImage: {
    base: "/images/studio-desk",
    alt: "Fotografia conceitual em preto e branco de uma bancada de desenvolvimento sobre madeira escura e parede de concreto, com teclado mecânico, fones de estúdio e microfone articulado.",
    caption: "FIG. 03 — Ensaio conceitual ilustrativo: instrumentos de precisão, silêncio e foco.",
  },
  realSetupImage: {
    base: "/images/about-setup",
    alt: "Fotografia do ambiente de estudo e desenvolvimento com notebook sobre mesa de madeira.",
    caption: "FIG. 04 — Registro de ambiente de estudo e desenvolvimento.",
  },
};

export type TechIndexEntry = {
  index: string;
  name: string;
  category: string;
  projects: ("Verso" | "DECODE")[];
  evidence: string;
};

export const techIndexData: TechIndexEntry[] = [
  {
    index: "01",
    name: "React",
    category: "Arquitetura de Interface",
    projects: ["Verso", "DECODE"],
    evidence: "React 19 no Verso · React 18 no DECODE",
  },
  {
    index: "02",
    name: "TypeScript",
    category: "Tipagem Estática & Contratos",
    projects: ["Verso"],
    evidence: "TypeScript 5.8 no Verso (e neste portfólio)",
  },
  {
    index: "03",
    name: "JavaScript",
    category: "Linguagem Base & ES Modules",
    projects: ["Verso", "DECODE"],
    evidence: "Lógica de capítulos e estado no DECODE · Base web no Verso",
  },
  {
    index: "04",
    name: "Vite",
    category: "Build Tool & Bundler",
    projects: ["Verso", "DECODE"],
    evidence: "Vite 8 no Verso · Vite 5 no DECODE",
  },
  {
    index: "05",
    name: "Tailwind CSS",
    category: "Estilização Utilitária & Tokens",
    projects: ["Verso", "DECODE"],
    evidence: "Tailwind CSS 4 no Verso · Tailwind CSS 3 no DECODE",
  },
  {
    index: "06",
    name: "TanStack",
    category: "Roteamento, SSR & Server Functions",
    projects: ["Verso"],
    evidence: "TanStack Start, Router e React Query no Verso",
  },
  {
    index: "07",
    name: "Three.js",
    category: "Gráficos 3D & WebGL",
    projects: ["Verso"],
    evidence: "Three.js + @react-three/fiber e @react-three/drei no Verso",
  },
  {
    index: "08",
    name: "Framer Motion",
    category: "Transições & Coreografia de UI",
    projects: ["Verso"],
    evidence: "Framer Motion 14 nos fluxos e transições do Verso",
  },
  {
    index: "09",
    name: "Zod",
    category: "Validação de Esquemas & Dados",
    projects: ["Verso"],
    evidence: "Zod 3.25 na validação de entradas e payloads do Verso",
  },
  {
    index: "10",
    name: "Vitest",
    category: "Testes Automatizados",
    projects: ["Verso"],
    evidence: "Vitest 4 + Testing Library na suíte do Verso",
  },
  {
    index: "11",
    name: "Git",
    category: "Controle de Versão",
    projects: ["Verso", "DECODE"],
    evidence: "Histórico de commits e versionamento em ambos os projetos",
  },
  {
    index: "12",
    name: "GitHub",
    category: "Hospedagem de Código & Repositórios",
    projects: ["Verso", "DECODE"],
    evidence: "Repositórios públicos aleffelix15/verso e aleffelix15/decode",
  },
  {
    index: "13",
    name: "Vercel",
    category: "Infraestrutura & Deploy Web",
    projects: ["Verso", "DECODE"],
    evidence: "Ambientes publicados na Vercel para Verso e DECODE",
  },
];

export const foundationalTechs = [
  {
    name: "HTML5 Semântico & CSS Moderno",
    note: "Base estrutural, acessibilidade, grades assimétricas e animações nativas presente em todos os projetos.",
  },
  {
    name: "Python",
    note: "Linguagem em estudo complementar na graduação em Engenharia de Software.",
  },
];

export const contactData = {
  chapterNumber: "Capítulo 04",
  chapterTitle: "Contato",
  headline: "Toda boa arquitetura começa com uma conversa clara.",
  subheadline:
    "Conhecer meu trabalho em detalhe, trocar ideias sobre engenharia front-end ou conversar sobre oportunidades profissionais — os canais oficiais abaixo estão abertos.",
};

export const footerData = {
  author: "Álef Felix Teixeira",
  role: "Estudante de Engenharia de Software · Desenvolvedor Web",
  colophon:
    "Edição autoral desenvolvida com React 18, TypeScript, Vite 5 e CSS arquitetônico puro. Tipografia em Bricolage Grotesque, Instrument Serif e DM Mono.",
  copyright: `© ${new Date().getFullYear()} Álef Felix Teixeira.`,
};
