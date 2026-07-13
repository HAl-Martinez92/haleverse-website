from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, JpegImagePlugin


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "business" / "brand-assets"
PUBLIC = ROOT / "source" / "public" / "media"

NAVY = "#0A2540"
GREEN = "#10B981"
CYAN = "#67E8F9"
ICE = "#F8FAFC"
WHITE = "#FFFFFF"
MUTED = "#D8E3EF"
INK = "#0F172A"
SLATE = "#475569"


def font(size, bold=False):
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def text_wrap(draw, text, fnt, max_width):
    words = text.split()
    lines = []
    line = ""
    for word in words:
        test = f"{line} {word}".strip()
        if draw.textbbox((0, 0), test, font=fnt)[2] <= max_width:
            line = test
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def draw_wrapped(draw, xy, text, fnt, fill, max_width, line_gap=8):
    x, y = xy
    for line in text_wrap(draw, text, fnt, max_width):
        draw.text((x, y), line, font=fnt, fill=fill)
        y += fnt.size + line_gap
    return y


def network_h(draw, x, y, scale=1.0, line=CYAN, dot=GREEN):
    pts = [
        (x, y),
        (x + 32 * scale, y + 42 * scale),
        (x + 64 * scale, y),
        (x, y + 92 * scale),
        (x + 32 * scale, y + 50 * scale),
        (x + 64 * scale, y + 92 * scale),
    ]
    for a, b in [(0, 1), (1, 2), (0, 3), (3, 4), (4, 5), (2, 5), (1, 4)]:
        draw.line([pts[a], pts[b]], fill=line, width=max(3, int(5 * scale)))
    r = max(5, int(8 * scale))
    for px, py in pts:
        draw.ellipse((px - r, py - r, px + r, py + r), fill=dot)


def save_both(img, name):
    OUT.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    img.save(OUT / name, quality=95)
    img.save(PUBLIC / name, quality=95)


def business_card_front():
    img = Image.new("RGB", (1050, 600), NAVY)
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, 1050, 600), fill=NAVY)
    network_h(d, 785, 145, 2.0)
    d.text((70, 62), "HALEVERSE", font=font(42, True), fill=WHITE)
    d.line((70, 122, 980, 122), fill="#D8E3EF", width=2)
    d.text((70, 210), "Hugo Martínez", font=font(58, True), fill=WHITE)
    d.text((73, 286), "Fundador", font=font(26, True), fill=GREEN)
    d.text((73, 326), "Soluciones tecnológicas para empresas", font=font(24), fill=MUTED)
    d.text((70, 466), "contacto@haleverse.com", font=font(23, True), fill=WHITE)
    d.text((70, 505), "haleverse.com", font=font(23), fill=MUTED)
    save_both(img, "haleverse-business-card-front.png")


def business_card_back():
    img = Image.new("RGB", (1050, 600), ICE)
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, 1050, 600), fill=ICE)
    d.text((70, 62), "HALEVERSE", font=font(42, True), fill=NAVY)
    d.line((70, 122, 980, 122), fill="#D8E3EF", width=2)
    d.text((70, 205), "Tecnología práctica", font=font(48, True), fill=NAVY)
    d.text((70, 268), "para ordenar procesos,", font=font(48, True), fill=NAVY)
    d.text((70, 331), "conectar datos", font=font(48, True), fill=NAVY)
    d.text((70, 394), "y generar valor.", font=font(48, True), fill=NAVY)
    network_h(d, 820, 365, 1.35)
    d.text((70, 516), "Datos · Integración · Automatización · Software", font=font(22, True), fill=GREEN)
    save_both(img, "haleverse-business-card-back.png")
    return img


def story_asset(name, headline, body, footer):
    img = Image.new("RGB", (1080, 1920), NAVY)
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, 1080, 1920), fill=NAVY)
    for i in range(0, 1080, 135):
        d.line((i, 0, i + 520, 1920), fill="#103A5F", width=2)
    network_h(d, 690, 260, 2.4)
    d.text((88, 112), "HALEVERSE", font=font(48, True), fill=WHITE)
    d.text((88, 198), "DATOS · INTEGRACIÓN · AUTOMATIZACIÓN · SOFTWARE", font=font(22, True), fill=GREEN)
    y = 520
    y = draw_wrapped(d, (88, y), headline, font(86, True), WHITE, 850, 12)
    y += 44
    draw_wrapped(d, (92, y), body, font(36), MUTED, 820, 10)
    d.rounded_rectangle((88, 1540, 992, 1686), radius=28, fill="#103A5F", outline="#2A5B7F", width=3)
    d.text((128, 1578), footer, font=font(34, True), fill=WHITE)
    d.text((88, 1778), "contacto@haleverse.com", font=font(28, True), fill=WHITE)
    d.text((88, 1824), "haleverse.com", font=font(28), fill=MUTED)
    save_both(img, name)


def square_asset():
    img = Image.new("RGB", (1080, 1080), ICE)
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, 1080, 1080), fill=ICE)
    network_h(d, 760, 100, 2.0)
    d.text((80, 78), "HALEVERSE", font=font(48, True), fill=NAVY)
    d.text((80, 178), "Soluciones tecnológicas", font=font(70, True), fill=NAVY)
    d.text((80, 260), "para trabajar mejor.", font=font(70, True), fill=NAVY)
    body = "Automatizamos procesos, conectamos datos y construimos herramientas para equipos que quieren operar con más orden."
    draw_wrapped(d, (84, 420), body, font(34), SLATE, 800, 11)
    tags = ["Procesos claros", "Datos conectados", "Resultados medibles"]
    x = 80
    for tag in tags:
        w = d.textbbox((0, 0), tag, font=font(24, True))[2] + 54
        d.rounded_rectangle((x, 770, x + w, 828), radius=18, fill=NAVY)
        d.text((x + 27, 784), tag, font=font(24, True), fill=WHITE)
        x += w + 24
    d.text((80, 960), "contacto@haleverse.com", font=font(27, True), fill=NAVY)
    d.text((720, 960), "haleverse.com", font=font(27), fill=SLATE)
    save_both(img, "haleverse-social-post-square.png")


def main():
    business_card_front()
    back = business_card_back()
    front = Image.open(OUT / "haleverse-business-card-front.png").convert("RGB")
    back = back.convert("RGB")
    front.save(OUT / "haleverse-business-card.pdf", save_all=True, append_images=[back])
    front.save(PUBLIC / "haleverse-business-card.pdf", save_all=True, append_images=[back])
    story_asset(
        "haleverse-whatsapp-status.png",
        "Soluciones tecnológicas para trabajar mejor.",
        "Ordenamos información, automatizamos tareas repetitivas y construimos herramientas para la operación diaria.",
        "Hablemos de su proceso",
    )
    story_asset(
        "haleverse-instagram-story.png",
        "Automatización, datos e integración.",
        "Tecnología práctica para reducir trabajo manual, conectar sistemas y generar resultados medibles.",
        "HALEVERSE · Soluciones tecnológicas",
    )
    story_asset(
        "haleverse-facebook-story.png",
        "Procesos más claros. Datos conectados.",
        "Acompañamos equipos que quieren trabajar con más orden, menos reprocesos y mejores herramientas.",
        "Conozca HALEVERSE",
    )
    square_asset()
    print(OUT)
    print(PUBLIC)


if __name__ == "__main__":
    main()
