import { useState, useEffect, useRef } from "react";
import { footerData, links } from "../data";
import { ArrowUpIcon, GithubIcon, LinkedinIcon } from "../icons";
import { RollText } from "./RollText";
import { navItems } from "./Header";
import { CvButton } from "./CvButton";

export function Footer() {
  const [localTime, setLocalTime] = useState("");
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        setLocalTime(formatter.format(now));
      } catch {
        setLocalTime("21:00");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer ref={footerRef} className="site-footer">
      <div className="footer-uncover-stage">
        <div className="container footer-content-grid">
          {/* Bloco 1: Identidade do Autor & Status */}
          <div className="footer-col-brand">
            <span className="footer-serif-author">{footerData.author}</span>
            <span className="footer-role-tag mono">{footerData.role}</span>

            {/* Relógio Local de Brasília */}
            <div className="footer-live-clock mono" aria-label="Horário local oficial de Brasília">
              <span className="clock-beacon" aria-hidden="true" />
              <span>{localTime || "--:--"} (BRT) · GOIÁS, BRASIL</span>
            </div>

            <p className="footer-copy-note">{footerData.copyright}</p>
          </div>

          {/* Bloco 2: Navegação Secundária do Site */}
          <div className="footer-col-nav">
            <span className="footer-col-title mono">NAVEGAÇÃO</span>
            <ul className="footer-nav-list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="footer-nav-link"
                    data-magnetic
                    data-cursor="magnetic"
                  >
                    <RollText text={item.label} />
                  </a>
                </li>
              ))}
              <li>
                <CvButton variant="footer" />
              </li>
            </ul>
          </div>

          {/* Bloco 3: Conexões & Redes */}
          <div className="footer-col-socials">
            <span className="footer-col-title mono">REDES &amp; CANAIS</span>
            <ul className="footer-social-list">
              <li>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  data-magnetic
                  data-cursor="magnetic"
                >
                  <GithubIcon size={15} />
                  <span>GitHub</span>
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
              <li>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  data-magnetic
                  data-cursor="magnetic"
                >
                  <LinkedinIcon size={15} />
                  <span>LinkedIn</span>
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${links.email}`}
                  className="footer-social-link"
                  data-magnetic
                  data-cursor="magnetic"
                >
                  <span aria-hidden="true">✉</span>
                  <span>{links.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Bloco 4: Voltar ao Topo */}
          <div className="footer-col-top">
            <a
              href="#topo"
              className="footer-top-link mono"
              aria-label="Voltar ao topo da página"
              data-magnetic
              data-cursor="magnetic"
            >
              <RollText text="Voltar ao topo" />
              <ArrowUpIcon size={14} />
            </a>
          </div>
        </div>

        {/* Assinatura Monumental Editorial (Emerge em paralaxe no fim do scroll) */}
        <div className="container footer-monumental-wrap" aria-hidden="true">
          <div className="footer-monumental-signature">
            <span>ÁLEF FELIX</span>
            <span className="footer-monumental-dot">·</span>
            <span className="footer-monumental-year mono">2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
