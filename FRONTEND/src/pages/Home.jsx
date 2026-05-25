import { useEffect, useState } from 'react'

const Home = () => {

  const [jobs, setJobs] = useState([])

  useEffect(() => {

    fetch('http://localhost:3000/jobs/alljobs')

      .then(res => res.json())

      .then(data => setJobs(data.data))

  }, [])

  // ---------------- APPLY JOB ----------------

  const applyJob = async (jobid) => {

    const token = localStorage.getItem('token')

    if (!token) {

      alert('Please login first')

      return
    }

    try {

      const response = await fetch(

        `http://localhost:3000/applications/apply/${jobid}`,

        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
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

  return (

    <div>

      <div className='hero'>

        <div className='hero-content'>

          <h1>
            Find Your Dream Job
          </h1>

          <p>
            Apply for top companies easily
          </p>

          <button>
            Explore Jobs
          </button>

        </div>

      </div>

      <div className='jobs-container'>

        {
          jobs.map((job) => (

            <div className='job-card' key={job._id}>

              <h2>{job.jobRole}</h2>

              <h3>{job.company}</h3>

              <p>{job.location}</p>

              <p>{job.salary}</p>

              <button
                onClick={() => applyJob(job._id)}
              >
                Apply Now
              </button>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default Home