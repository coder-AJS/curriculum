let vp = null

export const init = async (reactive) => {
    vp = reactive.viewPort

    vp.add({
        name: "onScroll",
        value: window.scrollY,
        listeners: reactToScroll
    })

    vp.add({
        name: "onSection",
        value: null,
    })


    addScrollUpdate(vp)
    updateVPsize()
    reactToScroll(window.scrollY)
    activeVPMonitor()
}

const sections = {
    wellcome: document.querySelector("#wellcome"),
    section1: document.querySelector("#section-1"),
}

const sizes = [ /* start - end */
    ["wellcome", [0, null]],
    ["section1", [null, null]],
]

const addScrollUpdate = (reactive) => window.addEventListener("scroll", () => vp.onScroll = window.scrollY)

const updateVPsize = () => sizes.forEach(([key, value]) => {
    const section = sections[key]
    const top = section.offsetTop
    value[0] = top
    value[1] = section.offsetHeight + top
})

const activeVPMonitor = () => window.addEventListener("resize", () => updateVPsize())

const reactToScroll = (scroll) => {
    const section = sizes.find(([key, value]) => scroll >= value[0] && scroll < value[1])?.[0] || null /* body */
    vp.onSection !== section && (vp.onSection = section)
}

export const block = (bol) => {
    document.body.style.overflow = bol ? "hidden" : ""
}