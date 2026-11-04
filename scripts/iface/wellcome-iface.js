export const init = async (l) => {
    const cubePerspective = 500
    const cube = await addCube(l, cubePerspective)

    return cube
}

const addCube = async (l, cubePerspective) => {
    const css = {
        perspective: cubePerspective + "px",
        transition: "500ms ease-out"

    }
    const logic = { id: "cube" }

    const cube = await l.helper.component.prepare({
        module: l.component.cube3d,
        css: css,
        logic: logic,
        node: addNodes(l, cubePerspective)
    })

    return cube
}

const addNodes = (l, cubePerspective) => {
    const layers = [ { pos: 0, scale: 1 }, { pos: 100, scale: 0.7 } ]
    const visible = { 0: [1, 3, 5, 7], 1: [0, 2, 4, 6, 8] }

    let mainBox = l.helper.dom.add({ tag: "ul", className: "parallax FCenter max relative" })
    mainBox = addTextBoxes(l, layers, "FRONT-END", mainBox, visible)

    const nodes = {
        back: {
            html: mainBox,
            style: `
                .parallax {
                    transform-style: preserve-3d;
                    perspective: ${cubePerspective}px;

                    .scene-3d {
                        transform-style: preserve-3d;

                        &:nth-child(1) { transform: translateZ(${layers[0].pos}px) scale(${layers[0].scale}); }
                        &:nth-child(2) { transform: translateZ(${layers[1].pos}px) scale(${layers[1].scale}); }
                    }
                }

                .text {
                    font-family: "letter";
                    font-size: 24cqi;
                    color: var(--white);
                    overflow: hidden;
                    transform-style: preserve-3d;
                }

                .hiddenText {
                    opacity: 0;
                }
            `
        }
    }

    return nodes
}

const addTextBoxes = (l, layers, text, container, visible) => {
    layers.forEach((layer, layerIndex) => {
        const newLayer = l.helper.dom.inject({ tag: "li", parent: container, className: `scene-3d FCenter absolute` })


        Array.from(text).forEach((item, charIndex) => {
            const char = l.helper.dom.inject({ tag: "div", parent: newLayer, className: "text fontAdjust hiddenText" })
            char.textContent = item
            if (visible[layerIndex].includes(charIndex)) {
                const index = visible[layerIndex].indexOf(charIndex)
                visible[layerIndex][index] = char
            }
        })

    })
    distributeChars(visible)
    return container.outerHTML
}

const distributeChars = (visible) => {
    Object.values(visible).forEach(item => {
        item.forEach(item => item.classList.remove("hiddenText"))

    })
}
