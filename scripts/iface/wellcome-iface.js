export const init = async (l) => {
    const cube = await addCube(l)

    return cube
}

const addCube = async (l) => {
    const css = { perspective: "1000px" }
    const logic = { id: "cube" }

    const cube = await l.helper.component.prepare({
        module: l.component.cube3d,
        css: css,
        logic: logic,
        node: node
    })

    return cube
}

const node = {
    back: {
        html: `
            <ul class="scene-3d FCenter max relative">
                <li class="textLayer absolute">FRONT-END</li>
                <li class="textLayer absolute">FRONT-END</li>
                <li class="textLayer absolute">FRONT-END</li>
                <li class="textLayer absolute">FRONT-END</li>
            </ul>
        `,
        style: `
            .scene-3d {
                border: 10px solid green;

                .textLayer {
                    perspective: 300px;
                    font-family: "oxanium";
                    font-weight: bolder;
                    font-size: 16cqi;
                }
            }
        `
    }
}

