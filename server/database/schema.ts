import { sql } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { users } from './auth-schema'

export const pokedex = sqliteTable('pokedex', {
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
  ndex: text('ndex').notNull(),
  form: integer('form').notNull().default(0),
  shiny: integer('shiny', { mode: 'boolean' }).notNull().default(false), // 0 = not shiny, 1 = shiny
  value: integer('value', { mode: 'boolean' }).notNull().default(false), // false = seen, true = caught
  game: integer('game'), // game id
}, table => [
  primaryKey({ columns: [table.userId, table.ndex, table.form, table.shiny] }),
])

export type PokedexInput = typeof pokedex.$inferInsert
export type PokedexOutput = typeof pokedex.$inferSelect
