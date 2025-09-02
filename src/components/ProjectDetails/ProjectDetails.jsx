


const ProjectDetails = ({ project }) => (
    <div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        {/* Project-specific content */}
        <div className="project-actions">
            <button className="project-button">
                Edit
            </button>
            <button className="project-button">
                Delete
            </button>
        </div>
    </div>
);