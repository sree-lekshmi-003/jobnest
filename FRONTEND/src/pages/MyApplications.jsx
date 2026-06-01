import { useEffect, useState } from 'react'

const MyApplications = () => {

  const [applications, setApplications] = useState([])

  useEffect(() => {

    const token = localStorage.getItem('token')

    fetch(
      'http://localhost:3000/applications/myapplications',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(res => res.json())
      .then(data => setApplications(data.data))

  }, [])

  return (
  <div className="applications-page">

    <h1>My Applications</h1>

    <div className="applications-grid">

      {applications.map(app => (

        <div className="application-card" key={app._id}>

          <h2>{app.job.jobRole}</h2>

          <h3>{app.job.company}</h3>

          <p><strong>Location:</strong> {app.job.location}</p>

          <p><strong>Salary:</strong> {app.job.salary}</p>

          <p><strong>Job Type:</strong> {app.job.jobtype}</p>

          <p>
            <strong>Description:</strong>
            <br />
            {app.job.description}
          </p>

          <span className={`status ${app.status.toLowerCase()}`}>
            {app.status}
          </span>

        </div>

      ))}

    </div>

  </div>
)
}

export default MyApplications