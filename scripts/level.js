const levelVersion = "a9d5b2b919a6b6601354d9ce35613ec099b1dc07"
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
