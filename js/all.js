

/* ---- /1CWkZv7fQAKxTVjZVrLZ8VHcrN6YGGcdky/js/ZeroFrame.js ---- */


const CMD_INNER_READY = 'innerReady'
const CMD_RESPONSE = 'response'
const CMD_WRAPPER_READY = 'wrapperReady'
const CMD_PING = 'ping'
const CMD_PONG = 'pong'
const CMD_WRAPPER_OPENED_WEBSOCKET = 'wrapperOpenedWebsocket'
const CMD_WRAPPER_CLOSE_WEBSOCKET = 'wrapperClosedWebsocket'

class ZeroFrame {
    constructor(url) {
        this.url = url
        this.waiting_cb = {}
        this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1")
        this.connect()
        this.next_message_id = 1
        this.init()
    }

    init() {
        return this
    }

    connect() {
        this.target = window.parent
        window.addEventListener('message', e => this.onMessage(e), false)
        this.cmd(CMD_INNER_READY)
    }

    onMessage(e) {
        let message = e.data
        let cmd = message.cmd
        if (cmd === CMD_RESPONSE) {
            if (this.waiting_cb[message.to] !== undefined) {
                this.waiting_cb[message.to](message.result)
            }
            else {
                this.log("Websocket callback not found:", message)
            }
        } else if (cmd === CMD_WRAPPER_READY) {
            this.cmd(CMD_INNER_READY)
        } else if (cmd === CMD_PING) {
            this.response(message.id, CMD_PONG)
        } else if (cmd === CMD_WRAPPER_OPENED_WEBSOCKET) {
            this.onOpenWebsocket()
        } else if (cmd === CMD_WRAPPER_CLOSE_WEBSOCKET) {
            this.onCloseWebsocket()
        } else {
            this.onRequest(cmd, message)
        }
    }

    onRequest(cmd, message) {
        this.log("Unknown request", message)
    }

    response(to, result) {
        this.send({
            cmd: CMD_RESPONSE,
            to: to,
            result: result
        })
    }

    cmd(cmd, params={}, cb=null) {
        this.send({
            cmd: cmd,
            params: params
        }, cb)
    }

    send(message, cb=null) {
        message.wrapper_nonce = this.wrapper_nonce
        message.id = this.next_message_id
        this.next_message_id++
        this.target.postMessage(message, '*')
        if (cb) {
            this.waiting_cb[message.id] = cb
        }
    }

    log(...args) {
        console.log.apply(console, ['[ZeroFrame]'].concat(args))
    }

    onOpenWebsocket() {
        this.log('Websocket open')
    }

    onCloseWebsocket() {
        this.log('Websocket close')
    }
}




/* ---- /1CWkZv7fQAKxTVjZVrLZ8VHcrN6YGGcdky/js/autosize.min.js ---- */


/*!
	Autosize 3.0.20
	license: MIT
	http://www.jacklmoore.com/autosize
*/
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","module"],t);else if("undefined"!=typeof exports&&"undefined"!=typeof module)t(exports,module);else{var n={exports:{}};t(n.exports,n),e.autosize=n.exports}}(this,function(e,t){"use strict";function n(e){function t(){var t=window.getComputedStyle(e,null);"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),s="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),isNaN(s)&&(s=0),l()}function n(t){var n=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=n,e.style.overflowY=t}function o(e){for(var t=[];e&&e.parentNode&&e.parentNode instanceof Element;)e.parentNode.scrollTop&&t.push({node:e.parentNode,scrollTop:e.parentNode.scrollTop}),e=e.parentNode;return t}function r(){var t=e.style.height,n=o(e),r=document.documentElement&&document.documentElement.scrollTop;e.style.height="auto";var i=e.scrollHeight+s;return 0===e.scrollHeight?void(e.style.height=t):(e.style.height=i+"px",u=e.clientWidth,n.forEach(function(e){e.node.scrollTop=e.scrollTop}),void(r&&(document.documentElement.scrollTop=r)))}function l(){r();var t=Math.round(parseFloat(e.style.height)),o=window.getComputedStyle(e,null),i=Math.round(parseFloat(o.height));if(i!==t?"visible"!==o.overflowY&&(n("visible"),r(),i=Math.round(parseFloat(window.getComputedStyle(e,null).height))):"hidden"!==o.overflowY&&(n("hidden"),r(),i=Math.round(parseFloat(window.getComputedStyle(e,null).height))),a!==i){a=i;var l=d("autosize:resized");try{e.dispatchEvent(l)}catch(e){}}}if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!i.has(e)){var s=null,u=e.clientWidth,a=null,p=function(){e.clientWidth!==u&&l()},c=function(t){window.removeEventListener("resize",p,!1),e.removeEventListener("input",l,!1),e.removeEventListener("keyup",l,!1),e.removeEventListener("autosize:destroy",c,!1),e.removeEventListener("autosize:update",l,!1),Object.keys(t).forEach(function(n){e.style[n]=t[n]}),i.delete(e)}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",c,!1),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",l,!1),window.addEventListener("resize",p,!1),e.addEventListener("input",l,!1),e.addEventListener("autosize:update",l,!1),e.style.overflowX="hidden",e.style.wordWrap="break-word",i.set(e,{destroy:c,update:l}),t()}}function o(e){var t=i.get(e);t&&t.destroy()}function r(e){var t=i.get(e);t&&t.update()}var i="function"==typeof Map?new Map:function(){var e=[],t=[];return{has:function(t){return e.indexOf(t)>-1},get:function(n){return t[e.indexOf(n)]},set:function(n,o){e.indexOf(n)===-1&&(e.push(n),t.push(o))},delete:function(n){var o=e.indexOf(n);o>-1&&(e.splice(o,1),t.splice(o,1))}}}(),d=function(e){return new Event(e,{bubbles:!0})};try{new Event("test")}catch(e){d=function(e){var t=document.createEvent("Event");return t.initEvent(e,!0,!1),t}}var l=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(l=function(e){return e},l.destroy=function(e){return e},l.update=function(e){return e}):(l=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return n(e,t)}),e},l.destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],o),e},l.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],r),e}),t.exports=l});


/* ---- /1CWkZv7fQAKxTVjZVrLZ8VHcrN6YGGcdky/js/emojione.min.js ---- */


!function(f){f.emojioneList={":kiss_ww:":{unicode:["1f469-200d-2764-fe0f-200d-1f48b-200d-1f469","1f469-2764-1f48b-1f469"],fname:"1f469-2764-1f48b-1f469",uc:"1f469-200d-2764-fe0f-200d-1f48b-200d-1f469",isCanonical:!0},":couplekiss_ww:":{unicode:["1f469-200d-2764-fe0f-200d-1f48b-200d-1f469","1f469-2764-1f48b-1f469"],fname:"1f469-2764-1f48b-1f469",uc:"1f469-200d-2764-fe0f-200d-1f48b-200d-1f469",isCanonical:!1},":kiss_mm:":{unicode:["1f468-200d-2764-fe0f-200d-1f48b-200d-1f468","1f468-2764-1f48b-1f468"],fname:"1f468-2764-1f48b-1f468",uc:"1f468-200d-2764-fe0f-200d-1f48b-200d-1f468",isCanonical:!0},":couplekiss_mm:":{unicode:["1f468-200d-2764-fe0f-200d-1f48b-200d-1f468","1f468-2764-1f48b-1f468"],fname:"1f468-2764-1f48b-1f468",uc:"1f468-200d-2764-fe0f-200d-1f48b-200d-1f468",isCanonical:!1},":family_mmbb:":{unicode:["1f468-200d-1f468-200d-1f466-200d-1f466","1f468-1f468-1f466-1f466"],fname:"1f468-1f468-1f466-1f466",uc:"1f468-200d-1f468-200d-1f466-200d-1f466",isCanonical:!0},":family_mmgb:":{unicode:["1f468-200d-1f468-200d-1f467-200d-1f466","1f468-1f468-1f467-1f466"],fname:"1f468-1f468-1f467-1f466",uc:"1f468-200d-1f468-200d-1f467-200d-1f466",isCanonical:!0},":family_mmgg:":{unicode:["1f468-200d-1f468-200d-1f467-200d-1f467","1f468-1f468-1f467-1f467"],fname:"1f468-1f468-1f467-1f467",uc:"1f468-200d-1f468-200d-1f467-200d-1f467",isCanonical:!0},":family_mwbb:":{unicode:["1f468-200d-1f469-200d-1f466-200d-1f466","1f468-1f469-1f466-1f466"],fname:"1f468-1f469-1f466-1f466",uc:"1f468-200d-1f469-200d-1f466-200d-1f466",isCanonical:!0},":family_mwgb:":{unicode:["1f468-200d-1f469-200d-1f467-200d-1f466","1f468-1f469-1f467-1f466"],fname:"1f468-1f469-1f467-1f466",uc:"1f468-200d-1f469-200d-1f467-200d-1f466",isCanonical:!0},":family_mwgg:":{unicode:["1f468-200d-1f469-200d-1f467-200d-1f467","1f468-1f469-1f467-1f467"],fname:"1f468-1f469-1f467-1f467",uc:"1f468-200d-1f469-200d-1f467-200d-1f467",isCanonical:!0},":family_wwbb:":{unicode:["1f469-200d-1f469-200d-1f466-200d-1f466","1f469-1f469-1f466-1f466"],fname:"1f469-1f469-1f466-1f466",uc:"1f469-200d-1f469-200d-1f466-200d-1f466",isCanonical:!0},":family_wwgb:":{unicode:["1f469-200d-1f469-200d-1f467-200d-1f466","1f469-1f469-1f467-1f466"],fname:"1f469-1f469-1f467-1f466",uc:"1f469-200d-1f469-200d-1f467-200d-1f466",isCanonical:!0},":family_wwgg:":{unicode:["1f469-200d-1f469-200d-1f467-200d-1f467","1f469-1f469-1f467-1f467"],fname:"1f469-1f469-1f467-1f467",uc:"1f469-200d-1f469-200d-1f467-200d-1f467",isCanonical:!0},":couple_ww:":{unicode:["1f469-200d-2764-fe0f-200d-1f469","1f469-2764-1f469"],fname:"1f469-2764-1f469",uc:"1f469-200d-2764-fe0f-200d-1f469",isCanonical:!0},":couple_with_heart_ww:":{unicode:["1f469-200d-2764-fe0f-200d-1f469","1f469-2764-1f469"],fname:"1f469-2764-1f469",uc:"1f469-200d-2764-fe0f-200d-1f469",isCanonical:!1},":couple_mm:":{unicode:["1f468-200d-2764-fe0f-200d-1f468","1f468-2764-1f468"],fname:"1f468-2764-1f468",uc:"1f468-200d-2764-fe0f-200d-1f468",isCanonical:!0},":couple_with_heart_mm:":{unicode:["1f468-200d-2764-fe0f-200d-1f468","1f468-2764-1f468"],fname:"1f468-2764-1f468",uc:"1f468-200d-2764-fe0f-200d-1f468",isCanonical:!1},":family_mmb:":{unicode:["1f468-200d-1f468-200d-1f466","1f468-1f468-1f466"],fname:"1f468-1f468-1f466",uc:"1f468-200d-1f468-200d-1f466",isCanonical:!0},":family_mmg:":{unicode:["1f468-200d-1f468-200d-1f467","1f468-1f468-1f467"],fname:"1f468-1f468-1f467",uc:"1f468-200d-1f468-200d-1f467",isCanonical:!0},":family_mwg:":{unicode:["1f468-200d-1f469-200d-1f467","1f468-1f469-1f467"],fname:"1f468-1f469-1f467",uc:"1f468-200d-1f469-200d-1f467",isCanonical:!0},":family_wwb:":{unicode:["1f469-200d-1f469-200d-1f466","1f469-1f469-1f466"],fname:"1f469-1f469-1f466",uc:"1f469-200d-1f469-200d-1f466",isCanonical:!0},":family_wwg:":{unicode:["1f469-200d-1f469-200d-1f467","1f469-1f469-1f467"],fname:"1f469-1f469-1f467",uc:"1f469-200d-1f469-200d-1f467",isCanonical:!0},":rainbow_flag:":{unicode:["1f3f3-fe0f-200d-1f308","1f3f3-1f308"],fname:"1f3f3-1f308",uc:"1f3f3-fe0f-200d-1f308",isCanonical:!0},":gay_pride_flag:":{unicode:["1f3f3-fe0f-200d-1f308","1f3f3-1f308"],fname:"1f3f3-1f308",uc:"1f3f3-fe0f-200d-1f308",isCanonical:!1},":eye_in_speech_bubble:":{unicode:["1f441-200d-1f5e8","1f441-1f5e8"],fname:"1f441-1f5e8",uc:"1f441-200d-1f5e8",isCanonical:!0},":hash:":{unicode:["0023-fe0f-20e3","0023-20e3"],fname:"0023-20e3",uc:"0023-20e3",isCanonical:!0},":zero:":{unicode:["0030-fe0f-20e3","0030-20e3"],fname:"0030-20e3",uc:"0030-20e3",isCanonical:!0},":one:":{unicode:["0031-fe0f-20e3","0031-20e3"],fname:"0031-20e3",uc:"0031-20e3",isCanonical:!0},":two:":{unicode:["0032-fe0f-20e3","0032-20e3"],fname:"0032-20e3",uc:"0032-20e3",isCanonical:!0},":three:":{unicode:["0033-fe0f-20e3","0033-20e3"],fname:"0033-20e3",uc:"0033-20e3",isCanonical:!0},":four:":{unicode:["0034-fe0f-20e3","0034-20e3"],fname:"0034-20e3",uc:"0034-20e3",isCanonical:!0},":five:":{unicode:["0035-fe0f-20e3","0035-20e3"],fname:"0035-20e3",uc:"0035-20e3",isCanonical:!0},":six:":{unicode:["0036-fe0f-20e3","0036-20e3"],fname:"0036-20e3",uc:"0036-20e3",isCanonical:!0},":seven:":{unicode:["0037-fe0f-20e3","0037-20e3"],fname:"0037-20e3",uc:"0037-20e3",isCanonical:!0},":eight:":{unicode:["0038-fe0f-20e3","0038-20e3"],fname:"0038-20e3",uc:"0038-20e3",isCanonical:!0},":nine:":{unicode:["0039-fe0f-20e3","0039-20e3"],fname:"0039-20e3",uc:"0039-20e3",isCanonical:!0},":asterisk:":{unicode:["002a-fe0f-20e3","002a-20e3"],fname:"002a-20e3",uc:"002a-20e3",isCanonical:!0},":keycap_asterisk:":{unicode:["002a-fe0f-20e3","002a-20e3"],fname:"002a-20e3",uc:"002a-20e3",isCanonical:!1},":handball_tone5:":{unicode:["1f93e-1f3ff"],fname:"1f93e-1f3ff",uc:"1f93e-1f3ff",isCanonical:!0},":handball_tone4:":{unicode:["1f93e-1f3fe"],fname:"1f93e-1f3fe",uc:"1f93e-1f3fe",isCanonical:!0},":handball_tone3:":{unicode:["1f93e-1f3fd"],fname:"1f93e-1f3fd",uc:"1f93e-1f3fd",isCanonical:!0},":handball_tone2:":{unicode:["1f93e-1f3fc"],fname:"1f93e-1f3fc",uc:"1f93e-1f3fc",isCanonical:!0},":handball_tone1:":{unicode:["1f93e-1f3fb"],fname:"1f93e-1f3fb",uc:"1f93e-1f3fb",isCanonical:!0},":water_polo_tone5:":{unicode:["1f93d-1f3ff"],fname:"1f93d-1f3ff",uc:"1f93d-1f3ff",isCanonical:!0},":water_polo_tone4:":{unicode:["1f93d-1f3fe"],fname:"1f93d-1f3fe",uc:"1f93d-1f3fe",isCanonical:!0},":water_polo_tone3:":{unicode:["1f93d-1f3fd"],fname:"1f93d-1f3fd",uc:"1f93d-1f3fd",isCanonical:!0},":water_polo_tone2:":{unicode:["1f93d-1f3fc"],fname:"1f93d-1f3fc",uc:"1f93d-1f3fc",isCanonical:!0},":water_polo_tone1:":{unicode:["1f93d-1f3fb"],fname:"1f93d-1f3fb",uc:"1f93d-1f3fb",isCanonical:!0},":wrestlers_tone5:":{unicode:["1f93c-1f3ff"],fname:"1f93c-1f3ff",uc:"1f93c-1f3ff",isCanonical:!0},":wrestling_tone5:":{unicode:["1f93c-1f3ff"],fname:"1f93c-1f3ff",uc:"1f93c-1f3ff",isCanonical:!1},":wrestlers_tone4:":{unicode:["1f93c-1f3fe"],fname:"1f93c-1f3fe",uc:"1f93c-1f3fe",isCanonical:!0},":wrestling_tone4:":{unicode:["1f93c-1f3fe"],fname:"1f93c-1f3fe",uc:"1f93c-1f3fe",isCanonical:!1},":wrestlers_tone3:":{unicode:["1f93c-1f3fd"],fname:"1f93c-1f3fd",uc:"1f93c-1f3fd",isCanonical:!0},":wrestling_tone3:":{unicode:["1f93c-1f3fd"],fname:"1f93c-1f3fd",uc:"1f93c-1f3fd",isCanonical:!1},":wrestlers_tone2:":{unicode:["1f93c-1f3fc"],fname:"1f93c-1f3fc",uc:"1f93c-1f3fc",isCanonical:!0},":wrestling_tone2:":{unicode:["1f93c-1f3fc"],fname:"1f93c-1f3fc",uc:"1f93c-1f3fc",isCanonical:!1},":wrestlers_tone1:":{unicode:["1f93c-1f3fb"],fname:"1f93c-1f3fb",uc:"1f93c-1f3fb",isCanonical:!0},":wrestling_tone1:":{unicode:["1f93c-1f3fb"],fname:"1f93c-1f3fb",uc:"1f93c-1f3fb",isCanonical:!1},":juggling_tone5:":{unicode:["1f939-1f3ff"],fname:"1f939-1f3ff",uc:"1f939-1f3ff",isCanonical:!0},":juggler_tone5:":{unicode:["1f939-1f3ff"],fname:"1f939-1f3ff",uc:"1f939-1f3ff",isCanonical:!1},":juggling_tone4:":{unicode:["1f939-1f3fe"],fname:"1f939-1f3fe",uc:"1f939-1f3fe",isCanonical:!0},":juggler_tone4:":{unicode:["1f939-1f3fe"],fname:"1f939-1f3fe",uc:"1f939-1f3fe",isCanonical:!1},":juggling_tone3:":{unicode:["1f939-1f3fd"],fname:"1f939-1f3fd",uc:"1f939-1f3fd",isCanonical:!0},":juggler_tone3:":{unicode:["1f939-1f3fd"],fname:"1f939-1f3fd",uc:"1f939-1f3fd",isCanonical:!1},":juggling_tone2:":{unicode:["1f939-1f3fc"],fname:"1f939-1f3fc",uc:"1f939-1f3fc",isCanonical:!0},":juggler_tone2:":{unicode:["1f939-1f3fc"],fname:"1f939-1f3fc",uc:"1f939-1f3fc",isCanonical:!1},":juggling_tone1:":{unicode:["1f939-1f3fb"],fname:"1f939-1f3fb",uc:"1f939-1f3fb",isCanonical:!0},":juggler_tone1:":{unicode:["1f939-1f3fb"],fname:"1f939-1f3fb",uc:"1f939-1f3fb",isCanonical:!1},":cartwheel_tone5:":{unicode:["1f938-1f3ff"],fname:"1f938-1f3ff",uc:"1f938-1f3ff",isCanonical:!0},":person_doing_cartwheel_tone5:":{unicode:["1f938-1f3ff"],fname:"1f938-1f3ff",uc:"1f938-1f3ff",isCanonical:!1},":cartwheel_tone4:":{unicode:["1f938-1f3fe"],fname:"1f938-1f3fe",uc:"1f938-1f3fe",isCanonical:!0},":person_doing_cartwheel_tone4:":{unicode:["1f938-1f3fe"],fname:"1f938-1f3fe",uc:"1f938-1f3fe",isCanonical:!1},":cartwheel_tone3:":{unicode:["1f938-1f3fd"],fname:"1f938-1f3fd",uc:"1f938-1f3fd",isCanonical:!0},":person_doing_cartwheel_tone3:":{unicode:["1f938-1f3fd"],fname:"1f938-1f3fd",uc:"1f938-1f3fd",isCanonical:!1},":cartwheel_tone2:":{unicode:["1f938-1f3fc"],fname:"1f938-1f3fc",uc:"1f938-1f3fc",isCanonical:!0},":person_doing_cartwheel_tone2:":{unicode:["1f938-1f3fc"],fname:"1f938-1f3fc",uc:"1f938-1f3fc",isCanonical:!1},":cartwheel_tone1:":{unicode:["1f938-1f3fb"],fname:"1f938-1f3fb",uc:"1f938-1f3fb",isCanonical:!0},":person_doing_cartwheel_tone1:":{unicode:["1f938-1f3fb"],fname:"1f938-1f3fb",uc:"1f938-1f3fb",isCanonical:!1},":shrug_tone5:":{unicode:["1f937-1f3ff"],fname:"1f937-1f3ff",uc:"1f937-1f3ff",isCanonical:!0},":shrug_tone4:":{unicode:["1f937-1f3fe"],fname:"1f937-1f3fe",uc:"1f937-1f3fe",isCanonical:!0},":shrug_tone3:":{unicode:["1f937-1f3fd"],fname:"1f937-1f3fd",uc:"1f937-1f3fd",isCanonical:!0},":shrug_tone2:":{unicode:["1f937-1f3fc"],fname:"1f937-1f3fc",uc:"1f937-1f3fc",isCanonical:!0},":shrug_tone1:":{unicode:["1f937-1f3fb"],fname:"1f937-1f3fb",uc:"1f937-1f3fb",isCanonical:!0},":mrs_claus_tone5:":{unicode:["1f936-1f3ff"],fname:"1f936-1f3ff",uc:"1f936-1f3ff",isCanonical:!0},":mother_christmas_tone5:":{unicode:["1f936-1f3ff"],fname:"1f936-1f3ff",uc:"1f936-1f3ff",isCanonical:!1},":mrs_claus_tone4:":{unicode:["1f936-1f3fe"],fname:"1f936-1f3fe",uc:"1f936-1f3fe",isCanonical:!0},":mother_christmas_tone4:":{unicode:["1f936-1f3fe"],fname:"1f936-1f3fe",uc:"1f936-1f3fe",isCanonical:!1},":mrs_claus_tone3:":{unicode:["1f936-1f3fd"],fname:"1f936-1f3fd",uc:"1f936-1f3fd",isCanonical:!0},":mother_christmas_tone3:":{unicode:["1f936-1f3fd"],fname:"1f936-1f3fd",uc:"1f936-1f3fd",isCanonical:!1},":mrs_claus_tone2:":{unicode:["1f936-1f3fc"],fname:"1f936-1f3fc",uc:"1f936-1f3fc",isCanonical:!0},":mother_christmas_tone2:":{unicode:["1f936-1f3fc"],fname:"1f936-1f3fc",uc:"1f936-1f3fc",isCanonical:!1},":mrs_claus_tone1:":{unicode:["1f936-1f3fb"],fname:"1f936-1f3fb",uc:"1f936-1f3fb",isCanonical:!0},":mother_christmas_tone1:":{unicode:["1f936-1f3fb"],fname:"1f936-1f3fb",uc:"1f936-1f3fb",isCanonical:!1},":man_in_tuxedo_tone5:":{unicode:["1f935-1f3ff"],fname:"1f935-1f3ff",uc:"1f935-1f3ff",isCanonical:!0},":tuxedo_tone5:":{unicode:["1f935-1f3ff"],fname:"1f935-1f3ff",uc:"1f935-1f3ff",isCanonical:!1},":man_in_tuxedo_tone4:":{unicode:["1f935-1f3fe"],fname:"1f935-1f3fe",uc:"1f935-1f3fe",isCanonical:!0},":tuxedo_tone4:":{unicode:["1f935-1f3fe"],fname:"1f935-1f3fe",uc:"1f935-1f3fe",isCanonical:!1},":man_in_tuxedo_tone3:":{unicode:["1f935-1f3fd"],fname:"1f935-1f3fd",uc:"1f935-1f3fd",isCanonical:!0},":tuxedo_tone3:":{unicode:["1f935-1f3fd"],fname:"1f935-1f3fd",uc:"1f935-1f3fd",isCanonical:!1},":man_in_tuxedo_tone2:":{unicode:["1f935-1f3fc"],fname:"1f935-1f3fc",uc:"1f935-1f3fc",isCanonical:!0},":tuxedo_tone2:":{unicode:["1f935-1f3fc"],fname:"1f935-1f3fc",uc:"1f935-1f3fc",isCanonical:!1},":man_in_tuxedo_tone1:":{unicode:["1f935-1f3fb"],fname:"1f935-1f3fb",uc:"1f935-1f3fb",isCanonical:!0},":tuxedo_tone1:":{unicode:["1f935-1f3fb"],fname:"1f935-1f3fb",uc:"1f935-1f3fb",isCanonical:!1},":prince_tone5:":{unicode:["1f934-1f3ff"],fname:"1f934-1f3ff",uc:"1f934-1f3ff",isCanonical:!0},":prince_tone4:":{unicode:["1f934-1f3fe"],fname:"1f934-1f3fe",uc:"1f934-1f3fe",isCanonical:!0},":prince_tone3:":{unicode:["1f934-1f3fd"],fname:"1f934-1f3fd",uc:"1f934-1f3fd",isCanonical:!0},":prince_tone2:":{unicode:["1f934-1f3fc"],fname:"1f934-1f3fc",uc:"1f934-1f3fc",isCanonical:!0},":prince_tone1:":{unicode:["1f934-1f3fb"],fname:"1f934-1f3fb",uc:"1f934-1f3fb",isCanonical:!0},":selfie_tone5:":{unicode:["1f933-1f3ff"],fname:"1f933-1f3ff",uc:"1f933-1f3ff",isCanonical:!0},":selfie_tone4:":{unicode:["1f933-1f3fe"],fname:"1f933-1f3fe",uc:"1f933-1f3fe",isCanonical:!0},":selfie_tone3:":{unicode:["1f933-1f3fd"],fname:"1f933-1f3fd",uc:"1f933-1f3fd",isCanonical:!0},":selfie_tone2:":{unicode:["1f933-1f3fc"],fname:"1f933-1f3fc",uc:"1f933-1f3fc",isCanonical:!0},":selfie_tone1:":{unicode:["1f933-1f3fb"],fname:"1f933-1f3fb",uc:"1f933-1f3fb",isCanonical:!0},":pregnant_woman_tone5:":{unicode:["1f930-1f3ff"],fname:"1f930-1f3ff",uc:"1f930-1f3ff",isCanonical:!0},":expecting_woman_tone5:":{unicode:["1f930-1f3ff"],fname:"1f930-1f3ff",uc:"1f930-1f3ff",isCanonical:!1},":pregnant_woman_tone4:":{unicode:["1f930-1f3fe"],fname:"1f930-1f3fe",uc:"1f930-1f3fe",isCanonical:!0},":expecting_woman_tone4:":{unicode:["1f930-1f3fe"],fname:"1f930-1f3fe",uc:"1f930-1f3fe",isCanonical:!1},":pregnant_woman_tone3:":{unicode:["1f930-1f3fd"],fname:"1f930-1f3fd",uc:"1f930-1f3fd",isCanonical:!0},":expecting_woman_tone3:":{unicode:["1f930-1f3fd"],fname:"1f930-1f3fd",uc:"1f930-1f3fd",isCanonical:!1},":pregnant_woman_tone2:":{unicode:["1f930-1f3fc"],fname:"1f930-1f3fc",uc:"1f930-1f3fc",isCanonical:!0},":expecting_woman_tone2:":{unicode:["1f930-1f3fc"],fname:"1f930-1f3fc",uc:"1f930-1f3fc",isCanonical:!1},":pregnant_woman_tone1:":{unicode:["1f930-1f3fb"],fname:"1f930-1f3fb",uc:"1f930-1f3fb",isCanonical:!0},":expecting_woman_tone1:":{unicode:["1f930-1f3fb"],fname:"1f930-1f3fb",uc:"1f930-1f3fb",isCanonical:!1},":face_palm_tone5:":{unicode:["1f926-1f3ff"],fname:"1f926-1f3ff",uc:"1f926-1f3ff",isCanonical:!0},":facepalm_tone5:":{unicode:["1f926-1f3ff"],fname:"1f926-1f3ff",uc:"1f926-1f3ff",isCanonical:!1},":face_palm_tone4:":{unicode:["1f926-1f3fe"],fname:"1f926-1f3fe",uc:"1f926-1f3fe",isCanonical:!0},":facepalm_tone4:":{unicode:["1f926-1f3fe"],fname:"1f926-1f3fe",uc:"1f926-1f3fe",isCanonical:!1},":face_palm_tone3:":{unicode:["1f926-1f3fd"],fname:"1f926-1f3fd",uc:"1f926-1f3fd",isCanonical:!0},":facepalm_tone3:":{unicode:["1f926-1f3fd"],fname:"1f926-1f3fd",uc:"1f926-1f3fd",isCanonical:!1},":face_palm_tone2:":{unicode:["1f926-1f3fc"],fname:"1f926-1f3fc",uc:"1f926-1f3fc",isCanonical:!0},":facepalm_tone2:":{unicode:["1f926-1f3fc"],fname:"1f926-1f3fc",uc:"1f926-1f3fc",isCanonical:!1},":face_palm_tone1:":{unicode:["1f926-1f3fb"],fname:"1f926-1f3fb",uc:"1f926-1f3fb",isCanonical:!0},":facepalm_tone1:":{unicode:["1f926-1f3fb"],fname:"1f926-1f3fb",uc:"1f926-1f3fb",isCanonical:!1},":fingers_crossed_tone5:":{unicode:["1f91e-1f3ff"],fname:"1f91e-1f3ff",uc:"1f91e-1f3ff",isCanonical:!0},":hand_with_index_and_middle_fingers_crossed_tone5:":{unicode:["1f91e-1f3ff"],fname:"1f91e-1f3ff",uc:"1f91e-1f3ff",isCanonical:!1},":fingers_crossed_tone4:":{unicode:["1f91e-1f3fe"],fname:"1f91e-1f3fe",uc:"1f91e-1f3fe",isCanonical:!0},":hand_with_index_and_middle_fingers_crossed_tone4:":{unicode:["1f91e-1f3fe"],fname:"1f91e-1f3fe",uc:"1f91e-1f3fe",isCanonical:!1},":fingers_crossed_tone3:":{unicode:["1f91e-1f3fd"],fname:"1f91e-1f3fd",uc:"1f91e-1f3fd",isCanonical:!0},":hand_with_index_and_middle_fingers_crossed_tone3:":{unicode:["1f91e-1f3fd"],fname:"1f91e-1f3fd",uc:"1f91e-1f3fd",isCanonical:!1},":fingers_crossed_tone2:":{unicode:["1f91e-1f3fc"],fname:"1f91e-1f3fc",uc:"1f91e-1f3fc",isCanonical:!0},":hand_with_index_and_middle_fingers_crossed_tone2:":{unicode:["1f91e-1f3fc"],fname:"1f91e-1f3fc",uc:"1f91e-1f3fc",isCanonical:!1},":fingers_crossed_tone1:":{unicode:["1f91e-1f3fb"],fname:"1f91e-1f3fb",uc:"1f91e-1f3fb",isCanonical:!0},":hand_with_index_and_middle_fingers_crossed_tone1:":{unicode:["1f91e-1f3fb"],fname:"1f91e-1f3fb",uc:"1f91e-1f3fb",isCanonical:!1},":handshake_tone5:":{unicode:["1f91d-1f3ff"],fname:"1f91d-1f3ff",uc:"1f91d-1f3ff",isCanonical:!0},":shaking_hands_tone5:":{unicode:["1f91d-1f3ff"],fname:"1f91d-1f3ff",uc:"1f91d-1f3ff",isCanonical:!1},":handshake_tone4:":{unicode:["1f91d-1f3fe"],fname:"1f91d-1f3fe",uc:"1f91d-1f3fe",isCanonical:!0},":shaking_hands_tone4:":{unicode:["1f91d-1f3fe"],fname:"1f91d-1f3fe",uc:"1f91d-1f3fe",isCanonical:!1},":handshake_tone3:":{unicode:["1f91d-1f3fd"],fname:"1f91d-1f3fd",uc:"1f91d-1f3fd",isCanonical:!0},":shaking_hands_tone3:":{unicode:["1f91d-1f3fd"],fname:"1f91d-1f3fd",uc:"1f91d-1f3fd",isCanonical:!1},":handshake_tone2:":{unicode:["1f91d-1f3fc"],fname:"1f91d-1f3fc",uc:"1f91d-1f3fc",isCanonical:!0},":shaking_hands_tone2:":{unicode:["1f91d-1f3fc"],fname:"1f91d-1f3fc",uc:"1f91d-1f3fc",isCanonical:!1},":handshake_tone1:":{unicode:["1f91d-1f3fb"],fname:"1f91d-1f3fb",uc:"1f91d-1f3fb",isCanonical:!0},":shaking_hands_tone1:":{unicode:["1f91d-1f3fb"],fname:"1f91d-1f3fb",uc:"1f91d-1f3fb",isCanonical:!1},":right_facing_fist_tone5:":{unicode:["1f91c-1f3ff"],fname:"1f91c-1f3ff",uc:"1f91c-1f3ff",isCanonical:!0},":right_fist_tone5:":{unicode:["1f91c-1f3ff"],fname:"1f91c-1f3ff",uc:"1f91c-1f3ff",isCanonical:!1},":right_facing_fist_tone4:":{unicode:["1f91c-1f3fe"],fname:"1f91c-1f3fe",uc:"1f91c-1f3fe",isCanonical:!0},":right_fist_tone4:":{unicode:["1f91c-1f3fe"],fname:"1f91c-1f3fe",uc:"1f91c-1f3fe",isCanonical:!1},":right_facing_fist_tone3:":{unicode:["1f91c-1f3fd"],fname:"1f91c-1f3fd",uc:"1f91c-1f3fd",isCanonical:!0},":right_fist_tone3:":{unicode:["1f91c-1f3fd"],fname:"1f91c-1f3fd",uc:"1f91c-1f3fd",isCanonical:!1},":right_facing_fist_tone2:":{unicode:["1f91c-1f3fc"],fname:"1f91c-1f3fc",uc:"1f91c-1f3fc",isCanonical:!0},":right_fist_tone2:":{unicode:["1f91c-1f3fc"],fname:"1f91c-1f3fc",uc:"1f91c-1f3fc",isCanonical:!1},":right_facing_fist_tone1:":{unicode:["1f91c-1f3fb"],fname:"1f91c-1f3fb",uc:"1f91c-1f3fb",isCanonical:!0},":right_fist_tone1:":{unicode:["1f91c-1f3fb"],fname:"1f91c-1f3fb",uc:"1f91c-1f3fb",isCanonical:!1},":left_facing_fist_tone5:":{unicode:["1f91b-1f3ff"],fname:"1f91b-1f3ff",uc:"1f91b-1f3ff",isCanonical:!0},":left_fist_tone5:":{unicode:["1f91b-1f3ff"],fname:"1f91b-1f3ff",uc:"1f91b-1f3ff",isCanonical:!1},":left_facing_fist_tone4:":{unicode:["1f91b-1f3fe"],fname:"1f91b-1f3fe",uc:"1f91b-1f3fe",isCanonical:!0},":left_fist_tone4:":{unicode:["1f91b-1f3fe"],fname:"1f91b-1f3fe",uc:"1f91b-1f3fe",isCanonical:!1},":left_facing_fist_tone3:":{unicode:["1f91b-1f3fd"],fname:"1f91b-1f3fd",uc:"1f91b-1f3fd",isCanonical:!0},":left_fist_tone3:":{unicode:["1f91b-1f3fd"],fname:"1f91b-1f3fd",uc:"1f91b-1f3fd",isCanonical:!1},":left_facing_fist_tone2:":{unicode:["1f91b-1f3fc"],fname:"1f91b-1f3fc",uc:"1f91b-1f3fc",isCanonical:!0},":left_fist_tone2:":{unicode:["1f91b-1f3fc"],fname:"1f91b-1f3fc",uc:"1f91b-1f3fc",isCanonical:!1},":left_facing_fist_tone1:":{unicode:["1f91b-1f3fb"],fname:"1f91b-1f3fb",uc:"1f91b-1f3fb",isCanonical:!0},":left_fist_tone1:":{unicode:["1f91b-1f3fb"],fname:"1f91b-1f3fb",uc:"1f91b-1f3fb",isCanonical:!1},":raised_back_of_hand_tone5:":{unicode:["1f91a-1f3ff"],fname:"1f91a-1f3ff",uc:"1f91a-1f3ff",isCanonical:!0},":back_of_hand_tone5:":{unicode:["1f91a-1f3ff"],fname:"1f91a-1f3ff",uc:"1f91a-1f3ff",isCanonical:!1},":raised_back_of_hand_tone4:":{unicode:["1f91a-1f3fe"],fname:"1f91a-1f3fe",uc:"1f91a-1f3fe",isCanonical:!0},":back_of_hand_tone4:":{unicode:["1f91a-1f3fe"],fname:"1f91a-1f3fe",uc:"1f91a-1f3fe",isCanonical:!1},":raised_back_of_hand_tone3:":{unicode:["1f91a-1f3fd"],fname:"1f91a-1f3fd",uc:"1f91a-1f3fd",isCanonical:!0},":back_of_hand_tone3:":{unicode:["1f91a-1f3fd"],fname:"1f91a-1f3fd",uc:"1f91a-1f3fd",isCanonical:!1},":raised_back_of_hand_tone2:":{unicode:["1f91a-1f3fc"],fname:"1f91a-1f3fc",uc:"1f91a-1f3fc",isCanonical:!0},":back_of_hand_tone2:":{unicode:["1f91a-1f3fc"],fname:"1f91a-1f3fc",uc:"1f91a-1f3fc",isCanonical:!1},":raised_back_of_hand_tone1:":{unicode:["1f91a-1f3fb"],fname:"1f91a-1f3fb",uc:"1f91a-1f3fb",isCanonical:!0},":back_of_hand_tone1:":{unicode:["1f91a-1f3fb"],fname:"1f91a-1f3fb",uc:"1f91a-1f3fb",isCanonical:!1},":call_me_tone5:":{unicode:["1f919-1f3ff"],fname:"1f919-1f3ff",uc:"1f919-1f3ff",isCanonical:!0},":call_me_hand_tone5:":{unicode:["1f919-1f3ff"],fname:"1f919-1f3ff",uc:"1f919-1f3ff",isCanonical:!1},":call_me_tone4:":{unicode:["1f919-1f3fe"],fname:"1f919-1f3fe",uc:"1f919-1f3fe",isCanonical:!0},":call_me_hand_tone4:":{unicode:["1f919-1f3fe"],fname:"1f919-1f3fe",uc:"1f919-1f3fe",isCanonical:!1},":call_me_tone3:":{unicode:["1f919-1f3fd"],fname:"1f919-1f3fd",uc:"1f919-1f3fd",isCanonical:!0},":call_me_hand_tone3:":{unicode:["1f919-1f3fd"],fname:"1f919-1f3fd",uc:"1f919-1f3fd",isCanonical:!1},":call_me_tone2:":{unicode:["1f919-1f3fc"],fname:"1f919-1f3fc",uc:"1f919-1f3fc",isCanonical:!0},":call_me_hand_tone2:":{unicode:["1f919-1f3fc"],fname:"1f919-1f3fc",uc:"1f919-1f3fc",isCanonical:!1},":call_me_tone1:":{unicode:["1f919-1f3fb"],fname:"1f919-1f3fb",uc:"1f919-1f3fb",isCanonical:!0},":call_me_hand_tone1:":{unicode:["1f919-1f3fb"],fname:"1f919-1f3fb",uc:"1f919-1f3fb",isCanonical:!1},":metal_tone5:":{unicode:["1f918-1f3ff"],fname:"1f918-1f3ff",uc:"1f918-1f3ff",isCanonical:!0},":sign_of_the_horns_tone5:":{unicode:["1f918-1f3ff"],fname:"1f918-1f3ff",uc:"1f918-1f3ff",isCanonical:!1},":metal_tone4:":{unicode:["1f918-1f3fe"],fname:"1f918-1f3fe",uc:"1f918-1f3fe",isCanonical:!0},":sign_of_the_horns_tone4:":{unicode:["1f918-1f3fe"],fname:"1f918-1f3fe",uc:"1f918-1f3fe",isCanonical:!1},":metal_tone3:":{unicode:["1f918-1f3fd"],fname:"1f918-1f3fd",uc:"1f918-1f3fd",isCanonical:!0},":sign_of_the_horns_tone3:":{unicode:["1f918-1f3fd"],fname:"1f918-1f3fd",uc:"1f918-1f3fd",isCanonical:!1},":metal_tone2:":{unicode:["1f918-1f3fc"],fname:"1f918-1f3fc",uc:"1f918-1f3fc",isCanonical:!0},":sign_of_the_horns_tone2:":{unicode:["1f918-1f3fc"],fname:"1f918-1f3fc",uc:"1f918-1f3fc",isCanonical:!1},":metal_tone1:":{unicode:["1f918-1f3fb"],fname:"1f918-1f3fb",uc:"1f918-1f3fb",isCanonical:!0},":sign_of_the_horns_tone1:":{unicode:["1f918-1f3fb"],fname:"1f918-1f3fb",uc:"1f918-1f3fb",isCanonical:!1},":bath_tone5:":{unicode:["1f6c0-1f3ff"],fname:"1f6c0-1f3ff",uc:"1f6c0-1f3ff",isCanonical:!0},":bath_tone4:":{unicode:["1f6c0-1f3fe"],fname:"1f6c0-1f3fe",uc:"1f6c0-1f3fe",isCanonical:!0},":bath_tone3:":{unicode:["1f6c0-1f3fd"],fname:"1f6c0-1f3fd",uc:"1f6c0-1f3fd",isCanonical:!0},":bath_tone2:":{unicode:["1f6c0-1f3fc"],fname:"1f6c0-1f3fc",uc:"1f6c0-1f3fc",isCanonical:!0},":bath_tone1:":{unicode:["1f6c0-1f3fb"],fname:"1f6c0-1f3fb",uc:"1f6c0-1f3fb",isCanonical:!0},":walking_tone5:":{unicode:["1f6b6-1f3ff"],fname:"1f6b6-1f3ff",uc:"1f6b6-1f3ff",isCanonical:!0},":walking_tone4:":{unicode:["1f6b6-1f3fe"],fname:"1f6b6-1f3fe",uc:"1f6b6-1f3fe",isCanonical:!0},":walking_tone3:":{unicode:["1f6b6-1f3fd"],fname:"1f6b6-1f3fd",uc:"1f6b6-1f3fd",isCanonical:!0},":walking_tone2:":{unicode:["1f6b6-1f3fc"],fname:"1f6b6-1f3fc",uc:"1f6b6-1f3fc",isCanonical:!0},":walking_tone1:":{unicode:["1f6b6-1f3fb"],fname:"1f6b6-1f3fb",uc:"1f6b6-1f3fb",isCanonical:!0},":mountain_bicyclist_tone5:":{unicode:["1f6b5-1f3ff"],fname:"1f6b5-1f3ff",uc:"1f6b5-1f3ff",isCanonical:!0},":mountain_bicyclist_tone4:":{unicode:["1f6b5-1f3fe"],fname:"1f6b5-1f3fe",uc:"1f6b5-1f3fe",isCanonical:!0},":mountain_bicyclist_tone3:":{unicode:["1f6b5-1f3fd"],fname:"1f6b5-1f3fd",uc:"1f6b5-1f3fd",isCanonical:!0},":mountain_bicyclist_tone2:":{unicode:["1f6b5-1f3fc"],fname:"1f6b5-1f3fc",uc:"1f6b5-1f3fc",isCanonical:!0},":mountain_bicyclist_tone1:":{unicode:["1f6b5-1f3fb"],fname:"1f6b5-1f3fb",uc:"1f6b5-1f3fb",isCanonical:!0},":bicyclist_tone5:":{unicode:["1f6b4-1f3ff"],fname:"1f6b4-1f3ff",uc:"1f6b4-1f3ff",isCanonical:!0},":bicyclist_tone4:":{unicode:["1f6b4-1f3fe"],fname:"1f6b4-1f3fe",uc:"1f6b4-1f3fe",isCanonical:!0},":bicyclist_tone3:":{unicode:["1f6b4-1f3fd"],fname:"1f6b4-1f3fd",uc:"1f6b4-1f3fd",isCanonical:!0},":bicyclist_tone2:":{unicode:["1f6b4-1f3fc"],fname:"1f6b4-1f3fc",uc:"1f6b4-1f3fc",isCanonical:!0},":bicyclist_tone1:":{unicode:["1f6b4-1f3fb"],fname:"1f6b4-1f3fb",uc:"1f6b4-1f3fb",isCanonical:!0},":rowboat_tone5:":{unicode:["1f6a3-1f3ff"],fname:"1f6a3-1f3ff",uc:"1f6a3-1f3ff",isCanonical:!0},":rowboat_tone4:":{unicode:["1f6a3-1f3fe"],fname:"1f6a3-1f3fe",uc:"1f6a3-1f3fe",isCanonical:!0},":rowboat_tone3:":{unicode:["1f6a3-1f3fd"],fname:"1f6a3-1f3fd",uc:"1f6a3-1f3fd",isCanonical:!0},":rowboat_tone2:":{unicode:["1f6a3-1f3fc"],fname:"1f6a3-1f3fc",uc:"1f6a3-1f3fc",isCanonical:!0},":rowboat_tone1:":{unicode:["1f6a3-1f3fb"],fname:"1f6a3-1f3fb",uc:"1f6a3-1f3fb",isCanonical:!0},":pray_tone5:":{unicode:["1f64f-1f3ff"],fname:"1f64f-1f3ff",uc:"1f64f-1f3ff",isCanonical:!0},":pray_tone4:":{unicode:["1f64f-1f3fe"],fname:"1f64f-1f3fe",uc:"1f64f-1f3fe",isCanonical:!0},":pray_tone3:":{unicode:["1f64f-1f3fd"],fname:"1f64f-1f3fd",uc:"1f64f-1f3fd",isCanonical:!0},":pray_tone2:":{unicode:["1f64f-1f3fc"],fname:"1f64f-1f3fc",uc:"1f64f-1f3fc",isCanonical:!0},":pray_tone1:":{unicode:["1f64f-1f3fb"],fname:"1f64f-1f3fb",uc:"1f64f-1f3fb",isCanonical:!0},":person_with_pouting_face_tone5:":{unicode:["1f64e-1f3ff"],fname:"1f64e-1f3ff",uc:"1f64e-1f3ff",isCanonical:!0},":person_with_pouting_face_tone4:":{unicode:["1f64e-1f3fe"],fname:"1f64e-1f3fe",uc:"1f64e-1f3fe",isCanonical:!0},":person_with_pouting_face_tone3:":{unicode:["1f64e-1f3fd"],fname:"1f64e-1f3fd",uc:"1f64e-1f3fd",isCanonical:!0},":person_with_pouting_face_tone2:":{unicode:["1f64e-1f3fc"],fname:"1f64e-1f3fc",uc:"1f64e-1f3fc",isCanonical:!0},":person_with_pouting_face_tone1:":{unicode:["1f64e-1f3fb"],fname:"1f64e-1f3fb",uc:"1f64e-1f3fb",isCanonical:!0},":person_frowning_tone5:":{unicode:["1f64d-1f3ff"],fname:"1f64d-1f3ff",uc:"1f64d-1f3ff",isCanonical:!0},":person_frowning_tone4:":{unicode:["1f64d-1f3fe"],fname:"1f64d-1f3fe",uc:"1f64d-1f3fe",isCanonical:!0},":person_frowning_tone3:":{unicode:["1f64d-1f3fd"],fname:"1f64d-1f3fd",uc:"1f64d-1f3fd",isCanonical:!0},":person_frowning_tone2:":{unicode:["1f64d-1f3fc"],fname:"1f64d-1f3fc",uc:"1f64d-1f3fc",isCanonical:!0},":person_frowning_tone1:":{unicode:["1f64d-1f3fb"],fname:"1f64d-1f3fb",uc:"1f64d-1f3fb",isCanonical:!0},":raised_hands_tone5:":{unicode:["1f64c-1f3ff"],fname:"1f64c-1f3ff",uc:"1f64c-1f3ff",isCanonical:!0},":raised_hands_tone4:":{unicode:["1f64c-1f3fe"],fname:"1f64c-1f3fe",uc:"1f64c-1f3fe",isCanonical:!0},":raised_hands_tone3:":{unicode:["1f64c-1f3fd"],fname:"1f64c-1f3fd",uc:"1f64c-1f3fd",isCanonical:!0},":raised_hands_tone2:":{unicode:["1f64c-1f3fc"],fname:"1f64c-1f3fc",uc:"1f64c-1f3fc",isCanonical:!0},":raised_hands_tone1:":{unicode:["1f64c-1f3fb"],fname:"1f64c-1f3fb",uc:"1f64c-1f3fb",isCanonical:!0},":raising_hand_tone5:":{unicode:["1f64b-1f3ff"],fname:"1f64b-1f3ff",uc:"1f64b-1f3ff",isCanonical:!0},":raising_hand_tone4:":{unicode:["1f64b-1f3fe"],fname:"1f64b-1f3fe",uc:"1f64b-1f3fe",isCanonical:!0},":raising_hand_tone3:":{unicode:["1f64b-1f3fd"],fname:"1f64b-1f3fd",uc:"1f64b-1f3fd",isCanonical:!0},":raising_hand_tone2:":{unicode:["1f64b-1f3fc"],fname:"1f64b-1f3fc",uc:"1f64b-1f3fc",isCanonical:!0},":raising_hand_tone1:":{unicode:["1f64b-1f3fb"],fname:"1f64b-1f3fb",uc:"1f64b-1f3fb",isCanonical:!0},":bow_tone5:":{unicode:["1f647-1f3ff"],fname:"1f647-1f3ff",uc:"1f647-1f3ff",isCanonical:!0},":bow_tone4:":{unicode:["1f647-1f3fe"],fname:"1f647-1f3fe",uc:"1f647-1f3fe",isCanonical:!0},":bow_tone3:":{unicode:["1f647-1f3fd"],fname:"1f647-1f3fd",uc:"1f647-1f3fd",isCanonical:!0},":bow_tone2:":{unicode:["1f647-1f3fc"],fname:"1f647-1f3fc",uc:"1f647-1f3fc",isCanonical:!0},":bow_tone1:":{unicode:["1f647-1f3fb"],fname:"1f647-1f3fb",uc:"1f647-1f3fb",isCanonical:!0},":ok_woman_tone5:":{unicode:["1f646-1f3ff"],fname:"1f646-1f3ff",uc:"1f646-1f3ff",isCanonical:!0},":ok_woman_tone4:":{unicode:["1f646-1f3fe"],fname:"1f646-1f3fe",uc:"1f646-1f3fe",isCanonical:!0},":ok_woman_tone3:":{unicode:["1f646-1f3fd"],fname:"1f646-1f3fd",uc:"1f646-1f3fd",isCanonical:!0},":ok_woman_tone2:":{unicode:["1f646-1f3fc"],fname:"1f646-1f3fc",uc:"1f646-1f3fc",isCanonical:!0},":ok_woman_tone1:":{unicode:["1f646-1f3fb"],fname:"1f646-1f3fb",uc:"1f646-1f3fb",isCanonical:!0},":no_good_tone5:":{unicode:["1f645-1f3ff"],fname:"1f645-1f3ff",uc:"1f645-1f3ff",isCanonical:!0},":no_good_tone4:":{unicode:["1f645-1f3fe"],fname:"1f645-1f3fe",uc:"1f645-1f3fe",isCanonical:!0},":no_good_tone3:":{unicode:["1f645-1f3fd"],fname:"1f645-1f3fd",uc:"1f645-1f3fd",isCanonical:!0},":no_good_tone2:":{unicode:["1f645-1f3fc"],fname:"1f645-1f3fc",uc:"1f645-1f3fc",isCanonical:!0},":no_good_tone1:":{unicode:["1f645-1f3fb"],fname:"1f645-1f3fb",uc:"1f645-1f3fb",isCanonical:!0},":vulcan_tone5:":{unicode:["1f596-1f3ff"],fname:"1f596-1f3ff",uc:"1f596-1f3ff",isCanonical:!0},":raised_hand_with_part_between_middle_and_ring_fingers_tone5:":{unicode:["1f596-1f3ff"],fname:"1f596-1f3ff",uc:"1f596-1f3ff",isCanonical:!1},":vulcan_tone4:":{unicode:["1f596-1f3fe"],fname:"1f596-1f3fe",uc:"1f596-1f3fe",isCanonical:!0},":raised_hand_with_part_between_middle_and_ring_fingers_tone4:":{unicode:["1f596-1f3fe"],fname:"1f596-1f3fe",uc:"1f596-1f3fe",isCanonical:!1},":vulcan_tone3:":{unicode:["1f596-1f3fd"],fname:"1f596-1f3fd",uc:"1f596-1f3fd",isCanonical:!0},":raised_hand_with_part_between_middle_and_ring_fingers_tone3:":{unicode:["1f596-1f3fd"],fname:"1f596-1f3fd",uc:"1f596-1f3fd",isCanonical:!1},":vulcan_tone2:":{unicode:["1f596-1f3fc"],fname:"1f596-1f3fc",uc:"1f596-1f3fc",isCanonical:!0},":raised_hand_with_part_between_middle_and_ring_fingers_tone2:":{unicode:["1f596-1f3fc"],fname:"1f596-1f3fc",uc:"1f596-1f3fc",isCanonical:!1},":vulcan_tone1:":{unicode:["1f596-1f3fb"],fname:"1f596-1f3fb",uc:"1f596-1f3fb",isCanonical:!0},":raised_hand_with_part_between_middle_and_ring_fingers_tone1:":{unicode:["1f596-1f3fb"],fname:"1f596-1f3fb",uc:"1f596-1f3fb",isCanonical:!1},":middle_finger_tone5:":{unicode:["1f595-1f3ff"],fname:"1f595-1f3ff",uc:"1f595-1f3ff",isCanonical:!0},":reversed_hand_with_middle_finger_extended_tone5:":{unicode:["1f595-1f3ff"],fname:"1f595-1f3ff",uc:"1f595-1f3ff",isCanonical:!1},":middle_finger_tone4:":{unicode:["1f595-1f3fe"],fname:"1f595-1f3fe",uc:"1f595-1f3fe",isCanonical:!0},":reversed_hand_with_middle_finger_extended_tone4:":{unicode:["1f595-1f3fe"],fname:"1f595-1f3fe",uc:"1f595-1f3fe",isCanonical:!1},":middle_finger_tone3:":{unicode:["1f595-1f3fd"],fname:"1f595-1f3fd",uc:"1f595-1f3fd",isCanonical:!0},":reversed_hand_with_middle_finger_extended_tone3:":{unicode:["1f595-1f3fd"],fname:"1f595-1f3fd",uc:"1f595-1f3fd",isCanonical:!1},":middle_finger_tone2:":{unicode:["1f595-1f3fc"],fname:"1f595-1f3fc",uc:"1f595-1f3fc",isCanonical:!0},":reversed_hand_with_middle_finger_extended_tone2:":{unicode:["1f595-1f3fc"],fname:"1f595-1f3fc",uc:"1f595-1f3fc",isCanonical:!1},":middle_finger_tone1:":{unicode:["1f595-1f3fb"],fname:"1f595-1f3fb",uc:"1f595-1f3fb",isCanonical:!0},":reversed_hand_with_middle_finger_extended_tone1:":{unicode:["1f595-1f3fb"],fname:"1f595-1f3fb",uc:"1f595-1f3fb",isCanonical:!1},":hand_splayed_tone5:":{unicode:["1f590-1f3ff"],fname:"1f590-1f3ff",uc:"1f590-1f3ff",isCanonical:!0},":raised_hand_with_fingers_splayed_tone5:":{unicode:["1f590-1f3ff"],fname:"1f590-1f3ff",uc:"1f590-1f3ff",isCanonical:!1},":hand_splayed_tone4:":{unicode:["1f590-1f3fe"],fname:"1f590-1f3fe",uc:"1f590-1f3fe",isCanonical:!0},":raised_hand_with_fingers_splayed_tone4:":{unicode:["1f590-1f3fe"],fname:"1f590-1f3fe",uc:"1f590-1f3fe",isCanonical:!1},":hand_splayed_tone3:":{unicode:["1f590-1f3fd"],fname:"1f590-1f3fd",uc:"1f590-1f3fd",isCanonical:!0},":raised_hand_with_fingers_splayed_tone3:":{unicode:["1f590-1f3fd"],fname:"1f590-1f3fd",uc:"1f590-1f3fd",isCanonical:!1},":hand_splayed_tone2:":{unicode:["1f590-1f3fc"],fname:"1f590-1f3fc",uc:"1f590-1f3fc",isCanonical:!0},":raised_hand_with_fingers_splayed_tone2:":{unicode:["1f590-1f3fc"],fname:"1f590-1f3fc",uc:"1f590-1f3fc",isCanonical:!1},":hand_splayed_tone1:":{unicode:["1f590-1f3fb"],fname:"1f590-1f3fb",uc:"1f590-1f3fb",isCanonical:!0},":raised_hand_with_fingers_splayed_tone1:":{
unicode:["1f590-1f3fb"],fname:"1f590-1f3fb",uc:"1f590-1f3fb",isCanonical:!1},":man_dancing_tone5:":{unicode:["1f57a-1f3ff"],fname:"1f57a-1f3ff",uc:"1f57a-1f3ff",isCanonical:!0},":male_dancer_tone5:":{unicode:["1f57a-1f3ff"],fname:"1f57a-1f3ff",uc:"1f57a-1f3ff",isCanonical:!1},":man_dancing_tone4:":{unicode:["1f57a-1f3fe"],fname:"1f57a-1f3fe",uc:"1f57a-1f3fe",isCanonical:!0},":male_dancer_tone4:":{unicode:["1f57a-1f3fe"],fname:"1f57a-1f3fe",uc:"1f57a-1f3fe",isCanonical:!1},":man_dancing_tone3:":{unicode:["1f57a-1f3fd"],fname:"1f57a-1f3fd",uc:"1f57a-1f3fd",isCanonical:!0},":male_dancer_tone3:":{unicode:["1f57a-1f3fd"],fname:"1f57a-1f3fd",uc:"1f57a-1f3fd",isCanonical:!1},":man_dancing_tone2:":{unicode:["1f57a-1f3fc"],fname:"1f57a-1f3fc",uc:"1f57a-1f3fc",isCanonical:!0},":male_dancer_tone2:":{unicode:["1f57a-1f3fc"],fname:"1f57a-1f3fc",uc:"1f57a-1f3fc",isCanonical:!1},":man_dancing_tone1:":{unicode:["1f57a-1f3fb"],fname:"1f57a-1f3fb",uc:"1f57a-1f3fb",isCanonical:!0},":male_dancer_tone1:":{unicode:["1f57a-1f3fb"],fname:"1f57a-1f3fb",uc:"1f57a-1f3fb",isCanonical:!1},":spy_tone5:":{unicode:["1f575-1f3ff"],fname:"1f575-1f3ff",uc:"1f575-1f3ff",isCanonical:!0},":sleuth_or_spy_tone5:":{unicode:["1f575-1f3ff"],fname:"1f575-1f3ff",uc:"1f575-1f3ff",isCanonical:!1},":spy_tone4:":{unicode:["1f575-1f3fe"],fname:"1f575-1f3fe",uc:"1f575-1f3fe",isCanonical:!0},":sleuth_or_spy_tone4:":{unicode:["1f575-1f3fe"],fname:"1f575-1f3fe",uc:"1f575-1f3fe",isCanonical:!1},":spy_tone3:":{unicode:["1f575-1f3fd"],fname:"1f575-1f3fd",uc:"1f575-1f3fd",isCanonical:!0},":sleuth_or_spy_tone3:":{unicode:["1f575-1f3fd"],fname:"1f575-1f3fd",uc:"1f575-1f3fd",isCanonical:!1},":spy_tone2:":{unicode:["1f575-1f3fc"],fname:"1f575-1f3fc",uc:"1f575-1f3fc",isCanonical:!0},":sleuth_or_spy_tone2:":{unicode:["1f575-1f3fc"],fname:"1f575-1f3fc",uc:"1f575-1f3fc",isCanonical:!1},":spy_tone1:":{unicode:["1f575-1f3fb"],fname:"1f575-1f3fb",uc:"1f575-1f3fb",isCanonical:!0},":sleuth_or_spy_tone1:":{unicode:["1f575-1f3fb"],fname:"1f575-1f3fb",uc:"1f575-1f3fb",isCanonical:!1},":muscle_tone5:":{unicode:["1f4aa-1f3ff"],fname:"1f4aa-1f3ff",uc:"1f4aa-1f3ff",isCanonical:!0},":muscle_tone4:":{unicode:["1f4aa-1f3fe"],fname:"1f4aa-1f3fe",uc:"1f4aa-1f3fe",isCanonical:!0},":muscle_tone3:":{unicode:["1f4aa-1f3fd"],fname:"1f4aa-1f3fd",uc:"1f4aa-1f3fd",isCanonical:!0},":muscle_tone2:":{unicode:["1f4aa-1f3fc"],fname:"1f4aa-1f3fc",uc:"1f4aa-1f3fc",isCanonical:!0},":muscle_tone1:":{unicode:["1f4aa-1f3fb"],fname:"1f4aa-1f3fb",uc:"1f4aa-1f3fb",isCanonical:!0},":haircut_tone5:":{unicode:["1f487-1f3ff"],fname:"1f487-1f3ff",uc:"1f487-1f3ff",isCanonical:!0},":haircut_tone4:":{unicode:["1f487-1f3fe"],fname:"1f487-1f3fe",uc:"1f487-1f3fe",isCanonical:!0},":haircut_tone3:":{unicode:["1f487-1f3fd"],fname:"1f487-1f3fd",uc:"1f487-1f3fd",isCanonical:!0},":haircut_tone2:":{unicode:["1f487-1f3fc"],fname:"1f487-1f3fc",uc:"1f487-1f3fc",isCanonical:!0},":haircut_tone1:":{unicode:["1f487-1f3fb"],fname:"1f487-1f3fb",uc:"1f487-1f3fb",isCanonical:!0},":massage_tone5:":{unicode:["1f486-1f3ff"],fname:"1f486-1f3ff",uc:"1f486-1f3ff",isCanonical:!0},":massage_tone4:":{unicode:["1f486-1f3fe"],fname:"1f486-1f3fe",uc:"1f486-1f3fe",isCanonical:!0},":massage_tone3:":{unicode:["1f486-1f3fd"],fname:"1f486-1f3fd",uc:"1f486-1f3fd",isCanonical:!0},":massage_tone2:":{unicode:["1f486-1f3fc"],fname:"1f486-1f3fc",uc:"1f486-1f3fc",isCanonical:!0},":massage_tone1:":{unicode:["1f486-1f3fb"],fname:"1f486-1f3fb",uc:"1f486-1f3fb",isCanonical:!0},":nail_care_tone5:":{unicode:["1f485-1f3ff"],fname:"1f485-1f3ff",uc:"1f485-1f3ff",isCanonical:!0},":nail_care_tone4:":{unicode:["1f485-1f3fe"],fname:"1f485-1f3fe",uc:"1f485-1f3fe",isCanonical:!0},":nail_care_tone3:":{unicode:["1f485-1f3fd"],fname:"1f485-1f3fd",uc:"1f485-1f3fd",isCanonical:!0},":nail_care_tone2:":{unicode:["1f485-1f3fc"],fname:"1f485-1f3fc",uc:"1f485-1f3fc",isCanonical:!0},":nail_care_tone1:":{unicode:["1f485-1f3fb"],fname:"1f485-1f3fb",uc:"1f485-1f3fb",isCanonical:!0},":dancer_tone5:":{unicode:["1f483-1f3ff"],fname:"1f483-1f3ff",uc:"1f483-1f3ff",isCanonical:!0},":dancer_tone4:":{unicode:["1f483-1f3fe"],fname:"1f483-1f3fe",uc:"1f483-1f3fe",isCanonical:!0},":dancer_tone3:":{unicode:["1f483-1f3fd"],fname:"1f483-1f3fd",uc:"1f483-1f3fd",isCanonical:!0},":dancer_tone2:":{unicode:["1f483-1f3fc"],fname:"1f483-1f3fc",uc:"1f483-1f3fc",isCanonical:!0},":dancer_tone1:":{unicode:["1f483-1f3fb"],fname:"1f483-1f3fb",uc:"1f483-1f3fb",isCanonical:!0},":guardsman_tone5:":{unicode:["1f482-1f3ff"],fname:"1f482-1f3ff",uc:"1f482-1f3ff",isCanonical:!0},":guardsman_tone4:":{unicode:["1f482-1f3fe"],fname:"1f482-1f3fe",uc:"1f482-1f3fe",isCanonical:!0},":guardsman_tone3:":{unicode:["1f482-1f3fd"],fname:"1f482-1f3fd",uc:"1f482-1f3fd",isCanonical:!0},":guardsman_tone2:":{unicode:["1f482-1f3fc"],fname:"1f482-1f3fc",uc:"1f482-1f3fc",isCanonical:!0},":guardsman_tone1:":{unicode:["1f482-1f3fb"],fname:"1f482-1f3fb",uc:"1f482-1f3fb",isCanonical:!0},":information_desk_person_tone5:":{unicode:["1f481-1f3ff"],fname:"1f481-1f3ff",uc:"1f481-1f3ff",isCanonical:!0},":information_desk_person_tone4:":{unicode:["1f481-1f3fe"],fname:"1f481-1f3fe",uc:"1f481-1f3fe",isCanonical:!0},":information_desk_person_tone3:":{unicode:["1f481-1f3fd"],fname:"1f481-1f3fd",uc:"1f481-1f3fd",isCanonical:!0},":information_desk_person_tone2:":{unicode:["1f481-1f3fc"],fname:"1f481-1f3fc",uc:"1f481-1f3fc",isCanonical:!0},":information_desk_person_tone1:":{unicode:["1f481-1f3fb"],fname:"1f481-1f3fb",uc:"1f481-1f3fb",isCanonical:!0},":angel_tone5:":{unicode:["1f47c-1f3ff"],fname:"1f47c-1f3ff",uc:"1f47c-1f3ff",isCanonical:!0},":angel_tone4:":{unicode:["1f47c-1f3fe"],fname:"1f47c-1f3fe",uc:"1f47c-1f3fe",isCanonical:!0},":angel_tone3:":{unicode:["1f47c-1f3fd"],fname:"1f47c-1f3fd",uc:"1f47c-1f3fd",isCanonical:!0},":angel_tone2:":{unicode:["1f47c-1f3fc"],fname:"1f47c-1f3fc",uc:"1f47c-1f3fc",isCanonical:!0},":angel_tone1:":{unicode:["1f47c-1f3fb"],fname:"1f47c-1f3fb",uc:"1f47c-1f3fb",isCanonical:!0},":princess_tone5:":{unicode:["1f478-1f3ff"],fname:"1f478-1f3ff",uc:"1f478-1f3ff",isCanonical:!0},":princess_tone4:":{unicode:["1f478-1f3fe"],fname:"1f478-1f3fe",uc:"1f478-1f3fe",isCanonical:!0},":princess_tone3:":{unicode:["1f478-1f3fd"],fname:"1f478-1f3fd",uc:"1f478-1f3fd",isCanonical:!0},":princess_tone2:":{unicode:["1f478-1f3fc"],fname:"1f478-1f3fc",uc:"1f478-1f3fc",isCanonical:!0},":princess_tone1:":{unicode:["1f478-1f3fb"],fname:"1f478-1f3fb",uc:"1f478-1f3fb",isCanonical:!0},":construction_worker_tone5:":{unicode:["1f477-1f3ff"],fname:"1f477-1f3ff",uc:"1f477-1f3ff",isCanonical:!0},":construction_worker_tone4:":{unicode:["1f477-1f3fe"],fname:"1f477-1f3fe",uc:"1f477-1f3fe",isCanonical:!0},":construction_worker_tone3:":{unicode:["1f477-1f3fd"],fname:"1f477-1f3fd",uc:"1f477-1f3fd",isCanonical:!0},":construction_worker_tone2:":{unicode:["1f477-1f3fc"],fname:"1f477-1f3fc",uc:"1f477-1f3fc",isCanonical:!0},":construction_worker_tone1:":{unicode:["1f477-1f3fb"],fname:"1f477-1f3fb",uc:"1f477-1f3fb",isCanonical:!0},":baby_tone5:":{unicode:["1f476-1f3ff"],fname:"1f476-1f3ff",uc:"1f476-1f3ff",isCanonical:!0},":baby_tone4:":{unicode:["1f476-1f3fe"],fname:"1f476-1f3fe",uc:"1f476-1f3fe",isCanonical:!0},":baby_tone3:":{unicode:["1f476-1f3fd"],fname:"1f476-1f3fd",uc:"1f476-1f3fd",isCanonical:!0},":baby_tone2:":{unicode:["1f476-1f3fc"],fname:"1f476-1f3fc",uc:"1f476-1f3fc",isCanonical:!0},":baby_tone1:":{unicode:["1f476-1f3fb"],fname:"1f476-1f3fb",uc:"1f476-1f3fb",isCanonical:!0},":older_woman_tone5:":{unicode:["1f475-1f3ff"],fname:"1f475-1f3ff",uc:"1f475-1f3ff",isCanonical:!0},":grandma_tone5:":{unicode:["1f475-1f3ff"],fname:"1f475-1f3ff",uc:"1f475-1f3ff",isCanonical:!1},":older_woman_tone4:":{unicode:["1f475-1f3fe"],fname:"1f475-1f3fe",uc:"1f475-1f3fe",isCanonical:!0},":grandma_tone4:":{unicode:["1f475-1f3fe"],fname:"1f475-1f3fe",uc:"1f475-1f3fe",isCanonical:!1},":older_woman_tone3:":{unicode:["1f475-1f3fd"],fname:"1f475-1f3fd",uc:"1f475-1f3fd",isCanonical:!0},":grandma_tone3:":{unicode:["1f475-1f3fd"],fname:"1f475-1f3fd",uc:"1f475-1f3fd",isCanonical:!1},":older_woman_tone2:":{unicode:["1f475-1f3fc"],fname:"1f475-1f3fc",uc:"1f475-1f3fc",isCanonical:!0},":grandma_tone2:":{unicode:["1f475-1f3fc"],fname:"1f475-1f3fc",uc:"1f475-1f3fc",isCanonical:!1},":older_woman_tone1:":{unicode:["1f475-1f3fb"],fname:"1f475-1f3fb",uc:"1f475-1f3fb",isCanonical:!0},":grandma_tone1:":{unicode:["1f475-1f3fb"],fname:"1f475-1f3fb",uc:"1f475-1f3fb",isCanonical:!1},":older_man_tone5:":{unicode:["1f474-1f3ff"],fname:"1f474-1f3ff",uc:"1f474-1f3ff",isCanonical:!0},":older_man_tone4:":{unicode:["1f474-1f3fe"],fname:"1f474-1f3fe",uc:"1f474-1f3fe",isCanonical:!0},":older_man_tone3:":{unicode:["1f474-1f3fd"],fname:"1f474-1f3fd",uc:"1f474-1f3fd",isCanonical:!0},":older_man_tone2:":{unicode:["1f474-1f3fc"],fname:"1f474-1f3fc",uc:"1f474-1f3fc",isCanonical:!0},":older_man_tone1:":{unicode:["1f474-1f3fb"],fname:"1f474-1f3fb",uc:"1f474-1f3fb",isCanonical:!0},":man_with_turban_tone5:":{unicode:["1f473-1f3ff"],fname:"1f473-1f3ff",uc:"1f473-1f3ff",isCanonical:!0},":man_with_turban_tone4:":{unicode:["1f473-1f3fe"],fname:"1f473-1f3fe",uc:"1f473-1f3fe",isCanonical:!0},":man_with_turban_tone3:":{unicode:["1f473-1f3fd"],fname:"1f473-1f3fd",uc:"1f473-1f3fd",isCanonical:!0},":man_with_turban_tone2:":{unicode:["1f473-1f3fc"],fname:"1f473-1f3fc",uc:"1f473-1f3fc",isCanonical:!0},":man_with_turban_tone1:":{unicode:["1f473-1f3fb"],fname:"1f473-1f3fb",uc:"1f473-1f3fb",isCanonical:!0},":man_with_gua_pi_mao_tone5:":{unicode:["1f472-1f3ff"],fname:"1f472-1f3ff",uc:"1f472-1f3ff",isCanonical:!0},":man_with_gua_pi_mao_tone4:":{unicode:["1f472-1f3fe"],fname:"1f472-1f3fe",uc:"1f472-1f3fe",isCanonical:!0},":man_with_gua_pi_mao_tone3:":{unicode:["1f472-1f3fd"],fname:"1f472-1f3fd",uc:"1f472-1f3fd",isCanonical:!0},":man_with_gua_pi_mao_tone2:":{unicode:["1f472-1f3fc"],fname:"1f472-1f3fc",uc:"1f472-1f3fc",isCanonical:!0},":man_with_gua_pi_mao_tone1:":{unicode:["1f472-1f3fb"],fname:"1f472-1f3fb",uc:"1f472-1f3fb",isCanonical:!0},":person_with_blond_hair_tone5:":{unicode:["1f471-1f3ff"],fname:"1f471-1f3ff",uc:"1f471-1f3ff",isCanonical:!0},":person_with_blond_hair_tone4:":{unicode:["1f471-1f3fe"],fname:"1f471-1f3fe",uc:"1f471-1f3fe",isCanonical:!0},":person_with_blond_hair_tone3:":{unicode:["1f471-1f3fd"],fname:"1f471-1f3fd",uc:"1f471-1f3fd",isCanonical:!0},":person_with_blond_hair_tone2:":{unicode:["1f471-1f3fc"],fname:"1f471-1f3fc",uc:"1f471-1f3fc",isCanonical:!0},":person_with_blond_hair_tone1:":{unicode:["1f471-1f3fb"],fname:"1f471-1f3fb",uc:"1f471-1f3fb",isCanonical:!0},":bride_with_veil_tone5:":{unicode:["1f470-1f3ff"],fname:"1f470-1f3ff",uc:"1f470-1f3ff",isCanonical:!0},":bride_with_veil_tone4:":{unicode:["1f470-1f3fe"],fname:"1f470-1f3fe",uc:"1f470-1f3fe",isCanonical:!0},":bride_with_veil_tone3:":{unicode:["1f470-1f3fd"],fname:"1f470-1f3fd",uc:"1f470-1f3fd",isCanonical:!0},":bride_with_veil_tone2:":{unicode:["1f470-1f3fc"],fname:"1f470-1f3fc",uc:"1f470-1f3fc",isCanonical:!0},":bride_with_veil_tone1:":{unicode:["1f470-1f3fb"],fname:"1f470-1f3fb",uc:"1f470-1f3fb",isCanonical:!0},":cop_tone5:":{unicode:["1f46e-1f3ff"],fname:"1f46e-1f3ff",uc:"1f46e-1f3ff",isCanonical:!0},":cop_tone4:":{unicode:["1f46e-1f3fe"],fname:"1f46e-1f3fe",uc:"1f46e-1f3fe",isCanonical:!0},":cop_tone3:":{unicode:["1f46e-1f3fd"],fname:"1f46e-1f3fd",uc:"1f46e-1f3fd",isCanonical:!0},":cop_tone2:":{unicode:["1f46e-1f3fc"],fname:"1f46e-1f3fc",uc:"1f46e-1f3fc",isCanonical:!0},":cop_tone1:":{unicode:["1f46e-1f3fb"],fname:"1f46e-1f3fb",uc:"1f46e-1f3fb",isCanonical:!0},":woman_tone5:":{unicode:["1f469-1f3ff"],fname:"1f469-1f3ff",uc:"1f469-1f3ff",isCanonical:!0},":woman_tone4:":{unicode:["1f469-1f3fe"],fname:"1f469-1f3fe",uc:"1f469-1f3fe",isCanonical:!0},":woman_tone3:":{unicode:["1f469-1f3fd"],fname:"1f469-1f3fd",uc:"1f469-1f3fd",isCanonical:!0},":woman_tone2:":{unicode:["1f469-1f3fc"],fname:"1f469-1f3fc",uc:"1f469-1f3fc",isCanonical:!0},":woman_tone1:":{unicode:["1f469-1f3fb"],fname:"1f469-1f3fb",uc:"1f469-1f3fb",isCanonical:!0},":man_tone5:":{unicode:["1f468-1f3ff"],fname:"1f468-1f3ff",uc:"1f468-1f3ff",isCanonical:!0},":man_tone4:":{unicode:["1f468-1f3fe"],fname:"1f468-1f3fe",uc:"1f468-1f3fe",isCanonical:!0},":man_tone3:":{unicode:["1f468-1f3fd"],fname:"1f468-1f3fd",uc:"1f468-1f3fd",isCanonical:!0},":man_tone2:":{unicode:["1f468-1f3fc"],fname:"1f468-1f3fc",uc:"1f468-1f3fc",isCanonical:!0},":man_tone1:":{unicode:["1f468-1f3fb"],fname:"1f468-1f3fb",uc:"1f468-1f3fb",isCanonical:!0},":girl_tone5:":{unicode:["1f467-1f3ff"],fname:"1f467-1f3ff",uc:"1f467-1f3ff",isCanonical:!0},":girl_tone4:":{unicode:["1f467-1f3fe"],fname:"1f467-1f3fe",uc:"1f467-1f3fe",isCanonical:!0},":girl_tone3:":{unicode:["1f467-1f3fd"],fname:"1f467-1f3fd",uc:"1f467-1f3fd",isCanonical:!0},":girl_tone2:":{unicode:["1f467-1f3fc"],fname:"1f467-1f3fc",uc:"1f467-1f3fc",isCanonical:!0},":girl_tone1:":{unicode:["1f467-1f3fb"],fname:"1f467-1f3fb",uc:"1f467-1f3fb",isCanonical:!0},":boy_tone5:":{unicode:["1f466-1f3ff"],fname:"1f466-1f3ff",uc:"1f466-1f3ff",isCanonical:!0},":boy_tone4:":{unicode:["1f466-1f3fe"],fname:"1f466-1f3fe",uc:"1f466-1f3fe",isCanonical:!0},":boy_tone3:":{unicode:["1f466-1f3fd"],fname:"1f466-1f3fd",uc:"1f466-1f3fd",isCanonical:!0},":boy_tone2:":{unicode:["1f466-1f3fc"],fname:"1f466-1f3fc",uc:"1f466-1f3fc",isCanonical:!0},":boy_tone1:":{unicode:["1f466-1f3fb"],fname:"1f466-1f3fb",uc:"1f466-1f3fb",isCanonical:!0},":open_hands_tone5:":{unicode:["1f450-1f3ff"],fname:"1f450-1f3ff",uc:"1f450-1f3ff",isCanonical:!0},":open_hands_tone4:":{unicode:["1f450-1f3fe"],fname:"1f450-1f3fe",uc:"1f450-1f3fe",isCanonical:!0},":open_hands_tone3:":{unicode:["1f450-1f3fd"],fname:"1f450-1f3fd",uc:"1f450-1f3fd",isCanonical:!0},":open_hands_tone2:":{unicode:["1f450-1f3fc"],fname:"1f450-1f3fc",uc:"1f450-1f3fc",isCanonical:!0},":open_hands_tone1:":{unicode:["1f450-1f3fb"],fname:"1f450-1f3fb",uc:"1f450-1f3fb",isCanonical:!0},":clap_tone5:":{unicode:["1f44f-1f3ff"],fname:"1f44f-1f3ff",uc:"1f44f-1f3ff",isCanonical:!0},":clap_tone4:":{unicode:["1f44f-1f3fe"],fname:"1f44f-1f3fe",uc:"1f44f-1f3fe",isCanonical:!0},":clap_tone3:":{unicode:["1f44f-1f3fd"],fname:"1f44f-1f3fd",uc:"1f44f-1f3fd",isCanonical:!0},":clap_tone2:":{unicode:["1f44f-1f3fc"],fname:"1f44f-1f3fc",uc:"1f44f-1f3fc",isCanonical:!0},":clap_tone1:":{unicode:["1f44f-1f3fb"],fname:"1f44f-1f3fb",uc:"1f44f-1f3fb",isCanonical:!0},":thumbsdown_tone5:":{unicode:["1f44e-1f3ff"],fname:"1f44e-1f3ff",uc:"1f44e-1f3ff",isCanonical:!0},":-1_tone5:":{unicode:["1f44e-1f3ff"],fname:"1f44e-1f3ff",uc:"1f44e-1f3ff",isCanonical:!1},":thumbdown_tone5:":{unicode:["1f44e-1f3ff"],fname:"1f44e-1f3ff",uc:"1f44e-1f3ff",isCanonical:!1},":thumbsdown_tone4:":{unicode:["1f44e-1f3fe"],fname:"1f44e-1f3fe",uc:"1f44e-1f3fe",isCanonical:!0},":-1_tone4:":{unicode:["1f44e-1f3fe"],fname:"1f44e-1f3fe",uc:"1f44e-1f3fe",isCanonical:!1},":thumbdown_tone4:":{unicode:["1f44e-1f3fe"],fname:"1f44e-1f3fe",uc:"1f44e-1f3fe",isCanonical:!1},":thumbsdown_tone3:":{unicode:["1f44e-1f3fd"],fname:"1f44e-1f3fd",uc:"1f44e-1f3fd",isCanonical:!0},":-1_tone3:":{unicode:["1f44e-1f3fd"],fname:"1f44e-1f3fd",uc:"1f44e-1f3fd",isCanonical:!1},":thumbdown_tone3:":{unicode:["1f44e-1f3fd"],fname:"1f44e-1f3fd",uc:"1f44e-1f3fd",isCanonical:!1},":thumbsdown_tone2:":{unicode:["1f44e-1f3fc"],fname:"1f44e-1f3fc",uc:"1f44e-1f3fc",isCanonical:!0},":-1_tone2:":{unicode:["1f44e-1f3fc"],fname:"1f44e-1f3fc",uc:"1f44e-1f3fc",isCanonical:!1},":thumbdown_tone2:":{unicode:["1f44e-1f3fc"],fname:"1f44e-1f3fc",uc:"1f44e-1f3fc",isCanonical:!1},":thumbsdown_tone1:":{unicode:["1f44e-1f3fb"],fname:"1f44e-1f3fb",uc:"1f44e-1f3fb",isCanonical:!0},":-1_tone1:":{unicode:["1f44e-1f3fb"],fname:"1f44e-1f3fb",uc:"1f44e-1f3fb",isCanonical:!1},":thumbdown_tone1:":{unicode:["1f44e-1f3fb"],fname:"1f44e-1f3fb",uc:"1f44e-1f3fb",isCanonical:!1},":thumbsup_tone5:":{unicode:["1f44d-1f3ff"],fname:"1f44d-1f3ff",uc:"1f44d-1f3ff",isCanonical:!0},":+1_tone5:":{unicode:["1f44d-1f3ff"],fname:"1f44d-1f3ff",uc:"1f44d-1f3ff",isCanonical:!1},":thumbup_tone5:":{unicode:["1f44d-1f3ff"],fname:"1f44d-1f3ff",uc:"1f44d-1f3ff",isCanonical:!1},":thumbsup_tone4:":{unicode:["1f44d-1f3fe"],fname:"1f44d-1f3fe",uc:"1f44d-1f3fe",isCanonical:!0},":+1_tone4:":{unicode:["1f44d-1f3fe"],fname:"1f44d-1f3fe",uc:"1f44d-1f3fe",isCanonical:!1},":thumbup_tone4:":{unicode:["1f44d-1f3fe"],fname:"1f44d-1f3fe",uc:"1f44d-1f3fe",isCanonical:!1},":thumbsup_tone3:":{unicode:["1f44d-1f3fd"],fname:"1f44d-1f3fd",uc:"1f44d-1f3fd",isCanonical:!0},":+1_tone3:":{unicode:["1f44d-1f3fd"],fname:"1f44d-1f3fd",uc:"1f44d-1f3fd",isCanonical:!1},":thumbup_tone3:":{unicode:["1f44d-1f3fd"],fname:"1f44d-1f3fd",uc:"1f44d-1f3fd",isCanonical:!1},":thumbsup_tone2:":{unicode:["1f44d-1f3fc"],fname:"1f44d-1f3fc",uc:"1f44d-1f3fc",isCanonical:!0},":+1_tone2:":{unicode:["1f44d-1f3fc"],fname:"1f44d-1f3fc",uc:"1f44d-1f3fc",isCanonical:!1},":thumbup_tone2:":{unicode:["1f44d-1f3fc"],fname:"1f44d-1f3fc",uc:"1f44d-1f3fc",isCanonical:!1},":thumbsup_tone1:":{unicode:["1f44d-1f3fb"],fname:"1f44d-1f3fb",uc:"1f44d-1f3fb",isCanonical:!0},":+1_tone1:":{unicode:["1f44d-1f3fb"],fname:"1f44d-1f3fb",uc:"1f44d-1f3fb",isCanonical:!1},":thumbup_tone1:":{unicode:["1f44d-1f3fb"],fname:"1f44d-1f3fb",uc:"1f44d-1f3fb",isCanonical:!1},":ok_hand_tone5:":{unicode:["1f44c-1f3ff"],fname:"1f44c-1f3ff",uc:"1f44c-1f3ff",isCanonical:!0},":ok_hand_tone4:":{unicode:["1f44c-1f3fe"],fname:"1f44c-1f3fe",uc:"1f44c-1f3fe",isCanonical:!0},":ok_hand_tone3:":{unicode:["1f44c-1f3fd"],fname:"1f44c-1f3fd",uc:"1f44c-1f3fd",isCanonical:!0},":ok_hand_tone2:":{unicode:["1f44c-1f3fc"],fname:"1f44c-1f3fc",uc:"1f44c-1f3fc",isCanonical:!0},":ok_hand_tone1:":{unicode:["1f44c-1f3fb"],fname:"1f44c-1f3fb",uc:"1f44c-1f3fb",isCanonical:!0},":wave_tone5:":{unicode:["1f44b-1f3ff"],fname:"1f44b-1f3ff",uc:"1f44b-1f3ff",isCanonical:!0},":wave_tone4:":{unicode:["1f44b-1f3fe"],fname:"1f44b-1f3fe",uc:"1f44b-1f3fe",isCanonical:!0},":wave_tone3:":{unicode:["1f44b-1f3fd"],fname:"1f44b-1f3fd",uc:"1f44b-1f3fd",isCanonical:!0},":wave_tone2:":{unicode:["1f44b-1f3fc"],fname:"1f44b-1f3fc",uc:"1f44b-1f3fc",isCanonical:!0},":wave_tone1:":{unicode:["1f44b-1f3fb"],fname:"1f44b-1f3fb",uc:"1f44b-1f3fb",isCanonical:!0},":punch_tone5:":{unicode:["1f44a-1f3ff"],fname:"1f44a-1f3ff",uc:"1f44a-1f3ff",isCanonical:!0},":punch_tone4:":{unicode:["1f44a-1f3fe"],fname:"1f44a-1f3fe",uc:"1f44a-1f3fe",isCanonical:!0},":punch_tone3:":{unicode:["1f44a-1f3fd"],fname:"1f44a-1f3fd",uc:"1f44a-1f3fd",isCanonical:!0},":punch_tone2:":{unicode:["1f44a-1f3fc"],fname:"1f44a-1f3fc",uc:"1f44a-1f3fc",isCanonical:!0},":punch_tone1:":{unicode:["1f44a-1f3fb"],fname:"1f44a-1f3fb",uc:"1f44a-1f3fb",isCanonical:!0},":point_right_tone5:":{unicode:["1f449-1f3ff"],fname:"1f449-1f3ff",uc:"1f449-1f3ff",isCanonical:!0},":point_right_tone4:":{unicode:["1f449-1f3fe"],fname:"1f449-1f3fe",uc:"1f449-1f3fe",isCanonical:!0},":point_right_tone3:":{unicode:["1f449-1f3fd"],fname:"1f449-1f3fd",uc:"1f449-1f3fd",isCanonical:!0},":point_right_tone2:":{unicode:["1f449-1f3fc"],fname:"1f449-1f3fc",uc:"1f449-1f3fc",isCanonical:!0},":point_right_tone1:":{unicode:["1f449-1f3fb"],fname:"1f449-1f3fb",uc:"1f449-1f3fb",isCanonical:!0},":point_left_tone5:":{unicode:["1f448-1f3ff"],fname:"1f448-1f3ff",uc:"1f448-1f3ff",isCanonical:!0},":point_left_tone4:":{unicode:["1f448-1f3fe"],fname:"1f448-1f3fe",uc:"1f448-1f3fe",isCanonical:!0},":point_left_tone3:":{unicode:["1f448-1f3fd"],fname:"1f448-1f3fd",uc:"1f448-1f3fd",isCanonical:!0},":point_left_tone2:":{unicode:["1f448-1f3fc"],fname:"1f448-1f3fc",uc:"1f448-1f3fc",isCanonical:!0},":point_left_tone1:":{unicode:["1f448-1f3fb"],fname:"1f448-1f3fb",uc:"1f448-1f3fb",isCanonical:!0},":point_down_tone5:":{unicode:["1f447-1f3ff"],fname:"1f447-1f3ff",uc:"1f447-1f3ff",isCanonical:!0},":point_down_tone4:":{unicode:["1f447-1f3fe"],fname:"1f447-1f3fe",uc:"1f447-1f3fe",isCanonical:!0},":point_down_tone3:":{unicode:["1f447-1f3fd"],fname:"1f447-1f3fd",uc:"1f447-1f3fd",isCanonical:!0},":point_down_tone2:":{unicode:["1f447-1f3fc"],fname:"1f447-1f3fc",uc:"1f447-1f3fc",isCanonical:!0},":point_down_tone1:":{unicode:["1f447-1f3fb"],fname:"1f447-1f3fb",uc:"1f447-1f3fb",isCanonical:!0},":point_up_2_tone5:":{unicode:["1f446-1f3ff"],fname:"1f446-1f3ff",uc:"1f446-1f3ff",isCanonical:!0},":point_up_2_tone4:":{unicode:["1f446-1f3fe"],fname:"1f446-1f3fe",uc:"1f446-1f3fe",isCanonical:!0},":point_up_2_tone3:":{unicode:["1f446-1f3fd"],fname:"1f446-1f3fd",uc:"1f446-1f3fd",isCanonical:!0},":point_up_2_tone2:":{unicode:["1f446-1f3fc"],fname:"1f446-1f3fc",uc:"1f446-1f3fc",isCanonical:!0},":point_up_2_tone1:":{unicode:["1f446-1f3fb"],fname:"1f446-1f3fb",uc:"1f446-1f3fb",isCanonical:!0},":nose_tone5:":{unicode:["1f443-1f3ff"],fname:"1f443-1f3ff",uc:"1f443-1f3ff",isCanonical:!0},":nose_tone4:":{unicode:["1f443-1f3fe"],fname:"1f443-1f3fe",uc:"1f443-1f3fe",isCanonical:!0},":nose_tone3:":{unicode:["1f443-1f3fd"],fname:"1f443-1f3fd",uc:"1f443-1f3fd",isCanonical:!0},":nose_tone2:":{unicode:["1f443-1f3fc"],fname:"1f443-1f3fc",uc:"1f443-1f3fc",isCanonical:!0},":nose_tone1:":{unicode:["1f443-1f3fb"],fname:"1f443-1f3fb",uc:"1f443-1f3fb",isCanonical:!0},":ear_tone5:":{unicode:["1f442-1f3ff"],fname:"1f442-1f3ff",uc:"1f442-1f3ff",isCanonical:!0},":ear_tone4:":{unicode:["1f442-1f3fe"],fname:"1f442-1f3fe",uc:"1f442-1f3fe",isCanonical:!0},":ear_tone3:":{unicode:["1f442-1f3fd"],fname:"1f442-1f3fd",uc:"1f442-1f3fd",isCanonical:!0},":ear_tone2:":{unicode:["1f442-1f3fc"],fname:"1f442-1f3fc",uc:"1f442-1f3fc",isCanonical:!0},":ear_tone1:":{unicode:["1f442-1f3fb"],fname:"1f442-1f3fb",uc:"1f442-1f3fb",isCanonical:!0},":lifter_tone5:":{unicode:["1f3cb-1f3ff"],fname:"1f3cb-1f3ff",uc:"1f3cb-1f3ff",isCanonical:!0},":weight_lifter_tone5:":{unicode:["1f3cb-1f3ff"],fname:"1f3cb-1f3ff",uc:"1f3cb-1f3ff",isCanonical:!1},":lifter_tone4:":{unicode:["1f3cb-1f3fe"],fname:"1f3cb-1f3fe",uc:"1f3cb-1f3fe",isCanonical:!0},":weight_lifter_tone4:":{unicode:["1f3cb-1f3fe"],fname:"1f3cb-1f3fe",uc:"1f3cb-1f3fe",isCanonical:!1},":lifter_tone3:":{unicode:["1f3cb-1f3fd"],fname:"1f3cb-1f3fd",uc:"1f3cb-1f3fd",isCanonical:!0},":weight_lifter_tone3:":{unicode:["1f3cb-1f3fd"],fname:"1f3cb-1f3fd",uc:"1f3cb-1f3fd",isCanonical:!1},":lifter_tone2:":{unicode:["1f3cb-1f3fc"],fname:"1f3cb-1f3fc",uc:"1f3cb-1f3fc",isCanonical:!0},":weight_lifter_tone2:":{unicode:["1f3cb-1f3fc"],fname:"1f3cb-1f3fc",uc:"1f3cb-1f3fc",isCanonical:!1},":lifter_tone1:":{unicode:["1f3cb-1f3fb"],fname:"1f3cb-1f3fb",uc:"1f3cb-1f3fb",isCanonical:!0},":weight_lifter_tone1:":{unicode:["1f3cb-1f3fb"],fname:"1f3cb-1f3fb",uc:"1f3cb-1f3fb",isCanonical:!1},":swimmer_tone5:":{unicode:["1f3ca-1f3ff"],fname:"1f3ca-1f3ff",uc:"1f3ca-1f3ff",isCanonical:!0},":swimmer_tone4:":{unicode:["1f3ca-1f3fe"],fname:"1f3ca-1f3fe",uc:"1f3ca-1f3fe",isCanonical:!0},":swimmer_tone3:":{unicode:["1f3ca-1f3fd"],fname:"1f3ca-1f3fd",uc:"1f3ca-1f3fd",isCanonical:!0},":swimmer_tone2:":{unicode:["1f3ca-1f3fc"],fname:"1f3ca-1f3fc",uc:"1f3ca-1f3fc",isCanonical:!0},":swimmer_tone1:":{unicode:["1f3ca-1f3fb"],fname:"1f3ca-1f3fb",uc:"1f3ca-1f3fb",isCanonical:!0},":horse_racing_tone5:":{unicode:["1f3c7-1f3ff"],fname:"1f3c7-1f3ff",uc:"1f3c7-1f3ff",isCanonical:!0},":horse_racing_tone4:":{unicode:["1f3c7-1f3fe"],fname:"1f3c7-1f3fe",uc:"1f3c7-1f3fe",isCanonical:!0},":horse_racing_tone3:":{unicode:["1f3c7-1f3fd"],fname:"1f3c7-1f3fd",uc:"1f3c7-1f3fd",isCanonical:!0},":horse_racing_tone2:":{unicode:["1f3c7-1f3fc"],fname:"1f3c7-1f3fc",uc:"1f3c7-1f3fc",isCanonical:!0},":horse_racing_tone1:":{unicode:["1f3c7-1f3fb"],fname:"1f3c7-1f3fb",uc:"1f3c7-1f3fb",isCanonical:!0},":surfer_tone5:":{unicode:["1f3c4-1f3ff"],fname:"1f3c4-1f3ff",uc:"1f3c4-1f3ff",isCanonical:!0},":surfer_tone4:":{unicode:["1f3c4-1f3fe"],fname:"1f3c4-1f3fe",uc:"1f3c4-1f3fe",isCanonical:!0},":surfer_tone3:":{unicode:["1f3c4-1f3fd"],fname:"1f3c4-1f3fd",uc:"1f3c4-1f3fd",isCanonical:!0},":surfer_tone2:":{unicode:["1f3c4-1f3fc"],fname:"1f3c4-1f3fc",uc:"1f3c4-1f3fc",isCanonical:!0},":surfer_tone1:":{unicode:["1f3c4-1f3fb"],fname:"1f3c4-1f3fb",uc:"1f3c4-1f3fb",isCanonical:!0},":runner_tone5:":{unicode:["1f3c3-1f3ff"],fname:"1f3c3-1f3ff",uc:"1f3c3-1f3ff",isCanonical:!0},":runner_tone4:":{unicode:["1f3c3-1f3fe"],fname:"1f3c3-1f3fe",uc:"1f3c3-1f3fe",isCanonical:!0},":runner_tone3:":{unicode:["1f3c3-1f3fd"],fname:"1f3c3-1f3fd",uc:"1f3c3-1f3fd",isCanonical:!0},":runner_tone2:":{unicode:["1f3c3-1f3fc"],fname:"1f3c3-1f3fc",uc:"1f3c3-1f3fc",isCanonical:!0},":runner_tone1:":{unicode:["1f3c3-1f3fb"],fname:"1f3c3-1f3fb",uc:"1f3c3-1f3fb",isCanonical:!0},":santa_tone5:":{unicode:["1f385-1f3ff"],fname:"1f385-1f3ff",uc:"1f385-1f3ff",isCanonical:!0},":santa_tone4:":{unicode:["1f385-1f3fe"],fname:"1f385-1f3fe",uc:"1f385-1f3fe",isCanonical:!0},":santa_tone3:":{unicode:["1f385-1f3fd"],fname:"1f385-1f3fd",uc:"1f385-1f3fd",isCanonical:!0},":santa_tone2:":{unicode:["1f385-1f3fc"],fname:"1f385-1f3fc",uc:"1f385-1f3fc",isCanonical:!0},":santa_tone1:":{unicode:["1f385-1f3fb"],fname:"1f385-1f3fb",uc:"1f385-1f3fb",isCanonical:!0},":flag_zw:":{unicode:["1f1ff-1f1fc"],fname:"1f1ff-1f1fc",uc:"1f1ff-1f1fc",isCanonical:!0},":zw:":{unicode:["1f1ff-1f1fc"],fname:"1f1ff-1f1fc",uc:"1f1ff-1f1fc",isCanonical:!1},":flag_zm:":{unicode:["1f1ff-1f1f2"],fname:"1f1ff-1f1f2",uc:"1f1ff-1f1f2",isCanonical:!0},":zm:":{unicode:["1f1ff-1f1f2"],fname:"1f1ff-1f1f2",uc:"1f1ff-1f1f2",isCanonical:!1},":flag_za:":{unicode:["1f1ff-1f1e6"],fname:"1f1ff-1f1e6",uc:"1f1ff-1f1e6",isCanonical:!0},":za:":{unicode:["1f1ff-1f1e6"],fname:"1f1ff-1f1e6",uc:"1f1ff-1f1e6",isCanonical:!1},":flag_yt:":{unicode:["1f1fe-1f1f9"],fname:"1f1fe-1f1f9",uc:"1f1fe-1f1f9",isCanonical:!0},":yt:":{unicode:["1f1fe-1f1f9"],fname:"1f1fe-1f1f9",uc:"1f1fe-1f1f9",isCanonical:!1},":flag_ye:":{unicode:["1f1fe-1f1ea"],fname:"1f1fe-1f1ea",uc:"1f1fe-1f1ea",isCanonical:!0},":ye:":{unicode:["1f1fe-1f1ea"],fname:"1f1fe-1f1ea",uc:"1f1fe-1f1ea",isCanonical:!1},":flag_xk:":{unicode:["1f1fd-1f1f0"],fname:"1f1fd-1f1f0",uc:"1f1fd-1f1f0",isCanonical:!0},":xk:":{unicode:["1f1fd-1f1f0"],fname:"1f1fd-1f1f0",uc:"1f1fd-1f1f0",isCanonical:!1},":flag_ws:":{unicode:["1f1fc-1f1f8"],fname:"1f1fc-1f1f8",uc:"1f1fc-1f1f8",isCanonical:!0},":ws:":{unicode:["1f1fc-1f1f8"],fname:"1f1fc-1f1f8",uc:"1f1fc-1f1f8",isCanonical:!1},":flag_wf:":{unicode:["1f1fc-1f1eb"],fname:"1f1fc-1f1eb",uc:"1f1fc-1f1eb",isCanonical:!0},":wf:":{unicode:["1f1fc-1f1eb"],fname:"1f1fc-1f1eb",uc:"1f1fc-1f1eb",isCanonical:!1},":flag_vu:":{unicode:["1f1fb-1f1fa"],fname:"1f1fb-1f1fa",uc:"1f1fb-1f1fa",isCanonical:!0},":vu:":{unicode:["1f1fb-1f1fa"],fname:"1f1fb-1f1fa",uc:"1f1fb-1f1fa",isCanonical:!1},":flag_vn:":{unicode:["1f1fb-1f1f3"],fname:"1f1fb-1f1f3",uc:"1f1fb-1f1f3",isCanonical:!0},":vn:":{unicode:["1f1fb-1f1f3"],fname:"1f1fb-1f1f3",uc:"1f1fb-1f1f3",isCanonical:!1},":flag_vi:":{unicode:["1f1fb-1f1ee"],fname:"1f1fb-1f1ee",uc:"1f1fb-1f1ee",isCanonical:!0},":vi:":{unicode:["1f1fb-1f1ee"],fname:"1f1fb-1f1ee",uc:"1f1fb-1f1ee",isCanonical:!1},":flag_vg:":{unicode:["1f1fb-1f1ec"],fname:"1f1fb-1f1ec",uc:"1f1fb-1f1ec",isCanonical:!0},":vg:":{unicode:["1f1fb-1f1ec"],fname:"1f1fb-1f1ec",uc:"1f1fb-1f1ec",isCanonical:!1},":flag_ve:":{unicode:["1f1fb-1f1ea"],fname:"1f1fb-1f1ea",uc:"1f1fb-1f1ea",isCanonical:!0},":ve:":{unicode:["1f1fb-1f1ea"],fname:"1f1fb-1f1ea",uc:"1f1fb-1f1ea",isCanonical:!1},":flag_vc:":{unicode:["1f1fb-1f1e8"],fname:"1f1fb-1f1e8",uc:"1f1fb-1f1e8",isCanonical:!0},":vc:":{unicode:["1f1fb-1f1e8"],fname:"1f1fb-1f1e8",uc:"1f1fb-1f1e8",isCanonical:!1},":flag_va:":{unicode:["1f1fb-1f1e6"],fname:"1f1fb-1f1e6",uc:"1f1fb-1f1e6",isCanonical:!0},":va:":{unicode:["1f1fb-1f1e6"],fname:"1f1fb-1f1e6",uc:"1f1fb-1f1e6",isCanonical:!1},":flag_uz:":{unicode:["1f1fa-1f1ff"],fname:"1f1fa-1f1ff",uc:"1f1fa-1f1ff",isCanonical:!0},":uz:":{unicode:["1f1fa-1f1ff"],fname:"1f1fa-1f1ff",uc:"1f1fa-1f1ff",isCanonical:!1},":flag_uy:":{unicode:["1f1fa-1f1fe"],fname:"1f1fa-1f1fe",uc:"1f1fa-1f1fe",isCanonical:!0},":uy:":{unicode:["1f1fa-1f1fe"],fname:"1f1fa-1f1fe",uc:"1f1fa-1f1fe",isCanonical:!1},":flag_us:":{unicode:["1f1fa-1f1f8"],fname:"1f1fa-1f1f8",uc:"1f1fa-1f1f8",isCanonical:!0},":us:":{unicode:["1f1fa-1f1f8"],fname:"1f1fa-1f1f8",uc:"1f1fa-1f1f8",isCanonical:!1},":flag_um:":{unicode:["1f1fa-1f1f2"],fname:"1f1fa-1f1f2",uc:"1f1fa-1f1f2",isCanonical:!0},":um:":{unicode:["1f1fa-1f1f2"],fname:"1f1fa-1f1f2",uc:"1f1fa-1f1f2",isCanonical:!1},":flag_ug:":{unicode:["1f1fa-1f1ec"],fname:"1f1fa-1f1ec",uc:"1f1fa-1f1ec",isCanonical:!0},":ug:":{unicode:["1f1fa-1f1ec"],fname:"1f1fa-1f1ec",uc:"1f1fa-1f1ec",isCanonical:!1},":flag_ua:":{unicode:["1f1fa-1f1e6"],fname:"1f1fa-1f1e6",uc:"1f1fa-1f1e6",isCanonical:!0},":ua:":{unicode:["1f1fa-1f1e6"],fname:"1f1fa-1f1e6",uc:"1f1fa-1f1e6",isCanonical:!1},":flag_tz:":{unicode:["1f1f9-1f1ff"],fname:"1f1f9-1f1ff",uc:"1f1f9-1f1ff",isCanonical:!0},":tz:":{unicode:["1f1f9-1f1ff"],fname:"1f1f9-1f1ff",uc:"1f1f9-1f1ff",isCanonical:!1},":flag_tw:":{unicode:["1f1f9-1f1fc"],fname:"1f1f9-1f1fc",uc:"1f1f9-1f1fc",isCanonical:!0},":tw:":{unicode:["1f1f9-1f1fc"],fname:"1f1f9-1f1fc",uc:"1f1f9-1f1fc",isCanonical:!1},":flag_tv:":{unicode:["1f1f9-1f1fb"],fname:"1f1f9-1f1fb",uc:"1f1f9-1f1fb",isCanonical:!0},":tuvalu:":{unicode:["1f1f9-1f1fb"],fname:"1f1f9-1f1fb",uc:"1f1f9-1f1fb",isCanonical:!1},":flag_tt:":{unicode:["1f1f9-1f1f9"],fname:"1f1f9-1f1f9",uc:"1f1f9-1f1f9",isCanonical:!0},":tt:":{unicode:["1f1f9-1f1f9"],fname:"1f1f9-1f1f9",uc:"1f1f9-1f1f9",isCanonical:!1},":flag_tr:":{unicode:["1f1f9-1f1f7"],fname:"1f1f9-1f1f7",uc:"1f1f9-1f1f7",isCanonical:!0},":tr:":{unicode:["1f1f9-1f1f7"],fname:"1f1f9-1f1f7",uc:"1f1f9-1f1f7",isCanonical:!1},":flag_to:":{unicode:["1f1f9-1f1f4"],fname:"1f1f9-1f1f4",uc:"1f1f9-1f1f4",isCanonical:!0},":to:":{unicode:["1f1f9-1f1f4"],fname:"1f1f9-1f1f4",uc:"1f1f9-1f1f4",isCanonical:!1},":flag_tn:":{unicode:["1f1f9-1f1f3"],fname:"1f1f9-1f1f3",uc:"1f1f9-1f1f3",isCanonical:!0},":tn:":{unicode:["1f1f9-1f1f3"],fname:"1f1f9-1f1f3",uc:"1f1f9-1f1f3",isCanonical:!1},":flag_tm:":{unicode:["1f1f9-1f1f2"],fname:"1f1f9-1f1f2",uc:"1f1f9-1f1f2",isCanonical:!0},":turkmenistan:":{unicode:["1f1f9-1f1f2"],fname:"1f1f9-1f1f2",uc:"1f1f9-1f1f2",isCanonical:!1},":flag_tl:":{unicode:["1f1f9-1f1f1"],fname:"1f1f9-1f1f1",uc:"1f1f9-1f1f1",isCanonical:!0},":tl:":{unicode:["1f1f9-1f1f1"],fname:"1f1f9-1f1f1",uc:"1f1f9-1f1f1",isCanonical:!1},":flag_tk:":{unicode:["1f1f9-1f1f0"],fname:"1f1f9-1f1f0",uc:"1f1f9-1f1f0",isCanonical:!0},":tk:":{unicode:["1f1f9-1f1f0"],fname:"1f1f9-1f1f0",uc:"1f1f9-1f1f0",isCanonical:!1},":flag_tj:":{unicode:["1f1f9-1f1ef"],fname:"1f1f9-1f1ef",uc:"1f1f9-1f1ef",isCanonical:!0},":tj:":{unicode:["1f1f9-1f1ef"],fname:"1f1f9-1f1ef",uc:"1f1f9-1f1ef",isCanonical:!1},":flag_th:":{unicode:["1f1f9-1f1ed"],fname:"1f1f9-1f1ed",uc:"1f1f9-1f1ed",isCanonical:!0},":th:":{unicode:["1f1f9-1f1ed"],fname:"1f1f9-1f1ed",uc:"1f1f9-1f1ed",isCanonical:!1},":flag_tg:":{unicode:["1f1f9-1f1ec"],fname:"1f1f9-1f1ec",uc:"1f1f9-1f1ec",isCanonical:!0},":tg:":{unicode:["1f1f9-1f1ec"],fname:"1f1f9-1f1ec",uc:"1f1f9-1f1ec",isCanonical:!1},":flag_tf:":{unicode:["1f1f9-1f1eb"],fname:"1f1f9-1f1eb",uc:"1f1f9-1f1eb",isCanonical:!0},":tf:":{unicode:["1f1f9-1f1eb"],fname:"1f1f9-1f1eb",uc:"1f1f9-1f1eb",isCanonical:!1},":flag_td:":{unicode:["1f1f9-1f1e9"],fname:"1f1f9-1f1e9",uc:"1f1f9-1f1e9",isCanonical:!0},":td:":{unicode:["1f1f9-1f1e9"],fname:"1f1f9-1f1e9",uc:"1f1f9-1f1e9",isCanonical:!1},":flag_tc:":{unicode:["1f1f9-1f1e8"],fname:"1f1f9-1f1e8",uc:"1f1f9-1f1e8",isCanonical:!0},":tc:":{unicode:["1f1f9-1f1e8"],fname:"1f1f9-1f1e8",uc:"1f1f9-1f1e8",isCanonical:!1},":flag_ta:":{unicode:["1f1f9-1f1e6"],fname:"1f1f9-1f1e6",uc:"1f1f9-1f1e6",isCanonical:!0},":ta:":{unicode:["1f1f9-1f1e6"],fname:"1f1f9-1f1e6",uc:"1f1f9-1f1e6",isCanonical:!1},":flag_sz:":{unicode:["1f1f8-1f1ff"],fname:"1f1f8-1f1ff",uc:"1f1f8-1f1ff",isCanonical:!0},":sz:":{unicode:["1f1f8-1f1ff"],fname:"1f1f8-1f1ff",uc:"1f1f8-1f1ff",isCanonical:!1},":flag_sy:":{unicode:["1f1f8-1f1fe"],fname:"1f1f8-1f1fe",uc:"1f1f8-1f1fe",isCanonical:!0},":sy:":{unicode:["1f1f8-1f1fe"],fname:"1f1f8-1f1fe",uc:"1f1f8-1f1fe",isCanonical:!1},":flag_sx:":{unicode:["1f1f8-1f1fd"],fname:"1f1f8-1f1fd",uc:"1f1f8-1f1fd",isCanonical:!0
},":sx:":{unicode:["1f1f8-1f1fd"],fname:"1f1f8-1f1fd",uc:"1f1f8-1f1fd",isCanonical:!1},":flag_sv:":{unicode:["1f1f8-1f1fb"],fname:"1f1f8-1f1fb",uc:"1f1f8-1f1fb",isCanonical:!0},":sv:":{unicode:["1f1f8-1f1fb"],fname:"1f1f8-1f1fb",uc:"1f1f8-1f1fb",isCanonical:!1},":flag_st:":{unicode:["1f1f8-1f1f9"],fname:"1f1f8-1f1f9",uc:"1f1f8-1f1f9",isCanonical:!0},":st:":{unicode:["1f1f8-1f1f9"],fname:"1f1f8-1f1f9",uc:"1f1f8-1f1f9",isCanonical:!1},":flag_ss:":{unicode:["1f1f8-1f1f8"],fname:"1f1f8-1f1f8",uc:"1f1f8-1f1f8",isCanonical:!0},":ss:":{unicode:["1f1f8-1f1f8"],fname:"1f1f8-1f1f8",uc:"1f1f8-1f1f8",isCanonical:!1},":flag_sr:":{unicode:["1f1f8-1f1f7"],fname:"1f1f8-1f1f7",uc:"1f1f8-1f1f7",isCanonical:!0},":sr:":{unicode:["1f1f8-1f1f7"],fname:"1f1f8-1f1f7",uc:"1f1f8-1f1f7",isCanonical:!1},":flag_so:":{unicode:["1f1f8-1f1f4"],fname:"1f1f8-1f1f4",uc:"1f1f8-1f1f4",isCanonical:!0},":so:":{unicode:["1f1f8-1f1f4"],fname:"1f1f8-1f1f4",uc:"1f1f8-1f1f4",isCanonical:!1},":flag_sn:":{unicode:["1f1f8-1f1f3"],fname:"1f1f8-1f1f3",uc:"1f1f8-1f1f3",isCanonical:!0},":sn:":{unicode:["1f1f8-1f1f3"],fname:"1f1f8-1f1f3",uc:"1f1f8-1f1f3",isCanonical:!1},":flag_sm:":{unicode:["1f1f8-1f1f2"],fname:"1f1f8-1f1f2",uc:"1f1f8-1f1f2",isCanonical:!0},":sm:":{unicode:["1f1f8-1f1f2"],fname:"1f1f8-1f1f2",uc:"1f1f8-1f1f2",isCanonical:!1},":flag_sl:":{unicode:["1f1f8-1f1f1"],fname:"1f1f8-1f1f1",uc:"1f1f8-1f1f1",isCanonical:!0},":sl:":{unicode:["1f1f8-1f1f1"],fname:"1f1f8-1f1f1",uc:"1f1f8-1f1f1",isCanonical:!1},":flag_sk:":{unicode:["1f1f8-1f1f0"],fname:"1f1f8-1f1f0",uc:"1f1f8-1f1f0",isCanonical:!0},":sk:":{unicode:["1f1f8-1f1f0"],fname:"1f1f8-1f1f0",uc:"1f1f8-1f1f0",isCanonical:!1},":flag_sj:":{unicode:["1f1f8-1f1ef"],fname:"1f1f8-1f1ef",uc:"1f1f8-1f1ef",isCanonical:!0},":sj:":{unicode:["1f1f8-1f1ef"],fname:"1f1f8-1f1ef",uc:"1f1f8-1f1ef",isCanonical:!1},":flag_si:":{unicode:["1f1f8-1f1ee"],fname:"1f1f8-1f1ee",uc:"1f1f8-1f1ee",isCanonical:!0},":si:":{unicode:["1f1f8-1f1ee"],fname:"1f1f8-1f1ee",uc:"1f1f8-1f1ee",isCanonical:!1},":flag_sh:":{unicode:["1f1f8-1f1ed"],fname:"1f1f8-1f1ed",uc:"1f1f8-1f1ed",isCanonical:!0},":sh:":{unicode:["1f1f8-1f1ed"],fname:"1f1f8-1f1ed",uc:"1f1f8-1f1ed",isCanonical:!1},":flag_sg:":{unicode:["1f1f8-1f1ec"],fname:"1f1f8-1f1ec",uc:"1f1f8-1f1ec",isCanonical:!0},":sg:":{unicode:["1f1f8-1f1ec"],fname:"1f1f8-1f1ec",uc:"1f1f8-1f1ec",isCanonical:!1},":flag_se:":{unicode:["1f1f8-1f1ea"],fname:"1f1f8-1f1ea",uc:"1f1f8-1f1ea",isCanonical:!0},":se:":{unicode:["1f1f8-1f1ea"],fname:"1f1f8-1f1ea",uc:"1f1f8-1f1ea",isCanonical:!1},":flag_sd:":{unicode:["1f1f8-1f1e9"],fname:"1f1f8-1f1e9",uc:"1f1f8-1f1e9",isCanonical:!0},":sd:":{unicode:["1f1f8-1f1e9"],fname:"1f1f8-1f1e9",uc:"1f1f8-1f1e9",isCanonical:!1},":flag_sc:":{unicode:["1f1f8-1f1e8"],fname:"1f1f8-1f1e8",uc:"1f1f8-1f1e8",isCanonical:!0},":sc:":{unicode:["1f1f8-1f1e8"],fname:"1f1f8-1f1e8",uc:"1f1f8-1f1e8",isCanonical:!1},":flag_sb:":{unicode:["1f1f8-1f1e7"],fname:"1f1f8-1f1e7",uc:"1f1f8-1f1e7",isCanonical:!0},":sb:":{unicode:["1f1f8-1f1e7"],fname:"1f1f8-1f1e7",uc:"1f1f8-1f1e7",isCanonical:!1},":flag_sa:":{unicode:["1f1f8-1f1e6"],fname:"1f1f8-1f1e6",uc:"1f1f8-1f1e6",isCanonical:!0},":saudiarabia:":{unicode:["1f1f8-1f1e6"],fname:"1f1f8-1f1e6",uc:"1f1f8-1f1e6",isCanonical:!1},":saudi:":{unicode:["1f1f8-1f1e6"],fname:"1f1f8-1f1e6",uc:"1f1f8-1f1e6",isCanonical:!1},":flag_rw:":{unicode:["1f1f7-1f1fc"],fname:"1f1f7-1f1fc",uc:"1f1f7-1f1fc",isCanonical:!0},":rw:":{unicode:["1f1f7-1f1fc"],fname:"1f1f7-1f1fc",uc:"1f1f7-1f1fc",isCanonical:!1},":flag_ru:":{unicode:["1f1f7-1f1fa"],fname:"1f1f7-1f1fa",uc:"1f1f7-1f1fa",isCanonical:!0},":ru:":{unicode:["1f1f7-1f1fa"],fname:"1f1f7-1f1fa",uc:"1f1f7-1f1fa",isCanonical:!1},":flag_rs:":{unicode:["1f1f7-1f1f8"],fname:"1f1f7-1f1f8",uc:"1f1f7-1f1f8",isCanonical:!0},":rs:":{unicode:["1f1f7-1f1f8"],fname:"1f1f7-1f1f8",uc:"1f1f7-1f1f8",isCanonical:!1},":flag_ro:":{unicode:["1f1f7-1f1f4"],fname:"1f1f7-1f1f4",uc:"1f1f7-1f1f4",isCanonical:!0},":ro:":{unicode:["1f1f7-1f1f4"],fname:"1f1f7-1f1f4",uc:"1f1f7-1f1f4",isCanonical:!1},":flag_re:":{unicode:["1f1f7-1f1ea"],fname:"1f1f7-1f1ea",uc:"1f1f7-1f1ea",isCanonical:!0},":re:":{unicode:["1f1f7-1f1ea"],fname:"1f1f7-1f1ea",uc:"1f1f7-1f1ea",isCanonical:!1},":flag_qa:":{unicode:["1f1f6-1f1e6"],fname:"1f1f6-1f1e6",uc:"1f1f6-1f1e6",isCanonical:!0},":qa:":{unicode:["1f1f6-1f1e6"],fname:"1f1f6-1f1e6",uc:"1f1f6-1f1e6",isCanonical:!1},":flag_py:":{unicode:["1f1f5-1f1fe"],fname:"1f1f5-1f1fe",uc:"1f1f5-1f1fe",isCanonical:!0},":py:":{unicode:["1f1f5-1f1fe"],fname:"1f1f5-1f1fe",uc:"1f1f5-1f1fe",isCanonical:!1},":flag_pw:":{unicode:["1f1f5-1f1fc"],fname:"1f1f5-1f1fc",uc:"1f1f5-1f1fc",isCanonical:!0},":pw:":{unicode:["1f1f5-1f1fc"],fname:"1f1f5-1f1fc",uc:"1f1f5-1f1fc",isCanonical:!1},":flag_pt:":{unicode:["1f1f5-1f1f9"],fname:"1f1f5-1f1f9",uc:"1f1f5-1f1f9",isCanonical:!0},":pt:":{unicode:["1f1f5-1f1f9"],fname:"1f1f5-1f1f9",uc:"1f1f5-1f1f9",isCanonical:!1},":flag_ps:":{unicode:["1f1f5-1f1f8"],fname:"1f1f5-1f1f8",uc:"1f1f5-1f1f8",isCanonical:!0},":ps:":{unicode:["1f1f5-1f1f8"],fname:"1f1f5-1f1f8",uc:"1f1f5-1f1f8",isCanonical:!1},":flag_pr:":{unicode:["1f1f5-1f1f7"],fname:"1f1f5-1f1f7",uc:"1f1f5-1f1f7",isCanonical:!0},":pr:":{unicode:["1f1f5-1f1f7"],fname:"1f1f5-1f1f7",uc:"1f1f5-1f1f7",isCanonical:!1},":flag_pn:":{unicode:["1f1f5-1f1f3"],fname:"1f1f5-1f1f3",uc:"1f1f5-1f1f3",isCanonical:!0},":pn:":{unicode:["1f1f5-1f1f3"],fname:"1f1f5-1f1f3",uc:"1f1f5-1f1f3",isCanonical:!1},":flag_pm:":{unicode:["1f1f5-1f1f2"],fname:"1f1f5-1f1f2",uc:"1f1f5-1f1f2",isCanonical:!0},":pm:":{unicode:["1f1f5-1f1f2"],fname:"1f1f5-1f1f2",uc:"1f1f5-1f1f2",isCanonical:!1},":flag_pl:":{unicode:["1f1f5-1f1f1"],fname:"1f1f5-1f1f1",uc:"1f1f5-1f1f1",isCanonical:!0},":pl:":{unicode:["1f1f5-1f1f1"],fname:"1f1f5-1f1f1",uc:"1f1f5-1f1f1",isCanonical:!1},":flag_pk:":{unicode:["1f1f5-1f1f0"],fname:"1f1f5-1f1f0",uc:"1f1f5-1f1f0",isCanonical:!0},":pk:":{unicode:["1f1f5-1f1f0"],fname:"1f1f5-1f1f0",uc:"1f1f5-1f1f0",isCanonical:!1},":flag_ph:":{unicode:["1f1f5-1f1ed"],fname:"1f1f5-1f1ed",uc:"1f1f5-1f1ed",isCanonical:!0},":ph:":{unicode:["1f1f5-1f1ed"],fname:"1f1f5-1f1ed",uc:"1f1f5-1f1ed",isCanonical:!1},":flag_pg:":{unicode:["1f1f5-1f1ec"],fname:"1f1f5-1f1ec",uc:"1f1f5-1f1ec",isCanonical:!0},":pg:":{unicode:["1f1f5-1f1ec"],fname:"1f1f5-1f1ec",uc:"1f1f5-1f1ec",isCanonical:!1},":flag_pf:":{unicode:["1f1f5-1f1eb"],fname:"1f1f5-1f1eb",uc:"1f1f5-1f1eb",isCanonical:!0},":pf:":{unicode:["1f1f5-1f1eb"],fname:"1f1f5-1f1eb",uc:"1f1f5-1f1eb",isCanonical:!1},":flag_pe:":{unicode:["1f1f5-1f1ea"],fname:"1f1f5-1f1ea",uc:"1f1f5-1f1ea",isCanonical:!0},":pe:":{unicode:["1f1f5-1f1ea"],fname:"1f1f5-1f1ea",uc:"1f1f5-1f1ea",isCanonical:!1},":flag_pa:":{unicode:["1f1f5-1f1e6"],fname:"1f1f5-1f1e6",uc:"1f1f5-1f1e6",isCanonical:!0},":pa:":{unicode:["1f1f5-1f1e6"],fname:"1f1f5-1f1e6",uc:"1f1f5-1f1e6",isCanonical:!1},":flag_om:":{unicode:["1f1f4-1f1f2"],fname:"1f1f4-1f1f2",uc:"1f1f4-1f1f2",isCanonical:!0},":om:":{unicode:["1f1f4-1f1f2"],fname:"1f1f4-1f1f2",uc:"1f1f4-1f1f2",isCanonical:!1},":flag_nz:":{unicode:["1f1f3-1f1ff"],fname:"1f1f3-1f1ff",uc:"1f1f3-1f1ff",isCanonical:!0},":nz:":{unicode:["1f1f3-1f1ff"],fname:"1f1f3-1f1ff",uc:"1f1f3-1f1ff",isCanonical:!1},":flag_nu:":{unicode:["1f1f3-1f1fa"],fname:"1f1f3-1f1fa",uc:"1f1f3-1f1fa",isCanonical:!0},":nu:":{unicode:["1f1f3-1f1fa"],fname:"1f1f3-1f1fa",uc:"1f1f3-1f1fa",isCanonical:!1},":flag_nr:":{unicode:["1f1f3-1f1f7"],fname:"1f1f3-1f1f7",uc:"1f1f3-1f1f7",isCanonical:!0},":nr:":{unicode:["1f1f3-1f1f7"],fname:"1f1f3-1f1f7",uc:"1f1f3-1f1f7",isCanonical:!1},":flag_np:":{unicode:["1f1f3-1f1f5"],fname:"1f1f3-1f1f5",uc:"1f1f3-1f1f5",isCanonical:!0},":np:":{unicode:["1f1f3-1f1f5"],fname:"1f1f3-1f1f5",uc:"1f1f3-1f1f5",isCanonical:!1},":flag_no:":{unicode:["1f1f3-1f1f4"],fname:"1f1f3-1f1f4",uc:"1f1f3-1f1f4",isCanonical:!0},":no:":{unicode:["1f1f3-1f1f4"],fname:"1f1f3-1f1f4",uc:"1f1f3-1f1f4",isCanonical:!1},":flag_nl:":{unicode:["1f1f3-1f1f1"],fname:"1f1f3-1f1f1",uc:"1f1f3-1f1f1",isCanonical:!0},":nl:":{unicode:["1f1f3-1f1f1"],fname:"1f1f3-1f1f1",uc:"1f1f3-1f1f1",isCanonical:!1},":flag_ni:":{unicode:["1f1f3-1f1ee"],fname:"1f1f3-1f1ee",uc:"1f1f3-1f1ee",isCanonical:!0},":ni:":{unicode:["1f1f3-1f1ee"],fname:"1f1f3-1f1ee",uc:"1f1f3-1f1ee",isCanonical:!1},":flag_ng:":{unicode:["1f1f3-1f1ec"],fname:"1f1f3-1f1ec",uc:"1f1f3-1f1ec",isCanonical:!0},":nigeria:":{unicode:["1f1f3-1f1ec"],fname:"1f1f3-1f1ec",uc:"1f1f3-1f1ec",isCanonical:!1},":flag_nf:":{unicode:["1f1f3-1f1eb"],fname:"1f1f3-1f1eb",uc:"1f1f3-1f1eb",isCanonical:!0},":nf:":{unicode:["1f1f3-1f1eb"],fname:"1f1f3-1f1eb",uc:"1f1f3-1f1eb",isCanonical:!1},":flag_ne:":{unicode:["1f1f3-1f1ea"],fname:"1f1f3-1f1ea",uc:"1f1f3-1f1ea",isCanonical:!0},":ne:":{unicode:["1f1f3-1f1ea"],fname:"1f1f3-1f1ea",uc:"1f1f3-1f1ea",isCanonical:!1},":flag_nc:":{unicode:["1f1f3-1f1e8"],fname:"1f1f3-1f1e8",uc:"1f1f3-1f1e8",isCanonical:!0},":nc:":{unicode:["1f1f3-1f1e8"],fname:"1f1f3-1f1e8",uc:"1f1f3-1f1e8",isCanonical:!1},":flag_na:":{unicode:["1f1f3-1f1e6"],fname:"1f1f3-1f1e6",uc:"1f1f3-1f1e6",isCanonical:!0},":na:":{unicode:["1f1f3-1f1e6"],fname:"1f1f3-1f1e6",uc:"1f1f3-1f1e6",isCanonical:!1},":flag_mz:":{unicode:["1f1f2-1f1ff"],fname:"1f1f2-1f1ff",uc:"1f1f2-1f1ff",isCanonical:!0},":mz:":{unicode:["1f1f2-1f1ff"],fname:"1f1f2-1f1ff",uc:"1f1f2-1f1ff",isCanonical:!1},":flag_my:":{unicode:["1f1f2-1f1fe"],fname:"1f1f2-1f1fe",uc:"1f1f2-1f1fe",isCanonical:!0},":my:":{unicode:["1f1f2-1f1fe"],fname:"1f1f2-1f1fe",uc:"1f1f2-1f1fe",isCanonical:!1},":flag_mx:":{unicode:["1f1f2-1f1fd"],fname:"1f1f2-1f1fd",uc:"1f1f2-1f1fd",isCanonical:!0},":mx:":{unicode:["1f1f2-1f1fd"],fname:"1f1f2-1f1fd",uc:"1f1f2-1f1fd",isCanonical:!1},":flag_mw:":{unicode:["1f1f2-1f1fc"],fname:"1f1f2-1f1fc",uc:"1f1f2-1f1fc",isCanonical:!0},":mw:":{unicode:["1f1f2-1f1fc"],fname:"1f1f2-1f1fc",uc:"1f1f2-1f1fc",isCanonical:!1},":flag_mv:":{unicode:["1f1f2-1f1fb"],fname:"1f1f2-1f1fb",uc:"1f1f2-1f1fb",isCanonical:!0},":mv:":{unicode:["1f1f2-1f1fb"],fname:"1f1f2-1f1fb",uc:"1f1f2-1f1fb",isCanonical:!1},":flag_mu:":{unicode:["1f1f2-1f1fa"],fname:"1f1f2-1f1fa",uc:"1f1f2-1f1fa",isCanonical:!0},":mu:":{unicode:["1f1f2-1f1fa"],fname:"1f1f2-1f1fa",uc:"1f1f2-1f1fa",isCanonical:!1},":flag_mt:":{unicode:["1f1f2-1f1f9"],fname:"1f1f2-1f1f9",uc:"1f1f2-1f1f9",isCanonical:!0},":mt:":{unicode:["1f1f2-1f1f9"],fname:"1f1f2-1f1f9",uc:"1f1f2-1f1f9",isCanonical:!1},":flag_ms:":{unicode:["1f1f2-1f1f8"],fname:"1f1f2-1f1f8",uc:"1f1f2-1f1f8",isCanonical:!0},":ms:":{unicode:["1f1f2-1f1f8"],fname:"1f1f2-1f1f8",uc:"1f1f2-1f1f8",isCanonical:!1},":flag_mr:":{unicode:["1f1f2-1f1f7"],fname:"1f1f2-1f1f7",uc:"1f1f2-1f1f7",isCanonical:!0},":mr:":{unicode:["1f1f2-1f1f7"],fname:"1f1f2-1f1f7",uc:"1f1f2-1f1f7",isCanonical:!1},":flag_mq:":{unicode:["1f1f2-1f1f6"],fname:"1f1f2-1f1f6",uc:"1f1f2-1f1f6",isCanonical:!0},":mq:":{unicode:["1f1f2-1f1f6"],fname:"1f1f2-1f1f6",uc:"1f1f2-1f1f6",isCanonical:!1},":flag_mp:":{unicode:["1f1f2-1f1f5"],fname:"1f1f2-1f1f5",uc:"1f1f2-1f1f5",isCanonical:!0},":mp:":{unicode:["1f1f2-1f1f5"],fname:"1f1f2-1f1f5",uc:"1f1f2-1f1f5",isCanonical:!1},":flag_mo:":{unicode:["1f1f2-1f1f4"],fname:"1f1f2-1f1f4",uc:"1f1f2-1f1f4",isCanonical:!0},":mo:":{unicode:["1f1f2-1f1f4"],fname:"1f1f2-1f1f4",uc:"1f1f2-1f1f4",isCanonical:!1},":flag_mn:":{unicode:["1f1f2-1f1f3"],fname:"1f1f2-1f1f3",uc:"1f1f2-1f1f3",isCanonical:!0},":mn:":{unicode:["1f1f2-1f1f3"],fname:"1f1f2-1f1f3",uc:"1f1f2-1f1f3",isCanonical:!1},":flag_mm:":{unicode:["1f1f2-1f1f2"],fname:"1f1f2-1f1f2",uc:"1f1f2-1f1f2",isCanonical:!0},":mm:":{unicode:["1f1f2-1f1f2"],fname:"1f1f2-1f1f2",uc:"1f1f2-1f1f2",isCanonical:!1},":flag_ml:":{unicode:["1f1f2-1f1f1"],fname:"1f1f2-1f1f1",uc:"1f1f2-1f1f1",isCanonical:!0},":ml:":{unicode:["1f1f2-1f1f1"],fname:"1f1f2-1f1f1",uc:"1f1f2-1f1f1",isCanonical:!1},":flag_mk:":{unicode:["1f1f2-1f1f0"],fname:"1f1f2-1f1f0",uc:"1f1f2-1f1f0",isCanonical:!0},":mk:":{unicode:["1f1f2-1f1f0"],fname:"1f1f2-1f1f0",uc:"1f1f2-1f1f0",isCanonical:!1},":flag_mh:":{unicode:["1f1f2-1f1ed"],fname:"1f1f2-1f1ed",uc:"1f1f2-1f1ed",isCanonical:!0},":mh:":{unicode:["1f1f2-1f1ed"],fname:"1f1f2-1f1ed",uc:"1f1f2-1f1ed",isCanonical:!1},":flag_mg:":{unicode:["1f1f2-1f1ec"],fname:"1f1f2-1f1ec",uc:"1f1f2-1f1ec",isCanonical:!0},":mg:":{unicode:["1f1f2-1f1ec"],fname:"1f1f2-1f1ec",uc:"1f1f2-1f1ec",isCanonical:!1},":flag_mf:":{unicode:["1f1f2-1f1eb"],fname:"1f1f2-1f1eb",uc:"1f1f2-1f1eb",isCanonical:!0},":mf:":{unicode:["1f1f2-1f1eb"],fname:"1f1f2-1f1eb",uc:"1f1f2-1f1eb",isCanonical:!1},":flag_me:":{unicode:["1f1f2-1f1ea"],fname:"1f1f2-1f1ea",uc:"1f1f2-1f1ea",isCanonical:!0},":me:":{unicode:["1f1f2-1f1ea"],fname:"1f1f2-1f1ea",uc:"1f1f2-1f1ea",isCanonical:!1},":flag_md:":{unicode:["1f1f2-1f1e9"],fname:"1f1f2-1f1e9",uc:"1f1f2-1f1e9",isCanonical:!0},":md:":{unicode:["1f1f2-1f1e9"],fname:"1f1f2-1f1e9",uc:"1f1f2-1f1e9",isCanonical:!1},":flag_mc:":{unicode:["1f1f2-1f1e8"],fname:"1f1f2-1f1e8",uc:"1f1f2-1f1e8",isCanonical:!0},":mc:":{unicode:["1f1f2-1f1e8"],fname:"1f1f2-1f1e8",uc:"1f1f2-1f1e8",isCanonical:!1},":flag_ma:":{unicode:["1f1f2-1f1e6"],fname:"1f1f2-1f1e6",uc:"1f1f2-1f1e6",isCanonical:!0},":ma:":{unicode:["1f1f2-1f1e6"],fname:"1f1f2-1f1e6",uc:"1f1f2-1f1e6",isCanonical:!1},":flag_ly:":{unicode:["1f1f1-1f1fe"],fname:"1f1f1-1f1fe",uc:"1f1f1-1f1fe",isCanonical:!0},":ly:":{unicode:["1f1f1-1f1fe"],fname:"1f1f1-1f1fe",uc:"1f1f1-1f1fe",isCanonical:!1},":flag_lv:":{unicode:["1f1f1-1f1fb"],fname:"1f1f1-1f1fb",uc:"1f1f1-1f1fb",isCanonical:!0},":lv:":{unicode:["1f1f1-1f1fb"],fname:"1f1f1-1f1fb",uc:"1f1f1-1f1fb",isCanonical:!1},":flag_lu:":{unicode:["1f1f1-1f1fa"],fname:"1f1f1-1f1fa",uc:"1f1f1-1f1fa",isCanonical:!0},":lu:":{unicode:["1f1f1-1f1fa"],fname:"1f1f1-1f1fa",uc:"1f1f1-1f1fa",isCanonical:!1},":flag_lt:":{unicode:["1f1f1-1f1f9"],fname:"1f1f1-1f1f9",uc:"1f1f1-1f1f9",isCanonical:!0},":lt:":{unicode:["1f1f1-1f1f9"],fname:"1f1f1-1f1f9",uc:"1f1f1-1f1f9",isCanonical:!1},":flag_ls:":{unicode:["1f1f1-1f1f8"],fname:"1f1f1-1f1f8",uc:"1f1f1-1f1f8",isCanonical:!0},":ls:":{unicode:["1f1f1-1f1f8"],fname:"1f1f1-1f1f8",uc:"1f1f1-1f1f8",isCanonical:!1},":flag_lr:":{unicode:["1f1f1-1f1f7"],fname:"1f1f1-1f1f7",uc:"1f1f1-1f1f7",isCanonical:!0},":lr:":{unicode:["1f1f1-1f1f7"],fname:"1f1f1-1f1f7",uc:"1f1f1-1f1f7",isCanonical:!1},":flag_lk:":{unicode:["1f1f1-1f1f0"],fname:"1f1f1-1f1f0",uc:"1f1f1-1f1f0",isCanonical:!0},":lk:":{unicode:["1f1f1-1f1f0"],fname:"1f1f1-1f1f0",uc:"1f1f1-1f1f0",isCanonical:!1},":flag_li:":{unicode:["1f1f1-1f1ee"],fname:"1f1f1-1f1ee",uc:"1f1f1-1f1ee",isCanonical:!0},":li:":{unicode:["1f1f1-1f1ee"],fname:"1f1f1-1f1ee",uc:"1f1f1-1f1ee",isCanonical:!1},":flag_lc:":{unicode:["1f1f1-1f1e8"],fname:"1f1f1-1f1e8",uc:"1f1f1-1f1e8",isCanonical:!0},":lc:":{unicode:["1f1f1-1f1e8"],fname:"1f1f1-1f1e8",uc:"1f1f1-1f1e8",isCanonical:!1},":flag_lb:":{unicode:["1f1f1-1f1e7"],fname:"1f1f1-1f1e7",uc:"1f1f1-1f1e7",isCanonical:!0},":lb:":{unicode:["1f1f1-1f1e7"],fname:"1f1f1-1f1e7",uc:"1f1f1-1f1e7",isCanonical:!1},":flag_la:":{unicode:["1f1f1-1f1e6"],fname:"1f1f1-1f1e6",uc:"1f1f1-1f1e6",isCanonical:!0},":la:":{unicode:["1f1f1-1f1e6"],fname:"1f1f1-1f1e6",uc:"1f1f1-1f1e6",isCanonical:!1},":flag_kz:":{unicode:["1f1f0-1f1ff"],fname:"1f1f0-1f1ff",uc:"1f1f0-1f1ff",isCanonical:!0},":kz:":{unicode:["1f1f0-1f1ff"],fname:"1f1f0-1f1ff",uc:"1f1f0-1f1ff",isCanonical:!1},":flag_ky:":{unicode:["1f1f0-1f1fe"],fname:"1f1f0-1f1fe",uc:"1f1f0-1f1fe",isCanonical:!0},":ky:":{unicode:["1f1f0-1f1fe"],fname:"1f1f0-1f1fe",uc:"1f1f0-1f1fe",isCanonical:!1},":flag_kw:":{unicode:["1f1f0-1f1fc"],fname:"1f1f0-1f1fc",uc:"1f1f0-1f1fc",isCanonical:!0},":kw:":{unicode:["1f1f0-1f1fc"],fname:"1f1f0-1f1fc",uc:"1f1f0-1f1fc",isCanonical:!1},":flag_kr:":{unicode:["1f1f0-1f1f7"],fname:"1f1f0-1f1f7",uc:"1f1f0-1f1f7",isCanonical:!0},":kr:":{unicode:["1f1f0-1f1f7"],fname:"1f1f0-1f1f7",uc:"1f1f0-1f1f7",isCanonical:!1},":flag_kp:":{unicode:["1f1f0-1f1f5"],fname:"1f1f0-1f1f5",uc:"1f1f0-1f1f5",isCanonical:!0},":kp:":{unicode:["1f1f0-1f1f5"],fname:"1f1f0-1f1f5",uc:"1f1f0-1f1f5",isCanonical:!1},":flag_kn:":{unicode:["1f1f0-1f1f3"],fname:"1f1f0-1f1f3",uc:"1f1f0-1f1f3",isCanonical:!0},":kn:":{unicode:["1f1f0-1f1f3"],fname:"1f1f0-1f1f3",uc:"1f1f0-1f1f3",isCanonical:!1},":flag_km:":{unicode:["1f1f0-1f1f2"],fname:"1f1f0-1f1f2",uc:"1f1f0-1f1f2",isCanonical:!0},":km:":{unicode:["1f1f0-1f1f2"],fname:"1f1f0-1f1f2",uc:"1f1f0-1f1f2",isCanonical:!1},":flag_ki:":{unicode:["1f1f0-1f1ee"],fname:"1f1f0-1f1ee",uc:"1f1f0-1f1ee",isCanonical:!0},":ki:":{unicode:["1f1f0-1f1ee"],fname:"1f1f0-1f1ee",uc:"1f1f0-1f1ee",isCanonical:!1},":flag_kh:":{unicode:["1f1f0-1f1ed"],fname:"1f1f0-1f1ed",uc:"1f1f0-1f1ed",isCanonical:!0},":kh:":{unicode:["1f1f0-1f1ed"],fname:"1f1f0-1f1ed",uc:"1f1f0-1f1ed",isCanonical:!1},":flag_kg:":{unicode:["1f1f0-1f1ec"],fname:"1f1f0-1f1ec",uc:"1f1f0-1f1ec",isCanonical:!0},":kg:":{unicode:["1f1f0-1f1ec"],fname:"1f1f0-1f1ec",uc:"1f1f0-1f1ec",isCanonical:!1},":flag_ke:":{unicode:["1f1f0-1f1ea"],fname:"1f1f0-1f1ea",uc:"1f1f0-1f1ea",isCanonical:!0},":ke:":{unicode:["1f1f0-1f1ea"],fname:"1f1f0-1f1ea",uc:"1f1f0-1f1ea",isCanonical:!1},":flag_jp:":{unicode:["1f1ef-1f1f5"],fname:"1f1ef-1f1f5",uc:"1f1ef-1f1f5",isCanonical:!0},":jp:":{unicode:["1f1ef-1f1f5"],fname:"1f1ef-1f1f5",uc:"1f1ef-1f1f5",isCanonical:!1},":flag_jo:":{unicode:["1f1ef-1f1f4"],fname:"1f1ef-1f1f4",uc:"1f1ef-1f1f4",isCanonical:!0},":jo:":{unicode:["1f1ef-1f1f4"],fname:"1f1ef-1f1f4",uc:"1f1ef-1f1f4",isCanonical:!1},":flag_jm:":{unicode:["1f1ef-1f1f2"],fname:"1f1ef-1f1f2",uc:"1f1ef-1f1f2",isCanonical:!0},":jm:":{unicode:["1f1ef-1f1f2"],fname:"1f1ef-1f1f2",uc:"1f1ef-1f1f2",isCanonical:!1},":flag_je:":{unicode:["1f1ef-1f1ea"],fname:"1f1ef-1f1ea",uc:"1f1ef-1f1ea",isCanonical:!0},":je:":{unicode:["1f1ef-1f1ea"],fname:"1f1ef-1f1ea",uc:"1f1ef-1f1ea",isCanonical:!1},":flag_it:":{unicode:["1f1ee-1f1f9"],fname:"1f1ee-1f1f9",uc:"1f1ee-1f1f9",isCanonical:!0},":it:":{unicode:["1f1ee-1f1f9"],fname:"1f1ee-1f1f9",uc:"1f1ee-1f1f9",isCanonical:!1},":flag_is:":{unicode:["1f1ee-1f1f8"],fname:"1f1ee-1f1f8",uc:"1f1ee-1f1f8",isCanonical:!0},":is:":{unicode:["1f1ee-1f1f8"],fname:"1f1ee-1f1f8",uc:"1f1ee-1f1f8",isCanonical:!1},":flag_ir:":{unicode:["1f1ee-1f1f7"],fname:"1f1ee-1f1f7",uc:"1f1ee-1f1f7",isCanonical:!0},":ir:":{unicode:["1f1ee-1f1f7"],fname:"1f1ee-1f1f7",uc:"1f1ee-1f1f7",isCanonical:!1},":flag_iq:":{unicode:["1f1ee-1f1f6"],fname:"1f1ee-1f1f6",uc:"1f1ee-1f1f6",isCanonical:!0},":iq:":{unicode:["1f1ee-1f1f6"],fname:"1f1ee-1f1f6",uc:"1f1ee-1f1f6",isCanonical:!1},":flag_io:":{unicode:["1f1ee-1f1f4"],fname:"1f1ee-1f1f4",uc:"1f1ee-1f1f4",isCanonical:!0},":io:":{unicode:["1f1ee-1f1f4"],fname:"1f1ee-1f1f4",uc:"1f1ee-1f1f4",isCanonical:!1},":flag_in:":{unicode:["1f1ee-1f1f3"],fname:"1f1ee-1f1f3",uc:"1f1ee-1f1f3",isCanonical:!0},":in:":{unicode:["1f1ee-1f1f3"],fname:"1f1ee-1f1f3",uc:"1f1ee-1f1f3",isCanonical:!1},":flag_im:":{unicode:["1f1ee-1f1f2"],fname:"1f1ee-1f1f2",uc:"1f1ee-1f1f2",isCanonical:!0},":im:":{unicode:["1f1ee-1f1f2"],fname:"1f1ee-1f1f2",uc:"1f1ee-1f1f2",isCanonical:!1},":flag_il:":{unicode:["1f1ee-1f1f1"],fname:"1f1ee-1f1f1",uc:"1f1ee-1f1f1",isCanonical:!0},":il:":{unicode:["1f1ee-1f1f1"],fname:"1f1ee-1f1f1",uc:"1f1ee-1f1f1",isCanonical:!1},":flag_ie:":{unicode:["1f1ee-1f1ea"],fname:"1f1ee-1f1ea",uc:"1f1ee-1f1ea",isCanonical:!0},":ie:":{unicode:["1f1ee-1f1ea"],fname:"1f1ee-1f1ea",uc:"1f1ee-1f1ea",isCanonical:!1},":flag_id:":{unicode:["1f1ee-1f1e9"],fname:"1f1ee-1f1e9",uc:"1f1ee-1f1e9",isCanonical:!0},":indonesia:":{unicode:["1f1ee-1f1e9"],fname:"1f1ee-1f1e9",uc:"1f1ee-1f1e9",isCanonical:!1},":flag_ic:":{unicode:["1f1ee-1f1e8"],fname:"1f1ee-1f1e8",uc:"1f1ee-1f1e8",isCanonical:!0},":ic:":{unicode:["1f1ee-1f1e8"],fname:"1f1ee-1f1e8",uc:"1f1ee-1f1e8",isCanonical:!1},":flag_hu:":{unicode:["1f1ed-1f1fa"],fname:"1f1ed-1f1fa",uc:"1f1ed-1f1fa",isCanonical:!0},":hu:":{unicode:["1f1ed-1f1fa"],fname:"1f1ed-1f1fa",uc:"1f1ed-1f1fa",isCanonical:!1},":flag_ht:":{unicode:["1f1ed-1f1f9"],fname:"1f1ed-1f1f9",uc:"1f1ed-1f1f9",isCanonical:!0},":ht:":{unicode:["1f1ed-1f1f9"],fname:"1f1ed-1f1f9",uc:"1f1ed-1f1f9",isCanonical:!1},":flag_hr:":{unicode:["1f1ed-1f1f7"],fname:"1f1ed-1f1f7",uc:"1f1ed-1f1f7",isCanonical:!0},":hr:":{unicode:["1f1ed-1f1f7"],fname:"1f1ed-1f1f7",uc:"1f1ed-1f1f7",isCanonical:!1},":flag_hn:":{unicode:["1f1ed-1f1f3"],fname:"1f1ed-1f1f3",uc:"1f1ed-1f1f3",isCanonical:!0},":hn:":{unicode:["1f1ed-1f1f3"],fname:"1f1ed-1f1f3",uc:"1f1ed-1f1f3",isCanonical:!1},":flag_hm:":{unicode:["1f1ed-1f1f2"],fname:"1f1ed-1f1f2",uc:"1f1ed-1f1f2",isCanonical:!0},":hm:":{unicode:["1f1ed-1f1f2"],fname:"1f1ed-1f1f2",uc:"1f1ed-1f1f2",isCanonical:!1},":flag_hk:":{unicode:["1f1ed-1f1f0"],fname:"1f1ed-1f1f0",uc:"1f1ed-1f1f0",isCanonical:!0},":hk:":{unicode:["1f1ed-1f1f0"],fname:"1f1ed-1f1f0",uc:"1f1ed-1f1f0",isCanonical:!1},":flag_gy:":{unicode:["1f1ec-1f1fe"],fname:"1f1ec-1f1fe",uc:"1f1ec-1f1fe",isCanonical:!0},":gy:":{unicode:["1f1ec-1f1fe"],fname:"1f1ec-1f1fe",uc:"1f1ec-1f1fe",isCanonical:!1},":flag_gw:":{unicode:["1f1ec-1f1fc"],fname:"1f1ec-1f1fc",uc:"1f1ec-1f1fc",isCanonical:!0},":gw:":{unicode:["1f1ec-1f1fc"],fname:"1f1ec-1f1fc",uc:"1f1ec-1f1fc",isCanonical:!1},":flag_gu:":{unicode:["1f1ec-1f1fa"],fname:"1f1ec-1f1fa",uc:"1f1ec-1f1fa",isCanonical:!0},":gu:":{unicode:["1f1ec-1f1fa"],fname:"1f1ec-1f1fa",uc:"1f1ec-1f1fa",isCanonical:!1},":flag_gt:":{unicode:["1f1ec-1f1f9"],fname:"1f1ec-1f1f9",uc:"1f1ec-1f1f9",isCanonical:!0},":gt:":{unicode:["1f1ec-1f1f9"],fname:"1f1ec-1f1f9",uc:"1f1ec-1f1f9",isCanonical:!1},":flag_gs:":{unicode:["1f1ec-1f1f8"],fname:"1f1ec-1f1f8",uc:"1f1ec-1f1f8",isCanonical:!0},":gs:":{unicode:["1f1ec-1f1f8"],fname:"1f1ec-1f1f8",uc:"1f1ec-1f1f8",isCanonical:!1},":flag_gr:":{unicode:["1f1ec-1f1f7"],fname:"1f1ec-1f1f7",uc:"1f1ec-1f1f7",isCanonical:!0},":gr:":{unicode:["1f1ec-1f1f7"],fname:"1f1ec-1f1f7",uc:"1f1ec-1f1f7",isCanonical:!1},":flag_gq:":{unicode:["1f1ec-1f1f6"],fname:"1f1ec-1f1f6",uc:"1f1ec-1f1f6",isCanonical:!0},":gq:":{unicode:["1f1ec-1f1f6"],fname:"1f1ec-1f1f6",uc:"1f1ec-1f1f6",isCanonical:!1},":flag_gp:":{unicode:["1f1ec-1f1f5"],fname:"1f1ec-1f1f5",uc:"1f1ec-1f1f5",isCanonical:!0},":gp:":{unicode:["1f1ec-1f1f5"],fname:"1f1ec-1f1f5",uc:"1f1ec-1f1f5",isCanonical:!1},":flag_gn:":{unicode:["1f1ec-1f1f3"],fname:"1f1ec-1f1f3",uc:"1f1ec-1f1f3",isCanonical:!0},":gn:":{unicode:["1f1ec-1f1f3"],fname:"1f1ec-1f1f3",uc:"1f1ec-1f1f3",isCanonical:!1},":flag_gm:":{unicode:["1f1ec-1f1f2"],fname:"1f1ec-1f1f2",uc:"1f1ec-1f1f2",isCanonical:!0},":gm:":{unicode:["1f1ec-1f1f2"],fname:"1f1ec-1f1f2",uc:"1f1ec-1f1f2",isCanonical:!1},":flag_gl:":{unicode:["1f1ec-1f1f1"],fname:"1f1ec-1f1f1",uc:"1f1ec-1f1f1",isCanonical:!0},":gl:":{unicode:["1f1ec-1f1f1"],fname:"1f1ec-1f1f1",uc:"1f1ec-1f1f1",isCanonical:!1},":flag_gi:":{unicode:["1f1ec-1f1ee"],fname:"1f1ec-1f1ee",uc:"1f1ec-1f1ee",isCanonical:!0},":gi:":{unicode:["1f1ec-1f1ee"],fname:"1f1ec-1f1ee",uc:"1f1ec-1f1ee",isCanonical:!1},":flag_gh:":{unicode:["1f1ec-1f1ed"],fname:"1f1ec-1f1ed",uc:"1f1ec-1f1ed",isCanonical:!0},":gh:":{unicode:["1f1ec-1f1ed"],fname:"1f1ec-1f1ed",uc:"1f1ec-1f1ed",isCanonical:!1},":flag_gg:":{unicode:["1f1ec-1f1ec"],fname:"1f1ec-1f1ec",uc:"1f1ec-1f1ec",isCanonical:!0},":gg:":{unicode:["1f1ec-1f1ec"],fname:"1f1ec-1f1ec",uc:"1f1ec-1f1ec",isCanonical:!1},":flag_gf:":{unicode:["1f1ec-1f1eb"],fname:"1f1ec-1f1eb",uc:"1f1ec-1f1eb",isCanonical:!0},":gf:":{unicode:["1f1ec-1f1eb"],fname:"1f1ec-1f1eb",uc:"1f1ec-1f1eb",isCanonical:!1},":flag_ge:":{unicode:["1f1ec-1f1ea"],fname:"1f1ec-1f1ea",uc:"1f1ec-1f1ea",isCanonical:!0},":ge:":{unicode:["1f1ec-1f1ea"],fname:"1f1ec-1f1ea",uc:"1f1ec-1f1ea",isCanonical:!1},":flag_gd:":{unicode:["1f1ec-1f1e9"],fname:"1f1ec-1f1e9",uc:"1f1ec-1f1e9",isCanonical:!0},":gd:":{unicode:["1f1ec-1f1e9"],fname:"1f1ec-1f1e9",uc:"1f1ec-1f1e9",isCanonical:!1},":flag_gb:":{unicode:["1f1ec-1f1e7"],fname:"1f1ec-1f1e7",uc:"1f1ec-1f1e7",isCanonical:!0},":gb:":{unicode:["1f1ec-1f1e7"],fname:"1f1ec-1f1e7",uc:"1f1ec-1f1e7",isCanonical:!1},":flag_ga:":{unicode:["1f1ec-1f1e6"],fname:"1f1ec-1f1e6",uc:"1f1ec-1f1e6",isCanonical:!0},":ga:":{unicode:["1f1ec-1f1e6"],fname:"1f1ec-1f1e6",uc:"1f1ec-1f1e6",isCanonical:!1},":flag_fr:":{unicode:["1f1eb-1f1f7"],fname:"1f1eb-1f1f7",uc:"1f1eb-1f1f7",isCanonical:!0},":fr:":{unicode:["1f1eb-1f1f7"],fname:"1f1eb-1f1f7",uc:"1f1eb-1f1f7",isCanonical:!1},":flag_fo:":{unicode:["1f1eb-1f1f4"],fname:"1f1eb-1f1f4",uc:"1f1eb-1f1f4",isCanonical:!0},":fo:":{unicode:["1f1eb-1f1f4"],fname:"1f1eb-1f1f4",uc:"1f1eb-1f1f4",isCanonical:!1},":flag_fm:":{unicode:["1f1eb-1f1f2"],fname:"1f1eb-1f1f2",uc:"1f1eb-1f1f2",isCanonical:!0},":fm:":{unicode:["1f1eb-1f1f2"],fname:"1f1eb-1f1f2",uc:"1f1eb-1f1f2",isCanonical:!1},":flag_fk:":{unicode:["1f1eb-1f1f0"],fname:"1f1eb-1f1f0",uc:"1f1eb-1f1f0",isCanonical:!0},":fk:":{unicode:["1f1eb-1f1f0"],fname:"1f1eb-1f1f0",uc:"1f1eb-1f1f0",isCanonical:!1},":flag_fj:":{unicode:["1f1eb-1f1ef"],fname:"1f1eb-1f1ef",uc:"1f1eb-1f1ef",isCanonical:!0},":fj:":{unicode:["1f1eb-1f1ef"],fname:"1f1eb-1f1ef",uc:"1f1eb-1f1ef",isCanonical:!1},":flag_fi:":{unicode:["1f1eb-1f1ee"],fname:"1f1eb-1f1ee",uc:"1f1eb-1f1ee",isCanonical:!0},":fi:":{unicode:["1f1eb-1f1ee"],fname:"1f1eb-1f1ee",uc:"1f1eb-1f1ee",isCanonical:!1},":flag_eu:":{unicode:["1f1ea-1f1fa"],fname:"1f1ea-1f1fa",uc:"1f1ea-1f1fa",isCanonical:!0},":eu:":{unicode:["1f1ea-1f1fa"],fname:"1f1ea-1f1fa",uc:"1f1ea-1f1fa",isCanonical:!1},":flag_et:":{unicode:["1f1ea-1f1f9"],fname:"1f1ea-1f1f9",uc:"1f1ea-1f1f9",isCanonical:!0},":et:":{unicode:["1f1ea-1f1f9"],fname:"1f1ea-1f1f9",uc:"1f1ea-1f1f9",isCanonical:!1},":flag_es:":{unicode:["1f1ea-1f1f8"],fname:"1f1ea-1f1f8",uc:"1f1ea-1f1f8",isCanonical:!0},":es:":{unicode:["1f1ea-1f1f8"],fname:"1f1ea-1f1f8",uc:"1f1ea-1f1f8",isCanonical:!1},":flag_er:":{unicode:["1f1ea-1f1f7"],fname:"1f1ea-1f1f7",uc:"1f1ea-1f1f7",isCanonical:!0},":er:":{unicode:["1f1ea-1f1f7"],fname:"1f1ea-1f1f7",uc:"1f1ea-1f1f7",isCanonical:!1},":flag_eh:":{unicode:["1f1ea-1f1ed"],fname:"1f1ea-1f1ed",uc:"1f1ea-1f1ed",isCanonical:!0},":eh:":{unicode:["1f1ea-1f1ed"],fname:"1f1ea-1f1ed",uc:"1f1ea-1f1ed",isCanonical:!1},":flag_eg:":{unicode:["1f1ea-1f1ec"],fname:"1f1ea-1f1ec",uc:"1f1ea-1f1ec",isCanonical:!0},":eg:":{unicode:["1f1ea-1f1ec"],fname:"1f1ea-1f1ec",uc:"1f1ea-1f1ec",isCanonical:!1},":flag_ee:":{unicode:["1f1ea-1f1ea"],fname:"1f1ea-1f1ea",uc:"1f1ea-1f1ea",isCanonical:!0},":ee:":{unicode:["1f1ea-1f1ea"],fname:"1f1ea-1f1ea",uc:"1f1ea-1f1ea",isCanonical:!1},":flag_ec:":{unicode:["1f1ea-1f1e8"],fname:"1f1ea-1f1e8",uc:"1f1ea-1f1e8",isCanonical:!0},":ec:":{unicode:["1f1ea-1f1e8"],fname:"1f1ea-1f1e8",uc:"1f1ea-1f1e8",isCanonical:!1},":flag_ea:":{unicode:["1f1ea-1f1e6"],fname:"1f1ea-1f1e6",uc:"1f1ea-1f1e6",isCanonical:!0},":ea:":{unicode:["1f1ea-1f1e6"],fname:"1f1ea-1f1e6",uc:"1f1ea-1f1e6",isCanonical:!1},":flag_dz:":{unicode:["1f1e9-1f1ff"],fname:"1f1e9-1f1ff",uc:"1f1e9-1f1ff",isCanonical:!0},":dz:":{unicode:["1f1e9-1f1ff"],fname:"1f1e9-1f1ff",uc:"1f1e9-1f1ff",isCanonical:!1},":flag_do:":{unicode:["1f1e9-1f1f4"],fname:"1f1e9-1f1f4",uc:"1f1e9-1f1f4",isCanonical:!0},":do:":{unicode:["1f1e9-1f1f4"],fname:"1f1e9-1f1f4",uc:"1f1e9-1f1f4",isCanonical:!1},":flag_dm:":{unicode:["1f1e9-1f1f2"],fname:"1f1e9-1f1f2",uc:"1f1e9-1f1f2",isCanonical:!0},":dm:":{unicode:["1f1e9-1f1f2"],fname:"1f1e9-1f1f2",uc:"1f1e9-1f1f2",isCanonical:!1},":flag_dk:":{unicode:["1f1e9-1f1f0"],fname:"1f1e9-1f1f0",uc:"1f1e9-1f1f0",isCanonical:!0},":dk:":{unicode:["1f1e9-1f1f0"],fname:"1f1e9-1f1f0",uc:"1f1e9-1f1f0",isCanonical:!1},":flag_dj:":{unicode:["1f1e9-1f1ef"],fname:"1f1e9-1f1ef",uc:"1f1e9-1f1ef",isCanonical:!0},":dj:":{unicode:["1f1e9-1f1ef"],fname:"1f1e9-1f1ef",uc:"1f1e9-1f1ef",isCanonical:!1},":flag_dg:":{unicode:["1f1e9-1f1ec"],fname:"1f1e9-1f1ec",uc:"1f1e9-1f1ec",isCanonical:!0},":dg:":{unicode:["1f1e9-1f1ec"],fname:"1f1e9-1f1ec",uc:"1f1e9-1f1ec",isCanonical:!1},":flag_de:":{unicode:["1f1e9-1f1ea"],fname:"1f1e9-1f1ea",uc:"1f1e9-1f1ea",isCanonical:!0},":de:":{unicode:["1f1e9-1f1ea"],fname:"1f1e9-1f1ea",uc:"1f1e9-1f1ea",isCanonical:!1},":flag_cz:":{unicode:["1f1e8-1f1ff"],fname:"1f1e8-1f1ff",uc:"1f1e8-1f1ff",isCanonical:!0},":cz:":{unicode:["1f1e8-1f1ff"],fname:"1f1e8-1f1ff",uc:"1f1e8-1f1ff",isCanonical:!1},":flag_cy:":{unicode:["1f1e8-1f1fe"],fname:"1f1e8-1f1fe",uc:"1f1e8-1f1fe",isCanonical:!0},":cy:":{unicode:["1f1e8-1f1fe"],fname:"1f1e8-1f1fe",uc:"1f1e8-1f1fe",isCanonical:!1},":flag_cx:":{unicode:["1f1e8-1f1fd"],fname:"1f1e8-1f1fd",uc:"1f1e8-1f1fd",isCanonical:!0},":cx:":{unicode:["1f1e8-1f1fd"],fname:"1f1e8-1f1fd",uc:"1f1e8-1f1fd",isCanonical:!1},":flag_cw:":{unicode:["1f1e8-1f1fc"],fname:"1f1e8-1f1fc",uc:"1f1e8-1f1fc",isCanonical:!0},":cw:":{unicode:["1f1e8-1f1fc"],fname:"1f1e8-1f1fc",uc:"1f1e8-1f1fc",isCanonical:!1},":flag_cv:":{unicode:["1f1e8-1f1fb"],fname:"1f1e8-1f1fb",uc:"1f1e8-1f1fb",isCanonical:!0},":cv:":{unicode:["1f1e8-1f1fb"],fname:"1f1e8-1f1fb",uc:"1f1e8-1f1fb",isCanonical:!1},":flag_cu:":{unicode:["1f1e8-1f1fa"],fname:"1f1e8-1f1fa",uc:"1f1e8-1f1fa",isCanonical:!0},":cu:":{unicode:["1f1e8-1f1fa"],fname:"1f1e8-1f1fa",uc:"1f1e8-1f1fa",isCanonical:!1},":flag_cr:":{unicode:["1f1e8-1f1f7"],fname:"1f1e8-1f1f7",uc:"1f1e8-1f1f7",isCanonical:!0},":cr:":{unicode:["1f1e8-1f1f7"],fname:"1f1e8-1f1f7",uc:"1f1e8-1f1f7",isCanonical:!1},":flag_cp:":{unicode:["1f1e8-1f1f5"],fname:"1f1e8-1f1f5",uc:"1f1e8-1f1f5",isCanonical:!0},":cp:":{unicode:["1f1e8-1f1f5"],fname:"1f1e8-1f1f5",uc:"1f1e8-1f1f5",isCanonical:!1},":flag_co:":{unicode:["1f1e8-1f1f4"],fname:"1f1e8-1f1f4",uc:"1f1e8-1f1f4",isCanonical:!0},":co:":{unicode:["1f1e8-1f1f4"],fname:"1f1e8-1f1f4",uc:"1f1e8-1f1f4",isCanonical:!1},":flag_cn:":{unicode:["1f1e8-1f1f3"],fname:"1f1e8-1f1f3",uc:"1f1e8-1f1f3",isCanonical:!0},":cn:":{unicode:["1f1e8-1f1f3"],fname:"1f1e8-1f1f3",uc:"1f1e8-1f1f3",isCanonical:!1},":flag_cm:":{unicode:["1f1e8-1f1f2"],fname:"1f1e8-1f1f2",uc:"1f1e8-1f1f2",isCanonical:!0},":cm:":{unicode:["1f1e8-1f1f2"],fname:"1f1e8-1f1f2",uc:"1f1e8-1f1f2",isCanonical:!1},":flag_cl:":{unicode:["1f1e8-1f1f1"],fname:"1f1e8-1f1f1",uc:"1f1e8-1f1f1",isCanonical:!0},":chile:":{unicode:["1f1e8-1f1f1"],fname:"1f1e8-1f1f1",uc:"1f1e8-1f1f1",isCanonical:!1},":flag_ck:":{unicode:["1f1e8-1f1f0"],fname:"1f1e8-1f1f0",uc:"1f1e8-1f1f0",isCanonical:!0},":ck:":{unicode:["1f1e8-1f1f0"],fname:"1f1e8-1f1f0",uc:"1f1e8-1f1f0",isCanonical:!1},":flag_ci:":{unicode:["1f1e8-1f1ee"],fname:"1f1e8-1f1ee",uc:"1f1e8-1f1ee",isCanonical:!0},":ci:":{unicode:["1f1e8-1f1ee"],fname:"1f1e8-1f1ee",uc:"1f1e8-1f1ee",isCanonical:!1},":flag_ch:":{unicode:["1f1e8-1f1ed"],fname:"1f1e8-1f1ed",uc:"1f1e8-1f1ed",isCanonical:!0},":ch:":{unicode:["1f1e8-1f1ed"],fname:"1f1e8-1f1ed",uc:"1f1e8-1f1ed",isCanonical:!1},":flag_cg:":{unicode:["1f1e8-1f1ec"],fname:"1f1e8-1f1ec",uc:"1f1e8-1f1ec",isCanonical:!0},":cg:":{unicode:["1f1e8-1f1ec"],fname:"1f1e8-1f1ec",uc:"1f1e8-1f1ec",isCanonical:!1},":flag_cf:":{unicode:["1f1e8-1f1eb"],fname:"1f1e8-1f1eb",uc:"1f1e8-1f1eb",isCanonical:!0},":cf:":{unicode:["1f1e8-1f1eb"],fname:"1f1e8-1f1eb",uc:"1f1e8-1f1eb",isCanonical:!1},":flag_cd:":{unicode:["1f1e8-1f1e9"],fname:"1f1e8-1f1e9",uc:"1f1e8-1f1e9",isCanonical:!0},":congo:":{unicode:["1f1e8-1f1e9"],fname:"1f1e8-1f1e9",uc:"1f1e8-1f1e9",isCanonical:!1},":flag_cc:":{unicode:["1f1e8-1f1e8"],fname:"1f1e8-1f1e8",uc:"1f1e8-1f1e8",isCanonical:!0},":cc:":{unicode:["1f1e8-1f1e8"],fname:"1f1e8-1f1e8",uc:"1f1e8-1f1e8",isCanonical:!1},":flag_ca:":{unicode:["1f1e8-1f1e6"],fname:"1f1e8-1f1e6",uc:"1f1e8-1f1e6",isCanonical:!0},":ca:":{unicode:["1f1e8-1f1e6"],fname:"1f1e8-1f1e6",uc:"1f1e8-1f1e6",isCanonical:!1},":flag_bz:":{unicode:["1f1e7-1f1ff"],fname:"1f1e7-1f1ff",uc:"1f1e7-1f1ff",isCanonical:!0},":bz:":{unicode:["1f1e7-1f1ff"],fname:"1f1e7-1f1ff",uc:"1f1e7-1f1ff",isCanonical:!1},":flag_by:":{unicode:["1f1e7-1f1fe"],fname:"1f1e7-1f1fe",uc:"1f1e7-1f1fe",isCanonical:!0},":by:":{unicode:["1f1e7-1f1fe"],fname:"1f1e7-1f1fe",uc:"1f1e7-1f1fe",isCanonical:!1},":flag_bw:":{unicode:["1f1e7-1f1fc"],fname:"1f1e7-1f1fc",uc:"1f1e7-1f1fc",isCanonical:!0},":bw:":{unicode:["1f1e7-1f1fc"],fname:"1f1e7-1f1fc",uc:"1f1e7-1f1fc",isCanonical:!1},":flag_bv:":{unicode:["1f1e7-1f1fb"],fname:"1f1e7-1f1fb",uc:"1f1e7-1f1fb",isCanonical:!0},":bv:":{unicode:["1f1e7-1f1fb"],fname:"1f1e7-1f1fb",
uc:"1f1e7-1f1fb",isCanonical:!1},":flag_bt:":{unicode:["1f1e7-1f1f9"],fname:"1f1e7-1f1f9",uc:"1f1e7-1f1f9",isCanonical:!0},":bt:":{unicode:["1f1e7-1f1f9"],fname:"1f1e7-1f1f9",uc:"1f1e7-1f1f9",isCanonical:!1},":flag_bs:":{unicode:["1f1e7-1f1f8"],fname:"1f1e7-1f1f8",uc:"1f1e7-1f1f8",isCanonical:!0},":bs:":{unicode:["1f1e7-1f1f8"],fname:"1f1e7-1f1f8",uc:"1f1e7-1f1f8",isCanonical:!1},":flag_br:":{unicode:["1f1e7-1f1f7"],fname:"1f1e7-1f1f7",uc:"1f1e7-1f1f7",isCanonical:!0},":br:":{unicode:["1f1e7-1f1f7"],fname:"1f1e7-1f1f7",uc:"1f1e7-1f1f7",isCanonical:!1},":flag_bq:":{unicode:["1f1e7-1f1f6"],fname:"1f1e7-1f1f6",uc:"1f1e7-1f1f6",isCanonical:!0},":bq:":{unicode:["1f1e7-1f1f6"],fname:"1f1e7-1f1f6",uc:"1f1e7-1f1f6",isCanonical:!1},":flag_bo:":{unicode:["1f1e7-1f1f4"],fname:"1f1e7-1f1f4",uc:"1f1e7-1f1f4",isCanonical:!0},":bo:":{unicode:["1f1e7-1f1f4"],fname:"1f1e7-1f1f4",uc:"1f1e7-1f1f4",isCanonical:!1},":flag_bn:":{unicode:["1f1e7-1f1f3"],fname:"1f1e7-1f1f3",uc:"1f1e7-1f1f3",isCanonical:!0},":bn:":{unicode:["1f1e7-1f1f3"],fname:"1f1e7-1f1f3",uc:"1f1e7-1f1f3",isCanonical:!1},":flag_bm:":{unicode:["1f1e7-1f1f2"],fname:"1f1e7-1f1f2",uc:"1f1e7-1f1f2",isCanonical:!0},":bm:":{unicode:["1f1e7-1f1f2"],fname:"1f1e7-1f1f2",uc:"1f1e7-1f1f2",isCanonical:!1},":flag_bl:":{unicode:["1f1e7-1f1f1"],fname:"1f1e7-1f1f1",uc:"1f1e7-1f1f1",isCanonical:!0},":bl:":{unicode:["1f1e7-1f1f1"],fname:"1f1e7-1f1f1",uc:"1f1e7-1f1f1",isCanonical:!1},":flag_bj:":{unicode:["1f1e7-1f1ef"],fname:"1f1e7-1f1ef",uc:"1f1e7-1f1ef",isCanonical:!0},":bj:":{unicode:["1f1e7-1f1ef"],fname:"1f1e7-1f1ef",uc:"1f1e7-1f1ef",isCanonical:!1},":flag_bi:":{unicode:["1f1e7-1f1ee"],fname:"1f1e7-1f1ee",uc:"1f1e7-1f1ee",isCanonical:!0},":bi:":{unicode:["1f1e7-1f1ee"],fname:"1f1e7-1f1ee",uc:"1f1e7-1f1ee",isCanonical:!1},":flag_bh:":{unicode:["1f1e7-1f1ed"],fname:"1f1e7-1f1ed",uc:"1f1e7-1f1ed",isCanonical:!0},":bh:":{unicode:["1f1e7-1f1ed"],fname:"1f1e7-1f1ed",uc:"1f1e7-1f1ed",isCanonical:!1},":flag_bg:":{unicode:["1f1e7-1f1ec"],fname:"1f1e7-1f1ec",uc:"1f1e7-1f1ec",isCanonical:!0},":bg:":{unicode:["1f1e7-1f1ec"],fname:"1f1e7-1f1ec",uc:"1f1e7-1f1ec",isCanonical:!1},":flag_bf:":{unicode:["1f1e7-1f1eb"],fname:"1f1e7-1f1eb",uc:"1f1e7-1f1eb",isCanonical:!0},":bf:":{unicode:["1f1e7-1f1eb"],fname:"1f1e7-1f1eb",uc:"1f1e7-1f1eb",isCanonical:!1},":flag_be:":{unicode:["1f1e7-1f1ea"],fname:"1f1e7-1f1ea",uc:"1f1e7-1f1ea",isCanonical:!0},":be:":{unicode:["1f1e7-1f1ea"],fname:"1f1e7-1f1ea",uc:"1f1e7-1f1ea",isCanonical:!1},":flag_bd:":{unicode:["1f1e7-1f1e9"],fname:"1f1e7-1f1e9",uc:"1f1e7-1f1e9",isCanonical:!0},":bd:":{unicode:["1f1e7-1f1e9"],fname:"1f1e7-1f1e9",uc:"1f1e7-1f1e9",isCanonical:!1},":flag_bb:":{unicode:["1f1e7-1f1e7"],fname:"1f1e7-1f1e7",uc:"1f1e7-1f1e7",isCanonical:!0},":bb:":{unicode:["1f1e7-1f1e7"],fname:"1f1e7-1f1e7",uc:"1f1e7-1f1e7",isCanonical:!1},":flag_ba:":{unicode:["1f1e7-1f1e6"],fname:"1f1e7-1f1e6",uc:"1f1e7-1f1e6",isCanonical:!0},":ba:":{unicode:["1f1e7-1f1e6"],fname:"1f1e7-1f1e6",uc:"1f1e7-1f1e6",isCanonical:!1},":flag_az:":{unicode:["1f1e6-1f1ff"],fname:"1f1e6-1f1ff",uc:"1f1e6-1f1ff",isCanonical:!0},":az:":{unicode:["1f1e6-1f1ff"],fname:"1f1e6-1f1ff",uc:"1f1e6-1f1ff",isCanonical:!1},":flag_ax:":{unicode:["1f1e6-1f1fd"],fname:"1f1e6-1f1fd",uc:"1f1e6-1f1fd",isCanonical:!0},":ax:":{unicode:["1f1e6-1f1fd"],fname:"1f1e6-1f1fd",uc:"1f1e6-1f1fd",isCanonical:!1},":flag_aw:":{unicode:["1f1e6-1f1fc"],fname:"1f1e6-1f1fc",uc:"1f1e6-1f1fc",isCanonical:!0},":aw:":{unicode:["1f1e6-1f1fc"],fname:"1f1e6-1f1fc",uc:"1f1e6-1f1fc",isCanonical:!1},":flag_au:":{unicode:["1f1e6-1f1fa"],fname:"1f1e6-1f1fa",uc:"1f1e6-1f1fa",isCanonical:!0},":au:":{unicode:["1f1e6-1f1fa"],fname:"1f1e6-1f1fa",uc:"1f1e6-1f1fa",isCanonical:!1},":flag_at:":{unicode:["1f1e6-1f1f9"],fname:"1f1e6-1f1f9",uc:"1f1e6-1f1f9",isCanonical:!0},":at:":{unicode:["1f1e6-1f1f9"],fname:"1f1e6-1f1f9",uc:"1f1e6-1f1f9",isCanonical:!1},":flag_as:":{unicode:["1f1e6-1f1f8"],fname:"1f1e6-1f1f8",uc:"1f1e6-1f1f8",isCanonical:!0},":as:":{unicode:["1f1e6-1f1f8"],fname:"1f1e6-1f1f8",uc:"1f1e6-1f1f8",isCanonical:!1},":flag_ar:":{unicode:["1f1e6-1f1f7"],fname:"1f1e6-1f1f7",uc:"1f1e6-1f1f7",isCanonical:!0},":ar:":{unicode:["1f1e6-1f1f7"],fname:"1f1e6-1f1f7",uc:"1f1e6-1f1f7",isCanonical:!1},":flag_aq:":{unicode:["1f1e6-1f1f6"],fname:"1f1e6-1f1f6",uc:"1f1e6-1f1f6",isCanonical:!0},":aq:":{unicode:["1f1e6-1f1f6"],fname:"1f1e6-1f1f6",uc:"1f1e6-1f1f6",isCanonical:!1},":flag_ao:":{unicode:["1f1e6-1f1f4"],fname:"1f1e6-1f1f4",uc:"1f1e6-1f1f4",isCanonical:!0},":ao:":{unicode:["1f1e6-1f1f4"],fname:"1f1e6-1f1f4",uc:"1f1e6-1f1f4",isCanonical:!1},":flag_am:":{unicode:["1f1e6-1f1f2"],fname:"1f1e6-1f1f2",uc:"1f1e6-1f1f2",isCanonical:!0},":am:":{unicode:["1f1e6-1f1f2"],fname:"1f1e6-1f1f2",uc:"1f1e6-1f1f2",isCanonical:!1},":flag_al:":{unicode:["1f1e6-1f1f1"],fname:"1f1e6-1f1f1",uc:"1f1e6-1f1f1",isCanonical:!0},":al:":{unicode:["1f1e6-1f1f1"],fname:"1f1e6-1f1f1",uc:"1f1e6-1f1f1",isCanonical:!1},":flag_ai:":{unicode:["1f1e6-1f1ee"],fname:"1f1e6-1f1ee",uc:"1f1e6-1f1ee",isCanonical:!0},":ai:":{unicode:["1f1e6-1f1ee"],fname:"1f1e6-1f1ee",uc:"1f1e6-1f1ee",isCanonical:!1},":flag_ag:":{unicode:["1f1e6-1f1ec"],fname:"1f1e6-1f1ec",uc:"1f1e6-1f1ec",isCanonical:!0},":ag:":{unicode:["1f1e6-1f1ec"],fname:"1f1e6-1f1ec",uc:"1f1e6-1f1ec",isCanonical:!1},":flag_af:":{unicode:["1f1e6-1f1eb"],fname:"1f1e6-1f1eb",uc:"1f1e6-1f1eb",isCanonical:!0},":af:":{unicode:["1f1e6-1f1eb"],fname:"1f1e6-1f1eb",uc:"1f1e6-1f1eb",isCanonical:!1},":flag_ae:":{unicode:["1f1e6-1f1ea"],fname:"1f1e6-1f1ea",uc:"1f1e6-1f1ea",isCanonical:!0},":ae:":{unicode:["1f1e6-1f1ea"],fname:"1f1e6-1f1ea",uc:"1f1e6-1f1ea",isCanonical:!1},":flag_ad:":{unicode:["1f1e6-1f1e9"],fname:"1f1e6-1f1e9",uc:"1f1e6-1f1e9",isCanonical:!0},":ad:":{unicode:["1f1e6-1f1e9"],fname:"1f1e6-1f1e9",uc:"1f1e6-1f1e9",isCanonical:!1},":flag_ac:":{unicode:["1f1e6-1f1e8"],fname:"1f1e6-1f1e8",uc:"1f1e6-1f1e8",isCanonical:!0},":ac:":{unicode:["1f1e6-1f1e8"],fname:"1f1e6-1f1e8",uc:"1f1e6-1f1e8",isCanonical:!1},":mahjong:":{unicode:["1f004-fe0f","1f004"],fname:"1f004",uc:"1f004",isCanonical:!0},":parking:":{unicode:["1f17f-fe0f","1f17f"],fname:"1f17f",uc:"1f17f",isCanonical:!0},":sa:":{unicode:["1f202-fe0f","1f202"],fname:"1f202",uc:"1f202",isCanonical:!0},":u7121:":{unicode:["1f21a-fe0f","1f21a"],fname:"1f21a",uc:"1f21a",isCanonical:!0},":u6307:":{unicode:["1f22f-fe0f","1f22f"],fname:"1f22f",uc:"1f22f",isCanonical:!0},":u6708:":{unicode:["1f237-fe0f","1f237"],fname:"1f237",uc:"1f237",isCanonical:!0},":film_frames:":{unicode:["1f39e-fe0f","1f39e"],fname:"1f39e",uc:"1f39e",isCanonical:!0},":tickets:":{unicode:["1f39f-fe0f","1f39f"],fname:"1f39f",uc:"1f39f",isCanonical:!0},":admission_tickets:":{unicode:["1f39f-fe0f","1f39f"],fname:"1f39f",uc:"1f39f",isCanonical:!1},":lifter:":{unicode:["1f3cb-fe0f","1f3cb"],fname:"1f3cb",uc:"1f3cb",isCanonical:!0},":weight_lifter:":{unicode:["1f3cb-fe0f","1f3cb"],fname:"1f3cb",uc:"1f3cb",isCanonical:!1},":golfer:":{unicode:["1f3cc-fe0f","1f3cc"],fname:"1f3cc",uc:"1f3cc",isCanonical:!0},":motorcycle:":{unicode:["1f3cd-fe0f","1f3cd"],fname:"1f3cd",uc:"1f3cd",isCanonical:!0},":racing_motorcycle:":{unicode:["1f3cd-fe0f","1f3cd"],fname:"1f3cd",uc:"1f3cd",isCanonical:!1},":race_car:":{unicode:["1f3ce-fe0f","1f3ce"],fname:"1f3ce",uc:"1f3ce",isCanonical:!0},":racing_car:":{unicode:["1f3ce-fe0f","1f3ce"],fname:"1f3ce",uc:"1f3ce",isCanonical:!1},":military_medal:":{unicode:["1f396-fe0f","1f396"],fname:"1f396",uc:"1f396",isCanonical:!0},":reminder_ribbon:":{unicode:["1f397-fe0f","1f397"],fname:"1f397",uc:"1f397",isCanonical:!0},":hot_pepper:":{unicode:["1f336-fe0f","1f336"],fname:"1f336",uc:"1f336",isCanonical:!0},":cloud_rain:":{unicode:["1f327-fe0f","1f327"],fname:"1f327",uc:"1f327",isCanonical:!0},":cloud_with_rain:":{unicode:["1f327-fe0f","1f327"],fname:"1f327",uc:"1f327",isCanonical:!1},":cloud_snow:":{unicode:["1f328-fe0f","1f328"],fname:"1f328",uc:"1f328",isCanonical:!0},":cloud_with_snow:":{unicode:["1f328-fe0f","1f328"],fname:"1f328",uc:"1f328",isCanonical:!1},":cloud_lightning:":{unicode:["1f329-fe0f","1f329"],fname:"1f329",uc:"1f329",isCanonical:!0},":cloud_with_lightning:":{unicode:["1f329-fe0f","1f329"],fname:"1f329",uc:"1f329",isCanonical:!1},":cloud_tornado:":{unicode:["1f32a-fe0f","1f32a"],fname:"1f32a",uc:"1f32a",isCanonical:!0},":cloud_with_tornado:":{unicode:["1f32a-fe0f","1f32a"],fname:"1f32a",uc:"1f32a",isCanonical:!1},":fog:":{unicode:["1f32b-fe0f","1f32b"],fname:"1f32b",uc:"1f32b",isCanonical:!0},":wind_blowing_face:":{unicode:["1f32c-fe0f","1f32c"],fname:"1f32c",uc:"1f32c",isCanonical:!0},":chipmunk:":{unicode:["1f43f-fe0f","1f43f"],fname:"1f43f",uc:"1f43f",isCanonical:!0},":spider:":{unicode:["1f577-fe0f","1f577"],fname:"1f577",uc:"1f577",isCanonical:!0},":spider_web:":{unicode:["1f578-fe0f","1f578"],fname:"1f578",uc:"1f578",isCanonical:!0},":thermometer:":{unicode:["1f321-fe0f","1f321"],fname:"1f321",uc:"1f321",isCanonical:!0},":microphone2:":{unicode:["1f399-fe0f","1f399"],fname:"1f399",uc:"1f399",isCanonical:!0},":studio_microphone:":{unicode:["1f399-fe0f","1f399"],fname:"1f399",uc:"1f399",isCanonical:!1},":level_slider:":{unicode:["1f39a-fe0f","1f39a"],fname:"1f39a",uc:"1f39a",isCanonical:!0},":control_knobs:":{unicode:["1f39b-fe0f","1f39b"],fname:"1f39b",uc:"1f39b",isCanonical:!0},":flag_white:":{unicode:["1f3f3-fe0f","1f3f3"],fname:"1f3f3",uc:"1f3f3",isCanonical:!0},":waving_white_flag:":{unicode:["1f3f3-fe0f","1f3f3"],fname:"1f3f3",uc:"1f3f3",isCanonical:!1},":rosette:":{unicode:["1f3f5-fe0f","1f3f5"],fname:"1f3f5",uc:"1f3f5",isCanonical:!0},":label:":{unicode:["1f3f7-fe0f","1f3f7"],fname:"1f3f7",uc:"1f3f7",isCanonical:!0},":projector:":{unicode:["1f4fd-fe0f","1f4fd"],fname:"1f4fd",uc:"1f4fd",isCanonical:!0},":film_projector:":{unicode:["1f4fd-fe0f","1f4fd"],fname:"1f4fd",uc:"1f4fd",isCanonical:!1},":om_symbol:":{unicode:["1f549-fe0f","1f549"],fname:"1f549",uc:"1f549",isCanonical:!0},":dove:":{unicode:["1f54a-fe0f","1f54a"],fname:"1f54a",uc:"1f54a",isCanonical:!0},":dove_of_peace:":{unicode:["1f54a-fe0f","1f54a"],fname:"1f54a",uc:"1f54a",isCanonical:!1},":candle:":{unicode:["1f56f-fe0f","1f56f"],fname:"1f56f",uc:"1f56f",isCanonical:!0},":clock:":{unicode:["1f570-fe0f","1f570"],fname:"1f570",uc:"1f570",isCanonical:!0},":mantlepiece_clock:":{unicode:["1f570-fe0f","1f570"],fname:"1f570",uc:"1f570",isCanonical:!1},":hole:":{unicode:["1f573-fe0f","1f573"],fname:"1f573",uc:"1f573",isCanonical:!0},":dark_sunglasses:":{unicode:["1f576-fe0f","1f576"],fname:"1f576",uc:"1f576",isCanonical:!0},":joystick:":{unicode:["1f579-fe0f","1f579"],fname:"1f579",uc:"1f579",isCanonical:!0},":paperclips:":{unicode:["1f587-fe0f","1f587"],fname:"1f587",uc:"1f587",isCanonical:!0},":linked_paperclips:":{unicode:["1f587-fe0f","1f587"],fname:"1f587",uc:"1f587",isCanonical:!1},":pen_ballpoint:":{unicode:["1f58a-fe0f","1f58a"],fname:"1f58a",uc:"1f58a",isCanonical:!0},":lower_left_ballpoint_pen:":{unicode:["1f58a-fe0f","1f58a"],fname:"1f58a",uc:"1f58a",isCanonical:!1},":pen_fountain:":{unicode:["1f58b-fe0f","1f58b"],fname:"1f58b",uc:"1f58b",isCanonical:!0},":lower_left_fountain_pen:":{unicode:["1f58b-fe0f","1f58b"],fname:"1f58b",uc:"1f58b",isCanonical:!1},":paintbrush:":{unicode:["1f58c-fe0f","1f58c"],fname:"1f58c",uc:"1f58c",isCanonical:!0},":lower_left_paintbrush:":{unicode:["1f58c-fe0f","1f58c"],fname:"1f58c",uc:"1f58c",isCanonical:!1},":crayon:":{unicode:["1f58d-fe0f","1f58d"],fname:"1f58d",uc:"1f58d",isCanonical:!0},":lower_left_crayon:":{unicode:["1f58d-fe0f","1f58d"],fname:"1f58d",uc:"1f58d",isCanonical:!1},":desktop:":{unicode:["1f5a5-fe0f","1f5a5"],fname:"1f5a5",uc:"1f5a5",isCanonical:!0},":desktop_computer:":{unicode:["1f5a5-fe0f","1f5a5"],fname:"1f5a5",uc:"1f5a5",isCanonical:!1},":printer:":{unicode:["1f5a8-fe0f","1f5a8"],fname:"1f5a8",uc:"1f5a8",isCanonical:!0},":trackball:":{unicode:["1f5b2-fe0f","1f5b2"],fname:"1f5b2",uc:"1f5b2",isCanonical:!0},":frame_photo:":{unicode:["1f5bc-fe0f","1f5bc"],fname:"1f5bc",uc:"1f5bc",isCanonical:!0},":frame_with_picture:":{unicode:["1f5bc-fe0f","1f5bc"],fname:"1f5bc",uc:"1f5bc",isCanonical:!1},":dividers:":{unicode:["1f5c2-fe0f","1f5c2"],fname:"1f5c2",uc:"1f5c2",isCanonical:!0},":card_index_dividers:":{unicode:["1f5c2-fe0f","1f5c2"],fname:"1f5c2",uc:"1f5c2",isCanonical:!1},":card_box:":{unicode:["1f5c3-fe0f","1f5c3"],fname:"1f5c3",uc:"1f5c3",isCanonical:!0},":card_file_box:":{unicode:["1f5c3-fe0f","1f5c3"],fname:"1f5c3",uc:"1f5c3",isCanonical:!1},":file_cabinet:":{unicode:["1f5c4-fe0f","1f5c4"],fname:"1f5c4",uc:"1f5c4",isCanonical:!0},":wastebasket:":{unicode:["1f5d1-fe0f","1f5d1"],fname:"1f5d1",uc:"1f5d1",isCanonical:!0},":notepad_spiral:":{unicode:["1f5d2-fe0f","1f5d2"],fname:"1f5d2",uc:"1f5d2",isCanonical:!0},":spiral_note_pad:":{unicode:["1f5d2-fe0f","1f5d2"],fname:"1f5d2",uc:"1f5d2",isCanonical:!1},":calendar_spiral:":{unicode:["1f5d3-fe0f","1f5d3"],fname:"1f5d3",uc:"1f5d3",isCanonical:!0},":spiral_calendar_pad:":{unicode:["1f5d3-fe0f","1f5d3"],fname:"1f5d3",uc:"1f5d3",isCanonical:!1},":compression:":{unicode:["1f5dc-fe0f","1f5dc"],fname:"1f5dc",uc:"1f5dc",isCanonical:!0},":key2:":{unicode:["1f5dd-fe0f","1f5dd"],fname:"1f5dd",uc:"1f5dd",isCanonical:!0},":old_key:":{unicode:["1f5dd-fe0f","1f5dd"],fname:"1f5dd",uc:"1f5dd",isCanonical:!1},":newspaper2:":{unicode:["1f5de-fe0f","1f5de"],fname:"1f5de",uc:"1f5de",isCanonical:!0},":rolled_up_newspaper:":{unicode:["1f5de-fe0f","1f5de"],fname:"1f5de",uc:"1f5de",isCanonical:!1},":dagger:":{unicode:["1f5e1-fe0f","1f5e1"],fname:"1f5e1",uc:"1f5e1",isCanonical:!0},":dagger_knife:":{unicode:["1f5e1-fe0f","1f5e1"],fname:"1f5e1",uc:"1f5e1",isCanonical:!1},":speaking_head:":{unicode:["1f5e3-fe0f","1f5e3"],fname:"1f5e3",uc:"1f5e3",isCanonical:!0},":speaking_head_in_silhouette:":{unicode:["1f5e3-fe0f","1f5e3"],fname:"1f5e3",uc:"1f5e3",isCanonical:!1},":speech_left:":{unicode:["1f5e8-fe0f","1f5e8"],fname:"1f5e8",uc:"1f5e8",isCanonical:!0},":left_speech_bubble:":{unicode:["1f5e8-fe0f","1f5e8"],fname:"1f5e8",uc:"1f5e8",isCanonical:!1},":anger_right:":{unicode:["1f5ef-fe0f","1f5ef"],fname:"1f5ef",uc:"1f5ef",isCanonical:!0},":right_anger_bubble:":{unicode:["1f5ef-fe0f","1f5ef"],fname:"1f5ef",uc:"1f5ef",isCanonical:!1},":ballot_box:":{unicode:["1f5f3-fe0f","1f5f3"],fname:"1f5f3",uc:"1f5f3",isCanonical:!0},":ballot_box_with_ballot:":{unicode:["1f5f3-fe0f","1f5f3"],fname:"1f5f3",uc:"1f5f3",isCanonical:!1},":map:":{unicode:["1f5fa-fe0f","1f5fa"],fname:"1f5fa",uc:"1f5fa",isCanonical:!0},":world_map:":{unicode:["1f5fa-fe0f","1f5fa"],fname:"1f5fa",uc:"1f5fa",isCanonical:!1},":tools:":{unicode:["1f6e0-fe0f","1f6e0"],fname:"1f6e0",uc:"1f6e0",isCanonical:!0},":hammer_and_wrench:":{unicode:["1f6e0-fe0f","1f6e0"],fname:"1f6e0",uc:"1f6e0",isCanonical:!1},":shield:":{unicode:["1f6e1-fe0f","1f6e1"],fname:"1f6e1",uc:"1f6e1",isCanonical:!0},":oil:":{unicode:["1f6e2-fe0f","1f6e2"],fname:"1f6e2",uc:"1f6e2",isCanonical:!0},":oil_drum:":{unicode:["1f6e2-fe0f","1f6e2"],fname:"1f6e2",uc:"1f6e2",isCanonical:!1},":satellite_orbital:":{unicode:["1f6f0-fe0f","1f6f0"],fname:"1f6f0",uc:"1f6f0",isCanonical:!0},":fork_knife_plate:":{unicode:["1f37d-fe0f","1f37d"],fname:"1f37d",uc:"1f37d",isCanonical:!0},":fork_and_knife_with_plate:":{unicode:["1f37d-fe0f","1f37d"],fname:"1f37d",uc:"1f37d",isCanonical:!1},":eye:":{unicode:["1f441-fe0f","1f441"],fname:"1f441",uc:"1f441",isCanonical:!0},":levitate:":{unicode:["1f574-fe0f","1f574"],fname:"1f574",uc:"1f574",isCanonical:!0},":man_in_business_suit_levitating:":{unicode:["1f574-fe0f","1f574"],fname:"1f574",uc:"1f574",isCanonical:!1},":spy:":{unicode:["1f575-fe0f","1f575"],fname:"1f575",uc:"1f575",isCanonical:!0},":sleuth_or_spy:":{unicode:["1f575-fe0f","1f575"],fname:"1f575",uc:"1f575",isCanonical:!1},":hand_splayed:":{unicode:["1f590-fe0f","1f590"],fname:"1f590",uc:"1f590",isCanonical:!0},":raised_hand_with_fingers_splayed:":{unicode:["1f590-fe0f","1f590"],fname:"1f590",uc:"1f590",isCanonical:!1},":mountain_snow:":{unicode:["1f3d4-fe0f","1f3d4"],fname:"1f3d4",uc:"1f3d4",isCanonical:!0},":snow_capped_mountain:":{unicode:["1f3d4-fe0f","1f3d4"],fname:"1f3d4",uc:"1f3d4",isCanonical:!1},":camping:":{unicode:["1f3d5-fe0f","1f3d5"],fname:"1f3d5",uc:"1f3d5",isCanonical:!0},":beach:":{unicode:["1f3d6-fe0f","1f3d6"],fname:"1f3d6",uc:"1f3d6",isCanonical:!0},":beach_with_umbrella:":{unicode:["1f3d6-fe0f","1f3d6"],fname:"1f3d6",uc:"1f3d6",isCanonical:!1},":construction_site:":{unicode:["1f3d7-fe0f","1f3d7"],fname:"1f3d7",uc:"1f3d7",isCanonical:!0},":building_construction:":{unicode:["1f3d7-fe0f","1f3d7"],fname:"1f3d7",uc:"1f3d7",isCanonical:!1},":homes:":{unicode:["1f3d8-fe0f","1f3d8"],fname:"1f3d8",uc:"1f3d8",isCanonical:!0},":house_buildings:":{unicode:["1f3d8-fe0f","1f3d8"],fname:"1f3d8",uc:"1f3d8",isCanonical:!1},":cityscape:":{unicode:["1f3d9-fe0f","1f3d9"],fname:"1f3d9",uc:"1f3d9",isCanonical:!0},":house_abandoned:":{unicode:["1f3da-fe0f","1f3da"],fname:"1f3da",uc:"1f3da",isCanonical:!0},":derelict_house_building:":{unicode:["1f3da-fe0f","1f3da"],fname:"1f3da",uc:"1f3da",isCanonical:!1},":classical_building:":{unicode:["1f3db-fe0f","1f3db"],fname:"1f3db",uc:"1f3db",isCanonical:!0},":desert:":{unicode:["1f3dc-fe0f","1f3dc"],fname:"1f3dc",uc:"1f3dc",isCanonical:!0},":island:":{unicode:["1f3dd-fe0f","1f3dd"],fname:"1f3dd",uc:"1f3dd",isCanonical:!0},":desert_island:":{unicode:["1f3dd-fe0f","1f3dd"],fname:"1f3dd",uc:"1f3dd",isCanonical:!1},":park:":{unicode:["1f3de-fe0f","1f3de"],fname:"1f3de",uc:"1f3de",isCanonical:!0},":national_park:":{unicode:["1f3de-fe0f","1f3de"],fname:"1f3de",uc:"1f3de",isCanonical:!1},":stadium:":{unicode:["1f3df-fe0f","1f3df"],fname:"1f3df",uc:"1f3df",isCanonical:!0},":couch:":{unicode:["1f6cb-fe0f","1f6cb"],fname:"1f6cb",uc:"1f6cb",isCanonical:!0},":couch_and_lamp:":{unicode:["1f6cb-fe0f","1f6cb"],fname:"1f6cb",uc:"1f6cb",isCanonical:!1},":shopping_bags:":{unicode:["1f6cd-fe0f","1f6cd"],fname:"1f6cd",uc:"1f6cd",isCanonical:!0},":bellhop:":{unicode:["1f6ce-fe0f","1f6ce"],fname:"1f6ce",uc:"1f6ce",isCanonical:!0},":bellhop_bell:":{unicode:["1f6ce-fe0f","1f6ce"],fname:"1f6ce",uc:"1f6ce",isCanonical:!1},":bed:":{unicode:["1f6cf-fe0f","1f6cf"],fname:"1f6cf",uc:"1f6cf",isCanonical:!0},":motorway:":{unicode:["1f6e3-fe0f","1f6e3"],fname:"1f6e3",uc:"1f6e3",isCanonical:!0},":railway_track:":{unicode:["1f6e4-fe0f","1f6e4"],fname:"1f6e4",uc:"1f6e4",isCanonical:!0},":railroad_track:":{unicode:["1f6e4-fe0f","1f6e4"],fname:"1f6e4",uc:"1f6e4",isCanonical:!1},":motorboat:":{unicode:["1f6e5-fe0f","1f6e5"],fname:"1f6e5",uc:"1f6e5",isCanonical:!0},":airplane_small:":{unicode:["1f6e9-fe0f","1f6e9"],fname:"1f6e9",uc:"1f6e9",isCanonical:!0},":small_airplane:":{unicode:["1f6e9-fe0f","1f6e9"],fname:"1f6e9",uc:"1f6e9",isCanonical:!1},":cruise_ship:":{unicode:["1f6f3-fe0f","1f6f3"],fname:"1f6f3",uc:"1f6f3",isCanonical:!0},":passenger_ship:":{unicode:["1f6f3-fe0f","1f6f3"],fname:"1f6f3",uc:"1f6f3",isCanonical:!1},":white_sun_small_cloud:":{unicode:["1f324-fe0f","1f324"],fname:"1f324",uc:"1f324",isCanonical:!0},":white_sun_with_small_cloud:":{unicode:["1f324-fe0f","1f324"],fname:"1f324",uc:"1f324",isCanonical:!1},":white_sun_cloud:":{unicode:["1f325-fe0f","1f325"],fname:"1f325",uc:"1f325",isCanonical:!0},":white_sun_behind_cloud:":{unicode:["1f325-fe0f","1f325"],fname:"1f325",uc:"1f325",isCanonical:!1},":white_sun_rain_cloud:":{unicode:["1f326-fe0f","1f326"],fname:"1f326",uc:"1f326",isCanonical:!0},":white_sun_behind_cloud_with_rain:":{unicode:["1f326-fe0f","1f326"],fname:"1f326",uc:"1f326",isCanonical:!1},":mouse_three_button:":{unicode:["1f5b1-fe0f","1f5b1"],fname:"1f5b1",uc:"1f5b1",isCanonical:!0},":three_button_mouse:":{unicode:["1f5b1-fe0f","1f5b1"],fname:"1f5b1",uc:"1f5b1",isCanonical:!1},":point_up_tone1:":{unicode:["261d-1f3fb"],fname:"261d-1f3fb",uc:"261d-1f3fb",isCanonical:!0},":point_up_tone2:":{unicode:["261d-1f3fc"],fname:"261d-1f3fc",uc:"261d-1f3fc",isCanonical:!0},":point_up_tone3:":{unicode:["261d-1f3fd"],fname:"261d-1f3fd",uc:"261d-1f3fd",isCanonical:!0},":point_up_tone4:":{unicode:["261d-1f3fe"],fname:"261d-1f3fe",uc:"261d-1f3fe",isCanonical:!0},":point_up_tone5:":{unicode:["261d-1f3ff"],fname:"261d-1f3ff",uc:"261d-1f3ff",isCanonical:!0},":v_tone1:":{unicode:["270c-1f3fb"],fname:"270c-1f3fb",uc:"270c-1f3fb",isCanonical:!0},":v_tone2:":{unicode:["270c-1f3fc"],fname:"270c-1f3fc",uc:"270c-1f3fc",isCanonical:!0},":v_tone3:":{unicode:["270c-1f3fd"],fname:"270c-1f3fd",uc:"270c-1f3fd",isCanonical:!0},":v_tone4:":{unicode:["270c-1f3fe"],fname:"270c-1f3fe",uc:"270c-1f3fe",isCanonical:!0},":v_tone5:":{unicode:["270c-1f3ff"],fname:"270c-1f3ff",uc:"270c-1f3ff",isCanonical:!0},":fist_tone1:":{unicode:["270a-1f3fb"],fname:"270a-1f3fb",uc:"270a-1f3fb",isCanonical:!0},":fist_tone2:":{unicode:["270a-1f3fc"],fname:"270a-1f3fc",uc:"270a-1f3fc",isCanonical:!0},":fist_tone3:":{unicode:["270a-1f3fd"],fname:"270a-1f3fd",uc:"270a-1f3fd",isCanonical:!0},":fist_tone4:":{unicode:["270a-1f3fe"],fname:"270a-1f3fe",uc:"270a-1f3fe",isCanonical:!0},":fist_tone5:":{unicode:["270a-1f3ff"],fname:"270a-1f3ff",uc:"270a-1f3ff",isCanonical:!0},":raised_hand_tone1:":{unicode:["270b-1f3fb"],fname:"270b-1f3fb",uc:"270b-1f3fb",isCanonical:!0},":raised_hand_tone2:":{unicode:["270b-1f3fc"],fname:"270b-1f3fc",uc:"270b-1f3fc",isCanonical:!0},":raised_hand_tone3:":{unicode:["270b-1f3fd"],fname:"270b-1f3fd",uc:"270b-1f3fd",isCanonical:!0},":raised_hand_tone4:":{unicode:["270b-1f3fe"],fname:"270b-1f3fe",uc:"270b-1f3fe",isCanonical:!0},":raised_hand_tone5:":{unicode:["270b-1f3ff"],fname:"270b-1f3ff",uc:"270b-1f3ff",isCanonical:!0},":writing_hand_tone1:":{unicode:["270d-1f3fb"],fname:"270d-1f3fb",uc:"270d-1f3fb",isCanonical:!0},":writing_hand_tone2:":{unicode:["270d-1f3fc"],fname:"270d-1f3fc",uc:"270d-1f3fc",isCanonical:!0},":writing_hand_tone3:":{unicode:["270d-1f3fd"],fname:"270d-1f3fd",uc:"270d-1f3fd",isCanonical:!0},":writing_hand_tone4:":{unicode:["270d-1f3fe"],fname:"270d-1f3fe",uc:"270d-1f3fe",isCanonical:!0},":writing_hand_tone5:":{unicode:["270d-1f3ff"],fname:"270d-1f3ff",uc:"270d-1f3ff",isCanonical:!0},":basketball_player_tone1:":{unicode:["26f9-1f3fb"],fname:"26f9-1f3fb",uc:"26f9-1f3fb",isCanonical:!0},":person_with_ball_tone1:":{unicode:["26f9-1f3fb"],fname:"26f9-1f3fb",uc:"26f9-1f3fb",isCanonical:!1},":basketball_player_tone2:":{unicode:["26f9-1f3fc"],fname:"26f9-1f3fc",uc:"26f9-1f3fc",isCanonical:!0},":person_with_ball_tone2:":{unicode:["26f9-1f3fc"],fname:"26f9-1f3fc",uc:"26f9-1f3fc",isCanonical:!1},":basketball_player_tone3:":{unicode:["26f9-1f3fd"],fname:"26f9-1f3fd",uc:"26f9-1f3fd",isCanonical:!0},":person_with_ball_tone3:":{unicode:["26f9-1f3fd"],fname:"26f9-1f3fd",uc:"26f9-1f3fd",isCanonical:!1},":basketball_player_tone4:":{unicode:["26f9-1f3fe"],fname:"26f9-1f3fe",uc:"26f9-1f3fe",isCanonical:!0},":person_with_ball_tone4:":{unicode:["26f9-1f3fe"],fname:"26f9-1f3fe",uc:"26f9-1f3fe",isCanonical:!1},":basketball_player_tone5:":{unicode:["26f9-1f3ff"],fname:"26f9-1f3ff",uc:"26f9-1f3ff",isCanonical:!0},":person_with_ball_tone5:":{unicode:["26f9-1f3ff"],fname:"26f9-1f3ff",uc:"26f9-1f3ff",isCanonical:!1},":copyright:":{unicode:["00a9-fe0f","00a9"],fname:"00a9",uc:"00a9",isCanonical:!0},":registered:":{unicode:["00ae-fe0f","00ae"],fname:"00ae",uc:"00ae",isCanonical:!0},":bangbang:":{unicode:["203c-fe0f","203c"],fname:"203c",uc:"203c",isCanonical:!0},":interrobang:":{unicode:["2049-fe0f","2049"],fname:"2049",uc:"2049",isCanonical:!0},":tm:":{unicode:["2122-fe0f","2122"],fname:"2122",uc:"2122",isCanonical:!0},":information_source:":{unicode:["2139-fe0f","2139"],fname:"2139",uc:"2139",isCanonical:!0},":left_right_arrow:":{unicode:["2194-fe0f","2194"],fname:"2194",uc:"2194",isCanonical:!0},":arrow_up_down:":{unicode:["2195-fe0f","2195"],fname:"2195",uc:"2195",isCanonical:!0},":arrow_upper_left:":{unicode:["2196-fe0f","2196"],fname:"2196",uc:"2196",isCanonical:!0},":arrow_upper_right:":{unicode:["2197-fe0f","2197"],fname:"2197",uc:"2197",isCanonical:!0},":arrow_lower_right:":{unicode:["2198-fe0f","2198"],fname:"2198",uc:"2198",isCanonical:!0},":arrow_lower_left:":{unicode:["2199-fe0f","2199"],fname:"2199",uc:"2199",isCanonical:!0},":leftwards_arrow_with_hook:":{unicode:["21a9-fe0f","21a9"],fname:"21a9",uc:"21a9",isCanonical:!0},":arrow_right_hook:":{unicode:["21aa-fe0f","21aa"],fname:"21aa",uc:"21aa",isCanonical:!0},":watch:":{unicode:["231a-fe0f","231a"],fname:"231a",uc:"231a",isCanonical:!0},":hourglass:":{unicode:["231b-fe0f","231b"],fname:"231b",uc:"231b",isCanonical:!0},":m:":{unicode:["24c2-fe0f","24c2"],fname:"24c2",uc:"24c2",isCanonical:!0},":black_small_square:":{unicode:["25aa-fe0f","25aa"],fname:"25aa",uc:"25aa",isCanonical:!0},":white_small_square:":{unicode:["25ab-fe0f","25ab"],fname:"25ab",uc:"25ab",isCanonical:!0},":arrow_forward:":{unicode:["25b6-fe0f","25b6"],fname:"25b6",uc:"25b6",isCanonical:!0},":arrow_backward:":{unicode:["25c0-fe0f","25c0"],fname:"25c0",uc:"25c0",isCanonical:!0},":white_medium_square:":{unicode:["25fb-fe0f","25fb"],fname:"25fb",uc:"25fb",isCanonical:!0},":black_medium_square:":{unicode:["25fc-fe0f","25fc"],fname:"25fc",uc:"25fc",isCanonical:!0},":white_medium_small_square:":{unicode:["25fd-fe0f","25fd"],fname:"25fd",uc:"25fd",isCanonical:!0},":black_medium_small_square:":{unicode:["25fe-fe0f","25fe"],fname:"25fe",uc:"25fe",isCanonical:!0},":sunny:":{unicode:["2600-fe0f","2600"],fname:"2600",uc:"2600",isCanonical:!0},":cloud:":{unicode:["2601-fe0f","2601"],fname:"2601",uc:"2601",isCanonical:!0},":telephone:":{unicode:["260e-fe0f","260e"],fname:"260e",uc:"260e",isCanonical:!0},":ballot_box_with_check:":{unicode:["2611-fe0f","2611"],fname:"2611",uc:"2611",isCanonical:!0},":umbrella:":{unicode:["2614-fe0f","2614"],fname:"2614",uc:"2614",isCanonical:!0},":coffee:":{unicode:["2615-fe0f","2615"],fname:"2615",uc:"2615",isCanonical:!0},":point_up:":{unicode:["261d-fe0f","261d"],fname:"261d",uc:"261d",isCanonical:!0},":relaxed:":{unicode:["263a-fe0f","263a"],fname:"263a",uc:"263a",isCanonical:!0},":aries:":{unicode:["2648-fe0f","2648"],fname:"2648",uc:"2648",isCanonical:!0},":taurus:":{unicode:["2649-fe0f","2649"],fname:"2649",uc:"2649",isCanonical:!0},":gemini:":{unicode:["264a-fe0f","264a"],fname:"264a",uc:"264a",isCanonical:!0},":cancer:":{unicode:["264b-fe0f","264b"],fname:"264b",uc:"264b",isCanonical:!0},":leo:":{unicode:["264c-fe0f","264c"],fname:"264c",uc:"264c",isCanonical:!0},":virgo:":{unicode:["264d-fe0f","264d"],fname:"264d",uc:"264d",isCanonical:!0},":libra:":{unicode:["264e-fe0f","264e"],fname:"264e",uc:"264e",isCanonical:!0},":scorpius:":{unicode:["264f-fe0f","264f"],fname:"264f",uc:"264f",isCanonical:!0},":sagittarius:":{unicode:["2650-fe0f","2650"],fname:"2650",uc:"2650",isCanonical:!0},":capricorn:":{unicode:["2651-fe0f","2651"],fname:"2651",uc:"2651",isCanonical:!0},":aquarius:":{unicode:["2652-fe0f","2652"],fname:"2652",uc:"2652",isCanonical:!0},":pisces:":{unicode:["2653-fe0f","2653"],fname:"2653",uc:"2653",isCanonical:!0},":spades:":{unicode:["2660-fe0f","2660"],fname:"2660",uc:"2660",isCanonical:!0},":clubs:":{unicode:["2663-fe0f","2663"],fname:"2663",uc:"2663",isCanonical:!0},":hearts:":{unicode:["2665-fe0f","2665"],fname:"2665",uc:"2665",isCanonical:!0},":diamonds:":{unicode:["2666-fe0f","2666"],fname:"2666",uc:"2666",isCanonical:!0},":hotsprings:":{unicode:["2668-fe0f","2668"],fname:"2668",uc:"2668",isCanonical:!0},":recycle:":{unicode:["267b-fe0f","267b"],fname:"267b",uc:"267b",isCanonical:!0},":wheelchair:":{unicode:["267f-fe0f","267f"],fname:"267f",uc:"267f",isCanonical:!0},":anchor:":{unicode:["2693-fe0f","2693"],fname:"2693",uc:"2693",isCanonical:!0},":warning:":{unicode:["26a0-fe0f","26a0"],fname:"26a0",uc:"26a0",isCanonical:!0},":zap:":{unicode:["26a1-fe0f","26a1"],fname:"26a1",uc:"26a1",isCanonical:!0},":white_circle:":{unicode:["26aa-fe0f","26aa"],fname:"26aa",uc:"26aa",isCanonical:!0},":black_circle:":{unicode:["26ab-fe0f","26ab"],fname:"26ab",uc:"26ab",isCanonical:!0},":soccer:":{unicode:["26bd-fe0f","26bd"],fname:"26bd",uc:"26bd",isCanonical:!0},":baseball:":{unicode:["26be-fe0f","26be"],fname:"26be",uc:"26be",isCanonical:!0},":snowman:":{unicode:["26c4-fe0f","26c4"],fname:"26c4",uc:"26c4",isCanonical:!0},":partly_sunny:":{unicode:["26c5-fe0f","26c5"],fname:"26c5",uc:"26c5",isCanonical:!0},":no_entry:":{unicode:["26d4-fe0f","26d4"],fname:"26d4",uc:"26d4",isCanonical:!0},":church:":{unicode:["26ea-fe0f","26ea"],fname:"26ea",uc:"26ea",isCanonical:!0},":fountain:":{unicode:["26f2-fe0f","26f2"],fname:"26f2",uc:"26f2",isCanonical:!0},":golf:":{unicode:["26f3-fe0f","26f3"],fname:"26f3",uc:"26f3",isCanonical:!0},":sailboat:":{unicode:["26f5-fe0f","26f5"],fname:"26f5",uc:"26f5",isCanonical:!0},":tent:":{unicode:["26fa-fe0f","26fa"],fname:"26fa",uc:"26fa",isCanonical:!0},":fuelpump:":{unicode:["26fd-fe0f","26fd"],fname:"26fd",uc:"26fd",isCanonical:!0},":scissors:":{unicode:["2702-fe0f","2702"],fname:"2702",uc:"2702",isCanonical:!0},":airplane:":{unicode:["2708-fe0f","2708"],fname:"2708",uc:"2708",isCanonical:!0},":envelope:":{unicode:["2709-fe0f","2709"],fname:"2709",uc:"2709",isCanonical:!0},":v:":{unicode:["270c-fe0f","270c"],fname:"270c",uc:"270c",isCanonical:!0},":pencil2:":{unicode:["270f-fe0f","270f"],fname:"270f",uc:"270f",isCanonical:!0},":black_nib:":{unicode:["2712-fe0f","2712"],fname:"2712",uc:"2712",isCanonical:!0},":heavy_check_mark:":{unicode:["2714-fe0f","2714"],fname:"2714",uc:"2714",isCanonical:!0},":heavy_multiplication_x:":{unicode:["2716-fe0f","2716"],fname:"2716",uc:"2716",isCanonical:!0},":eight_spoked_asterisk:":{unicode:["2733-fe0f","2733"],fname:"2733",uc:"2733",isCanonical:!0},":eight_pointed_black_star:":{unicode:["2734-fe0f","2734"],fname:"2734",uc:"2734",isCanonical:!0},":snowflake:":{unicode:["2744-fe0f","2744"],fname:"2744",uc:"2744",isCanonical:!0},":sparkle:":{unicode:["2747-fe0f","2747"],fname:"2747",uc:"2747",isCanonical:!0},":exclamation:":{unicode:["2757-fe0f","2757"],fname:"2757",uc:"2757",isCanonical:!0},":heart:":{unicode:["2764-fe0f","2764"],fname:"2764",uc:"2764",isCanonical:!0},":arrow_right:":{unicode:["27a1-fe0f","27a1"],fname:"27a1",uc:"27a1",isCanonical:!0},":arrow_heading_up:":{unicode:["2934-fe0f","2934"],fname:"2934",uc:"2934",isCanonical:!0},":arrow_heading_down:":{unicode:["2935-fe0f","2935"],fname:"2935",uc:"2935",isCanonical:!0},":arrow_left:":{unicode:["2b05-fe0f","2b05"],fname:"2b05",uc:"2b05",isCanonical:!0},":arrow_up:":{unicode:["2b06-fe0f","2b06"],fname:"2b06",uc:"2b06",isCanonical:!0},":arrow_down:":{unicode:["2b07-fe0f","2b07"],fname:"2b07",uc:"2b07",isCanonical:!0},":black_large_square:":{unicode:["2b1b-fe0f","2b1b"],fname:"2b1b",uc:"2b1b",isCanonical:!0},":white_large_square:":{unicode:["2b1c-fe0f","2b1c"],fname:"2b1c",uc:"2b1c",isCanonical:!0},":star:":{unicode:["2b50-fe0f","2b50"],fname:"2b50",uc:"2b50",isCanonical:!0},":o:":{unicode:["2b55-fe0f","2b55"],fname:"2b55",uc:"2b55",isCanonical:!0},":wavy_dash:":{unicode:["3030-fe0f","3030"],fname:"3030",uc:"3030",isCanonical:!0},":part_alternation_mark:":{unicode:["303d-fe0f","303d"],fname:"303d",uc:"303d",isCanonical:!0},":congratulations:":{unicode:["3297-fe0f","3297"],fname:"3297",uc:"3297",isCanonical:!0},":secret:":{unicode:["3299-fe0f","3299"],fname:"3299",uc:"3299",isCanonical:!0},":cross:":{unicode:["271d-fe0f","271d"],fname:"271d",uc:"271d",isCanonical:!0},":latin_cross:":{unicode:["271d-fe0f","271d"],fname:"271d",uc:"271d",isCanonical:!1},":keyboard:":{unicode:["2328-fe0f","2328"],fname:"2328",uc:"2328",isCanonical:!0},":writing_hand:":{unicode:["270d-fe0f","270d"],fname:"270d",uc:"270d",isCanonical:!0},":eject:":{unicode:["23cf-fe0f","23cf"],fname:"23cf",uc:"23cf",isCanonical:!0},":eject_symbol:":{unicode:["23cf-fe0f","23cf"],fname:"23cf",uc:"23cf",isCanonical:!1},":track_next:":{unicode:["23ed-fe0f","23ed"],fname:"23ed",uc:"23ed",isCanonical:!0},":next_track:":{unicode:["23ed-fe0f","23ed"],fname:"23ed",uc:"23ed",isCanonical:!1},":track_previous:":{unicode:["23ee-fe0f","23ee"],fname:"23ee",uc:"23ee",isCanonical:!0},":previous_track:":{unicode:["23ee-fe0f","23ee"],fname:"23ee",uc:"23ee",isCanonical:!1},":play_pause:":{unicode:["23ef-fe0f","23ef"],fname:"23ef",uc:"23ef",isCanonical:!0
},":stopwatch:":{unicode:["23f1-fe0f","23f1"],fname:"23f1",uc:"23f1",isCanonical:!0},":timer:":{unicode:["23f2-fe0f","23f2"],fname:"23f2",uc:"23f2",isCanonical:!0},":timer_clock:":{unicode:["23f2-fe0f","23f2"],fname:"23f2",uc:"23f2",isCanonical:!1},":pause_button:":{unicode:["23f8-fe0f","23f8"],fname:"23f8",uc:"23f8",isCanonical:!0},":double_vertical_bar:":{unicode:["23f8-fe0f","23f8"],fname:"23f8",uc:"23f8",isCanonical:!1},":stop_button:":{unicode:["23f9-fe0f","23f9"],fname:"23f9",uc:"23f9",isCanonical:!0},":record_button:":{unicode:["23fa-fe0f","23fa"],fname:"23fa",uc:"23fa",isCanonical:!0},":umbrella2:":{unicode:["2602-fe0f","2602"],fname:"2602",uc:"2602",isCanonical:!0},":snowman2:":{unicode:["2603-fe0f","2603"],fname:"2603",uc:"2603",isCanonical:!0},":comet:":{unicode:["2604-fe0f","2604"],fname:"2604",uc:"2604",isCanonical:!0},":shamrock:":{unicode:["2618-fe0f","2618"],fname:"2618",uc:"2618",isCanonical:!0},":skull_crossbones:":{unicode:["2620-fe0f","2620"],fname:"2620",uc:"2620",isCanonical:!0},":skull_and_crossbones:":{unicode:["2620-fe0f","2620"],fname:"2620",uc:"2620",isCanonical:!1},":radioactive:":{unicode:["2622-fe0f","2622"],fname:"2622",uc:"2622",isCanonical:!0},":radioactive_sign:":{unicode:["2622-fe0f","2622"],fname:"2622",uc:"2622",isCanonical:!1},":biohazard:":{unicode:["2623-fe0f","2623"],fname:"2623",uc:"2623",isCanonical:!0},":biohazard_sign:":{unicode:["2623-fe0f","2623"],fname:"2623",uc:"2623",isCanonical:!1},":orthodox_cross:":{unicode:["2626-fe0f","2626"],fname:"2626",uc:"2626",isCanonical:!0},":star_and_crescent:":{unicode:["262a-fe0f","262a"],fname:"262a",uc:"262a",isCanonical:!0},":peace:":{unicode:["262e-fe0f","262e"],fname:"262e",uc:"262e",isCanonical:!0},":peace_symbol:":{unicode:["262e-fe0f","262e"],fname:"262e",uc:"262e",isCanonical:!1},":yin_yang:":{unicode:["262f-fe0f","262f"],fname:"262f",uc:"262f",isCanonical:!0},":wheel_of_dharma:":{unicode:["2638-fe0f","2638"],fname:"2638",uc:"2638",isCanonical:!0},":frowning2:":{unicode:["2639-fe0f","2639"],fname:"2639",uc:"2639",isCanonical:!0},":white_frowning_face:":{unicode:["2639-fe0f","2639"],fname:"2639",uc:"2639",isCanonical:!1},":hammer_pick:":{unicode:["2692-fe0f","2692"],fname:"2692",uc:"2692",isCanonical:!0},":hammer_and_pick:":{unicode:["2692-fe0f","2692"],fname:"2692",uc:"2692",isCanonical:!1},":crossed_swords:":{unicode:["2694-fe0f","2694"],fname:"2694",uc:"2694",isCanonical:!0},":scales:":{unicode:["2696-fe0f","2696"],fname:"2696",uc:"2696",isCanonical:!0},":alembic:":{unicode:["2697-fe0f","2697"],fname:"2697",uc:"2697",isCanonical:!0},":gear:":{unicode:["2699-fe0f","2699"],fname:"2699",uc:"2699",isCanonical:!0},":atom:":{unicode:["269b-fe0f","269b"],fname:"269b",uc:"269b",isCanonical:!0},":atom_symbol:":{unicode:["269b-fe0f","269b"],fname:"269b",uc:"269b",isCanonical:!1},":fleur-de-lis:":{unicode:["269c-fe0f","269c"],fname:"269c",uc:"269c",isCanonical:!0},":coffin:":{unicode:["26b0-fe0f","26b0"],fname:"26b0",uc:"26b0",isCanonical:!0},":urn:":{unicode:["26b1-fe0f","26b1"],fname:"26b1",uc:"26b1",isCanonical:!0},":funeral_urn:":{unicode:["26b1-fe0f","26b1"],fname:"26b1",uc:"26b1",isCanonical:!1},":thunder_cloud_rain:":{unicode:["26c8-fe0f","26c8"],fname:"26c8",uc:"26c8",isCanonical:!0},":thunder_cloud_and_rain:":{unicode:["26c8-fe0f","26c8"],fname:"26c8",uc:"26c8",isCanonical:!1},":pick:":{unicode:["26cf-fe0f","26cf"],fname:"26cf",uc:"26cf",isCanonical:!0},":helmet_with_cross:":{unicode:["26d1-fe0f","26d1"],fname:"26d1",uc:"26d1",isCanonical:!0},":helmet_with_white_cross:":{unicode:["26d1-fe0f","26d1"],fname:"26d1",uc:"26d1",isCanonical:!1},":chains:":{unicode:["26d3-fe0f","26d3"],fname:"26d3",uc:"26d3",isCanonical:!0},":shinto_shrine:":{unicode:["26e9-fe0f","26e9"],fname:"26e9",uc:"26e9",isCanonical:!0},":mountain:":{unicode:["26f0-fe0f","26f0"],fname:"26f0",uc:"26f0",isCanonical:!0},":beach_umbrella:":{unicode:["26f1-fe0f","26f1"],fname:"26f1",uc:"26f1",isCanonical:!0},":umbrella_on_ground:":{unicode:["26f1-fe0f","26f1"],fname:"26f1",uc:"26f1",isCanonical:!1},":ferry:":{unicode:["26f4-fe0f","26f4"],fname:"26f4",uc:"26f4",isCanonical:!0},":skier:":{unicode:["26f7-fe0f","26f7"],fname:"26f7",uc:"26f7",isCanonical:!0},":ice_skate:":{unicode:["26f8-fe0f","26f8"],fname:"26f8",uc:"26f8",isCanonical:!0},":basketball_player:":{unicode:["26f9-fe0f","26f9"],fname:"26f9",uc:"26f9",isCanonical:!0},":person_with_ball:":{unicode:["26f9-fe0f","26f9"],fname:"26f9",uc:"26f9",isCanonical:!1},":star_of_david:":{unicode:["2721-fe0f","2721"],fname:"2721",uc:"2721",isCanonical:!0},":heart_exclamation:":{unicode:["2763-fe0f","2763"],fname:"2763",uc:"2763",isCanonical:!0},":heavy_heart_exclamation_mark_ornament:":{unicode:["2763-fe0f","2763"],fname:"2763",uc:"2763",isCanonical:!1},":third_place:":{unicode:["1f949"],fname:"1f949",uc:"1f949",isCanonical:!0},":third_place_medal:":{unicode:["1f949"],fname:"1f949",uc:"1f949",isCanonical:!1},":second_place:":{unicode:["1f948"],fname:"1f948",uc:"1f948",isCanonical:!0},":second_place_medal:":{unicode:["1f948"],fname:"1f948",uc:"1f948",isCanonical:!1},":first_place:":{unicode:["1f947"],fname:"1f947",uc:"1f947",isCanonical:!0},":first_place_medal:":{unicode:["1f947"],fname:"1f947",uc:"1f947",isCanonical:!1},":fencer:":{unicode:["1f93a"],fname:"1f93a",uc:"1f93a",isCanonical:!0},":fencing:":{unicode:["1f93a"],fname:"1f93a",uc:"1f93a",isCanonical:!1},":goal:":{unicode:["1f945"],fname:"1f945",uc:"1f945",isCanonical:!0},":goal_net:":{unicode:["1f945"],fname:"1f945",uc:"1f945",isCanonical:!1},":handball:":{unicode:["1f93e"],fname:"1f93e",uc:"1f93e",isCanonical:!0},":regional_indicator_z:":{unicode:["1f1ff"],fname:"1f1ff",uc:"1f1ff",isCanonical:!0},":water_polo:":{unicode:["1f93d"],fname:"1f93d",uc:"1f93d",isCanonical:!0},":martial_arts_uniform:":{unicode:["1f94b"],fname:"1f94b",uc:"1f94b",isCanonical:!0},":karate_uniform:":{unicode:["1f94b"],fname:"1f94b",uc:"1f94b",isCanonical:!1},":boxing_glove:":{unicode:["1f94a"],fname:"1f94a",uc:"1f94a",isCanonical:!0},":boxing_gloves:":{unicode:["1f94a"],fname:"1f94a",uc:"1f94a",isCanonical:!1},":wrestlers:":{unicode:["1f93c"],fname:"1f93c",uc:"1f93c",isCanonical:!0},":wrestling:":{unicode:["1f93c"],fname:"1f93c",uc:"1f93c",isCanonical:!1},":juggling:":{unicode:["1f939"],fname:"1f939",uc:"1f939",isCanonical:!0},":juggler:":{unicode:["1f939"],fname:"1f939",uc:"1f939",isCanonical:!1},":cartwheel:":{unicode:["1f938"],fname:"1f938",uc:"1f938",isCanonical:!0},":person_doing_cartwheel:":{unicode:["1f938"],fname:"1f938",uc:"1f938",isCanonical:!1},":canoe:":{unicode:["1f6f6"],fname:"1f6f6",uc:"1f6f6",isCanonical:!0},":kayak:":{unicode:["1f6f6"],fname:"1f6f6",uc:"1f6f6",isCanonical:!1},":motor_scooter:":{unicode:["1f6f5"],fname:"1f6f5",uc:"1f6f5",isCanonical:!0},":motorbike:":{unicode:["1f6f5"],fname:"1f6f5",uc:"1f6f5",isCanonical:!1},":scooter:":{unicode:["1f6f4"],fname:"1f6f4",uc:"1f6f4",isCanonical:!0},":shopping_cart:":{unicode:["1f6d2"],fname:"1f6d2",uc:"1f6d2",isCanonical:!0},":shopping_trolley:":{unicode:["1f6d2"],fname:"1f6d2",uc:"1f6d2",isCanonical:!1},":black_joker:":{unicode:["1f0cf"],fname:"1f0cf",uc:"1f0cf",isCanonical:!0},":a:":{unicode:["1f170"],fname:"1f170",uc:"1f170",isCanonical:!0},":b:":{unicode:["1f171"],fname:"1f171",uc:"1f171",isCanonical:!0},":o2:":{unicode:["1f17e"],fname:"1f17e",uc:"1f17e",isCanonical:!0},":octagonal_sign:":{unicode:["1f6d1"],fname:"1f6d1",uc:"1f6d1",isCanonical:!0},":stop_sign:":{unicode:["1f6d1"],fname:"1f6d1",uc:"1f6d1",isCanonical:!1},":ab:":{unicode:["1f18e"],fname:"1f18e",uc:"1f18e",isCanonical:!0},":cl:":{unicode:["1f191"],fname:"1f191",uc:"1f191",isCanonical:!0},":regional_indicator_y:":{unicode:["1f1fe"],fname:"1f1fe",uc:"1f1fe",isCanonical:!0},":cool:":{unicode:["1f192"],fname:"1f192",uc:"1f192",isCanonical:!0},":free:":{unicode:["1f193"],fname:"1f193",uc:"1f193",isCanonical:!0},":id:":{unicode:["1f194"],fname:"1f194",uc:"1f194",isCanonical:!0},":new:":{unicode:["1f195"],fname:"1f195",uc:"1f195",isCanonical:!0},":ng:":{unicode:["1f196"],fname:"1f196",uc:"1f196",isCanonical:!0},":ok:":{unicode:["1f197"],fname:"1f197",uc:"1f197",isCanonical:!0},":sos:":{unicode:["1f198"],fname:"1f198",uc:"1f198",isCanonical:!0},":spoon:":{unicode:["1f944"],fname:"1f944",uc:"1f944",isCanonical:!0},":up:":{unicode:["1f199"],fname:"1f199",uc:"1f199",isCanonical:!0},":vs:":{unicode:["1f19a"],fname:"1f19a",uc:"1f19a",isCanonical:!0},":champagne_glass:":{unicode:["1f942"],fname:"1f942",uc:"1f942",isCanonical:!0},":clinking_glass:":{unicode:["1f942"],fname:"1f942",uc:"1f942",isCanonical:!1},":tumbler_glass:":{unicode:["1f943"],fname:"1f943",uc:"1f943",isCanonical:!0},":whisky:":{unicode:["1f943"],fname:"1f943",uc:"1f943",isCanonical:!1},":koko:":{unicode:["1f201"],fname:"1f201",uc:"1f201",isCanonical:!0},":stuffed_flatbread:":{unicode:["1f959"],fname:"1f959",uc:"1f959",isCanonical:!0},":stuffed_pita:":{unicode:["1f959"],fname:"1f959",uc:"1f959",isCanonical:!1},":u7981:":{unicode:["1f232"],fname:"1f232",uc:"1f232",isCanonical:!0},":u7a7a:":{unicode:["1f233"],fname:"1f233",uc:"1f233",isCanonical:!0},":u5408:":{unicode:["1f234"],fname:"1f234",uc:"1f234",isCanonical:!0},":u6e80:":{unicode:["1f235"],fname:"1f235",uc:"1f235",isCanonical:!0},":u6709:":{unicode:["1f236"],fname:"1f236",uc:"1f236",isCanonical:!0},":shallow_pan_of_food:":{unicode:["1f958"],fname:"1f958",uc:"1f958",isCanonical:!0},":paella:":{unicode:["1f958"],fname:"1f958",uc:"1f958",isCanonical:!1},":u7533:":{unicode:["1f238"],fname:"1f238",uc:"1f238",isCanonical:!0},":u5272:":{unicode:["1f239"],fname:"1f239",uc:"1f239",isCanonical:!0},":salad:":{unicode:["1f957"],fname:"1f957",uc:"1f957",isCanonical:!0},":green_salad:":{unicode:["1f957"],fname:"1f957",uc:"1f957",isCanonical:!1},":u55b6:":{unicode:["1f23a"],fname:"1f23a",uc:"1f23a",isCanonical:!0},":ideograph_advantage:":{unicode:["1f250"],fname:"1f250",uc:"1f250",isCanonical:!0},":accept:":{unicode:["1f251"],fname:"1f251",uc:"1f251",isCanonical:!0},":cyclone:":{unicode:["1f300"],fname:"1f300",uc:"1f300",isCanonical:!0},":french_bread:":{unicode:["1f956"],fname:"1f956",uc:"1f956",isCanonical:!0},":baguette_bread:":{unicode:["1f956"],fname:"1f956",uc:"1f956",isCanonical:!1},":foggy:":{unicode:["1f301"],fname:"1f301",uc:"1f301",isCanonical:!0},":closed_umbrella:":{unicode:["1f302"],fname:"1f302",uc:"1f302",isCanonical:!0},":night_with_stars:":{unicode:["1f303"],fname:"1f303",uc:"1f303",isCanonical:!0},":sunrise_over_mountains:":{unicode:["1f304"],fname:"1f304",uc:"1f304",isCanonical:!0},":sunrise:":{unicode:["1f305"],fname:"1f305",uc:"1f305",isCanonical:!0},":city_dusk:":{unicode:["1f306"],fname:"1f306",uc:"1f306",isCanonical:!0},":carrot:":{unicode:["1f955"],fname:"1f955",uc:"1f955",isCanonical:!0},":city_sunset:":{unicode:["1f307"],fname:"1f307",uc:"1f307",isCanonical:!0},":city_sunrise:":{unicode:["1f307"],fname:"1f307",uc:"1f307",isCanonical:!1},":rainbow:":{unicode:["1f308"],fname:"1f308",uc:"1f308",isCanonical:!0},":potato:":{unicode:["1f954"],fname:"1f954",uc:"1f954",isCanonical:!0},":bridge_at_night:":{unicode:["1f309"],fname:"1f309",uc:"1f309",isCanonical:!0},":ocean:":{unicode:["1f30a"],fname:"1f30a",uc:"1f30a",isCanonical:!0},":volcano:":{unicode:["1f30b"],fname:"1f30b",uc:"1f30b",isCanonical:!0},":milky_way:":{unicode:["1f30c"],fname:"1f30c",uc:"1f30c",isCanonical:!0},":earth_asia:":{unicode:["1f30f"],fname:"1f30f",uc:"1f30f",isCanonical:!0},":new_moon:":{unicode:["1f311"],fname:"1f311",uc:"1f311",isCanonical:!0},":bacon:":{unicode:["1f953"],fname:"1f953",uc:"1f953",isCanonical:!0},":first_quarter_moon:":{unicode:["1f313"],fname:"1f313",uc:"1f313",isCanonical:!0},":waxing_gibbous_moon:":{unicode:["1f314"],fname:"1f314",uc:"1f314",isCanonical:!0},":full_moon:":{unicode:["1f315"],fname:"1f315",uc:"1f315",isCanonical:!0},":crescent_moon:":{unicode:["1f319"],fname:"1f319",uc:"1f319",isCanonical:!0},":first_quarter_moon_with_face:":{unicode:["1f31b"],fname:"1f31b",uc:"1f31b",isCanonical:!0},":star2:":{unicode:["1f31f"],fname:"1f31f",uc:"1f31f",isCanonical:!0},":cucumber:":{unicode:["1f952"],fname:"1f952",uc:"1f952",isCanonical:!0},":stars:":{unicode:["1f320"],fname:"1f320",uc:"1f320",isCanonical:!0},":chestnut:":{unicode:["1f330"],fname:"1f330",uc:"1f330",isCanonical:!0},":avocado:":{unicode:["1f951"],fname:"1f951",uc:"1f951",isCanonical:!0},":seedling:":{unicode:["1f331"],fname:"1f331",uc:"1f331",isCanonical:!0},":palm_tree:":{unicode:["1f334"],fname:"1f334",uc:"1f334",isCanonical:!0},":cactus:":{unicode:["1f335"],fname:"1f335",uc:"1f335",isCanonical:!0},":tulip:":{unicode:["1f337"],fname:"1f337",uc:"1f337",isCanonical:!0},":cherry_blossom:":{unicode:["1f338"],fname:"1f338",uc:"1f338",isCanonical:!0},":rose:":{unicode:["1f339"],fname:"1f339",uc:"1f339",isCanonical:!0},":hibiscus:":{unicode:["1f33a"],fname:"1f33a",uc:"1f33a",isCanonical:!0},":sunflower:":{unicode:["1f33b"],fname:"1f33b",uc:"1f33b",isCanonical:!0},":blossom:":{unicode:["1f33c"],fname:"1f33c",uc:"1f33c",isCanonical:!0},":corn:":{unicode:["1f33d"],fname:"1f33d",uc:"1f33d",isCanonical:!0},":croissant:":{unicode:["1f950"],fname:"1f950",uc:"1f950",isCanonical:!0},":ear_of_rice:":{unicode:["1f33e"],fname:"1f33e",uc:"1f33e",isCanonical:!0},":herb:":{unicode:["1f33f"],fname:"1f33f",uc:"1f33f",isCanonical:!0},":four_leaf_clover:":{unicode:["1f340"],fname:"1f340",uc:"1f340",isCanonical:!0},":maple_leaf:":{unicode:["1f341"],fname:"1f341",uc:"1f341",isCanonical:!0},":fallen_leaf:":{unicode:["1f342"],fname:"1f342",uc:"1f342",isCanonical:!0},":leaves:":{unicode:["1f343"],fname:"1f343",uc:"1f343",isCanonical:!0},":mushroom:":{unicode:["1f344"],fname:"1f344",uc:"1f344",isCanonical:!0},":tomato:":{unicode:["1f345"],fname:"1f345",uc:"1f345",isCanonical:!0},":eggplant:":{unicode:["1f346"],fname:"1f346",uc:"1f346",isCanonical:!0},":grapes:":{unicode:["1f347"],fname:"1f347",uc:"1f347",isCanonical:!0},":melon:":{unicode:["1f348"],fname:"1f348",uc:"1f348",isCanonical:!0},":watermelon:":{unicode:["1f349"],fname:"1f349",uc:"1f349",isCanonical:!0},":tangerine:":{unicode:["1f34a"],fname:"1f34a",uc:"1f34a",isCanonical:!0},":wilted_rose:":{unicode:["1f940"],fname:"1f940",uc:"1f940",isCanonical:!0},":wilted_flower:":{unicode:["1f940"],fname:"1f940",uc:"1f940",isCanonical:!1},":banana:":{unicode:["1f34c"],fname:"1f34c",uc:"1f34c",isCanonical:!0},":pineapple:":{unicode:["1f34d"],fname:"1f34d",uc:"1f34d",isCanonical:!0},":apple:":{unicode:["1f34e"],fname:"1f34e",uc:"1f34e",isCanonical:!0},":green_apple:":{unicode:["1f34f"],fname:"1f34f",uc:"1f34f",isCanonical:!0},":peach:":{unicode:["1f351"],fname:"1f351",uc:"1f351",isCanonical:!0},":cherries:":{unicode:["1f352"],fname:"1f352",uc:"1f352",isCanonical:!0},":strawberry:":{unicode:["1f353"],fname:"1f353",uc:"1f353",isCanonical:!0},":rhino:":{unicode:["1f98f"],fname:"1f98f",uc:"1f98f",isCanonical:!0},":rhinoceros:":{unicode:["1f98f"],fname:"1f98f",uc:"1f98f",isCanonical:!1},":hamburger:":{unicode:["1f354"],fname:"1f354",uc:"1f354",isCanonical:!0},":pizza:":{unicode:["1f355"],fname:"1f355",uc:"1f355",isCanonical:!0},":meat_on_bone:":{unicode:["1f356"],fname:"1f356",uc:"1f356",isCanonical:!0},":lizard:":{unicode:["1f98e"],fname:"1f98e",uc:"1f98e",isCanonical:!0},":poultry_leg:":{unicode:["1f357"],fname:"1f357",uc:"1f357",isCanonical:!0},":rice_cracker:":{unicode:["1f358"],fname:"1f358",uc:"1f358",isCanonical:!0},":rice_ball:":{unicode:["1f359"],fname:"1f359",uc:"1f359",isCanonical:!0},":gorilla:":{unicode:["1f98d"],fname:"1f98d",uc:"1f98d",isCanonical:!0},":rice:":{unicode:["1f35a"],fname:"1f35a",uc:"1f35a",isCanonical:!0},":curry:":{unicode:["1f35b"],fname:"1f35b",uc:"1f35b",isCanonical:!0},":deer:":{unicode:["1f98c"],fname:"1f98c",uc:"1f98c",isCanonical:!0},":ramen:":{unicode:["1f35c"],fname:"1f35c",uc:"1f35c",isCanonical:!0},":spaghetti:":{unicode:["1f35d"],fname:"1f35d",uc:"1f35d",isCanonical:!0},":bread:":{unicode:["1f35e"],fname:"1f35e",uc:"1f35e",isCanonical:!0},":fries:":{unicode:["1f35f"],fname:"1f35f",uc:"1f35f",isCanonical:!0},":butterfly:":{unicode:["1f98b"],fname:"1f98b",uc:"1f98b",isCanonical:!0},":sweet_potato:":{unicode:["1f360"],fname:"1f360",uc:"1f360",isCanonical:!0},":dango:":{unicode:["1f361"],fname:"1f361",uc:"1f361",isCanonical:!0},":fox:":{unicode:["1f98a"],fname:"1f98a",uc:"1f98a",isCanonical:!0},":fox_face:":{unicode:["1f98a"],fname:"1f98a",uc:"1f98a",isCanonical:!1},":oden:":{unicode:["1f362"],fname:"1f362",uc:"1f362",isCanonical:!0},":sushi:":{unicode:["1f363"],fname:"1f363",uc:"1f363",isCanonical:!0},":owl:":{unicode:["1f989"],fname:"1f989",uc:"1f989",isCanonical:!0},":fried_shrimp:":{unicode:["1f364"],fname:"1f364",uc:"1f364",isCanonical:!0},":fish_cake:":{unicode:["1f365"],fname:"1f365",uc:"1f365",isCanonical:!0},":shark:":{unicode:["1f988"],fname:"1f988",uc:"1f988",isCanonical:!0},":icecream:":{unicode:["1f366"],fname:"1f366",uc:"1f366",isCanonical:!0},":bat:":{unicode:["1f987"],fname:"1f987",uc:"1f987",isCanonical:!0},":shaved_ice:":{unicode:["1f367"],fname:"1f367",uc:"1f367",isCanonical:!0},":regional_indicator_x:":{unicode:["1f1fd"],fname:"1f1fd",uc:"1f1fd",isCanonical:!0},":ice_cream:":{unicode:["1f368"],fname:"1f368",uc:"1f368",isCanonical:!0},":duck:":{unicode:["1f986"],fname:"1f986",uc:"1f986",isCanonical:!0},":doughnut:":{unicode:["1f369"],fname:"1f369",uc:"1f369",isCanonical:!0},":eagle:":{unicode:["1f985"],fname:"1f985",uc:"1f985",isCanonical:!0},":cookie:":{unicode:["1f36a"],fname:"1f36a",uc:"1f36a",isCanonical:!0},":black_heart:":{unicode:["1f5a4"],fname:"1f5a4",uc:"1f5a4",isCanonical:!0},":chocolate_bar:":{unicode:["1f36b"],fname:"1f36b",uc:"1f36b",isCanonical:!0},":candy:":{unicode:["1f36c"],fname:"1f36c",uc:"1f36c",isCanonical:!0},":lollipop:":{unicode:["1f36d"],fname:"1f36d",uc:"1f36d",isCanonical:!0},":custard:":{unicode:["1f36e"],fname:"1f36e",uc:"1f36e",isCanonical:!0},":pudding:":{unicode:["1f36e"],fname:"1f36e",uc:"1f36e",isCanonical:!1},":flan:":{unicode:["1f36e"],fname:"1f36e",uc:"1f36e",isCanonical:!1},":honey_pot:":{unicode:["1f36f"],fname:"1f36f",uc:"1f36f",isCanonical:!0},":fingers_crossed:":{unicode:["1f91e"],fname:"1f91e",uc:"1f91e",isCanonical:!0},":hand_with_index_and_middle_finger_crossed:":{unicode:["1f91e"],fname:"1f91e",uc:"1f91e",isCanonical:!1},":cake:":{unicode:["1f370"],fname:"1f370",uc:"1f370",isCanonical:!0},":bento:":{unicode:["1f371"],fname:"1f371",uc:"1f371",isCanonical:!0},":stew:":{unicode:["1f372"],fname:"1f372",uc:"1f372",isCanonical:!0},":handshake:":{unicode:["1f91d"],fname:"1f91d",uc:"1f91d",isCanonical:!0},":shaking_hands:":{unicode:["1f91d"],fname:"1f91d",uc:"1f91d",isCanonical:!1},":cooking:":{unicode:["1f373"],fname:"1f373",uc:"1f373",isCanonical:!0},":fork_and_knife:":{unicode:["1f374"],fname:"1f374",uc:"1f374",isCanonical:!0},":tea:":{unicode:["1f375"],fname:"1f375",uc:"1f375",isCanonical:!0},":sake:":{unicode:["1f376"],fname:"1f376",uc:"1f376",isCanonical:!0},":wine_glass:":{unicode:["1f377"],fname:"1f377",uc:"1f377",isCanonical:!0},":cocktail:":{unicode:["1f378"],fname:"1f378",uc:"1f378",isCanonical:!0},":tropical_drink:":{unicode:["1f379"],fname:"1f379",uc:"1f379",isCanonical:!0},":beer:":{unicode:["1f37a"],fname:"1f37a",uc:"1f37a",isCanonical:!0},":beers:":{unicode:["1f37b"],fname:"1f37b",uc:"1f37b",isCanonical:!0},":ribbon:":{unicode:["1f380"],fname:"1f380",uc:"1f380",isCanonical:!0},":gift:":{unicode:["1f381"],fname:"1f381",uc:"1f381",isCanonical:!0},":birthday:":{unicode:["1f382"],fname:"1f382",uc:"1f382",isCanonical:!0},":jack_o_lantern:":{unicode:["1f383"],fname:"1f383",uc:"1f383",isCanonical:!0},":left_facing_fist:":{unicode:["1f91b"],fname:"1f91b",uc:"1f91b",isCanonical:!0},":left_fist:":{unicode:["1f91b"],fname:"1f91b",uc:"1f91b",isCanonical:!1},":right_facing_fist:":{unicode:["1f91c"],fname:"1f91c",uc:"1f91c",isCanonical:!0},":right_fist:":{unicode:["1f91c"],fname:"1f91c",uc:"1f91c",isCanonical:!1},":christmas_tree:":{unicode:["1f384"],fname:"1f384",uc:"1f384",isCanonical:!0},":santa:":{unicode:["1f385"],fname:"1f385",uc:"1f385",isCanonical:!0},":fireworks:":{unicode:["1f386"],fname:"1f386",uc:"1f386",isCanonical:!0},":raised_back_of_hand:":{unicode:["1f91a"],fname:"1f91a",uc:"1f91a",isCanonical:!0},":back_of_hand:":{unicode:["1f91a"],fname:"1f91a",uc:"1f91a",isCanonical:!1},":sparkler:":{unicode:["1f387"],fname:"1f387",uc:"1f387",isCanonical:!0},":balloon:":{unicode:["1f388"],fname:"1f388",uc:"1f388",isCanonical:!0},":tada:":{unicode:["1f389"],fname:"1f389",uc:"1f389",isCanonical:!0},":confetti_ball:":{unicode:["1f38a"],fname:"1f38a",uc:"1f38a",isCanonical:!0},":tanabata_tree:":{unicode:["1f38b"],fname:"1f38b",uc:"1f38b",isCanonical:!0},":crossed_flags:":{unicode:["1f38c"],fname:"1f38c",uc:"1f38c",isCanonical:!0},":call_me:":{unicode:["1f919"],fname:"1f919",uc:"1f919",isCanonical:!0},":call_me_hand:":{unicode:["1f919"],fname:"1f919",uc:"1f919",isCanonical:!1},":bamboo:":{unicode:["1f38d"],fname:"1f38d",uc:"1f38d",isCanonical:!0},":man_dancing:":{unicode:["1f57a"],fname:"1f57a",uc:"1f57a",isCanonical:!0},":male_dancer:":{unicode:["1f57a"],fname:"1f57a",uc:"1f57a",isCanonical:!1},":dolls:":{unicode:["1f38e"],fname:"1f38e",uc:"1f38e",isCanonical:!0},":selfie:":{unicode:["1f933"],fname:"1f933",uc:"1f933",isCanonical:!0},":flags:":{unicode:["1f38f"],fname:"1f38f",uc:"1f38f",isCanonical:!0},":pregnant_woman:":{unicode:["1f930"],fname:"1f930",uc:"1f930",isCanonical:!0},":expecting_woman:":{unicode:["1f930"],fname:"1f930",uc:"1f930",isCanonical:!1},":wind_chime:":{unicode:["1f390"],fname:"1f390",uc:"1f390",isCanonical:!0},":face_palm:":{unicode:["1f926"],fname:"1f926",uc:"1f926",isCanonical:!0},":facepalm:":{unicode:["1f926"],fname:"1f926",uc:"1f926",isCanonical:!1},":shrug:":{unicode:["1f937"],fname:"1f937",uc:"1f937",isCanonical:!0},":rice_scene:":{unicode:["1f391"],fname:"1f391",uc:"1f391",isCanonical:!0},":school_satchel:":{unicode:["1f392"],fname:"1f392",uc:"1f392",isCanonical:!0},":mortar_board:":{unicode:["1f393"],fname:"1f393",uc:"1f393",isCanonical:!0},":carousel_horse:":{unicode:["1f3a0"],fname:"1f3a0",uc:"1f3a0",isCanonical:!0},":ferris_wheel:":{unicode:["1f3a1"],fname:"1f3a1",uc:"1f3a1",isCanonical:!0},":roller_coaster:":{unicode:["1f3a2"],fname:"1f3a2",uc:"1f3a2",isCanonical:!0},":fishing_pole_and_fish:":{unicode:["1f3a3"],fname:"1f3a3",uc:"1f3a3",isCanonical:!0},":microphone:":{unicode:["1f3a4"],fname:"1f3a4",uc:"1f3a4",isCanonical:!0},":movie_camera:":{unicode:["1f3a5"],fname:"1f3a5",uc:"1f3a5",isCanonical:!0},":cinema:":{unicode:["1f3a6"],fname:"1f3a6",uc:"1f3a6",isCanonical:!0},":headphones:":{unicode:["1f3a7"],fname:"1f3a7",uc:"1f3a7",isCanonical:!0},":mrs_claus:":{unicode:["1f936"],fname:"1f936",uc:"1f936",isCanonical:!0},":mother_christmas:":{unicode:["1f936"],fname:"1f936",uc:"1f936",isCanonical:!1},":art:":{unicode:["1f3a8"],fname:"1f3a8",uc:"1f3a8",isCanonical:!0},":man_in_tuxedo:":{unicode:["1f935"],fname:"1f935",uc:"1f935",isCanonical:!0},":tophat:":{unicode:["1f3a9"],fname:"1f3a9",uc:"1f3a9",isCanonical:!0},":circus_tent:":{unicode:["1f3aa"],fname:"1f3aa",uc:"1f3aa",isCanonical:!0},":prince:":{unicode:["1f934"],fname:"1f934",uc:"1f934",isCanonical:!0},":ticket:":{unicode:["1f3ab"],fname:"1f3ab",uc:"1f3ab",isCanonical:!0},":clapper:":{unicode:["1f3ac"],fname:"1f3ac",uc:"1f3ac",isCanonical:!0},":performing_arts:":{unicode:["1f3ad"],fname:"1f3ad",uc:"1f3ad",isCanonical:!0},":sneezing_face:":{unicode:["1f927"],fname:"1f927",uc:"1f927",isCanonical:!0},":sneeze:":{unicode:["1f927"],fname:"1f927",uc:"1f927",isCanonical:!1},":video_game:":{unicode:["1f3ae"],fname:"1f3ae",uc:"1f3ae",isCanonical:!0},":dart:":{unicode:["1f3af"],fname:"1f3af",uc:"1f3af",isCanonical:!0},":slot_machine:":{unicode:["1f3b0"],fname:"1f3b0",uc:"1f3b0",isCanonical:!0},":8ball:":{unicode:["1f3b1"],fname:"1f3b1",uc:"1f3b1",isCanonical:!0},":game_die:":{unicode:["1f3b2"],fname:"1f3b2",uc:"1f3b2",isCanonical:!0},":bowling:":{unicode:["1f3b3"],fname:"1f3b3",uc:"1f3b3",isCanonical:!0},":flower_playing_cards:":{unicode:["1f3b4"],fname:"1f3b4",uc:"1f3b4",isCanonical:!0},":lying_face:":{unicode:["1f925"],fname:"1f925",uc:"1f925",isCanonical:!0},":liar:":{unicode:["1f925"],fname:"1f925",uc:"1f925",isCanonical:!1},":musical_note:":{unicode:["1f3b5"],fname:"1f3b5",uc:"1f3b5",isCanonical:!0},":notes:":{unicode:["1f3b6"],fname:"1f3b6",uc:"1f3b6",isCanonical:!0},":saxophone:":{unicode:["1f3b7"],fname:"1f3b7",uc:"1f3b7",isCanonical:!0},":drooling_face:":{unicode:["1f924"],fname:"1f924",uc:"1f924",isCanonical:!0},":drool:":{unicode:["1f924"],fname:"1f924",uc:"1f924",isCanonical:!1},":guitar:":{unicode:["1f3b8"],fname:"1f3b8",uc:"1f3b8",isCanonical:!0},":musical_keyboard:":{unicode:["1f3b9"],fname:"1f3b9",uc:"1f3b9",isCanonical:!0},":trumpet:":{unicode:["1f3ba"],fname:"1f3ba",uc:"1f3ba",isCanonical:!0},":rofl:":{unicode:["1f923"],fname:"1f923",uc:"1f923",isCanonical:!0},":rolling_on_the_floor_laughing:":{unicode:["1f923"],fname:"1f923",uc:"1f923",isCanonical:!1},":violin:":{unicode:["1f3bb"],fname:"1f3bb",uc:"1f3bb",isCanonical:!0},":musical_score:":{unicode:["1f3bc"],fname:"1f3bc",uc:"1f3bc",isCanonical:!0},":running_shirt_with_sash:":{unicode:["1f3bd"],fname:"1f3bd",uc:"1f3bd",isCanonical:!0},":nauseated_face:":{unicode:["1f922"],fname:"1f922",uc:"1f922",isCanonical:!0},":sick:":{unicode:["1f922"],fname:"1f922",uc:"1f922",isCanonical:!1},":tennis:":{unicode:["1f3be"],fname:"1f3be",uc:"1f3be",isCanonical:!0},":ski:":{unicode:["1f3bf"],fname:"1f3bf",uc:"1f3bf",isCanonical:!0},":basketball:":{unicode:["1f3c0"],fname:"1f3c0",uc:"1f3c0",isCanonical:!0},":checkered_flag:":{unicode:["1f3c1"],fname:"1f3c1",uc:"1f3c1",isCanonical:!0},":clown:":{unicode:["1f921"],fname:"1f921",uc:"1f921",isCanonical:!0},":clown_face:":{unicode:["1f921"],fname:"1f921",uc:"1f921",isCanonical:!1},":snowboarder:":{unicode:["1f3c2"],fname:"1f3c2",uc:"1f3c2",isCanonical:!0},":runner:":{unicode:["1f3c3"],fname:"1f3c3",uc:"1f3c3",isCanonical:!0},":surfer:":{unicode:["1f3c4"],fname:"1f3c4",uc:"1f3c4",isCanonical:!0},":trophy:":{unicode:["1f3c6"],fname:"1f3c6",uc:"1f3c6",isCanonical:!0},":football:":{unicode:["1f3c8"],fname:"1f3c8",uc:"1f3c8",isCanonical:!0},":swimmer:":{unicode:["1f3ca"],fname:"1f3ca",uc:"1f3ca",isCanonical:!0},":house:":{unicode:["1f3e0"],fname:"1f3e0",uc:"1f3e0",isCanonical:!0},":house_with_garden:":{unicode:["1f3e1"],fname:"1f3e1",uc:"1f3e1",isCanonical:!0},":office:":{unicode:["1f3e2"],fname:"1f3e2",uc:"1f3e2",isCanonical:!0},":post_office:":{unicode:["1f3e3"],fname:"1f3e3",uc:"1f3e3",isCanonical:!0},":hospital:":{unicode:["1f3e5"],fname:"1f3e5",uc:"1f3e5",isCanonical:!0},":bank:":{unicode:["1f3e6"],fname:"1f3e6",uc:"1f3e6",isCanonical:!0},":atm:":{unicode:["1f3e7"],fname:"1f3e7",uc:"1f3e7",isCanonical:!0},":hotel:":{unicode:["1f3e8"],fname:"1f3e8",uc:"1f3e8",isCanonical:!0},":love_hotel:":{unicode:["1f3e9"],fname:"1f3e9",uc:"1f3e9",isCanonical:!0},":convenience_store:":{unicode:["1f3ea"],fname:"1f3ea",uc:"1f3ea",isCanonical:!0},":school:":{unicode:["1f3eb"],fname:"1f3eb",uc:"1f3eb",isCanonical:!0},":department_store:":{unicode:["1f3ec"],fname:"1f3ec",uc:"1f3ec",isCanonical:!0},":cowboy:":{unicode:["1f920"],fname:"1f920",uc:"1f920",isCanonical:!0},":face_with_cowboy_hat:":{unicode:["1f920"],fname:"1f920",uc:"1f920",isCanonical:!1},":factory:":{unicode:["1f3ed"],fname:"1f3ed",uc:"1f3ed",isCanonical:!0},":izakaya_lantern:":{unicode:["1f3ee"],fname:"1f3ee",uc:"1f3ee",isCanonical:!0},":japanese_castle:":{unicode:["1f3ef"],fname:"1f3ef",uc:"1f3ef",isCanonical:!0},":european_castle:":{unicode:["1f3f0"],fname:"1f3f0",uc:"1f3f0",isCanonical:!0},":snail:":{unicode:["1f40c"],fname:"1f40c",uc:"1f40c",isCanonical:!0},":snake:":{unicode:["1f40d"],fname:"1f40d",uc:"1f40d",isCanonical:!0},":racehorse:":{unicode:["1f40e"],fname:"1f40e",uc:"1f40e",isCanonical:!0},":sheep:":{unicode:["1f411"],fname:"1f411",uc:"1f411",isCanonical:!0},":monkey:":{unicode:["1f412"],fname:"1f412",uc:"1f412",isCanonical:!0},":chicken:":{unicode:["1f414"],fname:"1f414",uc:"1f414",isCanonical:!0},":boar:":{unicode:["1f417"],fname:"1f417",uc:"1f417",isCanonical:!0},":elephant:":{unicode:["1f418"],fname:"1f418",uc:"1f418",isCanonical:!0},":octopus:":{unicode:["1f419"],fname:"1f419",uc:"1f419",isCanonical:!0},":shell:":{unicode:["1f41a"],fname:"1f41a",uc:"1f41a",isCanonical:!0},":bug:":{unicode:["1f41b"],fname:"1f41b",uc:"1f41b",isCanonical:!0},":ant:":{unicode:["1f41c"],fname:"1f41c",uc:"1f41c",isCanonical:!0},":bee:":{unicode:["1f41d"],fname:"1f41d",uc:"1f41d",isCanonical:!0},":beetle:":{unicode:["1f41e"],fname:"1f41e",uc:"1f41e",isCanonical:!0},":fish:":{unicode:["1f41f"],fname:"1f41f",uc:"1f41f",isCanonical:!0},":tropical_fish:":{unicode:["1f420"],fname:"1f420",uc:"1f420",isCanonical:!0},":blowfish:":{unicode:["1f421"],fname:"1f421",uc:"1f421",isCanonical:!0},":turtle:":{unicode:["1f422"],fname:"1f422",uc:"1f422",isCanonical:!0},":hatching_chick:":{unicode:["1f423"],fname:"1f423",uc:"1f423",isCanonical:!0},":baby_chick:":{unicode:["1f424"],fname:"1f424",uc:"1f424",isCanonical:!0},":hatched_chick:":{unicode:["1f425"],fname:"1f425",uc:"1f425",isCanonical:!0},":bird:":{unicode:["1f426"],fname:"1f426",uc:"1f426",isCanonical:!0},":penguin:":{unicode:["1f427"],fname:"1f427",uc:"1f427",isCanonical:!0},":koala:":{unicode:["1f428"],fname:"1f428",uc:"1f428",isCanonical:!0},":poodle:":{unicode:["1f429"],fname:"1f429",uc:"1f429",isCanonical:!0},":camel:":{unicode:["1f42b"],fname:"1f42b",uc:"1f42b",isCanonical:!0},":dolphin:":{unicode:["1f42c"],fname:"1f42c",uc:"1f42c",isCanonical:!0},":mouse:":{unicode:["1f42d"],fname:"1f42d",uc:"1f42d",isCanonical:!0},":cow:":{unicode:["1f42e"],fname:"1f42e",uc:"1f42e",isCanonical:!0},":tiger:":{unicode:["1f42f"],fname:"1f42f",uc:"1f42f",isCanonical:!0},":rabbit:":{unicode:["1f430"],fname:"1f430",uc:"1f430",isCanonical:!0},":cat:":{unicode:["1f431"],fname:"1f431",uc:"1f431",isCanonical:!0},":dragon_face:":{unicode:["1f432"],fname:"1f432",uc:"1f432",isCanonical:!0},":whale:":{unicode:["1f433"],fname:"1f433",uc:"1f433",isCanonical:!0},":horse:":{unicode:["1f434"],fname:"1f434",uc:"1f434",isCanonical:!0},":monkey_face:":{unicode:["1f435"],fname:"1f435",uc:"1f435",isCanonical:!0},":dog:":{unicode:["1f436"],fname:"1f436",uc:"1f436",isCanonical:!0},":pig:":{unicode:["1f437"],fname:"1f437",uc:"1f437",isCanonical:!0},":frog:":{unicode:["1f438"],fname:"1f438",uc:"1f438",isCanonical:!0},":hamster:":{unicode:["1f439"],fname:"1f439",uc:"1f439",isCanonical:!0},":wolf:":{unicode:["1f43a"],fname:"1f43a",uc:"1f43a",isCanonical:!0},":bear:":{unicode:["1f43b"],fname:"1f43b",uc:"1f43b",isCanonical:!0},":panda_face:":{unicode:["1f43c"],fname:"1f43c",uc:"1f43c",isCanonical:!0},":pig_nose:":{unicode:["1f43d"],fname:"1f43d",uc:"1f43d",isCanonical:!0},":feet:":{unicode:["1f43e"],fname:"1f43e",uc:"1f43e",isCanonical:!0},":paw_prints:":{unicode:["1f43e"],fname:"1f43e",uc:"1f43e",isCanonical:!1},":eyes:":{unicode:["1f440"],fname:"1f440",uc:"1f440",isCanonical:!0},":ear:":{unicode:["1f442"],fname:"1f442",uc:"1f442",isCanonical:!0},":nose:":{unicode:["1f443"],fname:"1f443",uc:"1f443",isCanonical:!0},":lips:":{unicode:["1f444"],fname:"1f444",uc:"1f444",isCanonical:!0},":tongue:":{unicode:["1f445"],fname:"1f445",uc:"1f445",isCanonical:!0},":point_up_2:":{unicode:["1f446"],fname:"1f446",uc:"1f446",isCanonical:!0},":point_down:":{unicode:["1f447"],fname:"1f447",uc:"1f447",isCanonical:!0},":point_left:":{unicode:["1f448"],fname:"1f448",uc:"1f448",isCanonical:!0},":point_right:":{unicode:["1f449"],fname:"1f449",uc:"1f449",isCanonical:!0},":punch:":{unicode:["1f44a"],fname:"1f44a",uc:"1f44a",isCanonical:!0},":wave:":{unicode:["1f44b"],fname:"1f44b",uc:"1f44b",isCanonical:!0},":ok_hand:":{unicode:["1f44c"],fname:"1f44c",uc:"1f44c",isCanonical:!0},":thumbsup:":{unicode:["1f44d"],fname:"1f44d",uc:"1f44d",isCanonical:!0},":+1:":{unicode:["1f44d"],fname:"1f44d",uc:"1f44d",isCanonical:!1},":thumbup:":{unicode:["1f44d"],fname:"1f44d",uc:"1f44d",isCanonical:!1},":thumbsdown:":{unicode:["1f44e"],fname:"1f44e",uc:"1f44e",isCanonical:!0},":-1:":{unicode:["1f44e"],fname:"1f44e",uc:"1f44e",isCanonical:!1},":thumbdown:":{unicode:["1f44e"],fname:"1f44e",uc:"1f44e",isCanonical:!1},":clap:":{unicode:["1f44f"],fname:"1f44f",uc:"1f44f",isCanonical:!0},":open_hands:":{
unicode:["1f450"],fname:"1f450",uc:"1f450",isCanonical:!0},":crown:":{unicode:["1f451"],fname:"1f451",uc:"1f451",isCanonical:!0},":womans_hat:":{unicode:["1f452"],fname:"1f452",uc:"1f452",isCanonical:!0},":eyeglasses:":{unicode:["1f453"],fname:"1f453",uc:"1f453",isCanonical:!0},":necktie:":{unicode:["1f454"],fname:"1f454",uc:"1f454",isCanonical:!0},":shirt:":{unicode:["1f455"],fname:"1f455",uc:"1f455",isCanonical:!0},":jeans:":{unicode:["1f456"],fname:"1f456",uc:"1f456",isCanonical:!0},":dress:":{unicode:["1f457"],fname:"1f457",uc:"1f457",isCanonical:!0},":kimono:":{unicode:["1f458"],fname:"1f458",uc:"1f458",isCanonical:!0},":bikini:":{unicode:["1f459"],fname:"1f459",uc:"1f459",isCanonical:!0},":womans_clothes:":{unicode:["1f45a"],fname:"1f45a",uc:"1f45a",isCanonical:!0},":purse:":{unicode:["1f45b"],fname:"1f45b",uc:"1f45b",isCanonical:!0},":handbag:":{unicode:["1f45c"],fname:"1f45c",uc:"1f45c",isCanonical:!0},":pouch:":{unicode:["1f45d"],fname:"1f45d",uc:"1f45d",isCanonical:!0},":mans_shoe:":{unicode:["1f45e"],fname:"1f45e",uc:"1f45e",isCanonical:!0},":athletic_shoe:":{unicode:["1f45f"],fname:"1f45f",uc:"1f45f",isCanonical:!0},":high_heel:":{unicode:["1f460"],fname:"1f460",uc:"1f460",isCanonical:!0},":sandal:":{unicode:["1f461"],fname:"1f461",uc:"1f461",isCanonical:!0},":boot:":{unicode:["1f462"],fname:"1f462",uc:"1f462",isCanonical:!0},":footprints:":{unicode:["1f463"],fname:"1f463",uc:"1f463",isCanonical:!0},":bust_in_silhouette:":{unicode:["1f464"],fname:"1f464",uc:"1f464",isCanonical:!0},":boy:":{unicode:["1f466"],fname:"1f466",uc:"1f466",isCanonical:!0},":girl:":{unicode:["1f467"],fname:"1f467",uc:"1f467",isCanonical:!0},":man:":{unicode:["1f468"],fname:"1f468",uc:"1f468",isCanonical:!0},":woman:":{unicode:["1f469"],fname:"1f469",uc:"1f469",isCanonical:!0},":family:":{unicode:["1f46a"],fname:"1f46a",uc:"1f46a",isCanonical:!0},":couple:":{unicode:["1f46b"],fname:"1f46b",uc:"1f46b",isCanonical:!0},":cop:":{unicode:["1f46e"],fname:"1f46e",uc:"1f46e",isCanonical:!0},":dancers:":{unicode:["1f46f"],fname:"1f46f",uc:"1f46f",isCanonical:!0},":bride_with_veil:":{unicode:["1f470"],fname:"1f470",uc:"1f470",isCanonical:!0},":person_with_blond_hair:":{unicode:["1f471"],fname:"1f471",uc:"1f471",isCanonical:!0},":man_with_gua_pi_mao:":{unicode:["1f472"],fname:"1f472",uc:"1f472",isCanonical:!0},":man_with_turban:":{unicode:["1f473"],fname:"1f473",uc:"1f473",isCanonical:!0},":older_man:":{unicode:["1f474"],fname:"1f474",uc:"1f474",isCanonical:!0},":older_woman:":{unicode:["1f475"],fname:"1f475",uc:"1f475",isCanonical:!0},":grandma:":{unicode:["1f475"],fname:"1f475",uc:"1f475",isCanonical:!1},":baby:":{unicode:["1f476"],fname:"1f476",uc:"1f476",isCanonical:!0},":construction_worker:":{unicode:["1f477"],fname:"1f477",uc:"1f477",isCanonical:!0},":princess:":{unicode:["1f478"],fname:"1f478",uc:"1f478",isCanonical:!0},":japanese_ogre:":{unicode:["1f479"],fname:"1f479",uc:"1f479",isCanonical:!0},":japanese_goblin:":{unicode:["1f47a"],fname:"1f47a",uc:"1f47a",isCanonical:!0},":ghost:":{unicode:["1f47b"],fname:"1f47b",uc:"1f47b",isCanonical:!0},":angel:":{unicode:["1f47c"],fname:"1f47c",uc:"1f47c",isCanonical:!0},":alien:":{unicode:["1f47d"],fname:"1f47d",uc:"1f47d",isCanonical:!0},":space_invader:":{unicode:["1f47e"],fname:"1f47e",uc:"1f47e",isCanonical:!0},":imp:":{unicode:["1f47f"],fname:"1f47f",uc:"1f47f",isCanonical:!0},":skull:":{unicode:["1f480"],fname:"1f480",uc:"1f480",isCanonical:!0},":skeleton:":{unicode:["1f480"],fname:"1f480",uc:"1f480",isCanonical:!1},":card_index:":{unicode:["1f4c7"],fname:"1f4c7",uc:"1f4c7",isCanonical:!0},":information_desk_person:":{unicode:["1f481"],fname:"1f481",uc:"1f481",isCanonical:!0},":guardsman:":{unicode:["1f482"],fname:"1f482",uc:"1f482",isCanonical:!0},":dancer:":{unicode:["1f483"],fname:"1f483",uc:"1f483",isCanonical:!0},":lipstick:":{unicode:["1f484"],fname:"1f484",uc:"1f484",isCanonical:!0},":nail_care:":{unicode:["1f485"],fname:"1f485",uc:"1f485",isCanonical:!0},":ledger:":{unicode:["1f4d2"],fname:"1f4d2",uc:"1f4d2",isCanonical:!0},":massage:":{unicode:["1f486"],fname:"1f486",uc:"1f486",isCanonical:!0},":notebook:":{unicode:["1f4d3"],fname:"1f4d3",uc:"1f4d3",isCanonical:!0},":haircut:":{unicode:["1f487"],fname:"1f487",uc:"1f487",isCanonical:!0},":notebook_with_decorative_cover:":{unicode:["1f4d4"],fname:"1f4d4",uc:"1f4d4",isCanonical:!0},":barber:":{unicode:["1f488"],fname:"1f488",uc:"1f488",isCanonical:!0},":closed_book:":{unicode:["1f4d5"],fname:"1f4d5",uc:"1f4d5",isCanonical:!0},":syringe:":{unicode:["1f489"],fname:"1f489",uc:"1f489",isCanonical:!0},":book:":{unicode:["1f4d6"],fname:"1f4d6",uc:"1f4d6",isCanonical:!0},":pill:":{unicode:["1f48a"],fname:"1f48a",uc:"1f48a",isCanonical:!0},":green_book:":{unicode:["1f4d7"],fname:"1f4d7",uc:"1f4d7",isCanonical:!0},":kiss:":{unicode:["1f48b"],fname:"1f48b",uc:"1f48b",isCanonical:!0},":blue_book:":{unicode:["1f4d8"],fname:"1f4d8",uc:"1f4d8",isCanonical:!0},":love_letter:":{unicode:["1f48c"],fname:"1f48c",uc:"1f48c",isCanonical:!0},":orange_book:":{unicode:["1f4d9"],fname:"1f4d9",uc:"1f4d9",isCanonical:!0},":ring:":{unicode:["1f48d"],fname:"1f48d",uc:"1f48d",isCanonical:!0},":books:":{unicode:["1f4da"],fname:"1f4da",uc:"1f4da",isCanonical:!0},":gem:":{unicode:["1f48e"],fname:"1f48e",uc:"1f48e",isCanonical:!0},":name_badge:":{unicode:["1f4db"],fname:"1f4db",uc:"1f4db",isCanonical:!0},":couplekiss:":{unicode:["1f48f"],fname:"1f48f",uc:"1f48f",isCanonical:!0},":scroll:":{unicode:["1f4dc"],fname:"1f4dc",uc:"1f4dc",isCanonical:!0},":bouquet:":{unicode:["1f490"],fname:"1f490",uc:"1f490",isCanonical:!0},":pencil:":{unicode:["1f4dd"],fname:"1f4dd",uc:"1f4dd",isCanonical:!0},":couple_with_heart:":{unicode:["1f491"],fname:"1f491",uc:"1f491",isCanonical:!0},":telephone_receiver:":{unicode:["1f4de"],fname:"1f4de",uc:"1f4de",isCanonical:!0},":wedding:":{unicode:["1f492"],fname:"1f492",uc:"1f492",isCanonical:!0},":pager:":{unicode:["1f4df"],fname:"1f4df",uc:"1f4df",isCanonical:!0},":fax:":{unicode:["1f4e0"],fname:"1f4e0",uc:"1f4e0",isCanonical:!0},":heartbeat:":{unicode:["1f493"],fname:"1f493",uc:"1f493",isCanonical:!0},":satellite:":{unicode:["1f4e1"],fname:"1f4e1",uc:"1f4e1",isCanonical:!0},":loudspeaker:":{unicode:["1f4e2"],fname:"1f4e2",uc:"1f4e2",isCanonical:!0},":broken_heart:":{unicode:["1f494"],fname:"1f494",uc:"1f494",isCanonical:!0},":mega:":{unicode:["1f4e3"],fname:"1f4e3",uc:"1f4e3",isCanonical:!0},":outbox_tray:":{unicode:["1f4e4"],fname:"1f4e4",uc:"1f4e4",isCanonical:!0},":two_hearts:":{unicode:["1f495"],fname:"1f495",uc:"1f495",isCanonical:!0},":inbox_tray:":{unicode:["1f4e5"],fname:"1f4e5",uc:"1f4e5",isCanonical:!0},":package:":{unicode:["1f4e6"],fname:"1f4e6",uc:"1f4e6",isCanonical:!0},":sparkling_heart:":{unicode:["1f496"],fname:"1f496",uc:"1f496",isCanonical:!0},":e-mail:":{unicode:["1f4e7"],fname:"1f4e7",uc:"1f4e7",isCanonical:!0},":email:":{unicode:["1f4e7"],fname:"1f4e7",uc:"1f4e7",isCanonical:!1},":incoming_envelope:":{unicode:["1f4e8"],fname:"1f4e8",uc:"1f4e8",isCanonical:!0},":heartpulse:":{unicode:["1f497"],fname:"1f497",uc:"1f497",isCanonical:!0},":envelope_with_arrow:":{unicode:["1f4e9"],fname:"1f4e9",uc:"1f4e9",isCanonical:!0},":mailbox_closed:":{unicode:["1f4ea"],fname:"1f4ea",uc:"1f4ea",isCanonical:!0},":cupid:":{unicode:["1f498"],fname:"1f498",uc:"1f498",isCanonical:!0},":mailbox:":{unicode:["1f4eb"],fname:"1f4eb",uc:"1f4eb",isCanonical:!0},":postbox:":{unicode:["1f4ee"],fname:"1f4ee",uc:"1f4ee",isCanonical:!0},":blue_heart:":{unicode:["1f499"],fname:"1f499",uc:"1f499",isCanonical:!0},":newspaper:":{unicode:["1f4f0"],fname:"1f4f0",uc:"1f4f0",isCanonical:!0},":iphone:":{unicode:["1f4f1"],fname:"1f4f1",uc:"1f4f1",isCanonical:!0},":green_heart:":{unicode:["1f49a"],fname:"1f49a",uc:"1f49a",isCanonical:!0},":calling:":{unicode:["1f4f2"],fname:"1f4f2",uc:"1f4f2",isCanonical:!0},":vibration_mode:":{unicode:["1f4f3"],fname:"1f4f3",uc:"1f4f3",isCanonical:!0},":yellow_heart:":{unicode:["1f49b"],fname:"1f49b",uc:"1f49b",isCanonical:!0},":mobile_phone_off:":{unicode:["1f4f4"],fname:"1f4f4",uc:"1f4f4",isCanonical:!0},":signal_strength:":{unicode:["1f4f6"],fname:"1f4f6",uc:"1f4f6",isCanonical:!0},":purple_heart:":{unicode:["1f49c"],fname:"1f49c",uc:"1f49c",isCanonical:!0},":camera:":{unicode:["1f4f7"],fname:"1f4f7",uc:"1f4f7",isCanonical:!0},":video_camera:":{unicode:["1f4f9"],fname:"1f4f9",uc:"1f4f9",isCanonical:!0},":gift_heart:":{unicode:["1f49d"],fname:"1f49d",uc:"1f49d",isCanonical:!0},":tv:":{unicode:["1f4fa"],fname:"1f4fa",uc:"1f4fa",isCanonical:!0},":radio:":{unicode:["1f4fb"],fname:"1f4fb",uc:"1f4fb",isCanonical:!0},":revolving_hearts:":{unicode:["1f49e"],fname:"1f49e",uc:"1f49e",isCanonical:!0},":vhs:":{unicode:["1f4fc"],fname:"1f4fc",uc:"1f4fc",isCanonical:!0},":arrows_clockwise:":{unicode:["1f503"],fname:"1f503",uc:"1f503",isCanonical:!0},":heart_decoration:":{unicode:["1f49f"],fname:"1f49f",uc:"1f49f",isCanonical:!0},":loud_sound:":{unicode:["1f50a"],fname:"1f50a",uc:"1f50a",isCanonical:!0},":battery:":{unicode:["1f50b"],fname:"1f50b",uc:"1f50b",isCanonical:!0},":diamond_shape_with_a_dot_inside:":{unicode:["1f4a0"],fname:"1f4a0",uc:"1f4a0",isCanonical:!0},":electric_plug:":{unicode:["1f50c"],fname:"1f50c",uc:"1f50c",isCanonical:!0},":mag:":{unicode:["1f50d"],fname:"1f50d",uc:"1f50d",isCanonical:!0},":bulb:":{unicode:["1f4a1"],fname:"1f4a1",uc:"1f4a1",isCanonical:!0},":mag_right:":{unicode:["1f50e"],fname:"1f50e",uc:"1f50e",isCanonical:!0},":lock_with_ink_pen:":{unicode:["1f50f"],fname:"1f50f",uc:"1f50f",isCanonical:!0},":anger:":{unicode:["1f4a2"],fname:"1f4a2",uc:"1f4a2",isCanonical:!0},":closed_lock_with_key:":{unicode:["1f510"],fname:"1f510",uc:"1f510",isCanonical:!0},":key:":{unicode:["1f511"],fname:"1f511",uc:"1f511",isCanonical:!0},":bomb:":{unicode:["1f4a3"],fname:"1f4a3",uc:"1f4a3",isCanonical:!0},":lock:":{unicode:["1f512"],fname:"1f512",uc:"1f512",isCanonical:!0},":unlock:":{unicode:["1f513"],fname:"1f513",uc:"1f513",isCanonical:!0},":zzz:":{unicode:["1f4a4"],fname:"1f4a4",uc:"1f4a4",isCanonical:!0},":bell:":{unicode:["1f514"],fname:"1f514",uc:"1f514",isCanonical:!0},":bookmark:":{unicode:["1f516"],fname:"1f516",uc:"1f516",isCanonical:!0},":boom:":{unicode:["1f4a5"],fname:"1f4a5",uc:"1f4a5",isCanonical:!0},":link:":{unicode:["1f517"],fname:"1f517",uc:"1f517",isCanonical:!0},":radio_button:":{unicode:["1f518"],fname:"1f518",uc:"1f518",isCanonical:!0},":sweat_drops:":{unicode:["1f4a6"],fname:"1f4a6",uc:"1f4a6",isCanonical:!0},":back:":{unicode:["1f519"],fname:"1f519",uc:"1f519",isCanonical:!0},":end:":{unicode:["1f51a"],fname:"1f51a",uc:"1f51a",isCanonical:!0},":droplet:":{unicode:["1f4a7"],fname:"1f4a7",uc:"1f4a7",isCanonical:!0},":on:":{unicode:["1f51b"],fname:"1f51b",uc:"1f51b",isCanonical:!0},":soon:":{unicode:["1f51c"],fname:"1f51c",uc:"1f51c",isCanonical:!0},":dash:":{unicode:["1f4a8"],fname:"1f4a8",uc:"1f4a8",isCanonical:!0},":top:":{unicode:["1f51d"],fname:"1f51d",uc:"1f51d",isCanonical:!0},":underage:":{unicode:["1f51e"],fname:"1f51e",uc:"1f51e",isCanonical:!0},":poop:":{unicode:["1f4a9"],fname:"1f4a9",uc:"1f4a9",isCanonical:!0},":shit:":{unicode:["1f4a9"],fname:"1f4a9",uc:"1f4a9",isCanonical:!1},":hankey:":{unicode:["1f4a9"],fname:"1f4a9",uc:"1f4a9",isCanonical:!1},":poo:":{unicode:["1f4a9"],fname:"1f4a9",uc:"1f4a9",isCanonical:!1},":keycap_ten:":{unicode:["1f51f"],fname:"1f51f",uc:"1f51f",isCanonical:!0},":muscle:":{unicode:["1f4aa"],fname:"1f4aa",uc:"1f4aa",isCanonical:!0},":capital_abcd:":{unicode:["1f520"],fname:"1f520",uc:"1f520",isCanonical:!0},":abcd:":{unicode:["1f521"],fname:"1f521",uc:"1f521",isCanonical:!0},":dizzy:":{unicode:["1f4ab"],fname:"1f4ab",uc:"1f4ab",isCanonical:!0},":1234:":{unicode:["1f522"],fname:"1f522",uc:"1f522",isCanonical:!0},":symbols:":{unicode:["1f523"],fname:"1f523",uc:"1f523",isCanonical:!0},":speech_balloon:":{unicode:["1f4ac"],fname:"1f4ac",uc:"1f4ac",isCanonical:!0},":abc:":{unicode:["1f524"],fname:"1f524",uc:"1f524",isCanonical:!0},":fire:":{unicode:["1f525"],fname:"1f525",uc:"1f525",isCanonical:!0},":flame:":{unicode:["1f525"],fname:"1f525",uc:"1f525",isCanonical:!1},":white_flower:":{unicode:["1f4ae"],fname:"1f4ae",uc:"1f4ae",isCanonical:!0},":flashlight:":{unicode:["1f526"],fname:"1f526",uc:"1f526",isCanonical:!0},":wrench:":{unicode:["1f527"],fname:"1f527",uc:"1f527",isCanonical:!0},":100:":{unicode:["1f4af"],fname:"1f4af",uc:"1f4af",isCanonical:!0},":hammer:":{unicode:["1f528"],fname:"1f528",uc:"1f528",isCanonical:!0},":nut_and_bolt:":{unicode:["1f529"],fname:"1f529",uc:"1f529",isCanonical:!0},":moneybag:":{unicode:["1f4b0"],fname:"1f4b0",uc:"1f4b0",isCanonical:!0},":knife:":{unicode:["1f52a"],fname:"1f52a",uc:"1f52a",isCanonical:!0},":gun:":{unicode:["1f52b"],fname:"1f52b",uc:"1f52b",isCanonical:!0},":currency_exchange:":{unicode:["1f4b1"],fname:"1f4b1",uc:"1f4b1",isCanonical:!0},":crystal_ball:":{unicode:["1f52e"],fname:"1f52e",uc:"1f52e",isCanonical:!0},":heavy_dollar_sign:":{unicode:["1f4b2"],fname:"1f4b2",uc:"1f4b2",isCanonical:!0},":six_pointed_star:":{unicode:["1f52f"],fname:"1f52f",uc:"1f52f",isCanonical:!0},":credit_card:":{unicode:["1f4b3"],fname:"1f4b3",uc:"1f4b3",isCanonical:!0},":beginner:":{unicode:["1f530"],fname:"1f530",uc:"1f530",isCanonical:!0},":trident:":{unicode:["1f531"],fname:"1f531",uc:"1f531",isCanonical:!0},":yen:":{unicode:["1f4b4"],fname:"1f4b4",uc:"1f4b4",isCanonical:!0},":black_square_button:":{unicode:["1f532"],fname:"1f532",uc:"1f532",isCanonical:!0},":white_square_button:":{unicode:["1f533"],fname:"1f533",uc:"1f533",isCanonical:!0},":dollar:":{unicode:["1f4b5"],fname:"1f4b5",uc:"1f4b5",isCanonical:!0},":red_circle:":{unicode:["1f534"],fname:"1f534",uc:"1f534",isCanonical:!0},":blue_circle:":{unicode:["1f535"],fname:"1f535",uc:"1f535",isCanonical:!0},":money_with_wings:":{unicode:["1f4b8"],fname:"1f4b8",uc:"1f4b8",isCanonical:!0},":large_orange_diamond:":{unicode:["1f536"],fname:"1f536",uc:"1f536",isCanonical:!0},":large_blue_diamond:":{unicode:["1f537"],fname:"1f537",uc:"1f537",isCanonical:!0},":chart:":{unicode:["1f4b9"],fname:"1f4b9",uc:"1f4b9",isCanonical:!0},":small_orange_diamond:":{unicode:["1f538"],fname:"1f538",uc:"1f538",isCanonical:!0},":small_blue_diamond:":{unicode:["1f539"],fname:"1f539",uc:"1f539",isCanonical:!0},":seat:":{unicode:["1f4ba"],fname:"1f4ba",uc:"1f4ba",isCanonical:!0},":small_red_triangle:":{unicode:["1f53a"],fname:"1f53a",uc:"1f53a",isCanonical:!0},":small_red_triangle_down:":{unicode:["1f53b"],fname:"1f53b",uc:"1f53b",isCanonical:!0},":computer:":{unicode:["1f4bb"],fname:"1f4bb",uc:"1f4bb",isCanonical:!0},":arrow_up_small:":{unicode:["1f53c"],fname:"1f53c",uc:"1f53c",isCanonical:!0},":briefcase:":{unicode:["1f4bc"],fname:"1f4bc",uc:"1f4bc",isCanonical:!0},":arrow_down_small:":{unicode:["1f53d"],fname:"1f53d",uc:"1f53d",isCanonical:!0},":clock1:":{unicode:["1f550"],fname:"1f550",uc:"1f550",isCanonical:!0},":minidisc:":{unicode:["1f4bd"],fname:"1f4bd",uc:"1f4bd",isCanonical:!0},":clock2:":{unicode:["1f551"],fname:"1f551",uc:"1f551",isCanonical:!0},":floppy_disk:":{unicode:["1f4be"],fname:"1f4be",uc:"1f4be",isCanonical:!0},":clock3:":{unicode:["1f552"],fname:"1f552",uc:"1f552",isCanonical:!0},":cd:":{unicode:["1f4bf"],fname:"1f4bf",uc:"1f4bf",isCanonical:!0},":clock4:":{unicode:["1f553"],fname:"1f553",uc:"1f553",isCanonical:!0},":dvd:":{unicode:["1f4c0"],fname:"1f4c0",uc:"1f4c0",isCanonical:!0},":clock5:":{unicode:["1f554"],fname:"1f554",uc:"1f554",isCanonical:!0},":clock6:":{unicode:["1f555"],fname:"1f555",uc:"1f555",isCanonical:!0},":file_folder:":{unicode:["1f4c1"],fname:"1f4c1",uc:"1f4c1",isCanonical:!0},":clock7:":{unicode:["1f556"],fname:"1f556",uc:"1f556",isCanonical:!0},":clock8:":{unicode:["1f557"],fname:"1f557",uc:"1f557",isCanonical:!0},":open_file_folder:":{unicode:["1f4c2"],fname:"1f4c2",uc:"1f4c2",isCanonical:!0},":clock9:":{unicode:["1f558"],fname:"1f558",uc:"1f558",isCanonical:!0},":clock10:":{unicode:["1f559"],fname:"1f559",uc:"1f559",isCanonical:!0},":page_with_curl:":{unicode:["1f4c3"],fname:"1f4c3",uc:"1f4c3",isCanonical:!0},":clock11:":{unicode:["1f55a"],fname:"1f55a",uc:"1f55a",isCanonical:!0},":clock12:":{unicode:["1f55b"],fname:"1f55b",uc:"1f55b",isCanonical:!0},":page_facing_up:":{unicode:["1f4c4"],fname:"1f4c4",uc:"1f4c4",isCanonical:!0},":mount_fuji:":{unicode:["1f5fb"],fname:"1f5fb",uc:"1f5fb",isCanonical:!0},":tokyo_tower:":{unicode:["1f5fc"],fname:"1f5fc",uc:"1f5fc",isCanonical:!0},":date:":{unicode:["1f4c5"],fname:"1f4c5",uc:"1f4c5",isCanonical:!0},":statue_of_liberty:":{unicode:["1f5fd"],fname:"1f5fd",uc:"1f5fd",isCanonical:!0},":japan:":{unicode:["1f5fe"],fname:"1f5fe",uc:"1f5fe",isCanonical:!0},":calendar:":{unicode:["1f4c6"],fname:"1f4c6",uc:"1f4c6",isCanonical:!0},":moyai:":{unicode:["1f5ff"],fname:"1f5ff",uc:"1f5ff",isCanonical:!0},":grin:":{unicode:["1f601"],fname:"1f601",uc:"1f601",isCanonical:!0},":joy:":{unicode:["1f602"],fname:"1f602",uc:"1f602",isCanonical:!0},":smiley:":{unicode:["1f603"],fname:"1f603",uc:"1f603",isCanonical:!0},":chart_with_upwards_trend:":{unicode:["1f4c8"],fname:"1f4c8",uc:"1f4c8",isCanonical:!0},":smile:":{unicode:["1f604"],fname:"1f604",uc:"1f604",isCanonical:!0},":sweat_smile:":{unicode:["1f605"],fname:"1f605",uc:"1f605",isCanonical:!0},":chart_with_downwards_trend:":{unicode:["1f4c9"],fname:"1f4c9",uc:"1f4c9",isCanonical:!0},":laughing:":{unicode:["1f606"],fname:"1f606",uc:"1f606",isCanonical:!0},":satisfied:":{unicode:["1f606"],fname:"1f606",uc:"1f606",isCanonical:!1},":wink:":{unicode:["1f609"],fname:"1f609",uc:"1f609",isCanonical:!0},":bar_chart:":{unicode:["1f4ca"],fname:"1f4ca",uc:"1f4ca",isCanonical:!0},":blush:":{unicode:["1f60a"],fname:"1f60a",uc:"1f60a",isCanonical:!0},":yum:":{unicode:["1f60b"],fname:"1f60b",uc:"1f60b",isCanonical:!0},":clipboard:":{unicode:["1f4cb"],fname:"1f4cb",uc:"1f4cb",isCanonical:!0},":relieved:":{unicode:["1f60c"],fname:"1f60c",uc:"1f60c",isCanonical:!0},":heart_eyes:":{unicode:["1f60d"],fname:"1f60d",uc:"1f60d",isCanonical:!0},":pushpin:":{unicode:["1f4cc"],fname:"1f4cc",uc:"1f4cc",isCanonical:!0},":smirk:":{unicode:["1f60f"],fname:"1f60f",uc:"1f60f",isCanonical:!0},":unamused:":{unicode:["1f612"],fname:"1f612",uc:"1f612",isCanonical:!0},":round_pushpin:":{unicode:["1f4cd"],fname:"1f4cd",uc:"1f4cd",isCanonical:!0},":sweat:":{unicode:["1f613"],fname:"1f613",uc:"1f613",isCanonical:!0},":pensive:":{unicode:["1f614"],fname:"1f614",uc:"1f614",isCanonical:!0},":paperclip:":{unicode:["1f4ce"],fname:"1f4ce",uc:"1f4ce",isCanonical:!0},":confounded:":{unicode:["1f616"],fname:"1f616",uc:"1f616",isCanonical:!0},":kissing_heart:":{unicode:["1f618"],fname:"1f618",uc:"1f618",isCanonical:!0},":straight_ruler:":{unicode:["1f4cf"],fname:"1f4cf",uc:"1f4cf",isCanonical:!0},":kissing_closed_eyes:":{unicode:["1f61a"],fname:"1f61a",uc:"1f61a",isCanonical:!0},":stuck_out_tongue_winking_eye:":{unicode:["1f61c"],fname:"1f61c",uc:"1f61c",isCanonical:!0},":triangular_ruler:":{unicode:["1f4d0"],fname:"1f4d0",uc:"1f4d0",isCanonical:!0},":stuck_out_tongue_closed_eyes:":{unicode:["1f61d"],fname:"1f61d",uc:"1f61d",isCanonical:!0},":disappointed:":{unicode:["1f61e"],fname:"1f61e",uc:"1f61e",isCanonical:!0},":bookmark_tabs:":{unicode:["1f4d1"],fname:"1f4d1",uc:"1f4d1",isCanonical:!0},":angry:":{unicode:["1f620"],fname:"1f620",uc:"1f620",isCanonical:!0},":rage:":{unicode:["1f621"],fname:"1f621",uc:"1f621",isCanonical:!0},":cry:":{unicode:["1f622"],fname:"1f622",uc:"1f622",isCanonical:!0},":persevere:":{unicode:["1f623"],fname:"1f623",uc:"1f623",isCanonical:!0},":triumph:":{unicode:["1f624"],fname:"1f624",uc:"1f624",isCanonical:!0},":disappointed_relieved:":{unicode:["1f625"],fname:"1f625",uc:"1f625",isCanonical:!0},":fearful:":{unicode:["1f628"],fname:"1f628",uc:"1f628",isCanonical:!0},":weary:":{unicode:["1f629"],fname:"1f629",uc:"1f629",isCanonical:!0},":sleepy:":{unicode:["1f62a"],fname:"1f62a",uc:"1f62a",isCanonical:!0},":tired_face:":{unicode:["1f62b"],fname:"1f62b",uc:"1f62b",isCanonical:!0},":sob:":{unicode:["1f62d"],fname:"1f62d",uc:"1f62d",isCanonical:!0},":cold_sweat:":{unicode:["1f630"],fname:"1f630",uc:"1f630",isCanonical:!0},":scream:":{unicode:["1f631"],fname:"1f631",uc:"1f631",isCanonical:!0},":astonished:":{unicode:["1f632"],fname:"1f632",uc:"1f632",isCanonical:!0},":flushed:":{unicode:["1f633"],fname:"1f633",uc:"1f633",isCanonical:!0},":dizzy_face:":{unicode:["1f635"],fname:"1f635",uc:"1f635",isCanonical:!0},":mask:":{unicode:["1f637"],fname:"1f637",uc:"1f637",isCanonical:!0},":smile_cat:":{unicode:["1f638"],fname:"1f638",uc:"1f638",isCanonical:!0},":joy_cat:":{unicode:["1f639"],fname:"1f639",uc:"1f639",isCanonical:!0},":smiley_cat:":{unicode:["1f63a"],fname:"1f63a",uc:"1f63a",isCanonical:!0},":heart_eyes_cat:":{unicode:["1f63b"],fname:"1f63b",uc:"1f63b",isCanonical:!0},":smirk_cat:":{unicode:["1f63c"],fname:"1f63c",uc:"1f63c",isCanonical:!0},":kissing_cat:":{unicode:["1f63d"],fname:"1f63d",uc:"1f63d",isCanonical:!0},":pouting_cat:":{unicode:["1f63e"],fname:"1f63e",uc:"1f63e",isCanonical:!0},":crying_cat_face:":{unicode:["1f63f"],fname:"1f63f",uc:"1f63f",isCanonical:!0},":scream_cat:":{unicode:["1f640"],fname:"1f640",uc:"1f640",isCanonical:!0},":no_good:":{unicode:["1f645"],fname:"1f645",uc:"1f645",isCanonical:!0},":ok_woman:":{unicode:["1f646"],fname:"1f646",uc:"1f646",isCanonical:!0},":bow:":{unicode:["1f647"],fname:"1f647",uc:"1f647",isCanonical:!0},":see_no_evil:":{unicode:["1f648"],fname:"1f648",uc:"1f648",isCanonical:!0},":hear_no_evil:":{unicode:["1f649"],fname:"1f649",uc:"1f649",isCanonical:!0},":speak_no_evil:":{unicode:["1f64a"],fname:"1f64a",uc:"1f64a",isCanonical:!0},":raising_hand:":{unicode:["1f64b"],fname:"1f64b",uc:"1f64b",isCanonical:!0},":raised_hands:":{unicode:["1f64c"],fname:"1f64c",uc:"1f64c",isCanonical:!0},":person_frowning:":{unicode:["1f64d"],fname:"1f64d",uc:"1f64d",isCanonical:!0},":person_with_pouting_face:":{unicode:["1f64e"],fname:"1f64e",uc:"1f64e",isCanonical:!0},":pray:":{unicode:["1f64f"],fname:"1f64f",uc:"1f64f",isCanonical:!0},":rocket:":{unicode:["1f680"],fname:"1f680",uc:"1f680",isCanonical:!0},":railway_car:":{unicode:["1f683"],fname:"1f683",uc:"1f683",isCanonical:!0},":bullettrain_side:":{unicode:["1f684"],fname:"1f684",uc:"1f684",isCanonical:!0},":bullettrain_front:":{unicode:["1f685"],fname:"1f685",uc:"1f685",isCanonical:!0},":metro:":{unicode:["1f687"],fname:"1f687",uc:"1f687",isCanonical:!0},":station:":{unicode:["1f689"],fname:"1f689",uc:"1f689",isCanonical:!0},":bus:":{unicode:["1f68c"],fname:"1f68c",uc:"1f68c",isCanonical:!0},":busstop:":{unicode:["1f68f"],fname:"1f68f",uc:"1f68f",isCanonical:!0},":ambulance:":{unicode:["1f691"],fname:"1f691",uc:"1f691",isCanonical:!0},":fire_engine:":{unicode:["1f692"],fname:"1f692",uc:"1f692",isCanonical:!0},":police_car:":{unicode:["1f693"],fname:"1f693",uc:"1f693",isCanonical:!0},":taxi:":{unicode:["1f695"],fname:"1f695",uc:"1f695",isCanonical:!0},":red_car:":{unicode:["1f697"],fname:"1f697",uc:"1f697",isCanonical:!0},":blue_car:":{unicode:["1f699"],fname:"1f699",uc:"1f699",isCanonical:!0},":truck:":{unicode:["1f69a"],fname:"1f69a",uc:"1f69a",isCanonical:!0},":ship:":{unicode:["1f6a2"],fname:"1f6a2",uc:"1f6a2",isCanonical:!0},":speedboat:":{unicode:["1f6a4"],fname:"1f6a4",uc:"1f6a4",isCanonical:!0},":traffic_light:":{unicode:["1f6a5"],fname:"1f6a5",uc:"1f6a5",isCanonical:!0},":construction:":{unicode:["1f6a7"],fname:"1f6a7",uc:"1f6a7",isCanonical:!0},":rotating_light:":{unicode:["1f6a8"],fname:"1f6a8",uc:"1f6a8",isCanonical:!0},":triangular_flag_on_post:":{unicode:["1f6a9"],fname:"1f6a9",uc:"1f6a9",isCanonical:!0},":door:":{unicode:["1f6aa"],fname:"1f6aa",uc:"1f6aa",isCanonical:!0},":no_entry_sign:":{unicode:["1f6ab"],fname:"1f6ab",uc:"1f6ab",isCanonical:!0},":smoking:":{unicode:["1f6ac"],fname:"1f6ac",uc:"1f6ac",isCanonical:!0},":no_smoking:":{unicode:["1f6ad"],fname:"1f6ad",uc:"1f6ad",isCanonical:!0},":bike:":{unicode:["1f6b2"],fname:"1f6b2",uc:"1f6b2",isCanonical:!0},":walking:":{unicode:["1f6b6"],fname:"1f6b6",uc:"1f6b6",isCanonical:!0},":mens:":{unicode:["1f6b9"],fname:"1f6b9",uc:"1f6b9",isCanonical:!0},":womens:":{unicode:["1f6ba"],fname:"1f6ba",uc:"1f6ba",isCanonical:!0},":restroom:":{unicode:["1f6bb"],fname:"1f6bb",uc:"1f6bb",isCanonical:!0},":baby_symbol:":{unicode:["1f6bc"],fname:"1f6bc",uc:"1f6bc",isCanonical:!0},":toilet:":{unicode:["1f6bd"],fname:"1f6bd",uc:"1f6bd",isCanonical:!0},":wc:":{unicode:["1f6be"],fname:"1f6be",uc:"1f6be",isCanonical:!0},":bath:":{unicode:["1f6c0"],fname:"1f6c0",uc:"1f6c0",isCanonical:!0},":metal:":{unicode:["1f918"],fname:"1f918",uc:"1f918",isCanonical:!0},":sign_of_the_horns:":{unicode:["1f918"],fname:"1f918",uc:"1f918",isCanonical:!1},":grinning:":{unicode:["1f600"],fname:"1f600",uc:"1f600",isCanonical:!0},":innocent:":{unicode:["1f607"],fname:"1f607",uc:"1f607",isCanonical:!0},":smiling_imp:":{unicode:["1f608"],fname:"1f608",uc:"1f608",isCanonical:!0},":sunglasses:":{unicode:["1f60e"],fname:"1f60e",uc:"1f60e",isCanonical:!0},":neutral_face:":{unicode:["1f610"],fname:"1f610",uc:"1f610",isCanonical:!0},":expressionless:":{unicode:["1f611"],fname:"1f611",uc:"1f611",isCanonical:!0},":confused:":{unicode:["1f615"],fname:"1f615",uc:"1f615",isCanonical:!0},":kissing:":{unicode:["1f617"],fname:"1f617",uc:"1f617",isCanonical:!0},":kissing_smiling_eyes:":{unicode:["1f619"],fname:"1f619",uc:"1f619",isCanonical:!0},":stuck_out_tongue:":{unicode:["1f61b"],fname:"1f61b",uc:"1f61b",isCanonical:!0},":worried:":{unicode:["1f61f"],fname:"1f61f",uc:"1f61f",isCanonical:!0},":frowning:":{unicode:["1f626"],fname:"1f626",uc:"1f626",isCanonical:!0},":anguished:":{unicode:["1f627"],fname:"1f627",uc:"1f627",isCanonical:!0},":grimacing:":{unicode:["1f62c"],fname:"1f62c",uc:"1f62c",isCanonical:!0},":open_mouth:":{unicode:["1f62e"],fname:"1f62e",uc:"1f62e",isCanonical:!0},":hushed:":{unicode:["1f62f"],fname:"1f62f",uc:"1f62f",isCanonical:!0},":sleeping:":{unicode:["1f634"],fname:"1f634",uc:"1f634",isCanonical:!0},":no_mouth:":{unicode:["1f636"],fname:"1f636",uc:"1f636",isCanonical:!0},":helicopter:":{unicode:["1f681"],fname:"1f681",uc:"1f681",isCanonical:!0},":steam_locomotive:":{unicode:["1f682"],fname:"1f682",uc:"1f682",isCanonical:!0},":train2:":{unicode:["1f686"],fname:"1f686",uc:"1f686",isCanonical:!0},":light_rail:":{unicode:["1f688"],fname:"1f688",uc:"1f688",isCanonical:!0},":tram:":{unicode:["1f68a"],fname:"1f68a",uc:"1f68a",isCanonical:!0},":oncoming_bus:":{unicode:["1f68d"],fname:"1f68d",uc:"1f68d",isCanonical:!0},":trolleybus:":{unicode:["1f68e"],fname:"1f68e",uc:"1f68e",isCanonical:!0},":minibus:":{unicode:["1f690"],fname:"1f690",uc:"1f690",isCanonical:!0},":oncoming_police_car:":{unicode:["1f694"],fname:"1f694",uc:"1f694",isCanonical:!0},":oncoming_taxi:":{unicode:["1f696"],fname:"1f696",uc:"1f696",isCanonical:!0},":oncoming_automobile:":{unicode:["1f698"],fname:"1f698",uc:"1f698",isCanonical:!0},":articulated_lorry:":{unicode:["1f69b"],fname:"1f69b",uc:"1f69b",isCanonical:!0},":tractor:":{unicode:["1f69c"],fname:"1f69c",uc:"1f69c",isCanonical:!0},":monorail:":{unicode:["1f69d"],fname:"1f69d",uc:"1f69d",isCanonical:!0},":mountain_railway:":{unicode:["1f69e"],fname:"1f69e",uc:"1f69e",isCanonical:!0},":suspension_railway:":{unicode:["1f69f"],fname:"1f69f",uc:"1f69f",isCanonical:!0},":mountain_cableway:":{unicode:["1f6a0"],fname:"1f6a0",uc:"1f6a0",isCanonical:!0},":aerial_tramway:":{unicode:["1f6a1"],fname:"1f6a1",uc:"1f6a1",isCanonical:!0},":rowboat:":{unicode:["1f6a3"],fname:"1f6a3",uc:"1f6a3",isCanonical:!0},":vertical_traffic_light:":{unicode:["1f6a6"],fname:"1f6a6",uc:"1f6a6",isCanonical:!0},":put_litter_in_its_place:":{unicode:["1f6ae"],fname:"1f6ae",uc:"1f6ae",isCanonical:!0},":do_not_litter:":{unicode:["1f6af"],fname:"1f6af",uc:"1f6af",isCanonical:!0},":potable_water:":{unicode:["1f6b0"],fname:"1f6b0",uc:"1f6b0",isCanonical:!0},":non-potable_water:":{unicode:["1f6b1"],fname:"1f6b1",uc:"1f6b1",isCanonical:!0},":no_bicycles:":{unicode:["1f6b3"],fname:"1f6b3",uc:"1f6b3",isCanonical:!0},":bicyclist:":{unicode:["1f6b4"],fname:"1f6b4",uc:"1f6b4",isCanonical:!0},":mountain_bicyclist:":{unicode:["1f6b5"],fname:"1f6b5",uc:"1f6b5",isCanonical:!0},":no_pedestrians:":{unicode:["1f6b7"],fname:"1f6b7",uc:"1f6b7",isCanonical:!0},":children_crossing:":{unicode:["1f6b8"],fname:"1f6b8",uc:"1f6b8",isCanonical:!0},":shower:":{unicode:["1f6bf"],fname:"1f6bf",uc:"1f6bf",isCanonical:!0},":bathtub:":{unicode:["1f6c1"],fname:"1f6c1",uc:"1f6c1",isCanonical:!0},":passport_control:":{unicode:["1f6c2"],fname:"1f6c2",uc:"1f6c2",isCanonical:!0},":customs:":{unicode:["1f6c3"],fname:"1f6c3",uc:"1f6c3",isCanonical:!0},":baggage_claim:":{unicode:["1f6c4"],fname:"1f6c4",uc:"1f6c4",isCanonical:!0},":left_luggage:":{unicode:["1f6c5"],fname:"1f6c5",uc:"1f6c5",isCanonical:!0},":earth_africa:":{unicode:["1f30d"],fname:"1f30d",uc:"1f30d",isCanonical:!0},":earth_americas:":{unicode:["1f30e"],fname:"1f30e",uc:"1f30e",isCanonical:!0},":globe_with_meridians:":{unicode:["1f310"],fname:"1f310",uc:"1f310",isCanonical:!0},":waxing_crescent_moon:":{unicode:["1f312"],fname:"1f312",uc:"1f312",isCanonical:!0},":waning_gibbous_moon:":{unicode:["1f316"],fname:"1f316",uc:"1f316",isCanonical:!0},":last_quarter_moon:":{unicode:["1f317"],fname:"1f317",uc:"1f317",isCanonical:!0},":waning_crescent_moon:":{unicode:["1f318"],fname:"1f318",uc:"1f318",isCanonical:!0},":new_moon_with_face:":{unicode:["1f31a"],fname:"1f31a",uc:"1f31a",isCanonical:!0},":last_quarter_moon_with_face:":{unicode:["1f31c"],fname:"1f31c",uc:"1f31c",isCanonical:!0},":full_moon_with_face:":{unicode:["1f31d"],fname:"1f31d",uc:"1f31d",isCanonical:!0},":sun_with_face:":{unicode:["1f31e"],fname:"1f31e",uc:"1f31e",isCanonical:!0},":evergreen_tree:":{unicode:["1f332"],fname:"1f332",uc:"1f332",isCanonical:!0},":deciduous_tree:":{unicode:["1f333"],fname:"1f333",uc:"1f333",isCanonical:!0},":lemon:":{unicode:["1f34b"],fname:"1f34b",uc:"1f34b",isCanonical:!0},":pear:":{unicode:["1f350"],fname:"1f350",uc:"1f350",isCanonical:!0},":baby_bottle:":{unicode:["1f37c"],fname:"1f37c",uc:"1f37c",isCanonical:!0},":horse_racing:":{unicode:["1f3c7"],fname:"1f3c7",uc:"1f3c7",isCanonical:!0},":rugby_football:":{unicode:["1f3c9"],fname:"1f3c9",uc:"1f3c9",isCanonical:!0},":european_post_office:":{unicode:["1f3e4"],fname:"1f3e4",uc:"1f3e4",isCanonical:!0},":rat:":{unicode:["1f400"],fname:"1f400",uc:"1f400",isCanonical:!0},":mouse2:":{unicode:["1f401"],fname:"1f401",uc:"1f401",isCanonical:!0},":ox:":{unicode:["1f402"],fname:"1f402",uc:"1f402",isCanonical:!0},":water_buffalo:":{unicode:["1f403"],fname:"1f403",uc:"1f403",isCanonical:!0},":cow2:":{unicode:["1f404"],fname:"1f404",uc:"1f404",isCanonical:!0},":tiger2:":{unicode:["1f405"],fname:"1f405",uc:"1f405",isCanonical:!0},":leopard:":{unicode:["1f406"],fname:"1f406",uc:"1f406",isCanonical:!0},":rabbit2:":{unicode:["1f407"],fname:"1f407",uc:"1f407",isCanonical:!0},":cat2:":{unicode:["1f408"],fname:"1f408",uc:"1f408",isCanonical:!0},":dragon:":{unicode:["1f409"],fname:"1f409",uc:"1f409",isCanonical:!0},":crocodile:":{unicode:["1f40a"],fname:"1f40a",uc:"1f40a",isCanonical:!0},":whale2:":{unicode:["1f40b"],fname:"1f40b",uc:"1f40b",isCanonical:!0},":ram:":{unicode:["1f40f"],fname:"1f40f",uc:"1f40f",isCanonical:!0},":goat:":{unicode:["1f410"],fname:"1f410",uc:"1f410",isCanonical:!0},":rooster:":{unicode:["1f413"],fname:"1f413",uc:"1f413",isCanonical:!0},":dog2:":{unicode:["1f415"],fname:"1f415",uc:"1f415",isCanonical:!0},":pig2:":{unicode:["1f416"],fname:"1f416",uc:"1f416",isCanonical:!0},":dromedary_camel:":{unicode:["1f42a"],fname:"1f42a",uc:"1f42a",isCanonical:!0},":busts_in_silhouette:":{unicode:["1f465"],fname:"1f465",uc:"1f465",isCanonical:!0},":two_men_holding_hands:":{unicode:["1f46c"],fname:"1f46c",uc:"1f46c",isCanonical:!0},":two_women_holding_hands:":{unicode:["1f46d"],fname:"1f46d",uc:"1f46d",isCanonical:!0},":thought_balloon:":{unicode:["1f4ad"],fname:"1f4ad",uc:"1f4ad",isCanonical:!0},":euro:":{unicode:["1f4b6"],fname:"1f4b6",uc:"1f4b6",isCanonical:!0},":pound:":{unicode:["1f4b7"],fname:"1f4b7",uc:"1f4b7",isCanonical:!0},":mailbox_with_mail:":{unicode:["1f4ec"],fname:"1f4ec",uc:"1f4ec",isCanonical:!0},":mailbox_with_no_mail:":{unicode:["1f4ed"],
fname:"1f4ed",uc:"1f4ed",isCanonical:!0},":postal_horn:":{unicode:["1f4ef"],fname:"1f4ef",uc:"1f4ef",isCanonical:!0},":no_mobile_phones:":{unicode:["1f4f5"],fname:"1f4f5",uc:"1f4f5",isCanonical:!0},":twisted_rightwards_arrows:":{unicode:["1f500"],fname:"1f500",uc:"1f500",isCanonical:!0},":repeat:":{unicode:["1f501"],fname:"1f501",uc:"1f501",isCanonical:!0},":repeat_one:":{unicode:["1f502"],fname:"1f502",uc:"1f502",isCanonical:!0},":arrows_counterclockwise:":{unicode:["1f504"],fname:"1f504",uc:"1f504",isCanonical:!0},":low_brightness:":{unicode:["1f505"],fname:"1f505",uc:"1f505",isCanonical:!0},":high_brightness:":{unicode:["1f506"],fname:"1f506",uc:"1f506",isCanonical:!0},":mute:":{unicode:["1f507"],fname:"1f507",uc:"1f507",isCanonical:!0},":sound:":{unicode:["1f509"],fname:"1f509",uc:"1f509",isCanonical:!0},":no_bell:":{unicode:["1f515"],fname:"1f515",uc:"1f515",isCanonical:!0},":microscope:":{unicode:["1f52c"],fname:"1f52c",uc:"1f52c",isCanonical:!0},":telescope:":{unicode:["1f52d"],fname:"1f52d",uc:"1f52d",isCanonical:!0},":clock130:":{unicode:["1f55c"],fname:"1f55c",uc:"1f55c",isCanonical:!0},":clock230:":{unicode:["1f55d"],fname:"1f55d",uc:"1f55d",isCanonical:!0},":clock330:":{unicode:["1f55e"],fname:"1f55e",uc:"1f55e",isCanonical:!0},":clock430:":{unicode:["1f55f"],fname:"1f55f",uc:"1f55f",isCanonical:!0},":clock530:":{unicode:["1f560"],fname:"1f560",uc:"1f560",isCanonical:!0},":clock630:":{unicode:["1f561"],fname:"1f561",uc:"1f561",isCanonical:!0},":clock730:":{unicode:["1f562"],fname:"1f562",uc:"1f562",isCanonical:!0},":clock830:":{unicode:["1f563"],fname:"1f563",uc:"1f563",isCanonical:!0},":clock930:":{unicode:["1f564"],fname:"1f564",uc:"1f564",isCanonical:!0},":clock1030:":{unicode:["1f565"],fname:"1f565",uc:"1f565",isCanonical:!0},":clock1130:":{unicode:["1f566"],fname:"1f566",uc:"1f566",isCanonical:!0},":clock1230:":{unicode:["1f567"],fname:"1f567",uc:"1f567",isCanonical:!0},":speaker:":{unicode:["1f508"],fname:"1f508",uc:"1f508",isCanonical:!0},":train:":{unicode:["1f68b"],fname:"1f68b",uc:"1f68b",isCanonical:!0},":medal:":{unicode:["1f3c5"],fname:"1f3c5",uc:"1f3c5",isCanonical:!0},":sports_medal:":{unicode:["1f3c5"],fname:"1f3c5",uc:"1f3c5",isCanonical:!1},":flag_black:":{unicode:["1f3f4"],fname:"1f3f4",uc:"1f3f4",isCanonical:!0},":waving_black_flag:":{unicode:["1f3f4"],fname:"1f3f4",uc:"1f3f4",isCanonical:!1},":camera_with_flash:":{unicode:["1f4f8"],fname:"1f4f8",uc:"1f4f8",isCanonical:!0},":sleeping_accommodation:":{unicode:["1f6cc"],fname:"1f6cc",uc:"1f6cc",isCanonical:!0},":middle_finger:":{unicode:["1f595"],fname:"1f595",uc:"1f595",isCanonical:!0},":reversed_hand_with_middle_finger_extended:":{unicode:["1f595"],fname:"1f595",uc:"1f595",isCanonical:!1},":vulcan:":{unicode:["1f596"],fname:"1f596",uc:"1f596",isCanonical:!0},":raised_hand_with_part_between_middle_and_ring_fingers:":{unicode:["1f596"],fname:"1f596",uc:"1f596",isCanonical:!1},":slight_frown:":{unicode:["1f641"],fname:"1f641",uc:"1f641",isCanonical:!0},":slightly_frowning_face:":{unicode:["1f641"],fname:"1f641",uc:"1f641",isCanonical:!1},":slight_smile:":{unicode:["1f642"],fname:"1f642",uc:"1f642",isCanonical:!0},":slightly_smiling_face:":{unicode:["1f642"],fname:"1f642",uc:"1f642",isCanonical:!1},":airplane_departure:":{unicode:["1f6eb"],fname:"1f6eb",uc:"1f6eb",isCanonical:!0},":airplane_arriving:":{unicode:["1f6ec"],fname:"1f6ec",uc:"1f6ec",isCanonical:!0},":tone1:":{unicode:["1f3fb"],fname:"1f3fb",uc:"1f3fb",isCanonical:!0},":tone2:":{unicode:["1f3fc"],fname:"1f3fc",uc:"1f3fc",isCanonical:!0},":tone3:":{unicode:["1f3fd"],fname:"1f3fd",uc:"1f3fd",isCanonical:!0},":tone4:":{unicode:["1f3fe"],fname:"1f3fe",uc:"1f3fe",isCanonical:!0},":tone5:":{unicode:["1f3ff"],fname:"1f3ff",uc:"1f3ff",isCanonical:!0},":upside_down:":{unicode:["1f643"],fname:"1f643",uc:"1f643",isCanonical:!0},":upside_down_face:":{unicode:["1f643"],fname:"1f643",uc:"1f643",isCanonical:!1},":money_mouth:":{unicode:["1f911"],fname:"1f911",uc:"1f911",isCanonical:!0},":money_mouth_face:":{unicode:["1f911"],fname:"1f911",uc:"1f911",isCanonical:!1},":nerd:":{unicode:["1f913"],fname:"1f913",uc:"1f913",isCanonical:!0},":nerd_face:":{unicode:["1f913"],fname:"1f913",uc:"1f913",isCanonical:!1},":hugging:":{unicode:["1f917"],fname:"1f917",uc:"1f917",isCanonical:!0},":hugging_face:":{unicode:["1f917"],fname:"1f917",uc:"1f917",isCanonical:!1},":rolling_eyes:":{unicode:["1f644"],fname:"1f644",uc:"1f644",isCanonical:!0},":face_with_rolling_eyes:":{unicode:["1f644"],fname:"1f644",uc:"1f644",isCanonical:!1},":thinking:":{unicode:["1f914"],fname:"1f914",uc:"1f914",isCanonical:!0},":thinking_face:":{unicode:["1f914"],fname:"1f914",uc:"1f914",isCanonical:!1},":zipper_mouth:":{unicode:["1f910"],fname:"1f910",uc:"1f910",isCanonical:!0},":zipper_mouth_face:":{unicode:["1f910"],fname:"1f910",uc:"1f910",isCanonical:!1},":thermometer_face:":{unicode:["1f912"],fname:"1f912",uc:"1f912",isCanonical:!0},":face_with_thermometer:":{unicode:["1f912"],fname:"1f912",uc:"1f912",isCanonical:!1},":head_bandage:":{unicode:["1f915"],fname:"1f915",uc:"1f915",isCanonical:!0},":face_with_head_bandage:":{unicode:["1f915"],fname:"1f915",uc:"1f915",isCanonical:!1},":robot:":{unicode:["1f916"],fname:"1f916",uc:"1f916",isCanonical:!0},":robot_face:":{unicode:["1f916"],fname:"1f916",uc:"1f916",isCanonical:!1},":lion_face:":{unicode:["1f981"],fname:"1f981",uc:"1f981",isCanonical:!0},":lion:":{unicode:["1f981"],fname:"1f981",uc:"1f981",isCanonical:!1},":unicorn:":{unicode:["1f984"],fname:"1f984",uc:"1f984",isCanonical:!0},":unicorn_face:":{unicode:["1f984"],fname:"1f984",uc:"1f984",isCanonical:!1},":scorpion:":{unicode:["1f982"],fname:"1f982",uc:"1f982",isCanonical:!0},":crab:":{unicode:["1f980"],fname:"1f980",uc:"1f980",isCanonical:!0},":turkey:":{unicode:["1f983"],fname:"1f983",uc:"1f983",isCanonical:!0},":cheese:":{unicode:["1f9c0"],fname:"1f9c0",uc:"1f9c0",isCanonical:!0},":cheese_wedge:":{unicode:["1f9c0"],fname:"1f9c0",uc:"1f9c0",isCanonical:!1},":hotdog:":{unicode:["1f32d"],fname:"1f32d",uc:"1f32d",isCanonical:!0},":hot_dog:":{unicode:["1f32d"],fname:"1f32d",uc:"1f32d",isCanonical:!1},":taco:":{unicode:["1f32e"],fname:"1f32e",uc:"1f32e",isCanonical:!0},":burrito:":{unicode:["1f32f"],fname:"1f32f",uc:"1f32f",isCanonical:!0},":popcorn:":{unicode:["1f37f"],fname:"1f37f",uc:"1f37f",isCanonical:!0},":champagne:":{unicode:["1f37e"],fname:"1f37e",uc:"1f37e",isCanonical:!0},":bottle_with_popping_cork:":{unicode:["1f37e"],fname:"1f37e",uc:"1f37e",isCanonical:!1},":bow_and_arrow:":{unicode:["1f3f9"],fname:"1f3f9",uc:"1f3f9",isCanonical:!0},":archery:":{unicode:["1f3f9"],fname:"1f3f9",uc:"1f3f9",isCanonical:!1},":amphora:":{unicode:["1f3fa"],fname:"1f3fa",uc:"1f3fa",isCanonical:!0},":place_of_worship:":{unicode:["1f6d0"],fname:"1f6d0",uc:"1f6d0",isCanonical:!0},":worship_symbol:":{unicode:["1f6d0"],fname:"1f6d0",uc:"1f6d0",isCanonical:!1},":kaaba:":{unicode:["1f54b"],fname:"1f54b",uc:"1f54b",isCanonical:!0},":mosque:":{unicode:["1f54c"],fname:"1f54c",uc:"1f54c",isCanonical:!0},":synagogue:":{unicode:["1f54d"],fname:"1f54d",uc:"1f54d",isCanonical:!0},":menorah:":{unicode:["1f54e"],fname:"1f54e",uc:"1f54e",isCanonical:!0},":prayer_beads:":{unicode:["1f4ff"],fname:"1f4ff",uc:"1f4ff",isCanonical:!0},":cricket:":{unicode:["1f3cf"],fname:"1f3cf",uc:"1f3cf",isCanonical:!0},":cricket_bat_ball:":{unicode:["1f3cf"],fname:"1f3cf",uc:"1f3cf",isCanonical:!1},":volleyball:":{unicode:["1f3d0"],fname:"1f3d0",uc:"1f3d0",isCanonical:!0},":field_hockey:":{unicode:["1f3d1"],fname:"1f3d1",uc:"1f3d1",isCanonical:!0},":hockey:":{unicode:["1f3d2"],fname:"1f3d2",uc:"1f3d2",isCanonical:!0},":ping_pong:":{unicode:["1f3d3"],fname:"1f3d3",uc:"1f3d3",isCanonical:!0},":table_tennis:":{unicode:["1f3d3"],fname:"1f3d3",uc:"1f3d3",isCanonical:!1},":badminton:":{unicode:["1f3f8"],fname:"1f3f8",uc:"1f3f8",isCanonical:!0},":drum:":{unicode:["1f941"],fname:"1f941",uc:"1f941",isCanonical:!0},":drum_with_drumsticks:":{unicode:["1f941"],fname:"1f941",uc:"1f941",isCanonical:!1},":shrimp:":{unicode:["1f990"],fname:"1f990",uc:"1f990",isCanonical:!0},":squid:":{unicode:["1f991"],fname:"1f991",uc:"1f991",isCanonical:!0},":egg:":{unicode:["1f95a"],fname:"1f95a",uc:"1f95a",isCanonical:!0},":milk:":{unicode:["1f95b"],fname:"1f95b",uc:"1f95b",isCanonical:!0},":glass_of_milk:":{unicode:["1f95b"],fname:"1f95b",uc:"1f95b",isCanonical:!1},":peanuts:":{unicode:["1f95c"],fname:"1f95c",uc:"1f95c",isCanonical:!0},":shelled_peanut:":{unicode:["1f95c"],fname:"1f95c",uc:"1f95c",isCanonical:!1},":kiwi:":{unicode:["1f95d"],fname:"1f95d",uc:"1f95d",isCanonical:!0},":kiwifruit:":{unicode:["1f95d"],fname:"1f95d",uc:"1f95d",isCanonical:!1},":pancakes:":{unicode:["1f95e"],fname:"1f95e",uc:"1f95e",isCanonical:!0},":regional_indicator_w:":{unicode:["1f1fc"],fname:"1f1fc",uc:"1f1fc",isCanonical:!0},":regional_indicator_v:":{unicode:["1f1fb"],fname:"1f1fb",uc:"1f1fb",isCanonical:!0},":regional_indicator_u:":{unicode:["1f1fa"],fname:"1f1fa",uc:"1f1fa",isCanonical:!0},":regional_indicator_t:":{unicode:["1f1f9"],fname:"1f1f9",uc:"1f1f9",isCanonical:!0},":regional_indicator_s:":{unicode:["1f1f8"],fname:"1f1f8",uc:"1f1f8",isCanonical:!0},":regional_indicator_r:":{unicode:["1f1f7"],fname:"1f1f7",uc:"1f1f7",isCanonical:!0},":regional_indicator_q:":{unicode:["1f1f6"],fname:"1f1f6",uc:"1f1f6",isCanonical:!0},":regional_indicator_p:":{unicode:["1f1f5"],fname:"1f1f5",uc:"1f1f5",isCanonical:!0},":regional_indicator_o:":{unicode:["1f1f4"],fname:"1f1f4",uc:"1f1f4",isCanonical:!0},":regional_indicator_n:":{unicode:["1f1f3"],fname:"1f1f3",uc:"1f1f3",isCanonical:!0},":regional_indicator_m:":{unicode:["1f1f2"],fname:"1f1f2",uc:"1f1f2",isCanonical:!0},":regional_indicator_l:":{unicode:["1f1f1"],fname:"1f1f1",uc:"1f1f1",isCanonical:!0},":regional_indicator_k:":{unicode:["1f1f0"],fname:"1f1f0",uc:"1f1f0",isCanonical:!0},":regional_indicator_j:":{unicode:["1f1ef"],fname:"1f1ef",uc:"1f1ef",isCanonical:!0},":regional_indicator_i:":{unicode:["1f1ee"],fname:"1f1ee",uc:"1f1ee",isCanonical:!0},":regional_indicator_h:":{unicode:["1f1ed"],fname:"1f1ed",uc:"1f1ed",isCanonical:!0},":regional_indicator_g:":{unicode:["1f1ec"],fname:"1f1ec",uc:"1f1ec",isCanonical:!0},":regional_indicator_f:":{unicode:["1f1eb"],fname:"1f1eb",uc:"1f1eb",isCanonical:!0},":regional_indicator_e:":{unicode:["1f1ea"],fname:"1f1ea",uc:"1f1ea",isCanonical:!0},":regional_indicator_d:":{unicode:["1f1e9"],fname:"1f1e9",uc:"1f1e9",isCanonical:!0},":regional_indicator_c:":{unicode:["1f1e8"],fname:"1f1e8",uc:"1f1e8",isCanonical:!0},":regional_indicator_b:":{unicode:["1f1e7"],fname:"1f1e7",uc:"1f1e7",isCanonical:!0},":regional_indicator_a:":{unicode:["1f1e6"],fname:"1f1e6",uc:"1f1e6",isCanonical:!0},":fast_forward:":{unicode:["23e9"],fname:"23e9",uc:"23e9",isCanonical:!0},":rewind:":{unicode:["23ea"],fname:"23ea",uc:"23ea",isCanonical:!0},":arrow_double_up:":{unicode:["23eb"],fname:"23eb",uc:"23eb",isCanonical:!0},":arrow_double_down:":{unicode:["23ec"],fname:"23ec",uc:"23ec",isCanonical:!0},":alarm_clock:":{unicode:["23f0"],fname:"23f0",uc:"23f0",isCanonical:!0},":hourglass_flowing_sand:":{unicode:["23f3"],fname:"23f3",uc:"23f3",isCanonical:!0},":ophiuchus:":{unicode:["26ce"],fname:"26ce",uc:"26ce",isCanonical:!0},":white_check_mark:":{unicode:["2705"],fname:"2705",uc:"2705",isCanonical:!0},":fist:":{unicode:["270a"],fname:"270a",uc:"270a",isCanonical:!0},":raised_hand:":{unicode:["270b"],fname:"270b",uc:"270b",isCanonical:!0},":sparkles:":{unicode:["2728"],fname:"2728",uc:"2728",isCanonical:!0},":x:":{unicode:["274c"],fname:"274c",uc:"274c",isCanonical:!0},":negative_squared_cross_mark:":{unicode:["274e"],fname:"274e",uc:"274e",isCanonical:!0},":question:":{unicode:["2753"],fname:"2753",uc:"2753",isCanonical:!0},":grey_question:":{unicode:["2754"],fname:"2754",uc:"2754",isCanonical:!0},":grey_exclamation:":{unicode:["2755"],fname:"2755",uc:"2755",isCanonical:!0},":heavy_plus_sign:":{unicode:["2795"],fname:"2795",uc:"2795",isCanonical:!0},":heavy_minus_sign:":{unicode:["2796"],fname:"2796",uc:"2796",isCanonical:!0},":heavy_division_sign:":{unicode:["2797"],fname:"2797",uc:"2797",isCanonical:!0},":curly_loop:":{unicode:["27b0"],fname:"27b0",uc:"27b0",isCanonical:!0},":loop:":{unicode:["27bf"],fname:"27bf",uc:"27bf",isCanonical:!0}};var n,u=[];for(n in f.emojioneList)f.emojioneList.hasOwnProperty(n)&&u.push(n.replace(/[+]/g,"\\$&"));f.shortnames=u.join("|"),f.asciiList={"<3":"2764","</3":"1f494",":')":"1f602",":'-)":"1f602",":D":"1f603",":-D":"1f603","=D":"1f603",":)":"1f642",":-)":"1f642","=]":"1f642","=)":"1f642",":]":"1f642","':)":"1f605","':-)":"1f605","'=)":"1f605","':D":"1f605","':-D":"1f605","'=D":"1f605",">:)":"1f606",">;)":"1f606",">:-)":"1f606",">=)":"1f606",";)":"1f609",";-)":"1f609","*-)":"1f609","*)":"1f609",";-]":"1f609",";]":"1f609",";D":"1f609",";^)":"1f609","':(":"1f613","':-(":"1f613","'=(":"1f613",":*":"1f618",":-*":"1f618","=*":"1f618",":^*":"1f618",">:P":"1f61c","X-P":"1f61c","x-p":"1f61c",">:[":"1f61e",":-(":"1f61e",":(":"1f61e",":-[":"1f61e",":[":"1f61e","=(":"1f61e",">:(":"1f620",">:-(":"1f620",":@":"1f620",":'(":"1f622",":'-(":"1f622",";(":"1f622",";-(":"1f622",">.<":"1f623","D:":"1f628",":$":"1f633","=$":"1f633","#-)":"1f635","#)":"1f635","%-)":"1f635","%)":"1f635","X)":"1f635","X-)":"1f635","*\\0/*":"1f646","\\0/":"1f646","*\\O/*":"1f646","\\O/":"1f646","O:-)":"1f607","0:-3":"1f607","0:3":"1f607","0:-)":"1f607","0:)":"1f607","0;^)":"1f607","O:)":"1f607","O;-)":"1f607","O=)":"1f607","0;-)":"1f607","O:-3":"1f607","O:3":"1f607","B-)":"1f60e","B)":"1f60e","8)":"1f60e","8-)":"1f60e","B-D":"1f60e","8-D":"1f60e","-_-":"1f611","-__-":"1f611","-___-":"1f611",">:\\":"1f615",">:/":"1f615",":-/":"1f615",":-.":"1f615",":/":"1f615",":\\":"1f615","=/":"1f615","=\\":"1f615",":L":"1f615","=L":"1f615",":P":"1f61b",":-P":"1f61b","=P":"1f61b",":-p":"1f61b",":p":"1f61b","=p":"1f61b",":-Þ":"1f61b",":Þ":"1f61b",":þ":"1f61b",":-þ":"1f61b",":-b":"1f61b",":b":"1f61b","d:":"1f61b",":-O":"1f62e",":O":"1f62e",":-o":"1f62e",":o":"1f62e",O_O:"1f62e",">:O":"1f62e",":-X":"1f636",":X":"1f636",":-#":"1f636",":#":"1f636","=X":"1f636","=x":"1f636",":x":"1f636",":-x":"1f636","=#":"1f636"},f.asciiRegexp="(\\<3|&lt;3|\\<\\/3|&lt;\\/3|\\:'\\)|\\:'\\-\\)|\\:D|\\:\\-D|\\=D|\\:\\)|\\:\\-\\)|\\=\\]|\\=\\)|\\:\\]|'\\:\\)|'\\:\\-\\)|'\\=\\)|'\\:D|'\\:\\-D|'\\=D|\\>\\:\\)|&gt;\\:\\)|\\>;\\)|&gt;;\\)|\\>\\:\\-\\)|&gt;\\:\\-\\)|\\>\\=\\)|&gt;\\=\\)|;\\)|;\\-\\)|\\*\\-\\)|\\*\\)|;\\-\\]|;\\]|;D|;\\^\\)|'\\:\\(|'\\:\\-\\(|'\\=\\(|\\:\\*|\\:\\-\\*|\\=\\*|\\:\\^\\*|\\>\\:P|&gt;\\:P|X\\-P|x\\-p|\\>\\:\\[|&gt;\\:\\[|\\:\\-\\(|\\:\\(|\\:\\-\\[|\\:\\[|\\=\\(|\\>\\:\\(|&gt;\\:\\(|\\>\\:\\-\\(|&gt;\\:\\-\\(|\\:@|\\:'\\(|\\:'\\-\\(|;\\(|;\\-\\(|\\>\\.\\<|&gt;\\.&lt;|D\\:|\\:\\$|\\=\\$|#\\-\\)|#\\)|%\\-\\)|%\\)|X\\)|X\\-\\)|\\*\\\\0\\/\\*|\\\\0\\/|\\*\\\\O\\/\\*|\\\\O\\/|O\\:\\-\\)|0\\:\\-3|0\\:3|0\\:\\-\\)|0\\:\\)|0;\\^\\)|O\\:\\-\\)|O\\:\\)|O;\\-\\)|O\\=\\)|0;\\-\\)|O\\:\\-3|O\\:3|B\\-\\)|B\\)|8\\)|8\\-\\)|B\\-D|8\\-D|\\-_\\-|\\-__\\-|\\-___\\-|\\>\\:\\\\|&gt;\\:\\\\|\\>\\:\\/|&gt;\\:\\/|\\:\\-\\/|\\:\\-\\.|\\:\\/|\\:\\\\|\\=\\/|\\=\\\\|\\:L|\\=L|\\:P|\\:\\-P|\\=P|\\:\\-p|\\:p|\\=p|\\:\\-Þ|\\:\\-&THORN;|\\:Þ|\\:&THORN;|\\:þ|\\:&thorn;|\\:\\-þ|\\:\\-&thorn;|\\:\\-b|\\:b|d\\:|\\:\\-O|\\:O|\\:\\-o|\\:o|O_O|\\>\\:O|&gt;\\:O|\\:\\-X|\\:X|\\:\\-#|\\:#|\\=X|\\=x|\\:x|\\:\\-x|\\=#)",f.unicodeRegexp="(\\uD83D\\uDC69\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC66\\u200D\\uD83D\\uDC66|\\uD83D\\uDC69\\u200D\\u2764\\uFE0F\\u200D\\uD83D\\uDC8B\\u200D\\uD83D\\uDC69|\\uD83D\\uDC68\\u200D\\u2764\\uFE0F\\u200D\\uD83D\\uDC8B\\u200D\\uD83D\\uDC68|\\uD83D\\uDC68\\u200D\\uD83D\\uDC68\\u200D\\uD83D\\uDC67\\u200D\\uD83D\\uDC66|\\uD83D\\uDC69\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC67\\u200D\\uD83D\\uDC67|\\uD83D\\uDC68\\u200D\\uD83D\\uDC68\\u200D\\uD83D\\uDC67\\u200D\\uD83D\\uDC67|\\uD83D\\uDC69\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC67\\u200D\\uD83D\\uDC66|\\uD83D\\uDC68\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC66\\u200D\\uD83D\\uDC66|\\uD83D\\uDC68\\u200D\\uD83D\\uDC68\\u200D\\uD83D\\uDC66\\u200D\\uD83D\\uDC66|\\uD83D\\uDC68\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC67\\u200D\\uD83D\\uDC66|\\uD83D\\uDC68\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC67\\u200D\\uD83D\\uDC67|\\uD83D\\uDC69\\u200D\\u2764\\uFE0F\\u200D\\uD83D\\uDC69|\\uD83D\\uDC68\\uD83D\\uDC69\\uD83D\\uDC67\\uD83D\\uDC66|\\uD83D\\uDC68\\uD83D\\uDC69\\uD83D\\uDC66\\uD83D\\uDC66|\\uD83D\\uDC69\\uD83D\\uDC69\\uD83D\\uDC66\\uD83D\\uDC66|\\uD83D\\uDC68\\uD83D\\uDC68\\uD83D\\uDC67\\uD83D\\uDC67|\\uD83D\\uDC69\\uD83D\\uDC69\\uD83D\\uDC67\\uD83D\\uDC66|\\uD83D\\uDC68\\uD83D\\uDC68\\uD83D\\uDC67\\uD83D\\uDC66|\\uD83D\\uDC69\\uD83D\\uDC69\\uD83D\\uDC67\\uD83D\\uDC67|\\uD83D\\uDC68\\uD83D\\uDC69\\uD83D\\uDC67\\uD83D\\uDC67|\\uD83D\\uDC68\\uD83D\\uDC68\\uD83D\\uDC66\\uD83D\\uDC66|\\uD83D\\uDC68\\u200D\\u2764\\uFE0F\\u200D\\uD83D\\uDC68|\\uD83D\\uDC69\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC67|\\uD83D\\uDC68\\u200D\\uD83D\\uDC68\\u200D\\uD83D\\uDC66|\\uD83D\\uDC69\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC66|\\uD83D\\uDC68\\u200D\\uD83D\\uDC68\\u200D\\uD83D\\uDC67|\\uD83D\\uDC68\\u200D\\uD83D\\uDC69\\u200D\\uD83D\\uDC67|\\uD83D\\uDC69\\u2764\\uD83D\\uDC8B\\uD83D\\uDC69|\\uD83D\\uDC68\\u2764\\uD83D\\uDC8B\\uD83D\\uDC68|\\uD83D\\uDC68\\uD83D\\uDC68\\uD83D\\uDC67|\\uD83D\\uDC68\\uD83D\\uDC68\\uD83D\\uDC66|\\uD83D\\uDC69\\uD83D\\uDC69\\uD83D\\uDC66|\\uD83D\\uDC69\\uD83D\\uDC69\\uD83D\\uDC67|\\uD83C\\uDFF3\\uFE0F\\u200D\\uD83C\\uDF08|\\uD83D\\uDC68\\uD83D\\uDC69\\uD83D\\uDC67|\\uD83D\\uDC68\\u2764\\uD83D\\uDC68|\\uD83D\\uDC41\\u200D\\uD83D\\uDDE8|\\uD83D\\uDC69\\u2764\\uD83D\\uDC69|\\uD83D\\uDC41\\uD83D\\uDDE8|\\uD83C\\uDDE6\\uD83C\\uDDE8|\\uD83C\\uDDE6\\uD83C\\uDDE9|\\uD83C\\uDDE6\\uD83C\\uDDEA|\\uD83C\\uDDE6\\uD83C\\uDDEB|\\uD83C\\uDDE6\\uD83C\\uDDEC|\\uD83C\\uDDE6\\uD83C\\uDDEE|\\uD83C\\uDDE6\\uD83C\\uDDF1|\\uD83C\\uDDE6\\uD83C\\uDDF2|\\uD83C\\uDDE6\\uD83C\\uDDF4|\\uD83C\\uDDE6\\uD83C\\uDDF6|\\uD83C\\uDDE6\\uD83C\\uDDF7|\\uD83C\\uDDE6\\uD83C\\uDDF8|\\uD83E\\uDD3E\\uD83C\\uDFFF|\\uD83E\\uDD3E\\uD83C\\uDFFE|\\uD83E\\uDD3E\\uD83C\\uDFFD|\\uD83E\\uDD3E\\uD83C\\uDFFC|\\uD83E\\uDD3E\\uD83C\\uDFFB|\\uD83E\\uDD3D\\uD83C\\uDFFF|\\uD83E\\uDD3D\\uD83C\\uDFFE|\\uD83E\\uDD3D\\uD83C\\uDFFD|\\uD83E\\uDD3D\\uD83C\\uDFFC|\\uD83E\\uDD3D\\uD83C\\uDFFB|\\uD83E\\uDD3C\\uD83C\\uDFFF|\\uD83E\\uDD3C\\uD83C\\uDFFE|\\uD83E\\uDD3C\\uD83C\\uDFFD|\\uD83E\\uDD3C\\uD83C\\uDFFC|\\uD83E\\uDD3C\\uD83C\\uDFFB|\\uD83E\\uDD39\\uD83C\\uDFFF|\\uD83E\\uDD39\\uD83C\\uDFFE|\\uD83E\\uDD39\\uD83C\\uDFFD|\\uD83E\\uDD39\\uD83C\\uDFFC|\\uD83E\\uDD39\\uD83C\\uDFFB|\\uD83E\\uDD38\\uD83C\\uDFFF|\\uD83E\\uDD38\\uD83C\\uDFFE|\\uD83E\\uDD38\\uD83C\\uDFFD|\\uD83E\\uDD38\\uD83C\\uDFFC|\\uD83E\\uDD38\\uD83C\\uDFFB|\\uD83E\\uDD37\\uD83C\\uDFFF|\\uD83E\\uDD37\\uD83C\\uDFFE|\\uD83E\\uDD37\\uD83C\\uDFFD|\\uD83E\\uDD37\\uD83C\\uDFFC|\\uD83E\\uDD37\\uD83C\\uDFFB|\\uD83E\\uDD36\\uD83C\\uDFFF|\\uD83E\\uDD36\\uD83C\\uDFFE|\\uD83E\\uDD36\\uD83C\\uDFFD|\\uD83E\\uDD36\\uD83C\\uDFFC|\\uD83E\\uDD36\\uD83C\\uDFFB|\\uD83E\\uDD35\\uD83C\\uDFFF|\\uD83E\\uDD35\\uD83C\\uDFFE|\\uD83E\\uDD35\\uD83C\\uDFFD|\\uD83E\\uDD35\\uD83C\\uDFFC|\\uD83E\\uDD35\\uD83C\\uDFFB|\\uD83E\\uDD34\\uD83C\\uDFFF|\\uD83E\\uDD34\\uD83C\\uDFFE|\\uD83E\\uDD34\\uD83C\\uDFFD|\\uD83E\\uDD34\\uD83C\\uDFFC|\\uD83E\\uDD34\\uD83C\\uDFFB|\\uD83E\\uDD33\\uD83C\\uDFFF|\\uD83E\\uDD33\\uD83C\\uDFFE|\\uD83E\\uDD33\\uD83C\\uDFFD|\\uD83E\\uDD33\\uD83C\\uDFFC|\\uD83E\\uDD33\\uD83C\\uDFFB|\\uD83E\\uDD30\\uD83C\\uDFFF|\\uD83E\\uDD30\\uD83C\\uDFFE|\\uD83E\\uDD30\\uD83C\\uDFFD|\\uD83E\\uDD30\\uD83C\\uDFFC|\\uD83E\\uDD30\\uD83C\\uDFFB|\\uD83E\\uDD26\\uD83C\\uDFFF|\\uD83E\\uDD26\\uD83C\\uDFFE|\\uD83E\\uDD26\\uD83C\\uDFFD|\\uD83E\\uDD26\\uD83C\\uDFFC|\\uD83E\\uDD26\\uD83C\\uDFFB|\\uD83E\\uDD1E\\uD83C\\uDFFF|\\uD83E\\uDD1E\\uD83C\\uDFFE|\\uD83E\\uDD1E\\uD83C\\uDFFD|\\uD83E\\uDD1E\\uD83C\\uDFFC|\\uD83E\\uDD1E\\uD83C\\uDFFB|\\uD83E\\uDD1D\\uD83C\\uDFFF|\\uD83E\\uDD1D\\uD83C\\uDFFE|\\uD83E\\uDD1D\\uD83C\\uDFFD|\\uD83E\\uDD1D\\uD83C\\uDFFC|\\uD83E\\uDD1D\\uD83C\\uDFFB|\\uD83E\\uDD1C\\uD83C\\uDFFF|\\uD83E\\uDD1C\\uD83C\\uDFFE|\\uD83E\\uDD1C\\uD83C\\uDFFD|\\uD83E\\uDD1C\\uD83C\\uDFFC|\\uD83E\\uDD1C\\uD83C\\uDFFB|\\uD83E\\uDD1B\\uD83C\\uDFFF|\\uD83E\\uDD1B\\uD83C\\uDFFE|\\uD83E\\uDD1B\\uD83C\\uDFFD|\\uD83E\\uDD1B\\uD83C\\uDFFC|\\uD83E\\uDD1B\\uD83C\\uDFFB|\\uD83E\\uDD1A\\uD83C\\uDFFF|\\uD83E\\uDD1A\\uD83C\\uDFFE|\\uD83E\\uDD1A\\uD83C\\uDFFD|\\uD83E\\uDD1A\\uD83C\\uDFFC|\\uD83E\\uDD1A\\uD83C\\uDFFB|\\uD83E\\uDD19\\uD83C\\uDFFF|\\uD83E\\uDD19\\uD83C\\uDFFE|\\uD83E\\uDD19\\uD83C\\uDFFD|\\uD83E\\uDD19\\uD83C\\uDFFC|\\uD83E\\uDD19\\uD83C\\uDFFB|\\uD83E\\uDD18\\uD83C\\uDFFF|\\uD83E\\uDD18\\uD83C\\uDFFE|\\uD83E\\uDD18\\uD83C\\uDFFD|\\uD83E\\uDD18\\uD83C\\uDFFC|\\uD83E\\uDD18\\uD83C\\uDFFB|\\uD83D\\uDEC0\\uD83C\\uDFFF|\\uD83D\\uDEC0\\uD83C\\uDFFE|\\uD83D\\uDEC0\\uD83C\\uDFFD|\\uD83D\\uDEC0\\uD83C\\uDFFC|\\uD83D\\uDEC0\\uD83C\\uDFFB|\\uD83D\\uDEB6\\uD83C\\uDFFF|\\uD83D\\uDEB6\\uD83C\\uDFFE|\\uD83D\\uDEB6\\uD83C\\uDFFD|\\uD83D\\uDEB6\\uD83C\\uDFFC|\\uD83D\\uDEB6\\uD83C\\uDFFB|\\uD83D\\uDEB5\\uD83C\\uDFFF|\\uD83D\\uDEB5\\uD83C\\uDFFE|\\uD83D\\uDEB5\\uD83C\\uDFFD|\\uD83D\\uDEB5\\uD83C\\uDFFC|\\uD83D\\uDEB5\\uD83C\\uDFFB|\\uD83D\\uDEB4\\uD83C\\uDFFF|\\uD83D\\uDEB4\\uD83C\\uDFFE|\\uD83D\\uDEB4\\uD83C\\uDFFD|\\uD83D\\uDEB4\\uD83C\\uDFFC|\\uD83D\\uDEB4\\uD83C\\uDFFB|\\uD83D\\uDEA3\\uD83C\\uDFFF|\\uD83D\\uDEA3\\uD83C\\uDFFE|\\uD83D\\uDEA3\\uD83C\\uDFFD|\\uD83D\\uDEA3\\uD83C\\uDFFC|\\uD83D\\uDEA3\\uD83C\\uDFFB|\\uD83D\\uDE4F\\uD83C\\uDFFF|\\uD83D\\uDE4F\\uD83C\\uDFFE|\\uD83D\\uDE4F\\uD83C\\uDFFD|\\uD83D\\uDE4F\\uD83C\\uDFFC|\\uD83D\\uDE4F\\uD83C\\uDFFB|\\uD83D\\uDE4E\\uD83C\\uDFFF|\\uD83D\\uDE4E\\uD83C\\uDFFE|\\uD83D\\uDE4E\\uD83C\\uDFFD|\\uD83D\\uDE4E\\uD83C\\uDFFC|\\uD83D\\uDE4E\\uD83C\\uDFFB|\\uD83D\\uDE4D\\uD83C\\uDFFF|\\uD83D\\uDE4D\\uD83C\\uDFFE|\\uD83D\\uDE4D\\uD83C\\uDFFD|\\uD83D\\uDE4D\\uD83C\\uDFFC|\\uD83D\\uDE4D\\uD83C\\uDFFB|\\uD83D\\uDE4C\\uD83C\\uDFFF|\\uD83D\\uDE4C\\uD83C\\uDFFE|\\uD83D\\uDE4C\\uD83C\\uDFFD|\\uD83D\\uDE4C\\uD83C\\uDFFC|\\uD83D\\uDE4C\\uD83C\\uDFFB|\\uD83D\\uDE4B\\uD83C\\uDFFF|\\uD83D\\uDE4B\\uD83C\\uDFFE|\\uD83D\\uDE4B\\uD83C\\uDFFD|\\uD83D\\uDE4B\\uD83C\\uDFFC|\\uD83D\\uDE4B\\uD83C\\uDFFB|\\uD83D\\uDE47\\uD83C\\uDFFF|\\uD83D\\uDE47\\uD83C\\uDFFE|\\uD83D\\uDE47\\uD83C\\uDFFD|\\uD83D\\uDE47\\uD83C\\uDFFC|\\uD83D\\uDE47\\uD83C\\uDFFB|\\uD83D\\uDE46\\uD83C\\uDFFF|\\uD83D\\uDE46\\uD83C\\uDFFE|\\uD83D\\uDE46\\uD83C\\uDFFD|\\uD83D\\uDE46\\uD83C\\uDFFC|\\uD83D\\uDE46\\uD83C\\uDFFB|\\uD83D\\uDE45\\uD83C\\uDFFF|\\uD83D\\uDE45\\uD83C\\uDFFE|\\uD83D\\uDE45\\uD83C\\uDFFD|\\uD83D\\uDE45\\uD83C\\uDFFC|\\uD83D\\uDE45\\uD83C\\uDFFB|\\uD83D\\uDD96\\uD83C\\uDFFF|\\uD83D\\uDD96\\uD83C\\uDFFE|\\uD83D\\uDD96\\uD83C\\uDFFD|\\uD83D\\uDD96\\uD83C\\uDFFC|\\uD83D\\uDD96\\uD83C\\uDFFB|\\uD83D\\uDD95\\uD83C\\uDFFF|\\uD83D\\uDD95\\uD83C\\uDFFE|\\uD83D\\uDD95\\uD83C\\uDFFD|\\uD83D\\uDD95\\uD83C\\uDFFC|\\uD83D\\uDD95\\uD83C\\uDFFB|\\uD83D\\uDD90\\uD83C\\uDFFF|\\uD83D\\uDD90\\uD83C\\uDFFE|\\uD83D\\uDD90\\uD83C\\uDFFD|\\uD83D\\uDD90\\uD83C\\uDFFC|\\uD83D\\uDD90\\uD83C\\uDFFB|\\uD83D\\uDD7A\\uD83C\\uDFFF|\\uD83D\\uDD7A\\uD83C\\uDFFE|\\uD83D\\uDD7A\\uD83C\\uDFFD|\\uD83D\\uDD7A\\uD83C\\uDFFC|\\uD83D\\uDD7A\\uD83C\\uDFFB|\\uD83D\\uDD75\\uD83C\\uDFFF|\\uD83D\\uDD75\\uD83C\\uDFFE|\\uD83D\\uDD75\\uD83C\\uDFFD|\\uD83D\\uDD75\\uD83C\\uDFFC|\\uD83D\\uDD75\\uD83C\\uDFFB|\\uD83D\\uDCAA\\uD83C\\uDFFF|\\uD83D\\uDCAA\\uD83C\\uDFFE|\\uD83D\\uDCAA\\uD83C\\uDFFD|\\uD83D\\uDCAA\\uD83C\\uDFFC|\\uD83D\\uDCAA\\uD83C\\uDFFB|\\uD83D\\uDC87\\uD83C\\uDFFF|\\uD83D\\uDC87\\uD83C\\uDFFE|\\uD83D\\uDC87\\uD83C\\uDFFD|\\uD83D\\uDC87\\uD83C\\uDFFC|\\uD83D\\uDC87\\uD83C\\uDFFB|\\uD83D\\uDC86\\uD83C\\uDFFF|\\uD83D\\uDC86\\uD83C\\uDFFE|\\uD83D\\uDC86\\uD83C\\uDFFD|\\uD83D\\uDC86\\uD83C\\uDFFC|\\uD83D\\uDC86\\uD83C\\uDFFB|\\uD83D\\uDC85\\uD83C\\uDFFF|\\uD83D\\uDC85\\uD83C\\uDFFE|\\uD83D\\uDC85\\uD83C\\uDFFD|\\uD83D\\uDC85\\uD83C\\uDFFC|\\uD83D\\uDC85\\uD83C\\uDFFB|\\uD83D\\uDC83\\uD83C\\uDFFF|\\uD83D\\uDC83\\uD83C\\uDFFE|\\uD83D\\uDC83\\uD83C\\uDFFD|\\uD83D\\uDC83\\uD83C\\uDFFC|\\uD83D\\uDC83\\uD83C\\uDFFB|\\uD83D\\uDC82\\uD83C\\uDFFF|\\uD83D\\uDC82\\uD83C\\uDFFE|\\uD83D\\uDC82\\uD83C\\uDFFD|\\uD83D\\uDC82\\uD83C\\uDFFC|\\uD83D\\uDC82\\uD83C\\uDFFB|\\uD83D\\uDC81\\uD83C\\uDFFF|\\uD83D\\uDC81\\uD83C\\uDFFE|\\uD83D\\uDC81\\uD83C\\uDFFD|\\uD83D\\uDC81\\uD83C\\uDFFC|\\uD83D\\uDC81\\uD83C\\uDFFB|\\uD83D\\uDC7C\\uD83C\\uDFFF|\\uD83D\\uDC7C\\uD83C\\uDFFE|\\uD83D\\uDC7C\\uD83C\\uDFFD|\\uD83D\\uDC7C\\uD83C\\uDFFC|\\uD83D\\uDC7C\\uD83C\\uDFFB|\\uD83D\\uDC78\\uD83C\\uDFFF|\\uD83D\\uDC78\\uD83C\\uDFFE|\\uD83D\\uDC78\\uD83C\\uDFFD|\\uD83D\\uDC78\\uD83C\\uDFFC|\\uD83D\\uDC78\\uD83C\\uDFFB|\\uD83D\\uDC77\\uD83C\\uDFFF|\\uD83D\\uDC77\\uD83C\\uDFFE|\\uD83D\\uDC77\\uD83C\\uDFFD|\\uD83D\\uDC77\\uD83C\\uDFFC|\\uD83D\\uDC77\\uD83C\\uDFFB|\\uD83D\\uDC76\\uD83C\\uDFFF|\\uD83D\\uDC76\\uD83C\\uDFFE|\\uD83D\\uDC76\\uD83C\\uDFFD|\\uD83D\\uDC76\\uD83C\\uDFFC|\\uD83D\\uDC76\\uD83C\\uDFFB|\\uD83D\\uDC75\\uD83C\\uDFFF|\\uD83D\\uDC75\\uD83C\\uDFFE|\\uD83D\\uDC75\\uD83C\\uDFFD|\\uD83D\\uDC75\\uD83C\\uDFFC|\\uD83D\\uDC75\\uD83C\\uDFFB|\\uD83D\\uDC74\\uD83C\\uDFFF|\\uD83D\\uDC74\\uD83C\\uDFFE|\\uD83D\\uDC74\\uD83C\\uDFFD|\\uD83D\\uDC74\\uD83C\\uDFFC|\\uD83D\\uDC74\\uD83C\\uDFFB|\\uD83D\\uDC73\\uD83C\\uDFFF|\\uD83D\\uDC73\\uD83C\\uDFFE|\\uD83D\\uDC73\\uD83C\\uDFFD|\\uD83D\\uDC73\\uD83C\\uDFFC|\\uD83D\\uDC73\\uD83C\\uDFFB|\\uD83D\\uDC72\\uD83C\\uDFFF|\\uD83D\\uDC72\\uD83C\\uDFFE|\\uD83D\\uDC72\\uD83C\\uDFFD|\\uD83D\\uDC72\\uD83C\\uDFFC|\\uD83D\\uDC72\\uD83C\\uDFFB|\\uD83D\\uDC71\\uD83C\\uDFFF|\\uD83D\\uDC71\\uD83C\\uDFFE|\\uD83D\\uDC71\\uD83C\\uDFFD|\\uD83D\\uDC71\\uD83C\\uDFFC|\\uD83D\\uDC71\\uD83C\\uDFFB|\\uD83D\\uDC70\\uD83C\\uDFFF|\\uD83D\\uDC70\\uD83C\\uDFFE|\\uD83D\\uDC70\\uD83C\\uDFFD|\\uD83D\\uDC70\\uD83C\\uDFFC|\\uD83D\\uDC70\\uD83C\\uDFFB|\\uD83D\\uDC6E\\uD83C\\uDFFF|\\uD83D\\uDC6E\\uD83C\\uDFFE|\\uD83D\\uDC6E\\uD83C\\uDFFD|\\uD83D\\uDC6E\\uD83C\\uDFFC|\\uD83D\\uDC6E\\uD83C\\uDFFB|\\uD83D\\uDC69\\uD83C\\uDFFF|\\uD83D\\uDC69\\uD83C\\uDFFE|\\uD83D\\uDC69\\uD83C\\uDFFD|\\uD83D\\uDC69\\uD83C\\uDFFC|\\uD83D\\uDC69\\uD83C\\uDFFB|\\uD83D\\uDC68\\uD83C\\uDFFF|\\uD83D\\uDC68\\uD83C\\uDFFE|\\uD83D\\uDC68\\uD83C\\uDFFD|\\uD83D\\uDC68\\uD83C\\uDFFC|\\uD83D\\uDC68\\uD83C\\uDFFB|\\uD83D\\uDC67\\uD83C\\uDFFF|\\uD83D\\uDC67\\uD83C\\uDFFE|\\uD83D\\uDC67\\uD83C\\uDFFD|\\uD83D\\uDC67\\uD83C\\uDFFC|\\uD83D\\uDC67\\uD83C\\uDFFB|\\uD83D\\uDC66\\uD83C\\uDFFF|\\uD83D\\uDC66\\uD83C\\uDFFE|\\uD83D\\uDC66\\uD83C\\uDFFD|\\uD83D\\uDC66\\uD83C\\uDFFC|\\uD83D\\uDC66\\uD83C\\uDFFB|\\uD83D\\uDC50\\uD83C\\uDFFF|\\uD83D\\uDC50\\uD83C\\uDFFE|\\uD83D\\uDC50\\uD83C\\uDFFD|\\uD83D\\uDC50\\uD83C\\uDFFC|\\uD83D\\uDC50\\uD83C\\uDFFB|\\uD83D\\uDC4F\\uD83C\\uDFFF|\\uD83D\\uDC4F\\uD83C\\uDFFE|\\uD83D\\uDC4F\\uD83C\\uDFFD|\\uD83D\\uDC4F\\uD83C\\uDFFC|\\uD83D\\uDC4F\\uD83C\\uDFFB|\\uD83D\\uDC4E\\uD83C\\uDFFF|\\uD83D\\uDC4E\\uD83C\\uDFFE|\\uD83D\\uDC4E\\uD83C\\uDFFD|\\uD83D\\uDC4E\\uD83C\\uDFFC|\\uD83D\\uDC4E\\uD83C\\uDFFB|\\uD83D\\uDC4D\\uD83C\\uDFFF|\\uD83D\\uDC4D\\uD83C\\uDFFE|\\uD83D\\uDC4D\\uD83C\\uDFFD|\\uD83D\\uDC4D\\uD83C\\uDFFC|\\uD83D\\uDC4D\\uD83C\\uDFFB|\\uD83D\\uDC4C\\uD83C\\uDFFF|\\uD83D\\uDC4C\\uD83C\\uDFFE|\\uD83D\\uDC4C\\uD83C\\uDFFD|\\uD83D\\uDC4C\\uD83C\\uDFFC|\\uD83D\\uDC4C\\uD83C\\uDFFB|\\uD83D\\uDC4B\\uD83C\\uDFFF|\\uD83D\\uDC4B\\uD83C\\uDFFE|\\uD83D\\uDC4B\\uD83C\\uDFFD|\\uD83D\\uDC4B\\uD83C\\uDFFC|\\uD83D\\uDC4B\\uD83C\\uDFFB|\\uD83D\\uDC4A\\uD83C\\uDFFF|\\uD83D\\uDC4A\\uD83C\\uDFFE|\\uD83D\\uDC4A\\uD83C\\uDFFD|\\uD83D\\uDC4A\\uD83C\\uDFFC|\\uD83D\\uDC4A\\uD83C\\uDFFB|\\uD83D\\uDC49\\uD83C\\uDFFF|\\uD83D\\uDC49\\uD83C\\uDFFE|\\uD83D\\uDC49\\uD83C\\uDFFD|\\uD83D\\uDC49\\uD83C\\uDFFC|\\uD83D\\uDC49\\uD83C\\uDFFB|\\uD83D\\uDC48\\uD83C\\uDFFF|\\uD83D\\uDC48\\uD83C\\uDFFE|\\uD83D\\uDC48\\uD83C\\uDFFD|\\uD83D\\uDC48\\uD83C\\uDFFC|\\uD83D\\uDC48\\uD83C\\uDFFB|\\uD83D\\uDC47\\uD83C\\uDFFF|\\uD83D\\uDC47\\uD83C\\uDFFE|\\uD83D\\uDC47\\uD83C\\uDFFD|\\uD83D\\uDC47\\uD83C\\uDFFC|\\uD83D\\uDC47\\uD83C\\uDFFB|\\uD83D\\uDC46\\uD83C\\uDFFF|\\uD83D\\uDC46\\uD83C\\uDFFE|\\uD83D\\uDC46\\uD83C\\uDFFD|\\uD83D\\uDC46\\uD83C\\uDFFC|\\uD83D\\uDC46\\uD83C\\uDFFB|\\uD83D\\uDC43\\uD83C\\uDFFF|\\uD83D\\uDC43\\uD83C\\uDFFE|\\uD83D\\uDC43\\uD83C\\uDFFD|\\uD83D\\uDC43\\uD83C\\uDFFC|\\uD83D\\uDC43\\uD83C\\uDFFB|\\uD83D\\uDC42\\uD83C\\uDFFF|\\uD83D\\uDC42\\uD83C\\uDFFE|\\uD83D\\uDC42\\uD83C\\uDFFD|\\uD83D\\uDC42\\uD83C\\uDFFC|\\uD83D\\uDC42\\uD83C\\uDFFB|\\uD83C\\uDFCB\\uD83C\\uDFFF|\\uD83C\\uDFCB\\uD83C\\uDFFE|\\uD83C\\uDFF3\\uD83C\\uDF08|\\uD83C\\uDFCB\\uD83C\\uDFFC|\\uD83C\\uDFCB\\uD83C\\uDFFB|\\uD83C\\uDFCA\\uD83C\\uDFFF|\\uD83C\\uDFCA\\uD83C\\uDFFE|\\uD83C\\uDFCA\\uD83C\\uDFFD|\\uD83C\\uDFCA\\uD83C\\uDFFC|\\uD83C\\uDFCA\\uD83C\\uDFFB|\\uD83C\\uDFC7\\uD83C\\uDFFF|\\uD83C\\uDFC7\\uD83C\\uDFFE|\\uD83C\\uDFC7\\uD83C\\uDFFD|\\uD83C\\uDFC7\\uD83C\\uDFFC|\\uD83C\\uDFC7\\uD83C\\uDFFB|\\uD83C\\uDFC4\\uD83C\\uDFFF|\\uD83C\\uDFCB\\uD83C\\uDFFD|\\uD83C\\uDFC4\\uD83C\\uDFFD|\\uD83C\\uDFC4\\uD83C\\uDFFC|\\uD83C\\uDFC4\\uD83C\\uDFFB|\\uD83C\\uDFC3\\uD83C\\uDFFF|\\uD83C\\uDFC3\\uD83C\\uDFFE|\\uD83C\\uDFC3\\uD83C\\uDFFD|\\uD83C\\uDFC3\\uD83C\\uDFFC|\\uD83C\\uDFC3\\uD83C\\uDFFB|\\uD83C\\uDF85\\uD83C\\uDFFF|\\uD83C\\uDF85\\uD83C\\uDFFE|\\uD83C\\uDF85\\uD83C\\uDFFD|\\uD83C\\uDF85\\uD83C\\uDFFC|\\uD83C\\uDF85\\uD83C\\uDFFB|\\uD83C\\uDDFF\\uD83C\\uDDFC|\\uD83C\\uDDFF\\uD83C\\uDDF2|\\uD83C\\uDDFF\\uD83C\\uDDE6|\\uD83C\\uDDFE\\uD83C\\uDDF9|\\uD83C\\uDDFE\\uD83C\\uDDEA|\\uD83C\\uDDFD\\uD83C\\uDDF0|\\uD83C\\uDDFC\\uD83C\\uDDF8|\\uD83C\\uDDFC\\uD83C\\uDDEB|\\uD83C\\uDDFB\\uD83C\\uDDFA|\\uD83C\\uDDFB\\uD83C\\uDDF3|\\uD83C\\uDDFB\\uD83C\\uDDEE|\\uD83C\\uDDFB\\uD83C\\uDDEC|\\uD83C\\uDDFB\\uD83C\\uDDEA|\\uD83C\\uDDFB\\uD83C\\uDDE8|\\uD83C\\uDDFB\\uD83C\\uDDE6|\\uD83C\\uDDFA\\uD83C\\uDDFF|\\uD83C\\uDDFA\\uD83C\\uDDFE|\\uD83C\\uDDFA\\uD83C\\uDDF8|\\uD83C\\uDDFA\\uD83C\\uDDF2|\\uD83C\\uDDFA\\uD83C\\uDDEC|\\uD83C\\uDDFA\\uD83C\\uDDE6|\\uD83C\\uDDF9\\uD83C\\uDDFF|\\uD83C\\uDDF9\\uD83C\\uDDFC|\\uD83C\\uDDF9\\uD83C\\uDDFB|\\uD83C\\uDDF9\\uD83C\\uDDF9|\\uD83C\\uDDF9\\uD83C\\uDDF7|\\uD83C\\uDDF9\\uD83C\\uDDF4|\\uD83C\\uDDF9\\uD83C\\uDDF3|\\uD83C\\uDDF9\\uD83C\\uDDF2|\\uD83C\\uDDF9\\uD83C\\uDDF1|\\uD83C\\uDDF9\\uD83C\\uDDF0|\\uD83C\\uDDF9\\uD83C\\uDDEF|\\uD83C\\uDDF9\\uD83C\\uDDED|\\uD83C\\uDDF9\\uD83C\\uDDEC|\\uD83C\\uDDF9\\uD83C\\uDDEB|\\uD83C\\uDDF9\\uD83C\\uDDE9|\\uD83C\\uDDF9\\uD83C\\uDDE8|\\uD83C\\uDDF9\\uD83C\\uDDE6|\\uD83C\\uDDF8\\uD83C\\uDDFF|\\uD83C\\uDDF8\\uD83C\\uDDFE|\\uD83C\\uDDF8\\uD83C\\uDDFD|\\uD83C\\uDDF8\\uD83C\\uDDFB|\\uD83C\\uDDF8\\uD83C\\uDDF9|\\uD83C\\uDDF8\\uD83C\\uDDF8|\\uD83C\\uDDF8\\uD83C\\uDDF7|\\uD83C\\uDDF8\\uD83C\\uDDF4|\\uD83C\\uDDF8\\uD83C\\uDDF3|\\uD83C\\uDDF8\\uD83C\\uDDF2|\\uD83C\\uDDF8\\uD83C\\uDDF1|\\uD83C\\uDDF8\\uD83C\\uDDF0|\\uD83C\\uDDF8\\uD83C\\uDDEF|\\uD83C\\uDDF8\\uD83C\\uDDEE|\\uD83C\\uDDF8\\uD83C\\uDDED|\\uD83C\\uDDF8\\uD83C\\uDDEC|\\uD83C\\uDDF8\\uD83C\\uDDEA|\\uD83C\\uDDF8\\uD83C\\uDDE9|\\uD83C\\uDDF8\\uD83C\\uDDE8|\\uD83C\\uDDF8\\uD83C\\uDDE7|\\uD83C\\uDDF8\\uD83C\\uDDE6|\\uD83C\\uDDF7\\uD83C\\uDDFC|\\uD83C\\uDDF7\\uD83C\\uDDFA|\\uD83C\\uDDF7\\uD83C\\uDDF8|\\uD83C\\uDDF7\\uD83C\\uDDF4|\\uD83C\\uDDF7\\uD83C\\uDDEA|\\uD83C\\uDDF6\\uD83C\\uDDE6|\\uD83C\\uDDF5\\uD83C\\uDDFE|\\uD83C\\uDDF5\\uD83C\\uDDFC|\\uD83C\\uDDF5\\uD83C\\uDDF9|\\uD83C\\uDDF5\\uD83C\\uDDF8|\\uD83C\\uDDF5\\uD83C\\uDDF7|\\uD83C\\uDDF5\\uD83C\\uDDF3|\\uD83C\\uDDF5\\uD83C\\uDDF2|\\uD83C\\uDDF5\\uD83C\\uDDF1|\\uD83C\\uDDF5\\uD83C\\uDDF0|\\uD83C\\uDDF5\\uD83C\\uDDED|\\uD83C\\uDDF5\\uD83C\\uDDEC|\\uD83C\\uDDF5\\uD83C\\uDDEB|\\uD83C\\uDDF5\\uD83C\\uDDEA|\\uD83C\\uDDF5\\uD83C\\uDDE6|\\uD83C\\uDDF4\\uD83C\\uDDF2|\\uD83C\\uDDF3\\uD83C\\uDDFF|\\uD83C\\uDDF3\\uD83C\\uDDFA|\\uD83C\\uDDF3\\uD83C\\uDDF7|\\uD83C\\uDDF3\\uD83C\\uDDF5|\\uD83C\\uDDF3\\uD83C\\uDDF4|\\uD83C\\uDDF3\\uD83C\\uDDF1|\\uD83C\\uDDF3\\uD83C\\uDDEE|\\uD83C\\uDDF3\\uD83C\\uDDEC|\\uD83C\\uDDF3\\uD83C\\uDDEB|\\uD83C\\uDDF3\\uD83C\\uDDEA|\\uD83C\\uDDF3\\uD83C\\uDDE8|\\uD83C\\uDDF3\\uD83C\\uDDE6|\\uD83C\\uDDF2\\uD83C\\uDDFF|\\uD83C\\uDDF2\\uD83C\\uDDFE|\\uD83C\\uDDF2\\uD83C\\uDDFD|\\uD83C\\uDDF2\\uD83C\\uDDFC|\\uD83C\\uDDF2\\uD83C\\uDDFB|\\uD83C\\uDDF2\\uD83C\\uDDFA|\\uD83C\\uDDF2\\uD83C\\uDDF9|\\uD83C\\uDDF2\\uD83C\\uDDF8|\\uD83C\\uDDF2\\uD83C\\uDDF7|\\uD83C\\uDDF2\\uD83C\\uDDF6|\\uD83C\\uDDF2\\uD83C\\uDDF5|\\uD83C\\uDDF2\\uD83C\\uDDF4|\\uD83C\\uDDF2\\uD83C\\uDDF3|\\uD83C\\uDDF2\\uD83C\\uDDF2|\\uD83C\\uDDF2\\uD83C\\uDDF1|\\uD83C\\uDDF2\\uD83C\\uDDF0|\\uD83C\\uDDF2\\uD83C\\uDDED|\\uD83C\\uDDF2\\uD83C\\uDDEC|\\uD83C\\uDDF2\\uD83C\\uDDEB|\\uD83C\\uDDF2\\uD83C\\uDDEA|\\uD83C\\uDDF2\\uD83C\\uDDE9|\\uD83C\\uDDF2\\uD83C\\uDDE8|\\uD83C\\uDDF2\\uD83C\\uDDE6|\\uD83C\\uDDF1\\uD83C\\uDDFE|\\uD83C\\uDDF1\\uD83C\\uDDFB|\\uD83C\\uDDF1\\uD83C\\uDDFA|\\uD83C\\uDDF1\\uD83C\\uDDF9|\\uD83C\\uDDF1\\uD83C\\uDDF8|\\uD83C\\uDDF1\\uD83C\\uDDF7|\\uD83C\\uDDF1\\uD83C\\uDDF0|\\uD83C\\uDDF1\\uD83C\\uDDEE|\\uD83C\\uDDF1\\uD83C\\uDDE8|\\uD83C\\uDDF1\\uD83C\\uDDE7|\\uD83C\\uDDF1\\uD83C\\uDDE6|\\uD83C\\uDDF0\\uD83C\\uDDFF|\\uD83C\\uDDF0\\uD83C\\uDDFE|\\uD83C\\uDDF0\\uD83C\\uDDFC|\\uD83C\\uDDF0\\uD83C\\uDDF7|\\uD83C\\uDDF0\\uD83C\\uDDF5|\\uD83C\\uDDF0\\uD83C\\uDDF3|\\uD83C\\uDDF0\\uD83C\\uDDF2|\\uD83C\\uDDF0\\uD83C\\uDDEE|\\uD83C\\uDDF0\\uD83C\\uDDED|\\uD83C\\uDDF0\\uD83C\\uDDEC|\\uD83C\\uDDF0\\uD83C\\uDDEA|\\uD83C\\uDDEF\\uD83C\\uDDF5|\\uD83C\\uDDEF\\uD83C\\uDDF4|\\uD83C\\uDDEF\\uD83C\\uDDF2|\\uD83C\\uDDEF\\uD83C\\uDDEA|\\uD83C\\uDDEE\\uD83C\\uDDF9|\\uD83C\\uDDEE\\uD83C\\uDDF8|\\uD83C\\uDDEE\\uD83C\\uDDF7|\\uD83C\\uDDEE\\uD83C\\uDDF6|\\uD83C\\uDDEE\\uD83C\\uDDF4|\\uD83C\\uDDEE\\uD83C\\uDDF3|\\uD83C\\uDDEE\\uD83C\\uDDF2|\\uD83C\\uDDEE\\uD83C\\uDDF1|\\uD83C\\uDDEE\\uD83C\\uDDEA|\\uD83C\\uDDEE\\uD83C\\uDDE9|\\uD83C\\uDDEE\\uD83C\\uDDE8|\\uD83C\\uDDED\\uD83C\\uDDFA|\\uD83C\\uDDED\\uD83C\\uDDF9|\\uD83C\\uDDED\\uD83C\\uDDF7|\\uD83C\\uDDED\\uD83C\\uDDF3|\\uD83C\\uDDED\\uD83C\\uDDF2|\\uD83C\\uDDED\\uD83C\\uDDF0|\\uD83C\\uDDEC\\uD83C\\uDDFE|\\uD83C\\uDDEC\\uD83C\\uDDFC|\\uD83C\\uDDEC\\uD83C\\uDDFA|\\uD83C\\uDDEC\\uD83C\\uDDF9|\\uD83C\\uDDEC\\uD83C\\uDDF8|\\uD83C\\uDDEC\\uD83C\\uDDF7|\\uD83C\\uDDEC\\uD83C\\uDDF6|\\uD83C\\uDDEC\\uD83C\\uDDF5|\\uD83C\\uDDEC\\uD83C\\uDDF3|\\uD83C\\uDDEC\\uD83C\\uDDF2|\\uD83C\\uDDEC\\uD83C\\uDDF1|\\uD83C\\uDDEC\\uD83C\\uDDEE|\\uD83C\\uDDEC\\uD83C\\uDDED|\\uD83C\\uDDEC\\uD83C\\uDDEC|\\uD83C\\uDDEC\\uD83C\\uDDEB|\\uD83C\\uDDEC\\uD83C\\uDDEA|\\uD83C\\uDDEC\\uD83C\\uDDE9|\\uD83C\\uDDEC\\uD83C\\uDDE7|\\uD83C\\uDDEC\\uD83C\\uDDE6|\\uD83C\\uDDEB\\uD83C\\uDDF7|\\uD83C\\uDDEB\\uD83C\\uDDF4|\\uD83C\\uDDEB\\uD83C\\uDDF2|\\uD83C\\uDDEB\\uD83C\\uDDF0|\\uD83C\\uDDEB\\uD83C\\uDDEF|\\uD83C\\uDDEB\\uD83C\\uDDEE|\\uD83C\\uDDEA\\uD83C\\uDDFA|\\uD83C\\uDDEA\\uD83C\\uDDF9|\\uD83C\\uDDEA\\uD83C\\uDDF8|\\uD83C\\uDDEA\\uD83C\\uDDF7|\\uD83C\\uDDEA\\uD83C\\uDDED|\\uD83C\\uDDEA\\uD83C\\uDDEC|\\uD83C\\uDDEA\\uD83C\\uDDEA|\\uD83C\\uDDEA\\uD83C\\uDDE8|\\uD83C\\uDDEA\\uD83C\\uDDE6|\\uD83C\\uDDE9\\uD83C\\uDDFF|\\uD83C\\uDDE9\\uD83C\\uDDF4|\\uD83C\\uDDE9\\uD83C\\uDDF2|\\uD83C\\uDDE9\\uD83C\\uDDF0|\\uD83C\\uDDE9\\uD83C\\uDDEF|\\uD83C\\uDDE9\\uD83C\\uDDEC|\\uD83C\\uDDE9\\uD83C\\uDDEA|\\uD83C\\uDDE8\\uD83C\\uDDFF|\\uD83C\\uDDE8\\uD83C\\uDDFE|\\uD83C\\uDDE8\\uD83C\\uDDFD|\\uD83C\\uDDE8\\uD83C\\uDDFC|\\uD83C\\uDDE8\\uD83C\\uDDFB|\\uD83C\\uDDE8\\uD83C\\uDDFA|\\uD83C\\uDDE8\\uD83C\\uDDF7|\\uD83C\\uDDE8\\uD83C\\uDDF5|\\uD83C\\uDDE8\\uD83C\\uDDF4|\\uD83C\\uDDE8\\uD83C\\uDDF3|\\uD83C\\uDDE8\\uD83C\\uDDF2|\\uD83C\\uDDE8\\uD83C\\uDDF1|\\uD83C\\uDDE8\\uD83C\\uDDF0|\\uD83C\\uDDE8\\uD83C\\uDDEE|\\uD83C\\uDDE8\\uD83C\\uDDED|\\uD83C\\uDDE8\\uD83C\\uDDEC|\\uD83C\\uDDE8\\uD83C\\uDDEB|\\uD83C\\uDDE8\\uD83C\\uDDE9|\\uD83C\\uDDE8\\uD83C\\uDDE8|\\uD83C\\uDDE8\\uD83C\\uDDE6|\\uD83C\\uDDE7\\uD83C\\uDDFF|\\uD83C\\uDDE7\\uD83C\\uDDFE|\\uD83C\\uDDE7\\uD83C\\uDDFC|\\uD83C\\uDDE7\\uD83C\\uDDFB|\\uD83C\\uDDE7\\uD83C\\uDDF9|\\uD83C\\uDDE7\\uD83C\\uDDF8|\\uD83C\\uDDE7\\uD83C\\uDDF7|\\uD83C\\uDDE7\\uD83C\\uDDF6|\\uD83C\\uDDE7\\uD83C\\uDDF4|\\uD83C\\uDDE7\\uD83C\\uDDF3|\\uD83C\\uDDE7\\uD83C\\uDDF2|\\uD83C\\uDDE7\\uD83C\\uDDF1|\\uD83C\\uDDE7\\uD83C\\uDDEF|\\uD83C\\uDDE7\\uD83C\\uDDEE|\\uD83C\\uDDE7\\uD83C\\uDDED|\\uD83C\\uDDE7\\uD83C\\uDDEC|\\uD83C\\uDDE7\\uD83C\\uDDEB|\\uD83C\\uDDE7\\uD83C\\uDDEA|\\uD83C\\uDDE7\\uD83C\\uDDE9|\\uD83C\\uDDE7\\uD83C\\uDDE7|\\uD83C\\uDDE7\\uD83C\\uDDE6|\\uD83C\\uDDE6\\uD83C\\uDDFF|\\uD83C\\uDDE6\\uD83C\\uDDFD|\\uD83C\\uDDE6\\uD83C\\uDDFC|\\uD83C\\uDDE6\\uD83C\\uDDFA|\\uD83C\\uDDE6\\uD83C\\uDDF9|\\uD83C\\uDFC4\\uD83C\\uDFFE|\\uD83D\\uDDE3\\uFE0F|\\u26F9\\uD83C\\uDFFF|\\u26F9\\uD83C\\uDFFE|\\u26F9\\uD83C\\uDFFD|\\u26F9\\uD83C\\uDFFC|\\u26F9\\uD83C\\uDFFB|\\u270D\\uD83C\\uDFFF|\\u270D\\uD83C\\uDFFE|\\u270D\\uD83C\\uDFFD|\\u270D\\uD83C\\uDFFC|\\u270D\\uD83C\\uDFFB|\\uD83C\\uDC04\\uFE0F|\\uD83C\\uDD7F\\uFE0F|\\uD83C\\uDE02\\uFE0F|\\uD83C\\uDE1A\\uFE0F|\\uD83C\\uDE2F\\uFE0F|\\uD83C\\uDE37\\uFE0F|\\uD83C\\uDF9E\\uFE0F|\\uD83C\\uDF9F\\uFE0F|\\uD83C\\uDFCB\\uFE0F|\\uD83C\\uDFCC\\uFE0F|\\uD83C\\uDFCD\\uFE0F|\\uD83C\\uDFCE\\uFE0F|\\uD83C\\uDF96\\uFE0F|\\uD83C\\uDF97\\uFE0F|\\uD83C\\uDF36\\uFE0F|\\uD83C\\uDF27\\uFE0F|\\uD83C\\uDF28\\uFE0F|\\uD83C\\uDF29\\uFE0F|\\uD83C\\uDF2A\\uFE0F|\\uD83C\\uDF2B\\uFE0F|\\uD83C\\uDF2C\\uFE0F|\\uD83D\\uDC3F\\uFE0F|\\uD83D\\uDD77\\uFE0F|\\uD83D\\uDD78\\uFE0F|\\uD83C\\uDF21\\uFE0F|\\uD83C\\uDF99\\uFE0F|\\uD83C\\uDF9A\\uFE0F|\\uD83C\\uDF9B\\uFE0F|\\uD83C\\uDFF3\\uFE0F|\\uD83C\\uDFF5\\uFE0F|\\uD83C\\uDFF7\\uFE0F|\\uD83D\\uDCFD\\uFE0F|\\uD83D\\uDD49\\uFE0F|\\uD83D\\uDD4A\\uFE0F|\\uD83D\\uDD6F\\uFE0F|\\uD83D\\uDD70\\uFE0F|\\uD83D\\uDD73\\uFE0F|\\uD83D\\uDD76\\uFE0F|\\uD83D\\uDD79\\uFE0F|\\uD83D\\uDD87\\uFE0F|\\uD83D\\uDD8A\\uFE0F|\\uD83D\\uDD8B\\uFE0F|\\uD83D\\uDD8C\\uFE0F|\\uD83D\\uDD8D\\uFE0F|\\uD83D\\uDDA5\\uFE0F|\\uD83D\\uDDA8\\uFE0F|\\uD83D\\uDDB2\\uFE0F|\\uD83D\\uDDBC\\uFE0F|\\uD83D\\uDDC2\\uFE0F|\\uD83D\\uDDC3\\uFE0F|\\uD83D\\uDDC4\\uFE0F|\\uD83D\\uDDD1\\uFE0F|\\uD83D\\uDDD2\\uFE0F|\\uD83D\\uDDD3\\uFE0F|\\uD83D\\uDDDC\\uFE0F|\\uD83D\\uDDDD\\uFE0F|\\uD83D\\uDDDE\\uFE0F|\\uD83D\\uDDE1\\uFE0F|\\u270B\\uD83C\\uDFFF|\\uD83D\\uDDE8\\uFE0F|\\uD83D\\uDDEF\\uFE0F|\\uD83D\\uDDF3\\uFE0F|\\uD83D\\uDDFA\\uFE0F|\\uD83D\\uDEE0\\uFE0F|\\uD83D\\uDEE1\\uFE0F|\\uD83D\\uDEE2\\uFE0F|\\uD83D\\uDEF0\\uFE0F|\\uD83C\\uDF7D\\uFE0F|\\uD83D\\uDC41\\uFE0F|\\uD83D\\uDD74\\uFE0F|\\uD83D\\uDD75\\uFE0F|\\uD83D\\uDD90\\uFE0F|\\uD83C\\uDFD4\\uFE0F|\\uD83C\\uDFD5\\uFE0F|\\uD83C\\uDFD6\\uFE0F|\\uD83C\\uDFD7\\uFE0F|\\uD83C\\uDFD8\\uFE0F|\\uD83C\\uDFD9\\uFE0F|\\uD83C\\uDFDA\\uFE0F|\\uD83C\\uDFDB\\uFE0F|\\uD83C\\uDFDC\\uFE0F|\\uD83C\\uDFDD\\uFE0F|\\uD83C\\uDFDE\\uFE0F|\\uD83C\\uDFDF\\uFE0F|\\uD83D\\uDECB\\uFE0F|\\uD83D\\uDECD\\uFE0F|\\uD83D\\uDECE\\uFE0F|\\uD83D\\uDECF\\uFE0F|\\uD83D\\uDEE3\\uFE0F|\\uD83D\\uDEE4\\uFE0F|\\uD83D\\uDEE5\\uFE0F|\\uD83D\\uDEE9\\uFE0F|\\uD83D\\uDEF3\\uFE0F|\\uD83C\\uDF24\\uFE0F|\\uD83C\\uDF25\\uFE0F|\\uD83C\\uDF26\\uFE0F|\\uD83D\\uDDB1\\uFE0F|\\u261D\\uD83C\\uDFFB|\\u261D\\uD83C\\uDFFC|\\u261D\\uD83C\\uDFFD|\\u261D\\uD83C\\uDFFE|\\u261D\\uD83C\\uDFFF|\\u270C\\uD83C\\uDFFB|\\u270C\\uD83C\\uDFFC|\\u270C\\uD83C\\uDFFD|\\u270C\\uD83C\\uDFFE|\\u270C\\uD83C\\uDFFF|\\u270A\\uD83C\\uDFFB|\\u270A\\uD83C\\uDFFC|\\u270A\\uD83C\\uDFFD|\\u270A\\uD83C\\uDFFE|\\u270A\\uD83C\\uDFFF|\\u270B\\uD83C\\uDFFB|\\u270B\\uD83C\\uDFFC|\\u270B\\uD83C\\uDFFD|\\u270B\\uD83C\\uDFFE|\\4\\uFE0F\\u20E3|\\9\\uFE0F\\u20E3|\\0\\uFE0F\\u20E3|\\1\\uFE0F\\u20E3|\\2\\uFE0F\\u20E3|\\3\\uFE0F\\u20E3|\\#\\uFE0F\\u20E3|\\5\\uFE0F\\u20E3|\\6\\uFE0F\\u20E3|\\7\\uFE0F\\u20E3|\\8\\uFE0F\\u20E3|\\*\\uFE0F\\u20E3|\\uD83D\\uDDE1|\\uD83D\\uDD77|\\uD83D\\uDDE3|\\uD83D\\uDEE4|\\uD83D\\uDDE8|\\uD83D\\uDD78|\\uD83D\\uDDEF|\\uD83C\\uDE37|\\uD83D\\uDDF3|\\uD83C\\uDF21|\\uD83D\\uDDFA|\\uD83D\\uDDB1|\\uD83D\\uDEE0|\\uD83C\\uDF99|\\uD83D\\uDEE1|\\uD83C\\uDF9E|\\uD83D\\uDEE2|\\uD83C\\uDF9A|\\uD83D\\uDEF0|\\uD83D\\uDEE3|\\uD83C\\uDF7D|\\uD83C\\uDF9B|\\uD83D\\uDC41|\\uD83C\\uDF9F|\\uD83D\\uDD74|\\uD83C\\uDFF3|\\uD83D\\uDD75|\\uD83D\\uDEF3|\\uD83D\\uDD90|\\uD83C\\uDFF5|\\uD83C\\uDFD4|\\uD83C\\uDFCB|\\uD83C\\uDFD5|\\uD83C\\uDFF7|\\uD83C\\uDFD6|\\uD83D\\uDECF|\\uD83C\\uDFD7|\\uD83D\\uDCFD|\\uD83C\\uDFD8|\\uD83C\\uDFCC|\\uD83C\\uDFD9|\\uD83D\\uDD49|\\uD83C\\uDFDA|\\uD83C\\uDF25|\\uD83C\\uDFDB|\\uD83D\\uDD4A|\\uD83C\\uDFDC|\\uD83C\\uDFCD|\\uD83C\\uDFDD|\\uD83D\\uDD6F|\\uD83C\\uDFDE|\\uD83D\\uDECE|\\uD83C\\uDFDF|\\uD83D\\uDD70|\\uD83D\\uDECB|\\uD83C\\uDFCE|\\uD83D\\uDECD|\\uD83D\\uDD73|\\uD83D\\uDECE|\\uD83D\\uDEE9|\\uD83D\\uDECF|\\uD83D\\uDD76|\\uD83D\\uDEE3|\\uD83C\\uDF96|\\uD83D\\uDEE4|\\uD83D\\uDD79|\\uD83D\\uDEE5|\\uD83D\\uDECD|\\uD83D\\uDEE9|\\uD83D\\uDD87|\\uD83D\\uDEF3|\\uD83C\\uDF97|\\uD83C\\uDF24|\\uD83D\\uDD8A|\\uD83C\\uDF25|\\uD83C\\uDC04|\\uD83C\\uDF26|\\uD83D\\uDD8B|\\uD83D\\uDDB1|\\uD83C\\uDF36|\\uD83D\\uDD8C|\\uD83C\\uDF26|\\uD83D\\uDD8D|\\uD83C\\uDF27|\\uD83D\\uDDA5|\\uD83C\\uDD7F|\\uD83D\\uDDA8|\\uD83C\\uDF28|\\uD83D\\uDDB2|\\uD83D\\uDECB|\\uD83D\\uDDBC|\\uD83C\\uDF29|\\uD83D\\uDDC2|\\uD83C\\uDE02|\\uD83D\\uDDC3|\\uD83C\\uDF2A|\\uD83D\\uDDC4|\\uD83D\\uDEE5|\\uD83D\\uDDD1|\\uD83C\\uDF2B|\\uD83D\\uDDD2|\\uD83C\\uDE1A|\\uD83D\\uDDD3|\\uD83C\\uDF2C|\\uD83D\\uDDDC|\\uD83C\\uDF24|\\uD83D\\uDDDD|\\uD83D\\uDC3F|\\uD83D\\uDDDE|\\u00A9\\uFE0F|\\uD83C\\uDFDF|\\u00AE\\uFE0F|\\uD83C\\uDFDE|\\u203C\\uFE0F|\\uD83C\\uDFDD|\\u2049\\uFE0F|\\uD83C\\uDFDC|\\u2122\\uFE0F|\\uD83C\\uDFDB|\\u2139\\uFE0F|\\uD83C\\uDFDA|\\u2194\\uFE0F|\\uD83C\\uDFD9|\\u2195\\uFE0F|\\uD83C\\uDFD8|\\u2196\\uFE0F|\\uD83C\\uDFD7|\\u2197\\uFE0F|\\uD83C\\uDFD6|\\u2198\\uFE0F|\\uD83C\\uDFD5|\\u2199\\uFE0F|\\uD83C\\uDFD4|\\u21A9\\uFE0F|\\uD83D\\uDD90|\\u21AA\\uFE0F|\\uD83D\\uDD75|\\u231A\\uFE0F|\\uD83D\\uDD74|\\u231B\\uFE0F|\\uD83D\\uDC41|\\u24C2\\uFE0F|\\uD83C\\uDF7D|\\u25AA\\uFE0F|\\uD83D\\uDEF0|\\u25AB\\uFE0F|\\uD83D\\uDEE2|\\u25B6\\uFE0F|\\uD83D\\uDEE1|\\u25C0\\uFE0F|\\uD83D\\uDEE0|\\u25FB\\uFE0F|\\uD83D\\uDDFA|\\u25FC\\uFE0F|\\uD83D\\uDDF3|\\u25FD\\uFE0F|\\uD83D\\uDDEF|\\u25FE\\uFE0F|\\uD83D\\uDDE8|\\u2600\\uFE0F|\\uD83D\\uDDE3|\\u2601\\uFE0F|\\uD83D\\uDDE1|\\u260E\\uFE0F|\\uD83D\\uDDDE|\\u2611\\uFE0F|\\uD83D\\uDDDD|\\u2614\\uFE0F|\\uD83D\\uDDDC|\\u2615\\uFE0F|\\uD83D\\uDDD3|\\u261D\\uFE0F|\\uD83D\\uDDD2|\\u263A\\uFE0F|\\uD83D\\uDDD1|\\u2648\\uFE0F|\\uD83D\\uDDC4|\\u2649\\uFE0F|\\uD83D\\uDDC3|\\u264A\\uFE0F|\\uD83D\\uDDC2|\\u264B\\uFE0F|\\uD83D\\uDDBC|\\u264C\\uFE0F|\\uD83D\\uDDB2|\\u264D\\uFE0F|\\uD83D\\uDDA8|\\u264E\\uFE0F|\\uD83D\\uDDA5|\\u264F\\uFE0F|\\uD83D\\uDD8D|\\u2650\\uFE0F|\\uD83D\\uDD8C|\\u2651\\uFE0F|\\uD83D\\uDD8B|\\u2652\\uFE0F|\\uD83D\\uDD8A|\\u2653\\uFE0F|\\uD83D\\uDD87|\\u2660\\uFE0F|\\uD83D\\uDD79|\\u2663\\uFE0F|\\uD83D\\uDD76|\\u2665\\uFE0F|\\uD83D\\uDD73|\\u2666\\uFE0F|\\uD83D\\uDD70|\\u2668\\uFE0F|\\uD83D\\uDD6F|\\u267B\\uFE0F|\\uD83D\\uDD4A|\\u267F\\uFE0F|\\uD83D\\uDD49|\\u2693\\uFE0F|\\uD83D\\uDCFD|\\u26A0\\uFE0F|\\uD83C\\uDFF7|\\u26A1\\uFE0F|\\uD83C\\uDFF5|\\u26AA\\uFE0F|\\uD83C\\uDFF3|\\u26AB\\uFE0F|\\uD83C\\uDF9B|\\u26BD\\uFE0F|\\uD83C\\uDF9A|\\u26BE\\uFE0F|\\uD83C\\uDF99|\\u26C4\\uFE0F|\\uD83C\\uDF21|\\u26C5\\uFE0F|\\uD83D\\uDD78|\\u26D4\\uFE0F|\\uD83D\\uDD77|\\u26EA\\uFE0F|\\uD83D\\uDC3F|\\uD83C\\uDE2F|\\uD83C\\uDF2C|\\u26F3\\uFE0F|\\uD83C\\uDF2B|\\u26F5\\uFE0F|\\uD83C\\uDF2A|\\u26FA\\uFE0F|\\uD83C\\uDF29|\\u26FD\\uFE0F|\\uD83C\\uDF28|\\u2702\\uFE0F|\\uD83C\\uDF27|\\u2708\\uFE0F|\\uD83C\\uDF36|\\u2709\\uFE0F|\\uD83C\\uDF97|\\u270C\\uFE0F|\\uD83C\\uDF96|\\u270F\\uFE0F|\\uD83C\\uDFCE|\\u2712\\uFE0F|\\uD83C\\uDFCD|\\u2714\\uFE0F|\\uD83C\\uDFCC|\\u2716\\uFE0F|\\uD83C\\uDFCB|\\u2733\\uFE0F|\\uD83C\\uDF9F|\\u2734\\uFE0F|\\uD83C\\uDF9E|\\u2744\\uFE0F|\\uD83C\\uDE37|\\u2747\\uFE0F|\\uD83C\\uDE2F|\\u2757\\uFE0F|\\uD83C\\uDE1A|\\u2764\\uFE0F|\\uD83C\\uDE02|\\u27A1\\uFE0F|\\uD83C\\uDD7F|\\u2934\\uFE0F|\\uD83C\\uDC04|\\u2935\\uFE0F|\\uD83C\\uDDE6|\\u2B05\\uFE0F|\\uD83C\\uDDE7|\\u2B06\\uFE0F|\\uD83C\\uDDE8|\\u2B07\\uFE0F|\\uD83C\\uDDE9|\\u2B1B\\uFE0F|\\uD83C\\uDDEA|\\u2B1C\\uFE0F|\\uD83C\\uDDEB|\\u2B50\\uFE0F|\\uD83C\\uDDEC|\\u2B55\\uFE0F|\\uD83C\\uDDED|\\u3030\\uFE0F|\\uD83C\\uDDEE|\\u303D\\uFE0F|\\uD83C\\uDDEF|\\u3297\\uFE0F|\\uD83C\\uDDF0|\\u3299\\uFE0F|\\uD83C\\uDDF1|\\u271D\\uFE0F|\\uD83C\\uDDF2|\\u2328\\uFE0F|\\uD83C\\uDDF3|\\u270D\\uFE0F|\\uD83C\\uDDF4|\\u23CF\\uFE0F|\\uD83C\\uDDF5|\\u23ED\\uFE0F|\\uD83C\\uDDF6|\\u23EE\\uFE0F|\\uD83C\\uDDF7|\\u23EF\\uFE0F|\\uD83C\\uDDF8|\\u23F1\\uFE0F|\\uD83C\\uDDF9|\\u23F2\\uFE0F|\\uD83C\\uDDFA|\\u23F8\\uFE0F|\\uD83C\\uDDFB|\\u23F9\\uFE0F|\\uD83C\\uDDFC|\\u23FA\\uFE0F|\\uD83E\\uDD5E|\\u2602\\uFE0F|\\uD83E\\uDD5D|\\u2603\\uFE0F|\\uD83E\\uDD5C|\\u2604\\uFE0F|\\uD83E\\uDD5B|\\u2618\\uFE0F|\\uD83E\\uDD5A|\\u2620\\uFE0F|\\uD83E\\uDD91|\\u2622\\uFE0F|\\uD83E\\uDD90|\\u2623\\uFE0F|\\uD83E\\uDD41|\\u2626\\uFE0F|\\uD83C\\uDFF8|\\u262A\\uFE0F|\\uD83C\\uDFD3|\\u262E\\uFE0F|\\uD83C\\uDFD2|\\u262F\\uFE0F|\\uD83C\\uDFD1|\\u2638\\uFE0F|\\uD83C\\uDFD0|\\u2639\\uFE0F|\\uD83C\\uDFCF|\\u2692\\uFE0F|\\uD83D\\uDCFF|\\u2694\\uFE0F|\\uD83D\\uDD4E|\\u2696\\uFE0F|\\uD83D\\uDD4D|\\u2697\\uFE0F|\\uD83D\\uDD4C|\\u2699\\uFE0F|\\uD83D\\uDD4B|\\u269B\\uFE0F|\\uD83D\\uDED0|\\u269C\\uFE0F|\\uD83C\\uDFFA|\\u26B0\\uFE0F|\\uD83C\\uDFF9|\\u26B1\\uFE0F|\\uD83C\\uDF7E|\\u26C8\\uFE0F|\\uD83C\\uDF7F|\\u26CF\\uFE0F|\\uD83C\\uDF2F|\\u26D1\\uFE0F|\\uD83C\\uDF2E|\\u26D3\\uFE0F|\\uD83C\\uDF2D|\\u26E9\\uFE0F|\\uD83E\\uDDC0|\\u26F0\\uFE0F|\\uD83E\\uDD83|\\u26F1\\uFE0F|\\uD83E\\uDD80|\\u26F4\\uFE0F|\\uD83E\\uDD82|\\u26F7\\uFE0F|\\uD83E\\uDD84|\\u26F8\\uFE0F|\\uD83E\\uDD81|\\u26F9\\uFE0F|\\uD83E\\uDD16|\\u2721\\uFE0F|\\uD83E\\uDD15|\\u2763\\uFE0F|\\uD83E\\uDD12|\\uD83E\\uDD49|\\uD83E\\uDD48|\\uD83E\\uDD47|\\uD83E\\uDD3A|\\uD83E\\uDD45|\\uD83E\\uDD3E|\\uD83C\\uDDFF|\\uD83E\\uDD3D|\\uD83E\\uDD4B|\\uD83E\\uDD4A|\\uD83E\\uDD3C|\\uD83E\\uDD39|\\uD83E\\uDD38|\\uD83D\\uDEF6|\\uD83D\\uDEF5|\\uD83D\\uDEF4|\\uD83D\\uDED2|\\uD83C\\uDCCF|\\uD83C\\uDD70|\\uD83C\\uDD71|\\uD83C\\uDD7E|\\uD83D\\uDED1|\\uD83C\\uDD8E|\\uD83C\\uDD91|\\uD83C\\uDDFE|\\uD83C\\uDD92|\\uD83C\\uDD93|\\uD83C\\uDD94|\\uD83C\\uDD95|\\uD83C\\uDD96|\\uD83C\\uDD97|\\uD83C\\uDD98|\\uD83E\\uDD44|\\uD83C\\uDD99|\\uD83C\\uDD9A|\\uD83E\\uDD42|\\uD83E\\uDD43|\\uD83C\\uDE01|\\uD83E\\uDD59|\\uD83C\\uDE32|\\uD83C\\uDE33|\\uD83C\\uDE34|\\uD83C\\uDE35|\\uD83C\\uDE36|\\uD83E\\uDD58|\\uD83C\\uDE38|\\uD83C\\uDE39|\\uD83E\\uDD57|\\uD83C\\uDE3A|\\uD83C\\uDE50|\\uD83C\\uDE51|\\uD83C\\uDF00|\\uD83E\\uDD56|\\uD83C\\uDF01|\\uD83C\\uDF02|\\uD83C\\uDF03|\\uD83C\\uDF04|\\uD83C\\uDF05|\\uD83C\\uDF06|\\uD83E\\uDD55|\\uD83C\\uDF07|\\uD83C\\uDF08|\\uD83E\\uDD54|\\uD83C\\uDF09|\\uD83C\\uDF0A|\\uD83C\\uDF0B|\\uD83C\\uDF0C|\\uD83C\\uDF0F|\\uD83C\\uDF11|\\uD83E\\uDD53|\\uD83C\\uDF13|\\uD83C\\uDF14|\\uD83C\\uDF15|\\uD83C\\uDF19|\\uD83C\\uDF1B|\\uD83C\\uDF1F|\\uD83E\\uDD52|\\uD83C\\uDF20|\\uD83C\\uDF30|\\uD83E\\uDD51|\\uD83C\\uDF31|\\uD83C\\uDF34|\\uD83C\\uDF35|\\uD83C\\uDF37|\\uD83C\\uDF38|\\uD83C\\uDF39|\\uD83C\\uDF3A|\\uD83C\\uDF3B|\\uD83C\\uDF3C|\\uD83C\\uDF3D|\\uD83E\\uDD50|\\uD83C\\uDF3E|\\uD83C\\uDF3F|\\uD83C\\uDF40|\\uD83C\\uDF41|\\uD83C\\uDF42|\\uD83C\\uDF43|\\uD83C\\uDF44|\\uD83C\\uDF45|\\uD83C\\uDF46|\\uD83C\\uDF47|\\uD83C\\uDF48|\\uD83C\\uDF49|\\uD83C\\uDF4A|\\uD83E\\uDD40|\\uD83C\\uDF4C|\\uD83C\\uDF4D|\\uD83C\\uDF4E|\\uD83C\\uDF4F|\\uD83C\\uDF51|\\uD83C\\uDF52|\\uD83C\\uDF53|\\uD83E\\uDD8F|\\uD83C\\uDF54|\\uD83C\\uDF55|\\uD83C\\uDF56|\\uD83E\\uDD8E|\\uD83C\\uDF57|\\uD83C\\uDF58|\\uD83C\\uDF59|\\uD83E\\uDD8D|\\uD83C\\uDF5A|\\uD83C\\uDF5B|\\uD83E\\uDD8C|\\uD83C\\uDF5C|\\uD83C\\uDF5D|\\uD83C\\uDF5E|\\uD83C\\uDF5F|\\uD83E\\uDD8B|\\uD83C\\uDF60|\\uD83C\\uDF61|\\uD83E\\uDD8A|\\uD83C\\uDF62|\\uD83C\\uDF63|\\uD83E\\uDD89|\\uD83C\\uDF64|\\uD83C\\uDF65|\\uD83E\\uDD88|\\uD83C\\uDF66|\\uD83E\\uDD87|\\uD83C\\uDF67|\\uD83C\\uDDFD|\\uD83C\\uDF68|\\uD83E\\uDD86|\\uD83C\\uDF69|\\uD83E\\uDD85|\\uD83C\\uDF6A|\\uD83D\\uDDA4|\\uD83C\\uDF6B|\\uD83C\\uDF6C|\\uD83C\\uDF6D|\\uD83C\\uDF6E|\\uD83C\\uDF6F|\\uD83E\\uDD1E|\\uD83C\\uDF70|\\uD83C\\uDF71|\\uD83C\\uDF72|\\uD83E\\uDD1D|\\uD83C\\uDF73|\\uD83C\\uDF74|\\uD83C\\uDF75|\\uD83C\\uDF76|\\uD83C\\uDF77|\\uD83C\\uDF78|\\uD83C\\uDF79|\\uD83C\\uDF7A|\\uD83C\\uDF7B|\\uD83C\\uDF80|\\uD83C\\uDF81|\\uD83C\\uDF82|\\uD83C\\uDF83|\\uD83E\\uDD1B|\\uD83E\\uDD1C|\\uD83C\\uDF84|\\uD83C\\uDF85|\\uD83C\\uDF86|\\uD83E\\uDD1A|\\uD83C\\uDF87|\\uD83C\\uDF88|\\uD83C\\uDF89|\\uD83C\\uDF8A|\\uD83C\\uDF8B|\\uD83C\\uDF8C|\\uD83E\\uDD19|\\uD83C\\uDF8D|\\uD83D\\uDD7A|\\uD83C\\uDF8E|\\uD83E\\uDD33|\\uD83C\\uDF8F|\\uD83E\\uDD30|\\uD83C\\uDF90|\\uD83E\\uDD26|\\uD83E\\uDD37|\\uD83C\\uDF91|\\uD83C\\uDF92|\\uD83C\\uDF93|\\uD83C\\uDFA0|\\uD83C\\uDFA1|\\uD83C\\uDFA2|\\uD83C\\uDFA3|\\uD83C\\uDFA4|\\uD83C\\uDFA5|\\uD83C\\uDFA6|\\uD83C\\uDFA7|\\uD83E\\uDD36|\\uD83C\\uDFA8|\\uD83E\\uDD35|\\uD83C\\uDFA9|\\uD83C\\uDFAA|\\uD83E\\uDD34|\\uD83C\\uDFAB|\\uD83C\\uDFAC|\\uD83C\\uDFAD|\\uD83E\\uDD27|\\uD83C\\uDFAE|\\uD83C\\uDFAF|\\uD83C\\uDFB0|\\uD83C\\uDFB1|\\uD83C\\uDFB2|\\uD83C\\uDFB3|\\uD83C\\uDFB4|\\uD83E\\uDD25|\\uD83C\\uDFB5|\\uD83C\\uDFB6|\\uD83C\\uDFB7|\\uD83E\\uDD24|\\uD83C\\uDFB8|\\uD83C\\uDFB9|\\uD83C\\uDFBA|\\uD83E\\uDD23|\\uD83C\\uDFBB|\\uD83C\\uDFBC|\\uD83C\\uDFBD|\\uD83E\\uDD22|\\uD83C\\uDFBE|\\uD83C\\uDFBF|\\uD83C\\uDFC0|\\uD83C\\uDFC1|\\uD83E\\uDD21|\\uD83C\\uDFC2|\\uD83C\\uDFC3|\\uD83C\\uDFC4|\\uD83C\\uDFC6|\\uD83C\\uDFC8|\\uD83C\\uDFCA|\\uD83C\\uDFE0|\\uD83C\\uDFE1|\\uD83C\\uDFE2|\\uD83C\\uDFE3|\\uD83C\\uDFE5|\\uD83C\\uDFE6|\\uD83C\\uDFE7|\\uD83C\\uDFE8|\\uD83C\\uDFE9|\\uD83C\\uDFEA|\\uD83C\\uDFEB|\\uD83C\\uDFEC|\\uD83E\\uDD20|\\uD83C\\uDFED|\\uD83C\\uDFEE|\\uD83C\\uDFEF|\\uD83C\\uDFF0|\\uD83D\\uDC0C|\\uD83D\\uDC0D|\\uD83D\\uDC0E|\\uD83D\\uDC11|\\uD83D\\uDC12|\\uD83D\\uDC14|\\uD83D\\uDC17|\\uD83D\\uDC18|\\uD83D\\uDC19|\\uD83D\\uDC1A|\\uD83D\\uDC1B|\\uD83D\\uDC1C|\\uD83D\\uDC1D|\\uD83D\\uDC1E|\\uD83D\\uDC1F|\\uD83D\\uDC20|\\uD83D\\uDC21|\\uD83D\\uDC22|\\uD83D\\uDC23|\\uD83D\\uDC24|\\uD83D\\uDC25|\\uD83D\\uDC26|\\uD83D\\uDC27|\\uD83D\\uDC28|\\uD83D\\uDC29|\\uD83D\\uDC2B|\\uD83D\\uDC2C|\\uD83D\\uDC2D|\\uD83D\\uDC2E|\\uD83D\\uDC2F|\\uD83D\\uDC30|\\uD83D\\uDC31|\\uD83D\\uDC32|\\uD83D\\uDC33|\\uD83D\\uDC34|\\uD83D\\uDC35|\\uD83D\\uDC36|\\uD83D\\uDC37|\\uD83D\\uDC38|\\uD83D\\uDC39|\\uD83D\\uDC3A|\\uD83D\\uDC3B|\\uD83D\\uDC3C|\\uD83D\\uDC3D|\\uD83D\\uDC3E|\\uD83D\\uDC40|\\uD83D\\uDC42|\\uD83D\\uDC43|\\uD83D\\uDC44|\\uD83D\\uDC45|\\uD83D\\uDC46|\\uD83D\\uDC47|\\uD83D\\uDC48|\\uD83D\\uDC49|\\uD83D\\uDC4A|\\uD83D\\uDC4B|\\uD83D\\uDC4C|\\uD83D\\uDC4D|\\uD83D\\uDC4E|\\uD83D\\uDC4F|\\uD83D\\uDC50|\\uD83D\\uDC51|\\uD83D\\uDC52|\\uD83D\\uDC53|\\uD83D\\uDC54|\\uD83D\\uDC55|\\uD83D\\uDC56|\\uD83D\\uDC57|\\uD83D\\uDC58|\\uD83D\\uDC59|\\uD83D\\uDC5A|\\uD83D\\uDC5B|\\uD83D\\uDC5C|\\uD83D\\uDC5D|\\uD83D\\uDC5E|\\uD83D\\uDC5F|\\uD83D\\uDC60|\\uD83D\\uDC61|\\uD83D\\uDC62|\\uD83D\\uDC63|\\uD83D\\uDC64|\\uD83D\\uDC66|\\uD83D\\uDC67|\\uD83D\\uDC68|\\uD83D\\uDC69|\\uD83D\\uDC6A|\\uD83D\\uDC6B|\\uD83D\\uDC6E|\\uD83D\\uDC6F|\\uD83D\\uDC70|\\uD83D\\uDC71|\\uD83D\\uDC72|\\uD83D\\uDC73|\\uD83D\\uDC74|\\uD83D\\uDC75|\\uD83D\\uDC76|\\uD83D\\uDC77|\\uD83D\\uDC78|\\uD83D\\uDC79|\\uD83D\\uDC7A|\\uD83D\\uDC7B|\\uD83D\\uDC7C|\\uD83D\\uDC7D|\\uD83D\\uDC7E|\\uD83D\\uDC7F|\\uD83D\\uDC80|\\uD83D\\uDCC7|\\uD83D\\uDC81|\\uD83D\\uDC82|\\uD83D\\uDC83|\\uD83D\\uDC84|\\uD83D\\uDC85|\\uD83D\\uDCD2|\\uD83D\\uDC86|\\uD83D\\uDCD3|\\uD83D\\uDC87|\\uD83D\\uDCD4|\\uD83D\\uDC88|\\uD83D\\uDCD5|\\uD83D\\uDC89|\\uD83D\\uDCD6|\\uD83D\\uDC8A|\\uD83D\\uDCD7|\\uD83D\\uDC8B|\\uD83D\\uDCD8|\\uD83D\\uDC8C|\\uD83D\\uDCD9|\\uD83D\\uDC8D|\\uD83D\\uDCDA|\\uD83D\\uDC8E|\\uD83D\\uDCDB|\\uD83D\\uDC8F|\\uD83D\\uDCDC|\\uD83D\\uDC90|\\uD83D\\uDCDD|\\uD83D\\uDC91|\\uD83D\\uDCDE|\\uD83D\\uDC92|\\uD83D\\uDCDF|\\uD83D\\uDCE0|\\uD83D\\uDC93|\\uD83D\\uDCE1|\\uD83D\\uDCE2|\\uD83D\\uDC94|\\uD83D\\uDCE3|\\uD83D\\uDCE4|\\uD83D\\uDC95|\\uD83D\\uDCE5|\\uD83D\\uDCE6|\\uD83D\\uDC96|\\uD83D\\uDCE7|\\uD83D\\uDCE8|\\uD83D\\uDC97|\\uD83D\\uDCE9|\\uD83D\\uDCEA|\\uD83D\\uDC98|\\uD83D\\uDCEB|\\uD83D\\uDCEE|\\uD83D\\uDC99|\\uD83D\\uDCF0|\\uD83D\\uDCF1|\\uD83D\\uDC9A|\\uD83D\\uDCF2|\\uD83D\\uDCF3|\\uD83D\\uDC9B|\\uD83D\\uDCF4|\\uD83D\\uDCF6|\\uD83D\\uDC9C|\\uD83D\\uDCF7|\\uD83D\\uDCF9|\\uD83D\\uDC9D|\\uD83D\\uDCFA|\\uD83D\\uDCFB|\\uD83D\\uDC9E|\\uD83D\\uDCFC|\\uD83D\\uDD03|\\uD83D\\uDC9F|\\uD83D\\uDD0A|\\uD83D\\uDD0B|\\uD83D\\uDCA0|\\uD83D\\uDD0C|\\uD83D\\uDD0D|\\uD83D\\uDCA1|\\uD83D\\uDD0E|\\uD83D\\uDD0F|\\uD83D\\uDCA2|\\uD83D\\uDD10|\\uD83D\\uDD11|\\uD83D\\uDCA3|\\uD83D\\uDD12|\\uD83D\\uDD13|\\uD83D\\uDCA4|\\uD83D\\uDD14|\\uD83D\\uDD16|\\uD83D\\uDCA5|\\uD83D\\uDD17|\\uD83D\\uDD18|\\uD83D\\uDCA6|\\uD83D\\uDD19|\\uD83D\\uDD1A|\\uD83D\\uDCA7|\\uD83D\\uDD1B|\\uD83D\\uDD1C|\\uD83D\\uDCA8|\\uD83D\\uDD1D|\\uD83D\\uDD1E|\\uD83D\\uDCA9|\\uD83D\\uDD1F|\\uD83D\\uDCAA|\\uD83D\\uDD20|\\uD83D\\uDD21|\\uD83D\\uDCAB|\\uD83D\\uDD22|\\uD83D\\uDD23|\\uD83D\\uDCAC|\\uD83D\\uDD24|\\uD83D\\uDD25|\\uD83D\\uDCAE|\\uD83D\\uDD26|\\uD83D\\uDD27|\\uD83D\\uDCAF|\\uD83D\\uDD28|\\uD83D\\uDD29|\\uD83D\\uDCB0|\\uD83D\\uDD2A|\\uD83D\\uDD2B|\\uD83D\\uDCB1|\\uD83D\\uDD2E|\\uD83D\\uDCB2|\\uD83D\\uDD2F|\\uD83D\\uDCB3|\\uD83D\\uDD30|\\uD83D\\uDD31|\\uD83D\\uDCB4|\\uD83D\\uDD32|\\uD83D\\uDD33|\\uD83D\\uDCB5|\\uD83D\\uDD34|\\uD83D\\uDD35|\\uD83D\\uDCB8|\\uD83D\\uDD36|\\uD83D\\uDD37|\\uD83D\\uDCB9|\\uD83D\\uDD38|\\uD83D\\uDD39|\\uD83D\\uDCBA|\\uD83D\\uDD3A|\\uD83D\\uDD3B|\\uD83D\\uDCBB|\\uD83D\\uDD3C|\\uD83D\\uDCBC|\\uD83D\\uDD3D|\\uD83D\\uDD50|\\uD83D\\uDCBD|\\uD83D\\uDD51|\\uD83D\\uDCBE|\\uD83D\\uDD52|\\uD83D\\uDCBF|\\uD83D\\uDD53|\\uD83D\\uDCC0|\\uD83D\\uDD54|\\uD83D\\uDD55|\\uD83D\\uDCC1|\\uD83D\\uDD56|\\uD83D\\uDD57|\\uD83D\\uDCC2|\\uD83D\\uDD58|\\uD83D\\uDD59|\\uD83D\\uDCC3|\\uD83D\\uDD5A|\\uD83D\\uDD5B|\\uD83D\\uDCC4|\\uD83D\\uDDFB|\\uD83D\\uDDFC|\\uD83D\\uDCC5|\\uD83D\\uDDFD|\\uD83D\\uDDFE|\\uD83D\\uDCC6|\\uD83D\\uDDFF|\\uD83D\\uDE01|\\uD83D\\uDE02|\\uD83D\\uDE03|\\uD83D\\uDCC8|\\uD83D\\uDE04|\\uD83D\\uDE05|\\uD83D\\uDCC9|\\uD83D\\uDE06|\\uD83D\\uDE09|\\uD83D\\uDCCA|\\uD83D\\uDE0A|\\uD83D\\uDE0B|\\uD83D\\uDCCB|\\uD83D\\uDE0C|\\uD83D\\uDE0D|\\uD83D\\uDCCC|\\uD83D\\uDE0F|\\uD83D\\uDE12|\\uD83D\\uDCCD|\\uD83D\\uDE13|\\uD83D\\uDE14|\\uD83D\\uDCCE|\\uD83D\\uDE16|\\uD83D\\uDE18|\\uD83D\\uDCCF|\\uD83D\\uDE1A|\\uD83D\\uDE1C|\\uD83D\\uDCD0|\\uD83D\\uDE1D|\\uD83D\\uDE1E|\\uD83D\\uDCD1|\\uD83D\\uDE20|\\uD83D\\uDE21|\\uD83D\\uDE22|\\uD83D\\uDE23|\\uD83D\\uDE24|\\uD83D\\uDE25|\\uD83D\\uDE28|\\uD83D\\uDE29|\\uD83D\\uDE2A|\\uD83D\\uDE2B|\\uD83D\\uDE2D|\\uD83D\\uDE30|\\uD83D\\uDE31|\\uD83D\\uDE32|\\uD83D\\uDE33|\\uD83D\\uDE35|\\uD83D\\uDE37|\\uD83D\\uDE38|\\uD83D\\uDE39|\\uD83D\\uDE3A|\\uD83D\\uDE3B|\\uD83D\\uDE3C|\\uD83D\\uDE3D|\\uD83D\\uDE3E|\\uD83D\\uDE3F|\\uD83D\\uDE40|\\uD83D\\uDE45|\\uD83D\\uDE46|\\uD83D\\uDE47|\\uD83D\\uDE48|\\uD83D\\uDE49|\\uD83D\\uDE4A|\\uD83D\\uDE4B|\\uD83D\\uDE4C|\\uD83D\\uDE4D|\\uD83D\\uDE4E|\\uD83D\\uDE4F|\\uD83D\\uDE80|\\uD83D\\uDE83|\\uD83D\\uDE84|\\uD83D\\uDE85|\\uD83D\\uDE87|\\uD83D\\uDE89|\\uD83D\\uDE8C|\\uD83D\\uDE8F|\\uD83D\\uDE91|\\uD83D\\uDE92|\\uD83D\\uDE93|\\uD83D\\uDE95|\\uD83D\\uDE97|\\uD83D\\uDE99|\\uD83D\\uDE9A|\\uD83D\\uDEA2|\\uD83D\\uDEA4|\\uD83D\\uDEA5|\\uD83D\\uDEA7|\\uD83D\\uDEA8|\\uD83D\\uDEA9|\\uD83D\\uDEAA|\\uD83D\\uDEAB|\\uD83D\\uDEAC|\\uD83D\\uDEAD|\\uD83D\\uDEB2|\\uD83D\\uDEB6|\\uD83D\\uDEB9|\\uD83D\\uDEBA|\\uD83D\\uDEBB|\\uD83D\\uDEBC|\\uD83D\\uDEBD|\\uD83D\\uDEBE|\\uD83D\\uDEC0|\\uD83E\\uDD18|\\uD83D\\uDE00|\\uD83D\\uDE07|\\uD83D\\uDE08|\\uD83D\\uDE0E|\\uD83D\\uDE10|\\uD83D\\uDE11|\\uD83D\\uDE15|\\uD83D\\uDE17|\\uD83D\\uDE19|\\uD83D\\uDE1B|\\uD83D\\uDE1F|\\uD83D\\uDE26|\\uD83D\\uDE27|\\uD83D\\uDE2C|\\uD83D\\uDE2E|\\uD83D\\uDE2F|\\uD83D\\uDE34|\\uD83D\\uDE36|\\uD83D\\uDE81|\\uD83D\\uDE82|\\uD83D\\uDE86|\\uD83D\\uDE88|\\uD83D\\uDE8A|\\uD83D\\uDE8D|\\uD83D\\uDE8E|\\uD83D\\uDE90|\\uD83D\\uDE94|\\uD83D\\uDE96|\\uD83D\\uDE98|\\uD83D\\uDE9B|\\uD83D\\uDE9C|\\uD83D\\uDE9D|\\uD83D\\uDE9E|\\uD83D\\uDE9F|\\uD83D\\uDEA0|\\uD83D\\uDEA1|\\uD83D\\uDEA3|\\uD83D\\uDEA6|\\uD83D\\uDEAE|\\uD83D\\uDEAF|\\uD83D\\uDEB0|\\uD83D\\uDEB1|\\uD83D\\uDEB3|\\uD83D\\uDEB4|\\uD83D\\uDEB5|\\uD83D\\uDEB7|\\uD83D\\uDEB8|\\uD83D\\uDEBF|\\uD83D\\uDEC1|\\uD83D\\uDEC2|\\uD83D\\uDEC3|\\uD83D\\uDEC4|\\uD83D\\uDEC5|\\uD83C\\uDF0D|\\uD83C\\uDF0E|\\uD83C\\uDF10|\\uD83C\\uDF12|\\uD83C\\uDF16|\\uD83C\\uDF17|\\uD83C\\uDF18|\\uD83C\\uDF1A|\\uD83C\\uDF1C|\\uD83C\\uDF1D|\\uD83C\\uDF1E|\\uD83C\\uDF32|\\uD83C\\uDF33|\\uD83C\\uDF4B|\\uD83C\\uDF50|\\uD83C\\uDF7C|\\uD83C\\uDFC7|\\uD83C\\uDFC9|\\uD83C\\uDFE4|\\uD83D\\uDC00|\\uD83D\\uDC01|\\uD83D\\uDC02|\\uD83D\\uDC03|\\uD83D\\uDC04|\\uD83D\\uDC05|\\uD83D\\uDC06|\\uD83D\\uDC07|\\uD83D\\uDC08|\\uD83D\\uDC09|\\uD83D\\uDC0A|\\uD83D\\uDC0B|\\uD83D\\uDC0F|\\uD83D\\uDC10|\\uD83D\\uDC13|\\uD83D\\uDC15|\\uD83D\\uDC16|\\uD83D\\uDC2A|\\uD83D\\uDC65|\\uD83D\\uDC6C|\\uD83D\\uDC6D|\\uD83D\\uDCAD|\\uD83D\\uDCB6|\\uD83D\\uDCB7|\\uD83D\\uDCEC|\\uD83D\\uDCED|\\uD83D\\uDCEF|\\uD83D\\uDCF5|\\uD83D\\uDD00|\\uD83D\\uDD01|\\uD83D\\uDD02|\\uD83D\\uDD04|\\uD83D\\uDD05|\\uD83D\\uDD06|\\uD83D\\uDD07|\\uD83D\\uDD09|\\uD83D\\uDD15|\\uD83D\\uDD2C|\\uD83D\\uDD2D|\\uD83D\\uDD5C|\\uD83D\\uDD5D|\\uD83D\\uDD5E|\\uD83D\\uDD5F|\\uD83D\\uDD60|\\uD83D\\uDD61|\\uD83D\\uDD62|\\uD83D\\uDD63|\\uD83D\\uDD64|\\uD83D\\uDD65|\\uD83D\\uDD66|\\uD83D\\uDD67|\\uD83D\\uDD08|\\uD83D\\uDE8B|\\uD83C\\uDFC5|\\uD83C\\uDFF4|\\uD83D\\uDCF8|\\uD83D\\uDECC|\\uD83D\\uDD95|\\uD83D\\uDD96|\\uD83D\\uDE41|\\uD83D\\uDE42|\\uD83D\\uDEEB|\\uD83D\\uDEEC|\\uD83C\\uDFFB|\\uD83C\\uDFFC|\\uD83C\\uDFFD|\\uD83C\\uDFFE|\\uD83C\\uDFFF|\\uD83D\\uDE43|\\uD83E\\uDD11|\\uD83E\\uDD13|\\uD83E\\uDD17|\\uD83D\\uDE44|\\uD83E\\uDD14|\\uD83E\\uDD10|\\u26F2\\uFE0F|\\#\\u20E3|\\9\\u20E3|\\8\\u20E3|\\7\\u20E3|\\6\\u20E3|\\*\\u20E3|\\4\\u20E3|\\3\\u20E3|\\2\\u20E3|\\1\\u20E3|\\0\\u20E3|\\5\\u20E3|\\u26B1|\\u26B0|\\u269C|\\u269B|\\u2699|\\u2697|\\u2696|\\u2694|\\u2692|\\u2639|\\u2638|\\u262F|\\u262E|\\u262A|\\u2626|\\u2623|\\u2622|\\u2620|\\u2618|\\u2604|\\u2603|\\u2602|\\u23FA|\\u23F9|\\u23F8|\\u23F2|\\u23F1|\\u23EF|\\u23EE|\\u23ED|\\u23CF|\\u270D|\\u2328|\\u271D|\\u3299|\\u3297|\\u303D|\\u3030|\\u2B55|\\u2B50|\\u2B1C|\\u2B1B|\\u2B07|\\u2B06|\\u2B05|\\u2935|\\u23E9|\\u23EA|\\u23EB|\\u23EC|\\u23F0|\\u23F3|\\u26CE|\\u2705|\\u270A|\\u270B|\\u2728|\\u274C|\\u274E|\\u2753|\\u2754|\\u2755|\\u2795|\\u2796|\\u2797|\\u27B0|\\u27BF|\\u00A9|\\u00AE|\\u203C|\\u2049|\\u2122|\\u2139|\\u2194|\\u2195|\\u2196|\\u2197|\\u2198|\\u2199|\\u21A9|\\u21AA|\\u231A|\\u231B|\\u24C2|\\u25AA|\\u25AB|\\u25B6|\\u25C0|\\u25FB|\\u25FC|\\u25FD|\\u25FE|\\u2600|\\u2601|\\u260E|\\u2611|\\u2614|\\u2615|\\u261D|\\u263A|\\u2648|\\u2649|\\u264A|\\u264B|\\u264C|\\u264D|\\u264E|\\u264F|\\u2650|\\u2651|\\u2652|\\u2653|\\u2660|\\u2663|\\u2665|\\u2666|\\u2668|\\u267B|\\u267F|\\u2693|\\u26A0|\\u26A1|\\u26AA|\\u26AB|\\u26BD|\\u26BE|\\u26C4|\\u26C5|\\u26D4|\\u26EA|\\u26F2|\\u26F3|\\u26F5|\\u26FA|\\u26FD|\\u2702|\\u2708|\\u2709|\\u270C|\\u270F|\\u2712|\\u2714|\\u2716|\\u2733|\\u2734|\\u2744|\\u2747|\\u2721|\\u2764|\\u27A1|\\u2934|\\u2935|\\u2B05|\\u2B06|\\u2B07|\\u2B1B|\\u2B1C|\\u2B50|\\u2B55|\\u3030|\\u303D|\\u3297|\\u3299|\\u2934|\\u27A1|\\u2764|\\u2757|\\u2747|\\u2744|\\u2734|\\u2733|\\u2716|\\u2714|\\u2712|\\u270F|\\u270C|\\u2709|\\u2708|\\u2702|\\u26FD|\\u26FA|\\u26F5|\\u26F3|\\u26F2|\\u26EA|\\u26D4|\\u26C5|\\u26C4|\\u26BE|\\u26BD|\\u26AB|\\u26AA|\\u26A1|\\u26A0|\\u2693|\\u271D|\\u267F|\\u267B|\\u2668|\\u2666|\\u2665|\\u2663|\\u2660|\\u2653|\\u2652|\\u2651|\\u2650|\\u264F|\\u264E|\\u264D|\\u2328|\\u264C|\\u264B|\\u264A|\\u2649|\\u2648|\\u263A|\\u261D|\\u2615|\\u2614|\\u2611|\\u260E|\\u2601|\\u2600|\\u25FE|\\u25FD|\\u25FC|\\u25FB|\\u25C0|\\u25B6|\\u25AB|\\u25AA|\\u24C2|\\u231B|\\u231A|\\u21AA|\\u270D|\\u21A9|\\u2199|\\u2198|\\u2197|\\u2196|\\u2195|\\u2194|\\u2139|\\u2122|\\u2049|\\u203C|\\u00AE|\\u00A9|\\u2763|\\u26F9|\\u26F8|\\u26F7|\\u26F4|\\u26F1|\\u26F0|\\u26E9|\\u26D3|\\u23CF|\\u23ED|\\u23EE|\\u23EF|\\u23F1|\\u23F2|\\u23F8|\\u23F9|\\u23FA|\\u2602|\\u2603|\\u2604|\\u2618|\\u2620|\\u2622|\\u2623|\\u2626|\\u262A|\\u262E|\\u262F|\\u2638|\\u2639|\\u2692|\\u2694|\\u2696|\\u2697|\\u2699|\\u269B|\\u269C|\\u26B0|\\u26B1|\\u26C8|\\u26CF|\\u26D1|\\u26D3|\\u26E9|\\u26F0|\\u26F1|\\u26F4|\\u26F7|\\u26F8|\\u26F9|\\u2721|\\u2763|\\u26D1|\\u26CF|\\u26C8|\\u2757)",
f.jsEscapeMap={"👩‍❤️‍💋‍👩":"1f469-200d-2764-fe0f-200d-1f48b-200d-1f469","👩❤💋👩":"1f469-2764-1f48b-1f469","👨‍❤️‍💋‍👨":"1f468-200d-2764-fe0f-200d-1f48b-200d-1f468","👨❤💋👨":"1f468-2764-1f48b-1f468","👨‍👨‍👦‍👦":"1f468-200d-1f468-200d-1f466-200d-1f466","👨👨👦👦":"1f468-1f468-1f466-1f466","👨‍👨‍👧‍👦":"1f468-200d-1f468-200d-1f467-200d-1f466","👨👨👧👦":"1f468-1f468-1f467-1f466","👨‍👨‍👧‍👧":"1f468-200d-1f468-200d-1f467-200d-1f467","👨👨👧👧":"1f468-1f468-1f467-1f467","👨‍👩‍👦‍👦":"1f468-200d-1f469-200d-1f466-200d-1f466","👨👩👦👦":"1f468-1f469-1f466-1f466","👨‍👩‍👧‍👦":"1f468-200d-1f469-200d-1f467-200d-1f466","👨👩👧👦":"1f468-1f469-1f467-1f466","👨‍👩‍👧‍👧":"1f468-200d-1f469-200d-1f467-200d-1f467","👨👩👧👧":"1f468-1f469-1f467-1f467","👩‍👩‍👦‍👦":"1f469-200d-1f469-200d-1f466-200d-1f466","👩👩👦👦":"1f469-1f469-1f466-1f466","👩‍👩‍👧‍👦":"1f469-200d-1f469-200d-1f467-200d-1f466","👩👩👧👦":"1f469-1f469-1f467-1f466","👩‍👩‍👧‍👧":"1f469-200d-1f469-200d-1f467-200d-1f467","👩👩👧👧":"1f469-1f469-1f467-1f467","👩‍❤️‍👩":"1f469-200d-2764-fe0f-200d-1f469","👩❤👩":"1f469-2764-1f469","👨‍❤️‍👨":"1f468-200d-2764-fe0f-200d-1f468","👨❤👨":"1f468-2764-1f468","👨‍👨‍👦":"1f468-200d-1f468-200d-1f466","👨👨👦":"1f468-1f468-1f466","👨‍👨‍👧":"1f468-200d-1f468-200d-1f467","👨👨👧":"1f468-1f468-1f467","👨‍👩‍👧":"1f468-200d-1f469-200d-1f467","👨👩👧":"1f468-1f469-1f467","👩‍👩‍👦":"1f469-200d-1f469-200d-1f466","👩👩👦":"1f469-1f469-1f466","👩‍👩‍👧":"1f469-200d-1f469-200d-1f467","👩👩👧":"1f469-1f469-1f467","🏳️‍🌈":"1f3f3-fe0f-200d-1f308","🏳🌈":"1f3f3-1f308","👁‍🗨":"1f441-200d-1f5e8","👁🗨":"1f441-1f5e8","#️⃣":"0023-fe0f-20e3","#⃣":"0023-20e3","0️⃣":"0030-fe0f-20e3","0⃣":"0030-20e3","1️⃣":"0031-fe0f-20e3","1⃣":"0031-20e3","2️⃣":"0032-fe0f-20e3","2⃣":"0032-20e3","3️⃣":"0033-fe0f-20e3","3⃣":"0033-20e3","4️⃣":"0034-fe0f-20e3","4⃣":"0034-20e3","5️⃣":"0035-fe0f-20e3","5⃣":"0035-20e3","6️⃣":"0036-fe0f-20e3","6⃣":"0036-20e3","7️⃣":"0037-fe0f-20e3","7⃣":"0037-20e3","8️⃣":"0038-fe0f-20e3","8⃣":"0038-20e3","9️⃣":"0039-fe0f-20e3","9⃣":"0039-20e3","*️⃣":"002a-fe0f-20e3","*⃣":"002a-20e3","🤾🏿":"1f93e-1f3ff","🤾🏾":"1f93e-1f3fe","🤾🏽":"1f93e-1f3fd","🤾🏼":"1f93e-1f3fc","🤾🏻":"1f93e-1f3fb","🤽🏿":"1f93d-1f3ff","🤽🏾":"1f93d-1f3fe","🤽🏽":"1f93d-1f3fd","🤽🏼":"1f93d-1f3fc","🤽🏻":"1f93d-1f3fb","🤼🏿":"1f93c-1f3ff","🤼🏾":"1f93c-1f3fe","🤼🏽":"1f93c-1f3fd","🤼🏼":"1f93c-1f3fc","🤼🏻":"1f93c-1f3fb","🤹🏿":"1f939-1f3ff","🤹🏾":"1f939-1f3fe","🤹🏽":"1f939-1f3fd","🤹🏼":"1f939-1f3fc","🤹🏻":"1f939-1f3fb","🤸🏿":"1f938-1f3ff","🤸🏾":"1f938-1f3fe","🤸🏽":"1f938-1f3fd","🤸🏼":"1f938-1f3fc","🤸🏻":"1f938-1f3fb","🤷🏿":"1f937-1f3ff","🤷🏾":"1f937-1f3fe","🤷🏽":"1f937-1f3fd","🤷🏼":"1f937-1f3fc","🤷🏻":"1f937-1f3fb","🤶🏿":"1f936-1f3ff","🤶🏾":"1f936-1f3fe","🤶🏽":"1f936-1f3fd","🤶🏼":"1f936-1f3fc","🤶🏻":"1f936-1f3fb","🤵🏿":"1f935-1f3ff","🤵🏾":"1f935-1f3fe","🤵🏽":"1f935-1f3fd","🤵🏼":"1f935-1f3fc","🤵🏻":"1f935-1f3fb","🤴🏿":"1f934-1f3ff","🤴🏾":"1f934-1f3fe","🤴🏽":"1f934-1f3fd","🤴🏼":"1f934-1f3fc","🤴🏻":"1f934-1f3fb","🤳🏿":"1f933-1f3ff","🤳🏾":"1f933-1f3fe","🤳🏽":"1f933-1f3fd","🤳🏼":"1f933-1f3fc","🤳🏻":"1f933-1f3fb","🤰🏿":"1f930-1f3ff","🤰🏾":"1f930-1f3fe","🤰🏽":"1f930-1f3fd","🤰🏼":"1f930-1f3fc","🤰🏻":"1f930-1f3fb","🤦🏿":"1f926-1f3ff","🤦🏾":"1f926-1f3fe","🤦🏽":"1f926-1f3fd","🤦🏼":"1f926-1f3fc","🤦🏻":"1f926-1f3fb","🤞🏿":"1f91e-1f3ff","🤞🏾":"1f91e-1f3fe","🤞🏽":"1f91e-1f3fd","🤞🏼":"1f91e-1f3fc","🤞🏻":"1f91e-1f3fb","🤝🏿":"1f91d-1f3ff","🤝🏾":"1f91d-1f3fe","🤝🏽":"1f91d-1f3fd","🤝🏼":"1f91d-1f3fc","🤝🏻":"1f91d-1f3fb","🤜🏿":"1f91c-1f3ff","🤜🏾":"1f91c-1f3fe","🤜🏽":"1f91c-1f3fd","🤜🏼":"1f91c-1f3fc","🤜🏻":"1f91c-1f3fb","🤛🏿":"1f91b-1f3ff","🤛🏾":"1f91b-1f3fe","🤛🏽":"1f91b-1f3fd","🤛🏼":"1f91b-1f3fc","🤛🏻":"1f91b-1f3fb","🤚🏿":"1f91a-1f3ff","🤚🏾":"1f91a-1f3fe","🤚🏽":"1f91a-1f3fd","🤚🏼":"1f91a-1f3fc","🤚🏻":"1f91a-1f3fb","🤙🏿":"1f919-1f3ff","🤙🏾":"1f919-1f3fe","🤙🏽":"1f919-1f3fd","🤙🏼":"1f919-1f3fc","🤙🏻":"1f919-1f3fb","🤘🏿":"1f918-1f3ff","🤘🏾":"1f918-1f3fe","🤘🏽":"1f918-1f3fd","🤘🏼":"1f918-1f3fc","🤘🏻":"1f918-1f3fb","🛀🏿":"1f6c0-1f3ff","🛀🏾":"1f6c0-1f3fe","🛀🏽":"1f6c0-1f3fd","🛀🏼":"1f6c0-1f3fc","🛀🏻":"1f6c0-1f3fb","🚶🏿":"1f6b6-1f3ff","🚶🏾":"1f6b6-1f3fe","🚶🏽":"1f6b6-1f3fd","🚶🏼":"1f6b6-1f3fc","🚶🏻":"1f6b6-1f3fb","🚵🏿":"1f6b5-1f3ff","🚵🏾":"1f6b5-1f3fe","🚵🏽":"1f6b5-1f3fd","🚵🏼":"1f6b5-1f3fc","🚵🏻":"1f6b5-1f3fb","🚴🏿":"1f6b4-1f3ff","🚴🏾":"1f6b4-1f3fe","🚴🏽":"1f6b4-1f3fd","🚴🏼":"1f6b4-1f3fc","🚴🏻":"1f6b4-1f3fb","🚣🏿":"1f6a3-1f3ff","🚣🏾":"1f6a3-1f3fe","🚣🏽":"1f6a3-1f3fd","🚣🏼":"1f6a3-1f3fc","🚣🏻":"1f6a3-1f3fb","🙏🏿":"1f64f-1f3ff","🙏🏾":"1f64f-1f3fe","🙏🏽":"1f64f-1f3fd","🙏🏼":"1f64f-1f3fc","🙏🏻":"1f64f-1f3fb","🙎🏿":"1f64e-1f3ff","🙎🏾":"1f64e-1f3fe","🙎🏽":"1f64e-1f3fd","🙎🏼":"1f64e-1f3fc","🙎🏻":"1f64e-1f3fb","🙍🏿":"1f64d-1f3ff","🙍🏾":"1f64d-1f3fe","🙍🏽":"1f64d-1f3fd","🙍🏼":"1f64d-1f3fc","🙍🏻":"1f64d-1f3fb","🙌🏿":"1f64c-1f3ff","🙌🏾":"1f64c-1f3fe","🙌🏽":"1f64c-1f3fd","🙌🏼":"1f64c-1f3fc","🙌🏻":"1f64c-1f3fb","🙋🏿":"1f64b-1f3ff","🙋🏾":"1f64b-1f3fe","🙋🏽":"1f64b-1f3fd","🙋🏼":"1f64b-1f3fc","🙋🏻":"1f64b-1f3fb","🙇🏿":"1f647-1f3ff","🙇🏾":"1f647-1f3fe","🙇🏽":"1f647-1f3fd","🙇🏼":"1f647-1f3fc","🙇🏻":"1f647-1f3fb","🙆🏿":"1f646-1f3ff","🙆🏾":"1f646-1f3fe","🙆🏽":"1f646-1f3fd","🙆🏼":"1f646-1f3fc","🙆🏻":"1f646-1f3fb","🙅🏿":"1f645-1f3ff","🙅🏾":"1f645-1f3fe","🙅🏽":"1f645-1f3fd","🙅🏼":"1f645-1f3fc","🙅🏻":"1f645-1f3fb","🖖🏿":"1f596-1f3ff","🖖🏾":"1f596-1f3fe","🖖🏽":"1f596-1f3fd","🖖🏼":"1f596-1f3fc","🖖🏻":"1f596-1f3fb","🖕🏿":"1f595-1f3ff","🖕🏾":"1f595-1f3fe","🖕🏽":"1f595-1f3fd","🖕🏼":"1f595-1f3fc","🖕🏻":"1f595-1f3fb","🖐🏿":"1f590-1f3ff","🖐🏾":"1f590-1f3fe","🖐🏽":"1f590-1f3fd","🖐🏼":"1f590-1f3fc","🖐🏻":"1f590-1f3fb","🕺🏿":"1f57a-1f3ff","🕺🏾":"1f57a-1f3fe","🕺🏽":"1f57a-1f3fd","🕺🏼":"1f57a-1f3fc","🕺🏻":"1f57a-1f3fb","🕵🏿":"1f575-1f3ff","🕵🏾":"1f575-1f3fe","🕵🏽":"1f575-1f3fd","🕵🏼":"1f575-1f3fc","🕵🏻":"1f575-1f3fb","💪🏿":"1f4aa-1f3ff","💪🏾":"1f4aa-1f3fe","💪🏽":"1f4aa-1f3fd","💪🏼":"1f4aa-1f3fc","💪🏻":"1f4aa-1f3fb","💇🏿":"1f487-1f3ff","💇🏾":"1f487-1f3fe","💇🏽":"1f487-1f3fd","💇🏼":"1f487-1f3fc","💇🏻":"1f487-1f3fb","💆🏿":"1f486-1f3ff","💆🏾":"1f486-1f3fe","💆🏽":"1f486-1f3fd","💆🏼":"1f486-1f3fc","💆🏻":"1f486-1f3fb","💅🏿":"1f485-1f3ff","💅🏾":"1f485-1f3fe","💅🏽":"1f485-1f3fd","💅🏼":"1f485-1f3fc","💅🏻":"1f485-1f3fb","💃🏿":"1f483-1f3ff","💃🏾":"1f483-1f3fe","💃🏽":"1f483-1f3fd","💃🏼":"1f483-1f3fc","💃🏻":"1f483-1f3fb","💂🏿":"1f482-1f3ff","💂🏾":"1f482-1f3fe","💂🏽":"1f482-1f3fd","💂🏼":"1f482-1f3fc","💂🏻":"1f482-1f3fb","💁🏿":"1f481-1f3ff","💁🏾":"1f481-1f3fe","💁🏽":"1f481-1f3fd","💁🏼":"1f481-1f3fc","💁🏻":"1f481-1f3fb","👼🏿":"1f47c-1f3ff","👼🏾":"1f47c-1f3fe","👼🏽":"1f47c-1f3fd","👼🏼":"1f47c-1f3fc","👼🏻":"1f47c-1f3fb","👸🏿":"1f478-1f3ff","👸🏾":"1f478-1f3fe","👸🏽":"1f478-1f3fd","👸🏼":"1f478-1f3fc","👸🏻":"1f478-1f3fb","👷🏿":"1f477-1f3ff","👷🏾":"1f477-1f3fe","👷🏽":"1f477-1f3fd","👷🏼":"1f477-1f3fc","👷🏻":"1f477-1f3fb","👶🏿":"1f476-1f3ff","👶🏾":"1f476-1f3fe","👶🏽":"1f476-1f3fd","👶🏼":"1f476-1f3fc","👶🏻":"1f476-1f3fb","👵🏿":"1f475-1f3ff","👵🏾":"1f475-1f3fe","👵🏽":"1f475-1f3fd","👵🏼":"1f475-1f3fc","👵🏻":"1f475-1f3fb","👴🏿":"1f474-1f3ff","👴🏾":"1f474-1f3fe","👴🏽":"1f474-1f3fd","👴🏼":"1f474-1f3fc","👴🏻":"1f474-1f3fb","👳🏿":"1f473-1f3ff","👳🏾":"1f473-1f3fe","👳🏽":"1f473-1f3fd","👳🏼":"1f473-1f3fc","👳🏻":"1f473-1f3fb","👲🏿":"1f472-1f3ff","👲🏾":"1f472-1f3fe","👲🏽":"1f472-1f3fd","👲🏼":"1f472-1f3fc","👲🏻":"1f472-1f3fb","👱🏿":"1f471-1f3ff","👱🏾":"1f471-1f3fe","👱🏽":"1f471-1f3fd","👱🏼":"1f471-1f3fc","👱🏻":"1f471-1f3fb","👰🏿":"1f470-1f3ff","👰🏾":"1f470-1f3fe","👰🏽":"1f470-1f3fd","👰🏼":"1f470-1f3fc","👰🏻":"1f470-1f3fb","👮🏿":"1f46e-1f3ff","👮🏾":"1f46e-1f3fe","👮🏽":"1f46e-1f3fd","👮🏼":"1f46e-1f3fc","👮🏻":"1f46e-1f3fb","👩🏿":"1f469-1f3ff","👩🏾":"1f469-1f3fe","👩🏽":"1f469-1f3fd","👩🏼":"1f469-1f3fc","👩🏻":"1f469-1f3fb","👨🏿":"1f468-1f3ff","👨🏾":"1f468-1f3fe","👨🏽":"1f468-1f3fd","👨🏼":"1f468-1f3fc","👨🏻":"1f468-1f3fb","👧🏿":"1f467-1f3ff","👧🏾":"1f467-1f3fe","👧🏽":"1f467-1f3fd","👧🏼":"1f467-1f3fc","👧🏻":"1f467-1f3fb","👦🏿":"1f466-1f3ff","👦🏾":"1f466-1f3fe","👦🏽":"1f466-1f3fd","👦🏼":"1f466-1f3fc","👦🏻":"1f466-1f3fb","👐🏿":"1f450-1f3ff","👐🏾":"1f450-1f3fe","👐🏽":"1f450-1f3fd","👐🏼":"1f450-1f3fc","👐🏻":"1f450-1f3fb","👏🏿":"1f44f-1f3ff","👏🏾":"1f44f-1f3fe","👏🏽":"1f44f-1f3fd","👏🏼":"1f44f-1f3fc","👏🏻":"1f44f-1f3fb","👎🏿":"1f44e-1f3ff","👎🏾":"1f44e-1f3fe","👎🏽":"1f44e-1f3fd","👎🏼":"1f44e-1f3fc","👎🏻":"1f44e-1f3fb","👍🏿":"1f44d-1f3ff","👍🏾":"1f44d-1f3fe","👍🏽":"1f44d-1f3fd","👍🏼":"1f44d-1f3fc","👍🏻":"1f44d-1f3fb","👌🏿":"1f44c-1f3ff","👌🏾":"1f44c-1f3fe","👌🏽":"1f44c-1f3fd","👌🏼":"1f44c-1f3fc","👌🏻":"1f44c-1f3fb","👋🏿":"1f44b-1f3ff","👋🏾":"1f44b-1f3fe","👋🏽":"1f44b-1f3fd","👋🏼":"1f44b-1f3fc","👋🏻":"1f44b-1f3fb","👊🏿":"1f44a-1f3ff","👊🏾":"1f44a-1f3fe","👊🏽":"1f44a-1f3fd","👊🏼":"1f44a-1f3fc","👊🏻":"1f44a-1f3fb","👉🏿":"1f449-1f3ff","👉🏾":"1f449-1f3fe","👉🏽":"1f449-1f3fd","👉🏼":"1f449-1f3fc","👉🏻":"1f449-1f3fb","👈🏿":"1f448-1f3ff","👈🏾":"1f448-1f3fe","👈🏽":"1f448-1f3fd","👈🏼":"1f448-1f3fc","👈🏻":"1f448-1f3fb","👇🏿":"1f447-1f3ff","👇🏾":"1f447-1f3fe","👇🏽":"1f447-1f3fd","👇🏼":"1f447-1f3fc","👇🏻":"1f447-1f3fb","👆🏿":"1f446-1f3ff","👆🏾":"1f446-1f3fe","👆🏽":"1f446-1f3fd","👆🏼":"1f446-1f3fc","👆🏻":"1f446-1f3fb","👃🏿":"1f443-1f3ff","👃🏾":"1f443-1f3fe","👃🏽":"1f443-1f3fd","👃🏼":"1f443-1f3fc","👃🏻":"1f443-1f3fb","👂🏿":"1f442-1f3ff","👂🏾":"1f442-1f3fe","👂🏽":"1f442-1f3fd","👂🏼":"1f442-1f3fc","👂🏻":"1f442-1f3fb","🏋🏿":"1f3cb-1f3ff","🏋🏾":"1f3cb-1f3fe","🏋🏽":"1f3cb-1f3fd","🏋🏼":"1f3cb-1f3fc","🏋🏻":"1f3cb-1f3fb","🏊🏿":"1f3ca-1f3ff","🏊🏾":"1f3ca-1f3fe","🏊🏽":"1f3ca-1f3fd","🏊🏼":"1f3ca-1f3fc","🏊🏻":"1f3ca-1f3fb","🏇🏿":"1f3c7-1f3ff","🏇🏾":"1f3c7-1f3fe","🏇🏽":"1f3c7-1f3fd","🏇🏼":"1f3c7-1f3fc","🏇🏻":"1f3c7-1f3fb","🏄🏿":"1f3c4-1f3ff","🏄🏾":"1f3c4-1f3fe","🏄🏽":"1f3c4-1f3fd","🏄🏼":"1f3c4-1f3fc","🏄🏻":"1f3c4-1f3fb","🏃🏿":"1f3c3-1f3ff","🏃🏾":"1f3c3-1f3fe","🏃🏽":"1f3c3-1f3fd","🏃🏼":"1f3c3-1f3fc","🏃🏻":"1f3c3-1f3fb","🎅🏿":"1f385-1f3ff","🎅🏾":"1f385-1f3fe","🎅🏽":"1f385-1f3fd","🎅🏼":"1f385-1f3fc","🎅🏻":"1f385-1f3fb","🇿🇼":"1f1ff-1f1fc","🇿🇲":"1f1ff-1f1f2","🇿🇦":"1f1ff-1f1e6","🇾🇹":"1f1fe-1f1f9","🇾🇪":"1f1fe-1f1ea","🇽🇰":"1f1fd-1f1f0","🇼🇸":"1f1fc-1f1f8","🇼🇫":"1f1fc-1f1eb","🇻🇺":"1f1fb-1f1fa","🇻🇳":"1f1fb-1f1f3","🇻🇮":"1f1fb-1f1ee","🇻🇬":"1f1fb-1f1ec","🇻🇪":"1f1fb-1f1ea","🇻🇨":"1f1fb-1f1e8","🇻🇦":"1f1fb-1f1e6","🇺🇿":"1f1fa-1f1ff","🇺🇾":"1f1fa-1f1fe","🇺🇸":"1f1fa-1f1f8","🇺🇲":"1f1fa-1f1f2","🇺🇬":"1f1fa-1f1ec","🇺🇦":"1f1fa-1f1e6","🇹🇿":"1f1f9-1f1ff","🇹🇼":"1f1f9-1f1fc","🇹🇻":"1f1f9-1f1fb","🇹🇹":"1f1f9-1f1f9","🇹🇷":"1f1f9-1f1f7","🇹🇴":"1f1f9-1f1f4","🇹🇳":"1f1f9-1f1f3","🇹🇲":"1f1f9-1f1f2","🇹🇱":"1f1f9-1f1f1","🇹🇰":"1f1f9-1f1f0","🇹🇯":"1f1f9-1f1ef","🇹🇭":"1f1f9-1f1ed","🇹🇬":"1f1f9-1f1ec","🇹🇫":"1f1f9-1f1eb","🇹🇩":"1f1f9-1f1e9","🇹🇨":"1f1f9-1f1e8","🇹🇦":"1f1f9-1f1e6","🇸🇿":"1f1f8-1f1ff","🇸🇾":"1f1f8-1f1fe","🇸🇽":"1f1f8-1f1fd","🇸🇻":"1f1f8-1f1fb","🇸🇹":"1f1f8-1f1f9","🇸🇸":"1f1f8-1f1f8","🇸🇷":"1f1f8-1f1f7","🇸🇴":"1f1f8-1f1f4","🇸🇳":"1f1f8-1f1f3","🇸🇲":"1f1f8-1f1f2","🇸🇱":"1f1f8-1f1f1","🇸🇰":"1f1f8-1f1f0","🇸🇯":"1f1f8-1f1ef","🇸🇮":"1f1f8-1f1ee","🇸🇭":"1f1f8-1f1ed","🇸🇬":"1f1f8-1f1ec","🇸🇪":"1f1f8-1f1ea","🇸🇩":"1f1f8-1f1e9","🇸🇨":"1f1f8-1f1e8","🇸🇧":"1f1f8-1f1e7","🇸🇦":"1f1f8-1f1e6","🇷🇼":"1f1f7-1f1fc","🇷🇺":"1f1f7-1f1fa","🇷🇸":"1f1f7-1f1f8","🇷🇴":"1f1f7-1f1f4","🇷🇪":"1f1f7-1f1ea","🇶🇦":"1f1f6-1f1e6","🇵🇾":"1f1f5-1f1fe","🇵🇼":"1f1f5-1f1fc","🇵🇹":"1f1f5-1f1f9","🇵🇸":"1f1f5-1f1f8","🇵🇷":"1f1f5-1f1f7","🇵🇳":"1f1f5-1f1f3","🇵🇲":"1f1f5-1f1f2","🇵🇱":"1f1f5-1f1f1","🇵🇰":"1f1f5-1f1f0","🇵🇭":"1f1f5-1f1ed","🇵🇬":"1f1f5-1f1ec","🇵🇫":"1f1f5-1f1eb","🇵🇪":"1f1f5-1f1ea","🇵🇦":"1f1f5-1f1e6","🇴🇲":"1f1f4-1f1f2","🇳🇿":"1f1f3-1f1ff","🇳🇺":"1f1f3-1f1fa","🇳🇷":"1f1f3-1f1f7","🇳🇵":"1f1f3-1f1f5","🇳🇴":"1f1f3-1f1f4","🇳🇱":"1f1f3-1f1f1","🇳🇮":"1f1f3-1f1ee","🇳🇬":"1f1f3-1f1ec","🇳🇫":"1f1f3-1f1eb","🇳🇪":"1f1f3-1f1ea","🇳🇨":"1f1f3-1f1e8","🇳🇦":"1f1f3-1f1e6","🇲🇿":"1f1f2-1f1ff","🇲🇾":"1f1f2-1f1fe","🇲🇽":"1f1f2-1f1fd","🇲🇼":"1f1f2-1f1fc","🇲🇻":"1f1f2-1f1fb","🇲🇺":"1f1f2-1f1fa","🇲🇹":"1f1f2-1f1f9","🇲🇸":"1f1f2-1f1f8","🇲🇷":"1f1f2-1f1f7","🇲🇶":"1f1f2-1f1f6","🇲🇵":"1f1f2-1f1f5","🇲🇴":"1f1f2-1f1f4","🇲🇳":"1f1f2-1f1f3","🇲🇲":"1f1f2-1f1f2","🇲🇱":"1f1f2-1f1f1","🇲🇰":"1f1f2-1f1f0","🇲🇭":"1f1f2-1f1ed","🇲🇬":"1f1f2-1f1ec","🇲🇫":"1f1f2-1f1eb","🇲🇪":"1f1f2-1f1ea","🇲🇩":"1f1f2-1f1e9","🇲🇨":"1f1f2-1f1e8","🇲🇦":"1f1f2-1f1e6","🇱🇾":"1f1f1-1f1fe","🇱🇻":"1f1f1-1f1fb","🇱🇺":"1f1f1-1f1fa","🇱🇹":"1f1f1-1f1f9","🇱🇸":"1f1f1-1f1f8","🇱🇷":"1f1f1-1f1f7","🇱🇰":"1f1f1-1f1f0","🇱🇮":"1f1f1-1f1ee","🇱🇨":"1f1f1-1f1e8","🇱🇧":"1f1f1-1f1e7","🇱🇦":"1f1f1-1f1e6","🇰🇿":"1f1f0-1f1ff","🇰🇾":"1f1f0-1f1fe","🇰🇼":"1f1f0-1f1fc","🇰🇷":"1f1f0-1f1f7","🇰🇵":"1f1f0-1f1f5","🇰🇳":"1f1f0-1f1f3","🇰🇲":"1f1f0-1f1f2","🇰🇮":"1f1f0-1f1ee","🇰🇭":"1f1f0-1f1ed","🇰🇬":"1f1f0-1f1ec","🇰🇪":"1f1f0-1f1ea","🇯🇵":"1f1ef-1f1f5","🇯🇴":"1f1ef-1f1f4","🇯🇲":"1f1ef-1f1f2","🇯🇪":"1f1ef-1f1ea","🇮🇹":"1f1ee-1f1f9","🇮🇸":"1f1ee-1f1f8","🇮🇷":"1f1ee-1f1f7","🇮🇶":"1f1ee-1f1f6","🇮🇴":"1f1ee-1f1f4","🇮🇳":"1f1ee-1f1f3","🇮🇲":"1f1ee-1f1f2","🇮🇱":"1f1ee-1f1f1","🇮🇪":"1f1ee-1f1ea","🇮🇩":"1f1ee-1f1e9","🇮🇨":"1f1ee-1f1e8","🇭🇺":"1f1ed-1f1fa","🇭🇹":"1f1ed-1f1f9","🇭🇷":"1f1ed-1f1f7","🇭🇳":"1f1ed-1f1f3","🇭🇲":"1f1ed-1f1f2","🇭🇰":"1f1ed-1f1f0","🇬🇾":"1f1ec-1f1fe","🇬🇼":"1f1ec-1f1fc","🇬🇺":"1f1ec-1f1fa","🇬🇹":"1f1ec-1f1f9","🇬🇸":"1f1ec-1f1f8","🇬🇷":"1f1ec-1f1f7","🇬🇶":"1f1ec-1f1f6","🇬🇵":"1f1ec-1f1f5","🇬🇳":"1f1ec-1f1f3","🇬🇲":"1f1ec-1f1f2","🇬🇱":"1f1ec-1f1f1","🇬🇮":"1f1ec-1f1ee","🇬🇭":"1f1ec-1f1ed","🇬🇬":"1f1ec-1f1ec","🇬🇫":"1f1ec-1f1eb","🇬🇪":"1f1ec-1f1ea","🇬🇩":"1f1ec-1f1e9","🇬🇧":"1f1ec-1f1e7","🇬🇦":"1f1ec-1f1e6","🇫🇷":"1f1eb-1f1f7","🇫🇴":"1f1eb-1f1f4","🇫🇲":"1f1eb-1f1f2","🇫🇰":"1f1eb-1f1f0","🇫🇯":"1f1eb-1f1ef","🇫🇮":"1f1eb-1f1ee","🇪🇺":"1f1ea-1f1fa","🇪🇹":"1f1ea-1f1f9","🇪🇸":"1f1ea-1f1f8","🇪🇷":"1f1ea-1f1f7","🇪🇭":"1f1ea-1f1ed","🇪🇬":"1f1ea-1f1ec","🇪🇪":"1f1ea-1f1ea","🇪🇨":"1f1ea-1f1e8","🇪🇦":"1f1ea-1f1e6","🇩🇿":"1f1e9-1f1ff","🇩🇴":"1f1e9-1f1f4","🇩🇲":"1f1e9-1f1f2","🇩🇰":"1f1e9-1f1f0","🇩🇯":"1f1e9-1f1ef","🇩🇬":"1f1e9-1f1ec","🇩🇪":"1f1e9-1f1ea","🇨🇿":"1f1e8-1f1ff","🇨🇾":"1f1e8-1f1fe","🇨🇽":"1f1e8-1f1fd","🇨🇼":"1f1e8-1f1fc","🇨🇻":"1f1e8-1f1fb","🇨🇺":"1f1e8-1f1fa","🇨🇷":"1f1e8-1f1f7","🇨🇵":"1f1e8-1f1f5","🇨🇴":"1f1e8-1f1f4","🇨🇳":"1f1e8-1f1f3","🇨🇲":"1f1e8-1f1f2","🇨🇱":"1f1e8-1f1f1","🇨🇰":"1f1e8-1f1f0","🇨🇮":"1f1e8-1f1ee","🇨🇭":"1f1e8-1f1ed","🇨🇬":"1f1e8-1f1ec","🇨🇫":"1f1e8-1f1eb","🇨🇩":"1f1e8-1f1e9","🇨🇨":"1f1e8-1f1e8","🇨🇦":"1f1e8-1f1e6","🇧🇿":"1f1e7-1f1ff","🇧🇾":"1f1e7-1f1fe","🇧🇼":"1f1e7-1f1fc","🇧🇻":"1f1e7-1f1fb","🇧🇹":"1f1e7-1f1f9","🇧🇸":"1f1e7-1f1f8","🇧🇷":"1f1e7-1f1f7","🇧🇶":"1f1e7-1f1f6","🇧🇴":"1f1e7-1f1f4","🇧🇳":"1f1e7-1f1f3","🇧🇲":"1f1e7-1f1f2","🇧🇱":"1f1e7-1f1f1","🇧🇯":"1f1e7-1f1ef","🇧🇮":"1f1e7-1f1ee","🇧🇭":"1f1e7-1f1ed","🇧🇬":"1f1e7-1f1ec","🇧🇫":"1f1e7-1f1eb","🇧🇪":"1f1e7-1f1ea","🇧🇩":"1f1e7-1f1e9","🇧🇧":"1f1e7-1f1e7","🇧🇦":"1f1e7-1f1e6","🇦🇿":"1f1e6-1f1ff","🇦🇽":"1f1e6-1f1fd","🇦🇼":"1f1e6-1f1fc","🇦🇺":"1f1e6-1f1fa","🇦🇹":"1f1e6-1f1f9","🇦🇸":"1f1e6-1f1f8","🇦🇷":"1f1e6-1f1f7","🇦🇶":"1f1e6-1f1f6","🇦🇴":"1f1e6-1f1f4","🇦🇲":"1f1e6-1f1f2","🇦🇱":"1f1e6-1f1f1","🇦🇮":"1f1e6-1f1ee","🇦🇬":"1f1e6-1f1ec","🇦🇫":"1f1e6-1f1eb","🇦🇪":"1f1e6-1f1ea","🇦🇩":"1f1e6-1f1e9","🇦🇨":"1f1e6-1f1e8","🀄️":"1f004-fe0f","🀄":"1f004","🅿️":"1f17f-fe0f","🅿":"1f17f","🈂️":"1f202-fe0f","🈂":"1f202","🈚️":"1f21a-fe0f","🈚":"1f21a","🈯️":"1f22f-fe0f","🈯":"1f22f","🈷️":"1f237-fe0f","🈷":"1f237","🎞️":"1f39e-fe0f","🎞":"1f39e","🎟️":"1f39f-fe0f","🎟":"1f39f","🏋️":"1f3cb-fe0f","🏋":"1f3cb","🏌️":"1f3cc-fe0f","🏌":"1f3cc","🏍️":"1f3cd-fe0f","🏍":"1f3cd","🏎️":"1f3ce-fe0f","🏎":"1f3ce","🎖️":"1f396-fe0f","🎖":"1f396","🎗️":"1f397-fe0f","🎗":"1f397","🌶️":"1f336-fe0f","🌶":"1f336","🌧️":"1f327-fe0f","🌧":"1f327","🌨️":"1f328-fe0f","🌨":"1f328","🌩️":"1f329-fe0f","🌩":"1f329","🌪️":"1f32a-fe0f","🌪":"1f32a","🌫️":"1f32b-fe0f","🌫":"1f32b","🌬️":"1f32c-fe0f","🌬":"1f32c","🐿️":"1f43f-fe0f","🐿":"1f43f","🕷️":"1f577-fe0f","🕷":"1f577","🕸️":"1f578-fe0f","🕸":"1f578","🌡️":"1f321-fe0f","🌡":"1f321","🎙️":"1f399-fe0f","🎙":"1f399","🎚️":"1f39a-fe0f","🎚":"1f39a","🎛️":"1f39b-fe0f","🎛":"1f39b","🏳️":"1f3f3-fe0f","🏳":"1f3f3","🏵️":"1f3f5-fe0f","🏵":"1f3f5","🏷️":"1f3f7-fe0f","🏷":"1f3f7","📽️":"1f4fd-fe0f","📽":"1f4fd","🕉️":"1f549-fe0f","🕉":"1f549","🕊️":"1f54a-fe0f","🕊":"1f54a","🕯️":"1f56f-fe0f","🕯":"1f56f","🕰️":"1f570-fe0f","🕰":"1f570","🕳️":"1f573-fe0f","🕳":"1f573","🕶️":"1f576-fe0f","🕶":"1f576","🕹️":"1f579-fe0f","🕹":"1f579","🖇️":"1f587-fe0f","🖇":"1f587","🖊️":"1f58a-fe0f","🖊":"1f58a","🖋️":"1f58b-fe0f","🖋":"1f58b","🖌️":"1f58c-fe0f","🖌":"1f58c","🖍️":"1f58d-fe0f","🖍":"1f58d","🖥️":"1f5a5-fe0f","🖥":"1f5a5","🖨️":"1f5a8-fe0f","🖨":"1f5a8","🖲️":"1f5b2-fe0f","🖲":"1f5b2","🖼️":"1f5bc-fe0f","🖼":"1f5bc","🗂️":"1f5c2-fe0f","🗂":"1f5c2","🗃️":"1f5c3-fe0f","🗃":"1f5c3","🗄️":"1f5c4-fe0f","🗄":"1f5c4","🗑️":"1f5d1-fe0f","🗑":"1f5d1","🗒️":"1f5d2-fe0f","🗒":"1f5d2","🗓️":"1f5d3-fe0f","🗓":"1f5d3","🗜️":"1f5dc-fe0f","🗜":"1f5dc","🗝️":"1f5dd-fe0f","🗝":"1f5dd","🗞️":"1f5de-fe0f","🗞":"1f5de","🗡️":"1f5e1-fe0f","🗡":"1f5e1","🗣️":"1f5e3-fe0f","🗣":"1f5e3","🗨️":"1f5e8-fe0f","🗨":"1f5e8","🗯️":"1f5ef-fe0f","🗯":"1f5ef","🗳️":"1f5f3-fe0f","🗳":"1f5f3","🗺️":"1f5fa-fe0f","🗺":"1f5fa","🛠️":"1f6e0-fe0f","🛠":"1f6e0","🛡️":"1f6e1-fe0f","🛡":"1f6e1","🛢️":"1f6e2-fe0f","🛢":"1f6e2","🛰️":"1f6f0-fe0f","🛰":"1f6f0","🍽️":"1f37d-fe0f","🍽":"1f37d","👁️":"1f441-fe0f","👁":"1f441","🕴️":"1f574-fe0f","🕴":"1f574","🕵️":"1f575-fe0f","🕵":"1f575","🖐️":"1f590-fe0f","🖐":"1f590","🏔️":"1f3d4-fe0f","🏔":"1f3d4","🏕️":"1f3d5-fe0f","🏕":"1f3d5","🏖️":"1f3d6-fe0f","🏖":"1f3d6","🏗️":"1f3d7-fe0f","🏗":"1f3d7","🏘️":"1f3d8-fe0f","🏘":"1f3d8","🏙️":"1f3d9-fe0f","🏙":"1f3d9","🏚️":"1f3da-fe0f","🏚":"1f3da","🏛️":"1f3db-fe0f","🏛":"1f3db","🏜️":"1f3dc-fe0f","🏜":"1f3dc","🏝️":"1f3dd-fe0f","🏝":"1f3dd","🏞️":"1f3de-fe0f","🏞":"1f3de","🏟️":"1f3df-fe0f","🏟":"1f3df","🛋️":"1f6cb-fe0f","🛋":"1f6cb","🛍️":"1f6cd-fe0f","🛍":"1f6cd","🛎️":"1f6ce-fe0f","🛎":"1f6ce","🛏️":"1f6cf-fe0f","🛏":"1f6cf","🛣️":"1f6e3-fe0f","🛣":"1f6e3","🛤️":"1f6e4-fe0f","🛤":"1f6e4","🛥️":"1f6e5-fe0f","🛥":"1f6e5","🛩️":"1f6e9-fe0f","🛩":"1f6e9","🛳️":"1f6f3-fe0f","🛳":"1f6f3","🌤️":"1f324-fe0f","🌤":"1f324","🌥️":"1f325-fe0f","🌥":"1f325","🌦️":"1f326-fe0f","🌦":"1f326","🖱️":"1f5b1-fe0f","🖱":"1f5b1","☝🏻":"261d-1f3fb","☝🏼":"261d-1f3fc","☝🏽":"261d-1f3fd","☝🏾":"261d-1f3fe","☝🏿":"261d-1f3ff","✌🏻":"270c-1f3fb","✌🏼":"270c-1f3fc","✌🏽":"270c-1f3fd","✌🏾":"270c-1f3fe","✌🏿":"270c-1f3ff","✊🏻":"270a-1f3fb","✊🏼":"270a-1f3fc","✊🏽":"270a-1f3fd","✊🏾":"270a-1f3fe","✊🏿":"270a-1f3ff","✋🏻":"270b-1f3fb","✋🏼":"270b-1f3fc","✋🏽":"270b-1f3fd","✋🏾":"270b-1f3fe","✋🏿":"270b-1f3ff","✍🏻":"270d-1f3fb","✍🏼":"270d-1f3fc","✍🏽":"270d-1f3fd","✍🏾":"270d-1f3fe","✍🏿":"270d-1f3ff","⛹🏻":"26f9-1f3fb","⛹🏼":"26f9-1f3fc","⛹🏽":"26f9-1f3fd","⛹🏾":"26f9-1f3fe","⛹🏿":"26f9-1f3ff","©️":"00a9-fe0f","©":"00a9","®️":"00ae-fe0f","®":"00ae","‼️":"203c-fe0f","‼":"203c","⁉️":"2049-fe0f","⁉":"2049","™️":"2122-fe0f","™":"2122","ℹ️":"2139-fe0f","ℹ":"2139","↔️":"2194-fe0f","↔":"2194","↕️":"2195-fe0f","↕":"2195","↖️":"2196-fe0f","↖":"2196","↗️":"2197-fe0f","↗":"2197","↘️":"2198-fe0f","↘":"2198","↙️":"2199-fe0f","↙":"2199","↩️":"21a9-fe0f","↩":"21a9","↪️":"21aa-fe0f","↪":"21aa","⌚️":"231a-fe0f","⌚":"231a","⌛️":"231b-fe0f","⌛":"231b","Ⓜ️":"24c2-fe0f","Ⓜ":"24c2","▪️":"25aa-fe0f","▪":"25aa","▫️":"25ab-fe0f","▫":"25ab","▶️":"25b6-fe0f","▶":"25b6","◀️":"25c0-fe0f","◀":"25c0","◻️":"25fb-fe0f","◻":"25fb","◼️":"25fc-fe0f","◼":"25fc","◽️":"25fd-fe0f","◽":"25fd","◾️":"25fe-fe0f","◾":"25fe","☀️":"2600-fe0f","☀":"2600","☁️":"2601-fe0f","☁":"2601","☎️":"260e-fe0f","☎":"260e","☑️":"2611-fe0f","☑":"2611","☔️":"2614-fe0f","☔":"2614","☕️":"2615-fe0f","☕":"2615","☝️":"261d-fe0f","☝":"261d","☺️":"263a-fe0f","☺":"263a","♈️":"2648-fe0f","♈":"2648","♉️":"2649-fe0f","♉":"2649","♊️":"264a-fe0f","♊":"264a","♋️":"264b-fe0f","♋":"264b","♌️":"264c-fe0f","♌":"264c","♍️":"264d-fe0f","♍":"264d","♎️":"264e-fe0f","♎":"264e","♏️":"264f-fe0f","♏":"264f","♐️":"2650-fe0f","♐":"2650","♑️":"2651-fe0f","♑":"2651","♒️":"2652-fe0f","♒":"2652","♓️":"2653-fe0f","♓":"2653","♠️":"2660-fe0f","♠":"2660","♣️":"2663-fe0f","♣":"2663","♥️":"2665-fe0f","♥":"2665","♦️":"2666-fe0f","♦":"2666","♨️":"2668-fe0f","♨":"2668","♻️":"267b-fe0f","♻":"267b","♿️":"267f-fe0f","♿":"267f","⚓️":"2693-fe0f","⚓":"2693","⚠️":"26a0-fe0f","⚠":"26a0","⚡️":"26a1-fe0f","⚡":"26a1","⚪️":"26aa-fe0f","⚪":"26aa","⚫️":"26ab-fe0f","⚫":"26ab","⚽️":"26bd-fe0f","⚽":"26bd","⚾️":"26be-fe0f","⚾":"26be","⛄️":"26c4-fe0f","⛄":"26c4","⛅️":"26c5-fe0f","⛅":"26c5","⛔️":"26d4-fe0f","⛔":"26d4","⛪️":"26ea-fe0f","⛪":"26ea","⛲️":"26f2-fe0f","⛲":"26f2","⛳️":"26f3-fe0f","⛳":"26f3","⛵️":"26f5-fe0f","⛵":"26f5","⛺️":"26fa-fe0f","⛺":"26fa","⛽️":"26fd-fe0f","⛽":"26fd","✂️":"2702-fe0f","✂":"2702","✈️":"2708-fe0f","✈":"2708","✉️":"2709-fe0f","✉":"2709","✌️":"270c-fe0f","✌":"270c","✏️":"270f-fe0f","✏":"270f","✒️":"2712-fe0f","✒":"2712","✔️":"2714-fe0f","✔":"2714","✖️":"2716-fe0f","✖":"2716","✳️":"2733-fe0f","✳":"2733","✴️":"2734-fe0f","✴":"2734","❄️":"2744-fe0f","❄":"2744","❇️":"2747-fe0f","❇":"2747","❗️":"2757-fe0f","❗":"2757","❤️":"2764-fe0f","❤":"2764","➡️":"27a1-fe0f","➡":"27a1","⤴️":"2934-fe0f","⤴":"2934","⤵️":"2935-fe0f","⤵":"2935","⬅️":"2b05-fe0f","⬅":"2b05","⬆️":"2b06-fe0f","⬆":"2b06","⬇️":"2b07-fe0f","⬇":"2b07","⬛️":"2b1b-fe0f","⬛":"2b1b","⬜️":"2b1c-fe0f","⬜":"2b1c","⭐️":"2b50-fe0f","⭐":"2b50","⭕️":"2b55-fe0f","⭕":"2b55","〰️":"3030-fe0f","〰":"3030","〽️":"303d-fe0f","〽":"303d","㊗️":"3297-fe0f","㊗":"3297","㊙️":"3299-fe0f","㊙":"3299","✝️":"271d-fe0f","✝":"271d","⌨️":"2328-fe0f","⌨":"2328","✍️":"270d-fe0f","✍":"270d","⏏️":"23cf-fe0f","⏏":"23cf","⏭️":"23ed-fe0f","⏭":"23ed","⏮️":"23ee-fe0f","⏮":"23ee","⏯️":"23ef-fe0f","⏯":"23ef","⏱️":"23f1-fe0f","⏱":"23f1","⏲️":"23f2-fe0f","⏲":"23f2","⏸️":"23f8-fe0f","⏸":"23f8","⏹️":"23f9-fe0f","⏹":"23f9","⏺️":"23fa-fe0f","⏺":"23fa","☂️":"2602-fe0f","☂":"2602","☃️":"2603-fe0f","☃":"2603","☄️":"2604-fe0f","☄":"2604","☘️":"2618-fe0f","☘":"2618","☠️":"2620-fe0f","☠":"2620","☢️":"2622-fe0f","☢":"2622","☣️":"2623-fe0f","☣":"2623","☦️":"2626-fe0f","☦":"2626","☪️":"262a-fe0f","☪":"262a","☮️":"262e-fe0f","☮":"262e","☯️":"262f-fe0f","☯":"262f","☸️":"2638-fe0f","☸":"2638","☹️":"2639-fe0f","☹":"2639","⚒️":"2692-fe0f","⚒":"2692","⚔️":"2694-fe0f","⚔":"2694","⚖️":"2696-fe0f","⚖":"2696","⚗️":"2697-fe0f","⚗":"2697","⚙️":"2699-fe0f","⚙":"2699","⚛️":"269b-fe0f","⚛":"269b","⚜️":"269c-fe0f","⚜":"269c","⚰️":"26b0-fe0f","⚰":"26b0","⚱️":"26b1-fe0f","⚱":"26b1","⛈️":"26c8-fe0f","⛈":"26c8","⛏️":"26cf-fe0f","⛏":"26cf","⛑️":"26d1-fe0f","⛑":"26d1","⛓️":"26d3-fe0f","⛓":"26d3","⛩️":"26e9-fe0f","⛩":"26e9","⛰️":"26f0-fe0f","⛰":"26f0","⛱️":"26f1-fe0f","⛱":"26f1","⛴️":"26f4-fe0f","⛴":"26f4","⛷️":"26f7-fe0f","⛷":"26f7","⛸️":"26f8-fe0f","⛸":"26f8","⛹️":"26f9-fe0f","⛹":"26f9","✡️":"2721-fe0f","✡":"2721","❣️":"2763-fe0f","❣":"2763","🥉":"1f949","🥈":"1f948","🥇":"1f947","🤺":"1f93a","🥅":"1f945","🤾":"1f93e","🇿":"1f1ff","🤽":"1f93d","🥋":"1f94b","🥊":"1f94a","🤼":"1f93c","🤹":"1f939","🤸":"1f938","🛶":"1f6f6","🛵":"1f6f5","🛴":"1f6f4","🛒":"1f6d2","🃏":"1f0cf","🅰":"1f170","🅱":"1f171","🅾":"1f17e","🛑":"1f6d1","🆎":"1f18e","🆑":"1f191","🇾":"1f1fe","🆒":"1f192","🆓":"1f193","🆔":"1f194","🆕":"1f195","🆖":"1f196","🆗":"1f197","🆘":"1f198","🥄":"1f944","🆙":"1f199","🆚":"1f19a","🥂":"1f942","🥃":"1f943","🈁":"1f201","🥙":"1f959","🈲":"1f232","🈳":"1f233","🈴":"1f234","🈵":"1f235","🈶":"1f236","🥘":"1f958","🈸":"1f238","🈹":"1f239","🥗":"1f957","🈺":"1f23a","🉐":"1f250","🉑":"1f251","🌀":"1f300","🥖":"1f956","🌁":"1f301","🌂":"1f302","🌃":"1f303","🌄":"1f304","🌅":"1f305","🌆":"1f306","🥕":"1f955","🌇":"1f307","🌈":"1f308","🥔":"1f954","🌉":"1f309","🌊":"1f30a","🌋":"1f30b","🌌":"1f30c","🌏":"1f30f","🌑":"1f311","🥓":"1f953","🌓":"1f313","🌔":"1f314","🌕":"1f315","🌙":"1f319","🌛":"1f31b","🌟":"1f31f","🥒":"1f952","🌠":"1f320","🌰":"1f330","🥑":"1f951","🌱":"1f331","🌴":"1f334","🌵":"1f335","🌷":"1f337","🌸":"1f338","🌹":"1f339","🌺":"1f33a","🌻":"1f33b","🌼":"1f33c","🌽":"1f33d","🥐":"1f950","🌾":"1f33e","🌿":"1f33f","🍀":"1f340","🍁":"1f341","🍂":"1f342","🍃":"1f343","🍄":"1f344","🍅":"1f345","🍆":"1f346","🍇":"1f347","🍈":"1f348","🍉":"1f349","🍊":"1f34a","🥀":"1f940","🍌":"1f34c","🍍":"1f34d","🍎":"1f34e","🍏":"1f34f","🍑":"1f351","🍒":"1f352","🍓":"1f353","🦏":"1f98f","🍔":"1f354","🍕":"1f355","🍖":"1f356","🦎":"1f98e","🍗":"1f357","🍘":"1f358","🍙":"1f359","🦍":"1f98d","🍚":"1f35a","🍛":"1f35b","🦌":"1f98c","🍜":"1f35c","🍝":"1f35d","🍞":"1f35e","🍟":"1f35f","🦋":"1f98b","🍠":"1f360","🍡":"1f361","🦊":"1f98a","🍢":"1f362","🍣":"1f363","🦉":"1f989","🍤":"1f364","🍥":"1f365","🦈":"1f988","🍦":"1f366","🦇":"1f987","🍧":"1f367","🇽":"1f1fd","🍨":"1f368","🦆":"1f986","🍩":"1f369","🦅":"1f985","🍪":"1f36a","🖤":"1f5a4","🍫":"1f36b","🍬":"1f36c","🍭":"1f36d","🍮":"1f36e","🍯":"1f36f","🤞":"1f91e","🍰":"1f370","🍱":"1f371","🍲":"1f372","🤝":"1f91d","🍳":"1f373","🍴":"1f374","🍵":"1f375","🍶":"1f376","🍷":"1f377","🍸":"1f378","🍹":"1f379","🍺":"1f37a","🍻":"1f37b","🎀":"1f380","🎁":"1f381","🎂":"1f382","🎃":"1f383","🤛":"1f91b","🤜":"1f91c","🎄":"1f384","🎅":"1f385","🎆":"1f386","🤚":"1f91a","🎇":"1f387","🎈":"1f388","🎉":"1f389","🎊":"1f38a","🎋":"1f38b","🎌":"1f38c","🤙":"1f919","🎍":"1f38d","🕺":"1f57a","🎎":"1f38e","🤳":"1f933","🎏":"1f38f","🤰":"1f930","🎐":"1f390","🤦":"1f926","🤷":"1f937","🎑":"1f391","🎒":"1f392","🎓":"1f393","🎠":"1f3a0","🎡":"1f3a1","🎢":"1f3a2","🎣":"1f3a3","🎤":"1f3a4","🎥":"1f3a5","🎦":"1f3a6","🎧":"1f3a7","🤶":"1f936","🎨":"1f3a8","🤵":"1f935","🎩":"1f3a9","🎪":"1f3aa","🤴":"1f934","🎫":"1f3ab","🎬":"1f3ac","🎭":"1f3ad","🤧":"1f927","🎮":"1f3ae","🎯":"1f3af","🎰":"1f3b0","🎱":"1f3b1","🎲":"1f3b2","🎳":"1f3b3","🎴":"1f3b4","🤥":"1f925","🎵":"1f3b5","🎶":"1f3b6","🎷":"1f3b7","🤤":"1f924","🎸":"1f3b8","🎹":"1f3b9","🎺":"1f3ba","🤣":"1f923","🎻":"1f3bb","🎼":"1f3bc","🎽":"1f3bd","🤢":"1f922","🎾":"1f3be","🎿":"1f3bf","🏀":"1f3c0","🏁":"1f3c1","🤡":"1f921","🏂":"1f3c2","🏃":"1f3c3","🏄":"1f3c4","🏆":"1f3c6","🏈":"1f3c8","🏊":"1f3ca","🏠":"1f3e0","🏡":"1f3e1","🏢":"1f3e2","🏣":"1f3e3","🏥":"1f3e5","🏦":"1f3e6","🏧":"1f3e7","🏨":"1f3e8","🏩":"1f3e9","🏪":"1f3ea","🏫":"1f3eb","🏬":"1f3ec","🤠":"1f920","🏭":"1f3ed","🏮":"1f3ee","🏯":"1f3ef","🏰":"1f3f0","🐌":"1f40c","🐍":"1f40d","🐎":"1f40e","🐑":"1f411","🐒":"1f412","🐔":"1f414","🐗":"1f417","🐘":"1f418","🐙":"1f419","🐚":"1f41a","🐛":"1f41b","🐜":"1f41c","🐝":"1f41d","🐞":"1f41e","🐟":"1f41f","🐠":"1f420","🐡":"1f421","🐢":"1f422","🐣":"1f423","🐤":"1f424","🐥":"1f425","🐦":"1f426","🐧":"1f427","🐨":"1f428","🐩":"1f429","🐫":"1f42b","🐬":"1f42c","🐭":"1f42d","🐮":"1f42e","🐯":"1f42f","🐰":"1f430","🐱":"1f431","🐲":"1f432","🐳":"1f433","🐴":"1f434","🐵":"1f435","🐶":"1f436","🐷":"1f437","🐸":"1f438","🐹":"1f439","🐺":"1f43a","🐻":"1f43b","🐼":"1f43c","🐽":"1f43d","🐾":"1f43e","👀":"1f440","👂":"1f442","👃":"1f443","👄":"1f444","👅":"1f445","👆":"1f446","👇":"1f447","👈":"1f448","👉":"1f449","👊":"1f44a","👋":"1f44b","👌":"1f44c","👍":"1f44d","👎":"1f44e","👏":"1f44f","👐":"1f450","👑":"1f451","👒":"1f452","👓":"1f453","👔":"1f454","👕":"1f455","👖":"1f456","👗":"1f457","👘":"1f458","👙":"1f459","👚":"1f45a","👛":"1f45b","👜":"1f45c","👝":"1f45d","👞":"1f45e","👟":"1f45f","👠":"1f460","👡":"1f461","👢":"1f462","👣":"1f463","👤":"1f464","👦":"1f466","👧":"1f467","👨":"1f468","👩":"1f469","👪":"1f46a","👫":"1f46b","👮":"1f46e","👯":"1f46f","👰":"1f470","👱":"1f471","👲":"1f472","👳":"1f473","👴":"1f474","👵":"1f475","👶":"1f476","👷":"1f477","👸":"1f478","👹":"1f479","👺":"1f47a","👻":"1f47b","👼":"1f47c","👽":"1f47d","👾":"1f47e","👿":"1f47f","💀":"1f480","📇":"1f4c7","💁":"1f481","💂":"1f482","💃":"1f483","💄":"1f484","💅":"1f485","📒":"1f4d2","💆":"1f486","📓":"1f4d3","💇":"1f487","📔":"1f4d4","💈":"1f488","📕":"1f4d5","💉":"1f489","📖":"1f4d6","💊":"1f48a","📗":"1f4d7","💋":"1f48b","📘":"1f4d8","💌":"1f48c","📙":"1f4d9","💍":"1f48d","📚":"1f4da","💎":"1f48e","📛":"1f4db","💏":"1f48f","📜":"1f4dc","💐":"1f490","📝":"1f4dd","💑":"1f491","📞":"1f4de","💒":"1f492","📟":"1f4df","📠":"1f4e0","💓":"1f493","📡":"1f4e1","📢":"1f4e2","💔":"1f494","📣":"1f4e3","📤":"1f4e4","💕":"1f495","📥":"1f4e5","📦":"1f4e6","💖":"1f496","📧":"1f4e7","📨":"1f4e8","💗":"1f497","📩":"1f4e9","📪":"1f4ea","💘":"1f498","📫":"1f4eb","📮":"1f4ee","💙":"1f499","📰":"1f4f0","📱":"1f4f1","💚":"1f49a","📲":"1f4f2","📳":"1f4f3","💛":"1f49b","📴":"1f4f4","📶":"1f4f6","💜":"1f49c","📷":"1f4f7","📹":"1f4f9","💝":"1f49d","📺":"1f4fa","📻":"1f4fb","💞":"1f49e","📼":"1f4fc","🔃":"1f503","💟":"1f49f","🔊":"1f50a","🔋":"1f50b","💠":"1f4a0","🔌":"1f50c","🔍":"1f50d","💡":"1f4a1","🔎":"1f50e","🔏":"1f50f","💢":"1f4a2","🔐":"1f510","🔑":"1f511","💣":"1f4a3","🔒":"1f512","🔓":"1f513","💤":"1f4a4","🔔":"1f514","🔖":"1f516","💥":"1f4a5","🔗":"1f517","🔘":"1f518","💦":"1f4a6","🔙":"1f519","🔚":"1f51a","💧":"1f4a7","🔛":"1f51b","🔜":"1f51c","💨":"1f4a8","🔝":"1f51d","🔞":"1f51e","💩":"1f4a9","🔟":"1f51f","💪":"1f4aa","🔠":"1f520","🔡":"1f521","💫":"1f4ab","🔢":"1f522","🔣":"1f523","💬":"1f4ac","🔤":"1f524","🔥":"1f525","💮":"1f4ae","🔦":"1f526","🔧":"1f527","💯":"1f4af","🔨":"1f528","🔩":"1f529","💰":"1f4b0","🔪":"1f52a","🔫":"1f52b","💱":"1f4b1","🔮":"1f52e","💲":"1f4b2","🔯":"1f52f","💳":"1f4b3","🔰":"1f530","🔱":"1f531","💴":"1f4b4","🔲":"1f532","🔳":"1f533","💵":"1f4b5","🔴":"1f534","🔵":"1f535","💸":"1f4b8","🔶":"1f536","🔷":"1f537","💹":"1f4b9","🔸":"1f538","🔹":"1f539","💺":"1f4ba","🔺":"1f53a","🔻":"1f53b","💻":"1f4bb","🔼":"1f53c","💼":"1f4bc","🔽":"1f53d","🕐":"1f550","💽":"1f4bd","🕑":"1f551","💾":"1f4be","🕒":"1f552","💿":"1f4bf","🕓":"1f553","📀":"1f4c0","🕔":"1f554","🕕":"1f555","📁":"1f4c1","🕖":"1f556","🕗":"1f557","📂":"1f4c2","🕘":"1f558","🕙":"1f559","📃":"1f4c3","🕚":"1f55a","🕛":"1f55b","📄":"1f4c4","🗻":"1f5fb","🗼":"1f5fc","📅":"1f4c5","🗽":"1f5fd","🗾":"1f5fe","📆":"1f4c6","🗿":"1f5ff","😁":"1f601","😂":"1f602","😃":"1f603","📈":"1f4c8","😄":"1f604","😅":"1f605","📉":"1f4c9","😆":"1f606","😉":"1f609","📊":"1f4ca","😊":"1f60a","😋":"1f60b","📋":"1f4cb","😌":"1f60c","😍":"1f60d","📌":"1f4cc","😏":"1f60f","😒":"1f612","📍":"1f4cd","😓":"1f613","😔":"1f614","📎":"1f4ce","😖":"1f616","😘":"1f618","📏":"1f4cf","😚":"1f61a","😜":"1f61c","📐":"1f4d0","😝":"1f61d","😞":"1f61e","📑":"1f4d1","😠":"1f620","😡":"1f621","😢":"1f622","😣":"1f623","😤":"1f624","😥":"1f625","😨":"1f628","😩":"1f629","😪":"1f62a","😫":"1f62b","😭":"1f62d","😰":"1f630","😱":"1f631","😲":"1f632","😳":"1f633","😵":"1f635","😷":"1f637","😸":"1f638","😹":"1f639","😺":"1f63a","😻":"1f63b","😼":"1f63c","😽":"1f63d","😾":"1f63e","😿":"1f63f","🙀":"1f640","🙅":"1f645","🙆":"1f646","🙇":"1f647","🙈":"1f648","🙉":"1f649","🙊":"1f64a","🙋":"1f64b","🙌":"1f64c","🙍":"1f64d","🙎":"1f64e","🙏":"1f64f","🚀":"1f680","🚃":"1f683","🚄":"1f684","🚅":"1f685","🚇":"1f687","🚉":"1f689","🚌":"1f68c","🚏":"1f68f","🚑":"1f691","🚒":"1f692","🚓":"1f693","🚕":"1f695","🚗":"1f697","🚙":"1f699","🚚":"1f69a","🚢":"1f6a2","🚤":"1f6a4","🚥":"1f6a5","🚧":"1f6a7","🚨":"1f6a8","🚩":"1f6a9","🚪":"1f6aa","🚫":"1f6ab","🚬":"1f6ac","🚭":"1f6ad","🚲":"1f6b2","🚶":"1f6b6","🚹":"1f6b9","🚺":"1f6ba","🚻":"1f6bb","🚼":"1f6bc","🚽":"1f6bd","🚾":"1f6be","🛀":"1f6c0","🤘":"1f918","😀":"1f600","😇":"1f607","😈":"1f608","😎":"1f60e","😐":"1f610","😑":"1f611","😕":"1f615","😗":"1f617","😙":"1f619","😛":"1f61b","😟":"1f61f","😦":"1f626","😧":"1f627","😬":"1f62c","😮":"1f62e","😯":"1f62f","😴":"1f634","😶":"1f636","🚁":"1f681","🚂":"1f682",
"🚆":"1f686","🚈":"1f688","🚊":"1f68a","🚍":"1f68d","🚎":"1f68e","🚐":"1f690","🚔":"1f694","🚖":"1f696","🚘":"1f698","🚛":"1f69b","🚜":"1f69c","🚝":"1f69d","🚞":"1f69e","🚟":"1f69f","🚠":"1f6a0","🚡":"1f6a1","🚣":"1f6a3","🚦":"1f6a6","🚮":"1f6ae","🚯":"1f6af","🚰":"1f6b0","🚱":"1f6b1","🚳":"1f6b3","🚴":"1f6b4","🚵":"1f6b5","🚷":"1f6b7","🚸":"1f6b8","🚿":"1f6bf","🛁":"1f6c1","🛂":"1f6c2","🛃":"1f6c3","🛄":"1f6c4","🛅":"1f6c5","🌍":"1f30d","🌎":"1f30e","🌐":"1f310","🌒":"1f312","🌖":"1f316","🌗":"1f317","🌘":"1f318","🌚":"1f31a","🌜":"1f31c","🌝":"1f31d","🌞":"1f31e","🌲":"1f332","🌳":"1f333","🍋":"1f34b","🍐":"1f350","🍼":"1f37c","🏇":"1f3c7","🏉":"1f3c9","🏤":"1f3e4","🐀":"1f400","🐁":"1f401","🐂":"1f402","🐃":"1f403","🐄":"1f404","🐅":"1f405","🐆":"1f406","🐇":"1f407","🐈":"1f408","🐉":"1f409","🐊":"1f40a","🐋":"1f40b","🐏":"1f40f","🐐":"1f410","🐓":"1f413","🐕":"1f415","🐖":"1f416","🐪":"1f42a","👥":"1f465","👬":"1f46c","👭":"1f46d","💭":"1f4ad","💶":"1f4b6","💷":"1f4b7","📬":"1f4ec","📭":"1f4ed","📯":"1f4ef","📵":"1f4f5","🔀":"1f500","🔁":"1f501","🔂":"1f502","🔄":"1f504","🔅":"1f505","🔆":"1f506","🔇":"1f507","🔉":"1f509","🔕":"1f515","🔬":"1f52c","🔭":"1f52d","🕜":"1f55c","🕝":"1f55d","🕞":"1f55e","🕟":"1f55f","🕠":"1f560","🕡":"1f561","🕢":"1f562","🕣":"1f563","🕤":"1f564","🕥":"1f565","🕦":"1f566","🕧":"1f567","🔈":"1f508","🚋":"1f68b","🏅":"1f3c5","🏴":"1f3f4","📸":"1f4f8","🛌":"1f6cc","🖕":"1f595","🖖":"1f596","🙁":"1f641","🙂":"1f642","🛫":"1f6eb","🛬":"1f6ec","🏻":"1f3fb","🏼":"1f3fc","🏽":"1f3fd","🏾":"1f3fe","🏿":"1f3ff","🙃":"1f643","🤑":"1f911","🤓":"1f913","🤗":"1f917","🙄":"1f644","🤔":"1f914","🤐":"1f910","🤒":"1f912","🤕":"1f915","🤖":"1f916","🦁":"1f981","🦄":"1f984","🦂":"1f982","🦀":"1f980","🦃":"1f983","🧀":"1f9c0","🌭":"1f32d","🌮":"1f32e","🌯":"1f32f","🍿":"1f37f","🍾":"1f37e","🏹":"1f3f9","🏺":"1f3fa","🛐":"1f6d0","🕋":"1f54b","🕌":"1f54c","🕍":"1f54d","🕎":"1f54e","📿":"1f4ff","🏏":"1f3cf","🏐":"1f3d0","🏑":"1f3d1","🏒":"1f3d2","🏓":"1f3d3","🏸":"1f3f8","🥁":"1f941","🦐":"1f990","🦑":"1f991","🥚":"1f95a","🥛":"1f95b","🥜":"1f95c","🥝":"1f95d","🥞":"1f95e","🇼":"1f1fc","🇻":"1f1fb","🇺":"1f1fa","🇹":"1f1f9","🇸":"1f1f8","🇷":"1f1f7","🇶":"1f1f6","🇵":"1f1f5","🇴":"1f1f4","🇳":"1f1f3","🇲":"1f1f2","🇱":"1f1f1","🇰":"1f1f0","🇯":"1f1ef","🇮":"1f1ee","🇭":"1f1ed","🇬":"1f1ec","🇫":"1f1eb","🇪":"1f1ea","🇩":"1f1e9","🇨":"1f1e8","🇧":"1f1e7","🇦":"1f1e6","⏩":"23e9","⏪":"23ea","⏫":"23eb","⏬":"23ec","⏰":"23f0","⏳":"23f3","⛎":"26ce","✅":"2705","✊":"270a","✋":"270b","✨":"2728","❌":"274c","❎":"274e","❓":"2753","❔":"2754","❕":"2755","➕":"2795","➖":"2796","➗":"2797","➰":"27b0","➿":"27bf","©":"00a9","®":"00ae","‼":"203c","⁉":"2049","™":"2122","ℹ":"2139","↔":"2194","↕":"2195","↖":"2196","↗":"2197","↘":"2198","↙":"2199","↩":"21a9","↪":"21aa","⌚":"231a","⌛":"231b","Ⓜ":"24c2","▪":"25aa","▫":"25ab","▶":"25b6","◀":"25c0","◻":"25fb","◼":"25fc","◽":"25fd","◾":"25fe","☀":"2600","☁":"2601","☎":"260e","☑":"2611","☔":"2614","☕":"2615","☝":"261d","☺":"263a","♈":"2648","♉":"2649","♊":"264a","♋":"264b","♌":"264c","♍":"264d","♎":"264e","♏":"264f","♐":"2650","♑":"2651","♒":"2652","♓":"2653","♠":"2660","♣":"2663","♥":"2665","♦":"2666","♨":"2668","♻":"267b","♿":"267f","⚓":"2693","⚠":"26a0","⚡":"26a1","⚪":"26aa","⚫":"26ab","⚽":"26bd","⚾":"26be","⛄":"26c4","⛅":"26c5","⛔":"26d4","⛪":"26ea","⛲":"26f2","⛳":"26f3","⛵":"26f5","⛺":"26fa","⛽":"26fd","✂":"2702","✈":"2708","✉":"2709","✌":"270c","✏":"270f","✒":"2712","✔":"2714","✖":"2716","✳":"2733","✴":"2734","❄":"2744","❇":"2747","❗":"2757","❤":"2764","➡":"27a1","⤴":"2934","⤵":"2935","⬅":"2b05","⬆":"2b06","⬇":"2b07","⬛":"2b1b","⬜":"2b1c","⭐":"2b50","⭕":"2b55","〰":"3030","〽":"303d","㊗":"3297","㊙":"3299","🀄":"1f004","🅿":"1f17f","🈂":"1f202","🈚":"1f21a","🈯":"1f22f","🈷":"1f237","🎞":"1f39e","🎟":"1f39f","🏋":"1f3cb","🏌":"1f3cc","🏍":"1f3cd","🏎":"1f3ce","🎖":"1f396","🎗":"1f397","🌶":"1f336","🌧":"1f327","🌨":"1f328","🌩":"1f329","🌪":"1f32a","🌫":"1f32b","🌬":"1f32c","🐿":"1f43f","🕷":"1f577","🕸":"1f578","🌡":"1f321","🎙":"1f399","🎚":"1f39a","🎛":"1f39b","🏳":"1f3f3","🏵":"1f3f5","🏷":"1f3f7","📽":"1f4fd","✝":"271d","🕉":"1f549","🕊":"1f54a","🕯":"1f56f","🕰":"1f570","🕳":"1f573","🕶":"1f576","🕹":"1f579","🖇":"1f587","🖊":"1f58a","🖋":"1f58b","🖌":"1f58c","🖍":"1f58d","🖥":"1f5a5","🖨":"1f5a8","⌨":"2328","🖲":"1f5b2","🖼":"1f5bc","🗂":"1f5c2","🗃":"1f5c3","🗄":"1f5c4","🗑":"1f5d1","🗒":"1f5d2","🗓":"1f5d3","🗜":"1f5dc","🗝":"1f5dd","🗞":"1f5de","🗡":"1f5e1","🗣":"1f5e3","🗨":"1f5e8","🗯":"1f5ef","🗳":"1f5f3","🗺":"1f5fa","🛠":"1f6e0","🛡":"1f6e1","🛢":"1f6e2","🛰":"1f6f0","🍽":"1f37d","👁":"1f441","🕴":"1f574","🕵":"1f575","✍":"270d","🖐":"1f590","🏔":"1f3d4","🏕":"1f3d5","🏖":"1f3d6","🏗":"1f3d7","🏘":"1f3d8","🏙":"1f3d9","🏚":"1f3da","🏛":"1f3db","🏜":"1f3dc","🏝":"1f3dd","🏞":"1f3de","🏟":"1f3df","🛋":"1f6cb","🛍":"1f6cd","🛎":"1f6ce","🛏":"1f6cf","🛣":"1f6e3","🛤":"1f6e4","🛥":"1f6e5","🛩":"1f6e9","🛳":"1f6f3","⏏":"23cf","⏭":"23ed","⏮":"23ee","⏯":"23ef","⏱":"23f1","⏲":"23f2","⏸":"23f8","⏹":"23f9","⏺":"23fa","☂":"2602","☃":"2603","☄":"2604","☘":"2618","☠":"2620","☢":"2622","☣":"2623","☦":"2626","☪":"262a","☮":"262e","☯":"262f","☸":"2638","☹":"2639","⚒":"2692","⚔":"2694","⚖":"2696","⚗":"2697","⚙":"2699","⚛":"269b","⚜":"269c","⚰":"26b0","⚱":"26b1","⛈":"26c8","⛏":"26cf","⛑":"26d1","⛓":"26d3","⛩":"26e9","⛰":"26f0","⛱":"26f1","⛴":"26f4","⛷":"26f7","⛸":"26f8","⛹":"26f9","✡":"2721","❣":"2763","🌤":"1f324","🌥":"1f325","🌦":"1f326","🖱":"1f5b1"},f.imagePathPNG="css/png/",f.imagePathSVG="https://cdn.jsdelivr.net/emojione/assets/svg/",f.imagePathSVGSprites="./../assets/sprites/emojione.sprites.svg",f.imageType="png",f.imageTitleTag=!0,f.sprites=!1,f.unicodeAlt=!0,f.ascii=!1,f.cacheBustParam="?v=2.2.7",f.regShortNames=new RegExp("<object[^>]*>.*?</object>|<span[^>]*>.*?</span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|("+f.shortnames+")","gi"),f.regAscii=new RegExp("<object[^>]*>.*?</object>|<span[^>]*>.*?</span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|((\\s|^)"+f.asciiRegexp+"(?=\\s|$|[!,.?]))","g"),f.regUnicode=new RegExp("<object[^>]*>.*?</object>|<span[^>]*>.*?</span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|("+f.unicodeRegexp+")","gi"),f.toImage=function(n){return n=f.unicodeToImage(n),n=f.shortnameToImage(n)},f.unifyUnicode=function(n){return n=f.toShort(n),n=f.shortnameToUnicode(n)},f.shortnameToAscii=function(n){var u,e=f.objectFlip(f.asciiList);return n=n.replace(f.regShortNames,function(n){return"undefined"!=typeof n&&""!==n&&n in f.emojioneList?(u=f.emojioneList[n].unicode[f.emojioneList[n].unicode.length-1],"undefined"!=typeof e[u]?e[u]:n):n})},f.shortnameToUnicode=function(n){var u,e,a;return n=n.replace(f.regShortNames,function(n){return"undefined"!=typeof n&&""!==n&&n in f.emojioneList?(u=f.emojioneList[n].unicode[0].toUpperCase(),e=f.emojioneList[n].fname,a=f.emojioneList[n].uc,f.convert(a)):n}),f.ascii&&(n=n.replace(f.regAscii,function(n,e,a,c){return"undefined"!=typeof c&&""!==c&&f.unescapeHTML(c)in f.asciiList?(c=f.unescapeHTML(c),u=f.asciiList[c].toUpperCase(),a+f.convert(u)):n})),n},f.shortnameToImage=function(n){var u,e,a,c;return n=n.replace(f.regShortNames,function(n){return"undefined"!=typeof n&&""!==n&&n in f.emojioneList?(e=f.emojioneList[n].unicode[f.emojioneList[n].unicode.length-1],c=f.imageTitleTag?'title="'+n+'"':"",a=f.unicodeAlt?f.convert(e.toUpperCase()):n,u="png"===f.imageType?f.sprites?'<span class="emojione emojione-'+e+'" '+c+">"+a+"</span>":'<img class="emojione" alt="'+a+'" '+c+' src="'+f.imagePathPNG+e+".png"+f.cacheBustParam+'"/>':f.sprites?'<svg class="emojione"><description>'+a+'</description><use xlink:href="'+f.imagePathSVGSprites+"#emoji-"+e+'"></use></svg>':'<object class="emojione" data="'+f.imagePathSVG+e+".svg"+f.cacheBustParam+'" type="image/svg+xml" standby="'+a+'">'+a+"</object>"):n}),f.ascii&&(n=n.replace(f.regAscii,function(n,i,D,o){return"undefined"!=typeof o&&""!==o&&f.unescapeHTML(o)in f.asciiList?(o=f.unescapeHTML(o),e=f.asciiList[o],c=f.imageTitleTag?'title="'+f.escapeHTML(o)+'"':"",a=f.unicodeAlt?f.convert(e.toUpperCase()):f.escapeHTML(o),u="png"===f.imageType?f.sprites?D+'<span class="emojione emojione-'+e+'"  '+c+">"+a+"</span>":D+'<img class="emojione" alt="'+a+'" '+c+' src="'+f.imagePathPNG+e+".png"+f.cacheBustParam+'"/>':f.sprites?'<svg class="emojione"><description>'+a+'</description><use xlink:href="'+f.imagePathSVGSprites+"#emoji-"+e+'"></use></svg>':D+'<object class="emojione" data="'+f.imagePathSVG+e+".svg"+f.cacheBustParam+'" type="image/svg+xml" standby="'+a+'">'+a+"</object>"):n})),n},f.unicodeToImage=function(n){var u,e,a,c,i,D,o=f.mapUnicodeToShort();return n=n.replace(f.regUnicode,function(n){return"undefined"!=typeof n&&""!==n&&n in f.jsEscapeMap?(e=f.jsEscapeMap[n],a=o[e],c=f.emojioneList[a].fname,i=f.unicodeAlt?f.convert(e.toUpperCase()):a,D=f.imageTitleTag?'title="'+a+'"':"",u="png"===f.imageType?f.sprites?'<span class="emojione emojione-'+e+'" '+D+">"+i+"</span>":'<img class="emojione" alt="'+i+'" '+D+' src="'+f.imagePathPNG+c+".png"+f.cacheBustParam+'"/>':f.sprites?'<svg class="emojione"><description>'+i+'</description><use xlink:href="'+f.imagePathSVGSprites+"#emoji-"+e+'"></use></svg>':'<img class="emojione" alt="'+i+'" '+D+' src="'+f.imagePathSVG+c+".svg"+f.cacheBustParam+'"/>'):n})},f.toShort=function(n){var u=f.getUnicodeReplacementRegEx(),e=f.mapUnicodeCharactersToShort();return f.replaceAll(n,u,e)},f.convert=function(f){if(f.indexOf("-")>-1){for(var n=[],u=f.split("-"),e=0;e<u.length;e++){var a=parseInt(u[e],16);if(a>=65536&&1114111>=a){var c=Math.floor((a-65536)/1024)+55296,i=(a-65536)%1024+56320;a=String.fromCharCode(c)+String.fromCharCode(i)}else a=String.fromCharCode(a);n.push(a)}return n.join("")}var u=parseInt(f,16);if(u>=65536&&1114111>=u){var c=Math.floor((u-65536)/1024)+55296,i=(u-65536)%1024+56320;return String.fromCharCode(c)+String.fromCharCode(i)}return String.fromCharCode(u)},f.escapeHTML=function(f){var n={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"};return f.replace(/[&<>"']/g,function(f){return n[f]})},f.unescapeHTML=function(f){var n={"&amp;":"&","&#38;":"&","&#x26;":"&","&lt;":"<","&#60;":"<","&#x3C;":"<","&gt;":">","&#62;":">","&#x3E;":">","&quot;":'"',"&#34;":'"',"&#x22;":'"',"&apos;":"'","&#39;":"'","&#x27;":"'"};return f.replace(/&(?:amp|#38|#x26|lt|#60|#x3C|gt|#62|#x3E|apos|#39|#x27|quot|#34|#x22);/gi,function(f){return n[f]})},f.mapEmojioneList=function(n){for(var u in f.emojioneList)if(f.emojioneList.hasOwnProperty(u))for(var e=0,a=f.emojioneList[u].unicode.length;a>e;e++){var c=f.emojioneList[u].unicode[e];n(c,u)}},f.mapUnicodeToShort=function(){return f.memMapShortToUnicode||(f.memMapShortToUnicode={},f.mapEmojioneList(function(n,u){f.memMapShortToUnicode[n]=u})),f.memMapShortToUnicode},f.memoizeReplacement=function(){if(!f.unicodeReplacementRegEx||!f.memMapShortToUnicodeCharacters){var n=[];f.memMapShortToUnicodeCharacters={},f.mapEmojioneList(function(u,e){var a=f.convert(u);f.emojioneList[e].isCanonical&&(f.memMapShortToUnicodeCharacters[a]=e),n.push(a)}),f.unicodeReplacementRegEx=n.join("|")}},f.mapUnicodeCharactersToShort=function(){return f.memoizeReplacement(),f.memMapShortToUnicodeCharacters},f.getUnicodeReplacementRegEx=function(){return f.memoizeReplacement(),f.unicodeReplacementRegEx},f.objectFlip=function(f){var n,u={};for(n in f)f.hasOwnProperty(n)&&(u[f[n]]=n);return u},f.escapeRegExp=function(f){return f.replace(/[-[\]{}()*+?.,;:&\\^$#\s]/g,"\\$&")},f.replaceAll=function(n,u,e){var a=f.escapeRegExp(u),c=new RegExp("<object[^>]*>.*?</object>|<span[^>]*>.*?</span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|("+a+")","gi"),i=function(f,n){return"undefined"==typeof n||""===n?f:e[n]};return n.replace(c,i)}}(this.emojione=this.emojione||{}),"object"==typeof module&&(module.exports=this.emojione);


/* ---- /1CWkZv7fQAKxTVjZVrLZ8VHcrN6YGGcdky/js/emojione_strategy.js ---- */


var emojiStrategy = { "grinning": { "unicode": "1f600", "shortname": ":grinning:", "aliases": "", "keywords": "grinning face happy smiley emotion" }, "grin": { "unicode": "1f601", "shortname": ":grin:", "aliases": "", "keywords": "grinning face with smiling eyes happy silly smiley emotion good selfie" }, "joy": { "unicode": "1f602", "shortname": ":joy:", "aliases": "", "keywords": "face with tears of joy happy silly smiley cry laugh emotion sarcastic" }, "rofl": { "unicode": "1f923", "shortname": ":rofl:", "aliases": ":rolling_on_the_floor_laughing:", "keywords": "rolling on the floor laughing" }, "smiley": { "unicode": "1f603", "shortname": ":smiley:", "aliases": "", "keywords": "smiling face with open mouth happy smiley emotion good" }, "smile": { "unicode": "1f604", "shortname": ":smile:", "aliases": "", "keywords": "smiling face with open mouth and smiling eyes happy smiley emotion" }, "sweat_smile": { "unicode": "1f605", "shortname": ":sweat_smile:", "aliases": "", "keywords": "smiling face with open mouth and cold sweat smiley workout sweat emotion" }, "laughing": { "unicode": "1f606", "shortname": ":laughing:", "aliases": ":satisfied:", "keywords": "smiling face with open mouth and tightly-closed eyes happy smiley laugh emotion" }, "wink": { "unicode": "1f609", "shortname": ":wink:", "aliases": "", "keywords": "winking face silly smiley emotion" }, "blush": { "unicode": "1f60a", "shortname": ":blush:", "aliases": "", "keywords": "smiling face with smiling eyes happy smiley emotion good beautiful" }, "yum": { "unicode": "1f60b", "shortname": ":yum:", "aliases": "", "keywords": "face savouring delicious food happy silly smiley emotion sarcastic good" }, "sunglasses": { "unicode": "1f60e", "shortname": ":sunglasses:", "aliases": "", "keywords": "smiling face with sunglasses silly smiley emojione glasses boys night" }, "heart_eyes": { "unicode": "1f60d", "shortname": ":heart_eyes:", "aliases": "", "keywords": "smiling face with heart-shaped eyes happy smiley love sex heart eyes emotion beautiful" }, "kissing_heart": { "unicode": "1f618", "shortname": ":kissing_heart:", "aliases": "", "keywords": "face throwing a kiss smiley love sexy" }, "kissing": { "unicode": "1f617", "shortname": ":kissing:", "aliases": "", "keywords": "kissing face smiley sexy" }, "kissing_smiling_eyes": { "unicode": "1f619", "shortname": ":kissing_smiling_eyes:", "aliases": "", "keywords": "kissing face with smiling eyes smiley sexy" }, "kissing_closed_eyes": { "unicode": "1f61a", "shortname": ":kissing_closed_eyes:", "aliases": "", "keywords": "kissing face with closed eyes smiley sexy" }, "relaxed": { "unicode": "263a", "shortname": ":relaxed:", "aliases": "", "keywords": "white smiling face happy smiley" }, "slight_smile": { "unicode": "1f642", "shortname": ":slight_smile:", "aliases": ":slightly_smiling_face:", "keywords": "slightly smiling face happy smiley" }, "hugging": { "unicode": "1f917", "shortname": ":hugging:", "aliases": ":hugging_face:", "keywords": "hugging face smiley hug thank you" }, "thinking": { "unicode": "1f914", "shortname": ":thinking:", "aliases": ":thinking_face:", "keywords": "thinking face smiley thinking boys night" }, "neutral_face": { "unicode": "1f610", "shortname": ":neutral_face:", "aliases": "", "keywords": "neutral face mad smiley shrug neutral emotion" }, "expressionless": { "unicode": "1f611", "shortname": ":expressionless:", "aliases": "", "keywords": "expressionless face mad smiley neutral emotion" }, "no_mouth": { "unicode": "1f636", "shortname": ":no_mouth:", "aliases": "", "keywords": "face without mouth mad smiley neutral emotion" }, "rolling_eyes": { "unicode": "1f644", "shortname": ":rolling_eyes:", "aliases": ":face_with_rolling_eyes:", "keywords": "face with rolling eyes mad smiley rolling eyes emotion sarcastic" }, "smirk": { "unicode": "1f60f", "shortname": ":smirk:", "aliases": "", "keywords": "smirking face silly smiley sexy sarcastic" }, "persevere": { "unicode": "1f623", "shortname": ":persevere:", "aliases": "", "keywords": "persevering face sad smiley angry emotion" }, "disappointed_relieved": { "unicode": "1f625", "shortname": ":disappointed_relieved:", "aliases": "", "keywords": "disappointed but relieved face sad smiley stressed sweat cry emotion" }, "open_mouth": { "unicode": "1f62e", "shortname": ":open_mouth:", "aliases": "", "keywords": "face with open mouth smiley surprised wow emotion" }, "zipper_mouth": { "unicode": "1f910", "shortname": ":zipper_mouth:", "aliases": ":zipper_mouth_face:", "keywords": "zipper-mouth face mad smiley" }, "hushed": { "unicode": "1f62f", "shortname": ":hushed:", "aliases": "", "keywords": "hushed face smiley surprised wow" }, "sleepy": { "unicode": "1f62a", "shortname": ":sleepy:", "aliases": "", "keywords": "sleepy face smiley sick emotion" }, "tired_face": { "unicode": "1f62b", "shortname": ":tired_face:", "aliases": "", "keywords": "tired face sad smiley tired emotion" }, "sleeping": { "unicode": "1f634", "shortname": ":sleeping:", "aliases": "", "keywords": "sleeping face smiley tired emotion goodnight" }, "relieved": { "unicode": "1f60c", "shortname": ":relieved:", "aliases": "", "keywords": "relieved face smiley emotion" }, "nerd": { "unicode": "1f913", "shortname": ":nerd:", "aliases": ":nerd_face:", "keywords": "nerd face smiley glasses" }, "stuck_out_tongue": { "unicode": "1f61b", "shortname": ":stuck_out_tongue:", "aliases": "", "keywords": "face with stuck-out tongue smiley sex emotion" }, "stuck_out_tongue_winking_eye": { "unicode": "1f61c", "shortname": ":stuck_out_tongue_winking_eye:", "aliases": "", "keywords": "face with stuck-out tongue and winking eye happy smiley emotion parties" }, "stuck_out_tongue_closed_eyes": { "unicode": "1f61d", "shortname": ":stuck_out_tongue_closed_eyes:", "aliases": "", "keywords": "face with stuck-out tongue and tightly-closed eyes happy smiley emotion" }, "drooling_face": { "unicode": "1f924", "shortname": ":drooling_face:", "aliases": ":drool:", "keywords": "drooling face" }, "unamused": { "unicode": "1f612", "shortname": ":unamused:", "aliases": "", "keywords": "unamused face sad mad smiley tired emotion" }, "sweat": { "unicode": "1f613", "shortname": ":sweat:", "aliases": "", "keywords": "face with cold sweat sad smiley stressed sweat emotion" }, "pensive": { "unicode": "1f614", "shortname": ":pensive:", "aliases": "", "keywords": "pensive face sad smiley emotion rip" }, "confused": { "unicode": "1f615", "shortname": ":confused:", "aliases": "", "keywords": "confused face smiley surprised emotion" }, "upside_down": { "unicode": "1f643", "shortname": ":upside_down:", "aliases": ":upside_down_face:", "keywords": "upside-down face silly smiley sarcastic" }, "money_mouth": { "unicode": "1f911", "shortname": ":money_mouth:", "aliases": ":money_mouth_face:", "keywords": "money-mouth face smiley win money emotion boys night" }, "astonished": { "unicode": "1f632", "shortname": ":astonished:", "aliases": "", "keywords": "astonished face smiley surprised wow emotion omg" }, "frowning2": { "unicode": "2639", "shortname": ":frowning2:", "aliases": ":white_frowning_face:", "keywords": "white frowning face sad smiley emotion" }, "slight_frown": { "unicode": "1f641", "shortname": ":slight_frown:", "aliases": ":slightly_frowning_face:", "keywords": "slightly frowning face sad smiley emotion" }, "confounded": { "unicode": "1f616", "shortname": ":confounded:", "aliases": "", "keywords": "confounded face sad smiley angry emotion" }, "disappointed": { "unicode": "1f61e", "shortname": ":disappointed:", "aliases": "", "keywords": "disappointed face sad smiley tired emotion" }, "worried": { "unicode": "1f61f", "shortname": ":worried:", "aliases": "", "keywords": "worried face sad smiley emotion" }, "triumph": { "unicode": "1f624", "shortname": ":triumph:", "aliases": "", "keywords": "face with look of triumph mad smiley angry emotion steam" }, "cry": { "unicode": "1f622", "shortname": ":cry:", "aliases": "", "keywords": "crying face sad smiley cry emotion rip heartbreak" }, "sob": { "unicode": "1f62d", "shortname": ":sob:", "aliases": "", "keywords": "loudly crying face sad smiley cry emotion heartbreak" }, "frowning": { "unicode": "1f626", "shortname": ":frowning:", "aliases": "", "keywords": "frowning face with open mouth sad smiley surprised emotion" }, "anguished": { "unicode": "1f627", "shortname": ":anguished:", "aliases": "", "keywords": "anguished face sad smiley surprised emotion" }, "fearful": { "unicode": "1f628", "shortname": ":fearful:", "aliases": "", "keywords": "fearful face smiley surprised emotion" }, "weary": { "unicode": "1f629", "shortname": ":weary:", "aliases": "", "keywords": "weary face sad smiley tired stressed emotion" }, "grimacing": { "unicode": "1f62c", "shortname": ":grimacing:", "aliases": "", "keywords": "grimacing face silly smiley emotion selfie" }, "cold_sweat": { "unicode": "1f630", "shortname": ":cold_sweat:", "aliases": "", "keywords": "face with open mouth and cold sweat smiley sweat emotion" }, "scream": { "unicode": "1f631", "shortname": ":scream:", "aliases": "", "keywords": "face screaming in fear smiley surprised wow emotion omg" }, "flushed": { "unicode": "1f633", "shortname": ":flushed:", "aliases": "", "keywords": "flushed face smiley emotion omg" }, "dizzy_face": { "unicode": "1f635", "shortname": ":dizzy_face:", "aliases": "", "keywords": "dizzy face smiley surprised dead wow emotion omg" }, "rage": { "unicode": "1f621", "shortname": ":rage:", "aliases": "", "keywords": "pouting face mad smiley angry emotion" }, "angry": { "unicode": "1f620", "shortname": ":angry:", "aliases": "", "keywords": "angry face mad smiley emotion" }, "innocent": { "unicode": "1f607", "shortname": ":innocent:", "aliases": "", "keywords": "smiling face with halo smiley emotion" }, "cowboy": { "unicode": "1f920", "shortname": ":cowboy:", "aliases": ":face_with_cowboy_hat:", "keywords": "face with cowboy hat" }, "clown": { "unicode": "1f921", "shortname": ":clown:", "aliases": ":clown_face:", "keywords": "clown face" }, "lying_face": { "unicode": "1f925", "shortname": ":lying_face:", "aliases": ":liar:", "keywords": "lying face" }, "mask": { "unicode": "1f637", "shortname": ":mask:", "aliases": "", "keywords": "face with medical mask smiley dead health sick" }, "thermometer_face": { "unicode": "1f912", "shortname": ":thermometer_face:", "aliases": ":face_with_thermometer:", "keywords": "face with thermometer smiley health sick emotion" }, "head_bandage": { "unicode": "1f915", "shortname": ":head_bandage:", "aliases": ":face_with_head_bandage:", "keywords": "face with head-bandage smiley health sick emotion" }, "nauseated_face": { "unicode": "1f922", "shortname": ":nauseated_face:", "aliases": ":sick:", "keywords": "nauseated face" }, "sneezing_face": { "unicode": "1f927", "shortname": ":sneezing_face:", "aliases": ":sneeze:", "keywords": "sneezing face" }, "smiling_imp": { "unicode": "1f608", "shortname": ":smiling_imp:", "aliases": "", "keywords": "smiling face with horns silly smiley angry monster devil boys night" }, "imp": { "unicode": "1f47f", "shortname": ":imp:", "aliases": "", "keywords": "imp smiley monster devil wth" }, "japanese_ogre": { "unicode": "1f479", "shortname": ":japanese_ogre:", "aliases": "", "keywords": "japanese ogre monster" }, "japanese_goblin": { "unicode": "1f47a", "shortname": ":japanese_goblin:", "aliases": "", "keywords": "japanese goblin angry monster" }, "skull": { "unicode": "1f480", "shortname": ":skull:", "aliases": ":skeleton:", "keywords": "skull dead halloween skull" }, "skull_crossbones": { "unicode": "2620", "shortname": ":skull_crossbones:", "aliases": ":skull_and_crossbones:", "keywords": "skull and crossbones symbol dead skull" }, "ghost": { "unicode": "1f47b", "shortname": ":ghost:", "aliases": "", "keywords": "ghost holidays halloween monster" }, "alien": { "unicode": "1f47d", "shortname": ":alien:", "aliases": "", "keywords": "extraterrestrial alien space monster alien scientology" }, "space_invader": { "unicode": "1f47e", "shortname": ":space_invader:", "aliases": "", "keywords": "alien monster monster alien" }, "robot": { "unicode": "1f916", "shortname": ":robot:", "aliases": ":robot_face:", "keywords": "robot face monster robot" }, "poop": { "unicode": "1f4a9", "shortname": ":poop:", "aliases": ":shit: :hankey: :poo:", "keywords": "pile of poo bathroom shit sol diarrhea" }, "smiley_cat": { "unicode": "1f63a", "shortname": ":smiley_cat:", "aliases": "", "keywords": "smiling cat face with open mouth happy cat animal" }, "smile_cat": { "unicode": "1f638", "shortname": ":smile_cat:", "aliases": "", "keywords": "grinning cat face with smiling eyes happy cat animal" }, "joy_cat": { "unicode": "1f639", "shortname": ":joy_cat:", "aliases": "", "keywords": "cat face with tears of joy happy silly cry laugh cat animal sarcastic" }, "heart_eyes_cat": { "unicode": "1f63b", "shortname": ":heart_eyes_cat:", "aliases": "", "keywords": "smiling cat face with heart-shaped eyes heart eyes cat animal beautiful" }, "smirk_cat": { "unicode": "1f63c", "shortname": ":smirk_cat:", "aliases": "", "keywords": "cat face with wry smile cat animal" }, "kissing_cat": { "unicode": "1f63d", "shortname": ":kissing_cat:", "aliases": "", "keywords": "kissing cat face with closed eyes cat animal" }, "scream_cat": { "unicode": "1f640", "shortname": ":scream_cat:", "aliases": "", "keywords": "weary cat face cat animal" }, "crying_cat_face": { "unicode": "1f63f", "shortname": ":crying_cat_face:", "aliases": "", "keywords": "crying cat face cry cat animal" }, "pouting_cat": { "unicode": "1f63e", "shortname": ":pouting_cat:", "aliases": "", "keywords": "pouting cat face cat animal" }, "see_no_evil": { "unicode": "1f648", "shortname": ":see_no_evil:", "aliases": "", "keywords": "see-no-evil monkey animal" }, "hear_no_evil": { "unicode": "1f649", "shortname": ":hear_no_evil:", "aliases": "", "keywords": "hear-no-evil monkey animal" }, "speak_no_evil": { "unicode": "1f64a", "shortname": ":speak_no_evil:", "aliases": "", "keywords": "speak-no-evil monkey animal" }, "boy": { "unicode": "1f466", "shortname": ":boy:", "aliases": "", "keywords": "boy people baby diversity" }, "boy_tone1": { "unicode": "1f466-1f3fb", "shortname": ":boy_tone1:", "aliases": "", "keywords": "boy tone 1" }, "boy_tone2": { "unicode": "1f466-1f3fc", "shortname": ":boy_tone2:", "aliases": "", "keywords": "boy tone 2" }, "boy_tone3": { "unicode": "1f466-1f3fd", "shortname": ":boy_tone3:", "aliases": "", "keywords": "boy tone 3" }, "boy_tone4": { "unicode": "1f466-1f3fe", "shortname": ":boy_tone4:", "aliases": "", "keywords": "boy tone 4" }, "boy_tone5": { "unicode": "1f466-1f3ff", "shortname": ":boy_tone5:", "aliases": "", "keywords": "boy tone 5" }, "girl": { "unicode": "1f467", "shortname": ":girl:", "aliases": "", "keywords": "girl people women baby diversity" }, "girl_tone1": { "unicode": "1f467-1f3fb", "shortname": ":girl_tone1:", "aliases": "", "keywords": "girl tone 1" }, "girl_tone2": { "unicode": "1f467-1f3fc", "shortname": ":girl_tone2:", "aliases": "", "keywords": "girl tone 2" }, "girl_tone3": { "unicode": "1f467-1f3fd", "shortname": ":girl_tone3:", "aliases": "", "keywords": "girl tone 3" }, "girl_tone4": { "unicode": "1f467-1f3fe", "shortname": ":girl_tone4:", "aliases": "", "keywords": "girl tone 4" }, "girl_tone5": { "unicode": "1f467-1f3ff", "shortname": ":girl_tone5:", "aliases": "", "keywords": "girl tone 5" }, "man": { "unicode": "1f468", "shortname": ":man:", "aliases": "", "keywords": "man people men sex diversity selfie boys night" }, "man_tone1": { "unicode": "1f468-1f3fb", "shortname": ":man_tone1:", "aliases": "", "keywords": "man tone 1" }, "man_tone2": { "unicode": "1f468-1f3fc", "shortname": ":man_tone2:", "aliases": "", "keywords": "man tone 2" }, "man_tone3": { "unicode": "1f468-1f3fd", "shortname": ":man_tone3:", "aliases": "", "keywords": "man tone 3" }, "man_tone4": { "unicode": "1f468-1f3fe", "shortname": ":man_tone4:", "aliases": "", "keywords": "man tone 4" }, "man_tone5": { "unicode": "1f468-1f3ff", "shortname": ":man_tone5:", "aliases": "", "keywords": "man tone 5" }, "woman": { "unicode": "1f469", "shortname": ":woman:", "aliases": "", "keywords": "woman people women sex diversity feminist selfie girls night" }, "woman_tone1": { "unicode": "1f469-1f3fb", "shortname": ":woman_tone1:", "aliases": "", "keywords": "woman tone 1" }, "woman_tone2": { "unicode": "1f469-1f3fc", "shortname": ":woman_tone2:", "aliases": "", "keywords": "woman tone 2" }, "woman_tone3": { "unicode": "1f469-1f3fd", "shortname": ":woman_tone3:", "aliases": "", "keywords": "woman tone 3" }, "woman_tone4": { "unicode": "1f469-1f3fe", "shortname": ":woman_tone4:", "aliases": "", "keywords": "woman tone 4" }, "woman_tone5": { "unicode": "1f469-1f3ff", "shortname": ":woman_tone5:", "aliases": "", "keywords": "woman tone 5" }, "older_man": { "unicode": "1f474", "shortname": ":older_man:", "aliases": "", "keywords": "older man people men old people diversity" }, "older_man_tone1": { "unicode": "1f474-1f3fb", "shortname": ":older_man_tone1:", "aliases": "", "keywords": "older man tone 1" }, "older_man_tone2": { "unicode": "1f474-1f3fc", "shortname": ":older_man_tone2:", "aliases": "", "keywords": "older man tone 2" }, "older_man_tone3": { "unicode": "1f474-1f3fd", "shortname": ":older_man_tone3:", "aliases": "", "keywords": "older man tone 3" }, "older_man_tone4": { "unicode": "1f474-1f3fe", "shortname": ":older_man_tone4:", "aliases": "", "keywords": "older man tone 4" }, "older_man_tone5": { "unicode": "1f474-1f3ff", "shortname": ":older_man_tone5:", "aliases": "", "keywords": "older man tone 5" }, "older_woman": { "unicode": "1f475", "shortname": ":older_woman:", "aliases": ":grandma:", "keywords": "older woman people old people diversity" }, "older_woman_tone1": { "unicode": "1f475-1f3fb", "shortname": ":older_woman_tone1:", "aliases": ":grandma_tone1:", "keywords": "older woman tone 1" }, "older_woman_tone2": { "unicode": "1f475-1f3fc", "shortname": ":older_woman_tone2:", "aliases": ":grandma_tone2:", "keywords": "older woman tone 2" }, "older_woman_tone3": { "unicode": "1f475-1f3fd", "shortname": ":older_woman_tone3:", "aliases": ":grandma_tone3:", "keywords": "older woman tone 3" }, "older_woman_tone4": { "unicode": "1f475-1f3fe", "shortname": ":older_woman_tone4:", "aliases": ":grandma_tone4:", "keywords": "older woman tone 4" }, "older_woman_tone5": { "unicode": "1f475-1f3ff", "shortname": ":older_woman_tone5:", "aliases": ":grandma_tone5:", "keywords": "older woman tone 5" }, "baby": { "unicode": "1f476", "shortname": ":baby:", "aliases": "", "keywords": "baby people baby diversity" }, "baby_tone1": { "unicode": "1f476-1f3fb", "shortname": ":baby_tone1:", "aliases": "", "keywords": "baby tone 1" }, "baby_tone2": { "unicode": "1f476-1f3fc", "shortname": ":baby_tone2:", "aliases": "", "keywords": "baby tone 2" }, "baby_tone3": { "unicode": "1f476-1f3fd", "shortname": ":baby_tone3:", "aliases": "", "keywords": "baby tone 3" }, "baby_tone4": { "unicode": "1f476-1f3fe", "shortname": ":baby_tone4:", "aliases": "", "keywords": "baby tone 4" }, "baby_tone5": { "unicode": "1f476-1f3ff", "shortname": ":baby_tone5:", "aliases": "", "keywords": "baby tone 5" }, "angel": { "unicode": "1f47c", "shortname": ":angel:", "aliases": "", "keywords": "baby angel people diversity omg" }, "angel_tone1": { "unicode": "1f47c-1f3fb", "shortname": ":angel_tone1:", "aliases": "", "keywords": "baby angel tone 1" }, "angel_tone2": { "unicode": "1f47c-1f3fc", "shortname": ":angel_tone2:", "aliases": "", "keywords": "baby angel tone 2" }, "angel_tone3": { "unicode": "1f47c-1f3fd", "shortname": ":angel_tone3:", "aliases": "", "keywords": "baby angel tone 3" }, "angel_tone4": { "unicode": "1f47c-1f3fe", "shortname": ":angel_tone4:", "aliases": "", "keywords": "baby angel tone 4" }, "angel_tone5": { "unicode": "1f47c-1f3ff", "shortname": ":angel_tone5:", "aliases": "", "keywords": "baby angel tone 5" }, "cop": { "unicode": "1f46e", "shortname": ":cop:", "aliases": "", "keywords": "police officer people hat men diversity job police 911" }, "cop_tone1": { "unicode": "1f46e-1f3fb", "shortname": ":cop_tone1:", "aliases": "", "keywords": "police officer tone 1" }, "cop_tone2": { "unicode": "1f46e-1f3fc", "shortname": ":cop_tone2:", "aliases": "", "keywords": "police officer tone 2" }, "cop_tone3": { "unicode": "1f46e-1f3fd", "shortname": ":cop_tone3:", "aliases": "", "keywords": "police officer tone 3" }, "cop_tone4": { "unicode": "1f46e-1f3fe", "shortname": ":cop_tone4:", "aliases": "", "keywords": "police officer tone 4" }, "cop_tone5": { "unicode": "1f46e-1f3ff", "shortname": ":cop_tone5:", "aliases": "", "keywords": "police officer tone 5" }, "spy": { "unicode": "1f575", "shortname": ":spy:", "aliases": ":sleuth_or_spy:", "keywords": "sleuth or spy people hat men glasses diversity job" }, "spy_tone1": { "unicode": "1f575-1f3fb", "shortname": ":spy_tone1:", "aliases": ":sleuth_or_spy_tone1:", "keywords": "sleuth or spy tone 1" }, "spy_tone2": { "unicode": "1f575-1f3fc", "shortname": ":spy_tone2:", "aliases": ":sleuth_or_spy_tone2:", "keywords": "sleuth or spy tone 2" }, "spy_tone3": { "unicode": "1f575-1f3fd", "shortname": ":spy_tone3:", "aliases": ":sleuth_or_spy_tone3:", "keywords": "sleuth or spy tone 3" }, "spy_tone4": { "unicode": "1f575-1f3fe", "shortname": ":spy_tone4:", "aliases": ":sleuth_or_spy_tone4:", "keywords": "sleuth or spy tone 4" }, "spy_tone5": { "unicode": "1f575-1f3ff", "shortname": ":spy_tone5:", "aliases": ":sleuth_or_spy_tone5:", "keywords": "sleuth or spy tone 5" }, "guardsman": { "unicode": "1f482", "shortname": ":guardsman:", "aliases": "", "keywords": "guardsman people hat men diversity job" }, "guardsman_tone1": { "unicode": "1f482-1f3fb", "shortname": ":guardsman_tone1:", "aliases": "", "keywords": "guardsman tone 1" }, "guardsman_tone2": { "unicode": "1f482-1f3fc", "shortname": ":guardsman_tone2:", "aliases": "", "keywords": "guardsman tone 2" }, "guardsman_tone3": { "unicode": "1f482-1f3fd", "shortname": ":guardsman_tone3:", "aliases": "", "keywords": "guardsman tone 3" }, "guardsman_tone4": { "unicode": "1f482-1f3fe", "shortname": ":guardsman_tone4:", "aliases": "", "keywords": "guardsman tone 4" }, "guardsman_tone5": { "unicode": "1f482-1f3ff", "shortname": ":guardsman_tone5:", "aliases": "", "keywords": "guardsman tone 5" }, "construction_worker": { "unicode": "1f477", "shortname": ":construction_worker:", "aliases": "", "keywords": "construction worker people hat men diversity job" }, "construction_worker_tone1": { "unicode": "1f477-1f3fb", "shortname": ":construction_worker_tone1:", "aliases": "", "keywords": "construction worker tone 1" }, "construction_worker_tone2": { "unicode": "1f477-1f3fc", "shortname": ":construction_worker_tone2:", "aliases": "", "keywords": "construction worker tone 2" }, "construction_worker_tone3": { "unicode": "1f477-1f3fd", "shortname": ":construction_worker_tone3:", "aliases": "", "keywords": "construction worker tone 3" }, "construction_worker_tone4": { "unicode": "1f477-1f3fe", "shortname": ":construction_worker_tone4:", "aliases": "", "keywords": "construction worker tone 4" }, "construction_worker_tone5": { "unicode": "1f477-1f3ff", "shortname": ":construction_worker_tone5:", "aliases": "", "keywords": "construction worker tone 5" }, "man_with_turban": { "unicode": "1f473", "shortname": ":man_with_turban:", "aliases": "", "keywords": "man with turban people hat diversity" }, "man_with_turban_tone1": { "unicode": "1f473-1f3fb", "shortname": ":man_with_turban_tone1:", "aliases": "", "keywords": "man with turban tone 1" }, "man_with_turban_tone2": { "unicode": "1f473-1f3fc", "shortname": ":man_with_turban_tone2:", "aliases": "", "keywords": "man with turban tone 2" }, "man_with_turban_tone3": { "unicode": "1f473-1f3fd", "shortname": ":man_with_turban_tone3:", "aliases": "", "keywords": "man with turban tone 3" }, "man_with_turban_tone4": { "unicode": "1f473-1f3fe", "shortname": ":man_with_turban_tone4:", "aliases": "", "keywords": "man with turban tone 4" }, "man_with_turban_tone5": { "unicode": "1f473-1f3ff", "shortname": ":man_with_turban_tone5:", "aliases": "", "keywords": "man with turban tone 5" }, "person_with_blond_hair": { "unicode": "1f471", "shortname": ":person_with_blond_hair:", "aliases": "", "keywords": "person with blond hair people men diversity" }, "person_with_blond_hair_tone1": { "unicode": "1f471-1f3fb", "shortname": ":person_with_blond_hair_tone1:", "aliases": "", "keywords": "person with blond hair tone 1" }, "person_with_blond_hair_tone2": { "unicode": "1f471-1f3fc", "shortname": ":person_with_blond_hair_tone2:", "aliases": "", "keywords": "person with blond hair tone 2" }, "person_with_blond_hair_tone3": { "unicode": "1f471-1f3fd", "shortname": ":person_with_blond_hair_tone3:", "aliases": "", "keywords": "person with blond hair tone 3" }, "person_with_blond_hair_tone4": { "unicode": "1f471-1f3fe", "shortname": ":person_with_blond_hair_tone4:", "aliases": "", "keywords": "person with blond hair tone 4" }, "person_with_blond_hair_tone5": { "unicode": "1f471-1f3ff", "shortname": ":person_with_blond_hair_tone5:", "aliases": "", "keywords": "person with blond hair tone 5" }, "santa": { "unicode": "1f385", "shortname": ":santa:", "aliases": "", "keywords": "father christmas people hat winter holidays christmas diversity santa" }, "santa_tone1": { "unicode": "1f385-1f3fb", "shortname": ":santa_tone1:", "aliases": "", "keywords": "father christmas tone 1" }, "santa_tone2": { "unicode": "1f385-1f3fc", "shortname": ":santa_tone2:", "aliases": "", "keywords": "father christmas tone 2" }, "santa_tone3": { "unicode": "1f385-1f3fd", "shortname": ":santa_tone3:", "aliases": "", "keywords": "father christmas tone 3" }, "santa_tone4": { "unicode": "1f385-1f3fe", "shortname": ":santa_tone4:", "aliases": "", "keywords": "father christmas tone 4" }, "santa_tone5": { "unicode": "1f385-1f3ff", "shortname": ":santa_tone5:", "aliases": "", "keywords": "father christmas tone 5" }, "mrs_claus": { "unicode": "1f936", "shortname": ":mrs_claus:", "aliases": ":mother_christmas:", "keywords": "mother christmas" }, "mrs_claus_tone1": { "unicode": "1f936-1f3fb", "shortname": ":mrs_claus_tone1:", "aliases": ":mother_christmas_tone1:", "keywords": "mother christmas tone 1" }, "mrs_claus_tone2": { "unicode": "1f936-1f3fc", "shortname": ":mrs_claus_tone2:", "aliases": ":mother_christmas_tone2:", "keywords": "mother christmas tone 2" }, "mrs_claus_tone3": { "unicode": "1f936-1f3fd", "shortname": ":mrs_claus_tone3:", "aliases": ":mother_christmas_tone3:", "keywords": "mother christmas tone 3" }, "mrs_claus_tone4": { "unicode": "1f936-1f3fe", "shortname": ":mrs_claus_tone4:", "aliases": ":mother_christmas_tone4:", "keywords": "mother christmas tone 4" }, "mrs_claus_tone5": { "unicode": "1f936-1f3ff", "shortname": ":mrs_claus_tone5:", "aliases": ":mother_christmas_tone5:", "keywords": "mother christmas tone 5" }, "princess": { "unicode": "1f478", "shortname": ":princess:", "aliases": "", "keywords": "princess people women diversity beautiful girls night" }, "princess_tone1": { "unicode": "1f478-1f3fb", "shortname": ":princess_tone1:", "aliases": "", "keywords": "princess tone 1" }, "princess_tone2": { "unicode": "1f478-1f3fc", "shortname": ":princess_tone2:", "aliases": "", "keywords": "princess tone 2" }, "princess_tone3": { "unicode": "1f478-1f3fd", "shortname": ":princess_tone3:", "aliases": "", "keywords": "princess tone 3" }, "princess_tone4": { "unicode": "1f478-1f3fe", "shortname": ":princess_tone4:", "aliases": "", "keywords": "princess tone 4" }, "princess_tone5": { "unicode": "1f478-1f3ff", "shortname": ":princess_tone5:", "aliases": "", "keywords": "princess tone 5" }, "prince": { "unicode": "1f934", "shortname": ":prince:", "aliases": "", "keywords": "prince" }, "prince_tone1": { "unicode": "1f934-1f3fb", "shortname": ":prince_tone1:", "aliases": "", "keywords": "prince tone 1" }, "prince_tone2": { "unicode": "1f934-1f3fc", "shortname": ":prince_tone2:", "aliases": "", "keywords": "prince tone 2" }, "prince_tone3": { "unicode": "1f934-1f3fd", "shortname": ":prince_tone3:", "aliases": "", "keywords": "prince tone 3" }, "prince_tone4": { "unicode": "1f934-1f3fe", "shortname": ":prince_tone4:", "aliases": "", "keywords": "prince tone 4" }, "prince_tone5": { "unicode": "1f934-1f3ff", "shortname": ":prince_tone5:", "aliases": "", "keywords": "prince tone 5" }, "bride_with_veil": { "unicode": "1f470", "shortname": ":bride_with_veil:", "aliases": "", "keywords": "bride with veil people wedding women diversity" }, "bride_with_veil_tone1": { "unicode": "1f470-1f3fb", "shortname": ":bride_with_veil_tone1:", "aliases": "", "keywords": "bride with veil tone 1" }, "bride_with_veil_tone2": { "unicode": "1f470-1f3fc", "shortname": ":bride_with_veil_tone2:", "aliases": "", "keywords": "bride with veil tone 2" }, "bride_with_veil_tone3": { "unicode": "1f470-1f3fd", "shortname": ":bride_with_veil_tone3:", "aliases": "", "keywords": "bride with veil tone 3" }, "bride_with_veil_tone4": { "unicode": "1f470-1f3fe", "shortname": ":bride_with_veil_tone4:", "aliases": "", "keywords": "bride with veil tone 4" }, "bride_with_veil_tone5": { "unicode": "1f470-1f3ff", "shortname": ":bride_with_veil_tone5:", "aliases": "", "keywords": "bride with veil tone 5" }, "man_in_tuxedo": { "unicode": "1f935", "shortname": ":man_in_tuxedo:", "aliases": "", "keywords": "man in tuxedo" }, "man_in_tuxedo_tone1": { "unicode": "1f935-1f3fb", "shortname": ":man_in_tuxedo_tone1:", "aliases": ":tuxedo_tone1:", "keywords": "man in tuxedo tone 1" }, "man_in_tuxedo_tone2": { "unicode": "1f935-1f3fc", "shortname": ":man_in_tuxedo_tone2:", "aliases": ":tuxedo_tone2:", "keywords": "man in tuxedo tone 2" }, "man_in_tuxedo_tone3": { "unicode": "1f935-1f3fd", "shortname": ":man_in_tuxedo_tone3:", "aliases": ":tuxedo_tone3:", "keywords": "man in tuxedo tone 3" }, "man_in_tuxedo_tone4": { "unicode": "1f935-1f3fe", "shortname": ":man_in_tuxedo_tone4:", "aliases": ":tuxedo_tone4:", "keywords": "man in tuxedo tone 4" }, "man_in_tuxedo_tone5": { "unicode": "1f935-1f3ff", "shortname": ":man_in_tuxedo_tone5:", "aliases": ":tuxedo_tone5:", "keywords": "man in tuxedo tone 5" }, "pregnant_woman": { "unicode": "1f930", "shortname": ":pregnant_woman:", "aliases": ":expecting_woman:", "keywords": "pregnant woman" }, "pregnant_woman_tone1": { "unicode": "1f930-1f3fb", "shortname": ":pregnant_woman_tone1:", "aliases": ":expecting_woman_tone1:", "keywords": "pregnant woman tone 1" }, "pregnant_woman_tone2": { "unicode": "1f930-1f3fc", "shortname": ":pregnant_woman_tone2:", "aliases": ":expecting_woman_tone2:", "keywords": "pregnant woman tone 2" }, "pregnant_woman_tone3": { "unicode": "1f930-1f3fd", "shortname": ":pregnant_woman_tone3:", "aliases": ":expecting_woman_tone3:", "keywords": "pregnant woman tone 3" }, "pregnant_woman_tone4": { "unicode": "1f930-1f3fe", "shortname": ":pregnant_woman_tone4:", "aliases": ":expecting_woman_tone4:", "keywords": "pregnant woman tone 4" }, "pregnant_woman_tone5": { "unicode": "1f930-1f3ff", "shortname": ":pregnant_woman_tone5:", "aliases": ":expecting_woman_tone5:", "keywords": "pregnant woman tone 5" }, "man_with_gua_pi_mao": { "unicode": "1f472", "shortname": ":man_with_gua_pi_mao:", "aliases": "", "keywords": "man with gua pi mao people hat men diversity" }, "man_with_gua_pi_mao_tone1": { "unicode": "1f472-1f3fb", "shortname": ":man_with_gua_pi_mao_tone1:", "aliases": "", "keywords": "man with gua pi mao tone 1" }, "man_with_gua_pi_mao_tone2": { "unicode": "1f472-1f3fc", "shortname": ":man_with_gua_pi_mao_tone2:", "aliases": "", "keywords": "man with gua pi mao tone 2" }, "man_with_gua_pi_mao_tone3": { "unicode": "1f472-1f3fd", "shortname": ":man_with_gua_pi_mao_tone3:", "aliases": "", "keywords": "man with gua pi mao tone 3" }, "man_with_gua_pi_mao_tone4": { "unicode": "1f472-1f3fe", "shortname": ":man_with_gua_pi_mao_tone4:", "aliases": "", "keywords": "man with gua pi mao tone 4" }, "man_with_gua_pi_mao_tone5": { "unicode": "1f472-1f3ff", "shortname": ":man_with_gua_pi_mao_tone5:", "aliases": "", "keywords": "man with gua pi mao tone 5" }, "person_frowning": { "unicode": "1f64d", "shortname": ":person_frowning:", "aliases": "", "keywords": "person frowning people women diversity" }, "person_frowning_tone1": { "unicode": "1f64d-1f3fb", "shortname": ":person_frowning_tone1:", "aliases": "", "keywords": "person frowning tone 1" }, "person_frowning_tone2": { "unicode": "1f64d-1f3fc", "shortname": ":person_frowning_tone2:", "aliases": "", "keywords": "person frowning tone 2" }, "person_frowning_tone3": { "unicode": "1f64d-1f3fd", "shortname": ":person_frowning_tone3:", "aliases": "", "keywords": "person frowning tone 3" }, "person_frowning_tone4": { "unicode": "1f64d-1f3fe", "shortname": ":person_frowning_tone4:", "aliases": "", "keywords": "person frowning tone 4" }, "person_frowning_tone5": { "unicode": "1f64d-1f3ff", "shortname": ":person_frowning_tone5:", "aliases": "", "keywords": "person frowning tone 5" }, "person_with_pouting_face": { "unicode": "1f64e", "shortname": ":person_with_pouting_face:", "aliases": "", "keywords": "person with pouting face people women diversity" }, "person_with_pouting_face_tone1": { "unicode": "1f64e-1f3fb", "shortname": ":person_with_pouting_face_tone1:", "aliases": "", "keywords": "person with pouting face tone1" }, "person_with_pouting_face_tone2": { "unicode": "1f64e-1f3fc", "shortname": ":person_with_pouting_face_tone2:", "aliases": "", "keywords": "person with pouting face tone2" }, "person_with_pouting_face_tone3": { "unicode": "1f64e-1f3fd", "shortname": ":person_with_pouting_face_tone3:", "aliases": "", "keywords": "person with pouting face tone3" }, "person_with_pouting_face_tone4": { "unicode": "1f64e-1f3fe", "shortname": ":person_with_pouting_face_tone4:", "aliases": "", "keywords": "person with pouting face tone4" }, "person_with_pouting_face_tone5": { "unicode": "1f64e-1f3ff", "shortname": ":person_with_pouting_face_tone5:", "aliases": "", "keywords": "person with pouting face tone5" }, "no_good": { "unicode": "1f645", "shortname": ":no_good:", "aliases": "", "keywords": "face with no good gesture people women diversity girls night" }, "no_good_tone1": { "unicode": "1f645-1f3fb", "shortname": ":no_good_tone1:", "aliases": "", "keywords": "face with no good gesture tone 1" }, "no_good_tone2": { "unicode": "1f645-1f3fc", "shortname": ":no_good_tone2:", "aliases": "", "keywords": "face with no good gesture tone 2" }, "no_good_tone3": { "unicode": "1f645-1f3fd", "shortname": ":no_good_tone3:", "aliases": "", "keywords": "face with no good gesture tone 3" }, "no_good_tone4": { "unicode": "1f645-1f3fe", "shortname": ":no_good_tone4:", "aliases": "", "keywords": "face with no good gesture tone 4" }, "no_good_tone5": { "unicode": "1f645-1f3ff", "shortname": ":no_good_tone5:", "aliases": "", "keywords": "face with no good gesture tone 5" }, "ok_woman": { "unicode": "1f646", "shortname": ":ok_woman:", "aliases": "", "keywords": "face with ok gesture people women diversity" }, "ok_woman_tone1": { "unicode": "1f646-1f3fb", "shortname": ":ok_woman_tone1:", "aliases": "", "keywords": "face with ok gesture tone1" }, "ok_woman_tone2": { "unicode": "1f646-1f3fc", "shortname": ":ok_woman_tone2:", "aliases": "", "keywords": "face with ok gesture tone2" }, "ok_woman_tone3": { "unicode": "1f646-1f3fd", "shortname": ":ok_woman_tone3:", "aliases": "", "keywords": "face with ok gesture tone3" }, "ok_woman_tone4": { "unicode": "1f646-1f3fe", "shortname": ":ok_woman_tone4:", "aliases": "", "keywords": "face with ok gesture tone4" }, "ok_woman_tone5": { "unicode": "1f646-1f3ff", "shortname": ":ok_woman_tone5:", "aliases": "", "keywords": "face with ok gesture tone5" }, "information_desk_person": { "unicode": "1f481", "shortname": ":information_desk_person:", "aliases": "", "keywords": "information desk person people women diversity" }, "information_desk_person_tone1": { "unicode": "1f481-1f3fb", "shortname": ":information_desk_person_tone1:", "aliases": "", "keywords": "information desk person tone 1" }, "information_desk_person_tone2": { "unicode": "1f481-1f3fc", "shortname": ":information_desk_person_tone2:", "aliases": "", "keywords": "information desk person tone 2" }, "information_desk_person_tone3": { "unicode": "1f481-1f3fd", "shortname": ":information_desk_person_tone3:", "aliases": "", "keywords": "information desk person tone 3" }, "information_desk_person_tone4": { "unicode": "1f481-1f3fe", "shortname": ":information_desk_person_tone4:", "aliases": "", "keywords": "information desk person tone 4" }, "information_desk_person_tone5": { "unicode": "1f481-1f3ff", "shortname": ":information_desk_person_tone5:", "aliases": "", "keywords": "information desk person tone 5" }, "raising_hand": { "unicode": "1f64b", "shortname": ":raising_hand:", "aliases": "", "keywords": "happy person raising one hand people women diversity" }, "raising_hand_tone1": { "unicode": "1f64b-1f3fb", "shortname": ":raising_hand_tone1:", "aliases": "", "keywords": "happy person raising one hand tone1" }, "raising_hand_tone2": { "unicode": "1f64b-1f3fc", "shortname": ":raising_hand_tone2:", "aliases": "", "keywords": "happy person raising one hand tone2" }, "raising_hand_tone3": { "unicode": "1f64b-1f3fd", "shortname": ":raising_hand_tone3:", "aliases": "", "keywords": "happy person raising one hand tone3" }, "raising_hand_tone4": { "unicode": "1f64b-1f3fe", "shortname": ":raising_hand_tone4:", "aliases": "", "keywords": "happy person raising one hand tone4" }, "raising_hand_tone5": { "unicode": "1f64b-1f3ff", "shortname": ":raising_hand_tone5:", "aliases": "", "keywords": "happy person raising one hand tone5" }, "bow": { "unicode": "1f647", "shortname": ":bow:", "aliases": "", "keywords": "person bowing deeply people pray diversity" }, "bow_tone1": { "unicode": "1f647-1f3fb", "shortname": ":bow_tone1:", "aliases": "", "keywords": "person bowing deeply tone 1" }, "bow_tone2": { "unicode": "1f647-1f3fc", "shortname": ":bow_tone2:", "aliases": "", "keywords": "person bowing deeply tone 2" }, "bow_tone3": { "unicode": "1f647-1f3fd", "shortname": ":bow_tone3:", "aliases": "", "keywords": "person bowing deeply tone 3" }, "bow_tone4": { "unicode": "1f647-1f3fe", "shortname": ":bow_tone4:", "aliases": "", "keywords": "person bowing deeply tone 4" }, "bow_tone5": { "unicode": "1f647-1f3ff", "shortname": ":bow_tone5:", "aliases": "", "keywords": "person bowing deeply tone 5" }, "face_palm": { "unicode": "1f926", "shortname": ":face_palm:", "aliases": ":facepalm:", "keywords": "face palm" }, "face_palm_tone1": { "unicode": "1f926-1f3fb", "shortname": ":face_palm_tone1:", "aliases": ":facepalm_tone1:", "keywords": "face palm tone 1" }, "face_palm_tone2": { "unicode": "1f926-1f3fc", "shortname": ":face_palm_tone2:", "aliases": ":facepalm_tone2:", "keywords": "face palm tone 2" }, "face_palm_tone3": { "unicode": "1f926-1f3fd", "shortname": ":face_palm_tone3:", "aliases": ":facepalm_tone3:", "keywords": "face palm tone 3" }, "face_palm_tone4": { "unicode": "1f926-1f3fe", "shortname": ":face_palm_tone4:", "aliases": ":facepalm_tone4:", "keywords": "face palm tone 4" }, "face_palm_tone5": { "unicode": "1f926-1f3ff", "shortname": ":face_palm_tone5:", "aliases": ":facepalm_tone5:", "keywords": "face palm tone 5" }, "shrug": { "unicode": "1f937", "shortname": ":shrug:", "aliases": "", "keywords": "shrug" }, "shrug_tone1": { "unicode": "1f937-1f3fb", "shortname": ":shrug_tone1:", "aliases": "", "keywords": "shrug tone 1" }, "shrug_tone2": { "unicode": "1f937-1f3fc", "shortname": ":shrug_tone2:", "aliases": "", "keywords": "shrug tone 2" }, "shrug_tone3": { "unicode": "1f937-1f3fd", "shortname": ":shrug_tone3:", "aliases": "", "keywords": "shrug tone 3" }, "shrug_tone4": { "unicode": "1f937-1f3fe", "shortname": ":shrug_tone4:", "aliases": "", "keywords": "shrug tone 4" }, "shrug_tone5": { "unicode": "1f937-1f3ff", "shortname": ":shrug_tone5:", "aliases": "", "keywords": "shrug tone 5" }, "massage": { "unicode": "1f486", "shortname": ":massage:", "aliases": "", "keywords": "face massage people women diversity" }, "massage_tone1": { "unicode": "1f486-1f3fb", "shortname": ":massage_tone1:", "aliases": "", "keywords": "face massage tone 1" }, "massage_tone2": { "unicode": "1f486-1f3fc", "shortname": ":massage_tone2:", "aliases": "", "keywords": "face massage tone 2" }, "massage_tone3": { "unicode": "1f486-1f3fd", "shortname": ":massage_tone3:", "aliases": "", "keywords": "face massage tone 3" }, "massage_tone4": { "unicode": "1f486-1f3fe", "shortname": ":massage_tone4:", "aliases": "", "keywords": "face massage tone 4" }, "massage_tone5": { "unicode": "1f486-1f3ff", "shortname": ":massage_tone5:", "aliases": "", "keywords": "face massage tone 5" }, "haircut": { "unicode": "1f487", "shortname": ":haircut:", "aliases": "", "keywords": "haircut people women diversity" }, "haircut_tone1": { "unicode": "1f487-1f3fb", "shortname": ":haircut_tone1:", "aliases": "", "keywords": "haircut tone 1" }, "haircut_tone2": { "unicode": "1f487-1f3fc", "shortname": ":haircut_tone2:", "aliases": "", "keywords": "haircut tone 2" }, "haircut_tone3": { "unicode": "1f487-1f3fd", "shortname": ":haircut_tone3:", "aliases": "", "keywords": "haircut tone 3" }, "haircut_tone4": { "unicode": "1f487-1f3fe", "shortname": ":haircut_tone4:", "aliases": "", "keywords": "haircut tone 4" }, "haircut_tone5": { "unicode": "1f487-1f3ff", "shortname": ":haircut_tone5:", "aliases": "", "keywords": "haircut tone 5" }, "walking": { "unicode": "1f6b6", "shortname": ":walking:", "aliases": "", "keywords": "pedestrian people men diversity" }, "walking_tone1": { "unicode": "1f6b6-1f3fb", "shortname": ":walking_tone1:", "aliases": "", "keywords": "pedestrian tone 1" }, "walking_tone2": { "unicode": "1f6b6-1f3fc", "shortname": ":walking_tone2:", "aliases": "", "keywords": "pedestrian tone 2" }, "walking_tone3": { "unicode": "1f6b6-1f3fd", "shortname": ":walking_tone3:", "aliases": "", "keywords": "pedestrian tone 3" }, "walking_tone4": { "unicode": "1f6b6-1f3fe", "shortname": ":walking_tone4:", "aliases": "", "keywords": "pedestrian tone 4" }, "walking_tone5": { "unicode": "1f6b6-1f3ff", "shortname": ":walking_tone5:", "aliases": "", "keywords": "pedestrian tone 5" }, "runner": { "unicode": "1f3c3", "shortname": ":runner:", "aliases": "", "keywords": "runner people men diversity boys night run" }, "runner_tone1": { "unicode": "1f3c3-1f3fb", "shortname": ":runner_tone1:", "aliases": "", "keywords": "runner tone 1" }, "runner_tone2": { "unicode": "1f3c3-1f3fc", "shortname": ":runner_tone2:", "aliases": "", "keywords": "runner tone 2" }, "runner_tone3": { "unicode": "1f3c3-1f3fd", "shortname": ":runner_tone3:", "aliases": "", "keywords": "runner tone 3" }, "runner_tone4": { "unicode": "1f3c3-1f3fe", "shortname": ":runner_tone4:", "aliases": "", "keywords": "runner tone 4" }, "runner_tone5": { "unicode": "1f3c3-1f3ff", "shortname": ":runner_tone5:", "aliases": "", "keywords": "runner tone 5" }, "dancer": { "unicode": "1f483", "shortname": ":dancer:", "aliases": "", "keywords": "dancer people women sexy diversity girls night dance" }, "dancer_tone1": { "unicode": "1f483-1f3fb", "shortname": ":dancer_tone1:", "aliases": "", "keywords": "dancer tone 1" }, "dancer_tone2": { "unicode": "1f483-1f3fc", "shortname": ":dancer_tone2:", "aliases": "", "keywords": "dancer tone 2" }, "dancer_tone3": { "unicode": "1f483-1f3fd", "shortname": ":dancer_tone3:", "aliases": "", "keywords": "dancer tone 3" }, "dancer_tone4": { "unicode": "1f483-1f3fe", "shortname": ":dancer_tone4:", "aliases": "", "keywords": "dancer tone 4" }, "dancer_tone5": { "unicode": "1f483-1f3ff", "shortname": ":dancer_tone5:", "aliases": "", "keywords": "dancer tone 5" }, "man_dancing": { "unicode": "1f57a", "shortname": ":man_dancing:", "aliases": ":male_dancer:", "keywords": "man dancing" }, "man_dancing_tone1": { "unicode": "1f57a-1f3fb", "shortname": ":man_dancing_tone1:", "aliases": ":male_dancer_tone1:", "keywords": "man dancing tone 1" }, "man_dancing_tone2": { "unicode": "1f57a-1f3fc", "shortname": ":man_dancing_tone2:", "aliases": ":male_dancer_tone2:", "keywords": "man dancing tone 2" }, "man_dancing_tone3": { "unicode": "1f57a-1f3fd", "shortname": ":man_dancing_tone3:", "aliases": ":male_dancer_tone3:", "keywords": "man dancing tone 3" }, "man_dancing_tone4": { "unicode": "1f57a-1f3fe", "shortname": ":man_dancing_tone4:", "aliases": ":male_dancer_tone4:", "keywords": "man dancing tone 4" }, "man_dancing_tone5": { "unicode": "1f57a-1f3ff", "shortname": ":man_dancing_tone5:", "aliases": ":male_dancer_tone5:", "keywords": "man dancing tone 5" }, "dancers": { "unicode": "1f46f", "shortname": ":dancers:", "aliases": "", "keywords": "woman with bunny ears people women sexy girls night boys night parties dance" }, "levitate": { "unicode": "1f574", "shortname": ":levitate:", "aliases": ":man_in_business_suit_levitating:", "keywords": "man in business suit levitating men job" }, "speaking_head": { "unicode": "1f5e3", "shortname": ":speaking_head:", "aliases": ":speaking_head_in_silhouette:", "keywords": "speaking head in silhouette people talk" }, "bust_in_silhouette": { "unicode": "1f464", "shortname": ":bust_in_silhouette:", "aliases": "", "keywords": "bust in silhouette people" }, "busts_in_silhouette": { "unicode": "1f465", "shortname": ":busts_in_silhouette:", "aliases": "", "keywords": "busts in silhouette people" }, "fencer": { "unicode": "1f93a", "shortname": ":fencer:", "aliases": ":fencing:", "keywords": "fencer" }, "horse_racing": { "unicode": "1f3c7", "shortname": ":horse_racing:", "aliases": "", "keywords": "horse racing men sport horse racing" }, "horse_racing_tone1": { "unicode": "1f3c7-1f3fb", "shortname": ":horse_racing_tone1:", "aliases": "", "keywords": "horse racing tone 1" }, "horse_racing_tone2": { "unicode": "1f3c7-1f3fc", "shortname": ":horse_racing_tone2:", "aliases": "", "keywords": "horse racing tone 2" }, "horse_racing_tone3": { "unicode": "1f3c7-1f3fd", "shortname": ":horse_racing_tone3:", "aliases": "", "keywords": "horse racing tone 3" }, "horse_racing_tone4": { "unicode": "1f3c7-1f3fe", "shortname": ":horse_racing_tone4:", "aliases": "", "keywords": "horse racing tone 4" }, "horse_racing_tone5": { "unicode": "1f3c7-1f3ff", "shortname": ":horse_racing_tone5:", "aliases": "", "keywords": "horse racing tone 5" }, "skier": { "unicode": "26f7", "shortname": ":skier:", "aliases": "", "keywords": "skier hat vacation cold sport skiing" }, "snowboarder": { "unicode": "1f3c2", "shortname": ":snowboarder:", "aliases": "", "keywords": "snowboarder hat vacation cold sport snowboarding" }, "golfer": { "unicode": "1f3cc", "shortname": ":golfer:", "aliases": "", "keywords": "golfer men game ball vacation sport golf" }, "surfer": { "unicode": "1f3c4", "shortname": ":surfer:", "aliases": "", "keywords": "surfer men vacation tropical sport diversity" }, "surfer_tone1": { "unicode": "1f3c4-1f3fb", "shortname": ":surfer_tone1:", "aliases": "", "keywords": "surfer tone 1" }, "surfer_tone2": { "unicode": "1f3c4-1f3fc", "shortname": ":surfer_tone2:", "aliases": "", "keywords": "surfer tone 2" }, "surfer_tone3": { "unicode": "1f3c4-1f3fd", "shortname": ":surfer_tone3:", "aliases": "", "keywords": "surfer tone 3" }, "surfer_tone4": { "unicode": "1f3c4-1f3fe", "shortname": ":surfer_tone4:", "aliases": "", "keywords": "surfer tone 4" }, "surfer_tone5": { "unicode": "1f3c4-1f3ff", "shortname": ":surfer_tone5:", "aliases": "", "keywords": "surfer tone 5" }, "rowboat": { "unicode": "1f6a3", "shortname": ":rowboat:", "aliases": "", "keywords": "rowboat men workout sport rowing diversity" }, "rowboat_tone1": { "unicode": "1f6a3-1f3fb", "shortname": ":rowboat_tone1:", "aliases": "", "keywords": "rowboat tone 1" }, "rowboat_tone2": { "unicode": "1f6a3-1f3fc", "shortname": ":rowboat_tone2:", "aliases": "", "keywords": "rowboat tone 2" }, "rowboat_tone3": { "unicode": "1f6a3-1f3fd", "shortname": ":rowboat_tone3:", "aliases": "", "keywords": "rowboat tone 3" }, "rowboat_tone4": { "unicode": "1f6a3-1f3fe", "shortname": ":rowboat_tone4:", "aliases": "", "keywords": "rowboat tone 4" }, "rowboat_tone5": { "unicode": "1f6a3-1f3ff", "shortname": ":rowboat_tone5:", "aliases": "", "keywords": "rowboat tone 5" }, "swimmer": { "unicode": "1f3ca", "shortname": ":swimmer:", "aliases": "", "keywords": "swimmer workout sport swim diversity" }, "swimmer_tone1": { "unicode": "1f3ca-1f3fb", "shortname": ":swimmer_tone1:", "aliases": "", "keywords": "swimmer tone 1" }, "swimmer_tone2": { "unicode": "1f3ca-1f3fc", "shortname": ":swimmer_tone2:", "aliases": "", "keywords": "swimmer tone 2" }, "swimmer_tone3": { "unicode": "1f3ca-1f3fd", "shortname": ":swimmer_tone3:", "aliases": "", "keywords": "swimmer tone 3" }, "swimmer_tone4": { "unicode": "1f3ca-1f3fe", "shortname": ":swimmer_tone4:", "aliases": "", "keywords": "swimmer tone 4" }, "swimmer_tone5": { "unicode": "1f3ca-1f3ff", "shortname": ":swimmer_tone5:", "aliases": "", "keywords": "swimmer tone 5" }, "basketball_player": { "unicode": "26f9", "shortname": ":basketball_player:", "aliases": ":person_with_ball:", "keywords": "person with ball men game ball sport basketball diversity" }, "basketball_player_tone1": { "unicode": "26f9-1f3fb", "shortname": ":basketball_player_tone1:", "aliases": ":person_with_ball_tone1:", "keywords": "person with ball tone 1" }, "basketball_player_tone2": { "unicode": "26f9-1f3fc", "shortname": ":basketball_player_tone2:", "aliases": ":person_with_ball_tone2:", "keywords": "person with ball tone 2" }, "basketball_player_tone3": { "unicode": "26f9-1f3fd", "shortname": ":basketball_player_tone3:", "aliases": ":person_with_ball_tone3:", "keywords": "person with ball tone 3" }, "basketball_player_tone4": { "unicode": "26f9-1f3fe", "shortname": ":basketball_player_tone4:", "aliases": ":person_with_ball_tone4:", "keywords": "person with ball tone 4" }, "basketball_player_tone5": { "unicode": "26f9-1f3ff", "shortname": ":basketball_player_tone5:", "aliases": ":person_with_ball_tone5:", "keywords": "person with ball tone 5" }, "lifter": { "unicode": "1f3cb", "shortname": ":lifter:", "aliases": ":weight_lifter:", "keywords": "weight lifter men workout flex sport weight lifting win diversity" }, "lifter_tone1": { "unicode": "1f3cb-1f3fb", "shortname": ":lifter_tone1:", "aliases": ":weight_lifter_tone1:", "keywords": "weight lifter tone 1" }, "lifter_tone2": { "unicode": "1f3cb-1f3fc", "shortname": ":lifter_tone2:", "aliases": ":weight_lifter_tone2:", "keywords": "weight lifter tone 2" }, "lifter_tone3": { "unicode": "1f3cb-1f3fd", "shortname": ":lifter_tone3:", "aliases": ":weight_lifter_tone3:", "keywords": "weight lifter tone 3" }, "lifter_tone4": { "unicode": "1f3cb-1f3fe", "shortname": ":lifter_tone4:", "aliases": ":weight_lifter_tone4:", "keywords": "weight lifter tone 4" }, "lifter_tone5": { "unicode": "1f3cb-1f3ff", "shortname": ":lifter_tone5:", "aliases": ":weight_lifter_tone5:", "keywords": "weight lifter tone 5" }, "bicyclist": { "unicode": "1f6b4", "shortname": ":bicyclist:", "aliases": "", "keywords": "bicyclist men workout sport bike diversity" }, "bicyclist_tone1": { "unicode": "1f6b4-1f3fb", "shortname": ":bicyclist_tone1:", "aliases": "", "keywords": "bicyclist tone 1" }, "bicyclist_tone2": { "unicode": "1f6b4-1f3fc", "shortname": ":bicyclist_tone2:", "aliases": "", "keywords": "bicyclist tone 2" }, "bicyclist_tone3": { "unicode": "1f6b4-1f3fd", "shortname": ":bicyclist_tone3:", "aliases": "", "keywords": "bicyclist tone 3" }, "bicyclist_tone4": { "unicode": "1f6b4-1f3fe", "shortname": ":bicyclist_tone4:", "aliases": "", "keywords": "bicyclist tone 4" }, "bicyclist_tone5": { "unicode": "1f6b4-1f3ff", "shortname": ":bicyclist_tone5:", "aliases": "", "keywords": "bicyclist tone 5" }, "mountain_bicyclist": { "unicode": "1f6b5", "shortname": ":mountain_bicyclist:", "aliases": "", "keywords": "mountain bicyclist men sport bike diversity" }, "mountain_bicyclist_tone1": { "unicode": "1f6b5-1f3fb", "shortname": ":mountain_bicyclist_tone1:", "aliases": "", "keywords": "mountain bicyclist tone 1" }, "mountain_bicyclist_tone2": { "unicode": "1f6b5-1f3fc", "shortname": ":mountain_bicyclist_tone2:", "aliases": "", "keywords": "mountain bicyclist tone 2" }, "mountain_bicyclist_tone3": { "unicode": "1f6b5-1f3fd", "shortname": ":mountain_bicyclist_tone3:", "aliases": "", "keywords": "mountain bicyclist tone 3" }, "mountain_bicyclist_tone4": { "unicode": "1f6b5-1f3fe", "shortname": ":mountain_bicyclist_tone4:", "aliases": "", "keywords": "mountain bicyclist tone 4" }, "mountain_bicyclist_tone5": { "unicode": "1f6b5-1f3ff", "shortname": ":mountain_bicyclist_tone5:", "aliases": "", "keywords": "mountain bicyclist tone 5" }, "race_car": { "unicode": "1f3ce", "shortname": ":race_car:", "aliases": ":racing_car:", "keywords": "racing car transportation car" }, "motorcycle": { "unicode": "1f3cd", "shortname": ":motorcycle:", "aliases": ":racing_motorcycle:", "keywords": "racing motorcycle transportation travel bike" }, "cartwheel": { "unicode": "1f938", "shortname": ":cartwheel:", "aliases": ":person_doing_cartwheel:", "keywords": "person doing cartwheel" }, "cartwheel_tone1": { "unicode": "1f938-1f3fb", "shortname": ":cartwheel_tone1:", "aliases": ":person_doing_cartwheel_tone1:", "keywords": "person doing cartwheel tone 1" }, "cartwheel_tone2": { "unicode": "1f938-1f3fc", "shortname": ":cartwheel_tone2:", "aliases": ":person_doing_cartwheel_tone2:", "keywords": "person doing cartwheel tone 2" }, "cartwheel_tone3": { "unicode": "1f938-1f3fd", "shortname": ":cartwheel_tone3:", "aliases": ":person_doing_cartwheel_tone3:", "keywords": "person doing cartwheel tone 3" }, "cartwheel_tone4": { "unicode": "1f938-1f3fe", "shortname": ":cartwheel_tone4:", "aliases": ":person_doing_cartwheel_tone4:", "keywords": "person doing cartwheel tone 4" }, "cartwheel_tone5": { "unicode": "1f938-1f3ff", "shortname": ":cartwheel_tone5:", "aliases": ":person_doing_cartwheel_tone5:", "keywords": "person doing cartwheel tone 5" }, "wrestlers": { "unicode": "1f93c", "shortname": ":wrestlers:", "aliases": ":wrestling:", "keywords": "wrestlers" }, "wrestlers_tone1": { "unicode": "1f93c-1f3fb", "shortname": ":wrestlers_tone1:", "aliases": ":wrestling_tone1:", "keywords": "wrestlers tone 1" }, "wrestlers_tone2": { "unicode": "1f93c-1f3fc", "shortname": ":wrestlers_tone2:", "aliases": ":wrestling_tone2:", "keywords": "wrestlers tone 2" }, "wrestlers_tone3": { "unicode": "1f93c-1f3fd", "shortname": ":wrestlers_tone3:", "aliases": ":wrestling_tone3:", "keywords": "wrestlers tone 3" }, "wrestlers_tone4": { "unicode": "1f93c-1f3fe", "shortname": ":wrestlers_tone4:", "aliases": ":wrestling_tone4:", "keywords": "wrestlers tone 4" }, "wrestlers_tone5": { "unicode": "1f93c-1f3ff", "shortname": ":wrestlers_tone5:", "aliases": ":wrestling_tone5:", "keywords": "wrestlers tone 5" }, "water_polo": { "unicode": "1f93d", "shortname": ":water_polo:", "aliases": "", "keywords": "water polo" }, "water_polo_tone1": { "unicode": "1f93d-1f3fb", "shortname": ":water_polo_tone1:", "aliases": "", "keywords": "water polo tone 1" }, "water_polo_tone2": { "unicode": "1f93d-1f3fc", "shortname": ":water_polo_tone2:", "aliases": "", "keywords": "water polo tone 2" }, "water_polo_tone3": { "unicode": "1f93d-1f3fd", "shortname": ":water_polo_tone3:", "aliases": "", "keywords": "water polo tone 3" }, "water_polo_tone4": { "unicode": "1f93d-1f3fe", "shortname": ":water_polo_tone4:", "aliases": "", "keywords": "water polo tone 4" }, "water_polo_tone5": { "unicode": "1f93d-1f3ff", "shortname": ":water_polo_tone5:", "aliases": "", "keywords": "water polo tone 5" }, "handball": { "unicode": "1f93e", "shortname": ":handball:", "aliases": "", "keywords": "handball" }, "handball_tone1": { "unicode": "1f93e-1f3fb", "shortname": ":handball_tone1:", "aliases": "", "keywords": "handball tone 1" }, "handball_tone2": { "unicode": "1f93e-1f3fc", "shortname": ":handball_tone2:", "aliases": "", "keywords": "handball tone 2" }, "handball_tone3": { "unicode": "1f93e-1f3fd", "shortname": ":handball_tone3:", "aliases": "", "keywords": "handball tone 3" }, "handball_tone4": { "unicode": "1f93e-1f3fe", "shortname": ":handball_tone4:", "aliases": "", "keywords": "handball tone 4" }, "handball_tone5": { "unicode": "1f93e-1f3ff", "shortname": ":handball_tone5:", "aliases": "", "keywords": "handball tone 5" }, "juggling": { "unicode": "1f939", "shortname": ":juggling:", "aliases": ":juggler:", "keywords": "juggling" }, "juggling_tone1": { "unicode": "1f939-1f3fb", "shortname": ":juggling_tone1:", "aliases": ":juggler_tone1:", "keywords": "juggling tone 1" }, "juggling_tone2": { "unicode": "1f939-1f3fc", "shortname": ":juggling_tone2:", "aliases": ":juggler_tone2:", "keywords": "juggling tone 2" }, "juggling_tone3": { "unicode": "1f939-1f3fd", "shortname": ":juggling_tone3:", "aliases": ":juggler_tone3:", "keywords": "juggling tone 3" }, "juggling_tone4": { "unicode": "1f939-1f3fe", "shortname": ":juggling_tone4:", "aliases": ":juggler_tone4:", "keywords": "juggling tone 4" }, "juggling_tone5": { "unicode": "1f939-1f3ff", "shortname": ":juggling_tone5:", "aliases": ":juggler_tone5:", "keywords": "juggling tone 5" }, "couple": { "unicode": "1f46b", "shortname": ":couple:", "aliases": "", "keywords": "man and woman holding hands people sex creationism" }, "two_men_holding_hands": { "unicode": "1f46c", "shortname": ":two_men_holding_hands:", "aliases": "", "keywords": "two men holding hands people gay men sex lgbt" }, "two_women_holding_hands": { "unicode": "1f46d", "shortname": ":two_women_holding_hands:", "aliases": "", "keywords": "two women holding hands people women sex lgbt lesbian girls night" }, "couplekiss": { "unicode": "1f48f", "shortname": ":couplekiss:", "aliases": "", "keywords": "kiss people love sex" }, "kiss_mm": { "unicode": "1f468-2764-1f48b-1f468", "shortname": ":kiss_mm:", "aliases": ":couplekiss_mm:", "keywords": "kiss (man,man) people gay men love sex lgbt" }, "kiss_ww": { "unicode": "1f469-2764-1f48b-1f469", "shortname": ":kiss_ww:", "aliases": ":couplekiss_ww:", "keywords": "kiss (woman,woman) people women love sex lgbt lesbian" }, "couple_with_heart": { "unicode": "1f491", "shortname": ":couple_with_heart:", "aliases": "", "keywords": "couple with heart people love sex" }, "couple_mm": { "unicode": "1f468-2764-1f468", "shortname": ":couple_mm:", "aliases": ":couple_with_heart_mm:", "keywords": "couple (man,man) people gay men love sex lgbt" }, "couple_ww": { "unicode": "1f469-2764-1f469", "shortname": ":couple_ww:", "aliases": ":couple_with_heart_ww:", "keywords": "couple (woman,woman) people women love sex lgbt" }, "family": { "unicode": "1f46a", "shortname": ":family:", "aliases": "", "keywords": "family people family baby" }, "family_mwg": { "unicode": "1f468-1f469-1f467", "shortname": ":family_mwg:", "aliases": "", "keywords": "family (man,woman,girl) people family baby" }, "family_mwgb": { "unicode": "1f468-1f469-1f467-1f466", "shortname": ":family_mwgb:", "aliases": "", "keywords": "family (man,woman,girl,boy) people family baby" }, "family_mwbb": { "unicode": "1f468-1f469-1f466-1f466", "shortname": ":family_mwbb:", "aliases": "", "keywords": "family (man,woman,boy,boy) people family baby" }, "family_mwgg": { "unicode": "1f468-1f469-1f467-1f467", "shortname": ":family_mwgg:", "aliases": "", "keywords": "family (man,woman,girl,girl) people family baby" }, "family_mmb": { "unicode": "1f468-1f468-1f466", "shortname": ":family_mmb:", "aliases": "", "keywords": "family (man,man,boy) people gay family men baby lgbt" }, "family_mmg": { "unicode": "1f468-1f468-1f467", "shortname": ":family_mmg:", "aliases": "", "keywords": "family (man,man,girl) people gay family men baby lgbt" }, "family_mmgb": { "unicode": "1f468-1f468-1f467-1f466", "shortname": ":family_mmgb:", "aliases": "", "keywords": "family (man,man,girl,boy) people gay family men baby lgbt" }, "family_mmbb": { "unicode": "1f468-1f468-1f466-1f466", "shortname": ":family_mmbb:", "aliases": "", "keywords": "family (man,man,boy,boy) people gay family men baby lgbt" }, "family_mmgg": { "unicode": "1f468-1f468-1f467-1f467", "shortname": ":family_mmgg:", "aliases": "", "keywords": "family (man,man,girl,girl) people gay family men baby lgbt" }, "family_wwb": { "unicode": "1f469-1f469-1f466", "shortname": ":family_wwb:", "aliases": "", "keywords": "family (woman,woman,boy) people family women baby lgbt lesbian" }, "family_wwg": { "unicode": "1f469-1f469-1f467", "shortname": ":family_wwg:", "aliases": "", "keywords": "family (woman,woman,girl) people family women baby lgbt lesbian" }, "family_wwgb": { "unicode": "1f469-1f469-1f467-1f466", "shortname": ":family_wwgb:", "aliases": "", "keywords": "family (woman,woman,girl,boy) people family women baby lgbt lesbian" }, "family_wwbb": { "unicode": "1f469-1f469-1f466-1f466", "shortname": ":family_wwbb:", "aliases": "", "keywords": "family (woman,woman,boy,boy) people family women baby lgbt lesbian" }, "family_wwgg": { "unicode": "1f469-1f469-1f467-1f467", "shortname": ":family_wwgg:", "aliases": "", "keywords": "family (woman,woman,girl,girl) people family women baby lgbt lesbian" }, "tone1": { "unicode": "1f3fb", "shortname": ":tone1:", "aliases": "", "keywords": "emoji modifier Fitzpatrick type-1-2" }, "tone2": { "unicode": "1f3fc", "shortname": ":tone2:", "aliases": "", "keywords": "emoji modifier Fitzpatrick type-3" }, "tone3": { "unicode": "1f3fd", "shortname": ":tone3:", "aliases": "", "keywords": "emoji modifier Fitzpatrick type-4" }, "tone4": { "unicode": "1f3fe", "shortname": ":tone4:", "aliases": "", "keywords": "emoji modifier Fitzpatrick type-5" }, "tone5": { "unicode": "1f3ff", "shortname": ":tone5:", "aliases": "", "keywords": "emoji modifier Fitzpatrick type-6" }, "muscle": { "unicode": "1f4aa", "shortname": ":muscle:", "aliases": "", "keywords": "flexed biceps body hands workout flex win diversity feminist boys night" }, "muscle_tone1": { "unicode": "1f4aa-1f3fb", "shortname": ":muscle_tone1:", "aliases": "", "keywords": "flexed biceps tone 1" }, "muscle_tone2": { "unicode": "1f4aa-1f3fc", "shortname": ":muscle_tone2:", "aliases": "", "keywords": "flexed biceps tone 2" }, "muscle_tone3": { "unicode": "1f4aa-1f3fd", "shortname": ":muscle_tone3:", "aliases": "", "keywords": "flexed biceps tone 3" }, "muscle_tone4": { "unicode": "1f4aa-1f3fe", "shortname": ":muscle_tone4:", "aliases": "", "keywords": "flexed biceps tone 4" }, "muscle_tone5": { "unicode": "1f4aa-1f3ff", "shortname": ":muscle_tone5:", "aliases": "", "keywords": "flexed biceps tone 5" }, "selfie": { "unicode": "1f933", "shortname": ":selfie:", "aliases": "", "keywords": "selfie" }, "selfie_tone1": { "unicode": "1f933-1f3fb", "shortname": ":selfie_tone1:", "aliases": "", "keywords": "selfie tone 1" }, "selfie_tone2": { "unicode": "1f933-1f3fc", "shortname": ":selfie_tone2:", "aliases": "", "keywords": "selfie tone 2" }, "selfie_tone3": { "unicode": "1f933-1f3fd", "shortname": ":selfie_tone3:", "aliases": "", "keywords": "selfie tone 3" }, "selfie_tone4": { "unicode": "1f933-1f3fe", "shortname": ":selfie_tone4:", "aliases": "", "keywords": "selfie tone 4" }, "selfie_tone5": { "unicode": "1f933-1f3ff", "shortname": ":selfie_tone5:", "aliases": "", "keywords": "selfie tone 5" }, "point_left": { "unicode": "1f448", "shortname": ":point_left:", "aliases": "", "keywords": "white left pointing backhand index body hands hi diversity" }, "point_left_tone1": { "unicode": "1f448-1f3fb", "shortname": ":point_left_tone1:", "aliases": "", "keywords": "white left pointing backhand index tone 1" }, "point_left_tone2": { "unicode": "1f448-1f3fc", "shortname": ":point_left_tone2:", "aliases": "", "keywords": "white left pointing backhand index tone 2" }, "point_left_tone3": { "unicode": "1f448-1f3fd", "shortname": ":point_left_tone3:", "aliases": "", "keywords": "white left pointing backhand index tone 3" }, "point_left_tone4": { "unicode": "1f448-1f3fe", "shortname": ":point_left_tone4:", "aliases": "", "keywords": "white left pointing backhand index tone 4" }, "point_left_tone5": { "unicode": "1f448-1f3ff", "shortname": ":point_left_tone5:", "aliases": "", "keywords": "white left pointing backhand index tone 5" }, "point_right": { "unicode": "1f449", "shortname": ":point_right:", "aliases": "", "keywords": "white right pointing backhand index body hands hi diversity" }, "point_right_tone1": { "unicode": "1f449-1f3fb", "shortname": ":point_right_tone1:", "aliases": "", "keywords": "white right pointing backhand index tone 1" }, "point_right_tone2": { "unicode": "1f449-1f3fc", "shortname": ":point_right_tone2:", "aliases": "", "keywords": "white right pointing backhand index tone 2" }, "point_right_tone3": { "unicode": "1f449-1f3fd", "shortname": ":point_right_tone3:", "aliases": "", "keywords": "white right pointing backhand index tone 3" }, "point_right_tone4": { "unicode": "1f449-1f3fe", "shortname": ":point_right_tone4:", "aliases": "", "keywords": "white right pointing backhand index tone 4" }, "point_right_tone5": { "unicode": "1f449-1f3ff", "shortname": ":point_right_tone5:", "aliases": "", "keywords": "white right pointing backhand index tone 5" }, "point_up": { "unicode": "261d", "shortname": ":point_up:", "aliases": "", "keywords": "white up pointing index body hands emojione diversity" }, "point_up_tone1": { "unicode": "261d-1f3fb", "shortname": ":point_up_tone1:", "aliases": "", "keywords": "white up pointing index tone 1" }, "point_up_tone2": { "unicode": "261d-1f3fc", "shortname": ":point_up_tone2:", "aliases": "", "keywords": "white up pointing index tone 2" }, "point_up_tone3": { "unicode": "261d-1f3fd", "shortname": ":point_up_tone3:", "aliases": "", "keywords": "white up pointing index tone 3" }, "point_up_tone4": { "unicode": "261d-1f3fe", "shortname": ":point_up_tone4:", "aliases": "", "keywords": "white up pointing index tone 4" }, "point_up_tone5": { "unicode": "261d-1f3ff", "shortname": ":point_up_tone5:", "aliases": "", "keywords": "white up pointing index tone 5" }, "point_up_2": { "unicode": "1f446", "shortname": ":point_up_2:", "aliases": "", "keywords": "white up pointing backhand index body hands diversity" }, "point_up_2_tone1": { "unicode": "1f446-1f3fb", "shortname": ":point_up_2_tone1:", "aliases": "", "keywords": "white up pointing backhand index tone 1" }, "point_up_2_tone2": { "unicode": "1f446-1f3fc", "shortname": ":point_up_2_tone2:", "aliases": "", "keywords": "white up pointing backhand index tone 2" }, "point_up_2_tone3": { "unicode": "1f446-1f3fd", "shortname": ":point_up_2_tone3:", "aliases": "", "keywords": "white up pointing backhand index tone 3" }, "point_up_2_tone4": { "unicode": "1f446-1f3fe", "shortname": ":point_up_2_tone4:", "aliases": "", "keywords": "white up pointing backhand index tone 4" }, "point_up_2_tone5": { "unicode": "1f446-1f3ff", "shortname": ":point_up_2_tone5:", "aliases": "", "keywords": "white up pointing backhand index tone 5" }, "middle_finger": { "unicode": "1f595", "shortname": ":middle_finger:", "aliases": ":reversed_hand_with_middle_finger_extended:", "keywords": "reversed hand with middle finger extended body hands middle finger diversity" }, "middle_finger_tone1": { "unicode": "1f595-1f3fb", "shortname": ":middle_finger_tone1:", "aliases": ":reversed_hand_with_middle_finger_extended_tone1:", "keywords": "reversed hand with middle finger extended tone 1" }, "middle_finger_tone2": { "unicode": "1f595-1f3fc", "shortname": ":middle_finger_tone2:", "aliases": ":reversed_hand_with_middle_finger_extended_tone2:", "keywords": "reversed hand with middle finger extended tone 2" }, "middle_finger_tone3": { "unicode": "1f595-1f3fd", "shortname": ":middle_finger_tone3:", "aliases": ":reversed_hand_with_middle_finger_extended_tone3:", "keywords": "reversed hand with middle finger extended tone 3" }, "middle_finger_tone4": { "unicode": "1f595-1f3fe", "shortname": ":middle_finger_tone4:", "aliases": ":reversed_hand_with_middle_finger_extended_tone4:", "keywords": "reversed hand with middle finger extended tone 4" }, "middle_finger_tone5": { "unicode": "1f595-1f3ff", "shortname": ":middle_finger_tone5:", "aliases": ":reversed_hand_with_middle_finger_extended_tone5:", "keywords": "reversed hand with middle finger extended tone 5" }, "point_down": { "unicode": "1f447", "shortname": ":point_down:", "aliases": "", "keywords": "white down pointing backhand index body hands diversity" }, "point_down_tone1": { "unicode": "1f447-1f3fb", "shortname": ":point_down_tone1:", "aliases": "", "keywords": "white down pointing backhand index tone 1" }, "point_down_tone2": { "unicode": "1f447-1f3fc", "shortname": ":point_down_tone2:", "aliases": "", "keywords": "white down pointing backhand index tone 2" }, "point_down_tone3": { "unicode": "1f447-1f3fd", "shortname": ":point_down_tone3:", "aliases": "", "keywords": "white down pointing backhand index tone 3" }, "point_down_tone4": { "unicode": "1f447-1f3fe", "shortname": ":point_down_tone4:", "aliases": "", "keywords": "white down pointing backhand index tone 4" }, "point_down_tone5": { "unicode": "1f447-1f3ff", "shortname": ":point_down_tone5:", "aliases": "", "keywords": "white down pointing backhand index tone 5" }, "v": { "unicode": "270c", "shortname": ":v:", "aliases": "", "keywords": "victory hand body hands hi thank you peace diversity girls night" }, "v_tone1": { "unicode": "270c-1f3fb", "shortname": ":v_tone1:", "aliases": "", "keywords": "victory hand tone 1" }, "v_tone2": { "unicode": "270c-1f3fc", "shortname": ":v_tone2:", "aliases": "", "keywords": "victory hand tone 2" }, "v_tone3": { "unicode": "270c-1f3fd", "shortname": ":v_tone3:", "aliases": "", "keywords": "victory hand tone 3" }, "v_tone4": { "unicode": "270c-1f3fe", "shortname": ":v_tone4:", "aliases": "", "keywords": "victory hand tone 4" }, "v_tone5": { "unicode": "270c-1f3ff", "shortname": ":v_tone5:", "aliases": "", "keywords": "victory hand tone 5" }, "fingers_crossed": { "unicode": "1f91e", "shortname": ":fingers_crossed:", "aliases": ":hand_with_index_and_middle_finger_crossed:", "keywords": "hand with first and index finger crossed" }, "fingers_crossed_tone1": { "unicode": "1f91e-1f3fb", "shortname": ":fingers_crossed_tone1:", "aliases": ":hand_with_index_and_middle_fingers_crossed_tone1:", "keywords": "hand with index and middle fingers crossed tone 1" }, "fingers_crossed_tone2": { "unicode": "1f91e-1f3fc", "shortname": ":fingers_crossed_tone2:", "aliases": ":hand_with_index_and_middle_fingers_crossed_tone2:", "keywords": "hand with index and middle fingers crossed tone 2" }, "fingers_crossed_tone3": { "unicode": "1f91e-1f3fd", "shortname": ":fingers_crossed_tone3:", "aliases": ":hand_with_index_and_middle_fingers_crossed_tone3:", "keywords": "hand with index and middle fingers crossed tone 3" }, "fingers_crossed_tone4": { "unicode": "1f91e-1f3fe", "shortname": ":fingers_crossed_tone4:", "aliases": ":hand_with_index_and_middle_fingers_crossed_tone4:", "keywords": "hand with index and middle fingers crossed tone 4" }, "fingers_crossed_tone5": { "unicode": "1f91e-1f3ff", "shortname": ":fingers_crossed_tone5:", "aliases": ":hand_with_index_and_middle_fingers_crossed_tone5:", "keywords": "hand with index and middle fingers crossed tone 5" }, "vulcan": { "unicode": "1f596", "shortname": ":vulcan:", "aliases": ":raised_hand_with_part_between_middle_and_ring_fingers:", "keywords": "raised hand with part between middle and ring fingers body hands hi diversity" }, "vulcan_tone1": { "unicode": "1f596-1f3fb", "shortname": ":vulcan_tone1:", "aliases": ":raised_hand_with_part_between_middle_and_ring_fingers_tone1:", "keywords": "raised hand with part between middle and ring fingers tone 1" }, "vulcan_tone2": { "unicode": "1f596-1f3fc", "shortname": ":vulcan_tone2:", "aliases": ":raised_hand_with_part_between_middle_and_ring_fingers_tone2:", "keywords": "raised hand with part between middle and ring fingers tone 2" }, "vulcan_tone3": { "unicode": "1f596-1f3fd", "shortname": ":vulcan_tone3:", "aliases": ":raised_hand_with_part_between_middle_and_ring_fingers_tone3:", "keywords": "raised hand with part between middle and ring fingers tone 3" }, "vulcan_tone4": { "unicode": "1f596-1f3fe", "shortname": ":vulcan_tone4:", "aliases": ":raised_hand_with_part_between_middle_and_ring_fingers_tone4:", "keywords": "raised hand with part between middle and ring fingers tone 4" }, "vulcan_tone5": { "unicode": "1f596-1f3ff", "shortname": ":vulcan_tone5:", "aliases": ":raised_hand_with_part_between_middle_and_ring_fingers_tone5:", "keywords": "raised hand with part between middle and ring fingers tone 5" }, "metal": { "unicode": "1f918", "shortname": ":metal:", "aliases": ":sign_of_the_horns:", "keywords": "sign of the horns body hands hi diversity boys night parties" }, "metal_tone1": { "unicode": "1f918-1f3fb", "shortname": ":metal_tone1:", "aliases": ":sign_of_the_horns_tone1:", "keywords": "sign of the horns tone 1" }, "metal_tone2": { "unicode": "1f918-1f3fc", "shortname": ":metal_tone2:", "aliases": ":sign_of_the_horns_tone2:", "keywords": "sign of the horns tone 2" }, "metal_tone3": { "unicode": "1f918-1f3fd", "shortname": ":metal_tone3:", "aliases": ":sign_of_the_horns_tone3:", "keywords": "sign of the horns tone 3" }, "metal_tone4": { "unicode": "1f918-1f3fe", "shortname": ":metal_tone4:", "aliases": ":sign_of_the_horns_tone4:", "keywords": "sign of the horns tone 4" }, "metal_tone5": { "unicode": "1f918-1f3ff", "shortname": ":metal_tone5:", "aliases": ":sign_of_the_horns_tone5:", "keywords": "sign of the horns tone 5" }, "call_me": { "unicode": "1f919", "shortname": ":call_me:", "aliases": ":call_me_hand:", "keywords": "call me hand" }, "call_me_tone1": { "unicode": "1f919-1f3fb", "shortname": ":call_me_tone1:", "aliases": ":call_me_hand_tone1:", "keywords": "call me hand tone 1" }, "call_me_tone2": { "unicode": "1f919-1f3fc", "shortname": ":call_me_tone2:", "aliases": ":call_me_hand_tone2:", "keywords": "call me hand tone 2" }, "call_me_tone3": { "unicode": "1f919-1f3fd", "shortname": ":call_me_tone3:", "aliases": ":call_me_hand_tone3:", "keywords": "call me hand tone 3" }, "call_me_tone4": { "unicode": "1f919-1f3fe", "shortname": ":call_me_tone4:", "aliases": ":call_me_hand_tone4:", "keywords": "call me hand tone 4" }, "call_me_tone5": { "unicode": "1f919-1f3ff", "shortname": ":call_me_tone5:", "aliases": ":call_me_hand_tone5:", "keywords": "call me hand tone 5" }, "hand_splayed": { "unicode": "1f590", "shortname": ":hand_splayed:", "aliases": ":raised_hand_with_fingers_splayed:", "keywords": "raised hand with fingers splayed body hands hi diversity" }, "hand_splayed_tone1": { "unicode": "1f590-1f3fb", "shortname": ":hand_splayed_tone1:", "aliases": ":raised_hand_with_fingers_splayed_tone1:", "keywords": "raised hand with fingers splayed tone 1" }, "hand_splayed_tone2": { "unicode": "1f590-1f3fc", "shortname": ":hand_splayed_tone2:", "aliases": ":raised_hand_with_fingers_splayed_tone2:", "keywords": "raised hand with fingers splayed tone 2" }, "hand_splayed_tone3": { "unicode": "1f590-1f3fd", "shortname": ":hand_splayed_tone3:", "aliases": ":raised_hand_with_fingers_splayed_tone3:", "keywords": "raised hand with fingers splayed tone 3" }, "hand_splayed_tone4": { "unicode": "1f590-1f3fe", "shortname": ":hand_splayed_tone4:", "aliases": ":raised_hand_with_fingers_splayed_tone4:", "keywords": "raised hand with fingers splayed tone 4" }, "hand_splayed_tone5": { "unicode": "1f590-1f3ff", "shortname": ":hand_splayed_tone5:", "aliases": ":raised_hand_with_fingers_splayed_tone5:", "keywords": "raised hand with fingers splayed tone 5" }, "raised_hand": { "unicode": "270b", "shortname": ":raised_hand:", "aliases": "", "keywords": "raised hand body hands hi diversity girls night" }, "raised_hand_tone1": { "unicode": "270b-1f3fb", "shortname": ":raised_hand_tone1:", "aliases": "", "keywords": "raised hand tone 1" }, "raised_hand_tone2": { "unicode": "270b-1f3fc", "shortname": ":raised_hand_tone2:", "aliases": "", "keywords": "raised hand tone 2" }, "raised_hand_tone3": { "unicode": "270b-1f3fd", "shortname": ":raised_hand_tone3:", "aliases": "", "keywords": "raised hand tone 3" }, "raised_hand_tone4": { "unicode": "270b-1f3fe", "shortname": ":raised_hand_tone4:", "aliases": "", "keywords": "raised hand tone 4" }, "raised_hand_tone5": { "unicode": "270b-1f3ff", "shortname": ":raised_hand_tone5:", "aliases": "", "keywords": "raised hand tone 5" }, "ok_hand": { "unicode": "1f44c", "shortname": ":ok_hand:", "aliases": "", "keywords": "ok hand sign body hands hi diversity perfect good beautiful" }, "ok_hand_tone1": { "unicode": "1f44c-1f3fb", "shortname": ":ok_hand_tone1:", "aliases": "", "keywords": "ok hand sign tone 1" }, "ok_hand_tone2": { "unicode": "1f44c-1f3fc", "shortname": ":ok_hand_tone2:", "aliases": "", "keywords": "ok hand sign tone 2" }, "ok_hand_tone3": { "unicode": "1f44c-1f3fd", "shortname": ":ok_hand_tone3:", "aliases": "", "keywords": "ok hand sign tone 3" }, "ok_hand_tone4": { "unicode": "1f44c-1f3fe", "shortname": ":ok_hand_tone4:", "aliases": "", "keywords": "ok hand sign tone 4" }, "ok_hand_tone5": { "unicode": "1f44c-1f3ff", "shortname": ":ok_hand_tone5:", "aliases": "", "keywords": "ok hand sign tone 5" }, "thumbsup": { "unicode": "1f44d", "shortname": ":thumbsup:", "aliases": ":+1: :thumbup:", "keywords": "thumbs up sign body hands hi luck thank you diversity perfect good beautiful" }, "thumbsup_tone1": { "unicode": "1f44d-1f3fb", "shortname": ":thumbsup_tone1:", "aliases": ":+1_tone1: :thumbup_tone1:", "keywords": "thumbs up sign tone 1" }, "thumbsup_tone2": { "unicode": "1f44d-1f3fc", "shortname": ":thumbsup_tone2:", "aliases": ":+1_tone2: :thumbup_tone2:", "keywords": "thumbs up sign tone 2" }, "thumbsup_tone3": { "unicode": "1f44d-1f3fd", "shortname": ":thumbsup_tone3:", "aliases": ":+1_tone3: :thumbup_tone3:", "keywords": "thumbs up sign tone 3" }, "thumbsup_tone4": { "unicode": "1f44d-1f3fe", "shortname": ":thumbsup_tone4:", "aliases": ":+1_tone4: :thumbup_tone4:", "keywords": "thumbs up sign tone 4" }, "thumbsup_tone5": { "unicode": "1f44d-1f3ff", "shortname": ":thumbsup_tone5:", "aliases": ":+1_tone5: :thumbup_tone5:", "keywords": "thumbs up sign tone 5" }, "thumbsdown": { "unicode": "1f44e", "shortname": ":thumbsdown:", "aliases": ":-1: :thumbdown:", "keywords": "thumbs down sign body hands diversity" }, "thumbsdown_tone1": { "unicode": "1f44e-1f3fb", "shortname": ":thumbsdown_tone1:", "aliases": ":-1_tone1: :thumbdown_tone1:", "keywords": "thumbs down sign tone 1" }, "thumbsdown_tone2": { "unicode": "1f44e-1f3fc", "shortname": ":thumbsdown_tone2:", "aliases": ":-1_tone2: :thumbdown_tone2:", "keywords": "thumbs down sign tone 2" }, "thumbsdown_tone3": { "unicode": "1f44e-1f3fd", "shortname": ":thumbsdown_tone3:", "aliases": ":-1_tone3: :thumbdown_tone3:", "keywords": "thumbs down sign tone 3" }, "thumbsdown_tone4": { "unicode": "1f44e-1f3fe", "shortname": ":thumbsdown_tone4:", "aliases": ":-1_tone4: :thumbdown_tone4:", "keywords": "thumbs down sign tone 4" }, "thumbsdown_tone5": { "unicode": "1f44e-1f3ff", "shortname": ":thumbsdown_tone5:", "aliases": ":-1_tone5: :thumbdown_tone5:", "keywords": "thumbs down sign tone 5" }, "fist": { "unicode": "270a", "shortname": ":fist:", "aliases": "", "keywords": "raised fist body hands hi fist bump diversity condolence" }, "fist_tone1": { "unicode": "270a-1f3fb", "shortname": ":fist_tone1:", "aliases": "", "keywords": "raised fist tone 1" }, "fist_tone2": { "unicode": "270a-1f3fc", "shortname": ":fist_tone2:", "aliases": "", "keywords": "raised fist tone 2" }, "fist_tone3": { "unicode": "270a-1f3fd", "shortname": ":fist_tone3:", "aliases": "", "keywords": "raised fist tone 3" }, "fist_tone4": { "unicode": "270a-1f3fe", "shortname": ":fist_tone4:", "aliases": "", "keywords": "raised fist tone 4" }, "fist_tone5": { "unicode": "270a-1f3ff", "shortname": ":fist_tone5:", "aliases": "", "keywords": "raised fist tone 5" }, "punch": { "unicode": "1f44a", "shortname": ":punch:", "aliases": "", "keywords": "fisted hand sign body hands hi fist bump diversity boys night" }, "punch_tone1": { "unicode": "1f44a-1f3fb", "shortname": ":punch_tone1:", "aliases": "", "keywords": "fisted hand sign tone 1" }, "punch_tone2": { "unicode": "1f44a-1f3fc", "shortname": ":punch_tone2:", "aliases": "", "keywords": "fisted hand sign tone 2" }, "punch_tone3": { "unicode": "1f44a-1f3fd", "shortname": ":punch_tone3:", "aliases": "", "keywords": "fisted hand sign tone 3" }, "punch_tone4": { "unicode": "1f44a-1f3fe", "shortname": ":punch_tone4:", "aliases": "", "keywords": "fisted hand sign tone 4" }, "punch_tone5": { "unicode": "1f44a-1f3ff", "shortname": ":punch_tone5:", "aliases": "", "keywords": "fisted hand sign tone 5" }, "left_facing_fist": { "unicode": "1f91b", "shortname": ":left_facing_fist:", "aliases": ":left_fist:", "keywords": "left-facing fist" }, "left_facing_fist_tone1": { "unicode": "1f91b-1f3fb", "shortname": ":left_facing_fist_tone1:", "aliases": ":left_fist_tone1:", "keywords": "left facing fist tone 1" }, "left_facing_fist_tone2": { "unicode": "1f91b-1f3fc", "shortname": ":left_facing_fist_tone2:", "aliases": ":left_fist_tone2:", "keywords": "left facing fist tone 2" }, "left_facing_fist_tone3": { "unicode": "1f91b-1f3fd", "shortname": ":left_facing_fist_tone3:", "aliases": ":left_fist_tone3:", "keywords": "left facing fist tone 3" }, "left_facing_fist_tone4": { "unicode": "1f91b-1f3fe", "shortname": ":left_facing_fist_tone4:", "aliases": ":left_fist_tone4:", "keywords": "left facing fist tone 4" }, "left_facing_fist_tone5": { "unicode": "1f91b-1f3ff", "shortname": ":left_facing_fist_tone5:", "aliases": ":left_fist_tone5:", "keywords": "left facing fist tone 5" }, "right_facing_fist": { "unicode": "1f91c", "shortname": ":right_facing_fist:", "aliases": ":right_fist:", "keywords": "right-facing fist" }, "right_facing_fist_tone1": { "unicode": "1f91c-1f3fb", "shortname": ":right_facing_fist_tone1:", "aliases": ":right_fist_tone1:", "keywords": "right facing fist tone 1" }, "right_facing_fist_tone2": { "unicode": "1f91c-1f3fc", "shortname": ":right_facing_fist_tone2:", "aliases": ":right_fist_tone2:", "keywords": "right facing fist tone 2" }, "right_facing_fist_tone3": { "unicode": "1f91c-1f3fd", "shortname": ":right_facing_fist_tone3:", "aliases": ":right_fist_tone3:", "keywords": "right facing fist tone 3" }, "right_facing_fist_tone4": { "unicode": "1f91c-1f3fe", "shortname": ":right_facing_fist_tone4:", "aliases": ":right_fist_tone4:", "keywords": "right facing fist tone 4" }, "right_facing_fist_tone5": { "unicode": "1f91c-1f3ff", "shortname": ":right_facing_fist_tone5:", "aliases": ":right_fist_tone5:", "keywords": "right facing fist tone 5" }, "raised_back_of_hand": { "unicode": "1f91a", "shortname": ":raised_back_of_hand:", "aliases": ":back_of_hand:", "keywords": "raised back of hand" }, "raised_back_of_hand_tone1": { "unicode": "1f91a-1f3fb", "shortname": ":raised_back_of_hand_tone1:", "aliases": ":back_of_hand_tone1:", "keywords": "raised back of hand tone 1" }, "raised_back_of_hand_tone2": { "unicode": "1f91a-1f3fc", "shortname": ":raised_back_of_hand_tone2:", "aliases": ":back_of_hand_tone2:", "keywords": "raised back of hand tone 2" }, "raised_back_of_hand_tone3": { "unicode": "1f91a-1f3fd", "shortname": ":raised_back_of_hand_tone3:", "aliases": ":back_of_hand_tone3:", "keywords": "raised back of hand tone 3" }, "raised_back_of_hand_tone4": { "unicode": "1f91a-1f3fe", "shortname": ":raised_back_of_hand_tone4:", "aliases": ":back_of_hand_tone4:", "keywords": "raised back of hand tone 4" }, "raised_back_of_hand_tone5": { "unicode": "1f91a-1f3ff", "shortname": ":raised_back_of_hand_tone5:", "aliases": ":back_of_hand_tone5:", "keywords": "raised back of hand tone 5" }, "wave": { "unicode": "1f44b", "shortname": ":wave:", "aliases": "", "keywords": "waving hand sign body hands hi diversity" }, "wave_tone1": { "unicode": "1f44b-1f3fb", "shortname": ":wave_tone1:", "aliases": "", "keywords": "waving hand sign tone 1" }, "wave_tone2": { "unicode": "1f44b-1f3fc", "shortname": ":wave_tone2:", "aliases": "", "keywords": "waving hand sign tone 2" }, "wave_tone3": { "unicode": "1f44b-1f3fd", "shortname": ":wave_tone3:", "aliases": "", "keywords": "waving hand sign tone 3" }, "wave_tone4": { "unicode": "1f44b-1f3fe", "shortname": ":wave_tone4:", "aliases": "", "keywords": "waving hand sign tone 4" }, "wave_tone5": { "unicode": "1f44b-1f3ff", "shortname": ":wave_tone5:", "aliases": "", "keywords": "waving hand sign tone 5" }, "clap": { "unicode": "1f44f", "shortname": ":clap:", "aliases": "", "keywords": "clapping hands sign body hands win diversity good beautiful" }, "clap_tone1": { "unicode": "1f44f-1f3fb", "shortname": ":clap_tone1:", "aliases": "", "keywords": "clapping hands sign tone 1" }, "clap_tone2": { "unicode": "1f44f-1f3fc", "shortname": ":clap_tone2:", "aliases": "", "keywords": "clapping hands sign tone 2" }, "clap_tone3": { "unicode": "1f44f-1f3fd", "shortname": ":clap_tone3:", "aliases": "", "keywords": "clapping hands sign tone 3" }, "clap_tone4": { "unicode": "1f44f-1f3fe", "shortname": ":clap_tone4:", "aliases": "", "keywords": "clapping hands sign tone 4" }, "clap_tone5": { "unicode": "1f44f-1f3ff", "shortname": ":clap_tone5:", "aliases": "", "keywords": "clapping hands sign tone 5" }, "writing_hand": { "unicode": "270d", "shortname": ":writing_hand:", "aliases": "", "keywords": "writing hand body hands write diversity" }, "writing_hand_tone1": { "unicode": "270d-1f3fb", "shortname": ":writing_hand_tone1:", "aliases": "", "keywords": "writing hand tone 1" }, "writing_hand_tone2": { "unicode": "270d-1f3fc", "shortname": ":writing_hand_tone2:", "aliases": "", "keywords": "writing hand tone 2" }, "writing_hand_tone3": { "unicode": "270d-1f3fd", "shortname": ":writing_hand_tone3:", "aliases": "", "keywords": "writing hand tone 3" }, "writing_hand_tone4": { "unicode": "270d-1f3fe", "shortname": ":writing_hand_tone4:", "aliases": "", "keywords": "writing hand tone 4" }, "writing_hand_tone5": { "unicode": "270d-1f3ff", "shortname": ":writing_hand_tone5:", "aliases": "", "keywords": "writing hand tone 5" }, "open_hands": { "unicode": "1f450", "shortname": ":open_hands:", "aliases": "", "keywords": "open hands sign body hands diversity condolence" }, "open_hands_tone1": { "unicode": "1f450-1f3fb", "shortname": ":open_hands_tone1:", "aliases": "", "keywords": "open hands sign tone 1" }, "open_hands_tone2": { "unicode": "1f450-1f3fc", "shortname": ":open_hands_tone2:", "aliases": "", "keywords": "open hands sign tone 2" }, "open_hands_tone3": { "unicode": "1f450-1f3fd", "shortname": ":open_hands_tone3:", "aliases": "", "keywords": "open hands sign tone 3" }, "open_hands_tone4": { "unicode": "1f450-1f3fe", "shortname": ":open_hands_tone4:", "aliases": "", "keywords": "open hands sign tone 4" }, "open_hands_tone5": { "unicode": "1f450-1f3ff", "shortname": ":open_hands_tone5:", "aliases": "", "keywords": "open hands sign tone 5" }, "raised_hands": { "unicode": "1f64c", "shortname": ":raised_hands:", "aliases": "", "keywords": "person raising both hands in celebration body hands diversity perfect good parties" }, "raised_hands_tone1": { "unicode": "1f64c-1f3fb", "shortname": ":raised_hands_tone1:", "aliases": "", "keywords": "person raising both hands in celebration tone 1" }, "raised_hands_tone2": { "unicode": "1f64c-1f3fc", "shortname": ":raised_hands_tone2:", "aliases": "", "keywords": "person raising both hands in celebration tone 2" }, "raised_hands_tone3": { "unicode": "1f64c-1f3fd", "shortname": ":raised_hands_tone3:", "aliases": "", "keywords": "person raising both hands in celebration tone 3" }, "raised_hands_tone4": { "unicode": "1f64c-1f3fe", "shortname": ":raised_hands_tone4:", "aliases": "", "keywords": "person raising both hands in celebration tone 4" }, "raised_hands_tone5": { "unicode": "1f64c-1f3ff", "shortname": ":raised_hands_tone5:", "aliases": "", "keywords": "person raising both hands in celebration tone 5" }, "pray": { "unicode": "1f64f", "shortname": ":pray:", "aliases": "", "keywords": "person with folded hands body hands hi luck thank you pray diversity scientology" }, "pray_tone1": { "unicode": "1f64f-1f3fb", "shortname": ":pray_tone1:", "aliases": "", "keywords": "person with folded hands tone 1" }, "pray_tone2": { "unicode": "1f64f-1f3fc", "shortname": ":pray_tone2:", "aliases": "", "keywords": "person with folded hands tone 2" }, "pray_tone3": { "unicode": "1f64f-1f3fd", "shortname": ":pray_tone3:", "aliases": "", "keywords": "person with folded hands tone 3" }, "pray_tone4": { "unicode": "1f64f-1f3fe", "shortname": ":pray_tone4:", "aliases": "", "keywords": "person with folded hands tone 4" }, "pray_tone5": { "unicode": "1f64f-1f3ff", "shortname": ":pray_tone5:", "aliases": "", "keywords": "person with folded hands tone 5" }, "handshake": { "unicode": "1f91d", "shortname": ":handshake:", "aliases": ":shaking_hands:", "keywords": "handshake" }, "handshake_tone1": { "unicode": "1f91d-1f3fb", "shortname": ":handshake_tone1:", "aliases": ":shaking_hands_tone1:", "keywords": "handshake tone 1" }, "handshake_tone2": { "unicode": "1f91d-1f3fc", "shortname": ":handshake_tone2:", "aliases": ":shaking_hands_tone2:", "keywords": "handshake tone 2" }, "handshake_tone3": { "unicode": "1f91d-1f3fd", "shortname": ":handshake_tone3:", "aliases": ":shaking_hands_tone3:", "keywords": "handshake tone 3" }, "handshake_tone4": { "unicode": "1f91d-1f3fe", "shortname": ":handshake_tone4:", "aliases": ":shaking_hands_tone4:", "keywords": "handshake tone 4" }, "handshake_tone5": { "unicode": "1f91d-1f3ff", "shortname": ":handshake_tone5:", "aliases": ":shaking_hands_tone5:", "keywords": "handshake tone 5" }, "nail_care": { "unicode": "1f485", "shortname": ":nail_care:", "aliases": "", "keywords": "nail polish women body hands nailpolish diversity girls night" }, "nail_care_tone1": { "unicode": "1f485-1f3fb", "shortname": ":nail_care_tone1:", "aliases": "", "keywords": "nail polish tone 1" }, "nail_care_tone2": { "unicode": "1f485-1f3fc", "shortname": ":nail_care_tone2:", "aliases": "", "keywords": "nail polish tone 2" }, "nail_care_tone3": { "unicode": "1f485-1f3fd", "shortname": ":nail_care_tone3:", "aliases": "", "keywords": "nail polish tone 3" }, "nail_care_tone4": { "unicode": "1f485-1f3fe", "shortname": ":nail_care_tone4:", "aliases": "", "keywords": "nail polish tone 4" }, "nail_care_tone5": { "unicode": "1f485-1f3ff", "shortname": ":nail_care_tone5:", "aliases": "", "keywords": "nail polish tone 5" }, "ear": { "unicode": "1f442", "shortname": ":ear:", "aliases": "", "keywords": "ear body diversity" }, "ear_tone1": { "unicode": "1f442-1f3fb", "shortname": ":ear_tone1:", "aliases": "", "keywords": "ear tone 1" }, "ear_tone2": { "unicode": "1f442-1f3fc", "shortname": ":ear_tone2:", "aliases": "", "keywords": "ear tone 2" }, "ear_tone3": { "unicode": "1f442-1f3fd", "shortname": ":ear_tone3:", "aliases": "", "keywords": "ear tone 3" }, "ear_tone4": { "unicode": "1f442-1f3fe", "shortname": ":ear_tone4:", "aliases": "", "keywords": "ear tone 4" }, "ear_tone5": { "unicode": "1f442-1f3ff", "shortname": ":ear_tone5:", "aliases": "", "keywords": "ear tone 5" }, "nose": { "unicode": "1f443", "shortname": ":nose:", "aliases": "", "keywords": "nose body diversity" }, "nose_tone1": { "unicode": "1f443-1f3fb", "shortname": ":nose_tone1:", "aliases": "", "keywords": "nose tone 1" }, "nose_tone2": { "unicode": "1f443-1f3fc", "shortname": ":nose_tone2:", "aliases": "", "keywords": "nose tone 2" }, "nose_tone3": { "unicode": "1f443-1f3fd", "shortname": ":nose_tone3:", "aliases": "", "keywords": "nose tone 3" }, "nose_tone4": { "unicode": "1f443-1f3fe", "shortname": ":nose_tone4:", "aliases": "", "keywords": "nose tone 4" }, "nose_tone5": { "unicode": "1f443-1f3ff", "shortname": ":nose_tone5:", "aliases": "", "keywords": "nose tone 5" }, "footprints": { "unicode": "1f463", "shortname": ":footprints:", "aliases": "", "keywords": "footprints" }, "eyes": { "unicode": "1f440", "shortname": ":eyes:", "aliases": "", "keywords": "eyes body eyes" }, "eye": { "unicode": "1f441", "shortname": ":eye:", "aliases": "", "keywords": "eye body eyes" }, "eye_in_speech_bubble": { "unicode": "1f441-1f5e8", "shortname": ":eye_in_speech_bubble:", "aliases": "", "keywords": "eye in speech bubble object symbol eyes talk" }, "tongue": { "unicode": "1f445", "shortname": ":tongue:", "aliases": "", "keywords": "tongue body sexy lip" }, "lips": { "unicode": "1f444", "shortname": ":lips:", "aliases": "", "keywords": "mouth women body sexy lip" }, "kiss": { "unicode": "1f48b", "shortname": ":kiss:", "aliases": "", "keywords": "kiss mark women love sexy lip beautiful girls night" }, "cupid": { "unicode": "1f498", "shortname": ":cupid:", "aliases": "", "keywords": "heart with arrow love symbol" }, "heart": { "unicode": "2764", "shortname": ":heart:", "aliases": "", "keywords": "heavy black heart love symbol parties" }, "heartbeat": { "unicode": "1f493", "shortname": ":heartbeat:", "aliases": "", "keywords": "beating heart love symbol" }, "broken_heart": { "unicode": "1f494", "shortname": ":broken_heart:", "aliases": "", "keywords": "broken heart love symbol heartbreak" }, "two_hearts": { "unicode": "1f495", "shortname": ":two_hearts:", "aliases": "", "keywords": "two hearts love symbol" }, "sparkling_heart": { "unicode": "1f496", "shortname": ":sparkling_heart:", "aliases": "", "keywords": "sparkling heart love symbol girls night" }, "heartpulse": { "unicode": "1f497", "shortname": ":heartpulse:", "aliases": "", "keywords": "growing heart love symbol" }, "blue_heart": { "unicode": "1f499", "shortname": ":blue_heart:", "aliases": "", "keywords": "blue heart love symbol" }, "green_heart": { "unicode": "1f49a", "shortname": ":green_heart:", "aliases": "", "keywords": "green heart love symbol" }, "yellow_heart": { "unicode": "1f49b", "shortname": ":yellow_heart:", "aliases": "", "keywords": "yellow heart love symbol" }, "purple_heart": { "unicode": "1f49c", "shortname": ":purple_heart:", "aliases": "", "keywords": "purple heart love symbol" }, "black_heart": { "unicode": "1f5a4", "shortname": ":black_heart:", "aliases": "", "keywords": "black heart" }, "gift_heart": { "unicode": "1f49d", "shortname": ":gift_heart:", "aliases": "", "keywords": "heart with ribbon love symbol condolence" }, "revolving_hearts": { "unicode": "1f49e", "shortname": ":revolving_hearts:", "aliases": "", "keywords": "revolving hearts love symbol" }, "heart_decoration": { "unicode": "1f49f", "shortname": ":heart_decoration:", "aliases": "", "keywords": "heart decoration love symbol" }, "heart_exclamation": { "unicode": "2763", "shortname": ":heart_exclamation:", "aliases": ":heavy_heart_exclamation_mark_ornament:", "keywords": "heavy heart exclamation mark ornament love symbol" }, "love_letter": { "unicode": "1f48c", "shortname": ":love_letter:", "aliases": "", "keywords": "love letter object" }, "zzz": { "unicode": "1f4a4", "shortname": ":zzz:", "aliases": "", "keywords": "sleeping symbol tired goodnight" }, "anger": { "unicode": "1f4a2", "shortname": ":anger:", "aliases": "", "keywords": "anger symbol symbol" }, "bomb": { "unicode": "1f4a3", "shortname": ":bomb:", "aliases": "", "keywords": "bomb object weapon dead blast" }, "boom": { "unicode": "1f4a5", "shortname": ":boom:", "aliases": "", "keywords": "collision symbol symbol blast" }, "sweat_drops": { "unicode": "1f4a6", "shortname": ":sweat_drops:", "aliases": "", "keywords": "splashing sweat symbol rain stressed sweat" }, "dash": { "unicode": "1f4a8", "shortname": ":dash:", "aliases": "", "keywords": "dash symbol cloud cold smoking" }, "dizzy": { "unicode": "1f4ab", "shortname": ":dizzy:", "aliases": "", "keywords": "dizzy symbol star symbol" }, "speech_balloon": { "unicode": "1f4ac", "shortname": ":speech_balloon:", "aliases": "", "keywords": "speech balloon symbol free speech" }, "speech_left": { "unicode": "1f5e8", "shortname": ":speech_left:", "aliases": ":left_speech_bubble:", "keywords": "left speech bubble" }, "anger_right": { "unicode": "1f5ef", "shortname": ":anger_right:", "aliases": ":right_anger_bubble:", "keywords": "right anger bubble symbol" }, "thought_balloon": { "unicode": "1f4ad", "shortname": ":thought_balloon:", "aliases": "", "keywords": "thought balloon symbol" }, "hole": { "unicode": "1f573", "shortname": ":hole:", "aliases": "", "keywords": "hole object" }, "eyeglasses": { "unicode": "1f453", "shortname": ":eyeglasses:", "aliases": "", "keywords": "eyeglasses fashion glasses accessories" }, "dark_sunglasses": { "unicode": "1f576", "shortname": ":dark_sunglasses:", "aliases": "", "keywords": "dark sunglasses fashion glasses accessories" }, "necktie": { "unicode": "1f454", "shortname": ":necktie:", "aliases": "", "keywords": "necktie fashion" }, "shirt": { "unicode": "1f455", "shortname": ":shirt:", "aliases": "", "keywords": "t-shirt fashion" }, "jeans": { "unicode": "1f456", "shortname": ":jeans:", "aliases": "", "keywords": "jeans fashion" }, "dress": { "unicode": "1f457", "shortname": ":dress:", "aliases": "", "keywords": "dress women fashion sexy girls night" }, "kimono": { "unicode": "1f458", "shortname": ":kimono:", "aliases": "", "keywords": "kimono fashion" }, "bikini": { "unicode": "1f459", "shortname": ":bikini:", "aliases": "", "keywords": "bikini women fashion sexy vacation tropical swim" }, "womans_clothes": { "unicode": "1f45a", "shortname": ":womans_clothes:", "aliases": "", "keywords": "womans clothes women fashion" }, "purse": { "unicode": "1f45b", "shortname": ":purse:", "aliases": "", "keywords": "purse bag women fashion accessories money" }, "handbag": { "unicode": "1f45c", "shortname": ":handbag:", "aliases": "", "keywords": "handbag bag women fashion vacation accessories" }, "pouch": { "unicode": "1f45d", "shortname": ":pouch:", "aliases": "", "keywords": "pouch bag women fashion accessories" }, "shopping_bags": { "unicode": "1f6cd", "shortname": ":shopping_bags:", "aliases": "", "keywords": "shopping bags object birthday parties" }, "school_satchel": { "unicode": "1f392", "shortname": ":school_satchel:", "aliases": "", "keywords": "school satchel bag fashion office vacation accessories" }, "mans_shoe": { "unicode": "1f45e", "shortname": ":mans_shoe:", "aliases": "", "keywords": "mans shoe fashion shoe accessories" }, "athletic_shoe": { "unicode": "1f45f", "shortname": ":athletic_shoe:", "aliases": "", "keywords": "athletic shoe fashion shoe accessories boys night" }, "high_heel": { "unicode": "1f460", "shortname": ":high_heel:", "aliases": "", "keywords": "high-heeled shoe women fashion shoe sexy accessories girls night" }, "sandal": { "unicode": "1f461", "shortname": ":sandal:", "aliases": "", "keywords": "womans sandal fashion shoe accessories" }, "boot": { "unicode": "1f462", "shortname": ":boot:", "aliases": "", "keywords": "womans boots women fashion shoe sexy accessories" }, "crown": { "unicode": "1f451", "shortname": ":crown:", "aliases": "", "keywords": "crown object gem accessories" }, "womans_hat": { "unicode": "1f452", "shortname": ":womans_hat:", "aliases": "", "keywords": "womans hat women fashion accessories" }, "tophat": { "unicode": "1f3a9", "shortname": ":tophat:", "aliases": "", "keywords": "top hat hat fashion accessories" }, "mortar_board": { "unicode": "1f393", "shortname": ":mortar_board:", "aliases": "", "keywords": "graduation cap hat office accessories" }, "helmet_with_cross": { "unicode": "26d1", "shortname": ":helmet_with_cross:", "aliases": ":helmet_with_white_cross:", "keywords": "helmet with white cross object hat accessories job" }, "prayer_beads": { "unicode": "1f4ff", "shortname": ":prayer_beads:", "aliases": "", "keywords": "prayer beads object rosary" }, "lipstick": { "unicode": "1f484", "shortname": ":lipstick:", "aliases": "", "keywords": "lipstick object women fashion sexy lip" }, "ring": { "unicode": "1f48d", "shortname": ":ring:", "aliases": "", "keywords": "ring wedding object fashion gem accessories" }, "gem": { "unicode": "1f48e", "shortname": ":gem:", "aliases": "", "keywords": "gem stone object gem" }, "monkey_face": { "unicode": "1f435", "shortname": ":monkey_face:", "aliases": "", "keywords": "monkey face animal" }, "monkey": { "unicode": "1f412", "shortname": ":monkey:", "aliases": "", "keywords": "monkey wildlife animal" }, "gorilla": { "unicode": "1f98d", "shortname": ":gorilla:", "aliases": "", "keywords": "gorilla" }, "dog": { "unicode": "1f436", "shortname": ":dog:", "aliases": "", "keywords": "dog face dog pug animal" }, "dog2": { "unicode": "1f415", "shortname": ":dog2:", "aliases": "", "keywords": "dog dog pug animal" }, "poodle": { "unicode": "1f429", "shortname": ":poodle:", "aliases": "", "keywords": "poodle dog animal" }, "wolf": { "unicode": "1f43a", "shortname": ":wolf:", "aliases": "", "keywords": "wolf face wildlife roar animal" }, "fox": { "unicode": "1f98a", "shortname": ":fox:", "aliases": ":fox_face:", "keywords": "fox face" }, "cat": { "unicode": "1f431", "shortname": ":cat:", "aliases": "", "keywords": "cat face halloween vagina cat animal" }, "cat2": { "unicode": "1f408", "shortname": ":cat2:", "aliases": "", "keywords": "cat halloween cat animal" }, "lion_face": { "unicode": "1f981", "shortname": ":lion_face:", "aliases": ":lion:", "keywords": "lion face wildlife roar cat animal" }, "tiger": { "unicode": "1f42f", "shortname": ":tiger:", "aliases": "", "keywords": "tiger face wildlife roar cat animal" }, "tiger2": { "unicode": "1f405", "shortname": ":tiger2:", "aliases": "", "keywords": "tiger wildlife roar animal" }, "leopard": { "unicode": "1f406", "shortname": ":leopard:", "aliases": "", "keywords": "leopard wildlife roar animal" }, "horse": { "unicode": "1f434", "shortname": ":horse:", "aliases": "", "keywords": "horse face wildlife animal" }, "racehorse": { "unicode": "1f40e", "shortname": ":racehorse:", "aliases": "", "keywords": "horse wildlife animal" }, "deer": { "unicode": "1f98c", "shortname": ":deer:", "aliases": "", "keywords": "deer" }, "unicorn": { "unicode": "1f984", "shortname": ":unicorn:", "aliases": ":unicorn_face:", "keywords": "unicorn face animal" }, "cow": { "unicode": "1f42e", "shortname": ":cow:", "aliases": "", "keywords": "cow face animal" }, "ox": { "unicode": "1f402", "shortname": ":ox:", "aliases": "", "keywords": "ox animal" }, "water_buffalo": { "unicode": "1f403", "shortname": ":water_buffalo:", "aliases": "", "keywords": "water buffalo wildlife animal" }, "cow2": { "unicode": "1f404", "shortname": ":cow2:", "aliases": "", "keywords": "cow animal" }, "pig": { "unicode": "1f437", "shortname": ":pig:", "aliases": "", "keywords": "pig face animal" }, "pig2": { "unicode": "1f416", "shortname": ":pig2:", "aliases": "", "keywords": "pig animal" }, "boar": { "unicode": "1f417", "shortname": ":boar:", "aliases": "", "keywords": "boar wildlife animal" }, "pig_nose": { "unicode": "1f43d", "shortname": ":pig_nose:", "aliases": "", "keywords": "pig nose animal" }, "ram": { "unicode": "1f40f", "shortname": ":ram:", "aliases": "", "keywords": "ram wildlife animal" }, "sheep": { "unicode": "1f411", "shortname": ":sheep:", "aliases": "", "keywords": "sheep animal" }, "goat": { "unicode": "1f410", "shortname": ":goat:", "aliases": "", "keywords": "goat animal" }, "dromedary_camel": { "unicode": "1f42a", "shortname": ":dromedary_camel:", "aliases": "", "keywords": "dromedary camel wildlife animal" }, "camel": { "unicode": "1f42b", "shortname": ":camel:", "aliases": "", "keywords": "bactrian camel wildlife animal hump day" }, "elephant": { "unicode": "1f418", "shortname": ":elephant:", "aliases": "", "keywords": "elephant wildlife animal" }, "rhino": { "unicode": "1f98f", "shortname": ":rhino:", "aliases": ":rhinoceros:", "keywords": "rhinoceros" }, "mouse": { "unicode": "1f42d", "shortname": ":mouse:", "aliases": "", "keywords": "mouse face animal" }, "mouse2": { "unicode": "1f401", "shortname": ":mouse2:", "aliases": "", "keywords": "mouse animal" }, "rat": { "unicode": "1f400", "shortname": ":rat:", "aliases": "", "keywords": "rat animal" }, "hamster": { "unicode": "1f439", "shortname": ":hamster:", "aliases": "", "keywords": "hamster face animal" }, "rabbit": { "unicode": "1f430", "shortname": ":rabbit:", "aliases": "", "keywords": "rabbit face wildlife animal" }, "rabbit2": { "unicode": "1f407", "shortname": ":rabbit2:", "aliases": "", "keywords": "rabbit wildlife animal" }, "chipmunk": { "unicode": "1f43f", "shortname": ":chipmunk:", "aliases": "", "keywords": "chipmunk wildlife animal" }, "bat": { "unicode": "1f987", "shortname": ":bat:", "aliases": "", "keywords": "bat" }, "bear": { "unicode": "1f43b", "shortname": ":bear:", "aliases": "", "keywords": "bear face wildlife roar animal" }, "koala": { "unicode": "1f428", "shortname": ":koala:", "aliases": "", "keywords": "koala wildlife animal" }, "panda_face": { "unicode": "1f43c", "shortname": ":panda_face:", "aliases": "", "keywords": "panda face wildlife roar animal" }, "feet": { "unicode": "1f43e", "shortname": ":feet:", "aliases": ":paw_prints:", "keywords": "paw prints animal" }, "turkey": { "unicode": "1f983", "shortname": ":turkey:", "aliases": "", "keywords": "turkey wildlife animal" }, "chicken": { "unicode": "1f414", "shortname": ":chicken:", "aliases": "", "keywords": "chicken animal chicken" }, "rooster": { "unicode": "1f413", "shortname": ":rooster:", "aliases": "", "keywords": "rooster animal" }, "hatching_chick": { "unicode": "1f423", "shortname": ":hatching_chick:", "aliases": "", "keywords": "hatching chick animal chicken" }, "baby_chick": { "unicode": "1f424", "shortname": ":baby_chick:", "aliases": "", "keywords": "baby chick animal chicken" }, "hatched_chick": { "unicode": "1f425", "shortname": ":hatched_chick:", "aliases": "", "keywords": "front-facing baby chick animal chicken" }, "bird": { "unicode": "1f426", "shortname": ":bird:", "aliases": "", "keywords": "bird wildlife animal" }, "penguin": { "unicode": "1f427", "shortname": ":penguin:", "aliases": "", "keywords": "penguin wildlife animal" }, "dove": { "unicode": "1f54a", "shortname": ":dove:", "aliases": ":dove_of_peace:", "keywords": "dove of peace animal" }, "eagle": { "unicode": "1f985", "shortname": ":eagle:", "aliases": "", "keywords": "eagle" }, "duck": { "unicode": "1f986", "shortname": ":duck:", "aliases": "", "keywords": "duck" }, "owl": { "unicode": "1f989", "shortname": ":owl:", "aliases": "", "keywords": "owl" }, "frog": { "unicode": "1f438", "shortname": ":frog:", "aliases": "", "keywords": "frog face wildlife animal" }, "crocodile": { "unicode": "1f40a", "shortname": ":crocodile:", "aliases": "", "keywords": "crocodile wildlife reptile animal" }, "turtle": { "unicode": "1f422", "shortname": ":turtle:", "aliases": "", "keywords": "turtle wildlife reptile animal" }, "lizard": { "unicode": "1f98e", "shortname": ":lizard:", "aliases": "", "keywords": "lizard" }, "snake": { "unicode": "1f40d", "shortname": ":snake:", "aliases": "", "keywords": "snake wildlife reptile animal creationism" }, "dragon_face": { "unicode": "1f432", "shortname": ":dragon_face:", "aliases": "", "keywords": "dragon face roar monster reptile animal" }, "dragon": { "unicode": "1f409", "shortname": ":dragon:", "aliases": "", "keywords": "dragon roar reptile animal" }, "whale": { "unicode": "1f433", "shortname": ":whale:", "aliases": "", "keywords": "spouting whale wildlife tropical whales animal" }, "whale2": { "unicode": "1f40b", "shortname": ":whale2:", "aliases": "", "keywords": "whale wildlife tropical whales animal" }, "dolphin": { "unicode": "1f42c", "shortname": ":dolphin:", "aliases": "", "keywords": "dolphin wildlife tropical animal" }, "fish": { "unicode": "1f41f", "shortname": ":fish:", "aliases": "", "keywords": "fish wildlife animal" }, "tropical_fish": { "unicode": "1f420", "shortname": ":tropical_fish:", "aliases": "", "keywords": "tropical fish wildlife animal" }, "blowfish": { "unicode": "1f421", "shortname": ":blowfish:", "aliases": "", "keywords": "blowfish wildlife animal" }, "shark": { "unicode": "1f988", "shortname": ":shark:", "aliases": "", "keywords": "shark" }, "octopus": { "unicode": "1f419", "shortname": ":octopus:", "aliases": "", "keywords": "octopus wildlife animal" }, "shell": { "unicode": "1f41a", "shortname": ":shell:", "aliases": "", "keywords": "spiral shell" }, "crab": { "unicode": "1f980", "shortname": ":crab:", "aliases": "", "keywords": "crab tropical animal" }, "shrimp": { "unicode": "1f990", "shortname": ":shrimp:", "aliases": "", "keywords": "shrimp" }, "squid": { "unicode": "1f991", "shortname": ":squid:", "aliases": "", "keywords": "squid" }, "butterfly": { "unicode": "1f98b", "shortname": ":butterfly:", "aliases": "", "keywords": "butterfly" }, "snail": { "unicode": "1f40c", "shortname": ":snail:", "aliases": "", "keywords": "snail insects animal" }, "bug": { "unicode": "1f41b", "shortname": ":bug:", "aliases": "", "keywords": "bug insects animal" }, "ant": { "unicode": "1f41c", "shortname": ":ant:", "aliases": "", "keywords": "ant insects animal" }, "bee": { "unicode": "1f41d", "shortname": ":bee:", "aliases": "", "keywords": "honeybee insects animal" }, "beetle": { "unicode": "1f41e", "shortname": ":beetle:", "aliases": "", "keywords": "lady beetle insects animal" }, "spider": { "unicode": "1f577", "shortname": ":spider:", "aliases": "", "keywords": "spider insects halloween animal" }, "spider_web": { "unicode": "1f578", "shortname": ":spider_web:", "aliases": "", "keywords": "spider web halloween" }, "scorpion": { "unicode": "1f982", "shortname": ":scorpion:", "aliases": "", "keywords": "scorpion insects reptile animal" }, "bouquet": { "unicode": "1f490", "shortname": ":bouquet:", "aliases": "", "keywords": "bouquet nature flower plant rip condolence" }, "cherry_blossom": { "unicode": "1f338", "shortname": ":cherry_blossom:", "aliases": "", "keywords": "cherry blossom nature flower plant tropical" }, "white_flower": { "unicode": "1f4ae", "shortname": ":white_flower:", "aliases": "", "keywords": "white flower flower symbol" }, "rosette": { "unicode": "1f3f5", "shortname": ":rosette:", "aliases": "", "keywords": "rosette tropical" }, "rose": { "unicode": "1f339", "shortname": ":rose:", "aliases": "", "keywords": "rose nature flower plant rip condolence beautiful" }, "wilted_rose": { "unicode": "1f940", "shortname": ":wilted_rose:", "aliases": ":wilted_flower:", "keywords": "wilted flower" }, "hibiscus": { "unicode": "1f33a", "shortname": ":hibiscus:", "aliases": "", "keywords": "hibiscus nature flower plant tropical" }, "sunflower": { "unicode": "1f33b", "shortname": ":sunflower:", "aliases": "", "keywords": "sunflower nature flower plant" }, "blossom": { "unicode": "1f33c", "shortname": ":blossom:", "aliases": "", "keywords": "blossom nature flower plant" }, "tulip": { "unicode": "1f337", "shortname": ":tulip:", "aliases": "", "keywords": "tulip nature flower plant vagina girls night" }, "seedling": { "unicode": "1f331", "shortname": ":seedling:", "aliases": "", "keywords": "seedling nature plant leaf" }, "evergreen_tree": { "unicode": "1f332", "shortname": ":evergreen_tree:", "aliases": "", "keywords": "evergreen tree nature plant holidays christmas camp trees" }, "deciduous_tree": { "unicode": "1f333", "shortname": ":deciduous_tree:", "aliases": "", "keywords": "deciduous tree nature plant camp trees" }, "palm_tree": { "unicode": "1f334", "shortname": ":palm_tree:", "aliases": "", "keywords": "palm tree nature plant tropical trees" }, "cactus": { "unicode": "1f335", "shortname": ":cactus:", "aliases": "", "keywords": "cactus nature plant trees" }, "ear_of_rice": { "unicode": "1f33e", "shortname": ":ear_of_rice:", "aliases": "", "keywords": "ear of rice nature plant leaf" }, "herb": { "unicode": "1f33f", "shortname": ":herb:", "aliases": "", "keywords": "herb nature plant leaf" }, "shamrock": { "unicode": "2618", "shortname": ":shamrock:", "aliases": "", "keywords": "shamrock nature plant luck leaf" }, "four_leaf_clover": { "unicode": "1f340", "shortname": ":four_leaf_clover:", "aliases": "", "keywords": "four leaf clover nature plant luck leaf sol" }, "maple_leaf": { "unicode": "1f341", "shortname": ":maple_leaf:", "aliases": "", "keywords": "maple leaf nature plant leaf" }, "fallen_leaf": { "unicode": "1f342", "shortname": ":fallen_leaf:", "aliases": "", "keywords": "fallen leaf nature plant leaf" }, "leaves": { "unicode": "1f343", "shortname": ":leaves:", "aliases": "", "keywords": "leaf fluttering in wind nature plant leaf" }, "grapes": { "unicode": "1f347", "shortname": ":grapes:", "aliases": "", "keywords": "grapes fruit food" }, "melon": { "unicode": "1f348", "shortname": ":melon:", "aliases": "", "keywords": "melon fruit boobs food" }, "watermelon": { "unicode": "1f349", "shortname": ":watermelon:", "aliases": "", "keywords": "watermelon fruit food" }, "tangerine": { "unicode": "1f34a", "shortname": ":tangerine:", "aliases": "", "keywords": "tangerine fruit food" }, "lemon": { "unicode": "1f34b", "shortname": ":lemon:", "aliases": "", "keywords": "lemon fruit food" }, "banana": { "unicode": "1f34c", "shortname": ":banana:", "aliases": "", "keywords": "banana fruit penis food" }, "pineapple": { "unicode": "1f34d", "shortname": ":pineapple:", "aliases": "", "keywords": "pineapple fruit food tropical" }, "apple": { "unicode": "1f34e", "shortname": ":apple:", "aliases": "", "keywords": "red apple fruit food creationism" }, "green_apple": { "unicode": "1f34f", "shortname": ":green_apple:", "aliases": "", "keywords": "green apple fruit food" }, "pear": { "unicode": "1f350", "shortname": ":pear:", "aliases": "", "keywords": "pear fruit food" }, "peach": { "unicode": "1f351", "shortname": ":peach:", "aliases": "", "keywords": "peach fruit butt food" }, "cherries": { "unicode": "1f352", "shortname": ":cherries:", "aliases": "", "keywords": "cherries fruit food" }, "strawberry": { "unicode": "1f353", "shortname": ":strawberry:", "aliases": "", "keywords": "strawberry fruit food" }, "kiwi": { "unicode": "1f95d", "shortname": ":kiwi:", "aliases": ":kiwifruit:", "keywords": "kiwifruit" }, "tomato": { "unicode": "1f345", "shortname": ":tomato:", "aliases": "", "keywords": "tomato fruit vegetables food" }, "avocado": { "unicode": "1f951", "shortname": ":avocado:", "aliases": "", "keywords": "avocado" }, "eggplant": { "unicode": "1f346", "shortname": ":eggplant:", "aliases": "", "keywords": "aubergine vegetables penis food" }, "potato": { "unicode": "1f954", "shortname": ":potato:", "aliases": "", "keywords": "potato" }, "carrot": { "unicode": "1f955", "shortname": ":carrot:", "aliases": "", "keywords": "carrot" }, "corn": { "unicode": "1f33d", "shortname": ":corn:", "aliases": "", "keywords": "ear of maize vegetables food" }, "hot_pepper": { "unicode": "1f336", "shortname": ":hot_pepper:", "aliases": "", "keywords": "hot pepper vegetables food" }, "cucumber": { "unicode": "1f952", "shortname": ":cucumber:", "aliases": "", "keywords": "cucumber" }, "mushroom": { "unicode": "1f344", "shortname": ":mushroom:", "aliases": "", "keywords": "mushroom nature plant drugs" }, "peanuts": { "unicode": "1f95c", "shortname": ":peanuts:", "aliases": ":shelled_peanut:", "keywords": "peanuts" }, "chestnut": { "unicode": "1f330", "shortname": ":chestnut:", "aliases": "", "keywords": "chestnut nature plant" }, "bread": { "unicode": "1f35e", "shortname": ":bread:", "aliases": "", "keywords": "bread food" }, "croissant": { "unicode": "1f950", "shortname": ":croissant:", "aliases": "", "keywords": "croissant" }, "french_bread": { "unicode": "1f956", "shortname": ":french_bread:", "aliases": ":baguette_bread:", "keywords": "baguette bread" }, "pancakes": { "unicode": "1f95e", "shortname": ":pancakes:", "aliases": "", "keywords": "pancakes" }, "cheese": { "unicode": "1f9c0", "shortname": ":cheese:", "aliases": ":cheese_wedge:", "keywords": "cheese wedge food" }, "meat_on_bone": { "unicode": "1f356", "shortname": ":meat_on_bone:", "aliases": "", "keywords": "meat on bone food" }, "poultry_leg": { "unicode": "1f357", "shortname": ":poultry_leg:", "aliases": "", "keywords": "poultry leg food holidays" }, "bacon": { "unicode": "1f953", "shortname": ":bacon:", "aliases": "", "keywords": "bacon pig" }, "hamburger": { "unicode": "1f354", "shortname": ":hamburger:", "aliases": "", "keywords": "hamburger america food" }, "fries": { "unicode": "1f35f", "shortname": ":fries:", "aliases": "", "keywords": "french fries america food" }, "pizza": { "unicode": "1f355", "shortname": ":pizza:", "aliases": "", "keywords": "slice of pizza italian food boys night" }, "hotdog": { "unicode": "1f32d", "shortname": ":hotdog:", "aliases": ":hot_dog:", "keywords": "hot dog america food" }, "taco": { "unicode": "1f32e", "shortname": ":taco:", "aliases": "", "keywords": "taco food mexican vagina" }, "burrito": { "unicode": "1f32f", "shortname": ":burrito:", "aliases": "", "keywords": "burrito food mexican" }, "stuffed_flatbread": { "unicode": "1f959", "shortname": ":stuffed_flatbread:", "aliases": ":stuffed_pita:", "keywords": "stuffed flatbread" }, "egg": { "unicode": "1f95a", "shortname": ":egg:", "aliases": "", "keywords": "egg" }, "cooking": { "unicode": "1f373", "shortname": ":cooking:", "aliases": "", "keywords": "cooking food" }, "shallow_pan_of_food": { "unicode": "1f958", "shortname": ":shallow_pan_of_food:", "aliases": ":paella:", "keywords": "shallow pan of food pan of food" }, "stew": { "unicode": "1f372", "shortname": ":stew:", "aliases": "", "keywords": "pot of food food steam" }, "salad": { "unicode": "1f957", "shortname": ":salad:", "aliases": ":green_salad:", "keywords": "green salad" }, "popcorn": { "unicode": "1f37f", "shortname": ":popcorn:", "aliases": "", "keywords": "popcorn food parties" }, "bento": { "unicode": "1f371", "shortname": ":bento:", "aliases": "", "keywords": "bento box object sushi japan food" }, "rice_cracker": { "unicode": "1f358", "shortname": ":rice_cracker:", "aliases": "", "keywords": "rice cracker sushi food" }, "rice_ball": { "unicode": "1f359", "shortname": ":rice_ball:", "aliases": "", "keywords": "rice ball sushi japan food" }, "rice": { "unicode": "1f35a", "shortname": ":rice:", "aliases": "", "keywords": "cooked rice sushi japan food" }, "curry": { "unicode": "1f35b", "shortname": ":curry:", "aliases": "", "keywords": "curry and rice food" }, "ramen": { "unicode": "1f35c", "shortname": ":ramen:", "aliases": "", "keywords": "steaming bowl noodles ramen japan food" }, "spaghetti": { "unicode": "1f35d", "shortname": ":spaghetti:", "aliases": "", "keywords": "spaghetti noodles pasta italian food" }, "sweet_potato": { "unicode": "1f360", "shortname": ":sweet_potato:", "aliases": "", "keywords": "roasted sweet potato vegetables food" }, "oden": { "unicode": "1f362", "shortname": ":oden:", "aliases": "", "keywords": "oden food" }, "sushi": { "unicode": "1f363", "shortname": ":sushi:", "aliases": "", "keywords": "sushi sushi japan food" }, "fried_shrimp": { "unicode": "1f364", "shortname": ":fried_shrimp:", "aliases": "", "keywords": "fried shrimp food" }, "fish_cake": { "unicode": "1f365", "shortname": ":fish_cake:", "aliases": "", "keywords": "fish cake with swirl design sushi food" }, "dango": { "unicode": "1f361", "shortname": ":dango:", "aliases": "", "keywords": "dango food" }, "icecream": { "unicode": "1f366", "shortname": ":icecream:", "aliases": "", "keywords": "soft ice cream food" }, "shaved_ice": { "unicode": "1f367", "shortname": ":shaved_ice:", "aliases": "", "keywords": "shaved ice food" }, "ice_cream": { "unicode": "1f368", "shortname": ":ice_cream:", "aliases": "", "keywords": "ice cream food" }, "doughnut": { "unicode": "1f369", "shortname": ":doughnut:", "aliases": "", "keywords": "doughnut food" }, "cookie": { "unicode": "1f36a", "shortname": ":cookie:", "aliases": "", "keywords": "cookie food vagina" }, "birthday": { "unicode": "1f382", "shortname": ":birthday:", "aliases": "", "keywords": "birthday cake birthday food parties" }, "cake": { "unicode": "1f370", "shortname": ":cake:", "aliases": "", "keywords": "shortcake food" }, "chocolate_bar": { "unicode": "1f36b", "shortname": ":chocolate_bar:", "aliases": "", "keywords": "chocolate bar food halloween" }, "candy": { "unicode": "1f36c", "shortname": ":candy:", "aliases": "", "keywords": "candy food halloween" }, "lollipop": { "unicode": "1f36d", "shortname": ":lollipop:", "aliases": "", "keywords": "lollipop food halloween" }, "custard": { "unicode": "1f36e", "shortname": ":custard:", "aliases": ":pudding: :flan:", "keywords": "custard food" }, "honey_pot": { "unicode": "1f36f", "shortname": ":honey_pot:", "aliases": "", "keywords": "honey pot food vagina" }, "baby_bottle": { "unicode": "1f37c", "shortname": ":baby_bottle:", "aliases": "", "keywords": "baby bottle drink object food baby" }, "milk": { "unicode": "1f95b", "shortname": ":milk:", "aliases": ":glass_of_milk:", "keywords": "glass of milk" }, "coffee": { "unicode": "2615", "shortname": ":coffee:", "aliases": "", "keywords": "hot beverage drink caffeine steam morning" }, "tea": { "unicode": "1f375", "shortname": ":tea:", "aliases": "", "keywords": "teacup without handle drink japan caffeine steam morning" }, "sake": { "unicode": "1f376", "shortname": ":sake:", "aliases": "", "keywords": "sake bottle and cup drink japan sake alcohol girls night" }, "champagne": { "unicode": "1f37e", "shortname": ":champagne:", "aliases": ":bottle_with_popping_cork:", "keywords": "bottle with popping cork drink cheers alcohol parties" }, "wine_glass": { "unicode": "1f377", "shortname": ":wine_glass:", "aliases": "", "keywords": "wine glass drink italian alcohol girls night parties" }, "cocktail": { "unicode": "1f378", "shortname": ":cocktail:", "aliases": "", "keywords": "cocktail glass drink cocktail alcohol girls night parties" }, "tropical_drink": { "unicode": "1f379", "shortname": ":tropical_drink:", "aliases": "", "keywords": "tropical drink drink cocktail tropical alcohol" }, "beer": { "unicode": "1f37a", "shortname": ":beer:", "aliases": "", "keywords": "beer mug drink beer alcohol parties" }, "beers": { "unicode": "1f37b", "shortname": ":beers:", "aliases": "", "keywords": "clinking beer mugs drink cheers beer alcohol thank you boys night parties" }, "champagne_glass": { "unicode": "1f942", "shortname": ":champagne_glass:", "aliases": ":clinking_glass:", "keywords": "clinking glasses" }, "tumbler_glass": { "unicode": "1f943", "shortname": ":tumbler_glass:", "aliases": ":whisky:", "keywords": "tumbler glass booze" }, "fork_knife_plate": { "unicode": "1f37d", "shortname": ":fork_knife_plate:", "aliases": ":fork_and_knife_with_plate:", "keywords": "fork and knife with plate object food" }, "fork_and_knife": { "unicode": "1f374", "shortname": ":fork_and_knife:", "aliases": "", "keywords": "fork and knife object weapon food" }, "spoon": { "unicode": "1f944", "shortname": ":spoon:", "aliases": "", "keywords": "spoon" }, "knife": { "unicode": "1f52a", "shortname": ":knife:", "aliases": "", "keywords": "hocho object weapon" }, "amphora": { "unicode": "1f3fa", "shortname": ":amphora:", "aliases": "", "keywords": "amphora object" }, "earth_africa": { "unicode": "1f30d", "shortname": ":earth_africa:", "aliases": "", "keywords": "earth globe europe-africa map vacation globe" }, "earth_americas": { "unicode": "1f30e", "shortname": ":earth_americas:", "aliases": "", "keywords": "earth globe americas map vacation globe" }, "earth_asia": { "unicode": "1f30f", "shortname": ":earth_asia:", "aliases": "", "keywords": "earth globe asia-australia map vacation globe" }, "globe_with_meridians": { "unicode": "1f310", "shortname": ":globe_with_meridians:", "aliases": "", "keywords": "globe with meridians symbol globe" }, "map": { "unicode": "1f5fa", "shortname": ":map:", "aliases": ":world_map:", "keywords": "world map travel map vacation" }, "japan": { "unicode": "1f5fe", "shortname": ":japan:", "aliases": "", "keywords": "silhouette of japan places travel map vacation tropical" }, "mountain_snow": { "unicode": "1f3d4", "shortname": ":mountain_snow:", "aliases": ":snow_capped_mountain:", "keywords": "snow capped mountain places travel vacation cold camp" }, "mountain": { "unicode": "26f0", "shortname": ":mountain:", "aliases": "", "keywords": "mountain places travel vacation camp" }, "volcano": { "unicode": "1f30b", "shortname": ":volcano:", "aliases": "", "keywords": "volcano places tropical" }, "mount_fuji": { "unicode": "1f5fb", "shortname": ":mount_fuji:", "aliases": "", "keywords": "mount fuji places travel vacation cold camp" }, "camping": { "unicode": "1f3d5", "shortname": ":camping:", "aliases": "", "keywords": "camping places travel vacation camp" }, "beach": { "unicode": "1f3d6", "shortname": ":beach:", "aliases": ":beach_with_umbrella:", "keywords": "beach with umbrella places travel vacation tropical beach swim" }, "desert": { "unicode": "1f3dc", "shortname": ":desert:", "aliases": "", "keywords": "desert places travel vacation hot" }, "island": { "unicode": "1f3dd", "shortname": ":island:", "aliases": ":desert_island:", "keywords": "desert island places travel vacation tropical beach swim" }, "park": { "unicode": "1f3de", "shortname": ":park:", "aliases": ":national_park:", "keywords": "national park travel vacation park camp" }, "stadium": { "unicode": "1f3df", "shortname": ":stadium:", "aliases": "", "keywords": "stadium places building travel vacation boys night" }, "classical_building": { "unicode": "1f3db", "shortname": ":classical_building:", "aliases": "", "keywords": "classical building places building travel vacation" }, "construction_site": { "unicode": "1f3d7", "shortname": ":construction_site:", "aliases": ":building_construction:", "keywords": "building construction building crane" }, "homes": { "unicode": "1f3d8", "shortname": ":homes:", "aliases": ":house_buildings:", "keywords": "house buildings places building house" }, "cityscape": { "unicode": "1f3d9", "shortname": ":cityscape:", "aliases": "", "keywords": "cityscape places building vacation" }, "house_abandoned": { "unicode": "1f3da", "shortname": ":house_abandoned:", "aliases": ":derelict_house_building:", "keywords": "derelict house building places building house" }, "house": { "unicode": "1f3e0", "shortname": ":house:", "aliases": "", "keywords": "house building places building house" }, "house_with_garden": { "unicode": "1f3e1", "shortname": ":house_with_garden:", "aliases": "", "keywords": "house with garden places building house" }, "office": { "unicode": "1f3e2", "shortname": ":office:", "aliases": "", "keywords": "office building places building work" }, "post_office": { "unicode": "1f3e3", "shortname": ":post_office:", "aliases": "", "keywords": "japanese post office places building post office" }, "european_post_office": { "unicode": "1f3e4", "shortname": ":european_post_office:", "aliases": "", "keywords": "european post office places building post office" }, "hospital": { "unicode": "1f3e5", "shortname": ":hospital:", "aliases": "", "keywords": "hospital places building health 911" }, "bank": { "unicode": "1f3e6", "shortname": ":bank:", "aliases": "", "keywords": "bank places building" }, "hotel": { "unicode": "1f3e8", "shortname": ":hotel:", "aliases": "", "keywords": "hotel places building vacation" }, "love_hotel": { "unicode": "1f3e9", "shortname": ":love_hotel:", "aliases": "", "keywords": "love hotel places building love" }, "convenience_store": { "unicode": "1f3ea", "shortname": ":convenience_store:", "aliases": "", "keywords": "convenience store places building" }, "school": { "unicode": "1f3eb", "shortname": ":school:", "aliases": "", "keywords": "school places building" }, "department_store": { "unicode": "1f3ec", "shortname": ":department_store:", "aliases": "", "keywords": "department store places building" }, "factory": { "unicode": "1f3ed", "shortname": ":factory:", "aliases": "", "keywords": "factory places building travel steam" }, "japanese_castle": { "unicode": "1f3ef", "shortname": ":japanese_castle:", "aliases": "", "keywords": "japanese castle places building travel vacation" }, "european_castle": { "unicode": "1f3f0", "shortname": ":european_castle:", "aliases": "", "keywords": "european castle places building travel vacation" }, "wedding": { "unicode": "1f492", "shortname": ":wedding:", "aliases": "", "keywords": "wedding places wedding building love parties" }, "tokyo_tower": { "unicode": "1f5fc", "shortname": ":tokyo_tower:", "aliases": "", "keywords": "tokyo tower places travel vacation eiffel tower" }, "statue_of_liberty": { "unicode": "1f5fd", "shortname": ":statue_of_liberty:", "aliases": "", "keywords": "statue of liberty places america travel vacation statue of liberty free speech" }, "church": { "unicode": "26ea", "shortname": ":church:", "aliases": "", "keywords": "church places wedding religion building condolence" }, "mosque": { "unicode": "1f54c", "shortname": ":mosque:", "aliases": "", "keywords": "mosque places religion building vacation condolence" }, "synagogue": { "unicode": "1f54d", "shortname": ":synagogue:", "aliases": "", "keywords": "synagogue places religion building travel vacation condolence" }, "shinto_shrine": { "unicode": "26e9", "shortname": ":shinto_shrine:", "aliases": "", "keywords": "shinto shrine places building travel vacation" }, "kaaba": { "unicode": "1f54b", "shortname": ":kaaba:", "aliases": "", "keywords": "kaaba places religion building condolence" }, "fountain": { "unicode": "26f2", "shortname": ":fountain:", "aliases": "", "keywords": "fountain travel vacation" }, "tent": { "unicode": "26fa", "shortname": ":tent:", "aliases": "", "keywords": "tent places travel vacation camp" }, "foggy": { "unicode": "1f301", "shortname": ":foggy:", "aliases": "", "keywords": "foggy places building sky travel vacation" }, "night_with_stars": { "unicode": "1f303", "shortname": ":night_with_stars:", "aliases": "", "keywords": "night with stars places building sky vacation goodnight" }, "sunrise_over_mountains": { "unicode": "1f304", "shortname": ":sunrise_over_mountains:", "aliases": "", "keywords": "sunrise over mountains places sky travel vacation day sun camp morning" }, "sunrise": { "unicode": "1f305", "shortname": ":sunrise:", "aliases": "", "keywords": "sunrise places sky travel vacation tropical day sun hump day morning" }, "city_dusk": { "unicode": "1f306", "shortname": ":city_dusk:", "aliases": "", "keywords": "cityscape at dusk places building" }, "city_sunset": { "unicode": "1f307", "shortname": ":city_sunset:", "aliases": ":city_sunrise:", "keywords": "sunset over buildings places building sky vacation" }, "bridge_at_night": { "unicode": "1f309", "shortname": ":bridge_at_night:", "aliases": "", "keywords": "bridge at night places travel vacation goodnight" }, "hotsprings": { "unicode": "2668", "shortname": ":hotsprings:", "aliases": "", "keywords": "hot springs symbol" }, "milky_way": { "unicode": "1f30c", "shortname": ":milky_way:", "aliases": "", "keywords": "milky way places space sky travel vacation" }, "carousel_horse": { "unicode": "1f3a0", "shortname": ":carousel_horse:", "aliases": "", "keywords": "carousel horse places object vacation roller coaster carousel" }, "ferris_wheel": { "unicode": "1f3a1", "shortname": ":ferris_wheel:", "aliases": "", "keywords": "ferris wheel places vacation ferris wheel" }, "roller_coaster": { "unicode": "1f3a2", "shortname": ":roller_coaster:", "aliases": "", "keywords": "roller coaster places vacation roller coaster" }, "barber": { "unicode": "1f488", "shortname": ":barber:", "aliases": "", "keywords": "barber pole object" }, "circus_tent": { "unicode": "1f3aa", "shortname": ":circus_tent:", "aliases": "", "keywords": "circus tent circus tent" }, "performing_arts": { "unicode": "1f3ad", "shortname": ":performing_arts:", "aliases": "", "keywords": "performing arts theatre movie" }, "frame_photo": { "unicode": "1f5bc", "shortname": ":frame_photo:", "aliases": ":frame_with_picture:", "keywords": "frame with picture travel vacation" }, "art": { "unicode": "1f3a8", "shortname": ":art:", "aliases": "", "keywords": "artist palette" }, "slot_machine": { "unicode": "1f3b0", "shortname": ":slot_machine:", "aliases": "", "keywords": "slot machine game boys night" }, "steam_locomotive": { "unicode": "1f682", "shortname": ":steam_locomotive:", "aliases": "", "keywords": "steam locomotive transportation travel train steam" }, "railway_car": { "unicode": "1f683", "shortname": ":railway_car:", "aliases": "", "keywords": "railway car transportation travel train" }, "bullettrain_side": { "unicode": "1f684", "shortname": ":bullettrain_side:", "aliases": "", "keywords": "high-speed train transportation travel train" }, "bullettrain_front": { "unicode": "1f685", "shortname": ":bullettrain_front:", "aliases": "", "keywords": "high-speed train with bullet nose transportation travel train" }, "train2": { "unicode": "1f686", "shortname": ":train2:", "aliases": "", "keywords": "train transportation travel train" }, "metro": { "unicode": "1f687", "shortname": ":metro:", "aliases": "", "keywords": "metro transportation travel train" }, "light_rail": { "unicode": "1f688", "shortname": ":light_rail:", "aliases": "", "keywords": "light rail transportation travel train" }, "station": { "unicode": "1f689", "shortname": ":station:", "aliases": "", "keywords": "station transportation travel train" }, "tram": { "unicode": "1f68a", "shortname": ":tram:", "aliases": "", "keywords": "tram transportation travel train" }, "monorail": { "unicode": "1f69d", "shortname": ":monorail:", "aliases": "", "keywords": "monorail transportation travel train vacation" }, "mountain_railway": { "unicode": "1f69e", "shortname": ":mountain_railway:", "aliases": "", "keywords": "mountain railway transportation travel train" }, "train": { "unicode": "1f68b", "shortname": ":train:", "aliases": "", "keywords": "tram car transportation travel train" }, "bus": { "unicode": "1f68c", "shortname": ":bus:", "aliases": "", "keywords": "bus transportation bus office" }, "oncoming_bus": { "unicode": "1f68d", "shortname": ":oncoming_bus:", "aliases": "", "keywords": "oncoming bus transportation bus travel" }, "trolleybus": { "unicode": "1f68e", "shortname": ":trolleybus:", "aliases": "", "keywords": "trolleybus transportation bus travel" }, "minibus": { "unicode": "1f690", "shortname": ":minibus:", "aliases": "", "keywords": "minibus transportation bus" }, "ambulance": { "unicode": "1f691", "shortname": ":ambulance:", "aliases": "", "keywords": "ambulance transportation 911" }, "fire_engine": { "unicode": "1f692", "shortname": ":fire_engine:", "aliases": "", "keywords": "fire engine transportation truck 911" }, "police_car": { "unicode": "1f693", "shortname": ":police_car:", "aliases": "", "keywords": "police car transportation car police 911" }, "oncoming_police_car": { "unicode": "1f694", "shortname": ":oncoming_police_car:", "aliases": "", "keywords": "oncoming police car transportation car police 911" }, "taxi": { "unicode": "1f695", "shortname": ":taxi:", "aliases": "", "keywords": "taxi transportation car travel" }, "oncoming_taxi": { "unicode": "1f696", "shortname": ":oncoming_taxi:", "aliases": "", "keywords": "oncoming taxi transportation car travel" }, "red_car": { "unicode": "1f697", "shortname": ":red_car:", "aliases": "", "keywords": "automobile transportation car travel" }, "oncoming_automobile": { "unicode": "1f698", "shortname": ":oncoming_automobile:", "aliases": "", "keywords": "oncoming automobile transportation car travel" }, "blue_car": { "unicode": "1f699", "shortname": ":blue_car:", "aliases": "", "keywords": "recreational vehicle transportation car travel" }, "truck": { "unicode": "1f69a", "shortname": ":truck:", "aliases": "", "keywords": "delivery truck transportation truck" }, "articulated_lorry": { "unicode": "1f69b", "shortname": ":articulated_lorry:", "aliases": "", "keywords": "articulated lorry transportation truck" }, "tractor": { "unicode": "1f69c", "shortname": ":tractor:", "aliases": "", "keywords": "tractor transportation" }, "bike": { "unicode": "1f6b2", "shortname": ":bike:", "aliases": "", "keywords": "bicycle transportation travel bike" }, "scooter": { "unicode": "1f6f4", "shortname": ":scooter:", "aliases": "", "keywords": "scooter" }, "motor_scooter": { "unicode": "1f6f5", "shortname": ":motor_scooter:", "aliases": ":motorbike:", "keywords": "motor scooter moped" }, "busstop": { "unicode": "1f68f", "shortname": ":busstop:", "aliases": "", "keywords": "bus stop object" }, "motorway": { "unicode": "1f6e3", "shortname": ":motorway:", "aliases": "", "keywords": "motorway travel vacation camp" }, "railway_track": { "unicode": "1f6e4", "shortname": ":railway_track:", "aliases": ":railroad_track:", "keywords": "railway track travel train vacation" }, "fuelpump": { "unicode": "26fd", "shortname": ":fuelpump:", "aliases": "", "keywords": "fuel pump object gas pump" }, "rotating_light": { "unicode": "1f6a8", "shortname": ":rotating_light:", "aliases": "", "keywords": "police cars revolving light transportation object police 911" }, "traffic_light": { "unicode": "1f6a5", "shortname": ":traffic_light:", "aliases": "", "keywords": "horizontal traffic light object stop light" }, "vertical_traffic_light": { "unicode": "1f6a6", "shortname": ":vertical_traffic_light:", "aliases": "", "keywords": "vertical traffic light object stop light" }, "construction": { "unicode": "1f6a7", "shortname": ":construction:", "aliases": "", "keywords": "construction sign object" }, "octagonal_sign": { "unicode": "1f6d1", "shortname": ":octagonal_sign:", "aliases": ":stop_sign:", "keywords": "octagonal sign" }, "anchor": { "unicode": "2693", "shortname": ":anchor:", "aliases": "", "keywords": "anchor object travel boat vacation" }, "sailboat": { "unicode": "26f5", "shortname": ":sailboat:", "aliases": "", "keywords": "sailboat transportation travel boat vacation" }, "canoe": { "unicode": "1f6f6", "shortname": ":canoe:", "aliases": ":kayak:", "keywords": "canoe" }, "speedboat": { "unicode": "1f6a4", "shortname": ":speedboat:", "aliases": "", "keywords": "speedboat transportation travel boat vacation tropical" }, "cruise_ship": { "unicode": "1f6f3", "shortname": ":cruise_ship:", "aliases": ":passenger_ship:", "keywords": "passenger ship transportation travel boat vacation" }, "ferry": { "unicode": "26f4", "shortname": ":ferry:", "aliases": "", "keywords": "ferry transportation travel boat vacation" }, "motorboat": { "unicode": "1f6e5", "shortname": ":motorboat:", "aliases": "", "keywords": "motorboat transportation travel boat" }, "ship": { "unicode": "1f6a2", "shortname": ":ship:", "aliases": "", "keywords": "ship transportation travel boat vacation" }, "airplane": { "unicode": "2708", "shortname": ":airplane:", "aliases": "", "keywords": "airplane transportation plane travel vacation fly" }, "airplane_small": { "unicode": "1f6e9", "shortname": ":airplane_small:", "aliases": ":small_airplane:", "keywords": "small airplane transportation plane travel vacation fly" }, "airplane_departure": { "unicode": "1f6eb", "shortname": ":airplane_departure:", "aliases": "", "keywords": "airplane departure transportation plane travel vacation fly" }, "airplane_arriving": { "unicode": "1f6ec", "shortname": ":airplane_arriving:", "aliases": "", "keywords": "airplane arriving transportation plane travel vacation fly" }, "seat": { "unicode": "1f4ba", "shortname": ":seat:", "aliases": "", "keywords": "seat transportation object travel vacation" }, "helicopter": { "unicode": "1f681", "shortname": ":helicopter:", "aliases": "", "keywords": "helicopter transportation plane travel fly" }, "suspension_railway": { "unicode": "1f69f", "shortname": ":suspension_railway:", "aliases": "", "keywords": "suspension railway transportation travel train" }, "mountain_cableway": { "unicode": "1f6a0", "shortname": ":mountain_cableway:", "aliases": "", "keywords": "mountain cableway transportation travel train" }, "aerial_tramway": { "unicode": "1f6a1", "shortname": ":aerial_tramway:", "aliases": "", "keywords": "aerial tramway transportation travel train" }, "rocket": { "unicode": "1f680", "shortname": ":rocket:", "aliases": "", "keywords": "rocket transportation object space fly blast" }, "satellite_orbital": { "unicode": "1f6f0", "shortname": ":satellite_orbital:", "aliases": "", "keywords": "satellite object" }, "bellhop": { "unicode": "1f6ce", "shortname": ":bellhop:", "aliases": ":bellhop_bell:", "keywords": "bellhop bell object" }, "door": { "unicode": "1f6aa", "shortname": ":door:", "aliases": "", "keywords": "door object" }, "sleeping_accommodation": { "unicode": "1f6cc", "shortname": ":sleeping_accommodation:", "aliases": "", "keywords": "sleeping accommodation tired" }, "bed": { "unicode": "1f6cf", "shortname": ":bed:", "aliases": "", "keywords": "bed object tired" }, "couch": { "unicode": "1f6cb", "shortname": ":couch:", "aliases": ":couch_and_lamp:", "keywords": "couch and lamp object" }, "toilet": { "unicode": "1f6bd", "shortname": ":toilet:", "aliases": "", "keywords": "toilet object bathroom" }, "shower": { "unicode": "1f6bf", "shortname": ":shower:", "aliases": "", "keywords": "shower object bathroom" }, "bath": { "unicode": "1f6c0", "shortname": ":bath:", "aliases": "", "keywords": "bath bathroom tired diversity steam" }, "bath_tone1": { "unicode": "1f6c0-1f3fb", "shortname": ":bath_tone1:", "aliases": "", "keywords": "bath tone 1" }, "bath_tone2": { "unicode": "1f6c0-1f3fc", "shortname": ":bath_tone2:", "aliases": "", "keywords": "bath tone 2" }, "bath_tone3": { "unicode": "1f6c0-1f3fd", "shortname": ":bath_tone3:", "aliases": "", "keywords": "bath tone 3" }, "bath_tone4": { "unicode": "1f6c0-1f3fe", "shortname": ":bath_tone4:", "aliases": "", "keywords": "bath tone 4" }, "bath_tone5": { "unicode": "1f6c0-1f3ff", "shortname": ":bath_tone5:", "aliases": "", "keywords": "bath tone 5" }, "bathtub": { "unicode": "1f6c1", "shortname": ":bathtub:", "aliases": "", "keywords": "bathtub object bathroom tired steam" }, "hourglass": { "unicode": "231b", "shortname": ":hourglass:", "aliases": "", "keywords": "hourglass object time" }, "hourglass_flowing_sand": { "unicode": "23f3", "shortname": ":hourglass_flowing_sand:", "aliases": "", "keywords": "hourglass with flowing sand object time" }, "watch": { "unicode": "231a", "shortname": ":watch:", "aliases": "", "keywords": "watch electronics time" }, "alarm_clock": { "unicode": "23f0", "shortname": ":alarm_clock:", "aliases": "", "keywords": "alarm clock object time" }, "stopwatch": { "unicode": "23f1", "shortname": ":stopwatch:", "aliases": "", "keywords": "stopwatch electronics time" }, "timer": { "unicode": "23f2", "shortname": ":timer:", "aliases": ":timer_clock:", "keywords": "timer clock object time" }, "clock": { "unicode": "1f570", "shortname": ":clock:", "aliases": ":mantlepiece_clock:", "keywords": "mantlepiece clock object time" }, "clock12": { "unicode": "1f55b", "shortname": ":clock12:", "aliases": "", "keywords": "clock face twelve oclock symbol time" }, "clock1230": { "unicode": "1f567", "shortname": ":clock1230:", "aliases": "", "keywords": "clock face twelve-thirty symbol time" }, "clock1": { "unicode": "1f550", "shortname": ":clock1:", "aliases": "", "keywords": "clock face one oclock symbol time" }, "clock130": { "unicode": "1f55c", "shortname": ":clock130:", "aliases": "", "keywords": "clock face one-thirty symbol time" }, "clock2": { "unicode": "1f551", "shortname": ":clock2:", "aliases": "", "keywords": "clock face two oclock symbol time" }, "clock230": { "unicode": "1f55d", "shortname": ":clock230:", "aliases": "", "keywords": "clock face two-thirty symbol time" }, "clock3": { "unicode": "1f552", "shortname": ":clock3:", "aliases": "", "keywords": "clock face three oclock symbol time" }, "clock330": { "unicode": "1f55e", "shortname": ":clock330:", "aliases": "", "keywords": "clock face three-thirty symbol time" }, "clock4": { "unicode": "1f553", "shortname": ":clock4:", "aliases": "", "keywords": "clock face four oclock symbol time" }, "clock430": { "unicode": "1f55f", "shortname": ":clock430:", "aliases": "", "keywords": "clock face four-thirty symbol time" }, "clock5": { "unicode": "1f554", "shortname": ":clock5:", "aliases": "", "keywords": "clock face five oclock symbol time" }, "clock530": { "unicode": "1f560", "shortname": ":clock530:", "aliases": "", "keywords": "clock face five-thirty symbol time" }, "clock6": { "unicode": "1f555", "shortname": ":clock6:", "aliases": "", "keywords": "clock face six oclock symbol time" }, "clock630": { "unicode": "1f561", "shortname": ":clock630:", "aliases": "", "keywords": "clock face six-thirty symbol time" }, "clock7": { "unicode": "1f556", "shortname": ":clock7:", "aliases": "", "keywords": "clock face seven oclock symbol time" }, "clock730": { "unicode": "1f562", "shortname": ":clock730:", "aliases": "", "keywords": "clock face seven-thirty symbol time" }, "clock8": { "unicode": "1f557", "shortname": ":clock8:", "aliases": "", "keywords": "clock face eight oclock symbol time" }, "clock830": { "unicode": "1f563", "shortname": ":clock830:", "aliases": "", "keywords": "clock face eight-thirty symbol time" }, "clock9": { "unicode": "1f558", "shortname": ":clock9:", "aliases": "", "keywords": "clock face nine oclock symbol time" }, "clock930": { "unicode": "1f564", "shortname": ":clock930:", "aliases": "", "keywords": "clock face nine-thirty symbol time" }, "clock10": { "unicode": "1f559", "shortname": ":clock10:", "aliases": "", "keywords": "clock face ten oclock symbol time" }, "clock1030": { "unicode": "1f565", "shortname": ":clock1030:", "aliases": "", "keywords": "clock face ten-thirty symbol time" }, "clock11": { "unicode": "1f55a", "shortname": ":clock11:", "aliases": "", "keywords": "clock face eleven oclock symbol time" }, "clock1130": { "unicode": "1f566", "shortname": ":clock1130:", "aliases": "", "keywords": "clock face eleven-thirty symbol time" }, "new_moon": { "unicode": "1f311", "shortname": ":new_moon:", "aliases": "", "keywords": "new moon symbol space sky moon" }, "waxing_crescent_moon": { "unicode": "1f312", "shortname": ":waxing_crescent_moon:", "aliases": "", "keywords": "waxing crescent moon symbol space sky moon" }, "first_quarter_moon": { "unicode": "1f313", "shortname": ":first_quarter_moon:", "aliases": "", "keywords": "first quarter moon symbol space sky moon" }, "waxing_gibbous_moon": { "unicode": "1f314", "shortname": ":waxing_gibbous_moon:", "aliases": "", "keywords": "waxing gibbous moon symbol space sky moon" }, "full_moon": { "unicode": "1f315", "shortname": ":full_moon:", "aliases": "", "keywords": "full moon symbol space sky moon" }, "waning_gibbous_moon": { "unicode": "1f316", "shortname": ":waning_gibbous_moon:", "aliases": "", "keywords": "waning gibbous moon symbol space sky moon" }, "last_quarter_moon": { "unicode": "1f317", "shortname": ":last_quarter_moon:", "aliases": "", "keywords": "last quarter moon symbol space sky moon" }, "waning_crescent_moon": { "unicode": "1f318", "shortname": ":waning_crescent_moon:", "aliases": "", "keywords": "waning crescent moon symbol space sky moon" }, "crescent_moon": { "unicode": "1f319", "shortname": ":crescent_moon:", "aliases": "", "keywords": "crescent moon space sky goodnight moon" }, "new_moon_with_face": { "unicode": "1f31a", "shortname": ":new_moon_with_face:", "aliases": "", "keywords": "new moon with face space sky goodnight moon" }, "first_quarter_moon_with_face": { "unicode": "1f31b", "shortname": ":first_quarter_moon_with_face:", "aliases": "", "keywords": "first quarter moon with face space sky moon" }, "last_quarter_moon_with_face": { "unicode": "1f31c", "shortname": ":last_quarter_moon_with_face:", "aliases": "", "keywords": "last quarter moon with face space sky moon" }, "thermometer": { "unicode": "1f321", "shortname": ":thermometer:", "aliases": "", "keywords": "thermometer object science health hot" }, "sunny": { "unicode": "2600", "shortname": ":sunny:", "aliases": "", "keywords": "black sun with rays weather sky day sun hot morning" }, "full_moon_with_face": { "unicode": "1f31d", "shortname": ":full_moon_with_face:", "aliases": "", "keywords": "full moon with face space sky goodnight moon" }, "sun_with_face": { "unicode": "1f31e", "shortname": ":sun_with_face:", "aliases": "", "keywords": "sun with face sky day sun hump day morning" }, "star": { "unicode": "2b50", "shortname": ":star:", "aliases": "", "keywords": "white medium star space sky star" }, "star2": { "unicode": "1f31f", "shortname": ":star2:", "aliases": "", "keywords": "glowing star space sky star" }, "stars": { "unicode": "1f320", "shortname": ":stars:", "aliases": "", "keywords": "shooting star space" }, "cloud": { "unicode": "2601", "shortname": ":cloud:", "aliases": "", "keywords": "cloud weather sky cloud cold rain" }, "partly_sunny": { "unicode": "26c5", "shortname": ":partly_sunny:", "aliases": "", "keywords": "sun behind cloud weather sky cloud sun" }, "thunder_cloud_rain": { "unicode": "26c8", "shortname": ":thunder_cloud_rain:", "aliases": ":thunder_cloud_and_rain:", "keywords": "thunder cloud and rain weather sky cloud cold rain" }, "white_sun_small_cloud": { "unicode": "1f324", "shortname": ":white_sun_small_cloud:", "aliases": ":white_sun_with_small_cloud:", "keywords": "white sun with small cloud weather sky cloud sun" }, "white_sun_cloud": { "unicode": "1f325", "shortname": ":white_sun_cloud:", "aliases": ":white_sun_behind_cloud:", "keywords": "white sun behind cloud weather sky cloud cold sun" }, "white_sun_rain_cloud": { "unicode": "1f326", "shortname": ":white_sun_rain_cloud:", "aliases": ":white_sun_behind_cloud_with_rain:", "keywords": "white sun behind cloud with rain weather sky cloud cold rain sun" }, "cloud_rain": { "unicode": "1f327", "shortname": ":cloud_rain:", "aliases": ":cloud_with_rain:", "keywords": "cloud with rain weather winter sky cloud cold rain" }, "cloud_snow": { "unicode": "1f328", "shortname": ":cloud_snow:", "aliases": ":cloud_with_snow:", "keywords": "cloud with snow weather winter sky cloud cold snow" }, "cloud_lightning": { "unicode": "1f329", "shortname": ":cloud_lightning:", "aliases": ":cloud_with_lightning:", "keywords": "cloud with lightning weather sky cloud cold rain" }, "cloud_tornado": { "unicode": "1f32a", "shortname": ":cloud_tornado:", "aliases": ":cloud_with_tornado:", "keywords": "cloud with tornado weather sky cold" }, "fog": { "unicode": "1f32b", "shortname": ":fog:", "aliases": "", "keywords": "fog weather sky cold" }, "wind_blowing_face": { "unicode": "1f32c", "shortname": ":wind_blowing_face:", "aliases": "", "keywords": "wind blowing face weather cold" }, "cyclone": { "unicode": "1f300", "shortname": ":cyclone:", "aliases": "", "keywords": "cyclone symbol drugs" }, "rainbow": { "unicode": "1f308", "shortname": ":rainbow:", "aliases": "", "keywords": "rainbow weather gay sky rain" }, "closed_umbrella": { "unicode": "1f302", "shortname": ":closed_umbrella:", "aliases": "", "keywords": "closed umbrella object sky rain accessories" }, "umbrella2": { "unicode": "2602", "shortname": ":umbrella2:", "aliases": "", "keywords": "umbrella weather object sky cold" }, "umbrella": { "unicode": "2614", "shortname": ":umbrella:", "aliases": "", "keywords": "umbrella with rain drops weather sky cold rain" }, "beach_umbrella": { "unicode": "26f1", "shortname": ":beach_umbrella:", "aliases": ":umbrella_on_ground:", "keywords": "umbrella on ground travel vacation tropical" }, "zap": { "unicode": "26a1", "shortname": ":zap:", "aliases": "", "keywords": "high voltage sign weather sky diarrhea" }, "snowflake": { "unicode": "2744", "shortname": ":snowflake:", "aliases": "", "keywords": "snowflake weather winter sky holidays cold snow" }, "snowman2": { "unicode": "2603", "shortname": ":snowman2:", "aliases": "", "keywords": "snowman weather winter holidays christmas cold snow" }, "snowman": { "unicode": "26c4", "shortname": ":snowman:", "aliases": "", "keywords": "snowman without snow weather winter holidays cold snow" }, "comet": { "unicode": "2604", "shortname": ":comet:", "aliases": "", "keywords": "comet space sky" }, "fire": { "unicode": "1f525", "shortname": ":fire:", "aliases": ":flame:", "keywords": "fire wth hot" }, "droplet": { "unicode": "1f4a7", "shortname": ":droplet:", "aliases": "", "keywords": "droplet weather sky rain" }, "ocean": { "unicode": "1f30a", "shortname": ":ocean:", "aliases": "", "keywords": "water wave weather boat tropical swim" }, "jack_o_lantern": { "unicode": "1f383", "shortname": ":jack_o_lantern:", "aliases": "", "keywords": "jack-o-lantern holidays halloween" }, "christmas_tree": { "unicode": "1f384", "shortname": ":christmas_tree:", "aliases": "", "keywords": "christmas tree plant holidays christmas trees" }, "fireworks": { "unicode": "1f386", "shortname": ":fireworks:", "aliases": "", "keywords": "fireworks parties" }, "sparkler": { "unicode": "1f387", "shortname": ":sparkler:", "aliases": "", "keywords": "firework sparkler parties" }, "sparkles": { "unicode": "2728", "shortname": ":sparkles:", "aliases": "", "keywords": "sparkles star girls night" }, "balloon": { "unicode": "1f388", "shortname": ":balloon:", "aliases": "", "keywords": "balloon object birthday good parties" }, "tada": { "unicode": "1f389", "shortname": ":tada:", "aliases": "", "keywords": "party popper object birthday holidays cheers good girls night boys night parties" }, "confetti_ball": { "unicode": "1f38a", "shortname": ":confetti_ball:", "aliases": "", "keywords": "confetti ball object birthday holidays cheers girls night boys night parties" }, "tanabata_tree": { "unicode": "1f38b", "shortname": ":tanabata_tree:", "aliases": "", "keywords": "tanabata tree nature plant trees" }, "bamboo": { "unicode": "1f38d", "shortname": ":bamboo:", "aliases": "", "keywords": "pine decoration nature plant" }, "dolls": { "unicode": "1f38e", "shortname": ":dolls:", "aliases": "", "keywords": "japanese dolls people japan" }, "flags": { "unicode": "1f38f", "shortname": ":flags:", "aliases": "", "keywords": "carp streamer object japan" }, "wind_chime": { "unicode": "1f390", "shortname": ":wind_chime:", "aliases": "", "keywords": "wind chime object japan" }, "rice_scene": { "unicode": "1f391", "shortname": ":rice_scene:", "aliases": "", "keywords": "moon viewing ceremony places space sky travel" }, "ribbon": { "unicode": "1f380", "shortname": ":ribbon:", "aliases": "", "keywords": "ribbon object gift birthday" }, "gift": { "unicode": "1f381", "shortname": ":gift:", "aliases": "", "keywords": "wrapped present object gift birthday holidays christmas parties" }, "reminder_ribbon": { "unicode": "1f397", "shortname": ":reminder_ribbon:", "aliases": "", "keywords": "reminder ribbon award" }, "tickets": { "unicode": "1f39f", "shortname": ":tickets:", "aliases": ":admission_tickets:", "keywords": "admission tickets theatre movie parties" }, "ticket": { "unicode": "1f3ab", "shortname": ":ticket:", "aliases": "", "keywords": "ticket theatre movie parties" }, "military_medal": { "unicode": "1f396", "shortname": ":military_medal:", "aliases": "", "keywords": "military medal object award win" }, "trophy": { "unicode": "1f3c6", "shortname": ":trophy:", "aliases": "", "keywords": "trophy object game award win perfect parties" }, "medal": { "unicode": "1f3c5", "shortname": ":medal:", "aliases": ":sports_medal:", "keywords": "sports medal object award sport win perfect" }, "first_place": { "unicode": "1f947", "shortname": ":first_place:", "aliases": ":first_place_medal:", "keywords": "first place medal" }, "second_place": { "unicode": "1f948", "shortname": ":second_place:", "aliases": ":second_place_medal:", "keywords": "second place medal" }, "third_place": { "unicode": "1f949", "shortname": ":third_place:", "aliases": ":third_place_medal:", "keywords": "third place medal" }, "soccer": { "unicode": "26bd", "shortname": ":soccer:", "aliases": "", "keywords": "soccer ball game ball sport soccer football" }, "baseball": { "unicode": "26be", "shortname": ":baseball:", "aliases": "", "keywords": "baseball game ball sport baseball" }, "basketball": { "unicode": "1f3c0", "shortname": ":basketball:", "aliases": "", "keywords": "basketball and hoop game ball sport basketball" }, "volleyball": { "unicode": "1f3d0", "shortname": ":volleyball:", "aliases": "", "keywords": "volleyball game ball sport volleyball" }, "football": { "unicode": "1f3c8", "shortname": ":football:", "aliases": "", "keywords": "american football america game ball sport football" }, "rugby_football": { "unicode": "1f3c9", "shortname": ":rugby_football:", "aliases": "", "keywords": "rugby football game sport football" }, "tennis": { "unicode": "1f3be", "shortname": ":tennis:", "aliases": "", "keywords": "tennis racquet and ball game ball sport tennis" }, "8ball": { "unicode": "1f3b1", "shortname": ":8ball:", "aliases": "", "keywords": "billiards game ball sport billiards luck boys night" }, "bowling": { "unicode": "1f3b3", "shortname": ":bowling:", "aliases": "", "keywords": "bowling game ball sport boys night" }, "cricket": { "unicode": "1f3cf", "shortname": ":cricket:", "aliases": ":cricket_bat_ball:", "keywords": "cricket bat and ball ball sport cricket" }, "field_hockey": { "unicode": "1f3d1", "shortname": ":field_hockey:", "aliases": "", "keywords": "field hockey stick and ball ball sport hockey" }, "hockey": { "unicode": "1f3d2", "shortname": ":hockey:", "aliases": "", "keywords": "ice hockey stick and puck game sport hockey" }, "ping_pong": { "unicode": "1f3d3", "shortname": ":ping_pong:", "aliases": ":table_tennis:", "keywords": "table tennis paddle and ball game ball sport ping pong" }, "badminton": { "unicode": "1f3f8", "shortname": ":badminton:", "aliases": "", "keywords": "badminton racquet game sport badminton" }, "boxing_glove": { "unicode": "1f94a", "shortname": ":boxing_glove:", "aliases": ":boxing_gloves:", "keywords": "boxing glove" }, "martial_arts_uniform": { "unicode": "1f94b", "shortname": ":martial_arts_uniform:", "aliases": ":karate_uniform:", "keywords": "martial arts uniform" }, "goal": { "unicode": "1f945", "shortname": ":goal:", "aliases": ":goal_net:", "keywords": "goal net" }, "dart": { "unicode": "1f3af", "shortname": ":dart:", "aliases": "", "keywords": "direct hit game sport boys night" }, "golf": { "unicode": "26f3", "shortname": ":golf:", "aliases": "", "keywords": "flag in hole game ball vacation sport golf" }, "ice_skate": { "unicode": "26f8", "shortname": ":ice_skate:", "aliases": "", "keywords": "ice skate cold sport ice skating" }, "fishing_pole_and_fish": { "unicode": "1f3a3", "shortname": ":fishing_pole_and_fish:", "aliases": "", "keywords": "fishing pole and fish vacation sport fishing" }, "running_shirt_with_sash": { "unicode": "1f3bd", "shortname": ":running_shirt_with_sash:", "aliases": "", "keywords": "running shirt with sash award" }, "ski": { "unicode": "1f3bf", "shortname": ":ski:", "aliases": "", "keywords": "ski and ski boot cold sport skiing" }, "video_game": { "unicode": "1f3ae", "shortname": ":video_game:", "aliases": "", "keywords": "video game electronics game boys night" }, "joystick": { "unicode": "1f579", "shortname": ":joystick:", "aliases": "", "keywords": "joystick electronics game boys night" }, "game_die": { "unicode": "1f3b2", "shortname": ":game_die:", "aliases": "", "keywords": "game die object game boys night" }, "spades": { "unicode": "2660", "shortname": ":spades:", "aliases": "", "keywords": "black spade suit symbol game" }, "hearts": { "unicode": "2665", "shortname": ":hearts:", "aliases": "", "keywords": "black heart suit love symbol game" }, "diamonds": { "unicode": "2666", "shortname": ":diamonds:", "aliases": "", "keywords": "black diamond suit shapes symbol game" }, "clubs": { "unicode": "2663", "shortname": ":clubs:", "aliases": "", "keywords": "black club suit symbol game" }, "black_joker": { "unicode": "1f0cf", "shortname": ":black_joker:", "aliases": "", "keywords": "playing card black joker object symbol game" }, "mahjong": { "unicode": "1f004", "shortname": ":mahjong:", "aliases": "", "keywords": "mahjong tile red dragon object symbol game" }, "flower_playing_cards": { "unicode": "1f3b4", "shortname": ":flower_playing_cards:", "aliases": "", "keywords": "flower playing cards object symbol" }, "mute": { "unicode": "1f507", "shortname": ":mute:", "aliases": "", "keywords": "speaker with cancellation stroke alarm symbol" }, "speaker": { "unicode": "1f508", "shortname": ":speaker:", "aliases": "", "keywords": "speaker alarm symbol" }, "sound": { "unicode": "1f509", "shortname": ":sound:", "aliases": "", "keywords": "speaker with one sound wave alarm symbol" }, "loud_sound": { "unicode": "1f50a", "shortname": ":loud_sound:", "aliases": "", "keywords": "speaker with three sound waves alarm symbol" }, "loudspeaker": { "unicode": "1f4e2", "shortname": ":loudspeaker:", "aliases": "", "keywords": "public address loudspeaker object alarm symbol" }, "mega": { "unicode": "1f4e3", "shortname": ":mega:", "aliases": "", "keywords": "cheering megaphone object sport" }, "postal_horn": { "unicode": "1f4ef", "shortname": ":postal_horn:", "aliases": "", "keywords": "postal horn object" }, "bell": { "unicode": "1f514", "shortname": ":bell:", "aliases": "", "keywords": "bell object alarm symbol" }, "no_bell": { "unicode": "1f515", "shortname": ":no_bell:", "aliases": "", "keywords": "bell with cancellation stroke alarm symbol" }, "musical_score": { "unicode": "1f3bc", "shortname": ":musical_score:", "aliases": "", "keywords": "musical score instruments" }, "musical_note": { "unicode": "1f3b5", "shortname": ":musical_note:", "aliases": "", "keywords": "musical note instruments symbol" }, "notes": { "unicode": "1f3b6", "shortname": ":notes:", "aliases": "", "keywords": "multiple musical notes instruments symbol" }, "microphone2": { "unicode": "1f399", "shortname": ":microphone2:", "aliases": ":studio_microphone:", "keywords": "studio microphone electronics object" }, "level_slider": { "unicode": "1f39a", "shortname": ":level_slider:", "aliases": "", "keywords": "level slider" }, "control_knobs": { "unicode": "1f39b", "shortname": ":control_knobs:", "aliases": "", "keywords": "control knobs time" }, "microphone": { "unicode": "1f3a4", "shortname": ":microphone:", "aliases": "", "keywords": "microphone instruments" }, "headphones": { "unicode": "1f3a7", "shortname": ":headphones:", "aliases": "", "keywords": "headphone instruments" }, "radio": { "unicode": "1f4fb", "shortname": ":radio:", "aliases": "", "keywords": "radio electronics" }, "saxophone": { "unicode": "1f3b7", "shortname": ":saxophone:", "aliases": "", "keywords": "saxophone instruments" }, "guitar": { "unicode": "1f3b8", "shortname": ":guitar:", "aliases": "", "keywords": "guitar instruments" }, "musical_keyboard": { "unicode": "1f3b9", "shortname": ":musical_keyboard:", "aliases": "", "keywords": "musical keyboard instruments" }, "trumpet": { "unicode": "1f3ba", "shortname": ":trumpet:", "aliases": "", "keywords": "trumpet instruments" }, "violin": { "unicode": "1f3bb", "shortname": ":violin:", "aliases": "", "keywords": "violin instruments sarcastic" }, "drum": { "unicode": "1f941", "shortname": ":drum:", "aliases": ":drum_with_drumsticks:", "keywords": "drum with drumsticks" }, "iphone": { "unicode": "1f4f1", "shortname": ":iphone:", "aliases": "", "keywords": "mobile phone electronics phone selfie" }, "calling": { "unicode": "1f4f2", "shortname": ":calling:", "aliases": "", "keywords": "mobile phone with rightwards arrow at left electronics phone selfie" }, "telephone": { "unicode": "260e", "shortname": ":telephone:", "aliases": "", "keywords": "black telephone electronics phone" }, "telephone_receiver": { "unicode": "1f4de", "shortname": ":telephone_receiver:", "aliases": "", "keywords": "telephone receiver electronics phone" }, "pager": { "unicode": "1f4df", "shortname": ":pager:", "aliases": "", "keywords": "pager electronics work" }, "fax": { "unicode": "1f4e0", "shortname": ":fax:", "aliases": "", "keywords": "fax machine electronics work office" }, "battery": { "unicode": "1f50b", "shortname": ":battery:", "aliases": "", "keywords": "battery object" }, "electric_plug": { "unicode": "1f50c", "shortname": ":electric_plug:", "aliases": "", "keywords": "electric plug electronics" }, "computer": { "unicode": "1f4bb", "shortname": ":computer:", "aliases": "", "keywords": "personal computer electronics work office" }, "desktop": { "unicode": "1f5a5", "shortname": ":desktop:", "aliases": ":desktop_computer:", "keywords": "desktop computer electronics work" }, "printer": { "unicode": "1f5a8", "shortname": ":printer:", "aliases": "", "keywords": "printer electronics work office" }, "keyboard": { "unicode": "2328", "shortname": ":keyboard:", "aliases": "", "keywords": "keyboard electronics work office" }, "mouse_three_button": { "unicode": "1f5b1", "shortname": ":mouse_three_button:", "aliases": ":three_button_mouse:", "keywords": "three button mouse electronics work game office" }, "trackball": { "unicode": "1f5b2", "shortname": ":trackball:", "aliases": "", "keywords": "trackball electronics work game office" }, "minidisc": { "unicode": "1f4bd", "shortname": ":minidisc:", "aliases": "", "keywords": "minidisc electronics" }, "floppy_disk": { "unicode": "1f4be", "shortname": ":floppy_disk:", "aliases": "", "keywords": "floppy disk electronics office" }, "cd": { "unicode": "1f4bf", "shortname": ":cd:", "aliases": "", "keywords": "optical disc electronics" }, "dvd": { "unicode": "1f4c0", "shortname": ":dvd:", "aliases": "", "keywords": "dvd electronics" }, "movie_camera": { "unicode": "1f3a5", "shortname": ":movie_camera:", "aliases": "", "keywords": "movie camera object camera movie" }, "film_frames": { "unicode": "1f39e", "shortname": ":film_frames:", "aliases": "", "keywords": "film frames object camera movie" }, "projector": { "unicode": "1f4fd", "shortname": ":projector:", "aliases": ":film_projector:", "keywords": "film projector object camera movie" }, "clapper": { "unicode": "1f3ac", "shortname": ":clapper:", "aliases": "", "keywords": "clapper board movie" }, "tv": { "unicode": "1f4fa", "shortname": ":tv:", "aliases": "", "keywords": "television electronics" }, "camera": { "unicode": "1f4f7", "shortname": ":camera:", "aliases": "", "keywords": "camera electronics camera selfie" }, "camera_with_flash": { "unicode": "1f4f8", "shortname": ":camera_with_flash:", "aliases": "", "keywords": "camera with flash electronics camera" }, "video_camera": { "unicode": "1f4f9", "shortname": ":video_camera:", "aliases": "", "keywords": "video camera electronics camera movie" }, "vhs": { "unicode": "1f4fc", "shortname": ":vhs:", "aliases": "", "keywords": "videocassette electronics" }, "mag": { "unicode": "1f50d", "shortname": ":mag:", "aliases": "", "keywords": "left-pointing magnifying glass object" }, "mag_right": { "unicode": "1f50e", "shortname": ":mag_right:", "aliases": "", "keywords": "right-pointing magnifying glass object" }, "microscope": { "unicode": "1f52c", "shortname": ":microscope:", "aliases": "", "keywords": "microscope object science" }, "telescope": { "unicode": "1f52d", "shortname": ":telescope:", "aliases": "", "keywords": "telescope object space science" }, "satellite": { "unicode": "1f4e1", "shortname": ":satellite:", "aliases": "", "keywords": "satellite antenna object" }, "candle": { "unicode": "1f56f", "shortname": ":candle:", "aliases": "", "keywords": "candle object" }, "bulb": { "unicode": "1f4a1", "shortname": ":bulb:", "aliases": "", "keywords": "electric light bulb object science" }, "flashlight": { "unicode": "1f526", "shortname": ":flashlight:", "aliases": "", "keywords": "electric torch electronics object" }, "izakaya_lantern": { "unicode": "1f3ee", "shortname": ":izakaya_lantern:", "aliases": "", "keywords": "izakaya lantern object japan" }, "notebook_with_decorative_cover": { "unicode": "1f4d4", "shortname": ":notebook_with_decorative_cover:", "aliases": "", "keywords": "notebook with decorative cover object office write" }, "closed_book": { "unicode": "1f4d5", "shortname": ":closed_book:", "aliases": "", "keywords": "closed book object office write book" }, "book": { "unicode": "1f4d6", "shortname": ":book:", "aliases": "", "keywords": "open book object office write book" }, "green_book": { "unicode": "1f4d7", "shortname": ":green_book:", "aliases": "", "keywords": "green book object office book" }, "blue_book": { "unicode": "1f4d8", "shortname": ":blue_book:", "aliases": "", "keywords": "blue book object office write book" }, "orange_book": { "unicode": "1f4d9", "shortname": ":orange_book:", "aliases": "", "keywords": "orange book object office write book" }, "books": { "unicode": "1f4da", "shortname": ":books:", "aliases": "", "keywords": "books object office write book" }, "notebook": { "unicode": "1f4d3", "shortname": ":notebook:", "aliases": "", "keywords": "notebook object office write" }, "ledger": { "unicode": "1f4d2", "shortname": ":ledger:", "aliases": "", "keywords": "ledger object office write" }, "page_with_curl": { "unicode": "1f4c3", "shortname": ":page_with_curl:", "aliases": "", "keywords": "page with curl office write" }, "scroll": { "unicode": "1f4dc", "shortname": ":scroll:", "aliases": "", "keywords": "scroll object office" }, "page_facing_up": { "unicode": "1f4c4", "shortname": ":page_facing_up:", "aliases": "", "keywords": "page facing up work office write" }, "newspaper": { "unicode": "1f4f0", "shortname": ":newspaper:", "aliases": "", "keywords": "newspaper office write" }, "newspaper2": { "unicode": "1f5de", "shortname": ":newspaper2:", "aliases": ":rolled_up_newspaper:", "keywords": "rolled-up newspaper office write" }, "bookmark_tabs": { "unicode": "1f4d1", "shortname": ":bookmark_tabs:", "aliases": "", "keywords": "bookmark tabs office write" }, "bookmark": { "unicode": "1f516", "shortname": ":bookmark:", "aliases": "", "keywords": "bookmark object book" }, "label": { "unicode": "1f3f7", "shortname": ":label:", "aliases": "", "keywords": "label object" }, "moneybag": { "unicode": "1f4b0", "shortname": ":moneybag:", "aliases": "", "keywords": "money bag bag award money" }, "yen": { "unicode": "1f4b4", "shortname": ":yen:", "aliases": "", "keywords": "banknote with yen sign money" }, "dollar": { "unicode": "1f4b5", "shortname": ":dollar:", "aliases": "", "keywords": "banknote with dollar sign money" }, "euro": { "unicode": "1f4b6", "shortname": ":euro:", "aliases": "", "keywords": "banknote with euro sign money" }, "pound": { "unicode": "1f4b7", "shortname": ":pound:", "aliases": "", "keywords": "banknote with pound sign money" }, "money_with_wings": { "unicode": "1f4b8", "shortname": ":money_with_wings:", "aliases": "", "keywords": "money with wings money boys night" }, "credit_card": { "unicode": "1f4b3", "shortname": ":credit_card:", "aliases": "", "keywords": "credit card object money boys night" }, "chart": { "unicode": "1f4b9", "shortname": ":chart:", "aliases": "", "keywords": "chart with upwards trend and yen sign symbol money" }, "currency_exchange": { "unicode": "1f4b1", "shortname": ":currency_exchange:", "aliases": "", "keywords": "currency exchange symbol money" }, "heavy_dollar_sign": { "unicode": "1f4b2", "shortname": ":heavy_dollar_sign:", "aliases": "", "keywords": "heavy dollar sign math symbol money" }, "envelope": { "unicode": "2709", "shortname": ":envelope:", "aliases": "", "keywords": "envelope object office write" }, "e-mail": { "unicode": "1f4e7", "shortname": ":e-mail:", "aliases": ":email:", "keywords": "e-mail symbol office" }, "incoming_envelope": { "unicode": "1f4e8", "shortname": ":incoming_envelope:", "aliases": "", "keywords": "incoming envelope object" }, "envelope_with_arrow": { "unicode": "1f4e9", "shortname": ":envelope_with_arrow:", "aliases": "", "keywords": "envelope with downwards arrow above object office" }, "outbox_tray": { "unicode": "1f4e4", "shortname": ":outbox_tray:", "aliases": "", "keywords": "outbox tray work office" }, "inbox_tray": { "unicode": "1f4e5", "shortname": ":inbox_tray:", "aliases": "", "keywords": "inbox tray work office" }, "package": { "unicode": "1f4e6", "shortname": ":package:", "aliases": "", "keywords": "package object gift office" }, "mailbox": { "unicode": "1f4eb", "shortname": ":mailbox:", "aliases": "", "keywords": "closed mailbox with raised flag object" }, "mailbox_closed": { "unicode": "1f4ea", "shortname": ":mailbox_closed:", "aliases": "", "keywords": "closed mailbox with lowered flag object office" }, "mailbox_with_mail": { "unicode": "1f4ec", "shortname": ":mailbox_with_mail:", "aliases": "", "keywords": "open mailbox with raised flag object" }, "mailbox_with_no_mail": { "unicode": "1f4ed", "shortname": ":mailbox_with_no_mail:", "aliases": "", "keywords": "open mailbox with lowered flag object" }, "postbox": { "unicode": "1f4ee", "shortname": ":postbox:", "aliases": "", "keywords": "postbox object" }, "ballot_box": { "unicode": "1f5f3", "shortname": ":ballot_box:", "aliases": ":ballot_box_with_ballot:", "keywords": "ballot box with ballot object office" }, "pencil2": { "unicode": "270f", "shortname": ":pencil2:", "aliases": "", "keywords": "pencil object office write" }, "black_nib": { "unicode": "2712", "shortname": ":black_nib:", "aliases": "", "keywords": "black nib object office write" }, "pen_fountain": { "unicode": "1f58b", "shortname": ":pen_fountain:", "aliases": ":lower_left_fountain_pen:", "keywords": "lower left fountain pen object office write" }, "pen_ballpoint": { "unicode": "1f58a", "shortname": ":pen_ballpoint:", "aliases": ":lower_left_ballpoint_pen:", "keywords": "lower left ballpoint pen object office write" }, "paintbrush": { "unicode": "1f58c", "shortname": ":paintbrush:", "aliases": ":lower_left_paintbrush:", "keywords": "lower left paintbrush object office write" }, "crayon": { "unicode": "1f58d", "shortname": ":crayon:", "aliases": ":lower_left_crayon:", "keywords": "lower left crayon object office write" }, "pencil": { "unicode": "1f4dd", "shortname": ":pencil:", "aliases": "", "keywords": "memo work office write" }, "briefcase": { "unicode": "1f4bc", "shortname": ":briefcase:", "aliases": "", "keywords": "briefcase bag work accessories nutcase job" }, "file_folder": { "unicode": "1f4c1", "shortname": ":file_folder:", "aliases": "", "keywords": "file folder work office" }, "open_file_folder": { "unicode": "1f4c2", "shortname": ":open_file_folder:", "aliases": "", "keywords": "open file folder work office" }, "dividers": { "unicode": "1f5c2", "shortname": ":dividers:", "aliases": ":card_index_dividers:", "keywords": "card index dividers work office" }, "date": { "unicode": "1f4c5", "shortname": ":date:", "aliases": "", "keywords": "calendar object office" }, "calendar": { "unicode": "1f4c6", "shortname": ":calendar:", "aliases": "", "keywords": "tear-off calendar object office" }, "notepad_spiral": { "unicode": "1f5d2", "shortname": ":notepad_spiral:", "aliases": ":spiral_note_pad:", "keywords": "spiral note pad work office write" }, "calendar_spiral": { "unicode": "1f5d3", "shortname": ":calendar_spiral:", "aliases": ":spiral_calendar_pad:", "keywords": "spiral calendar pad object office" }, "card_index": { "unicode": "1f4c7", "shortname": ":card_index:", "aliases": "", "keywords": "card index object work office" }, "chart_with_upwards_trend": { "unicode": "1f4c8", "shortname": ":chart_with_upwards_trend:", "aliases": "", "keywords": "chart with upwards trend work office" }, "chart_with_downwards_trend": { "unicode": "1f4c9", "shortname": ":chart_with_downwards_trend:", "aliases": "", "keywords": "chart with downwards trend work office" }, "bar_chart": { "unicode": "1f4ca", "shortname": ":bar_chart:", "aliases": "", "keywords": "bar chart work office" }, "clipboard": { "unicode": "1f4cb", "shortname": ":clipboard:", "aliases": "", "keywords": "clipboard object work office write" }, "pushpin": { "unicode": "1f4cc", "shortname": ":pushpin:", "aliases": "", "keywords": "pushpin object office" }, "round_pushpin": { "unicode": "1f4cd", "shortname": ":round_pushpin:", "aliases": "", "keywords": "round pushpin object office" }, "paperclip": { "unicode": "1f4ce", "shortname": ":paperclip:", "aliases": "", "keywords": "paperclip object work office" }, "paperclips": { "unicode": "1f587", "shortname": ":paperclips:", "aliases": ":linked_paperclips:", "keywords": "linked paperclips object work office" }, "straight_ruler": { "unicode": "1f4cf", "shortname": ":straight_ruler:", "aliases": "", "keywords": "straight ruler object tool office" }, "triangular_ruler": { "unicode": "1f4d0", "shortname": ":triangular_ruler:", "aliases": "", "keywords": "triangular ruler object tool office" }, "scissors": { "unicode": "2702", "shortname": ":scissors:", "aliases": "", "keywords": "black scissors object tool weapon office" }, "card_box": { "unicode": "1f5c3", "shortname": ":card_box:", "aliases": ":card_file_box:", "keywords": "card file box object work office" }, "file_cabinet": { "unicode": "1f5c4", "shortname": ":file_cabinet:", "aliases": "", "keywords": "file cabinet object work office" }, "wastebasket": { "unicode": "1f5d1", "shortname": ":wastebasket:", "aliases": "", "keywords": "wastebasket object work" }, "lock": { "unicode": "1f512", "shortname": ":lock:", "aliases": "", "keywords": "lock object lock" }, "unlock": { "unicode": "1f513", "shortname": ":unlock:", "aliases": "", "keywords": "open lock object lock" }, "lock_with_ink_pen": { "unicode": "1f50f", "shortname": ":lock_with_ink_pen:", "aliases": "", "keywords": "lock with ink pen object lock" }, "closed_lock_with_key": { "unicode": "1f510", "shortname": ":closed_lock_with_key:", "aliases": "", "keywords": "closed lock with key object lock" }, "key": { "unicode": "1f511", "shortname": ":key:", "aliases": "", "keywords": "key object lock" }, "key2": { "unicode": "1f5dd", "shortname": ":key2:", "aliases": ":old_key:", "keywords": "old key object lock" }, "hammer": { "unicode": "1f528", "shortname": ":hammer:", "aliases": "", "keywords": "hammer object tool weapon" }, "pick": { "unicode": "26cf", "shortname": ":pick:", "aliases": "", "keywords": "pick object tool weapon" }, "hammer_pick": { "unicode": "2692", "shortname": ":hammer_pick:", "aliases": ":hammer_and_pick:", "keywords": "hammer and pick object tool weapon" }, "tools": { "unicode": "1f6e0", "shortname": ":tools:", "aliases": ":hammer_and_wrench:", "keywords": "hammer and wrench object tool" }, "dagger": { "unicode": "1f5e1", "shortname": ":dagger:", "aliases": ":dagger_knife:", "keywords": "dagger knife object weapon" }, "crossed_swords": { "unicode": "2694", "shortname": ":crossed_swords:", "aliases": "", "keywords": "crossed swords object weapon" }, "gun": { "unicode": "1f52b", "shortname": ":gun:", "aliases": "", "keywords": "pistol object weapon dead gun sarcastic" }, "bow_and_arrow": { "unicode": "1f3f9", "shortname": ":bow_and_arrow:", "aliases": ":archery:", "keywords": "bow and arrow weapon sport" }, "shield": { "unicode": "1f6e1", "shortname": ":shield:", "aliases": "", "keywords": "shield object" }, "wrench": { "unicode": "1f527", "shortname": ":wrench:", "aliases": "", "keywords": "wrench object tool" }, "nut_and_bolt": { "unicode": "1f529", "shortname": ":nut_and_bolt:", "aliases": "", "keywords": "nut and bolt object tool nutcase" }, "gear": { "unicode": "2699", "shortname": ":gear:", "aliases": "", "keywords": "gear object tool" }, "compression": { "unicode": "1f5dc", "shortname": ":compression:", "aliases": "", "keywords": "compression" }, "alembic": { "unicode": "2697", "shortname": ":alembic:", "aliases": "", "keywords": "alembic object science" }, "scales": { "unicode": "2696", "shortname": ":scales:", "aliases": "", "keywords": "scales object" }, "link": { "unicode": "1f517", "shortname": ":link:", "aliases": "", "keywords": "link symbol symbol office" }, "chains": { "unicode": "26d3", "shortname": ":chains:", "aliases": "", "keywords": "chains object tool" }, "syringe": { "unicode": "1f489", "shortname": ":syringe:", "aliases": "", "keywords": "syringe object weapon health drugs" }, "pill": { "unicode": "1f48a", "shortname": ":pill:", "aliases": "", "keywords": "pill object health drugs" }, "smoking": { "unicode": "1f6ac", "shortname": ":smoking:", "aliases": "", "keywords": "smoking symbol symbol drugs smoking" }, "coffin": { "unicode": "26b0", "shortname": ":coffin:", "aliases": "", "keywords": "coffin object dead rip" }, "urn": { "unicode": "26b1", "shortname": ":urn:", "aliases": ":funeral_urn:", "keywords": "funeral urn object dead rip" }, "moyai": { "unicode": "1f5ff", "shortname": ":moyai:", "aliases": "", "keywords": "moyai travel vacation" }, "oil": { "unicode": "1f6e2", "shortname": ":oil:", "aliases": ":oil_drum:", "keywords": "oil drum object" }, "crystal_ball": { "unicode": "1f52e", "shortname": ":crystal_ball:", "aliases": "", "keywords": "crystal ball object ball" }, "shopping_cart": { "unicode": "1f6d2", "shortname": ":shopping_cart:", "aliases": ":shopping_trolley:", "keywords": "shopping trolley" }, "atm": { "unicode": "1f3e7", "shortname": ":atm:", "aliases": "", "keywords": "automated teller machine electronics symbol money" }, "put_litter_in_its_place": { "unicode": "1f6ae", "shortname": ":put_litter_in_its_place:", "aliases": "", "keywords": "put litter in its place symbol symbol" }, "potable_water": { "unicode": "1f6b0", "shortname": ":potable_water:", "aliases": "", "keywords": "potable water symbol symbol" }, "wheelchair": { "unicode": "267f", "shortname": ":wheelchair:", "aliases": "", "keywords": "wheelchair symbol symbol" }, "mens": { "unicode": "1f6b9", "shortname": ":mens:", "aliases": "", "keywords": "mens symbol symbol" }, "womens": { "unicode": "1f6ba", "shortname": ":womens:", "aliases": "", "keywords": "womens symbol symbol" }, "restroom": { "unicode": "1f6bb", "shortname": ":restroom:", "aliases": "", "keywords": "restroom symbol" }, "baby_symbol": { "unicode": "1f6bc", "shortname": ":baby_symbol:", "aliases": "", "keywords": "baby symbol symbol" }, "wc": { "unicode": "1f6be", "shortname": ":wc:", "aliases": "", "keywords": "water closet symbol" }, "passport_control": { "unicode": "1f6c2", "shortname": ":passport_control:", "aliases": "", "keywords": "passport control symbol" }, "customs": { "unicode": "1f6c3", "shortname": ":customs:", "aliases": "", "keywords": "customs symbol" }, "baggage_claim": { "unicode": "1f6c4", "shortname": ":baggage_claim:", "aliases": "", "keywords": "baggage claim symbol" }, "left_luggage": { "unicode": "1f6c5", "shortname": ":left_luggage:", "aliases": "", "keywords": "left luggage symbol" }, "warning": { "unicode": "26a0", "shortname": ":warning:", "aliases": "", "keywords": "warning sign symbol punctuation" }, "children_crossing": { "unicode": "1f6b8", "shortname": ":children_crossing:", "aliases": "", "keywords": "children crossing symbol" }, "no_entry": { "unicode": "26d4", "shortname": ":no_entry:", "aliases": "", "keywords": "no entry symbol circle" }, "no_entry_sign": { "unicode": "1f6ab", "shortname": ":no_entry_sign:", "aliases": "", "keywords": "no entry sign symbol circle" }, "no_bicycles": { "unicode": "1f6b3", "shortname": ":no_bicycles:", "aliases": "", "keywords": "no bicycles symbol" }, "no_smoking": { "unicode": "1f6ad", "shortname": ":no_smoking:", "aliases": "", "keywords": "no smoking symbol symbol smoking" }, "do_not_litter": { "unicode": "1f6af", "shortname": ":do_not_litter:", "aliases": "", "keywords": "do not litter symbol symbol" }, "non-potable_water": { "unicode": "1f6b1", "shortname": ":non-potable_water:", "aliases": "", "keywords": "non-potable water symbol symbol" }, "no_pedestrians": { "unicode": "1f6b7", "shortname": ":no_pedestrians:", "aliases": "", "keywords": "no pedestrians symbol" }, "no_mobile_phones": { "unicode": "1f4f5", "shortname": ":no_mobile_phones:", "aliases": "", "keywords": "no mobile phones symbol phone" }, "underage": { "unicode": "1f51e", "shortname": ":underage:", "aliases": "", "keywords": "no one under eighteen symbol symbol" }, "radioactive": { "unicode": "2622", "shortname": ":radioactive:", "aliases": ":radioactive_sign:", "keywords": "radioactive sign symbol science" }, "biohazard": { "unicode": "2623", "shortname": ":biohazard:", "aliases": ":biohazard_sign:", "keywords": "biohazard sign symbol science" }, "arrow_up": { "unicode": "2b06", "shortname": ":arrow_up:", "aliases": "", "keywords": "upwards black arrow arrow symbol" }, "arrow_upper_right": { "unicode": "2197", "shortname": ":arrow_upper_right:", "aliases": "", "keywords": "north east arrow arrow symbol" }, "arrow_right": { "unicode": "27a1", "shortname": ":arrow_right:", "aliases": "", "keywords": "black rightwards arrow arrow symbol" }, "arrow_lower_right": { "unicode": "2198", "shortname": ":arrow_lower_right:", "aliases": "", "keywords": "south east arrow arrow symbol" }, "arrow_down": { "unicode": "2b07", "shortname": ":arrow_down:", "aliases": "", "keywords": "downwards black arrow arrow symbol" }, "arrow_lower_left": { "unicode": "2199", "shortname": ":arrow_lower_left:", "aliases": "", "keywords": "south west arrow arrow symbol" }, "arrow_left": { "unicode": "2b05", "shortname": ":arrow_left:", "aliases": "", "keywords": "leftwards black arrow arrow symbol" }, "arrow_upper_left": { "unicode": "2196", "shortname": ":arrow_upper_left:", "aliases": "", "keywords": "north west arrow arrow symbol" }, "arrow_up_down": { "unicode": "2195", "shortname": ":arrow_up_down:", "aliases": "", "keywords": "up down arrow arrow symbol" }, "left_right_arrow": { "unicode": "2194", "shortname": ":left_right_arrow:", "aliases": "", "keywords": "left right arrow arrow symbol" }, "leftwards_arrow_with_hook": { "unicode": "21a9", "shortname": ":leftwards_arrow_with_hook:", "aliases": "", "keywords": "leftwards arrow with hook arrow symbol" }, "arrow_right_hook": { "unicode": "21aa", "shortname": ":arrow_right_hook:", "aliases": "", "keywords": "rightwards arrow with hook arrow symbol" }, "arrow_heading_up": { "unicode": "2934", "shortname": ":arrow_heading_up:", "aliases": "", "keywords": "arrow pointing rightwards then curving upwards arrow symbol" }, "arrow_heading_down": { "unicode": "2935", "shortname": ":arrow_heading_down:", "aliases": "", "keywords": "arrow pointing rightwards then curving downwards arrow symbol" }, "arrows_clockwise": { "unicode": "1f503", "shortname": ":arrows_clockwise:", "aliases": "", "keywords": "clockwise downwards and upwards open circle arrows arrow symbol" }, "arrows_counterclockwise": { "unicode": "1f504", "shortname": ":arrows_counterclockwise:", "aliases": "", "keywords": "anticlockwise downwards and upwards open circle arrows arrow symbol" }, "back": { "unicode": "1f519", "shortname": ":back:", "aliases": "", "keywords": "back with leftwards arrow above arrow symbol" }, "end": { "unicode": "1f51a", "shortname": ":end:", "aliases": "", "keywords": "end with leftwards arrow above arrow symbol" }, "on": { "unicode": "1f51b", "shortname": ":on:", "aliases": "", "keywords": "on with exclamation mark with left right arrow abo arrow symbol" }, "soon": { "unicode": "1f51c", "shortname": ":soon:", "aliases": "", "keywords": "soon with rightwards arrow above arrow symbol" }, "top": { "unicode": "1f51d", "shortname": ":top:", "aliases": "", "keywords": "top with upwards arrow above arrow symbol" }, "place_of_worship": { "unicode": "1f6d0", "shortname": ":place_of_worship:", "aliases": ":worship_symbol:", "keywords": "place of worship religion symbol pray" }, "atom": { "unicode": "269b", "shortname": ":atom:", "aliases": ":atom_symbol:", "keywords": "atom symbol symbol science" }, "om_symbol": { "unicode": "1f549", "shortname": ":om_symbol:", "aliases": "", "keywords": "om symbol religion symbol" }, "star_of_david": { "unicode": "2721", "shortname": ":star_of_david:", "aliases": "", "keywords": "star of david religion jew star symbol" }, "wheel_of_dharma": { "unicode": "2638", "shortname": ":wheel_of_dharma:", "aliases": "", "keywords": "wheel of dharma religion symbol" }, "yin_yang": { "unicode": "262f", "shortname": ":yin_yang:", "aliases": "", "keywords": "yin yang symbol" }, "cross": { "unicode": "271d", "shortname": ":cross:", "aliases": ":latin_cross:", "keywords": "latin cross religion symbol" }, "orthodox_cross": { "unicode": "2626", "shortname": ":orthodox_cross:", "aliases": "", "keywords": "orthodox cross religion symbol" }, "star_and_crescent": { "unicode": "262a", "shortname": ":star_and_crescent:", "aliases": "", "keywords": "star and crescent religion symbol" }, "peace": { "unicode": "262e", "shortname": ":peace:", "aliases": ":peace_symbol:", "keywords": "peace symbol symbol peace drugs" }, "menorah": { "unicode": "1f54e", "shortname": ":menorah:", "aliases": "", "keywords": "menorah with nine branches religion object jew symbol holidays" }, "six_pointed_star": { "unicode": "1f52f", "shortname": ":six_pointed_star:", "aliases": "", "keywords": "six pointed star with middle dot religion jew star symbol" }, "aries": { "unicode": "2648", "shortname": ":aries:", "aliases": "", "keywords": "aries zodiac symbol" }, "taurus": { "unicode": "2649", "shortname": ":taurus:", "aliases": "", "keywords": "taurus zodiac symbol" }, "gemini": { "unicode": "264a", "shortname": ":gemini:", "aliases": "", "keywords": "gemini zodiac symbol" }, "cancer": { "unicode": "264b", "shortname": ":cancer:", "aliases": "", "keywords": "cancer zodiac symbol" }, "leo": { "unicode": "264c", "shortname": ":leo:", "aliases": "", "keywords": "leo zodiac symbol" }, "virgo": { "unicode": "264d", "shortname": ":virgo:", "aliases": "", "keywords": "virgo zodiac symbol" }, "libra": { "unicode": "264e", "shortname": ":libra:", "aliases": "", "keywords": "libra zodiac symbol" }, "scorpius": { "unicode": "264f", "shortname": ":scorpius:", "aliases": "", "keywords": "scorpius zodiac symbol" }, "sagittarius": { "unicode": "2650", "shortname": ":sagittarius:", "aliases": "", "keywords": "sagittarius zodiac symbol" }, "capricorn": { "unicode": "2651", "shortname": ":capricorn:", "aliases": "", "keywords": "capricorn zodiac symbol" }, "aquarius": { "unicode": "2652", "shortname": ":aquarius:", "aliases": "", "keywords": "aquarius zodiac symbol" }, "pisces": { "unicode": "2653", "shortname": ":pisces:", "aliases": "", "keywords": "pisces zodiac symbol" }, "ophiuchus": { "unicode": "26ce", "shortname": ":ophiuchus:", "aliases": "", "keywords": "ophiuchus symbol" }, "twisted_rightwards_arrows": { "unicode": "1f500", "shortname": ":twisted_rightwards_arrows:", "aliases": "", "keywords": "twisted rightwards arrows arrow symbol" }, "repeat": { "unicode": "1f501", "shortname": ":repeat:", "aliases": "", "keywords": "clockwise rightwards and leftwards open circle arrows arrow symbol" }, "repeat_one": { "unicode": "1f502", "shortname": ":repeat_one:", "aliases": "", "keywords": "clockwise rightwards and leftwards open circle arrows with circled one overlay arrow symbol" }, "arrow_forward": { "unicode": "25b6", "shortname": ":arrow_forward:", "aliases": "", "keywords": "black right-pointing triangle arrow symbol triangle" }, "fast_forward": { "unicode": "23e9", "shortname": ":fast_forward:", "aliases": "", "keywords": "black right-pointing double triangle arrow symbol" }, "track_next": { "unicode": "23ed", "shortname": ":track_next:", "aliases": ":next_track:", "keywords": "black right-pointing double triangle with vertical bar arrow symbol" }, "play_pause": { "unicode": "23ef", "shortname": ":play_pause:", "aliases": "", "keywords": "black right-pointing double triangle with double vertical bar arrow symbol" }, "arrow_backward": { "unicode": "25c0", "shortname": ":arrow_backward:", "aliases": "", "keywords": "black left-pointing triangle arrow symbol triangle" }, "rewind": { "unicode": "23ea", "shortname": ":rewind:", "aliases": "", "keywords": "black left-pointing double triangle arrow symbol" }, "track_previous": { "unicode": "23ee", "shortname": ":track_previous:", "aliases": ":previous_track:", "keywords": "black left-pointing double triangle with vertical bar arrow symbol" }, "arrow_up_small": { "unicode": "1f53c", "shortname": ":arrow_up_small:", "aliases": "", "keywords": "up-pointing small red triangle arrow symbol triangle" }, "arrow_double_up": { "unicode": "23eb", "shortname": ":arrow_double_up:", "aliases": "", "keywords": "black up-pointing double triangle arrow symbol" }, "arrow_down_small": { "unicode": "1f53d", "shortname": ":arrow_down_small:", "aliases": "", "keywords": "down-pointing small red triangle arrow symbol triangle" }, "arrow_double_down": { "unicode": "23ec", "shortname": ":arrow_double_down:", "aliases": "", "keywords": "black down-pointing double triangle arrow symbol" }, "pause_button": { "unicode": "23f8", "shortname": ":pause_button:", "aliases": ":double_vertical_bar:", "keywords": "double vertical bar symbol" }, "stop_button": { "unicode": "23f9", "shortname": ":stop_button:", "aliases": "", "keywords": "black square for stop symbol square" }, "record_button": { "unicode": "23fa", "shortname": ":record_button:", "aliases": "", "keywords": "black circle for record symbol circle" }, "eject": { "unicode": "23cf", "shortname": ":eject:", "aliases": ":eject_symbol:", "keywords": "eject symbol" }, "cinema": { "unicode": "1f3a6", "shortname": ":cinema:", "aliases": "", "keywords": "cinema symbol camera movie" }, "low_brightness": { "unicode": "1f505", "shortname": ":low_brightness:", "aliases": "", "keywords": "low brightness symbol symbol sun" }, "high_brightness": { "unicode": "1f506", "shortname": ":high_brightness:", "aliases": "", "keywords": "high brightness symbol symbol sun" }, "signal_strength": { "unicode": "1f4f6", "shortname": ":signal_strength:", "aliases": "", "keywords": "antenna with bars symbol" }, "vibration_mode": { "unicode": "1f4f3", "shortname": ":vibration_mode:", "aliases": "", "keywords": "vibration mode symbol" }, "mobile_phone_off": { "unicode": "1f4f4", "shortname": ":mobile_phone_off:", "aliases": "", "keywords": "mobile phone off symbol" }, "recycle": { "unicode": "267b", "shortname": ":recycle:", "aliases": "", "keywords": "black universal recycling symbol symbol" }, "name_badge": { "unicode": "1f4db", "shortname": ":name_badge:", "aliases": "", "keywords": "name badge work" }, "fleur-de-lis": { "unicode": "269c", "shortname": ":fleur-de-lis:", "aliases": "", "keywords": "fleur-de-lis object symbol" }, "beginner": { "unicode": "1f530", "shortname": ":beginner:", "aliases": "", "keywords": "japanese symbol for beginner symbol" }, "trident": { "unicode": "1f531", "shortname": ":trident:", "aliases": "", "keywords": "trident emblem object symbol" }, "o": { "unicode": "2b55", "shortname": ":o:", "aliases": "", "keywords": "heavy large circle symbol circle" }, "white_check_mark": { "unicode": "2705", "shortname": ":white_check_mark:", "aliases": "", "keywords": "white heavy check mark symbol" }, "ballot_box_with_check": { "unicode": "2611", "shortname": ":ballot_box_with_check:", "aliases": "", "keywords": "ballot box with check symbol" }, "heavy_check_mark": { "unicode": "2714", "shortname": ":heavy_check_mark:", "aliases": "", "keywords": "heavy check mark symbol" }, "heavy_multiplication_x": { "unicode": "2716", "shortname": ":heavy_multiplication_x:", "aliases": "", "keywords": "heavy multiplication x math symbol" }, "x": { "unicode": "274c", "shortname": ":x:", "aliases": "", "keywords": "cross mark symbol sol" }, "negative_squared_cross_mark": { "unicode": "274e", "shortname": ":negative_squared_cross_mark:", "aliases": "", "keywords": "negative squared cross mark symbol" }, "heavy_plus_sign": { "unicode": "2795", "shortname": ":heavy_plus_sign:", "aliases": "", "keywords": "heavy plus sign math symbol" }, "heavy_minus_sign": { "unicode": "2796", "shortname": ":heavy_minus_sign:", "aliases": "", "keywords": "heavy minus sign math symbol" }, "heavy_division_sign": { "unicode": "2797", "shortname": ":heavy_division_sign:", "aliases": "", "keywords": "heavy division sign math symbol" }, "curly_loop": { "unicode": "27b0", "shortname": ":curly_loop:", "aliases": "", "keywords": "curly loop symbol" }, "loop": { "unicode": "27bf", "shortname": ":loop:", "aliases": "", "keywords": "double curly loop symbol" }, "part_alternation_mark": { "unicode": "303d", "shortname": ":part_alternation_mark:", "aliases": "", "keywords": "part alternation mark symbol" }, "eight_spoked_asterisk": { "unicode": "2733", "shortname": ":eight_spoked_asterisk:", "aliases": "", "keywords": "eight spoked asterisk symbol" }, "eight_pointed_black_star": { "unicode": "2734", "shortname": ":eight_pointed_black_star:", "aliases": "", "keywords": "eight pointed black star symbol" }, "sparkle": { "unicode": "2747", "shortname": ":sparkle:", "aliases": "", "keywords": "sparkle symbol" }, "bangbang": { "unicode": "203c", "shortname": ":bangbang:", "aliases": "", "keywords": "double exclamation mark symbol punctuation" }, "interrobang": { "unicode": "2049", "shortname": ":interrobang:", "aliases": "", "keywords": "exclamation question mark symbol punctuation" }, "question": { "unicode": "2753", "shortname": ":question:", "aliases": "", "keywords": "black question mark ornament symbol punctuation wth" }, "grey_question": { "unicode": "2754", "shortname": ":grey_question:", "aliases": "", "keywords": "white question mark ornament symbol punctuation" }, "grey_exclamation": { "unicode": "2755", "shortname": ":grey_exclamation:", "aliases": "", "keywords": "white exclamation mark ornament symbol punctuation" }, "exclamation": { "unicode": "2757", "shortname": ":exclamation:", "aliases": "", "keywords": "heavy exclamation mark symbol symbol punctuation" }, "wavy_dash": { "unicode": "3030", "shortname": ":wavy_dash:", "aliases": "", "keywords": "wavy dash symbol" }, "copyright": { "unicode": "00a9", "shortname": ":copyright:", "aliases": "", "keywords": "copyright sign symbol" }, "registered": { "unicode": "00ae", "shortname": ":registered:", "aliases": "", "keywords": "registered sign symbol" }, "tm": { "unicode": "2122", "shortname": ":tm:", "aliases": "", "keywords": "trade mark sign symbol" }, "hash": { "unicode": "0023-20e3", "shortname": ":hash:", "aliases": "", "keywords": "keycap number sign number symbol" }, "asterisk": { "unicode": "002a-20e3", "shortname": ":asterisk:", "aliases": ":keycap_asterisk:", "keywords": "keycap asterisk symbol" }, "zero": { "unicode": "0030-20e3", "shortname": ":zero:", "aliases": "", "keywords": "keycap digit zero number math symbol" }, "one": { "unicode": "0031-20e3", "shortname": ":one:", "aliases": "", "keywords": "keycap digit one number math symbol" }, "two": { "unicode": "0032-20e3", "shortname": ":two:", "aliases": "", "keywords": "keycap digit two number math symbol" }, "three": { "unicode": "0033-20e3", "shortname": ":three:", "aliases": "", "keywords": "keycap digit three number math symbol" }, "four": { "unicode": "0034-20e3", "shortname": ":four:", "aliases": "", "keywords": "keycap digit four number math symbol" }, "five": { "unicode": "0035-20e3", "shortname": ":five:", "aliases": "", "keywords": "keycap digit five number math symbol" }, "six": { "unicode": "0036-20e3", "shortname": ":six:", "aliases": "", "keywords": "keycap digit six number math symbol" }, "seven": { "unicode": "0037-20e3", "shortname": ":seven:", "aliases": "", "keywords": "keycap digit seven number math symbol" }, "eight": { "unicode": "0038-20e3", "shortname": ":eight:", "aliases": "", "keywords": "keycap digit eight number math symbol" }, "nine": { "unicode": "0039-20e3", "shortname": ":nine:", "aliases": "", "keywords": "keycap digit nine number math symbol" }, "keycap_ten": { "unicode": "1f51f", "shortname": ":keycap_ten:", "aliases": "", "keywords": "keycap ten number math symbol" }, "100": { "unicode": "1f4af", "shortname": ":100:", "aliases": "", "keywords": "hundred points symbol symbol wow win perfect parties" }, "capital_abcd": { "unicode": "1f520", "shortname": ":capital_abcd:", "aliases": "", "keywords": "input symbol for latin capital letters symbol" }, "abcd": { "unicode": "1f521", "shortname": ":abcd:", "aliases": "", "keywords": "input symbol for latin small letters symbol" }, "1234": { "unicode": "1f522", "shortname": ":1234:", "aliases": "", "keywords": "input symbol for numbers symbol" }, "symbols": { "unicode": "1f523", "shortname": ":symbols:", "aliases": "", "keywords": "input symbol for symbols symbol" }, "abc": { "unicode": "1f524", "shortname": ":abc:", "aliases": "", "keywords": "input symbol for latin letters symbol" }, "a": { "unicode": "1f170", "shortname": ":a:", "aliases": "", "keywords": "negative squared latin capital letter a symbol" }, "ab": { "unicode": "1f18e", "shortname": ":ab:", "aliases": "", "keywords": "negative squared ab symbol" }, "b": { "unicode": "1f171", "shortname": ":b:", "aliases": "", "keywords": "negative squared latin capital letter b symbol" }, "cl": { "unicode": "1f191", "shortname": ":cl:", "aliases": "", "keywords": "squared cl symbol" }, "cool": { "unicode": "1f192", "shortname": ":cool:", "aliases": "", "keywords": "squared cool symbol" }, "free": { "unicode": "1f193", "shortname": ":free:", "aliases": "", "keywords": "squared free symbol" }, "information_source": { "unicode": "2139", "shortname": ":information_source:", "aliases": "", "keywords": "information source symbol" }, "id": { "unicode": "1f194", "shortname": ":id:", "aliases": "", "keywords": "squared id symbol" }, "m": { "unicode": "24c2", "shortname": ":m:", "aliases": "", "keywords": "circled latin capital letter m symbol" }, "new": { "unicode": "1f195", "shortname": ":new:", "aliases": "", "keywords": "squared new symbol" }, "ng": { "unicode": "1f196", "shortname": ":ng:", "aliases": "", "keywords": "squared ng symbol" }, "o2": { "unicode": "1f17e", "shortname": ":o2:", "aliases": "", "keywords": "negative squared latin capital letter o symbol" }, "ok": { "unicode": "1f197", "shortname": ":ok:", "aliases": "", "keywords": "squared ok symbol" }, "parking": { "unicode": "1f17f", "shortname": ":parking:", "aliases": "", "keywords": "negative squared latin capital letter p symbol" }, "sos": { "unicode": "1f198", "shortname": ":sos:", "aliases": "", "keywords": "squared sos symbol" }, "up": { "unicode": "1f199", "shortname": ":up:", "aliases": "", "keywords": "squared up with exclamation mark symbol" }, "vs": { "unicode": "1f19a", "shortname": ":vs:", "aliases": "", "keywords": "squared vs symbol" }, "koko": { "unicode": "1f201", "shortname": ":koko:", "aliases": "", "keywords": "squared katakana koko symbol" }, "sa": { "unicode": "1f202", "shortname": ":sa:", "aliases": "", "keywords": "squared katakana sa symbol" }, "u6708": { "unicode": "1f237", "shortname": ":u6708:", "aliases": "", "keywords": "squared cjk unified ideograph-6708 symbol" }, "u6709": { "unicode": "1f236", "shortname": ":u6709:", "aliases": "", "keywords": "squared cjk unified ideograph-6709 symbol" }, "u6307": { "unicode": "1f22f", "shortname": ":u6307:", "aliases": "", "keywords": "squared cjk unified ideograph-6307 symbol" }, "ideograph_advantage": { "unicode": "1f250", "shortname": ":ideograph_advantage:", "aliases": "", "keywords": "circled ideograph advantage japan symbol" }, "u5272": { "unicode": "1f239", "shortname": ":u5272:", "aliases": "", "keywords": "squared cjk unified ideograph-5272 symbol" }, "u7121": { "unicode": "1f21a", "shortname": ":u7121:", "aliases": "", "keywords": "squared cjk unified ideograph-7121 symbol" }, "u7981": { "unicode": "1f232", "shortname": ":u7981:", "aliases": "", "keywords": "squared cjk unified ideograph-7981 japan symbol" }, "accept": { "unicode": "1f251", "shortname": ":accept:", "aliases": "", "keywords": "circled ideograph accept symbol" }, "u7533": { "unicode": "1f238", "shortname": ":u7533:", "aliases": "", "keywords": "squared cjk unified ideograph-7533 symbol" }, "u5408": { "unicode": "1f234", "shortname": ":u5408:", "aliases": "", "keywords": "squared cjk unified ideograph-5408 japan symbol" }, "u7a7a": { "unicode": "1f233", "shortname": ":u7a7a:", "aliases": "", "keywords": "squared cjk unified ideograph-7a7a symbol" }, "congratulations": { "unicode": "3297", "shortname": ":congratulations:", "aliases": "", "keywords": "circled ideograph congratulation japan symbol" }, "secret": { "unicode": "3299", "shortname": ":secret:", "aliases": "", "keywords": "circled ideograph secret japan symbol" }, "u55b6": { "unicode": "1f23a", "shortname": ":u55b6:", "aliases": "", "keywords": "squared cjk unified ideograph-55b6 symbol" }, "u6e80": { "unicode": "1f235", "shortname": ":u6e80:", "aliases": "", "keywords": "squared cjk unified ideograph-6e80 japan symbol" }, "black_small_square": { "unicode": "25aa", "shortname": ":black_small_square:", "aliases": "", "keywords": "black small square shapes symbol square" }, "white_small_square": { "unicode": "25ab", "shortname": ":white_small_square:", "aliases": "", "keywords": "white small square shapes symbol square" }, "white_medium_square": { "unicode": "25fb", "shortname": ":white_medium_square:", "aliases": "", "keywords": "white medium square shapes symbol square" }, "black_medium_square": { "unicode": "25fc", "shortname": ":black_medium_square:", "aliases": "", "keywords": "black medium square shapes symbol square" }, "white_medium_small_square": { "unicode": "25fd", "shortname": ":white_medium_small_square:", "aliases": "", "keywords": "white medium small square shapes symbol square" }, "black_medium_small_square": { "unicode": "25fe", "shortname": ":black_medium_small_square:", "aliases": "", "keywords": "black medium small square shapes symbol square" }, "black_large_square": { "unicode": "2b1b", "shortname": ":black_large_square:", "aliases": "", "keywords": "black large square shapes symbol square" }, "white_large_square": { "unicode": "2b1c", "shortname": ":white_large_square:", "aliases": "", "keywords": "white large square shapes symbol square" }, "large_orange_diamond": { "unicode": "1f536", "shortname": ":large_orange_diamond:", "aliases": "", "keywords": "large orange diamond shapes symbol" }, "large_blue_diamond": { "unicode": "1f537", "shortname": ":large_blue_diamond:", "aliases": "", "keywords": "large blue diamond shapes symbol" }, "small_orange_diamond": { "unicode": "1f538", "shortname": ":small_orange_diamond:", "aliases": "", "keywords": "small orange diamond shapes symbol" }, "small_blue_diamond": { "unicode": "1f539", "shortname": ":small_blue_diamond:", "aliases": "", "keywords": "small blue diamond shapes symbol" }, "small_red_triangle": { "unicode": "1f53a", "shortname": ":small_red_triangle:", "aliases": "", "keywords": "up-pointing red triangle shapes symbol triangle" }, "small_red_triangle_down": { "unicode": "1f53b", "shortname": ":small_red_triangle_down:", "aliases": "", "keywords": "down-pointing red triangle shapes symbol triangle" }, "diamond_shape_with_a_dot_inside": { "unicode": "1f4a0", "shortname": ":diamond_shape_with_a_dot_inside:", "aliases": "", "keywords": "diamond shape with a dot inside symbol" }, "radio_button": { "unicode": "1f518", "shortname": ":radio_button:", "aliases": "", "keywords": "radio button symbol circle" }, "black_square_button": { "unicode": "1f532", "shortname": ":black_square_button:", "aliases": "", "keywords": "black square button shapes symbol square" }, "white_square_button": { "unicode": "1f533", "shortname": ":white_square_button:", "aliases": "", "keywords": "white square button shapes symbol square" }, "white_circle": { "unicode": "26aa", "shortname": ":white_circle:", "aliases": "", "keywords": "white circle shapes symbol circle" }, "black_circle": { "unicode": "26ab", "shortname": ":black_circle:", "aliases": "", "keywords": "black circle shapes symbol circle" }, "red_circle": { "unicode": "1f534", "shortname": ":red_circle:", "aliases": "", "keywords": "red circle shapes symbol circle" }, "blue_circle": { "unicode": "1f535", "shortname": ":blue_circle:", "aliases": "", "keywords": "blue circle shapes symbol circle" }, "checkered_flag": { "unicode": "1f3c1", "shortname": ":checkered_flag:", "aliases": "", "keywords": "chequered flag object" }, "triangular_flag_on_post": { "unicode": "1f6a9", "shortname": ":triangular_flag_on_post:", "aliases": "", "keywords": "triangular flag on post object" }, "crossed_flags": { "unicode": "1f38c", "shortname": ":crossed_flags:", "aliases": "", "keywords": "crossed flags object japan" }, "flag_black": { "unicode": "1f3f4", "shortname": ":flag_black:", "aliases": ":waving_black_flag:", "keywords": "waving black flag object" }, "flag_white": { "unicode": "1f3f3", "shortname": ":flag_white:", "aliases": ":waving_white_flag:", "keywords": "waving white flag object" }, "rainbow_flag": { "unicode": "1f3f3-1f308", "shortname": ":rainbow_flag:", "aliases": ":gay_pride_flag:", "keywords": "rainbow_flag" }, "flag_ac": { "unicode": "1f1e6-1f1e8", "shortname": ":flag_ac:", "aliases": ":ac:", "keywords": "ascension country flag" }, "flag_ad": { "unicode": "1f1e6-1f1e9", "shortname": ":flag_ad:", "aliases": ":ad:", "keywords": "andorra country flag" }, "flag_ae": { "unicode": "1f1e6-1f1ea", "shortname": ":flag_ae:", "aliases": ":ae:", "keywords": "the united arab emirates country flag" }, "flag_af": { "unicode": "1f1e6-1f1eb", "shortname": ":flag_af:", "aliases": ":af:", "keywords": "afghanistan country flag" }, "flag_ag": { "unicode": "1f1e6-1f1ec", "shortname": ":flag_ag:", "aliases": ":ag:", "keywords": "antigua and barbuda country flag" }, "flag_ai": { "unicode": "1f1e6-1f1ee", "shortname": ":flag_ai:", "aliases": ":ai:", "keywords": "anguilla country flag" }, "flag_al": { "unicode": "1f1e6-1f1f1", "shortname": ":flag_al:", "aliases": ":al:", "keywords": "albania country flag" }, "flag_am": { "unicode": "1f1e6-1f1f2", "shortname": ":flag_am:", "aliases": ":am:", "keywords": "armenia country flag" }, "flag_ao": { "unicode": "1f1e6-1f1f4", "shortname": ":flag_ao:", "aliases": ":ao:", "keywords": "angola country flag" }, "flag_aq": { "unicode": "1f1e6-1f1f6", "shortname": ":flag_aq:", "aliases": ":aq:", "keywords": "antarctica country flag" }, "flag_ar": { "unicode": "1f1e6-1f1f7", "shortname": ":flag_ar:", "aliases": ":ar:", "keywords": "argentina country flag" }, "flag_as": { "unicode": "1f1e6-1f1f8", "shortname": ":flag_as:", "aliases": ":as:", "keywords": "american samoa country flag" }, "flag_at": { "unicode": "1f1e6-1f1f9", "shortname": ":flag_at:", "aliases": ":at:", "keywords": "austria country flag" }, "flag_au": { "unicode": "1f1e6-1f1fa", "shortname": ":flag_au:", "aliases": ":au:", "keywords": "australia country flag" }, "flag_aw": { "unicode": "1f1e6-1f1fc", "shortname": ":flag_aw:", "aliases": ":aw:", "keywords": "aruba country flag" }, "flag_ax": { "unicode": "1f1e6-1f1fd", "shortname": ":flag_ax:", "aliases": ":ax:", "keywords": "\u00e5land islands country flag" }, "flag_az": { "unicode": "1f1e6-1f1ff", "shortname": ":flag_az:", "aliases": ":az:", "keywords": "azerbaijan country flag" }, "flag_ba": { "unicode": "1f1e7-1f1e6", "shortname": ":flag_ba:", "aliases": ":ba:", "keywords": "bosnia and herzegovina country flag" }, "flag_bb": { "unicode": "1f1e7-1f1e7", "shortname": ":flag_bb:", "aliases": ":bb:", "keywords": "barbados country flag" }, "flag_bd": { "unicode": "1f1e7-1f1e9", "shortname": ":flag_bd:", "aliases": ":bd:", "keywords": "bangladesh country flag" }, "flag_be": { "unicode": "1f1e7-1f1ea", "shortname": ":flag_be:", "aliases": ":be:", "keywords": "belgium country flag" }, "flag_bf": { "unicode": "1f1e7-1f1eb", "shortname": ":flag_bf:", "aliases": ":bf:", "keywords": "burkina faso country flag" }, "flag_bg": { "unicode": "1f1e7-1f1ec", "shortname": ":flag_bg:", "aliases": ":bg:", "keywords": "bulgaria country flag" }, "flag_bh": { "unicode": "1f1e7-1f1ed", "shortname": ":flag_bh:", "aliases": ":bh:", "keywords": "bahrain country flag" }, "flag_bi": { "unicode": "1f1e7-1f1ee", "shortname": ":flag_bi:", "aliases": ":bi:", "keywords": "burundi country flag" }, "flag_bj": { "unicode": "1f1e7-1f1ef", "shortname": ":flag_bj:", "aliases": ":bj:", "keywords": "benin country flag" }, "flag_bl": { "unicode": "1f1e7-1f1f1", "shortname": ":flag_bl:", "aliases": ":bl:", "keywords": "saint barth\u00e9lemy country flag" }, "flag_bm": { "unicode": "1f1e7-1f1f2", "shortname": ":flag_bm:", "aliases": ":bm:", "keywords": "bermuda country flag" }, "flag_bn": { "unicode": "1f1e7-1f1f3", "shortname": ":flag_bn:", "aliases": ":bn:", "keywords": "brunei country flag" }, "flag_bo": { "unicode": "1f1e7-1f1f4", "shortname": ":flag_bo:", "aliases": ":bo:", "keywords": "bolivia country flag" }, "flag_bq": { "unicode": "1f1e7-1f1f6", "shortname": ":flag_bq:", "aliases": ":bq:", "keywords": "caribbean netherlands country flag" }, "flag_br": { "unicode": "1f1e7-1f1f7", "shortname": ":flag_br:", "aliases": ":br:", "keywords": "brazil country flag" }, "flag_bs": { "unicode": "1f1e7-1f1f8", "shortname": ":flag_bs:", "aliases": ":bs:", "keywords": "the bahamas country flag" }, "flag_bt": { "unicode": "1f1e7-1f1f9", "shortname": ":flag_bt:", "aliases": ":bt:", "keywords": "bhutan country flag" }, "flag_bv": { "unicode": "1f1e7-1f1fb", "shortname": ":flag_bv:", "aliases": ":bv:", "keywords": "bouvet island country flag" }, "flag_bw": { "unicode": "1f1e7-1f1fc", "shortname": ":flag_bw:", "aliases": ":bw:", "keywords": "botswana country flag" }, "flag_by": { "unicode": "1f1e7-1f1fe", "shortname": ":flag_by:", "aliases": ":by:", "keywords": "belarus country flag" }, "flag_bz": { "unicode": "1f1e7-1f1ff", "shortname": ":flag_bz:", "aliases": ":bz:", "keywords": "belize country flag" }, "flag_ca": { "unicode": "1f1e8-1f1e6", "shortname": ":flag_ca:", "aliases": ":ca:", "keywords": "canada country flag" }, "flag_cc": { "unicode": "1f1e8-1f1e8", "shortname": ":flag_cc:", "aliases": ":cc:", "keywords": "cocos (keeling) islands country flag" }, "flag_cd": { "unicode": "1f1e8-1f1e9", "shortname": ":flag_cd:", "aliases": ":congo:", "keywords": "the democratic republic of the congo country flag" }, "flag_cf": { "unicode": "1f1e8-1f1eb", "shortname": ":flag_cf:", "aliases": ":cf:", "keywords": "central african republic country flag" }, "flag_cg": { "unicode": "1f1e8-1f1ec", "shortname": ":flag_cg:", "aliases": ":cg:", "keywords": "the republic of the congo country flag" }, "flag_ch": { "unicode": "1f1e8-1f1ed", "shortname": ":flag_ch:", "aliases": ":ch:", "keywords": "switzerland country neutral flag" }, "flag_ci": { "unicode": "1f1e8-1f1ee", "shortname": ":flag_ci:", "aliases": ":ci:", "keywords": "c\u00f4te d\u2019ivoire country flag" }, "flag_ck": { "unicode": "1f1e8-1f1f0", "shortname": ":flag_ck:", "aliases": ":ck:", "keywords": "cook islands country flag" }, "flag_cl": { "unicode": "1f1e8-1f1f1", "shortname": ":flag_cl:", "aliases": ":chile:", "keywords": "chile country flag" }, "flag_cm": { "unicode": "1f1e8-1f1f2", "shortname": ":flag_cm:", "aliases": ":cm:", "keywords": "cameroon country flag" }, "flag_cn": { "unicode": "1f1e8-1f1f3", "shortname": ":flag_cn:", "aliases": ":cn:", "keywords": "china country flag" }, "flag_co": { "unicode": "1f1e8-1f1f4", "shortname": ":flag_co:", "aliases": ":co:", "keywords": "colombia country flag" }, "flag_cp": { "unicode": "1f1e8-1f1f5", "shortname": ":flag_cp:", "aliases": ":cp:", "keywords": "clipperton island country flag" }, "flag_cr": { "unicode": "1f1e8-1f1f7", "shortname": ":flag_cr:", "aliases": ":cr:", "keywords": "costa rica country flag" }, "flag_cu": { "unicode": "1f1e8-1f1fa", "shortname": ":flag_cu:", "aliases": ":cu:", "keywords": "cuba country flag" }, "flag_cv": { "unicode": "1f1e8-1f1fb", "shortname": ":flag_cv:", "aliases": ":cv:", "keywords": "cape verde country flag" }, "flag_cw": { "unicode": "1f1e8-1f1fc", "shortname": ":flag_cw:", "aliases": ":cw:", "keywords": "cura\u00e7ao country flag" }, "flag_cx": { "unicode": "1f1e8-1f1fd", "shortname": ":flag_cx:", "aliases": ":cx:", "keywords": "christmas island country flag" }, "flag_cy": { "unicode": "1f1e8-1f1fe", "shortname": ":flag_cy:", "aliases": ":cy:", "keywords": "cyprus country flag" }, "flag_cz": { "unicode": "1f1e8-1f1ff", "shortname": ":flag_cz:", "aliases": ":cz:", "keywords": "the czech republic country flag" }, "flag_de": { "unicode": "1f1e9-1f1ea", "shortname": ":flag_de:", "aliases": ":de:", "keywords": "germany country flag" }, "flag_dg": { "unicode": "1f1e9-1f1ec", "shortname": ":flag_dg:", "aliases": ":dg:", "keywords": "diego garcia country flag" }, "flag_dj": { "unicode": "1f1e9-1f1ef", "shortname": ":flag_dj:", "aliases": ":dj:", "keywords": "djibouti country flag" }, "flag_dk": { "unicode": "1f1e9-1f1f0", "shortname": ":flag_dk:", "aliases": ":dk:", "keywords": "denmark country flag" }, "flag_dm": { "unicode": "1f1e9-1f1f2", "shortname": ":flag_dm:", "aliases": ":dm:", "keywords": "dominica country flag" }, "flag_do": { "unicode": "1f1e9-1f1f4", "shortname": ":flag_do:", "aliases": ":do:", "keywords": "the dominican republic country flag" }, "flag_dz": { "unicode": "1f1e9-1f1ff", "shortname": ":flag_dz:", "aliases": ":dz:", "keywords": "algeria country flag" }, "flag_ea": { "unicode": "1f1ea-1f1e6", "shortname": ":flag_ea:", "aliases": ":ea:", "keywords": "ceuta, melilla country flag" }, "flag_ec": { "unicode": "1f1ea-1f1e8", "shortname": ":flag_ec:", "aliases": ":ec:", "keywords": "ecuador country flag" }, "flag_ee": { "unicode": "1f1ea-1f1ea", "shortname": ":flag_ee:", "aliases": ":ee:", "keywords": "estonia country flag" }, "flag_eg": { "unicode": "1f1ea-1f1ec", "shortname": ":flag_eg:", "aliases": ":eg:", "keywords": "egypt country flag" }, "flag_eh": { "unicode": "1f1ea-1f1ed", "shortname": ":flag_eh:", "aliases": ":eh:", "keywords": "western sahara country flag" }, "flag_er": { "unicode": "1f1ea-1f1f7", "shortname": ":flag_er:", "aliases": ":er:", "keywords": "eritrea country flag" }, "flag_es": { "unicode": "1f1ea-1f1f8", "shortname": ":flag_es:", "aliases": ":es:", "keywords": "spain country flag" }, "flag_et": { "unicode": "1f1ea-1f1f9", "shortname": ":flag_et:", "aliases": ":et:", "keywords": "ethiopia country flag" }, "flag_eu": { "unicode": "1f1ea-1f1fa", "shortname": ":flag_eu:", "aliases": ":eu:", "keywords": "european union country flag" }, "flag_fi": { "unicode": "1f1eb-1f1ee", "shortname": ":flag_fi:", "aliases": ":fi:", "keywords": "finland country flag" }, "flag_fj": { "unicode": "1f1eb-1f1ef", "shortname": ":flag_fj:", "aliases": ":fj:", "keywords": "fiji country flag" }, "flag_fk": { "unicode": "1f1eb-1f1f0", "shortname": ":flag_fk:", "aliases": ":fk:", "keywords": "falkland islands country flag" }, "flag_fm": { "unicode": "1f1eb-1f1f2", "shortname": ":flag_fm:", "aliases": ":fm:", "keywords": "micronesia country flag" }, "flag_fo": { "unicode": "1f1eb-1f1f4", "shortname": ":flag_fo:", "aliases": ":fo:", "keywords": "faroe islands country flag" }, "flag_fr": { "unicode": "1f1eb-1f1f7", "shortname": ":flag_fr:", "aliases": ":fr:", "keywords": "france country flag" }, "flag_ga": { "unicode": "1f1ec-1f1e6", "shortname": ":flag_ga:", "aliases": ":ga:", "keywords": "gabon country flag" }, "flag_gb": { "unicode": "1f1ec-1f1e7", "shortname": ":flag_gb:", "aliases": ":gb:", "keywords": "great britain country flag" }, "flag_gd": { "unicode": "1f1ec-1f1e9", "shortname": ":flag_gd:", "aliases": ":gd:", "keywords": "grenada country flag" }, "flag_ge": { "unicode": "1f1ec-1f1ea", "shortname": ":flag_ge:", "aliases": ":ge:", "keywords": "georgia country flag" }, "flag_gf": { "unicode": "1f1ec-1f1eb", "shortname": ":flag_gf:", "aliases": ":gf:", "keywords": "french guiana country flag" }, "flag_gg": { "unicode": "1f1ec-1f1ec", "shortname": ":flag_gg:", "aliases": ":gg:", "keywords": "guernsey country flag" }, "flag_gh": { "unicode": "1f1ec-1f1ed", "shortname": ":flag_gh:", "aliases": ":gh:", "keywords": "ghana country flag" }, "flag_gi": { "unicode": "1f1ec-1f1ee", "shortname": ":flag_gi:", "aliases": ":gi:", "keywords": "gibraltar country flag" }, "flag_gl": { "unicode": "1f1ec-1f1f1", "shortname": ":flag_gl:", "aliases": ":gl:", "keywords": "greenland country flag" }, "flag_gm": { "unicode": "1f1ec-1f1f2", "shortname": ":flag_gm:", "aliases": ":gm:", "keywords": "the gambia country flag" }, "flag_gn": { "unicode": "1f1ec-1f1f3", "shortname": ":flag_gn:", "aliases": ":gn:", "keywords": "guinea country flag" }, "flag_gp": { "unicode": "1f1ec-1f1f5", "shortname": ":flag_gp:", "aliases": ":gp:", "keywords": "guadeloupe country flag" }, "flag_gq": { "unicode": "1f1ec-1f1f6", "shortname": ":flag_gq:", "aliases": ":gq:", "keywords": "equatorial guinea country flag" }, "flag_gr": { "unicode": "1f1ec-1f1f7", "shortname": ":flag_gr:", "aliases": ":gr:", "keywords": "greece country flag" }, "flag_gs": { "unicode": "1f1ec-1f1f8", "shortname": ":flag_gs:", "aliases": ":gs:", "keywords": "south georgia country flag" }, "flag_gt": { "unicode": "1f1ec-1f1f9", "shortname": ":flag_gt:", "aliases": ":gt:", "keywords": "guatemala country flag" }, "flag_gu": { "unicode": "1f1ec-1f1fa", "shortname": ":flag_gu:", "aliases": ":gu:", "keywords": "guam country flag" }, "flag_gw": { "unicode": "1f1ec-1f1fc", "shortname": ":flag_gw:", "aliases": ":gw:", "keywords": "guinea-bissau country flag" }, "flag_gy": { "unicode": "1f1ec-1f1fe", "shortname": ":flag_gy:", "aliases": ":gy:", "keywords": "guyana country flag" }, "flag_hk": { "unicode": "1f1ed-1f1f0", "shortname": ":flag_hk:", "aliases": ":hk:", "keywords": "hong kong country flag" }, "flag_hm": { "unicode": "1f1ed-1f1f2", "shortname": ":flag_hm:", "aliases": ":hm:", "keywords": "heard island and mcdonald islands country flag" }, "flag_hn": { "unicode": "1f1ed-1f1f3", "shortname": ":flag_hn:", "aliases": ":hn:", "keywords": "honduras country flag" }, "flag_hr": { "unicode": "1f1ed-1f1f7", "shortname": ":flag_hr:", "aliases": ":hr:", "keywords": "croatia country flag" }, "flag_ht": { "unicode": "1f1ed-1f1f9", "shortname": ":flag_ht:", "aliases": ":ht:", "keywords": "haiti country flag" }, "flag_hu": { "unicode": "1f1ed-1f1fa", "shortname": ":flag_hu:", "aliases": ":hu:", "keywords": "hungary country flag" }, "flag_ic": { "unicode": "1f1ee-1f1e8", "shortname": ":flag_ic:", "aliases": ":ic:", "keywords": "canary islands country flag" }, "flag_id": { "unicode": "1f1ee-1f1e9", "shortname": ":flag_id:", "aliases": ":indonesia:", "keywords": "indonesia country flag" }, "flag_ie": { "unicode": "1f1ee-1f1ea", "shortname": ":flag_ie:", "aliases": ":ie:", "keywords": "ireland country flag" }, "flag_il": { "unicode": "1f1ee-1f1f1", "shortname": ":flag_il:", "aliases": ":il:", "keywords": "israel jew country flag" }, "flag_im": { "unicode": "1f1ee-1f1f2", "shortname": ":flag_im:", "aliases": ":im:", "keywords": "isle of man country flag" }, "flag_in": { "unicode": "1f1ee-1f1f3", "shortname": ":flag_in:", "aliases": ":in:", "keywords": "india country flag" }, "flag_io": { "unicode": "1f1ee-1f1f4", "shortname": ":flag_io:", "aliases": ":io:", "keywords": "british indian ocean territory country flag" }, "flag_iq": { "unicode": "1f1ee-1f1f6", "shortname": ":flag_iq:", "aliases": ":iq:", "keywords": "iraq country flag" }, "flag_ir": { "unicode": "1f1ee-1f1f7", "shortname": ":flag_ir:", "aliases": ":ir:", "keywords": "iran country flag" }, "flag_is": { "unicode": "1f1ee-1f1f8", "shortname": ":flag_is:", "aliases": ":is:", "keywords": "iceland country flag" }, "flag_it": { "unicode": "1f1ee-1f1f9", "shortname": ":flag_it:", "aliases": ":it:", "keywords": "italy italian country flag" }, "flag_je": { "unicode": "1f1ef-1f1ea", "shortname": ":flag_je:", "aliases": ":je:", "keywords": "jersey country flag" }, "flag_jm": { "unicode": "1f1ef-1f1f2", "shortname": ":flag_jm:", "aliases": ":jm:", "keywords": "jamaica country flag" }, "flag_jo": { "unicode": "1f1ef-1f1f4", "shortname": ":flag_jo:", "aliases": ":jo:", "keywords": "jordan country flag" }, "flag_jp": { "unicode": "1f1ef-1f1f5", "shortname": ":flag_jp:", "aliases": ":jp:", "keywords": "japan japan country flag" }, "flag_ke": { "unicode": "1f1f0-1f1ea", "shortname": ":flag_ke:", "aliases": ":ke:", "keywords": "kenya country flag" }, "flag_kg": { "unicode": "1f1f0-1f1ec", "shortname": ":flag_kg:", "aliases": ":kg:", "keywords": "kyrgyzstan country flag" }, "flag_kh": { "unicode": "1f1f0-1f1ed", "shortname": ":flag_kh:", "aliases": ":kh:", "keywords": "cambodia country flag" }, "flag_ki": { "unicode": "1f1f0-1f1ee", "shortname": ":flag_ki:", "aliases": ":ki:", "keywords": "kiribati country flag" }, "flag_km": { "unicode": "1f1f0-1f1f2", "shortname": ":flag_km:", "aliases": ":km:", "keywords": "the comoros country flag" }, "flag_kn": { "unicode": "1f1f0-1f1f3", "shortname": ":flag_kn:", "aliases": ":kn:", "keywords": "saint kitts and nevis country flag" }, "flag_kp": { "unicode": "1f1f0-1f1f5", "shortname": ":flag_kp:", "aliases": ":kp:", "keywords": "north korea country flag" }, "flag_kr": { "unicode": "1f1f0-1f1f7", "shortname": ":flag_kr:", "aliases": ":kr:", "keywords": "korea country flag" }, "flag_kw": { "unicode": "1f1f0-1f1fc", "shortname": ":flag_kw:", "aliases": ":kw:", "keywords": "kuwait country flag" }, "flag_ky": { "unicode": "1f1f0-1f1fe", "shortname": ":flag_ky:", "aliases": ":ky:", "keywords": "cayman islands country flag" }, "flag_kz": { "unicode": "1f1f0-1f1ff", "shortname": ":flag_kz:", "aliases": ":kz:", "keywords": "kazakhstan country flag" }, "flag_la": { "unicode": "1f1f1-1f1e6", "shortname": ":flag_la:", "aliases": ":la:", "keywords": "laos country flag" }, "flag_lb": { "unicode": "1f1f1-1f1e7", "shortname": ":flag_lb:", "aliases": ":lb:", "keywords": "lebanon country flag" }, "flag_lc": { "unicode": "1f1f1-1f1e8", "shortname": ":flag_lc:", "aliases": ":lc:", "keywords": "saint lucia country flag" }, "flag_li": { "unicode": "1f1f1-1f1ee", "shortname": ":flag_li:", "aliases": ":li:", "keywords": "liechtenstein country flag" }, "flag_lk": { "unicode": "1f1f1-1f1f0", "shortname": ":flag_lk:", "aliases": ":lk:", "keywords": "sri lanka country flag" }, "flag_lr": { "unicode": "1f1f1-1f1f7", "shortname": ":flag_lr:", "aliases": ":lr:", "keywords": "liberia country flag" }, "flag_ls": { "unicode": "1f1f1-1f1f8", "shortname": ":flag_ls:", "aliases": ":ls:", "keywords": "lesotho country flag" }, "flag_lt": { "unicode": "1f1f1-1f1f9", "shortname": ":flag_lt:", "aliases": ":lt:", "keywords": "lithuania country flag" }, "flag_lu": { "unicode": "1f1f1-1f1fa", "shortname": ":flag_lu:", "aliases": ":lu:", "keywords": "luxembourg country flag" }, "flag_lv": { "unicode": "1f1f1-1f1fb", "shortname": ":flag_lv:", "aliases": ":lv:", "keywords": "latvia country flag" }, "flag_ly": { "unicode": "1f1f1-1f1fe", "shortname": ":flag_ly:", "aliases": ":ly:", "keywords": "libya country flag" }, "flag_ma": { "unicode": "1f1f2-1f1e6", "shortname": ":flag_ma:", "aliases": ":ma:", "keywords": "morocco country flag" }, "flag_mc": { "unicode": "1f1f2-1f1e8", "shortname": ":flag_mc:", "aliases": ":mc:", "keywords": "monaco country flag" }, "flag_md": { "unicode": "1f1f2-1f1e9", "shortname": ":flag_md:", "aliases": ":md:", "keywords": "moldova country flag" }, "flag_me": { "unicode": "1f1f2-1f1ea", "shortname": ":flag_me:", "aliases": ":me:", "keywords": "montenegro country flag" }, "flag_mf": { "unicode": "1f1f2-1f1eb", "shortname": ":flag_mf:", "aliases": ":mf:", "keywords": "saint martin country flag" }, "flag_mg": { "unicode": "1f1f2-1f1ec", "shortname": ":flag_mg:", "aliases": ":mg:", "keywords": "madagascar country flag" }, "flag_mh": { "unicode": "1f1f2-1f1ed", "shortname": ":flag_mh:", "aliases": ":mh:", "keywords": "the marshall islands country flag" }, "flag_mk": { "unicode": "1f1f2-1f1f0", "shortname": ":flag_mk:", "aliases": ":mk:", "keywords": "macedonia country flag" }, "flag_ml": { "unicode": "1f1f2-1f1f1", "shortname": ":flag_ml:", "aliases": ":ml:", "keywords": "mali country flag" }, "flag_mm": { "unicode": "1f1f2-1f1f2", "shortname": ":flag_mm:", "aliases": ":mm:", "keywords": "myanmar country flag" }, "flag_mn": { "unicode": "1f1f2-1f1f3", "shortname": ":flag_mn:", "aliases": ":mn:", "keywords": "mongolia country flag" }, "flag_mo": { "unicode": "1f1f2-1f1f4", "shortname": ":flag_mo:", "aliases": ":mo:", "keywords": "macau country flag" }, "flag_mp": { "unicode": "1f1f2-1f1f5", "shortname": ":flag_mp:", "aliases": ":mp:", "keywords": "northern mariana islands country flag" }, "flag_mq": { "unicode": "1f1f2-1f1f6", "shortname": ":flag_mq:", "aliases": ":mq:", "keywords": "martinique country flag" }, "flag_mr": { "unicode": "1f1f2-1f1f7", "shortname": ":flag_mr:", "aliases": ":mr:", "keywords": "mauritania country flag" }, "flag_ms": { "unicode": "1f1f2-1f1f8", "shortname": ":flag_ms:", "aliases": ":ms:", "keywords": "montserrat country flag" }, "flag_mt": { "unicode": "1f1f2-1f1f9", "shortname": ":flag_mt:", "aliases": ":mt:", "keywords": "malta country flag" }, "flag_mu": { "unicode": "1f1f2-1f1fa", "shortname": ":flag_mu:", "aliases": ":mu:", "keywords": "mauritius country flag" }, "flag_mv": { "unicode": "1f1f2-1f1fb", "shortname": ":flag_mv:", "aliases": ":mv:", "keywords": "maldives country flag" }, "flag_mw": { "unicode": "1f1f2-1f1fc", "shortname": ":flag_mw:", "aliases": ":mw:", "keywords": "malawi country flag" }, "flag_mx": { "unicode": "1f1f2-1f1fd", "shortname": ":flag_mx:", "aliases": ":mx:", "keywords": "mexico country mexican flag" }, "flag_my": { "unicode": "1f1f2-1f1fe", "shortname": ":flag_my:", "aliases": ":my:", "keywords": "malaysia country flag" }, "flag_mz": { "unicode": "1f1f2-1f1ff", "shortname": ":flag_mz:", "aliases": ":mz:", "keywords": "mozambique country flag" }, "flag_na": { "unicode": "1f1f3-1f1e6", "shortname": ":flag_na:", "aliases": ":na:", "keywords": "namibia country flag" }, "flag_nc": { "unicode": "1f1f3-1f1e8", "shortname": ":flag_nc:", "aliases": ":nc:", "keywords": "new caledonia country flag" }, "flag_ne": { "unicode": "1f1f3-1f1ea", "shortname": ":flag_ne:", "aliases": ":ne:", "keywords": "niger country flag" }, "flag_nf": { "unicode": "1f1f3-1f1eb", "shortname": ":flag_nf:", "aliases": ":nf:", "keywords": "norfolk island country flag" }, "flag_ng": { "unicode": "1f1f3-1f1ec", "shortname": ":flag_ng:", "aliases": ":nigeria:", "keywords": "nigeria country flag" }, "flag_ni": { "unicode": "1f1f3-1f1ee", "shortname": ":flag_ni:", "aliases": ":ni:", "keywords": "nicaragua country flag" }, "flag_nl": { "unicode": "1f1f3-1f1f1", "shortname": ":flag_nl:", "aliases": ":nl:", "keywords": "the netherlands country flag" }, "flag_no": { "unicode": "1f1f3-1f1f4", "shortname": ":flag_no:", "aliases": ":no:", "keywords": "norway country flag" }, "flag_np": { "unicode": "1f1f3-1f1f5", "shortname": ":flag_np:", "aliases": ":np:", "keywords": "nepal country flag" }, "flag_nr": { "unicode": "1f1f3-1f1f7", "shortname": ":flag_nr:", "aliases": ":nr:", "keywords": "nauru country flag" }, "flag_nu": { "unicode": "1f1f3-1f1fa", "shortname": ":flag_nu:", "aliases": ":nu:", "keywords": "niue country flag" }, "flag_nz": { "unicode": "1f1f3-1f1ff", "shortname": ":flag_nz:", "aliases": ":nz:", "keywords": "new zealand country flag" }, "flag_om": { "unicode": "1f1f4-1f1f2", "shortname": ":flag_om:", "aliases": ":om:", "keywords": "oman country flag" }, "flag_pa": { "unicode": "1f1f5-1f1e6", "shortname": ":flag_pa:", "aliases": ":pa:", "keywords": "panama country flag" }, "flag_pe": { "unicode": "1f1f5-1f1ea", "shortname": ":flag_pe:", "aliases": ":pe:", "keywords": "peru country flag" }, "flag_pf": { "unicode": "1f1f5-1f1eb", "shortname": ":flag_pf:", "aliases": ":pf:", "keywords": "french polynesia country flag" }, "flag_pg": { "unicode": "1f1f5-1f1ec", "shortname": ":flag_pg:", "aliases": ":pg:", "keywords": "papua new guinea country flag" }, "flag_ph": { "unicode": "1f1f5-1f1ed", "shortname": ":flag_ph:", "aliases": ":ph:", "keywords": "the philippines country flag" }, "flag_pk": { "unicode": "1f1f5-1f1f0", "shortname": ":flag_pk:", "aliases": ":pk:", "keywords": "pakistan country flag" }, "flag_pl": { "unicode": "1f1f5-1f1f1", "shortname": ":flag_pl:", "aliases": ":pl:", "keywords": "poland country flag" }, "flag_pm": { "unicode": "1f1f5-1f1f2", "shortname": ":flag_pm:", "aliases": ":pm:", "keywords": "saint pierre and miquelon country flag" }, "flag_pn": { "unicode": "1f1f5-1f1f3", "shortname": ":flag_pn:", "aliases": ":pn:", "keywords": "pitcairn country flag" }, "flag_pr": { "unicode": "1f1f5-1f1f7", "shortname": ":flag_pr:", "aliases": ":pr:", "keywords": "puerto rico country flag" }, "flag_ps": { "unicode": "1f1f5-1f1f8", "shortname": ":flag_ps:", "aliases": ":ps:", "keywords": "palestinian authority country flag" }, "flag_pt": { "unicode": "1f1f5-1f1f9", "shortname": ":flag_pt:", "aliases": ":pt:", "keywords": "portugal country flag" }, "flag_pw": { "unicode": "1f1f5-1f1fc", "shortname": ":flag_pw:", "aliases": ":pw:", "keywords": "palau country flag" }, "flag_py": { "unicode": "1f1f5-1f1fe", "shortname": ":flag_py:", "aliases": ":py:", "keywords": "paraguay country flag" }, "flag_qa": { "unicode": "1f1f6-1f1e6", "shortname": ":flag_qa:", "aliases": ":qa:", "keywords": "qatar country flag" }, "flag_re": { "unicode": "1f1f7-1f1ea", "shortname": ":flag_re:", "aliases": ":re:", "keywords": "r\u00e9union country flag" }, "flag_ro": { "unicode": "1f1f7-1f1f4", "shortname": ":flag_ro:", "aliases": ":ro:", "keywords": "romania country flag" }, "flag_rs": { "unicode": "1f1f7-1f1f8", "shortname": ":flag_rs:", "aliases": ":rs:", "keywords": "serbia country flag" }, "flag_ru": { "unicode": "1f1f7-1f1fa", "shortname": ":flag_ru:", "aliases": ":ru:", "keywords": "russia country flag" }, "flag_rw": { "unicode": "1f1f7-1f1fc", "shortname": ":flag_rw:", "aliases": ":rw:", "keywords": "rwanda country flag" }, "flag_sa": { "unicode": "1f1f8-1f1e6", "shortname": ":flag_sa:", "aliases": ":saudiarabia: :saudi:", "keywords": "saudi arabia country flag" }, "flag_sb": { "unicode": "1f1f8-1f1e7", "shortname": ":flag_sb:", "aliases": ":sb:", "keywords": "the solomon islands country flag" }, "flag_sc": { "unicode": "1f1f8-1f1e8", "shortname": ":flag_sc:", "aliases": ":sc:", "keywords": "the seychelles country flag" }, "flag_sd": { "unicode": "1f1f8-1f1e9", "shortname": ":flag_sd:", "aliases": ":sd:", "keywords": "sudan country flag" }, "flag_se": { "unicode": "1f1f8-1f1ea", "shortname": ":flag_se:", "aliases": ":se:", "keywords": "sweden country flag" }, "flag_sg": { "unicode": "1f1f8-1f1ec", "shortname": ":flag_sg:", "aliases": ":sg:", "keywords": "singapore country flag" }, "flag_sh": { "unicode": "1f1f8-1f1ed", "shortname": ":flag_sh:", "aliases": ":sh:", "keywords": "saint helena country flag" }, "flag_si": { "unicode": "1f1f8-1f1ee", "shortname": ":flag_si:", "aliases": ":si:", "keywords": "slovenia country flag" }, "flag_sj": { "unicode": "1f1f8-1f1ef", "shortname": ":flag_sj:", "aliases": ":sj:", "keywords": "svalbard and jan mayen country flag" }, "flag_sk": { "unicode": "1f1f8-1f1f0", "shortname": ":flag_sk:", "aliases": ":sk:", "keywords": "slovakia country flag" }, "flag_sl": { "unicode": "1f1f8-1f1f1", "shortname": ":flag_sl:", "aliases": ":sl:", "keywords": "sierra leone country flag" }, "flag_sm": { "unicode": "1f1f8-1f1f2", "shortname": ":flag_sm:", "aliases": ":sm:", "keywords": "san marino country flag" }, "flag_sn": { "unicode": "1f1f8-1f1f3", "shortname": ":flag_sn:", "aliases": ":sn:", "keywords": "senegal country flag" }, "flag_so": { "unicode": "1f1f8-1f1f4", "shortname": ":flag_so:", "aliases": ":so:", "keywords": "somalia country flag" }, "flag_sr": { "unicode": "1f1f8-1f1f7", "shortname": ":flag_sr:", "aliases": ":sr:", "keywords": "suriname country flag" }, "flag_ss": { "unicode": "1f1f8-1f1f8", "shortname": ":flag_ss:", "aliases": ":ss:", "keywords": "south sudan country flag" }, "flag_st": { "unicode": "1f1f8-1f1f9", "shortname": ":flag_st:", "aliases": ":st:", "keywords": "s\u00e3o tom\u00e9 and pr\u00edncipe country flag" }, "flag_sv": { "unicode": "1f1f8-1f1fb", "shortname": ":flag_sv:", "aliases": ":sv:", "keywords": "el salvador country flag" }, "flag_sx": { "unicode": "1f1f8-1f1fd", "shortname": ":flag_sx:", "aliases": ":sx:", "keywords": "sint maarten country flag" }, "flag_sy": { "unicode": "1f1f8-1f1fe", "shortname": ":flag_sy:", "aliases": ":sy:", "keywords": "syria country flag" }, "flag_sz": { "unicode": "1f1f8-1f1ff", "shortname": ":flag_sz:", "aliases": ":sz:", "keywords": "swaziland country flag" }, "flag_ta": { "unicode": "1f1f9-1f1e6", "shortname": ":flag_ta:", "aliases": ":ta:", "keywords": "tristan da cunha country flag" }, "flag_tc": { "unicode": "1f1f9-1f1e8", "shortname": ":flag_tc:", "aliases": ":tc:", "keywords": "turks and caicos islands country flag" }, "flag_td": { "unicode": "1f1f9-1f1e9", "shortname": ":flag_td:", "aliases": ":td:", "keywords": "chad country flag" }, "flag_tf": { "unicode": "1f1f9-1f1eb", "shortname": ":flag_tf:", "aliases": ":tf:", "keywords": "french southern territories country flag" }, "flag_tg": { "unicode": "1f1f9-1f1ec", "shortname": ":flag_tg:", "aliases": ":tg:", "keywords": "togo country flag" }, "flag_th": { "unicode": "1f1f9-1f1ed", "shortname": ":flag_th:", "aliases": ":th:", "keywords": "thailand country flag" }, "flag_tj": { "unicode": "1f1f9-1f1ef", "shortname": ":flag_tj:", "aliases": ":tj:", "keywords": "tajikistan country flag" }, "flag_tk": { "unicode": "1f1f9-1f1f0", "shortname": ":flag_tk:", "aliases": ":tk:", "keywords": "tokelau country flag" }, "flag_tl": { "unicode": "1f1f9-1f1f1", "shortname": ":flag_tl:", "aliases": ":tl:", "keywords": "timor-leste country flag" }, "flag_tm": { "unicode": "1f1f9-1f1f2", "shortname": ":flag_tm:", "aliases": ":turkmenistan:", "keywords": "turkmenistan country flag" }, "flag_tn": { "unicode": "1f1f9-1f1f3", "shortname": ":flag_tn:", "aliases": ":tn:", "keywords": "tunisia country flag" }, "flag_to": { "unicode": "1f1f9-1f1f4", "shortname": ":flag_to:", "aliases": ":to:", "keywords": "tonga country flag" }, "flag_tr": { "unicode": "1f1f9-1f1f7", "shortname": ":flag_tr:", "aliases": ":tr:", "keywords": "turkey country flag" }, "flag_tt": { "unicode": "1f1f9-1f1f9", "shortname": ":flag_tt:", "aliases": ":tt:", "keywords": "trinidad and tobago country flag" }, "flag_tv": { "unicode": "1f1f9-1f1fb", "shortname": ":flag_tv:", "aliases": ":tuvalu:", "keywords": "tuvalu country flag" }, "flag_tw": { "unicode": "1f1f9-1f1fc", "shortname": ":flag_tw:", "aliases": ":tw:", "keywords": "the republic of china country flag" }, "flag_tz": { "unicode": "1f1f9-1f1ff", "shortname": ":flag_tz:", "aliases": ":tz:", "keywords": "tanzania country flag" }, "flag_ua": { "unicode": "1f1fa-1f1e6", "shortname": ":flag_ua:", "aliases": ":ua:", "keywords": "ukraine country flag" }, "flag_ug": { "unicode": "1f1fa-1f1ec", "shortname": ":flag_ug:", "aliases": ":ug:", "keywords": "uganda country flag" }, "flag_um": { "unicode": "1f1fa-1f1f2", "shortname": ":flag_um:", "aliases": ":um:", "keywords": "united states minor outlying islands country flag" }, "flag_us": { "unicode": "1f1fa-1f1f8", "shortname": ":flag_us:", "aliases": ":us:", "keywords": "united states america country flag" }, "flag_uy": { "unicode": "1f1fa-1f1fe", "shortname": ":flag_uy:", "aliases": ":uy:", "keywords": "uruguay country flag" }, "flag_uz": { "unicode": "1f1fa-1f1ff", "shortname": ":flag_uz:", "aliases": ":uz:", "keywords": "uzbekistan country flag" }, "flag_va": { "unicode": "1f1fb-1f1e6", "shortname": ":flag_va:", "aliases": ":va:", "keywords": "the vatican city country flag" }, "flag_vc": { "unicode": "1f1fb-1f1e8", "shortname": ":flag_vc:", "aliases": ":vc:", "keywords": "saint vincent and the grenadines country flag" }, "flag_ve": { "unicode": "1f1fb-1f1ea", "shortname": ":flag_ve:", "aliases": ":ve:", "keywords": "venezuela country flag" }, "flag_vg": { "unicode": "1f1fb-1f1ec", "shortname": ":flag_vg:", "aliases": ":vg:", "keywords": "british virgin islands country flag" }, "flag_vi": { "unicode": "1f1fb-1f1ee", "shortname": ":flag_vi:", "aliases": ":vi:", "keywords": "u.s. virgin islands country flag" }, "flag_vn": { "unicode": "1f1fb-1f1f3", "shortname": ":flag_vn:", "aliases": ":vn:", "keywords": "vietnam country flag" }, "flag_vu": { "unicode": "1f1fb-1f1fa", "shortname": ":flag_vu:", "aliases": ":vu:", "keywords": "vanuatu country flag" }, "flag_wf": { "unicode": "1f1fc-1f1eb", "shortname": ":flag_wf:", "aliases": ":wf:", "keywords": "wallis and futuna country flag" }, "flag_ws": { "unicode": "1f1fc-1f1f8", "shortname": ":flag_ws:", "aliases": ":ws:", "keywords": "samoa country flag" }, "flag_xk": { "unicode": "1f1fd-1f1f0", "shortname": ":flag_xk:", "aliases": ":xk:", "keywords": "kosovo country flag" }, "flag_ye": { "unicode": "1f1fe-1f1ea", "shortname": ":flag_ye:", "aliases": ":ye:", "keywords": "yemen country flag" }, "flag_yt": { "unicode": "1f1fe-1f1f9", "shortname": ":flag_yt:", "aliases": ":yt:", "keywords": "mayotte country flag" }, "flag_za": { "unicode": "1f1ff-1f1e6", "shortname": ":flag_za:", "aliases": ":za:", "keywords": "south africa country flag" }, "flag_zm": { "unicode": "1f1ff-1f1f2", "shortname": ":flag_zm:", "aliases": ":zm:", "keywords": "zambia country flag" }, "flag_zw": { "unicode": "1f1ff-1f1fc", "shortname": ":flag_zw:", "aliases": ":zw:", "keywords": "zimbabwe country flag" }, "regional_indicator_z": { "unicode": "1f1ff", "shortname": ":regional_indicator_z:", "aliases": "", "keywords": "regional indicator symbol letter z" }, "regional_indicator_y": { "unicode": "1f1fe", "shortname": ":regional_indicator_y:", "aliases": "", "keywords": "regional indicator symbol letter y" }, "regional_indicator_x": { "unicode": "1f1fd", "shortname": ":regional_indicator_x:", "aliases": "", "keywords": "regional indicator symbol letter x" }, "regional_indicator_w": { "unicode": "1f1fc", "shortname": ":regional_indicator_w:", "aliases": "", "keywords": "regional indicator symbol letter w" }, "regional_indicator_v": { "unicode": "1f1fb", "shortname": ":regional_indicator_v:", "aliases": "", "keywords": "regional indicator symbol letter v" }, "regional_indicator_u": { "unicode": "1f1fa", "shortname": ":regional_indicator_u:", "aliases": "", "keywords": "regional indicator symbol letter u" }, "regional_indicator_t": { "unicode": "1f1f9", "shortname": ":regional_indicator_t:", "aliases": "", "keywords": "regional indicator symbol letter t" }, "regional_indicator_s": { "unicode": "1f1f8", "shortname": ":regional_indicator_s:", "aliases": "", "keywords": "regional indicator symbol letter s" }, "regional_indicator_r": { "unicode": "1f1f7", "shortname": ":regional_indicator_r:", "aliases": "", "keywords": "regional indicator symbol letter r" }, "regional_indicator_q": { "unicode": "1f1f6", "shortname": ":regional_indicator_q:", "aliases": "", "keywords": "regional indicator symbol letter q" }, "regional_indicator_p": { "unicode": "1f1f5", "shortname": ":regional_indicator_p:", "aliases": "", "keywords": "regional indicator symbol letter p" }, "regional_indicator_o": { "unicode": "1f1f4", "shortname": ":regional_indicator_o:", "aliases": "", "keywords": "regional indicator symbol letter o" }, "regional_indicator_n": { "unicode": "1f1f3", "shortname": ":regional_indicator_n:", "aliases": "", "keywords": "regional indicator symbol letter n" }, "regional_indicator_m": { "unicode": "1f1f2", "shortname": ":regional_indicator_m:", "aliases": "", "keywords": "regional indicator symbol letter m" }, "regional_indicator_l": { "unicode": "1f1f1", "shortname": ":regional_indicator_l:", "aliases": "", "keywords": "regional indicator symbol letter l" }, "regional_indicator_k": { "unicode": "1f1f0", "shortname": ":regional_indicator_k:", "aliases": "", "keywords": "regional indicator symbol letter k" }, "regional_indicator_j": { "unicode": "1f1ef", "shortname": ":regional_indicator_j:", "aliases": "", "keywords": "regional indicator symbol letter j" }, "regional_indicator_i": { "unicode": "1f1ee", "shortname": ":regional_indicator_i:", "aliases": "", "keywords": "regional indicator symbol letter i" }, "regional_indicator_h": { "unicode": "1f1ed", "shortname": ":regional_indicator_h:", "aliases": "", "keywords": "regional indicator symbol letter h" }, "regional_indicator_g": { "unicode": "1f1ec", "shortname": ":regional_indicator_g:", "aliases": "", "keywords": "regional indicator symbol letter g" }, "regional_indicator_f": { "unicode": "1f1eb", "shortname": ":regional_indicator_f:", "aliases": "", "keywords": "regional indicator symbol letter f" }, "regional_indicator_e": { "unicode": "1f1ea", "shortname": ":regional_indicator_e:", "aliases": "", "keywords": "regional indicator symbol letter e" }, "regional_indicator_d": { "unicode": "1f1e9", "shortname": ":regional_indicator_d:", "aliases": "", "keywords": "regional indicator symbol letter d" }, "regional_indicator_c": { "unicode": "1f1e8", "shortname": ":regional_indicator_c:", "aliases": "", "keywords": "regional indicator symbol letter c" }, "regional_indicator_b": { "unicode": "1f1e7", "shortname": ":regional_indicator_b:", "aliases": "", "keywords": "regional indicator symbol letter b" }, "regional_indicator_a": { "unicode": "1f1e6", "shortname": ":regional_indicator_a:", "aliases": "", "keywords": "regional indicator symbol letter a" } };


/* ---- /1CWkZv7fQAKxTVjZVrLZ8VHcrN6YGGcdky/js/gifffer.min.js ---- */


(function webpackUniversalModuleDefinition(root,factory){if(typeof exports==="object"&&typeof module==="object")module.exports=factory();else if(typeof define==="function"&&define.amd)define("Gifffer",[],factory);else if(typeof exports==="object")exports["Gifffer"]=factory();else root["Gifffer"]=factory()})(this,function(){var d=document;var playSize=60;var Gifffer=function(options){var images,i=0,gifs=[];images=d.querySelectorAll("[data-gifffer]");for(;i<images.length;++i)process(images[i],gifs,options);return gifs};function formatUnit(v){return v+(v.toString().indexOf("%")>0?"":"px")}function parseStyles(styles){var stylesStr="";for(prop in styles)stylesStr+=prop+":"+styles[prop]+";";return stylesStr}function createContainer(w,h,el,altText,opts){var alt;var con=d.createElement("BUTTON");var cls=el.getAttribute("class");var id=el.getAttribute("id");var playButtonStyles=opts&&opts.playButtonStyles?parseStyles(opts.playButtonStyles):["width:"+playSize+"px","height:"+playSize+"px","border-radius:"+playSize/2+"px","background:rgba(0, 0, 0, 0.3)","position:absolute","top:50%","left:50%","margin:-"+playSize/2+"px"].join(";");var playButtonIconStyles=opts&&opts.playButtonIconStyles?parseStyles(opts.playButtonIconStyles):["width: 0","height: 0","border-top: 14px solid transparent","border-bottom: 14px solid transparent","border-left: 14px solid rgba(0, 0, 0, 0.5)","position: absolute","left: 26px","top: 16px"].join(";");cls?con.setAttribute("class",el.getAttribute("class")):null;id?con.setAttribute("id",el.getAttribute("id")):null;con.setAttribute("style","position:relative;cursor:pointer;background:none;border:none;padding:0;");con.setAttribute("aria-hidden","true");var play=d.createElement("DIV");play.setAttribute("class","gifffer-play-button");play.setAttribute("style",playButtonStyles);var trngl=d.createElement("DIV");trngl.setAttribute("style",playButtonIconStyles);play.appendChild(trngl);if(altText){alt=d.createElement("p");alt.setAttribute("class","gifffer-alt");alt.setAttribute("style","border:0;clip:rect(0 0 0 0);height:1px;overflow:hidden;padding:0;position:absolute;width:1px;");alt.innerText=altText+", image"}con.appendChild(play);el.parentNode.replaceChild(con,el);altText?con.parentNode.insertBefore(alt,con.nextSibling):null;return{c:con,p:play}}function calculatePercentageDim(el,w,h,wOrig,hOrig){var parentDimW=el.parentNode.offsetWidth;var parentDimH=el.parentNode.offsetHeight;var ratio=wOrig/hOrig;if(w.toString().indexOf("%")>0){w=parseInt(w.toString().replace("%",""));w=w/100*parentDimW;h=w/ratio}else if(h.toString().indexOf("%")>0){h=parseInt(h.toString().replace("%",""));h=h/100*parentDimW;w=h/ratio}return{w:w,h:h}}function process(el,gifs,options){var url,con,c,w,h,duration,play,gif,playing=false,cc,isC,durationTimeout,dims,altText;url=el.getAttribute("data-gifffer");w=el.getAttribute("data-gifffer-width");h=el.getAttribute("data-gifffer-height");duration=el.getAttribute("data-gifffer-duration");altText=el.getAttribute("data-gifffer-alt");el.style.display="block";c=document.createElement("canvas");isC=!!(c.getContext&&c.getContext("2d"));if(w&&h&&isC)cc=createContainer(w,h,el,altText,options);el.onload=function(){if(!isC)return;w=w||el.width;h=h||el.height;if(!cc)cc=createContainer(w,h,el,altText,options);con=cc.c;play=cc.p;dims=calculatePercentageDim(con,w,h,el.width,el.height);gifs.push(con);con.addEventListener("click",function(){clearTimeout(durationTimeout);if(!playing){playing=true;gif=document.createElement("IMG");gif.setAttribute("style","width:100%;height:100%;");gif.setAttribute("data-uri",Math.floor(Math.random()*1e5)+1);setTimeout(function(){gif.src=url},0);con.removeChild(play);con.removeChild(c);con.appendChild(gif);if(parseInt(duration)>0){durationTimeout=setTimeout(function(){playing=false;con.appendChild(play);con.removeChild(gif);con.appendChild(c);gif=null},duration)}}else{playing=false;con.appendChild(play);con.removeChild(gif);con.appendChild(c);gif=null}});c.width=dims.w;c.height=dims.h;c.getContext("2d").drawImage(el,0,0,dims.w,dims.h);con.appendChild(c);con.setAttribute("style","position:relative;cursor:pointer;width:"+dims.w+"px;height:"+dims.h+"px;background:none;border:none;padding:0;");c.style.width="100%";c.style.height="100%";if(w.toString().indexOf("%")>0&&h.toString().indexOf("%")>0){con.style.width=w;con.style.height=h}else if(w.toString().indexOf("%")>0){con.style.width=w;con.style.height="inherit"}else if(h.toString().indexOf("%")>0){con.style.width="inherit";con.style.height=h}else{con.style.width=dims.w+"px";con.style.height=dims.h+"px"}};el.src=url}return Gifffer});


/* ---- /1CWkZv7fQAKxTVjZVrLZ8VHcrN6YGGcdky/js/highlight.pack.js ---- */


/*! highlight.js v9.10.0 | BSD3 License | git.io/hljslicense */
!function(e){var n="object"==typeof window&&window||"object"==typeof self&&self;"undefined"!=typeof exports?e(exports):n&&(n.hljs=e({}),"function"==typeof define&&define.amd&&define([],function(){return n.hljs}))}(function(e){function n(e){return e.replace(/[&<>]/gm,function(e){return j[e]})}function t(e){return e.nodeName.toLowerCase()}function r(e,n){var t=e&&e.exec(n);return t&&0===t.index}function a(e){return k.test(e)}function i(e){var n,t,r,i,o=e.className+" ";if(o+=e.parentNode?e.parentNode.className:"",t=B.exec(o))return w(t[1])?t[1]:"no-highlight";for(o=o.split(/\s+/),n=0,r=o.length;r>n;n++)if(i=o[n],a(i)||w(i))return i}function o(e){var n,t={},r=Array.prototype.slice.call(arguments,1);for(n in e)t[n]=e[n];return r.forEach(function(e){for(n in e)t[n]=e[n]}),t}function u(e){var n=[];return function r(e,a){for(var i=e.firstChild;i;i=i.nextSibling)3===i.nodeType?a+=i.nodeValue.length:1===i.nodeType&&(n.push({event:"start",offset:a,node:i}),a=r(i,a),t(i).match(/br|hr|img|input/)||n.push({event:"stop",offset:a,node:i}));return a}(e,0),n}function c(e,r,a){function i(){return e.length&&r.length?e[0].offset!==r[0].offset?e[0].offset<r[0].offset?e:r:"start"===r[0].event?e:r:e.length?e:r}function o(e){function r(e){return" "+e.nodeName+'="'+n(e.value)+'"'}l+="<"+t(e)+E.map.call(e.attributes,r).join("")+">"}function u(e){l+="</"+t(e)+">"}function c(e){("start"===e.event?o:u)(e.node)}for(var s=0,l="",f=[];e.length||r.length;){var g=i();if(l+=n(a.substring(s,g[0].offset)),s=g[0].offset,g===e){f.reverse().forEach(u);do c(g.splice(0,1)[0]),g=i();while(g===e&&g.length&&g[0].offset===s);f.reverse().forEach(o)}else"start"===g[0].event?f.push(g[0].node):f.pop(),c(g.splice(0,1)[0])}return l+n(a.substr(s))}function s(e){return e.v&&!e.cached_variants&&(e.cached_variants=e.v.map(function(n){return o(e,{v:null},n)})),e.cached_variants||e.eW&&[o(e)]||[e]}function l(e){function n(e){return e&&e.source||e}function t(t,r){return new RegExp(n(t),"m"+(e.cI?"i":"")+(r?"g":""))}function r(a,i){if(!a.compiled){if(a.compiled=!0,a.k=a.k||a.bK,a.k){var o={},u=function(n,t){e.cI&&(t=t.toLowerCase()),t.split(" ").forEach(function(e){var t=e.split("|");o[t[0]]=[n,t[1]?Number(t[1]):1]})};"string"==typeof a.k?u("keyword",a.k):x(a.k).forEach(function(e){u(e,a.k[e])}),a.k=o}a.lR=t(a.l||/\w+/,!0),i&&(a.bK&&(a.b="\\b("+a.bK.split(" ").join("|")+")\\b"),a.b||(a.b=/\B|\b/),a.bR=t(a.b),a.e||a.eW||(a.e=/\B|\b/),a.e&&(a.eR=t(a.e)),a.tE=n(a.e)||"",a.eW&&i.tE&&(a.tE+=(a.e?"|":"")+i.tE)),a.i&&(a.iR=t(a.i)),null==a.r&&(a.r=1),a.c||(a.c=[]),a.c=Array.prototype.concat.apply([],a.c.map(function(e){return s("self"===e?a:e)})),a.c.forEach(function(e){r(e,a)}),a.starts&&r(a.starts,i);var c=a.c.map(function(e){return e.bK?"\\.?("+e.b+")\\.?":e.b}).concat([a.tE,a.i]).map(n).filter(Boolean);a.t=c.length?t(c.join("|"),!0):{exec:function(){return null}}}}r(e)}function f(e,t,a,i){function o(e,n){var t,a;for(t=0,a=n.c.length;a>t;t++)if(r(n.c[t].bR,e))return n.c[t]}function u(e,n){if(r(e.eR,n)){for(;e.endsParent&&e.parent;)e=e.parent;return e}return e.eW?u(e.parent,n):void 0}function c(e,n){return!a&&r(n.iR,e)}function s(e,n){var t=N.cI?n[0].toLowerCase():n[0];return e.k.hasOwnProperty(t)&&e.k[t]}function p(e,n,t,r){var a=r?"":I.classPrefix,i='<span class="'+a,o=t?"":C;return i+=e+'">',i+n+o}function h(){var e,t,r,a;if(!E.k)return n(k);for(a="",t=0,E.lR.lastIndex=0,r=E.lR.exec(k);r;)a+=n(k.substring(t,r.index)),e=s(E,r),e?(B+=e[1],a+=p(e[0],n(r[0]))):a+=n(r[0]),t=E.lR.lastIndex,r=E.lR.exec(k);return a+n(k.substr(t))}function d(){var e="string"==typeof E.sL;if(e&&!L[E.sL])return n(k);var t=e?f(E.sL,k,!0,x[E.sL]):g(k,E.sL.length?E.sL:void 0);return E.r>0&&(B+=t.r),e&&(x[E.sL]=t.top),p(t.language,t.value,!1,!0)}function b(){y+=null!=E.sL?d():h(),k=""}function v(e){y+=e.cN?p(e.cN,"",!0):"",E=Object.create(e,{parent:{value:E}})}function m(e,n){if(k+=e,null==n)return b(),0;var t=o(n,E);if(t)return t.skip?k+=n:(t.eB&&(k+=n),b(),t.rB||t.eB||(k=n)),v(t,n),t.rB?0:n.length;var r=u(E,n);if(r){var a=E;a.skip?k+=n:(a.rE||a.eE||(k+=n),b(),a.eE&&(k=n));do E.cN&&(y+=C),E.skip||(B+=E.r),E=E.parent;while(E!==r.parent);return r.starts&&v(r.starts,""),a.rE?0:n.length}if(c(n,E))throw new Error('Illegal lexeme "'+n+'" for mode "'+(E.cN||"<unnamed>")+'"');return k+=n,n.length||1}var N=w(e);if(!N)throw new Error('Unknown language: "'+e+'"');l(N);var R,E=i||N,x={},y="";for(R=E;R!==N;R=R.parent)R.cN&&(y=p(R.cN,"",!0)+y);var k="",B=0;try{for(var M,j,O=0;;){if(E.t.lastIndex=O,M=E.t.exec(t),!M)break;j=m(t.substring(O,M.index),M[0]),O=M.index+j}for(m(t.substr(O)),R=E;R.parent;R=R.parent)R.cN&&(y+=C);return{r:B,value:y,language:e,top:E}}catch(T){if(T.message&&-1!==T.message.indexOf("Illegal"))return{r:0,value:n(t)};throw T}}function g(e,t){t=t||I.languages||x(L);var r={r:0,value:n(e)},a=r;return t.filter(w).forEach(function(n){var t=f(n,e,!1);t.language=n,t.r>a.r&&(a=t),t.r>r.r&&(a=r,r=t)}),a.language&&(r.second_best=a),r}function p(e){return I.tabReplace||I.useBR?e.replace(M,function(e,n){return I.useBR&&"\n"===e?"<br>":I.tabReplace?n.replace(/\t/g,I.tabReplace):""}):e}function h(e,n,t){var r=n?y[n]:t,a=[e.trim()];return e.match(/\bhljs\b/)||a.push("hljs"),-1===e.indexOf(r)&&a.push(r),a.join(" ").trim()}function d(e){var n,t,r,o,s,l=i(e);a(l)||(I.useBR?(n=document.createElementNS("http://www.w3.org/1999/xhtml","div"),n.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n")):n=e,s=n.textContent,r=l?f(l,s,!0):g(s),t=u(n),t.length&&(o=document.createElementNS("http://www.w3.org/1999/xhtml","div"),o.innerHTML=r.value,r.value=c(t,u(o),s)),r.value=p(r.value),e.innerHTML=r.value,e.className=h(e.className,l,r.language),e.result={language:r.language,re:r.r},r.second_best&&(e.second_best={language:r.second_best.language,re:r.second_best.r}))}function b(e){I=o(I,e)}function v(){if(!v.called){v.called=!0;var e=document.querySelectorAll("pre code");E.forEach.call(e,d)}}function m(){addEventListener("DOMContentLoaded",v,!1),addEventListener("load",v,!1)}function N(n,t){var r=L[n]=t(e);r.aliases&&r.aliases.forEach(function(e){y[e]=n})}function R(){return x(L)}function w(e){return e=(e||"").toLowerCase(),L[e]||L[y[e]]}var E=[],x=Object.keys,L={},y={},k=/^(no-?highlight|plain|text)$/i,B=/\blang(?:uage)?-([\w-]+)\b/i,M=/((^(<[^>]+>|\t|)+|(?:\n)))/gm,C="</span>",I={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0},j={"&":"&amp;","<":"&lt;",">":"&gt;"};return e.highlight=f,e.highlightAuto=g,e.fixMarkup=p,e.highlightBlock=d,e.configure=b,e.initHighlighting=v,e.initHighlightingOnLoad=m,e.registerLanguage=N,e.listLanguages=R,e.getLanguage=w,e.inherit=o,e.IR="[a-zA-Z]\\w*",e.UIR="[a-zA-Z_]\\w*",e.NR="\\b\\d+(\\.\\d+)?",e.CNR="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BNR="\\b(0b[01]+)",e.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BE={b:"\\\\[\\s\\S]",r:0},e.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[e.BE]},e.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[e.BE]},e.PWM={b:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/},e.C=function(n,t,r){var a=e.inherit({cN:"comment",b:n,e:t,c:[]},r||{});return a.c.push(e.PWM),a.c.push({cN:"doctag",b:"(?:TODO|FIXME|NOTE|BUG|XXX):",r:0}),a},e.CLCM=e.C("//","$"),e.CBCM=e.C("/\\*","\\*/"),e.HCM=e.C("#","$"),e.NM={cN:"number",b:e.NR,r:0},e.CNM={cN:"number",b:e.CNR,r:0},e.BNM={cN:"number",b:e.BNR,r:0},e.CSSNM={cN:"number",b:e.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0},e.RM={cN:"regexp",b:/\//,e:/\/[gimuy]*/,i:/\n/,c:[e.BE,{b:/\[/,e:/\]/,r:0,c:[e.BE]}]},e.TM={cN:"title",b:e.IR,r:0},e.UTM={cN:"title",b:e.UIR,r:0},e.METHOD_GUARD={b:"\\.\\s*"+e.UIR,r:0},e});hljs.registerLanguage("xml",function(s){var e="[A-Za-z0-9\\._:-]+",t={eW:!0,i:/</,r:0,c:[{cN:"attr",b:e,r:0},{b:/=\s*/,r:0,c:[{cN:"string",endsParent:!0,v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s"'=<>`]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist"],cI:!0,c:[{cN:"meta",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},s.C("<!--","-->",{r:10}),{b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{b:/<\?(php)?/,e:/\?>/,sL:"php",c:[{b:"/\\*",e:"\\*/",skip:!0}]},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{name:"style"},c:[t],starts:{e:"</style>",rE:!0,sL:["css","xml"]}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{name:"script"},c:[t],starts:{e:"</script>",rE:!0,sL:["actionscript","javascript","handlebars","xml"]}},{cN:"meta",v:[{b:/<\?xml/,e:/\?>/,r:10},{b:/<\?\w+/,e:/\?>/}]},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"name",b:/[^\/><\s]+/,r:0},t]}]}});hljs.registerLanguage("lua",function(e){var t="\\[=*\\[",a="\\]=*\\]",r={b:t,e:a,c:["self"]},n=[e.C("--(?!"+t+")","$"),e.C("--"+t,a,{c:[r],r:10})];return{l:e.UIR,k:{literal:"true false nil",keyword:"and break do else elseif end for goto if in local not or repeat return then until while",built_in:"_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstringmodule next pairs pcall print rawequal rawget rawset require select setfenvsetmetatable tonumber tostring type unpack xpcall arg selfcoroutine resume yield status wrap create running debug getupvaluedebug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenvio lines write close flush open output type read stderr stdin input stdout popen tmpfilemath, log, max, acos, huge, ldexp, pi, cos, tanh, pow, deg, tan, cosh, sinh, random, randomseed, frexp, ceil, floor, rad, abs, sqrt, modf, asin, min, mod, fmod, log10, atan2, exp, sin, atanos, exit, setlocale, date, getenv, difftime, remove, time, clock, tmpname, rename, execute, package, preload, loadlib, loaded, loaders, cpath, config path, seeallstring, sub, upper, len, gfind, rep, find, match, char, dump, gmatch, reverse, byte, format, gsub, lowertable, setn, insert, getn, foreachi, maxn, foreach, concat, sort, remove"},c:n.concat([{cN:"function",bK:"function",e:"\\)",c:[e.inherit(e.TM,{b:"([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"}),{cN:"params",b:"\\(",eW:!0,c:n}].concat(n)},e.CNM,e.ASM,e.QSM,{cN:"string",b:t,e:a,c:[r],r:5}])}});hljs.registerLanguage("css",function(e){var c="[a-zA-Z-][a-zA-Z0-9_-]*",t={b:/[A-Z\_\.\-]+\s*:/,rB:!0,e:";",eW:!0,c:[{cN:"attribute",b:/\S/,e:":",eE:!0,starts:{eW:!0,eE:!0,c:[{b:/[\w-]+\(/,rB:!0,c:[{cN:"built_in",b:/[\w-]+/},{b:/\(/,e:/\)/,c:[e.ASM,e.QSM]}]},e.CSSNM,e.QSM,e.ASM,e.CBCM,{cN:"number",b:"#[0-9A-Fa-f]+"},{cN:"meta",b:"!important"}]}}]};return{cI:!0,i:/[=\/|'\$]/,c:[e.CBCM,{cN:"selector-id",b:/#[A-Za-z0-9_-]+/},{cN:"selector-class",b:/\.[A-Za-z0-9_-]+/},{cN:"selector-attr",b:/\[/,e:/\]/,i:"$"},{cN:"selector-pseudo",b:/:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/},{b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{b:"@",e:"[{;]",i:/:/,c:[{cN:"keyword",b:/\w+/},{b:/\s/,eW:!0,eE:!0,r:0,c:[e.ASM,e.QSM,e.CSSNM]}]},{cN:"selector-tag",b:c,r:0},{b:"{",e:"}",i:/\S/,c:[e.CBCM,t]}]}});hljs.registerLanguage("makefile",function(e){var a={cN:"variable",b:/\$\(/,e:/\)/,c:[e.BE]};return{aliases:["mk","mak"],c:[e.HCM,{b:/^\w+\s*\W*=/,rB:!0,r:0,starts:{e:/\s*\W*=/,eE:!0,starts:{e:/$/,r:0,c:[a]}}},{cN:"section",b:/^[\w]+:\s*$/},{cN:"meta",b:/^\.PHONY:/,e:/$/,k:{"meta-keyword":".PHONY"},l:/[\.\w]+/},{b:/^\t+/,e:/$/,r:0,c:[e.QSM,a]}]}});hljs.registerLanguage("nginx",function(e){var r={cN:"variable",v:[{b:/\$\d+/},{b:/\$\{/,e:/}/},{b:"[\\$\\@]"+e.UIR}]},b={eW:!0,l:"[a-z/_]+",k:{literal:"on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"},r:0,i:"=>",c:[e.HCM,{cN:"string",c:[e.BE,r],v:[{b:/"/,e:/"/},{b:/'/,e:/'/}]},{b:"([a-z]+):/",e:"\\s",eW:!0,eE:!0,c:[r]},{cN:"regexp",c:[e.BE,r],v:[{b:"\\s\\^",e:"\\s|{|;",rE:!0},{b:"~\\*?\\s+",e:"\\s|{|;",rE:!0},{b:"\\*(\\.[a-z\\-]+)+"},{b:"([a-z\\-]+\\.)+\\*"}]},{cN:"number",b:"\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"},{cN:"number",b:"\\b\\d+[kKmMgGdshdwy]*\\b",r:0},r]};return{aliases:["nginxconf"],c:[e.HCM,{b:e.UIR+"\\s+{",rB:!0,e:"{",c:[{cN:"section",b:e.UIR}],r:0},{b:e.UIR+"\\s",e:";|{",rB:!0,c:[{cN:"attribute",b:e.UIR,starts:b}],r:0}],i:"[^\\s\\}]"}});hljs.registerLanguage("scss",function(e){var t="[a-zA-Z-][a-zA-Z0-9_-]*",i={cN:"variable",b:"(\\$"+t+")\\b"},r={cN:"number",b:"#[0-9A-Fa-f]+"};({cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:!0,i:"[^\\s]",starts:{eW:!0,eE:!0,c:[r,e.CSSNM,e.QSM,e.ASM,e.CBCM,{cN:"meta",b:"!important"}]}});return{cI:!0,i:"[=/|']",c:[e.CLCM,e.CBCM,{cN:"selector-id",b:"\\#[A-Za-z0-9_-]+",r:0},{cN:"selector-class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"selector-attr",b:"\\[",e:"\\]",i:"$"},{cN:"selector-tag",b:"\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",r:0},{b:":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"},{b:"::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"},i,{cN:"attribute",b:"\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",i:"[^\\s]"},{b:"\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"},{b:":",e:";",c:[i,r,e.CSSNM,e.QSM,e.ASM,{cN:"meta",b:"!important"}]},{b:"@",e:"[{;]",k:"mixin include extend for if else each while charset import debug media page content font-face namespace warn",c:[i,e.QSM,e.ASM,r,e.CSSNM,{b:"\\s[A-Za-z0-9_.-]+",r:0}]}]}});hljs.registerLanguage("markdown",function(e){return{aliases:["md","mkdown","mkd"],c:[{cN:"section",v:[{b:"^#{1,6}",e:"$"},{b:"^.+?\\n[=-]{2,}$"}]},{b:"<",e:">",sL:"xml",r:0},{cN:"bullet",b:"^([*+-]|(\\d+\\.))\\s+"},{cN:"strong",b:"[*_]{2}.+?[*_]{2}"},{cN:"emphasis",v:[{b:"\\*.+?\\*"},{b:"_.+?_",r:0}]},{cN:"quote",b:"^>\\s+",e:"$"},{cN:"code",v:[{b:"^```w*s*$",e:"^```s*$"},{b:"`.+?`"},{b:"^( {4}|	)",e:"$",r:0}]},{b:"^[-\\*]{3,}",e:"$"},{b:"\\[.+?\\][\\(\\[].*?[\\)\\]]",rB:!0,c:[{cN:"string",b:"\\[",e:"\\]",eB:!0,rE:!0,r:0},{cN:"link",b:"\\]\\(",e:"\\)",eB:!0,eE:!0},{cN:"symbol",b:"\\]\\[",e:"\\]",eB:!0,eE:!0}],r:10},{b:/^\[[^\n]+\]:/,rB:!0,c:[{cN:"symbol",b:/\[/,e:/\]/,eB:!0,eE:!0},{cN:"link",b:/:\s*/,e:/$/,eB:!0}]}]}});hljs.registerLanguage("diff",function(e){return{aliases:["patch"],c:[{cN:"meta",r:10,v:[{b:/^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/},{b:/^\*\*\* +\d+,\d+ +\*\*\*\*$/},{b:/^\-\-\- +\d+,\d+ +\-\-\-\-$/}]},{cN:"comment",v:[{b:/Index: /,e:/$/},{b:/={3,}/,e:/$/},{b:/^\-{3}/,e:/$/},{b:/^\*{3} /,e:/$/},{b:/^\+{3}/,e:/$/},{b:/\*{5}/,e:/\*{5}$/}]},{cN:"addition",b:"^\\+",e:"$"},{cN:"deletion",b:"^\\-",e:"$"},{cN:"addition",b:"^\\!",e:"$"}]}});hljs.registerLanguage("php",function(e){var c={b:"\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"},i={cN:"meta",b:/<\?(php)?|\?>/},t={cN:"string",c:[e.BE,i],v:[{b:'b"',e:'"'},{b:"b'",e:"'"},e.inherit(e.ASM,{i:null}),e.inherit(e.QSM,{i:null})]},a={v:[e.BNM,e.CNM]};return{aliases:["php3","php4","php5","php6"],cI:!0,k:"and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",c:[e.HCM,e.C("//","$",{c:[i]}),e.C("/\\*","\\*/",{c:[{cN:"doctag",b:"@[A-Za-z]+"}]}),e.C("__halt_compiler.+?;",!1,{eW:!0,k:"__halt_compiler",l:e.UIR}),{cN:"string",b:/<<<['"]?\w+['"]?$/,e:/^\w+;?$/,c:[e.BE,{cN:"subst",v:[{b:/\$\w+/},{b:/\{\$/,e:/\}/}]}]},i,{cN:"keyword",b:/\$this\b/},c,{b:/(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/},{cN:"function",bK:"function",e:/[;{]/,eE:!0,i:"\\$|\\[|%",c:[e.UTM,{cN:"params",b:"\\(",e:"\\)",c:["self",c,e.CBCM,t,a]}]},{cN:"class",bK:"class interface",e:"{",eE:!0,i:/[:\(\$"]/,c:[{bK:"extends implements"},e.UTM]},{bK:"namespace",e:";",i:/[\.']/,c:[e.UTM]},{bK:"use",e:";",c:[e.UTM]},{b:"=>"},t,a]}});hljs.registerLanguage("bash",function(e){var t={cN:"variable",v:[{b:/\$[\w\d#@][\w\d_]*/},{b:/\$\{(.*?)}/}]},s={cN:"string",b:/"/,e:/"/,c:[e.BE,t,{cN:"variable",b:/\$\(/,e:/\)/,c:[e.BE]}]},a={cN:"string",b:/'/,e:/'/};return{aliases:["sh","zsh"],l:/-?[a-z\._]+/,k:{keyword:"if then else elif fi for while in do done case esac function",literal:"true false",built_in:"break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",_:"-ne -eq -lt -gt -f -d -e -s -l -a"},c:[{cN:"meta",b:/^#![^\n]+sh\s*$/,r:10},{cN:"function",b:/\w[\w\d_]*\s*\(\s*\)\s*\{/,rB:!0,c:[e.inherit(e.TM,{b:/\w[\w\d_]*/})],r:0},e.HCM,s,a,t]}});hljs.registerLanguage("json",function(e){var i={literal:"true false null"},n=[e.QSM,e.CNM],r={e:",",eW:!0,eE:!0,c:n,k:i},t={b:"{",e:"}",c:[{cN:"attr",b:/"/,e:/"/,c:[e.BE],i:"\\n"},e.inherit(r,{b:/:/})],i:"\\S"},c={b:"\\[",e:"\\]",c:[e.inherit(r)],i:"\\S"};return n.splice(n.length,0,t,c),{c:n,k:i,i:"\\S"}});hljs.registerLanguage("perl",function(e){var t="getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",r={cN:"subst",b:"[$@]\\{",e:"\\}",k:t},s={b:"->{",e:"}"},n={v:[{b:/\$\d/},{b:/[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/},{b:/[\$%@][^\s\w{]/,r:0}]},i=[e.BE,r,n],o=[n,e.HCM,e.C("^\\=\\w","\\=cut",{eW:!0}),s,{cN:"string",c:i,v:[{b:"q[qwxr]?\\s*\\(",e:"\\)",r:5},{b:"q[qwxr]?\\s*\\[",e:"\\]",r:5},{b:"q[qwxr]?\\s*\\{",e:"\\}",r:5},{b:"q[qwxr]?\\s*\\|",e:"\\|",r:5},{b:"q[qwxr]?\\s*\\<",e:"\\>",r:5},{b:"qw\\s+q",e:"q",r:5},{b:"'",e:"'",c:[e.BE]},{b:'"',e:'"'},{b:"`",e:"`",c:[e.BE]},{b:"{\\w+}",c:[],r:0},{b:"-?\\w+\\s*\\=\\>",c:[],r:0}]},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"(\\/\\/|"+e.RSR+"|\\b(split|return|print|reverse|grep)\\b)\\s*",k:"split return print reverse grep",r:0,c:[e.HCM,{cN:"regexp",b:"(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",r:10},{cN:"regexp",b:"(m|qr)?/",e:"/[a-z]*",c:[e.BE],r:0}]},{cN:"function",bK:"sub",e:"(\\s*\\(.*?\\))?[;{]",eE:!0,r:5,c:[e.TM]},{b:"-\\w\\b",r:0},{b:"^__DATA__$",e:"^__END__$",sL:"mojolicious",c:[{b:"^@@.*",e:"$",cN:"comment"}]}];return r.c=o,s.c=o,{aliases:["pl","pm"],l:/[\w\.]+/,k:t,c:o}});hljs.registerLanguage("apache",function(e){var r={cN:"number",b:"[\\$%]\\d+"};return{aliases:["apacheconf"],cI:!0,c:[e.HCM,{cN:"section",b:"</?",e:">"},{cN:"attribute",b:/\w+/,r:0,k:{nomarkup:"order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"},starts:{e:/$/,r:0,k:{literal:"on off all"},c:[{cN:"meta",b:"\\s\\[",e:"\\]$"},{cN:"variable",b:"[\\$%]\\{",e:"\\}",c:["self",r]},r,e.QSM]}}],i:/\S/}});hljs.registerLanguage("typescript",function(e){var r={keyword:"in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class public private protected get set super static implements enum export import declare type namespace abstract as from extends async await",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document any number boolean string void Promise"};return{aliases:["ts"],k:r,c:[{cN:"meta",b:/^\s*['"]use strict['"]/},e.ASM,e.QSM,{cN:"string",b:"`",e:"`",c:[e.BE,{cN:"subst",b:"\\$\\{",e:"\\}"}]},e.CLCM,e.CBCM,{cN:"number",v:[{b:"\\b(0[bB][01]+)"},{b:"\\b(0[oO][0-7]+)"},{b:e.CNR}],r:0},{b:"("+e.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[e.CLCM,e.CBCM,e.RM,{cN:"function",b:"(\\(.*?\\)|"+e.IR+")\\s*=>",rB:!0,e:"\\s*=>",c:[{cN:"params",v:[{b:e.IR},{b:/\(\s*\)/},{b:/\(/,e:/\)/,eB:!0,eE:!0,k:r,c:["self",e.CLCM,e.CBCM]}]}]}],r:0},{cN:"function",b:"function",e:/[\{;]/,eE:!0,k:r,c:["self",e.inherit(e.TM,{b:/[A-Za-z$_][0-9A-Za-z$_]*/}),{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,k:r,c:[e.CLCM,e.CBCM],i:/["'\(]/}],i:/%/,r:0},{bK:"constructor",e:/\{/,eE:!0,c:["self",{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,k:r,c:[e.CLCM,e.CBCM],i:/["'\(]/}]},{b:/module\./,k:{built_in:"module"},r:0},{bK:"module",e:/\{/,eE:!0},{bK:"interface",e:/\{/,eE:!0,k:"interface extends"},{b:/\$[(.]/},{b:"\\."+e.IR,r:0},{cN:"meta",b:"@[A-Za-z]+"}]}});hljs.registerLanguage("ruby",function(e){var b="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",r={keyword:"and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",literal:"true false nil"},c={cN:"doctag",b:"@[A-Za-z]+"},a={b:"#<",e:">"},s=[e.C("#","$",{c:[c]}),e.C("^\\=begin","^\\=end",{c:[c],r:10}),e.C("^__END__","\\n$")],n={cN:"subst",b:"#\\{",e:"}",k:r},t={cN:"string",c:[e.BE,n],v:[{b:/'/,e:/'/},{b:/"/,e:/"/},{b:/`/,e:/`/},{b:"%[qQwWx]?\\(",e:"\\)"},{b:"%[qQwWx]?\\[",e:"\\]"},{b:"%[qQwWx]?{",e:"}"},{b:"%[qQwWx]?<",e:">"},{b:"%[qQwWx]?/",e:"/"},{b:"%[qQwWx]?%",e:"%"},{b:"%[qQwWx]?-",e:"-"},{b:"%[qQwWx]?\\|",e:"\\|"},{b:/\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/},{b:/<<(-?)\w+$/,e:/^\s*\w+$/}]},i={cN:"params",b:"\\(",e:"\\)",endsParent:!0,k:r},d=[t,a,{cN:"class",bK:"class module",e:"$|;",i:/=/,c:[e.inherit(e.TM,{b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}),{b:"<\\s*",c:[{b:"("+e.IR+"::)?"+e.IR}]}].concat(s)},{cN:"function",bK:"def",e:"$|;",c:[e.inherit(e.TM,{b:b}),i].concat(s)},{b:e.IR+"::"},{cN:"symbol",b:e.UIR+"(\\!|\\?)?:",r:0},{cN:"symbol",b:":(?!\\s)",c:[t,{b:b}],r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{cN:"params",b:/\|/,e:/\|/,k:r},{b:"("+e.RSR+"|unless)\\s*",c:[a,{cN:"regexp",c:[e.BE,n],i:/\n/,v:[{b:"/",e:"/[a-z]*"},{b:"%r{",e:"}[a-z]*"},{b:"%r\\(",e:"\\)[a-z]*"},{b:"%r!",e:"![a-z]*"},{b:"%r\\[",e:"\\][a-z]*"}]}].concat(s),r:0}].concat(s);n.c=d,i.c=d;var l="[>?]>",o="[\\w#]+\\(\\w+\\):\\d+:\\d+>",u="(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",w=[{b:/^\s*=>/,starts:{e:"$",c:d}},{cN:"meta",b:"^("+l+"|"+o+"|"+u+")",starts:{e:"$",c:d}}];return{aliases:["rb","gemspec","podspec","thor","irb"],k:r,i:/\/\*/,c:s.concat(w).concat(d)}});hljs.registerLanguage("javascript",function(e){var r="[A-Za-z$_][0-9A-Za-z$_]*",t={keyword:"in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"},a={cN:"number",v:[{b:"\\b(0[bB][01]+)"},{b:"\\b(0[oO][0-7]+)"},{b:e.CNR}],r:0},n={cN:"subst",b:"\\$\\{",e:"\\}",k:t,c:[]},c={cN:"string",b:"`",e:"`",c:[e.BE,n]};n.c=[e.ASM,e.QSM,c,a,e.RM];var s=n.c.concat([e.CBCM,e.CLCM]);return{aliases:["js","jsx"],k:t,c:[{cN:"meta",r:10,b:/^\s*['"]use (strict|asm)['"]/},{cN:"meta",b:/^#!/,e:/$/},e.ASM,e.QSM,c,e.CLCM,e.CBCM,a,{b:/[{,]\s*/,r:0,c:[{b:r+"\\s*:",rB:!0,r:0,c:[{cN:"attr",b:r,r:0}]}]},{b:"("+e.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[e.CLCM,e.CBCM,e.RM,{cN:"function",b:"(\\(.*?\\)|"+r+")\\s*=>",rB:!0,e:"\\s*=>",c:[{cN:"params",v:[{b:r},{b:/\(\s*\)/},{b:/\(/,e:/\)/,eB:!0,eE:!0,k:t,c:s}]}]},{b:/</,e:/(\/\w+|\w+\/)>/,sL:"xml",c:[{b:/<\w+\s*\/>/,skip:!0},{b:/<\w+/,e:/(\/\w+|\w+\/)>/,skip:!0,c:[{b:/<\w+\s*\/>/,skip:!0},"self"]}]}],r:0},{cN:"function",bK:"function",e:/\{/,eE:!0,c:[e.inherit(e.TM,{b:r}),{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,c:s}],i:/\[|%/},{b:/\$[(.]/},e.METHOD_GUARD,{cN:"class",bK:"class",e:/[{;=]/,eE:!0,i:/[:"\[\]]/,c:[{bK:"extends"},e.UTM]},{bK:"constructor",e:/\{/,eE:!0}],i:/#(?!!)/}});hljs.registerLanguage("cpp",function(t){var e={cN:"keyword",b:"\\b[a-z\\d_]*_t\\b"},r={cN:"string",v:[{b:'(u8?|U)?L?"',e:'"',i:"\\n",c:[t.BE]},{b:'(u8?|U)?R"',e:'"',c:[t.BE]},{b:"'\\\\?.",e:"'",i:"."}]},s={cN:"number",v:[{b:"\\b(0b[01']+)"},{b:"\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"},{b:"(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"}],r:0},i={cN:"meta",b:/#\s*[a-z]+\b/,e:/$/,k:{"meta-keyword":"if else elif endif define undef warning error line pragma ifdef ifndef include"},c:[{b:/\\\n/,r:0},t.inherit(r,{cN:"meta-string"}),{cN:"meta-string",b:/<[^\n>]*>/,e:/$/,i:"\\n"},t.CLCM,t.CBCM]},a=t.IR+"\\s*\\(",c={keyword:"int float while private char catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return",built_in:"std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr",literal:"true false nullptr NULL"},n=[e,t.CLCM,t.CBCM,s,r];return{aliases:["c","cc","h","c++","h++","hpp"],k:c,i:"</",c:n.concat([i,{b:"\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",e:">",k:c,c:["self",e]},{b:t.IR+"::",k:c},{v:[{b:/=/,e:/;/},{b:/\(/,e:/\)/},{bK:"new throw return else",e:/;/}],k:c,c:n.concat([{b:/\(/,e:/\)/,k:c,c:n.concat(["self"]),r:0}]),r:0},{cN:"function",b:"("+t.IR+"[\\*&\\s]+)+"+a,rB:!0,e:/[{;=]/,eE:!0,k:c,i:/[^\w\s\*&]/,c:[{b:a,rB:!0,c:[t.TM],r:0},{cN:"params",b:/\(/,e:/\)/,k:c,r:0,c:[t.CLCM,t.CBCM,r,s,e]},t.CLCM,t.CBCM,i]}]),exports:{preprocessor:i,strings:r,k:c}}});hljs.registerLanguage("objectivec",function(e){var t={cN:"built_in",b:"\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"},_={keyword:"int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",literal:"false true FALSE TRUE nil YES NO NULL",built_in:"BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"},i=/[a-zA-Z@][a-zA-Z0-9_]*/,n="@interface @class @protocol @implementation";return{aliases:["mm","objc","obj-c"],k:_,l:i,i:"</",c:[t,e.CLCM,e.CBCM,e.CNM,e.QSM,{cN:"string",v:[{b:'@"',e:'"',i:"\\n",c:[e.BE]},{b:"'",e:"[^\\\\]'",i:"[^\\\\][^']"}]},{cN:"meta",b:"#",e:"$",c:[{cN:"meta-string",v:[{b:'"',e:'"'},{b:"<",e:">"}]}]},{cN:"class",b:"("+n.split(" ").join("|")+")\\b",e:"({|$)",eE:!0,k:n,l:i,c:[e.UTM]},{b:"\\."+e.UIR,r:0}]}});hljs.registerLanguage("http",function(e){var t="HTTP/[0-9\\.]+";return{aliases:["https"],i:"\\S",c:[{b:"^"+t,e:"$",c:[{cN:"number",b:"\\b\\d{3}\\b"}]},{b:"^[A-Z]+ (.*?) "+t+"$",rB:!0,e:"$",c:[{cN:"string",b:" ",e:" ",eB:!0,eE:!0},{b:t},{cN:"keyword",b:"[A-Z]+"}]},{cN:"attribute",b:"^\\w",e:": ",eE:!0,i:"\\n|\\s|=",starts:{e:"$",r:0}},{b:"\\n\\n",starts:{sL:[],eW:!0}}]}});hljs.registerLanguage("python",function(e){var r={keyword:"and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",built_in:"Ellipsis NotImplemented"},b={cN:"meta",b:/^(>>>|\.\.\.) /},c={cN:"subst",b:/\{/,e:/\}/,k:r,i:/#/},a={cN:"string",c:[e.BE],v:[{b:/(u|b)?r?'''/,e:/'''/,c:[b],r:10},{b:/(u|b)?r?"""/,e:/"""/,c:[b],r:10},{b:/(fr|rf|f)'''/,e:/'''/,c:[b,c]},{b:/(fr|rf|f)"""/,e:/"""/,c:[b,c]},{b:/(u|r|ur)'/,e:/'/,r:10},{b:/(u|r|ur)"/,e:/"/,r:10},{b:/(b|br)'/,e:/'/},{b:/(b|br)"/,e:/"/},{b:/(fr|rf|f)'/,e:/'/,c:[c]},{b:/(fr|rf|f)"/,e:/"/,c:[c]},e.ASM,e.QSM]},s={cN:"number",r:0,v:[{b:e.BNR+"[lLjJ]?"},{b:"\\b(0o[0-7]+)[lLjJ]?"},{b:e.CNR+"[lLjJ]?"}]},i={cN:"params",b:/\(/,e:/\)/,c:["self",b,s,a]};return c.c=[a,s,b],{aliases:["py","gyp"],k:r,i:/(<\/|->|\?)|=>/,c:[b,s,a,e.HCM,{v:[{cN:"function",bK:"def"},{cN:"class",bK:"class"}],e:/:/,i:/[${=;\n,]/,c:[e.UTM,i,{b:/->/,eW:!0,k:"None"}]},{cN:"meta",b:/^[\t ]*@/,e:/$/},{b:/\b(print|exec)\(/}]}});hljs.registerLanguage("ini",function(e){var b={cN:"string",c:[e.BE],v:[{b:"'''",e:"'''",r:10},{b:'"""',e:'"""',r:10},{b:'"',e:'"'},{b:"'",e:"'"}]};return{aliases:["toml"],cI:!0,i:/\S/,c:[e.C(";","$"),e.HCM,{cN:"section",b:/^\s*\[+/,e:/\]+/},{b:/^[a-z0-9\[\]_-]+\s*=\s*/,e:"$",rB:!0,c:[{cN:"attr",b:/[a-z0-9\[\]_-]+/},{b:/=/,eW:!0,r:0,c:[{cN:"literal",b:/\bon|off|true|false|yes|no\b/},{cN:"variable",v:[{b:/\$[\w\d"][\w\d_]*/},{b:/\$\{(.*?)}/}]},b,{cN:"number",b:/([\+\-]+)?[\d]+_[\d_]+/},e.NM]}]}]}});hljs.registerLanguage("java",function(e){var a="[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*",t=a+"(<"+a+"(\\s*,\\s*"+a+")*>)?",r="false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do",s="\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",c={cN:"number",b:s,r:0};return{aliases:["jsp"],k:r,i:/<\/|#/,c:[e.C("/\\*\\*","\\*/",{r:0,c:[{b:/\w+@/,r:0},{cN:"doctag",b:"@[A-Za-z]+"}]}),e.CLCM,e.CBCM,e.ASM,e.QSM,{cN:"class",bK:"class interface",e:/[{;=]/,eE:!0,k:"class interface",i:/[:"\[\]]/,c:[{bK:"extends implements"},e.UTM]},{bK:"new throw return else",r:0},{cN:"function",b:"("+t+"\\s+)+"+e.UIR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:r,c:[{b:e.UIR+"\\s*\\(",rB:!0,r:0,c:[e.UTM]},{cN:"params",b:/\(/,e:/\)/,k:r,r:0,c:[e.ASM,e.QSM,e.CNM,e.CBCM]},e.CLCM,e.CBCM]},c,{cN:"meta",b:"@[A-Za-z]+"}]}});hljs.registerLanguage("dos",function(e){var r=e.C(/^\s*@?rem\b/,/$/,{r:10}),t={cN:"symbol",b:"^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)",r:0};return{aliases:["bat","cmd"],cI:!0,i:/\/\*/,k:{keyword:"if else goto for in do call exit not exist errorlevel defined equ neq lss leq gtr geq",built_in:"prn nul lpt3 lpt2 lpt1 con com4 com3 com2 com1 aux shift cd dir echo setlocal endlocal set pause copy append assoc at attrib break cacls cd chcp chdir chkdsk chkntfs cls cmd color comp compact convert date dir diskcomp diskcopy doskey erase fs find findstr format ftype graftabl help keyb label md mkdir mode more move path pause print popd pushd promt rd recover rem rename replace restore rmdir shiftsort start subst time title tree type ver verify vol ping net ipconfig taskkill xcopy ren del"},c:[{cN:"variable",b:/%%[^ ]|%[^ ]+?%|![^ ]+?!/},{cN:"function",b:t.b,e:"goto:eof",c:[e.inherit(e.TM,{b:"([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"}),r]},{cN:"number",b:"\\b\\d+",r:0},r]}});hljs.registerLanguage("coffeescript",function(e){var c={keyword:"in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super yield import export from as default await then unless until loop of by when and or is isnt not",literal:"true false null undefined yes no on off",built_in:"npm require console print module global window document"},n="[A-Za-z$_][0-9A-Za-z$_]*",r={cN:"subst",b:/#\{/,e:/}/,k:c},i=[e.BNM,e.inherit(e.CNM,{starts:{e:"(\\s*/)?",r:0}}),{cN:"string",v:[{b:/'''/,e:/'''/,c:[e.BE]},{b:/'/,e:/'/,c:[e.BE]},{b:/"""/,e:/"""/,c:[e.BE,r]},{b:/"/,e:/"/,c:[e.BE,r]}]},{cN:"regexp",v:[{b:"///",e:"///",c:[r,e.HCM]},{b:"//[gim]*",r:0},{b:/\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/}]},{b:"@"+n},{sL:"javascript",eB:!0,eE:!0,v:[{b:"```",e:"```"},{b:"`",e:"`"}]}];r.c=i;var s=e.inherit(e.TM,{b:n}),t="(\\(.*\\))?\\s*\\B[-=]>",o={cN:"params",b:"\\([^\\(]",rB:!0,c:[{b:/\(/,e:/\)/,k:c,c:["self"].concat(i)}]};return{aliases:["coffee","cson","iced"],k:c,i:/\/\*/,c:i.concat([e.C("###","###"),e.HCM,{cN:"function",b:"^\\s*"+n+"\\s*=\\s*"+t,e:"[-=]>",rB:!0,c:[s,o]},{b:/[:\(,=]\s*/,r:0,c:[{cN:"function",b:t,e:"[-=]>",rB:!0,c:[o]}]},{cN:"class",bK:"class",e:"$",i:/[:="\[\]]/,c:[{bK:"extends",eW:!0,i:/[:="\[\]]/,c:[s]},s]},{b:n+":",e:":",rB:!0,rE:!0,r:0}])}});hljs.registerLanguage("less",function(e){var r="[\\w-]+",t="("+r+"|@{"+r+"})",a=[],c=[],s=function(e){return{cN:"string",b:"~?"+e+".*?"+e}},b=function(e,r,t){return{cN:e,b:r,r:t}},n={b:"\\(",e:"\\)",c:c,r:0};c.push(e.CLCM,e.CBCM,s("'"),s('"'),e.CSSNM,{b:"(url|data-uri)\\(",starts:{cN:"string",e:"[\\)\\n]",eE:!0}},b("number","#[0-9A-Fa-f]+\\b"),n,b("variable","@@?"+r,10),b("variable","@{"+r+"}"),b("built_in","~?`[^`]*?`"),{cN:"attribute",b:r+"\\s*:",e:":",rB:!0,eE:!0},{cN:"meta",b:"!important"});var i=c.concat({b:"{",e:"}",c:a}),o={bK:"when",eW:!0,c:[{bK:"and not"}].concat(c)},u={b:t+"\\s*:",rB:!0,e:"[;}]",r:0,c:[{cN:"attribute",b:t,e:":",eE:!0,starts:{eW:!0,i:"[<=$]",r:0,c:c}}]},l={cN:"keyword",b:"@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",starts:{e:"[;{}]",rE:!0,c:c,r:0}},C={cN:"variable",v:[{b:"@"+r+"\\s*:",r:15},{b:"@"+r}],starts:{e:"[;}]",rE:!0,c:i}},p={v:[{b:"[\\.#:&\\[>]",e:"[;{}]"},{b:t,e:"{"}],rB:!0,rE:!0,i:"[<='$\"]",r:0,c:[e.CLCM,e.CBCM,o,b("keyword","all\\b"),b("variable","@{"+r+"}"),b("selector-tag",t+"%?",0),b("selector-id","#"+t),b("selector-class","\\."+t,0),b("selector-tag","&",0),{cN:"selector-attr",b:"\\[",e:"\\]"},{cN:"selector-pseudo",b:/:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/},{b:"\\(",e:"\\)",c:i},{b:"!important"}]};return a.push(e.CLCM,e.CBCM,l,C,u,p),{cI:!0,i:"[=>'/<($\"]",c:a}});hljs.registerLanguage("cs",function(e){var i={keyword:"abstract as base bool break byte case catch char checked const continue decimal default delegate do double else enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this try typeof uint ulong unchecked unsafe ushort using virtual void volatile while nameof add alias ascending async await by descending dynamic equals from get global group into join let on orderby partial remove select set value var where yield",literal:"null false true"},r={cN:"string",b:'@"',e:'"',c:[{b:'""'}]},t=e.inherit(r,{i:/\n/}),a={cN:"subst",b:"{",e:"}",k:i},n=e.inherit(a,{i:/\n/}),c={cN:"string",b:/\$"/,e:'"',i:/\n/,c:[{b:"{{"},{b:"}}"},e.BE,n]},s={cN:"string",b:/\$@"/,e:'"',c:[{b:"{{"},{b:"}}"},{b:'""'},a]},o=e.inherit(s,{i:/\n/,c:[{b:"{{"},{b:"}}"},{b:'""'},n]});a.c=[s,c,r,e.ASM,e.QSM,e.CNM,e.CBCM],n.c=[o,c,t,e.ASM,e.QSM,e.CNM,e.inherit(e.CBCM,{i:/\n/})];var l={v:[s,c,r,e.ASM,e.QSM]},b=e.IR+"(<"+e.IR+"(\\s*,\\s*"+e.IR+")*>)?(\\[\\])?";return{aliases:["csharp"],k:i,i:/::/,c:[e.C("///","$",{rB:!0,c:[{cN:"doctag",v:[{b:"///",r:0},{b:"<!--|-->"},{b:"</?",e:">"}]}]}),e.CLCM,e.CBCM,{cN:"meta",b:"#",e:"$",k:{"meta-keyword":"if else elif endif define undef warning error line region endregion pragma checksum"}},l,e.CNM,{bK:"class interface",e:/[{;=]/,i:/[^\s:]/,c:[e.TM,e.CLCM,e.CBCM]},{bK:"namespace",e:/[{;=]/,i:/[^\s:]/,c:[e.inherit(e.TM,{b:"[a-zA-Z](\\.?\\w)*"}),e.CLCM,e.CBCM]},{bK:"new return throw await",r:0},{cN:"function",b:"("+b+"\\s+)+"+e.IR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:i,c:[{b:e.IR+"\\s*\\(",rB:!0,c:[e.TM],r:0},{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,k:i,r:0,c:[l,e.CNM,e.CBCM]},e.CLCM,e.CBCM]}]}});hljs.registerLanguage("vbscript",function(e){return{aliases:["vbs"],cI:!0,k:{keyword:"call class const dim do loop erase execute executeglobal exit for each next function if then else on error option explicit new private property let get public randomize redim rem select case set stop sub while wend with end to elseif is or xor and not class_initialize class_terminate default preserve in me byval byref step resume goto",built_in:"lcase month vartype instrrev ubound setlocale getobject rgb getref string weekdayname rnd dateadd monthname now day minute isarray cbool round formatcurrency conversions csng timevalue second year space abs clng timeserial fixs len asc isempty maths dateserial atn timer isobject filter weekday datevalue ccur isdate instr datediff formatdatetime replace isnull right sgn array snumeric log cdbl hex chr lbound msgbox ucase getlocale cos cdate cbyte rtrim join hour oct typename trim strcomp int createobject loadpicture tan formatnumber mid scriptenginebuildversion scriptengine split scriptengineminorversion cint sin datepart ltrim sqr scriptenginemajorversion time derived eval date formatpercent exp inputbox left ascw chrw regexp server response request cstr err",literal:"true false null nothing empty"},i:"//",c:[e.inherit(e.QSM,{c:[{b:'""'}]}),e.C(/'/,/$/,{r:0}),e.CNM]}});hljs.registerLanguage("sql",function(e){var t=e.C("--","$");return{cI:!0,i:/[<>{}*#]/,c:[{bK:"begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment",e:/;/,eW:!0,l:/[\w\.]+/,k:{keyword:"abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment select self sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",literal:"true false null",built_in:"array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"},c:[{cN:"string",b:"'",e:"'",c:[e.BE,{b:"''"}]},{cN:"string",b:'"',e:'"',c:[e.BE,{b:'""'}]},{cN:"string",b:"`",e:"`",c:[e.BE]},e.CNM,e.CBCM,t]},e.CBCM,t]}});hljs.registerLanguage("vim",function(e){return{l:/[!#@\w]+/,k:{keyword:"N|0 P|0 X|0 a|0 ab abc abo al am an|0 ar arga argd arge argdo argg argl argu as au aug aun b|0 bN ba bad bd be bel bf bl bm bn bo bp br brea breaka breakd breakl bro bufdo buffers bun bw c|0 cN cNf ca cabc caddb cad caddf cal cat cb cc ccl cd ce cex cf cfir cgetb cgete cg changes chd che checkt cl cla clo cm cmapc cme cn cnew cnf cno cnorea cnoreme co col colo com comc comp con conf cope cp cpf cq cr cs cst cu cuna cunme cw delm deb debugg delc delf dif diffg diffo diffp diffpu diffs diffthis dig di dl dell dj dli do doautoa dp dr ds dsp e|0 ea ec echoe echoh echom echon el elsei em en endfo endf endt endw ene ex exe exi exu f|0 files filet fin fina fini fir fix fo foldc foldd folddoc foldo for fu go gr grepa gu gv ha helpf helpg helpt hi hid his ia iabc if ij il im imapc ime ino inorea inoreme int is isp iu iuna iunme j|0 ju k|0 keepa kee keepj lN lNf l|0 lad laddb laddf la lan lat lb lc lch lcl lcs le lefta let lex lf lfir lgetb lgete lg lgr lgrepa lh ll lla lli lmak lm lmapc lne lnew lnf ln loadk lo loc lockv lol lope lp lpf lr ls lt lu lua luad luaf lv lvimgrepa lw m|0 ma mak map mapc marks mat me menut mes mk mks mksp mkv mkvie mod mz mzf nbc nb nbs new nm nmapc nme nn nnoreme noa no noh norea noreme norm nu nun nunme ol o|0 om omapc ome on ono onoreme opt ou ounme ow p|0 profd prof pro promptr pc ped pe perld po popu pp pre prev ps pt ptN ptf ptj ptl ptn ptp ptr pts pu pw py3 python3 py3d py3f py pyd pyf quita qa rec red redi redr redraws reg res ret retu rew ri rightb rub rubyd rubyf rund ru rv sN san sa sal sav sb sbN sba sbf sbl sbm sbn sbp sbr scrip scripte scs se setf setg setl sf sfir sh sim sig sil sl sla sm smap smapc sme sn sni sno snor snoreme sor so spelld spe spelli spellr spellu spellw sp spr sre st sta startg startr star stopi stj sts sun sunm sunme sus sv sw sy synti sync tN tabN tabc tabdo tabe tabf tabfir tabl tabm tabnew tabn tabo tabp tabr tabs tab ta tags tc tcld tclf te tf th tj tl tm tn to tp tr try ts tu u|0 undoj undol una unh unl unlo unm unme uns up ve verb vert vim vimgrepa vi viu vie vm vmapc vme vne vn vnoreme vs vu vunme windo w|0 wN wa wh wi winc winp wn wp wq wqa ws wu wv x|0 xa xmapc xm xme xn xnoreme xu xunme y|0 z|0 ~ Next Print append abbreviate abclear aboveleft all amenu anoremenu args argadd argdelete argedit argglobal arglocal argument ascii autocmd augroup aunmenu buffer bNext ball badd bdelete behave belowright bfirst blast bmodified bnext botright bprevious brewind break breakadd breakdel breaklist browse bunload bwipeout change cNext cNfile cabbrev cabclear caddbuffer caddexpr caddfile call catch cbuffer cclose center cexpr cfile cfirst cgetbuffer cgetexpr cgetfile chdir checkpath checktime clist clast close cmap cmapclear cmenu cnext cnewer cnfile cnoremap cnoreabbrev cnoremenu copy colder colorscheme command comclear compiler continue confirm copen cprevious cpfile cquit crewind cscope cstag cunmap cunabbrev cunmenu cwindow delete delmarks debug debuggreedy delcommand delfunction diffupdate diffget diffoff diffpatch diffput diffsplit digraphs display deletel djump dlist doautocmd doautoall deletep drop dsearch dsplit edit earlier echo echoerr echohl echomsg else elseif emenu endif endfor endfunction endtry endwhile enew execute exit exusage file filetype find finally finish first fixdel fold foldclose folddoopen folddoclosed foldopen function global goto grep grepadd gui gvim hardcopy help helpfind helpgrep helptags highlight hide history insert iabbrev iabclear ijump ilist imap imapclear imenu inoremap inoreabbrev inoremenu intro isearch isplit iunmap iunabbrev iunmenu join jumps keepalt keepmarks keepjumps lNext lNfile list laddexpr laddbuffer laddfile last language later lbuffer lcd lchdir lclose lcscope left leftabove lexpr lfile lfirst lgetbuffer lgetexpr lgetfile lgrep lgrepadd lhelpgrep llast llist lmake lmap lmapclear lnext lnewer lnfile lnoremap loadkeymap loadview lockmarks lockvar lolder lopen lprevious lpfile lrewind ltag lunmap luado luafile lvimgrep lvimgrepadd lwindow move mark make mapclear match menu menutranslate messages mkexrc mksession mkspell mkvimrc mkview mode mzscheme mzfile nbclose nbkey nbsart next nmap nmapclear nmenu nnoremap nnoremenu noautocmd noremap nohlsearch noreabbrev noremenu normal number nunmap nunmenu oldfiles open omap omapclear omenu only onoremap onoremenu options ounmap ounmenu ownsyntax print profdel profile promptfind promptrepl pclose pedit perl perldo pop popup ppop preserve previous psearch ptag ptNext ptfirst ptjump ptlast ptnext ptprevious ptrewind ptselect put pwd py3do py3file python pydo pyfile quit quitall qall read recover redo redir redraw redrawstatus registers resize retab return rewind right rightbelow ruby rubydo rubyfile rundo runtime rviminfo substitute sNext sandbox sargument sall saveas sbuffer sbNext sball sbfirst sblast sbmodified sbnext sbprevious sbrewind scriptnames scriptencoding scscope set setfiletype setglobal setlocal sfind sfirst shell simalt sign silent sleep slast smagic smapclear smenu snext sniff snomagic snoremap snoremenu sort source spelldump spellgood spellinfo spellrepall spellundo spellwrong split sprevious srewind stop stag startgreplace startreplace startinsert stopinsert stjump stselect sunhide sunmap sunmenu suspend sview swapname syntax syntime syncbind tNext tabNext tabclose tabedit tabfind tabfirst tablast tabmove tabnext tabonly tabprevious tabrewind tag tcl tcldo tclfile tearoff tfirst throw tjump tlast tmenu tnext topleft tprevious trewind tselect tunmenu undo undojoin undolist unabbreviate unhide unlet unlockvar unmap unmenu unsilent update vglobal version verbose vertical vimgrep vimgrepadd visual viusage view vmap vmapclear vmenu vnew vnoremap vnoremenu vsplit vunmap vunmenu write wNext wall while winsize wincmd winpos wnext wprevious wqall wsverb wundo wviminfo xit xall xmapclear xmap xmenu xnoremap xnoremenu xunmap xunmenu yank",built_in:"synIDtrans atan2 range matcharg did_filetype asin feedkeys xor argv complete_check add getwinposx getqflist getwinposy screencol clearmatches empty extend getcmdpos mzeval garbagecollect setreg ceil sqrt diff_hlID inputsecret get getfperm getpid filewritable shiftwidth max sinh isdirectory synID system inputrestore winline atan visualmode inputlist tabpagewinnr round getregtype mapcheck hasmapto histdel argidx findfile sha256 exists toupper getcmdline taglist string getmatches bufnr strftime winwidth bufexists strtrans tabpagebuflist setcmdpos remote_read printf setloclist getpos getline bufwinnr float2nr len getcmdtype diff_filler luaeval resolve libcallnr foldclosedend reverse filter has_key bufname str2float strlen setline getcharmod setbufvar index searchpos shellescape undofile foldclosed setqflist buflisted strchars str2nr virtcol floor remove undotree remote_expr winheight gettabwinvar reltime cursor tabpagenr finddir localtime acos getloclist search tanh matchend rename gettabvar strdisplaywidth type abs py3eval setwinvar tolower wildmenumode log10 spellsuggest bufloaded synconcealed nextnonblank server2client complete settabwinvar executable input wincol setmatches getftype hlID inputsave searchpair or screenrow line settabvar histadd deepcopy strpart remote_peek and eval getftime submatch screenchar winsaveview matchadd mkdir screenattr getfontname libcall reltimestr getfsize winnr invert pow getbufline byte2line soundfold repeat fnameescape tagfiles sin strwidth spellbadword trunc maparg log lispindent hostname setpos globpath remote_foreground getchar synIDattr fnamemodify cscope_connection stridx winbufnr indent min complete_add nr2char searchpairpos inputdialog values matchlist items hlexists strridx browsedir expand fmod pathshorten line2byte argc count getwinvar glob foldtextresult getreg foreground cosh matchdelete has char2nr simplify histget searchdecl iconv winrestcmd pumvisible writefile foldlevel haslocaldir keys cos matchstr foldtext histnr tan tempname getcwd byteidx getbufvar islocked escape eventhandler remote_send serverlist winrestview synstack pyeval prevnonblank readfile cindent filereadable changenr exp"},i:/;/,c:[e.NM,e.ASM,{cN:"string",b:/"(\\"|\n\\|[^"\n])*"/},e.C('"',"$"),{cN:"variable",b:/[bwtglsav]:[\w\d_]*/},{cN:"function",bK:"function function!",e:"$",r:0,c:[e.TM,{cN:"params",b:"\\(",e:"\\)"}]},{cN:"symbol",b:/<[\w-]+>/}]}});hljs.registerLanguage("yaml",function(e){var b="true false yes no null",a="^[ \\-]*",r="[a-zA-Z_][\\w\\-]*",t={cN:"attr",v:[{b:a+r+":"},{b:a+'"'+r+'":'},{b:a+"'"+r+"':"}]},c={cN:"template-variable",v:[{b:"{{",e:"}}"},{b:"%{",e:"}"}]},l={cN:"string",r:0,v:[{b:/'/,e:/'/},{b:/"/,e:/"/},{b:/\S+/}],c:[e.BE,c]};return{cI:!0,aliases:["yml","YAML","yaml"],c:[t,{cN:"meta",b:"^---s*$",r:10},{cN:"string",b:"[\\|>] *$",rE:!0,c:l.c,e:t.v[0].b},{b:"<%[%=-]?",e:"[%-]?%>",sL:"ruby",eB:!0,eE:!0,r:0},{cN:"type",b:"!!"+e.UIR},{cN:"meta",b:"&"+e.UIR+"$"},{cN:"meta",b:"\\*"+e.UIR+"$"},{cN:"bullet",b:"^ *-",r:0},e.HCM,{bK:b,k:{literal:b}},e.CNM,l]}});


/* ---- /1CWkZv7fQAKxTVjZVrLZ8VHcrN6YGGcdky/js/identicon.js ---- */


/**
 * Identicon.js 2.1.0
 * http://github.com/stewartlord/identicon.js
 *
 * PNGLib required for PNG output
 * http://www.xarg.org/download/pnglib.js
 *
 * Copyright 2016, Stewart Lord
 * Released under the BSD license
 * http://www.opensource.org/licenses/bsd-license.php
 */

(function() {
    var PNGlib;
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        PNGlib = require('./pnglib');
    } else {
        PNGlib = window.PNGlib;
    }

    var Identicon = function(hash, options) {
        this.defaults = {
            background: [240, 240, 240, 255],
            hash: this.createHashFromString((new Date()).toISOString()),
            margin: 0.08,
            size: 64,
            format: 'png'
        };

        this.options = typeof(options) === 'object' ? options : this.defaults;

        // backward compatibility with old constructor (hash, size, margin)
        if (typeof(arguments[1]) === 'number') { this.options.size = arguments[1]; }
        if (arguments[2]) { this.options.margin = arguments[2]; }

        this.hash = hash || this.defaults.hash;
        this.background = this.options.background || this.defaults.background;
        this.margin = this.options.margin || this.defaults.margin;
        this.size = this.options.size || this.defaults.size;
        this.format = this.options.format || this.defaults.format;

        // foreground defaults to last 7 chars as hue at 50% saturation, 70% brightness
        var hue = parseInt(this.hash.substr(-7), 16) / 0xfffffff;
        this.foreground = this.options.foreground || this.hsl2rgb(hue, 0.5, 0.7);
    };

    Identicon.prototype = {
        background: null,
        foreground: null,
        hash: null,
        margin: null,
        size: null,
        format: null,

        image: function() {
            return this.isSvg() ?
                new Svg(this.size, this.foreground, this.background) :
                new PNGlib(this.size, this.size, 256);
        },

        render: function() {
            var image = this.image(),
                size = this.size,
                baseMargin = Math.floor(size * this.margin),
                cell = Math.floor((size - (baseMargin * 2)) / 5),
                margin = Math.floor((size - cell * 5) / 2);
            bg = image.color.apply(image, this.background),
                fg = image.color.apply(image, this.foreground);

            // the first 15 characters of the hash control the pixels (even/odd)
            // they are drawn down the middle first, then mirrored outwards
            var i, color;
            for (i = 0; i < 15; i++) {
                color = parseInt(this.hash.charAt(i), 16) % 2 ? bg : fg;
                if (i < 5) {
                    this.rectangle(2 * cell + margin, i * cell + margin, cell, cell, color, image);
                } else if (i < 10) {
                    this.rectangle(1 * cell + margin, (i - 5) * cell + margin, cell, cell, color, image);
                    this.rectangle(3 * cell + margin, (i - 5) * cell + margin, cell, cell, color, image);
                } else if (i < 15) {
                    this.rectangle(0 * cell + margin, (i - 10) * cell + margin, cell, cell, color, image);
                    this.rectangle(4 * cell + margin, (i - 10) * cell + margin, cell, cell, color, image);
                }
            }

            return image;
        },

        rectangle: function(x, y, w, h, color, image) {
            if (this.isSvg()) {
                image.rectangles.push({ x: x, y: y, w: w, h: h, color: color });
            } else {
                var i, j;
                for (i = x; i < x + w; i++) {
                    for (j = y; j < y + h; j++) {
                        image.buffer[image.index(i, j)] = color;
                    }
                }
            }
        },

        // adapted from: https://gist.github.com/aemkei/1325937
        hsl2rgb: function(h, s, b) {
            h *= 6;
            s = [
                b += s *= b < .5 ? b : 1 - b,
                b - h % 1 * s * 2,
                b -= s *= 2,
                b,
                b + h % 1 * s,
                b + s
            ];

            return [
                s[~~h % 6] * 255, // red
                s[(h | 16) % 6] * 255, // green
                s[(h | 8) % 6] * 255 // blue
            ];
        },

        toString: function(raw) {
            // backward compatibility with old toString, default to base64
            if (raw) {
                return this.render().getDump();
            } else {
                return this.render().getBase64();
            }
        },

        // Creates a consistent-length hash from a string
        createHashFromString: function(str) {
            var hash = '0',
                salt = 'identicon',
                i, chr, len;

            if (!str) {
                return hash;
            }

            str += salt + str; // Better randomization for short inputs.

            for (i = 0, len = str.length; i < len; i++) {
                chr = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash.toString();
        },

        isSvg: function() {
            return this.format.match(/svg/i)
        }
    };

    var Svg = function(size, foreground, background) {
        this.size = size;
        this.foreground = this.color.apply(this, foreground);
        this.background = this.color.apply(this, background);
        this.rectangles = [];
    };

    Svg.prototype = {
        size: null,
        foreground: null,
        background: null,
        rectangles: null,

        color: function(r, g, b, a) {
            var values = [r, g, b].map(Math.round);
            values.push((a >= 0) && (a <= 255) ? a / 255 : 1);
            return 'rgba(' + values.join(',') + ')';
        },

        getDump: function() {
            var i,
                xml,
                rect,
                fg = this.foreground,
                bg = this.background,
                stroke = this.size * 0.005;

            xml = "<svg xmlns='http://www.w3.org/2000/svg'" +
                " width='" + this.size + "' height='" + this.size + "'" +
                " style='background-color:" + bg + ";'>" +
                "<g style='fill:" + fg + "; stroke:" + fg + "; stroke-width:" + stroke + ";'>";

            for (i = 0; i < this.rectangles.length; i++) {
                rect = this.rectangles[i];
                if (rect.color == bg) continue;
                xml += "<rect " +
                    " x='" + rect.x + "'" +
                    " y='" + rect.y + "'" +
                    " width='" + rect.w + "'" +
                    " height='" + rect.h + "'" +
                    "/>";
            }
            xml += "</g></svg>"

            return xml;
        },

        getBase64: function() {
            return btoa(this.getDump());
        }
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = Identicon;
    } else {
        window.Identicon = Identicon;
    }
})();


/* ---- /1CWkZv7fQAKxTVjZVrLZ8VHcrN6YGGcdky/js/jquery.min.js ---- */


!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){"use strict";function n(e,t){t=t||ne;var n=t.createElement("script");n.text=e,t.head.appendChild(n).parentNode.removeChild(n)}function r(e){var t=!!e&&"length"in e&&e.length,n=ge.type(e);return"function"!==n&&!ge.isWindow(e)&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}function i(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}function o(e,t,n){return ge.isFunction(t)?ge.grep(e,function(e,r){return!!t.call(e,r,e)!==n}):t.nodeType?ge.grep(e,function(e){return e===t!==n}):"string"!=typeof t?ge.grep(e,function(e){return se.call(t,e)>-1!==n}):ke.test(t)?ge.filter(t,e,n):(t=ge.filter(t,e),ge.grep(e,function(e){return se.call(t,e)>-1!==n&&1===e.nodeType}))}function a(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}function s(e){var t={};return ge.each(e.match(qe)||[],function(e,n){t[n]=!0}),t}function u(e){return e}function l(e){throw e}function c(e,t,n,r){var i;try{e&&ge.isFunction(i=e.promise)?i.call(e).done(t).fail(n):e&&ge.isFunction(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}function f(){ne.removeEventListener("DOMContentLoaded",f),e.removeEventListener("load",f),ge.ready()}function p(){this.expando=ge.expando+p.uid++}function d(e){return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:Me.test(e)?JSON.parse(e):e)}function h(e,t,n){var r;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(Ie,"-$&").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n=d(n)}catch(e){}Re.set(e,t,n)}else n=void 0;return n}function g(e,t,n,r){var i,o=1,a=20,s=r?function(){return r.cur()}:function(){return ge.css(e,t,"")},u=s(),l=n&&n[3]||(ge.cssNumber[t]?"":"px"),c=(ge.cssNumber[t]||"px"!==l&&+u)&&$e.exec(ge.css(e,t));if(c&&c[3]!==l){l=l||c[3],n=n||[],c=+u||1;do o=o||".5",c/=o,ge.style(e,t,c+l);while(o!==(o=s()/u)&&1!==o&&--a)}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}function v(e){var t,n=e.ownerDocument,r=e.nodeName,i=Xe[r];return i?i:(t=n.body.appendChild(n.createElement(r)),i=ge.css(t,"display"),t.parentNode.removeChild(t),"none"===i&&(i="block"),Xe[r]=i,i)}function y(e,t){for(var n,r,i=[],o=0,a=e.length;o<a;o++)r=e[o],r.style&&(n=r.style.display,t?("none"===n&&(i[o]=Pe.get(r,"display")||null,i[o]||(r.style.display="")),""===r.style.display&&_e(r)&&(i[o]=v(r))):"none"!==n&&(i[o]="none",Pe.set(r,"display",n)));for(o=0;o<a;o++)null!=i[o]&&(e[o].style.display=i[o]);return e}function m(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&i(e,t)?ge.merge([e],n):n}function x(e,t){for(var n=0,r=e.length;n<r;n++)Pe.set(e[n],"globalEval",!t||Pe.get(t[n],"globalEval"))}function b(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if(o=e[d],o||0===o)if("object"===ge.type(o))ge.merge(p,o.nodeType?[o]:o);else if(Qe.test(o)){for(a=a||f.appendChild(t.createElement("div")),s=(Ve.exec(o)||["",""])[1].toLowerCase(),u=Ye[s]||Ye._default,a.innerHTML=u[1]+ge.htmlPrefilter(o)+u[2],c=u[0];c--;)a=a.lastChild;ge.merge(p,a.childNodes),a=f.firstChild,a.textContent=""}else p.push(t.createTextNode(o));for(f.textContent="",d=0;o=p[d++];)if(r&&ge.inArray(o,r)>-1)i&&i.push(o);else if(l=ge.contains(o.ownerDocument,o),a=m(f.appendChild(o),"script"),l&&x(a),n)for(c=0;o=a[c++];)Ge.test(o.type||"")&&n.push(o);return f}function w(){return!0}function T(){return!1}function C(){try{return ne.activeElement}catch(e){}}function E(e,t,n,r,i,o){var a,s;if("object"==typeof t){"string"!=typeof n&&(r=r||n,n=void 0);for(s in t)E(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),i===!1)i=T;else if(!i)return e;return 1===o&&(a=i,i=function(e){return ge().off(e),a.apply(this,arguments)},i.guid=a.guid||(a.guid=ge.guid++)),e.each(function(){ge.event.add(this,t,i,r,n)})}function k(e,t){return i(e,"table")&&i(11!==t.nodeType?t:t.firstChild,"tr")?ge(">tbody",e)[0]||e:e}function S(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function N(e){var t=it.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function D(e,t){var n,r,i,o,a,s,u,l;if(1===t.nodeType){if(Pe.hasData(e)&&(o=Pe.access(e),a=Pe.set(t,o),l=o.events)){delete a.handle,a.events={};for(i in l)for(n=0,r=l[i].length;n<r;n++)ge.event.add(t,i,l[i][n])}Re.hasData(e)&&(s=Re.access(e),u=ge.extend({},s),Re.set(t,u))}}function j(e,t){var n=t.nodeName.toLowerCase();"input"===n&&Ue.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function A(e,t,r,i){t=oe.apply([],t);var o,a,s,u,l,c,f=0,p=e.length,d=p-1,h=t[0],g=ge.isFunction(h);if(g||p>1&&"string"==typeof h&&!de.checkClone&&rt.test(h))return e.each(function(n){var o=e.eq(n);g&&(t[0]=h.call(this,n,o.html())),A(o,t,r,i)});if(p&&(o=b(t,e[0].ownerDocument,!1,e,i),a=o.firstChild,1===o.childNodes.length&&(o=a),a||i)){for(s=ge.map(m(o,"script"),S),u=s.length;f<p;f++)l=o,f!==d&&(l=ge.clone(l,!0,!0),u&&ge.merge(s,m(l,"script"))),r.call(e[f],l,f);if(u)for(c=s[s.length-1].ownerDocument,ge.map(s,N),f=0;f<u;f++)l=s[f],Ge.test(l.type||"")&&!Pe.access(l,"globalEval")&&ge.contains(c,l)&&(l.src?ge._evalUrl&&ge._evalUrl(l.src):n(l.textContent.replace(ot,""),c))}return e}function q(e,t,n){for(var r,i=t?ge.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||ge.cleanData(m(r)),r.parentNode&&(n&&ge.contains(r.ownerDocument,r)&&x(m(r,"script")),r.parentNode.removeChild(r));return e}function L(e,t,n){var r,i,o,a,s=e.style;return n=n||ut(e),n&&(a=n.getPropertyValue(t)||n[t],""!==a||ge.contains(e.ownerDocument,e)||(a=ge.style(e,t)),!de.pixelMarginRight()&&st.test(a)&&at.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function H(e,t){return{get:function(){return e()?void delete this.get:(this.get=t).apply(this,arguments)}}}function F(e){if(e in ht)return e;for(var t=e[0].toUpperCase()+e.slice(1),n=dt.length;n--;)if(e=dt[n]+t,e in ht)return e}function O(e){var t=ge.cssProps[e];return t||(t=ge.cssProps[e]=F(e)||e),t}function P(e,t,n){var r=$e.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function R(e,t,n,r,i){var o,a=0;for(o=n===(r?"border":"content")?4:"width"===t?1:0;o<4;o+=2)"margin"===n&&(a+=ge.css(e,n+Be[o],!0,i)),r?("content"===n&&(a-=ge.css(e,"padding"+Be[o],!0,i)),"margin"!==n&&(a-=ge.css(e,"border"+Be[o]+"Width",!0,i))):(a+=ge.css(e,"padding"+Be[o],!0,i),"padding"!==n&&(a+=ge.css(e,"border"+Be[o]+"Width",!0,i)));return a}function M(e,t,n){var r,i=ut(e),o=L(e,t,i),a="border-box"===ge.css(e,"boxSizing",!1,i);return st.test(o)?o:(r=a&&(de.boxSizingReliable()||o===e.style[t]),"auto"===o&&(o=e["offset"+t[0].toUpperCase()+t.slice(1)]),o=parseFloat(o)||0,o+R(e,t,n||(a?"border":"content"),r,i)+"px")}function I(e,t,n,r,i){return new I.prototype.init(e,t,n,r,i)}function W(){vt&&(ne.hidden===!1&&e.requestAnimationFrame?e.requestAnimationFrame(W):e.setTimeout(W,ge.fx.interval),ge.fx.tick())}function $(){return e.setTimeout(function(){gt=void 0}),gt=ge.now()}function B(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)n=Be[r],i["margin"+n]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function _(e,t,n){for(var r,i=(U.tweeners[t]||[]).concat(U.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function z(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&_e(e),v=Pe.get(e,"fxshow");n.queue||(a=ge._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,ge.queue(e,"fx").length||a.empty.fire()})}));for(r in t)if(i=t[r],yt.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue;g=!0}d[r]=v&&v[r]||ge.style(e,r)}if(u=!ge.isEmptyObject(t),u||!ge.isEmptyObject(d)){f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],l=v&&v.display,null==l&&(l=Pe.get(e,"display")),c=ge.css(e,"display"),"none"===c&&(l?c=l:(y([e],!0),l=e.style.display||l,c=ge.css(e,"display"),y([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===ge.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1;for(r in d)u||(v?"hidden"in v&&(g=v.hidden):v=Pe.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&y([e],!0),p.done(function(){g||y([e]),Pe.remove(e,"fxshow");for(r in d)ge.style(e,r,d[r])})),u=_(g?v[r]:0,r,p),r in v||(v[r]=u.start,g&&(u.end=u.start,u.start=0))}}function X(e,t){var n,r,i,o,a;for(n in e)if(r=ge.camelCase(n),i=t[r],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=ge.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function U(e,t,n){var r,i,o=0,a=U.prefilters.length,s=ge.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;for(var t=gt||$(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;a<u;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),o<1&&u?n:(u||s.notifyWith(e,[l,1,0]),s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:ge.extend({},t),opts:ge.extend(!0,{specialEasing:{},easing:ge.easing._default},n),originalProperties:t,originalOptions:n,startTime:gt||$(),duration:n.duration,tweens:[],createTween:function(t,n){var r=ge.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;n<r;n++)l.tweens[n].run(1);return t?(s.notifyWith(e,[l,1,0]),s.resolveWith(e,[l,t])):s.rejectWith(e,[l,t]),this}}),c=l.props;for(X(c,l.opts.specialEasing);o<a;o++)if(r=U.prefilters[o].call(l,e,c,l.opts))return ge.isFunction(r.stop)&&(ge._queueHooks(l.elem,l.opts.queue).stop=ge.proxy(r.stop,r)),r;return ge.map(c,_,l),ge.isFunction(l.opts.start)&&l.opts.start.call(e,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),ge.fx.timer(ge.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l}function V(e){var t=e.match(qe)||[];return t.join(" ")}function G(e){return e.getAttribute&&e.getAttribute("class")||""}function Y(e,t,n,r){var i;if(Array.isArray(t))ge.each(t,function(t,i){n||Dt.test(e)?r(e,i):Y(e+"["+("object"==typeof i&&null!=i?t:"")+"]",i,n,r)});else if(n||"object"!==ge.type(t))r(e,t);else for(i in t)Y(e+"["+i+"]",t[i],n,r)}function Q(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(qe)||[];if(ge.isFunction(n))for(;r=o[i++];)"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function J(e,t,n,r){function i(s){var u;return o[s]=!0,ge.each(e[s]||[],function(e,s){var l=s(t,n,r);return"string"!=typeof l||a||o[l]?a?!(u=l):void 0:(t.dataTypes.unshift(l),i(l),!1)}),u}var o={},a=e===Wt;return i(t.dataTypes[0])||!o["*"]&&i("*")}function K(e,t){var n,r,i=ge.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&ge.extend(!0,e,r),e}function Z(e,t,n){for(var r,i,o,a,s=e.contents,u=e.dataTypes;"*"===u[0];)u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}function ee(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];for(o=c.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(a=l[u+" "+o]||l["* "+o],!a)for(i in l)if(s=i.split(" "),s[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){a===!0?a=l[i]:l[i]!==!0&&(o=s[0],c.unshift(s[1]));break}if(a!==!0)if(a&&e.throws)t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}var te=[],ne=e.document,re=Object.getPrototypeOf,ie=te.slice,oe=te.concat,ae=te.push,se=te.indexOf,ue={},le=ue.toString,ce=ue.hasOwnProperty,fe=ce.toString,pe=fe.call(Object),de={},he="3.2.1",ge=function(e,t){return new ge.fn.init(e,t)},ve=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,ye=/^-ms-/,me=/-([a-z])/g,xe=function(e,t){return t.toUpperCase()};ge.fn=ge.prototype={jquery:he,constructor:ge,length:0,toArray:function(){return ie.call(this)},get:function(e){return null==e?ie.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=ge.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return ge.each(this,e)},map:function(e){return this.pushStack(ge.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(ie.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:ae,sort:te.sort,splice:te.splice},ge.extend=ge.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||ge.isFunction(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)n=a[t],r=e[t],a!==r&&(l&&r&&(ge.isPlainObject(r)||(i=Array.isArray(r)))?(i?(i=!1,o=n&&Array.isArray(n)?n:[]):o=n&&ge.isPlainObject(n)?n:{},a[t]=ge.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},ge.extend({expando:"jQuery"+(he+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===ge.type(e)},isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){var t=ge.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==le.call(e)||(t=re(e))&&(n=ce.call(t,"constructor")&&t.constructor,"function"!=typeof n||fe.call(n)!==pe))},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?ue[le.call(e)]||"object":typeof e},globalEval:function(e){n(e)},camelCase:function(e){return e.replace(ye,"ms-").replace(me,xe)},each:function(e,t){var n,i=0;if(r(e))for(n=e.length;i<n&&t.call(e[i],i,e[i])!==!1;i++);else for(i in e)if(t.call(e[i],i,e[i])===!1)break;return e},trim:function(e){return null==e?"":(e+"").replace(ve,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(r(Object(e))?ge.merge(n,"string"==typeof e?[e]:e):ae.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:se.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r,i=[],o=0,a=e.length,s=!n;o<a;o++)r=!t(e[o],o),r!==s&&i.push(e[o]);return i},map:function(e,t,n){var i,o,a=0,s=[];if(r(e))for(i=e.length;a<i;a++)o=t(e[a],a,n),null!=o&&s.push(o);else for(a in e)o=t(e[a],a,n),null!=o&&s.push(o);return oe.apply([],s)},guid:1,proxy:function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),ge.isFunction(e))return r=ie.call(arguments,2),i=function(){return e.apply(t||this,r.concat(ie.call(arguments)))},i.guid=e.guid=e.guid||ge.guid++,i},now:Date.now,support:de}),"function"==typeof Symbol&&(ge.fn[Symbol.iterator]=te[Symbol.iterator]),ge.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){ue["[object "+t+"]"]=t.toLowerCase()});var be=function(e){function t(e,t,n,r){var i,o,a,s,u,l,c,p=t&&t.ownerDocument,h=t?t.nodeType:9;if(n=n||[],"string"!=typeof e||!e||1!==h&&9!==h&&11!==h)return n;if(!r&&((t?t.ownerDocument||t:$)!==H&&L(t),t=t||H,O)){if(11!==h&&(u=ye.exec(e)))if(i=u[1]){if(9===h){if(!(a=t.getElementById(i)))return n;if(a.id===i)return n.push(a),n}else if(p&&(a=p.getElementById(i))&&I(t,a)&&a.id===i)return n.push(a),n}else{if(u[2])return K.apply(n,t.getElementsByTagName(e)),n;if((i=u[3])&&T.getElementsByClassName&&t.getElementsByClassName)return K.apply(n,t.getElementsByClassName(i)),n}if(T.qsa&&!U[e+" "]&&(!P||!P.test(e))){if(1!==h)p=t,c=e;else if("object"!==t.nodeName.toLowerCase()){for((s=t.getAttribute("id"))?s=s.replace(we,Te):t.setAttribute("id",s=W),l=S(e),o=l.length;o--;)l[o]="#"+s+" "+d(l[o]);c=l.join(","),p=me.test(e)&&f(t.parentNode)||t}if(c)try{return K.apply(n,p.querySelectorAll(c)),n}catch(e){}finally{s===W&&t.removeAttribute("id")}}}return D(e.replace(se,"$1"),t,n,r)}function n(){function e(n,r){return t.push(n+" ")>C.cacheLength&&delete e[t.shift()],e[n+" "]=r}var t=[];return e}function r(e){return e[W]=!0,e}function i(e){var t=H.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function o(e,t){for(var n=e.split("|"),r=n.length;r--;)C.attrHandle[n[r]]=t}function a(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function s(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function u(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function l(e){return function(t){return"form"in t?t.parentNode&&t.disabled===!1?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&Ee(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function c(e){return r(function(t){return t=+t,r(function(n,r){for(var i,o=e([],n.length,t),a=o.length;a--;)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function f(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}function p(){}function d(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function h(e,t,n){var r=t.dir,i=t.next,o=i||r,a=n&&"parentNode"===o,s=_++;return t.first?function(t,n,i){for(;t=t[r];)if(1===t.nodeType||a)return e(t,n,i);return!1}:function(t,n,u){var l,c,f,p=[B,s];if(u){for(;t=t[r];)if((1===t.nodeType||a)&&e(t,n,u))return!0}else for(;t=t[r];)if(1===t.nodeType||a)if(f=t[W]||(t[W]={}),c=f[t.uniqueID]||(f[t.uniqueID]={}),i&&i===t.nodeName.toLowerCase())t=t[r]||t;else{if((l=c[o])&&l[0]===B&&l[1]===s)return p[2]=l[2];if(c[o]=p,p[2]=e(t,n,u))return!0}return!1}}function g(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function v(e,n,r){for(var i=0,o=n.length;i<o;i++)t(e,n[i],r);return r}function y(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function m(e,t,n,i,o,a){return i&&!i[W]&&(i=m(i)),o&&!o[W]&&(o=m(o,a)),r(function(r,a,s,u){var l,c,f,p=[],d=[],h=a.length,g=r||v(t||"*",s.nodeType?[s]:s,[]),m=!e||!r&&t?g:y(g,p,e,s,u),x=n?o||(r?e:h||i)?[]:a:m;if(n&&n(m,x,s,u),i)for(l=y(x,d),i(l,[],s,u),c=l.length;c--;)(f=l[c])&&(x[d[c]]=!(m[d[c]]=f));if(r){if(o||e){if(o){for(l=[],c=x.length;c--;)(f=x[c])&&l.push(m[c]=f);o(null,x=[],l,u)}for(c=x.length;c--;)(f=x[c])&&(l=o?ee(r,f):p[c])>-1&&(r[l]=!(a[l]=f))}}else x=y(x===a?x.splice(h,x.length):x),o?o(null,a,x,u):K.apply(a,x)})}function x(e){for(var t,n,r,i=e.length,o=C.relative[e[0].type],a=o||C.relative[" "],s=o?1:0,u=h(function(e){return e===t},a,!0),l=h(function(e){return ee(t,e)>-1},a,!0),c=[function(e,n,r){var i=!o&&(r||n!==j)||((t=n).nodeType?u(e,n,r):l(e,n,r));return t=null,i}];s<i;s++)if(n=C.relative[e[s].type])c=[h(g(c),n)];else{if(n=C.filter[e[s].type].apply(null,e[s].matches),n[W]){for(r=++s;r<i&&!C.relative[e[r].type];r++);return m(s>1&&g(c),s>1&&d(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(se,"$1"),n,s<r&&x(e.slice(s,r)),r<i&&x(e=e.slice(r)),r<i&&d(e))}c.push(n)}return g(c)}function b(e,n){var i=n.length>0,o=e.length>0,a=function(r,a,s,u,l){var c,f,p,d=0,h="0",g=r&&[],v=[],m=j,x=r||o&&C.find.TAG("*",l),b=B+=null==m?1:Math.random()||.1,w=x.length;for(l&&(j=a===H||a||l);h!==w&&null!=(c=x[h]);h++){if(o&&c){for(f=0,a||c.ownerDocument===H||(L(c),s=!O);p=e[f++];)if(p(c,a||H,s)){u.push(c);break}l&&(B=b)}i&&((c=!p&&c)&&d--,r&&g.push(c))}if(d+=h,i&&h!==d){for(f=0;p=n[f++];)p(g,v,a,s);if(r){if(d>0)for(;h--;)g[h]||v[h]||(v[h]=Q.call(u));v=y(v)}K.apply(u,v),l&&!r&&v.length>0&&d+n.length>1&&t.uniqueSort(u)}return l&&(B=b,j=m),g};return i?r(a):a}var w,T,C,E,k,S,N,D,j,A,q,L,H,F,O,P,R,M,I,W="sizzle"+1*new Date,$=e.document,B=0,_=0,z=n(),X=n(),U=n(),V=function(e,t){return e===t&&(q=!0),0},G={}.hasOwnProperty,Y=[],Q=Y.pop,J=Y.push,K=Y.push,Z=Y.slice,ee=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},te="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",ne="[\\x20\\t\\r\\n\\f]",re="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",ie="\\["+ne+"*("+re+")(?:"+ne+"*([*^$|!~]?=)"+ne+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+re+"))|)"+ne+"*\\]",oe=":("+re+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+ie+")*)|.*)\\)|)",ae=new RegExp(ne+"+","g"),se=new RegExp("^"+ne+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ne+"+$","g"),ue=new RegExp("^"+ne+"*,"+ne+"*"),le=new RegExp("^"+ne+"*([>+~]|"+ne+")"+ne+"*"),ce=new RegExp("="+ne+"*([^\\]'\"]*?)"+ne+"*\\]","g"),fe=new RegExp(oe),pe=new RegExp("^"+re+"$"),de={ID:new RegExp("^#("+re+")"),CLASS:new RegExp("^\\.("+re+")"),TAG:new RegExp("^("+re+"|[*])"),ATTR:new RegExp("^"+ie),PSEUDO:new RegExp("^"+oe),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ne+"*(even|odd|(([+-]|)(\\d*)n|)"+ne+"*(?:([+-]|)"+ne+"*(\\d+)|))"+ne+"*\\)|)","i"),bool:new RegExp("^(?:"+te+")$","i"),needsContext:new RegExp("^"+ne+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ne+"*((?:-\\d)?\\d*)"+ne+"*\\)|)(?=[^-]|$)","i")},he=/^(?:input|select|textarea|button)$/i,ge=/^h\d$/i,ve=/^[^{]+\{\s*\[native \w/,ye=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,me=/[+~]/,xe=new RegExp("\\\\([\\da-f]{1,6}"+ne+"?|("+ne+")|.)","ig"),be=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},we=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,Te=function(e,t){return t?"\0"===e?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},Ce=function(){L()},Ee=h(function(e){return e.disabled===!0&&("form"in e||"label"in e)},{dir:"parentNode",next:"legend"});try{K.apply(Y=Z.call($.childNodes),$.childNodes),Y[$.childNodes.length].nodeType}catch(e){K={apply:Y.length?function(e,t){J.apply(e,Z.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}T=t.support={},k=t.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName},L=t.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:$;return r!==H&&9===r.nodeType&&r.documentElement?(H=r,F=H.documentElement,O=!k(H),$!==H&&(n=H.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",Ce,!1):n.attachEvent&&n.attachEvent("onunload",Ce)),T.attributes=i(function(e){return e.className="i",!e.getAttribute("className")}),T.getElementsByTagName=i(function(e){return e.appendChild(H.createComment("")),!e.getElementsByTagName("*").length}),T.getElementsByClassName=ve.test(H.getElementsByClassName),T.getById=i(function(e){return F.appendChild(e).id=W,!H.getElementsByName||!H.getElementsByName(W).length}),T.getById?(C.filter.ID=function(e){var t=e.replace(xe,be);return function(e){return e.getAttribute("id")===t}},C.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&O){var n=t.getElementById(e);return n?[n]:[]}}):(C.filter.ID=function(e){var t=e.replace(xe,be);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},C.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&O){var n,r,i,o=t.getElementById(e);if(o){if(n=o.getAttributeNode("id"),n&&n.value===e)return[o];for(i=t.getElementsByName(e),r=0;o=i[r++];)if(n=o.getAttributeNode("id"),n&&n.value===e)return[o]}return[]}}),C.find.TAG=T.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):T.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o},C.find.CLASS=T.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&O)return t.getElementsByClassName(e)},R=[],P=[],(T.qsa=ve.test(H.querySelectorAll))&&(i(function(e){F.appendChild(e).innerHTML="<a id='"+W+"'></a><select id='"+W+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&P.push("[*^$]="+ne+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||P.push("\\["+ne+"*(?:value|"+te+")"),e.querySelectorAll("[id~="+W+"-]").length||P.push("~="),e.querySelectorAll(":checked").length||P.push(":checked"),e.querySelectorAll("a#"+W+"+*").length||P.push(".#.+[+~]")}),i(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=H.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&P.push("name"+ne+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&P.push(":enabled",":disabled"),F.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&P.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),P.push(",.*:")})),(T.matchesSelector=ve.test(M=F.matches||F.webkitMatchesSelector||F.mozMatchesSelector||F.oMatchesSelector||F.msMatchesSelector))&&i(function(e){T.disconnectedMatch=M.call(e,"*"),M.call(e,"[s!='']:x"),R.push("!=",oe)}),P=P.length&&new RegExp(P.join("|")),R=R.length&&new RegExp(R.join("|")),t=ve.test(F.compareDocumentPosition),I=t||ve.test(F.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},V=t?function(e,t){if(e===t)return q=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n?n:(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&n||!T.sortDetached&&t.compareDocumentPosition(e)===n?e===H||e.ownerDocument===$&&I($,e)?-1:t===H||t.ownerDocument===$&&I($,t)?1:A?ee(A,e)-ee(A,t):0:4&n?-1:1)}:function(e,t){if(e===t)return q=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,s=[e],u=[t];if(!i||!o)return e===H?-1:t===H?1:i?-1:o?1:A?ee(A,e)-ee(A,t):0;if(i===o)return a(e,t);for(n=e;n=n.parentNode;)s.unshift(n);for(n=t;n=n.parentNode;)u.unshift(n);for(;s[r]===u[r];)r++;return r?a(s[r],u[r]):s[r]===$?-1:u[r]===$?1:0},H):H},t.matches=function(e,n){return t(e,null,null,n)},t.matchesSelector=function(e,n){if((e.ownerDocument||e)!==H&&L(e),n=n.replace(ce,"='$1']"),T.matchesSelector&&O&&!U[n+" "]&&(!R||!R.test(n))&&(!P||!P.test(n)))try{var r=M.call(e,n);if(r||T.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(e){}return t(n,H,null,[e]).length>0},t.contains=function(e,t){return(e.ownerDocument||e)!==H&&L(e),I(e,t)},t.attr=function(e,t){(e.ownerDocument||e)!==H&&L(e);var n=C.attrHandle[t.toLowerCase()],r=n&&G.call(C.attrHandle,t.toLowerCase())?n(e,t,!O):void 0;return void 0!==r?r:T.attributes||!O?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},t.escape=function(e){return(e+"").replace(we,Te)},t.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},t.uniqueSort=function(e){var t,n=[],r=0,i=0;if(q=!T.detectDuplicates,A=!T.sortStable&&e.slice(0),e.sort(V),q){for(;t=e[i++];)t===e[i]&&(r=n.push(i));for(;r--;)e.splice(n[r],1)}return A=null,e},E=t.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=E(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r++];)n+=E(t);return n},C=t.selectors={cacheLength:50,createPseudo:r,match:de,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(xe,be),e[3]=(e[3]||e[4]||e[5]||"").replace(xe,be),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||t.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&t.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return de.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&fe.test(n)&&(t=S(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(xe,be).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=z[e+" "];return t||(t=new RegExp("(^|"+ne+")"+e+"("+ne+"|$)"))&&z(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,n,r){return function(i){var o=t.attr(i,e);return null==o?"!="===n:!n||(o+="","="===n?o===r:"!="===n?o!==r:"^="===n?r&&0===o.indexOf(r):"*="===n?r&&o.indexOf(r)>-1:"$="===n?r&&o.slice(-r.length)===r:"~="===n?(" "+o.replace(ae," ")+" ").indexOf(r)>-1:"|="===n&&(o===r||o.slice(0,r.length+1)===r+"-"))}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,p,d,h,g=o!==a?"nextSibling":"previousSibling",v=t.parentNode,y=s&&t.nodeName.toLowerCase(),m=!u&&!s,x=!1;if(v){if(o){for(;g;){for(p=t;p=p[g];)if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?v.firstChild:v.lastChild],a&&m){for(p=v,f=p[W]||(p[W]={}),c=f[p.uniqueID]||(f[p.uniqueID]={}),l=c[e]||[],d=l[0]===B&&l[1],x=d&&l[2],p=d&&v.childNodes[d];p=++d&&p&&p[g]||(x=d=0)||h.pop();)if(1===p.nodeType&&++x&&p===t){c[e]=[B,d,x];break}}else if(m&&(p=t,f=p[W]||(p[W]={}),c=f[p.uniqueID]||(f[p.uniqueID]={}),l=c[e]||[],d=l[0]===B&&l[1],x=d),x===!1)for(;(p=++d&&p&&p[g]||(x=d=0)||h.pop())&&((s?p.nodeName.toLowerCase()!==y:1!==p.nodeType)||!++x||(m&&(f=p[W]||(p[W]={}),c=f[p.uniqueID]||(f[p.uniqueID]={}),c[e]=[B,x]),p!==t)););return x-=i,x===r||x%r===0&&x/r>=0}}},PSEUDO:function(e,n){var i,o=C.pseudos[e]||C.setFilters[e.toLowerCase()]||t.error("unsupported pseudo: "+e);return o[W]?o(n):o.length>1?(i=[e,e,"",n],C.setFilters.hasOwnProperty(e.toLowerCase())?r(function(e,t){for(var r,i=o(e,n),a=i.length;a--;)r=ee(e,i[a]),e[r]=!(t[r]=i[a])}):function(e){return o(e,0,i)}):o}},pseudos:{not:r(function(e){var t=[],n=[],i=N(e.replace(se,"$1"));return i[W]?r(function(e,t,n,r){for(var o,a=i(e,null,r,[]),s=e.length;s--;)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,r,o){return t[0]=e,i(t,null,o,n),t[0]=null,!n.pop()}}),has:r(function(e){return function(n){return t(e,n).length>0}}),contains:r(function(e){return e=e.replace(xe,be),function(t){return(t.textContent||t.innerText||E(t)).indexOf(e)>-1}}),lang:r(function(e){return pe.test(e||"")||t.error("unsupported lang: "+e),e=e.replace(xe,be).toLowerCase(),function(t){var n;do if(n=O?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),
target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===F},focus:function(e){return e===H.activeElement&&(!H.hasFocus||H.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:l(!1),disabled:l(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!C.pseudos.empty(e)},header:function(e){return ge.test(e.nodeName)},input:function(e){return he.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:c(function(){return[0]}),last:c(function(e,t){return[t-1]}),eq:c(function(e,t,n){return[n<0?n+t:n]}),even:c(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:c(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:c(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:c(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},C.pseudos.nth=C.pseudos.eq;for(w in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})C.pseudos[w]=s(w);for(w in{submit:!0,reset:!0})C.pseudos[w]=u(w);return p.prototype=C.filters=C.pseudos,C.setFilters=new p,S=t.tokenize=function(e,n){var r,i,o,a,s,u,l,c=X[e+" "];if(c)return n?0:c.slice(0);for(s=e,u=[],l=C.preFilter;s;){r&&!(i=ue.exec(s))||(i&&(s=s.slice(i[0].length)||s),u.push(o=[])),r=!1,(i=le.exec(s))&&(r=i.shift(),o.push({value:r,type:i[0].replace(se," ")}),s=s.slice(r.length));for(a in C.filter)!(i=de[a].exec(s))||l[a]&&!(i=l[a](i))||(r=i.shift(),o.push({value:r,type:a,matches:i}),s=s.slice(r.length));if(!r)break}return n?s.length:s?t.error(e):X(e,u).slice(0)},N=t.compile=function(e,t){var n,r=[],i=[],o=U[e+" "];if(!o){for(t||(t=S(e)),n=t.length;n--;)o=x(t[n]),o[W]?r.push(o):i.push(o);o=U(e,b(i,r)),o.selector=e}return o},D=t.select=function(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&S(e=l.selector||e);if(n=n||[],1===c.length){if(o=c[0]=c[0].slice(0),o.length>2&&"ID"===(a=o[0]).type&&9===t.nodeType&&O&&C.relative[o[1].type]){if(t=(C.find.ID(a.matches[0].replace(xe,be),t)||[])[0],!t)return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}for(i=de.needsContext.test(e)?0:o.length;i--&&(a=o[i],!C.relative[s=a.type]);)if((u=C.find[s])&&(r=u(a.matches[0].replace(xe,be),me.test(o[0].type)&&f(t.parentNode)||t))){if(o.splice(i,1),e=r.length&&d(o),!e)return K.apply(n,r),n;break}}return(l||N(e,c))(r,t,!O,n,!t||me.test(e)&&f(t.parentNode)||t),n},T.sortStable=W.split("").sort(V).join("")===W,T.detectDuplicates=!!q,L(),T.sortDetached=i(function(e){return 1&e.compareDocumentPosition(H.createElement("fieldset"))}),i(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||o("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),T.attributes&&i(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||o("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),i(function(e){return null==e.getAttribute("disabled")})||o(te,function(e,t,n){var r;if(!n)return e[t]===!0?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),t}(e);ge.find=be,ge.expr=be.selectors,ge.expr[":"]=ge.expr.pseudos,ge.uniqueSort=ge.unique=be.uniqueSort,ge.text=be.getText,ge.isXMLDoc=be.isXML,ge.contains=be.contains,ge.escapeSelector=be.escape;var we=function(e,t,n){for(var r=[],i=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(i&&ge(e).is(n))break;r.push(e)}return r},Te=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},Ce=ge.expr.match.needsContext,Ee=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,ke=/^.[^:#\[\.,]*$/;ge.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?ge.find.matchesSelector(r,e)?[r]:[]:ge.find.matches(e,ge.grep(t,function(e){return 1===e.nodeType}))},ge.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(ge(e).filter(function(){for(t=0;t<r;t++)if(ge.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)ge.find(e,i[t],n);return r>1?ge.uniqueSort(n):n},filter:function(e){return this.pushStack(o(this,e||[],!1))},not:function(e){return this.pushStack(o(this,e||[],!0))},is:function(e){return!!o(this,"string"==typeof e&&Ce.test(e)?ge(e):e||[],!1).length}});var Se,Ne=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,De=ge.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||Se,"string"==typeof e){if(r="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:Ne.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof ge?t[0]:t,ge.merge(this,ge.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:ne,!0)),Ee.test(r[1])&&ge.isPlainObject(t))for(r in t)ge.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return i=ne.getElementById(r[2]),i&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):ge.isFunction(e)?void 0!==n.ready?n.ready(e):e(ge):ge.makeArray(e,this)};De.prototype=ge.fn,Se=ge(ne);var je=/^(?:parents|prev(?:Until|All))/,Ae={children:!0,contents:!0,next:!0,prev:!0};ge.fn.extend({has:function(e){var t=ge(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(ge.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&ge(e);if(!Ce.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?a.index(n)>-1:1===n.nodeType&&ge.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?ge.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?se.call(ge(e),this[0]):se.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(ge.uniqueSort(ge.merge(this.get(),ge(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),ge.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return we(e,"parentNode")},parentsUntil:function(e,t,n){return we(e,"parentNode",n)},next:function(e){return a(e,"nextSibling")},prev:function(e){return a(e,"previousSibling")},nextAll:function(e){return we(e,"nextSibling")},prevAll:function(e){return we(e,"previousSibling")},nextUntil:function(e,t,n){return we(e,"nextSibling",n)},prevUntil:function(e,t,n){return we(e,"previousSibling",n)},siblings:function(e){return Te((e.parentNode||{}).firstChild,e)},children:function(e){return Te(e.firstChild)},contents:function(e){return i(e,"iframe")?e.contentDocument:(i(e,"template")&&(e=e.content||e),ge.merge([],e.childNodes))}},function(e,t){ge.fn[e]=function(n,r){var i=ge.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=ge.filter(r,i)),this.length>1&&(Ae[e]||ge.uniqueSort(i),je.test(e)&&i.reverse()),this.pushStack(i)}});var qe=/[^\x20\t\r\n\f]+/g;ge.Callbacks=function(e){e="string"==typeof e?s(e):ge.extend({},e);var t,n,r,i,o=[],a=[],u=-1,l=function(){for(i=i||e.once,r=t=!0;a.length;u=-1)for(n=a.shift();++u<o.length;)o[u].apply(n[0],n[1])===!1&&e.stopOnFalse&&(u=o.length,n=!1);e.memory||(n=!1),t=!1,i&&(o=n?[]:"")},c={add:function(){return o&&(n&&!t&&(u=o.length-1,a.push(n)),function t(n){ge.each(n,function(n,r){ge.isFunction(r)?e.unique&&c.has(r)||o.push(r):r&&r.length&&"string"!==ge.type(r)&&t(r)})}(arguments),n&&!t&&l()),this},remove:function(){return ge.each(arguments,function(e,t){for(var n;(n=ge.inArray(t,o,n))>-1;)o.splice(n,1),n<=u&&u--}),this},has:function(e){return e?ge.inArray(e,o)>-1:o.length>0},empty:function(){return o&&(o=[]),this},disable:function(){return i=a=[],o=n="",this},disabled:function(){return!o},lock:function(){return i=a=[],n||t||(o=n=""),this},locked:function(){return!!i},fireWith:function(e,n){return i||(n=n||[],n=[e,n.slice?n.slice():n],a.push(n),t||l()),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},ge.extend({Deferred:function(t){var n=[["notify","progress",ge.Callbacks("memory"),ge.Callbacks("memory"),2],["resolve","done",ge.Callbacks("once memory"),ge.Callbacks("once memory"),0,"resolved"],["reject","fail",ge.Callbacks("once memory"),ge.Callbacks("once memory"),1,"rejected"]],r="pending",i={state:function(){return r},always:function(){return o.done(arguments).fail(arguments),this},catch:function(e){return i.then(null,e)},pipe:function(){var e=arguments;return ge.Deferred(function(t){ge.each(n,function(n,r){var i=ge.isFunction(e[r[4]])&&e[r[4]];o[r[1]](function(){var e=i&&i.apply(this,arguments);e&&ge.isFunction(e.promise)?e.promise().progress(t.notify).done(t.resolve).fail(t.reject):t[r[0]+"With"](this,i?[e]:arguments)})}),e=null}).promise()},then:function(t,r,i){function o(t,n,r,i){return function(){var s=this,c=arguments,f=function(){var e,f;if(!(t<a)){if(e=r.apply(s,c),e===n.promise())throw new TypeError("Thenable self-resolution");f=e&&("object"==typeof e||"function"==typeof e)&&e.then,ge.isFunction(f)?i?f.call(e,o(a,n,u,i),o(a,n,l,i)):(a++,f.call(e,o(a,n,u,i),o(a,n,l,i),o(a,n,u,n.notifyWith))):(r!==u&&(s=void 0,c=[e]),(i||n.resolveWith)(s,c))}},p=i?f:function(){try{f()}catch(e){ge.Deferred.exceptionHook&&ge.Deferred.exceptionHook(e,p.stackTrace),t+1>=a&&(r!==l&&(s=void 0,c=[e]),n.rejectWith(s,c))}};t?p():(ge.Deferred.getStackHook&&(p.stackTrace=ge.Deferred.getStackHook()),e.setTimeout(p))}}var a=0;return ge.Deferred(function(e){n[0][3].add(o(0,e,ge.isFunction(i)?i:u,e.notifyWith)),n[1][3].add(o(0,e,ge.isFunction(t)?t:u)),n[2][3].add(o(0,e,ge.isFunction(r)?r:l))}).promise()},promise:function(e){return null!=e?ge.extend(e,i):i}},o={};return ge.each(n,function(e,t){var a=t[2],s=t[5];i[t[1]]=a.add,s&&a.add(function(){r=s},n[3-e][2].disable,n[0][2].lock),a.add(t[3].fire),o[t[0]]=function(){return o[t[0]+"With"](this===o?void 0:this,arguments),this},o[t[0]+"With"]=a.fireWith}),i.promise(o),t&&t.call(o,o),o},when:function(e){var t=arguments.length,n=t,r=Array(n),i=ie.call(arguments),o=ge.Deferred(),a=function(e){return function(n){r[e]=this,i[e]=arguments.length>1?ie.call(arguments):n,--t||o.resolveWith(r,i)}};if(t<=1&&(c(e,o.done(a(n)).resolve,o.reject,!t),"pending"===o.state()||ge.isFunction(i[n]&&i[n].then)))return o.then();for(;n--;)c(i[n],a(n),o.reject);return o.promise()}});var Le=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;ge.Deferred.exceptionHook=function(t,n){e.console&&e.console.warn&&t&&Le.test(t.name)&&e.console.warn("jQuery.Deferred exception: "+t.message,t.stack,n)},ge.readyException=function(t){e.setTimeout(function(){throw t})};var He=ge.Deferred();ge.fn.ready=function(e){return He.then(e).catch(function(e){ge.readyException(e)}),this},ge.extend({isReady:!1,readyWait:1,ready:function(e){(e===!0?--ge.readyWait:ge.isReady)||(ge.isReady=!0,e!==!0&&--ge.readyWait>0||He.resolveWith(ne,[ge]))}}),ge.ready.then=He.then,"complete"===ne.readyState||"loading"!==ne.readyState&&!ne.documentElement.doScroll?e.setTimeout(ge.ready):(ne.addEventListener("DOMContentLoaded",f),e.addEventListener("load",f));var Fe=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===ge.type(n)){i=!0;for(s in n)Fe(e,t,s,n[s],!0,o,a)}else if(void 0!==r&&(i=!0,ge.isFunction(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(ge(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},Oe=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};p.uid=1,p.prototype={cache:function(e){var t=e[this.expando];return t||(t={},Oe(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[ge.camelCase(t)]=n;else for(r in t)i[ge.camelCase(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][ge.camelCase(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){Array.isArray(t)?t=t.map(ge.camelCase):(t=ge.camelCase(t),t=t in r?[t]:t.match(qe)||[]),n=t.length;for(;n--;)delete r[t[n]]}(void 0===t||ge.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!ge.isEmptyObject(t)}};var Pe=new p,Re=new p,Me=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Ie=/[A-Z]/g;ge.extend({hasData:function(e){return Re.hasData(e)||Pe.hasData(e)},data:function(e,t,n){return Re.access(e,t,n)},removeData:function(e,t){Re.remove(e,t)},_data:function(e,t,n){return Pe.access(e,t,n)},_removeData:function(e,t){Pe.remove(e,t)}}),ge.fn.extend({data:function(e,t){var n,r,i,o=this[0],a=o&&o.attributes;if(void 0===e){if(this.length&&(i=Re.get(o),1===o.nodeType&&!Pe.get(o,"hasDataAttrs"))){for(n=a.length;n--;)a[n]&&(r=a[n].name,0===r.indexOf("data-")&&(r=ge.camelCase(r.slice(5)),h(o,r,i[r])));Pe.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof e?this.each(function(){Re.set(this,e)}):Fe(this,function(t){var n;if(o&&void 0===t){if(n=Re.get(o,e),void 0!==n)return n;if(n=h(o,e),void 0!==n)return n}else this.each(function(){Re.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){Re.remove(this,e)})}}),ge.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=Pe.get(e,t),n&&(!r||Array.isArray(n)?r=Pe.access(e,t,ge.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=ge.queue(e,t),r=n.length,i=n.shift(),o=ge._queueHooks(e,t),a=function(){ge.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return Pe.get(e,n)||Pe.access(e,n,{empty:ge.Callbacks("once memory").add(function(){Pe.remove(e,[t+"queue",n])})})}}),ge.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?ge.queue(this[0],e):void 0===t?this:this.each(function(){var n=ge.queue(this,e,t);ge._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&ge.dequeue(this,e)})},dequeue:function(e){return this.each(function(){ge.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=ge.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";a--;)n=Pe.get(o[a],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var We=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,$e=new RegExp("^(?:([+-])=|)("+We+")([a-z%]*)$","i"),Be=["Top","Right","Bottom","Left"],_e=function(e,t){return e=t||e,"none"===e.style.display||""===e.style.display&&ge.contains(e.ownerDocument,e)&&"none"===ge.css(e,"display")},ze=function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i},Xe={};ge.fn.extend({show:function(){return y(this,!0)},hide:function(){return y(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){_e(this)?ge(this).show():ge(this).hide()})}});var Ue=/^(?:checkbox|radio)$/i,Ve=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,Ge=/^$|\/(?:java|ecma)script/i,Ye={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};Ye.optgroup=Ye.option,Ye.tbody=Ye.tfoot=Ye.colgroup=Ye.caption=Ye.thead,Ye.th=Ye.td;var Qe=/<|&#?\w+;/;!function(){var e=ne.createDocumentFragment(),t=e.appendChild(ne.createElement("div")),n=ne.createElement("input");n.setAttribute("type","radio"),n.setAttribute("checked","checked"),n.setAttribute("name","t"),t.appendChild(n),de.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,t.innerHTML="<textarea>x</textarea>",de.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue}();var Je=ne.documentElement,Ke=/^key/,Ze=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,et=/^([^.]*)(?:\.(.+)|)/;ge.event={global:{},add:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Pe.get(e);if(v)for(n.handler&&(o=n,n=o.handler,i=o.selector),i&&ge.find.matchesSelector(Je,i),n.guid||(n.guid=ge.guid++),(u=v.events)||(u=v.events={}),(a=v.handle)||(a=v.handle=function(t){return"undefined"!=typeof ge&&ge.event.triggered!==t.type?ge.event.dispatch.apply(e,arguments):void 0}),t=(t||"").match(qe)||[""],l=t.length;l--;)s=et.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d&&(f=ge.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=ge.event.special[d]||{},c=ge.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&ge.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||(p=u[d]=[],p.delegateCount=0,f.setup&&f.setup.call(e,r,h,a)!==!1||e.addEventListener&&e.addEventListener(d,a)),f.add&&(f.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),ge.event.global[d]=!0)},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Pe.hasData(e)&&Pe.get(e);if(v&&(u=v.events)){for(t=(t||"").match(qe)||[""],l=t.length;l--;)if(s=et.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){for(f=ge.event.special[d]||{},d=(r?f.delegateType:f.bindType)||d,p=u[d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;o--;)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&f.teardown.call(e,h,v.handle)!==!1||ge.removeEvent(e,d,v.handle),delete u[d])}else for(d in u)ge.event.remove(e,d+t[l],n,r,!0);ge.isEmptyObject(u)&&Pe.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=ge.event.fix(e),u=new Array(arguments.length),l=(Pe.get(this,"events")||{})[s.type]||[],c=ge.event.special[s.type]||{};for(u[0]=s,t=1;t<arguments.length;t++)u[t]=arguments[t];if(s.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,s)!==!1){for(a=ge.event.handlers.call(this,s,l),t=0;(i=a[t++])&&!s.isPropagationStopped();)for(s.currentTarget=i.elem,n=0;(o=i.handlers[n++])&&!s.isImmediatePropagationStopped();)s.rnamespace&&!s.rnamespace.test(o.namespace)||(s.handleObj=o,s.data=o.data,r=((ge.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,u),void 0!==r&&(s.result=r)===!1&&(s.preventDefault(),s.stopPropagation()));return c.postDispatch&&c.postDispatch.call(this,s),s.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&e.button>=1))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||l.disabled!==!0)){for(o=[],a={},n=0;n<u;n++)r=t[n],i=r.selector+" ",void 0===a[i]&&(a[i]=r.needsContext?ge(i,this).index(l)>-1:ge.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(e,t){Object.defineProperty(ge.Event.prototype,e,{enumerable:!0,configurable:!0,get:ge.isFunction(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[ge.expando]?e:new ge.Event(e)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==C()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===C()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&i(this,"input"))return this.click(),!1},_default:function(e){return i(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},ge.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},ge.Event=function(e,t){return this instanceof ge.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&e.returnValue===!1?w:T,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&ge.extend(this,t),this.timeStamp=e&&e.timeStamp||ge.now(),void(this[ge.expando]=!0)):new ge.Event(e,t)},ge.Event.prototype={constructor:ge.Event,isDefaultPrevented:T,isPropagationStopped:T,isImmediatePropagationStopped:T,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=w,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=w,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=w,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},ge.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&Ke.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Ze.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},ge.event.addProp),ge.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){ge.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return i&&(i===r||ge.contains(r,i))||(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),ge.fn.extend({on:function(e,t,n,r){return E(this,e,t,n,r)},one:function(e,t,n,r){return E(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,ge(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return t!==!1&&"function"!=typeof t||(n=t,t=void 0),n===!1&&(n=T),this.each(function(){ge.event.remove(this,e,n,t)})}});var tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,nt=/<script|<style|<link/i,rt=/checked\s*(?:[^=]|=\s*.checked.)/i,it=/^true\/(.*)/,ot=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;ge.extend({htmlPrefilter:function(e){return e.replace(tt,"<$1></$2>")},clone:function(e,t,n){var r,i,o,a,s=e.cloneNode(!0),u=ge.contains(e.ownerDocument,e);if(!(de.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||ge.isXMLDoc(e)))for(a=m(s),o=m(e),r=0,i=o.length;r<i;r++)j(o[r],a[r]);if(t)if(n)for(o=o||m(e),a=a||m(s),r=0,i=o.length;r<i;r++)D(o[r],a[r]);else D(e,s);return a=m(s,"script"),a.length>0&&x(a,!u&&m(e,"script")),s},cleanData:function(e){for(var t,n,r,i=ge.event.special,o=0;void 0!==(n=e[o]);o++)if(Oe(n)){if(t=n[Pe.expando]){if(t.events)for(r in t.events)i[r]?ge.event.remove(n,r):ge.removeEvent(n,r,t.handle);n[Pe.expando]=void 0}n[Re.expando]&&(n[Re.expando]=void 0)}}}),ge.fn.extend({detach:function(e){return q(this,e,!0)},remove:function(e){return q(this,e)},text:function(e){return Fe(this,function(e){return void 0===e?ge.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return A(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=k(this,e);t.appendChild(e)}})},prepend:function(){return A(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=k(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return A(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return A(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(ge.cleanData(m(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return ge.clone(this,e,t)})},html:function(e){return Fe(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!nt.test(e)&&!Ye[(Ve.exec(e)||["",""])[1].toLowerCase()]){e=ge.htmlPrefilter(e);try{for(;n<r;n++)t=this[n]||{},1===t.nodeType&&(ge.cleanData(m(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=[];return A(this,arguments,function(t){var n=this.parentNode;ge.inArray(this,e)<0&&(ge.cleanData(m(this)),n&&n.replaceChild(t,this))},e)}}),ge.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){ge.fn[e]=function(e){for(var n,r=[],i=ge(e),o=i.length-1,a=0;a<=o;a++)n=a===o?this:this.clone(!0),ge(i[a])[t](n),ae.apply(r,n.get());return this.pushStack(r)}});var at=/^margin/,st=new RegExp("^("+We+")(?!px)[a-z%]+$","i"),ut=function(t){var n=t.ownerDocument.defaultView;return n&&n.opener||(n=e),n.getComputedStyle(t)};!function(){function t(){if(s){s.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",s.innerHTML="",Je.appendChild(a);var t=e.getComputedStyle(s);n="1%"!==t.top,o="2px"===t.marginLeft,r="4px"===t.width,s.style.marginRight="50%",i="4px"===t.marginRight,Je.removeChild(a),s=null}}var n,r,i,o,a=ne.createElement("div"),s=ne.createElement("div");s.style&&(s.style.backgroundClip="content-box",s.cloneNode(!0).style.backgroundClip="",de.clearCloneStyle="content-box"===s.style.backgroundClip,a.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",a.appendChild(s),ge.extend(de,{pixelPosition:function(){return t(),n},boxSizingReliable:function(){return t(),r},pixelMarginRight:function(){return t(),i},reliableMarginLeft:function(){return t(),o}}))}();var lt=/^(none|table(?!-c[ea]).+)/,ct=/^--/,ft={position:"absolute",visibility:"hidden",display:"block"},pt={letterSpacing:"0",fontWeight:"400"},dt=["Webkit","Moz","ms"],ht=ne.createElement("div").style;ge.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=L(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{float:"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=ge.camelCase(t),u=ct.test(t),l=e.style;return u||(t=O(s)),a=ge.cssHooks[t]||ge.cssHooks[s],void 0===n?a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t]:(o=typeof n,"string"===o&&(i=$e.exec(n))&&i[1]&&(n=g(e,t,i),o="number"),void(null!=n&&n===n&&("number"===o&&(n+=i&&i[3]||(ge.cssNumber[s]?"":"px")),de.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))))}},css:function(e,t,n,r){var i,o,a,s=ge.camelCase(t),u=ct.test(t);return u||(t=O(s)),a=ge.cssHooks[t]||ge.cssHooks[s],a&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=L(e,t,r)),"normal"===i&&t in pt&&(i=pt[t]),""===n||n?(o=parseFloat(i),n===!0||isFinite(o)?o||0:i):i}}),ge.each(["height","width"],function(e,t){ge.cssHooks[t]={get:function(e,n,r){if(n)return!lt.test(ge.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?M(e,t,r):ze(e,ft,function(){return M(e,t,r)})},set:function(e,n,r){var i,o=r&&ut(e),a=r&&R(e,t,r,"border-box"===ge.css(e,"boxSizing",!1,o),o);return a&&(i=$e.exec(n))&&"px"!==(i[3]||"px")&&(e.style[t]=n,n=ge.css(e,t)),P(e,n,a)}}}),ge.cssHooks.marginLeft=H(de.reliableMarginLeft,function(e,t){if(t)return(parseFloat(L(e,"marginLeft"))||e.getBoundingClientRect().left-ze(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),ge.each({margin:"",padding:"",border:"Width"},function(e,t){ge.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];r<4;r++)i[e+Be[r]+t]=o[r]||o[r-2]||o[0];return i}},at.test(e)||(ge.cssHooks[e+t].set=P)}),ge.fn.extend({css:function(e,t){return Fe(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=ut(e),i=t.length;a<i;a++)o[t[a]]=ge.css(e,t[a],!1,r);return o}return void 0!==n?ge.style(e,t,n):ge.css(e,t)},e,t,arguments.length>1)}}),ge.Tween=I,I.prototype={constructor:I,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||ge.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(ge.cssNumber[n]?"":"px")},cur:function(){var e=I.propHooks[this.prop];return e&&e.get?e.get(this):I.propHooks._default.get(this)},run:function(e){var t,n=I.propHooks[this.prop];return this.options.duration?this.pos=t=ge.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):I.propHooks._default.set(this),this}},I.prototype.init.prototype=I.prototype,I.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=ge.css(e.elem,e.prop,""),t&&"auto"!==t?t:0)},set:function(e){ge.fx.step[e.prop]?ge.fx.step[e.prop](e):1!==e.elem.nodeType||null==e.elem.style[ge.cssProps[e.prop]]&&!ge.cssHooks[e.prop]?e.elem[e.prop]=e.now:ge.style(e.elem,e.prop,e.now+e.unit)}}},I.propHooks.scrollTop=I.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},ge.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},ge.fx=I.prototype.init,ge.fx.step={};var gt,vt,yt=/^(?:toggle|show|hide)$/,mt=/queueHooks$/;ge.Animation=ge.extend(U,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return g(n.elem,e,$e.exec(t),n),n}]},tweener:function(e,t){ge.isFunction(e)?(t=e,e=["*"]):e=e.match(qe);for(var n,r=0,i=e.length;r<i;r++)n=e[r],U.tweeners[n]=U.tweeners[n]||[],U.tweeners[n].unshift(t)},prefilters:[z],prefilter:function(e,t){t?U.prefilters.unshift(e):U.prefilters.push(e)}}),ge.speed=function(e,t,n){var r=e&&"object"==typeof e?ge.extend({},e):{complete:n||!n&&t||ge.isFunction(e)&&e,duration:e,easing:n&&t||t&&!ge.isFunction(t)&&t};return ge.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in ge.fx.speeds?r.duration=ge.fx.speeds[r.duration]:r.duration=ge.fx.speeds._default),null!=r.queue&&r.queue!==!0||(r.queue="fx"),r.old=r.complete,r.complete=function(){ge.isFunction(r.old)&&r.old.call(this),r.queue&&ge.dequeue(this,r.queue)},r},ge.fn.extend({fadeTo:function(e,t,n,r){return this.filter(_e).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=ge.isEmptyObject(e),o=ge.speed(t,n,r),a=function(){var t=U(this,ge.extend({},e),o);(i||Pe.get(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=ge.timers,a=Pe.get(this);if(i)a[i]&&a[i].stop&&r(a[i]);else for(i in a)a[i]&&a[i].stop&&mt.test(i)&&r(a[i]);
for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));!t&&n||ge.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=Pe.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=ge.timers,a=r?r.length:0;for(n.finish=!0,ge.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;t<a;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),ge.each(["toggle","show","hide"],function(e,t){var n=ge.fn[t];ge.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(B(t,!0),e,r,i)}}),ge.each({slideDown:B("show"),slideUp:B("hide"),slideToggle:B("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){ge.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),ge.timers=[],ge.fx.tick=function(){var e,t=0,n=ge.timers;for(gt=ge.now();t<n.length;t++)e=n[t],e()||n[t]!==e||n.splice(t--,1);n.length||ge.fx.stop(),gt=void 0},ge.fx.timer=function(e){ge.timers.push(e),ge.fx.start()},ge.fx.interval=13,ge.fx.start=function(){vt||(vt=!0,W())},ge.fx.stop=function(){vt=null},ge.fx.speeds={slow:600,fast:200,_default:400},ge.fn.delay=function(t,n){return t=ge.fx?ge.fx.speeds[t]||t:t,n=n||"fx",this.queue(n,function(n,r){var i=e.setTimeout(n,t);r.stop=function(){e.clearTimeout(i)}})},function(){var e=ne.createElement("input"),t=ne.createElement("select"),n=t.appendChild(ne.createElement("option"));e.type="checkbox",de.checkOn=""!==e.value,de.optSelected=n.selected,e=ne.createElement("input"),e.value="t",e.type="radio",de.radioValue="t"===e.value}();var xt,bt=ge.expr.attrHandle;ge.fn.extend({attr:function(e,t){return Fe(this,ge.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){ge.removeAttr(this,e)})}}),ge.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?ge.prop(e,t,n):(1===o&&ge.isXMLDoc(e)||(i=ge.attrHooks[t.toLowerCase()]||(ge.expr.match.bool.test(t)?xt:void 0)),void 0!==n?null===n?void ge.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:(r=ge.find.attr(e,t),null==r?void 0:r))},attrHooks:{type:{set:function(e,t){if(!de.radioValue&&"radio"===t&&i(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(qe);if(i&&1===e.nodeType)for(;n=i[r++];)e.removeAttribute(n)}}),xt={set:function(e,t,n){return t===!1?ge.removeAttr(e,n):e.setAttribute(n,n),n}},ge.each(ge.expr.match.bool.source.match(/\w+/g),function(e,t){var n=bt[t]||ge.find.attr;bt[t]=function(e,t,r){var i,o,a=t.toLowerCase();return r||(o=bt[a],bt[a]=i,i=null!=n(e,t,r)?a:null,bt[a]=o),i}});var wt=/^(?:input|select|textarea|button)$/i,Tt=/^(?:a|area)$/i;ge.fn.extend({prop:function(e,t){return Fe(this,ge.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[ge.propFix[e]||e]})}}),ge.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&ge.isXMLDoc(e)||(t=ge.propFix[t]||t,i=ge.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=ge.find.attr(e,"tabindex");return t?parseInt(t,10):wt.test(e.nodeName)||Tt.test(e.nodeName)&&e.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),de.optSelected||(ge.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),ge.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){ge.propFix[this.toLowerCase()]=this}),ge.fn.extend({addClass:function(e){var t,n,r,i,o,a,s,u=0;if(ge.isFunction(e))return this.each(function(t){ge(this).addClass(e.call(this,t,G(this)))});if("string"==typeof e&&e)for(t=e.match(qe)||[];n=this[u++];)if(i=G(n),r=1===n.nodeType&&" "+V(i)+" "){for(a=0;o=t[a++];)r.indexOf(" "+o+" ")<0&&(r+=o+" ");s=V(r),i!==s&&n.setAttribute("class",s)}return this},removeClass:function(e){var t,n,r,i,o,a,s,u=0;if(ge.isFunction(e))return this.each(function(t){ge(this).removeClass(e.call(this,t,G(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof e&&e)for(t=e.match(qe)||[];n=this[u++];)if(i=G(n),r=1===n.nodeType&&" "+V(i)+" "){for(a=0;o=t[a++];)for(;r.indexOf(" "+o+" ")>-1;)r=r.replace(" "+o+" "," ");s=V(r),i!==s&&n.setAttribute("class",s)}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):ge.isFunction(e)?this.each(function(n){ge(this).toggleClass(e.call(this,n,G(this),t),t)}):this.each(function(){var t,r,i,o;if("string"===n)for(r=0,i=ge(this),o=e.match(qe)||[];t=o[r++];)i.hasClass(t)?i.removeClass(t):i.addClass(t);else void 0!==e&&"boolean"!==n||(t=G(this),t&&Pe.set(this,"__className__",t),this.setAttribute&&this.setAttribute("class",t||e===!1?"":Pe.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;for(t=" "+e+" ";n=this[r++];)if(1===n.nodeType&&(" "+V(G(n))+" ").indexOf(t)>-1)return!0;return!1}});var Ct=/\r/g;ge.fn.extend({val:function(e){var t,n,r,i=this[0];return arguments.length?(r=ge.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,ge(this).val()):e,null==i?i="":"number"==typeof i?i+="":Array.isArray(i)&&(i=ge.map(i,function(e){return null==e?"":e+""})),t=ge.valHooks[this.type]||ge.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))})):i?(t=ge.valHooks[i.type]||ge.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:(n=i.value,"string"==typeof n?n.replace(Ct,""):null==n?"":n)):void 0}}),ge.extend({valHooks:{option:{get:function(e){var t=ge.find.attr(e,"value");return null!=t?t:V(ge.text(e))}},select:{get:function(e){var t,n,r,o=e.options,a=e.selectedIndex,s="select-one"===e.type,u=s?null:[],l=s?a+1:o.length;for(r=a<0?l:s?a:0;r<l;r++)if(n=o[r],(n.selected||r===a)&&!n.disabled&&(!n.parentNode.disabled||!i(n.parentNode,"optgroup"))){if(t=ge(n).val(),s)return t;u.push(t)}return u},set:function(e,t){for(var n,r,i=e.options,o=ge.makeArray(t),a=i.length;a--;)r=i[a],(r.selected=ge.inArray(ge.valHooks.option.get(r),o)>-1)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),ge.each(["radio","checkbox"],function(){ge.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=ge.inArray(ge(e).val(),t)>-1}},de.checkOn||(ge.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var Et=/^(?:focusinfocus|focusoutblur)$/;ge.extend(ge.event,{trigger:function(t,n,r,i){var o,a,s,u,l,c,f,p=[r||ne],d=ce.call(t,"type")?t.type:t,h=ce.call(t,"namespace")?t.namespace.split("."):[];if(a=s=r=r||ne,3!==r.nodeType&&8!==r.nodeType&&!Et.test(d+ge.event.triggered)&&(d.indexOf(".")>-1&&(h=d.split("."),d=h.shift(),h.sort()),l=d.indexOf(":")<0&&"on"+d,t=t[ge.expando]?t:new ge.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=h.join("."),t.rnamespace=t.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=r),n=null==n?[t]:ge.makeArray(n,[t]),f=ge.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){if(!i&&!f.noBubble&&!ge.isWindow(r)){for(u=f.delegateType||d,Et.test(u+d)||(a=a.parentNode);a;a=a.parentNode)p.push(a),s=a;s===(r.ownerDocument||ne)&&p.push(s.defaultView||s.parentWindow||e)}for(o=0;(a=p[o++])&&!t.isPropagationStopped();)t.type=o>1?u:f.bindType||d,c=(Pe.get(a,"events")||{})[t.type]&&Pe.get(a,"handle"),c&&c.apply(a,n),c=l&&a[l],c&&c.apply&&Oe(a)&&(t.result=c.apply(a,n),t.result===!1&&t.preventDefault());return t.type=d,i||t.isDefaultPrevented()||f._default&&f._default.apply(p.pop(),n)!==!1||!Oe(r)||l&&ge.isFunction(r[d])&&!ge.isWindow(r)&&(s=r[l],s&&(r[l]=null),ge.event.triggered=d,r[d](),ge.event.triggered=void 0,s&&(r[l]=s)),t.result}},simulate:function(e,t,n){var r=ge.extend(new ge.Event,n,{type:e,isSimulated:!0});ge.event.trigger(r,null,t)}}),ge.fn.extend({trigger:function(e,t){return this.each(function(){ge.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return ge.event.trigger(e,t,n,!0)}}),ge.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,t){ge.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),ge.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),de.focusin="onfocusin"in e,de.focusin||ge.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){ge.event.simulate(t,e.target,ge.event.fix(e))};ge.event.special[t]={setup:function(){var r=this.ownerDocument||this,i=Pe.access(r,t);i||r.addEventListener(e,n,!0),Pe.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=Pe.access(r,t)-1;i?Pe.access(r,t,i):(r.removeEventListener(e,n,!0),Pe.remove(r,t))}}});var kt=e.location,St=ge.now(),Nt=/\?/;ge.parseXML=function(t){var n;if(!t||"string"!=typeof t)return null;try{n=(new e.DOMParser).parseFromString(t,"text/xml")}catch(e){n=void 0}return n&&!n.getElementsByTagName("parsererror").length||ge.error("Invalid XML: "+t),n};var Dt=/\[\]$/,jt=/\r?\n/g,At=/^(?:submit|button|image|reset|file)$/i,qt=/^(?:input|select|textarea|keygen)/i;ge.param=function(e,t){var n,r=[],i=function(e,t){var n=ge.isFunction(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(Array.isArray(e)||e.jquery&&!ge.isPlainObject(e))ge.each(e,function(){i(this.name,this.value)});else for(n in e)Y(n,e[n],t,i);return r.join("&")},ge.fn.extend({serialize:function(){return ge.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=ge.prop(this,"elements");return e?ge.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!ge(this).is(":disabled")&&qt.test(this.nodeName)&&!At.test(e)&&(this.checked||!Ue.test(e))}).map(function(e,t){var n=ge(this).val();return null==n?null:Array.isArray(n)?ge.map(n,function(e){return{name:t.name,value:e.replace(jt,"\r\n")}}):{name:t.name,value:n.replace(jt,"\r\n")}}).get()}});var Lt=/%20/g,Ht=/#.*$/,Ft=/([?&])_=[^&]*/,Ot=/^(.*?):[ \t]*([^\r\n]*)$/gm,Pt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Rt=/^(?:GET|HEAD)$/,Mt=/^\/\//,It={},Wt={},$t="*/".concat("*"),Bt=ne.createElement("a");Bt.href=kt.href,ge.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:kt.href,type:"GET",isLocal:Pt.test(kt.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":$t,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":ge.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?K(K(e,ge.ajaxSettings),t):K(ge.ajaxSettings,e)},ajaxPrefilter:Q(It),ajaxTransport:Q(Wt),ajax:function(t,n){function r(t,n,r,s){var l,p,d,b,w,T=n;c||(c=!0,u&&e.clearTimeout(u),i=void 0,a=s||"",C.readyState=t>0?4:0,l=t>=200&&t<300||304===t,r&&(b=Z(h,C,r)),b=ee(h,b,C,l),l?(h.ifModified&&(w=C.getResponseHeader("Last-Modified"),w&&(ge.lastModified[o]=w),w=C.getResponseHeader("etag"),w&&(ge.etag[o]=w)),204===t||"HEAD"===h.type?T="nocontent":304===t?T="notmodified":(T=b.state,p=b.data,d=b.error,l=!d)):(d=T,!t&&T||(T="error",t<0&&(t=0))),C.status=t,C.statusText=(n||T)+"",l?y.resolveWith(g,[p,T,C]):y.rejectWith(g,[C,T,d]),C.statusCode(x),x=void 0,f&&v.trigger(l?"ajaxSuccess":"ajaxError",[C,h,l?p:d]),m.fireWith(g,[C,T]),f&&(v.trigger("ajaxComplete",[C,h]),--ge.active||ge.event.trigger("ajaxStop")))}"object"==typeof t&&(n=t,t=void 0),n=n||{};var i,o,a,s,u,l,c,f,p,d,h=ge.ajaxSetup({},n),g=h.context||h,v=h.context&&(g.nodeType||g.jquery)?ge(g):ge.event,y=ge.Deferred(),m=ge.Callbacks("once memory"),x=h.statusCode||{},b={},w={},T="canceled",C={readyState:0,getResponseHeader:function(e){var t;if(c){if(!s)for(s={};t=Ot.exec(a);)s[t[1].toLowerCase()]=t[2];t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return c?a:null},setRequestHeader:function(e,t){return null==c&&(e=w[e.toLowerCase()]=w[e.toLowerCase()]||e,b[e]=t),this},overrideMimeType:function(e){return null==c&&(h.mimeType=e),this},statusCode:function(e){var t;if(e)if(c)C.always(e[C.status]);else for(t in e)x[t]=[x[t],e[t]];return this},abort:function(e){var t=e||T;return i&&i.abort(t),r(0,t),this}};if(y.promise(C),h.url=((t||h.url||kt.href)+"").replace(Mt,kt.protocol+"//"),h.type=n.method||n.type||h.method||h.type,h.dataTypes=(h.dataType||"*").toLowerCase().match(qe)||[""],null==h.crossDomain){l=ne.createElement("a");try{l.href=h.url,l.href=l.href,h.crossDomain=Bt.protocol+"//"+Bt.host!=l.protocol+"//"+l.host}catch(e){h.crossDomain=!0}}if(h.data&&h.processData&&"string"!=typeof h.data&&(h.data=ge.param(h.data,h.traditional)),J(It,h,n,C),c)return C;f=ge.event&&h.global,f&&0===ge.active++&&ge.event.trigger("ajaxStart"),h.type=h.type.toUpperCase(),h.hasContent=!Rt.test(h.type),o=h.url.replace(Ht,""),h.hasContent?h.data&&h.processData&&0===(h.contentType||"").indexOf("application/x-www-form-urlencoded")&&(h.data=h.data.replace(Lt,"+")):(d=h.url.slice(o.length),h.data&&(o+=(Nt.test(o)?"&":"?")+h.data,delete h.data),h.cache===!1&&(o=o.replace(Ft,"$1"),d=(Nt.test(o)?"&":"?")+"_="+St++ +d),h.url=o+d),h.ifModified&&(ge.lastModified[o]&&C.setRequestHeader("If-Modified-Since",ge.lastModified[o]),ge.etag[o]&&C.setRequestHeader("If-None-Match",ge.etag[o])),(h.data&&h.hasContent&&h.contentType!==!1||n.contentType)&&C.setRequestHeader("Content-Type",h.contentType),C.setRequestHeader("Accept",h.dataTypes[0]&&h.accepts[h.dataTypes[0]]?h.accepts[h.dataTypes[0]]+("*"!==h.dataTypes[0]?", "+$t+"; q=0.01":""):h.accepts["*"]);for(p in h.headers)C.setRequestHeader(p,h.headers[p]);if(h.beforeSend&&(h.beforeSend.call(g,C,h)===!1||c))return C.abort();if(T="abort",m.add(h.complete),C.done(h.success),C.fail(h.error),i=J(Wt,h,n,C)){if(C.readyState=1,f&&v.trigger("ajaxSend",[C,h]),c)return C;h.async&&h.timeout>0&&(u=e.setTimeout(function(){C.abort("timeout")},h.timeout));try{c=!1,i.send(b,r)}catch(e){if(c)throw e;r(-1,e)}}else r(-1,"No Transport");return C},getJSON:function(e,t,n){return ge.get(e,t,n,"json")},getScript:function(e,t){return ge.get(e,void 0,t,"script")}}),ge.each(["get","post"],function(e,t){ge[t]=function(e,n,r,i){return ge.isFunction(n)&&(i=i||r,r=n,n=void 0),ge.ajax(ge.extend({url:e,type:t,dataType:i,data:n,success:r},ge.isPlainObject(e)&&e))}}),ge._evalUrl=function(e){return ge.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,throws:!0})},ge.fn.extend({wrapAll:function(e){var t;return this[0]&&(ge.isFunction(e)&&(e=e.call(this[0])),t=ge(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(e){return ge.isFunction(e)?this.each(function(t){ge(this).wrapInner(e.call(this,t))}):this.each(function(){var t=ge(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=ge.isFunction(e);return this.each(function(n){ge(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(e){return this.parent(e).not("body").each(function(){ge(this).replaceWith(this.childNodes)}),this}}),ge.expr.pseudos.hidden=function(e){return!ge.expr.pseudos.visible(e)},ge.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},ge.ajaxSettings.xhr=function(){try{return new e.XMLHttpRequest}catch(e){}};var _t={0:200,1223:204},zt=ge.ajaxSettings.xhr();de.cors=!!zt&&"withCredentials"in zt,de.ajax=zt=!!zt,ge.ajaxTransport(function(t){var n,r;if(de.cors||zt&&!t.crossDomain)return{send:function(i,o){var a,s=t.xhr();if(s.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(a in t.xhrFields)s[a]=t.xhrFields[a];t.mimeType&&s.overrideMimeType&&s.overrideMimeType(t.mimeType),t.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");for(a in i)s.setRequestHeader(a,i[a]);n=function(e){return function(){n&&(n=r=s.onload=s.onerror=s.onabort=s.onreadystatechange=null,"abort"===e?s.abort():"error"===e?"number"!=typeof s.status?o(0,"error"):o(s.status,s.statusText):o(_t[s.status]||s.status,s.statusText,"text"!==(s.responseType||"text")||"string"!=typeof s.responseText?{binary:s.response}:{text:s.responseText},s.getAllResponseHeaders()))}},s.onload=n(),r=s.onerror=n("error"),void 0!==s.onabort?s.onabort=r:s.onreadystatechange=function(){4===s.readyState&&e.setTimeout(function(){n&&r()})},n=n("abort");try{s.send(t.hasContent&&t.data||null)}catch(e){if(n)throw e}},abort:function(){n&&n()}}}),ge.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),ge.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return ge.globalEval(e),e}}}),ge.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),ge.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=ge("<script>").prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),ne.head.appendChild(t[0])},abort:function(){n&&n()}}}});var Xt=[],Ut=/(=)\?(?=&|$)|\?\?/;ge.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Xt.pop()||ge.expando+"_"+St++;return this[e]=!0,e}}),ge.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,a,s=t.jsonp!==!1&&(Ut.test(t.url)?"url":"string"==typeof t.data&&0===(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&Ut.test(t.data)&&"data");if(s||"jsonp"===t.dataTypes[0])return i=t.jsonpCallback=ge.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,s?t[s]=t[s].replace(Ut,"$1"+i):t.jsonp!==!1&&(t.url+=(Nt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return a||ge.error(i+" was not called"),a[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){a=arguments},r.always(function(){void 0===o?ge(e).removeProp(i):e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,Xt.push(i)),a&&ge.isFunction(o)&&o(a[0]),a=o=void 0}),"script"}),de.createHTMLDocument=function(){var e=ne.implementation.createHTMLDocument("").body;return e.innerHTML="<form></form><form></form>",2===e.childNodes.length}(),ge.parseHTML=function(e,t,n){if("string"!=typeof e)return[];"boolean"==typeof t&&(n=t,t=!1);var r,i,o;return t||(de.createHTMLDocument?(t=ne.implementation.createHTMLDocument(""),r=t.createElement("base"),r.href=ne.location.href,t.head.appendChild(r)):t=ne),i=Ee.exec(e),o=!n&&[],i?[t.createElement(i[1])]:(i=b([e],t,o),o&&o.length&&ge(o).remove(),ge.merge([],i.childNodes))},ge.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return s>-1&&(r=V(e.slice(s)),e=e.slice(0,s)),ge.isFunction(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),a.length>0&&ge.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?ge("<div>").append(ge.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},ge.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){ge.fn[t]=function(e){return this.on(t,e)}}),ge.expr.pseudos.animated=function(e){return ge.grep(ge.timers,function(t){return e===t.elem}).length},ge.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l,c=ge.css(e,"position"),f=ge(e),p={};"static"===c&&(e.style.position="relative"),s=f.offset(),o=ge.css(e,"top"),u=ge.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,l?(r=f.position(),a=r.top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),ge.isFunction(t)&&(t=t.call(e,n,ge.extend({},s))),null!=t.top&&(p.top=t.top-s.top+a),null!=t.left&&(p.left=t.left-s.left+i),"using"in t?t.using.call(e,p):f.css(p)}},ge.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){ge.offset.setOffset(this,e,t)});var t,n,r,i,o=this[0];return o?o.getClientRects().length?(r=o.getBoundingClientRect(),t=o.ownerDocument,n=t.documentElement,i=t.defaultView,{top:r.top+i.pageYOffset-n.clientTop,left:r.left+i.pageXOffset-n.clientLeft}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===ge.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),i(e[0],"html")||(r=e.offset()),r={top:r.top+ge.css(e[0],"borderTopWidth",!0),left:r.left+ge.css(e[0],"borderLeftWidth",!0)}),{top:t.top-r.top-ge.css(n,"marginTop",!0),left:t.left-r.left-ge.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent;e&&"static"===ge.css(e,"position");)e=e.offsetParent;return e||Je})}}),ge.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){var n="pageYOffset"===t;ge.fn[e]=function(r){return Fe(this,function(e,r,i){var o;return ge.isWindow(e)?o=e:9===e.nodeType&&(o=e.defaultView),void 0===i?o?o[t]:e[r]:void(o?o.scrollTo(n?o.pageXOffset:i,n?i:o.pageYOffset):e[r]=i)},e,r,arguments.length)}}),ge.each(["top","left"],function(e,t){ge.cssHooks[t]=H(de.pixelPosition,function(e,n){if(n)return n=L(e,t),st.test(n)?ge(e).position()[t]+"px":n})}),ge.each({Height:"height",Width:"width"},function(e,t){ge.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){ge.fn[r]=function(i,o){var a=arguments.length&&(n||"boolean"!=typeof i),s=n||(i===!0||o===!0?"margin":"border");return Fe(this,function(t,n,i){var o;return ge.isWindow(t)?0===r.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(o=t.documentElement,Math.max(t.body["scroll"+e],o["scroll"+e],t.body["offset"+e],o["offset"+e],o["client"+e])):void 0===i?ge.css(t,n,s):ge.style(t,n,i,s)},t,a?i:void 0,a)}})}),ge.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),ge.holdReady=function(e){e?ge.readyWait++:ge.ready(!0)},ge.isArray=Array.isArray,ge.parseJSON=JSON.parse,ge.nodeName=i,"function"==typeof define&&define.amd&&define("jquery",[],function(){return ge});var Vt=e.jQuery,Gt=e.$;return ge.noConflict=function(t){return e.$===ge&&(e.$=Gt),t&&e.jQuery===ge&&(e.jQuery=Vt),ge},t||(e.jQuery=e.$=ge),ge});


/* ---- /1CWkZv7fQAKxTVjZVrLZ8VHcrN6YGGcdky/js/jquery.textcomplete.min.js ---- */


/*! jquery-textcomplete - v1.8.0 - 2016-11-15 */
!function(a){if("function"==typeof define&&define.amd)define(["jquery"],a);else if("object"==typeof module&&module.exports){var b=require("jquery");module.exports=a(b)}else a(jQuery)}(function(a){if("undefined"==typeof a)throw new Error("jQuery.textcomplete requires jQuery");return+function(a){"use strict";var b=function(a){console.warn&&console.warn(a)},c=1;a.fn.textcomplete=function(d,e){var f=Array.prototype.slice.call(arguments);return this.each(function(){var g=this,h=a(this),i=h.data("textComplete");if(i||(e||(e={}),e._oid=c++,i=new a.fn.textcomplete.Completer(this,e),h.data("textComplete",i)),"string"==typeof d){if(!i)return;f.shift(),i[d].apply(i,f),"destroy"===d&&h.removeData("textComplete")}else a.each(d,function(c){a.each(["header","footer","placement","maxCount"],function(a){c[a]&&(i.option[a]=c[a],b(a+"as a strategy param is deprecated. Use option."),delete c[a])})}),i.register(a.fn.textcomplete.Strategy.parse(d,{el:g,$el:h}))})}}(a),+function(a){"use strict";function b(c,d){if(this.$el=a(c),this.id="textcomplete"+e++,this.strategies=[],this.views=[],this.option=a.extend({},b.defaults,d),!(this.$el.is("input[type=text]")||this.$el.is("input[type=search]")||this.$el.is("textarea")||c.isContentEditable||"true"==c.contentEditable))throw new Error("textcomplete must be called on a Textarea or a ContentEditable.");if(c===c.ownerDocument.activeElement)this.initialize();else{var f=this;this.$el.one("focus."+this.id,function(){f.initialize()}),this.option.adapter&&"CKEditor"!=this.option.adapter||"undefined"==typeof CKEDITOR||!this.$el.is("textarea")||CKEDITOR.on("instanceReady",function(b){b.editor.once("focus",function(c){f.$el=a(b.editor.editable().$),f.option.adapter||(f.option.adapter=a.fn.textcomplete.CKEditor,f.option.ckeditor_instance=b.editor),f.initialize()})})}}var c=function(a){var b,c;return function(){var d=Array.prototype.slice.call(arguments);if(b)return void(c=d);b=!0;var e=this;d.unshift(function f(){if(c){var d=c;c=void 0,d.unshift(f),a.apply(e,d)}else b=!1}),a.apply(this,d)}},d=function(a){return"[object String]"===Object.prototype.toString.call(a)},e=0;b.defaults={appendTo:"body",className:"",dropdownClassName:"dropdown-menu textcomplete-dropdown",maxCount:10,zIndex:"100",rightEdgeOffset:30},a.extend(b.prototype,{id:null,option:null,strategies:null,adapter:null,dropdown:null,$el:null,$iframe:null,initialize:function(){var b=this.$el.get(0);if(this.$el.prop("ownerDocument")!==document&&window.frames.length)for(var c=0;c<window.frames.length;c++)if(this.$el.prop("ownerDocument")===window.frames[c].document){this.$iframe=a(window.frames[c].frameElement);break}this.dropdown=new a.fn.textcomplete.Dropdown(b,this,this.option);var d,e;this.option.adapter?d=this.option.adapter:(e=this.$el.is("textarea")||this.$el.is("input[type=text]")||this.$el.is("input[type=search]")?"number"==typeof b.selectionEnd?"Textarea":"IETextarea":"ContentEditable",d=a.fn.textcomplete[e]),this.adapter=new d(b,this,this.option)},destroy:function(){this.$el.off("."+this.id),this.adapter&&this.adapter.destroy(),this.dropdown&&this.dropdown.destroy(),this.$el=this.adapter=this.dropdown=null},deactivate:function(){this.dropdown&&this.dropdown.deactivate()},trigger:function(a,b){this.dropdown||this.initialize(),null!=a||(a=this.adapter.getTextFromHeadToCaret());var c=this._extractSearchQuery(a);if(c.length){var d=c[1];if(b&&this._term===d&&""!==d)return;this._term=d,this._search.apply(this,c)}else this._term=null,this.dropdown.deactivate()},fire:function(a){var b=Array.prototype.slice.call(arguments,1);return this.$el.trigger(a,b),this},register:function(a){Array.prototype.push.apply(this.strategies,a)},select:function(a,b,c){this._term=null,this.adapter.select(a,b,c),this.fire("change").fire("textComplete:select",a,b),this.adapter.focus()},_clearAtNext:!0,_term:null,_extractSearchQuery:function(b){for(var c=0;c<this.strategies.length;c++){var e=this.strategies[c],f=e.context(b);if(f||""===f){var g=a.isFunction(e.match)?e.match(b):e.match;d(f)&&(b=f);var h=b.match(g);if(h)return[e,h[e.index],h]}}return[]},_search:c(function(a,b,c,d){var e=this;b.search(c,function(d,f){e.dropdown.shown||e.dropdown.activate(),e._clearAtNext&&(e.dropdown.clear(),e._clearAtNext=!1),e.dropdown.setPosition(e.adapter.getCaretPosition()),e.dropdown.render(e._zip(d,b,c)),f||(a(),e._clearAtNext=!0)},d)}),_zip:function(b,c,d){return a.map(b,function(a){return{value:a,strategy:c,term:d}})}}),a.fn.textcomplete.Completer=b}(a),+function(a){"use strict";function b(c,d,f){this.$el=b.createElement(f),this.completer=d,this.id=d.id+"dropdown",this._data=[],this.$inputEl=a(c),this.option=f,f.listPosition&&(this.setPosition=f.listPosition),f.height&&this.$el.height(f.height);var g=this;a.each(["maxCount","placement","footer","header","noResultsMessage","className"],function(a,b){null!=f[b]&&(g[b]=f[b])}),this._bindEvents(c),e[this.id]=this}var c=a(window),d=function(a,b){var c,d,e=b.strategy.idProperty;for(c=0;c<a.length;c++)if(d=a[c],d.strategy===b.strategy)if(e){if(d.value[e]===b.value[e])return!0}else if(d.value===b.value)return!0;return!1},e={};a(document).on("click",function(b){var c=b.originalEvent&&b.originalEvent.keepTextCompleteDropdown;a.each(e,function(a,b){a!==c&&b.deactivate()})});var f={SKIP_DEFAULT:0,KEY_UP:1,KEY_DOWN:2,KEY_ENTER:3,KEY_PAGEUP:4,KEY_PAGEDOWN:5,KEY_ESCAPE:6};a.extend(b,{createElement:function(b){var c=b.appendTo;c instanceof a||(c=a(c));var d=a("<ul></ul>").addClass(b.dropdownClassName).attr("id","textcomplete-dropdown-"+b._oid).css({display:"none",left:0,position:"absolute",zIndex:b.zIndex}).appendTo(c);return d}}),a.extend(b.prototype,{$el:null,$inputEl:null,completer:null,footer:null,header:null,id:null,maxCount:null,placement:"",shown:!1,data:[],className:"",destroy:function(){this.deactivate(),this.$el.off("."+this.id),this.$inputEl.off("."+this.id),this.clear(),this.$el.remove(),this.$el=this.$inputEl=this.completer=null,delete e[this.id]},render:function(b){var c=this._buildContents(b),d=a.map(b,function(a){return a.value});if(b.length){var e=b[0].strategy;e.id?this.$el.attr("data-strategy",e.id):this.$el.removeAttr("data-strategy"),this._renderHeader(d),this._renderFooter(d),c&&(this._renderContents(c),this._fitToBottom(),this._fitToRight(),this._activateIndexedItem()),this._setScroll()}else this.noResultsMessage?this._renderNoResultsMessage(d):this.shown&&this.deactivate()},setPosition:function(b){var d="absolute";return this.$inputEl.add(this.$inputEl.parents()).each(function(){return"absolute"===a(this).css("position")?!1:"fixed"===a(this).css("position")?(b.top-=c.scrollTop(),b.left-=c.scrollLeft(),d="fixed",!1):void 0}),this.$el.css(this._applyPlacement(b)),this.$el.css({position:d}),this},clear:function(){this.$el.html(""),this.data=[],this._index=0,this._$header=this._$footer=this._$noResultsMessage=null},activate:function(){return this.shown||(this.clear(),this.$el.show(),this.className&&this.$el.addClass(this.className),this.completer.fire("textComplete:show"),this.shown=!0),this},deactivate:function(){return this.shown&&(this.$el.hide(),this.className&&this.$el.removeClass(this.className),this.completer.fire("textComplete:hide"),this.shown=!1),this},isUp:function(a){return 38===a.keyCode||a.ctrlKey&&80===a.keyCode},isDown:function(a){return 40===a.keyCode||a.ctrlKey&&78===a.keyCode},isEnter:function(a){var b=a.ctrlKey||a.altKey||a.metaKey||a.shiftKey;return!b&&(13===a.keyCode||9===a.keyCode||this.option.completeOnSpace===!0&&32===a.keyCode)},isPageup:function(a){return 33===a.keyCode},isPagedown:function(a){return 34===a.keyCode},isEscape:function(a){return 27===a.keyCode},_data:null,_index:null,_$header:null,_$noResultsMessage:null,_$footer:null,_bindEvents:function(){this.$el.on("mousedown."+this.id,".textcomplete-item",a.proxy(this._onClick,this)),this.$el.on("touchstart."+this.id,".textcomplete-item",a.proxy(this._onClick,this)),this.$el.on("mouseover."+this.id,".textcomplete-item",a.proxy(this._onMouseover,this)),this.$inputEl.on("keydown."+this.id,a.proxy(this._onKeydown,this))},_onClick:function(b){var c=a(b.target);b.preventDefault(),b.originalEvent.keepTextCompleteDropdown=this.id,c.hasClass("textcomplete-item")||(c=c.closest(".textcomplete-item"));var d=this.data[parseInt(c.data("index"),10)];this.completer.select(d.value,d.strategy,b);var e=this;setTimeout(function(){e.deactivate(),"touchstart"===b.type&&e.$inputEl.focus()},0)},_onMouseover:function(b){var c=a(b.target);b.preventDefault(),c.hasClass("textcomplete-item")||(c=c.closest(".textcomplete-item")),this._index=parseInt(c.data("index"),10),this._activateIndexedItem()},_onKeydown:function(b){if(this.shown){var c;switch(a.isFunction(this.option.onKeydown)&&(c=this.option.onKeydown(b,f)),null==c&&(c=this._defaultKeydown(b)),c){case f.KEY_UP:b.preventDefault(),this._up();break;case f.KEY_DOWN:b.preventDefault(),this._down();break;case f.KEY_ENTER:b.preventDefault(),this._enter(b);break;case f.KEY_PAGEUP:b.preventDefault(),this._pageup();break;case f.KEY_PAGEDOWN:b.preventDefault(),this._pagedown();break;case f.KEY_ESCAPE:b.preventDefault(),this.deactivate()}}},_defaultKeydown:function(a){return this.isUp(a)?f.KEY_UP:this.isDown(a)?f.KEY_DOWN:this.isEnter(a)?f.KEY_ENTER:this.isPageup(a)?f.KEY_PAGEUP:this.isPagedown(a)?f.KEY_PAGEDOWN:this.isEscape(a)?f.KEY_ESCAPE:void 0},_up:function(){0===this._index?this._index=this.data.length-1:this._index-=1,this._activateIndexedItem(),this._setScroll()},_down:function(){this._index===this.data.length-1?this._index=0:this._index+=1,this._activateIndexedItem(),this._setScroll()},_enter:function(a){var b=this.data[parseInt(this._getActiveElement().data("index"),10)];this.completer.select(b.value,b.strategy,a),this.deactivate()},_pageup:function(){var b=0,c=this._getActiveElement().position().top-this.$el.innerHeight();this.$el.children().each(function(d){return a(this).position().top+a(this).outerHeight()>c?(b=d,!1):void 0}),this._index=b,this._activateIndexedItem(),this._setScroll()},_pagedown:function(){var b=this.data.length-1,c=this._getActiveElement().position().top+this.$el.innerHeight();this.$el.children().each(function(d){return a(this).position().top>c?(b=d,!1):void 0}),this._index=b,this._activateIndexedItem(),this._setScroll()},_activateIndexedItem:function(){this.$el.find(".textcomplete-item.active").removeClass("active"),this._getActiveElement().addClass("active")},_getActiveElement:function(){return this.$el.children(".textcomplete-item:nth("+this._index+")")},_setScroll:function(){var a=this._getActiveElement(),b=a.position().top,c=a.outerHeight(),d=this.$el.innerHeight(),e=this.$el.scrollTop();0===this._index||this._index==this.data.length-1||0>b?this.$el.scrollTop(b+e):b+c>d&&this.$el.scrollTop(b+c+e-d)},_buildContents:function(a){var b,c,e,f="";for(c=0;c<a.length&&this.data.length!==this.maxCount;c++)b=a[c],d(this.data,b)||(e=this.data.length,this.data.push(b),f+='<li class="textcomplete-item" data-index="'+e+'"><a>',f+=b.strategy.template(b.value,b.term),f+="</a></li>");return f},_renderHeader:function(b){if(this.header){this._$header||(this._$header=a('<li class="textcomplete-header"></li>').prependTo(this.$el));var c=a.isFunction(this.header)?this.header(b):this.header;this._$header.html(c)}},_renderFooter:function(b){if(this.footer){this._$footer||(this._$footer=a('<li class="textcomplete-footer"></li>').appendTo(this.$el));var c=a.isFunction(this.footer)?this.footer(b):this.footer;this._$footer.html(c)}},_renderNoResultsMessage:function(b){if(this.noResultsMessage){this._$noResultsMessage||(this._$noResultsMessage=a('<li class="textcomplete-no-results-message"></li>').appendTo(this.$el));var c=a.isFunction(this.noResultsMessage)?this.noResultsMessage(b):this.noResultsMessage;this._$noResultsMessage.html(c)}},_renderContents:function(a){this._$footer?this._$footer.before(a):this.$el.append(a)},_fitToBottom:function(){var a=c.scrollTop()+c.height(),b=this.$el.height();this.$el.position().top+b>a&&(this.completer.$iframe||this.$el.offset({top:a-b}))},_fitToRight:function(){for(var a,b=this.option.rightEdgeOffset,d=this.$el.offset().left,e=this.$el.width(),f=c.width()-b;d+e>f&&(this.$el.offset({left:d-b}),a=this.$el.offset().left,!(a>=d));)d=a},_applyPlacement:function(a){return-1!==this.placement.indexOf("top")?a={top:"auto",bottom:this.$el.parent().height()-a.top+a.lineHeight,left:a.left}:(a.bottom="auto",delete a.lineHeight),-1!==this.placement.indexOf("absleft")?a.left=0:-1!==this.placement.indexOf("absright")&&(a.right=0,a.left="auto"),a}}),a.fn.textcomplete.Dropdown=b,a.extend(a.fn.textcomplete,f)}(a),+function(a){"use strict";function b(b){a.extend(this,b),this.cache&&(this.search=c(this.search))}var c=function(a){var b={};return function(c,d){b[c]?d(b[c]):a.call(this,c,function(a){b[c]=(b[c]||[]).concat(a),d.apply(null,arguments)})}};b.parse=function(c,d){return a.map(c,function(a){var c=new b(a);return c.el=d.el,c.$el=d.$el,c})},a.extend(b.prototype,{match:null,replace:null,search:null,id:null,cache:!1,context:function(){return!0},index:2,template:function(a){return a},idProperty:null}),a.fn.textcomplete.Strategy=b}(a),+function(a){"use strict";function b(){}var c=Date.now||function(){return(new Date).getTime()},d=function(a,b){var d,e,f,g,h,i=function(){var j=c()-g;b>j?d=setTimeout(i,b-j):(d=null,h=a.apply(f,e),f=e=null)};return function(){return f=this,e=arguments,g=c(),d||(d=setTimeout(i,b)),h}};a.extend(b.prototype,{id:null,completer:null,el:null,$el:null,option:null,initialize:function(b,c,e){this.el=b,this.$el=a(b),this.id=c.id+this.constructor.name,this.completer=c,this.option=e,this.option.debounce&&(this._onKeyup=d(this._onKeyup,this.option.debounce)),this._bindEvents()},destroy:function(){this.$el.off("."+this.id),this.$el=this.el=this.completer=null},select:function(){throw new Error("Not implemented")},getCaretPosition:function(){var b=this._getCaretRelativePosition(),c=this.$el.offset(),d=this.option.appendTo;if(d){d instanceof a||(d=a(d));var e=d.offsetParent().offset();c.top-=e.top,c.left-=e.left}return b.top+=c.top,b.left+=c.left,b},focus:function(){this.$el.focus()},_bindEvents:function(){this.$el.on("keyup."+this.id,a.proxy(this._onKeyup,this))},_onKeyup:function(a){this._skipSearch(a)||this.completer.trigger(this.getTextFromHeadToCaret(),!0)},_skipSearch:function(a){switch(a.keyCode){case 9:case 13:case 16:case 17:case 18:case 33:case 34:case 40:case 38:case 27:return!0}if(a.ctrlKey)switch(a.keyCode){case 78:case 80:return!0}}}),a.fn.textcomplete.Adapter=b}(a),+function(a){"use strict";function b(a,b,c){this.initialize(a,b,c)}a.extend(b.prototype,a.fn.textcomplete.Adapter.prototype,{select:function(b,c,d){var e,f=this.getTextFromHeadToCaret(),g=this.el.value.substring(this.el.selectionEnd),h=c.replace(b,d);"undefined"!=typeof h&&(a.isArray(h)&&(g=h[1]+g,h=h[0]),e=a.isFunction(c.match)?c.match(f):c.match,f=f.replace(e,h),this.$el.val(f+g),this.el.selectionStart=this.el.selectionEnd=f.length)},getTextFromHeadToCaret:function(){return this.el.value.substring(0,this.el.selectionEnd)},_getCaretRelativePosition:function(){var b=a.fn.textcomplete.getCaretCoordinates(this.el,this.el.selectionStart);return{top:b.top+this._calculateLineHeight()-this.$el.scrollTop(),left:b.left-this.$el.scrollLeft(),lineHeight:this._calculateLineHeight()}},_calculateLineHeight:function(){var a=parseInt(this.$el.css("line-height"),10);if(isNaN(a)){var b=this.el.parentNode,c=document.createElement(this.el.nodeName),d=this.el.style;c.setAttribute("style","margin:0px;padding:0px;font-family:"+d.fontFamily+";font-size:"+d.fontSize),c.innerHTML="test",b.appendChild(c),a=c.clientHeight,b.removeChild(c)}return a}}),a.fn.textcomplete.Textarea=b}(a),+function(a){"use strict";function b(b,d,e){this.initialize(b,d,e),a("<span>"+c+"</span>").css({position:"absolute",top:-9999,left:-9999}).insertBefore(b)}var c="吶";a.extend(b.prototype,a.fn.textcomplete.Textarea.prototype,{select:function(b,c,d){var e,f=this.getTextFromHeadToCaret(),g=this.el.value.substring(f.length),h=c.replace(b,d);if("undefined"!=typeof h){a.isArray(h)&&(g=h[1]+g,h=h[0]),e=a.isFunction(c.match)?c.match(f):c.match,f=f.replace(e,h),this.$el.val(f+g),this.el.focus();var i=this.el.createTextRange();i.collapse(!0),i.moveEnd("character",f.length),i.moveStart("character",f.length),i.select()}},getTextFromHeadToCaret:function(){this.el.focus();var a=document.selection.createRange();a.moveStart("character",-this.el.value.length);var b=a.text.split(c);return 1===b.length?b[0]:b[1]}}),a.fn.textcomplete.IETextarea=b}(a),+function(a){"use strict";function b(a,b,c){this.initialize(a,b,c)}a.extend(b.prototype,a.fn.textcomplete.Adapter.prototype,{select:function(b,c,d){var e=this.getTextFromHeadToCaret(),f=this.el.ownerDocument.getSelection(),g=f.getRangeAt(0),h=g.cloneRange();h.selectNodeContents(g.startContainer);var i,j=h.toString(),k=j.substring(g.startOffset),l=c.replace(b,d);if("undefined"!=typeof l){a.isArray(l)&&(k=l[1]+k,l=l[0]),i=a.isFunction(c.match)?c.match(e):c.match,e=e.replace(i,l).replace(/ $/,"&nbsp"),g.selectNodeContents(g.startContainer),g.deleteContents();var m=this.el.ownerDocument.createElement("div");m.innerHTML=e;var n=this.el.ownerDocument.createElement("div");n.innerHTML=k;for(var o,p,q=this.el.ownerDocument.createDocumentFragment();o=m.firstChild;)p=q.appendChild(o);for(;o=n.firstChild;)q.appendChild(o);g.insertNode(q),g.setStartAfter(p),g.collapse(!0),f.removeAllRanges(),f.addRange(g)}},_getCaretRelativePosition:function(){var b=this.el.ownerDocument.getSelection().getRangeAt(0).cloneRange(),c=this.el.ownerDocument.createElement("span");b.insertNode(c),b.selectNodeContents(c),b.deleteContents();var d=a(c),e=d.offset();if(e.left-=this.$el.offset().left,e.top+=d.height()-this.$el.offset().top,e.lineHeight=d.height(),this.completer.$iframe){var f=this.completer.$iframe.offset();e.top+=f.top,e.left+=f.left,e.top-=this.$el.scrollTop()}return d.remove(),e},getTextFromHeadToCaret:function(){var a=this.el.ownerDocument.getSelection().getRangeAt(0),b=a.cloneRange();return b.selectNodeContents(a.startContainer),b.toString().substring(0,a.startOffset)}}),a.fn.textcomplete.ContentEditable=b}(a),+function(a){"use strict";function b(a,b,c){this.initialize(a,b,c)}a.extend(b.prototype,a.fn.textcomplete.ContentEditable.prototype,{_bindEvents:function(){var b=this;this.option.ckeditor_instance.on("key",function(a){var c=a.data;return b._onKeyup(c),b.completer.dropdown.shown&&b._skipSearch(c)?!1:void 0},null,null,1),this.$el.on("keyup."+this.id,a.proxy(this._onKeyup,this))}}),a.fn.textcomplete.CKEditor=b}(a),function(a){function b(a,b,f){if(!d)throw new Error("textarea-caret-position#getCaretCoordinates should only be called in a browser");var g=f&&f.debug||!1;if(g){var h=document.querySelector("#input-textarea-caret-position-mirror-div");h&&h.parentNode.removeChild(h)}var i=document.createElement("div");i.id="input-textarea-caret-position-mirror-div",document.body.appendChild(i);var j=i.style,k=window.getComputedStyle?getComputedStyle(a):a.currentStyle;j.whiteSpace="pre-wrap","INPUT"!==a.nodeName&&(j.wordWrap="break-word"),j.position="absolute",g||(j.visibility="hidden"),c.forEach(function(a){j[a]=k[a]}),e?a.scrollHeight>parseInt(k.height)&&(j.overflowY="scroll"):j.overflow="hidden",i.textContent=a.value.substring(0,b),"INPUT"===a.nodeName&&(i.textContent=i.textContent.replace(/\s/g," "));var l=document.createElement("span");l.textContent=a.value.substring(b)||".",i.appendChild(l);var m={top:l.offsetTop+parseInt(k.borderTopWidth),left:l.offsetLeft+parseInt(k.borderLeftWidth)};return g?l.style.backgroundColor="#aaa":document.body.removeChild(i),m}var c=["direction","boxSizing","width","height","overflowX","overflowY","borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth","borderStyle","paddingTop","paddingRight","paddingBottom","paddingLeft","fontStyle","fontVariant","fontWeight","fontStretch","fontSize","fontSizeAdjust","lineHeight","fontFamily","textAlign","textTransform","textIndent","textDecoration","letterSpacing","wordSpacing","tabSize","MozTabSize"],d="undefined"!=typeof window,e=d&&null!=window.mozInnerScreenX;a.fn.textcomplete.getCaretCoordinates=b}(a),a});
//# sourceMappingURL=dist/jquery.textcomplete.min.map


/* ---- /1CWkZv7fQAKxTVjZVrLZ8VHcrN6YGGcdky/js/marked.min.js ---- */


/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */
(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&(cap[1]==="pre"||cap[1]==="script"||cap[1]==="style"),text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0||prot.indexOf("vbscript:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};Renderer.prototype.text=function(text){return text};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&([#\w]+);/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());


/* ---- /1CWkZv7fQAKxTVjZVrLZ8VHcrN6YGGcdky/js/moment.js ---- */


//! moment.js
//! version : 2.18.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEmpty(obj) {
    var k;
    for (k in obj) {
        // even if its not own property I'd still call it non-empty
        return false;
    }
    return true;
}

function isUndefined(input) {
    return input === void 0;
}

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

function map(arr, fn) {
    var res = [], i;
    for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
    }
    return res;
}

function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

function extend(a, b) {
    for (var i in b) {
        if (hasOwnProp(b, i)) {
            a[i] = b[i];
        }
    }

    if (hasOwnProp(b, 'toString')) {
        a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }

    return a;
}

function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}

function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty           : false,
        unusedTokens    : [],
        unusedInput     : [],
        overflow        : -2,
        charsLeftOver   : 0,
        nullInput       : false,
        invalidMonth    : null,
        invalidFormat   : false,
        userInvalidated : false,
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}

var some;
if (Array.prototype.some) {
    some = Array.prototype.some;
} else {
    some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

var some$1 = some;

function isValid(m) {
    if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some$1.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(getParsingFlags(m), flags);
    }
    else {
        getParsingFlags(m).userInvalidated = true;
    }

    return m;
}

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = hooks.momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
        to._i = from._i;
    }
    if (!isUndefined(from._f)) {
        to._f = from._f;
    }
    if (!isUndefined(from._l)) {
        to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
        to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
        to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Moment prototype object
function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}

function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

// compare two arrays, return the number of differences
function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
    for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i]) ||
            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}

function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return extend(function () {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                    arg = arguments[i];
                }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

function set (config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = extend({}, res[prop]);
        }
    }
    return res;
}

function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}

var keys;

if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if (hasOwnProp(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}

var keys$1 = keys;

var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

function calendar (key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
}

var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY h:mm A',
    LLLL : 'dddd, MMMM D, YYYY h:mm A'
};

function longDateFormat (key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}

var defaultInvalidDate = 'Invalid date';

function invalidDate () {
    return this._invalidDate;
}

var defaultOrdinal = '%d';
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

function ordinal (number) {
    return this._ordinal.replace('%d', number);
}

var defaultRelativeTime = {
    future : 'in %s',
    past   : '%s ago',
    s  : 'a few seconds',
    ss : '%d seconds',
    m  : 'a minute',
    mm : '%d minutes',
    h  : 'an hour',
    hh : '%d hours',
    d  : 'a day',
    dd : '%d days',
    M  : 'a month',
    MM : '%d months',
    y  : 'a year',
    yy : '%d years'
};

function relativeTime (number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (isFunction(output)) ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
}

function pastFuture (diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
}

var aliases = {};

function addUnitAlias (unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}

var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({unit: u, priority: priorities[u]});
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set$1 (mom, unit, value) {
    if (mom.isValid()) {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
    }
}

// MOMENTS

function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}

function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

var formatFunctions = {};

var formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken (token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object
function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}

var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match3to4      = /\d\d\d\d?/;     //     999 - 9999
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf

var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


var regexes = {};

function addRegexToken (token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
    };
}

function getParseRegexForToken (token, config) {
    if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var tokens = {};

function addParseToken (token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (isNumber(callback)) {
        func = function (input, array) {
            array[callback] = toInt(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}

function addWeekParseToken (token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}

function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}

var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
var WEEK = 7;
var WEEKDAY = 8;

var indexOf;

if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}

var indexOf$1 = indexOf;

function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias('month', 'M');

// PRIORITY

addUnitPriority('month', 8);

// PARSING

addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
});

addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[MONTH] = month;
    } else {
        getParsingFlags(config).invalidMonth = input;
    }
});

// LOCALES

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {
    if (!m) {
        return isArray(this._months) ? this._months :
            this._months['standalone'];
    }
    return isArray(this._months) ? this._months[m.month()] :
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m, format) {
    if (!m) {
        return isArray(this._monthsShort) ? this._monthsShort :
            this._monthsShort['standalone'];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = createUTC([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}

// MOMENTS

function setMonth (mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = toInt(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!isNumber(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, 'Month');
    }
}

function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = matchWord;
function monthsShortRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = matchWord;
function monthsRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}

// FORMATTING

addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

addFormatToken(0, ['YYYY',   4],       0, 'year');
addFormatToken(0, ['YYYYY',  5],       0, 'year');
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

addUnitAlias('year', 'y');

// PRIORITIES

addUnitPriority('year', 1);

// PARSING

addRegexToken('Y',      matchSigned);
addRegexToken('YY',     match1to2, match2);
addRegexToken('YYYY',   match1to4, match4);
addRegexToken('YYYYY',  match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);

addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// HOOKS

hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = makeGetSet('FullYear', true);

function getIsLeapYear () {
    return isLeapYear(this.year());
}

function createDate (y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function createUTCDate (y) {
    var date = new Date(Date.UTC.apply(null, arguments));

    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}

// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear, resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek, resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
});

// HELPERS

// LOCALES

function localeWeek (mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
}

var defaultLocaleWeek = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 1st is the first week of the year.
};

function localeFirstDayOfWeek () {
    return this._week.dow;
}

function localeFirstDayOfYear () {
    return this._week.doy;
}

// MOMENTS

function getSetWeek (input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

function getSetISOWeek (input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}

// FORMATTING

addFormatToken('d', 0, 'do', 'day');

addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken('e', 0, 0, 'weekday');
addFormatToken('E', 0, 0, 'isoWeekday');

// ALIASES

addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd',   function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd',   function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        getParsingFlags(config).invalidWeekday = input;
    }
});

addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m, format) {
    if (!m) {
        return isArray(this._weekdays) ? this._weekdays :
            this._weekdays['standalone'];
    }
    return isArray(this._weekdays) ? this._weekdays[m.day()] :
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = createUTC([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = indexOf$1.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = createUTC([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = matchWord;
function weekdaysRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ?
            this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = matchWord;
function weekdaysShortRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ?
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = matchWord;
function weekdaysMinRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ?
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}

// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('h', ['hh', 2], 0, hFormat);
addFormatToken('k', ['kk', 2], 0, kFormat);

addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});

addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
});

addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

function meridiem (token, lowercase) {
    addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

addUnitAlias('hour', 'h');

// PRIORITY
addUnitPriority('hour', 13);

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

addRegexToken('a',  matchMeridiem);
addRegexToken('A',  matchMeridiem);
addRegexToken('H',  match1to2);
addRegexToken('h',  match1to2);
addRegexToken('k',  match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addRegexToken('kk', match1to2, match2);

addRegexToken('hmm', match3to4);
addRegexToken('hmmss', match5to6);
addRegexToken('Hmm', match3to4);
addRegexToken('Hmmss', match5to6);

addParseToken(['H', 'HH'], HOUR);
addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
});
addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
});
addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
});

// LOCALES

function localeIsPM (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
}

var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}


// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour he wants. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour = makeGetSet('Hours', true);

// months
// week
// weekdays
// meridiem
var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    meridiemParse: defaultLocaleMeridiemParse
};

// internal storage for locale config files
var locales = {};
var localeFamilies = {};
var globalLocale;

function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    var i = 0, j, next, locale, split;

    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                //the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}

function loadLocale(name) {
    var oldLocale = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            require('./locale/' + name);
            // because defineLocale currently also sets the global locale, we
            // want to undo that for lazy loaded locales
            getSetGlobalLocale(oldLocale);
        } catch (e) { }
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale (key, values) {
    var data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
        }
        else {
            data = defineLocale(key, values);
        }

        if (data) {
            // moment.duration._locale = moment._locale = data;
            globalLocale = data;
        }
    }

    return globalLocale._abbr;
}

function defineLocale (name, config) {
    if (config !== null) {
        var parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
            deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                    name: name,
                    config: config
                });
                return null;
            }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);


        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale, parentConfig = baseConfig;
        // MERGE
        if (locales[name] != null) {
            parentConfig = locales[name]._config;
        }
        config = mergeConfigs(parentConfig, config);
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data
function getLocale (key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }

    if (!key) {
        return globalLocale;
    }

    if (!isArray(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }

    return chooseLocale(key);
}

function listLocales() {
    return keys$1(locales);
}

function checkOverflow (m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
        overflow =
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
            -1;

        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
        }

        getParsingFlags(m).overflow = overflow;
    }

    return m;
}

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        getParsingFlags(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var basicRfcRegex = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;

// date and time from ref 2822 format
function configFromRFC2822(config) {
    var string, match, dayFormat,
        dateFormat, timeFormat, tzFormat;
    var timezones = {
        ' GMT': ' +0000',
        ' EDT': ' -0400',
        ' EST': ' -0500',
        ' CDT': ' -0500',
        ' CST': ' -0600',
        ' MDT': ' -0600',
        ' MST': ' -0700',
        ' PDT': ' -0700',
        ' PST': ' -0800'
    };
    var military = 'YXWVUTSRQPONZABCDEFGHIKLM';
    var timezone, timezoneIndex;

    string = config._i
        .replace(/\([^\)]*\)|[\n\t]/g, ' ') // Remove comments and folding whitespace
        .replace(/(\s\s+)/g, ' ') // Replace multiple-spaces with a single space
        .replace(/^\s|\s$/g, ''); // Remove leading and trailing spaces
    match = basicRfcRegex.exec(string);

    if (match) {
        dayFormat = match[1] ? 'ddd' + ((match[1].length === 5) ? ', ' : ' ') : '';
        dateFormat = 'D MMM ' + ((match[2].length > 10) ? 'YYYY ' : 'YY ');
        timeFormat = 'HH:mm' + (match[4] ? ':ss' : '');

        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        if (match[1]) { // day of week given
            var momentDate = new Date(match[2]);
            var momentDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][momentDate.getDay()];

            if (match[1].substr(0,3) !== momentDay) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return;
            }
        }

        switch (match[5].length) {
            case 2: // military
                if (timezoneIndex === 0) {
                    timezone = ' +0000';
                } else {
                    timezoneIndex = military.indexOf(match[5][1].toUpperCase()) - 12;
                    timezone = ((timezoneIndex < 0) ? ' -' : ' +') +
                        (('' + timezoneIndex).replace(/^-?/, '0')).match(/..$/)[0] + '00';
                }
                break;
            case 4: // Zone
                timezone = timezones[match[5]];
                break;
            default: // UT or +/-9999
                timezone = timezones[' GMT'];
        }
        match[5] = timezone;
        config._i = match.splice(1).join('');
        tzFormat = ' ZZ';
        config._f = dayFormat + dateFormat + timeFormat + tzFormat;
        configFromStringAndFormat(config);
        getParsingFlags(config).rfc2822 = true;
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback
function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    hooks.createFromInputFallback(config);
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);

// Pick the first defined of two or three arguments.
function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray (config) {
    var i, date, input = [], currentDate, yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[HOUR] = 24;
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = weekOfYear(createLocal(), dow, doy);

        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

// constant that refers to the ISO standard
hooks.ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
hooks.RFC_2822 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
    }
    if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i, parsedInput, tokens, token, skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                getParsingFlags(config).empty = false;
            }
            else {
                getParsingFlags(config).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

    configFromArray(config);
    checkOverflow(config);
}


function meridiemFixWrap (locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        // this is not supposed to happen
        return hour;
    }
}

// date from string and array of format strings
function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,

        scoreToBeat,
        i,
        currentScore;

    if (config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }

    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);

        if (!isValid(tempConfig)) {
            continue;
        }

        // if there is any input that was not parsed add a penalty for that format
        currentScore += getParsingFlags(tempConfig).charsLeftOver;

        //or tokens
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

        getParsingFlags(tempConfig).score = currentScore;

        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }

    extend(config, bestMoment || tempConfig);
}

function configFromObject(config) {
    if (config._d) {
        return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    configFromArray(config);
}

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!isValid(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks.createFromInputFallback(config);
    }
}

function createLocalOrUTC (input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}

function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}

var prototypeMin = deprecate(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

var prototypeMax = deprecate(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}

// TODO: Use [].sort instead?
function min () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isBefore', args);
}

function max () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isAfter', args);
}

var now = function () {
    return Date.now ? Date.now() : +(new Date());
};

var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(ordering.indexOf(key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid$1() {
    return this._isValid;
}

function createInvalid$1() {
    return createDuration(NaN);
}

function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;

    this._data = {};

    this._locale = getLocale();

    this._bubble();
}

function isDuration (obj) {
    return obj instanceof Duration;
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
    });
}

offset('Z', ':');
offset('ZZ', '');

// PARSING

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);

    return minutes === 0 ?
      0 :
      parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
    } else {
        return createLocal(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

function getSetZone (input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

function setOffsetToUTC (keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

function setOffsetToLocal (keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

function setOffsetToParsedOffset () {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

function isDaylightSavingTimeShifted () {
    if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
            compareArrays(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

// ASP.NET json date format regex
var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

function createDuration (input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
        match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
        duration = {
            ms : input._milliseconds,
            d  : input._days,
            M  : input._months
        };
    } else if (isNumber(input)) {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y  : 0,
            d  : toInt(match[DATE])                         * sign,
            h  : toInt(match[HOUR])                         * sign,
            m  : toInt(match[MINUTE])                       * sign,
            s  : toInt(match[SECOND])                       * sign,
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y : parseIso(match[2], sign),
            M : parseIso(match[3], sign),
            w : parseIso(match[4], sign),
            d : parseIso(match[5], sign),
            h : parseIso(match[6], sign),
            m : parseIso(match[7], sign),
            s : parseIso(match[8], sign)
        };
    } else if (duration == null) {// checks for null or undefined
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
        ret._locale = input._locale;
    }

    return ret;
}

createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;

function parseIso (inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base, other) {
    var res = {milliseconds: 0, months: 0};

    res.months = other.month() - base.month() +
        (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }

    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

    return res;
}

function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return {milliseconds: 0, months: 0};
    }

    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }

    return res;
}

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract (mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (days) {
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }
    if (months) {
        setMonth(mom, get(mom, 'Month') + months * isAdding);
    }
    if (updateOffset) {
        hooks.updateOffset(mom, days || months);
    }
}

var add      = createAdder(1, 'add');
var subtract = createAdder(-1, 'subtract');

function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar$1 (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}

function clone () {
    return new Moment(this);
}

function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween (from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

function isSame (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}

function diff (input, units, asFloat) {
    var that,
        zoneDelta,
        delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    units = normalizeUnits(units);

    if (units === 'year' || units === 'month' || units === 'quarter') {
        output = monthDiff(this, that);
        if (units === 'quarter') {
            output = output / 3;
        } else if (units === 'year') {
            output = output / 12;
        }
    } else {
        delta = this - that;
        output = units === 'second' ? delta / 1e3 : // 1000
            units === 'minute' ? delta / 6e4 : // 1000 * 60
            units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
            units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
            units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
            delta;
    }
    return asFloat ? output : absFloor(output);
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function toString () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString() {
    if (!this.isValid()) {
        return null;
    }
    var m = this.clone().utc();
    if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }
    if (isFunction(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        return this.toDate().toISOString();
    }
    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function inspect () {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function format (inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
}

function from (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}

function to (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow (withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
}

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}

var lang = deprecate(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

function localeData () {
    return this._locale;
}

function startOf (units) {
    units = normalizeUnits(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
}

function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}

function valueOf () {
    return this._d.valueOf() - ((this._offset || 0) * 60000);
}

function unix () {
    return Math.floor(this.valueOf() / 1000);
}

function toDate () {
    return new Date(this.valueOf());
}

function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject () {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON () {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

function isValid$2 () {
    return isValid(this);
}

function parsingFlags () {
    return extend({}, getParsingFlags(this));
}

function invalidAt () {
    return getParsingFlags(this).overflow;
}

function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

// FORMATTING

addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});

addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function addWeekYearFormatToken (token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
}

addWeekYearFormatToken('gggg',     'weekYear');
addWeekYearFormatToken('ggggg',    'weekYear');
addWeekYearFormatToken('GGGG',  'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');

// PRIORITY

addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);


// PARSING

addRegexToken('G',      matchSigned);
addRegexToken('g',      matchSigned);
addRegexToken('GG',     match1to2, match2);
addRegexToken('gg',     match1to2, match2);
addRegexToken('GGGG',   match1to4, match4);
addRegexToken('gggg',   match1to4, match4);
addRegexToken('GGGGG',  match1to6, match6);
addRegexToken('ggggg',  match1to6, match6);

addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
});

addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
}

function getSetISOWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear () {
    return weeksInYear(this.year(), 1, 4);
}

function getWeeksInYear () {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return weekOfYear(this, dow, doy).year;
    } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

// PRIORITY

addUnitPriority('quarter', 7);

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

// PRIOROITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0], 10);
});

// MOMENTS

var getSetDayOfMonth = makeGetSet('Date', true);

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
addUnitPriority('dayOfYear', 4);

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

// PRIORITY

addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

var getSetMinute = makeGetSet('Minutes', false);

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

// PRIORITY

addUnitPriority('second', 15);

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

var getSetSecond = makeGetSet('Seconds', false);

// FORMATTING

addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias('millisecond', 'ms');

// PRIORITY

addUnitPriority('millisecond', 16);

// PARSING

addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);

var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
}

function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
}

for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
}
// MOMENTS

var getSetMillisecond = makeGetSet('Milliseconds', false);

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr () {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

var proto = Moment.prototype;

proto.add               = add;
proto.calendar          = calendar$1;
proto.clone             = clone;
proto.diff              = diff;
proto.endOf             = endOf;
proto.format            = format;
proto.from              = from;
proto.fromNow           = fromNow;
proto.to                = to;
proto.toNow             = toNow;
proto.get               = stringGet;
proto.invalidAt         = invalidAt;
proto.isAfter           = isAfter;
proto.isBefore          = isBefore;
proto.isBetween         = isBetween;
proto.isSame            = isSame;
proto.isSameOrAfter     = isSameOrAfter;
proto.isSameOrBefore    = isSameOrBefore;
proto.isValid           = isValid$2;
proto.lang              = lang;
proto.locale            = locale;
proto.localeData        = localeData;
proto.max               = prototypeMax;
proto.min               = prototypeMin;
proto.parsingFlags      = parsingFlags;
proto.set               = stringSet;
proto.startOf           = startOf;
proto.subtract          = subtract;
proto.toArray           = toArray;
proto.toObject          = toObject;
proto.toDate            = toDate;
proto.toISOString       = toISOString;
proto.inspect           = inspect;
proto.toJSON            = toJSON;
proto.toString          = toString;
proto.unix              = unix;
proto.valueOf           = valueOf;
proto.creationData      = creationData;

// Year
proto.year       = getSetYear;
proto.isLeapYear = getIsLeapYear;

// Week Year
proto.weekYear    = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;

// Quarter
proto.quarter = proto.quarters = getSetQuarter;

// Month
proto.month       = getSetMonth;
proto.daysInMonth = getDaysInMonth;

// Week
proto.week           = proto.weeks        = getSetWeek;
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
proto.weeksInYear    = getWeeksInYear;
proto.isoWeeksInYear = getISOWeeksInYear;

// Day
proto.date       = getSetDayOfMonth;
proto.day        = proto.days             = getSetDayOfWeek;
proto.weekday    = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear  = getSetDayOfYear;

// Hour
proto.hour = proto.hours = getSetHour;

// Minute
proto.minute = proto.minutes = getSetMinute;

// Second
proto.second = proto.seconds = getSetSecond;

// Millisecond
proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset
proto.utcOffset            = getSetOffset;
proto.utc                  = setOffsetToUTC;
proto.local                = setOffsetToLocal;
proto.parseZone            = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;

// Timezone
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

function preParsePostFormat (string) {
    return string;
}

var proto$1 = Locale.prototype;

proto$1.calendar        = calendar;
proto$1.longDateFormat  = longDateFormat;
proto$1.invalidDate     = invalidDate;
proto$1.ordinal         = ordinal;
proto$1.preparse        = preParsePostFormat;
proto$1.postformat      = preParsePostFormat;
proto$1.relativeTime    = relativeTime;
proto$1.pastFuture      = pastFuture;
proto$1.set             = set;

// Month
proto$1.months            =        localeMonths;
proto$1.monthsShort       =        localeMonthsShort;
proto$1.monthsParse       =        localeMonthsParse;
proto$1.monthsRegex       = monthsRegex;
proto$1.monthsShortRegex  = monthsShortRegex;

// Week
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
proto$1.weekdays       =        localeWeekdays;
proto$1.weekdaysMin    =        localeWeekdaysMin;
proto$1.weekdaysShort  =        localeWeekdaysShort;
proto$1.weekdaysParse  =        localeWeekdaysParse;

proto$1.weekdaysRegex       =        weekdaysRegex;
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

// Hours
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;

function get$1 (format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl (format, index, field) {
    if (isNumber(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get$1(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl (localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths (format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort (format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

// Side effect imports
hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

var mathAbs = Math.abs;

function abs () {
    var data           = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days         = mathAbs(this._days);
    this._months       = mathAbs(this._months);

    data.milliseconds  = mathAbs(data.milliseconds);
    data.seconds       = mathAbs(data.seconds);
    data.minutes       = mathAbs(data.minutes);
    data.hours         = mathAbs(data.hours);
    data.months        = mathAbs(data.months);
    data.years         = mathAbs(data.years);

    return this;
}

function addSubtract$1 (duration, input, value, direction) {
    var other = createDuration(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days         += direction * other._days;
    duration._months       += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)
function add$1 (input, value) {
    return addSubtract$1(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
function subtract$1 (input, value) {
    return addSubtract$1(this, input, value, -1);
}

function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds           = absFloor(milliseconds / 1000);
    data.seconds      = seconds % 60;

    minutes           = absFloor(seconds / 60);
    data.minutes      = minutes % 60;

    hours             = absFloor(minutes / 60);
    data.hours        = hours % 24;

    days += absFloor(hours / 24);

    // convert days to months
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

function daysToMonths (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays (months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = normalizeUnits(units);

    if (units === 'month' || units === 'year') {
        days   = this._days   + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        return units === 'month' ? months : months / 12;
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week'   : return days / 7     + milliseconds / 6048e5;
            case 'day'    : return days         + milliseconds / 864e5;
            case 'hour'   : return days * 24    + milliseconds / 36e5;
            case 'minute' : return days * 1440  + milliseconds / 6e4;
            case 'second' : return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
            default: throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
function valueOf$1 () {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs (alias) {
    return function () {
        return this.as(alias);
    };
}

var asMilliseconds = makeAs('ms');
var asSeconds      = makeAs('s');
var asMinutes      = makeAs('m');
var asHours        = makeAs('h');
var asDays         = makeAs('d');
var asWeeks        = makeAs('w');
var asMonths       = makeAs('M');
var asYears        = makeAs('y');

function get$2 (units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds');
var seconds      = makeGetter('seconds');
var minutes      = makeGetter('minutes');
var hours        = makeGetter('hours');
var days         = makeGetter('days');
var months       = makeGetter('months');
var years        = makeGetter('years');

function weeks () {
    return absFloor(this.days() / 7);
}

var round = Math.round;
var thresholds = {
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to month
    M : 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds  = round(duration.as('s'));
    var minutes  = round(duration.as('m'));
    var hours    = round(duration.as('h'));
    var days     = round(duration.as('d'));
    var months   = round(duration.as('M'));
    var years    = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days]    ||
            months  <= 1             && ['M']           ||
            months  < thresholds.M   && ['MM', months]  ||
            years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize (withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

var abs$1 = Math.abs;

function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days         = abs$1(this._days);
    var months       = abs$1(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes           = absFloor(seconds / 60);
    hours             = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years  = absFloor(months / 12);
    months %= 12;


    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds;
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    return (total < 0 ? '-' : '') +
        'P' +
        (Y ? Y + 'Y' : '') +
        (M ? M + 'M' : '') +
        (D ? D + 'D' : '') +
        ((h || m || s) ? 'T' : '') +
        (h ? h + 'H' : '') +
        (m ? m + 'M' : '') +
        (s ? s + 'S' : '');
}

var proto$2 = Duration.prototype;

proto$2.isValid        = isValid$1;
proto$2.abs            = abs;
proto$2.add            = add$1;
proto$2.subtract       = subtract$1;
proto$2.as             = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds      = asSeconds;
proto$2.asMinutes      = asMinutes;
proto$2.asHours        = asHours;
proto$2.asDays         = asDays;
proto$2.asWeeks        = asWeeks;
proto$2.asMonths       = asMonths;
proto$2.asYears        = asYears;
proto$2.valueOf        = valueOf$1;
proto$2._bubble        = bubble;
proto$2.get            = get$2;
proto$2.milliseconds   = milliseconds;
proto$2.seconds        = seconds;
proto$2.minutes        = minutes;
proto$2.hours          = hours;
proto$2.days           = days;
proto$2.weeks          = weeks;
proto$2.months         = months;
proto$2.years          = years;
proto$2.humanize       = humanize;
proto$2.toISOString    = toISOString$1;
proto$2.toString       = toISOString$1;
proto$2.toJSON         = toISOString$1;
proto$2.locale         = locale;
proto$2.localeData     = localeData;

// Deprecations
proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;

// Side effect imports

// FORMATTING

addFormatToken('X', 0, 0, 'unix');
addFormatToken('x', 0, 0, 'valueOf');

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
});

// Side effect imports


hooks.version = '2.18.1';

setHookCallback(createLocal);

hooks.fn                    = proto;
hooks.min                   = min;
hooks.max                   = max;
hooks.now                   = now;
hooks.utc                   = createUTC;
hooks.unix                  = createUnix;
hooks.months                = listMonths;
hooks.isDate                = isDate;
hooks.locale                = getSetGlobalLocale;
hooks.invalid               = createInvalid;
hooks.duration              = createDuration;
hooks.isMoment              = isMoment;
hooks.weekdays              = listWeekdays;
hooks.parseZone             = createInZone;
hooks.localeData            = getLocale;
hooks.isDuration            = isDuration;
hooks.monthsShort           = listMonthsShort;
hooks.weekdaysMin           = listWeekdaysMin;
hooks.defineLocale          = defineLocale;
hooks.updateLocale          = updateLocale;
hooks.locales               = listLocales;
hooks.weekdaysShort         = listWeekdaysShort;
hooks.normalizeUnits        = normalizeUnits;
hooks.relativeTimeRounding = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat        = getCalendarFormat;
hooks.prototype             = proto;

return hooks;

})));



/* ---- /1CWkZv7fQAKxTVjZVrLZ8VHcrN6YGGcdky/js/page.js ---- */


function d2h(d) {
    return d.toString(16)
}

function h2d(h) {
    return parseInt(h, 16)
}

function stringToHex(tmp) {
    var str = '',
        i = 0,
        tmp_len = tmp.length,
        c

    for (; i < tmp_len; i += 1) {
        c = tmp.charCodeAt(i)
        str += d2h(c) + ' '
    }
    return str
}

function hexToString(tmp) {
    var arr = tmp.split(' '),
        str = '',
        i = 0,
        arr_len = arr.length,
        c

    for (; i < arr_len; i += 1) {
        c = String.fromCharCode(h2d(arr[i]))
        str += c
    }

    return str
}



marked.setOptions({
    "gfm": true,
    "breaks": true,
    "sanitize": true,
    "smartLists": true,
    "smartypants": true,
    "highlight": function(code) {

        // console.log("Highlighting >> ", code)
        return hljs.highlightAuto(code).value
    }
})

var markedR = new marked.Renderer()
markedR.table = function(header, body) {
    return '<table class="table table-striped">\n' +
        '<thead>\n' +
        header +
        '</thead>\n' +
        '<tbody>\n' +
        body +
        '</tbody>\n' +
        '</table>\n'
}
markedR.link = function(href, title, text) {
    var href = href || '',
        title = title || '',
        text = text || ''

    if (this.options.sanitize) {
        try {
            var prot = decodeURIComponent(unescape(href))
                .replace(/[^\w:]/g, '')
                .toLowerCase()
        } catch (e) {
            return ''
        }
        if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
            return ''
        }
    }

    return '<a href="' + href + '" onclick="return openNewTab(\'' + href + '\');" ' + (title ? ('title="' + title + '"') : '') + '>' + text + '</a>'
}

function openNewTab(url) {
    page.cmd("wrapperOpenWindow", [url, "_blank", ""])
    return false
}

function imageViewGen(res, href, title, text) {
    var imgHTML = ''
    var isgif = res.inner_path.match('.+\\.(.*)')[1] === "gif"
    if (isgif) {
        imgHTML = '<img data-gifffer="' + href +
            '" data-gifffer-alt="' + text +
            '" class="img-responsive rounded" ' +
            (title ? ('title="' + title + '"') : (text ? ('title="' + text + '"') : '')) +
            (markedR.options.xhtml ? '/>' : '>')
    } else {
        imgHTML = '<img src="' + href +
            '" alt="' + text +
            '" class="img-responsive rounded" ' +
            (title ? ('title="' + title + '"') : (text ? ('title="' + text + '"') : '')) +
            (markedR.options.xhtml ? '/>' : '>')
    }
    return '<div class="popover #popover-bottom">' +
        imgHTML +
        '<div class="popover-container">' +
        '<div class="card"><div class="card-header">' +
        (title ? ('<div class="card-title">' + title + '</div>') :
            (text ? ('<div class="card-title">' + text + '</div>') : '')) +
        (title && text ? ('<div class="card-subtitle">' + text + '</div>') : '') +
        '</div><div class="card-body">Peers: ' +
        res.peer + '<br>Size: ' + res.size +
        '<br>Type: ' + res.inner_path.match('.+\\.(.*)')[1] +
        '</div><div class="card-footer"><button class="btn" onclick="page.imageDeleter(this, \'' +
        href + '\', \'' + escape(title) + '\', \'' + escape(text) +
        '\')">Delete file</button><a class="btn btn-link" href="' +
        href + '" target="_blank">Open in new tab</a></div></div></div>'
}
markedR.image = function(href, title, text) {
    var href = href || '',
        title = title || '',
        text = text || ''

    var uh = Math.random().toString(36).substring(7);
    page.imageDisplayer(uh, href, title, text)
    return '<div id="MEDIAFILEREPLACE_' + uh + '" class="icon icons loading"></div>'
}



class ThunderWave extends ZeroFrame {
    addMessage(msgkey, username, message, date_added, addattop) {
        // var message_escaped = message.replace(/</g, "&lt;").replace(/>/g, "&gt;") // Escape html tags in the message
        var message_escaped = message

        // var addattop = addattop || false

        if (parseInt(page.LS.opts.avatar_size.value) !== 0) {
            this.identicons = this.identicons || {}
            var asv = parseInt(page.LS.opts.avatar_size.value) || 64
            if (!this.identicons.hasOwnProperty(asv)) {
                this.identicons[asv] = {}
            }
            if (!this.identicons.hasOwnProperty(username)) {
                var uhash = stringToHex(username).split(' ').join('')
                this.identicons[asv][username] = new Identicon(uhash, {
                    margin: 0.2,
                    size: asv,
                    format: 'svg'
                }).toString()
            }
            var idata = this.identicons[asv][username]
        }
        var message_pic = (typeof idata !== "undefined" ? "<img src='data:image/svg+xml;base64," + idata + "' />" : "")

        var mmnt = moment(date_added, "x")

        var curdate = mmnt.format("MMMM Do, YYYY")
        var curtime = mmnt.format("HH:mm:ss")

        var curdate2 = moment(curdate, "MMMM Do, YYYY").format("x")
        var rcurdate = moment().format("MMMM Do, YYYY")
        var curdate3 = (curdate === rcurdate ? "Today" : (moment(rcurdate, "MMMM Do, YYYY").subtract(1, "d").format("MMMM Do, YYYY") === curdate ? "Yesterday" : curdate));
        var CDalreadyexists = $("#messages").find('[timestamp-date="' + curdate2 + '"]')[0] || false

        var users_own_message = (username === page.site_info.cert_user_id)
        var user_is_mentioned = (message_escaped.match(new RegExp(page.site_info.cert_user_id + "|@" + page.site_info.cert_user_id.split("@")[0], "gmi"))) ? true : false
        var user_mention_badge = (page.LS.opts.user_mention_badge.value && user_is_mentioned) ? "badge" : ""

        var thismessageis = {
            "same_user": (page.lastmessagewas.hasOwnProperty("username") && page.lastmessagewas.username === username),
            "same_date": (page.lastmessagewas.hasOwnProperty("curdate2") && page.lastmessagewas.curdate2 === curdate2),
            "in_time_range": (page.lastmessagewas.hasOwnProperty("date_added") && moment(page.lastmessagewas.date_added, "x").add(15, "minutes").isSameOrAfter(date_added))
                // ,"after": (page.lastmessagewas.hasOwnProperty("date_added") && mmnt.isAfter(page.lastmessagewas.date_added, "x"))
        }
        var dCDalreadyexists = CDalreadyexists === false ? false : true

        // console.log("\n", message_escaped, page.lastmessagewas, thismessageis, page.lastmessagewas.date_added, date_added, dCDalreadyexists)

        // console.log(curdate, CDalreadyexists)
        if (typeof CDalreadyexists !== "undefined" && CDalreadyexists !== false) {
            CDalreadyexists = $(CDalreadyexists)
        } else {
            CDalreadyexists = $("<li id='d_" + curdate2 + "' timestamp-date='" + curdate2 + "'><div class='divider text-center' data-content='" + (curdate3) + "' onclick='window.location.hash=\"#d_" + curdate2 + "\";'></div><ul class='times-messages unstyled'></ul></li>")
                // if (addattop && !thismessageis.after)
                //     CDalreadyexists = CDalreadyexists.prependTo("#messages")
                // else
            CDalreadyexists = CDalreadyexists.appendTo("#messages")

            var items = $("#messages").children("[timestamp-date]").get()

            // console.log("ITEMS: ", items)
            items.sort(function(a, b) {
                var A = parseInt($(a).attr('id').split("d_")[1])
                var B = parseInt($(b).attr('id').split("d_")[1])

                // console.log("A >> " + a + " :: " + A, "B >> " + b + " :: " + B)
                if (A < B) return -1
                if (A > B) return 1
                return 0
            });
            $("#messages").html("").append(items)

            // console.log("CD", CDalreadyexists[0], addattop && !thismessageis.after)
        }
        var CDalreadyexistsC = CDalreadyexists.children('.times-messages')

        // var isafter2
        //     // var isafter2 = CDalreadyexistsC.children("li.message-container").first()[0] ? mmnt.isAfter(parseInt(CDalreadyexistsC.children("li.message-container").first().attr("id").split("t_")[1])) : false
        // if (CDalreadyexistsC.children("li.message-container").first()[0]) {
        //     isafter2 = CDalreadyexistsC.children("li.message-container").filter(function() {
        //         return $(this).attr("id").split("t_")[1] >= date_added
        //     }).each(function() {

        //     })
        //     console.log(isafter2[0])

        //     console.log(CDalreadyexistsC.children("li.message-container").first()[0],
        //         CDalreadyexistsC.children("li.message-container").first().attr("id").split("t_"),
        //         CDalreadyexistsC.children("li.message-container").first().attr("id").split("t_")[1] +
        //         " :: " + moment(CDalreadyexistsC.children("li.message-container").first().attr("id").split("t_")[1], "x") +
        //         " :: " + moment(CDalreadyexistsC.children("li.message-container").first().attr("id").split("t_")[1], "x").format("MMMM Do, YYYY - HH:mm:ss"))
        // }

        var message_timestamp = ('<a class="message-timestamp ' + (page.LS.opts.show_timestamps.value ? "" : "hide") + '" href="#tc_' + msgkey + '">' + curtime + '</a>')
            // var message_timestamp = ('<span class="message-timestamp ' + (page.LS.opts.show_timestamps.value ? "" : "hide") + '">' + curtime + '</span>')
        var message_parsed = marked(
                message_escaped
                // .replace(/(http(s)?:\/\/([\S]+))/gmi, function(match, p1) {
                //     return (page.LS.opts.parse_links.value ? '<a class="message-link" href="' + encodeURI(p1) + '" target="_blank">' + p1 + '</a>' : '<span class="message-link">' + p1 + '</span>')
                // })
                , {
                    renderer: markedR
                }
            )
            .replace(/((?:(?:[\w]+)@(?:zeroid|zeroverse|kaffie)\.bit)|@(?:[\w]+))/gmi, function(match, p1) { // ((?:[\w]+)@(?:zeroid|zeroverse)\.bit)
                var profile_link_part = (page.LS.opts.parse_profile_links.value ? '<a class="message-profile-link" onclick="add2MSGInput(\'' + p1 + ' \'); return false;" href="?u/' + encodeURI(p1) + '">' + p1 + '</a>' : '<span class="message-profile-link">' + p1 + '</span>')
                var isthisuser = (p1.match(new RegExp(page.site_info.cert_user_id + "|@" + page.site_info.cert_user_id.split("@")[0], "gmi"))) ? true : false
                return (isthisuser ? "<mark>" : "") + profile_link_part + (isthisuser ? "</mark>" : "")
            })
        if (!page.LS.opts.disable_emojis.value)
            message_parsed = emojione.toImage(message_parsed)

        // console.log(CDalreadyexists, CDalreadyexistsC)

        var msg_part_2_1 = '<div id="tc_' + msgkey + '" tc="' + date_added + '" class="card mb-5">' +
            ((users_own_message || (thismessageis.same_user && thismessageis.same_date && thismessageis.in_time_range)) ? "" :
                '<div class="card-header"><small class="tile-title"><a onclick="add2MSGInput(\'' + username + ' \'); return false;" href="?u/' + encodeURI(username) + '">' + username + '</a></small></div>') + '<div class="card-body text-break">' +
            message_parsed + '</div><div class="' + (page.LS.opts.show_timestamps.value ? "" : "card-footer") + '"><small class="tile-subtitle float-right">' + message_timestamp + '</small></div></div>'

        if (((users_own_message && thismessageis.same_user) || thismessageis.same_user) && thismessageis.same_date && thismessageis.in_time_range) {
            var el2 = $(msg_part_2_1).appendTo($(page.lastmessagewas.el).find('.tile-content'))
            var el = page.lastmessagewas.el

            var items = $(page.lastmessagewas.el).find('.tile-content').children('.card').get()

            // console.log("ITEMS: ", items)
            items.sort(function(a, b) {
                var A = parseInt($(a).attr('tc'))
                var B = parseInt($(b).attr('tc'))

                // console.log("A >> " + a + " :: " + A, "B >> " + b + " :: " + B)
                if (A < B) return -1
                if (A > B) return 1
                return 0
            });
            $(page.lastmessagewas.el).find('.tile-content').html("").append(items)

            // console.log("ELa", el2[0])
        } else {
            var msg_part_1 = '<div class="tile-icon"><figure class="avatar avatar-lg message-user-avatar ' + user_mention_badge + '" data-initial="' + username.substr(0, 2) + '">' + message_pic + '</figure></div>',
                msg_part_2 = '<div class="tile-content">' + msg_part_2_1 + '</div>'

            var el = $('<li id="t_' + msgkey + '" t="' + date_added + '" class="message-container ' + (user_is_mentioned ? "user-is-mentioned " : "") + '" message-owner="' + username + '" users-own-message="' + users_own_message + '"><div class="tile">' + (users_own_message ? (msg_part_2 + msg_part_1) : (msg_part_1 + msg_part_2)) + '</div></li>')

            // if (addattop && !thismessageis.after && dCDalreadyexists) // && isafter2)
            //     el = el.prependTo(CDalreadyexistsC)
            //     // el.insertBefore(isafter2)
            // else
            el = el.appendTo(CDalreadyexistsC)

            var items = CDalreadyexistsC.children("li.message-container").get()

            // console.log("ITEMS: ", items)
            items.sort(function(a, b) {
                var A = parseInt($(a).attr('t'))
                var B = parseInt($(b).attr('t'))

                // console.log("A >> " + a + " :: " + A, "B >> " + b + " :: " + B)
                if (A < B) return -1
                if (A > B) return 1
                return 0
            });
            CDalreadyexistsC.html("").append(items)

            // console.log("EL", el[0], addattop, thismessageis.after, dCDalreadyexists)
        }

        page.lastmessagewas = {
            "username": username,
            "curdate2": curdate2,
            "date_added": date_added,
            "el": el
        }
        if (page.firstmessagewas.date_added > date_added)
            page.firstmessagewas.date_added = date_added

        // console.log("LASTMESSAGEWAS: ", page.lastmessagewas)


        /* OLD MESSAGE SYSTEM till 04.04.2017*/
        // var msg_part_2_1 = "<a href='?u/" + username + "'>" + username + "</a>",
        //     msg_part_2_2 = "<span class='message-user-mention-badge hide " + user_mention_badge + "'></span>",
        //     msg_part_2_3 = "<small>" + message_timestamp + "</small>"

        // var msg_part_1 = "<div class='col-1 text-center'><a class='inline-block' href='?u/" + username + "'><figure class='avatar message-user-avatar " + user_mention_badge + "' data-initial='" + username.substr(0, 2) + "'>" + message_pic + "</figure></a></div>",
        //     msg_part_2 = "<div class='col-11 columns col-gapless " + (users_own_message ? "text-right " : "") + "'><h6 class='col-12' style='margin-bottom: .4rem;'>" + (users_own_message ? (msg_part_2_3 + " " + msg_part_2_2 + msg_part_2_1) : (msg_part_2_1 + msg_part_2_2 + " " + msg_part_2_3)) + "</h6><p class='col-12'>" + message_parsed + "</p></div>"

        // var el = $("<li id='t_" + date_added + "' class='columns col-gapless message-container " + (user_is_mentioned ? "user-is-mentioned " : "") + "'>" + (users_own_message ? (msg_part_2 + msg_part_1) : (msg_part_1 + msg_part_2)) + "</li>").prependTo(CDalreadyexistsC)


        /* OLD MESSAGE SYSTEM till 03.04.2017*/
        // $("<li id='t_" + date_added + "' class='columns col-gapless message-container " + (user_is_mentioned ? "user-is-mentioned " : "") + "'><div class='col-1 text-center'><a class='inline-block' href='?u/" + username + "'><figure class='avatar message-user-avatar " + user_mention_badge + "' data-initial='" + username.substr(0, 2) + "'>" + message_pic + "</figure></a></div> <div class='col-11 columns col-gapless'><h6 class='col-12' style='margin-bottom: .4rem;'><a href='?u/" + username + "'>" + username + "</a> <span class='message-user-mention-badge hide " + user_mention_badge + "'></span><small>" + message_timestamp + "</small></h6> <p class='col-12'>" + message_parsed + "</p></div></li>").prependTo(CDalreadyexistsC)


        /*
        The following method is actually pretty cool if you think about first,
        ... but it's probably quite a security risk :(
        */
        // $($("#PRESET_message-container").clone().html()
        //     .replace(/{{(\w+)}}/gm, function(match, p1) {
        //         var rtrn = eval(p1)
        //         return rtrn
        //     })
        // ).prependTo(CDalreadyexistsC)
    }

    addPrivateContact(username, cb) {
        page.listPrivateContacts(function(data, cList) {
            console.log(data, cList, cList.indexOf(username))
            if (cList.indexOf(username) === -1) {
                page.cmd("eciesEncrypt", [
                    username
                ], (username2) => {
                    console.log("ENCRYPTED USERNAME", username2)

                    // Add the new contact to data
                    var di = data.private_messages_with.push(username2)

                    // Encode data array to utf8 json text
                    var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
                    var json_rawA = btoa(json_raw)

                    // Write file to disk
                    page.cmd("fileWrite", [
                        "data/users/" + page.site_info.auth_address + "/data_private.json",
                        json_rawA
                    ], (res) => {
                        if (res == "ok") {
                            console.log("Added contact", username)
                        } else {
                            page.cmd("wrapperNotification", [
                                "error", "File write error: " + JSON.stringify(res)
                            ])
                        }
                        if (typeof cb === "function")
                            cb()
                    })
                })
            } else {
                console.log("Contact already added")
                if (typeof cb === "function")
                    cb()
            }
        })
    }

    genContactsList() {
        page.listPrivateContacts(function(data, cList) {
            var $pcl = $('#private_contacts_list')
            $pcl.html("")
            for (var x in cList) {
                var y = cList[x]
                $pcl.append('<li class="tab-item"><a href="javascript:page.loadPrivateMessages(\'selected user\', true, \'' + y + '\');">' + y + '</a></li>')
            }
        })
    }

    listPrivateContacts(cb) {
        var cList = []
        this.cmd("fileGet", {
            "inner_path": "data/users/" + this.site_info.auth_address + "/data_private.json",
            "required": false
        }, (data) => {
            if (data)
                var data = JSON.parse(data)
            else
                var data = {}

            if (!data.hasOwnProperty("private_messages"))
                data.private_messages = []
            if (!data.hasOwnProperty("private_messages_with"))
                data.private_messages_with = []

            var contacts = JSON.parse(JSON.stringify(data.private_messages_with))

            console.log("Listing contacts.. ", data.private_messages_with, data.private_messages_with.length, contacts, contacts.length)
            if (contacts.length > 0) {
                var addC = function(x) {
                    var x = x - 1
                    var y = contacts[x]
                    console.log(x, y)
                    page.cmd("eciesDecrypt", y, (contact) => {
                        console.log(x, y, contact)
                        if (contact)
                            cList.push(contact)

                        if (x === 0) {
                            contacts = contacts.reverse()
                            console.log("Listing private contacts", data, cList)
                            if (typeof cb === "function")
                                cb(data, cList)
                        } else {
                            addC(x)
                        }
                    })
                }
                contacts = contacts.reverse()
                addC(contacts.length)
            } else {
                if (typeof cb === "function")
                    cb(data, [])
            }

            // for (var x in data.private_messages_with) {
            //     var y = data.private_messages_with[x]
            //     page.cmd("eciesDecrypt", y, (contact) => {
            //         console.log(x, y, contact)
            //         if (contact)
            //             cList.push(contact)
            //     })
            // }

            // console.log(data, cList)
            // if (typeof cb === "function")
            //     cb(data, cList)
        })
    }

    addPrivateMessage(msgkey, username, message, date_added, addattop) {
        var message_escaped = message

        if (parseInt(page.LS.opts.avatar_size.value) !== 0) {
            this.identicons = this.identicons || {}
            var asv = parseInt(page.LS.opts.avatar_size.value) || 64
            if (!this.identicons.hasOwnProperty(asv)) {
                this.identicons[asv] = {}
            }
            if (!this.identicons.hasOwnProperty(username)) {
                var uhash = stringToHex(username).split(' ').join('')
                this.identicons[asv][username] = new Identicon(uhash, {
                    margin: 0.2,
                    size: asv,
                    format: 'svg'
                }).toString()
            }
            var idata = this.identicons[asv][username]
        }
        var message_pic = (typeof idata !== "undefined" ? "<img src='data:image/svg+xml;base64," + idata + "' />" : "")

        var mmnt = moment(date_added, "x")

        var curdate = mmnt.format("MMMM Do, YYYY")
        var curtime = mmnt.format("HH:mm:ss")

        var curdate2 = moment(curdate, "MMMM Do, YYYY").format("x")
        var rcurdate = moment().format("MMMM Do, YYYY")
        var curdate3 = (curdate === rcurdate ? "Today" : (moment(rcurdate, "MMMM Do, YYYY").subtract(1, "d").format("MMMM Do, YYYY") === curdate ? "Yesterday" : curdate));
        var CDalreadyexists = $("#private_messages").find('[P_timestamp-date="' + curdate2 + '"]')[0] || false

        var users_own_message = (username === page.site_info.cert_user_id)
        var user_is_mentioned = (message_escaped.match(new RegExp(page.site_info.cert_user_id + "|@" + page.site_info.cert_user_id.split("@")[0], "gmi"))) ? true : false
        var user_mention_badge = (page.LS.opts.user_mention_badge.value && user_is_mentioned) ? "badge" : ""

        var thismessageis = {
            "same_user": (page.lastmessagewas.hasOwnProperty("username") && page.lastmessagewas.username === username),
            "same_date": (page.lastmessagewas.hasOwnProperty("curdate2") && page.lastmessagewas.curdate2 === curdate2),
            "in_time_range": (page.lastmessagewas.hasOwnProperty("date_added") && moment(page.lastmessagewas.date_added, "x").add(15, "minutes").isSameOrAfter(date_added))
        }

        var dCDalreadyexists = CDalreadyexists === false ? false : true

        if (typeof CDalreadyexists !== "undefined" && CDalreadyexists !== false) {
            CDalreadyexists = $(CDalreadyexists)
        } else {
            CDalreadyexists = $("<li id='P_d_" + curdate2 + "' P_timestamp-date='" + curdate2 + "'><div class='divider text-center' data-content='" + (curdate3) + "' onclick='window.location.hash=\"#d_" + curdate2 + "\";'></div><ul class='times-messages unstyled'></ul></li>")
            CDalreadyexists = CDalreadyexists.appendTo("#private_messages")

            var items = $("#private_messages").children("[P_timestamp-date]").get()

            items.sort(function(a, b) {
                var A = parseInt($(a).attr('id').split("P_d_")[1])
                var B = parseInt($(b).attr('id').split("P_d_")[1])

                if (A < B) return -1
                if (A > B) return 1
                return 0
            });
            $("#private_messages").html("").append(items)
        }
        var CDalreadyexistsC = CDalreadyexists.children('.times-messages')

        var message_timestamp = ('<a class="message-timestamp ' + (page.LS.opts.show_timestamps.value ? "" : "hide") + '" href="#P_tc_' + msgkey + '">' + curtime + '</a>')

        var message_parsed = marked(message_escaped, {
                renderer: markedR
            })
            .replace(/((?:(?:[\w]+)@(?:zeroid|zeroverse|kaffie)\.bit)|@(?:[\w]+))/gmi, function(match, p1) { // ((?:[\w]+)@(?:zeroid|zeroverse)\.bit)
                var profile_link_part = (page.LS.opts.parse_profile_links.value ? '<a class="message-profile-link" onclick="add2MSGInput(\'' + p1 + ' \'); return false;" href="?u/' + encodeURI(p1) + '">' + p1 + '</a>' : '<span class="message-profile-link">' + p1 + '</span>')
                var isthisuser = (p1.match(new RegExp(page.site_info.cert_user_id + "|@" + page.site_info.cert_user_id.split("@")[0], "gmi"))) ? true : false
                return (isthisuser ? "<mark>" : "") + profile_link_part + (isthisuser ? "</mark>" : "")
            })
        if (!page.LS.opts.disable_emojis.value)
            message_parsed = emojione.toImage(message_parsed)

        var msg_part_2_1 = '<div id="P_tc_' + msgkey + '" P_tc="' + date_added + '" class="card mb-5">' +
            ((users_own_message || (thismessageis.same_user && thismessageis.same_date && thismessageis.in_time_range)) ? "" :
                '<div class="card-header"><small class="tile-title"><a onclick="add2MSGInput(\'' + username + ' \'); return false;" href="?u/' + encodeURI(username) + '">' + username + '</a></small></div>') + '<div class="card-body text-break">' +
            message_parsed + '</div><div class="' + (page.LS.opts.show_timestamps.value ? "" : "card-footer") + '"><small class="tile-subtitle float-right">' + message_timestamp + '</small></div></div>'

        if (((users_own_message && thismessageis.same_user) || thismessageis.same_user) && thismessageis.same_date && thismessageis.in_time_range) {
            var el2 = $(msg_part_2_1).appendTo($(page.lastmessagewas.el).find('.tile-content'))
            var el = page.lastmessagewas.el

            var items = $(page.lastmessagewas.el).find('.tile-content').children('.card').get()

            items.sort(function(a, b) {
                var A = parseInt($(a).attr('P_tc'))
                var B = parseInt($(b).attr('P_tc'))

                if (A < B) return -1
                if (A > B) return 1
                return 0
            });
            $(page.lastmessagewas.el).find('.tile-content').html("").append(items)
        } else {
            var msg_part_1 = '<div class="tile-icon"><figure class="avatar avatar-lg message-user-avatar ' + user_mention_badge + '" data-initial="' + username.substr(0, 2) + '">' + message_pic + '</figure></div>',
                msg_part_2 = '<div class="tile-content">' + msg_part_2_1 + '</div>'

            var el = $('<li id="P_t_' + msgkey + '" P_t="' + date_added + '" class="message-container ' + (user_is_mentioned ? "user-is-mentioned " : "") + '" message-owner="' + username + '" users-own-message="' + users_own_message + '"><div class="tile">' + (users_own_message ? (msg_part_2 + msg_part_1) : (msg_part_1 + msg_part_2)) + '</div></li>')

            el = el.appendTo(CDalreadyexistsC)

            var items = CDalreadyexistsC.children("li.message-container").get()

            items.sort(function(a, b) {
                var A = parseInt($(a).attr('P_t'))
                var B = parseInt($(b).attr('P_t'))

                if (A < B) return -1
                if (A > B) return 1
                return 0
            });
            CDalreadyexistsC.html("").append(items)
        }

        page.lastmessagewas = {
            "username": username,
            "curdate2": curdate2,
            "date_added": date_added,
            "el": el
        }
        if (page.firstprivatemessagewas.date_added > date_added)
            page.firstprivatemessagewas.date_added = date_added
    }

    sendPrivateMessage(message3, recipient2) {
        var verified = this.verifyUser()
        if (!verified)
            return false

        this.verifyUserFiles()

        // {
        //     "recipient": "cert_user_id",
        //     "body": "BODY",
        //     "date_added": parseInt(moment().utc().format("x"))
        // }

        var recipient2 = recipient2 || false
        var recipient = recipient2 || $('#recipient').val()
        if (!recipient)
            recipient = this.site_info.cert_user_id

        var randI = Math.random().toString(36).substr(2, 5) + Math.random().toString(36).substr(2, 5) + Math.random().toString(36).substr(2, 5)
        var bR = btoa(randI + recipient)

        var message3 = message3 || false
        var message2 = message3 || $('#private_message').val()
        var message = message2
            .replace(/\n{3,}/gm, "\n\n")
            .trim()

        var data_inner_path = "data/users/" + this.site_info.auth_address + "/data.json"
        var data2_inner_path = "data/users/" + this.site_info.auth_address + "/data_private.json"
        var content_inner_path = "data/users/" + this.site_info.auth_address + "/content.json"

        this.cmd("dbQuery", [
            "SELECT * FROM keyvalue LEFT JOIN json USING (json_id) WHERE key = 'public_key' AND value NOT NULL AND json.cert_user_id = '" + recipient + "'"
        ], (users) => {
            var user = users[0]
            console.log(user)
            if (user && user.hasOwnProperty("value") && user.value) {
                this.cmd("fileGet", {
                    "inner_path": data_inner_path,
                    "required": false
                }, (data) => {
                    if (data)
                        var data = JSON.parse(data)
                    else
                        var data = {}

                    if (!data.hasOwnProperty("private_messages"))
                        data.private_messages = []

                    if (message && /\S/.test(message)) {
                        page.cmd("eciesEncrypt", [
                            JSON.stringify({
                                "recipient": recipient,
                                "body": emojione.toShort(message),
                                "date_added": parseInt(moment().utc().format("x"))
                            }),
                            user.value
                        ], (res) => {
                            console.log("Res: ", res)

                            // Add the new message to data
                            var di = data.private_messages.push({
                                "message": res
                            })

                            // Encode data array to utf8 json text
                            var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
                            var json_rawA = btoa(json_raw)

                            page.addPrivateContact(recipient, function() {
                                // Write file to disk
                                page.cmd("fileWrite", [
                                    data_inner_path,
                                    json_rawA
                                ], (res2) => {
                                    if (res2 == "ok") {
                                        page.cmd("fileGet", {
                                            "inner_path": data2_inner_path,
                                            "required": false
                                        }, (data2) => {
                                            if (data2)
                                                var data2 = JSON.parse(data2)
                                            else
                                                var data2 = {}

                                            if (!data2.hasOwnProperty("private_messages"))
                                                data2.private_messages = []
                                            if (!data.hasOwnProperty("private_messages_with"))
                                                data2.private_messages_with = []

                                            page.cmd("eciesEncrypt", [
                                                JSON.stringify({
                                                    "recipient": recipient,
                                                    "body": emojione.toShort(message),
                                                    "date_added": parseInt(moment().utc().format("x"))
                                                })
                                            ], (res3) => {
                                                console.log("Res3: ", res3)
                                                page.cmd("aesEncrypt", [
                                                    res3,
                                                    bR,
                                                    bR
                                                ], (res4) => {
                                                    console.log("Res4: ", res4)

                                                    // Add the new message to data
                                                    var di2 = data2.private_messages.push({
                                                        "randI": randI,
                                                        "message": res4[2] // res3
                                                    })

                                                    // Encode data array to utf8 json text
                                                    var json_raw2 = unescape(encodeURIComponent(JSON.stringify(data2, undefined, '\t')))
                                                    var json_rawA2 = btoa(json_raw2)

                                                    // Write file to disk
                                                    page.cmd("fileWrite", [
                                                        data2_inner_path,
                                                        json_rawA2
                                                    ], (res5) => {
                                                        if (res5 == "ok") {
                                                            if (!message3)
                                                                $('#private_message').val("")
                                                            autosize.update($('#private_message'))

                                                            // Publish the file to other users
                                                            page.verifyUserFiles(null, function() {
                                                                console.log("Sent private message", {
                                                                    "recipient": recipient,
                                                                    "body": emojione.toShort(message),
                                                                    "SOMEWHAT-date_added": parseInt(moment().utc().format("x"))
                                                                })

                                                                // page.loadPrivateMessages("sent private message")
                                                            })
                                                        } else {
                                                            page.cmd("wrapperNotification", [
                                                                "error", "File write error: " + JSON.stringify(res5)
                                                            ])
                                                        }
                                                    })
                                                })
                                            })
                                        })
                                    } else {
                                        page.cmd("wrapperNotification", [
                                            "error", "File write error: " + JSON.stringify(res2)
                                        ])
                                    }
                                })
                            })
                        })
                    } else {
                        // this.cmd("wrapperNotification", [
                        //     "error", "Invalid message!", 5000
                        // ])
                    }
                })
            } else {
                this.cmd("wrapperNotification", [
                    "error", "Invalid recipient!", 5000
                ])
            }
        })

        return false
    }

    testPrivateCrypto(oU) {
        var oU = oU || page.site_info.cert_user_id
        var randI = Math.random().toString(36).substr(2, 5) + Math.random().toString(36).substr(2, 5) + Math.random().toString(36).substr(2, 5)
        var boU = btoa(randI + oU)
        var sdata = {
            "private_messages": []
        }

        page.cmd("eciesEncrypt", [
            JSON.stringify({
                "recipient": oU,
                "body": emojione.toShort("Hello :wave::smile:"),
                "date_added": parseInt(moment().utc().format("x"))
            })
        ], (res1) => {
            console.log("Ecies Encrypt", res1)

            page.cmd("aesEncrypt", [
                res1,
                boU,
                boU
            ], (res2) => {
                console.log("Aes Encrypt", res2)
                var di = sdata.private_messages.push({
                    "randI": randI,
                    "message": res2[2]
                })

                var json_raw = unescape(encodeURIComponent(JSON.stringify(sdata, undefined, '\t')))
                var json_rawA = btoa(json_raw)

                page.cmd("fileWrite", [
                    "disabled/EXAMPLE.json",
                    json_rawA
                ], (res3) => {
                    if (res3 == "ok") {

                        page.cmd("fileQuery", [
                            "disabled/EXAMPLE.json",
                            "private_messages"
                        ], (res4) => {
                            console.log("File read", res4)

                            for (var x in res4) {
                                var y = res4[x]
                                var E1msg = y.message
                                console.log("At ", x, y, E1msg)

                                if (E1msg) {
                                    page.cmd("aesDecrypt", [
                                        boU,
                                        E1msg,
                                        boU
                                    ], (E2msg) => {
                                        console.log("Aes Decrypt", E2msg)

                                        if (E2msg) {
                                            page.cmd("eciesDecrypt", E2msg, (res6) => {
                                                console.log("Ecies Decrypt", res6)

                                                var msg = JSON.parse(res6)
                                                if (msg) {
                                                    console.log("Valid MSG", msg)
                                                } else {
                                                    console.log("Invalid MSG", msg)
                                                }
                                            })
                                        }
                                    })
                                }
                            }
                        })
                    } else {
                        console.log("File write", res3)
                    }
                })
            })
        })
    }

    loadPrivateMessages(loadcode, override, sender) {
        var verified = this.verifyUser()
        if (!verified)
            return false

        console.log("Loading private messages with code >" + loadcode + "<..")
        var override = override || false
        var goingback = goingback || false

        page.cmd("dbQuery", [
            "SELECT * FROM private_messages LEFT JOIN json USING (json_id) WHERE cert_user_id = '" + sender + "'"
        ], (messages1) => {
            var $m = $('#private_messages')

            var message_design_type = parseInt(page.LS.opts.message_design_type.value)
            if (message_design_type === 1) {
                $('#private_messages').removeAttr("design-type")
            } else {
                $('#private_messages').attr("design-type", message_design_type)
            }

            if (override) {
                page.lastprivatemessagewas = ""
                $m.html('<div class="icon icons loading"></div>')
            }

            page.cmd("fileQuery", [
                "data/users/" + page.site_info.auth_address + "/data_private.json",
                "private_messages"
            ], (messages2) => {
                var first = true
                for (var x in messages1) {
                    var y = messages1[x]
                    page.cmd("eciesDecrypt", y.message, (msg) => {
                        if (msg)
                            var msg = JSON.parse(msg)
                        if (msg !== null) {
                            console.log(x, y, msg)

                            if (first) {
                                page.firstprivatemessagewas = {
                                    "date_added": msg.date_added
                                }
                                first = false
                            }

                            this.addPrivateMessage(y.message_id, sender, msg.body, msg.date_added, override ? false : true)
                        }
                    })
                }

                for (var x in messages2) {
                    var y = messages2[x]

                    // var msg2 = y.message
                    var randI = y.randI
                    var bS = btoa(randI + sender)
                    page.cmd("aesDecrypt", [
                        bS,
                        y.message,
                        bS
                    ], (msg2) => {
                        console.log("AES-DECRYPTED OWN MESSAGE", msg2)
                        if (msg2) {
                            page.cmd("eciesDecrypt", msg2, (msg) => {
                                if (msg) {
                                    var msg = JSON.parse(msg)
                                    if (msg.recipient !== sender)
                                        return false
                                    console.log("ECIES-DECRYPTED OWN MESSAGE", msg)
                                    if (msg !== null) {
                                        console.log(x, y, msg)

                                        if (first) {
                                            page.firstprivatemessagewas = {
                                                "date_added": msg.date_added
                                            }
                                            first = false
                                        }

                                        this.addPrivateMessage(y.message_id, page.site_info.cert_user_id, msg.body, msg.date_added, override ? false : true)
                                    }
                                }
                            })
                        }
                    })
                }
                $m.children('.loading').remove()

                config$bH(loadcode === "load more" || goingback)
            })
        })
    }

    sendMessage(message3) {
        var verified = this.verifyUser()
        if (!verified)
            return false

        this.verifyUserFiles()

        var message3 = message3 || false
        var message2 = message3 || $('#message').val()
        var message = message2
            .replace(/\n{3,}/gm, "\n\n")
            .trim()

        var data_inner_path = "data/users/" + this.site_info.auth_address + "/data.json"
        var content_inner_path = "data/users/" + this.site_info.auth_address + "/content.json"

        this.cmd("fileGet", {
            "inner_path": data_inner_path,
            "required": false
        }, (data) => {
            if (data)
                var data = JSON.parse(data)
            else
                var data = {}

            if (!data.hasOwnProperty("messages"))
                data.messages = []
            if (!data.hasOwnProperty("images"))
                data.images = []

            // console.log(data, message)
            if (message && /\S/.test(message)) {
                // Add the new message to data
                var di = data.messages.push({
                    "body": emojione.toShort(message),
                    "date_added": parseInt(moment().utc().format("x"))
                })

                // Encode data array to utf8 json text
                var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
                var json_rawA = btoa(json_raw)

                // Write file to disk
                this.cmd("fileWrite", [
                    data_inner_path,
                    json_rawA
                ], (res) => {
                    if (res == "ok") {
                        if (!message3)
                            $('#message').val("")
                        autosize.update($('#message'))

                        // Publish the file to other users
                        this.verifyUserFiles(null, function() {
                            page.loadMessages("sent message", false, data.messages.length === 1 ? false : true)
                        })

                        // this.cmd("siteSign", {
                        //     "inner_path": content_inner_path
                        // }, (res) => {
                        //     this.loadMessages("sent message", false, data.messages.length === 1 ? false : true)
                        //     this.cmd("sitePublish", {
                        //         "inner_path": content_inner_path,
                        //         "sign": false
                        //     }, function() {})
                        // })

                        // this.cmd("wrapperNotification", [
                        //     "done", "Sent message:<br>" + message, 5000
                        // ])
                    } else {
                        this.cmd("wrapperNotification", [
                            "error", "File write error: " + JSON.stringify(res)
                        ])
                    }
                })
            } else {
                // this.cmd("wrapperNotification", [
                //     "error", "Invalid message!", 5000
                // ])
            }
        })

        return false
    }

    uploadMedia() {
        var verified = this.verifyUser()
        if (!verified)
            return false

        // Check for the various File API support.
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert('The File APIs are not fully supported in this browser.')
            return false
        }

        var files = $('#media_uploader')[0].files;
        if (!files)
            return false

        // if (this.MediaFiles)
        //     var files = this.MediaFiles
        // else
        //     return false

        this.verifyUserFiles()

        for (var fX in files) {
            var fY = files[fX]
            console.log(fX, fY)

            if (!fY || typeof fY !== 'object' || !fY.type.match('(image)\/(png|jpg|jpeg|gif)|(audio)\/(mp3|ogg)|(video)\/(ogg)')) // |audio|video      || !fY.name.match(/\.IMAGETYPE$/gm)
                continue

            var reader = new FileReader()
            reader.onload = (function(f2) {
                console.log("reading", f2)
                return function(event) {
                    console.log("with event", event)

                    var f_data = btoa(event.target.result)

                    var data_inner_path = "data/users/" + page.site_info.auth_address + "/data.json"
                    var content_inner_path = "data/users/" + page.site_info.auth_address + "/content.json"

                    page.cmd("fileGet", {
                        "inner_path": data_inner_path,
                        "required": false
                    }, (data) => {
                        if (data)
                            var data = JSON.parse(data)
                        else
                            var data = {}

                        if (!data.hasOwnProperty("messages"))
                            data.messages = []
                        if (!data.hasOwnProperty("images"))
                            data.images = []

                        page.cmd("eciesEncrypt", {
                                "text": escape(fY.name),
                                "return_aes_key": true
                            },
                            (res) => {
                                if (res[1]) {
                                    var f_nameid = res[1]
                                        .replace(/\W/gm, "")
                                    var f_name = f_nameid + '.' + f2.type.split("/")[1]
                                        // Add the new image to data
                                    var di = data.images.push({
                                        "file_name": f_name,
                                        "date_added": parseInt(moment().utc().format("x"))
                                    })
                                    var f_path = "data/users/" + page.site_info.auth_address + "/" + f_name

                                    // Encode data array to utf8 json text
                                    var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
                                    var json_rawA = btoa(json_raw)

                                    // Write image to disk
                                    page.cmd("fileWrite", [
                                        f_path,
                                        f_data
                                    ], (res) => {
                                        if (res == "ok") {
                                            var ctrl = $('#media_uploader')[0]
                                            try {
                                                ctrl.value = null;
                                            } catch (ex) {}
                                            if (ctrl.value) {
                                                ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
                                            }

                                            // Write data to disk
                                            page.cmd("fileWrite", [
                                                data_inner_path,
                                                json_rawA
                                            ], (res) => {
                                                if (res == "ok") {
                                                    var output_url = '/' + page.site_info.address + '/' + f_path
                                                    console.log(output_url, f2.type.match('(image)\/(png|jpg|jpeg|gif)'))
                                                    if (f2.type.match('(image)\/(png|jpg|jpeg|gif)'))
                                                        add2MSGInput(' ![ALTTEXT](' + output_url + ') ')
                                                    else
                                                        add2MSGInput(' [TITLE](' + output_url + ') ')

                                                    // Publish the file to other users
                                                    this.verifyUserFiles()

                                                    // page.cmd("siteSign", {
                                                    //     "inner_path": content_inner_path
                                                    // }, (res) => {
                                                    //     page.cmd("sitePublish", {
                                                    //         "inner_path": content_inner_path,
                                                    //         "sign": false
                                                    //     }, function() {})
                                                    // })
                                                } else {
                                                    page.cmd("wrapperNotification", [
                                                        "error", "File write error: " + JSON.stringify(res)
                                                    ])
                                                }
                                            })
                                        } else {
                                            page.cmd("wrapperNotification", [
                                                "error", "Image-File write error: " + JSON.stringify(res)
                                            ])
                                        }
                                    })
                                } else {
                                    page.cmd("wrapperNotification", [
                                        "error", "Ecies-Encryption error: " + JSON.stringify(res)
                                    ])
                                }
                            })
                    })
                }
            })(fY)
            reader.readAsBinaryString(fY)
        }
    }

    imageDisplayer(uh, href, title, text) {
        // page.cmd("optionalFileList", [], (data) => {
        //     console.log(data);
        //     page.cmd("optionalFileInfo", data[0].inner_path, (res) => {
        //         console.log(res);
        //     })
        // })

        var hrefArr = href.split("/")
        if (hrefArr[0] === "")
            hrefArr.shift()
        var isvalidimage = false

        // console.log("Checkin image", href, hrefArr)
        if (hrefArr[0] === this.site_info.address)
            hrefArr.shift()
        if (hrefArr[0] === "data" && hrefArr[1] === "users" && hrefArr[2] && hrefArr[3]) {
            hrefArr.shift()
            hrefArr.shift()
            isvalidimage = true
        }
        /*
        hrefArr[0] = auth_address
        hrefArr[1] = file_name
        */

        if (!isvalidimage)
            return false

        // console.log("Image is valid", hrefArr)
        this.cmd("dbQuery", [
            "SELECT * FROM images LEFT JOIN json USING (json_id) WHERE directory = \"users/" + hrefArr[0] + "\" AND images.file_name = \"" + hrefArr[1] + "\""
        ], (images) => {
            // console.log("IMAGES", images)
            if (!images || !images[0])
                return false

            var image = images[0]

            // console.log("Loading image..", image)
            page.cmd("optionalFileInfo", 'data/' + image.directory + '/' + image.file_name, (res) => {
                // console.log("Image result: ", res)

                var $mfr = $('#MEDIAFILEREPLACE_' + uh)
                if (res.is_downloaded === 1) {
                    var el2 = $mfr.replaceWith($(imageViewGen(res, href, title, text)))
                    if (res.inner_path.match('.+\\.(.*)')[1] === "gif")
                        Gifffer(el2.find('img'));
                } else {
                    $mfr.replaceWith($('<div class="popover">' +
                        '<button class="btn" onclick="page.imageDownloader(this, \'' +
                        href + '\', \'' + escape(title) + '\', \'' + escape(text) +
                        '\')">Download ' + (title ? title : (text ? text : '')) +
                        '</button><div class="popover-container">' +
                        '<div class="card"><div class="card-header">' +
                        (title ? ('<div class="card-title">' + title + '</div>') :
                            (text ? ('<div class="card-title">' + text + '</div>') : '')) +
                        (title && text ? ('<div class="card-subtitle">' + text + '</div>') : '') +
                        '</div><div class="card-body">Peers: ' +
                        res.peer + '<br>Size: ' + res.size +
                        '<br>Type: ' + res.inner_path.match('.+\\.(.*)')[1] +
                        '</div></div></div>'))
                }
            })
        })
    }
    imageDownloader(el, href, title, text) {
        var hrefArr = href.split("/")
        if (hrefArr[0] === "")
            hrefArr.shift()
        var isvalidimage = false

        // console.log("Checkin image", href, hrefArr)
        if (hrefArr[0] === this.site_info.address)
            hrefArr.shift()
        if (hrefArr[0] === "data" && hrefArr[1] === "users" && hrefArr[2] && hrefArr[3]) {
            hrefArr.shift()
            hrefArr.shift()
            isvalidimage = true
        }
        /*
        hrefArr[0] = auth_address
        hrefArr[1] = file_name
        */

        if (!isvalidimage)
            return false

        // console.log("Image is valid", hrefArr)
        page.cmd("dbQuery", [
            "SELECT * FROM images LEFT JOIN json USING (json_id) WHERE directory = \"users/" + hrefArr[0] + "\" AND images.file_name = \"" + hrefArr[1] + "\""
        ], (images) => {
            // console.log("IMAGES", images)
            if (!images || !images[0])
                return false

            var image = images[0]

            // console.log("Loading image..", image)
            page.cmd("optionalFileInfo", 'data/' + image.directory + '/' + image.file_name, (res) => {
                console.log("Image result: ", res)
                var el2 = $(el).parent().replaceWith($(imageViewGen(res, href, unescape(title), unescape(text))))
                if (res.inner_path.match('.+\\.(.*)')[1] === "gif")
                    Gifffer(el2.find('img'));
            })
        })
    }
    imageDeleter(el, href, title, text) {
        var hrefArr = href.split("/")
        if (hrefArr[0] === "")
            hrefArr.shift()

        // console.log(href, hrefArr)
        if (hrefArr[0] === this.site_info.address)
            hrefArr.shift()
        if (hrefArr[0] === "data" && hrefArr[1] === "users" && hrefArr[2] && hrefArr[3]) {
            hrefArr.shift()
            hrefArr.shift()
        }
        /*
        hrefArr[0] = auth_address
        hrefArr[1] = file_name
        */
        page.cmd("optionalFileDelete",
            "data/users/" + hrefArr[0] + "/" + hrefArr[1], (res) => {
                console.log("Deleted optional media-file: data/users/" + hrefArr[0] + '/' + hrefArr[1], res);

                var uh = Math.random().toString(36).substring(7);
                page.imageDisplayer(uh, href, unescape(title), unescape(text))
                $(el).parent().parent().parent().parent().replaceWith($('<div id="MEDIAFILEREPLACE_' + uh + '" class="icon icons loading"></div>'))
            })
    }

    lastSeenList() {
        var verified = this.verifyUser()
        if (!verified)
            return false

        console.log("Loading last-seen-List")
        var count = 0
        this.cmd("dbQuery", [
            "SELECT * FROM keyvalue LEFT JOIN json USING (json_id) WHERE key = 'last_seen' AND value NOT NULL ORDER BY value DESC"
        ], (lsl) => {
            var lsl_HTML = ''
            for (var x in lsl) {
                var y = lsl[x]
                if (y) {
                    lsl_HTML += '<li><b>' + y.cert_user_id + '</b> was last seen <i>' + moment(y.value, "x").format("MMMM Do, YYYY - HH:mm:ss") + '</i></li>'
                    count++
                }
            }
            $('#last_seen_list').html(lsl_HTML)
            $('#last_seen_list_c').html(count)
        })
    }

    loadMessages(loadcode, override, to_now, ADESC, goingback, from_time, to_time) {
        var verified = this.verifyUser()
        if (!verified)
            return false

        this.lastSeenList()

        console.log("Loading messages with code >" + loadcode + "<..")
        var override = override === false ? false : true
        var to_now = to_now || false
        var goingback = goingback || false

        var ADESC = ADESC === "ASC" ? "ASC" : "DESC"

        // if (page.hasOwnProperty("firstmessagewas") && page.firstmessagewas.date_added && !to_now) {
        //     var from_time2 = moment(page.firstmessagewas.date_added, "x").subtract(2, "d").format("x"),
        //         to_time2 = page.firstmessagewas.date_added,
        //         v = 1
        // } else 
        if (page.hasOwnProperty("firstmessagewas") && page.firstmessagewas.date_added && (!to_now || loadcode === "load more")) {
            var from_time2 = moment(page.firstmessagewas.date_added, "x").subtract(12, "h").format("x"),
                to_time2 = page.firstmessagewas.date_added,
                v = 1
        } else if (to_now) {
            var from_time2 = page.lastmessagewas.date_added,
                to_time2 = moment().format("x"),
                v = 2
        } else {
            var from_time2 = 0, //moment().subtract(2, "d").format("x"),
                to_time2 = moment().format("x"),
                v = 3
        }

        var from_time = from_time || from_time2,
            to_time = to_time || to_time2,
            mmntfrmt = "MMMM Do, YYYY - HH:mm:ss"

        // if (override)
        //     this.messageCounterArr = {}

        if (loadcode === "load more")
            page.hadscrollheight = $('#messages').parent()[0].scrollHeight

        console.log(loadcode, override, to_now, from_time, to_time, ADESC, goingback, moment(from_time, "x").format(mmntfrmt) + " :: " + moment(to_time, "x").format(mmntfrmt), v)

        this.cmd("dbQuery", [
            "SELECT * FROM messages LEFT JOIN json USING (json_id) WHERE date_added > " + from_time +
            (loadcode === "load more" ? " AND date_added < " + to_time : "") +
            " ORDER BY date_added DESC" +
            (loadcode === "first time" || loadcode === "load more" ? " LIMIT 25" : " ")

            //WHERE date_added > " + from_time + " AND date_added < " + to_time + " ORDER BY date_added " + ADESC + " LIMIT 5" // OFFSET " + offset
        ], (messages) => {
            messages.reverse()
            console.log("Messages: ", messages)

            var $m = $('#messages')

            var message_design_type = parseInt(page.LS.opts.message_design_type.value)
            if (message_design_type === 1) {
                $('#messages').removeAttr("design-type")
            } else {
                $('#messages').attr("design-type", message_design_type)
            }

            if (override) {
                page.lastmessagewas = ""
                $m.html('<div class="icon icons loading"></div>')
            }

            page.firstmessagewas = {
                "date_added": !messages[0] ? 0 : messages.length > 1 ? messages[0].date_added : 0
            }
            console.log(messages[0], page.firstmessagewas)

            for (var i = 0; i < messages.length; i++) {
                var msg = messages[i]
                if (!this.messageCounterArr.hasOwnProperty(msg.message_id)) {
                    this.addMessage(msg.message_id, msg.cert_user_id, msg.body, msg.date_added, override ? false : true)
                    this.messageCounterArr[msg.message_id] = {
                        body: msg.body,
                        cert_user_id: msg.cert_user_id,
                        date_added: msg.date_added,
                        // directory: "users/14K7EydgyeP84L1NKaAHBZTPQCev8BbqCy",
                        // file_name: "data.json",
                        json_id: msg.json_id,
                        message_id: msg.message_id
                    }
                }
            }
            $m.children('.loading').remove()

            config$bH(loadcode === "load more" || goingback)

            // $m.addClass("bounce-bottom")
            // setTimeout(function() {
            //     $m.removeClass("bounce-bottom")
            // }, 900)
        })
    }

    selectUser() {
        this.cmd("certSelect", {
            accepted_domains: [
                "zeroid.bit",
                "zeroverse.bit",
                "kaffie.bit"
            ]
        })
        return false
    }

    onRequest(cmd, message) {
        // console.log("COMMAND", cmd, message)
        if (cmd == "setSiteInfo") {
            this.site_info = message.params // Save site info data to allow access it later
            this.setSiteInfo(message.params)

            if (message.params.cert_user_id) {
                this.identicons = this.identicons || {}
                var asv = parseInt(page.LS.opts.avatar_size.value) || 64
                if (!this.identicons.hasOwnProperty(asv)) {
                    this.identicons[asv] = {}
                }
                if (!this.identicons.hasOwnProperty(message.params.cert_user_id)) {
                    var uhash = stringToHex(message.params.cert_user_id).split(' ').join('')
                    this.identicons[asv][message.params.cert_user_id] = new Identicon(uhash, {
                        margin: 0.2,
                        size: asv,
                        format: 'svg'
                    }).toString()
                }
                var idata = this.identicons[asv][message.params.cert_user_id]

                var user_pic_1 = (typeof idata !== "undefined" ? "<img src='data:image/svg+xml;base64," + idata + "' />" : "")
                var user_pic_2 = '<figure class="avatar" data-initial="' + message.params.cert_user_id.substr(0, 2) + '" onclick="">' + user_pic_1 + '</figure>'

                $('.hideifnotloggedin').removeClass("hide")
                $("#select_user").html("Change user")
                $('#current_user_name').html(message.params.cert_user_id)
                $('#current_user_avatar').html(user_pic_2)

                page.genContactsList()

                if (message.params.event[0] === "cert_changed" && message.params.event[1]) {
                    // this.messageCounterArr = {}
                    this.loadMessages("cert changed")
                }
            } else {
                $('.hideifnotloggedin').addClass("hide")
                $("#select_user").html("Select user")
                $('#current_user_name').html("Please login first")
                $('#current_user_avatar').html('<figure class="avatar" data-initial="TW"></figure>')
            }

            if (message.params.event[0] == "file_done")
                this.loadMessages("file done", false, true)
        }
    }

    setSiteInfo(site_info) {
        var dis = this
        $("#out").html(
            "Page address: " + site_info.address +
            "<br>- Peers: " + site_info.peers +
            "<br>- Size: " + site_info.settings.size +
            "<br>- Modified: " + (new Date(site_info.content.modified * 1000))
        )
    }

    setSettingsOptions() {
        console.log("Settings options..")
        $('#sttngs_container').html('<div class="icon icons loading"></div>')

        var dis = this
        this.cmd("wrapperGetLocalStorage", [], (LS) => {
            var LS = (typeof LS === "object" ? (LS || {}) : {})

            // console.log(LS, LS.hasOwnProperty("opts"), LS.opts)
            var curOptsV = 7
            if (!LS.hasOwnProperty("opts") || LS.optsV !== curOptsV) {
                LS.optsV = curOptsV

                if (LS.hasOwnProperty("opts"))
                    var oldOpts = LS.opts

                LS.opts = {
                    // "parse_links": {
                    //     "label": "Parse Links", // The Label of this option
                    //     "desc": "Activate to parse links in messages", // The description of this option
                    //     "value": false, // The value of this option
                    //     "r_ms": false, // Reload messages
                    //     "cb": { // Callback ..
                    //         "change": '(' + ( // .. on change
                    //             function() {
                    //                 $('#messages').find('.message-link').each(function() {
                    //                     var elY = $(this);
                    //                     if (page.LS.opts.parse_links.value) {
                    //                         elY.replaceWith($('<a class="message-link" href="' + elY.text() + '" target="_blank">' + elY.text() + '</a>'));
                    //                     } else {
                    //                         elY.replaceWith($('<span class="message-link">' + elY.text() + '</span>'));
                    //                     }
                    //                 })
                    //             }
                    //         ).toString() + ')'
                    //     }
                    // },
                    "parse_profile_links": {
                        "label": "Parse Profile Links",
                        "desc": "Activate to parse profile links in messages (@...)",
                        "value": true,
                        "r_ms": false,
                        "cb": {
                            "change": '(' + (
                                function() {
                                    $('#messages').find('.message-profile-link').each(function() {
                                        var elY = $(this);
                                        if (page.LS.opts.parse_profile_links.value) {
                                            elY.replaceWith($('<a class="message-profile-link" href="?u/' + elY.text() + '">' + elY.text() + '</a>'));
                                        } else {
                                            elY.replaceWith($('<span class="message-profile-link">' + elY.text() + '</span>'));
                                        }
                                    })
                                }
                            ).toString() + ')'
                        }
                    },
                    "user_mention_badge": {
                        "label": "User mention badge",
                        "desc": "Activate to show a little badge next to the avatar of the sender, if the message contains your username",
                        "value": true,
                        "r_ms": false,
                        "cb": {
                            "change": '(' + (
                                function() {
                                    if (page.LS.opts.user_mention_badge.value) {
                                        $('#messages').find('.user-is-mentioned').find('.message-user-avatar').addClass("badge")
                                            // $('#messages').find('.message-user-mention-badge').removeClass("hide")
                                    } else {
                                        $('#messages').find('.user-is-mentioned').find('.message-user-avatar').removeClass("badge")
                                            // $('#messages').find('.message-user-mention-badge').addClass("hide")
                                    }
                                }
                            ).toString() + ')'
                        }
                    },
                    "show_timestamps": {
                        "label": "Toggle Timestamps",
                        "desc": "Activate to show Timestamps in chat",
                        "value": true,
                        "r_ms": false,
                        "cb": {
                            "change": '(' + (
                                function() {
                                    $('#messages').find('.message-timestamp').each(function() {
                                        var elY = $(this);
                                        if (page.LS.opts.show_timestamps.value) {
                                            elY.parent().parent().removeClass("card-footer")
                                            elY.removeClass("hide")
                                        } else {
                                            elY.parent().parent().addClass("card-footer")
                                            elY.addClass("hide")
                                        }
                                    })
                                }
                            ).toString() + ')'
                        }
                    },
                    "avatar_size": {
                        "label": "Set avatar-size",
                        "desc": "Sets the avatar-size to this dimensions",
                        "value": 64,
                        "values": [
                            [0, "Off (2char-initial)"],
                            [32, "32x32"],
                            [64, "64x64 (default)"],
                            [128, "128x128"],
                            [256, "256x256"],
                            [512, "512x512"]
                        ],
                        "type": "select",
                        "r_ms": true,
                        "cb": {
                            "change": '(' + (
                                function() {
                                    var parsedVal = parseInt(page.LS.opts.avatar_size.value)
                                    page.LS.opts.avatar_size.value = (parsedVal > 0 ? parsedVal : (parsedVal === 0 ? 0 : 64))
                                }
                            ).toString() + ')'
                        }
                    },
                    "message_design_type": {
                        "label": "Change design of messages",
                        "desc": "Changes the design of the messages",
                        "value": 2,
                        "values": [
                            [1, "Square"],
                            [2, "Arrow at top (default)"],
                            [3, "Arrow at middle of avatar"]
                        ],
                        "type": "select",
                        "r_ms": false,
                        "cb": {
                            "change": '(' + (
                                function() {
                                    var parsedVal = parseInt(page.LS.opts.message_design_type.value)
                                    if (parsedVal === 1) {
                                        $('#messages').removeAttr("design-type")
                                    } else {
                                        $('#messages').attr("design-type", parsedVal)
                                    }
                                }
                            ).toString() + ')'
                        }
                    },
                    "divider_1": "",
                    "disable_emojis": {
                        "label": "Disable loading of Emoji's",
                        "desc": "If activated, Emoji's will stop being loaded, and all existing will change to text!",
                        "value": false,
                        "r_ms": true,
                        "cb": {
                            "change": '(' + (
                                function() {

                                }
                            ).toString() + ')'
                        }
                    },
                    "seed_all_emojis": {
                        "label": "Seed all Emoji's",
                        "desc": "Downloads and seeds all Emoji's automatically!",
                        "value": false,
                        "cb": {
                            "change": '(' + (
                                function() {
                                    if (page.LS.opts.seed_all_emojis.value) {
                                        page.cmd("OptionalHelp", ["css/png", "ThunderWave's Emoji's"],
                                            (res) => {
                                                console.log(res)
                                            })
                                    } else {
                                        page.cmd("OptionalHelpRemove", ["css/png"],
                                            (res) => {
                                                console.log(res)
                                                page.cmd("wrapperNotification", [
                                                    "done", "You are no longer Auto-Seeding Emoji's!", 5000
                                                ])
                                            })
                                    }
                                }
                            ).toString() + ')'
                        }
                    },
                    "delete_all_emojis": {
                        "label": "Delete all Emoji's",
                        "desc": "All Emoji's in your \"cache\" will be deleted",
                        "value": "Delete",
                        "type": "button",
                        "r_ms": true,
                        "cb": {
                            "click": '(' + (
                                function() {
                                    if (page.site_info.cert_user_id !== "glightstar@zeroid.bit") {
                                        var count = 0
                                        page.cmd("optionalFileList", [], (data) => {
                                            for (var x in data) {
                                                var y = data[x]
                                                if (y && y.hasOwnProperty("inner_path") && y.inner_path.substr(0, "css/png/".length) === "css/png/")
                                                    page.cmd("optionalFileDelete", y.inner_path, (res) => {
                                                        console.log("deleted emoji at path " + y.inner_path)
                                                        count++
                                                    })
                                            }
                                            page.cmd("wrapperNotification", [
                                                "done", "Removed " + count + " Emoji's!", 5000
                                            ])
                                        })
                                    } else {
                                        page.cmd("wrapperNotification", [
                                            "error", "You can't delete Emoji's!", 5000
                                        ])
                                        var count = 0
                                        page.cmd("optionalFileList", [], (data) => {
                                            console.log(data)
                                            for (var x in data) {
                                                var y = data[x]
                                                if (y && y.hasOwnProperty("inner_path") && y.inner_path.substr(0, "css/png/".length) === "css/png/") {
                                                    console.log("would have removed emoji at path " + y.inner_path)
                                                    count++
                                                }
                                            }
                                            page.cmd("wrapperNotification", [
                                                "done", "Would have removed " + count + " Emoji's!", 5000
                                            ])
                                        })
                                    }
                                }
                            ).toString() + ')'
                        }
                    },
                    "divider_2": "",
                    "reset_options_to_default": {
                        "label": "Reset to default",
                        "desc": "Resets all options to their default values",
                        "value": "Reset",
                        "type": "button",
                        "r_ms": true,
                        "cb": {
                            "click": '(' + (
                                function() {
                                    delete page.LS.opts;
                                    page.cmd("wrapperSetLocalStorage", page.LS, function() {});
                                    page.setSettingsOptions();
                                }
                            ).toString() + ')'
                        }
                    }
                }
            }

            // if (oldOpts) {
            //     for (var x in LS.opts) {
            //         var y1 = LS.opts[x]
            //         var y2 = oldOpts[x]

            //         y1.type = y1.type || ""
            //         y2.type = y2.type || ""
            //         if ((y1.type === y2.type && y1.type !== "") || typeof y1.value === typeof y2.value)
            //             y2.value = y2.value
            //     }
            // }

            dis.LS = LS
            var opts = LS.opts

            // console.log(LS, dis.LS, opts)
            dis.cmd("wrapperSetLocalStorage", LS, function() {})

            var cntrls = {
                "button": '<div class="col-3"><label class="form-label">Y_LABEL</label></div><div class="col-3"><button class="btn" type="button" name="sttngs-button-X" id="sttngs-button-X">Y_VALUE</button></div><div class="col-6">Y_DESC</div>',
                "input": '<div class="col-3><label class="form-label" for="sttngs-input-X">Y_LABEL</label></div><div class="col-3"><input class="form-input" type="text" name="sttngs-input-X" id="sttngs-input-X" placeholder="X" value="Y_VALUE" /></div><div class="col-6">Y_DESC</div>',
                "checkbox": '<div class="col-3"></div><div class="col-3"><label class="form-switch"><input type="checkbox" name="sttngs-checkbox-X" id="sttngs-checkbox-X" /><i class="form-icon"></i>Y_LABEL</label></div><div class="col-6">Y_DESC</div>',
                "select": '<div class="col-3"><label class="form-label" for="sttngs-select-X">Y_LABEL</label></div><div class="col-3"><select class="form-select" name="sttngs-select-X" id="sttngs-select-X">Y_VALUE</select></div><div class="col-6">Y_DESC</div>'
            }

            var sHTML = $('<form class="form-horizontal"></form>');

            for (var x in opts) {
                var y = opts[x]

                if (y === "") {
                    $('<hr>').appendTo(sHTML)
                    continue
                }

                y.type = y.type || "";

                (function(x, y, cntrls) {
                    // console.log(x, y)
                    if (y.type === "input" || (typeof y.value === "string" && y.type === "")) {
                        var el = $('<div class="form-group">' + (cntrls.input
                            .replace(/X/gm, x)
                            .replace(/Y_LABEL/gm, y.label)
                            .replace(/Y_DESC/gm, y.desc)
                            .replace(/Y_VALUE/gm, y.value)) + '</div>').appendTo(sHTML)
                        var el2 = el.find('#sttngs-input-' + x)[0]
                        var $el2 = $(el2)

                        $el2.on('change', function() {
                            page.LS.opts[x].value = this.value

                            page.LS = LS
                            page.cmd("wrapperSetLocalStorage", page.LS, function() {})

                            var r_ms = page.LS.opts[x].r_ms
                            if (typeof eval(page.LS.opts[x].cb.change) === "function")
                                eval(page.LS.opts[x].cb.change + '()')
                            if (r_ms)
                                page.loadMessages("r_ms")
                        })
                    } else if (y.type === "checkbox" || y.type === "switch" || (typeof y.value === "boolean" && y.type === "")) {
                        var el = $('<div class="form-group">' + (cntrls.checkbox
                            .replace(/X/gm, x)
                            .replace(/Y_LABEL/gm, y.label)
                            .replace(/Y_DESC/gm, y.desc)
                            .replace(/Y_VALUE/gm, y.value)) + '</div>').appendTo(sHTML)
                        var el2 = el.find('#sttngs-checkbox-' + x)[0]
                        var $el2 = $(el2)

                        el2.checked = y.value

                        $el2.on('change', function() {
                            page.LS.opts[x].value = this.checked

                            page.LS = LS
                            page.cmd("wrapperSetLocalStorage", page.LS, function() {})

                            var r_ms = page.LS.opts[x].r_ms
                            if (typeof eval(page.LS.opts[x].cb.change) === "function")
                                eval(page.LS.opts[x].cb.change + '()')
                            if (r_ms)
                                page.loadMessages("r_ms")
                        })
                    } else if (y.type === "select" || (y.values && y.values.constructor === Array && y.type === "")) {
                        var valuesHTML = ''
                        for (var vX in y.values) {
                            var vY = y.values[vX]
                            valuesHTML += '<option value="' + vY[0] + '">' + vY[1] + '</option>'
                        }
                        var el = $('<div class="form-group">' + (cntrls.select
                            .replace(/X/gm, x)
                            .replace(/Y_LABEL/gm, y.label)
                            .replace(/Y_DESC/gm, y.desc)
                            .replace(/Y_VALUE/gm, valuesHTML)) + '</div>').appendTo(sHTML)
                        var el2 = el.find('#sttngs-select-' + x)[0]
                        var $el2 = $(el2)
                        $el2.val(y.value)

                        $el2.on('change', function() {
                            page.LS.opts[x].value = this.value

                            page.LS = LS
                            page.cmd("wrapperSetLocalStorage", page.LS, function() {})

                            var r_ms = page.LS.opts[x].r_ms
                            if (typeof eval(page.LS.opts[x].cb.change) === "function")
                                eval(page.LS.opts[x].cb.change + '()')
                            if (r_ms)
                                page.loadMessages("r_ms")
                        })
                    } else if (y.type === "button") {
                        var el = $('<div class="form-group">' + (cntrls.button
                            .replace(/X/gm, x)
                            .replace(/Y_LABEL/gm, y.label)
                            .replace(/Y_DESC/gm, y.desc)
                            .replace(/Y_VALUE/gm, y.value)) + '</div>').appendTo(sHTML)
                        var el2 = el.find('#sttngs-button-' + x)[0]
                        var $el2 = $(el2)

                        $el2.on('click', function() {
                            var r_ms = page.LS.opts[x].r_ms
                            if (typeof eval(page.LS.opts[x].cb.click) === "function")
                                eval(page.LS.opts[x].cb.click + '()')
                            if (r_ms)
                                page.loadMessages("r_ms")
                        })
                    }
                    // console.log(el, el2)
                })(x, y, cntrls)
            }
            sHTML.appendTo('#sttngs_container')
            $('#sttngs_container').children('.loading').remove()
        })
    }

    verifyUserFiles(cb1, cb2) {
        var data_inner_path = "data/users/" + this.site_info.auth_address + "/data.json"
        var data2_inner_path = "data/users/" + this.site_info.auth_address + "/data_private.json"
        var content_inner_path = "data/users/" + this.site_info.auth_address + "/content.json"

        function verifyData2() {
            page.cmd("fileGet", {
                "inner_path": data2_inner_path,
                "required": false
            }, (data) => {
                // console.log("BEFORE 1", data)
                if (data)
                    var data = JSON.parse(data)
                else
                    var data = {}
                var olddata = JSON.parse(JSON.stringify(data))
                console.log("BEFORE 2", olddata)

                var curpversion = 2
                if (data.pversion !== curpversion)
                    data = {
                        "pversion": curpversion
                    }

                if (!data.hasOwnProperty("private_messages"))
                    data.private_messages = []
                if (!data.hasOwnProperty("private_messages_with"))
                    data.private_messages_with = []

                console.log("VERIFIED data_private.json", olddata, data)

                var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
                var json_rawA = btoa(json_raw)

                if (JSON.stringify(data) !== JSON.stringify(olddata)) {
                    console.log("data_private.json HAS RECEIVED A UPDATE!")
                    page.cmd("fileWrite", [
                        data2_inner_path,
                        json_rawA
                    ], (res) => {
                        if (res == "ok") {
                            console.log("data_private.json HAS BEEN UPDATED!")
                        } else {
                            page.cmd("wrapperNotification", [
                                "error", "File write error: " + JSON.stringify(res)
                            ])
                        }
                    })
                }
            })
        }

        function verifyData(cb1, cb2) {
            page.cmd("fileGet", {
                "inner_path": data_inner_path,
                "required": false
            }, (data) => {
                if (data)
                    var data = JSON.parse(data)
                else
                    var data = {}
                var olddata = JSON.parse(JSON.stringify(data))

                var curpversion = 2
                if (data.pversion !== curpversion) {
                    data.pversion = curpversion
                    data.private_messages = []
                }

                if (!data.hasOwnProperty("messages"))
                    data.messages = []
                    // data.messages = [{
                    //     "body": emojione.toShort("## Joined ThunderWave :wave::blush:"),
                    //     "date_added": parseInt(moment().utc().format("x"))
                    // }]
                if (!data.hasOwnProperty("images"))
                    data.images = []
                if (!data.hasOwnProperty("last_seen") || parseInt(moment().utc().format("x")) !== data.last_seen)
                    data.last_seen = parseInt(moment().utc().format("x"))
                if (!data.hasOwnProperty("private_messages"))
                    data.private_messages = []
                if (!data.hasOwnProperty("public_key") || !data.public_key) {
                    page.cmd("userPublickey", [], (public_key) => {
                        data.public_key = public_key
                        verifyData_2(data, olddata, cb1, cb2)
                    })
                } else {
                    verifyData_2(data, olddata, cb1, cb2)
                }
            })
        }

        function verifyData_2(data, olddata, cb1, cb2) {
            console.log("VERIFIED data.json", olddata, data)

            var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
            var json_rawA = btoa(json_raw)

            if (JSON.stringify(data) !== JSON.stringify(olddata)) {
                console.log("data.json HAS RECEIVED A UPDATE!")
                page.cmd("fileWrite", [
                    data_inner_path,
                    json_rawA
                ], (res) => {
                    if (res == "ok") {
                        console.log("data.json HAS BEEN UPDATED!")

                        if (typeof cb1 === "function")
                            cb1(data, olddata)
                        verifyContent(data, olddata, cb2)
                    } else {
                        page.cmd("wrapperNotification", [
                            "error", "File write error: " + JSON.stringify(res)
                        ])
                    }
                })
            } else
                verifyContent(data, olddata, cb2)
        }

        function verifyContent(data, olddata, cb2) {
            page.cmd("fileGet", {
                "inner_path": content_inner_path,
                "required": false
            }, (data2) => {
                if (data2)
                    var data2 = JSON.parse(data2)
                else
                    var data2 = {}
                var olddata2 = JSON.parse(JSON.stringify(data2))

                var curoptional = ".+\\.(png|jpg|jpeg|gif|mp3|ogg)"
                var curignore = "(?!(.+\\.(png|jpg|jpeg|gif|mp3|ogg)|data.json))"
                if (!data2.hasOwnProperty("optional") || data2.optional !== curoptional)
                    data2.optional = curoptional
                if (!data2.hasOwnProperty("ignore") || data2.ignore !== curignore)
                    data2.ignore = curignore
                console.log("VERIFIED content.json", olddata2, data2)

                var json_raw2 = unescape(encodeURIComponent(JSON.stringify(data2, undefined, '\t')))
                var json_rawA2 = btoa(json_raw2)

                if (JSON.stringify(data2) !== JSON.stringify(olddata2) || JSON.stringify(data) !== JSON.stringify(olddata)) {
                    console.log("content.json HAS RECEIVED A UPDATE!")
                    page.cmd("fileWrite", [
                        content_inner_path,
                        json_rawA2
                    ], (res) => {
                        if (res == "ok") {
                            console.log("content.json HAS BEEN UPDATED!")
                            if (typeof cb2 === "function")
                                cb2(data2, olddata2)
                            page.cmd("siteSign", {
                                "inner_path": content_inner_path
                            }, (res) => {
                                page.cmd("sitePublish", {
                                    "inner_path": content_inner_path,
                                    "sign": false
                                }, function() {
                                    // console.log(data.messages, data.messages.length)
                                    if (data.messages.length === 1)
                                        page.cmd("wrapperNotification", [
                                            "done", "Your first message was sent successfully! :)"
                                        ])
                                })
                            })
                        } else {
                            page.cmd("wrapperNotification", [
                                "error", "File write error: " + JSON.stringify(res)
                            ])
                        }
                    })
                }
            })
        }
        verifyData(cb1, cb2)
        verifyData2()
    }

    verifyUser() {
        var rtrn = true

        // if (this.site_info.settings.permissions.indexOf("Merger:ZeroMe") === -1) {
        //     rtrn = false
        //     this.cmd("wrapperPermissionAdd", "Merger:ZeroMe", function(res) {
        //         if (res === "Granted") {
        //             rtrn = true
        //             page.cmd("mergerSiteList", {}, (res) => {
        //                 console.log(res)
        //             })
        //         } else {
        //             console.log("Error in permission-granting", res)
        //         }
        //     })
        // }
        if (!this.site_info.cert_user_id) {
            rtrn = false
            this.cmd("wrapperNotification", [
                "info", "Please, select your account.", 5000
            ])
            this.selectUser()
        }
        return rtrn
    }

    onOpenWebsocket() {
        this.setSettingsOptions()

        this.cmd("siteInfo", {}, (site_info) => {
            this.site_info = site_info
            this.setSiteInfo(site_info)
            if (site_info.cert_user_id) {
                // $("#select_user").text(site_info.cert_user_id)

                this.verifyUserFiles()
                this.messageCounterArr = {}
                this.loadMessages("first time")
            }
        })

        console.log("Ready to call ZeroFrame API!")
    }
}
page = new ThunderWave();


/* ---- /1CWkZv7fQAKxTVjZVrLZ8VHcrN6YGGcdky/js/pnglib.js ---- */


/**
 * A handy class to calculate color values.
 *
 * @version 1.0
 * @author Robert Eisele <robert@xarg.org>
 * @copyright Copyright (c) 2010, Robert Eisele
 * @link http://www.xarg.org/2010/03/generate-client-side-png-files-using-javascript/
 * @license http://www.opensource.org/licenses/bsd-license.php BSD License
 *
 */

(function() {

    // helper functions for that ctx
    function write(buffer, offs) {
        for (var i = 2; i < arguments.length; i++) {
            for (var j = 0; j < arguments[i].length; j++) {
                buffer[offs++] = arguments[i].charAt(j);
            }
        }
    }

    function byte2(w) {
        return String.fromCharCode((w >> 8) & 255, w & 255);
    }

    function byte4(w) {
        return String.fromCharCode((w >> 24) & 255, (w >> 16) & 255, (w >> 8) & 255, w & 255);
    }

    function byte2lsb(w) {
        return String.fromCharCode(w & 255, (w >> 8) & 255);
    }

    // modified from original source to support NPM
    var PNGlib = function(width, height, depth) {

        this.width = width;
        this.height = height;
        this.depth = depth;

        // pixel data and row filter identifier size
        this.pix_size = height * (width + 1);

        // deflate header, pix_size, block headers, adler32 checksum
        this.data_size = 2 + this.pix_size + 5 * Math.floor((0xfffe + this.pix_size) / 0xffff) + 4;

        // offsets and sizes of Png chunks
        this.ihdr_offs = 0; // IHDR offset and size
        this.ihdr_size = 4 + 4 + 13 + 4;
        this.plte_offs = this.ihdr_offs + this.ihdr_size; // PLTE offset and size
        this.plte_size = 4 + 4 + 3 * depth + 4;
        this.trns_offs = this.plte_offs + this.plte_size; // tRNS offset and size
        this.trns_size = 4 + 4 + depth + 4;
        this.idat_offs = this.trns_offs + this.trns_size; // IDAT offset and size
        this.idat_size = 4 + 4 + this.data_size + 4;
        this.iend_offs = this.idat_offs + this.idat_size; // IEND offset and size
        this.iend_size = 4 + 4 + 4;
        this.buffer_size = this.iend_offs + this.iend_size; // total PNG size

        this.buffer = new Array();
        this.palette = new Object();
        this.pindex = 0;

        var _crc32 = new Array();

        // initialize buffer with zero bytes
        for (var i = 0; i < this.buffer_size; i++) {
            this.buffer[i] = "\x00";
        }

        // initialize non-zero elements
        write(this.buffer, this.ihdr_offs, byte4(this.ihdr_size - 12), 'IHDR', byte4(width), byte4(height), "\x08\x03");
        write(this.buffer, this.plte_offs, byte4(this.plte_size - 12), 'PLTE');
        write(this.buffer, this.trns_offs, byte4(this.trns_size - 12), 'tRNS');
        write(this.buffer, this.idat_offs, byte4(this.idat_size - 12), 'IDAT');
        write(this.buffer, this.iend_offs, byte4(this.iend_size - 12), 'IEND');

        // initialize deflate header
        var header = ((8 + (7 << 4)) << 8) | (3 << 6);
        header += 31 - (header % 31);

        write(this.buffer, this.idat_offs + 8, byte2(header));

        // initialize deflate block headers
        for (var i = 0;
            (i << 16) - 1 < this.pix_size; i++) {
            var size, bits;
            if (i + 0xffff < this.pix_size) {
                size = 0xffff;
                bits = "\x00";
            } else {
                size = this.pix_size - (i << 16) - i;
                bits = "\x01";
            }
            write(this.buffer, this.idat_offs + 8 + 2 + (i << 16) + (i << 2), bits, byte2lsb(size), byte2lsb(~size));
        }

        /* Create crc32 lookup table */
        for (var i = 0; i < 256; i++) {
            var c = i;
            for (var j = 0; j < 8; j++) {
                if (c & 1) {
                    c = -306674912 ^ ((c >> 1) & 0x7fffffff);
                } else {
                    c = (c >> 1) & 0x7fffffff;
                }
            }
            _crc32[i] = c;
        }

        // compute the index into a png for a given pixel
        this.index = function(x, y) {
            var i = y * (this.width + 1) + x + 1;
            var j = this.idat_offs + 8 + 2 + 5 * Math.floor((i / 0xffff) + 1) + i;
            return j;
        }

        // convert a color and build up the palette
        this.color = function(red, green, blue, alpha) {

            alpha = alpha >= 0 ? alpha : 255;
            var color = (((((alpha << 8) | red) << 8) | green) << 8) | blue;

            if (typeof this.palette[color] == "undefined") {
                if (this.pindex == this.depth) return "\x00";

                var ndx = this.plte_offs + 8 + 3 * this.pindex;

                this.buffer[ndx + 0] = String.fromCharCode(red);
                this.buffer[ndx + 1] = String.fromCharCode(green);
                this.buffer[ndx + 2] = String.fromCharCode(blue);
                this.buffer[this.trns_offs + 8 + this.pindex] = String.fromCharCode(alpha);

                this.palette[color] = String.fromCharCode(this.pindex++);
            }
            return this.palette[color];
        }

        // output a PNG string, Base64 encoded
        this.getBase64 = function() {

            var s = this.getDump();

            var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var c1, c2, c3, e1, e2, e3, e4;
            var l = s.length;
            var i = 0;
            var r = "";

            do {
                c1 = s.charCodeAt(i);
                e1 = c1 >> 2;
                c2 = s.charCodeAt(i + 1);
                e2 = ((c1 & 3) << 4) | (c2 >> 4);
                c3 = s.charCodeAt(i + 2);
                if (l < i + 2) { e3 = 64; } else { e3 = ((c2 & 0xf) << 2) | (c3 >> 6); }
                if (l < i + 3) { e4 = 64; } else { e4 = c3 & 0x3f; }
                r += ch.charAt(e1) + ch.charAt(e2) + ch.charAt(e3) + ch.charAt(e4);
            } while ((i += 3) < l);
            return r;
        }

        // output a PNG string
        this.getDump = function() {

            // compute adler32 of output pixels + row filter bytes
            var BASE = 65521; /* largest prime smaller than 65536 */
            var NMAX = 5552; /* NMAX is the largest n such that 255n(n+1)/2 + (n+1)(BASE-1) <= 2^32-1 */
            var s1 = 1;
            var s2 = 0;
            var n = NMAX;

            for (var y = 0; y < this.height; y++) {
                for (var x = -1; x < this.width; x++) {
                    s1 += this.buffer[this.index(x, y)].charCodeAt(0);
                    s2 += s1;
                    if ((n -= 1) == 0) {
                        s1 %= BASE;
                        s2 %= BASE;
                        n = NMAX;
                    }
                }
            }
            s1 %= BASE;
            s2 %= BASE;
            write(this.buffer, this.idat_offs + this.idat_size - 8, byte4((s2 << 16) | s1));

            // compute crc32 of the PNG chunks
            function crc32(png, offs, size) {
                var crc = -1;
                for (var i = 4; i < size - 4; i += 1) {
                    crc = _crc32[(crc ^ png[offs + i].charCodeAt(0)) & 0xff] ^ ((crc >> 8) & 0x00ffffff);
                }
                write(png, offs + size - 4, byte4(crc ^ -1));
            }

            crc32(this.buffer, this.ihdr_offs, this.ihdr_size);
            crc32(this.buffer, this.plte_offs, this.plte_size);
            crc32(this.buffer, this.trns_offs, this.trns_size);
            crc32(this.buffer, this.idat_offs, this.idat_size);
            crc32(this.buffer, this.iend_offs, this.iend_size);

            // convert PNG to string
            return "\211PNG\r\n\032\n" + this.buffer.join('');
        }
    }

    // modified from original source to support NPM
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = PNGlib;
    } else {
        window.PNGlib = PNGlib;
    }
})();


/* ---- /1CWkZv7fQAKxTVjZVrLZ8VHcrN6YGGcdky/js/svg4everybody.min.js ---- */


!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()}):"object"==typeof module&&module.exports?module.exports=b():a.svg4everybody=b()}(this,function(){function a(a,b,c){if(c){var d=document.createDocumentFragment(),e=!b.hasAttribute("viewBox")&&c.getAttribute("viewBox");e&&b.setAttribute("viewBox",e);for(var f=c.cloneNode(!0);f.childNodes.length;)d.appendChild(f.firstChild);a.appendChild(d)}}function b(b){b.onreadystatechange=function(){if(4===b.readyState){var c=b._cachedDocument;c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),b._embeds.splice(0).map(function(d){var e=b._cachedTarget[d.id];e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),a(d.parent,d.svg,e)})}},b.onreadystatechange()}function c(c){function e(){for(var c=0;c<o.length;){var h=o[c],i=h.parentNode,j=d(i);if(j){var k=h.getAttribute("xlink:href")||h.getAttribute("href");if(f)if(!g.validate||g.validate(k,j,h)){i.removeChild(h);var l=k.split("#"),q=l.shift(),r=l.join("#");if(q.length){var s=m[q];s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),s._embeds.push({parent:i,svg:j,id:r}),b(s)}else a(i,j,document.getElementById(r))}else++c,++p}else++c}(!o.length||o.length-p>0)&&n(e,67)}var f,g=Object(c),h=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,i=/\bAppleWebKit\/(\d+)\b/,j=/\bEdge\/12\.(\d+)\b/,k=/\bEdge\/.(\d+)\b/,l=window.top!==window.self;f="polyfill"in g?g.polyfill:h.test(navigator.userAgent)||(navigator.userAgent.match(j)||[])[1]<10547||(navigator.userAgent.match(i)||[])[1]<537||k.test(navigator.userAgent)&&l;var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use"),p=0;f&&e()}function d(a){for(var b=a;"svg"!==b.nodeName.toLowerCase()&&(b=b.parentNode););return b}return c});