# Portfólio — Álef Felix Teixeira (Edição Documental & Dossiê Editorial)

Portfólio autoral de **Álef Felix Teixeira**, estudante de Engenharia de Software e desenvolvedor de aplicações web e soluções digitais.

Concebido sob direção de arte **Editorial Técnica & Cinematográfica** em **tema único escuro**, combinando uma paleta sólida em preto e azul elétrico (`#070A10`, `#0D1420`, `#1677FF`, `#49B4FF`), tipografia editorial de alto contraste (*Playfair Display*, *Bricolage Grotesque* e *DM Mono*), fotografia documental e iconografia técnica fiel aos repositórios públicos do GitHub (`@aleffelix15`).

---

## 1. Estrutura Editorial & Capítulos

1. **`01 | PORTFÓLIO 2026` — Abertura**:
   - Cenário de estúdio em preto e branco com iluminação chiaroscuro, paralaxe suave, revelação tipográfica em máscara (`Playfair Display`), epígrafe flutuante e indicador animado de leitura.
   - Faixa editorial contínua com pausa acessível (conformidade WCAG 2.2.2).
2. **`02 | PROJETOS` — "Ideias que viram experiências."**:
   - Apresentação de **01. VERSO** (`verso-five-psi.vercel.app`), **02. DECODE** (`decode-ochre.vercel.app`) e **03. NUDEMO** (`nudem.vercel.app`) com capturas reais das aplicações (`.avif`/`.webp`), alternador interativo de telas, tilt 3D sutil e dossiê expansível com arquitetura e limitações registradas.
3. **`03 | SOBRE MIM` — "Engenharia, clareza e atenção aos detalhes."**:
   - Composição fotográfica dupla combinando fotografia de bancada de estúdio e retrato real em P&B de Álef Felix Teixeira (`alef-portrait-bw`), narrativa documental e método de trabalho em 5 etapas (*Entender, Planejar, Desenvolver, Testar, Documentar & Evoluir*).
4. **`04 | TECNOLOGIAS` — "Ferramentas que eu utilizo"**:
   - **24 tecnologias auditadas** diretamente nos manifestos (`package.json`, scripts Python e schemas SQL) dos **7 repositórios públicos** (`verso`, `decode`, `nudem`, `biomed`, `loja-de-roupa`, `conektacell` e `alef.dev`), organizadas em 3 categorias:
     - `01 · Frontend & Interfaces` (11 itens)
     - `02 · Backend, Dados & APIs` (3 itens)
     - `03 · Engenharia, Qualidade & Infraestrutura` (10 itens)
   - Emblemas vetoriais SVG nas cores oficiais de cada marca sobre superfície grafite (`#111722`) e base escura (`#080A0F`), com filtros funcionais por categoria e por repositório auditado, badges de origem e dossiê de transparência.
5. **`05 | CONTATO` — "Vamos conversar?"**:
   - Cartões arquitetônicos interativos para GitHub (`github.com/aleffelix15`) e LinkedIn (`Álef Felix Teixeira`).

---

## 2. Coreografia de Movimento & Acessibilidade

- **Sem bibliotecas externas de animação no bundle**: construída 100% com CSS moderno, `IntersectionObserver`, `requestAnimationFrame` e Web Animations API (`src/motion.ts`).
- **Microinterações**:
  - Revelação tipográfica em cortina (`.line-mask > .line-inner`)
  - Cortina de revelação fotográfica de câmara escura (`.photo-curtain-wrap`)
  - Cursor editorial contextual (`[data-editorial-cursor]`)
  - Botões magnéticos (`[data-magnetic]`) e rolagem dupla de texto no hover (`RollText`)
  - Decodificação monoespaçada nos marcadores de capítulo (`[data-scramble]`)
  - Flutuação suave, halo luminoso por marca e elevação 3D nos símbolos de tecnologias
- **Acessibilidade**: respeito estrito a `prefers-reduced-motion: reduce`, navegação integral por teclado (`:focus-visible`), `skip-link` e textos alternativos descritivos.

---

## 3. Como Executar Localmente

Pré-requisitos: **Node.js 18+** e **npm**.

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Gerar build de produção (TypeScript + Vite)
npm run build

# 4. Visualizar build de produção localmente
npm run preview
```
