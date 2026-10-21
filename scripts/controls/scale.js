export const updateTop = (scroll) => {
    console.log(scroll)
    const marksBox = document.querySelector(".marksBox")
    marksBox.style.setProperty("--topHover", scroll + "px") 
}