import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  const [showPopup, setShowPopup] = useState(false)
  const [jobs, setJobs] = useState([])

  useEffect(() => {

    fetch('http://localhost:3000/jobs/alljobs')
      .then(res => res.json())
      .then(data => setJobs(data.data))

  }, [])

  const applyJob = async (jobid) => {

    const token = localStorage.getItem('token')

    if (!token) {
      setShowPopup(true)
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
    <>
      <div>

        <div className='hero'>
          <div className='hero-content'>

            <h1>Find Your Dream Job</h1>

            <p>Apply for top companies easily</p>

            <button
              onClick={() => {

                const token = localStorage.getItem('token')

                if (token) {
                  navigate('/jobs')
                } else {
                  setShowPopup(true)
                }

              }}
            >
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
                <div className="job-buttons">

                  <button
                    className="details-btn"
                    onClick={() => navigate(`/job/${job._id}`)}
                  >
                    View Details
                  </button>

                  <button
                    className="apply-btn"
                    onClick={() => applyJob(job._id)}
                  >
                    Apply Now
                  </button>

                </div>

              </div>

            ))
          }

        </div>

      </div>

      {showPopup && (

        <div className='popup-overlay'>

          <div className='popup-box'>

            <h2>Login Required</h2>

            <p>Please Login or Register</p>

            <div className='popup-buttons'>

              <button onClick={() => navigate('/login')}>
                Login
              </button>

              <button onClick={() => navigate('/register')}>
                Register
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  )
}

export default Home