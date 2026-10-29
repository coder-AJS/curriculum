export const block = (g) => {
    g.static.scrollLock = true
    console.info("scroll blocked")
}
export const unBlock = (g) => {
    g.static.scrollLock = false
    console.info("scroll unBlocked")
}

export const disableNativeScroll = (g, l) => document.documentElement.style.overflow = "hidden"