const express = require('express')
const app = express()
const port = 8000
const form = `<!DOCTYPE html>
            <html lang="en-US">
            <form method="post" action="respondWithUsername">
            <fieldset>
            <input type="text" value="sometext" name="userName">
            <input type="submit" value="Submit Username">
            </fieldset>
            </form>
            </html>`
const tooLargeResponse = `<!DOCTYPE html>
                        <html lang="en-US">
                        <body>413: Request too large</body>
                        </html>`
const methodNotSupported = `<!DOCTYPE html>
                            <html lang="en-US">
                            <body>405: Method not supported</body>
                            </html>`
const passUsernameToClient = (username) => {
    const str = `<!DOCTYPE html>
                <html lang="en-US">
                <head>
                <meta charset="UTF-8">
                <title>Username Response</title>
                </head>
                <body>This is your username: ${username}</body>
                </html>`
    return str;
}

app.post('/respondWithUsername', (req, res) => {
    let reqBody = ''
    console.log(req.ip)
    req.on('data', (data) => {
        reqBody = String(data)
        if (reqBody.length > 1e7) {
            res.send(tooLargeResponse)
        }
    })
    res.send(req.body)
})

app.get('/', (req, res) => {
    res.send(form)
})

app.listen(port)