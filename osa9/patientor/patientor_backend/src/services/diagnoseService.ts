import diagnoseData from '../data/diagnoses'
import { diagnosis } from '../types'


const getEntries = (): diagnosis[] => {
  return diagnoseData
}

export default getEntries