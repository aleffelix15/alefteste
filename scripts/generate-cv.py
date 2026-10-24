import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations()
            super().showPage()
        super().save()

    def draw_page_decorations(self):
        # Rodapé
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        text = "Álef Felix Teixeira · Portfólio: portfolio-alef-felix.vercel.app · Atualizado em 10/2026"
        self.drawCentredString(A4[0] / 2.0, 18, text)
        self.restoreState()

def build_pdf(filename="public/curriculo-alef-felix.pdf"):
    # Margens: 44 pt esquerda/direita (~1.55 cm), 28 pt topo, 26 pt base
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=44,
        rightMargin=44,
        topMargin=26,
        bottomMargin=26,
        title="Curriculo - Alef Felix Teixeira",
        author="Alef Felix Teixeira",
        subject="Curriculo Profissional - Suporte de TI & Engenharia de Software",
        creator="Alef Felix Teixeira Portfolio"
    )

    styles = getSampleStyleSheet()

    # Cores editoriais
    c_primary = colors.HexColor("#0b172a") # Quase preto
    c_blue = colors.HexColor("#0056d6")    # Azul de destaque
    c_muted = colors.HexColor("#64748b")   # Cinza muted
    c_text = colors.HexColor("#334155")    # Texto corpo
    c_line = colors.HexColor("#cbd5e1")    # Linha divisória

    # Estilos de texto
    name_style = ParagraphStyle(
        "Name",
        fontName="Helvetica-Bold",
        fontSize=18,
        leading=22,
        textColor=c_primary,
        alignment=1, # Centralizado
        spaceAfter=3
    )

    subtitle_style = ParagraphStyle(
        "Subtitle",
        fontName="Helvetica-Bold",
        fontSize=9.5,
        leading=13,
        textColor=c_blue,
        alignment=1,
        spaceAfter=4
    )

    contact_style = ParagraphStyle(
        "Contact",
        fontName="Helvetica",
        fontSize=8.5,
        leading=12,
        textColor=c_muted,
        alignment=1,
        spaceAfter=2
    )

    section_title_style = ParagraphStyle(
        "SectionTitle",
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=13,
        textColor=c_primary,
        spaceBefore=0,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        "Body",
        fontName="Helvetica",
        fontSize=8.5,
        leading=11.5,
        textColor=c_text,
        alignment=4 # Justificado
    )

    bullet_style = ParagraphStyle(
        "Bullet",
        fontName="Helvetica",
        fontSize=8.5,
        leading=11.5,
        textColor=c_text,
        leftIndent=8,
        spaceBefore=0,
        spaceAfter=0
    )

    def section_header(title):
        return [
            Spacer(1, 7),
            Paragraph(title, section_title_style),
            HRFlowable(width="100%", thickness=0.75, color=c_blue, spaceBefore=2, spaceAfter=5)
        ]

    def job_header(title_company, date_str):
        p_left = Paragraph(f"<b>{title_company}</b>", ParagraphStyle(
            "JHLeft", fontName="Helvetica-Bold", fontSize=9, leading=12, textColor=c_primary
        ))
        p_right = Paragraph(date_str, ParagraphStyle(
            "JHRight", fontName="Helvetica", fontSize=8.2, leading=12, textColor=c_muted, alignment=2
        ))
        t = Table([[p_left, p_right]], colWidths=[380, 127])
        t.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 1),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ]))
        return t

    story = []

    # Cabeçalho Principal
    story.append(Paragraph("ÁLEF FELIX TEIXEIRA", name_style))
    story.append(Paragraph(
        "Estudante de Engenharia de Software &nbsp;|&nbsp; Auxiliar de TI · Suporte Técnico · Help Desk",
        subtitle_style
    ))
    story.append(Paragraph(
        "Senador Canedo – GO &nbsp;&nbsp;·&nbsp;&nbsp; (62) 98516-3672 &nbsp;&nbsp;·&nbsp;&nbsp; aleffelix81@gmail.com",
        contact_style
    ))
    story.append(Paragraph(
        "linkedin.com/in/alef-felix-teixeira-a5030b236 &nbsp;&nbsp;·&nbsp;&nbsp; github.com/aleffelix15",
        contact_style
    ))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1, color=c_line, spaceBefore=2, spaceAfter=6))

    # 1. RESUMO PROFISSIONAL
    story.extend(section_header("RESUMO PROFISSIONAL"))
    story.append(Paragraph(
        "Estudante de Engenharia de Software na UNIALFA, em busca de oportunidade em TI nas áreas de suporte técnico, "
        "help desk e atendimento ao usuário. Experiência em atendimento presencial e telefônico, triagem de solicitações e "
        "registro de informações em sistemas de gestão, com uso diário de Windows, Pacote Office e Excel avançado. Em projetos "
        "pessoais, pratico diagnóstico de erros, testes e documentação de software.",
        body_style
    ))

    # 2. COMPETÊNCIAS TÉCNICAS
    story.extend(section_header("COMPETÊNCIAS TÉCNICAS"))
    skills_data = [
        [
            Paragraph("<b>Sistemas & Produtividade:</b>", ParagraphStyle("SK1", fontName="Helvetica-Bold", fontSize=8.5, leading=11.5, textColor=c_text)),
            Paragraph("Windows, Pacote Office, Excel avançado, Word", body_style)
        ],
        [
            Paragraph("<b>Atendimento & Rotinas:</b>", ParagraphStyle("SK2", fontName="Helvetica-Bold", fontSize=8.5, leading=11.5, textColor=c_text)),
            Paragraph("Atendimento presencial/telefônico, triagem de chamados, registro em sistemas, gestão documental", body_style)
        ],
        [
            Paragraph("<b>Desenvolvimento & Ferramentas:</b>", ParagraphStyle("SK3", fontName="Helvetica-Bold", fontSize=8.5, leading=11.5, textColor=c_text)),
            Paragraph("JavaScript, TypeScript, React, Java (básico), Git, GitHub, ESLint, Firebase", body_style)
        ],
        [
            Paragraph("<b>Banco de Dados & Aplicações:</b>", ParagraphStyle("SK4", fontName="Helvetica-Bold", fontSize=8.5, leading=11.5, textColor=c_text)),
            Paragraph("PostgreSQL, Supabase, Autenticação, Controle de acesso por perfil (RBAC)", body_style)
        ],
    ]
    t_skills = Table(skills_data, colWidths=[150, 357])
    t_skills.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
    ]))
    story.append(t_skills)

    # 3. EXPERIÊNCIA PROFISSIONAL
    story.extend(section_header("EXPERIÊNCIA PROFISSIONAL"))
    
    # Cargo 1
    story.append(job_header("Jovem Aprendiz – Setor Administrativo | PAX Psiquiatria", "05/2026 – Atual"))
    story.append(Paragraph("• Apoio às rotinas administrativas do setor em programa de aprendizagem profissional e organização de processos.", bullet_style))
    story.append(Spacer(1, 4))

    # Cargo 2
    story.append(job_header("Auxiliar de Logística | Softys Falcon", "02/2025 – 09/2025"))
    story.append(Paragraph("• Lançamento de entregas em sistema de gestão logística, com registro e organização das informações.", bullet_style))
    story.append(Paragraph("• Conferência de cargas, controle de recebimentos e conferência de notas fiscais.", bullet_style))
    story.append(Spacer(1, 4))

    # Cargo 3
    story.append(job_header("Estagiário | IMEC – Instituto de Medicina Canedo", "04/2024 – 12/2024"))
    story.append(Paragraph("• Atendimento presencial e telefônico ao público com triagem e direcionamento de solicitações.", bullet_style))
    story.append(Paragraph("• Organização de prontuários/documentos e suporte às rotinas operacionais e administrativas.", bullet_style))

    # 4. PROJETOS DE SOFTWARE RELEVANTES
    story.extend(section_header("PROJETOS DE SOFTWARE RELEVANTES"))

    # Projeto 1: NUDEMO (Substituindo BANKTEF conforme especificado na ETAPA 3.8)
    story.append(job_header("NUDEMO — Landing page 3D interativa (conceito de redesign)", "github.com/aleffelix15/nudem"))
    story.append(Paragraph("• <i>Stack:</i> React 18, Vite 5, Three.js (React Three Fiber), Framer Motion.", bullet_style))
    story.append(Paragraph("• Cartão 3D em tempo real com rotação por scroll, fallback 2D sem WebGL e suporte a prefers-reduced-motion.", bullet_style))
    story.append(Paragraph("• Carregamento sob demanda dos chunks 3D e qualidade adaptativa por dispositivo.", bullet_style))
    story.append(Spacer(1, 4))

    # Projeto 2: Verso
    story.append(job_header("Verso — E-commerce Streetwear com Checkout Seguro & SSR", "github.com/aleffelix15/verso"))
    story.append(Paragraph("• <i>Stack:</i> React 19, TypeScript, TanStack Start, Tailwind CSS, Vitest, ESLint.", bullet_style))
    story.append(Paragraph("• Auditoria de segurança documentada: validação de dados no checkout, cálculo de preço e frete no servidor.", bullet_style))
    story.append(Paragraph("• Diagnóstico e correção de falhas em regras de negócio com cobertura de testes automatizados.", bullet_style))

    # 5. FORMAÇÃO ACADÊMICA & CURSOS
    story.extend(section_header("FORMAÇÃO ACADÊMICA & CURSOS"))
    story.append(job_header("Bacharelado em Engenharia de Software – UNIALFA", "Cursando (desde 2026)"))
    story.append(job_header("Ensino Médio Completo – Escola Estadual João Carneiro dos Santos", "2022 – 2024"))
    story.append(Spacer(1, 2))
    story.append(Paragraph("<b>Cursos Complementares:</b> Informática Avançada · Excel Avançado · Java (básico) · Git & GitHub", body_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    print("PDF build complete:", filename)

if __name__ == "__main__":
    build_pdf()
