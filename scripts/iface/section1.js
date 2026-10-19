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
        console.log(e.detail.id, e.detail.state)

        componentsReady[e.detail.id] = e.detail.state
        validateStatsReady()
        componentsReady[e.detail.id] = true
        e.detail.instance.init()
    })

    const stat3dBoxes = document.querySelectorAll(".stat3d")
    Object.entries(config).forEach((item, index) => createComponent(stat3dBoxes[index], item, level.components.statCard))
}

const config = {
    html: {
        css: {
            backgroundImage: "./../../resources/images/pexels-zkadoshi-35285739.jpg",
            fontFamily_1: "oxanium",
            fontFamily_2: "conthrax",
        },
        logic: {
            id: "html",
            title: "HTML",
        }
    },
    css: {
        css: {
            backgroundImage: "./../../resources/images/pexels-wonkaz-34551555.jpg",
            fontFamily_1: "oxanium",
            fontFamily_2: "conthrax",
        },
        logic: {
            id: "css",
            title: "CSS",
        }
    },
    js: {
        css: {
            backgroundImage: "./../../resources/images/pexels-oznkary-16509173.jpg",
            fontFamily_1: "oxanium",
            fontFamily_2: "conthrax",
        },
        logic: {
            id: "js",
            title: "JAVASCRIPT",
        },
    }
}

const nodes = {
    html: [
        "Cumplimiento estricto de estándares W3C",
        "Arquitectura correcta de marcado semántico",
        "Optimización de layouts y estructuras",
        "Desarrollo front limpio sin estilos inline",
        "Diseño y validación nativa de formularios"
    ],
    css: [
        "Optimización de estilos modulares y CSS Nesting",
        "Diseños 100% responsive y/o auto-adaptativos",
        "Auto-reactividad visual mediante selectores avanzados",
        "Interacción de capas, apilamiento y posicionamiento",
        "Uso de unidades relativas auto-adaptables (container)"
    ],
    js: [
        "Desarrollo de arquitectura modular y optimizada (vanilla)",
        "Web Components nativos e inyeccion inversa de dependencias",
        "Reactividad y auto-reactividad desde/hacia objetos",
        "Manipulación de DOM y control de eventos",
        "Control optimizado de asincronía en paralelo"
    ]
}

const addnodesTemplate = async (nodeContent) => {
    const nodeTemplate = `
        <ul class="nodeList absolute">
            ${nodeContent.map(item => `<li class="listItem">* ${item}</li>`).join("")}
        </ul>`

    const nodeStyle = `
        .nodeList {
            bottom: 0;
            width: 100%;
            height: 86%;
            padding: 10px;
            font-size: 12px;
            color: var(--black);

            .listItem { 
            padding-left: 12px;
            text-indent: -12px;
            }
        }
    `

    return { "html": nodeTemplate, "style": nodeStyle }
}

const createComponent = async (box, config, component) => {
    const instance = new component.default()
    box.appendChild(instance)
    await instance.configure("css", config[1].css)
    await instance.configure("logic", config[1].logic)
    await instance.configure("node", await addnodesTemplate(nodes[config[0]]))
}

console.log(config)