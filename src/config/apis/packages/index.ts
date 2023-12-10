import { axiosClient } from '@/config/lib/axiosConfig'
import { type QuerySinglePackage, type QueryPackages, type ResponsePackages, type ResponsePackage } from '@/models/package.model'
import { type AxiosPromise } from 'axios'

const controller = '/FarmingPackage'

export const getListPackages = async (
  params: QueryPackages
): AxiosPromise<ResponsePackages> =>
  axiosClient.get(`${controller}/GetList`, { params })

export const getSinglePackage = async (
  params: QuerySinglePackage,
): AxiosPromise<ResponsePackage> => 
  axiosClient.get(`${controller}/Get`, { params })