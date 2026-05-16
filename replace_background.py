#!/usr/bin/env python3
"""
replace_background.py
Usa IA (rembg / U2-Net) para detectar el producto con precisión,
luego coloca el resultado sobre el gris oscuro profesional.
Funciona aunque el producto sea blanco, gris o cualquier color.
"""

from rembg import remove, new_session
from PIL import Image
import io
import os

# ── Configuración ─────────────────────────────────────────────────────────────
BG_COLOR = (30, 30, 30)   # gris carbón oscuro (igual al de la segunda imagen)

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
OUTPUT_DIR = os.path.join(IMAGES_DIR, "processed_ai")


# ── Procesamiento ─────────────────────────────────────────────────────────────

def replace_background_ai(input_path, output_path, bg_color, session):
    """
    1. Lee la imagen original.
    2. Usa rembg (red neuronal U2-Net) para eliminar el fondo → RGBA con transparencia.
    3. Compone el producto sobre bg_color.
    4. Guarda como PNG de alta calidad.
    """
    with open(input_path, "rb") as f:
        input_data = f.read()

    # Eliminar fondo con IA
    output_data = remove(input_data, session=session)

    # Cargar resultado como RGBA
    img_no_bg = Image.open(io.BytesIO(output_data)).convert("RGBA")

    # Crear fondo sólido del color deseado
    background = Image.new("RGBA", img_no_bg.size, bg_color + (255,))

    # Compositar producto sobre fondo
    background.paste(img_no_bg, mask=img_no_bg.split()[3])   # canal alpha como máscara

    # Guardar como RGB PNG
    background.convert("RGB").save(output_path, "PNG")
    print(f"  ✅  {os.path.basename(input_path)}")


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"\n🤖 Procesando imágenes con IA (rembg / U2-Net)")
    print(f"   Fondo → gris carbón {BG_COLOR}")
    print(f"   Salida: {OUTPUT_DIR}\n")

    # Crear sesión del modelo una sola vez (evita recargar el modelo en cada imagen)
    print("   Cargando modelo de IA... (solo la primera vez)\n")
    session = new_session("u2net")

    errors = []
    for filename in PRODUCT_IMAGES:
        input_path = os.path.join(IMAGES_DIR, filename)
        if not os.path.exists(input_path):
            print(f"  ⚠️  No encontrada: {filename}")
            errors.append(filename)
            continue

        output_filename = filename.replace(" ", "_")
        output_path = os.path.join(OUTPUT_DIR, output_filename)
        try:
            replace_background_ai(input_path, output_path, BG_COLOR, session)
        except Exception as e:
            print(f"  ❌  {filename}: {e}")
            errors.append(filename)

    print(f"\n✨ Listo. {len(PRODUCT_IMAGES)-len(errors)}/{len(PRODUCT_IMAGES)} procesadas.")
    if errors:
        print(f"   Errores: {errors}")
    print(f"   Revisa los resultados en: {OUTPUT_DIR}\n")


if __name__ == "__main__":
    main()
