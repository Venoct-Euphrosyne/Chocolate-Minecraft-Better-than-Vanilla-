import { world } from "@minecraft/server";

world.afterEvents.itemUse.subscribe(({ source, itemStack }) => {
    if (itemStack.typeId !== "ve:two") return;

    const entity = source.dimension.spawnEntity("ve:butterfly", source.location);

    entity.triggerEvent('ve:b_2');

});