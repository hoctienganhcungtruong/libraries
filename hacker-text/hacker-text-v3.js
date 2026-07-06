(function () {
    const DEFAULTS = {
        speed: 40,
        deleteSpeed: 20,
        delay: 1000,
        chars: "$#@%&*!?+=-_/<>[]{}",
        loop: true,
        liveChars: true,
        keepAfterFinish: true,
        trigger: "load",
        scrambleCount: 3
    };

    const utils = {
        randomChar: (chars) => chars[Math.floor(Math.random() * chars.length)],
        parseMessages: (raw) => {
            if (!raw) return ["HACKING..."];
            try { return JSON.parse(raw); } catch { return raw.split("|"); }
        },
        parseBoolean: (val) => val === undefined ? undefined : val === "true" || val === ""
    };

    class HackerText {
        constructor(options) {
            this.settings = { ...DEFAULTS, ...options };
            this.el = typeof this.settings.element === "string"
                ? document.querySelector(this.settings.element)
                : this.settings.element;

            if (!this.el) {
                console.error("HackerText: element not found");
                return;
            }

            this.messages = this.settings.messages || [];
            this.index = 0;
            this.frameId = null;
            this.timeoutId = null;
            this.observer = null;
            this.clickHandler = null;

            this.initTrigger();
        }

        initTrigger() {
            if (this.settings.trigger === "scroll" && "IntersectionObserver" in window) {
                this.observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.start();
                            this.observer.unobserve(this.el);
                        }
                    });
                }, { threshold: 0.1 });
                this.observer.observe(this.el);
            } 
            else if (this.settings.trigger === "click") {
                this.el.style.cursor = "pointer";
                
                this.clickHandler = () => {
                    this.index = 0;
                    this.start();
                };
                
                this.el.addEventListener("click", this.clickHandler);
            } 
            else if (this.settings.trigger === "load") {
                this.start();
            }
        }

        scrambleReveal(targetText) {
            const targetLength = targetText.length;
            const charStates = Array.from({ length: targetLength }, () => ({
                count: -Math.floor(Math.random() * 4)
            }));

            const tick = () => {
                let complete = true;
                let output = "";

                for (let i = 0; i < targetLength; i++) {
                    const state = charStates[i];
                    
                    if (state.count < 0) {
                        output += this.settings.liveChars ? utils.randomChar(this.settings.chars) : " ";
                        state.count++;
                        complete = false;
                    } else if (state.count >= this.settings.scrambleCount) {
                        output += targetText[i];
                    } else {
                        output += utils.randomChar(this.settings.chars);
                        state.count++;
                        complete = false;
                    }
                }

                this.el.textContent = output;

                if (!complete) {
                    this.timeoutId = setTimeout(() => {
                        this.frameId = requestAnimationFrame(tick);
                    }, this.settings.speed);
                } else {
                    this.handlePhaseEnd();
                }
            };

            this.frameId = requestAnimationFrame(tick);
        }

        handlePhaseEnd() {
            const isLastMessage = this.index === this.messages.length - 1;
            if (!isLastMessage || this.settings.loop || !this.settings.keepAfterFinish) {
                this.timeoutId = setTimeout(() => this.delete(), this.settings.delay);
            }
        }

        delete() {
            const tick = () => {
                const text = this.el.textContent;
                if (text.length > 0) {
                    this.el.textContent = text.slice(0, -1);
                    this.timeoutId = setTimeout(() => {
                        this.frameId = requestAnimationFrame(tick);
                    }, this.settings.deleteSpeed);
                } else {
                    this.index++;
                    if (this.index >= this.messages.length) {
                        if (this.settings.loop) this.index = 0;
                        else return;
                    }
                    this.timeoutId = setTimeout(() => this.start(), 200);
                }
            };
            this.frameId = requestAnimationFrame(tick);
        }

        start() {
            this.cancelTimers();
            if (this.messages.length > 0) {
                this.scrambleReveal(this.messages[this.index]);
            }
        }

        cancelTimers() {
            if (this.frameId) cancelAnimationFrame(this.frameId);
            if (this.timeoutId) clearTimeout(this.timeoutId);
        }

        destroy() {
            this.cancelTimers();
            if (this.observer) this.observer.disconnect();
            if (this.clickHandler) this.el.removeEventListener("click", this.clickHandler);
        }
    }

    window.HackerText = {
        init: (options) => new HackerText(options)
    };

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll("[data-hacker]").forEach(el => {
            const options = {
                element: el,
                messages: utils.parseMessages(el.dataset.messages),
                speed: el.dataset.speed ? Number(el.dataset.speed) : undefined,
                deleteSpeed: el.dataset.deleteSpeed ? Number(el.dataset.deleteSpeed) : undefined,
                delay: el.dataset.delay ? Number(el.dataset.delay) : undefined,
                chars: el.dataset.chars,
                trigger: el.dataset.trigger,
                loop: utils.parseBoolean(el.dataset.loop),
                liveChars: utils.parseBoolean(el.dataset.liveChars),
                keepAfterFinish: utils.parseBoolean(el.dataset.keepAfterFinish)
            };

            Object.keys(options).forEach(key => options[key] === undefined && delete options[key]);
            new HackerText(options);
        });
    });
})();
