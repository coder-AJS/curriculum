export const init = async (l) => {
    const cube = await addCube(l)

    return cube
}

const addCube = async (l) => {
    const cubeContainer = document.querySelector("#cubeContainer")
    const css = { perspective: "1000px" }
    const logic = {
        id: "wellcome_cube",
        event: "wellcome_cube"
    }

    const component = await l.helper.component.add({
        'module': l.component.cube3d,
        parent: cubeContainer
    })

    component.configure("css", css)
    component.configure("logic", logic)
    return component
}