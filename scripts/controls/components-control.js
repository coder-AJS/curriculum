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

    g.components = {}
    g.components.wellcome = l.helper.reactive.newReactive()
    g.components.wellcome.add({
        name: "components",
        value: false,
        listeners: () => Object.values(g.static.components.wellcome).forEach(item => item.init()),
    })

    g.components.section1 = l.helper.reactive.newReactive()
    g.components.section1.add({
        name: "components",
        value: false,
        listeners: [
            (v) => console.log(v),
        ],
    })



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