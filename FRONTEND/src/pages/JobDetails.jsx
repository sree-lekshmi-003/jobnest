import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const JobDetails = () => {

  const { id } = useParams()

  const [job, setJob] = useState(null)

  useEffect(() => {

    fetch('http://localhost:3000/jobs/alljobs')
      .then(res => res.json())
      .then(data => {

        const selectedJob = data.data.find(
          item => item._id === id
        )

        setJob(selectedJob)
      })

  }, [id])

  const applyJob = async () => {

    const token = localStorage.getItem('token')

    if (!token) {
      alert('Please login first')
      return
    }

    try {

      const response = await fetch(
        `http://localhost:3000/applications/apply/${job._id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      alert(data.msg)

    } catch (error) {
      console.log(error)
    }
  }

  if (!job) {
    return <h2>Loading...</h2>
  }

  return (

    <div className="job-details">

      <div className="job-details-card">

        <h1>{job.jobRole}</h1>

        <h2>{job.company}</h2>

        <p><strong>Location:</strong> {job.location}</p>

        <p><strong>Salary:</strong> {job.salary}</p>

        <p><strong>Job Type:</strong> {job.jobtype}</p>

        <h3>Job Description</h3>

        <p>{job.description}</p>

        <button onClick={applyJob}>
          Apply Now
        </button>

      </div>

    </div>
  )
}

export default JobDetails