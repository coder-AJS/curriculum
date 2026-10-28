export const init = async (g, l, iface) => {
    /* recoger el aviso del componente desde reactivo */
    g.reactive.iface.wellcome.add({
        name: "cube3d",
        value: false,
        reactives: null
    })



    const rangeH = document.querySelector("#rangeH")
    const rangeV = document.querySelector("#rangeV")

    rangeH.addEventListener("input", (e) => {
        l.helper.style.setVar("rotateY", e.target.value + "deg", wellcome)
    })

    rangeV.addEventListener("input", (e) => {
        l.helper.style.setVar("rotateX", e.target.value + "deg", wellcome)
    })



    const cubeContainer = document.querySelector("#cubeContainer")
    await iface.init(l, cubeContainer)


}