export const init = async (l, box) => {
    const cubeContainer = document.querySelector("#cubeContainer")

    const component = await l.helper.component.addComponent({
        'module': l.component.cube3d,
        parent: cubeContainer
    })
}