import * as framework from "./level.js"
import * as resolver from "./helper/resolver.js"
import * as reactives from "./reactives.js"
/* import { permitedScroll } from "./controls/scroll-control.js"
 */
const isLocal = window.location.hostname === "127.0.0.1"
const base = isLocal ? "" : "/curriculum"

const controls = {
    stats: base + "/scripts/controls/stats-control.js",
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

const prepareApp = (app, level, control, iface) => {
    control.scroll.init(app, level)



    /* parallel */

}

const init = async () => {
    const [level] = await Promise.all([
        framework.init(base, resolver),
        resolver.getModules(controls),
        resolver.getModules(iface)
    ])

    const app = {
        base: base,
        dynamic: {
            permitedScroll: null,
            scrollLock: true
        },
        reactive: {
            iface: {
                wellcome: level.helper.reactive.newReactive(),
                section1: level.helper.reactive.newReactive()
            },
            vp: level.helper.reactive.newReactive(),
        }
    }

    reactives.init(app, level)
    prepareApp(app, level, controls, iface)
}

init()