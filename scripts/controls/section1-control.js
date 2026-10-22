import * as scroll from "../scroll.js"

export const init = (g, l) => {
    g.reactive.iface = {}
    g.reactive.iface.section1 = l.helper.reactive.newReactive()

    g.reactive.iface.section1.add({
        name: "cards",
        value: false,
        listeners: () => scroll.requestUnblock(g)
    })

    const componentsReady = {
        html: false,
        css: false,
        js: false
    }

    const validateStatsReady = () => {
        if (Object.values(componentsReady).every(Boolean)) {
            g.reactive.iface.section1.cards = true
        }
    }

    document.addEventListener("component", (e) => {
        componentsReady[e.detail.id] = e.detail.state
        validateStatsReady()
        e.detail.instance.init()
    })
}