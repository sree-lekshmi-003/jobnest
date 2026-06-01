const UserDashboard = () => {

  const name = localStorage.getItem("name")

  return (
    <div>
      <h1>
        Welcome back, {name}! 👋
      </h1>
    </div>
  )
}

export default UserDashboard