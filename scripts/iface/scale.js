export const init = async (level) => {
    const scrollScale = document.querySelector("#scrollScale")

    const scale = level.helpers.dom.addToDom({
        tag: "ul",
        parent: scrollScale,
        className: "marksBox max relative FCol FA_end FJ_between"
    })

    drawMarks(level, scale)
}

const drawMarks = (level, scale) => {
    const scaleHeight = scale.offsetHeight
    const marksDistance = parseFloat(level.helpers.style.getVar("marksMargin", scale))

    for (let i = 0; i <= 100; i+=2 ) {
        const newMark = level.helpers.dom.addToDom({ tag: "li", parent: scale })

        if (i % 20 === 0) newMark.className = "marksScale bigMark relative"
        if (i % 10 === 0 && i % 20 !== 0) newMark.className = "marksScale mediumMark"
        if (i % 2 === 0 && i % 10 !== 0 && i % 20 !== 0) newMark.className = "marksScale littleMark"
    }
}