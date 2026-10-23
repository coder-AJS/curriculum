const levelVersion = "b748e1909e0890add47656960828714ea7f8eb6c"
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
 */    statCard: `./../card.js`,
}

const getModules = async (modules) => {
    const promises = []
    Object.entries(modules).forEach(([key, value]) => promises.push(import(value).then(mod => modules[key] = mod)))
    await Promise.all(promises)
}

export const init = async () => {
    const level = { "helper": helpers, "component": components }
    await Promise.all([
        getModules(level.helper),
        getModules(level.component)
    ])
    return level
}