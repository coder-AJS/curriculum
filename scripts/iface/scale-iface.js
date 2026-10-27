export const init = async (l) => {
    const marksBox = document.querySelector("#marksBox")
    drawMarks(l, marksBox)
}

/* scale */
const drawMarks = (l, marksBox) => {
    for (let i = 0; i <= 100; i++) {
        const newMark = l.helper.dom.addToDom({ tag: "li", parent: marksBox })

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