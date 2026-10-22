import { config } from "./globalConf.js"

export const block = (g) => g.static.scrollLock = true
export const unBlock = (g) => g.static.scrollLock = false

export const requestUnblock = (g) => {
    const components = [
        g.reactive.iface.section1.cards
    ]
    const validate = components.every(item => item)
    if (validate) {
        console.log("components loaded")
        unBlock(g)
    }
}

export const init = (g, l) => {
    /* disable document scroll */
    if (!config.nativeScroll) document.documentElement.style.overflow = "hidden"

    const section = document.querySelector(".sectionScroll")
    const stepDistance = config.dynamicScrollDistance
    let top = 0

    smoothScroll(top, section, g)

    g.reactive.vp = l.helper.reactive.newReactive()
    g.reactive.vp.add({
        name: "dynamicScroll",
        value: null,
        listeners: [
            (v) => smoothScroll(v, section, g)
        ]
    })

    window.addEventListener("wheel", (e) => {
        top += Math.sign(e.deltaY) === 1 ? -stepDistance : stepDistance
        top > 0 && (top = 0)
        top < -section.offsetHeight && (top = -section.offsetHeight)
        g.reactive.vp.dynamicScroll = top
    })
}

const smoothScroll = (top, section, g) => !g.static.scrollLock && section.style.setProperty("--scrollTop", top + "px")