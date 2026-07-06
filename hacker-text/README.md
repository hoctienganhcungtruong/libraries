# HackerText.js

A lightweight, dependency-free JavaScript utility that applies a dynamic, terminal-style "hacker" typing and text-scrambling effect to HTML elements. The library supports sequential messaging, speed configurations, custom scrambling character sets, looping, and zero-configuration initialization using HTML `data-` attributes.

---

## Features

* **Zero Dependencies:** Pure vanilla JavaScript.
* **Declarative Initialization:** Set up complex text effects entirely within your HTML via custom `data-` attributes.
* **Dynamic Scrambling:** Randomized character obfuscation during text injection and extraction.
* **Flexible Data Formats:** Supports both pipe-separated arrays (`msg1|msg2`) and standard serialized JSON strings inside HTML attributes.
* **Layout Safe:** Configurable behaviors to hold the final message in place or loop infinitely.

---

## Installation

Include the script at the bottom of your HTML document, right before the closing `</body>` tag:

```html
<script src="https://cdn.jsdelivr.net/gh/hoctienganhcungtruong/libraries@main/hacker-text/hacker-text-v2.min.js"></script>
```

---

## Usage

### 1. HTML Configuration (Auto-Initialization)

The script automatically queries the DOM for any elements containing the `data-hacker` attribute upon the `DOMContentLoaded` event.

You can apply this effect to any text container element, such as `<h1>`, `<h2>`, `<p>`, `<span>`, or `<div>`.

#### Basic Implementation

```html
<h1 data-hacker data-messages="ACCESS GRANTED"></h1>

```

#### Multi-Message Loop (Pipe Separated)

```html
<h2 data-hacker data-messages="INITIALIZING SYSTEM...|DECRYPTING FILES...|OVERRIDE COMPLETE" data-speed="50" data-delay="1500"></h2>

```

#### JSON Array Configuration

```html
<p data-hacker data-messages='["Analyzing packet...", "Threat detected!"]' data-loop="false"></p>

```

### 2. Manual Programmatic Initialization

If you render elements dynamically or prefer configuring your scripts within JavaScript, bypass the auto-initializer by omitting `data-hacker` from your markup and invoking the global API:

```html
<h1 id="terminal-heading"></h1>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    HackerText.init({
      element: "#terminal-heading", // CSS Selector string or direct DOM node
      messages: ["MALWARE DETECTED", "QUARANTINING..."],
      speed: 60,
      deleteSpeed: 30,
      delay: 2000,
      loop: true
    });
  });
</script>

```

---

## Configuration Options

These configurations can be passed as options to `HackerText.init()` or declared as HTML data attributes (e.g., `data-speed="40"`).

| Option / Attribute | Type | Default Value | Description |
| --- | --- | --- | --- |
| `element` | `String` | `HTMLElement` | *Required (JS only)* | The target element or CSS selector to apply the effect to. |
| `data-messages` | `String` (JSON / Pipe-split) | `["HACKING..."]` | The string array of messages to cycle through. Split via `|` or pass a valid JSON string array. |
| `data-speed` | `Number` | `40` | Type/reveal speed per character in milliseconds. |
| `data-delete-speed` | `Number` | `20` | Deletion speed per character in milliseconds. |
| `data-delay` | `Number` | `1000` | The pause duration (in ms) before beginning the deletion phase. |
| `data-chars` | `String` | `"$#@%&*!?+=-_/<>[]{}"` | The string pool of random characters used to mask the unrevealed text. |
| `data-loop` | `Boolean` | `true` | Continually restarts the text sequence from index `0` after the final message is processed. |
| `data-live-chars` | `Boolean` | `true` | Continuously changes the unrevealed scramble characters on every single frame. |
| `data-keep-after-finish` | `Boolean` | `true` | If `loop` is `false`, setting this to `true` persists the final message permanently on screen. |
| `data-trigger` | `String` | `"load"` | Execution strategy. `"load"` fires immediately; `"scroll"` uses an `IntersectionObserver` to fire only when at least 10% of the element is visible in the viewport.

---

## Structural CSS Recommendations

Because the effect continually adds and removes characters, the container element's dimensions will naturally collapse to a height of `0px` when no characters are present. This can cause severe layout shifting (content bouncing up and down) for surrounding block-level elements like `<h1>` or `<h2>`.

To prevent this layout instability, apply a layout rule to your stylesheet matching your target components:

```css
/* Prevent layout shifting while text is processing */
h1[data-hacker], 
h2[data-hacker], 
.hacker-target {
    display: inline-block;
    min-height: 1.2em;
    vertical-align: bottom;
}

```
