from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "HALEVERSE_Brochure.pdf"

PAGE_W, PAGE_H = A4
NAVY = colors.HexColor("#0A2540")
GREEN = colors.HexColor("#10B981")
CYAN = colors.HexColor("#67E8F9")
INK = colors.HexColor("#0F172A")
MUTED = colors.HexColor("#475569")
LINE = colors.HexColor("#D8E3EF")
ICE = colors.HexColor("#F8FAFC")
WHITE = colors.white

FONT_REG = "SegoeUI"
FONT_BOLD = "SegoeUI-Bold"


def register_fonts():
    regular = Path("C:/Windows/Fonts/segoeui.ttf")
    bold = Path("C:/Windows/Fonts/segoeuib.ttf")
    fallback_regular = Path("C:/Windows/Fonts/arial.ttf")
    fallback_bold = Path("C:/Windows/Fonts/arialbd.ttf")
    pdfmetrics.registerFont(TTFont(FONT_REG, str(regular if regular.exists() else fallback_regular)))
    pdfmetrics.registerFont(TTFont(FONT_BOLD, str(bold if bold.exists() else fallback_bold)))


def style(name, size=10, leading=None, color=INK, font=FONT_REG):
    return ParagraphStyle(
        name,
        fontName=font,
        fontSize=size,
        leading=leading or size * 1.35,
        textColor=color,
        spaceAfter=0,
    )


def build_styles():
    return {
        "p": style("p", 10.2, 14.2, MUTED),
        "p_white": style("pwhite", 11, 15, colors.HexColor("#D8E3EF")),
        "kicker": style("kicker", 8.5, 11, GREEN, FONT_BOLD),
        "h2": style("h2", 24, 27, NAVY, FONT_BOLD),
        "h3": style("h3", 12.5, 15.5, NAVY, FONT_BOLD),
        "h3_white": style("h3w", 13, 16, WHITE, FONT_BOLD),
    }


def para(c, text, x, y, w, st):
    p = Paragraph(text, st)
    _, h = p.wrap(w, 1000)
    p.drawOn(c, x, y - h)
    return y - h


def header(c, page_no, styles, dark=False):
    color = WHITE if dark else NAVY
    c.setFillColor(color)
    c.setFont(FONT_BOLD, 13)
    c.drawString(22 * mm, PAGE_H - 18 * mm, "HALEVERSE")
    c.setFont(FONT_REG, 7.5)
    c.setFillColor(colors.HexColor("#D8E3EF") if dark else MUTED)
    c.drawRightString(PAGE_W - 22 * mm, PAGE_H - 17.2 * mm, f"0{page_no}")
    c.setStrokeColor(colors.HexColor("#D8E3EF") if dark else LINE)
    c.setLineWidth(0.5)
    c.line(22 * mm, PAGE_H - 23 * mm, PAGE_W - 22 * mm, PAGE_H - 23 * mm)


def footer(c, dark=False):
    c.setFont(FONT_REG, 8)
    c.setFillColor(colors.HexColor("#D8E3EF") if dark else MUTED)
    c.drawString(22 * mm, 16 * mm, "contacto@haleverse.com")
    c.drawRightString(PAGE_W - 22 * mm, 16 * mm, "haleverse.com")


def network_mark(c, x, y, scale=1, color=CYAN):
    c.setStrokeColor(color)
    c.setFillColor(GREEN)
    c.setLineWidth(1.2 * scale)
    pts = [
        (x, y),
        (x + 18 * scale, y + 22 * scale),
        (x + 36 * scale, y),
        (x, y - 30 * scale),
        (x + 18 * scale, y - 8 * scale),
        (x + 36 * scale, y - 30 * scale),
    ]
    for a, b in [(0, 1), (1, 2), (0, 3), (3, 4), (4, 5), (2, 5), (1, 4)]:
        c.line(pts[a][0], pts[a][1], pts[b][0], pts[b][1])
    for px, py in pts:
        c.circle(px, py, 2.8 * scale, fill=1, stroke=0)


