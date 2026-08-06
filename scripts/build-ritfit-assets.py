"""Build phone-friendly exercise crops from the official RitFit posters.

Usage:
  python scripts/build-ritfit-assets.py \
    --m1 path/to/M1_WORKOUT_POSTER.pdf \
    --bpc06 path/to/BPC06_WORKOUT_POSTER.pdf \
    --bwb02 path/to/BWB02_WORKOUT_POSTER.pdf

The crop coordinates are normalized so the output remains stable if the PDFs
are rendered at a different resolution.
"""

from __future__ import annotations

import argparse
from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image


CROPS = {
    "m1": {
        "cable-chest-press": (0.061, 0.236, 0.297, 0.348),
        "cable-curl": (0.541, 0.485, 0.756, 0.597),
        "straight-arm-pulldown": (0.541, 0.112, 0.756, 0.224),
        "smith-machine-rdl": (0.541, 0.733, 0.756, 0.846),
        "smith-machine-calf-raise": (0.061, 0.733, 0.297, 0.846),
        "smith-machine-squat": (0.312, 0.733, 0.526, 0.846),
        "cable-crunch": (0.541, 0.858, 0.756, 0.970),
        "high-to-low-cable-chop": (0.770, 0.858, 0.984, 0.970),
    },
    "bpc06": {
        "rear-delt-cable-fly": (0.419, 0.194, 0.596, 0.283),
        "cable-face-pull": (0.235, 0.392, 0.410, 0.482),
        "single-arm-cable-row": (0.786, 0.591, 0.965, 0.681),
        "seated-cable-row": (0.235, 0.689, 0.410, 0.780),
        "cable-shoulder-press": (0.786, 0.789, 0.965, 0.879),
        "cable-lateral-raise": (0.034, 0.591, 0.224, 0.681),
    },
    "bwb02": {
    },
}


def render_first_page(source: Path, scale: float = 2.0) -> Image.Image:
    pdf = pdfium.PdfDocument(str(source))
    page = pdf[0]
    return page.render(scale=scale).to_pil().convert("RGB")


def crop_normalized(image: Image.Image, box: tuple[float, float, float, float]) -> Image.Image:
    width, height = image.size
    pixels = (
        round(box[0] * width),
        round(box[1] * height),
        round(box[2] * width),
        round(box[3] * height),
    )
    return image.crop(pixels)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--m1", type=Path, required=True)
    parser.add_argument("--bpc06", type=Path, required=True)
    parser.add_argument("--bwb02", type=Path, required=True)
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("assets/exercise-library/ritfit"),
    )
    args = parser.parse_args()

    args.output.mkdir(parents=True, exist_ok=True)
    for poster_name, source in {
        "m1": args.m1,
        "bpc06": args.bpc06,
        "bwb02": args.bwb02,
    }.items():
        image = render_first_page(source)
        for asset_name, box in CROPS[poster_name].items():
            crop = crop_normalized(image, box)
            crop.save(args.output / f"{asset_name}.webp", "WEBP", quality=92, method=6)
            print(f"Wrote {asset_name}.webp ({crop.width}x{crop.height})")


if __name__ == "__main__":
    main()
