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
            id: "statHtml",
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
            id: "statCss",
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
            id: "statJs",
            title: "JAVASCRIPT",
            progress: 90
        },
        node: {
            html: "a",
            style: "a"
        }
    },
]

let html = false
let css = false
let js = false
document.addEventListener("component", (e) => {
   e.detail.id.includes("Html") && (html = true)
   e.detail.id.includes("Css") && (css = true)
   e.detail.id.includes("Js") && (js = true)

})

const createComponent = async (box, config, component) => {
    const instance = new component.default()
    box.appendChild(instance)
    instance.configure("css", config.css)
    instance.configure("logic", config.logic)
    instance.addToNode(config.node)
    console.log(box, config, component)

    await new Promise(resolve => setTimeout(resolve, 1000))
/*     instance.init()
 */}