import React from "react";

export function BanktefArchitectureDiagram() {
  return (
    <div className="banktef-diagram-wrap" aria-label="Diagrama da arquitetura full-stack do BANKTEF">
      <svg
        className="banktef-diagram-svg"
        viewBox="0 0 920 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="diagram-title diagram-desc"
      >
        <title id="diagram-title">Arquitetura Full-Stack BANKTEF</title>
        <desc id="diagram-desc">
          Diagrama com 3 camadas: Frontend React 19, Backend Java 21 Spring Boot 3 com Spring Security e JWT, e Banco de Dados PostgreSQL conteinerizado com Docker Compose.
        </desc>

        <defs>
          {/* Gradiente azul para os conectores */}
          <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1677FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#49B4FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#1677FF" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#121C2D" />
            <stop offset="100%" stopColor="#0D1420" />
          </linearGradient>

          <pattern id="diagGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(32, 43, 58, 0.4)" strokeWidth="0.8" />
          </pattern>
        </defs>

        {/* Fundo do Canvas */}
        <rect width="920" height="480" fill="#070A10" />
        <rect width="920" height="480" fill="url(#diagGrid)" opacity="0.65" />

        {/* Header do Diagrama */}
        <text x="32" y="38" fill="#49B4FF" fontFamily="DM Mono, monospace" fontSize="11" letterSpacing="0.14em">
          // BANKTEF · ARQUITETURA EM TRÊS CAMADAS &amp; DOCKER COMPOSE
        </text>
        <line x1="32" y1="48" x2="888" y2="48" stroke="#202B3A" strokeWidth="1" />

        {/* ===============================================================
            BLOCO 1: CLIENTE (FRONTEND SPA)
           =============================================================== */}
        <g transform="translate(32, 70)">
          <rect
            width="250"
            height="360"
            rx="8"
            fill="url(#cardGrad)"
            stroke="#202B3A"
            strokeWidth="1"
          />
          <rect width="250" height="34" rx="8" fill="#0D1420" stroke="#202B3A" strokeWidth="1" />
          <circle cx="18" cy="17" r="4" fill="#1677FF" />
          <circle cx="32" cy="17" r="4" fill="#49B4FF" />
          <text x="46" y="21" fill="#F4F7FB" fontFamily="DM Mono, monospace" fontSize="11" fontWeight="600">
            01. CLIENTE (SPA)
          </text>

          {/* Componentes internos Frontend */}
          <g transform="translate(16, 50)">
            <rect width="218" height="52" rx="6" fill="#070A10" stroke="#2C3B50" strokeWidth="1" />
            <text x="14" y="24" fill="#F4F7FB" fontFamily="Bricolage Grotesque, sans-serif" fontSize="13" fontWeight="600">
              React 19 &amp; Vite 8
            </text>
            <text x="14" y="40" fill="#8896AB" fontFamily="DM Mono, monospace" fontSize="10">
              Interface Reativa &amp; HMR
            </text>
          </g>

          <g transform="translate(16, 114)">
            <rect width="218" height="52" rx="6" fill="#070A10" stroke="#2C3B50" strokeWidth="1" />
            <text x="14" y="24" fill="#F4F7FB" fontFamily="Bricolage Grotesque, sans-serif" fontSize="13" fontWeight="600">
              TypeScript 6 &amp; Router 7
            </text>
            <text x="14" y="40" fill="#8896AB" fontFamily="DM Mono, monospace" fontSize="10">
              Rotas Protegidas &amp; Contratos
            </text>
          </g>

          <g transform="translate(16, 178)">
            <rect width="218" height="52" rx="6" fill="#070A10" stroke="#2C3B50" strokeWidth="1" />
            <text x="14" y="24" fill="#F4F7FB" fontFamily="Bricolage Grotesque, sans-serif" fontSize="13" fontWeight="600">
              Tailwind CSS 4
            </text>
            <text x="14" y="40" fill="#8896AB" fontFamily="DM Mono, monospace" fontSize="10">
              Design System &amp; A11y
            </text>
          </g>

          <g transform="translate(16, 242)">
            <rect width="218" height="52" rx="6" fill="#070A10" stroke="rgba(22, 119, 255, 0.4)" strokeWidth="1" />
            <text x="14" y="24" fill="#49B4FF" fontFamily="Bricolage Grotesque, sans-serif" fontSize="13" fontWeight="600">
              Axios HTTP Client
            </text>
            <text x="14" y="40" fill="#8896AB" fontFamily="DM Mono, monospace" fontSize="10">
              JWT Interceptor no Header
            </text>
          </g>

          <text x="16" y="325" fill="#49B4FF" fontFamily="DM Mono, monospace" fontSize="10">
            ENV: NODE:ALPINE / NGINX
          </text>
        </g>

        {/* Conexão 1 -> 2: REST & JWT */}
        <g className="flow-link-group">
          <line x1="282" y1="250" x2="335" y2="250" stroke="url(#blueGlow)" strokeWidth="2" strokeDasharray="4 4" />
          <polygon points="335,246 345,250 335,254" fill="#49B4FF" />
          <rect x="276" y="200" width="76" height="36" rx="4" fill="#070A10" stroke="#202B3A" strokeWidth="1" />
          <text x="282" y="215" fill="#49B4FF" fontFamily="DM Mono, monospace" fontSize="9">
            REST / HTTPS
          </text>
          <text x="282" y="228" fill="#F4F7FB" fontFamily="DM Mono, monospace" fontSize="9">
            Bearer JWT
          </text>
        </g>

        {/* ===============================================================
            BLOCO 2: BACKEND (SPRING BOOT 3 & JAVA 21)
           =============================================================== */}
        <g transform="translate(345, 70)">
          <rect
            width="280"
            height="360"
            rx="8"
            fill="url(#cardGrad)"
            stroke="#1677FF"
            strokeWidth="1.2"
            filter="drop-shadow(0 0 16px rgba(22, 119, 255, 0.15))"
          />
          <rect width="280" height="34" rx="8" fill="#0D1420" stroke="#1677FF" strokeWidth="1" />
          <circle cx="18" cy="17" r="4" fill="#49B4FF" />
          <text x="32" y="21" fill="#F4F7FB" fontFamily="DM Mono, monospace" fontSize="11" fontWeight="600">
            02. API REST (JAVA 21 LTS)
          </text>

          <g transform="translate(16, 46)">
            <rect width="248" height="48" rx="6" fill="#070A10" stroke="#2C3B50" strokeWidth="1" />
            <text x="14" y="22" fill="#F4F7FB" fontFamily="Bricolage Grotesque, sans-serif" fontSize="13" fontWeight="600">
              Spring Security 6
            </text>
            <text x="14" y="38" fill="#49B4FF" fontFamily="DM Mono, monospace" fontSize="10">
              Filtro Stateless &amp; io.jsonwebtoken
            </text>
          </g>

          <g transform="translate(16, 104)">
            <rect width="248" height="48" rx="6" fill="#070A10" stroke="#2C3B50" strokeWidth="1" />
            <text x="14" y="22" fill="#F4F7FB" fontFamily="Bricolage Grotesque, sans-serif" fontSize="13" fontWeight="600">
              Controllers &amp; Services
            </text>
            <text x="14" y="38" fill="#8896AB" fontFamily="DM Mono, monospace" fontSize="10">
              Contas, Clientes &amp; TEF Engine
            </text>
          </g>

          <g transform="translate(16, 162)">
            <rect width="248" height="48" rx="6" fill="#070A10" stroke="#2C3B50" strokeWidth="1" />
            <text x="14" y="22" fill="#F4F7FB" fontFamily="Bricolage Grotesque, sans-serif" fontSize="13" fontWeight="600">
              Spring Data JPA
            </text>
            <text x="14" y="38" fill="#8896AB" fontFamily="DM Mono, monospace" fontSize="10">
              Hibernate ORM &amp; Repositories
            </text>
          </g>

          <g transform="translate(16, 220)">
            <rect width="248" height="48" rx="6" fill="#070A10" stroke="#2C3B50" strokeWidth="1" />
            <text x="14" y="22" fill="#F4F7FB" fontFamily="Bricolage Grotesque, sans-serif" fontSize="13" fontWeight="600">
              OpenAPI 3 / Swagger
            </text>
            <text x="14" y="38" fill="#8896AB" fontFamily="DM Mono, monospace" fontSize="10">
              Documentação /swagger-ui.html
            </text>
          </g>

          <text x="16" y="325" fill="#49B4FF" fontFamily="DM Mono, monospace" fontSize="10">
            ENV: ECLIPSE-TEMURIN:21-JDK
          </text>
        </g>

        {/* Conexão 2 -> 3: JDBC / JPA */}
        <g className="flow-link-group">
          <line x1="625" y1="250" x2="675" y2="250" stroke="url(#blueGlow)" strokeWidth="2" strokeDasharray="4 4" />
          <polygon points="675,246 685,250 675,254" fill="#49B4FF" />
          <rect x="618" y="200" width="74" height="36" rx="4" fill="#070A10" stroke="#202B3A" strokeWidth="1" />
          <text x="626" y="215" fill="#49B4FF" fontFamily="DM Mono, monospace" fontSize="9">
            JDBC / POOL
          </text>
          <text x="626" y="228" fill="#F4F7FB" fontFamily="DM Mono, monospace" fontSize="9">
            HikariCP
          </text>
        </g>

        {/* ===============================================================
            BLOCO 3: DADOS & INFRAESTRUTURA DOCKER
           =============================================================== */}
        <g transform="translate(685, 70)">
          <rect
            width="205"
            height="360"
            rx="8"
            fill="url(#cardGrad)"
            stroke="#202B3A"
            strokeWidth="1"
          />
          <rect width="205" height="34" rx="8" fill="#0D1420" stroke="#202B3A" strokeWidth="1" />
          <circle cx="18" cy="17" r="4" fill="#1677FF" />
          <text x="32" y="21" fill="#F4F7FB" fontFamily="DM Mono, monospace" fontSize="11" fontWeight="600">
            03. DADOS &amp; INFRA
          </text>

          <g transform="translate(16, 50)">
            <rect width="173" height="68" rx="6" fill="#070A10" stroke="#2C3B50" strokeWidth="1" />
            <text x="14" y="26" fill="#F4F7FB" fontFamily="Bricolage Grotesque, sans-serif" fontSize="13" fontWeight="600">
              PostgreSQL 15
            </text>
            <text x="14" y="44" fill="#8896AB" fontFamily="DM Mono, monospace" fontSize="10">
              Porta :5432
            </text>
            <text x="14" y="58" fill="#49B4FF" fontFamily="DM Mono, monospace" fontSize="10">
              Transações ACID
            </text>
          </g>

          <g transform="translate(16, 134)">
            <rect width="173" height="68" rx="6" fill="#070A10" stroke="#2C3B50" strokeWidth="1" />
            <text x="14" y="26" fill="#F4F7FB" fontFamily="Bricolage Grotesque, sans-serif" fontSize="13" fontWeight="600">
              H2 Database
            </text>
            <text x="14" y="44" fill="#8896AB" fontFamily="DM Mono, monospace" fontSize="10">
              In-Memory DB
            </text>
            <text x="14" y="58" fill="#8896AB" fontFamily="DM Mono, monospace" fontSize="10">
              Testes com JUnit 5
            </text>
          </g>

          <g transform="translate(16, 218)">
            <rect width="173" height="68" rx="6" fill="#070A10" stroke="rgba(73, 180, 255, 0.4)" strokeWidth="1" />
            <text x="14" y="26" fill="#49B4FF" fontFamily="Bricolage Grotesque, sans-serif" fontSize="13" fontWeight="600">
              Docker Compose
            </text>
            <text x="14" y="44" fill="#8896AB" fontFamily="DM Mono, monospace" fontSize="10">
              Rede Isolada
            </text>
            <text x="14" y="58" fill="#F4F7FB" fontFamily="DM Mono, monospace" fontSize="10">
              Deploy Reproduzível
            </text>
          </g>

          <text x="16" y="325" fill="#49B4FF" fontFamily="DM Mono, monospace" fontSize="10">
            ISOLAMENTO MULTI-CONTAINER
          </text>
        </g>
      </svg>
    </div>
  );
}
