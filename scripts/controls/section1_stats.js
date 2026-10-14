let helpers = null

export const init = (viewPort, helpersOBJ) => {
    helpers = helpersOBJ
}

export const animateStats = async () => {
    const statBoxes = document.querySelectorAll(".statBox")

    for (let i = 0; i < statBoxes.length; i++) {
        statBoxes[i].classList.remove("statHidden")
        await helpers.tempo.sleep(150)
    }
    await helpers.tempo.sleep(2000)
}