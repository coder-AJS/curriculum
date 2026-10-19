const levelVersion = "1240f6f8541d288b8cb2c2e7f975a2d7ef7a4d94"
const serverUrl = `https://cdn.jsdelivr.net/gh/coder-ajs/lev@${levelVersion}`

const helpers = {
    component: `${serverUrl}/helpers/components.js`,
    dom: `${serverUrl}/helpers/dom.js`,
    reactive: `${serverUrl}/helpers/reactive.js`,
    tempo: `${serverUrl}/helpers/tempo.js`
}

const components = {
/*     statCard: `${serverUrl}/components/avancedProgressCard001.js`,
 */    statCard: `./../card.js`,
}

const getModules = async (modules) => {
    return Object.fromEntries(await Promise.all(
        Object.entries(modules).map(async ([key, value]) => [key, await import(value)])
    ))
}

export const init = async () => {
    const modules = { helpers, components }
    return Object.fromEntries(await Promise.all(
        Object.entries(modules).map(async ([key, value]) => [key, await getModules(value)])
    ))
}