import { config } from "./../globalConf.js"
import * as control from "./../helper/scroll.js"
import * as scale from "./scale-control.js"
import * as section1 from "./../animations/section1-animation.js"

export const init = (g, l) => {
    const sectionScroll = document.querySelector("#sectionScroll")

    control.disableNativeScroll()
    control.block(g)

    g.reactive.vp.add({
        name: "dynamicScroll",
        value: 0,
        listeners: [
            (v) => smoothScroll(v, sectionScroll, g),
            (v) => changeSection(v, g),
            () => scale.scalePos(g, l),
            (v) => scale.posVisuals(v, l),
/*             (v) => console.log(v)
 */        ]
    })

    activeWheelEvent(g, l)

    g.reactive.vp.add({
        name: "onSection",
        value: "wellcome",
        listeners: [
            () => alertSection(g),
            () => activeSection1(g, l)
        ]
    })

    g.static.section1_animated = false
}

export let totalScroll = null
/* dinamic scroll */

const activeWheelEvent = (g, l) => {
    const nonScrollHeight = parseFloat(l.helper.style.getVar("nonScrollHeight"))
    const scrollHeight = parseFloat(l.helper.style.getVar("scrollHeight"))
    totalScroll = scrollHeight + nonScrollHeight
    let top = 0

    window.addEventListener("wheel", (e) => {
        if (!g.static.scrollLock) {
            top = Math.sign(e.deltaY) === 1 ? -config.dynamicScrollDistance : config.dynamicScrollDistance
            let nextScroll = g.reactive.vp.dynamicScroll + top
            nextScroll > 0 && (nextScroll = 0)
            nextScroll <= -totalScroll && (nextScroll = -totalScroll) /* limit scroollayer height */
            g.reactive.vp.dynamicScroll = nextScroll
        }
    })
}

const smoothScroll = (v, section, g) => !g.static.scrollLock && section.style.setProperty("--scrollTop", v + "vh")

/* sections */
const sections = {
    wellcome: [0, -100], /* start - end VH relative*/
    section1: [-100, -300]
}

const identifySection = (v) => Object.entries(sections).find(([key, value]) => v <= value[0] && v > value[1])?.[0] || "body"

const alertSection = (g) => console.info(g.reactive.vp.onSection)

const changeSection = (v, g) => {
    const section = identifySection(v)
    section !== g.reactive.vp.onSection && (g.reactive.vp.onSection = section)
}

const activeSection1 = async (g, l) => {
    if (!g.static.section1_animated && g.reactive.vp.onSection === "section1") {
        g.static.section1_animated = true
        control.block(g)
        await section1.animate(g, l)
        control.unBlock(g)
    }
}