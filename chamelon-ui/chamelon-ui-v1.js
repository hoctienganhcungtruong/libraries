if (!document.getElementById('brand-fonts-cdn')) {
    const link = document.createElement('link');
    link.id = 'brand-fonts-cdn';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Noto+Sans:wght@400;500;700&display=swap';
    document.head.appendChild(link);
}

// 1. GOOGLE COMPONENTS
class GoogleButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() { return ['theme', 'shape']; }
    attributeChangedCallback() { this.render(); }
    connectedCallback() { this.render(); }

    createRipple(event, bttn) {
        const circle = document.createElement("span");
        const diameter = Math.max(bttn.clientWidth, bttn.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - bttn.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - bttn.getBoundingClientRect().top - radius}px`;
        circle.classList.add("ripple");

        const prevRipple = bttn.querySelector(".ripple");
        if (prevRipple) prevRipple.remove();

        bttn.appendChild(circle);
    }

    render() {
        const theme = this.getAttribute('theme') || 'white'; 
        const shape = this.getAttribute('shape') || 'square'; 
        const text = this.textContent.trim() || 'Sign in with Google';

        const googleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.589a5.64 5.64 0 0 1-2.45 3.717v3.082h3.965c2.32-2.14 3.641-5.3 3.641-8.65z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.912l-3.965-3.082c-1.108.743-2.52 1.183-3.965 1.183-3.05 0-5.63-2.065-6.55-4.843H1.166v3.187C3.142 20.27 7.26 24 12 24z"/><path fill="#FBBC05" d="M5.45 14.346a7.22 7.22 0 0 1 0-4.692V6.467H1.166a11.94 11.94 0 0 0 0 11.066z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.26 0 3.142 3.73 1.166 8.354l4.284 3.326c.92-2.778 3.5-4.843 12-4.843z"/></svg>`;

        this.shadowRoot.innerHTML = `<style>:host{display:inline-block;font-family:Roboto,sans-serif;-webkit-font-smoothing:antialiased}.google-btn{position:relative;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;padding:0 24px;height:40px;border:1px solid transparent;font-size:14px;font-weight:500;letter-spacing:.25px;cursor:pointer;box-sizing:border-box;border-radius: ${shape==='pill'?'20px':'4px'};transition:background-color .2s cubic-bezier(.4,0,.2,1),border-color .2s cubic-bezier(.4,0,.2,1),box-shadow .2s cubic-bezier(.4,0,.2,1)}.theme-white{background:#fff;color:#1f1f1f;border-color:#747775}.theme-white:hover{background:#f8fafd;border-color:#747775;box-shadow:0 1px 2px 0 rgba(60,64,67,.3),0 1px 3px 1px rgba(60,64,67,.15)}.theme-white:focus{background:#fff;border-color:#0b57d0;outline:none}.theme-blue{background:#0b57d0;color:#fff}.theme-blue:hover{background:#0842a0;box-shadow:0 1px 3px 0 rgba(0,0,0,.3),0 4px 8px 3px rgba(0,0,0,.15)}.theme-blue:focus{background:#0b57d0;outline:none;box-shadow:0 0 0 2px #d3e3fd}.theme-dark{background:#131314;color:#e3e3e3;border-color:#8e918f}.theme-dark:hover{background:#202124;box-shadow:0 1px 3px rgba(0,0,0,.5)}.icon-c{display:flex;align-items:center;margin-right:12px}.theme-blue .icon-w{background:#fff;border-radius:3px;padding:4px;display:flex}.ripple{position:absolute;border-radius:50%;transform:scale(0);animation:ripple-effect .5s cubic-bezier(.1,.8,.3,1);background:rgba(68,71,70,.12);pointer-events:none}.theme-blue .ripple{background:hsla(0,0%,100%,.2)}@keyframes ripple-effect{to{transform:scale(4);opacity:0}}</style><button class="google-btn theme-${theme}"><div class="icon-c ${theme==='blue'?'icon-w':''}">${googleSvg}</div><span>${text}</span></button>`;

        const btn = this.shadowRoot.querySelector('.google-btn');
        btn.addEventListener('click', (e) => this.createRipple(e, btn));
    }
}

class GoogleInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() { return ['theme', 'placeholder', 'type']; }
    attributeChangedCallback() { this.render(); }
    connectedCallback() { this.render(); }

    render() {
        const placeholder = this.getAttribute('placeholder') || 'Enter text';
        const type = this.getAttribute('type') || 'text';
        const theme = this.getAttribute('theme') || 'light';

        this.shadowRoot.innerHTML = `<style>:host{display:inline-block;font-family:Roboto,sans-serif;width:100%;max-width:320px}.input-container{position:relative;display:flex;flex-direction:column;--bg-label:#fff}.input-field{width:100%;height:56px;padding:16px;font-size:16px;outline:none;background:transparent;box-sizing:border-box;border-radius:4px;transition:border-color .15s cubic-bezier(.4,0,.2,1)}.input-label{position:absolute;left:12px;top:18px;font-size:16px;pointer-events:none;transition:transform .15s cubic-bezier(.4,0,.2,1),font-size .15s,color .15s;transform-origin:top left;background:var(--bg-label);padding:0 6px}.theme-light,:host([theme=light]){--bg-label:#fff;--text-color:#1f1f1f;--border-color:#747775;--label-color:#444746;--focus-color:#0b57d0}.theme-dark,:host([theme=dark]){--bg-label:#131314;--text-color:#e3e3e3;--border-color:#8e918f;--label-color:#c4c7c5;--focus-color:#a8c7fa}@media (prefers-color-scheme:dark){:host([theme=auto]) .input-container{--bg-label:#131314;--text-color:#e3e3e3;--border-color:#8e918f;--label-color:#c4c7c5;--focus-color:#a8c7fa}}@media (prefers-color-scheme:light){:host([theme=auto]) .input-container{--bg-label:#fff;--text-color:#1f1f1f;--border-color:#747775;--label-color:#444746;--focus-color:#0b57d0}}.input-field{border:1px solid var(--border-color);color:var(--text-color)}.input-label{color:var(--label-color)}.input-field:focus~.input-label,.input-field:not(:placeholder-shown)~.input-label{transform:translateY(-27px) scale(.75);color:var(--focus-color)}.input-field:focus{border:2px solid var(--focus-color);padding:15px}</style><div class="input-container ${theme==='auto'?'':'theme-'+theme}"><input type="${type}" placeholder=" " class="input-field"><label class="input-label">${placeholder}</label></div>`;
    }
}

class GoogleCard extends HTMLElement {
    constructor() { 
        super(); 
        this.attachShadow({ mode: 'open' }); 
    }

    static get observedAttributes() { return ['theme', 'heading']; }
    attributeChangedCallback() { this.render(); }
    connectedCallback() { this.render(); }

    render() {
        const heading = this.getAttribute('heading') || '';
        const theme = this.getAttribute('theme') || 'light';

        this.shadowRoot.innerHTML = `<style>:host{display:block;font-family:Roboto,sans-serif;-webkit-font-smoothing:antialiased}.card{padding:24px;border-radius:16px;border:1px solid var(--google-card-border);background-color:var(--google-card-bg);color:var(--google-card-text);box-shadow:var(--google-card-shadow);transition:background-color .2s,border-color .2s,box-shadow .2s}.theme-light,:host([theme=light]){--google-card-bg:#f8fafd;--google-card-text:#1f1f1f;--google-card-text-secondary:#444746;--google-card-border:#e0e2e6;--google-card-shadow:0 1px 2px 0 rgba(0,0,0,0.05)}.theme-light:hover,:host([theme=light] .card:hover){--google-card-bg:#f1f3f8;--google-card-shadow:0 2px 6px rgba(0,0,0,0.08)}.theme-dark,:host([theme=dark]){--google-card-bg:#1f1f23;--google-card-text:#e3e3e3;--google-card-text-secondary:#c4c7c5;--google-card-border:#2e3034;--google-card-shadow:0 1px 3px rgba(0,0,0,0.2)}.theme-dark:hover,:host([theme=dark] .card:hover){--google-card-bg:#28292e}h3{margin:0 0 12px;font-size:22px;font-weight:400;color:var(--google-card-text)}.content{font-size:14px;line-height:20px;color:var(--google-card-text-secondary)}</style><div class="card ${theme==='auto'?'':'theme-'+theme}">${heading?`<h3>${heading}</h3>`:''}<div class="content"><slot></slot></div></div>`;
    }
}

// 2. TIKTOK COMPONENTS

class TikTokButton extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() {
        const text = this.textContent.trim() || 'Watch now';
        const variant = this.getAttribute('variant') || 'solid'; 
        
        const tiktokSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" fill="currentColor"><path d="M16.656 1.029c1.637-.025 3.262-.012 4.886-.025a7.76 7.76 0 0 0 2.189 5.213l-.002-.002A8.77 8.77 0 0 0 29 8.45l.028.002v5.036a13.3 13.3 0 0 1-5.331-1.247l.082.034a15.4 15.4 0 0 1-2.077-1.196l.052.034c-.012 3.649.012 7.298-.025 10.934a9.5 9.5 0 0 1-1.707 4.954l.02-.031c-1.652 2.366-4.328 3.919-7.371 4.011h-.014a9.07 9.07 0 0 1-5.139-1.31l.04.023C5.05 28.185 3.32 25.603 3 22.6l-.004-.041a23 23 0 0 1-.012-1.862c.49-4.779 4.494-8.476 9.361-8.476q.822.001 1.604.136l-.056-.008c.025 1.849-.05 3.699-.05 5.548a4.29 4.29 0 0 0-5.465 2.619l-.009.03c-.133.427-.21.918-.21 1.426q0 .31.037.61l-.002-.024a4.26 4.26 0 0 0 4.382 3.586h-.009a4.2 4.2 0 0 0 3.451-1.994l.01-.018c.267-.372.45-.822.511-1.311l.001-.014c.125-2.237.075-4.461.087-6.698.012-5.036-.012-10.06.025-15.083z"/></svg>`;

