import * as scroll from "../helpers/scroll.js"
import * as stats from "./section1.js"

export const init = async (reactives, level) => {
    let sectionOpened = false
    updateVPsize()
    activeVPMonitor()

    const viewPort = level.helpers.reactive.newReactive()
    viewPort.add({
        name: "onSection",
        value: "body",
        listeners: [
            alertSection,
            () => activeSection(viewPort, level, sectionOpened)
        ]
    })
    reactives["viewPort"] = viewPort

    changeSection(viewPort, window.scrollY)
    window.addEventListener("scroll", async () => await changeSection(viewPort, window.scrollY))
}

const sections = {
    wellcome: document.querySelector("#wellcome"),
    section1: document.querySelector("#section-1"),
}

const sizes = [ /* start - end */
    ["wellcome", [0, null]],
    ["section1", [null, null]],
]

const updateVPsize = () => sizes.forEach(([key, value]) => {
    const section = sections[key]
    const top = section.offsetTop
    value[0] = top
    value[1] = section.offsetHeight + top
})

const activeVPMonitor = () => window.addEventListener("resize", () => updateVPsize())
const identifySection = (scroll) => sizes.find(([key, value]) => scroll >= value[0] && scroll < value[1])?.[0] || "body"

const changeSection = async (viewPort, scroll) => {
    const section = identifySection(scroll)
    section !== viewPort.onSection && (viewPort.onSection = section)
}

const activeSection = async (viewPort, level, sectionOpened) => {
    if (viewPort.onSection === "section1" && !sectionOpened) {
        scroll.block(document.body)
        sectionOpened = true
        await stats.animate(level)
        scroll.block(document.body, false)
    }
}

const alertSection = (section) => console.log(section)