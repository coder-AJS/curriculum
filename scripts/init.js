import * as framework from "./level.js"

const controls = {
    scroll: "./controls/scroll-control.js",
/*     scale: "./controls/scale-control.js",
 */    section1: "./controls/section1-control.js"
}

const iface = {
    scale: "./iface/scale-iface.js",
    section1: "./iface/section1-iface.js"
}

const getModules = async (modules) => {
    await Promise.all(Object.entries(modules).map(([key, value]) => import(value).then(mod => { modules[key] = mod })))
}

const prepareApp = (global, level, control, iface) => {
    control.scroll.init(global, level)

    /* parallel */
    iface.scale.init(level)
    control.section1.init(global, level, iface.section1)
}

const init = async () => {
    const global = { static: {}, reactive: {} }

    const [level] = await Promise.all([
        framework.init(),
        getModules(controls),
        getModules(iface)
    ])
    prepareApp(global, level, controls, iface)
}

init()