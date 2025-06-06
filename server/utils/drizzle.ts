import { drizzle } from 'drizzle-orm/d1'
import * as authSchema from '../database/auth-schema'
import * as schema from '../database/schema'

export { and, eq, or, sql } from 'drizzle-orm'

export const tables = { ...authSchema, ...schema }

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema: tables, casing: 'snake_case', logger: true })
}
