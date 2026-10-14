export const init = (helpers, components) => {
    const stat3dBoxes = document.querySelectorAll(".stat3d")

    stat3dBoxes.forEach((item, index) => createComponent(item, config[index], components.statCard))
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

let statsReady = {
    html: false,
    css: false,
    js: false
}

const alertDom = () => {

}

document.addEventListener("component", (e) => {
    statsReady[e.detail.id] = e.detail.state
    Object.values(statsReady).every(Boolean) && alertDom()
})

const createComponent = async (box, config, component) => {
    const instance = new component.default()
    box.appendChild(instance)
    instance.configure("css", config.css)
    instance.configure("logic", config.logic)
    instance.addToNode(config.node)
    console.log(box, config, component)
}