import * as framework from "./level.js"
import * as resolver from "./helper/resolver.js"

const isLocal = window.location.hostname === "127.0.0.1"
const base = isLocal ? "" : "/curriculum"

const controls = {
    scroll: base + "/scripts/controls/scroll-control.js",
    scale: base + "/scripts/controls/scale-control.js",
    components: base + "/scripts/controls/components-control.js",
    wellcome: base + "/scripts/controls/wellcome-control.js",
    section1: base + "/scripts/controls/section1-control.js"
}

const iface = {
    wellcome: base + "/scripts/iface/wellcome-iface.js",
    scale: base + "/scripts/iface/scale-iface.js",
    section1: base + "/scripts/iface/section1-iface.js"
}

const prepareApp = (global, level, control, iface) => {
    control.scroll.init(global, level)
    control.components.init(global, level) /* here init devMode */
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
            },
            vp: level.helper.reactive.newReactive(),
        }
    }

    prepareApp(global, level, controls, iface)
}

init()