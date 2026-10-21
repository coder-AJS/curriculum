export const init = async (level) => {
    const scrollScale = document.querySelector("#scrollScale")

    const scale = level.helpers.dom.addToDom({
        tag: "ul",
        parent: scrollScale,
        className: "marksBox FCol FA_end FJ_between"
    })

    drawMarks(level, scale)
}

const drawMarks = (level, scale) => {
    const scaleHeight = scale.offsetHeight
    const marksDistance = parseFloat(level.helpers.style.getVar("marksMargin", scale))

    for (let i = 0; i <= 100; i++) {
        const newMark = level.helpers.dom.addToDom({ tag: "li", parent: scale })

        const getType = (i) => {
            if (i % 5 === 0) return "bigMark"
            return "littleMark"
        }

        const markType = getType(i)
        newMark.className = `marks ${markType} relative`
        if (markType === "bigMark" || markType === "mediumMark") newMark.style.setProperty("--value",`"${i}"`)
    }
} 