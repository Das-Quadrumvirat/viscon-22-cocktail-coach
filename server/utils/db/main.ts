import { PrismaClient } from "@prisma/client"

export const sql_client = new PrismaClient()
import { MeiliSearch} from 'meilisearch'
const runtimeConfig = useRuntimeConfig()

export const client = new MeiliSearch({
  host: runtimeConfig.meiliURL,
  apiKey: runtimeConfig.apiSecret,
})
