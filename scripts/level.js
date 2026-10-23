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

export const init = () => { return { "helper": helpers, "component": components } }
