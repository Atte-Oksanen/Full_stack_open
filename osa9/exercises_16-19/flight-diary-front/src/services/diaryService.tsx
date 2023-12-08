import axios from "axios";
import { DiaryEntry } from "../types";
const BASE_URL = 'http://localhost:3000/api/diaries'

export const getDiaries = async () => {
  return (await axios.get(BASE_URL)).data
}

export const addNewDiary = async (diary: Omit<DiaryEntry, 'id'>) => {
  return (await axios.post(BASE_URL, diary)).data
}