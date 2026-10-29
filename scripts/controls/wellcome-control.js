export const init = async (g, l, iface) => {
    const section = document.querySelector("#wellcome")
    const cube = await iface.init(l, cubeContainer)

    const rangeX = document.querySelector("#rangeX")

    rangeX.addEventListener("input", (e) => {
        l.helper.style.setVar("rotateX", e.target.value + "deg", section)
    })



    section.addEventListener("mousemove", (e) => {
        const limitPercent = 60
        const percentPos = ((e.clientX - section.offsetLeft) / section.offsetWidth) * limitPercent
        const rotatePercent = Math.round(percentPos - limitPercent / 2)
        cube.rotate("Y", rotatePercent)
    })


}