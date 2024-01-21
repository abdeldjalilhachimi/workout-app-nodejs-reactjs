import { useLoaderData, useSubmit, json, redirect } from 'react-router-dom'
import Navbar from '../components/Navbar'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

export const loader = async ({ request }) => {
  let url = new URL(request.url)
  let id = url.searchParams.get('id')
  let actionType = url.searchParams.get('_action')
  let workout

  if (id) {
    const result = await fetch(
      `${import.meta.env.REACT_APP_BASE_URL_API}/api/workouts/${id}`,
    )
    workout = await result.json()
  }

  const resultAll = await fetch(
    `${import.meta.env.REACT_APP_BASE_URL_API}/api/workouts`,
  )
  const workouts = await resultAll.json()

  return json({ workouts, workout, actionType, workoutId: id })
}

export const workoutAction = async ({ request }) => {
  try {
    const formData = await request.formData()
    const _action = formData.get('_action')
    const title = String(formData.get('title'))
    const reps = parseInt(formData.get('reps'))
    const load = parseInt(formData.get('load'))
    const workout = { title, load, reps }
    const id = formData.get('id')

    switch (_action) {
      case 'CREATE': {
        const res = await fetch(
          `${import.meta.env.REACT_APP_BASE_URL_API}/api/workouts`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(workout),
          },
        )

        if (!res.ok) {
          console.error('Error Creating Workout:', res.statusText)
          throw new Error('Error Creating Workout')
        }

        return redirect('/')
      }
      case 'DELETE': {
        const res = await fetch(
          `${import.meta.env.REACT_APP_BASE_URL_API}/api/workouts/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        if (!res.ok) {
          console.error('Error Deleting Workout:', res.statusText)
          throw new Error('Error Deleting Workout')
        }

        return redirect('/')
      }
      case 'EDIT': {
        const res = await fetch(
          `${import.meta.env.REACT_APP_BASE_URL_API}/api/workouts/${id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(workout),
          },
        )
        if (!res.ok) {
          console.error('Error Editing Workout:', res.statusText)
          throw new Error('Error Editing Workout')
        }
        return redirect('/')
      }
      default: {
        throw new Response('', { status: 405 })
      }
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    throw new Error('Unexpected error occurred')
  }
}

const Home = () => {
  const { workouts, workout, actionType } = useLoaderData()
  const submit = useSubmit()

  return (
    <div className="home">
      <Navbar />
      <div className="workouts-container">
        <div className="workouts">
          {workouts.length > 0 ? (
            workouts?.map((workout) => {
              return (
                <WorkoutDetails
                  key={workout._id}
                  workout={workout}
                  submit={submit}
                />
              )
            })
          ) : (
            <p>There are no Workouts yet.</p>
          )}
        </div>
        <div className="workouts-form">
          <WorkoutForm
            onSubmit={submit}
            workout={workout}
            actionType={actionType}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
