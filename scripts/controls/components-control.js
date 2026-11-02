/* import * as devMode from "../controls/devMode.js"
 */import * as scroll from "../helper/scroll.js"
import * as wellcome from "./wellcome-control.js"


export const init = (g, l) => {
    const sectionsState = {
        section1: false
    }
    let allReady = false

    const components = g.reactive.allComponents = l.helper.reactive.newReactive()
    g.reactive.allComponents.add({
        name: "componentsReady",
        value: false,
        listeners: () => {
            console.log("componentes ready")
            scroll.unBlock(g)
        }
    })

    g.reactive.wellcome = l.helper.reactive.newReactive()
    g.reactive.wellcome.add({
        name: "state",
        value: false,
        listeners: [
            () => wellcome.initComponents(g, l)
        ]
    })

    g.reactive.section1 = l.helper.reactive.newReactive()
    g.reactive.section1.add({
        name: "state",
        value: false,
        listeners: [
            (v) => {
                areReady()
            }
        ]
    })

    const areReady = async () => {
        if (allReady) return
        allReady = Object.values(allReady).every(Boolean)
        components.componentsReady = true
    }
}