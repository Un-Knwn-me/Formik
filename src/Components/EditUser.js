import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Base from '../Base';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Fab, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

// schema validation
export const userValidationSchema = yup.object({
  name: yup.string().required("Please enter your name").min(3, "Minimum 3 characters required"),
  email: yup.string().required("Please enter your email"),
  gender: yup.string().required("Please enter your gender"),
  password: yup.string().required("Please enter your password").min(8, "Minimum 8 characters required"),
  img: yup.string().required("Please enter your image URL"),
  age: yup.number().required("Please enter your age"),
});

const EditUser = ({ userData, setUserData }) => {
  const history = useHistory();
  const { id } = useParams();
  const [showPassword, setShowPassword] = useState(false);

  const user = userData.find(user => user.id === id);

  const handleSubmit = (values) => {
    updateUserData(values);
  };

  const updateUserData = async (updatedUser) => {
    try {
      const res = await fetch(`https://643d2495f0ec48ce90536438.mockapi.io/Users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data) {
        const editUserIndex = userData.findIndex((user) => user.id === id);
        userData[editUserIndex] = updatedUser;
        setUserData([...userData]);
        history.push("/user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      gender: user?.gender || "",
      password: user?.password || "",
      age: user?.age || "",
      img: user?.img || "",
    },
    validationSchema: userValidationSchema,
    onSubmit: handleSubmit,
  });

  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <Base title={"Edit User"}>
       <Box
      sx={{
        maxWidth: 400,
        margin: '0 auto',
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 4,
        backgroundColor: '#fff',
      }}
    >
      <div className="input-section">
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="outlined-name"
            label="Name"
            onChange={handleChange}
            value={values.name}
            onBlur={handleBlur}
            name="name"
            variant="outlined"
            sx={{ m: 1, width: '25ch' }} 
          />
          {touched.name && errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

          <TextField
            id="outlined-mail"
            label="E-mail"
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            value={values.email}
            name="email"
            variant="outlined"
            sx={{ m: 1, width: '25ch' }} 
          />
          {touched.email && errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

          <TextField
            id="outlined-gender"
            label="Gender"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.gender}
            name="gender"
            variant="outlined"
            sx={{ m: 1, width: '25ch' }} 
          />
          {touched.gender && errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}

          <TextField
            id="outlined-number"
            label="Age"
            type="number"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.age}
            name="age"
            variant="outlined"
            sx={{ m: 1, width: '25ch' }} 
          />
          {touched.age && errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}

          <TextField
            id="outlined-basic"
            onBlur={handleBlur}
            label="Image URL"
            onChange={handleChange}
            value={values.img}
            name="img"
            variant="outlined"
            sx={{ m: 1, width: '25ch' }} 
          />
          {touched.img && errors.img && <p style={{ color: 'red' }}>{errors.img}</p>}

          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              onChange={handleChange}
              value={values.password}
              name="password"
            />
          </FormControl>

          {touched.password && errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

          <Fab variant="extended" type="submit" color="success" style={{ margin: '0 auto', display: 'flex' }}>
            Update User
          </Fab>
        </form>
      </div>
      </Box>
    </Base>
  );
};

export default EditUser;
