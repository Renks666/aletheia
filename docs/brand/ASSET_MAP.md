# Brandbook import and asset map

This project keeps source RAR/ZIP and raw design files outside the repository.
Only optimized production assets are committed in `public/brand/*`.

## Current selected source

- Archive: `C:\Users\pluxury\Desktop\aletheia-logobook.rar`
- Chosen logo master (purple on dark family):
  - `aletheia-logobook/логотип/фирменный знак/2__2@1920x.png`
- Fallback (if contrast is insufficient):
  - `aletheia-logobook/логотип/фирменный знак/1__2@1920x.png`

## Import workflow (RAR)

```powershell
$RAR="C:\Users\pluxury\Desktop\aletheia-logobook.rar"
$TMP="$env:TEMP\aletheia-logo-work"
$DST="public\brand\logo"
New-Item -ItemType Directory -Force -Path $TMP,$DST | Out-Null

tar -xf $RAR -C $TMP "aletheia-logobook/логотип/фирменный знак/2__2@1920x.png"
Copy-Item "$TMP\aletheia-logobook\логотип\фирменный знак\2__2@1920x.png" "$DST\mark-purple-master.png" -Force
```

## Derivatives

- `public/brand/logo/mark-purple-master.png` - raw selected master
- `public/brand/logo/mark-purple-512.png` - hero/process/case watermark
- `public/brand/logo/mark-purple-128.png` - header emblem

## Current asset map

| Source in brandbook | Destination in repo | Used in |
|---|---|---|
| `логотип/фирменный знак/2__2@1920x.png` | `public/brand/logo/mark-purple-128.png` | `src/widgets/header.module.css` |
| `логотип/фирменный знак/2__2@1920x.png` | `public/brand/logo/mark-purple-512.png` | `src/features/landing/sections/hero-section.tsx`, `src/features/landing/sections/process-section.tsx`, `src/features/landing/landing-page.module.css` |
| `public/images/bronze-texture.svg` | `public/images/bronze-texture.svg` | `src/features/landing/landing-page.module.css`, `src/widgets/lead-form-block.module.css` |

## Rules

- Do not commit `.ai`, `.psd`, `.fig`, or original archive files.
- Keep file names stable once they are referenced in code.
- If you rotate logo versions, update this file and affected paths in code.
