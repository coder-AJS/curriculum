export const init = (g, l, iface) => {
    iface.init(l)

    const inter = document.querySelector("#scrollInteractiveLayer")
    const infoBox = document.querySelector("#scrollInfoBox")
    const scale = document.querySelector("#scale")
    const scaleMargin = parseFloat(l.helper.style.getVar("scaleMargin", scale))
    let over = false

    inter.addEventListener("mouseenter", () => over = true)
    inter.addEventListener("mouseleave", () => over = false)
    inter.addEventListener("mousemove", (e) => {
        if (!over) return
        linePos(e, l, inter, scale, scaleMargin)
    })
}

const linePos = (e, l, inter, scale, scaleMargin) => {
    const posPX = e.clientY - scaleMargin
    const boxHeightPX = inter.offsetHeight - 2 * scaleMargin
    let pos = (posPX / boxHeightPX) * 100
    pos < 0 && (pos = 0)
    pos > 100 && (pos = 100)
    l.helper.style.setVar("dynamicTopOpacity", 1, scale)
    l.helper.style.setVar("dynamicTopLine", pos + "%", scale)
}

export const scalePos = (g, l) => {
    const scrollScale = document.querySelector(".scrollScale")
    l.helper.style.setVar("dynamicTop", g.reactive.vp.dynamicScroll + "vh", scrollScale)
}

export const infoBoxPos = (g, l) => {
    const scale = document.querySelector("#scale")
    const scrollInfo = document.querySelector("#scrollInfo")
    const pointerTop = (((g.reactive.vp.dynamicScroll * -1) / 300) * 100)
    l.helper.style.setVar("dynamicTopInfo", pointerTop + "%", scale)
    const number = pointerTop >= 100 ? 100 : pointerTop.toFixed(0)
    scrollInfo.textContent = String(number).padStart(3, "0") + " %"
}