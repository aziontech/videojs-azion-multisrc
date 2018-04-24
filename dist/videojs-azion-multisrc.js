/**
 * videojs-azion-multisrc
 * @version 1.0.0
 * @copyright 2018 Azion Technologies <engineering@azion.com>
 * @license Commercial
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js'), require('global/document')) :
	typeof define === 'function' && define.amd ? define(['video.js', 'global/document'], factory) :
	(global.videojsAzionMultisrc = factory(global.videojs,global.document));
}(this, (function (videojs,document) { 'use strict';

videojs = videojs && videojs.hasOwnProperty('default') ? videojs['default'] : videojs;
document = document && document.hasOwnProperty('default') ? document['default'] : document;

var event_blist = "blacklistplaylist";
var event_error = "error";
var event_pause = "pause";
var event_play = "play";
var event_ready = "ready";
var event_retry = "retryplaylist";
var event_stop = "stop";
var msg_invalid_src = "invalid source";
var trust_me = "Trust me, I'm an engineer.";

// Video.js 5/6 cross-compatibility.
var registerPlugin = videojs.registerPlugin || videojs.plugin;

var initPlugin = function initPlugin(player, srcs) {
    var sources = Array.isArray(srcs) ? srcs.slice() : [];
    var tech = player.tech(trust_me);
    var was_playing = false;

    var onSourceFail = function onSourceFail() {
        if (sources.length > 0) {
            var failed_src = sources.shift();
            sources.push(failed_src);
            var failed_str = typeof failed_src === 'string' ? failed_src : 'src' in failed_src ? failed_src.src : msg_invalid_src;
            var trying_src = typeof sources[0] === 'string' ? sources[0] : 'src' in sources[0] ? sources[0].src : msg_invalid_src;
            console.log('Caught failure on ' + failed_str + ', trying ' + trying_src);
            player.src(sources[0]);
            if (was_playing) {
                player.play();
            }
        }
    };

    player.tech(trust_me).on(event_retry, onSourceFail);
    player.tech(trust_me).on(event_blist, onSourceFail);
    player.on(event_error, onSourceFail);
    player.on(event_play, function () {
        was_playing = true;
    });
    player.on(event_pause, function () {
        was_playing = false;
    });
    player.on(event_stop, function () {
        was_playing = false;
    });
};

var azionMultiSrc = function azionMultiSrc(sources) {
    var _this = this;

    player.on(event_ready, function () {
        var srcs = [];
        srcs.push(_this.src());
        srcs = srcs.concat(sources);
        initPlugin(_this, srcs);
    });
};

// Register the plugin with video.js.
registerPlugin('azionmultisrc', azionMultiSrc);

return azionMultiSrc;

})));