        this.shadowRoot.innerHTML = `<style>:host{display:inline-block;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.tiktok-container{position:relative;display:inline-block;background:transparent}.tiktok-container:before{top:-1px;left:-2px;right:2px;bottom:1px;background:#25f4ee}.tiktok-container:after,.tiktok-container:before{content:"";position:absolute;border-radius:4px;z-index:1}.tiktok-container:after{top:1px;left:2px;right:-2px;bottom:-1px;background:#fe2c55}.tiktok-btn{position:relative;z-index:2;display:inline-flex;align-items:center;justify-content:center;padding:0 20px;height:38px;min-width:150px;font-size:14px;font-weight:700;border-radius:4px;cursor:pointer;box-sizing:border-box;transition:transform .08s cubic-bezier(.25,1,.5,1);border:none;background:${variant==='solid'?'#161823':'#fff'};color: ${variant==='solid'?'#fff':'#161823'};}.tiktok-container:hover .tiktok-btn{transform:translate(1px,1px)}.tiktok-container:active .tiktok-btn{transform:translate(2px,2px)}.icon-c{display:flex;align-items:center;margin-right:8px;flex-shrink:0}</style><div class="tiktok-container"><button class="tiktok-btn"><div class="icon-c">${tiktokSvg}</div><span>${text}</span></button></div>`;
    }
}

class TikTokInput extends HTMLElement {
    constructor() { 
        super(); 
        this.attachShadow({ mode: 'open' }); 
    }

    static get observedAttributes() { return ['variant', 'placeholder', 'type']; }
    attributeChangedCallback() { this.render(); }
    connectedCallback() { this.render(); }

    render() {
        const placeholder = this.getAttribute('placeholder') || 'Search';
        const type = this.getAttribute('type') || 'text';
        const variant = this.getAttribute('variant') || 'search';

        const searchIcon = `<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4 4 11.611 4 21s7.611 17 17 17Z" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M33.222 33.222 44 44" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

        this.shadowRoot.innerHTML = `<style>:host{display:inline-block;font-family:-apple-system,BlinkMacSystemFont,sans-serif;width:100%;max-width:360px}.variant-search{display:flex;align-items:center;width:100%;height:40px;padding:0 4px 0 16px;background:rgba(22,24,35,.06);border-radius:92px;border:1px solid transparent;box-sizing:border-box}.variant-search input{width:100%;background:transparent;border:none;outline:none;font-size:14px;color:#161823}.variant-search .icon-container{color:rgba(22,24,35,.75);display:flex;align-items:center;justify-content:center;cursor:pointer;width:44px;height:32px;border-radius:0 92px 92px 0;transition:background-color .15s}.variant-search .icon-container:hover{background:rgba(22,24,35,.04)}.variant-search:focus-within{border-color:rgba(22,24,35,.12);background:rgba(22,24,35,.08)}.glitch-container{position:relative;display:none}.variant-glitch{width:100%;height:40px;padding:0 14px;background:#121212;color:#fff;border:2px solid #fff;border-radius:4px;font-size:14px;box-sizing:border-box;outline:none}.variant-glitch:focus{border-color:#25f4ee;box-shadow:-2px -2px 0 #25f4ee,2px 2px 0 #fe2c55}:host([variant=glitch]) .variant-search{display:none}:host([variant=glitch]) .glitch-container{display:block}</style><div class="input-wrapper variant-search"><input type="${type}" placeholder="${placeholder}"><div class="icon-container">${searchIcon}</div></div><div class="glitch-container"><input type="${type}" placeholder="${placeholder}" class="variant-glitch"></div>`;
    }
}

class TikTokCard extends HTMLElement {
    constructor() { 
        super(); 
        this.attachShadow({ mode: 'open' }); 
    }

    static get observedAttributes() { return ['theme']; }
    attributeChangedCallback() { this.render(); }
    connectedCallback() { this.render(); }

