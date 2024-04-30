import express from 'express'
import { remultExpress } from 'remult/remult-express'
import { repo } from 'remult'
import { createPostgresDataProvider } from 'remult/postgres'
import { City } from '../model/city.ts'

export const app = express()
const DATABASE_URL = process.env['DATABASE_URL']
app.use(
  remultExpress({
    dataProvider: DATABASE_URL
      ? createPostgresDataProvider({ connectionString: DATABASE_URL })
      : // Use JsonDataProvider if DATABASE_URL is not set
        undefined,
    admin: true,
    entities: [City],
    initApi: async () => {
      const cityRepo = repo(City)
      if ((await cityRepo.count()) == 0) {
        await cityRepo.insert(
          ['New York', 'Los Angeles', 'Tel Aviv'].map((name) => ({ name }))
        )
      }
    },
  })
)
