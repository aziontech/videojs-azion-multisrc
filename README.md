# videojs-azion-multisrc

Azion Multi Src

## Installation


## Usage

To include videojs-azion-multisrc on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<video id="my-video" class="video-js vjs-default-skin" controls width="464" height="260">
    <source src="path.to/playlist.m3u8" type="application/x-mpegURL">
</video>
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-contrib-hls.js"></script> <!-- HLS ain't needed, but Multi Src is pointless without it -->
<script src="//path/to/videojs-azion-multisrc.min.js"></script>
<script>
    var player = videojs('my-video');
    var backups = [
            {
                src: "path.to/other_playlist.m3u8",
                type: "application/x-mpegURL"
            },
            {
                src: "path.to/how_many_playlists_you_need.m3u8",
                type: "application/x-mpegURL"
            }
        ];
    player.azionmultisrc(backups);
</script>
```

## License

Commercial. Copyright (c) Azion Technologies &lt;engineering@azion.com&gt;


[videojs]: http://videojs.com/
