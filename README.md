# videojs-azion-multisrc

Multi src

## Installation

```sh
npm install --save videojs-azion-multisrc
```

## Usage

To include videojs-azion-multisrc on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-azion-multisrc.min.js"></script>
<script>
  var player = videojs('my-video');

  player.azionMultisrc();
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-azion-multisrc via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-azion-multisrc');

var player = videojs('my-video');

player.azionMultisrc();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-azion-multisrc'], function(videojs) {
  var player = videojs('my-video');

  player.azionMultisrc();
});
```

## License

UNLICENSED. Copyright (c) Vinicius Mignot &lt;vinicius.mignot@azion.com&gt;


[videojs]: http://videojs.com/
