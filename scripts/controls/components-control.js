import * as scroll from "../helper/scroll.js"

export const init = (g, l) => {
    g.reactive.components.add({
        name: "section1_cards",
        value: false,
        listeners: [
            () => scroll.unBlock(g),
            () => section1Cards(g)
        ]
    })
}

const section1Cards = (g) => {
    Object.values(g.static.components.section1).forEach(item => item.init())
}