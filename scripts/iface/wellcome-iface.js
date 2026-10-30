export const init = async (l) => {
    const cube = await addCube(l)

    return cube
}

const addCube = async (l) => {
    const cubeContainer = document.querySelector("#cubeContainer")
    const css = { perspective: "1000px" }
    const logic = {
        id: "cube3d",
        event: "wellcome-cube"
    }

    const component = await l.helper.component.add({
        'module': l.component.cube3d,
        parent: cubeContainer
    })

    component.configure("css", css)
    component.configure("logic", logic)
    component.init()
    return component
}