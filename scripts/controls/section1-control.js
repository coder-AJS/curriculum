export const init = (g, l, iface) => {
    g.static.components ??= {}
    g.static.components.section1 = {
        "html-card": null,
        "css-card": null,
        "js-card": null
    }

    document.addEventListener("section1-card", (e) => {
        if (!e.detail.state) {
            console.trace("component not ready", e.detail)
            return
        }

        g.static.components.section1[e.detail.id] = e.detail.instance
        validateComponents(g)
    })

    const validateComponents = (g) => {
        if (Object.values(g.static.components.section1).every(Boolean)) {
            g.reactive.components.section1_cards = true
        }
    }

    iface.init(l)
}