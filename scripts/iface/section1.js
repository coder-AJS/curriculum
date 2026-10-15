import * as appLock from "../controls/appLock.js"

export const init = (reactives, level) => {
    const section1 = level.helpers.reactive.newReactive()
    reactives["section1"] = section1
    section1.add({
        name: "stats",
        value: false,
        listeners: () => appLock.requestUnBlock(reactives)
    })

    const validateStatsReady = () => {
        if (Object.values(componentsReady).every(Boolean)) {
            reactives.section1.stats = true
        }
    }

    const componentsReady = { 
        html: false, 
        css: false, 
        js: false 
    }

    document.addEventListener("component", (e) => {
        componentsReady[e.detail.id] = e.detail.state
        validateStatsReady()
    })

    const stat3dBoxes = document.querySelectorAll(".stat3d")
    stat3dBoxes.forEach((item, index) => createComponent(item, config[index], level.components.statCard))

}

const config = [
    {
        css: {
            backgroundImage: "./../../resources/images/pexels-alamsaim-29280658.jpg",
            mainFont: "oxanium",
            counterFont: "conthrax",
            domWidth: "300px",
            domHeight: "460px"
        },
        logic: {
            id: "html",
            title: "HTML",
            progress: 90
        },
        node: {
            html: "a",
            style: "a"
        }
    },
    {
        css: {
            backgroundImage: "./../../resources/images/pexels-iskyfluous-3484440.jpg",
            mainFont: "oxanium",
            counterFont: "conthrax",
            domWidth: "300px",
            domHeight: "460px"
        },
        logic: {
            id: "css",
            title: "CSS",
            progress: 90
        },
        node: {
            html: "a",
            style: "a"
        }
    },
    {
        css: {
            backgroundImage: "./../../resources/images/pexels-alamsaim-29280658.jpg",
            mainFont: "oxanium",
            counterFont: "conthrax",
            domWidth: "300px",
            domHeight: "460px"
        },
        logic: {
            id: "js",
            title: "JAVASCRIPT",
            progress: 90
        },
        node: {
            html: "a",
            style: "a"
        }
    },
]

const createComponent = async (box, config, component) => {
    const instance = new component.default()
    box.appendChild(instance)
    instance.configure("css", config.css)
    instance.configure("logic", config.logic)
    instance.addToNode(config.node)
}