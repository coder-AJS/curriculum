export const toRigthSeq = async (box, transition, delay) => {
    const charBoxes = Array.from(box.querySelectorAll("span"))
    const boxesWidth = charBoxes.map(item => item.offsetWidth)
    const charsSum = boxesWidth.reduce((acumulador, actual) => acumulador + actual, 0)

    charBoxes.forEach(item => {
        item.style.transition = transition
        item.style.left = 0
        item.style.position = "relative"
    })

    await new Promise(resolve => setTimeout(resolve, 50))

    for (let i = charBoxes.length - 1; i >= 0; i--) {
        charBoxes[i].style.left = `calc(100% - ${charsSum}px)`
        await new Promise(resolve => setTimeout(resolve, delay))
    }
}