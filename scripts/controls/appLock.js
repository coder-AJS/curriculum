import * as scroll from "../helpers/scroll.js"

export const block = () => scroll.block(document.body)

export const unBlock = () => scroll.block(document.body, false)

export const requestUnBlock = (reactives) => {
    let locked = true
    reactives.section1.stats && (locked = false)
    !locked && unBlock()
}
