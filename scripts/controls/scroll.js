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

const addScrollUpdate = (reactive) => {
    window.addEventListener("scroll", () => reactive.onScroll = window.scrollY)
}

const sections = {
    wellcome: document.querySelector("#wellcome")
}

const sizes = {
    wellcome: null
}

const updateVPsize = () => Object.entries(sections).forEach(([key, value]) => sizes[key] = value.offsetHeight)

const activeVPMonitor = () => window.addEventListener("resize", () => updateVPsize())

const reactToScroll = (scroll) => {
    if (scroll === 0 || scroll < sizes.wellcome) {
        if (reactives.viewPort.onSection === "wellcome") return
        reactives.viewPort.onSection = "wellcome"
    }

    if (scroll >= sizes.wellcome) {
        if (reactives.viewPort.onSection === "section-1") return
        reactives.viewPort.onSection = "section-1"
    }
}

const alertSection = (section) => {
    console.log(section)
}