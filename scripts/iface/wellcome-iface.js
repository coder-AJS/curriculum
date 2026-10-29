export const init = async (l, box) => {
    const cubeContainer = document.querySelector("#cubeContainer")

    const css = {}
    const logic = {
        id: "cube3d",
        event: "wellcome-cube"
    }

    const component = await l.helper.component.addComponent({
        'module': l.component.cube3d,
        parent: cubeContainer
    })

    component.configure("css", {})
    component.configure("logic", logic)

    component.init()
}