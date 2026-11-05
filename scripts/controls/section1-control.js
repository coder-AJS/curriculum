import { animate } from "./../animations/section1-animation.js"

const components = {
    "htmlCard": null,
    "cssCard": null,
    "jsCard": null
}

export const init = (g, l, iface) => {
    g.static.section1_animated = false
    let componentsReady = false

    document.addEventListener("component", (e) => {
        if (e.detail.id in components) {
            components[e.detail.id] = e.detail.instance
            !componentsReady && validateComponents()
        }
    })

    const validateComponents = () => {
        if (Object.values(components).every(Boolean)) {
            componentsReady = true
            g.reactive.section1.state = true
            Object.values(components).forEach(item => item.init())
        }
    }

    iface.init(g, l)
}

export const activeCards = async (g, l) => {
    if (g.reactive.scroll.onSection === "section1") {
        const scenes = document.querySelectorAll(".cardScene")
        await animate(scenes, l)
    }
    return
}