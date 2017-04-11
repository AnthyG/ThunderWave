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

    return '<a href="' + href + '" target="_blank" ' + (title ? ('title="' + title + '"') : '') + '>' + text + '</a>'
}
markedR.image = function(href, title, text) {
    var href = href || '',
        title = title || '',
        text = text || ''
    return '<a href="' + href + '" target="_blank"><img src="' + href + '" alt="' + text + '" class="img-responsive rounded" ' + (title ? ('title="' + title + '"') : (text ? ('title="' + text + '"') : '')) + (this.options.xhtml ? '/>' : '>' + '</a>')
}



class Da_Net extends ZeroFrame {
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
        var user_is_mentioned = (message_escaped.match(new RegExp(page.site_info.cert_user_id + "|@" + page.site_info.cert_user_id.split("@")[0], "gm"))) ? true : false
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
            CDalreadyexists = $("<li id='d_" + curdate2 + "' timestamp-date='" + curdate2 + "'><div class='divider text-center' data-content='" + (curdate3) + "' onclick='javascript:window.location.hash=\"#d_" + curdate2 + "\";'></div><ul class='times-messages unstyled'></ul></li>")
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
        var message_parsed = emojione.toImage(
            marked(
                message_escaped
                // .replace(/(http(s)?:\/\/([\S]+))/gm, function(match, p1) {
                //     return (page.LS.opts.parse_links.value ? '<a class="message-link" href="' + encodeURI(p1) + '" target="_blank">' + p1 + '</a>' : '<span class="message-link">' + p1 + '</span>')
                // })
                , {
                    renderer: markedR
                }
            )
            .replace(/((?:(?:[\w]+)@(?:zeroid|zeroverse|kaffie)\.bit)|@(?:[\w]+))/gm, function(match, p1) { // ((?:[\w]+)@(?:zeroid|zeroverse)\.bit)
                var profile_link_part = (page.LS.opts.parse_profile_links.value ? '<a class="message-profile-link" onclick="add2MSGInput(\'' + p1 + '\'); return false;" href="?u/' + encodeURI(p1) + '">' + p1 + '</a>' : '<span class="message-profile-link">' + p1 + '</span>')
                var isthisuser = (p1.match(new RegExp(page.site_info.cert_user_id + "|@" + page.site_info.cert_user_id.split("@")[0], "gm"))) ? true : false
                return (isthisuser ? "<mark>" : "") + profile_link_part + (isthisuser ? "</mark>" : "")
            })
        )

        // console.log(CDalreadyexists, CDalreadyexistsC)

        var msg_part_2_1 = '<div id="tc_' + msgkey + '" tc="' + date_added + '" class="card mb-5">' +
            ((users_own_message || (thismessageis.same_user && thismessageis.same_date && thismessageis.in_time_range)) ? "" :
                '<div class="card-header"><small class="tile-title">' + username + '</small></div>') + '<div class="card-body text-break">' +
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

