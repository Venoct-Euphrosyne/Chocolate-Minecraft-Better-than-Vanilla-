import * as mc from "@minecraft/server";

mc.world.beforeEvents.playerInteractWithEntity.subscribe((event) => {
	const { player, itemStack, target } = event;

	if (target.typeId === 've:butterfly') {
		if (itemStack && itemStack.typeId === "ve:net") {
			const equippable = player.getComponent("equippable");
			const slot = equippable.getEquipmentSlot("Mainhand");

			const durability = itemStack.getComponent("durability");
			if (!durability) {
				return;
			}

			const currentDamage = durability.damage;
			const maxDamage = durability.maxDurability;

			if (currentDamage + 1 >= maxDamage) {
				mc.system.run(() => {
					equippable.setEquipment("Mainhand", new mc.ItemStack("ve:broken_net", 1));
				});
			} else {
				mc.system.run(() => {
					itemStack.getComponent("durability").damage = currentDamage + 1;
					equippable.setEquipment("Mainhand", itemStack);
				});
			}
		}
	}
});