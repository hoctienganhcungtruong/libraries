# ChameleonUI.js

ChameleonUI.js is a lightweight, zero-dependency suite of pixel-perfect Web Components modeled after native design languages from **Google (Material Design 3)**, **TikTok (Neon Accent)**, and **Discord (Desktop Interface)**. 

Every component encapsulates its logic, structure, and styling inside a decoupled Shadow DOM, offering true cross-framework compatibility, native performance, and instant universal theme integration (`light`, `dark`, and `auto` system preferences).

---

## Features

* **Zero Dependencies:** Built entirely using native vanilla HTML5 Web Components.
* **Shadow DOM Encapsulation:** Zero CSS style-bleed or global scope corruption.
* **True Theme Parity:** Native-accurate handling for light, dark, and system-level (`prefers-color-scheme`) theme states.
* **Polished Interactivity:** Features micro-interactions like Material Design ripple effects and brand-accurate state transitions out-of-the-box.
* **Framework Agnostic:** Seamlessly drops into React, Vue, Svelte, Angular, or raw static HTML.

---

## Installation & Setup

Simply reference the script directly within your HTML file or bundle it via your build workflow:

```html
<script src="path/to/ChameleonUI.js" defer></script>

```

The script automatically handles global injection of optimized design fonts (`Roboto` and `Noto Sans`) dynamically at runtime if missing.

---

## Usage & API Reference

### 1. Google Components (Material Design 3 Spec)

#### `<google-button>`

An authentic M3-compliant implementation featuring structural CSS transitions and explicit client-coordinate dynamic ink ripples.

```html
<google-button theme="white" shape="square">Sign in with Google</google-button>
<google-button theme="blue" shape="pill">Continue with Google</google-button>
<google-button theme="dark" shape="square">Access Account</google-button>

```

| Attribute | Options | Default | Description |
| --- | --- | --- | --- |
| `theme` | `white` | `blue` | `dark` | `white` | Changes the structural visual tokens. |
| `shape` | `square` | `pill` | `square` | Adjusts the component's `border-radius`. |

#### `<google-input>`

A floating-label form utility mapped to Material 3 variables that adjusts coordinates seamlessly based on value population.

```html
<google-input theme="auto" placeholder="Email or phone" type="text"></google-input>

```

| Attribute | Options | Default | Description |
| --- | --- | --- | --- |
| `theme` | `light` | `dark` | `auto` | `light` | Evaluates layout values or hooks into system media queries. |
| `placeholder` | `string` | `Enter text` | Text assigned to the floating label node. |
| `type` | `text` | `password` | etc. | `text` | Native type definition for the input layer. |

---

### 2. TikTok Components (Neon Accent Spec)

#### `<tiktok-button>`

Implements a clean split-layer design matrix utilizing offset pseudo-elements to render stable `#25F4EE` and `#FE2C55` absolute brand highlights.

```html
<tiktok-button variant="solid">Watch now</tiktok-button>
<tiktok-button variant="outline">Explore</tiktok-button>

```

| Attribute | Options | Default | Description |
| --- | --- | --- | --- |
| `variant` | `solid` | `outline` | `solid` | Inverts foreground text and panel colors. |

#### `<tiktok-input>`

A fluid search/text module utilizing alpha-channel background tokens for crisp transparency overlays.

```html
<tiktok-input theme="dark" variant="search" placeholder="Search creators"></tiktok-input>

```

---

### 3. Discord Components (Desktop App Spec)

#### `<discord-input>`

High-density data entry field that mimics the structure of Discord’s electron desktop client settings workflow.

```html
<discord-input theme="dark" label="Username" placeholder="Enter your handle"></discord-input>

```

| Attribute | Options | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `""` | Appends an upper-case typography sub-header. |

#### `<discord-card>`

A server-discovery block containing status badge structures, dynamic line-clamping descriptions, and asynchronous hover transition layers.

```html
<discord-card 
    theme="dark" 
    heading="The Backrooms" 
    banner="images/banner.png" 
    members="42,109"
>
    A community centered around structural code obfuscation, low-level architecture, and security design.
</discord-card>

```

---

## Theme Architecture Matrix

Components utilizing the `theme="auto"` flag implement double-layer fallbacks via native CSS Custom Property engines and structural class scoping.

```css
/* Internal implementation map inside Shadow Roots */
@media (prefers-color-scheme: dark) {
    :host([theme="auto"]) .card {
        --dc-card-bg: #2b2d31;
        --dc-card-title: #ffffff;
    }
}

```

This guarantees component-level overrides (`theme="dark"`) remain absolute even if the host terminal operating system is serving an independent base system configuration.
