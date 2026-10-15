import * as appLock from "./controls/appLock.js"

const importModules = async () => {
    const [level, app] = await Promise.all([
        import("./level.js").then(mod => mod.init()),
        import("./app.js").then(mod => mod.init())
    ])
    return [level, app]
}

const prepareApp = async (reactives, level, app) => {
    await Promise.all([
        app.iface.section1.init(reactives, level)
    ])
}

const loadControls = async (app, level) => {
    await Promise.all([
/*         app.controls.scroll.init(reactives, level.helpers),
 */    ])
}

const init = async () => {
    appLock.block()

    const reactives = {}
    const [level, app] = await importModules()

    await prepareApp(reactives, level, app)
    await loadControls(app, level)
}

init()