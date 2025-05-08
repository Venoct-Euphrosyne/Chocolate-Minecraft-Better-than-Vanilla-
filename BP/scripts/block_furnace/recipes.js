import * as mc from "@minecraft/server";
export const smokeRecipes = {}
export const blastRecipes = {
    "minecraft:copper_ore":{
        output: "minecraft:copper_ingot"
    },
    "minecraft:iron_ore":{
        output: "minecraft:iron_ingot"
    },
    "minecraft:gold_ore":{
        output: "minecraft:gold_ingot"
    },
    "minecraft:diamond_ore":{
        output: "minecraft:diamond"
    },
    "minecraft:lapis_ore":{
        output: "minecraft:lapis_lazuli"
    },
    "minecraft:redstone_ore":{
        output: "minecraft:redstone"
    },
    "minecraft:coal_ore":{
        output: "minecraft:coal"
    },
    "minecraft:emerald_ore":{
        output: "minecraft:emerald"
    },
    "minecraft:deepslate_copper_ore":{
        output: "minecraft:copper_ingot"
    },
    "minecraft:deepslate_iron_ore":{
        output: "minecraft:iron_ingot"
    },
    "minecraft:deepslate_gold_ore":{
        output: "minecraft:gold_ingot"
    },
    "minecraft:deepslate_diamond_ore":{
        output: "minecraft:diamond"
    },
    "minecraft:deepslate_lapis_ore":{
        output: "minecraft:lapis_lazuli"
    },
    "minecraft:deepslate_redstone_ore":{
        output: "minecraft:redstone"
    },
    "minecraft:deepslate_coal_ore":{
        output: "minecraft:coal"
    },
    "minecraft:deepslate_emerald_ore":{
        output: "minecraft:emerald"
    },
    "minecraft:quartz_ore":{
        output: "minecraft:quartz"
    },
    "minecraft:ancient_debris":{
        output: "minecraft:netherite_scrap"
    },
    "minecraft:nether_gold_ore":{
        output: "minecraft:gold_ingot"
    },
    "minecraft:deepslate_emerald_ore":{
        output: "minecraft:emerald"
    },
}
export const recipes = {
    "minecraft:copper_ore":{
        output: "minecraft:copper_ingot"
    },
    "minecraft:iron_ore":{
        output: "minecraft:iron_ingot"
    },
    "minecraft:gold_ore":{
        output: "minecraft:gold_ingot"
    },
    "minecraft:diamond_ore":{
        output: "minecraft:diamond"
    },
    "minecraft:lapis_ore":{
        output: "minecraft:lapis_lazuli"
    },
    "minecraft:redstone_ore":{
        output: "minecraft:redstone"
    },
    "minecraft:coal_ore":{
        output: "minecraft:coal"
    },
    "minecraft:emerald_ore":{
        output: "minecraft:emerald"
    },
    "minecraft:deepslate_copper_ore":{
        output: "minecraft:copper_ingot"
    },
    "minecraft:deepslate_iron_ore":{
        output: "minecraft:iron_ingot"
    },
    "minecraft:deepslate_gold_ore":{
        output: "minecraft:gold_ingot"
    },
    "minecraft:deepslate_diamond_ore":{
        output: "minecraft:diamond"
    },
    "minecraft:deepslate_lapis_ore":{
        output: "minecraft:lapis_lazuli"
    },
    "minecraft:deepslate_redstone_ore":{
        output: "minecraft:redstone"
    },
    "minecraft:deepslate_coal_ore":{
        output: "minecraft:coal"
    },
    "minecraft:deepslate_emerald_ore":{
        output: "minecraft:emerald"
    },
    "minecraft:quartz_ore":{
        output: "minecraft:quartz"
    },
    "minecraft:ancient_debris":{
        output: "minecraft:netherite_scrap"
    },
    "minecraft:nether_gold_ore":{
        output: "minecraft:gold_ingot"
    },
    "minecraft:deepslate_emerald_ore":{
        output: "minecraft:emerald"
    },
    "minecraft:sand":{
        output: "minecraft:glass"
    },
    "minecraft:cobblestone":{
        output: "minecraft:stone"
    },
    "minecraft:sandstone":{
        output: "minecraft:sandstone",
        outputBlockState: {
            "sand_stone_type":  "smooth"
        },
        blockState: {
            "sand_stone_type": "default"
        }
    },
    "minecraft:red_sandstone":{
        output: "minecraft:red_sandstone",
        outputBlockState: {
            "sand_stone_type":  "smooth"
        },
        blockState: {
            "sand_stone_type": "default"
        }
    },
    "minecraft:stone":{
        output: "minecraft:smooth_stone",
        blockState: {
            "stone_type": "stone"
        }
    },
    "minecraft:quartz_block":{
        output: "minecraft:quartz_block",
        outputBlockState: {
            "chisel_type":  "smooth"
        },
        blockState: {
            "chisel_type": "default"
        }
    },
    "minecraft:netherrack":{
        output: "minecraft:netherbrick"
    },
    "minecraft:nether_brick":{
        output: "minecraft:cracked_nether_bricks"
    },
    "minecraft:basalt":{
        output: "minecraft:smooth_basalt"
    },
    "minecraft:clay":{
        output: "minecraft:hardened_clay"
    },
    "minecraft:stonebrick":{
        output: "minecraft:stonebrick",
        outputBlockState: {
            "stone_brick_type":  "cracked"
        },
        blockState: {
            "stone_brick_type": "default"
        }
    },
    "minecraft:polished_blackstone_bricks":{
        output: "minecraft:cracked_polished_blackstone_bricks"
    },
    "minecraft:coobled_deepslate":{
        output: "minecraft:deepslate"
    },
    "minecraft:deepslate_bricks":{
        output: "minecraft:cracked_deepslate_bricks"
    },
    "minecraft:deepslate_tiles":{
        output: "minecraft:cracked_deepslate_tiles"
    },
    "minecraft:stained_hardened_clay":{
        //hardcoded apenas quem entende de js
        scriptedOutput: function(item=MC.ItemStack("air")){
            let colorValues = MC.BlockStates.get("color").validValues
            for(let i = 0; i < colorValues.length; i++){
                let condition = `{"color": "${colorValues[i]}"}`
                let block = MC.BlockPermutation.resolve(item.typeId, JSON.parse(condition))
                let itemCompare = block.getItemStack(1)
                if(item.isStackableWith(itemCompare)){
                    let output = new MC.ItemStack(`minecraft:${colorValues[i]}_glazed_terracotta`) 
                    return output
                }
            }
        }
    },
    "minecraft:cactus":{
        output: "minecraft:green_dye"
    },
    "minecraft:oak_log":{
        output: "minecraft:charcoal"
    },
    "minecraft:spruce_log":{
        output: "minecraft:charcoal"
    },
    "minecraft:birch_log":{
        output: "minecraft:charcoal"
    },
    "minecraft:jungle_log":{
        output: "minecraft:charcoal"
    },
    "minecraft:acacia_log":{
        output: "minecraft:charcoal"
    },
    "minecraft:dark_oak_log":{
        output: "minecraft:charcoal"
    },
    "minecraft:cherry_log":{
        output: "minecraft:charcoal"
    },
    "minecraft:mangrove_log":{
        output: "minecraft:charcoal"
    },
    "minecraft:stripped_oak_log":{
        output: "minecraft:charcoal"
    },
    "minecraft:stripped_spruce_log":{
        output: "minecraft:charcoal"
    },
    "minecraft:stripped_birch_log":{
        output: "minecraft:charcoal"
    },
    "minecraft:stripped_jungle_log":{
        output: "minecraft:charcoal"
    },
    "minecraft:stripped_acacia_log":{
        output: "minecraft:charcoal"
    },
    "minecraft:stripped_dark_oak_log":{
        output: "minecraft:charcoal"
    },
    "minecraft:stripped_cherry_log":{
        output: "minecraft:charcoal"
    },
    "minecraft:stripped_mangrove_log":{
        output: "minecraft:charcoal"
    },
    "minecraft:wood":{
        output: "minecraft:charcoal"
    }
}