"""Prepare first-party SVGs as staggered, readable evidence sequences."""
from pathlib import Path
import json
import re
import xml.etree.ElementTree as ET

ET.register_namespace('', 'http://www.w3.org/2000/svg')
ns = '{http://www.w3.org/2000/svg}'
result = {}
for file in Path('public/brand/heroes').glob('*.svg'):
    source = re.sub(r'<style>.*?</style>', '', file.read_text(), flags=re.S)
    source = source.replace('../backgrounds/', '/brand/backgrounds/')
    root = ET.fromstring(source)
    children = list(root)
    for child in children:
        root.remove(child)
    phase = 0
    group = None
    for child in children:
        tag = child.tag.removeprefix(ns)
        # The section supplies its own surface; discard the kit's standalone
        # canvas so the artwork inherits the page palette without a cream box.
        if tag == 'rect' and child.get('width') == '600' and child.get('height') == '410':
            continue
        if tag in ['title', 'desc', 'defs']:
            root.append(child)
            continue
        # Keep provenance labels still and legible throughout every sequence.
        if tag == 'text' and float(child.get('y', '0')) >= 380:
            group = None
            root.append(child)
            continue
        if tag == 'text' and group is not None:
            group.append(child)
            continue
        group = None
        if tag in ['rect', 'circle', 'ellipse', 'image', 'g']:
            group = ET.SubElement(root, ns+'g', {'class': 'sequence-node', 'style': f'--phase-delay:{(phase%5)*0.55:.2f}s'})
            child.set('class', re.sub(r'\b(pulse|rise)\b', '', child.get('class','')).strip())
            group.append(child)
            phase += 1
        else:
            if tag in ['path', 'line', 'polyline'] and len(child.get('d', '')) < 1800:
                if child.get('fill', 'none') == 'none' or 'trace' in child.get('class','') or 'route' in child.get('class',''):
                    child.set('class', 'sequence-connection')
                    child.set('pathLength', '100')
                    child.set('style', f'--phase-delay:{0.6+(phase%3)*0.5:.2f}s')
            root.append(child)
    result[file.stem] = ET.tostring(root, encoding='unicode')
Path('src/data/hero-art.json').write_text(json.dumps(result, indent=2)+'\n')
