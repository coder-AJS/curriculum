export default class Cube3d extends HTMLElement {

    constructor() {
        super()

        this.dom = this.attachShadow({mode: "open"})
    }
}

customElements.define("cube-3d", Cube3d)