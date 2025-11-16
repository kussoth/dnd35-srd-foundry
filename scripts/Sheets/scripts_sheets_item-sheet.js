export default class DND35ItemSheet extends ItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["dnd35", "sheet", "item"],
      template: "templates/items/item-sheet.html",
      width: 520,
      height: "auto"
    });
  }

  getData(options) {
    const data = super.getData(options);
    // Provide convenient type flags
    data.isSpell = this.item.data.type === "spell";
    data.isWeapon = this.item.data.type === "weapon";
    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Add simple chat export
    html.find('.item-to-chat').click(ev => {
      ev.preventDefault();
      const speaker = ChatMessage.getSpeaker({actor: this.item.actor});
      const content = `<h2>${this.item.name}</h2><div>${this.item.data.data?.description || this.item.data?.data?.desc || ""}</div>`;
      ChatMessage.create({ speaker, content });
    });
  }
}