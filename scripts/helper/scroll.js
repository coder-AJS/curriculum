export const block = (g) => {
    g.static.scrollLock = true
    console.info("scroll blocked")
}
export const unBlock = (g) => {
    g.static.scrollLock = false
    console.info("scroll unBlocked")
}

export const requestUnblock = (g) => {
    const alertTitle = document.querySelector("#alertTitle")

    const components = [
        g.reactive.iface.section1.cards
    ]
    const validate = components.every(item => item)
    if (validate) {
        console.log("components loaded")
        alertTitle.textContent = "components loaded"
        unBlock(g)
    }
}

export const disableNativeScroll = (g, l) => document.documentElement.style.overflow = "hidden"