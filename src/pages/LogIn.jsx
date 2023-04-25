import {
    Button,
    Card, Container, Stack,
    TextField,
    Typography
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../handlers/users";
import ErrorAlert from "../components/ErrorAlert";
import { logInUser } from "../helpers/authHelper";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [serverError, setServerError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await login(formData);
        if (data.error) {
            setServerError(data.error);
        } else {
            //console.log(data);
            logInUser(data);
            navigate("/");
        }
    };

    return (
        <Container maxWidth={"xs"} sx={{ mt: 6 }}>
            <Stack alignItems="center">
                <Typography variant="h2" color="text.secondary" sx={{ mb: 6 }}>
                    <Link to="/" color="text.secondary" style={{ textDecoration: 'none' }} underline="none">
                        MentorMe
                    </Link>
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <Typography color="text.secondary">
                    Don't have an account yet? <Link to="/signup">Sign Up</Link>
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Email Address"
                        fullWidth
                        margin="normal"
                        autoComplete="email"
                        autoFocus
                        required
                        id="email"
                        name="email"
                        onChange={handleChange}
                    />
                    <TextField
                        label="Password"
                        fullWidth
                        required
                        margin="normal"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        type="password"
                    />

                    <ErrorAlert error={serverError} />
                    <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
                        LogIn
                    </Button>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Card variant="filled" sx={{ padding: '0.5rem' }}>
                        <Typography sx={{
                        }} variant="subtitle" color="text.secondary" textAlign={'center'}>
                            Copyright © 2023 {' '}
                            <Link to="/" color="inherit">
                                MentorMe
                            </Link>
                        </Typography>
                    </Card>
                </Box>
            </Stack>
        </Container>
    );
};
