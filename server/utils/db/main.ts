import { PrismaClient } from "@prisma/client"

export const sql_client = new PrismaClient()
import { MeiliSearch} from 'meilisearch'
const runtimeConfig = useRuntimeConfig()

export const client = new MeiliSearch({
  host: 'http://cocktailcoach.vypxl.io:7700',
  apiKey: runtimeConfig.apiSecret,
})
