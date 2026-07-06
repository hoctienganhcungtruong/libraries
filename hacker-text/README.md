# HackerText.js

A lightweight, dependency-free JavaScript utility that applies a dynamic, terminal-style "hacker" typing and text-scrambling effect to HTML elements. The library supports sequential messaging, custom scrambling character sets, looping, user interaction hooks, lifecycle callbacks, and zero-configuration initialization using HTML `data-` attributes.

---

## Features

* **Zero Dependencies:** Pure vanilla JavaScript leveraging optimized `requestAnimationFrame` cycles.
* **Smart Content Fallback:** Automatically adopts the element's existing inner text if no explicit messages are provided.
* **Declarative HTML Configuration:** Drive advanced textual effects directly via your markup using custom `data-` attributes.
* **Interactive Event Triggers:** Fire immediately on layout load, viewport presence, or element-level micro-interactions (`click` and `hover`).
* **Lifecycle Callbacks:** Hook into specific runtime phases with programmatic callbacks whenever an individual message resolves or the full sequence wraps up.

---

## Installation

Include the script at the bottom of your HTML document, right before the closing `</body>` tag:

```html
<script src="https://cdn.jsdelivr.net/gh/hoctienganhcungtruong/libraries@main/hacker-text/hacker-text-v4.min.js"></script>

```

---

## Usage

### 1. HTML Configuration (Auto-Initialization)

The script automatically queries the DOM for any elements containing the `data-hacker` attribute upon the `DOMContentLoaded` event.

#### Text Fallback (Reads inner HTML text)

```html
<h1 data-hacker>SECURE ARCHIVE</h1>

```

#### Multi-Message Loop with Hover Trigger

```html
<h2 data-hacker 
    data-messages="ACCESSING NODE...|BYPASSING FIREWALL...|CONNECTION UNSECURED" 
    data-trigger="hover" 
    data-speed="50" 
    data-delay="1200">
    Hover to Decrypt
</h2>

```

#### JSON Array Configuration

```html
<p data-hacker data-messages='["Analyzing packet...", "Threat detected!"]' data-loop="false"></p>

```

### 2. Manual Programmatic Initialization

By omitting `data-hacker` from your element, you can gain deep object-oriented control and pass lifecycle function triggers:

```html
<h1 id="terminal-heading">INITIAL VALUE</h1>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const hackerInstance = HackerText.init({
      element: "#terminal-heading",
      messages: ["MALWARE DETECTED", "QUARANTINING..."],
      trigger: "scroll",
      speed: 40,
      loop: false,
      
      // Lifecycle hooks
      onMessage: (text, index) => {
        console.log(`Message finalized [Index ${index}]: ${text}`);
      },
      onComplete: () => {
        console.log("All text execution sequences finished smoothly.");
      }
    });
  });
</script>

```

---

## Configuration Options

These configurations can be passed as options to `HackerText.init()` or declared as HTML data attributes. Note that HTML attributes should be written in `kebab-case`.

| Option (JS) | Attribute (HTML) | Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| `element` | *N/A* | `String` | `HTMLElement` | *Required (JS)* | Target element context or CSS selector. |
| `messages` | `data-messages` | `Array` | `String` | `[InnerText &vert; "HACKING..."]` &vert; Text configurations. Defaults to the element's inner text, or `"HACKING..."` if empty. Split via `&vert;` or pass a serialized JSON string array. |
| `speed` | `data-speed` | `Number` | `40` | Typing/reveal speed per character in milliseconds. |
| `deleteSpeed` | `data-delete-speed` | `Number` | `20` | Character retraction speed in milliseconds. |
| `delay` | `data-delay` | `Number` | `1000` | Break duration (in ms) before running text deletion phases. |
| `chars` | `data-chars` | `String` | `"$#@%&*!?+=-_/<>[]{}"` | Complete character dictionary used to draw frame scramble steps. |
| `loop` | `data-loop` | `Boolean` | `true` | Continually loops text iterations from index `0`. |
| `liveChars` | `data-live-chars` | `Boolean` | `true` | Refreshes and animates unrevealed characters on every screen frame update. |
| `keepAfterFinish` | `data-keep-after-finish` | `Boolean` | `true` | Holds onto the terminal message permanently when `loop: false`. |
| `scrambleCount` | `data-scramble-count` | `Number` | `3` | Minimum animation step count per single character before text resolution. |
| `trigger` | `data-trigger` | `String` | `"load"` | Strategy trigger:<br>• `"load"`: Fires instantly.<br>• `"scroll"`: Triggers on 10% target screen visibility via `IntersectionObserver`.<br>• `"click"`: Resets index tracking to `0` and fires when clicked.<br>• `"hover"`: Resets index tracking to `0` and fires on element pointer `mouseenter`. |
| `onMessage` | *N/A* | `Function` | `null` | Callback executed when *a message* finishes typing. Parameters: `(completedText, index)`. |
| `onComplete` | *N/A* | `Function` | `null` | Callback executed when the *entire cycle completely finishes* (only fires if `loop` is `false`). |

---

## Programmatic API Methods

The initialization engine returns instance wrappers containing full memory tracking lifecycle operations:

### `.start()`

Force activates or interrupts running cycles to run from the active frame sequence.

```javascript
textEffect.start();

```

### `.cancelTimers()`

Instantly drops the running frame registration and flushes sequential delay timeouts.

```javascript
textEffect.cancelTimers();

```

### `.destroy()`

Safely removes tracked runtime listeners from memory. This tears down automated event tracking collections (`click`, `hover`), closes out viewport observer engines, and clears operational layout handlers to eliminate memory leaks.

```javascript
textEffect.destroy();

```

---

## Structural CSS Recommendations

Because text structures continuously shrink or expand through variable message arrays, container layouts risk snapping back down to a height of `0px` inside deletion segments. This will trigger layout shifting (content bouncing) among adjacent page components.

To keep layouts stable, define a baseline layout standard within your global styles:

```css
/* Safeguard layout flows against text dimension alterations */
[data-hacker], 
.hacker-target {
    display: inline-block;
    min-height: 1.2em;
    vertical-align: bottom;
}

```
