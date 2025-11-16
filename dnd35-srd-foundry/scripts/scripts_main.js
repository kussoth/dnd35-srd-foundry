// Entry point for the DnD 3.5e SRD system
import DND35ActorSheet from "./sheets/actor-sheet.js";
import DND35ItemSheet from "./sheets/item-sheet.js";

Hooks.once('init', async function() {
  console.log("DND35SRD | Initializing D&D 3.5e SRD system");

  // Expose a namespace
  game.dnd35 = {
    rollAbility: async (speaker, abilityShort, mod) => {
      const formula = `1d20 + ${Number(mod) || 0}`;
      const roll = await new Roll(formula).evaluate({async: true});
      roll.toMessage({
        speaker,
        flavor: game.i18n.format("DND35SRD.Rolls.abilityCheck", { ability: game.i18n.localize(`DND35SRD.Abilities.${abilityShort}`) })
      });
      return roll;
    },
    rollSkill: async (speaker, skillName, mod) => {
      const formula = `1d20 + ${Number(mod) || 0}`;
      const roll = await new Roll(formula).evaluate({async: true});
      roll.toMessage({
        speaker,
        flavor: game.i18n.format("DND35SRD.Rolls.skillCheck", { skill: skillName })
      });
      return roll;
    },
    rollSave: async (speaker, saveType, mod) => {
      const formula = `1d20 + ${Number(mod) || 0}`;
      const roll = await new Roll(formula).evaluate({async: true});
      roll.toMessage({
        speaker,
        flavor: game.i18n.format("DND35SRD.Rolls.save", { type: saveType })
      });
      return roll;
    },
    rollAttack: async (speaker, name, mod) => {
      const formula = `1d20 + ${Number(mod) || 0}`;
      const roll = await new Roll(formula).evaluate({async: true});
      roll.toMessage({
        speaker,
        flavor: game.i18n.format("DND35SRD.Rolls.attack", { name: name })
      });
      return roll;
    }
  };

  // Register sheets
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("dnd35-srd-foundry", DND35ActorSheet, { types: ["character", "npc"], makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("dnd35-srd-foundry", DND35ItemSheet, { makeDefault: true });

  // Handlebars helpers
  Handlebars.registerHelper('if_eq', function(a, b, opts) {
    return a === b ? opts.fn(this) : opts.inverse(this);
  });
});