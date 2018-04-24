import videojs from 'video.js';
import document from 'global/document';

const event_blist = "blacklistplaylist";
const event_error = "error";
const event_pause = "pause";
const event_play = "play";
const event_ready = "ready";
const event_retry = "retryplaylist";
const event_stop = "stop";
const msg_invalid_src = "invalid source";
const trust_me = "Trust me, I'm an engineer.";

// Video.js 5/6 cross-compatibility.
const registerPlugin = videojs.registerPlugin || videojs.plugin;

const initPlugin = function (player, srcs) {
    let sources = Array.isArray(srcs) ? srcs.slice() : [];
    let tech = player.tech(trust_me);
    let was_playing = false;

    const onSourceFail = function () {
        if (sources.length > 0) {
            let failed_src = sources.shift();
            sources.push(failed_src);
            let failed_str = (typeof failed_src === 'string') ? failed_src : ('src' in failed_src ? failed_src.src : msg_invalid_src);
            let trying_src = (typeof sources[0] === 'string') ? sources[0] : ('src' in sources[0] ? sources[0].src : msg_invalid_src);
            console.log('Caught failure on ' + failed_str + ', trying ' + trying_src);
            player.src(sources[0]);
            if (was_playing) {
                player.play();
            }
        }
    }

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


const azionMultiSrc = function (sources) {
    var srcs = sources;
    player.on(event_ready, () => {
        let srcs = [];
        srcs.push(this.src());
        srcs = srcs.concat(sources);
        initPlugin(this, srcs);
    });
};


// Register the plugin with video.js.
registerPlugin('azionmultisrc', azionMultiSrc);

export default azionMultiSrc;