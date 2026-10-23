# Portfólio — Álef Felix Teixeira

Portfólio pessoal e técnico de **Álef Felix Teixeira**, estudante de Engenharia de Software e desenvolvedor web.

Construído sob uma rigorosa política de **verdade em dados**, **fidelidade técnica** e direção visual **Editorial Escuro** inspirada em tipografia de imprensa e sistemas editoriais de engenharia, sem bibliotecas de animação ou estilização externas.

---

## 🎨 Filosofia Visual & Design System (Editorial Escuro)

- **Paleta Editorial Escuro**: Fundo `#0a0a0b`, divisores estruturais de `1px` em `#26262b` / `#3a3a42`, texto forte `#f4f4f5`, corpo `#a8a8b0`, rótulos `#8a8a93`, sobrenome em `#686872` (contraste validado $\ge 3:1$ WCAG 2.2 AA), acento único `#ff6a3d` e status `#4ade80`.
- **Tipografia Local (Self-Hosted WOFF2)**: `Bricolage Grotesque` (pesos 400–800, `opsz`) para títulos e corpo; `DM Mono` (`12px`, maiúsculas, `letter-spacing: .08em`) para rótulos, índices numéricos e chips técnicos, hospedadas em `public/fonts/` com `preload` e `font-display: swap`.
- **Pure CSS & Movimento Nativo**: Sem Tailwind, sem CSS-in-JS e sem bibliotecas pesadas de animação. Tokens em variáveis CSS e interações via `IntersectionObserver`, `Web Animations API` e `requestAnimationFrame` (`src/motion.ts`), respeitando `prefers-reduced-motion: reduce`.
- **Zero AI Slop**: Sem gradientes neon roxos/azuis genéricos, sem métricas inventadas, sem janelas falsas de macOS e sem links mortos (`href="#"`).

---

## 🛠️ Stack Tecnológica

- **Framework**: React 18
- **Linguagem**: TypeScript
- **Bundler & Build Tool**: Vite 5
- **Ícones**: SVG técnicos inline + Lucide React
- **Estilização**: CSS Puro com Design Tokens (`src/styles.css`)

---

## 📂 Projetos em Destaque

### 1. VERSO
- **Status**: Demo (demonstração).
- **Repositório**: [github.com/aleffelix15/verso](https://github.com/aleffelix15/verso)
- **Deploy**: [verso-five-psi.vercel.app](https://verso-five-psi.vercel.app/) *(100% operacional no ar)*.
- **Stack Comprovada**: React 19, TypeScript, TanStack Start/Router, Tailwind CSS 4, Framer Motion, Three.js, Zod, Vitest.
- **Escopo**: Loja streetwear com catálogo dinâmico, visualização 3D, sacola de compras com cálculo de frete no servidor e integração planejada com Mercado Pago.

### 2. DECODE
- **Status**: Publicado (100% operacional).
- **Repositório**: [github.com/aleffelix15/decode](https://github.com/aleffelix15/decode) (`decode-project`)
- **Deploy**: [decode-ochre.vercel.app](https://decode-ochre.vercel.app/)
- **Stack Comprovada**: React 18, JavaScript (ESM), Vite 5, Tailwind CSS 3, Lucide React.
- **Escopo**: Aplicação interativa de conscientização sobre violência contra a mulher (campanha Agosto Lilás), com narrativa por tomada de decisão, triagem de relatos e dashboard de insights educativos.

---

## 🚀 Execução Local

### Pré-requisitos
- Node.js 18+ instalado
- npm ou pnpm

### Instalação
```bash
git clone https://github.com/aleffelix15/alefteste.git
cd portfolio-alef-felix
npm install
```

### Desenvolvimento
```bash
npm run dev
```
Acesse em: `http://localhost:5173/`

### Build de Produção
```bash
npm run build
npm run preview
```

---

## 🌐 Publicação na Vercel

O projeto está configurado para a Vercel com SPA rewrites em `vercel.json`:

1. Conecte o repositório na dashboard da Vercel.
2. Configurações de build padrão do Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Deploys serão acionados automaticamente a cada `git push main`.

---

## 📄 Conformidade e Auditoria

Projeto pessoal e autoral desenvolvido por **Álef Felix Teixeira**.
- Auditoria de código e fatos: [`AUDITORIA.md`](./AUDITORIA.md)
- Verificação de disponibilidade e links externos: [`VERIFICACAO.md`](./VERIFICACAO.md)
