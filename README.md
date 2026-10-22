# Portfólio — Álef Felix Teixeira

Portfólio pessoal e técnico de **Álef Felix Teixeira**, estudante de Engenharia de Software e desenvolvedor web.

Construído sob uma rigorosa política de **verdade em dados**, **fidelidade técnica** e **estética Editorial Claro (Light Editorial)** inspirada em tipografia de imprensa e design editorial suíço, sem bibliotecas de animação ou estilização externas.

---

## 🎨 Filosofia Visual & Design System

- **Estética Editorial Claro**: Paleta de alto contraste baseada em papel e tinta (`#f1f1ee` fundo, `#111111` texto e traços estruturais, `#55555b` secundário, `#d63a0a` acento editorial quente).
- **Tipografia**: `Bricolage Grotesque` para títulos e corpo; `DM Mono` para rótulos, índices numéricos e chips técnicos.
- **Pure CSS**: Sem Tailwind, sem CSS-in-JS, sem bibliotecas pesadas de animação. 100% tokens nativos em variáveis CSS.
- **Zero AI Slop**: Sem gradientes neon roxos/azuis genéricos, sem métricas falsas ("+50 projetos", "100% satisfação"), sem janelas simuladas com bolinhas de macOS e sem links mortos (`href="#"`).

---

## 🛠️ Stack Tecnológica

- **Framework**: React 18
- **Linguagem**: TypeScript
- **Bundler & Build Tool**: Vite 5
- **Ícones**: Simple Icons SVG inline + Lucide React
- **Estilização**: CSS Puro com Design Tokens

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
git clone https://github.com/aleffelix15/portfolio-alef-felix.git
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

O projeto está totalmente configurado para a Vercel com SPA rewrites em `vercel.json`:

### Opção 1: Via Vercel CLI
```bash
npx vercel
# Para produção:
npx vercel --prod
```

### Opção 2: Conexão Git Automática
1. Crie o repositório no seu GitHub: `aleffelix15/portfolio-alef-felix`.
2. Conecte o repositório na dashboard da Vercel.
3. Configurações de build padrão do Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploys serão acionados automaticamente a cada `git push main`.

---

## 📄 Licença e Direitos

Projeto pessoal e autoral desenvolvido por **Álef Felix Teixeira**.
Documentação de conformidade e auditoria de código disponível em [`AUDITORIA.md`](./AUDITORIA.md).
