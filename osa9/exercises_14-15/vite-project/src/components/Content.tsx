import Part from "./Part"
import { CoursePart } from "../types"

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map(part => {
        return (
          <p>
            <Part coursePart={part}></Part>
          </p>
        )
      })}
    </div>
  )
}

export default Content