    render() {
        const theme = this.getAttribute('theme') || 'dark';

        this.shadowRoot.innerHTML = `<style>:host{display:block;font-family:-apple-system,BlinkMacSystemFont,sans-serif}.card{border-radius:8px;padding:24px;position:relative;background-color:var(--tk-card-bg);color:var(--tk-card-text);border:1px solid var(--tk-card-border)}.card:before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#25f4ee,#fe2c55);border-radius:8px 8px 0 0}.theme-dark,:host([theme=dark]){--tk-card-bg:#161823;--tk-card-text:#fff;--tk-card-border:hsla(0,0%,100%,0.05)}.theme-light,:host([theme=light]){--tk-card-bg:#fff;--tk-card-text:#161823;--tk-card-border:rgba(22,24,35,0.08)}.content{font-size:15px;line-height:22px}</style><div class="card ${theme==='auto'?'':'theme-'+theme}"><div class="content"><slot></slot></div></div>`;
    }
}

// 3. DISCORD COMPONENTS

class DiscordButton extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() {
        const text = this.textContent.trim() || 'Join Server';
        const variant = this.getAttribute('variant') || 'blurple';

        this.shadowRoot.innerHTML = `<style>:host{display:inline-block;font-family:Noto Sans,Helvetica Neue,Helvetica,Arial,sans-serif}.discord-btn{display:inline-flex;align-items:center;justify-content:center;padding:0 20px;height:38px;min-width:96px;font-size:14px;font-weight:500;border-radius:3px;cursor:pointer;box-sizing:border-box;border:none;transition:background-color .1s ease,color .1s ease}.var-blurple{background-color:#5865f2;color:#fff}.var-blurple:hover{background-color:#4752c4}.var-green{background-color:#248046;color:#fff}.var-green:hover{background-color:#1a6535}.var-gray{background-color:#4e5058;color:#fff}.var-gray:hover{background-color:#6d6f78}.var-red{background-color:#da373c;color:#fff}.var-red:hover{background-color:#a92b2f}.discord-btn:active{opacity:.9}</style><button class="discord-btn var-${variant}"><span>${text}</span></button>`;
    }
}

class DiscordInput extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() {
        const placeholder = this.getAttribute('placeholder') || '';
        const type = this.getAttribute('type') || 'text';
        const label = this.getAttribute('label') || '';

        this.shadowRoot.innerHTML = `<style>:host{display:inline-block;font-family:Noto Sans,sans-serif;width:100%;max-width:340px}.container{display:flex;flex-direction:column;gap:8px}.input-label{color:#b5bac1;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.02em}.dc-field{width:100%;height:40px;padding:10px;background:#1e1f22;color:#dbdee1;border:none;border-radius:3px;font-size:15px;box-sizing:border-box;outline:none}.dc-field::placeholder{color:#87898c}.dc-field:focus{box-shadow:0 0 0 1px #00a8fc}</style><div class="container">${label?`<label class="input-label">${label}</label>`:''} <input type="${type}" placeholder="${placeholder}" class="dc-field"></div>`;
    }
}

class DiscordCard extends HTMLElement {
    constructor() { 
        super(); 
        this.attachShadow({ mode: 'open' }); 
    }

    static get observedAttributes() { return ['heading', 'banner', 'members']; }
    attributeChangedCallback() { this.render(); }
    connectedCallback() { this.render(); }

    render() {
        const heading = this.getAttribute('heading') || 'Unnamed Community';
        const banner = this.getAttribute('banner') || '';
        const members = this.getAttribute('members') || '0';

        this.shadowRoot.innerHTML = `<style>:host{display:block;font-family:Noto Sans,sans-serif;max-width:320px}.card{background-color:#2b2d31;color:#f2f3f5;border-radius:8px;overflow:hidden;cursor:pointer;transition:background-color .15s ease;box-shadow:0 4px 8px rgba(0,0,0,.2)}.card:hover{background-color:#232428}.banner{height:135px;background-color:#5865f2;background-image:${banner?`url(${banner})`:'none'};background-size:cover;background-position:50%}.content{padding:16px}.title{margin:0 0 6px;font-size:16px;font-weight:700;color:#fff;line-height:20px}.description{font-size:14px;color:#b5bac1;line-height:18px;margin-bottom:16px;min-height:36px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.status-container{font-size:12px;color:#b5bac1}.status-container,.status-item{display:flex;align-items:center}.status-item{gap:6px}.dot-online{width:8px;height:8px;background-color:#23a55a;border-radius:50%}</style><div class="card"><div class="banner"></div><div class="content"><h3 class="title">${heading}</h3><div class="description"><slot></slot></div><div class="status-container"><div class="status-item"><span class="dot-online"></span><span><strong>${members}</strong>Members</span></div></div></div></div>`;
    }
}

customElements.define('google-button', GoogleButton);
customElements.define('google-input', GoogleInput);
customElements.define('google-card', GoogleCard);
customElements.define('tiktok-button', TikTokButton);
customElements.define('tiktok-input', TikTokInput);
customElements.define('tiktok-card', TikTokCard);
customElements.define('discord-button', DiscordButton);
customElements.define('discord-input', DiscordInput);
customElements.define('discord-card', DiscordCard);
