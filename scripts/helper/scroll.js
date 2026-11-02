export const disableNativeScroll = (g, l) => document.documentElement.style.overflow = "hidden"

export const block = (g) => {
    g.static.dynamicScroll = true
    console.info("scroll blocked")
}
export const unBlock = (g) => {
    g.static.dynamicScroll = false
    console.info("scroll unBlocked")
}