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
    return '<div class="popover hasimage isgif-' + isgif + '">' +
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

        var message_timestamp = ('<a class="message-timestamp ' + (page.LS.opts.show_timestamps.value ? "" : "hide") + '" href="javascript:answer2MSG(\'tc_' + msgkey + '\');' + /*#tc_' + msgkey + '*/ '">' + curtime + '</a>')
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
            .replace(/(?:\?\!\[tc_(.{8}-.{4}-.{4}-.{4}-.{12})\])/gm, function(match, p1) {
                page.quoteDisplayer(p1)

                return '<div id="QUOTEREPLACE_' + p1 + '" class="icon icons loading">QUOTE ' + p1 + '</div>'
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
                $pcl.append('<li class="tab-item" tab="' + y + '"><a href="javascript:page.loadPrivateMessages(\'selected user\', true, \'' + y + '\');$(\'#private_recipient\').val(\'' + y + '\');"><figure class="avatar avatar-sm" data-initial="' + y.substr(0, 2) + '"><div avatarimg="' + y + '"></div></figure> ' + y + '</a></li>');

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
            .replace(/((?:(?:[\w]+)@(?:zeroid|zeroverse|kaffie|cryptoid)\.bit)|@(?:[\w]+))/gmi, function(match, p1) { // ((?:[\w]+)@(?:zeroid|zeroverse)\.bit)
                var profile_link_part = (page.LS.opts.parse_profile_links.value ? '<a class="message-profile-link" onclick="add2PMSGInput(\'' + p1 + ' \'); return false;" href="?u/' + encodeURI(p1) + '">' + p1 + '</a>' : '<span class="message-profile-link">' + p1 + '</span>')
                var isthisuser = (p1.match(new RegExp(page.site_info.cert_user_id + "|@" + page.site_info.cert_user_id.split("@")[0], "gmi"))) ? true : false
                return (isthisuser ? "<mark>" : "") + profile_link_part + (isthisuser ? "</mark>" : "")
            })
        if (!page.LS.opts.disable_emojis.value)
            message_parsed = emojione.toImage(message_parsed)

        var msg_part_2_1 = '<div id="P_tc_' + msgkey + '" P_tc="' + date_added + '" class="card mb-5">' +
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

        page.lastprivatemessagewas = {
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

        var data_inner_path = "data/users/" + this.site_info.auth_address + "/data.json"
        var data2_inner_path = "data/users/" + this.site_info.auth_address + "/data_private.json"
        var content_inner_path = "data/users/" + this.site_info.auth_address + "/content.json"

        console.log("LOLO", message3, message2, message, recipient2, recipient);

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
                                        console.log("DATA2 0", JSON.parse(JSON.stringify(data2)), cList);
                                        page.genContactsList()

                                        console.log("DATA2 1", JSON.parse(JSON.stringify(data2)))

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
                                                        if (!message3)
                                                            $('#private_message').val("")
                                                        autosize.update($('#private_message'))

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

    loadPrivateMessages(loadcode, override, sender2) {
        var verified = this.verifyUser()
        if (!verified)
            return false

        var sender2 = sender2 || false
        var sender = sender2 || $('#private_recipient').val()
        if (!sender)
            sender = this.site_info.cert_user_id

        var override = override || false
        var goingback = goingback || false

        console.log("Loading private messages with code >" + loadcode + "<..", sender, override, goingback)

        changeWorkinTabber('#main-tabs', 'PrivateChat')

        page.addPrivateContact(sender, function() {
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

                $m.children('.loading').remove()

                config$bH(loadcode === "load more" || goingback, true)

                setTimeout(function() {
                    page.getAvatar(sender, (img) => {
                        // console.log("IMAGE FOR", sender, img)
                        $('[avatarimg="' + sender + '"]').replaceWith(img)
                    })
                    page.getAvatar(page.site_info.cert_user_id, (img) => {
                        // console.log("IMAGE FOR", page.site_info.cert_user_id, img)
                        $('[avatarimg="' + page.site_info.cert_user_id + '"]').replaceWith(img)
                    })
                }, 1000)
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
                        if (!message3)
                            $('#message').val("")
                        autosize.update($('#message'))

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
        var isp = isp || '[is-private!="true"]'

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

        this.verifyUserFiles()

        console.log("MUP >> 3.0 :: " + isp, files);

        for (var fX in files) {
            var fY = files[fX]
            console.log("MUP >> 3.1 :: ", fX, fY)

            if (!fY || typeof fY !== 'object' || !fY.type.match('(image)\/(png|jpg|jpeg|gif)|(audio)\/(mp3|ogg)|(video)\/(ogg)')) // |audio|video      || !fY.name.match(/\.IMAGETYPE$/gm)
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

        console.log("Getting quote", tc);

        (function(_tc) {
            page.cmd("dbQuery", [
                "SELECT * FROM messages LEFT JOIN json USING (json_id) WHERE key = \"" + _tc + "\""
            ], (quote) => {
                if (quote && quote[0])
                    quote = quote[0]
                console.log("Got quote", _tc, quote)

                var mmnt = moment(quote.date_added, "x")

                var curdate = mmnt.format("MMMM Do, YYYY")
                var curtime = mmnt.format("HH:mm:ss")

                var curdate2 = moment(curdate, "MMMM Do, YYYY").format("x")
                var rcurdate = moment().format("MMMM Do, YYYY")
                var curdate3 = (curdate === rcurdate ? "Today" : (moment(rcurdate, "MMMM Do, YYYY").subtract(1, "d").format("MMMM Do, YYYY") === curdate ? "Yesterday" : curdate));

                $('#QUOTEREPLACE_' + _tc).replaceWith($('<div class="quote">' +
                    '<blockquote cite="tc_' + _tc + '">' + quote.body +
                    '<by> - ' + quote.cert_user_id + ' | <on onclick="javascript:window.location.hash=\'t_' + tc + '\'">' +
                    curdate3 + ' ' + curtime + '</on></by>' +
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
                    lsl_HTML += '<dd>public key: <a href="javascript:page.addPrivateContact(\'' + y.cert_user_id + '\', page.genContactsList);page.loadPrivateMessages(\'selected user\', true, \'' + y.cert_user_id + '\');$(\'#private_recipient\').val(\'' + y.cert_user_id + '\');"><i>' + y.public_key + '</i></a></dd>'
            }

            $('#last_seen_list').html(lsl_HTML)
            $('#last_seen_list_c').html(count)
        })
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
                    margin: 0.2,
                    size: asv,
                    format: 'svg'
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

            if (override) {
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

    onRequest(cmd, message) {
        // console.log("COMMAND", cmd, message)
        if (cmd == "setSiteInfo") {
            this.site_info = message.params // Save site info data to allow access it later
            this.setSiteInfo(message.params)

            if (this.site_info.cert_user_id) {
                $('.hideifnotloggedin').removeClass("hide")
                $("#select_user").html("Change user")
                $('#current_user_name').html(this.site_info.cert_user_id)

                page.getAvatar(this.site_info.cert_user_id, (img) => {
                    $('#current_user_avatar').html('<figure class="avatar" data-initial="' + this.site_info.cert_user_id.substr(0, 2) + '" onclick="">' + img + '</figure>')
                })

                page.genContactsList()

                if (message.params.hasOwnProperty("event") && message.params.event[0] === "cert_changed" && message.params.event[1]) {
                    // this.messageCounterArr = {}
                    this.loadMessages("cert changed")
                }
            } else {
                $('.hideifnotloggedin').addClass("hide")
                $("#select_user").html("Select user")
                $('#current_user_name').html("Please login first")
                $('#current_user_avatar').html('<figure class="avatar" data-initial="TW"></figure>')
            }

            if (message.params.hasOwnProperty("event") && message.params.event[0] == "file_done")
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

        var dis = this
        this.cmd("wrapperGetLocalStorage", [], (LS) => {
            var LS = (typeof LS === "object" ? (LS || {}) : {})

            // console.log(LS, LS.hasOwnProperty("opts"), LS.opts)
            var curOptsV = 14
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
                                } else {
                                    page.cmd("feedFollow", [{}])
                                }
                            }
                        ).toString() + ')'
                    }
                },
                "divider_3": "",
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

            if (!LS.hasOwnProperty("opts")) {
                LS.optsV = curOptsV

                if (LS.hasOwnProperty("opts"))
                    var oldOpts = LS.opts

                LS.opts = JSON.parse(JSON.stringify(defaultOpts))
            }

            if (LS.optsV !== curOptsV) {
                page.cmd("wrapperConfirm", [
                    "There are some new Options available, do you want to update?",
                    "Update"
                ], (confirmed) => {
                    LS.optsV = curOptsV

                    if (LS.hasOwnProperty("opts"))
                        var oldOpts = LS.opts

                    LS.opts = JSON.parse(JSON.stringify(defaultOpts))

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

                                if (optY.cb.hasOwnProperty("change") && typeof eval(optY.cb.change) === "function") {
                                    eval(optY.cb.change + '()')
                                }
                            }
                        }

                        LS.opts[optX] = optY
                    }

                    page.genSettingsHTML(LS)
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
            dis.LS = LS
                // console.log(LS, dis.LS)
            dis.cmd("wrapperSetLocalStorage", LS, function() {})
            page.genSettingsHTML(LS)
        })
    }

    genSettingsHTML(LS) {
        $('#sttngs_container').html('<div class="icon icons loading"></div>')
        var opts = LS.opts

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
                            page.loadMessages("r_ms", true)
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
                            page.loadMessages("r_ms", true)
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
                            page.loadMessages("r_ms", true)
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

                if (data.hasOwnProperty("last_seen"))
                    delete data.last_seen
                if (data.hasOwnProperty("public_key"))
                    delete data.public_key

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

                var curoptional = ".+\\.(png|jpg|jpeg|gif|mp3|ogg)"
                var curignore = "(?!(.+\\.(png|jpg|jpeg|gif|mp3|ogg)|data.json))"
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