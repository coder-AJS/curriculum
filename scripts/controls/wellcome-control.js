export const init = async (g, l, iface) => {
    g.static["components"] = {}
    g.static.components["wellcome"] = {}

    const wellcomeComponents = {
       wellcome_cube: null 
    }

    let sectionChecked = false
    document.addEventListener("component", (e) => {
        if (e.detail.id in wellcomeComponents) g.static.components.wellcome[e.detail.id] = e.detail.instance
        wellcomeComponents[e.detail.id] = e.detail.state
        !sectionChecked && checkComponents()
    })

    const checkComponents = () => {
        Object.values(wellcomeComponents).every(Boolean => {
            sectionChecked = true
            g.components.wellcome.components = true
        })
    }

    const cube = await iface.init(l)


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