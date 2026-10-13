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
        height: 100%;
    }

    .mainBox {
        background-image: var(--backgroundImage);
        background-size: auto 120%;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 16px;
        box-shadow: 8px 8px 10px var(--black);
        overflow: hidden;

        .bars {
            width: 100%;
            height: 60px;
            background-color: rgba(255, 255, 255, 0.2);
            font-family: "mainFont";
            font-size: 20px;
            color: gainsboro;
            letter-spacing: 2px;
            backdrop-filter: blur(4px);

            &:nth-child(2) {
                width: 100%;
                height: 34%;
                top: calc(100% - 30px);

                .infoBox {
                }
            }
        }

        .statBox {
            top: 0;
            padding: 18%;

            .circleBox {
                top: 25%;
                width: 100%;
                aspect-ratio: 1/1;
                border: 1px solid red;

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
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: calc(100% - 31px);
                    aspect-ratio: 1/1;
                    border-radius: 50%;
                    background-color: rgba(0, 0, 0, 0.8);
                    font-family: counterFont;
                    color: white;
                    mix-blend-mode: multiply;
                    container-type: inline-size;

                    .symbolLayer {
                        bottom: 14%;
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

            .hiddenInput {
                appearance: none;
                top: 0;
                left: 0;
                cursor: pointer;
            }
        }

        &:has(.statBox .hiddenInput:checked) {
            background-size: auto 300%;

            & .bars {
                color: rgb(60, 60, 60);
                background-color: rgba(255, 255, 255, 0.5);

                &:nth-child(2) {
                    top: 66%;
                }
            }

            & .statBox .circleBox {
                top: 10%;
            }
        }
    }

    .absolute { position: absolute; }
    .relative { position: relative; }
    .max { width: 100%; height: 100%; }
    .FCenter { display: flex; justify-content: center; align-items: center; }
    .animated { transition: 500ms ease-in-out;
}
`
)

export default class DualProgressCard extends HTMLElement {
    #configured = false
    #progress = 0
    #mainFont = { name: "mainFont", url: "./resources/fonts/Oxanium-Regular.ttf" }
    #counterFont = { name: "counterFont", url: "./resources/fonts/Conthrax-SemiBold.otf" }

    constructor() {
        super()

        this.css = {
            backgroundImage: "none",
        }

        this.logic = {
            title: "title",
            progress: 0,
            autoInit: true
        }

        this.dom = this.attachShadow({ mode: "open" })
    }

    async #draw() {
        this.dom.innerHTML = `
            <div class="mainBox max animated relative">
                <div class="bars FCenter animated absolute">${this.logic.title}</div>
                <div class="bars animated absolute">
                    <div class="infoBox max relative">

                    </div>
                </div>
                <div class="statBox max animated relative">
                    <ul class="circleBox FCenter animated relative">
                        <li class="circleExt"></li>
                        <li class="circleLine absolute"></li>
                        <li class="circleInt absolute">
                            <ul class="containerBox absolute">
                                <li class="numberBox FCenter">${this.#progress}</li>
                            </ul>
                            <div class="symbolLayer absolute">%</div>
                        </li>
                    </ul>
                    <input type="checkbox" class="hiddenInput max absolute">
                </div>
            </div>
        `
        return
    }

    async #sleep(ms) { await new Promise(resolve => setTimeout(resolve, ms)) }

    configure(type, config) {
        if (type !== "css" && type !== "logic") {
            console.error("error in configure method type not valid", this)
            return null
        }

        const configObj = type === "css" ? this.css : this.logic
        for (const key of Object.keys(config)) {
            if (!(key in configObj)) {
                console.error(`component configure error, ${key} is not valid prop`, this)
                return null
            }
        }

        Object.assign(configObj, config)
        configObj === this.css && this.update()

        this.#configured = true
        this.dom.adoptedStyleSheets = [globalStyle]
    }

    update() {
        Object.entries(this.css).forEach(([key, value]) => {
            key === "backgroundImage" && (value = `url(${value})`)
            this.style.setProperty(`--${key}`, value)
        })
    }

    async updateProgress(progress) {
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
    }

    async #loadFont() {
        const fonts = [this.#mainFont, this.#counterFont]
        for (const font of fonts) {
            const newFont = new FontFace(font.name, `url(${font.url})`)
            document.fonts.add(await newFont.load())
        }
    }

    async init() {
        if (this.#configured) {
            this.#loadFont()
            await this.#draw()
            await this.#sleep(1000)
            this.logic.autoInit && this.updateProgress(this.logic.progress)
        } else {
            console.error("component error: not configured", this)
        }
    }
}

customElements.define("dualprog-card", DualProgressCard)