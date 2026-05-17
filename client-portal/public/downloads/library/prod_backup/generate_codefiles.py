import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from data_einfuehrungen import r_bachelor, r_master, python_bachelor, python_master, spss_bachelor, spss_master

BASE = r"C:\Users\Kevalon\OneDrive\Documents\GlockConsulting\local\downloads\05_introductions"

def write_code_files(sprache, ext, level, data, prefix):
    lines = []
    lines.append(f"# {prefix} — {sprache} Code ({level})")
    lines.append(f"# Aus dem Einf\u00fchrungsdokument extrahiert\n")
    for section_title, steps in data:
        lines.append(f"# {'='*60}")
        lines.append(f"# {section_title}")
        lines.append(f"# {'='*60}\n")
        for step_title, code, explanation, expected_output in steps:
            lines.append(f"# {step_title}")
            lines.append(f"# {explanation}\n")
            lines.append(code)
            lines.append("")
    fn = f"code_{sprache.lower()}_{level.replace(' ', '_').lower()}.{ext}"
    path = os.path.join(BASE, fn)
    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"  {fn}")

write_code_files("R", "R", "standard", r_bachelor, "GSC Services")
write_code_files("R", "R", "advanced", r_master, "GSC Services")
write_code_files("Python", "py", "standard", python_bachelor, "GSC Services")
write_code_files("Python", "py", "advanced", python_master, "GSC Services")
write_code_files("SPSS", "sps", "standard", spss_bachelor, "GSC Services")
write_code_files("SPSS", "sps", "advanced", spss_master, "GSC Services")

print("6 Code-Dateien erstellt.")
