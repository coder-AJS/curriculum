export const init = (g, l, iface) => {
    iface.init(l)

    const scrollInteractiveLayer = document.querySelector("#scrollInteractiveLayer")



}

export const updateScalePos = (g, l) => {
    const scrollScale = document.querySelector(".scrollScale")
    l.helper.style.setVar("dynamicTop", g.reactive.vp.dynamicScroll + "vh", scrollScale)
}

export const pointerMovement = (g, l) => {
    const scale = document.querySelector("#scale")
    const scrollPointer = document.querySelector("#scrollPointer")
    const pointerTop = (((g.reactive.vp.dynamicScroll * -1) / 300) * 100)
    l.helper.style.setVar("dynamicPointerTop", pointerTop + "%", scale)
    const number = pointerTop >= 100 ? 100 : pointerTop.toFixed(0)
    scrollPointer.textContent = String(number).padStart(3, "0") + " %"
}