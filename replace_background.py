#!/usr/bin/env python3
"""
replace_background.py
Reemplaza el fondo blanco de imágenes de producto por un gris oscuro profesional.
Usa flood-fill desde las esquinas + suavizado de bordes para resultados limpios.
"""

from PIL import Image, ImageFilter, ImageChops
import os
import sys

# ── Configuración ─────────────────────────────────────────────────────────────
# Color gris oscuro de fondo (igual al de la segunda imagen)
BG_COLOR = (30, 30, 30)          # gris carbón oscuro

# Tolerancia: cuánto puede diferir un píxel del blanco para considerarse fondo
TOLERANCE = 30                   # 0-255 (30 es conservador, sube si quedan manchas)

# Radio de suavizado de borde (feather)
FEATHER_RADIUS = 2               # píxeles de difuminado en los bordes

# Imágenes de producto a procesar (fondo blanco)
PRODUCT_IMAGES = [
    "AK26 1.png",
    "AK26 2.png",
    "AK26 3.png",
    "AspersorAK20LE.png",
    "AspersorAK20LE2.png",
    "Carrucel1.png",
    "Carrucel2.png",
    "Carrucel3.png",
    "Carrusel4.png",
    "Carrusel5.png",
    "DKM26KN_01.png",
    "DKM26KN_02.png",
    "MTK26.png",
    "MTK26-2.png",
    "MTK26-3.png",
]

IMAGES_DIR = os.path.join(os.path.dirname(__file__), "src", "assets", "images")
OUTPUT_DIR = os.path.join(IMAGES_DIR, "processed")  # carpeta de salida


# ── Utilidades ────────────────────────────────────────────────────────────────

def color_distance(c1, c2):
    """Distancia euclidiana entre dos colores RGB."""
    return ((c1[0]-c2[0])**2 + (c1[1]-c2[1])**2 + (c1[2]-c2[2])**2) ** 0.5


def flood_fill_mask(img_rgba, tolerance):
    """
    Crea una máscara binaria del fondo usando flood-fill desde las 4 esquinas.
    Píxeles de fondo = 0, píxeles de producto = 255.
    """
    width, height = img_rgba.size
    pixels = img_rgba.load()
    visited = [[False]*height for _ in range(width)]
    mask = Image.new("L", img_rgba.size, 255)   # empieza todo como producto
    mask_pixels = mask.load()

    WHITE = (255, 255, 255)
    stack = []

    # Semillas en las 4 esquinas
    corners = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
    for cx, cy in corners:
        r, g, b, a = pixels[cx, cy]
        if color_distance((r, g, b), WHITE) <= tolerance:
            stack.append((cx, cy))

    while stack:
        x, y = stack.pop()
        if x < 0 or x >= width or y < 0 or y >= height:
            continue
        if visited[x][y]:
            continue
        visited[x][y] = True

        r, g, b, a = pixels[x, y]
        if color_distance((r, g, b), WHITE) <= tolerance:
            mask_pixels[x, y] = 0   # marcar como fondo
            stack.extend([(x+1, y), (x-1, y), (x, y+1), (x, y-1)])

    return mask


def soften_mask(mask, radius):
    """Suaviza los bordes de la máscara para evitar bordes duros."""
    # Blur ligero para feathering
    blurred = mask.filter(ImageFilter.GaussianBlur(radius=radius))
    # Re-binarizar: píxeles de fondo quedan negros, producto queda blanco
    return blurred


def replace_background(input_path, output_path, bg_color, tolerance, feather):
    """Procesa una imagen: elimina fondo blanco y coloca bg_color."""
    img = Image.open(input_path).convert("RGBA")

    # 1. Crear máscara del fondo
    mask = flood_fill_mask(img, tolerance)

    # 2. Suavizar bordes
    soft_mask = soften_mask(mask, feather)

    # 3. Crear imagen de fondo del color deseado
    background = Image.new("RGBA", img.size, bg_color + (255,))

    # 4. Compositar: donde máscara=0 (fondo) → bg_color; donde=255 → producto
    result = Image.composite(img, background, soft_mask)

    # 5. Guardar como PNG (preserva calidad)
    result = result.convert("RGB")
    result.save(output_path, "PNG", quality=95)
    print(f"  ✅  {os.path.basename(input_path)}")


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"\n🎨 Reemplazando fondos blancos → gris oscuro {BG_COLOR}")
    print(f"   Tolerancia: {TOLERANCE}  |  Feather: {FEATHER_RADIUS}px")
    print(f"   Salida: {OUTPUT_DIR}\n")

    errors = []
    for filename in PRODUCT_IMAGES:
        input_path = os.path.join(IMAGES_DIR, filename)
        if not os.path.exists(input_path):
            print(f"  ⚠️  No encontrada: {filename}")
            errors.append(filename)
            continue

        # Mantener el mismo nombre de archivo en la carpeta de salida
        output_path = os.path.join(OUTPUT_DIR, filename.replace(" ", "_"))
        try:
            replace_background(input_path, output_path, BG_COLOR, TOLERANCE, FEATHER_RADIUS)
        except Exception as e:
            print(f"  ❌  {filename}: {e}")
            errors.append(filename)

    print(f"\n✨ Listo. {len(PRODUCT_IMAGES)-len(errors)}/{len(PRODUCT_IMAGES)} imágenes procesadas.")
    if errors:
        print(f"   Con errores o no encontradas: {errors}")
    print(f"   Revisa las imágenes en: {OUTPUT_DIR}\n")


if __name__ == "__main__":
    main()
