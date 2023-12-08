import { CoursePart } from "../types"

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  const getPartType = () => {
    switch (coursePart.kind) {
      case "basic":
        return (
          <div>
            <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
            <p>{coursePart.description}</p>
          </div>
        )
      case "group":
        return (
          <div>
            <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
            <p>Group projects {coursePart.groupProjectCount}</p>
          </div>
        )
      case "background":
        return (
          <div>
            <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
            <p>{coursePart.description}</p>
            <p>{coursePart.backgroundMaterial}</p>
          </div>
        )
      case "special":
        return (
          <div>
            <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
            <p>{coursePart.description}</p>
            <p>Required skills</p>
            <ul>{coursePart.requirements.map(req => {
              return (
                <li>{req}</li>
              )
            })}</ul>
          </div>
        )
      default:
        return (
          <div>no type</div>
        )
    }
  }
  return (
    <div>
      {getPartType()}
    </div>
  )
}

export default Part