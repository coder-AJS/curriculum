const onError = () => {
    return console.trace("error in required parametres")
}

const addText = (box, text) => {
    for (const item of Array.from(text)) {
        const charBox = box.appendChild(document.createElement("span"))
        charBox.textContent = item === " " ? "\u00A0" : item
    }
    return box.querySelectorAll("span")
}

export const appear = async ({
    box = null,
    text = null,
    blur = 100,
    scale = 3,
    transition = 500,
    delay = 0
} = {}) => {
    if (!box || !text) return onError()

    const boxes = addText(box, text)
    boxes.forEach(item => {
        item.style.opacity = 0
        item.style.transition = transition + "ms"
        item.style.filter = `blur(${blur}px)`
        item.style.transform = `scale(${scale})`
    })
    await new Promise(requestAnimationFrame)
    await new Promise(requestAnimationFrame)

    for (const item of boxes) {
        item.style.opacity = 1
        item.style.filter = "blur(0px)"
        item.style.transform = "scale(1)"
        await new Promise(resolve => setTimeout(resolve, delay))
    }

    await new Promise(resolve => setTimeout(resolve, transition))
    return
}