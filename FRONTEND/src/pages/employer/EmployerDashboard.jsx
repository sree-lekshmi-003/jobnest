import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const EmployerDashboard = () => {

  const [jobs, setJobs] = useState([])

  const [formData, setFormData] = useState({
    jobRole: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    jobtype: ''
  })

  const token = localStorage.getItem('token')
  const userid = localStorage.getItem('userid')
  const navigate = useNavigate()

  // ---------------- GET JOBS ----------------

  const fetchJobs = async () => {

    try {

      const response = await fetch(
        'http://localhost:3000/jobs/alljobs'
      )

      const data = await response.json()

      const myJobs = data.data.filter(
        job => job.employer === userid
      )

      setJobs(myJobs)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  // ---------------- HANDLE INPUT ----------------

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // ---------------- CREATE JOB ----------------

  const createJob = async (e) => {

    e.preventDefault()

    try {

      const response = await fetch(
        'http://localhost:3000/jobs/createjob',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        }
      )

      const data = await response.json()

      alert(data.msg)

      fetchJobs()

      setFormData({
        jobRole: '',
        company: '',
        location: '',
        salary: '',
        description: '',
        jobtype: ''
      })

    } catch (error) {
      console.log(error)
    }
  }

  // ---------------- DELETE JOB ----------------

  const deleteJob = async (id) => {

    try {

      const response = await fetch(
        `http://localhost:3000/jobs/deletejobs/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      alert(data.msg)

      fetchJobs()

    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div className="dashboard-container">

      <h1>
        Welcome Employer 👋
      </h1>

      <h2>Create New Job</h2>

      <form
        className="job-form"
        onSubmit={createJob}
      >

        <input
          type="text"
          name="jobRole"
          placeholder="Job Role"
          value={formData.jobRole}
          onChange={handleChange}
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
        />

        <input
          type="text"
          name="jobtype"
          placeholder="Job Type"
          value={formData.jobtype}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">Post Job</button>

      </form>

      <h2>My Jobs</h2>

      <div className="jobs-grid">

        {
          jobs.map(job => (

            <div
              className="job-card"
              key={job._id}>

              <h3>{job.jobRole}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.salary}</p>

              <div className="job-buttons">

                <button className="details-btn"
                  onClick={() => navigate(`/applicants/${job._id}`)}
                >
                  View Applicants
                </button>

                <button className="apply-btn"
                  onClick={() => deleteJob(job._id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))
        }

      </div>

    </div>
  )
}

export default EmployerDashboard