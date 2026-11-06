export const init = async (box, text, delay) => {
    for (const item of Array.from(text)) {
        const charBox = box.appendChild(document.createElement("span"))
        charBox.textContent = item === " " ? "\u00A0" : item
        await new Promise(resolve => setTimeout(resolve, delay))
    }
    return
}