    sendMessage(message3) {
        var verified = this.verifyUser()
        if (!verified)
            return false

        this.verifyUserFiles()

        var messag3 = message3 || false
        var message2 = message3 || $("#message").val()

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
            var message = message2
                .replace(/\n{3,}/gm, "\n\n")
                .trim()

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
                            $("#message").val("")
                        autosize.update($('#message'))

                        // Publish the file to other users
                        this.cmd("siteSign", {
                            "inner_path": content_inner_path
                        }, (res) => {
                            this.loadMessages(false, data.messages.length === 1 ? false : true)
                            this.cmd("sitePublish", {
                                "inner_path": content_inner_path,
                                "sign": false
                            }, function() {})
                        })

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

            if (!fY || typeof fY !== 'object' || !fY.type.match('(image)\.(png|jpg|jpeg|gif)')) // |audio|video      || !fY.name.match(/\.IMAGETYPE$/gm)
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
                                                    $('#message').val($('#message').val() + ' ![ALTTEXT](/' + page.site_info.address + '/' + f_path + ')')

                                                    // Publish the file to other users
                                                    page.cmd("siteSign", {
                                                        "inner_path": content_inner_path
                                                    }, (res) => {
                                                        page.cmd("sitePublish", {
                                                            "inner_path": content_inner_path,
                                                            "sign": false
                                                        }, function() {})
                                                    })
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

    loadMessages(override, to_now, from_time, to_time, ADESC, goingback) {
        var verified = this.verifyUser()
        if (!verified)
            return false

        console.log("Loading messages..")
        var override = override === false ? false : true
        var to_now = to_now || false
        var goingback = goingback || false

        var ADESC = ADESC === "ASC" ? "ASC" : "DESC"

        if (page.hasOwnProperty("firstmessagewas") && page.firstmessagewas.date_added && !to_now) {
            var from_time2 = moment(page.firstmessagewas.date_added, "x").subtract(2, "d").format("x"),
                to_time2 = moment(page.firstmessagewas.date_added, "x").format("x"),
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
        console.log(moment(from_time, "x").format(mmntfrmt) + " :: " + moment(to_time, "x").format(mmntfrmt), v)

        this.cmd("dbQuery", [
            "SELECT * FROM messages LEFT JOIN json USING (json_id) WHERE date_added > " + from_time + " ORDER BY date_added DESC" //WHERE date_added > " + from_time + " AND date_added < " + to_time + " ORDER BY date_added " + ADESC + " LIMIT 5" // OFFSET " + offset
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
                "date_added": !messages[0] ? 0 : messages.length > 1 ? 0 : messages[0].date_added
            }
            console.log(messages[0], page.firstmessagewas)

            for (var i = 0; i < messages.length; i++) {
                this.addMessage(messages[i].message_id, messages[i].cert_user_id, messages[i].body, messages[i].date_added, override ? false : true)
            }
            $m.find('.loading').remove()

            config$bH(goingback)

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
        if (cmd == "setSiteInfo") {
            this.site_info = message.params // Save site info data to allow access it later
            this.setSiteInfo(message.params)

            if (message.params.cert_user_id) {
                $("#select_user").html(message.params.cert_user_id)

                // this.loadMessages()
            } else
                $("#select_user").html("Select user")

            if (message.params.event[0] == "file_done")
                this.loadMessages()
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
            var curOptsV = 6
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
                        "value": 1,
                        "values": [
                            [1, "Square"],
                            [2, "Arrow at top"],
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
                                page.loadMessages()
                        })
                    } else if (y.type === "checkbox" || (typeof y.value === "boolean" && y.type === "")) {
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
                                page.loadMessages()
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
                                page.loadMessages()
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
                                page.loadMessages()
                        })
                    }
                    // console.log(el, el2)
                })(x, y, cntrls)
            }
            sHTML.appendTo('#sttngs_container')
            $('#sttngs_container').find('.loading').remove()
        })
    }

    verifyUserFiles() {
        var data_inner_path = "data/users/" + this.site_info.auth_address + "/data.json"
        var content_inner_path = "data/users/" + this.site_info.auth_address + "/content.json"

        // Verify data.json
        page.cmd("fileGet", {
            "inner_path": data_inner_path,
            "required": false
        }, (data) => {
            if (data)
                var data = JSON.parse(data)
            else
                var data = {}

            if (!data.hasOwnProperty("messages"))
                data.messages = [{
                    "body": emojione.toShort("## Joined Da_Net :wave::blush:"),
                    "date_added": parseInt(moment().utc().format("x"))
                }]
            if (!data.hasOwnProperty("images"))
                data.images = []

            var json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
            var json_rawA = btoa(json_raw)

            page.cmd("fileWrite", [
                data_inner_path,
                json_rawA
            ], (res) => {
                if (res == "ok") {

                    // Verify content.json
                    page.cmd("fileGet", {
                        "inner_path": content_inner_path,
                        "required": false
                    }, (data2) => {
                        if (data2)
                            var data2 = JSON.parse(data2)
                        else
                            var data2 = {}

                        var curoptional = ".+\\.(png|jpg|jpeg|gif)"
                        if (!data2.hasOwnProperty("optional") || data2.optional !== curoptional)
                            data2.optional = curoptional

                        var json_raw2 = unescape(encodeURIComponent(JSON.stringify(data2, undefined, '\t')))
                        var json_rawA2 = btoa(json_raw2)

                        page.cmd("fileWrite", [
                            content_inner_path,
                            json_rawA2
                        ], (res) => {
                            if (res == "ok") {
                                page.cmd("siteSign", {
                                    "inner_path": content_inner_path
                                }, (res) => {
                                    page.cmd("sitePublish", {
                                        "inner_path": content_inner_path,
                                        "sign": false
                                    }, function() {
                                        console.log(data.messages, data.messages.length)
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
                    })
                } else {
                    page.cmd("wrapperNotification", [
                        "error", "File write error: " + JSON.stringify(res)
                    ])
                }
            })
        })
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
                $("#select_user").text(site_info.cert_user_id)

                this.verifyUserFiles()
                this.loadMessages()
            }
        })

        console.log("Ready to call ZeroFrame API!")
    }
}
page = new Da_Net();