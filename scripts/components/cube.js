const classStyle = new CSSStyleSheet()
classStyle.replaceSync(`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        user-select: none;
    }

    :host {
        display: flex;
        width: 100%;
        max-width: 1200px;
        min-width: 200px;
        height: 100%;
        max-height: 1200px;
        min-height: 200px;
    }

    .main {
        perspective: var(--perspective);
        border: 4px solid green;


    }

    .max { width: 100%; height: 100% }
    .absolute { position: absolute; }
    .relative { position: relative; }
`)

export default class Cube3d extends HTMLElement {
    #initialized = false
    #ready = false
    #state = new Proxy({
        css: false,
        logic: false,
    }, {
        set: (target, property, value) => {
            target[property] = value
            if (Object.values(target).every(Boolean)) {
                this.#ready = true
                this.#alertDom()
            }
            return true
        }
    })

    constructor() {
        super()

        this.css = {
            perspective: "800px",

        }

        this.logic = {
            id: null,
            dom: document,
            event: null
        }

        this.dom = this.attachShadow({ mode: "open" })
        this.dom.adoptedStyleSheets = [classStyle]
    }

    #draw() {
        this.dom.innerHTML = `
            <ul class="main max relative">
                <li class="side absolute"></li>
            </ul>
        `

    }

    #alertDom() { this.logic.dom.dispatchEvent(new CustomEvent(this.logic.event, { detail: { id: this.logic.id, state: true, instance: this } })) }

    async configure(type, config) {
        if (type !== "css" && type !== "logic") {
            console.error("component error: configure type not valid", this)
            return
        }

        const configObj = this[type]
        for (const key of Object.keys(config)) {
            if (!(key in configObj)) {
                console.error(`component error: ${key} is not valid prop`, this)
                return
            }
        }

        Object.assign(configObj, config)

        if (type === "css") {
            this.update()
            this.#state.css = true
        }

        if (type === "logic") {
            if (!configObj.id || !configObj.event) {
                console.error("component error: logic id/event not configured", this)
                return
            }
            this.#state.logic = true
        }
    }

    update() { Object.entries(this.css).forEach(([key, value]) => this.style.setProperty(`--${key}`, value)) }

    init() {
        console.trace()
        if (!this.#ready) {
            console.error("component error: not ready", this)
            return null
        }

        if (this.#initialized) {
            console.trace("component error: previously initialited", this)
            return
        }

        this.#initialized = true
        this.#draw()
    }
}

customElements.define("cube-3d", Cube3d)