import { Hono } from 'hono'
import { ard } from './ard'

const app = new Hono()

app.get('/', (c) => c.redirect("https://philip.nagler.world"))
app.route('/ard', ard)

export default app
