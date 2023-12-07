import axiosClient from '@/config/lib/axiosConfig'
import { type QueryPackage, type ResponsePackage } from '@/models/package.model'

const controller = '/FarmingPackage'

export const getListPackages  = async (params: QueryPackage) : Promise<ResponsePackage> =>
  axiosClient.get(`${controller}/GetList`, { params })
