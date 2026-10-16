import * as appLock from "../controls/appLock.js"

export const init = (reactives, level) => {
    const section1 = level.helpers.reactive.newReactive()
    section1.add({
        name: "stats",
        value: false,
        listeners: () => appLock.requestUnBlock(reactives)
    })
    reactives["section1"] = section1

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
        componentsReady[e.detail.id] = true 
        e.detail.instance.init()
    })

    const stat3dBoxes = document.querySelectorAll(".stat3d")
    stat3dBoxes.forEach((item, index) => createComponent(item, config[index], level.components.statCard))

}

const config = [
    {
        css: {
            backgroundImage: "./../../resources/images/pexels-alamsaim-29280658.jpg",
            familyFont_1: "oxanium",
            familyFont_2: "conthrax",
        },
        logic: {
            id: "html",
            title: "HTML",
            progress: 100
        },
        node: {
            html: "a",
            style: "a"
        }
    },
    {
        css: {
            backgroundImage: "./../../resources/images/pexels-iskyfluous-3484440.jpg",
            familyFont_1: "oxanium",
            familyFont_2: "conthrax",
        },
        logic: {
            id: "css",
            title: "CSS",
            progress: 95
        },
        node: {
            html: "a",
            style: "a"
        }
    },
    {
        css: {
            backgroundImage: "./../../resources/images/pexels-oznkary-16509173.jpg",
            familyFont_1: "oxanium",
            familyFont_2: "conthrax",
        },
        logic: {
            id: "js",
            title: "JAVASCRIPT",
            progress: 91
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