export const links = {
  github: "https://github.com/aleffelix15",
  linkedin: "https://www.linkedin.com/in/alef-felix-teixeira-a5030b236/",
  email: "", // preencha para exibir o cartão de e-mail na seção de contato
  disponivel: true, // exibe a etiqueta "Disponível para projetos" no header
};

export type Project = {
  number: string;
  name: string;
  status: "Publicado" | "Demo";
  kind: string;
  summary: string;
  stack: string[];
  live: string;
  repo: string;
  image: string;
  proposal: string;
  does: string[];
  limits: string[];
};

export const projects: Project[] = [
  {
    number: "01",
    name: "VERSO",
    status: "Demo",
    kind: "E-commerce de streetwear (demonstração)",
    summary:
      "Loja de moda streetwear com identidade própria, catálogo, favoritos, sacola e cálculo de frete.",
    stack: [
      "React",
      "TypeScript",
      "TanStack Start",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "Zod",
      "Vitest",
      "Vercel",
    ],
    live: "https://verso-five-psi.vercel.app/",
    repo: "https://github.com/aleffelix15/verso",
    image: "/screens/verso.webp",
    proposal:
      "Loja de moda streetwear com catálogo completo, experiência de compra dinâmica e elementos visuais 3D.",
    does: [
      "Páginas de loja, produto, drops, sobre, contato, privacidade, termos e trocas.",
      "Favoritos salvos no navegador (localStorage, sem conta de usuário).",
      "Sacola com frete calculado no servidor a partir do catálogo.",
      "Código de checkout com Mercado Pago e rota de webhook.",
      "Componentes 3D com Three.js e testes automatizados com Vitest.",
    ],
    limits: [
      "Os produtos são dados de exemplo.",
      "Pedidos reais, liquidação no webhook e controle de estoque em produção não foram validados (conforme documentado na auditoria do repositório).",
    ],
  },
  {
    number: "02",
    name: "DECODE",
    status: "Publicado",
    kind: "Experiência interativa (Agosto Lilás)",
    summary:
      "Projeto interativo sobre violência contra a mulher, com narrativa em capítulos, jogos e telas de ajuda.",
    stack: [
      "React",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "Lucide React",
    ],
    live: "https://decode-ochre.vercel.app/",
    repo: "https://github.com/aleffelix15/decode",
    image: "/screens/decode.webp",
    proposal:
      "Experiência web imersiva e interativa voltada à conscientização sobre sinais e padrões de violência contra a mulher.",
    does: [
      "Narrativa dividida em capítulos com tomada de decisões ramificadas.",
      "Módulo de triagem e reconhecimento de padrões de comportamento tóxico.",
      "Cartas de insights reflexivos e canais oficiais de apoio.",
      "Execução 100% no navegador (SPA), sem requisições a servidores externos.",
    ],
    limits: [
      "Não possui autenticação, banco de dados ou backend próprio.",
      "Todo o progresso é mantido estritamente em memória/sessão local do usuário.",
    ],
  },
];

export const techGroups = {
  proven: [
    "React",
    "TypeScript",
    "JavaScript",
    "Vite",
    "Tailwind CSS",
    "TanStack",
    "Three.js",
    "Framer Motion",
    "Zod",
    "Vitest",
    "Git",
    "GitHub",
    "Vercel",
  ],
  study: ["HTML", "CSS", "Java", "Python"],
};

export const processSteps = [
  {
    number: "01",
    title: "Entender",
    description: "Analiso o problema, o público e os requisitos essenciais.",
  },
  {
    number: "02",
    title: "Planejar",
    description: "Defino a arquitetura, o fluxo de navegação e as escolhas técnicas.",
  },
  {
    number: "03",
    title: "Desenvolver",
    description: "Codifico com rigor, tipagem sólida e padrões acessíveis.",
  },
  {
    number: "04",
    title: "Testar",
    description: "Valido em múltiplos dispositivos, performance e estabilidade.",
  },
  {
    number: "05",
    title: "Evoluir",
    description: "Refatoro e implemento melhorias contínuas no ciclo de vida.",
  },
];

export const heroData = {
  counter: "01 / 05",
  name: "ÁLEF FELIX TEIXEIRA",
  highlight: "Estudante de Engenharia de Software • Desenvolvedor web",
  bio: "Desenvolvo aplicações web e soluções digitais com foco em performance, boas práticas e experiências que fazem sentido.",
  codeSnippet: "const dev = {\n  estudante: true,\n  foco: ['web', 'performance',\n         'boas-praticas']\n}",
  areasTitle: "ÁREAS DE ATUAÇÃO",
  areas: ["Web", "Aplicações", "Interfaces"],
  ctaProjects: "Ver projetos →",
  ctaContact: "Entrar em contato →",
  handwrittenHero: "IDEIAS\nCÓDIGO /\nRESULTADOS",
};

export const aboutData = {
  tag: "02 / SOBRE",
  title: "SOBRE MIM",
  paragraph1:
    "Sou estudante de Engenharia de Software e desenvolvedor web. Meu trabalho é centrado na criação de interfaces eficientes, acessíveis e focadas na experiência do usuário.",
  paragraph2:
    "Desenvolvo aplicações front-end utilizando ecossistemas modernos em React e TypeScript, prezando por arquitetura limpa, código legível e documentação honesta.",
  handwritten: "DISCIPLINA\nFOCO\nEVOLUÇÃO",
  cta: "Ver processo →",
  image: "/images/about-setup.webp",
  imageCaption: "Ambiente de desenvolvimento e estudo.",
};

export const contactData = {
  tag: "04 / CONTATO",
  title: "VAMOS CONVERSAR?",
  text: "Se você tem um projeto em mente, uma oportunidade ou quer trocar ideias sobre desenvolvimento front-end, entre em contato.",
  handwritten: "Bora\nconstruir algo\nincrível!",
};

export const footerData = {
  author: "Álef Felix",
  copyright: `© ${new Date().getFullYear()} Álef Felix. Todos os direitos reservados.`,
};
