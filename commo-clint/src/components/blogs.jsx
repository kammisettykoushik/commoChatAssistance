import React from "react";

const BlogPage = () => {
  return (
    <div>
      <style>{`
        .blog-container {
          font-family: Arial, sans-serif;
          color: #000;
        }

        .blog-header {
          background-color: #d9fcf9;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: start;
          border-bottom: 2px solid #ccc;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .location {
          margin: 0.5rem 0;
        }

        .blog-nav {
          margin-top: 0.5rem;
        }

        .blog-nav a {
          margin-right: 1rem;
          text-decoration: none;
          font-weight: bold;
          color: black;
        }

        .blog-content {
          padding: 2rem;
        }

        .blog-content h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .blog-content h2 {
          font-size: 1.2rem;
          margin-top: 1.5rem;
        }

        .blog-content ul {
          padding-left: 1.5rem;
        }

        .blog-content p {
          line-height: 1.6;
        }
      `}</style>

      <div className="blog-container">
        <header className="blog-header">
          <div className="logo">BLOGSITE</div>
          <div className="location">📍 SaroorNagar, Doctors Colony</div>
          <nav className="blog-nav">
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Login</a>
          </nav>
        </header>

        <main className="blog-content">
          <h1>Blog Title: How We Built Our Booking System</h1>
          <p>Welcome to our official blog!</p>
          <p>
            This blog outlines how we designed the booking system used on our
            platform. By using our platform, you accept our processes and
            policies as described.
          </p>

          <h2>Booking Process</h2>
          <p>
            Once a user confirms a booking, it is considered final and cannot
            be canceled or refunded except under specific circumstances.
          </p>

          <h2>Customer Support</h2>
          <p>
            If you face issues while using the service, feel free to contact
            us. We're always here to help.
          </p>

          <h2>Technologies Used</h2>
          <ul>
            <li>ReactJS for frontend</li>
            <li>Node.js + Express for backend</li>
            <li>MongoDB for database</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            We use cookies to enhance user experience. Continued use of this
            site means you agree to our cookie policy.
          </p>
        </main>
      </div>
    </div>
  );
};

export default BlogPage;
