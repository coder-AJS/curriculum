import { config } from "./../globalConf.js"

const addcubeInputs = () => {
    const template = `
        <div id="cubeControls" class="inputsBox absolute FCol FJ_between">
            <label class="FRow FA_center">X<input type="range" name="" id="rangeX" min="0" max="100"><span class="FCenter">0</span></label> 
            <label class="FRow FA_center">Y<input type="range" name="" id="rangeY" min="0" max="100"><span  class="FCenter">0</span></label> 
        </div>`

    document.querySelector("#wellcome").innerHTML += template

    const cube = document.querySelector()
    const rangeX = document.querySelector("#rangeX")
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

}

export const init = (g) => {
    config.devMode && addcubeInputs(g)
}
