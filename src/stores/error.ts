import type { CustomError, ExtendedPostgrestError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | ExtendedPostgrestError>(null)
  const isCustomError = ref(false)

  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError | Error
    customCode?: number
  }) => {
    if (typeof error === 'string') {
      isCustomError.value = true
    }

    if (typeof error === 'string') {
      activeError.value = Error(error)
      activeError.value.customCode = customCode
    } else if (error instanceof Error) {
      activeError.value = error as CustomError
      activeError.value.customCode = customCode || 500
    } else {
      activeError.value = {
        ...(error as PostgrestError),
        statusCode: customCode,
      }
    }
  }

  const clearError = () => {
    activeError.value = null
  }

  return {
    activeError,
    setError,
    isCustomError,
    clearError,
  }
})
