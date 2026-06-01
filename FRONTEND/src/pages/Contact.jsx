const Contact = () => {
  return (
    <div className="contact-container">

      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you. Get in touch with our team.
        </p>
      </div>

      <div className="contact-content">

        <div className="contact-info">

          <div className="info-card">
            <h3>📍 Address</h3>
            <p>Kollam, Kerala, India</p>
          </div>

          <div className="info-card">
            <h3>📞 Phone</h3>
            <p>+91 9876543210</p>
          </div>

          <div className="info-card">
            <h3>✉ Email</h3>
            <p>support@jobnest.com</p>
          </div>

          <div className="info-card">
            <h3>🕒 Working Hours</h3>
            <p>Mon - Fri : 9:00 AM - 6:00 PM</p>
          </div>

        </div>

        <div className="contact-form">

          <h2>Send a Message</h2>

          <form>

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Your Email"
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              rows="6"
              placeholder="Your Message"
            />

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Contact