import Fastify from 'fastify'
import Cors from '@fastify/cors'
import chalk from 'chalk'
import { CreateUser } from './controllers/user/create'
import { getUserId } from './controllers/user/getUserId'
import { CreateWatch } from './controllers/watch/create'
import { getAllWatches } from './controllers/watch/getAllWatches'
import { GetWatchId } from './controllers/watch/getWatchId'
import { GetAllBrand } from './controllers/brand/getAllBrand'
import { GetBrandId } from './controllers/brand/getBrandId'

const app = Fastify({
    logger: true
})

app.register(Cors, {
    origin: true
})

app.register(CreateUser)
app.register(getUserId)

app.register(CreateWatch)
app.register(getAllWatches)
app.register(GetWatchId)

app.register(GetAllBrand)
app.register(GetBrandId)

app.listen({
    port: 3333
}).then(() => console.log(chalk.blueBright('Server is running')))
