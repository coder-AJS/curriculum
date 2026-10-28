import * as framework from "./level.js"
import * as resolver from "./helper/resolver.js"

const controls = {
    scroll: "/scripts/controls/scroll-control.js",
    scale: "/scripts/controls/scale-control.js",
    wellcome: "/scripts/controls/wellcome-control.js",
    section1: "/scripts/controls/section1-control.js"
}

const iface = {
    wellcome: "/scripts/iface/wellcome-iface.js",
    scale: "/scripts/iface/scale-iface.js",
    section1: "/scripts/iface/section1-iface.js"
}

const prepareApp = (global, level, control, iface) => {
    control.scroll.init(global, level)
    control.wellcome.init(global, level, iface.wellcome)

    /* parallel */
    control.scale.init(global, level, iface.scale)
    control.section1.init(global, level, iface.section1)
}

const init = async () => {
    const [level] = await Promise.all([
        framework.init(resolver),
        resolver.getModules(controls),
        resolver.getModules(iface)
    ])

    const global = {
        static: {},
        reactive: {
            iface: {
                wellcome: level.helper.reactive.newReactive(),
                section1: level.helper.reactive.newReactive()
            }
        }
    }

    prepareApp(global, level, controls, iface)
}

init()