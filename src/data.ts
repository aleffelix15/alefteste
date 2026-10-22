export const links = {
  siteUrl: "", // configure a URL final de produção quando definida (ex.: "https://seu-dominio.com")
  github: "https://github.com/aleffelix15",
  linkedin: "https://www.linkedin.com/in/alef-felix-teixeira-a5030b236/",
  email: "", // preencha para exibir o botão de e-mail na seção de contato
  disponivel: true, // exibe o status "Disponível"
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
    kind: "E-commerce de Streetwear",
    summary:
      "Loja de moda streetwear com identidade visual própria, catálogo dinâmico, favoritos salvos no navegador, sacola e cálculo de frete.",
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
    kind: "Experiência Interativa (Agosto Lilás)",
    summary:
      "Aplicação web interativa para conscientização sobre violência contra a mulher, com narrativa ramificada em capítulos, jogos de triagem e dados de apoio.",
    stack: [
      "React 18",
      "JavaScript",
      "Vite 5",
      "Tailwind CSS 3",
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
    description: "Mapeamento aprofundado do problema, objetivos e necessidades do usuário final.",
  },
  {
    number: "02",
    title: "Planejar",
    description: "Estruturação da arquitetura de informação, fluxos de navegação e escolhas tecnológicas.",
  },
  {
    number: "03",
    title: "Desenvolver",
    description: "Codificação modular, tipagem estrita, boas práticas de componentização e acessibilidade.",
  },
  {
    number: "04",
    title: "Testar",
    description: "Verificação de consistência visual, performance e responsividade em múltiplos dispositivos.",
  },
  {
    number: "05",
    title: "Evoluir",
    description: "Refatoração contínua, documentação técnica transparente e melhorias de usabilidade.",
  },
];

export const heroData = {
  statusText: "Disponível para novos projetos",
  role: "Estudante de Engenharia de Software",
  firstName: "Álef Felix",
  lastName: "Teixeira",
  bio: "Desenvolvo aplicações web modernas com foco em performance, interfaces fluidas e arquitetura de código limpa.",
  areas: [
    { title: "Front-end Moderno", desc: "React, TypeScript, Next.js / TanStack, componentes reutilizáveis." },
    { title: "Design Systems & UI", desc: "Interfaces acessíveis, microinterações e fidelidade estética." },
    { title: "Código & Boas Práticas", desc: "Arquitetura limpa, tipagem consistente e documentação honesta." },
  ],
  ctaProjects: "Ver projetos",
  ctaContact: "Entrar em contato",
};

export const aboutData = {
  label: "02 / Sobre",
  title: "Construindo experiências digitais com foco em engenharia e usabilidade",
  paragraph1:
    "Sou estudante de Engenharia de Software e desenvolvedor web. Meu trabalho é centrado na criação de interfaces eficientes, acessíveis e focadas na experiência real do usuário.",
  paragraph2:
    "Desenvolvo aplicações front-end utilizando ecossistemas modernos em React e TypeScript, prezando por arquitetura limpa, código legível, boas práticas de performance e documentação transparente.",
  cta: "Conhecer meu processo",
  image: "/images/about-setup.webp",
  imageCaption: "Ambiente de desenvolvimento e estudo.",
};

export const contactData = {
  label: "05 / Contato",
  title: "Vamos construir algo juntos?",
  text: "Se você tem uma oportunidade, projeto ou gostaria de trocar ideias sobre desenvolvimento e engenharia de software, fique à vontade para entrar em contato.",
};

export const footerData = {
  author: "Álef Felix Teixeira",
  copyright: `© ${new Date().getFullYear()} Álef Felix Teixeira. Todos os direitos reservados.`,
};
