const express = require('express')
const net = require('net');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.raw({
    inflate: true,
    limit: '100kb',
    type: 'text/plain'
}));

const SERVER_PORT = 3000
const MAXIMA_PORT = 3001

let socket = null

const server = net.createServer(function (s) {
    console.log('new connection')
    socket = s

    socket.setEncoding('ascii')
    socket.on('end', () => {
        socket = null
    })
    socket.on('error', (err) => {
        console.error(err)
    })

});


server.listen(MAXIMA_PORT, '127.0.0.1');


app.post('/', (req, res) => {
    console.log(req.body.toString('ascii'))
    if (socket == null) {
        res.status(500)
        res.end('Currently not connected to maxima')
    } else {
        socket.write(req.body.toString('ascii') )
        function sendOutput(data){
            console.log('data:' + data)
            res.end(data)
            socket.off('data', sendOutput)
        }
        socket.on('data', sendOutput)
    }
})

app.get('/status', (req, res) => {
    res.send(`currently ${socket == null ? 'not' : ''} connected to maxima` )
})

app.listen(SERVER_PORT, () => {
    console.log(`Example app listening at http://localhost:${SERVER_PORT}`)
})

