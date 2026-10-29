const globalStyle = new CSSStyleSheet()
globalStyle.replaceSync(`
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
        max-width: 340px;
        min-width: 250px;
        height: 100%;
        opacity: 0;
        transition: 500ms;

        --topBarHeight: 60px;
        --nodeClosedHeight: 30px;
        --nodeOpenedHeight: 40%;
    }

    .main {
        overflow: hidden;

        .backLayer {
            background-image: var(--backgroundImage);
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }

        .bar {
            width: 100%;
            background-color: rgba(255, 255, 255, 0.2);
            font-family: var(--fontFamily_1);
            color: white;
            letter-spacing: 2px;
            backdrop-filter: blur(4px);
        }

        .barTop {
            height: var(--topBarHeight);
            font-size: 20px;
        }

        .barBottom {
            height: var(--nodeOpenedHeight);
            top: calc(100% - var(--nodeClosedHeight));
        }

        .statBox {
            top: var(--topBarHeight);
            width: 100%;
            height: calc(100% - var(--topBarHeight) - var(--nodeClosedHeight));

            .circleBox {
                width: 70%;
                max-width: 200px;
                height: fit-content;

                .circleExt {
                    width: 100%;
                    aspect-ratio: 1/1;
                    border: 14px solid rgba(0, 0, 0, 0.4);
                    border-radius: 50%;
                }

                .circleLine {
                    width: calc(100% - 28px);
                    aspect-ratio: 1/1;
                    border: 3px solid rgba(255, 255, 255, 0.4);
                    border-radius: 50%;
                }

                .circleInt {
                    align-items: center;
                    width: calc(100% - 31px);
                    aspect-ratio: 1/1;
                    border-radius: 50%;
                    background-color: rgba(0, 0, 0, 0.8);
                    font-family: var(--fontFamily_2);
                    color: white;
                    mix-blend-mode: multiply;
                    container-type: inline-size;

                    .symbolLayer {
                        bottom: 18%;
                        font-size: 18cqi;
                    }

                    .containerBox  {
                        top: 26%;
                        display: flex;
                        width: auto;
                        height: auto;

                        .numberBox {
                            width: 28cqi;
                            height: auto;
                            font-size: 30cqi;
                        }
                    }
                }
            }
        }

        .hiddenInput {
            appearance: none;
            top: 0;
            left: 0;
            cursor: pointer;
        }

        &:has(.hiddenInput:checked) {
            .backLayer { transform: scale(1.4); }
            
            & .bar {
                color: rgb(60, 60, 60);
                background-color: rgba(255, 255, 255, 0.5);
            }

            & .barBottom { top: calc(100% - var(--nodeOpenedHeight)); }

            & .statBox { height: calc((100% - var(--nodeOpenedHeight)) - var(--topBarHeight)); }
        }
    }

    .absolute { position: absolute; }
    .relative { position: relative; }
    .max { width: 100%; height: 100%; }
    .FCenter { display: flex; justify-content: center; align-items: center; }
    .FCol { display: flex; flex-direction: column; }
    .tempo350 { transition: 350ms ease-in-out; }
}
`
)

export default class AvancedProgressCard001 extends HTMLElement {
    #initialized = false
    #ready = false
    #state = new Proxy({
        css: false,
        logic: false,
        node: false,
        image: false
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

    #progress = 0

    constructor() {
        super()

        this.css = {
            backgroundImage: "none",
            fontFamily_1: "inherit",
            fontFamily_2: "inherit",
        }

        this.logic = {
            id: null,
            dom: document,
            event: null,
            title: "title",
            autoInit: false,
            autoExpand: false
        }

        this.node = { html: null, style: null }

        this.dom = this.attachShadow({ mode: "open" })
        this.dom.adoptedStyleSheets = [globalStyle]
    }

