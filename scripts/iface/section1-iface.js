import * as typeAnimation from "./../animations/typeWriter.js"

const addComponents = async (g, l, box, index) => {
    const config = [
        {
            css: {
                backgroundImage: g.base + "/resources/images/pexels-zkadoshi-35285739.jpg",
                fontFamily_1: "oxanium",
                fontFamily_2: "conthrax",
            },
            logic: { id: "htmlCard", title: "HTML" }
        },
        {
            css: {
                backgroundImage: g.base + "/resources/images/pexels-wonkaz-34551555.jpg",
                fontFamily_1: "oxanium",
                fontFamily_2: "conthrax"
            },
            logic: { id: "cssCard", title: "CSS" }
        },
        {
            css: {
                backgroundImage: g.base + "/resources/images/pexels-oznkary-16509173.jpg",
                fontFamily_1: "oxanium",
                fontFamily_2: "conthrax",
            },
            logic: { id: "jsCard", title: "JAVASCRIPT" },
        }
    ]

    const nodes = [
        [
            "Cumplimiento estricto de estándares W3C",
            "Arquitectura correcta de marcado semántico",
            "Optimización de layouts y estructuras html",
            "Desarrollo front limpio sin estilos inline",
            "Diseño y validación nativa de formularios"
        ],
        [
            "Optimización de estilos modulares y CSS Nesting",
            "Diseños 100% responsive y/o auto-adaptativos",
            "Auto-reactividad visual mediante selectores avanzados",
            "Interacción de capas, apilamiento y posicionamiento",
            "Uso de unidades relativas auto-adaptables (container)"
        ],
        [
            "Desarrollo de arquitectura modular y optimizada (vanilla)",
            "Web Components nativos e inyeccion inversa de dependencias",
            "Reactividad y auto-reactividad desde/hacia objetos",
            "Manipulación de DOM y control de eventos",
            "Control optimizado de asincronía en paralelo"
        ]
    ]

    const addnodesTemplate = async (nodeContent) => {
        const html = `
        <ul class="nodeList absolute">${nodeContent.map(item => `<li class="listItem">● ${item}</li>`).join("")}</ul>`

        const style = `
        .nodeList {
            bottom: 0;
            width: 100%;
            height: 86%;
            padding: 10px;
            font-size: 12px;
            color: var(--black);

            .listItem { 
                padding-left: 20px;
                text-indent: -14px;
            }
        }
    `
        return { "html": html, "style": style }
    }

    const component = await l.helper.component.add({
        module: l.component.statCard,
        parent: box,
        css: config[index].css,
        logic: config[index].logic,
        node: await addnodesTemplate(nodes[index])
    })
    component.classList.add("card-component")
}

export const init = async (g, l) => {
    const cardBox = document.querySelectorAll(".cardBox")
    cardBox.forEach((item, index) => addComponents(g, l, item, index))
}

export const addTitle = async (g, l) => {
    if (g.static.section1_animated) return
    /* type animation */
    const title = document.querySelector("#hardTitle")
    const delay = parseFloat(l.helper.css.get("scrollTransition").split(" ")[0])
    await l.helper.tempo.sleep(delay)
    await l.animation.typeWriter.init(title, "HARD SKILLS", 80)
    await l.helper.tempo.sleep(500)
    /* toSide animation */
    l.animation.toSide.toRigthSeq(title, "2000ms", 200)
}