def pill(c, x, y, text, fill=ICE, stroke=LINE, fg=NAVY):
    w = stringWidth(text, FONT_BOLD, 8.5) + 12 * mm
    c.setFillColor(fill)
    c.setStrokeColor(stroke)
    c.roundRect(x, y - 8 * mm, w, 8 * mm, 3 * mm, fill=1, stroke=1)
    c.setFillColor(fg)
    c.setFont(FONT_BOLD, 8.5)
    c.drawString(x + 5 * mm, y - 5.4 * mm, text)
    return x + w + 4 * mm


def service_card(c, x, y, w, h, title, body, styles):
    c.setFillColor(WHITE)
    c.setStrokeColor(LINE)
    c.roundRect(x, y - h, w, h, 4 * mm, fill=1, stroke=1)
    c.setFillColor(GREEN)
    c.circle(x + 7 * mm, y - 8 * mm, 2.2 * mm, fill=1, stroke=0)
    para(c, f"<b>{title}</b>", x + 12 * mm, y - 5 * mm, w - 18 * mm, styles["h3"])
    para(c, body, x + 7 * mm, y - 18 * mm, w - 14 * mm, styles["p"])


def proof_card(c, x, y, w, h, title, body, styles):
    c.setFillColor(ICE)
    c.setStrokeColor(LINE)
    c.roundRect(x, y - h, w, h, 4 * mm, fill=1, stroke=1)
    para(c, f"<b>{title}</b>", x + 7 * mm, y - 7 * mm, w - 14 * mm, styles["h3"])
    para(c, body, x + 7 * mm, y - 21 * mm, w - 14 * mm, styles["p"])


def page1(c, styles):
    c.setFillColor(NAVY)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    header(c, 1, styles, dark=True)
    footer(c, dark=True)
    network_mark(c, PAGE_W - 70 * mm, PAGE_H - 76 * mm, 1.8, CYAN)

    x = 22 * mm
    y = PAGE_H - 55 * mm
    c.setFillColor(GREEN)
    c.setFont(FONT_BOLD, 8.5)
    c.drawString(x, y, "DATOS · INTEGRACIÓN · AUTOMATIZACIÓN · SOFTWARE")
    y -= 12 * mm
    c.setFillColor(WHITE)
    c.setFont(FONT_BOLD, 38)
    c.drawString(x, y, "Soluciones")
    c.drawString(x, y - 15 * mm, "tecnológicas para")
    c.drawString(x, y - 30 * mm, "trabajar mejor.")
    y -= 49 * mm
    para(
        c,
        "Ayudamos a equipos y empresas a ordenar información, automatizar tareas repetitivas y construir herramientas que hacen más simple la operación diaria.",
        x,
        y,
        118 * mm,
        styles["p_white"],
    )
    y -= 38 * mm
    xx = x
    for text in ["Procesos claros", "Datos conectados", "Resultados medibles"]:
        xx = pill(c, xx, y, text, fill=colors.HexColor("#103A5F"), stroke=colors.HexColor("#2A5B7F"), fg=WHITE)


def page2(c, styles):
    header(c, 2, styles)
    footer(c)
    x = 22 * mm
    y = PAGE_H - 42 * mm
    y = para(c, "Qué resolvemos", x, y, 150 * mm, styles["kicker"])
    y = para(c, "Tecnología práctica para procesos reales.", x, y - 5 * mm, 150 * mm, styles["h2"])
    para(
        c,
        "Cuando el trabajo manual se acumula, la operación pierde ritmo. HALEVERSE acompaña a equipos que trabajan con archivos dispersos, reportes repetitivos, datos desconectados o tareas que consumen horas cada semana.",
        x,
        y - 6 * mm,
        155 * mm,
        styles["p"],
    )
    y = PAGE_H - 92 * mm
    w = 78 * mm
    h = 38 * mm
    services = [
        ("Automatización empresarial", "Procesos simples y controlados para tareas que hoy consumen horas."),
        ("Datos e integraciones", "Archivos, bases de datos, APIs y plataformas conectadas con orden."),
        ("Desarrollo de software", "Herramientas web e internas para necesidades concretas del negocio."),
        ("Oracle y SQL", "Consultas, procedimientos y reportes con más velocidad y estabilidad."),
        ("Reportes y documentos", "Datos convertidos en reportes, documentos y tableros claros."),
        ("Innovación aplicada", "Tecnología adecuada para cada caso, incluida IA cuando aporta valor."),
    ]
    for i, (title, body) in enumerate(services):
        col = i % 2
        row = i // 2
        service_card(c, x + col * (w + 10 * mm), y - row * (h + 8 * mm), w, h, title, body, styles)


