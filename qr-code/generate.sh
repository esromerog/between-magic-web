# AI-made utility to create qr-codes based on the character IDs

#!/bin/sh
# Generates one QR code PNG per character id in app/lib/drink_characters.tsx.
# Each QR encodes <base-url>/order/<id> and is saved as <id>.png.
# Usage: qr-code/generate.sh https://your-domain.com [output-dir]
# Output defaults to qr-code/outputs (git-ignored).
set -eu

base="${1:?usage: $0 <base-url, e.g. https://your-domain.com> [output-dir]}"
base="${base%/}"
root="$(cd "$(dirname "$0")/.." && pwd)"
out="${2:-$root/qr-code/outputs}"
mkdir -p "$out"

# Lines look like:  id: "boba",
sed -n 's/^ *id: *"\([^"]*\)".*/\1/p' "$root/app/lib/drink_characters.tsx" |
while read -r id; do
  url="$base/order/$id"
  # -l L : lowest error correction -> fewest modules -> biggest squares
  # -s 40: 40px per module, -m 2: 2-module quiet zone
  # transparent background (RGBA), black modules
  qrencode -l L -m 2 -s 40 \
    --foreground=000000FF --background=00000000 \
    -o "$out/$id.png" "$url"
  echo "$id -> $url"
done
