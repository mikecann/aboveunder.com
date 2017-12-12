const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  // custom route for posts
  server.get('/post/:id', (req, res) => {
    return app.render(req, res, '/post', {
      id: req.params.id
    })
  })

  server.get('/print/:id/:option/:size', (req, res) => {
    return app.render(req, res, '/print', {
      id: req.params.id,
      option: req.params.option,
      size: req.params.size,
    })
  })

  server.get('/print/:id/:option', (req, res) => {
    return app.render(req, res, '/print', {
      id: req.params.id,
      option: req.params.option
    })
  })

  server.get('/print/:id', (req, res) => {
    return app.render(req, res, '/print', {
      id: req.params.id
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
