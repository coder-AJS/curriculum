export const blockScroll = (element, bol = true) => {
    if (!element) {
        console.error("helper error: blockScroll parametres")
        return
    }
    element.style.overflow = bol ? "hidden" : ""
}