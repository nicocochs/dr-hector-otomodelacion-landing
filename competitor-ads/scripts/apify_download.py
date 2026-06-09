#!/usr/bin/env python3
"""Descarga ads (metadata + videos) de la Meta Ad Library vía Apify.

Requiere: APIFY_TOKEN en el entorno y red habilitada hacia api.apify.com
y *.fbcdn.net. Lee competitor-ads/inventory.json y escribe:
  competitor-ads/data/<ref>.json
  competitor-ads/videos/<ref>/<ad_id>.mp4
"""
import json
import os
import re
import sys
import time
from pathlib import Path

import requests

BASE = Path(__file__).resolve().parent.parent
TOKEN = os.environ.get("APIFY_TOKEN")
ACTOR = os.environ.get("APIFY_ACTOR", "curious_coder~facebook-ads-library-scraper")
COUNTRY = "BR"

# Solo nos interesan ads de Invisalign / ortodoncia invisible. Un ad pasa el
# filtro si su metadata menciona alguna keyword, o si pertenece a la lista
# invisalign_ad_ids del inventario, o si su página es "keyword-opaque"
# (páginas chicas donde el copy no menciona el producto pero el video sí
# puede hacerlo — esos se filtran después con la transcripción).
KEYWORDS = ("invisalign", "alinhador", "invisível", "invisivel", "ortodontia")

if not TOKEN:
    sys.exit("Falta APIFY_TOKEN en el entorno.")


def ad_library_url(page_id: str) -> str:
    return (
        "https://www.facebook.com/ads/library/?active_status=active&ad_type=all"
        f"&country={COUNTRY}&is_targeted_country=false&media_type=all"
        f"&search_type=page&view_all_page_id={page_id}"
    )


def run_actor(page_id: str, limit: int = 60) -> list[dict]:
    """Corre el actor de forma síncrona y devuelve los items del dataset."""
    url = f"https://api.apify.com/v2/acts/{ACTOR}/run-sync-get-dataset-items"
    # Input compatible con curious_coder~facebook-ads-library-scraper;
    # otros actors aceptan startUrls, por eso se mandan ambos campos.
    payload = {
        "urls": [{"url": ad_library_url(page_id)}],
        "startUrls": [{"url": ad_library_url(page_id)}],
        "count": limit,
        "resultsLimit": limit,
        "scrapePageAds.activeStatus": "active",
        "period": "",
    }
    r = requests.post(url, params={"token": TOKEN, "timeout": 300}, json=payload, timeout=360)
    r.raise_for_status()
    return r.json()


def find_video_urls(obj, found=None) -> list[str]:
    """Busca recursivamente URLs .mp4 (claves *video*url) en el item."""
    if found is None:
        found = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            if isinstance(v, str) and "video" in k.lower() and v.startswith("http"):
                found.append(v)
            else:
                find_video_urls(v, found)
    elif isinstance(obj, list):
        for v in obj:
            find_video_urls(v, found)
    return found


def find_ad_id(item: dict) -> str:
    for key in ("ad_archive_id", "adArchiveID", "adArchiveId", "id", "ad_id"):
        if item.get(key):
            return str(item[key])
    return str(abs(hash(json.dumps(item, sort_keys=True))) % 10**15)


def safe_ref(name: str) -> str:
    return re.sub(r"[^a-zA-Z0-9_-]+", "_", name).strip("_").lower()


def download(url: str, dest: Path) -> bool:
    try:
        with requests.get(url, stream=True, timeout=120) as r:
            r.raise_for_status()
            dest.parent.mkdir(parents=True, exist_ok=True)
            with open(dest, "wb") as f:
                for chunk in r.iter_content(1 << 16):
                    f.write(chunk)
        return True
    except Exception as e:
        print(f"    ! error descargando {url[:80]}: {e}")
        return False


def is_invisalign_ad(item: dict, comp: dict) -> bool:
    ad_id = find_ad_id(item)
    if ad_id in comp.get("invisalign_ad_ids", []):
        return True
    if comp.get("keyword_opaque"):  # página chica: decidir post-transcripción
        return True
    blob = json.dumps(item, ensure_ascii=False).lower()
    return any(k in blob for k in KEYWORDS)


def main():
    inventory = json.loads((BASE / "inventory.json").read_text())
    summary = []
    for comp in inventory["competitors"]:
        ref = safe_ref(comp["reference"])
        print(f"== {comp['reference']} (page {comp['page_id']}) ==")
        try:
            items = run_actor(comp["page_id"])
        except Exception as e:
            print(f"  ! actor falló: {e}")
            summary.append({"ref": ref, "error": str(e)})
            continue

        if isinstance(items, list):
            before = len(items)
            items = [it for it in items if is_invisalign_ad(it, comp)]
            print(f"  filtro invisalign: {len(items)}/{before} ads")

        (BASE / "data").mkdir(parents=True, exist_ok=True)
        (BASE / "data" / f"{ref}.json").write_text(
            json.dumps(items, ensure_ascii=False, indent=1)
        )
        n_videos = 0
        for item in items if isinstance(items, list) else []:
            ad_id = find_ad_id(item)
            urls = find_video_urls(item)
            # preferir HD si existe
            urls.sort(key=lambda u: ("hd" not in u.lower(), len(u)))
            for u in urls:
                dest = BASE / "videos" / ref / f"{ad_id}.mp4"
                if dest.exists() or download(u, dest):
                    n_videos += 1
                    break
        print(f"  {len(items)} ads, {n_videos} videos descargados")
        summary.append({"ref": ref, "ads": len(items), "videos": n_videos})
        time.sleep(2)

    (BASE / "data" / "_download_summary.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=1)
    )
    print(json.dumps(summary, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
