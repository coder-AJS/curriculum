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
    const layers = ["layer0", "layer1", "layer2", "layer3"]
    const layer1_pos = 40
    const scale1 = 0.9
    const layer2_pos = 80
    const scale2 = 0.8
    const layer3_pos = 120
    const scale3 = 0.7

    const addTextBoxes = (l, text, container) => {
        for (const layer of layers) {
            const newLayer = l.helper.dom.inject({ tag: "li", parent: container, className: `${layer} FCenter max relative` })

            Array.from(text).forEach(item => {
                const charBox = l.helper.dom.inject({ tag: "li", parent: newLayer })
                const char = l.helper.dom.inject({ tag: "div", parent: charBox })
                char.textContent = item
            })
        }
        return container.outerHTML
    }

    let mainBox = l.helper.dom.add({ tag: "ul", className: "parallax FCenter max relative" })
    mainBox = addTextBoxes(l, "FRONT-END", mainBox)

    console.log(mainBox)

    const nodes = {
        back: {
            html: mainBox,
            style: `
                .parallax {
                    transform-style: preserve-3d;
                    border: 11px solid red;

                    .scene-3d {
                        perspective: ${cubePerspective}px;
                        transform-style: preserve-3d;

                        &:nth-child(2) .text { transform: translateZ(${layer1_pos}px) scale(${scale1}); }
                        &:nth-child(3) .text { transform: translateZ(${layer2_pos}px) scale(${scale2}); color: red; }
                        &:nth-child(4) .text { transform: translateZ(${layer3_pos}px) scale(${scale3}); color: blue; }
                    }
                }

                .text {
                    font-family: "oxanium";
                    font-size: 16cqi;
                    transform-style: preserve-3d;
                }

            `
        }
    }
    
    return nodes
}

