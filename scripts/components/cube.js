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
        border: 1px solid white;
        transform-style: preserve-3d;
        transform-origin: center;
        transform: rotateX(var(--rotateX)) rotateY(var(--rotateY));

        .side {
            border: 2px solid red;
            font-size: 300px;
            color: rgba(255, 255, 255, 0.5);
        }

        .top { width: 100%; height: var(--perspective); }
        .bottom { width: 100%; height: var(--perspective); }
        .left { width: var(--perspective); height: 100%; }
        .right { width: var(--perspective); height: 100%; }
    }

    .max { width: 100%; height: 100% }
    .absolute { position: absolute; }
    .relative { position: relative; }
    .FCenter { display: flex; justify-content: center; align-items: center; }

    .mode-front { 
        .back { transform: translateZ(calc(var(--perspective) * -1)); }
        .top { transform-origin: top;  transform: rotateX(-90deg); }
        .bottom { bottom: 0; transform-origin: bottom; transform: rotateX(90deg); }
        .left { left: 0; transform-origin: left; transform: rotateY(90deg); }
        .right { right: 0; transform-origin: right; transform: rotateY(-90deg); }
    }

    .mode-outside {
        .back { transform: translateZ(calc(var(--perspective) * -1)) rotateY(180deg); }
        .top { transform-origin: top; transform: rotateX(-90deg) rotateY(180deg);  }
        .bottom { bottom: 0; transform-origin: bottom; transform: rotateX(90deg) rotateY(180deg); }
        .left { left: 0; transform-origin: right; transform: rotateY(-90deg) translateZ(calc(var(--perspective) * 1)); }
        .right { left: 100%; transform-origin: left; transform: rotateY(90deg) ; }
    }
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

    #mode = null

    /* 
                 
                
                
                

    */
    constructor() {
        super()

        this.css = {
            perspective: "400px",
        }

        this.logic = {
            id: null,
            dom: document,
            event: null,
            mode: "outside" /* front / outside */
        }

        this.dom = this.attachShadow({ mode: "open" })
        this.dom.adoptedStyleSheets = [classStyle]
    }

    #draw() {
        this.dom.innerHTML = `
            <ul class="main max relative mode-${this.#mode}">
                <li class="side FCenter front max absolute">1</li>
                <li class="side FCenter back max absolute">2</li>
                <li class="side FCenter top absolute">3</li>
                <li class="side FCenter bottom absolute">4</li>
                <li class="side FCenter left absolute">5</li>
                <li class="side FCenter right absolute">6</li>
            </ul>
        `
    }

    #alertDom() { this.logic.dom.dispatchEvent(new CustomEvent(this.logic.event, { detail: { id: this.logic.id, state: true, instance: this } })) }

    #validateMode() {
        if (this.logic.mode !== "front" && this.logic.mode !== "outside") {
            console.error("component error: mode not valid", this)
            return
        }
    }

    #setMode() { this.#mode = this.logic.mode }

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
            this.update(configObj)
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

    update(obj) { Object.entries(obj).forEach(([key, value]) => this.style.setProperty(`--${key}`, value)) }

    init() {
        if (!this.#ready) {
            console.error("component error: not ready", this)
            return null
        }

        if (this.#initialized) {
            console.trace("component error: previously initialited", this)
            return
        }

        this.#initialized = true
        this.#validateMode()
        this.#setMode()
        this.#draw()
    }
}

customElements.define("cube-3d", Cube3d)