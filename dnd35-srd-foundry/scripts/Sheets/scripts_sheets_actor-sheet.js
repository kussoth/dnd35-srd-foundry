export default class DND35ActorSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["dnd35", "sheet", "actor"],
      template: "templates/actors/actor-sheet.html",
      width: 720,
      height: 680,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "attributes" }]
    });
  }

  getData(options) {
    const data = super.getData(options);
    // Ensure attributes exist
    data.data = data.data || {};
    data.data.abilities = data.data.abilities || {
      str: { value: 10, mod: 0 },
      dex: { value: 10, mod: 0 },
      con: { value: 10, mod: 0 },
      int: { value: 10, mod: 0 },
      wis: { value: 10, mod: 0 },
      cha: { value: 10, mod: 0 }
    };
    data.data.skills = data.data.skills || {};
    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Roll ability
    html.find('.ability-roll').click(ev => {
      ev.preventDefault();
      const btn = ev.currentTarget;
      const ability = btn.dataset.ability;
      const mod = Number(this.actor.data.data.abilities?.[ability]?.mod || 0);
      const speaker = ChatMessage.getSpeaker({actor: this.actor});
      game.dnd35.rollAbility(speaker, ability, mod);
    });

    // Skill roll
    html.find('.skill-roll').click(ev => {
      ev.preventDefault();
      const btn = ev.currentTarget;
      const skill = btn.dataset.skill;
      const mod = Number(this.actor.data.data.skills?.[skill]?.mod || 0);
      const speaker = ChatMessage.getSpeaker({actor: this.actor});
      game.dnd35.rollSkill(speaker, skill, mod);
    });

    // Save roll
    html.find('.save-roll').click(ev => {
      ev.preventDefault();
      const btn = ev.currentTarget;
      const save = btn.dataset.save;
      const mod = Number(this.actor.data.data.saves?.[save]?.mod || 0);
      const speaker = ChatMessage.getSpeaker({actor: this.actor});
      game.dnd35.rollSave(speaker, save, mod);
    });

    // Attack roll
    html.find('.attack-roll').click(ev => {
      ev.preventDefault();
      const btn = ev.currentTarget;
      const name = btn.dataset.name || this.actor.name;
      const mod = Number(btn.dataset.mod || 0);
      const speaker = ChatMessage.getSpeaker({actor: this.actor});
      game.dnd35.rollAttack(speaker, name, mod);
    });

    // Editable inputs: update actor on change
    html.find('input, textarea, select').change(ev => {
      const el = ev.currentTarget;
      const value = el.type === "checkbox" ? el.checked : el.value;
      const path = el.name;
      // Use setProperty for nested paths like "data.abilities.str.value"
      const update = {};
      setProperty(update, path, value);
      this.actor.update(update);
    });
  }
}