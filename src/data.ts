export const links = {
  github: "https://github.com/aleffelix15",
  linkedin: "https://www.linkedin.com/in/alef-felix-teixeira-a5030b236/",
  email: "", // preencha para exibir o cartão de e-mail na seção de contato
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
  image?: string;
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
    live: "https://verso-sable.vercel.app/",
    repo: "https://github.com/aleffelix15/verso",
    image: "", // Site indisponível (HTTP 404 em 21/10/2026); mantido espaço neutro identificado
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
      "Pedidos reais, webhook e estoque não foram validados em produção; a auditoria do próprio repositório os lista como pendentes.",
    ],
  },
  {
    number: "02",
    name: "DECODE",
    status: "Publicado",
    kind: "Experiência interativa de conscientização (Agosto Lilás)",
    summary:
      "Projeto interativo sobre violência contra a mulher, com narrativa em capítulos, jogos e telas de ajuda.",
    stack: ["React 18", "JavaScript", "Vite 5", "Tailwind CSS 3", "Lucide React"],
    live: "https://decode-ochre.vercel.app/",
    repo: "https://github.com/aleffelix15/decode",
    image: "/screens/decode.webp",
    proposal:
      "Experiência interativa para reflexão sobre relacionamentos abusivos, sinais de alerta e canais de ajuda.",
    does: [
      "Narrativa interativa dividida em capítulos, com escolhas do usuário.",
      "Jogos de triagem e de reconhecimento de padrões de comportamento abusivo.",
      "Cartas de insights desbloqueadas ao longo da história.",
      "Telas de dados e de canais de ajuda.",
    ],
    limits: [
      "Não tem backend nem integrações externas: roda inteiramente no navegador.",
    ],
  },
];

export const techGroups = {
  projects: [
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
    description: "Analiso as necessidades e o objetivo do projeto.",
  },
  {
    number: "02",
    title: "Planejar",
    description: "Defino a melhor solução, estrutura e tecnologias.",
  },
  {
    number: "03",
    title: "Desenvolver",
    description: "Transformo o planejamento em código com qualidade.",
  },
  {
    number: "04",
    title: "Testar",
    description: "Verifico o funcionamento, performance e ajustes.",
  },
  {
    number: "05",
    title: "Evoluir",
    description: "Melhorias contínuas sempre que possível.",
  },
];

export const heroData = {
  label: "00 / ESTUDANTE DE ENGENHARIA DE SOFTWARE",
  firstName: "ÁLEF FELIX",
  lastName: "TEIXEIRA",
  description:
    "Estudante de Engenharia de Software. Desenvolvo aplicações web com foco em interface, performance e código organizado.",
  areas: ["Web", "Aplicações", "Interfaces"],
  ctaProjects: "Ver projetos ↓",
  ctaContact: "Entrar em contato",
};

export const aboutData = {
  label: "02 / SOBRE",
  title: "Quem eu sou",
  paragraph1:
    "Sou estudante de Engenharia de Software e desenvolvedor web. Meu trabalho é centrado na criação de interfaces eficientes, acessíveis e focadas na experiência do usuário.",
  paragraph2:
    "Desenvolvo aplicações front-end utilizando ecossistemas modernos em React e TypeScript, prezando por arquitetura limpa, código legível e documentação honesta.",
  cta: "Ver processo ↓",
};

export const footerData = {
  author: "Álef Felix Teixeira",
  tagline: "Desenvolvimento • Ideias • Soluções",
};
