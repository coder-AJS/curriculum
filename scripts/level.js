const levelVersion = "0017b2acf949276dad69fbcbad0980f0e1c9b7c2"
const serverUrl = `https://cdn.jsdelivr.net/gh/coder-ajs/lev@${levelVersion}`

export const init = async (base, resolver) => {
    
    const helpers = {
        component: `${serverUrl}/helpers/components.js`,
        dom: `${serverUrl}/helpers/dom.js`,
        reactive: `${serverUrl}/helpers/reactive.js`,
        css: `${serverUrl}/helpers/css.js`,
        tempo: `${serverUrl}/helpers/tempo.js`
    }

    const components = {
/*     statCard: `${serverUrl}/components/avancedProgressCard001.js`,
 */    statCard: base + "/scripts/components/card.js",
        cube3d: base + "/scripts/components/cube.js"
    }

    await Promise.all([
        resolver.getModules(helpers),
        resolver.getModules(components)
    ])
    return { "helper": helpers, "component": components }
}
