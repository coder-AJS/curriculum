export const init = async (l) => {
    const cubePerspective = 1000
    const cube = await addCube(l, cubePerspective)

    return cube
}

const addCube = async (l, cubePerspective) => {
    const css = { perspective: cubePerspective + "px" }
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
    const layers = [
        { pos: 0, scale: 1 },
        { pos: 50, scale: 0.925 },
        { pos: 100, scale: 0.85 },
        { pos: 150, scale: 0.775 }
    ]

    const visible = {
        0: [3, 7],
        1: [2, 4],
        2: [0, 6],
        3: [1, 8]
    }

    const addTextBoxes = (l, text, container) => {

        layers.forEach((layer, layerIndex) => {
            const newLayer = l.helper.dom.inject({ tag: "li", parent: container, className: `scene-3d FCenter max absolute` })


            Array.from(text).forEach((item, charIndex) => {
                const char = l.helper.dom.inject({ tag: "div", parent: newLayer, className: "text hiddenText" })
                char.textContent = item
                if (visible[layerIndex].includes(charIndex)) {
                    const index = visible[layerIndex].indexOf(charIndex)
                    visible[layerIndex][index] = char
                }
            })

        })
        distributeChars()
        return container.outerHTML
    }

    const distributeChars = () => {
        Object.values(visible).forEach(item => {
            item.forEach(item => item.classList.remove("hiddenText"))
            
        })
    }

    let mainBox = l.helper.dom.add({ tag: "ul", className: "parallax FCenter max relative" })
    mainBox = addTextBoxes(l, "FRONT-END", mainBox)

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
                        &:nth-child(3) { transform: translateZ(${layers[2].pos}px) scale(${layers[2].scale}); }
                        &:nth-child(4) { transform: translateZ(${layers[3].pos}px) scale(${layers[3].scale}); }
                    }
                }

                .text {
                    font-family: "anarchy";
                    font-size: 16cqi;
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