import { Form } from 'react-router-dom'

const WorkoutDetails = ({ workout, submit }) => {
  return (
    <div className="workout-details">
      <ul>
        <h4>{workout?.title}</h4>
        <li>
          <strong>Load (kg): </strong>
          {workout?.load}
        </li>
        <li>
          <strong>Reps: </strong>
          {workout?.reps}
        </li>
        <li> {new Date(workout.createdAt).toLocaleString()}</li>
      </ul>
      <div className="form-actions">
        <Form method="DELETE" onSubmit={submit}>
          <input type="hidden" name="id" value={workout._id} />
          <button
            type="submit"
            aria-label="delete"
            name="_action"
            value="DELETE"
            title="delete"
          >
            X
          </button>
        </Form>
        <Form method="GET" onSubmit={submit}>
          <input type="hidden" name="id" value={workout._id} />
          <button
            type="submit"
            aria-label="edit"
            name="_action"
            value="EDIT"
            title="edit"
          >
            ✍🏻
          </button>
        </Form>
      </div>
    </div>
  )
}

export default WorkoutDetails
