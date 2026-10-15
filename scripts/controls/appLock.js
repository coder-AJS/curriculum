import * as viewPort from "../helpers/viewPort.js"

export const block = () => viewPort.blockScroll(document.body)

export const unBlock = () => viewPort.blockScroll(document.body, false)

export const requestUnBlock = (reactives) => {
    let locked = true
    reactives.section1.stats && (locked = false)
    !locked && unBlock()
}
