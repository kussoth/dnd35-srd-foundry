```markdown
# D&D 3.5e SRD — Foundry VTT System (Scaffold)

This is a lightweight system scaffold for Foundry VTT 13 (Stable Build 351) intended to support Dungeons & Dragons 3.5e SRD-style play.

Important:
- This repository provides the system framework (actor/item sheets, roll helpers, compendia structure) but it does NOT ship SRD text/content. Populate the packs with SRD/OGL content that you are authorized to distribute.
- If you wish to include SRD text, ensure compliance with the Open Game License (OGL 1.0a) and include appropriate license text.

Installation:
1. Place this folder in your Foundry `Data/systems/` directory as `dnd35-srd-foundry`.
2. Start Foundry, open Configuration and Setup, go to Systems and enable "D&D 3.5e SRD (Foundry VTT System)".
3. Create a new World using this system, or enable it inside an existing world.

What is included:
- system.json manifest
- main system script registering sheets and helpers
- Actor and Item sheet implementations (JS + Handlebars templates)
- Lightweight dice/roll helpers for ability checks, skill checks, attacks, saves
- English localization file
- Basic CSS for the sheets
- Compendium manifest entries for Items/Spells/Feats (packs/*.db are placeholders)

Next steps / suggestions:
- Import or create compendia entries for spells, feats, monsters, items from an SRD source you have rights to.
- Extend the actor data model (in actor-sheet.js) to include class levels, BAB, saving throws calculation, skill list, spell slots, feats, etc.
- Add automation for attacks, critical confirmation, multiclassing rules, and full spellcasting rules as required by your campaign.
- Add system settings for variant rules (e.g., skill system, Gygax house rules).

If you'd like, I can:
- Add a sample character JSON demonstrating all fields.
- Implement automated attack rolls with attack bonuses, critical confirmation, and damage.
- Provide a script to bulk-import SRD content (if you supply content files).
- Expand the sheets to include class-level systems, spells per day, and prepared spell UI.

```