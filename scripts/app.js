const iface = {
    /*     scale: "./iface/scale.js",
     */
    section1Iface: "./iface/section1-iface.js"
}

const modules = {
    scroll: "./scroll.js",
    scroll_control: "./controls/scroll-control.js",
    section1_iface: "./iface/section1-iface.js",
    section1_control: "./controls/section1-control.js"
}

const getModules = async (modules) => {
    const resolved = {}
    await Promise.all(Object.entries(modules).map(([key, value]) => import(value).then(mod => { resolved[key] = mod })))
    return resolved
}

export const init = async () => {
    return await getModules(modules)
}