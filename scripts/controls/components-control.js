/* import * as devMode from "../controls/devMode.js"
 */import * as scroll from "../helper/scroll.js"

export const init = (g, l) => {
    /*     g.reactive.components.add({
            name: "section1_cards",
            value: false,
            listeners: [
                () => scroll.unBlock(g),
                () => section1Cards(g),
                () => devMode.init(g)
            ]
        })
     */

    g.reactive.components = {}
    g.reactive.components.wellcome = l.helper.reactive.newReactive()
    g.reactive.components.wellcome.add({
        name: "components",
        value: false,
        listeners: [
            () => checkComplete(g, l),
        ]
    })

    g.reactive.components.section1 = l.helper.reactive.newReactive()
    g.reactive.components.section1.add({
        name: "components",
        value: false,
        listeners: [
            (v) => console.log(v),
            () => checkComplete(g, l)
        ]
    })
}

let componentsChecked = false
const checkComplete = async (g, l) => {
    if (componentsChecked) return
    let complete = true

    for (const group of Object.values(g.static.components)) {
        for (const item of Object.values(group)) {
            if (!item) {
                complete = false
                break
            }
        }
        if (!complete) break
    }

    if (complete) {
        componentsChecked = true
        await l.helper.tempo.sleep(1000)
        initWellcome(g, l)
        scroll.unBlock(g)
    }
}

const initWellcome = (g, l) => {
    const cubeContainer = document.querySelector("#cubeContainer")
    cubeContainer.innerHTML = ""
    const cube = g.static.components.wellcome.cube
    cubeContainer.appendChild(cube)
    g.static.components.wellcome.cube.init()
}

const checkInit = (instance) => {
    const wait = delayed[instance.id]
    if (!wait) instance.init()
}

const section1Cards = (g) => {
    Object.values(g.static.components.section1).forEach(item => item.init())
}









export const react = (component, instance) => {
    console.log(component.instance)
}