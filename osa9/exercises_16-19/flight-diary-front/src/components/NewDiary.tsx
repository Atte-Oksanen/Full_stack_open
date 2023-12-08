import { Dispatch, SetStateAction, useState } from "react";
import { DiaryEntry, Visibility, Weather } from "../types";
import { addNewDiary } from "../services/diaryService";

const NewDiary = ({ diaries, setDiaries }: { diaries: DiaryEntry[], setDiaries: Dispatch<SetStateAction<DiaryEntry[]>> }) => {
  const [weather, setWeather] = useState<Weather>()
  const [visibility, setVisibility] = useState<Visibility>()
  const [date, setDate] = useState<string>('')
  const [comment, setComment] = useState<string>('')

  const handleWeatherChange = (event: React.FormEvent<HTMLInputElement>) => {
    const foundInEnum = Object.values(Weather).find(value => value === event.currentTarget.id)
    if (foundInEnum) {
      setWeather(foundInEnum)
    }
  }

  const handleVisibilityChange = (event: React.FormEvent<HTMLInputElement>) => {
    const foundInEnum = Object.values(Visibility).find(value => value === event.currentTarget.id)
    if (foundInEnum) {
      setVisibility(foundInEnum)
    }
  }

  const handleDateChange = (event: React.FormEvent<HTMLInputElement>) => {
    setDate(event.currentTarget.value)
  }

  const handleCommentChange = (event: React.FormEvent<HTMLInputElement>) => {
    setComment(event.currentTarget.value)
  }

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (weather && visibility) {
      const newDiary = await addNewDiary({ date, weather, visibility, comment })
      setDiaries(diaries.concat(newDiary))
    }
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={event => submitForm(event)}>
        <label htmlFor="date">Date</label>
        <input type="date" id="date" onChange={event => handleDateChange(event)} />
        <br />
        <div>
          Visiblity
          <br />
          {Object.values(Visibility).map(key => {
            return (
              <div key={key} style={{ display: 'inline-block' }}>
                <label htmlFor={key}>{key}</label>
                <input type="radio" id={key} name="weather" onChange={(event) => handleVisibilityChange(event)} />
              </div>
            )
          })}
        </div>
        <div>
          Weather
          <br />
          {Object.values(Weather).map(key => {
            return (
              <div key={key} style={{ display: 'inline-block' }}>
                <label htmlFor={key}>{key}</label>
                <input type="radio" id={key} name="weather" onChange={(event) => handleWeatherChange(event)} />
              </div>
            )
          })}
        </div>
        <label htmlFor="comment">comment</label>
        <input type="text" id="comment" onChange={event => handleCommentChange(event)} value={comment} />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default NewDiary 