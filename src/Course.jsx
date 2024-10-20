const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p key={part.id}>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <div>
    {parts.map(part => <Part part={part} />)}  
  </div>

const Course = ({course}) => {
  const sum = course.parts.reduce((acc, val) => acc += val.exercises, 0)
   
  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total sum={sum}/>
    </>
  )
}

export default Course