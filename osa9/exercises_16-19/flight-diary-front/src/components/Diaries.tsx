import { DiaryEntry } from "../types"

const Diaries = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map(diary => {
        return (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <p>
              visibility: {diary.visibility}
              <br />
              weather: {diary.weather}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default Diaries