function testPrivateCrypto(oU) {
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