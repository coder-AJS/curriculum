import * as scroll from "./controls/scroll.js"

const importModules = async () => {
    const [level, app] = await Promise.all([
        import("./level.js").then(mod => mod.init()),
        import("./app.js").then(mod => mod.init())
    ])
    return [level, app]
}

const prepareApp = async (reactives, level, app) => {
    await Promise.all([
/*         app.iface.scale.init(level),
        app.iface.section1.init(reactives, level)
 */    ])
}

const loadControls = async (global, level, app) => {
    await app.controls.scroll.init(global, level)
    /*         app.controls.appScroll.init(reactives, level),
     */
}

const init = async () => {
    const global = { static: {}, reactive: {} }
    scroll.block(global)

    const [level, app] = await importModules()

    await prepareApp(global, level, app)
    await loadControls(global, level, app)
}

init()