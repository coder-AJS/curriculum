const smoothScroll = (top, sectionScroll) => {
    sectionScroll.style.setProperty("--scrollTop", top + "px")
}

export const init = () => {
    const stepDistance = 100
    const sectionScroll = document.querySelector(".sectionScroll")
    const height = sectionScroll.offsetHeight
    let top = 0


    smoothScroll(top, sectionScroll)

    window.addEventListener("wheel", (e) => {
        e.preventDefault()
        Math.sign(e.deltaY) === 1
            ? top -= stepDistance
            : top += stepDistance

        if (top > 0) top = 0
        if (top < height * -1) top = height * -1
        
        smoothScroll(top, sectionScroll)
    }, { passive: false })

}