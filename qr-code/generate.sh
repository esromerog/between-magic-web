#!/bin/sh
# Generates one QR code (PNG + SVG) per location in app/order/recap/locations.ts.
# Usage: qr-code/generate.sh https://your-domain.com [output-dir]
set -eu

base="${1:?usage: $0 <base-url, e.g. https://your-domain.com> [output-dir]}"
base="${base%/}"
root="$(cd "$(dirname "$0")/.." && pwd)"
out="${2:-$root/qr-code}"
mkdir -p "$out"

# Lines look like:  "location-1": "Room640",
sed -n 's/^ *"\(location-[^"]*\)": *"\([^"]*\)".*/\1 \2/p' \
  "$root/app/order/recap/locations.ts" |
while read -r code tag; do
  url="$base/?location=$code"
  qrencode -l H -m 4 -s 20 -o "$out/$tag.png" "$url"
  qrencode -l H -m 4 -t SVG -o "$out/$tag.svg" "$url"
  echo "$tag -> $url"
done
