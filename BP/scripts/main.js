import { world, system } from '@minecraft/server'
import { wall_Manager } from 'walls/wall_Manager'

world.afterEvents.playerBreakBlock.subscribe((data) => {
    wall_Manager.updateWallsAround(data.block)
})

world.afterEvents.playerPlaceBlock.subscribe((data) => {
    wall_Manager.updateWallsAround(data.block)
})