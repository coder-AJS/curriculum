let helpers = null

export const init = (viewPort, helpersOBJ) => {
    helpers = helpersOBJ
}


export const animateStats = async () => {
    const statBoxes = document.querySelectorAll(".statBox")
    for (const box of statBoxes) {
        box.classList.remove("stat_hidden")
        await helpers.tempo.sleep(160)
    }
    await helpers.tempo.sleep(2000)
}