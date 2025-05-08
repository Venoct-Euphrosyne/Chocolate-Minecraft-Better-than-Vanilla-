import * as mc from "@minecraft/server";
import { fuels } from "./fuels.js";
import { recipes, smokeRecipes, blastRecipes } from "./recipes.js";

const furnaceTypes = [
	"reinforced"
];

const INPUT_SLOT = 0;
const FUEL_SLOT = 1;
const OUTPUT_SLOT = 4;
const HOPPER_TRANSFER_RATE = 8; // 2.5 items/sec = 1 item every 8 ticks

mc.system.runInterval(() => {
    // Get all furnace containers
    const furnaceEntities = mc.world.getDimension("overworld").getEntities({
        type: "block_furnace:furnace_container"
    });

    for (const furnace of furnaceEntities) {
        const inventory = furnace.getComponent("inventory").container;
        const location = furnace.location;

        // Check for hoppers above (input)
        const blockAbove = furnace.dimension.getBlock({ x: location.x, y: location.y + 1, z: location.z });
        if (blockAbove?.typeId === "minecraft:hopper") {
            const hopperAbove = blockAbove.getComponent("inventory").container;
            transferFromHopper(hopperAbove, inventory, INPUT_SLOT);
        }

        // Check for hoppers on sides (fuel)
        const sidePositions = [
            { x: location.x + 1, y: location.y, z: location.z },
            { x: location.x - 1, y: location.y, z: location.z },
            { x: location.x, y: location.y, z: location.z + 1 },
            { x: location.x, y: location.y, z: location.z - 1 }
        ];

        for (const pos of sidePositions) {
            const sideBlock = furnace.dimension.getBlock(pos);
            if (sideBlock?.typeId === "minecraft:hopper") {
                const hopperSide = sideBlock.getComponent("inventory").container;
                transferFromHopper(hopperSide, inventory, FUEL_SLOT);
            }
        }

        // Check for hopper below (output)
        const blockBelow = furnace.dimension.getBlock({ x: location.x, y: location.y - 1, z: location.z });
        if (blockBelow?.typeId === "minecraft:hopper") {
            const hopperBelow = blockBelow.getComponent("inventory").container;
            transferToHopper(inventory, hopperBelow, OUTPUT_SLOT);
        }
    }
}, HOPPER_TRANSFER_RATE);

function transferFromHopper(hopperInv, furnaceInv, targetSlot) {
    // Get current item in furnace slot
    const currentItem = furnaceInv.getItem(targetSlot);
    
    // If slot is empty or has space
    if (!currentItem || currentItem.amount < 64) {
        // Check hopper slots
        for (let i = 0; i < hopperInv.size; i++) {
            const hopperItem = hopperInv.getItem(i);
            if (!hopperItem) continue;

            // If furnace slot is empty, transfer one item
            if (!currentItem) {
                const newItem = hopperItem.clone();
                newItem.amount = 1;
                furnaceInv.setItem(targetSlot, newItem);
                
                if (hopperItem.amount > 1) {
                    hopperItem.amount--;
                    hopperInv.setItem(i, hopperItem);
                } else {
                    hopperInv.setItem(i, undefined);
                }
                break;
            }
            // If items match and there's space, add one
            else if (hopperItem.typeId === currentItem.typeId && currentItem.amount < 64) {
                currentItem.amount++;
                furnaceInv.setItem(targetSlot, currentItem);
                
                if (hopperItem.amount > 1) {
                    hopperItem.amount--;
                    hopperInv.setItem(i, hopperItem);
                } else {
                    hopperInv.setItem(i, undefined);
                }
                break;
            }
        }
    }
}

function transferToHopper(furnaceInv, hopperInv, sourceSlot) {
    const outputItem = furnaceInv.getItem(sourceSlot);
    if (!outputItem) return;

    // Look for matching stack in hopper with space
    for (let i = 0; i < hopperInv.size; i++) {
        const hopperItem = hopperInv.getItem(i);
        
        // Empty slot or matching item with space
        if (!hopperItem || (hopperItem.typeId === outputItem.typeId && hopperItem.amount < 64)) {
            if (!hopperItem) {
                const newItem = outputItem.clone();
                newItem.amount = 1;
                hopperInv.setItem(i, newItem);
            } else {
                hopperItem.amount++;
                hopperInv.setItem(i, hopperItem);
            }

            if (outputItem.amount > 1) {
                outputItem.amount--;
                furnaceInv.setItem(sourceSlot, outputItem);
            } else {
                furnaceInv.setItem(sourceSlot, undefined);
            }
            break;
        }
    }
}

