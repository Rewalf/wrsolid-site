# WRSolid logo

Master files for the WRSolid identity. Usage rules are in `brand.md` §6.

| File | Use |
| :--- | :--- |
| `monogram-navy.svg` | Primary monogram, on light backgrounds |
| `monogram-chalk.svg` | Monogram on dark backgrounds |
| `monogram-black.svg` | Single-colour (print, stamps, embossing) |
| `wordmark-navy.svg`, `wordmark-chalk.svg` | Wordmark only |
| `lockup-horizontal-navy.svg`, `lockup-horizontal-chalk.svg` | Monogram + wordmark, the default logo |
| `lockup-stacked-navy.svg`, `lockup-stacked-chalk.svg` | Monogram above wordmark, for square formats |
| `icon.svg` | App icon (navy monogram on a chalk tile); copied to `app/icon.svg` |
| `preview.html` | Every version on light, dark and stone backgrounds |

All files are flat vectors with outlined text, so they don't depend on installed fonts.

## Regenerating

`generate.py` builds every SVG above and `components/brand/logoPaths.ts` (used by `components/brand/Logo.tsx`). Change the geometry there, never in the SVGs.

```powershell
python -m venv .venv
Set-Content .venv\pip.ini "[global]`nindex-url = https://pypi.org/simple"
.venv\Scripts\python -m pip install -r design\logo\requirements.txt
.venv\Scripts\python design\logo\generate.py
```

The `pip.ini` inside `.venv` overrides any user-level pip index, so packages for this project always come from public PyPI.

Raster files are rendered from the SVGs and are not produced by the script:

- `app/favicon.ico` (16, 32, 48 px) and `app/apple-icon.png` (180 px): navy monogram on chalk.
- `public/og-image.png` (1200×630): chalk horizontal lockup on graphite with both taglines.

## Fonts

`fonts/` holds Montserrat Regular and Bold, used to outline the wordmark. Montserrat is licensed under the SIL Open Font License 1.1 (`fonts/OFL.txt`).
