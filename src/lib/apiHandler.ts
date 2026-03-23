export type ApiSuccess<T> = {
   success: true,
   data: T
}

export type ApiError = {
   success: false,
   message: string
}

export type ApiResult<T> = ApiSuccess<T> | ApiError

export const handleApi = async <T>(
      apiCall: () => Promise<{data: any}>
   ): Promise<ApiResult<T>> => {
      try{
         const res = await apiCall();

         return {
            success: true,
            data: res.data.data as T
         }
      }catch(error: any){
         return {
            success: false,
            message: error?.response?.data?.message || "Somethig went wrong!",
         }
      }
}