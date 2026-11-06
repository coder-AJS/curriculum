export const init = (g, l) => {
    const scale = document.querySelector("#scale")
    const defaulTransition = getComputedStyle(scale).transition
    
    window.addEventListener("resize", () => {
        scale.style.transition = "none"
    })
}