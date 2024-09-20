import React, { useState, useEffect } from "react";
import { createProject, getProject } from "../../actions/ProjectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import classnames from "classnames";

const UpdateProject = ({ getProject, createProject, project, errors }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    projectName: "",
    projectIdentifier: "",
    description: "",
    start_date: "",
    end_date: "",
    errors: {},
  });

  const { projectName, projectIdentifier, description, start_date, end_date } =
    formData;

  useEffect(() => {
    getProject(id, navigate);
  }, [id, getProject, navigate]);

  const formatDate = (date) => {
    if (date) {
      const [year, month, day] = date.split("-");
      return `20${year}-${month}-${day}`;
    }
    return "";
  };
  useEffect(() => {
    if (errors) {
      setFormData((prevData) => ({
        ...prevData,
        errors: errors,
      }));
    }
  }, [errors]);

  useEffect(() => {
    if (project) {
      setFormData({
        id: project.id || "",
        projectName: project.projectName || "",
        projectIdentifier: project.projectIdentifier || "",
        description: project.description || "",
        start_date: formatDate(project.start_date),
        end_date: formatDate(project.end_date),
        errors: project.errors,
      });
    }
  }, [project]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await createProject(formData);
    if (success) {
      navigate("/dashboard");
    }
  };
  return (
    <div className="project">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Update Project form</h5>
            <hr />
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg ", {
                    "is-invalid": errors.projectName,
                  })}
                  placeholder="Project Name"
                  name="projectName"
                  value={projectName}
                  onChange={onChange}
                />
                {errors.projectName && (
                  <div className="invalid-feedback">{errors.projectName}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  value={projectIdentifier}
                  disabled
                />
              </div>
              <div className="form-group">
                <textarea
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.description,
                  })}
                  placeholder="Project Description"
                  name="description"
                  value={description}
                  onChange={onChange}
                ></textarea>
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <h6>Start Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="start_date"
                  value={start_date}
                  onChange={onChange}
                />
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="end_date"
                  value={end_date}
                  onChange={onChange}
                />
              </div>

              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project.project,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProject, createProject })(
  UpdateProject
);
