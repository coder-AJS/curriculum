import { config } from "./../globalConf.js"
import * as control from "./../helper/scroll.js"
import * as section1 from "./section1-control.js"

export const init = (g, l) => {
    control.block(g)
    control.disableNativeScroll()
    const sectionScroll = document.querySelector("#sectionScroll")

    /* vp reactive */
    g.reactive.vp = l.helper.reactive.newReactive()

    g.reactive.vp.add({
        name: "dynamicScroll",
        value: 0,
        listeners: [
            (v) => smoothScroll(v, sectionScroll, g)
        ]
    })

    activeWheelEvent(g)

    g.reactive.vp.add({
        name: "onSection",
        value: "body",
        listeners: [
            alertSection
        ]
    })

    getVPSize()
    activeVPMonitor()
    changeSection(g, window.scrollY)
}

/* dinamic scroll */

const activeWheelEvent = (g) => {
    let top = 0

    window.addEventListener("wheel", (e) => {
        top = Math.sign(e.deltaY) === 1 ? -config.dynamicScrollDistance : config.dynamicScrollDistance
        g.reactive.vp.dynamicScroll += top
        g.reactive.vp.dynamicScroll > 0 && (g.reactive.vp.dynamicScroll = 0)
        g.reactive.vp.dynamicScroll <= -500 && (g.reactive.vp.dynamicScroll = -500) /* temporal */
    })
}

const smoothScroll = (v, section, g) => !g.static.scrollLock && section.style.setProperty("--scrollTop", v + "vh")

/* sections */
const sections = {
    wellcome: document.querySelector("#wellcome"),
    section1: document.querySelector("#section-1"),
}

const sizes = [ /* start - end */
    ["wellcome", [0, null]],
    ["section1", [null, null]],
]

const getVPSize = () => sizes.forEach(([key, value]) => {
    const section = sections[key]
    const top = section.offsetTop
    value[0] = top
    value[1] = section.offsetHeight + top
})

const activeVPMonitor = () => window.addEventListener("resize", () => getVPSize())
const identifySection = (scroll) => sizes.find(([key, value]) => scroll >= value[0] && scroll < value[1])?.[0] || "body"

const changeSection = (g, scroll) => {
    const section = identifySection(scroll)
    section !== g.reactive.vp.onSection && (g.reactive.vp.onSection = section)
}

const alertSection = (section) => console.info(section)