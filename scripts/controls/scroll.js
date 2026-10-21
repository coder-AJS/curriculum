let blockScroll = false

export const block = () => blockScroll = true
export const unBlock = () => blockScroll = false

export const init = (r, l) => {
    /* disable document scroll */
    document.documentElement.style.overflow = "hidden" /* create global config for this */
    const stepDistance = 100
    const sectionScroll = document.querySelector(".sectionScroll")
    const height = sectionScroll.offsetHeight
    let top = 0

    smoothScroll(top, sectionScroll)

    r["vp"] = l.helpers.reactive.newReactive()
    r.vp.add({
        name: "dynamicScroll",
        value: null,
        listeners: [
            (v) => smoothScroll(v, sectionScroll)
        ]
    })

    window.addEventListener("wheel", (e) => {
        Math.sign(e.deltaY) === 1
            ? top -= stepDistance
            : top += stepDistance

        if (top > 0) top = 0
        if (top < height * -1) top = height * -1

        r.vp.dynamicScroll = top
    })
}

const smoothScroll = (top, sectionScroll) => !blockScroll && sectionScroll.style.setProperty("--scrollTop", top + "px")