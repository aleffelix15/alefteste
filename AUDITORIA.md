# Auditoria Técnica e Verificação de Fatos — Portfólio de Álef Felix Teixeira

Data: 21 de outubro de 2026  
Escopo: Verificação de código-fonte, dependências, rotas e status dos serviços publicados.

---

## 1. Identidade e Perfis Públicos
- **Nome confirmado**: Álef Felix Teixeira
- **Atuação confirmada**: Estudante de Engenharia de Software, desenvolvedor web.
- **GitHub**: https://github.com/aleffelix15 (confirmado via API pública do GitHub).
- **LinkedIn**: https://www.linkedin.com/in/alef-felix-teixeira-a5030b236/ (confirmado).
- **E-mail / WhatsApp**: Não informados publicamente no código; campo reservado em `src/data.ts` (somente exibido se preenchido).

---

## 2. Auditoria dos Projetos

### Projeto 1: VERSO
- **Status declarado**: Demo (demonstração).
- **Repositório**: https://github.com/aleffelix15/verso (acesso confirmado).
- **URL de Deploy**: https://verso-five-psi.vercel.app/
- **Resultado do Teste de Acesso (21/10/2026)**:
  - **Status HTTP**: `200 OK` (no ar e operacional).
  - **Título da Página**: `"Fé que veste. — VERSO"`
  - **Captura real realizada**: Captura de tela real obtida em 1440x900 e otimizada em `public/screens/verso.webp` (proporção 16:10, 1200x750px). Interface com catálogo, banner promocional, tipografia editorial de streetwear e hero section completa.
- **Stack comprovada em `package.json`**:
  - React 19 (`react: ^19.2.0`, `react-dom: ^19.2.0`)
  - TypeScript (`typescript: ^5.8.3`)
  - TanStack Start & Router (`@tanstack/react-start: 1.168.60`, `@tanstack/react-router: 1.170.41`)
  - Tailwind CSS 4 (`tailwindcss: ^4.2.1`, `@tailwindcss/vite: ^4.2.1`)
  - Framer Motion (`framer-motion: ^14.0.0`)
  - Three.js & Fiber (`three: ^0.186.1`, `@react-three/fiber: ^9.8.1`, `@react-three/drei: ^10.7.9`)
  - Zod (`zod: ^3.25.76`)
  - Vitest (`vitest: ^4.1.10`)
  - Mercado Pago (`mercadopago: ^3.6.1`)
  - Deploy configurado para Vercel / Nitro.
- **Funcionalidades comprovadas no código**:
  - Páginas de loja, produto, drops, sobre, contato, privacidade, termos e trocas.
  - Sacola com frete calculado no servidor em centavos inteiros via server function.
  - Favoritos salvos em `localStorage` no navegador, sem necessidade de conta de usuário.
  - Rota de webhook e código de checkout estruturados com SDK do Mercado Pago.
  - Componentes 3D interativos e testes unitários com Vitest.
- **Limitações reais registradas**:
  - Produtos utilizam dados de exemplo.
  - Pedidos reais, liquidação no webhook e controle de estoque em produção não foram validados (conforme documentado na `AUDITORIA.md` do próprio repositório).

---

### Projeto 2: DECODE
- **Status declarado**: Publicado.
- **Repositório**: https://github.com/aleffelix15/decode (branch padrão `master`, aplicação localizada no subdiretório `decode-project`).
- **URL de Deploy**: https://decode-ochre.vercel.app/
- **Resultado do Teste de Acesso (21/10/2026)**:
  - **Status HTTP**: `200 OK` (no ar e funcional).
  - **Captura real realizada**: Captura de tela real obtida em 1440x900 e otimizada em `public/screens/decode.webp` (proporção 16:10, 1200x750px).
- **Stack comprovada em `decode-project/package.json`**:
  - React 18 (`react: ^18.2.0`, `react-dom: ^18.2.0`)
  - JavaScript (ES Modules, sem TypeScript)
  - Vite 5 (`vite: ^5.2.0`, `@vitejs/plugin-react: ^4.2.1`)
  - Tailwind CSS 3 (`tailwindcss: ^3.4.3`, `autoprefixer: ^10.4.19`)
  - Lucide React (`lucide-react: ^0.383.0`)
- **Proposta e funcionalidades comprovadas**:
  - Experiência interativa de conscientização sobre violência contra a mulher (campanha Agosto Lilás).
  - Narrativa em capítulos com tomada de decisão.
  - Jogos de triagem e identificação de comportamentos de risco.
  - Cartas de insights e telas educativas de suporte.
- **Limitações reais registradas**:
  - Execução integral client-side (SPA no navegador), sem backend próprio ou chamadas de rede externas.

---

## 3. Tecnologias Confirmadas
- **Grupo 1 — Nos meus projetos** (confirmadas nos repositórios auditados):
  - React, TypeScript, JavaScript, Vite, Tailwind CSS, TanStack, Three.js, Framer Motion, Zod, Vitest, Git, GitHub, Vercel.
- **Grupo 2 — Também estudo e uso** (declaradas por Álef):
  - HTML, CSS, Java, Python.
  - *Nota*: A proficiência e uso de Python requerem confirmação prática adicional por meio de repositórios futuros.

---

## 4. Repositórios Excluídos da Apresentação
Conforme regras estritas do projeto:
- Projetos em Java / acadêmicos não relacionados ao foco web.
- `Hub Harmony` (excluído).
- `BSTD` (excluído por ausência de repositório público auditável).
