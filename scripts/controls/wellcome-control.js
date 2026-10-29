export const init = async (g, l, iface) => {

    const cubeContainer = document.querySelector("#cubeContainer")
    const cube = await iface.init(l, cubeContainer)

    const range = document.querySelector("#range")
    const rangeH = document.querySelector("#rangeH")
    const rangeW = document.querySelector("#rangeW")

    range.addEventListener("input", (e) => {
        cube.rotate("Y", e.target.value)
    })

    rangeH.addEventListener("input", (e) => {
        cubeContainer.style.width = `${e.target.value}px`
    })

    rangeW.addEventListener("input", (e) => {
        cubeContainer.style.height = `${e.target.value}px`
    })





}