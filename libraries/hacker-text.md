# HackerText.js

HackerText.js is a compact JavaScript library used to create a "decoded" text effect where glitch characters appear before the actual content is displayed.

---

## Installation

Use directly by embedding the file:

```html
<script src="https://cdn.jsdelivr.net/gh/tmbckrms/libraries/libraries/hacker-text.min.js"></script>
```

## Quick Start
```html
<div id="app"></div>

<script src="https://cdn.jsdelivr.net/gh/tmbckrms/libraries/libraries/hacker-text.min.js"></script>
<script>
HackerText.init({
    element: "#app",
    messages: ["HELLO", "SYSTEM ONLINE"]
});
</script>
```

## How To Use
### HackerText.init(options)
Initialize effect.

| Option      | Type                 | Default               | Description                    |
| ----------- | -------------------- | --------------------- | ------------------------------ |
| element     | string | HTMLElement | required              | The element will be displayed               |
| messages    | string[]             | required              | Content list             |
| speed       | number               | 40                    | Display speed          |
| deleteSpeed | number               | 20                    | Delete speed                    |
| delay       | number               | 1000                  | Waiting time after completion |
| chars       | string               | "$#@%&*!?+=-_/<>[]{}" | List of glitch characters                |
| loop        | boolean              | true                  | Does it repeat.          |

## Example
```html
<div id="demo"></div>

<script>
HackerText.init({
    element: "#demo",
    messages: [
        "ACCESSING DATABASE...",
        "DECRYPTING FILES...",
        "ACCESS GRANTED"
    ],
    speed: 30,
    deleteSpeed: 15,
    delay: 1500,
    chars: "@#$%^&*",
    loop: true
});
</script>
```
## Auto Initialization

HackerText.js supports automatic initialization via HTML using **custom data attributes** (`data-*`). This allows for direct configuration in HTML without writing JavaScript.

---

### Example

```html
<div data-hacker data-messages="HELLO|SYSTEM ONLINE|WELCOME"></div>
<script src="https://cdn.jsdelivr.net/gh/tmbckrms/libraries/libraries/hacker-text.min.js"></script>
```

### Attributes
| Attribute     | Type    | Description                                |   |
| ------------- | ------- | ------------------------------------------ | - |
| data-hacker   | boolean | Enable auto initialization              |   |
| data-messages | string  | List of contents, separated by the characters "&#124;" |

## Versions
* v1.0.0: <kbd>https://cdn.jsdelivr.net/gh/tmbckrms/libraries@v1.0.0/libraries/hacker-text.min.js</kbd>
## Final Words
Happy coding!

  
