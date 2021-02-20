import classnames from "classnames";

export const inputConditionalClassname = (err) => {
  return classnames("form-control form-control-lg", {
    "is-invalid": err,
  });
};

export const displayInputErrorMessage = (err) => (
  <div className="invalid-feedback">{err}</div>
);

export const displayErrorMessage = (errMsg) => (
  <div className="alert alert-danger" role="alert">
    {errMsg}
  </div>
);
