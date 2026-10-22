import * as control from "./../scroll.js"
import * as section1 from "./section1-control.js"

export const init = (g, l) => {
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

    window.addEventListener("scroll", async () => {
        console.log("f")
        changeSection(g, window.scrollY)
    })
}

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