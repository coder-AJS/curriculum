let reactives = null

export const init = async (reacts) => {
    reactives = reacts
    reacts.viewPort.add({
        name: "onScroll",
        value: window.scrollY,
        listeners: reactToScroll
    })

    reacts.viewPort.add({
        name: "onSection",
        value: null,
        listeners: alertSection
    })

    addScrollUpdate(reacts.viewPort)
    updateVPsize()
    reactToScroll(window.scrollY)
    activeVPMonitor()
}

const sections = {
    wellcome: document.querySelector("#wellcome"),
    section1: document.querySelector("#section-1"),
}

const sizes = [
    ["wellcome", [0, null]],
    ["section1", [null, null]],
]

const addScrollUpdate = (reactive) => window.addEventListener("scroll", () => reactive.onScroll = window.scrollY)

const updateVPsize = () => sizes.forEach(([key, value]) => {
    const section = sections[key]
    const top = section.offsetTop
    value[0] = top
    value[1] = section.offsetHeight + top
})

const activeVPMonitor = () => window.addEventListener("resize", () => updateVPsize())

const reactToScroll = (scroll) => {
    const onSection = sizes.find(([key, value]) => scroll >= value[0] && scroll < value[1])?.[0] || null
    reactives.viewPort.onSection !== onSection && (reactives.viewPort.onSection = onSection)
}

const alertSection = (section) => {
    console.log(section)
}