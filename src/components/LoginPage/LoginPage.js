import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { login } from "../../store/modules/login";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  submit: {
    margin: theme.spacing(3, 0)
  },
  errorText: {
    textAlign: "center",
    fontSize: "20px"
  },
  spinner: {
    position: "absolute"
  }
}));

const LoginValidation = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required()
});

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector(state => state.login);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);


  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Formik
            initialValues={{ name: "", password: "" }}
            onSubmit={values => {
              dispatch(login(values));
            }}
            validationSchema={LoginValidation}
          >
            {({
              values,
              handleSubmit,
              handleChange,
              handleBlur,
              touched,
              errors
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  name="name"
                  placeholder="User"
                  label="User"
                  variant="outlined"
                  margin="normal"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.name && touched.name && errors.name}
                  error={errors.name && touched.name && errors.name}
                  required
                  fullWidth
                />
                <TextField
                  name="password"
                  placeholder="Password"
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                  error={errors.password && touched.password && errors.password}
                  required
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  fullWidth
                >
                  Login
                  {loading && (
                    <CircularProgress
                      color="secondary"
                      classes={{ root: classes.spinner }}
                    />
                  )}
                </Button>

                {!!error && (
                  <FormHelperText error classes={{ root: classes.errorText }}>
                    {error}
                  </FormHelperText>
                )}
              </form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
