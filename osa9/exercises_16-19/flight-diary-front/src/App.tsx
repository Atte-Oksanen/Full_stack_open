import { useEffect, useState } from "react"
import Diaries from "./components/Diaries"
import { getDiaries } from "./services/diaryService"
import { DiaryEntry } from "./types"
import NewDiary from "./components/newDiary"

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    const setDiaryState = async () => {
      setDiaries(await getDiaries())
    }
    setDiaryState()
  }, [])
  return (
    <div>
      <NewDiary diaries={diaries} setDiaries={setDiaries}></NewDiary>
      <Diaries diaries={diaries}></Diaries>
    </div>
  )
}

export default App
