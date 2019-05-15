import { btnReset } from "./_styles/resets";

class FedNavPanel extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
    this._open = false;

    const $template = document.createElement("template");

    $template.innerHTML = `
            <style>
                :host {
                    display: block;
                    height: 100%;
                }

                :host([open]) .panel__nav {
                    transform: translateX(0);
                }

                :host-context(.red) {
                    /* background-color: red; */
                }

                ::slotted(.panel-content) {
                  padding-right: 2rem;
                }

                ${btnReset}

                .panel__toggle {
                    background-color: #1e1e1e;
                    border-radius: 3em;
                    font-size: 0.875em;
                    margin: .5rem;
                    padding: 1em;
                    position: absolute;
                    transition: all 0.25s ease-in-out;
                    z-index: 1;
                }

                .panel__toggle:focus {
                    outline: thin dotted;
                    outline-offset: -2px;
                }

                .icon {
                    display: inline-block;
                    fill: currentColor;
                    height: 1em;
                    width: 1em;
                    vertical-align: middle;
                    position: relative;
                    top: -0.0625em;
                }

                .panel__icon {
                    width: 2em;
                    height: 2em;
                    top: 0;
                }

                .icon__line {
                    opacity: 1;
                    transform: rotate(0) translateY(0) translateX(0);
                    transform-origin: 1em 1em;
                    transition: transform 0.3s ease-in-out, opacity 0.2s ease-in-out;
                }

                .icon__line.line--top {
                    transform-origin: 1em 2.5em;
                }

                .icon__line.line--bottom {
                    transform-origin: 1em 4.5em;
                }

                .panel__toggle--open .icon .line--top {
                    transform: rotate(45deg) translateY(0) translateX(0);
                }

                .panel__toggle--open .icon .line--middle {
                    opacity: 0;
                }

                .panel__toggle--open .icon .line--bottom {
                    transform: rotate(-45deg) translateY(0) translateX(0);
                }

                .panel__nav {
                    background-color: #fff;
                    height: 100%;
                    padding-top: 8rem;
                    transform: translateX(-100%);
                    transition: transform 0.3s;
                }

                .screen-reader-text {
                    clip: rect(1px, 1px, 1px, 1px);
                    position: absolute !important;
                    height: 1px;
                    width: 1px;
                    overflow: hidden;
                }
            </style>
            
            <button class="panel__toggle" id="panel-toggle">
                <span class="screen-reader-text">panel</span>
                <svg class="icon panel__icon" aria-hidden="true" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100">
                    <g class="icon__svg">
                        <path class="icon__line line--top" d="M5 13h90v14H5z"/>
                        <path class="icon__line line--middle" d="M5 43h90v14H5z"/>
                        <path class="icon__line line--bottom" d="M5 73h90v14H5z"/>
                    </g>
                </svg>
            </button>

            <nav class="panel__nav">
                <slot>
                </slot>
            </nav>
        `;

    this._$template = document.importNode($template.content, true);
  }

  set open(value) {
    if (value) {
      this.setAttribute("value", value);
    } else {
      this.setAttribute("value", this._value);
    }
  }

  get value() {
    return this.hasAttribute(this._value);
  }

  connectedCallback() {
    this._root.appendChild(this._$template);
    this.toggle = this._root.querySelector("#panel-toggle");
    this.toggle.addEventListener("click", event => {
      this.toggleState(this.toggle, " panel__toggle--open");
      this.toggleAttribute("open");
    });
  }

  toggleState(item, state) {
    if (item.className.indexOf(state) !== -1) {
      item.className = item.className.replace(state, "");
    } else {
      item.className += state;
    }
  }
}

customElements.define("fed-nav-panel", FedNavPanel);
