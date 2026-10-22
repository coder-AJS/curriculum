import * as lock from "./lock.js"
import * as scale from "./scale.js"
import * as section1Cards from "./section1-control.js"

export const init = async (reactives, level) => {
    console.log(reactives)
    const open = {
        section1: false
    }

    updateVPsize()
    activeVPMonitor()

    reactives["viewPort"] = level.helpers.reactive.newReactive()

    reactives.viewPort.add({
        name: "onSection",
        value: "body",
        listeners: [
            alertSection,
            async (v) => {
                if (v === "section1") {
                    if (!open.section1) {
                        lock.block()
                        !open.section1 && await section1Cards.animate(level)
                        lock.unBlock()
                        open.section1 = true
                    }
                }
            }
        ]
    })
    
    reactives.viewPort.add({
        name: "bodyScroll",
        value: getScrollValue(),
/*         listeners: scale.updateTop
 */    })

    changeSection(reactives.viewPort, window.scrollY)
    scale.updateTop(getScrollValue())

    window.addEventListener("scroll", async () => {
        reactives.viewPort.bodyScroll = getScrollValue()
        changeSection(reactives.viewPort, window.scrollY)
    })
}

const getScrollValue = () => window.scrollY

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

const changeSection = (viewPort, scroll) => {
    const section = identifySection(scroll)
    section !== viewPort.onSection && (viewPort.onSection = section)
}

const alertSection = (section) => console.log(section)