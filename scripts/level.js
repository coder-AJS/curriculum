const levelVersion = "f0077e5113509ac68f8779b64e3ee23199cfc30b"
const serverUrl = `https://cdn.jsdelivr.net/gh/coder-ajs/lev@${levelVersion}`

const helpers = {
    component: `${serverUrl}/helpers/components.js`,
    dom: `${serverUrl}/helpers/dom.js`,
    reactive: `${serverUrl}/helpers/reactive.js`,
    style: `${serverUrl}/helpers/style.js`,
    tempo: `${serverUrl}/helpers/tempo.js`
}

const components = {
/*     statCard: `${serverUrl}/components/avancedProgressCard001.js`,
 */    statCard: `/scripts/components/card.js`,
 cube3d : "/scripts/components/cube.js"
}

export const init = async (resolver) => {
    await Promise.all([
        resolver.getModules(helpers),
        resolver.getModules(components)
    ])
    return { "helper": helpers, "component": components }
}