def page3(c, styles):
    header(c, 3, styles)
    footer(c)
    x = 22 * mm
    y = PAGE_H - 42 * mm
    para(c, "Casos destacados", x, y, 150 * mm, styles["kicker"])
    y = para(c, "Resultados que podemos construir.", x, y - 5 * mm, 150 * mm, styles["h2"])
    para(
        c,
        "Algunos retos se repiten en muchas organizaciones. Estos ejemplos muestran cómo abordamos problemas frecuentes con soluciones prácticas, ordenadas y medibles.",
        x,
        y - 6 * mm,
        154 * mm,
        styles["p"],
    )
    y = PAGE_H - 92 * mm
    cases = [
        ("Documentos organizados sin reprocesos", "Automatización de documentos repetitivos para generar, validar y organizar archivos con menos errores y mayor control."),
        ("Modernización de plataforma administrativa", "Evolución por fases con frontend moderno, backend desacoplado e integración con datos existentes."),
        ("Reportes listos para decidir", "Consolidación de información desde diferentes fuentes para generar reportes listos para revisar, compartir o presentar."),
    ]
    for title, body in cases:
        proof_card(c, x, y, PAGE_W - 44 * mm, 40 * mm, title, body, styles)
        y -= 49 * mm


def page4(c, styles):
    c.setFillColor(ICE)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    header(c, 4, styles)
    footer(c)
    x = 22 * mm
    y = PAGE_H - 42 * mm
    para(c, "Formas de empezar", x, y, 150 * mm, styles["kicker"])
    y = para(c, "Una conversación clara, un primer paso concreto.", x, y - 5 * mm, 150 * mm, styles["h2"])
    offers = [
        ("Diagnóstico de automatización", "Revisamos un proceso que toma demasiado tiempo y definimos una ruta práctica para automatizarlo."),
        ("Solución empresarial a medida", "Construimos una herramienta concreta para resolver una necesidad real con archivos, datos, documentos, reportes o sistemas."),
        ("Consultoría Oracle, datos e integración", "Acompañamos equipos que necesitan ordenar información, mejorar consultas o conectar plataformas existentes."),
    ]
    y -= 12 * mm
    for title, body in offers:
        y = para(c, f"<b>{title}</b>", x, y, 150 * mm, styles["h3"])
        y = para(c, body, x, y - 2 * mm, 150 * mm, styles["p"])
        y -= 8 * mm

    c.setFillColor(NAVY)
    c.roundRect(22 * mm, 47 * mm, PAGE_W - 44 * mm, 46 * mm, 5 * mm, fill=1, stroke=0)
    para(c, "<b>Hablemos de su proceso.</b>", 31 * mm, 82 * mm, 120 * mm, styles["h3_white"])
    para(c, "Cuéntenos qué quiere mejorar y revisaremos una primera ruta para abordarlo.", 31 * mm, 72 * mm, 114 * mm, styles["p_white"])
    c.setFillColor(WHITE)
    c.setFont(FONT_BOLD, 11)
    c.drawString(31 * mm, 56 * mm, "contacto@haleverse.com")
    c.drawRightString(PAGE_W - 31 * mm, 56 * mm, "haleverse.com")


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    register_fonts()
    styles = build_styles()
    c = canvas.Canvas(str(OUT), pagesize=A4)
    for fn in [page1, page2, page3, page4]:
        fn(c, styles)
        c.showPage()
    c.save()
    print(OUT)


if __name__ == "__main__":
    main()
