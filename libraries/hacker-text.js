(function () {

    const DEFAULTS = {
        speed: 40,
        deleteSpeed: 20,
        delay: 1000,
        chars: "$#@%&*!?+=-_/<>[]{}",
        loop: true,
        liveChars: true,
        keepAfterFinish: true
    };

    function randomChar(chars) {
        return chars[Math.floor(Math.random() * chars.length)];
    }

    function parseMessages(raw) {
        if (!raw) return ["HACKING..."];
        try {
            return JSON.parse(raw);
        } catch {
            return raw.split("|");
        }
    }

    function parseNumber(value) {
        return value !== undefined ? Number(value) : undefined;
    }

    function parseBoolean(value) {
        if (value === undefined) return undefined;
        return value === "true" || value === "";
    }

    function HackerText(options) {
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
        this.reveal = 0;

        this.run();
    }

    HackerText.prototype.render = function (target) {
        let output = "";

        for (let i = 0; i < target.length; i++) {
            if (i < this.reveal) {
                output += target[i];
            } else {
                if (this.settings.liveChars) {
                    // display special characters alongside text
                    output += randomChar(this.settings.chars);
                }
            }
        }

        // if liveChars = false
        if (!this.settings.liveChars && this.reveal < target.length) {
            for (let i = this.reveal; i < target.length; i++) {
                output += randomChar(this.settings.chars);
            }
        }

        this.el.textContent = output;
    };

    HackerText.prototype.type = function () {
        const target = this.messages[this.index];

        this.render(target);

        if (this.reveal < target.length) {
            this.reveal++;
            setTimeout(() => this.type(), this.settings.speed);
        } else {
            if (this.index < this.messages.length - 1 || this.settings.loop || !this.settings.keepAfterFinish) {
                setTimeout(() => this.delete(), this.settings.delay);
            }
            // else keep text
        }
    };

    HackerText.prototype.delete = function () {
        let text = this.el.textContent;

        if (text.length > 0) {
            this.el.textContent = text.slice(0, -1);
            setTimeout(() => this.delete(), this.settings.deleteSpeed);
        } else {
            this.index++;

            if (this.index >= this.messages.length) {
                if (this.settings.loop) {
                    this.index = 0;
                } else if (this.settings.keepAfterFinish) {
                    // keep the final message
                    return;
                } else {
                    return;
                }
            }

            this.reveal = 0;
            setTimeout(() => this.type(), 200);
        }
    };

    HackerText.prototype.run = function () {
        this.type();
    };

    // Public API
    window.HackerText = {
        init: function (options) {
            return new HackerText(options);
        }
    };

    // Auto init via data-attributes
    document.addEventListener("DOMContentLoaded", function () {

        const elements = document.querySelectorAll("[data-hacker]");

        elements.forEach(el => {

            const options = {
                element: el,
                messages: parseMessages(el.dataset.messages),
                speed: parseNumber(el.dataset.speed),
                deleteSpeed: parseNumber(el.dataset.deleteSpeed),
                delay: parseNumber(el.dataset.delay),
                chars: el.dataset.chars,
                loop: parseBoolean(el.dataset.loop),
                liveChars: parseBoolean(el.dataset.liveChars),
                keepAfterFinish: parseBoolean(el.dataset.keepAfterFinish)
            };

            // Remove undefined
            Object.keys(options).forEach(key => {
                if (options[key] === undefined) {
                    delete options[key];
                }
            });

            new HackerText(options);
        });

    });

})();    };

    HackerText.prototype.run = function () {
        this.type();
    };

    // Public API
    window.HackerText = {
        init: function (options) {
            return new HackerText(options);
        }
    };

    // Auto init via data-attributes
    document.addEventListener("DOMContentLoaded", function () {

        const elements = document.querySelectorAll("[data-hacker]");

        elements.forEach(el => {

            const options = {
                element: el,
                messages: parseMessages(el.dataset.messages),
                speed: parseNumber(el.dataset.speed),
                deleteSpeed: parseNumber(el.dataset.deleteSpeed),
                delay: parseNumber(el.dataset.delay),
                chars: el.dataset.chars,
                loop: parseBoolean(el.dataset.loop),
                liveChars: parseBoolean(el.dataset.liveChars),
                keepAfterFinish: parseBoolean(el.dataset.keepAfterFinish)
            };

            // Remove undefined
            Object.keys(options).forEach(key => {
                if (options[key] === undefined) {
                    delete options[key];
                }
            });

            new HackerText(options);
        });

    });

})();
