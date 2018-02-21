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



function openNewTab(url) {
    page.cmd("wrapperOpenWindow", [url, "_blank", ""])
    return false
}

function ownLink(q) {
    page.cmd('wrapperPushState', [null, '', q])
    $(window).scrollTop(0)

    return false
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(:([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



Math.seed = function(s) {
    return function() {
        s = Math.sin(s) * 10000
        return s - Math.floor(s)
    }
}

generateGUID = (typeof(window.crypto) != 'undefined' &&
        typeof(window.crypto.getRandomValues) != 'undefined') ?
    function() {
        // If we have a cryptographically secure PRNG, use that
        // https://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
        var buf = new Uint16Array(8);
        window.crypto.getRandomValues(buf);
        var S4 = function(num) {
            var ret = num.toString(16);
            while (ret.length < 4) {
                ret = "0" + ret;
            }
            return ret;
        };
        return (S4(buf[0]) + S4(buf[1]) + "-" + S4(buf[2]) + "-" + S4(buf[3]) + "-" + S4(buf[4]) + "-" + S4(buf[5]) + S4(buf[6]) + S4(buf[7]));
    }

:

function() {
    // Otherwise, just use Math.random
    // https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};



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

    var caudio = res.inner_path.match('.+\\.(.*)')[1]
    var isaudio = (caudio === "mp3" || caudio === "ogg")

    var cvideo = res.inner_path.match('.+\\.(.*)')[1]
    var isvideo = (cvideo === "ogg" || cvideo === "mp4")

    if (isgif) {
        imgHTML = '<img data-gifffer="' + href +
            '" data-gifffer-alt="' + text +
            '" class="img-responsive rounded" ' +
            (title ? ('title="' + title + '"') : (text ? ('title="' + text + '"') : '')) +
            (markedR.options.xhtml ? '/>' : '>')
    } else if (isaudio) {
        imgHTML = '<audio controls crossorigin2="anonymous" src="' + href + '"' +
            (title ? ('title="' + title + '"') : (text ? ('title="' + text + '"') : '')) +
            '></audio>'
    } else if (isvideo) {
        imgHTML = '<video class="video-responsive rounded" controls crossorigin2="anonymous" src="' + href + '"' +
            (title ? ('title="' + title + '"') : (text ? ('title="' + text + '"') : '')) +
            '></video>'
    } else {
        imgHTML = '<img src="' + href +
            '" alt="' + text +
            '" class="img-responsive rounded" ' +
            (title ? ('title="' + title + '"') : (text ? ('title="' + text + '"') : '')) +
            (markedR.options.xhtml ? '/>' : '>')
    }
    return '<div class="popover hasimage isgif-' + isgif + '"><div class="popoverimgC">' +
        imgHTML +
        '</div><div class="popover-container">' +
        '<div class="card ' + (page.LS.opts.theme_message_dark.value ? '' : 'light') + '"><div class="card-header">' +
        (title ? ('<div class="card-title">' + title + '</div>') :
            (text ? ('<div class="card-title">' + text + '</div>') : '')) +
        (title && text ? ('<div class="card-subtitle">' + text + '</div>') : '') +
        '</div><div class="card-body">Peers: ' +
        res.peer + '<br>Size: ' + res.size +
        '<br>Type: ' + res.inner_path.match('.+\\.(.*)')[1] +
        '</div><div class="card-footer"><button class="btn" onclick="page.imageDeleter(this, \'' +
        href + '\', \'' + escape(title) + '\', \'' + escape(text) +
        '\'); return false;">Delete file</button><a class="btn btn-link" href="' +
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
    addMessage(msgkey, username, message, date_added, addattop, classes, toListEl) {
        var classes = classes || ""
        var toListEl = toListEl || "#messages"

        // var message_escaped = message.replace(/</g, "&lt;").replace(/>/g, "&gt;") // Escape html tags in the message
        var message_escaped = message

        // var addattop = addattop || false

        var message_pic = '<div avatarimg="' + username + '"></div>'
            // if (parseInt(page.LS.opts.avatar_size.value) !== 0) {
            //     this.identicons = this.identicons || {}
            //     var asv = parseInt(page.LS.opts.avatar_size.value) || 64
            //     if (!this.identicons.hasOwnProperty(asv)) {
            //         this.identicons[asv] = {}
            //     }
            //     if (!this.identicons.hasOwnProperty(username)) {
            //         var uhash = stringToHex(username).split(' ').join('')
            //         this.identicons[asv][username] = new Identicon(uhash, {
            //             margin: 0.2,
            //             size: asv,
            //             format: 'svg'
            //         }).toString()
            //     }
            //     var idata = this.identicons[asv][username]
            // }
            // var message_pic = (typeof idata !== "undefined" ? "<img src='data:image/svg+xml;base64," + idata + "' />" : "")

        var mmnt = moment(date_added, "x")

        var curdate = mmnt.format("MMMM Do, YYYY")
        var curtime = mmnt.format("HH:mm:ss")

        var curdate2 = moment(curdate, "MMMM Do, YYYY").format("x")
        var rcurdate = moment().format("MMMM Do, YYYY")
        var curdate3 = (curdate === rcurdate ? "Today" : (moment(rcurdate, "MMMM Do, YYYY").subtract(1, "d").format("MMMM Do, YYYY") === curdate ? "Yesterday" : curdate));
        var CDalreadyexists = $(toListEl).find('[timestamp-date="' + curdate2 + '"]')[0] || false

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
            CDalreadyexists = $("<li id='d_" + curdate2 + "' timestamp-date='" + curdate2 + "'><div class='divider text-center' data-content='" + (curdate3) + "' onclick='window.location.hash=\"#d_" + curdate2 + "\"; return false;'></div><ul class='times-messages unstyled'></ul></li>")
                // if (addattop && !thismessageis.after)
                //     CDalreadyexists = CDalreadyexists.prependTo(toListEl)
                // else
            CDalreadyexists = CDalreadyexists.appendTo(toListEl)

            var items = $(toListEl).children("[timestamp-date]").get()

            // console.log("ITEMS: ", items)
            items.sort(function(a, b) {
                var A = parseInt($(a).attr('id').split("d_")[1])
                var B = parseInt($(b).attr('id').split("d_")[1])

                // console.log("A >> " + a + " :: " + A, "B >> " + b + " :: " + B)
                if (A < B) return -1
                if (A > B) return 1
                return 0
            });
            $(toListEl).html("").append(items)

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

        var message_timestamp = ('<a class="message-timestamp ' + (page.LS.opts.show_timestamps.value ? "" : "hide") + '" href="#" onclick="answer2MSG(\'tc_' + msgkey + '\'); return false;' + /*#tc_' + msgkey + '*/ '">' + curtime + '</a>')
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
            .replace(/(?:\?\!\[tc_((.*?)(.{8}-.{4}-.{4}-.{4}-.{12}))\])/gm, function(match, p1) {
                if (page.LS.opts.parse_quotes.value)
                    page.quoteDisplayer(p1)

                return '<div id="QUOTEREPLACE_' + p1 + '" class="' + (page.LS.opts.parse_quotes.value ? 'icon icons loading' : '') + '"><cite><q>?![tc_' + p1 + '</q> (Quote)</cite></div>'
            })
            // Maybe rather just use the existing imageViewGen, and modify the stuff related with it
            // That would be, I believe, much easier to achieve, and a lot cleaner,
            // than copying all the stuff from it, and modifying that.!
            .replace(/(?:\[(.+)\]!a!\((.+)\))/gm, function(match, p1, p2) {
                return markedR.image(p2, p1, p1)
            })
            .replace(/(?:\[(.+)\]!v!\((.+)\))/gm, function(match, p1, p2) {
                return markedR.image(p2, p1, p1)
            })
        if (!page.LS.opts.disable_emojis.value)
            message_parsed = emojione.toImage(message_parsed)

        // console.log(CDalreadyexists, CDalreadyexistsC)

        var msg_part_2_1 = '<div id="tc_' + msgkey + '" tc="' + date_added + '" class="card mb-5 ' + (page.LS.opts.theme_message_dark.value ? '' : 'light') + ' ' + classes + '">' +
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

            var el = $('<li id="t_' + msgkey + '" t="' + date_added + '" class="message-container ' + (user_is_mentioned ? "user-is-mentioned " : "") + '" message-owner="' + username + '" users-own-message="' + users_own_message + '"><div class="tile ' + (page.LS.opts.theme_message_dark.value ? '' : 'light') + '">' + (users_own_message ? (msg_part_2 + msg_part_1) : (msg_part_1 + msg_part_2)) + '</div></li>')

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

    addBotMSG(message, addattop, toListEl) {
        var toListEl = toListEl || "#messages"

        var username = page.site_info.cert_user_id
        var date_added = moment()

        var classesO = "bot-msg"
        var classesB = "bot-msg"

        page.addMessage('BotQuestion-' + generateGUID(), username, message, date_added, true, classesO, toListEl)

        page.bot(message.substr('/'.length, message.length), page.site_info.cert_user_id, function(answer, err) {
            console.log(answer, err)

            classesB += ' ' + err

            if (answer)
                page.addMessage('BotAnswer-' + generateGUID(), "Bot >> " + username, answer, date_added, true, classesB, toListEl)
        })
    }

    bot(message, username, cb) {
        if (typeof cb !== "function")
            return false

        console.log("Bottin", message, username, cb)

        var answer = ''
        var err = ''

        var messageArr = message.split(' ')
        var cmd = messageArr.splice(0, 1)[0]

        var nyI = function() {
            answer = 'Command not yet implemented: `' +
                cmd + '`'
            err = 'warning'
        }

        if (cmd === "help") {
            answer = '`/help`: Shows this message' +
                '\n`/rules`: Prints all rules' +
                '\n`/avatar`: Shows how to set the avatar' +
                '\n`/opc [us@idp]`: Open private chat with given user' +
                '\n`/ogc [gid]`: Open group chat with given group-id' +
                '\n`/sp [us@idp] [msg]`: Send private message (without changing to private chat)' +
                '\n`/sg [gid] [msg]`: Send group message (without changing to group chat)' +
                '\n`/whois [us@idp]`: Prints information about the given user' +
                '\n' +
                '\n`us` stands for username e.g. `glightstar`' +
                '\n`idp` stands for "ID-Provider" e.g. `zeroid.bit`' +
                '\n`gid` stands for Group-ID e.g. `Abcdefghijklmnopqrstuvwxyz`'
            err = 'secondary'
        } else if (cmd === "rules") {
            answer = 'These rules are not like a EULA where the user actually has to completely accept them, but rather they should provide a clear list of things that are or are not allowed/ supported/ accepted by me, @glightstar.' +
                '\n - Do not post explicit media of any sort in the lobby. "Explicit" standing for stuff like pornography and similar.' +
                '\n - Discussions are always welcome, but please keep in mind, that everybody is allowed to have their own opinion on any topic.'
            err = 'secondary'
        } else if (cmd === "avatar") {
            answer = 'To change your avatar on ThunderWave, you need to modify your `data.json`-File, and set `avatar_type` in `extra_data` to:' +
                '\n 1. `0` if you want the generated avatar' +
                '\n 2. `1` if you want that users load the profile-pic from ThunderWave' +
                '\n 3. `2` if you want that they load it from ZeroMe' +
                '\nThis requires you to use the same ID on both ZeroMe and ThunderWave!' +
                '\n\nSo afterwards it could look something like this (_some stuff has been removed from here!_):' +
                '\n```' +
                '\n...' +
                '\n"extra_data": [' +
                '\n    {' +
                '\n        "avatar_file_name": "avatar.jpg", // For ThunderWave-Avatar' +
                '\n        "avatar_type": 2, // E.g. for ZeroMe' +
                '\n    }' +
                '\n]' +
                '\n...' +
                '\n```' +
                '\n\nYour `data.json`-File is located here:' +
                '\n`[Path to ZeroNet-Installation-Directory]/data/1CWkZv7fQAKxTVjZVrLZ8VHcrN6YGGcdky/data/users/' + page.site_info.auth_address + '/data.json`' +
                '\n\nYou might need to go into the settings-page (through the menu-button in the upper-right corner), and change `Allow specific avatar-types only` to `TW & ZM` or `ZM`'
            err = 'secondary'
        } else if (cmd === "opc") {
            page.loadPrivateMessages('selected user', true, messageArr[0])

            answer = "Opened private chat"
            err = 'success'
        } else if (cmd === "ogc") {
            page.loadGroupMessages('selected group', true, messageArr[0])

            answer = "Opened group chat"
            err = 'success'
        } else if (cmd === "sp") {
            var to = messageArr.splice(0, 1)[0]
            var msg = messageArr.join(' ')

            page.sendPrivateMessage(msg, to, false)

            answer = "Sent private message"
            err = 'success'
        } else if (cmd === "sg") {
            var to = messageArr.splice(0, 1)[0]
            var msg = messageArr.join(' ')

            page.sendGroupMessage(msg, to, false)

            answer = "Sent group message"
            err = 'success'
        } else if (cmd === "whois") {
            nyI()
        } else {
            answer = 'Command not found: `' +
                cmd +
                '`\nType `/help` for help.'
            err = 'error'
        }

        typeof cb === "function" && cb(answer, err)
    }

    addGroupMessage(msgkey, username, message, date_added, addattop) {
        var message_escaped = message

        var message_pic = '<div avatarimg="' + username + '"></div>'

        var mmnt = moment(date_added, "x")

        var curdate = mmnt.format("MMMM Do, YYYY")
        var curtime = mmnt.format("HH:mm:ss")

        var curdate2 = moment(curdate, "MMMM Do, YYYY").format("x")
        var rcurdate = moment().format("MMMM Do, YYYY")
        var curdate3 = (curdate === rcurdate ? "Today" : (moment(rcurdate, "MMMM Do, YYYY").subtract(1, "d").format("MMMM Do, YYYY") === curdate ? "Yesterday" : curdate));
        var CDalreadyexists = $("#group_messages").find('[G_timestamp-date="' + curdate2 + '"]')[0] || false

        // console.log("Adding GMSG", msgkey, username, message, date_added, addattop, curdate, curtime)

        var users_own_message = (username === page.site_info.cert_user_id)
        var user_is_mentioned = (message_escaped.match(new RegExp(page.site_info.cert_user_id + "|@" + page.site_info.cert_user_id.split("@")[0], "gmi"))) ? true : false
        var user_mention_badge = (page.LS.opts.user_mention_badge.value && user_is_mentioned) ? "badge" : ""

        var thismessageis = {
            "same_user": (page.lastgroupmessagewas.hasOwnProperty("username") && page.lastgroupmessagewas.username === username),
            "same_date": (page.lastgroupmessagewas.hasOwnProperty("curdate2") && page.lastgroupmessagewas.curdate2 === curdate2),
            "in_time_range": (page.lastgroupmessagewas.hasOwnProperty("date_added") && moment(page.lastgroupmessagewas.date_added, "x").add(15, "minutes").isSameOrAfter(date_added))
        }

        var dCDalreadyexists = CDalreadyexists === false ? false : true

        if (typeof CDalreadyexists !== "undefined" && CDalreadyexists !== false) {
            CDalreadyexists = $(CDalreadyexists)
        } else {
            CDalreadyexists = $("<li id='G_d_" + curdate2 + "' G_timestamp-date='" + curdate2 + "'><div class='divider text-center' data-content='" + (curdate3) + "' onclick='window.location.hash=\"#d_" + curdate2 + "\"; return false;'></div><ul class='times-messages unstyled'></ul></li>")
            CDalreadyexists = CDalreadyexists.appendTo("#group_messages")

            var items = $("#group_messages").children("[G_timestamp-date]").get()

            items.sort(function(a, b) {
                var A = parseInt($(a).attr('id').split("G_d_")[1])
                var B = parseInt($(b).attr('id').split("G_d_")[1])

                if (A < B) return -1
                if (A > B) return 1
                return 0
            });
            $("#group_messages").html("").append(items)
        }
        var CDalreadyexistsC = CDalreadyexists.children('.times-messages')

        var message_timestamp = ('<a class="message-timestamp ' + (page.LS.opts.show_timestamps.value ? "" : "hide") + '" href="#G_tc_' + msgkey + '" onclick="return false;">' + curtime + '</a>')

        var message_parsed = marked(message_escaped, {
                renderer: markedR
            })
            .replace(/((?:(?:[\w]+)@(?:zeroid|zeroverse|kaffie|cryptoid)\.bit)|@(?:[\w]+))/gmi, function(match, p1) { // ((?:[\w]+)@(?:zeroid|zeroverse)\.bit)
                var profile_link_part = (page.LS.opts.parse_profile_links.value ? '<a class="message-profile-link" onclick="add2MSGInput(\'' + p1 + ' \', 2); return false;" href="?u/' + encodeURI(p1) + '">' + p1 + '</a>' : '<span class="message-profile-link">' + p1 + '</span>')
                var isthisuser = (p1.match(new RegExp(page.site_info.cert_user_id + "|@" + page.site_info.cert_user_id.split("@")[0], "gmi"))) ? true : false
                return (isthisuser ? "<mark>" : "") + profile_link_part + (isthisuser ? "</mark>" : "")
            })
            .replace(/(?:\?\!\[tc_((.*?)(.{8}-.{4}-.{4}-.{4}-.{12}))\])/gm, function(match, p1) {
                if (page.LS.opts.parse_quotes.value)
                    page.quoteDisplayer(p1)

                return '<div id="QUOTEREPLACE_' + p1 + '" class="' + (page.LS.opts.parse_quotes.value ? 'icon icons loading' : '') + '"><cite><q>?![tc_' + p1 + '</q> (Quote)</cite></div>'
            })
        if (!page.LS.opts.disable_emojis.value)
            message_parsed = emojione.toImage(message_parsed)

        var msg_part_2_1 = '<div id="G_tc_' + msgkey + '" G_tc="' + date_added + '" class="card mb-5 ' + (page.LS.opts.theme_message_dark.value ? '' : 'light') + '">' +
            ((users_own_message || (thismessageis.same_user && thismessageis.same_date && thismessageis.in_time_range)) ? "" :
                '<div class="card-header"><small class="tile-title"><a onclick="add2MSGInput(\'' + username + ' \', 2); return false;" href="?u/' + encodeURI(username) + '">' + username + '</a></small></div>') + '<div class="card-body text-break">' +
            message_parsed + '</div><div class="' + (page.LS.opts.show_timestamps.value ? "" : "card-footer") + '"><small class="tile-subtitle float-right">' + message_timestamp + '</small></div></div>'

        if ( /*((users_own_message && thismessageis.same_user) || */ thismessageis.same_user /*)*/ && thismessageis.same_date && thismessageis.in_time_range) {
            var el = page.lastgroupmessagewas.el
            var el2 = $(msg_part_2_1).appendTo($(el).find('.tile-content'))

            var items = $(el).find('.tile-content').children('.card').get()

            items.sort(function(a, b) {
                var A = parseInt($(a).attr('G_tc'))
                var B = parseInt($(b).attr('G_tc'))

                if (A < B) return -1
                if (A > B) return 1
                return 0
            });
            $(el).find('.tile-content').html("").append(items)
        } else {
            var msg_part_1 = '<div class="tile-icon"><figure class="avatar avatar-lg message-user-avatar ' + user_mention_badge + '" data-initial="' + username.substr(0, 2) + '">' + message_pic + '</figure></div>',
                msg_part_2 = '<div class="tile-content">' + msg_part_2_1 + '</div>'

            var el = $('<li id="G_t_' + msgkey + '" G_t="' + date_added + '" class="message-container ' + (user_is_mentioned ? "user-is-mentioned " : "") + '" message-owner="' + username + '" users-own-message="' + users_own_message + '"><div class="tile ' + (page.LS.opts.theme_message_dark.value ? '' : 'light') + '">' + (users_own_message ? (msg_part_2 + msg_part_1) : (msg_part_1 + msg_part_2)) + '</div></li>')

            el = el.appendTo(CDalreadyexistsC)

            var items = CDalreadyexistsC.children("li.message-container").get()

            items.sort(function(a, b) {
                var A = parseInt($(a).attr('G_t'))
                var B = parseInt($(b).attr('G_t'))

                if (A < B) return -1
                if (A > B) return 1
                return 0
            });
            CDalreadyexistsC.html("").append(items)
        }

        page.lastgroupmessagewas = {
            "username": username,
            "curdate2": curdate2,
            "date_added": date_added,
            "el": el
        }
        if (page.firstgroupmessagewas.date_added > date_added)
            page.firstgroupmessagewas.date_added = date_added
    }

    sendGroupMessage(message3, group2, show) {
        var verified = this.verifyUser()
        if (!verified)
            return false

        // this.verifyUserFiles()

        var group2 = group2 || false
        var group = group2 || $('#group_recipient').val()
        if (!group)
            group = Math.random().toString(36).substring(2).toString()

        var rgroup = group;
        if (group.length < 16) {
            var addStr = Math.seed(group.charCodeAt(0))().toString().substring(2) + Math.seed(group.charCodeAt(1))().toString().substring(2);
            group += addStr;
            // console.log("AddStr: ", addStr, group);
        }

        var bR = btoa(group.substr(group.length / 2 % 7, group.length / 3 % 5) + group.substr((group.length * group.length % 3) + 1) + group.substr(group.length - 3, 2) + group)

        var message3 = message3 || false
        var message2 = message3 || $('#group_message').val()
        var message = message2
            .replace(/\n{3,}/gm, "\n\n")
            .trim()

        if (!message3)
            $('#group_message').val("")
        autosize.update($('#group_message'))

        if (/^\/(.+)?/.test(message)) {
            console.log("CMD-MSG", message)

            $('#group_message').val("")
            autosize.update($('#group_message'))

            // page.loadPrivateMessages("sent group message", true)

            page.addBotMSG(message, false, '#group_messages')

            return false
        }

        var show = show || false

        var data_inner_path = "data/users/" + this.site_info.auth_address + "/data.json"

        console.log("LOLO", message3, message2, message, group2, group)

        this.cmd("fileGet", {
            "inner_path": data_inner_path,
            "required": false
        }, (data) => {
            if (data)
                var data = JSON.parse(data)
            else
                var data = {}

            if (!data.hasOwnProperty("group_messages"))
                data.group_messages = []

            var msg_date_added = parseInt(moment().utc().format("x"))

            if (message && /\S/.test(message)) {
                page.cmd("aesEncrypt", [
                    JSON.stringify({
                        "group": group,
                        "body": emojione.toShort(message),
                        "date_added": msg_date_added
                    }),
                    bR,
                    bR
                ], (res) => {
                    console.log("Res: ", res)

                    // Add the new message to data
                    var di = data.group_messages.push({
                        "message": res[2]
                    })

                    // Encode data array to utf8 json text
                    var json_raw = unescape(encodeURIComponent(JSON.stringify(data), undefined, '\t'))
                    var json_rawA = btoa(json_raw)

                    // Write file to disk
                    page.cmd("fileWrite", [
                        data_inner_path,
                        json_rawA
                    ], (res2) => {
                        if (res2 == "ok") {
                            if (show)
                                page.loadGroupMessages("sent group message", true)

                            // Publish the file to other users
                            page.verifyUserFiles(null, function() {
                                console.log("Sent group message", {
                                    "group": group,
                                    "body": emojione.toShort(message),
                                    "SOMEWHAT-date_added": parseInt(moment().utc().format("x"))
                                })
                            })
                        } else {
                            page.cmd("wrapperNotification", [
                                "error", "File write error: " + JSON.stringify(res5)
                            ])
                        }
                    })
                })
            }
        })
    }

    loadGroupMessages(loadcode, override, group2, redirect) {
        var verified = this.verifyUser()
        if (!verified)
            return false

        var group2 = group2 || false
        var group = group2 || $('#group_recipient').val()

        if (!group)
            group = Math.random().toString(36).substring(2).toString()

        var rgroup = group;
        if (group.length < 16) {
            var addStr = Math.seed(group.charCodeAt(0))().toString().substring(2) + Math.seed(group.charCodeAt(1))().toString().substring(2);
            group += addStr;
            // console.log("AddStr: ", addStr, group);
        }

        var override = override || false
        var redirect = redirect === false ? false : true
        var goingback = goingback || false

        console.log("Loading group messages with code >" + loadcode + "<..", group, override, redirect, goingback)

        changeWorkinTabber('#main-tabs', 'GroupChat')

        page.addGroup(rgroup, function() {
            $('#group_recipient').val(rgroup)

            if (redirect)
                page.cmd("wrapperPushState", [
                    {},
                    "ThunderWave - ZeroNet",
                    "?GC:" + rgroup
                ])

            page.genGroupsList(function() {
                var $gl = $('#group_list')

                $gl.children('lui.active').removeClass('active')
                $gl.children('[tab="' + rgroup + '"]').addClass('active')
            })
        })

        page.cmd("dbQuery", [
            "SELECT * FROM group_messages LEFT JOIN json USING (json_id) WHERE NOT cert_user_id = '" + page.site_info.cert_user_id + "'"
        ], (messages1) => {
            // console.log(messages1)

            var $m = $('#group_messages')

            var message_design_type = parseInt(page.LS.opts.message_design_type.value)
            if (message_design_type === 1) {
                $m.removeAttr("design-type")
            } else {
                $m.attr("design-type", message_design_type)
            }

            if (override) {
                page.lastgroupmessagewas = ""
                $m.html('<div class="icon icons loading"></div>')
            }

            page.cmd("dbQuery", [
                "SELECT * FROM group_messages LEFT JOIN json USING (json_id) WHERE cert_user_id = '" + page.site_info.cert_user_id + "'"
            ], (messages2) => {
                // console.log(messages2)

                var first = true

                var messages = []

                var senders = []

                var checkLoops = function(l, x) {
                    if (eval("messages" + l + ".length > x + 1")) {
                        // console.log("Continuing " + l + ".. ", eval("messages" + l + ".length"), x + 1)
                        eval("loop" + l + "(x + 1)")
                    } else {
                        // console.log("Stopped " + l + ".")
                        if (l === 1 /* && sender !== page.site_info.cert_user_id*/ ) {
                            checkLoops(2, -1)
                        } else {
                            l = 2
                        }
                        if (l === 2) {
                            messages.sort(function(a, b) {
                                var A = a.msg.date_added
                                var B = b.msg.date_added

                                if (A < B) return -1
                                if (A > B) return 1
                                return 0
                            })

                            $m.children('.loading').remove()

                            for (var x3 = 0; x3 < messages.length; x3++) {
                                var y3 = messages[x3]

                                if (first) {
                                    page.firstgroupmessagewas = {
                                        "date_added": y3.msg.date_added
                                    }
                                    first = false
                                }

                                page.addGroupMessage(x3, y3.sender, y3.msg.body, y3.msg.date_added, override ? false : true)
                            }

                            for (var x in senders) {
                                var sender2 = senders[x];

                                (function(sender) {
                                    // console.log("LOADING IMAGE FOR ", sender)
                                    page.getAvatar(sender, (img, ov, ov_s, av, av_n, av_u, path) => {
                                        // console.log("IMAGE FOR ", sender, img, ov, ov_s, av, av_n, av_u, path)
                                        $('[avatarimg="' + sender + '"]').replaceWith(img)
                                    })
                                })(sender2)
                            }

                            config$bH(loadcode === "load more" || goingback, 2)
                        }
                    }
                }

                senders.push(page.site_info.cert_user_id)
                var loop2 = function(x2) {
                    var y2 = messages2[x2]

                    var bS = btoa(group.substr(group.length / 2 % 7, group.length / 3 % 5) + group.substr((group.length * group.length % 3) + 1) + group.substr(group.length - 3, 2) + group)
                    page.cmd("aesDecrypt", [
                        bS,
                        y2.message,
                        bS
                    ], (msg) => {
                        if (msg) {
                            var msg = JSON.parse(msg)
                            if (msg !== null) {
                                // console.log("own", x2, y2, msg)

                                messages.push({
                                    "id": y2.message_id,
                                    "msg": msg,
                                    "sender": page.site_info.cert_user_id
                                })
                            }

                            checkLoops(2, x2)
                        } else {
                            checkLoops(2, x2)
                        }
                    })
                }

                var loop1 = function(x1) {
                    var y1 = messages1[x1]

                    var bS = btoa(group.substr(group.length / 2 % 7, group.length / 3 % 5) + group.substr((group.length * group.length % 3) + 1) + group.substr(group.length - 3, 2) + group)
                    page.cmd("aesDecrypt", [
                        bS,
                        y1.message,
                        bS
                    ], (msg) => {
                        if (msg) {
                            var msg = JSON.parse(msg)
                            if (msg !== null) {
                                // console.log("other", x1, y1, msg)

                                messages.push({
                                    "id": y1.message_id,
                                    "msg": msg,
                                    "sender": y1.cert_user_id
                                })

                                if (senders.indexOf(y1.cert_user_id) === -1)
                                    senders.push(y1.cert_user_id)
                            }

                            checkLoops(1, x1)
                        } else {
                            checkLoops(1, x1)
                        }
                    })
                }

                if (messages1.length > 0) {
                    console.log("Starting group-chat load...", 1)
                    checkLoops(1, -1)
                } else if (messages2.length > 0) {
                    console.log("Starting group-chat load...", 2)
                    checkLoops(2, -1)
                }
            })
        })
    }

    addGroup(group, cb) {
        page.listGroups(function(data, gList) {
            console.log("Encrypting group", group, data, gList, gList.indexOf(group))
            if (gList.indexOf(group) === -1) {
                page.cmd("eciesEncrypt", [
                    group
                ], (group2) => {
                    console.log(group, "> ENCRYPTED GROUP >", group2)

                    // Add the new group to data
                    var di = data.group_messages_with.unshift(group2)

                    // Encode data array to utf8 json text
                    var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
                    var json_rawA = btoa(json_raw)

                    // Write file to disk
                    page.cmd("fileWrite", [
                        "data/users/" + page.site_info.auth_address + "/data_private.json",
                        json_rawA
                    ], (res) => {
                        if (res == "ok") {
                            // console.log("Added group", username)
                        } else {
                            page.cmd("wrapperNotification", [
                                "error", "File write error: " + JSON.stringify(res)
                            ])
                        }
                        if (typeof cb === "function")
                            cb(data, gList)
                    })
                })
            } else {
                console.log("Group already added")

                page.cmd("eciesEncrypt", [
                    group
                ], (group2) => {
                    // console.log("Moving group to index 0", gList.indexOf(group), group, gList, group2)

                    data.group_messages_with.splice(gList.indexOf(group), 1)
                    data.group_messages_with.splice(0, 0, group2)
                    gList.splice(gList.indexOf(group), 1)
                    gList.splice(0, 0, group)

                    // Encode data array to utf8 json text
                    var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
                    var json_rawA = btoa(json_raw)

                    // Write file to disk
                    page.cmd("fileWrite", [
                        "data/users/" + page.site_info.auth_address + "/data_private.json",
                        json_rawA
                    ], (res) => {
                        if (res == "ok") {
                            // console.log("Moved contact", group, gList.indexOf(group), gList)
                        } else {
                            page.cmd("wrapperNotification", [
                                "error", "File write error: " + JSON.stringify(res)
                            ])
                        }
                        if (typeof cb === "function")
                            cb(data, gList)
                    })
                })
            }
        })
    }

    genGroupsList(cb) {
        page.listGroups(function(data, gList) {
            var $gl = $('#group_list')

            var oldactive = $($gl.children('li.active')[0]).attr('tab')

            $gl.html("")

            for (var x in gList) {
                var y = gList[x]
                $gl.append('<li class="tab-item" tab="' + y + '"><a href="#" onclick="page.loadGroupMessages(\'selected group\', true, \'' + y + '\'); return false;">' + y + '</a></li>');
            }

            $gl.children('[tab="' + oldactive + '"]').addClass('active')

            typeof cb === "function" && cb()
        })
    }

    listGroups(cb) {
        var gList = []
        this.cmd("fileGet", {
            "inner_path": "data/users/" + this.site_info.auth_address + "/data_private.json",
            "required": false
        }, (data) => {
            if (data)
                var data = JSON.parse(data)
            else
                var data = {}

            if (!data.hasOwnProperty("group_messages_with"))
                data.group_messages_with = []

            var groups = JSON.parse(JSON.stringify(data.group_messages_with))

            if (groups.length > 0) {
                var addG = function(x) {
                    var x = x - 1
                    var y = groups[x]
                    page.cmd("eciesDecrypt", y, (group) => {
                        if (group)
                            gList.push(group)

                        if (x === 0) {
                            groups = groups.reverse()

                            if (typeof cb === "function")
                                cb(data, gList)
                        } else {
                            addG(x)
                        }
                    })
                }
                groups = groups.reverse()
                addG(groups.length)
            } else {
                if (typeof cb === "function")
                    cb(data, [])
            }
        })
    }

    addPrivateContact(username, cb) {
        page.listPrivateContacts(function(data, cList) {
            console.log("Encrypting username", username, data, cList, cList.indexOf(username))
            if (cList.indexOf(username) === -1) {
                page.cmd("eciesEncrypt", [
                    username
                ], (username2) => {
                    // console.log(username, "> ENCRYPTED USERNAME >", username2)

                    // Add the new contact to data
                    var di = data.private_messages_with.unshift(username2)

                    // Encode data array to utf8 json text
                    var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
                    var json_rawA = btoa(json_raw)

                    // Write file to disk
                    page.cmd("fileWrite", [
                        "data/users/" + page.site_info.auth_address + "/data_private.json",
                        json_rawA
                    ], (res) => {
                        if (res == "ok") {
                            // console.log("Added contact", username)
                        } else {
                            page.cmd("wrapperNotification", [
                                "error", "File write error: " + JSON.stringify(res)
                            ])
                        }
                        if (typeof cb === "function")
                            cb(data, cList)
                    })
                })
            } else {
                console.log("Contact already added")

                page.cmd("eciesEncrypt", [
                    username
                ], (username2) => {
                    // console.log("Moving contact to index 0", cList.indexOf(username), username, cList, username2)

                    data.private_messages_with.splice(cList.indexOf(username), 1)
                    data.private_messages_with.splice(0, 0, username2)
                    cList.splice(cList.indexOf(username), 1)
                    cList.splice(0, 0, username)

                    // Encode data array to utf8 json text
                    var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
                    var json_rawA = btoa(json_raw)

                    // Write file to disk
                    page.cmd("fileWrite", [
                        "data/users/" + page.site_info.auth_address + "/data_private.json",
                        json_rawA
                    ], (res) => {
                        if (res == "ok") {
                            // console.log("Moved contact", username, cList.indexOf(username), cList)
                        } else {
                            page.cmd("wrapperNotification", [
                                "error", "File write error: " + JSON.stringify(res)
                            ])
                        }
                        if (typeof cb === "function")
                            cb(data, cList)
                    })
                })
            }
        })
    }

    genContactsList(cb) {
        page.listPrivateContacts(function(data, cList) {
            var $pcl = $('#private_contacts_list')

            var oldactive = $($pcl.children('li.active')[0]).attr('tab')

            $pcl.html("")

            // $pcl.append('<li class="tab-item">|</li>')

            for (var x in cList) {
                var y = cList[x]
                $pcl.append('<li class="tab-item" tab="' + y + '"><a href="#" onclick="page.loadPrivateMessages(\'selected user\', true, \'' + y + '\'); return false;"><figure class="avatar avatar-sm" data-initial="' + y.substr(0, 2) + '"><div avatarimg="' + y + '"></div></figure> ' + y + '</a></li>');

                (function(_y) {
                    // console.log("Contacts list avatar", _y)
                    page.getAvatar(_y, (img) => {
                        // console.log("Got contacts list avatar", _y, img)
                        $('[avatarimg="' + _y + '"]').replaceWith(img)
                    })
                })(y)
            }

            $pcl.children('[tab="' + oldactive + '"]').addClass('active')

            typeof cb === "function" && cb()
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

            // console.log("lPC B", data)

            if (!data.hasOwnProperty("private_messages"))
                data.private_messages = []
            if (!data.hasOwnProperty("private_messages_with"))
                data.private_messages_with = []

            // console.log("lPC A", data)

            var contacts = JSON.parse(JSON.stringify(data.private_messages_with))

            // console.log("Listing contacts.. ", data.private_messages_with, data.private_messages_with.length, contacts, contacts.length)
            if (contacts.length > 0) {
                var addC = function(x) {
                    var x = x - 1
                    var y = contacts[x]
                        // console.log(x, y)
                    page.cmd("eciesDecrypt", y, (contact) => {
                        // console.log(x, y, contact)
                        if (contact)
                            cList.push(contact)

                        if (x === 0) {
                            contacts = contacts.reverse()

                            // console.log("Listing private contacts", data, cList)
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

        var message_pic = '<div avatarimg="' + username + '"></div>'
            // if (parseInt(page.LS.opts.avatar_size.value) !== 0) {
            //     this.identicons = this.identicons || {}
            //     var asv = parseInt(page.LS.opts.avatar_size.value) || 64
            //     if (!this.identicons.hasOwnProperty(asv)) {
            //         this.identicons[asv] = {}
            //     }
            //     if (!this.identicons.hasOwnProperty(username)) {
            //         var uhash = stringToHex(username).split(' ').join('')
            //         this.identicons[asv][username] = new Identicon(uhash, {
            //             margin: 0.2,
            //             size: asv,
            //             format: 'svg'
            //         }).toString()
            //     }
            //     var idata = this.identicons[asv][username]
            // }
            // var message_pic = (typeof idata !== "undefined" ? "<img src='data:image/svg+xml;base64," + idata + "' />" : "")

        var mmnt = moment(date_added, "x")

        var curdate = mmnt.format("MMMM Do, YYYY")
        var curtime = mmnt.format("HH:mm:ss")

        var curdate2 = moment(curdate, "MMMM Do, YYYY").format("x")
        var rcurdate = moment().format("MMMM Do, YYYY")
        var curdate3 = (curdate === rcurdate ? "Today" : (moment(rcurdate, "MMMM Do, YYYY").subtract(1, "d").format("MMMM Do, YYYY") === curdate ? "Yesterday" : curdate));
        var CDalreadyexists = $("#private_messages").find('[P_timestamp-date="' + curdate2 + '"]')[0] || false

        // console.log("Adding PMSG", msgkey, username, message, date_added, addattop, curdate, curtime)

        var users_own_message = (username === page.site_info.cert_user_id)
        var user_is_mentioned = (message_escaped.match(new RegExp(page.site_info.cert_user_id + "|@" + page.site_info.cert_user_id.split("@")[0], "gmi"))) ? true : false
        var user_mention_badge = (page.LS.opts.user_mention_badge.value && user_is_mentioned) ? "badge" : ""

        var thismessageis = {
            "same_user": (page.lastprivatemessagewas.hasOwnProperty("username") && page.lastprivatemessagewas.username === username),
            "same_date": (page.lastprivatemessagewas.hasOwnProperty("curdate2") && page.lastprivatemessagewas.curdate2 === curdate2),
            "in_time_range": (page.lastprivatemessagewas.hasOwnProperty("date_added") && moment(page.lastprivatemessagewas.date_added, "x").add(15, "minutes").isSameOrAfter(date_added))
        }

        var dCDalreadyexists = CDalreadyexists === false ? false : true

        if (typeof CDalreadyexists !== "undefined" && CDalreadyexists !== false) {
            CDalreadyexists = $(CDalreadyexists)
        } else {
            CDalreadyexists = $("<li id='P_d_" + curdate2 + "' P_timestamp-date='" + curdate2 + "'><div class='divider text-center' data-content='" + (curdate3) + "' onclick='window.location.hash=\"#d_" + curdate2 + "\"; return false;'></div><ul class='times-messages unstyled'></ul></li>")
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

        var message_timestamp = ('<a class="message-timestamp ' + (page.LS.opts.show_timestamps.value ? "" : "hide") + '" href="#P_tc_' + msgkey + '" onclick="return false;">' + curtime + '</a>')

        var message_parsed = marked(message_escaped, {
                renderer: markedR
            })
            .replace(/((?:(?:[\w]+)@(?:zeroid|zeroverse|kaffie|cryptoid)\.bit)|@(?:[\w]+))/gmi, function(match, p1) { // ((?:[\w]+)@(?:zeroid|zeroverse)\.bit)
                var profile_link_part = (page.LS.opts.parse_profile_links.value ? '<a class="message-profile-link" onclick="add2MSGInput(\'' + p1 + ' \', 1); return false;" href="?u/' + encodeURI(p1) + '">' + p1 + '</a>' : '<span class="message-profile-link">' + p1 + '</span>')
                var isthisuser = (p1.match(new RegExp(page.site_info.cert_user_id + "|@" + page.site_info.cert_user_id.split("@")[0], "gmi"))) ? true : false
                return (isthisuser ? "<mark>" : "") + profile_link_part + (isthisuser ? "</mark>" : "")
            })
            .replace(/(?:\?\!\[tc_((.*?)(.{8}-.{4}-.{4}-.{4}-.{12}))\])/gm, function(match, p1) {
                if (page.LS.opts.parse_quotes.value)
                    page.quoteDisplayer(p1)

                return '<div id="QUOTEREPLACE_' + p1 + '" class="' + (page.LS.opts.parse_quotes.value ? 'icon icons loading' : '') + '"><cite><q>?![tc_' + p1 + '</q> (Quote)</cite></div>'
            })
        if (!page.LS.opts.disable_emojis.value)
            message_parsed = emojione.toImage(message_parsed)

        var msg_part_2_1 = '<div id="P_tc_' + msgkey + '" P_tc="' + date_added + '" class="card mb-5 ' + (page.LS.opts.theme_message_dark.value ? '' : 'light') + '">' +
            ((users_own_message || (thismessageis.same_user && thismessageis.same_date && thismessageis.in_time_range)) ? "" :
                '') + '<div class="card-body text-break">' +
            message_parsed + '</div><div class="' + (page.LS.opts.show_timestamps.value ? "" : "card-footer") + '"><small class="tile-subtitle float-right">' + message_timestamp + '</small></div></div>'

        if ( /*((users_own_message && thismessageis.same_user) || */ thismessageis.same_user /*)*/ && thismessageis.same_date && thismessageis.in_time_range) {
            var el = page.lastprivatemessagewas.el
            var el2 = $(msg_part_2_1).appendTo($(el).find('.tile-content'))

            var items = $(el).find('.tile-content').children('.card').get()

            items.sort(function(a, b) {
                var A = parseInt($(a).attr('P_tc'))
                var B = parseInt($(b).attr('P_tc'))

                if (A < B) return -1
                if (A > B) return 1
                return 0
            });
            $(el).find('.tile-content').html("").append(items)
        } else {
            var msg_part_1 = '<div class="tile-icon"><figure class="avatar avatar-lg message-user-avatar ' + user_mention_badge + '" data-initial="' + username.substr(0, 2) + '">' + message_pic + '</figure></div>',
                msg_part_2 = '<div class="tile-content">' + msg_part_2_1 + '</div>'

            var el = $('<li id="P_t_' + msgkey + '" P_t="' + date_added + '" class="message-container ' + (user_is_mentioned ? "user-is-mentioned " : "") + '" message-owner="' + username + '" users-own-message="' + users_own_message + '"><div class="tile ' + (page.LS.opts.theme_message_dark.value ? '' : 'light') + '">' + (users_own_message ? (msg_part_2 + msg_part_1) : (msg_part_1 + msg_part_2)) + '</div></li>')

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

        page.lastprivatemessagewas = {
            "username": username,
            "curdate2": curdate2,
            "date_added": date_added,
            "el": el
        }
        if (page.firstprivatemessagewas.date_added > date_added)
            page.firstprivatemessagewas.date_added = date_added
    }

    sendPrivateMessage(message3, recipient2, show) {
        var verified = this.verifyUser()
        if (!verified)
            return false

        // this.verifyUserFiles()

        var recipient2 = recipient2 || false
        var recipient = recipient2 || $('#private_recipient').val()
        if (!recipient)
            recipient = this.site_info.cert_user_id

        var randI = Math.random().toString(36).substr(2, 5) + Math.random().toString(36).substr(2, 5) + Math.random().toString(36).substr(2, 5)
        var bR = btoa(randI + recipient)

        var message3 = message3 || false
        var message2 = message3 || $('#private_message').val()
        var message = message2
            .replace(/\n{3,}/gm, "\n\n")
            .trim()

        if (!message3)
            $('#private_message').val("")
        autosize.update($('#private_message'))

        if (/^\/(.+)?/.test(message)) {
            console.log("CMD-MSG", message)

            $('#private_message').val("")
            autosize.update($('#private_message'))

            // page.loadPrivateMessages("sent private message", true)

            page.addBotMSG(message, false, '#private_messages')

            return false
        }

        var show = show || false

        var data_inner_path = "data/users/" + this.site_info.auth_address + "/data.json"
        var data2_inner_path = "data/users/" + this.site_info.auth_address + "/data_private.json"
        var content_inner_path = "data/users/" + this.site_info.auth_address + "/content.json"

        // console.log("LOLO", message3, message2, message, recipient2, recipient);

        this.cmd("dbQuery", [
            // "SELECT * FROM keyvalue LEFT JOIN json USING (json_id) WHERE key = 'public_key' AND value NOT NULL AND json.cert_user_id = '" + recipient + "'"
            "SELECT * FROM extra_data LEFT JOIN json USING (json_id) WHERE json.cert_user_id = '" + recipient + "'"
        ], (users) => {
            var user = users[0]
            console.log(user)
            if (user && user.hasOwnProperty("public_key") && user.public_key) {
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

                    var msg_date_added = parseInt(moment().utc().format("x"))

                    if (message && /\S/.test(message)) {
                        page.cmd("eciesEncrypt", [
                            JSON.stringify({
                                "recipient": recipient,
                                "body": emojione.toShort(message),
                                "date_added": msg_date_added
                            }),
                            user.public_key
                        ], (res) => {
                            // console.log("Res: ", res)

                            // Add the new message to data
                            var di = data.private_messages.push({
                                "message": res
                            })

                            // Encode data array to utf8 json text
                            var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
                            var json_rawA = btoa(json_raw)

                            // Write file to disk
                            page.cmd("fileWrite", [
                                data_inner_path,
                                json_rawA
                            ], (res2) => {
                                if (res2 == "ok") {
                                    page.addPrivateContact(recipient, function(data2, cList) {
                                        // console.log("DATA2 0", JSON.parse(JSON.stringify(data2)), cList);
                                        page.genContactsList()

                                        // console.log("DATA2 1", JSON.parse(JSON.stringify(data2)))

                                        // page.cmd("fileGet", {
                                        //     "inner_path": data2_inner_path,
                                        //     "required": false
                                        // }, (data2) => {

                                        var data2 = data2 ? JSON.parse(JSON.stringify(data2)) : {}

                                        // if (data2)
                                        //     var data2 = JSON.parse(JSON.stringify(data2))
                                        // else
                                        //     var data2 = {}

                                        console.log("DATA2 2", JSON.parse(JSON.stringify(data2)))

                                        if (!data2.hasOwnProperty("private_messages"))
                                            data2.private_messages = []
                                        if (!data2.hasOwnProperty("private_messages_with"))
                                            data2.private_messages_with = []

                                        console.log("DATA2 3", JSON.parse(JSON.stringify(data2)))

                                        page.cmd("eciesEncrypt", [
                                            JSON.stringify({
                                                "recipient": recipient,
                                                "body": emojione.toShort(message),
                                                "date_added": msg_date_added
                                            })
                                        ], (res3) => {
                                            // console.log("Res3: ", res3)
                                            page.cmd("aesEncrypt", [
                                                res3,
                                                bR,
                                                bR
                                            ], (res4) => {
                                                // console.log("Res4: ", res4)

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
                                                        if (show)
                                                            page.loadPrivateMessages("sent private message", true)

                                                        // Publish the file to other users
                                                        page.verifyUserFiles(null, function() {
                                                            console.log("Sent private message", {
                                                                "recipient": recipient,
                                                                "body": emojione.toShort(message),
                                                                "SOMEWHAT-date_added": parseInt(moment().utc().format("x"))
                                                            })
                                                        })
                                                    } else {
                                                        page.cmd("wrapperNotification", [
                                                            "error", "File write error: " + JSON.stringify(res5)
                                                        ])
                                                    }
                                                })
                                            })
                                        })

                                        // })
                                    })
                                } else {
                                    page.cmd("wrapperNotification", [
                                        "error", "File write error: " + JSON.stringify(res2)
                                    ])
                                }
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

    loadPrivateMessages(loadcode, override, sender2, redirect) {
        var verified = this.verifyUser()
        if (!verified)
            return false

        var sender2 = sender2 || false
        var sender = sender2 || $('#private_recipient').val()
        if (!sender)
            sender = this.site_info.cert_user_id

        var override = override || false
        var redirect = redirect === false ? false : true
        var goingback = goingback || false

        console.log("Loading private messages with code >" + loadcode + "<..", sender, override, redirect, goingback)

        changeWorkinTabber('#main-tabs', 'PrivateChat')

        page.addPrivateContact(sender, function() {
            $('#private_recipient').val(sender)

            if (redirect)
                page.cmd("wrapperPushState", [
                    {},
                    "ThunderWave - ZeroNet",
                    "?PC:" + sender
                ])

            page.genContactsList(function() {
                var $pcl = $('#private_contacts_list')

                $pcl.children('li.active').removeClass('active')
                $pcl.children('[tab="' + sender + '"]').addClass('active')
            })
        })

        page.cmd("dbQuery", [
            "SELECT * FROM private_messages LEFT JOIN json USING (json_id) WHERE cert_user_id = '" + sender + "'"
        ], (messages1) => {
            // console.log(messages1)

            var $m = $('#private_messages')

            var message_design_type = parseInt(page.LS.opts.message_design_type.value)
            if (message_design_type === 1) {
                $m.removeAttr("design-type")
            } else {
                $m.attr("design-type", message_design_type)
            }

            if (override) {
                page.lastprivatemessagewas = ""
                $m.html('<div class="icon icons loading"></div>')
            }

            page.cmd("fileQuery", [
                "data/users/" + page.site_info.auth_address + "/data_private.json",
                "private_messages"
            ], (messages2) => {
                // console.log(messages2)

                var first = true

                var messages = []

                var checkLoops = function(l, x) {
                    if (eval("messages" + l + ".length > x + 1")) {
                        // console.log("Continuing " + l + ".. ", eval("messages" + l + ".length"), x + 1)
                        eval("loop" + l + "(x + 1)")
                    } else {
                        // console.log("Stopped " + l + ".")
                        if (l === 1 && sender !== page.site_info.cert_user_id) {
                            checkLoops(2, -1)
                        } else {
                            l = 2
                        }
                        if (l === 2) {
                            messages.sort(function(a, b) {
                                var A = a.msg.date_added
                                var B = b.msg.date_added

                                if (A < B) return -1
                                if (A > B) return 1
                                return 0
                            })

                            $m.children('.loading').remove()

                            for (var x3 = 0; x3 < messages.length; x3++) {
                                var y3 = messages[x3]

                                if (first) {
                                    page.firstprivatemessagewas = {
                                        "date_added": y3.msg.date_added
                                    }
                                    first = false
                                }

                                page.addPrivateMessage(x3, y3.sender, y3.msg.body, y3.msg.date_added, override ? false : true)
                            }

                            page.getAvatar(sender, (img) => {
                                // console.log("IMAGE FOR", sender, img)
                                $('[avatarimg="' + sender + '"]').replaceWith(img)
                            })
                            page.getAvatar(page.site_info.cert_user_id, (img) => {
                                // console.log("IMAGE FOR", page.site_info.cert_user_id, img)
                                $('[avatarimg="' + page.site_info.cert_user_id + '"]').replaceWith(img)
                            })

                            config$bH(loadcode === "load more" || goingback, 1)
                        }
                    }
                }

                var loop2 = function(x2) {
                    var y2 = messages2[x2]

                    var randI = y2.randI
                    var bS = btoa(randI + sender)
                    page.cmd("aesDecrypt", [
                        bS,
                        y2.message,
                        bS
                    ], (msg2) => {
                        if (msg2) {
                            page.cmd("eciesDecrypt", msg2, (msg) => {
                                if (msg)
                                    var msg = JSON.parse(msg)
                                if (msg !== null) {
                                    // console.log("own", x2, y2, msg)

                                    messages.push({
                                        "y": x2,
                                        "msg": msg,
                                        "sender": page.site_info.cert_user_id
                                    })
                                }

                                checkLoops(2, x2)
                            })
                        } else {
                            checkLoops(2, x2)
                        }
                    })
                }

                var loop1 = function(x1) {
                    var y1 = messages1[x1]
                    page.cmd("eciesDecrypt", y1.message, (msg) => {
                        if (msg)
                            var msg = JSON.parse(msg)
                        if (msg !== null) {
                            // console.log(x1, y1, msg)

                            messages.push({
                                "id": y1.message_id,
                                "msg": msg,
                                "sender": sender
                            })
                        }

                        checkLoops(1, x1)
                    })
                }

                if (messages1.length > 0) {
                    console.log("Starting private-chat load...")
                    checkLoops(1, -1)
                }
            })
        })
    }

    sendMessage(message3) {
        var verified = this.verifyUser()
        if (!verified)
            return false

        // this.verifyUserFiles()

        var message3 = message3 || false
        var message2 = message3 || $('#message').val()
        var message = message2
            .replace(/\n{3,}/gm, "\n\n")
            .trim()

        if (!message3)
            $('#message').val("")
        autosize.update($('#message'))

        if (/^\/(.+)?/.test(message)) {
            console.log("CMD-MSG", message)

            $('#message').val("")
            autosize.update($('#message'))

            page.loadMessages("sent message", false, true)

            page.addBotMSG(message, false, '#messages')

            return false
        }

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
                    "date_added": parseInt(moment().utc().format("x")),
                    "key": generateGUID()
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
                        page.loadMessages("sent message", false, data.messages.length === 1 ? false : true)

                        // Publish the file to other users
                        this.verifyUserFiles(null, function() {

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

    uploadMedia(isp, cb) {
        var isp = isp || '[is-chattype="0"]'

        var verified = this.verifyUser()
        if (!verified)
            return false

        // Check for the various File API support.
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert('The File APIs are not fully supported in this browser.')
            return false
        }

        var files = $('.media_uploader' + isp)[0].files;
        if (!files)
            return false

        // if (this.MediaFiles)
        //     var files = this.MediaFiles
        // else
        //     return false

        // this.verifyUserFiles()

        console.log("MUP >> 3.0 :: " + isp, files);

        for (var fX in files) {
            var fY = files[fX]
            console.log("MUP >> 3.1 :: ", fX, fY)

            if (!fY || typeof fY !== 'object' || !fY.type.match('(image)\/(png|jpg|jpeg|gif)|(audio)\/(mp3|ogg)|(video)\/(ogg|mp4)')) // |audio|video      || !fY.name.match(/\.IMAGETYPE$/gm)
                continue

            var reader = new FileReader()
            reader.onload = (function(f2) {
                console.log("MUP >> 3.2.0 :: reading", f2)
                return function(event) {
                    console.log("MUP >> 3.2.1 :: with event", event)

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
                                            var ctrl = $('.media_uploader' + isp)[0]
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
                                                    console.log("MUP >> 3.2.2 :: ", output_url, f2.type.match('(image)\/(png|jpg|jpeg|gif)'))
                                                    if (f2.type.match('(image)\/(png|jpg|jpeg|gif)'))
                                                        var rtrn = ' ![ALTTEXT](' + output_url + ') '
                                                    else if (f2.type.match('(audio)\/(mp3|ogg)'))
                                                        var rtrn = ' [ALTTEXT]!a!(' + output_url + ')'
                                                    else if (f2.type.match('(video)\/(ogg|mp4)'))
                                                        var rtrn = ' [ALTTEXT]!v!(' + output_url + ')'
                                                    else
                                                        var rtrn = ' [TITLE](' + output_url + ') '

                                                    // Publish the file to other users
                                                    page.verifyUserFiles()

                                                    if (typeof cb === "function")
                                                        cb(rtrn)

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

    quoteDisplayer(tc) {
        if (!tc) return false

        // console.log("Getting quote", tc)

        ;
        (function(_tc) {
            page.cmd("dbQuery", [
                "SELECT * FROM messages LEFT JOIN json USING (json_id) WHERE key = \"" + _tc + "\""
            ], (quote) => {
                if (quote && quote[0])
                    quote = quote[0]
                    // console.log("Got quote", _tc, quote)

                var mmnt = moment(quote.date_added, "x")

                var curdate = mmnt.format("MMMM Do, YYYY")
                var curtime = mmnt.format("HH:mm:ss")

                var curdate2 = moment(curdate, "MMMM Do, YYYY").format("x")
                var rcurdate = moment().format("MMMM Do, YYYY")
                var curdate3 = (curdate === rcurdate ? "Today" : (moment(rcurdate, "MMMM Do, YYYY").subtract(1, "d").format("MMMM Do, YYYY") === curdate ? "Yesterday" : curdate));

                var quote_parsed = marked(
                        quote.body, {
                            renderer: markedR
                        }
                    )
                    .replace(/((?:(?:[\w]+)@(?:zeroid|zeroverse|kaffie)\.bit)|@(?:[\w]+))/gmi, function(match, p1) { // ((?:[\w]+)@(?:zeroid|zeroverse)\.bit)
                        var profile_link_part = (page.LS.opts.parse_profile_links.value ? '<a class="message-profile-link" onclick="add2MSGInput(\'' + p1 + ' \'); return false;" href="?u/' + encodeURI(p1) + '">' + p1 + '</a>' : '<span class="message-profile-link">' + p1 + '</span>')
                        var isthisuser = (p1.match(new RegExp(page.site_info.cert_user_id + "|@" + page.site_info.cert_user_id.split("@")[0], "gmi"))) ? true : false
                        return (isthisuser ? "<mark>" : "") + profile_link_part + (isthisuser ? "</mark>" : "")
                    })
                    .replace(/(?:\?\!\[tc_((.*?)(.{8}-.{4}-.{4}-.{4}-.{12}))\])/gm, function(match, p1) {
                        if (page.LS.opts.parse_quotes.value)
                            page.quoteDisplayer(p1)

                        return '<div id="QUOTEREPLACE_' + p1 + '" class="' + (page.LS.opts.parse_quotes.value ? 'icon icons loading' : '') + '"><cite><q>?![tc_' + p1 + '</q> (Quote)</cite></div>'
                    })
                if (!page.LS.opts.disable_emojis.value)
                    quote_parsed = emojione.toImage(quote_parsed)

                $('#QUOTEREPLACE_' + _tc).replaceWith($('<div class="quote">' +
                    '<blockquote class="quotechild" cite="tc_' + _tc + '">' +
                    '<by>' + quote.cert_user_id
                    .replace(/((?:(?:[\w]+)@(?:zeroid|zeroverse|kaffie)\.bit)|@(?:[\w]+))/gmi, function(match, p1) { // ((?:[\w]+)@(?:zeroid|zeroverse)\.bit)
                        var profile_link_part = (page.LS.opts.parse_profile_links.value ? '<a class="message-profile-link" onclick="add2MSGInput(\'' + p1 + ' \'); return false;" href="?u/' + encodeURI(p1) + '">' + p1 + '</a>' : '<span class="message-profile-link">' + p1 + '</span>')
                        var isthisuser = (p1.match(new RegExp(page.site_info.cert_user_id + "|@" + page.site_info.cert_user_id.split("@")[0], "gmi"))) ? true : false
                        return (isthisuser ? "<mark>" : "") + profile_link_part + (isthisuser ? "</mark>" : "")
                    }) + '</by>' + quote_parsed +
                    '- <on onclick="window.location.hash=\'t_' + tc + '\'; return false;">' +
                    curdate3 + ' ' + curtime + '</on>' +
                    '</blockquote></div>'))
            })
        })(tc)
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
                        '\'); return false;">Download ' + (title ? title : (text ? text : '')) +
                        '</button><div class="popover-container">' +
                        '<div class="card ' + (page.LS.opts.theme_message_dark.value ? '' : 'light') + '"><div class="card-header">' +
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
                // console.log("Image result: ", res)
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

    lastSeenList(usefilter) {
        var verified = this.verifyUser()
        if (!verified)
            return false

        var usefilter = usefilter || false;

        console.log("Loading last-seen-List", usefilter);

        var filterstr = $('#lastseen_filterer').val() || "";

        var count = 0
        this.cmd("dbQuery", [
            "SELECT * FROM extra_data LEFT JOIN json USING (json_id) " + (usefilter ? ("WHERE extra_data.public_key LIKE \"%" + filterstr + "%\" OR cert_user_id LIKE \"%" + filterstr + "%\" OR auth_address LIKE \"%" + filterstr + "%\"") : "") + " ORDER BY extra_data.last_seen DESC" // "SELECT * FROM keyvalue LEFT JOIN json USING (json_id) WHERE key = 'last_seen' AND keyvalue.value NOT NULL OR key = 'public_key' AND keyvalue.value NOT NULL ORDER BY keyvalue.json_id"
        ], (lsl) => {
            var lsl_HTML = ''

            for (var x in lsl) {
                var y = lsl[x]

                // lsl_HTML += '<dt class="divider" data-content="' + y.cert_user_id + '"></dt>'
                lsl_HTML += '<dt>' + y.cert_user_id + '</dt>'
                count++

                if (y.last_seen)
                    lsl_HTML += '<dd>last seen <i>' + moment(y.last_seen, "x").format("MMMM Do, YYYY - HH:mm:ss") + '</i></dd>'
                if (y.public_key)
                    lsl_HTML += '<dd>public key: <a href="#" onclick="page.loadPrivateMessages(\'selected user\', true, \'' + y.cert_user_id + '\'); return false;"><i>' + y.public_key + '</i></a></dd>'
            }

            $('#last_seen_list').html(lsl_HTML)
            $('#last_seen_list_c').html(count)
        })
    }

    filrchDefaultFilters() {
        return {
            "media": {
                "links": false,
                "images": false,
                // "audios": false,
                // "videos": false
            },
            "order_dir": "DESC",
            "from_time": 0,
            "to_time": moment().format("x")
        }
    }

    filrch(s, f, fu, fu_ei, cb) { // "Filter/ Search" => "Filrch"
        var s = s || ''
        var f = (typeof f === "object" && Object.keys(f).length > 0 ? f : {})
        var fu = (typeof fu === "object" && fu.length > 0 ? fu : [])
        var fu_ei = fu_ei || false

        var m_schemes = {
            "links": "[%](%)",
            "images": "![%](%)",
            // "audio": "[%](%)",
            // "videos": "[%](%)"
        }

        var nF = page.filrch_nF || page.filrchDefaultFilters()

        for (var fx in nF) {
            if (f.hasOwnProperty(fx) &&
                typeof f[fx] === typeof nF[fx]) {
                nF[fx] = f[fx]
            }
        }

        console.log("Searching for ", s, nF, fu, fu_ei)

        var user_names_filter = ""
        var first_user_names_filter = true
        for (var ux in fu) {
            var uy = fu[ux]

            if (uy) {
                if (first_user_names_filter || fu_ei === false) {
                    first_user_names_filter = false
                    user_names_filter += " AND cert_user_id " + (fu_ei ? "" : "NOT") + " LIKE(\"%" + uy + "%\")"
                } else {
                    user_names_filter += " OR cert_user_id LIKE(\"%" + uy + "%\")"
                }
            }
        }

        var media_filter = ""
        var first_media_filter = true
        for (var mx in nF.media) {
            var my = nF.media[mx]

            if (my && m_schemes.hasOwnProperty(mx)) {
                if (first_media_filter)
                    first_media_filter = false
                else
                    media_filter += " OR"

                media_filter += " body LIKE(\"%" + m_schemes[mx] + "%\")"
            }
        }
        if (media_filter !== "")
            media_filter = " AND (" + media_filter + ")"

        var SELECT_STR = "SELECT * FROM messages LEFT JOIN json USING (json_id) WHERE date_added > " + nF.from_time +
            " AND date_added < " + nF.to_time +
            user_names_filter +
            " AND body LIKE(\"%" + s + "%\")" +
            media_filter +
            " ORDER BY date_added " + nF.order_dir

        this.cmd("dbQuery", [
            SELECT_STR
        ], (results) => {
            console.log("Search-results for ", s, nF, fu, fu_ei, SELECT_STR, results)

            typeof cb === "function" && cb(results, s, nF, fu, fu_ei)
        })
    }

    filrchGui(s, nF, fu, fu_ei, cb) {
        var s = s || $('#filrch_input_search').val()
        var nF = nF || page.filrch_nF
        var fu = fu || $('#filrch_input_users').val()
        var fu_ei = fu_ei || page.fu_ei

        console.log("Filrch-GUI user-list", fu, fu_ei)

        if (typeof fu === "string")
            fu = fu.replace(/\s/gm, '').split(',')

        console.log("Filrch-GUI", s, nF, fu, fu_ei, page.filrch_nF)

        page.filrch(s, nF, fu, fu_ei, function(results, s, nF, fu, fu_ei) {
            var $m = $('#found_messages')

            $m.html('<div class="icon icons loading"></div>')

            if (results) {
                results.reverse()

                var senders = []
                for (var i = 0; i < results.length; i++) {
                    var msg = results[i]

                    if (senders.indexOf(msg.cert_user_id) === -1)
                        senders.push(msg.cert_user_id)

                    page.addMessage(msg.key, msg.cert_user_id, msg.body, msg.date_added, false, "", "#found_messages")
                }
            }
            $m.children('.loading').remove()

            for (var x in senders) {
                var sender2 = senders[x];

                (function(sender) {
                    // console.log("LOADING IMAGE FOR ", sender)
                    page.getAvatar(sender, (img, ov, ov_s, av, av_n, av_u, path) => {
                        // console.log("IMAGE FOR ", sender, img, ov, ov_s, av, av_n, av_u, path)
                        $('[avatarimg="' + sender + '"]').replaceWith(img)
                    })
                })(sender2)
            }

            typeof cb === "function" && cb(results, s, nF)
        })
    }

    filrchGuiInit() {
        var nF = page.filrchDefaultFilters()
        page.filrch_nF = JSON.parse(JSON.stringify(nF))

        page.fu_ei = true

        $('#filrch_media_filters').html('')

        for (var mx in nF.media) {
            var my = nF.media[mx];

            (function(_mx, _my) {
                var $el = $('<label class="form-checkbox"><i class="form-icon"></i> ' + _mx + '</label>').appendTo('#filrch_media_filters')
                var $elInput = $('<input type="checkbox" ' + (_my ? ' checked' : '') + ' />').prependTo($el)

                $elInput.on('click', function() {
                    console.log($elInput, JSON.parse(JSON.stringify(page.filrch_nF)))

                    page.filrch_nF.media[_mx] = !page.filrch_nF.media[_mx]

                    if (page.filrch_nF.media[_mx])
                        $elInput.attr('checked')
                    else
                        $elInput.removeAttr('checked')
                })
            })(mx, my)
        }
    }

    getAvatar(username, cb) {
        var ov = parseInt(page.LS.opts.avatar_type.value),
            ov_s = parseInt(page.LS.opts.avatar_size.value)

        function avatarGen() {
            page.identicons = page.identicons || {}
            var asv = ov_s || 64
            if (!page.identicons.hasOwnProperty(asv)) {
                page.identicons[asv] = {}
            }
            if (!page.identicons[asv].hasOwnProperty(username)) {
                var uhash = stringToHex(username).split(' ').join('')
                page.identicons[asv][username] = new Identicon(uhash, {
                    margin: 0.225,
                    size: asv,
                    format: 'svg',
                    // foregrund: [217, 140, 187, 255], // default
                    background: [240, 240, 240, 255], // default

                    foreground: [18, 183, 142, 255],

                    foreground: [240, 240, 240, 255],
                    background: [18, 183, 142, 255]

                }).toString()
            }
            var idata = page.identicons[asv][username]

            var avatar_pic = (typeof idata !== "undefined" ? "<img src='data:image/svg+xml;base64," + idata + "' />" : "")
            return avatar_pic
        }

        if (ov >= 3 && ov_s !== 0) {
            if (typeof cb === "function")
                cb(avatarGen(), ov, ov_s, "", "", "", "")
        } else if (ov >= 3) {
            if (typeof cb === "function")
                cb("", ov, ov_s, "", "", "", "")
        } else {
            page.cmd("dbQuery", [
                "SELECT * FROM extra_data LEFT JOIN json USING (json_id) WHERE json.cert_user_id = '" + username + "'"
            ], (lsl) => {
                if (lsl[0])
                    var data = lsl[0]
                else
                    var data = {
                        "avatar_file_name": "",
                        // "avatar_file_url": "",
                        "avatar_type": 0
                    }

                // console.log("Got userdata for avatar of", username, data)

                /*
                ov:
                0 TW
                 & ZM -> use TW if TW || ZM if ZM || gen if gen #
                1 TW  -> use TW if TW || gen if gen
                2 ZM  -> use ZM if ZM || gen if gen
                3 /   -> use gen if gen

                av:
                0 /   -> use gen if gen
                1 TW  -> use name
                2 ZM  -> use ~~url~~ ZeroMe
                */

                var av = parseInt(data.avatar_type),
                    av_n = data.avatar_file_name || false,
                    // av_u = data.avatar_file_url,
                    av_u = false,
                    path = false

                var getPath_TW = function(callfrom) {
                    // console.log("Setting " + username + "'s avatar-path to TW", callfrom)

                    path = "data/" + data.directory + "/" + av_n

                    finishGet(2.1)
                }
                var getPath_ZW = function(callfrom) {
                    // console.log("Checking ZeroMe-Avatar-CORS.. ", callfrom, username, data.auth_address)

                    if (page.site_info.settings.permissions.indexOf("Cors:1UDbADib99KE9d3qZ87NqJF2QLTHmMkoV") < 0) {
                        page.cmd("corsPermission", "1UDbADib99KE9d3qZ87NqJF2QLTHmMkoV", () => {
                            console.log("Got CORS-Permission for ZeroMe-User Registry (for avatar)")
                            getPath_ZW2(3.1)
                        })
                    } else {
                        // console.log("Already have CORS-Permission for ZeroMe-User Registry (for avatar)")
                        getPath_ZW2(3.2)
                    }
                }
                var getPath_ZW2 = function(callfrom) {
                    // console.log("ZeroMe-Avatar path.. ", callfrom, username, data.auth_address)

                    if (data.hasOwnProperty("auth_address") && data.auth_address) {
                        page.cmd("fileGet", {
                            "inner_path": "cors-1UDbADib99KE9d3qZ87NqJF2QLTHmMkoV/data/userdb/" + data.auth_address + "/content.json",
                            "required": false
                        }, (data2) => {
                            if (data2)
                                data2 = JSON.parse(data2)
                            else
                                data2 = false

                            // console.log("Avatar Hub-Data", data2)

                            if (data2 && data2.hasOwnProperty("user") && data2.user.length > 0 && data2.user[0].hasOwnProperty("hub") && data2.user[0].hub) {
                                var u_hub = data2.user[0].hub
                                var avatar_type = data2.user[0].avatar

                                av_u = "/" + u_hub + "/data/users/" + data.auth_address + "/avatar." + avatar_type
                                path = av_u + "?" + moment()

                                finishGet(4.1)
                            } else {
                                if (ov === 0 && av > 0 && av_n) {
                                    getPath_TW(4.2)
                                } else {
                                    finishGet(4.2)
                                }
                            }
                        })
                    } else {
                        if (ov === 0 && av > 0 && av_n) {
                            getPath_TW(4.2)
                        } else {
                            finishGet(4.2)
                        }
                    }
                }
                var finishGet = function(callfrom) {
                    // console.log("Avatar path.. ", callfrom, username, data.auth_address, ov, ov_s, av, "av_n=" + av_n, "av_u=" + av_u, "path=" + path)

                    if (path) {
                        if (typeof cb === "function")
                            cb("<img src='" + path + "' />", ov, ov_s, av, av_n, av_u, path)
                    } else if (ov_s !== 0) {
                        if (typeof cb === "function")
                            cb(avatarGen(), ov, ov_s, av, av_n, av_u, path)
                    } else {
                        if (typeof cb === "function")
                            cb("", ov, ov_s, av, av_n, av_u, path)
                    }
                }

                // console.log("Checking for " + username + "'s avatar.. ", ov, av, "av_n=" + av_n)
                if (ov === 0 && av > 0) {
                    if (av === 1 && av_n) {
                        // TW
                        getPath_TW(1.1)
                    } else if (av === 2 || !av_n) {
                        // ZM
                        getPath_ZW(1.2)
                    } else {
                        // GEN
                        finishGet(1.3)
                    }
                } else if (ov === 1 && av > -1 && av_n) {
                    // TW
                    getPath_TW(1.4)
                } else if (ov === 2 && av > 0) {
                    // ZM
                    getPath_ZW(1.5)
                } else {
                    // GEN
                    finishGet(1.6)
                }
            })
        }
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
            var from_time2 = 0, // moment(page.firstmessagewas.date_added, "x").subtract(12, "h").format("x"),
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
                // console.log("Messages: ", messages)

            var $m = $('#messages')

            var message_design_type = parseInt(page.LS.opts.message_design_type.value)
            if (message_design_type === 1) {
                $('#messages').removeAttr("design-type")
            } else {
                $('#messages').attr("design-type", message_design_type)
            }

            if (override || loadcode === "first time") {
                page.lastmessagewas = ""
                $m.html('<div class="icon icons loading"></div>')
            }

            page.firstmessagewas = {
                    "date_added": !messages[0] ? 0 : messages.length > 1 ? messages[0].date_added : 0
                }
                // console.log(messages[0], page.firstmessagewas)

            var senders = []
            for (var i = 0; i < messages.length; i++) {
                var msg = messages[i]

                if (senders.indexOf(msg.cert_user_id) === -1)
                    senders.push(msg.cert_user_id)

                if (!this.messageCounterArr.hasOwnProperty(msg.message_id)) {
                    this.addMessage(msg.key, msg.cert_user_id, msg.body, msg.date_added, override ? false : true)
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

            for (var x in senders) {
                var sender2 = senders[x];

                (function(sender) {
                    // console.log("LOADING IMAGE FOR ", sender)
                    page.getAvatar(sender, (img, ov, ov_s, av, av_n, av_u, path) => {
                        // console.log("IMAGE FOR ", sender, img, ov, ov_s, av, av_n, av_u, path)
                        $('[avatarimg="' + sender + '"]').replaceWith(img)
                    })
                })(sender2)
            }

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
                "kaffie.bit",
                "cryptoid.bit"
            ]
        })
        return false
    }

    onLoginUser(message) {
        var message = message || {
            "params": {}
        }

        if (page.site_info.cert_user_id) {
            $('.hideifnotloggedin').removeClass("hide")
            $("#select_user").html("Change user")
            $('#current_user_name').html(page.site_info.cert_user_id)

            page.getAvatar(page.site_info.cert_user_id, (img) => {
                $('#current_user_avatar').html('<figure class="avatar" data-initial="' + page.site_info.cert_user_id.substr(0, 2) + '" onclick="return false;">' + img + '</figure>')
            })

            if (message.params.hasOwnProperty("event") && message.params.event[0] === "cert_changed" && message.params.event[1]) {
                page.messageCounterArr = {}
                page.loadMessages("cert changed", true)

                page.genContactsList()
                page.genGroupsList()
            }
        } else {
            $('.hideifnotloggedin').addClass("hide")
            $("#select_user").html("Select user")
            $('#current_user_name').html("Please login first")
            $('#current_user_avatar').html('<figure class="avatar" data-initial="TW"></figure>')
        }

        if (message.params.hasOwnProperty("event") && message.params.event[0] == "file_done") {
            console.log("Reloading messages because file-done-event");
            this.loadMessages("file done", false, true)
                // this.loadPrivateMessages("file done", true, false, false)
                // this.loadGroupMessages("file done", true, false, false)
        }
    }

    onRequest(cmd, message) {
        // console.log("COMMAND", cmd, message)
        if (cmd == "setSiteInfo") {
            this.site_info = message.params // Save site info data to allow access it later
            this.setSiteInfo(message.params)

            this.onLoginUser(message)
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

    returnDefaultsOpts(cb) {
        var curOptsV = 27
        var defaultOpts = {
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
            "divider_7": "Notifications",
            "feed_notifications": {
                "label": "Notifications in ZeroHello-Feed",
                "desc": "Activate, to get notifications in the ZeroHello-Feed",
                "value": 0,
                "values": [
                    [0, "Off"],
                    [1, "Only mentions"],
                    [2, "All messages"]
                ],
                "type": "select",
                "r_ms": false,
                "cb": {
                    "change": '(' + (
                        function() {
                            var parsedVal = parseInt(page.LS.opts.feed_notifications.value)
                            if (parsedVal === 1) {
                                page.cmd("feedFollow", [{
                                    "Mentions": [
                                        "SELECT messages.message_id AS event_uri, 'mention' as type, messages.date_added AS date_added, 'the Lobby' AS title, json.cert_user_id || ': ' || messages.body AS body, '' AS url FROM messages LEFT JOIN json USING (json_id) WHERE (messages.body LIKE '%" + page.site_info.cert_user_id + "%' OR messages.body LIKE '%@" + page.site_info.cert_user_id.split("@")[0] + "' OR messages.body LIKE '@" + page.site_info.cert_user_id.split("@")[0] + "%')", [
                                            ""
                                        ]
                                    ]
                                }])
                                page.LS.opts.feed_notifications.value = 1
                            } else if (parsedVal === 2) {
                                page.cmd("feedFollow", [{
                                    "Mentions": [
                                        "SELECT messages.message_id AS event_uri, 'mention' as type, messages.date_added AS date_added, 'the Lobby' AS title, json.cert_user_id || ': ' || messages.body AS body, '' AS url FROM messages LEFT JOIN json USING (json_id) WHERE (messages.body LIKE '%" + page.site_info.cert_user_id + "%' OR messages.body LIKE '%@" + page.site_info.cert_user_id.split("@")[0] + "' OR messages.body LIKE '@" + page.site_info.cert_user_id.split("@")[0] + "%')", [
                                            ""
                                        ]
                                    ],
                                    "Messages": [
                                        "SELECT messages.message_id AS event_uri, 'comment' AS type, messages.date_added AS date_added, 'the Lobby' AS title, json.cert_user_id || ': ' || messages.body AS body, '' AS url FROM messages LEFT JOIN json USING (json_id)", [
                                            ""
                                        ]
                                    ]
                                }])
                                page.LS.opts.feed_notifications.value = 2
                            } else {
                                page.cmd("feedFollow", [{}])
                                page.LS.opts.feed_notifications.value = 0
                            }
                        }
                    ).toString() + ')'
                }
            },
            "divider_3": "Parsing",
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
            "parse_quotes": {
                "label": "Parse Quotes",
                "desc": "Activate to parse quotes in messages (?![tc_xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx])",
                "value": true,
                "r_ms": true,
                "cb": {
                    "change": '(' + (
                        function() {

                        }
                    ).toString() + ')'
                }
            },
            "divider_5": "Extra infos",
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
            "divider_6": "Design",
            "avatar_type": {
                "label": "Allow specific avatar-types only",
                "desc": "Choose which avatar-locations are allowed (if a user has no location specified, the avatar-generator will be used)",
                "value": 1,
                "values": [
                    [0, "TW & ZM"],
                    [1, "ThunderWave"],
                    [2, "ZeroMe"],
                    [3, "none"]
                ],
                "type": "select",
                "r_ms": true,
                "cb": {
                    "change": '(' + (
                        function() {
                            var parsedVal = parseInt(page.LS.opts.avatar_type.value)
                            page.LS.opts.avatar_type.value = (parsedVal < 4 && parsedVal > -1 ? parsedVal : 1)
                        }
                    ).toString() + ')'
                }

            },
            "avatar_size": {
                "label": "Set avatar-size",
                "desc": "Sets the resolution of generated avatars",
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
                                page.LS.opts.message_design_type.value = 1
                            } else {
                                $('#messages').attr("design-type", parsedVal)
                                page.LS.opts.message_design_type.value = parsedVal
                            }
                        }
                    ).toString() + ')'
                }
            },
            "divider_4": "Theming",
            "theme_body_light": {
                "label": "Toggle light themed body",
                "desc": "If activated, the body will have a light theme",
                "value": false,
                "r_ms": false,
                "cb": {
                    "change": '(' + (
                        function() {
                            if (page.LS.opts.theme_body_light.value) {
                                $('body').addClass('light')
                            } else {
                                $('body').removeClass('light')
                            }
                        }
                    ).toString() + ')'
                }
            },
            "theme_message_dark": {
                "label": "Toggle dark themed message-bubbles",
                "desc": "If activated, the message-bubbles will have a dark theme (works good with dark body!)",
                "value": false,
                "r_ms": false,
                "cb": {
                    "change": '(' + (
                        function() {
                            if (page.LS.opts.theme_message_dark.value) {
                                $('#messages').find('.tile').removeClass('light')
                                $('#messages').find('.tile').find('.card').removeClass('light')
                            } else {
                                $('#messages').find('.tile').addClass('light')
                                $('#messages').find('.tile').find('.card').addClass('light')
                            }
                        }
                    ).toString() + ')'
                }
            },
            "theme_navbar_light": {
                "label": "Toggle light themed navbar",
                "desc": "If activated, the navbar will have a light theme",
                "value": false,
                "r_ms": false,
                "cb": {
                    "change": '(' + (
                        function() {
                            if (page.LS.opts.theme_navbar_light.value) {
                                $('header.navbar.fixed').addClass('light')
                            } else {
                                $('header.navbar.fixed').removeClass('light')
                            }
                        }
                    ).toString() + ')'
                }
            },
            "divider_1": "Emoji's",
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
                            if (page.site_info.cert_user_id === "glightstar@zeroid.bit" ||
                                page.site_info.cert_user_id === "glightstar@kaffie.bit") {
                                page.LS.opts.seed_all_emojis.value = true
                            }
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
                            if (page.site_info.cert_user_id !== "glightstar@zeroid.bit" &&
                                page.site_info.cert_user_id !== "glightstar@kaffie.bit") {
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
            "divider_2": "Other",
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
        typeof cb === "function" && cb(curOptsV, defaultOpts)
    }

    settingsOptions(gos, cb) {
        console.log(gos, cb)
        this.returnDefaultsOpts(function(curOptsV, defaultOpts) {
            var data_inner_path = "data/users/" + page.site_info.auth_address + "/data.json"

            if (gos === "get") {
                page.cmd("fileQuery", {
                    "dir_inner_path": data_inner_path,
                    "query": "settings"
                }, (settings) => {
                    console.log(settings)
                    if (settings[0] && settings[1]) {
                        var rOpts = JSON.parse(JSON.stringify(defaultOpts))
                        console.log(rOpts, settings[0], settings[1])
                        for (var optX in rOpts) {
                            // console.log(optX)
                            if (typeof rOpts[optX] !== "string")
                                rOpts[optX].value = settings[0][optX]
                        }

                        typeof cb === "function" && cb({
                            opts: rOpts,
                            optsV: settings[1].optsV
                        }, curOptsV, defaultOpts)
                    } else {
                        typeof cb === "function" && cb(
                            undefined,
                            curOptsV, defaultOpts)
                    }
                })
            } else if (gos === "reset") {
                page.cmd("fileGet", {
                    "inner_path": data_inner_path,
                    "required": false
                }, (data) => {
                    if (data)
                        var data = JSON.parse(data)
                    else {
                        page.verifyUserFiles()
                        return false
                    }

                    data.settings = [{}, {}]

                    for (var optX in defaultOpts) {
                        var optY = defaultOpts[optX]

                        data.settings[0][optX] = optY.value
                    }

                    data.settings[1].optsV = curOptsV

                    var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
                    var json_rawA = btoa(json_raw)

                    page.cmd("fileWrite", [
                        data_inner_path,
                        json_rawA
                    ], (res) => {
                        if (res == "ok") {
                            var rOpts = JSON.parse(JSON.stringify(defaultOpts))

                            typeof cb === "function" && cb({
                                opts: rOpts,
                                optsV: curOptsV
                            }, curOptsV, defaultOpts)
                        } else {
                            page.cmd("wrapperNotification", [
                                "error", "File write error: " + JSON.stringify(res)
                            ])
                        }
                    })
                })
            } else if (typeof gos === "object" &&
                gos[0] === "set" && typeof gos[1] === "object" && Object.keys(gos[1]).length > 0) {
                page.cmd("fileGet", {
                    "inner_path": data_inner_path,
                    "required": false
                }, (data) => {
                    if (data)
                        var data = JSON.parse(data)
                    else {
                        page.verifyUserFiles()
                        return false
                    }
                    for (var optX in gos[1]) {
                        var hasvalue = false
                        if (defaultOpts.hasOwnProperty(optX) &&
                            typeof gos[1][optX] === typeof defaultOpts.value) {
                            if (!defaultOpts.hasOwnProperty("values")) {
                                hasvalue = true
                            } else if (defaultOpts.hasOwnProperty("values")) {
                                var opt_arrS = defaultOpts.values.filter(function(a, b) {
                                    console.log(a, b)
                                    if (a[0] === arrS)
                                        return true
                                    else
                                        return false
                                })
                                if (opt_arrS.length > 0 && typeof opt_arrS[0] === "object" && opt_arrS[0].length === 2) {
                                    hasvalue = true
                                }
                            }
                        }

                        // if (hasvalue)
                        data.settings[0][optX] = gos[1][optX].value
                    }

                    data.settings[1].optsV = (typeof gos[2] === "number" ? gos[2] : data.settings[1].optsV)

                    var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
                    var json_rawA = btoa(json_raw)

                    page.cmd("fileWrite", [
                        data_inner_path,
                        json_rawA
                    ], (res) => {
                        if (res == "ok") {
                            var rOpts = JSON.parse(JSON.stringify(defaultOpts))
                            for (var optX in rOpts) {
                                if (typeof rOpts[optX] !== "string")
                                    rOpts[optX].value = data.settings[0][optX]
                            }

                            console.log(gos, rOpts, data.settings, curOptsV)

                            typeof cb === "function" && cb({
                                opts: rOpts,
                                optsV: data.settings[1].optsV
                            }, curOptsV, defaultOpts)
                        } else {
                            page.cmd("wrapperNotification", [
                                "error", "File write error: " + JSON.stringify(res)
                            ])
                        }
                    })
                })
            }
        })
    }

    setSettingsOptions(cb) {
        console.log("Settings options..")

        // page.cmd("wrapperGetLocalStorage", [], (LS) => {
        page.settingsOptions("get", (LS, curOptsV, defaultOpts) => {
            var LS = (typeof LS === "object" ? (Object.keys(LS).length > 0 ? LS : {}) : {})

            console.log(JSON.parse(JSON.stringify(LS)),
                LS.hasOwnProperty("opts"), LS.hasOwnProperty("optsV"),
                JSON.parse(JSON.stringify(LS.opts)),
                JSON.parse(JSON.stringify(LS.optsV)),
                curOptsV, defaultOpts)

            if (!LS.hasOwnProperty("opts")) {
                LS.optsV = curOptsV

                LS.opts = JSON.parse(JSON.stringify(defaultOpts))
            }

            if (LS.optsV !== curOptsV) {
                console.log("New options available!")
                page.cmd("wrapperConfirm", [
                    "There are some new Options available, do you want to update?",
                    "Update"
                ], (confirmed) => {
                    console.log("Updating options..", confirmed)

                    LS.optsV = curOptsV

                    if (LS.hasOwnProperty("opts"))
                        var oldOpts = JSON.parse(JSON.stringify(LS.opts))

                    LS.opts = JSON.parse(JSON.stringify(defaultOpts))

                    console.log(oldOpts, JSON.parse(JSON.stringify(LS.opts)))

                    for (var optX in LS.opts) {
                        var optY = LS.opts[optX]

                        if (oldOpts.hasOwnProperty(optX) && typeof optY !== "string")
                            var OoptY = oldOpts[optX]
                        else
                            continue

                        if (typeof OoptY.value === typeof optY.value || OoptY.type === optY.type) {
                            var hasvalue = false
                            if (optY.hasOwnProperty("values") && OoptY.hasOwnProperty("values")) {
                                for (var optYvalsX in optY.values) {
                                    var optYvalsY = optY.values[optYvalsX]
                                    if (optYvalsY[0] === OoptY.value) {
                                        hasvalue = true

                                        break
                                    } else {
                                        continue
                                    }
                                }
                            } else if (optY.hasOwnProperty("values") || OoptY.hasOwnProperty("values")) {
                                continue
                            } else {
                                hasvalue = true
                            }

                            if (hasvalue) {
                                optY.value = OoptY.value
                            }
                        }

                        LS.opts[optX] = optY
                    }
                    page.LS = LS

                    page.settingsOptions([
                        "set",
                        LS.opts,
                        LS.optsV
                    ])

                    page.genSettingsHTML(LS)

                    for (var optX in LS.opts) {
                        var optY = LS.opts[optX]

                        if (optY.hasOwnProperty("cb") && optY.cb.hasOwnProperty("change") && typeof eval(optY.cb.change) === "function") {
                            // console.log("executing option", optX, optY)
                            eval(optY.cb.change + '()')
                        }
                    }
                })
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
            page.LS = LS
                // console.log(LS, page.LS)

            page.settingsOptions([
                "set",
                LS.opts
            ])

            // page.cmd("wrapperSetLocalStorage", LS, function() {})

            page.genSettingsHTML(LS)

            for (var optX in LS.opts) {
                var optY = LS.opts[optX]

                if (optY.hasOwnProperty("cb") && optY.cb.hasOwnProperty("change") && typeof eval(optY.cb.change) === "function") {
                    // console.log("executing option", optX, optY)
                    eval(optY.cb.change + '()')
                }
            }

            typeof cb === "function" && cb()
        })
    }

    genSettingsHTML(LS) {
        $('#sttngs_container').html('<div class="icon icons loading"></div>')
        var opts = LS.opts || page.LS.opts

        var cntrls = {
            "button": '<div class="column col-3 col-sm-12"><label class="form-label">Y_LABEL</label></div>' +
                '<div class="column col-3 col-sm-12"><button class="btn" type="button" name="sttngs-button-X" id="sttngs-button-X">Y_VALUE</button></div>' +
                '<div class="column col-6 col-sm-12">Y_DESC</div>',
            "input": '<div class="column col-3 col-sm-12><label class="form-label" for="sttngs-input-X">Y_LABEL</label></div>' +
                '<div class="column col-3 col-sm-12"><input class="form-input" type="text" name="sttngs-input-X" id="sttngs-input-X" placeholder="X" value="Y_VALUE" /></div>' +
                '<div class="column col-6 col-sm-12">Y_DESC</div>',
            "checkbox": '<div class="column col-3 col-sm-12"></div>' +
                '<div class="column col-3 col-sm-12"><label class="form-switch"><input type="checkbox" name="sttngs-checkbox-X" id="sttngs-checkbox-X" /><i class="form-icon"></i>Y_LABEL</label></div>' +
                '<div class="column col-6 col-sm-12">Y_DESC</div>',
            "select": '<div class="column col-3 col-sm-12"><label class="form-label" for="sttngs-select-X">Y_LABEL</label></div>' +
                '<div class="column col-3 col-sm-12"><select class="form-select" name="sttngs-select-X" id="sttngs-select-X">Y_VALUE</select></div>' +
                '<div class="column col-6 col-sm-12">Y_DESC</div>'
        }

        var sHTML = $('<form class="form-horizontal"></form>');

        for (var x in opts) {
            var y = opts[x]

            if (typeof y === "string") {
                $('<div class="divider text-center" data-content="' + (y ? y : '') + '"></div>').appendTo(sHTML)
                continue
            }

            y.type = y.type || "";

            (function(x, y, cntrls) {
                // console.log(x, y)
                if (y.type === "input" || (typeof y.value === "string" && y.type === "")) {
                    var el = $('<div class="form-group columns">' + (cntrls.input
                        .replace(/X/gm, x)
                        .replace(/Y_LABEL/gm, y.label)
                        .replace(/Y_DESC/gm, y.desc)
                        .replace(/Y_VALUE/gm, y.value)) + '</div>').appendTo(sHTML)
                    var el2 = el.find('#sttngs-input-' + x)[0]
                    var $el2 = $(el2)

                    $el2.on('change', function() {
                        page.LS.opts[x].value = this.value

                        page.LS = LS

                        page.settingsOptions([
                            "set",
                            LS.opts
                        ])

                        // page.cmd("wrapperSetLocalStorage", page.LS, function() {})

                        var r_ms = page.LS.opts[x].r_ms
                        if (typeof eval(page.LS.opts[x].cb.change) === "function")
                            eval(page.LS.opts[x].cb.change + '()')
                        if (r_ms)
                            page.loadMessages("r_ms", true)
                    })
                } else if (y.type === "checkbox" || y.type === "switch" || (typeof y.value === "boolean" && y.type === "")) {
                    var el = $('<div class="form-group columns">' + (cntrls.checkbox
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

                        page.settingsOptions([
                            "set",
                            LS.opts
                        ])

                        // page.cmd("wrapperSetLocalStorage", page.LS, function() {})

                        var r_ms = page.LS.opts[x].r_ms
                        if (typeof eval(page.LS.opts[x].cb.change) === "function")
                            eval(page.LS.opts[x].cb.change + '()')
                        if (r_ms)
                            page.loadMessages("r_ms", true)
                    })
                } else if (y.type === "select" || (y.values && y.values.constructor === Array && y.type === "")) {
                    var valuesHTML = ''
                    for (var vX in y.values) {
                        var vY = y.values[vX]
                        valuesHTML += '<option value="' + vY[0] + '">' + vY[1] + '</option>'
                    }
                    var el = $('<div class="form-group columns">' + (cntrls.select
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

                        page.settingsOptions([
                            "set",
                            LS.opts
                        ])

                        // page.cmd("wrapperSetLocalStorage", page.LS, function() {})

                        var r_ms = page.LS.opts[x].r_ms
                        if (typeof eval(page.LS.opts[x].cb.change) === "function")
                            eval(page.LS.opts[x].cb.change + '()')
                        if (r_ms)
                            page.loadMessages("r_ms", true)
                    })
                } else if (y.type === "button") {
                    var el = $('<div class="form-group columns">' + (cntrls.button
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
                            page.loadMessages("r_ms", true)
                    })
                }
                // console.log(el, el2)
            })(x, y, cntrls)
        }
        sHTML.appendTo('#sttngs_container')
        $('#sttngs_container').children('.loading').remove()
    }

    verifyUserFiles(cb1, cb2) {
        console.log("Verifying User Files...")

        var data_inner_path = "data/users/" + this.site_info.auth_address + "/data.json"
        var data2_inner_path = "data/users/" + this.site_info.auth_address + "/data_private.json"
        var content_inner_path = "data/users/" + this.site_info.auth_address + "/content.json"

        var curpversion = 2

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

                if (data.pversion !== curpversion)
                    data = {
                        "pversion": curpversion
                    }

                if (!data.hasOwnProperty("private_messages"))
                    data.private_messages = []
                if (!data.hasOwnProperty("private_messages_with"))
                    data.private_messages_with = []

                if (!data.hasOwnProperty("group_messages_with"))
                    data.group_messages_with = []

                console.log("VERIFIED data_private.json", olddata, data)

                page.addPrivateContact(page.site_info.cert_user_id, function(data2, cList) {
                    var json_raw = unescape(encodeURIComponent(JSON.stringify(data2, undefined, '\t')))
                    var json_rawA = btoa(json_raw)

                    if (JSON.stringify(data2) !== JSON.stringify(olddata)) {
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
            })
            verifyData(cb1, cb2)
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
                for (var x = 0; x < data.messages.length; x++) {
                    var y = data.messages[x]
                    if (!y.hasOwnProperty("key")) {
                        data.messages[x].key = generateGUID()
                    }
                }
                if (!data.hasOwnProperty("images"))
                    data.images = []

                if (!data.hasOwnProperty("private_messages"))
                    data.private_messages = []

                if (!data.hasOwnProperty("group_messages"))
                    data.group_messages = []

                if (data.hasOwnProperty("last_seen"))
                    delete data.last_seen
                if (data.hasOwnProperty("public_key"))
                    delete data.public_key


                if (!data.hasOwnProperty("settings") || !data.settings[0] || !data.settings[1]) {
                    page.returnDefaultsOpts(function(curOptsV, defaultOpts) {
                        data.settings = [{}, {}]

                        for (var optX in defaultOpts) {
                            var optY = defaultOpts[optX]

                            data.settings[0][optX] = optY.value
                        }

                        data.settings[1].optsV = curOptsV
                    })
                }

                if (!data.hasOwnProperty("extra_data") || !data.extra_data[0])
                    data.extra_data = [{}]
                if (!data.extra_data[0].hasOwnProperty("last_seen") || parseInt(moment().utc().format("x")) !== data.extra_data[0].last_seen)
                    data.extra_data[0].last_seen = parseInt(moment().utc().format("x"))
                if (!data.extra_data[0].hasOwnProperty("avatar_file_name"))
                    data.extra_data[0].avatar_file_name = ""

                // if (!data.extra_data[0].hasOwnProperty("avatar_file_url"))
                //     data.extra_data[0].avatar_file_url = ""
                // if (data.extra_data[0].hasOwnProperty("avatar_file_url"))
                //     delete data.extra_data[0]["avatar_file_url"]

                if (!data.extra_data[0].hasOwnProperty("auth_address"))
                    data.extra_data[0].auth_address = page.site_info.auth_address

                if (!data.extra_data[0].hasOwnProperty("avatar_type"))
                    data.extra_data[0].avatar_type = 0
                if (!data.extra_data[0].hasOwnProperty("public_key") || !data.extra_data[0].public_key) {
                    page.cmd("userPublickey", [], (public_key) => {
                        data.extra_data[0].public_key = public_key
                        verifyData_2(data, olddata, cb1, cb2)
                    })
                } else {
                    verifyData_2(data, olddata, cb1, cb2)
                }
            })
        }

        function verifyData_2(data, olddata, cb1, cb2) {
            console.log("VERIFIED data.json", olddata, data)

            if (JSON.stringify(data) !== JSON.stringify(olddata)) {
                console.log("data.json HAS RECEIVED A UPDATE!")

                if (parseInt(moment().utc().format("x")) !== data.extra_data[0].last_seen)
                    data.extra_data[0].last_seen = parseInt(moment().utc().format("x"))

                var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
                var json_rawA = btoa(json_raw)

                page.cmd("fileWrite", [
                    data_inner_path,
                    json_rawA
                ], (res) => {
                    if (res == "ok") {
                        console.log("data.json HAS BEEN UPDATED!")

                        if (typeof cb1 === "function")
                            cb1(data, olddata, true)
                        verifyContent(data, olddata, cb2)
                    } else {
                        page.cmd("wrapperNotification", [
                            "error", "File write error: " + JSON.stringify(res)
                        ])
                    }
                })
            } else {
                if (typeof cb1 === "function")
                    cb1(data, olddata, false)
                verifyContent(data, olddata, cb2)
            }
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

                var curoptional = ".+\\.(png|jpg|jpeg|gif|mp3|ogg|mp4)"
                var curignore = "(?!(.+\\.(png|jpg|jpeg|gif|mp3|ogg|mp4)|data.json))"
                if (!data2.hasOwnProperty("optional") || data2.optional !== curoptional)
                    data2.optional = curoptional
                if (!data2.hasOwnProperty("ignore") || data2.ignore !== curignore)
                    data2.ignore = curignore
                console.log("VERIFIED content.json", olddata2, data2)

                if (JSON.stringify(data2) !== JSON.stringify(olddata2) || JSON.stringify(data) !== JSON.stringify(olddata)) {
                    console.log("content.json HAS RECEIVED A UPDATE!")

                    var json_raw2 = unescape(encodeURIComponent(JSON.stringify(data2, undefined, '\t')))
                    var json_rawA2 = btoa(json_raw2)

                    page.cmd("fileWrite", [
                        content_inner_path,
                        json_rawA2
                    ], (res) => {
                        if (res == "ok") {
                            console.log("content.json HAS BEEN UPDATED!")
                            if (typeof cb2 === "function")
                                cb2(data2, olddata2, true)
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
                                            // "done", "Everything is set up! You are ready to go. :)"
                                        ])
                                })
                            })
                        } else {
                            page.cmd("wrapperNotification", [
                                "error", "File write error: " + JSON.stringify(res)
                            ])
                        }
                    })
                } else {
                    if (typeof cb2 === "function")
                        cb2(data2, olddata2, false)
                }
            })
        }

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
        this.cmd("siteInfo", {}, (site_info) => {
            this.site_info = site_info
            this.setSiteInfo(site_info)
            if (site_info.cert_user_id) {
                this.verifyUserFiles()
                this.setSettingsOptions(function() {
                    page.onLoginUser()

                    page.filrchGuiInit()

                    page.messageCounterArr = {}
                    page.loadMessages("first time")

                    page.genContactsList()
                    page.genGroupsList()

                    var pbn_pc = getParameterByName('PC')
                    var pbn_gc = getParameterByName('GC')

                    console.log("Opening a chat", pbn_pc, pbn_gc)

                    if (pbn_pc) {
                        page.loadPrivateMessages('selected user', true, pbn_pc)
                    } else if (pbn_gc) {
                        page.loadGroupMessages('selected group', true, pbn_gc)
                    }
                })
            }
        })

        console.log("Ready to call ZeroFrame API!")
    }
}
page = new ThunderWave();