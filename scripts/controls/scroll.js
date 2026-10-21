import { config } from "./../globalConf.js"

export const block = (g) => g.static.scrollLock = true
export const unBlock = (g) => g.static.scrollLock = false

export const init = (g, l) => {
    /* disable document scroll */
    if (!config.nativeScroll) document.documentElement.style.overflow = "hidden"

    const section = document.querySelector(".sectionScroll")
    const stepDistance = 100 /* px */
    let top = 0

    smoothScroll(top, section, g)

    g.reactive["vp"] = l.helpers.reactive.newReactive()
    g.reactive.vp.add({
        name: "fakeScroll",
        value: null,
        listeners: [
            (v) => smoothScroll(v, section, g)
        ]
    })

    window.addEventListener("wheel", (e) => {
        top += Math.sign(e.deltaY) === 1 ? -stepDistance : stepDistance
        top > 0 && (top = 0)
        top < -section.offsetHeight && (top = -section.offsetHeight)
        g.reactive.vp.fakeScroll = top
    })
}

const smoothScroll = (top, section, g) => !g.static.scrollLock && section.style.setProperty("--scrollTop", top + "px")