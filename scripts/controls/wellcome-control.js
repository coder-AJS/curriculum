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


    /*     const section = document.querySelector("#wellcome")
        const cube = await iface.init(l, cubeContainer)
     */
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


    /*     section.addEventListener("mousemove", (e) => {
            const limitPercent = 60
            const percentPos = ((e.clientX - section.offsetLeft) / section.offsetWidth) * limitPercent
            const rotatePercent = Math.round(percentPos - limitPercent / 2)
            cube.rotate("Y", rotatePercent)
        })
     */

}

export const initComponents = () => {
    const cubeContainer = document.querySelector("#cubeContainer")
    cubeContainer.innerHTML = ""
    cubeContainer.appendChild(components.cube)
    components.cube.init()
}