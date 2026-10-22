"""Generate the WRSolid logo assets.

The monogram is an isometric cube seen from below (a pointy-top hexagon) with
W, R and S cut out of its left, right and bottom faces. Each letter is drawn on
a unit square and mapped onto its face with an affine transform, so all three
share the same perspective. Each face is emitted as one even-odd path (face
outline + letter outline), so the files need no masks and work at any size.

The wordmark is outlined from Montserrat (WR Regular, SOLID Bold) with a Signal
Green dot above the O.

Usage:
    python generate.py <montserrat-ttf-dir>

Writes the SVG masters next to this script and `components/brand/logoPaths.ts`
for the site.
"""
import os
import sys

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
FONT_DIR = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "fonts")

NAVY, CHALK, BLACK, GREEN, GRAPHITE = "#24375A", "#F3F3F1", "#111111", "#2BD46F", "#1C1F22"

# Affine maps (a, b, c, d, e, f) from the unit square (u right, v down) onto
# each face of a hexagon of radius 100 centred on the origin.
FACES = {
    "W": (86.6, -50, 0, 100, -86.6, -50),  # left face: origin upper-left vertex
    "R": (86.6, 50, 0, 100, 0, -100),      # right face: origin top vertex
    "S": (86.6, 50, -86.6, 50, 0, 0),      # bottom face: origin centre
}


def letter_outlines(L, T, R, B, t):
    """Letter outlines as polygons in unit space. Counters are separate
    polygons so that even-odd filling restores them."""
    mid = (T + B) / 2
    mx = 0.5
    tm = T + 0.14  # the W's middle stem is shorter than the outer stems

    w = [(L, T), (L + t, T), (L + t, B - t), (mx - t / 2, B - t), (mx - t / 2, tm),
         (mx + t / 2, tm), (mx + t / 2, B - t), (R - t, B - t), (R - t, T), (R, T),
         (R, B), (L, B)]

    # R: bowl + stem as one outline, with the diagonal leg joined to the bowl.
    lw = t * 1.25
    x0 = mx - 0.04
    yb = mid + t / 2
    shift = (R - lw - x0) * (t / 2) / (B - mid)
    xl, xr = x0 + shift, x0 + lw + shift
    r_outer = [(L, T), (R, T), (R, yb), (xr, yb), (R, B), (R - lw, B), (xl, yb),
               (L + t, yb), (L + t, B), (L, B)]
    r_counter = [(L + t, T + t), (R - t, T + t), (R - t, mid - t / 2), (L + t, mid - t / 2)]

    s = [(L, T), (R, T), (R, T + t), (L + t, T + t), (L + t, mid - t / 2), (R, mid - t / 2),
         (R, B), (L, B), (L, B - t), (R - t, B - t), (R - t, mid + t / 2), (L, mid + t / 2)]

    return {"W": [w], "R": [r_outer, r_counter], "S": [s]}


def apply(m, pt):
    a, b, c, d, e, f = m
    u, v = pt
    return (a * u + c * v + e, b * u + d * v + f)


def poly_d(points):
    return "M" + "L".join(f"{x:.2f} {y:.2f}" for x, y in points) + "Z"


def monogram_d(gap, margin, stroke):
    lo, hi = margin, 1 - margin
    letters = letter_outlines(lo, lo, hi, hi, stroke)
    parts = []
    for name, m in FACES.items():
        panel = [(gap, gap), (1 - gap, gap), (1 - gap, 1 - gap), (gap, 1 - gap)]
        for poly in [panel] + letters[name]:
            parts.append(poly_d([apply(m, p) for p in poly]))
    return "".join(parts)


MONO_D = monogram_d(gap=0.055, margin=0.17, stroke=0.16)
MONO_BOX = (-86.6, -100, 173.2, 200)


# ---------------------------------------------------------------- wordmark
def glyph_run(font, text, x, tracking, scale):
    gs = font.getGlyphSet()
    cmap = font.getBestCmap()
    out = []
    for ch in text:
        name = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        gs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, x, 0)))
        out.append((ch, x, pen.getCommands()))
        x += gs[name].width * scale + tracking
    return out, x


def wordmark(em=100.0):
    """Returns (path_d, dot (cx, cy, r), width) with the baseline at y=0."""
    reg = TTFont(os.path.join(FONT_DIR, "Montserrat-Regular.ttf"))
    bold = TTFont(os.path.join(FONT_DIR, "Montserrat-Bold.ttf"))
    scale = em / reg["head"].unitsPerEm
    tracking = 0.04 * em
    run1, x = glyph_run(reg, "WR", 0, tracking, scale)
    run2, x = glyph_run(bold, "SOLID", x, tracking, scale)
    d = "".join(c for _, _, c in run1 + run2)
    o_x = next(gx for ch, gx, _ in run2 if ch == "O")
    o_adv = bold.getGlyphSet()[bold.getBestCmap()[ord("O")]].width * scale
    dot = (o_x + o_adv - 0.06 * em, -0.95 * em, 0.1 * em)
    return d, dot, x - tracking


