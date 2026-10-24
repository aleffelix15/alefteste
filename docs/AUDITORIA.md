# Auditoria Técnica e Verificação de Fatos — Portfólio de Álef Felix Teixeira

Data de atualização: 24 de outubro de 2026  
Escopo: Verificação de código-fonte, manifestos (`package.json`), rotas, scripts Python, schemas SQL e status dos serviços publicados nos 7 repositórios públicos de `@aleffelix15`.

---

## 1. Identidade e Perfis Públicos
- **Nome confirmado**: Álef Felix Teixeira
- **Atuação confirmada**: Estudante de Engenharia de Software e desenvolvedor de aplicações web e soluções digitais.
- **GitHub**: https://github.com/aleffelix15
- **LinkedIn**: https://www.linkedin.com/in/alef-felix-teixeira-a5030b236/

---

## 2. Auditoria dos Projetos em Destaque

### Projeto 01: VERSO (`https://github.com/aleffelix15/verso`)
- **Status declarado**: Demo auditada.
- **URL de Deploy Ativa**: https://verso-five-psi.vercel.app/ (`HTTP 200 OK`)
- **Observação sobre URL histórica**: `https://verso-sable.vercel.app/` retorna `HTTP 404 (DEPLOYMENT_NOT_FOUND)`. Documentado no dossiê do projeto na interface.
- **Stack comprovada em `package.json` e `docs/migrations/`**:
  - React 19 (`^19.2.0`), TypeScript (`^5.8.3`), TanStack Start (`1.168.60`), TanStack Router (`1.170.41`), TanStack Query (`^5.101.1`)
  - Tailwind CSS 4 (`^4.2.1`), Framer Motion (`^14.0.0`), Three.js (`^0.186.1` + `@react-three/fiber` e `@react-three/drei`)
  - Zod (`^3.25.76`), Vitest (`^4.1.10`), ESLint (`^9.32.0`), Prettier (`^3.7.3`)
  - Persistência via Supabase REST (`src/server/orders.ts`) e migration PostgreSQL/PLpgSQL (`docs/migrations/001_create_orders_table.sql`).
- **Limitações reais registradas**:
  - Projeto demonstrativo: produtos utilizam dados de exemplo e o checkout não realiza cobranças comerciais reais em produção.

### Projeto 02: DECODE (`https://github.com/aleffelix15/decode`)
- **Status declarado**: Publicado.
- **URL de Deploy Ativa**: https://decode-ochre.vercel.app/ (`HTTP 200 OK`)
- **Stack comprovada em `decode-project/package.json`**:
  - React 18 (`^18.2.0`), JavaScript (ES Modules), Vite 5 (`^5.2.0`), Tailwind CSS 3 (`^3.4.3`), Lucide React (`^0.383.0`).
- **Limitações reais registradas**:
  - Execução 100% client-side (SPA): o progresso é mantido na sessão local do navegador, sem banco de dados externo.

### Projeto 03: NUDEMO (`https://github.com/aleffelix15/nudem`)
- **Status declarado**: Publicado.
- **URL de Deploy Ativa**: https://nudem.vercel.app/ (`HTTP 200 OK`)
- **Stack comprovada em `package.json` e `scripts/guard-hero-swap.mjs`**:
  - React 18 (`^18.3.1`), Three.js (`^0.160.1`), `@react-three/fiber` (`^8.17.10`), Framer Motion (`^11.15.0`).
  - Vite 5 (`^5.4.11`), `@vitejs/plugin-react` (`^4.3.4`), `@fontsource-variable/figtree` (`^5.1.0`).
  - CSS puro com tokens semânticos, clamp e design system escuro (`#070709`, `#121216`, `#820AD1`).
  - Deploy em produção na Vercel Edge Network (`vercel.json` com cache estático imutável de 1 ano para `/assets/(.*)`).
- **Limitações reais registradas**:
  - Aplicação puramente front-end demonstrativa: sem backend, sem banco de dados e sem conexão a adquirentes ou APIs do Nubank.
  - Dados financeiros (saldo, extrato, fatura) são estáticos/fictícios para demonstração de interface.
  - Sem suíte de testes automatizados nos manifests (apenas script de guard pré-build).

---

## 3. Auditoria dos Demais Repositórios Públicos (Origem da Seção de Tecnologias)

1. **`biomed` / BioStudy** (`https://github.com/aleffelix15/biomed`):
   - **Manifestos e código**: React `^18.2.0`, Vite `^5.2.0`, Supabase (`@supabase/supabase-js ^2.116.0`, Deno Edge Function em TypeScript `supabase/functions/ai-explain/index.ts`, migrations e políticas RLS em PostgreSQL/PLpgSQL), Python (`42,5 KB` de scripts de automação e curadoria em `scratch/*.py`), Three.js (`scratch/3d-test/package.json`).
2. **`loja-de-roupa` & `conektacell`** (`https://github.com/aleffelix15/loja-de-roupa` / `conektacell`):
   - **Manifestos (`package.json`)**: Next.js `16.2.0`, React `19.2.4`, TypeScript `5.7.3`, Tailwind CSS `^4.2.0`, Radix UI (28 pacotes), Zod `^3.24.1`, Lucide React, `@vercel/analytics`.
3. **`alef.dev`** (`https://github.com/aleffelix15/alef.dev`):
   - **Manifesto (`package.json`)**: React `^18.2.0`, TypeScript `^5.2.2`, Vite `^5.0.0`, Tailwind CSS `^3.3.5`, Framer Motion `^11.18.2`, ESLint `^8.53.0`, integração com Google Gemini API.

---

## 4. Transparência sobre Tecnologias Não Comprovadas vs. Ambiente Local

- **Omitidas da grade comprovada por ausência de evidência nos repositórios**:
  - `AWS`: Não encontrada em nenhum manifesto ou código de infraestrutura.
  - `MySQL`: Não utilizado nos projetos auditados (projetos com persistência utilizam **PostgreSQL** e **Supabase**).
  - `Jest`: Não utilizado nos projetos auditados (projetos com testes utilizam **Vitest**).
- **Diferenciadas como ferramentas de ambiente local/estudo**:
  - `VS Code`, `Postman`, `Figma` e `Linux` (`Mint` / `Zorin`).
