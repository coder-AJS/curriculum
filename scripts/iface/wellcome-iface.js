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
        logic: logic
    })

    return cube
}