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


def official_isotype(draw, x, y, size):
    scale = size / 512
    draw.rounded_rectangle((x, y, x + size, y + size), radius=int(96 * scale), fill=NAVY)

    def tx(px):
        return x + (142 + px * 1.5) * scale

    def ty(py):
        return y + (142 + py * 1.5) * scale

    def line(x1, y1, x2, y2, fill, width, alpha=None):
        # Alpha is already represented by the lighter cyan against navy in this raster version.
        draw.line((tx(x1), ty(y1), tx(x2), ty(y2)), fill=fill, width=max(1, int(width * scale)))

    line(0, 0, 0, 170, CYAN, 5)
    line(150, 0, 150, 170, CYAN, 5)
    line(0, 85, 150, 85, GREEN, 8)
    line(0, 0, 62, 53, CYAN, 5)
    line(62, 53, 150, 0, CYAN, 5)
    line(0, 170, 62, 117, CYAN, 5)
    line(62, 117, 150, 170, CYAN, 5)
    line(0, 85, 62, 53, CYAN, 5)
    line(150, 85, 62, 117, CYAN, 5)

    circles = [
        (0, 0, 14, ICE, NAVY, 5),
        (0, 85, 14, GREEN, WHITE, 5),
        (0, 170, 14, ICE, NAVY, 5),
        (150, 0, 14, ICE, NAVY, 5),
        (150, 85, 14, GREEN, WHITE, 5),
        (150, 170, 14, ICE, NAVY, 5),
        (62, 53, 11, CYAN, ICE, 4),
        (62, 117, 11, CYAN, ICE, 4),
    ]
    for cx, cy, r, fill, stroke, sw in circles:
        px = tx(cx)
        py = ty(cy)
        rr = r * scale
        draw.ellipse((px - rr, py - rr, px + rr, py + rr), fill=fill, outline=stroke, width=max(1, int(sw * scale)))


def save_both(img, name):
    OUT.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    img.save(OUT / name, quality=95)
    img.save(PUBLIC / name, quality=95)


def business_card_front():
    img = Image.new("RGB", (1050, 600), NAVY)
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, 1050, 600), fill=NAVY)
    official_isotype(d, 700, 92, 300)
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
    official_isotype(d, 790, 300, 210)
    d.text((70, 516), "Datos · Integración · Automatización · Software", font=font(22, True), fill=GREEN)
    save_both(img, "haleverse-business-card-back.png")
    return img


def story_asset(name, headline, body, footer):
    img = Image.new("RGB", (1080, 1920), NAVY)
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, 1080, 1920), fill=NAVY)
    for i in range(0, 1080, 135):
        d.line((i, 0, i + 520, 1920), fill="#103A5F", width=2)
    official_isotype(d, 650, 220, 300)
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
    official_isotype(d, 805, 70, 190)
    d.text((80, 78), "HALEVERSE", font=font(48, True), fill=NAVY)
    d.text((80, 270), "Soluciones tecnológicas", font=font(70, True), fill=NAVY)
    d.text((80, 352), "para trabajar mejor.", font=font(70, True), fill=NAVY)
    body = "Automatizamos procesos, conectamos datos y construimos herramientas para equipos que quieren operar con más orden."
    draw_wrapped(d, (84, 512), body, font(34), SLATE, 820, 11)
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


def linkedin_avatar():
    img = Image.new("RGB", (800, 800), NAVY)
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, 800, 800), fill=NAVY)
    official_isotype(d, 120, 120, 560)
    save_both(img, "haleverse-linkedin-logo.png")


def linkedin_cover():
    img = Image.new("RGB", (1128, 191), NAVY)
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, 1128, 191), fill=NAVY)
    for i in range(-180, 1128, 120):
        d.line((i, 0, i + 120, 191), fill="#103A5F", width=2)
    official_isotype(d, 52, 32, 128)
    d.text((218, 43), "HALEVERSE", font=font(42, True), fill=WHITE)
    d.text((221, 98), "Soluciones tecnológicas para trabajar mejor.", font=font(24, True), fill=MUTED)
    d.text((824, 72), "Datos · Integración", font=font(18, True), fill=GREEN)
    d.text((824, 101), "Automatización · Software", font=font(18, True), fill=GREEN)
    d.text((824, 132), "haleverse.com", font=font(18), fill=MUTED)
    save_both(img, "haleverse-linkedin-cover.png")


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
    linkedin_avatar()
    linkedin_cover()
    print(OUT)
    print(PUBLIC)


if __name__ == "__main__":
    main()
