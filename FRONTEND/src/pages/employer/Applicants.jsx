import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Applicants = () => {

  const { jobid } = useParams()

  const [applicants, setApplicants] = useState([])

  const token = localStorage.getItem('token')

  const fetchApplicants = async () => {

    try {

      const response = await fetch(
        `http://localhost:3000/applications/applicants/${jobid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      setApplicants(data.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchApplicants()
  }, [])

  const updateStatus = async (applicationid, status) => {

    try {

      const response = await fetch(
        `http://localhost:3000/applications/updatestatus/${applicationid}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({ status })
        }
      )

      const data = await response.json()

      alert(data.msg)

      fetchApplicants()

    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div className="applicants-page">

      <h1>Applicants</h1>

      {
        applicants.map(applicant => (

          <div
            className="applicant-card"
            key={applicant._id}
          >

            <h3>{applicant.user.name}</h3>

            <p>{applicant.user.email}</p>

            <p>
              Status:
              <strong>
                {" "}
                {applicant.status}
              </strong>
            </p>

            <div className="action-buttons">

              <button
                onClick={() =>
                  updateStatus(
                    applicant._id,
                    'Accepted'
                  )
                }
              >
                Accept
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    applicant._id,
                    'Rejected'
                  )
                }
              >
                Reject
              </button>

            </div>

          </div>

        ))
      }

    </div>
  )
}

export default Applicants