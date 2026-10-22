import * as scroll from "./scroll.js"

const importModules = async () => {
    const [level, app] = await Promise.all([
        import("./level.js").then(mod => mod.init()),
        import("./app.js").then(mod => mod.init())
    ])
    return [level, app]
}

const prepareApp = (g, l, a) => {
    a.scroll.init(g, l)
    a.scroll_control.init(g, l)
    a.section1_iface.init(l)
    a.section1_control.init(g, l)
}

const init = async () => {
    const global = { static: {}, reactive: {} }
    scroll.block(global)

    const [level, app] = await importModules()
    prepareApp(global, level, app)
}

init()