import type { FetchOptions } from 'ohmyfetch'

export const useCustomFetch = (url: string, option?: FetchOptions) => {
  const { apiBaseUrl: baseURL } = useRuntimeConfig()
  return $fetch(url, {
    baseURL,
    ...(option && { ...option })
  })
}
