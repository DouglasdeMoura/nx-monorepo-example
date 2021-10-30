import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app = new Koa()
const posts = new Router()

posts
  .get('/posts', async (ctx, next) => {
    const posts = await prisma.post.findMany()

    ctx.body = posts
    await next()
  })
  .get('/posts/:id', async (ctx, next) => {
    const post = await prisma.post.findFirst({ where: { id: Number(ctx.params.id) } })

    ctx.body = post
    await next()
  })
  .post('/posts', async (ctx, next) => {
    console.log(ctx.req)
    const { authorId, title, content } = ctx.request.body
    const post = await prisma.post.create({ data: { title, content, authorId: Number(authorId) } })

    ctx.body = post
    await next()
  })
  .patch('/posts/:id', async (ctx, next) => {
    const { title, content } = ctx.request.body
    const post = await prisma.post.update({
      where: { id: Number(ctx.params.id) },
      data: { title, content },
    })

    ctx.body = post
    await next()
  })
  .delete('/posts/:id', async (ctx, next) => {
    const post = await prisma.post.delete({ where: { id: Number(ctx.params.id) } })

    ctx.body = post
    await next()
  })

app
  .use(bodyParser())
  .use(posts.routes())
  .use(posts.allowedMethods());

const port = process.env.port || 4000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`)
});
server.on('error', console.error)
