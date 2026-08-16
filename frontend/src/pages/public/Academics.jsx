import { Link } from "react-router-dom";
import "./Academics.css";

const academicsData = [
  {
    id: "cse",
    name: "B.Tech Computer Science Engineering Course (CSE)",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "csbs",
    name: "Computer Science and Business Systems",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ece",
    name: "B.Tech Electronics and Communication Engineering (ECE)",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ee",
    name: "Electrical Engineering",
    image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "me",
    name: "BTech Mechanical Engineering Course",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ce",
    name: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1541888086925-920a0f443b2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const Academics = () => {
  return (
    <div className="academics-container">
      <div className="academics-header">
        <p className="academics-subtitle">
          GMIT currently offers six essential engineering disciplines as a<br />
          part of its pedagogy.
        </p>
      </div>
      
      <div className="academics-grid">
        {academicsData.map((course) => (
          <Link to={`/academics/${course.id}`} key={course.id} className="academic-card">
            <div className="academic-card-bg" style={{ backgroundImage: `url(${course.image})` }}></div>
            <div className="academic-card-overlay"></div>
            <div className="academic-card-content">
              <h3>{course.name}</h3>
              <span className="know-more">Know More &rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Academics;
