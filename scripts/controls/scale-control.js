import { totalScroll } from "./scroll-control.js"

const addEvents = (g, l) => {
    const inter = document.querySelector("#interLayer")
    const scale = document.querySelector("#scale")
    const scaleMargin = parseFloat(l.helper.style.getVar("scaleMargin", scale))

    let over = false
    let dragging = false
    let globalPos = 0

    /* detect mouse enter/out */
    inter.addEventListener("mouseenter", () => {
        over = true
        l.helper.style.setVar("lineOpacity", 1, scale)
        l.helper.style.setVar("viewOpacity", 1, scale)
    })

    inter.addEventListener("mouseleave", () => {
        over = false
        l.helper.style.setVar("lineOpacity", 0, scale)
        l.helper.style.setVar("viewOpacity", 0, scale)
    })

    /* detect pointer dragging */
    inter.addEventListener("pointerdown", (e) => {
        dragging = true
        inter.setPointerCapture(e.pointerId)
        globalPos = linePos(e, l, inter, scale, scaleMargin)
        const newScroll = (globalPos / 100) * (totalScroll)
        updateReactive(g, newScroll)
    })

    inter.addEventListener("pointerup", (e) => {
        dragging = false
        inter.releasePointerCapture(e.pointerId)
        const newScroll = (globalPos / 100) * (totalScroll)
        updateReactive(g, newScroll)
    })

    /* detect movement */
    inter.addEventListener("pointermove", (e) => {
        over && (globalPos = linePos(e, l, inter, scale, scaleMargin))
        if (dragging) {
            const newScroll = (globalPos / 100) * (totalScroll)
            updateReactive(g, newScroll)
        }
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

let lastInfoValue = 0
let contID = 0
const updateCounter = async (value, l) => {
    const info = document.querySelector("#info")
    if (!info.textContent) {
        info.textContent = "000"
        return
    }

    if ((lastInfoValue === value || lastInfoValue - value === 0) && lastInfoValue !== 0) {
        return
    }

    const tempo = parseFloat(l.helper.tempo.getTempo(info))
    const steps = (tempo * 0.7) / Math.abs(lastInfoValue - value) || 0
    contID++
    const thisContID = contID

    if (lastInfoValue < value) for (let i = lastInfoValue; i <= value; i++) {
        if (thisContID !== contID) {
            lastInfoValue = value
            return
        }
        info.textContent = String(i).padStart(3, "0")
        await l.helper.tempo.sleep(steps)
    }

    if (lastInfoValue > value) for (let i = lastInfoValue; i >= value; i--) {
        if (thisContID !== contID) {
            lastInfoValue = value
            return
        }
        info.textContent = String(i).padStart(3, "0")
        await l.helper.tempo.sleep(steps)
    }

    lastInfoValue = value
}

export const scalePos = (g, l) => {
    const scrollScale = document.querySelector(".scrollScale")
    l.helper.style.setVar("dynamicTop", g.reactive.vp.dynamicScroll + "%", scrollScale)
}

export const posVisuals = async (dynamicScroll, l) => {
    const scale = document.querySelector("#scale")
    const infoHeight = document.querySelector("#info").offsetHeight
    const interHeight = document.querySelector("#interLayer").offsetHeight
    const viewHeight = parseFloat(l.helper.style.getVar("viewHeight", scale))

    const infoDistance = ((interHeight - infoHeight - 1) / (interHeight)) * 100 /* -1 css calc error */
    const infoTop = (((dynamicScroll * -1) / totalScroll) * infoDistance)
    const infoValue = (((dynamicScroll * -1) / totalScroll) * 100)
    l.helper.style.setVar("infoTop", infoTop + "%", scale)
    updateCounter(Math.round(infoValue), l)

    const viewTop = (((dynamicScroll * -1) / totalScroll) * (100 - viewHeight)) /* 80 = 100% - 20% view height*/
    l.helper.style.setVar("viewTop", viewTop + "%", scale)
}

export const init = (g, l, iface) => {
    iface.init(l)
    addEvents(g, l)
    updateCounter()
    posVisuals(g.reactive.vp.dynamicScroll, l)
}