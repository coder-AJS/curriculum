/* import * as devMode from "../controls/devMode.js"
 */import * as scroll_helper from "./scroll-control.js"
import * as wellcome from "./wellcome-control.js"


export const init = (g, l) => {
    const sectionsState = {
        wellcome: false,
        section1: false
    }

    g.reactive.allComponents = l.helper.reactive.newReactive()
    const components = g.reactive.allComponents.add({
        name: "state",
        value: false,
        listeners: () => {
            console.log("componentes ready")
            scroll.block(g, false)
        }
    })

    g.reactive.wellcome = l.helper.reactive.newReactive()
    g.reactive.wellcome.add({
        name: "state",
        value: false,
        listeners: [
            () => sectionsState.wellcome = true,
            () => wellcome.initComponents(g, l),
            () => areReady(sectionsState, components)
        ]
    })

    g.reactive.section1 = l.helper.reactive.newReactive()
    g.reactive.section1.add({
        name: "state",
        value: false,
        listeners: [
            () => sectionsState.section1 = true,
            () => areReady(sectionsState, components)
        ]
    })
}

let allReady = false
const areReady = async (sectionsState, components) => {
    if (allReady) return
    allReady = Object.values(sectionsState).every(Boolean)
    components.state = true
}