import { Block } from "@minecraft/server";

//set block wall tag here
const wallTag = 'wall:is_wall'

// Verify is not solid
function isSolidBlock(block) {
    if (!block) return false;
    if (block.isAir || block.isLiquid) return false;

//Down here you add the bloksookslocks you need
    const nonSolidTypes = [
        // wood types
        "minecraft:acacia_button",
        "minecraft:acacia_door",
        "minecraft:acacia_fence",
        "minecraft:acacia_pressure_plate",
        "minecraft:acacia_stairs",
        "minecraft:acacia_slab",
        "minecraft:acacia_hanging_sign",
        "minecraft:acacia_leaves",
        "minecraft:acacia_trapdoor",
        "minecraft:acacia_sapling",
        "minecraft:oak_button",
        "minecraft:oak_door",
        "minecraft:oak_fence",
        "minecraft:oak_pressure_plate",
        "minecraft:oak_stairs",
        "minecraft:oak_slab",
        "minecraft:oak_hanging_sign",
        "minecraft:oak_leaves",
        "minecraft:oak_trapdoor",
        "minecraft:oak_sapling",
        "minecraft:dark_oak_button",
        "minecraft:dark_oak_door",
        "minecraft:dark_oak_fence",
        "minecraft:dark_oak_pressure_plate",
        "minecraft:dark_oak_stairs",
        "minecraft:dark_oak_slab",
        "minecraft:dark_oak_hanging_sign",
        "minecraft:dark_oak_leaves",
        "minecraft:dark_oak_trapdoor",
        "minecraft:dark_oak_sapling",
        "minecraft:birch_button",
        "minecraft:birch_door",
        "minecraft:birch_fence",
        "minecraft:birch_pressure_plate",
        "minecraft:birch_stairs",
        "minecraft:birch_slab",
        "minecraft:birch_hanging_sign",
        "minecraft:birch_leaves",
        "minecraft:birch_trapdoor",
        "minecraft:birch_sapling",
        "minecraft:cherry_button",
        "minecraft:cherry_door",
        "minecraft:cherry_fence",
        "minecraft:cherry_pressure_plate",
        "minecraft:cherry_stairs",
        "minecraft:cherry_slab",
        "minecraft:cherry_hanging_sign",
        "minecraft:cherry_leaves",
        "minecraft:cherry_trapdoor",
        "minecraft:cherry_sapling",
        "minecraft:jungle_button",
        "minecraft:jungle_door",
        "minecraft:jungle_fence",
        "minecraft:jungle_pressure_plate",
        "minecraft:jungle_stairs",
        "minecraft:jungle_slab",
        "minecraft:jungle_hanging_sign",
        "minecraft:jungle_leaves",
        "minecraft:jungle_trapdoor",
        "minecraft:jungle_sapling",
        "minecraft:spruce_button",
        "minecraft:spruce_door",
        "minecraft:spruce_fence",
        "minecraft:spruce_pressure_plate",
        "minecraft:spruce_stairs",
        "minecraft:spruce_slab",
        "minecraft:spruce_hanging_sign",
        "minecraft:spruce_leaves",
        "minecraft:spruce_trapdoor",
        "minecraft:spruce_sapling",
        "minecraft:pale_oak_button",
        "minecraft:pale_oak_door",
        "minecraft:pale_oak_fence",
        "minecraft:pale_oak_pressure_plate",
        "minecraft:pale_oak_stairs",
        "minecraft:pale_oak_slab",
        "minecraft:pale_oak_hanging_sign",
        "minecraft:pale_oak_leaves",
        "minecraft:pale_oak_trapdoor",
        "minecraft:pale_oak_sapling",
        "minecraft:mangrove_button",
        "minecraft:mangrove_door",
        "minecraft:mangrove_fence",
        "minecraft:mangrove_pressure_plate",
        "minecraft:mangrove_stairs",
        "minecraft:mangrove_slab",
        "minecraft:mangrove_hanging_sign",
        "minecraft:mangrove_leaves",
        "minecraft:mangrove_trapdoor",
        "minecraft:mangrove_sapling",
        "minecraft:bamboo_button",
        "minecraft:bamboo_door",
        "minecraft:bamboo_fence",
        "minecraft:bamboo_pressure_plate",
        "minecraft:bamboo_stairs",
        "minecraft:bamboo_slab",
        "minecraft:bamboo_mosaic_stairs",
        "minecraft:bamboo_mosaic_slab",
        "minecraft:bamboo_hanging_sign",
        "minecraft:bamboo_leaves",
        "minecraft:bamboo_trapdoor",
        "minecraft:bamboo_sapling",
        // nether wood
        "minecraft:warped_button",
        "minecraft:warped_door",
        "minecraft:warped_fence",
        "minecraft:warped_pressure_plate",
        "minecraft:warped_stairs",
        "minecraft:warped_slab",
        "minecraft:warped_hanging_sign",
        "minecraft:warped_leaves",
        "minecraft:warped_trapdoor",
        "minecraft:warped_sapling",
        "minecraft:crimson_button",
        "minecraft:crimson_door",
        "minecraft:crimson_fence",
        "minecraft:crimson_pressure_plate",
        "minecraft:crimson_stairs",
        "minecraft:crimson_slab",
        "minecraft:crimson_hanging_sign",
        "minecraft:crimson_leaves",
        "minecraft:crimson_trapdoor",
        "minecraft:crimson_sapling",
        //signs
        "minecraft:oak_sign",
"minecraft:spruce_sign",
"minecraft:birch_sign",
"minecraft:jungle_sign",
"minecraft:acacia_sign",
"minecraft:dark_oak_sign",
"minecraft:crimson_sign",
"minecraft:warped_sign",
"minecraft:mangrove_sign",
"minecraft:bamboo_sign",
"minecraft:cherry_sign",
"minecraft:oak_wall_sign",
"minecraft:spruce_wall_sign",
"minecraft:birch_wall_sign",
"minecraft:jungle_wall_sign",
"minecraft:acacia_wall_sign",
"minecraft:dark_oak_wall_sign",
"minecraft:crimson_wall_sign",
"minecraft:warped_wall_sign",
"minecraft:mangrove_wall_sign",
"minecraft:bamboo_wall_sign",
"minecraft:cherry_wall_sign",
"minecraft:oak_standing_sign",
"minecraft:spruce_standing_sign",
"minecraft:birch_standing_sign",
"minecraft:jungle_standing_sign",
"minecraft:acacia_standing_sign",
"minecraft:dark_oak_standing_sign",
"minecraft:crimson_standing_sign",
"minecraft:warped_standing_sign",
"minecraft:mangrove_standing_sign",
"minecraft:bamboo_standing_sign",
"minecraft:cherry_standing_sign",
"minecraft:standing_sign",
"minecraft:sign",
        // chests
        "minecraft:chest",
        "minecraft:trapped_chest",
        "minecraft:ender_chest",
        // shulker boxes
        "minecraft:white_shulker_box",
        "minecraft:orange_shulker_box",
        "minecraft:magenta_shulker_box",
        "minecraft:light_blue_shulker_box",
        "minecraft:yellow_shulker_box",
        "minecraft:lime_shulker_box",
        "minecraft:pink_shulker_box",
        "minecraft:gray_shulker_box",
        "minecraft:silver_shulker_box",
        "minecraft:cyan_shulker_box",
        "minecraft:undyed_shulker_box",
        "minecraft:blue_shulker_box",
        "minecraft:brown_shulker_box",
        "minecraft:green_shulker_box",
        "minecraft:red_shulker_box",
        "minecraft:black_shulker_box",
        // plants
        "minecraft:dandelion",
        "minecraft:poppy",
        "minecraft:blue_orchid",
        "minecraft:allium",
        "minecraft:azure_bluet",
        "minecraft:red_tulip",
        "minecraft:orange_tulip",
        "minecraft:white_tulip",
        "minecraft:pink_tulip",
        "minecraft:oxeye_daisy",
        "minecraft:sunflower",
        "minecraft:lilac",
        "minecraft:rose_bush",
        "minecraft:peony",
        "minecraft:cornflower",
        "minecraft:lily_of_the_valley",
        "minecraft:wither_rose",
        "minecraft:torchflower",
        "minecraft:pitcher_plant",
        "minecraft:grass",
        "minecraft:tall_grass",
        "minecraft:fern",
        "minecraft:large_fern",
        "minecraft:dead_bush",
        "minecraft:short_grass",
        "minecraft:sweet_berry_bush",
        "minecraft:seagrass",
        "minecraft:kelp",
        "minecraft:tall_seagrass",
        "minecraft:azalea",
        "minecraft:flowering_azalea",
        "minecraft:mangrove_propagule",
        "minecraft:firefly_bush",
        "minecraft:short_dry_grass",
        "minecraft:tall_dry_grass",
        "minecraft:bush",
        "minecraft:moss_carpet",
        "minecraft:pale_moss_carpet",        
        "minecraft:wheat_seed_crop",
        "minecraft:wheat_crop",
        "minecraft:wheat",
        "minecraft:crop",
        "minecraft:potatoes",
        "minecraft:carrots",
        "minecraft:beetroot",
        "minecraft:melon_stem",
        "minecraft:pumpkin_stem",
        "minecraft:torchflower_crop",
        "minecraft:pitcher_crop",
        "minecraft:glow_berries",
        "minecraft:cave_vines",
        "minecraft:cave_vines_body_with_berries",
        "minecraft:cave_vines_head_with_berries",
        // carpets
        "minecraft:white_carpet",
        "minecraft:orange_carpet",
        "minecraft:magenta_carpet",
        "minecraft:light_blue_carpet",
        "minecraft:yellow_carpet",
        "minecraft:lime_carpet",
        "minecraft:pink_carpet",
        "minecraft:gray_carpet",
        "minecraft:light_gray_carpet",
        "minecraft:cyan_carpet",
        "minecraft:purple_carpet",
        "minecraft:blue_carpet",
        "minecraft:brown_carpet",
        "minecraft:green_carpet",
        "minecraft:red_carpet",
        "minecraft:black_carpet",
        // Regular Copper
        "minecraft:copper_slab",
        "minecraft:copper_trapdoor",
        "minecraft:copper_door",
        "minecraft:copper_button",
        "minecraft:copper_stairs",
        // Weathered Copper
        "minecraft:weathered_copper_slab",
        "minecraft:weathered_copper_trapdoor",
        "minecraft:weathered_copper_door",
        "minecraft:weathered_copper_button",
        "minecraft:weathered_copper_stairs",
        // Oxidized Copper
        "minecraft:oxidized_copper_slab",
        "minecraft:oxidized_copper_trapdoor",
        "minecraft:oxidized_copper_door",
        "minecraft:oxidized_copper_button",
        "minecraft:oxidized_copper_stairs",
        // Exposed Copper 
        "minecraft:exposed_copper_slab",
        "minecraft:exposed_copper_trapdoor",
        "minecraft:exposed_copper_door",
        "minecraft:exposed_copper_button",
        "minecraft:exposed_copper_stairs",
        // Waxed Copper Variants
        "minecraft:waxed_copper_slab",
        "minecraft:waxed_copper_trapdoor",
        "minecraft:waxed_copper_door",
        "minecraft:waxed_copper_button",
        "minecraft:waxed_copper_stairs",
        "minecraft:waxed_weathered_copper_slab",
        "minecraft:waxed_weathered_copper_trapdoor",
        "minecraft:waxed_weathered_copper_door",
        "minecraft:waxed_weathered_copper_button",
        "minecraft:waxed_weathered_copper_stairs",
        "minecraft:waxed_oxidized_copper_slab",
        "minecraft:waxed_oxidized_copper_trapdoor",
        "minecraft:waxed_oxidized_copper_door",
        "minecraft:waxed_oxidized_copper_button",
        "minecraft:waxed_oxidized_copper_stairs",
        "minecraft:waxed_exposed_copper_slab",
        "minecraft:waxed_exposed_copper_trapdoor",
        "minecraft:waxed_exposed_copper_door",
        "minecraft:waxed_exposed_copper_button",
        "minecraft:waxed_exposed_copper_stairs",
        // beds   
        "minecraft:bed",   
        "minecraft:white_bed",
        "minecraft:orange_bed",
        "minecraft:magenta_bed",
        "minecraft:light_blue_bed",
        "minecraft:yellow_bed",
        "minecraft:lime_bed",
        "minecraft:pink_bed",
        "minecraft:gray_bed",
        "minecraft:light_gray_bed",
        "minecraft:cyan_bed",
        "minecraft:purple_bed",
        "minecraft:blue_bed",
        "minecraft:brown_bed",
        "minecraft:green_bed",
        "minecraft:red_bed",
        "minecraft:black_bed",
        // rest of slab types
        "minecraft:stone_slab",
        "minecraft:smooth_stone_slab",
        "minecraft:cobblestone_slab",
        "minecraft:smooth_sandstone_slab",
        "minecraft:sandstone_slab",
        "minecraft:cut_sandstone_slab",
        "minecraft:granite_slab",
        "minecraft:polished_granite_slab",
        "minecraft:diorite_slab",
        "minecraft:polished_diorite_slab",
        "minecraft:andesite_slab",
        "minecraft:polished_andesite_slab",
        "minecraft:red_sandstone_slab",
        "minecraft:cut_red_sandstone_slab",
        "minecraft:mossy_cobblestone_slab",
        "minecraft:mossy_stone_brick_slab",
        "minecraft:stone_brick_slab",
        "minecraft:nether_brick_slab",
        "minecraft:red_nether_brick_slab",
        "minecraft:blackstone_slab",
        "minecraft:polished_blackstone_slab",
        "minecraft:polished_blackstone_brick_slab",
        "minecraft:end_stone_brick_slab",
        "minecraft:quartz_slab",
        "minecraft:smooth_quartz_slab",
        "minecraft:prismarine_slab",
        "minecraft:prismarine_brick_slab",
        "minecraft:dark_prismarine_slab",
        "minecraft:deepslate_slab",
        "minecraft:polished_deepslate_slab",
        "minecraft:deepslate_brick_slab",
        "minecraft:deepslate_tile_slab",
        // rest of stair types
        "minecraft:stone_stairs",
        "minecraft:smooth_stone_stairs",
        "minecraft:cobblestone_stairs",
        "minecraft:smooth_sandstone_stairs",
        "minecraft:sandstone_stairs",
        "minecraft:cut_sandstone_stairs",
        "minecraft:granite_stairs",
        "minecraft:polished_granite_stairs",
        "minecraft:diorite_stairs",
        "minecraft:polished_diorite_stairs",
        "minecraft:andesite_stairs",
        "minecraft:polished_andesite_stairs",
        "minecraft:red_sandstone_stairs",
        "minecraft:cut_red_sandstone_stairs",
        "minecraft:mossy_cobblestone_stairs",
        "minecraft:mossy_stone_brick_stairs",
        "minecraft:stone_brick_stairs",
        "minecraft:nether_brick_stairs",
        "minecraft:red_nether_brick_stairs",
        "minecraft:blackstone_stairs",
        "minecraft:polished_blackstone_stairs",
        "minecraft:polished_blackstone_brick_stairs",
        "minecraft:end_stone_brick_stairs",
        "minecraft:quartz_stairs",
        "minecraft:smooth_quartz_stairs",
        "minecraft:prismarine_stairs",
        "minecraft:prismarine_brick_stairs",
        "minecraft:dark_prismarine_stairs",
        "minecraft:deepslate_stairs",
        "minecraft:polished_deepslate_stairs",
        "minecraft:deepslate_brick_stairs",
        "minecraft:deepslate_tile_stairs",
        // nether plants, ladder, rails
        "minecraft:nether_wart",
        "minecraft:crimson_roots",
        "minecraft:warped_roots",
        "minecraft:nether_sprouts",
        "minecraft:weeping_vines",
        "minecraft:twisting_vines",
        "minecraft:crimson_fungus",
        "minecraft:warped_fungus",
        "minecraft:ladder",
        "minecraft:vines",
        "minecraft:weeping_vines",
        "minecraft:twisting_vines",
        "minecraft:rail",
        "minecraft:golden_rail",
        "minecraft:detector_rail",
        "minecraft:activator_rail",
        // light sources
        "minecraft:torch",
        "minecraft:soul_torch",
        "minecraft:redstone_torch",
        "minecraft:campfire",
        "minecraft:soul_campfire",
        "minecraft:lantern",
        "minecraft:soul_lantern",
        "minecraft:white_candle",
        "minecraft:orange_candle",
        "minecraft:magenta_candle",
        "minecraft:light_blue_candle",
        "minecraft:yellow_candle",
        "minecraft:lime_candle",
        "minecraft:pink_candle",
        "minecraft:gray_candle",
        "minecraft:light_gray_candle",
        "minecraft:cyan_candle",
        "minecraft:purple_candle",
        "minecraft:blue_candle",
        "minecraft:brown_candle",
        "minecraft:green_candle",
        "minecraft:red_candle",
        "minecraft:black_candle",
        "minecraft:candle",
        // rest of pressure plates
        "minecraft:stone_pressure_plate",
        "minecraft:polished_blackstone_pressure_plate",
        "minecraft:light_weighted_pressure_plate",
        "minecraft:heavy_weighted_pressure_plate",
        // other stuff in items and block category
        "minecraft:scaffolding",
        "minecraft:turtle_egg",
        "minecraft:sea_pickle",
        "minecraft:cauldron",
        "minecraft:pointed_dripstone",
        "minecraft:anvil",
        "minecraft:chipped_anvil",
        "minecraft:damaged_anvil",
        "minecraft:grindstone",
        "minecraft:stonecutter_block",
        "minecraft:lectern",
        "minecraft:enchanting_table",
        "minecraft:brewing_stand",
        "minecraft:flower_pot",
        "minecraft:cobweb",
        "minecraft:bell",
        "minecraft:nether_wart",
        "minecraft:amethyst_cluster",
        "minecraft:waterlily",
        "minecraft:frog_spawn",
        "minecraft:creeper_head",
        "minecraft:dragon_head",
        "minecraft:player_head",
        "minecraft:zombie_head",
        "minecraft:piglin_head",
        "minecraft:skeleton_skull",
        "minecraft:wither_skeleton_skull",
        "minecraft:heavy_core",
        "minecraft:big_dripleaf",
        "minecraft:grass_path",
        "minecraft:farmland",
        "minecraft:end_portal_frame",
        "minecraft:dragon_egg",
        "minecraft:sculk_vein",
        "minecraft:sculk_shrieker",
        "minecraft:glow_lichen",
        "minecraft:sculk_sensor",
        "minecraft:end_rod",
        "minecraft:lightning_rod",
        "minecraft:calibrated_sculk_sensor",
        "minecraft:tripwire_hook",
        "minecraft:lever",
        "minecraft:daylight_detector",
        "minecraft:daylight_detector_inverted",
        "minecraft:chain",
        "minecraft:unpowered_comparator",
        "minecraft:unpowered_repeater",
        "minecraft:powered_comparator",
        "minecraft:powered_repeater",
        "minecraft:decorated_pot",
        "minecraft:vine",
        "minecraft:deadbush",
        "minecraft:chorus_flower",
        "minecraft:chorus_plant",
        "minecraft:brown_mushroom",
        "minecraft:red_mushroom",
        "minecraft:conduit",
        //minecraft bullshit at not keeping identifiers consistent
        "minecraft:wooden_door",
        "minecraft:trapdoor",
        "minecraft:wooden_pressure_plate",
        //my custom blocks for this addon
        "ve:polished_andesite_brick_stairs",
        "ve:polished_granite_brick_stairs",
        "ve:polished_diorite_brick_stairs",
        "ve:ice_stairs",
        "ve:packed_ice_stairs",
        "ve:blue_ice_stairs",
      
    ];

    return !nonSolidTypes.includes(block.typeId);
}

