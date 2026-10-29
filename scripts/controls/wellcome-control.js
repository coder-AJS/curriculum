export const init = async (g, l, iface) => {


    const cubeContainer = document.querySelector("#cubeContainer")

    const range = document.querySelector("#range")
    const rangeH = document.querySelector("#rangeH")
    const rangeW = document.querySelector("#rangeW")

    range.addEventListener("input", (e) => {
        cubeContainer.style.transform = `rotateY(${e.target.value}deg)`
    })

    rangeH.addEventListener("input", (e) => {
        cubeContainer.style.width = `${e.target.value}px`
    })

    rangeW.addEventListener("input", (e) => {
        cubeContainer.style.height = `${e.target.value}px`
    })



    await iface.init(l, cubeContainer)


}