import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createProject } from "../../actions/ProjectActions";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";

const AddProject = ({ errors }) => {
  const [projectData, setProjectData] = useState({
    projectName: "",
    projectIdentifier: "",
    description: "",
    start_date: "",
    end_date: "",
    errors: {},
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (errors) {
      setProjectData((prevData) => ({
        ...prevData,
        errors: errors,
      }));
    }
  }, [errors]);

  const onChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newProject = {
      projectName: projectData.projectName,
      projectIdentifier: projectData.projectIdentifier,
      description: projectData.description,
      start_date: projectData.start_date,
      end_date: projectData.end_date,
      errors: projectData.errors,
    };
    const success = await dispatch(createProject(newProject));
    if (success) {
      navigate("/dashboard");
    }
    console.log(newProject);
  };
  return (
    <div>
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Project form</h5>
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
                    value={projectData.projectName}
                    onChange={onChange}
                  />
                  {errors.projectName && (
                    <div className="invalid-feedback">{errors.projectName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.projectIdentifier,
                    })}
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={projectData.projectIdentifier}
                    onChange={onChange}
                  />
                  {errors.projectIdentifier && (
                    <div className="invalid-feedback">
                      {errors.projectIdentifier}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.description,
                    })}
                    placeholder="Project Description"
                    name="description"
                    value={projectData.description}
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
                    value={projectData.start_date}
                    onChange={onChange}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="end_date"
                    value={projectData.end_date}
                    onChange={onChange}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createProject })(AddProject);
