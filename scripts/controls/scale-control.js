import { totalScroll } from "./scroll-control.js"

const addEvents = (g, l) => {
    const inter = document.querySelector("#scrollInteractiveLayer")
    const scale = document.querySelector("#scale")
    const scaleMargin = parseFloat(l.helper.style.getVar("scaleMargin", scale))

    let over = false
    let globalPos = null

    inter.addEventListener("mouseenter", () => {
        over = true
        l.helper.style.setVar("lineOpacity", 1, scale)
    })

    inter.addEventListener("mouseleave", () => {
        over = false
        l.helper.style.setVar("lineOpacity", '0', scale) /* fix in level '0' !== null */
    })

    inter.addEventListener("mousemove", (e) => {
        if (!over) return
        globalPos = linePos(e, l, inter, scale, scaleMargin)
    })

    inter.addEventListener("click", () => {
        const newScroll = (globalPos / 100) * (totalScroll)
        updateReactive(g, newScroll)
    })
}

const linePos = (e, l, inter, scale, scaleMargin) => {
    const posPX = e.clientY - scaleMargin
    const boxHeightPX = inter.offsetHeight - 2 * scaleMargin
    let pos = (posPX / boxHeightPX) * 100

    pos < 0 && (pos = 0)
    pos > 100 && (pos = 100)
    l.helper.style.setVar("lineTop", `calc(${pos}% - 1px )`, scale) /* -1px line center */
    return pos
}

const updateReactive = (g, newScroll) => g.reactive.vp.dynamicScroll = -Math.round(newScroll)

let lastValue = null
let contID = 0
const updateCounter = async (value, l) => {
    const scrollInfo = document.querySelector("#scrollInfo")

    if (lastValue === null) {
        scrollInfo.textContent = String(0).padStart(3, "0")
        lastValue = 0
        return
    }

    if (lastValue === value || lastValue - value === 0) return

    const tempo = parseFloat(l.helper.tempo.getTempo(scrollInfo))
    const steps = (tempo * 0.7) / Math.abs(lastValue - value) || 0
    contID++
    const thisContID = contID

    if (lastValue < value)
        for (let i = lastValue; i <= value; i++) {
            if (thisContID !== contID) return
            scrollInfo.textContent = String(i).padStart(3, "0")
            await l.helper.tempo.sleep(steps)
        }

    if (lastValue > value)
        for (let i = lastValue; i >= value; i--) {
            if (thisContID !== contID) return
            scrollInfo.textContent = String(i).padStart(3, "0")
            await l.helper.tempo.sleep(steps)
        }

    lastValue = value
}

export const scalePos = (g, l) => {
    const scrollScale = document.querySelector(".scrollScale")
    l.helper.style.setVar("dynamicTop", g.reactive.vp.dynamicScroll + "%", scrollScale)
}

export const infoBoxPos = async (scroll, l) => {
    const scale = document.querySelector("#scale")
    const pointerTop = (((scroll * -1) / totalScroll) * 100)
    const percent = pointerTop >= 100 ? 100 : Math.round(pointerTop)

    l.helper.style.setVar("dynamicTopInfo", percent + "%", scale)
    updateCounter(percent, l)
}

export const init = (g, l, iface) => {
    iface.init(l)
    addEvents(g, l)
    updateCounter(lastValue, l)
    infoBoxPos(g.reactive.vp.dynamicScroll, l)
}