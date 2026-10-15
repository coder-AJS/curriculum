let section1_statsOpened = false

export const init = async (r, h) => {
    r.viewPort = h.reactive.newReactive()

    updateVPsize()
    activeVPMonitor()

    r.viewPort.add({
        name: "onSection",
        value: "body",
        listeners: [
            alertSection,
            activeSection
        ]
    })

    changeSection(r, window.scrollY)
    window.addEventListener("scroll", async () => await changeSection(window.scrollY))
}

export const toggleScroll = (boolean) => {
    document.body.style.overflow = boolean ? "" : "hiddent"
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

const changeSection = async (r, scroll) => {
    const section = identifySection(r, scroll)
    section !== r.viewPort.onSection && (r.viewPort.onSection = section)
}

const activeSection = async (section) => {
        if (section === "section1" && !section1_statsOpened) {
        h.viewPort.blockScroll(document.body)
        section1_statsOpened = true
        await section1.animateStats()
        h.viewPort.blockScroll(document.body, false)
    }
}

const alertSection = (section) => console.log(section)