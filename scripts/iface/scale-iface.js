export const init = async (l) => {
    const scrollScale = document.querySelector("#scrollScale")

    const scale = l.helper.dom.addToDom({
        tag: "ul",
        parent: scrollScale,
        className: "marksBox FCol FA_end FJ_between absolute"
    })

    /* scale */
    drawMarks(l, scale)
    applyHeight(l, scale)
    window.addEventListener("resize", () => applyHeight(l, scale))
}

const applyHeight = (l, scale) => {
    const bodyHeight = document.querySelector("#wellcome").offsetHeight + document.querySelector("#sectionScroll").offsetHeight
    l.helper.style.setVar("dynamicHeight", bodyHeight + "px", scale)
}

const drawMarks = (l, scale) => {
    for (let i = 0; i <= 100; i++) {
        const newMark = l.helper.dom.addToDom({ tag: "li", parent: scale })

        const getType = (i) => {
            if (i % 10 === 0) return "bigMark"
            if (i % 5 === 0) return "mediumMark"
            return "littleMark"
        }

        const markType = getType(i)
        newMark.className = `marks ${markType} numberMark relative`
        if (markType === "bigMark" || markType === "mediumMark") newMark.style.setProperty("--value", `"${i}"`)
    }
} 

/* selector */