def svg(view, body, label="WRSolid"):
    x, y, w, h = view
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x:.2f} {y:.2f} {w:.2f} {h:.2f}" '
            f'role="img" aria-label="{label}">{body}</svg>\n')


def write(name, content, folder=HERE):
    with open(os.path.join(folder, name), "w", encoding="utf-8", newline="\n") as fh:
        fh.write(content)


def main():
    for color, suffix in [(NAVY, "navy"), (CHALK, "chalk"), (BLACK, "black")]:
        write(f"monogram-{suffix}.svg", svg(MONO_BOX, f'<path fill="{color}" fill-rule="evenodd" d="{MONO_D}"/>'))

    em = 100.0
    wm_d, (cx, cy, r), wm_w = wordmark(em)
    dot = f'<circle cx="{cx:.2f}" cy="{cy:.2f}" r="{r:.2f}" fill="{GREEN}"/>'

    # Horizontal lockup: monogram 1.6 em tall, 0.45 em gap, wordmark centred on the cap height.
    k = 1.6 * em / 200
    mono_w = 173.2 * k
    gap = 0.45 * em
    cap_mid = -0.36 * em
    mono_h = f'<g transform="translate({mono_w / 2:.2f} {cap_mid:.2f}) scale({k})"><path fill-rule="evenodd" d="{MONO_D}"/></g>'
    word_h = f'<g transform="translate({mono_w + gap:.2f} 0)"><path d="{wm_d}"/>{dot}</g>'
    h_view = (0, cap_mid - 0.8 * em, mono_w + gap + wm_w, 1.6 * em)
    for color, suffix in [(NAVY, "navy"), (CHALK, "chalk")]:
        write(f"lockup-horizontal-{suffix}.svg", svg(h_view, f'<g fill="{color}">{mono_h}{word_h}</g>'))

    # Stacked lockup: monogram 3.4 em tall above the wordmark.
    ks = 3.4 * em / 200
    ms_w = 173.2 * ks
    top = 0
    mono_s = f'<g transform="translate({wm_w / 2:.2f} {1.7 * em:.2f}) scale({ks})"><path fill-rule="evenodd" d="{MONO_D}"/></g>'
    base = 3.4 * em + 0.35 * em + 0.75 * em
    word_s = f'<g transform="translate(0 {base:.2f})"><path d="{wm_d}"/>{dot}</g>'
    s_w = max(wm_w, ms_w)
    s_view = (-(s_w - wm_w) / 2, top - 0.05 * em, s_w, base + 0.3 * em)
    for color, suffix in [(NAVY, "navy"), (CHALK, "chalk")]:
        write(f"lockup-stacked-{suffix}.svg", svg(s_view, f'<g fill="{color}">{mono_s}{word_s}</g>'))

    for color, suffix in [(NAVY, "navy"), (CHALK, "chalk")]:
        write(f"wordmark-{suffix}.svg", svg((0, -1.1 * em, wm_w, 1.35 * em), f'<path fill="{color}" d="{wm_d}"/>{dot}'))

    # Site icon: navy monogram on a chalk rounded tile, readable on light and dark tab bars.
    icon = (f'<rect x="-104" y="-104" width="208" height="208" rx="30" fill="{CHALK}"/>'
            f'<g transform="scale(0.92)"><path fill="{NAVY}" fill-rule="evenodd" d="{MONO_D}"/></g>')
    write("icon.svg", svg((-104, -104, 208, 208), icon))

    # Path data for the React components. The monogram uses currentColor.
    ts = (
        "// Generated by design/logo/generate.py. Do not edit by hand.\n\n"
        f"export const MONOGRAM_VIEWBOX = '{' '.join(f'{v:.2f}' for v in MONO_BOX)}';\n"
        f"export const MONOGRAM_PATH = '{MONO_D}';\n\n"
        f"export const LOCKUP_VIEWBOX = '{' '.join(f'{v:.2f}' for v in h_view)}';\n"
        f"export const LOCKUP_MONOGRAM_TRANSFORM = 'translate({mono_w / 2:.2f} {cap_mid:.2f}) scale({k})';\n"
        f"export const LOCKUP_WORDMARK_TRANSFORM = 'translate({mono_w + gap:.2f} 0)';\n"
        f"export const WORDMARK_PATH = '{wm_d}';\n"
        f"export const WORDMARK_DOT = {{ cx: {cx:.2f}, cy: {cy:.2f}, r: {r:.2f} }};\n"
    )
    os.makedirs(os.path.join(REPO, "components", "brand"), exist_ok=True)
    write("logoPaths.ts", ts, os.path.join(REPO, "components", "brand"))
    print("ok", round(wm_w, 1))


if __name__ == "__main__":
    main()
