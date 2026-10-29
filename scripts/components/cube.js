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

        .cube {
            border: 1px solid white;
            transform-style: preserve-3d;
            transform-origin: var(--X) var(--Y) calc( var(--perspective) / ((100 / var(--Z) * -1)) );
            transform: rotateX(var(--rotateX)) rotateY(var(--rotateY));
            transition: var(--transition);

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

    sideMode = null

    constructor() {
        super()

        this.css = {
            perspective: "400px",
            transition: "250ms ease-in-out"
        }

        this.logic = {
            id: null,
            dom: document,
            event: null,
            sideMode: "front", /* front / outside */
            rotateOrigin: { x: 50, y: 50, z: 50 } /* 0 - 100 axis positions */
        }

        this.dom = this.attachShadow({ mode: "open" })
        this.dom.adoptedStyleSheets = [classStyle]
    }

    #draw() {
        this.dom.innerHTML = `
            <div class="main max">
                <ul class="cube max relative mode-${this.logic.sideMode}">
                    <li class="side front FCenter max absolute">1</li>
                    <li class="side back FCenter max absolute">2</li>
                    <li class="side top FCenter absolute">3</li>
                    <li class="side bottom FCenter absolute">4</li>
                    <li class="side left FCenter absolute">5</li>
                    <li class="side right FCenter absolute">6</li>
                </ul>
            </div>
        `
    }

    #alertDom() { this.logic.dom.dispatchEvent(new CustomEvent(this.logic.event, { detail: { id: this.logic.id, state: true, instance: this } })) }

    #validateMode() {
        if (this.logic.sideMode !== "front" && this.logic.sideMode !== "outside") {
            console.error("component error: mode not valid", this)
            return
        }
    }

    #setRotateOrigin() {
        for (const [key, value] of Object.entries(this.logic.rotateOrigin)) {
            if (typeof value !== "number") {
                console.log("component error: rotateOrigin only admits number format", this)
                this.#state.logic = false
                return false
            }

            key === "z" || key === "Z"
                ? this.update({ [key.toUpperCase()]: value })
                : this.update({ [key.toUpperCase()]: `${value}%` })
        }
        return true
    }

    configure(type, config) {
        if (type !== "css" && type !== "logic") {
            console.error("component error: configure type not valid", this)
            return
        }

        if (type === "logic" && ((!config.id || !config.event) && (!this.logic.id || !this.logic.event))) {
            console.error("component error: logic id/event not configured", this)
            return
        }

        for (const key of Object.keys(config)) {
            if (!(key in this[type])) {
                console.error(`component error: ${key} is not valid prop`, this)
                return
            }
        }

        Object.entries(config).forEach(([key, value]) => this[type][key] = value)

        if (type === "css") {
            this.update(this.css)
            this.#state.css = true
        }

        if (type === "logic") {
            if (!this.#setRotateOrigin()) return
            this.#state.logic = true
        }
    }

    update(obj) { Object.entries(obj).forEach(([key, value]) => this.style.setProperty(`--${key}`, value)) }

    rotate(axis, value) {
        const permitedAxis = ["x", "X", "y", "Y"]
        if (!(permitedAxis.includes(axis))) {
            console.error("component error: rotate only in X or Y axis", this)
            return
        }
        this.style.setProperty(`--rotate${axis}`, `${value}deg`)
    }

    init() {
        if (!this.#ready) {
            console.error("component error: not ready", this, { ...this.#state })
            return
        }

        if (this.#initialized) {
            console.trace("component error: previously initialited", this)
            return
        }

        this.#initialized = true
        this.#validateMode()
        this.#draw()
    }
}

customElements.define("cube-3d", Cube3d)