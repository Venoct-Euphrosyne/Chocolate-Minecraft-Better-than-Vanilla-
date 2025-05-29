import { world } from "@minecraft/server";

world.afterEvents.itemUse.subscribe(({ source, itemStack }) => {
    if (itemStack.typeId !== "ve:one") return;

    const entity = source.dimension.spawnEntity("ve:butterfly", source.location);

    entity.triggerEvent('ve:b_1');

});