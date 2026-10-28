import * as scroll from "../helper/scroll.js"

export const init = (g, l, iface) => {
    g.reactive.iface.section1.add({
        name: "cards",
        value: false,
        listeners: [
            () => scroll.requestUnblock(g),
            initCards
        ]
    })

    document.addEventListener("component", (e) => {
        if (e.detail.id in components) components[e.detail.id] = e.detail.instance
        validateComponents(g)
    })

    iface.init(l)
}

const components = {
    html: null,
    css: null,
    js: null
}

const validateComponents = (g) => {
    if (Object.values(components).every(Boolean)) {
        g.reactive.iface.section1.cards = true
    }
}

const initCards = () => {
    Object.values(components).forEach(item => item.init())
}