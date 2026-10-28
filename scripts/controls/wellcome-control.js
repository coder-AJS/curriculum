export const init = (l) => {
    const wellcome = document.querySelector("#wellcome")
    const rangeH = document.querySelector("#rangeH")
    const rangeV = document.querySelector("#rangeV")

    rangeH.addEventListener("input", (e) => {
        l.helper.style.setVar("rotateY", e.target.value + "deg", wellcome)
    })

    rangeV.addEventListener("input", (e) => {
        l.helper.style.setVar("rotateX", e.target.value + "deg", wellcome)
    })
}