import Fastify from 'fastify'
import Cors from '@fastify/cors'
import chalk from 'chalk'

const app = Fastify({
    logger: true
})

app.register(Cors, {
    origin: true
})

app.listen({
    port: 3333
}).then(() => console.log(chalk.blueBright('Server is running')))
