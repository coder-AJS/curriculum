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
        node: addNodes(cubePerspective)
    })

    return cube
}

const addNodes = (cubePerspective) => {
    const layer1_pos = 40
    const scale1 = 0.9
    const layer2_pos = 80
    const scale2 = 0.8
    const layer3_pos = 120
    const scale3 = 0.7

    const nodes = {
        back: {
            html: `
                <div class="main FCenter max relative">
                    <div class="text absolute">FRONT-END</div>
                    <div class="scene-3d absolute"><div class="text">FRONT-END</div></div>
                    <div class="scene-3d absolute"><div class="text">FRONT-END</div></div>
                    <div class="scene-3d absolute"><div class="text">FRONT-END</div></div>
                </div>
            `,
            style: `
                .main {
                    transform-style: preserve-3d;

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