mc.world.afterEvents.playerPlaceBlock.subscribe((event) => {
	const { player, block, dimension } = event;
	const blockPlace = block.getItemStack();

	for (const type of furnaceTypes) {
		if (blockPlace.typeId === `block_furnace:${type}_furnace`) {
			dimension.runCommand(`summon block_furnace:furnace_container block_furnace.${type}_furnace ${block.location.x} ${block.location.y} ${block.location.z}`);
			break;
		}
	}
});

mc.system.afterEvents.scriptEventReceive.subscribe((data) => {
	if (data.id == "block_furnace:despawn") {
		let entity = data.sourceEntity;
		if (entity.typeId === "block_furnace:furnace_container") {
			let inventory = entity.getComponent("inventory").container;
			let inputSlot = inventory.getItem(0);
			let fuelSlot = inventory.getItem(1);
			let outputSlot = inventory.getItem(4);
			inputSlot ? entity.dimension.spawnItem(inputSlot, entity.location) : null;
			fuelSlot ? entity.dimension.spawnItem(fuelSlot, entity.location) : null;
			outputSlot ? entity.dimension.spawnItem(outputSlot, entity.location) : null;
			data.sourceEntity.remove();
		}
	}
	else if (data.id === "block_furnace:furnace_system") {
		const inv = data.sourceEntity.getComponent("inventory").container;
		const entity = data.sourceEntity;

		let inputSlot = inv.getItem(0);
		let fuelSlot = inv.getItem(1);
		let arrowSlot = inv.getItem(2);
		let flameSlot = inv.getItem(3);
		let outputSlot = inv.getItem(4);
		let entityLocation = entity.location
		let block = entity.dimension.getBlock(entityLocation)

		const arrowScore = mc.world.scoreboard.getObjective("arrowScore").getScore(entity.scoreboardIdentity)
		const arrowTick = mc.world.scoreboard.getObjective("arrowTick").getScore(entity.scoreboardIdentity)
		const fuelScore = mc.world.scoreboard.getObjective("fuelScore").getScore(entity.scoreboardIdentity)
		const fuelScoreTick = mc.world.scoreboard.getObjective("fuelScoreTick").getScore(entity.scoreboardIdentity)
		const fuelScoreAmount = mc.world.scoreboard.getObjective("fuelScoreAmount").getScore(entity.scoreboardIdentity)
		const tickNumber = mc.world.scoreboard.getObjective("tickNumber").getScore(entity.scoreboardIdentity)
		let arrowDuration

		// Register Furnaces
		if (block.getItemStack()?.typeId == "block_furnace:reinforced_furnace") {
			arrowDuration = 3
		}
		else entity.removeTag("blueFlame")

		if (!inputSlot) {
			mc.world.scoreboard.getObjective("arrowScore").setScore(entity, 0)
			mc.world.scoreboard.getObjective("arrowTick").setScore(entity, 0)
		}

		function updateArrow(arrowScore) {
			const arrowItem = new mc.ItemStack("block_furnace:arrow_" + arrowScore);
			inv.setItem(2, arrowItem);
		}
		if (arrowScore >= 0 && arrowScore <= 22) {
			updateArrow(arrowScore);
		}

		function updateFlame(fuelScore) {
			if (entity.hasTag("blueFlame")) {
				const flameItem = new mc.ItemStack("block_furnace:blue_flame_" + fuelScore);
				inv.setItem(3, flameItem);
			} else {
				const flameItem = new mc.ItemStack("block_furnace:flame_" + fuelScore);
				inv.setItem(3, flameItem);
			}
		}
		if (fuelScore >= 0 && fuelScore <= 13) {
			updateFlame(fuelScore);
		}

		let inputItem = recipes[inputSlot?.typeId]
		if (inputItem && inputSlot && (!outputSlot || outputSlot?.typeId == recipes[inputSlot.typeId].output && outputSlot.amount < 64)) {
			if (entity.hasTag("blast")) inputItem = blastRecipes[inputSlot.typeId];
			if (entity.hasTag("smoke")) inputItem = smokeRecipes[inputSlot.typeId];
			if (inputItem && "blockState" in recipes[inputSlot.typeId]) inputItem = inputSlot.matches(inputSlot.typeId, recipes[inputSlot.typeId].blockState) ? true : false;
			if (inputItem && fuelScore > 0) {
				mc.world.scoreboard.getObjective("arrowTick").setScore(entity, arrowTick + 4)
				if (arrowScore < 23 && arrowTick >= arrowDuration) {
					if (entity.hasTag("blueFlame") || entity.hasTag("rainbow_furnace")) {
						mc.world.scoreboard.getObjective("arrowScore").setScore(entity, arrowScore + 2)
					} else {
						mc.world.scoreboard.getObjective("arrowScore").setScore(entity, arrowScore + 1)
					}
				}
				if (arrowTick >= arrowDuration) {
					mc.world.scoreboard.getObjective("arrowTick").setScore(entity, 0)
				}
				if (arrowScore >= 15) {
					mc.world.scoreboard.getObjective("arrowScore").setScore(entity, 0)
					let chance = Math.random()
					if (chance < 0.2) {
						entity.dimension.spawnEntity("minecraft:xp_orb", entityLocation)
						entity.dimension.spawnEntity("minecraft:xp_orb", entityLocation)
					}
					let outputItem = new mc.ItemStack(recipes[inputSlot.typeId].output)
					if ("outputBlockState" in recipes[inputSlot.typeId]) {
						outputItem = mc.BlockPermutation.resolve(recipes[inputSlot.typeId].output, recipes[inputSlot.typeId].outputBlockState).getItemStack()
					}
					
					if (outputSlot?.amount >= 1) {
						outputSlot.amount++
						inv.setItem(4, outputSlot)
					}
					if (!outputSlot) {
						inv.setItem(4, outputItem)
					}
					if (inputSlot.amount == 1) {
						inv.setItem(0,)
					}
					if (inputSlot.amount > 1) {
						inputSlot.amount--
						inv.setItem(0, inputSlot)
					}
				}
			}
		}
		let fuelItem = fuels[fuelSlot?.typeId]
		if (fuelSlot && fuelItem && inputItem) {
			if (fuelSlot?.amount > 1) {
				mc.world.scoreboard.getObjective("tickNumber").setScore(entity, fuels[fuelSlot.typeId].duration)

				mc.world.scoreboard.getObjective("fuelScoreAmount").setScore(entity, fuelSlot.amount)
			}

			if (fuelScore == 0) {
				if ("transformToItem" in fuels[fuelSlot.typeId]) {
					let transformedItem = new mc.ItemStack(fuels[fuelSlot.typeId].transformToItem)
					entity.runCommandAsync(`scoreboard players set @s tickNumber ${fuels[fuelSlot.typeId].duration}`).then(minho => {
						entity.runCommand(`scoreboard players set @s fuelScoreTick ${fuels[fuelSlot.typeId].duration}`)
					})
					mc.system.runTimeout((minho) => {
						inv.setItem(1, transformedItem)
					}, 6)
				}
				mc.world.scoreboard.getObjective("fuelScoreTick").setScore(entity, tickNumber)
			}
			if (fuelScore == 0 && fuelScoreTick >= tickNumber) {
				if (fuelSlot?.amount == 1) {
					if (fuelSlot?.typeId == "block_furnace:rainbow_coal") {
						mc.world.scoreboard.getObjective("tickNumber").setScore(entity, fuels[fuelSlot.typeId].duration)
						let durability = fuelSlot.getComponent("minecraft:durability")
						let remainingDurability = durability.maxDurability - durability.damage
						if (remainingDurability == 1) {
							inv.setItem(1,)
						} else {
							durability.damage += 1
							fuelSlot.setLore([`§7${remainingDurability}/${durability.maxDurability}`])
							inv.setItem(1, fuelSlot)
						}
					} else {
						inv.setItem(1,)
					}
					mc.world.scoreboard.getObjective("fuelScoreAmount").setScore(entity, 1)
				}
				if (fuelSlot?.amount > 1) {
					fuelSlot.amount -= 1
					inv.setItem(1, fuelSlot)
				}
				mc.world.scoreboard.getObjective("fuelScore").setScore(entity, 1)
				mc.world.scoreboard.getObjective("fuelScoreTick").setScore(entity, 0)
			}
		}
		if (fuelScoreAmount > 0 && fuelScore < 14) {
			mc.world.scoreboard.getObjective("fuelScoreTick").setScore(entity, fuelScoreTick + 1)
			if (fuelScoreTick >= tickNumber) {
				mc.world.scoreboard.getObjective("fuelScore").setScore(entity, fuelScore + 1)
				mc.world.scoreboard.getObjective("fuelScoreTick").setScore(entity, 0)
			}
		}
		if (fuelScore == 14) {
			if (fuelScoreAmount == fuelScoreAmount) {
				mc.world.scoreboard.getObjective("fuelScoreAmount").setScore(entity, 0)
			}
			mc.world.scoreboard.getObjective("fuelScore").setScore(entity, 0)
			mc.world.scoreboard.getObjective("fuelScoreTick").setScore(entity, 0)
		}

		const currentPermutation = block.permutation;
		if(block.typeId != "minecraft:air")
		{
			if (fuelScore > 0) {
				block.setPermutation(currentPermutation.withState("block_furnace:lit", true));
			} else {
				block.setPermutation(currentPermutation.withState("block_furnace:lit", false));
			}
		}
	}
})
