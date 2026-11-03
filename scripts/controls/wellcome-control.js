export const components = {
    cube: false
}

export const init = async (g, l, iface) => {

    document.addEventListener("component", (e) => {
        if (e.detail.id in components) {
            components.cube = e.detail.instance
            g.reactive.wellcome.state = true
        }
    })

    await iface.init(l)


/*     const rangeX = document.querySelector("#rangeX")
    const rangeY = document.querySelector("#rangeY")
    rangeX.value = 0
    rangeY.value = 0

    rangeY.addEventListener("input", (e) => {
        cube.rotate("y", e.target.value)
        e.target.nextElementSibling.textContent = e.target.value
    })

    rangeX.addEventListener("input", (e) => {
        cube.rotate("x", e.target.value)
        e.target.nextElementSibling.textContent = e.target.value
    })
 */

    const wellcome = document.querySelector("#wellcome")
    wellcome.addEventListener("mousemove", (e) => {
        const multipliquer = 200
        const percentPos = ((e.clientX - wellcome.offsetLeft) / wellcome.offsetWidth) * multipliquer
        const rotatePercent = Math.round(percentPos - multipliquer / 2)
        cube.rotate("Y", rotatePercent)
    })


}

export const initComponents = () => {
    const cubeContainer = document.querySelector("#cubeContainer")
    cubeContainer.innerHTML = ""
    cubeContainer.appendChild(components.cube)
    components.cube.init()
}