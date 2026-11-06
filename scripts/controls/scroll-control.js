import { config } from "./../globalConf.js"
import * as scale_control from "./scale-control.js"
import * as wellcome_control from "./wellcome-control.js"
import * as section1_control from "./section1-control.js"
import * as section1_iface from "./../iface/section1-iface.js"

export const init = (g, l) => {
    document.documentElement.style.overflow = "hidden"
    block(g, true)

    const sectionScroll = document.querySelector("#sectionScroll")
    g.reactive.scroll = l.helper.reactive.newReactive()

    g.reactive.scroll.add({
        name: "dynamicScroll",
        value: 0,
        listeners: [
            (v) => smoothScroll(v, sectionScroll, g),
            (v) => changeSection(v, g),
            () => scale_control.scalePos(g, l),
            (v) => scale_control.viewPos(v, l),
            (v) => wellcome_control.setBgSize(g, l, v)
        ]
    })

    const onSection = g.reactive.scroll.add({
        name: "onSection",
        value: "wellcome",
        listeners: [
            alertSection,
            /* section1 first time */
            async () => {
                if (!g.static.section1_animated) {
                    block(g, true)
                    section1_control.activeCards(g, l)
                    section1_iface.addTitle(g, l)
                    g.static.section1_animated = true
                    block(g, false)
                    scale_control.block(g, l, false)
                }
            }
        ]
    })

    activeWheelEvent(g, l)
}

export const block = (g, boolean) => {
    g.static.scrollLock = boolean
    console.info(`scroll ${boolean ? "block" : "unblock"}`)
}

/* dinamic scroll */
export let permitedScroll = null
const activeWheelEvent = (g, l) => {
    const nonScrollHeight = parseFloat(l.helper.css.get("nonScrollHeight"))
    const scrollHeight = parseFloat(l.helper.css.get("scrollHeight"))
    permitedScroll = scrollHeight + nonScrollHeight
    let top = 0

    window.addEventListener("wheel", (e) => {
        if (!g.static.scrollLock) {
            top = Math.sign(e.deltaY) === 1 ? 100 / -config.scrollSteps : 100 / config.scrollSteps
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

const alertSection = (v) => console.info(v)

const changeSection = (v, g) => {
    const section = identifySection(v)
    section !== g.reactive.scroll.onSection && (g.reactive.scroll.onSection = section)
}

