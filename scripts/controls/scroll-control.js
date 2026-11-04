import { config } from "./../globalConf.js"
import * as control from "./../helper/scroll.js"
import * as scale from "./scale-control.js"
import * as section1 from "./section1-control.js"

export const init = (g, l) => {
    const sectionScroll = document.querySelector("#sectionScroll")

    control.disableNativeScroll()
    control.block(g)

    g.reactive.scroll = l.helper.reactive.newReactive()
    g.reactive.scroll.add({
        name: "dynamicScroll",
        value: 0,
        listeners: [
            (v) => smoothScroll(v, sectionScroll, g),
            (v) => changeSection(v, g),
            () => scale.scalePos(g, l),
            (v) => scale.viewPos(v, l),
            (v) => scale.visibility(g, v)
        ]
    })

    activeWheelEvent(g, l)

    const onSection = g.reactive.scroll.add({
        name: "onSection",
        value: "wellcome",
        listeners: [
            () => alertSection(g),
            (v) => console.log(v),
            () => section1.activeCards(g, l)
        ]
    })
}

export let permitedScroll = null
/* dinamic scroll */

const activeWheelEvent = (g, l) => {
    const nonScrollHeight = parseFloat(l.helper.css.get("nonScrollHeight"))
    const scrollHeight = parseFloat(l.helper.css.get("scrollHeight"))
    permitedScroll = scrollHeight + nonScrollHeight
    let top = 0

    window.addEventListener("wheel", (e) => {
        if (!g.static.dynamicScroll) {
            top = Math.sign(e.deltaY) === 1 ? -config.dynamicScrollDistance : config.dynamicScrollDistance
            let nextScroll = g.reactive.scroll.dynamicScroll + top
            nextScroll > 0 && (nextScroll = 0)
            nextScroll <= -permitedScroll && (nextScroll = -permitedScroll) /* limit scroollayer height */
            g.reactive.scroll.dynamicScroll = nextScroll
        }
    })
}

const smoothScroll = (v, section, g) => !g.static.dynamicScroll && section.style.setProperty("--scrollTop", v + "vh")

/* sections */
const sections = {
    wellcome: [0, -100], /* start - end VH relative*/
    section1: [-100, -300]
}

const identifySection = (v) => Object.entries(sections).find(([key, value]) => v <= value[0] && v > value[1])?.[0] || "body"

const alertSection = (g) => console.info(g.reactive.scroll.onSection)

const changeSection = (v, g) => {
    const section = identifySection(v)
    section !== g.reactive.scroll.onSection && (g.reactive.scroll.onSection = section)
}