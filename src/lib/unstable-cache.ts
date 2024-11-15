import { unstable_cache as next_unstable_cache } from 'next/cache'
import { cache } from 'react'
import { parse, stringify } from 'superjson'

export const unstable_cache = cache(
  <T, P extends unknown[]>(
    fn: (...params: P) => Promise<T>,
    keys: Parameters<typeof next_unstable_cache>[1],
    opts: Parameters<typeof next_unstable_cache>[2],
  ) => {
    const wrap = async (params: unknown[]): Promise<string> => {
      const result = await fn(...(params as P))
      return stringify(result)
    }

    const cachedFn = next_unstable_cache(wrap, keys, opts)

    return async (...params: P): Promise<T> => {
      const result = await cachedFn(params)
      return parse(result)
    }
  },
)
