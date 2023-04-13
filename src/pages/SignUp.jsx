import {
    Button,
    Container,
    Stack,
    TextField,
    Typography,
    Link,
    Box,
} from '@mui/material';
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { isLength, isEmail, contains } from "validator";

import ErrorAlert from '../components/ErrorAlert';

import { signup } from "../handlers/users";
import { logInUser } from "../helpers/authHelper";




export default function SignUp() {
    // const navigate = useNavigate();
    const [serverError, setServerError] = useState("");
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
        dept: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validate();
        if (Object.keys(errors).length !== 0) return;

        const data = await signup(formData);

        if (data.error) {
            setServerError(data.error);
        } else {
            logInUser(data);
            // navigate("/");
        }
    };

    const validate = () => {
        const errors = {};

        if (!isLength(formData.username, { min: 6, max: 30 })) {
            errors.username = "Must be between 6 and 30 characters long";
        }

        if (contains(formData.username, " ")) {
            errors.username = "Must contain only valid characters";
        }

        if (!isLength(formData.password, { min: 8 })) {
            errors.password = "Must be at least 8 characters long";
        }

        if (!isEmail(formData.email)) {
            errors.email = "Must be a valid email address";
        }

        setErrors(errors);

        return errors;
    };

    return (
        <Container maxWidth={"xs"} sx={{ mt: { xs: 2, md: 6 } }}>
            <Stack alignItems="center">
                <Typography variant="h2" color="text.secondary" sx={{ mb: 6 }}>
                    <Link to="/" color="inherit" underline="none">
                        MentorMe
                    </Link>
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Sign Up
                </Typography>
                <Typography color="text.secondary">
                    Already have an account? <Link to="/login">Login</Link>
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        autoFocus
                        required
                        id="username"
                        name="username"
                        onChange={handleChange}
                        error={errors.username !== undefined}
                        helperText={errors.username}
                    />
                    <TextField
                        label="Full Name"
                        fullWidth
                        margin="normal"
                        autoFocus
                        required
                        id="name"
                        name="name"
                        onChange={handleChange}
                        error={errors.name !== undefined}
                        helperText={errors.name}
                    />
                    <TextField
                        label="Email Address"
                        fullWidth
                        margin="normal"
                        autoComplete="email"
                        required
                        id="email"
                        name="email"
                        onChange={handleChange}
                        error={errors.email !== undefined}
                        helperText={errors.email}
                    />
                    <TextField
                        label="Department"
                        fullWidth
                        margin="normal"
                        autoFocus
                        required
                        id="dept"
                        name="dept"
                        onChange={handleChange}
                        error={errors.dept !== undefined}
                        helperText={errors.dept}
                    />
                    <TextField
                        label="Password"
                        fullWidth
                        required
                        margin="normal"
                        autoComplete="password"
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        error={errors.password !== undefined}
                        helperText={errors.password}
                    />
                    <ErrorAlert error={serverError} />
                    <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
                        Sign Up
                    </Button>
                </Box>
                {/* <Box sx={{ mt: 3 }}>
          <Copyright />
        </Box> */}
            </Stack>
        </Container>
    )

}