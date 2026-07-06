# HackerText.js

A lightweight, dependency-free JavaScript utility that applies a dynamic, terminal-style "hacker" typing and text-scrambling effect to HTML elements. The library supports sequential messaging, speed configurations, custom scrambling character sets, looping, user interaction triggers, and zero-configuration initialization using HTML `data-` attributes.

---

## Features

* **Zero Dependencies:** Pure vanilla JavaScript using `requestAnimationFrame`.
* **Declarative Initialization:** Set up complex text effects entirely within your HTML via custom `data-` attributes.
* **Dynamic Scrambling:** Randomized character obfuscation during text injection and extraction.
* **Interactive Triggers:** Trigger effects instantly on page load, on viewport scroll, or directly on user click.
* **Flexible Data Formats:** Supports both pipe-separated arrays (`msg1|msg2`) and standard serialized JSON strings inside HTML attributes.
* **Layout Safe:** Configurable behaviors to hold the final message in place or loop infinitely.

---

## Installation

Include the script at the bottom of your HTML document, right before the closing `</body>` tag:

```html
<script src="[https://cdn.jsdelivr.net/gh/hoctienganhcungtruong/libraries@main/hacker-text/hacker-text-v2.min.js](https://cdn.jsdelivr.net/gh/hoctienganhcungtruong/libraries@main/hacker-text/hacker-text-v2.min.js)"></script>

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

#### Multi-Message Loop (Pipe Separated) with Click Trigger

```html
<h2 data-hacker 
    data-messages="INITIALIZING SYSTEM...|DECRYPTING FILES...|OVERRIDE COMPLETE" 
    data-trigger="click" 
    data-speed="50" 
    data-delay="1500">
    Click to Hack
</h2>

```

#### JSON Array Configuration

```html
<p data-hacker data-messages='["Analyzing packet...", "Threat detected!"]' data-loop="false"></p>

```

### 2. Manual Programmatic Initialization

If you render elements dynamically or prefer managing your scripts inside JavaScript, bypass the auto-initializer by omitting `data-hacker` from your markup and invoking the global API:

```html
<h1 id="terminal-heading"></h1>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    // Capture the instance to use its API methods later if needed
    const hackerInstance = HackerText.init({
      element: "#terminal-heading", // CSS Selector string or direct DOM node
      messages: ["MALWARE DETECTED", "QUARANTINING..."],
      trigger: "scroll",
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

These configurations can be passed as options to `HackerText.init()` or declared as HTML data attributes. Note that data-attributes should be formatted as `kebab-case` (e.g., `data-delete-speed="20"`).

| Option (JS) | Attribute (HTML) | Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| `element` | *N/A* | `String` | `HTMLElement` | *Required (JS only)* | The target element or CSS selector to apply the effect to. |
| `messages` | `data-messages` | `Array` | `String` | `["HACKING..."]` | The array of messages to cycle through. Split via `|` or pass a valid JSON string array. |
| `speed` | `data-speed` | `Number` | `40` | Type/reveal speed per character in milliseconds. |
| `deleteSpeed` | `data-delete-speed` | `Number` | `20` | Deletion speed per character in milliseconds. |
| `delay` | `data-delay` | `Number` | `1000` | The pause duration (in ms) before beginning the deletion phase. |
| `chars` | `data-chars` | `String` | `"$#@%&*!?+=-_/<>[]{}"` | The string pool of random characters used to mask the unrevealed text. |
| `loop` | `data-loop` | `Boolean` | `true` | Continually restarts the text sequence from index `0` after the final message is processed. |
| `liveChars` | `data-live-chars` | `Boolean` | `true` | Continuously cycles/changes the unrevealed scramble characters on every frame. |
| `keepAfterFinish` | `data-keep-after-finish` | `Boolean` | `true` | If `loop` is `false`, setting this to `true` persists the final message permanently on screen. |
| `scrambleCount` | `data-scramble-count` | `Number` | `3` | The minimum number of frames a character cycles through random scrambling before being fully revealed. |
| `trigger` | `data-trigger` | `String` | `"load"` | Execution strategy. <br>

<br>• `"load"`: Fires instantly.<br>

<br>• `"scroll"`: Fires via `IntersectionObserver` when 10% of the element is visible.<br>

<br>• `"click"`: Changes cursor to pointer and restarts the sequence from index `0` on element click.<br>

<br>• `"manual"`: Prevents auto-execution, requiring you to call `.start()` programmatically. |

---

## Programmatic API Methods

When you initialize a text component using `HackerText.init()`, it returns an instance object exposing control methods. This is highly useful for single-page apps (SPAs) or highly interactive sites.

### `.start()`

Starts or restarts the text scrambling cycle immediately from the current phase.

```javascript
const textEffect = HackerText.init({ element: "#header", trigger: "manual", messages: ["HELLO"] });
textEffect.start();

```

### `.cancelTimers()`

Pauses the current animation frame and clears any pending timeouts.

```javascript
textEffect.cancelTimers();

```

### `.destroy()`

Cleans up the instance entirely. It stops all running animations, clears all timeouts, disconnects internal `IntersectionObserver` instances, and detaches `click` event listeners to prevent memory leaks.

```javascript
// Clean up when removing an element from the DOM
textEffect.destroy();

```

---

## Structural CSS Recommendations

Because the effect continually adds and removes characters, the container element's dimensions will naturally collapse to a height of `0px` when no characters are present. This can cause severe layout shifting (content bouncing up and down) for surrounding layout structures.

To prevent layout instability, apply layout constraint rules to your stylesheet matching your target components:

```css
/* Prevent layout shifting while text is processing */
[data-hacker], 
.hacker-target {
    display: inline-block;
    min-height: 1.2em;
    vertical-align: bottom;
}

```
