// import { PrismaClient } from "@prisma/client"

// export const client = new PrismaClient()
import { MeiliSearch} from 'meilisearch'
const runtimeConfig = useRuntimeConfig()

console.log(runtimeConfig.apiSecret)
export const client = new MeiliSearch({
  host: 'http://cocktailcoach.vypxl.io:7700',
  apiKey: runtimeConfig.apiSecret,
})