export class wall_Manager {
    static update_Wall_States(Wall) {
        let above, north, south, east, west;
        try { above = Wall.above(1); } catch { }
        try { north = Wall.north(1); } catch { }
        try { south = Wall.south(1); } catch { }
        try { east = Wall.east(1); } catch { }
        try { west = Wall.west(1); } catch { }

        const blocks = [
            { block: above, side: "up" },
            { block: north, side: "north" },
            { block: south, side: "south" },
            { block: east, side: "east" },
            { block: west, side: "west" },
        ];

        for (const blockData of blocks) {
            const isSolid = isSolidBlock(blockData.block);

            if (blockData.side != "up") {
                Wall.setPermutation(Wall.permutation.withState("wall:connect_" + blockData.side, isSolid));
            } else {
                Wall.setPermutation(Wall.permutation.withState("wall:top_bit", isSolid));
            }
        }

        const north_state = Wall.permutation.getState("wall:connect_north");
        const south_state = Wall.permutation.getState("wall:connect_south");
        const east_state = Wall.permutation.getState("wall:connect_east");
        const west_state = Wall.permutation.getState("wall:connect_west");

        if (
            (north_state && south_state && !east_state && !west_state) ||
            (!north_state && !south_state && east_state && west_state)
        ) {
            Wall.setPermutation(Wall.permutation.withState("wall:slim", true));
            if (north_state && south_state) {
                Wall.setPermutation(Wall.permutation.withState("wall:slim_bit", "north_south"));
            } else {
                Wall.setPermutation(Wall.permutation.withState("wall:slim_bit", "east_west"));
            }
        } else {
            Wall.setPermutation(Wall.permutation.withState("wall:slim", false));
        }
    }

    static updateWallsAround(Block) {
        let above, below, north, south, east, west;
        try { above = Block.above(1); } catch { }
        try { below = Block.below(1); } catch { }
        try { north = Block.north(1); } catch { }
        try { south = Block.south(1); } catch { }
        try { east = Block.east(1); } catch { }
        try { west = Block.west(1); } catch { }

        const blocks = [Block, above, below, north, south, east, west];
        for (const block of blocks) {
            if (block != undefined && block.hasTag(wallTag)) {
                this.update_Wall_States(block);
            }
        }
    }
}