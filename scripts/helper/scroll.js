export const disableNativeScroll = (g, l) => document.documentElement.style.overflow = "hidden"

export const block = (g) => {
    g.static.scrollLock = true
    console.trace("scroll blocked")
}
export const unBlock = (g) => {
    g.static.scrollLock = false
    console.trace("scroll unBlocked")
}