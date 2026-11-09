export const init = (g, l) => {
    const sectionScroll = document.querySelector("#sectionScroll")
    g.reactive.scroll = l.helper.reactive.newReactive()

    g.reactive.scroll.add({
        name: "dynamicScroll",
        value: 0,
/*         listeners: [
            (v) => smoothScroll(v, sectionScroll, g),
            (v) => changeSection(v, g),
            () => scale_control.scalePos(g, l),
            (v) => scale_control.viewPos(v, l),
            (v) => wellcome_control.setBgSize(g, l, v)
        ]
 */        listeners: (v) => console.log(v)
    })

    const onSection = g.reactive.scroll.add({
        name: "onSection",
        value: "wellcome",
        /*         listeners: [
                    alertSection,
         */            /* section1 first time */
        /*             async () => {
                        if (!g.static.section1_animated) {
                            block(g, true)
                            stats_control.animate()
                            g.static.section1_animated = true
                            block(g, false)
                            scale_control.block(g, l, false)
                        }
                    }
                ]
            })
         */
        listeners: (v) => console.log(v)
    })
}