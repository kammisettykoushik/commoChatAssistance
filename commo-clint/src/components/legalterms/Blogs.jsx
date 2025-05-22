import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const blogData = [
  {
    title: 'Digital Marketing',
    image: 'https://cdn-icons-png.flaticon.com/512/883/883806.png',
    heading: 'DIGITAL MARKETING',
    description: `Digital marketing involves promoting products or services using online platforms like social media, search engines, and email. 
    It helps businesses reach their target audience, boost brand awareness, and drive sales. Key tactics include SEO, content marketing, and paid advertising.`,
  },
  {
    title: 'HTML5 & CSS3',
    image: 'https://cdn-icons-png.flaticon.com/512/732/732212.png',
    heading: 'HTML5 & CSS3',
    description: `HTML5 is the latest version of the markup language used to structure web content, introducing semantic elements for better accessibility. 
    CSS3 enables advanced styling options like animations, transitions, and gradients.`,
  },
  {
    title: 'JavaScript',
    image: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
    heading: 'JAVASCRIPT',
    description: 'JavaScript is a versatile scripting language used to create dynamic website content. It enables interactive features such as sliders, forms, and real-time updates.',
  },
  {
    title: 'React.js',
    image: 'https://cdn-icons-png.flaticon.com/512/919/919851.png',
    heading: 'REACT.JS',
    description: 'React is a popular JavaScript library for building user interfaces using components. It simplifies state management and enhances performance with virtual DOM.',
  },
  {
    title: 'Node.js',
    image: 'https://cdn-icons-png.flaticon.com/512/919/919825.png',
    heading: 'NODE.JS',
    description: 'Node.js allows JavaScript to run on the server side. It’s commonly used for backend development and enables full-stack JavaScript applications.',
  },
  {
    title: 'Bootstrap',
    image: 'https://cdn-icons-png.flaticon.com/512/5968/5968672.png',
    heading: 'BOOTSTRAP',
    description: 'Bootstrap is a CSS framework that helps in designing responsive and mobile-first websites. It provides pre-styled components and grid systems.',
  },
];

const HelpCenter = () => {
  return (
    <div className="container py-5">
      <style>{`
        .help-center-card {
          border-radius: 20px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: #fff;
        }
        .help-center-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        .help-center-img {
          max-height: 160px;
          max-width: 160px;
          object-fit: contain;
          margin-bottom: 20px;
        }
        .help-center-heading {
          color: #343a40;
        }
        .help-center-link {
          color: #0d6efd;
          font-weight: 500;
          text-decoration: none;
        }
        .help-center-link:hover {
          text-decoration: underline;
        }
        .help-center-description {
          color: #6c757d;
          font-size: 0.95rem;
        }
      `}</style>

      <h2 className="text-center fw-bold mb-5">We are Introducing Our Technologies</h2>
      <div className="row justify-content-center">
        {blogData.map((blog, index) => (
          <div key={index} className="col-md-5 col-lg-4 m-3">
            <div className="card help-center-card h-100 text-center p-3">
              <img
                src={blog.image}
                alt={blog.title}
                className="help-center-img mx-auto d-block"
              />
              <div className="card-body">
                <h5 className="card-title help-center-heading">{blog.heading}</h5>
                <a href="#" className="help-center-link d-block mb-2">
                  {blog.title}
                </a>
                <p className="card-text help-center-description">{blog.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpCenter;
