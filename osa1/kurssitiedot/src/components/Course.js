const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total exercises={course.parts} />
        </div>
    )
}

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    );
}

const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    )
}

const Content = (props) => {
    const parts = props.parts
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
        </div>
    )
}

const Total = (props) => {
    const parts = props.exercises
    return (
        <p><b>Total of {parts.map(exercise => exercise.exercises).reduce((a, b) => a + b, 0)} exercises</b></p>
    )
}


export default Course