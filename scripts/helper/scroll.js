export const block = (g) => {
    g.static.scrollLock = true
    console.info("scroll blocked")
}
export const unBlock = (g, request = null) => {
    g.static.scrollLock = false
    request
        ? console.info("unBlock request")
        : console.info("scroll unBlocked")
}

export const requestUnblock = (g) => {
    const alertTitle = document.querySelector("#alertTitle")

    const components = [
        g.reactive.iface.section1.cards
    ]
    const validate = components.every(item => item)
    if (validate) {
        alertTitle.textContent = "components loaded"
        unBlock(g, true)
    }
}

export const disableNativeScroll = (g, l) => document.documentElement.style.overflow = "hidden"