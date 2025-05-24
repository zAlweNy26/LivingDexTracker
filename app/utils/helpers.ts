import { z } from 'zod'

/**
 * Catches errors from a promise.
 * @param promise The promise to handle.
 * @param options Additional options for handling the promise.
 * @returns A tuple with either the error or the result of the promise.
 * @throws Will rethrow the error if it is not in the `errorsToCatch` array.
 */
export async function tryCatch<T = any, E extends new (...args: any[]) => Error = ErrorConstructor>(
  promise: Promise<T>,
  options?: {
    /** An optional array of error constructors to catch */
    errorsToCatch?: E[]
    /** An optional message to log when an error occurs */
    logMessage?: string
    /** A callback function to execute on success */
    onSuccess?: (result: T) => void
    /** A callback function to execute on error */
    onError?: (error: E) => void
  },
): Promise<[undefined, T] | [InstanceType<E>]> {
  const { errorsToCatch, logMessage, onError, onSuccess } = options ?? {}
  try {
    const res = await promise
    onSuccess?.(res)
    return [undefined, res]
  }
  catch (error: any) {
    if (errorsToCatch === undefined || errorsToCatch.some(e => error instanceof e)) {
      console.error(logMessage || 'An error occurred while executing a promise:')
      console.dir(error)
      onError?.(error)
      return [error]
    }
    throw error
  }
}

/**
 * Retrieves the default values for a given Zod schema.
 * @param schema The Zod schema for which to retrieve the default values.
 * @param defaults A partial object containing default values for the schema.
 * @param discriminant The discriminant value for discriminated unions.
 */
export function getZodDefaults<T extends z.ZodTypeAny>(schema: T, defaults?: Partial<T['_output']>, discriminant?: string): T['_output'] | undefined {
  if (schema instanceof z.ZodDefault) return schema._def.defaultValue()
  else if (schema instanceof z.ZodEnum) return schema.options[0]
  else if (schema instanceof z.ZodNativeEnum) return Object.values(schema.enum)[0]
  else if (schema instanceof z.ZodLiteral) return schema.value
  else if (schema instanceof z.ZodEffects) return getZodDefaults(schema.innerType(), defaults, discriminant)
  else if (schema instanceof z.ZodDiscriminatedUnion) {
    if (!discriminant) throw new Error('Discriminant value is required for discriminated unions')
    for (const [key, val] of schema._def.optionsMap.entries())
      if (key === discriminant) return getZodDefaults(val, defaults, discriminant)

    return getZodDefaults(schema._def.options[0], defaults, discriminant)
  }
  else if (schema instanceof z.ZodObject) {
    const shape = schema._def.shape()
    const result: any = {}
    for (const key in shape) {
      const value = getZodDefaults(shape[key], defaults, discriminant)
      result[key] = defaults?.[key] || value
    }
    return result
  }
  else if (schema instanceof z.ZodArray) {
    const result = getZodDefaults(schema.element, defaults, discriminant)
    const isObj = typeof result === 'object' && Object.keys(result).length > 0
    const isOther = typeof result !== 'object' && result !== undefined
    return isOther || isObj ? [result] : []
  }
  else if (schema instanceof z.ZodUnion) {
    for (const val of schema.options) {
      const value = getZodDefaults(val, defaults, discriminant)
      if (value !== undefined) return value
    }
    return undefined
  }
  else return undefined
}