    async #draw() {
        this.dom.innerHTML = `
            <style>${this.node.style}</style>
            <div class="main max tempo350 relative">
                <div class="backLayer max tempo350 absolute"></div>
                <div class="bar barTop FCenter tempo350 absolute">${this.logic.title}</div>
                <div id="node" class="bar barBottom tempo350 absolute">${this.node.html}</div>
                <div class="statBox FCenter tempo350 absolute">
                    <ul class="circleBox FCenter tempo350 relative">
                        <li class="circleExt"></li>
                        <li class="circleLine absolute"></li>
                        <li class="circleInt FCol absolute">
                            <ul class="containerBox absolute">
                                <li class="numberBox FCenter">${this.#progress}</li>
                            </ul>
                            <div class="symbolLayer absolute">%</div>
                        </li>
                    </ul>
                </div>
                <input id="toggleExpand" type="checkbox" class="hiddenInput max absolute">
            </div>
        `
    }

    async #sleep(ms) { await new Promise(resolve => setTimeout(resolve, ms)) }

    async #unloadImg(url) {
        return new Promise((resolve, reject) => {
            const newImage = new Image()
            newImage.src = url
            newImage.decode()
                .then(() => resolve(newImage))
                .catch((e) => reject(e))
        })
            .then(() => {
                this.#state.image = true
            })
            .catch((e) => {
                console.error("component error: failed lo get image", this)
                throw e
            })
    }

    #alertDom() { this.logic.dom.dispatchEvent(new CustomEvent(this.logic.event, { detail: { id: this.logic.id, state: true, instance: this } })) }

    async configure(type, config) {
        if (type !== "css" && type !== "logic" && type !== "node") {
            console.error("component error: configure type not valid", this)
            return null
        }

        const configObj = this[type]
        for (const key of Object.keys(config)) {
            if (!(key in configObj)) {
                console.error(`component error: ${key} is not valid prop`, this)
                return null
            }
        }

        type !== "node" && Object.assign(configObj, config)

        if (type === "css") {
            this.update()
            this.#state.css = true
            configObj.backgroundImage && this.#unloadImg(configObj.backgroundImage)
        }

        if (type === "logic") {
            if (!configObj.id || !configObj.event) {
                console.error("component error: logic id/event not configured", this)
                return
            }
            this.#state.logic = true
        }

        if (type === "node") {
            Object.values(configObj).forEach(item => {
                if (!(item in configObj) && item !== null) {
                    console.error("component error: configure node error parameters", this)
                    return null
                }
            })

            if (!this.#state.node) {
                this.node.style = config.style
                this.node.html = config.html
                this.#state.node = true
            }
        }
    }

    update() {
        Object.entries(this.css).forEach(([key, value]) => {
            key === "backgroundImage" && (value = `url(${value})`)
            this.style.setProperty(`--${key}`, value)
        })
    }

    async progress(progress) {
        if (progress <= this.#progress) {
            console.error(`component error: updateProgress can't be less than or equal to acumulated progress`,
                "\nacumulated progress: ", this.#progress, "\nrequest update: ", progress, "\ncomponent", this
            )
            return null
        }
        const containerBox = this.dom.querySelector(".containerBox")
        const numberBox = Array.from(this.dom.querySelectorAll(".numberBox"))

        for (let i = 0; i < progress; i++) {
            if (this.#progress >= 100) return
            this.#progress += 1

            if (this.#progress === 10 || this.#progress === 100) {
                const newBox = containerBox.appendChild(document.createElement("li"))
                newBox.className = "numberBox FCenter"
                numberBox.push(newBox)
            }

            this.#progress === 100 && (numberBox[0].style.width = "fit-content")
            numberBox.forEach((item, index) => item.textContent = String(this.#progress)[index])
            await this.#sleep(20)
        }

        this.logic.autoExpand && this.#simulateInteraction(true)
    }

    #simulateInteraction = (boolean) => {
        const toggleInput = this.dom.querySelector("#toggleExpand")
        toggleInput.checked = boolean
    }

    toggleExpand(boolean) {
        this.#simulateInteraction(boolean)
    }

    addToNode(obj) {
        console.log(obj)
        if (!obj?.html || !obj?.style) {
            console.error("component error: addToNode error parameters", this)
            return
        }
    }

    async init() {
        if (!this.#ready) {
            console.error("component error: not ready", `state: ${this.#state}`, this)
            return
        }

        if (this.#initialized) {
            console.trace("component error: previously initialited", this)
            return
        }

        this.#initialized = true
        this.#draw()
        this.style.opacity = "1"
        this.logic.autoInit && this.updateProgress(this.logic.progress)
    }
}

customElements.define("avanced-progress-card-001", AvancedProgressCard001)