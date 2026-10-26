export const init = (g, l, iface) => {
    iface.init(l)

    console.log(g, l)
}

export const updatePos = (g) => {
    const marksBox = document.querySelector(".marksBox")
        console.log(document.body.offsetHeight, marksBox.offsetHeight)

    marksBox.style.setProperty("--dynamicTop", g.reactive.vp.dynamicScroll + "vh") 
}
