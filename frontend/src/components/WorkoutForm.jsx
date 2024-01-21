import { useEffect, useRef } from 'react'
import { Form, useNavigation } from 'react-router-dom'

const WorkoutForm = ({ onSubmit, workout, actionType }) => {
  const navigation = useNavigation()
  const isAdding =
    navigation?.state === 'submitting' &&
    navigation?.formData.get('_action') === 'CREATE'
      ? 'Adding...'
      : 'ADD'
  const isSumitting =
    navigation?.state === 'submitting' &&
    navigation?.formData.get('_action') === 'CREATE'
  const isEditing =
    navigation?.state === 'submitting' &&
    navigation?.formData.get('_action') === 'EDIT'

  const formRef = useRef()

  useEffect(() => {
    if (isAdding || isEditing) {
      formRef.current.reset()
      formRef.current.querySelector('#title').focus()
    }
  }, [isAdding, isEditing])

  return (
    <Form
      onSubmit={onSubmit}
      method={`${actionType === 'EDIT' ? 'PATCH' : 'POST'}`}
      ref={formRef}
    >
      <fieldset disabled={isSumitting}>
        <legend>Add new Workout</legend>
        <div className="form-group">
          <label htmlFor="title">Exercice Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={workout && workout?.title}
            placeholder="type title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reps">Repetition: </label>
          <input
            id="reps"
            type="number"
            name="reps"
            defaultValue={workout && workout.reps}
            placeholder="type reps"
            min={1}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="load">Load:</label>
          <input
            id="load"
            type="number"
            name="load"
            placeholder="type load"
            defaultValue={workout && workout.load}
            min={1}
            required
          />
        </div>
        <input type="hidden" name="id" value={workout && workout._id} />
        <button
          type="submit"
          name="_action"
          value={`${actionType === 'EDIT' ? 'EDIT' : 'CREATE'}`}
        >
          {actionType ? 'EDIT' : isAdding}
        </button>
      </fieldset>
    </Form>
  )
}

export default WorkoutForm
