import * as framework from "./level.js"
import * as resolver from "./helper/resolver.js"

const controls = {
    scroll: "/scripts/controls/scroll-control.js",
    scale: "/scripts/controls/scale-control.js",
    section1: "/scripts/controls/section1-control.js"
}

const iface = {
    scale: "/scripts/iface/scale-iface.js",
    section1: "/scripts/iface/section1-iface.js"
}

const prepareApp = (global, level, control, iface) => {
    control.scroll.init(global, level)

    /* parallel */
    control.scale.init(global, level, iface.scale)
    control.section1.init(global, level, iface.section1)
}

const init = async () => {
    const global = { static: {}, reactive: {} }

    const [level] = await Promise.all([
        framework.init(resolver),
        resolver.getModules(controls),
        resolver.getModules(iface)
    ])
    
    prepareApp(global, level, controls, iface)
}

init()