export const block = (element, bol = true) => {
    if (!element) {
        console.error("helper error: blockScroll parametres")
        return
    }
    element.style.overflow = bol ? "hidden" : ""
}