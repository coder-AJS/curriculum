import * as scroll from "../helpers/scroll.js"

let locked = false
export const block = () => {
    !locked && console.info("scroll bloqued")
    scroll.block(document.documentElement)
    locked = true
}

export const unBlock = () => { 
    locked && console.info("scroll unBloqued")
    scroll.block(document.documentElement, false) 
    locked = false
}