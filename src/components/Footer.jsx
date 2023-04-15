import { Card, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
// import {Link} from 'react-router-dom'
const Footer = () => {
    return (
        <Box pb={3}>
            <Card variant="outlined" sx={{ padding: '0.25rem', }}>
                <Typography variant="subtitle" color="text.secondary">
                    Copyright © 2023 {' '}
                    <Link to="/" color="inherit">
                        MentorMe
                    </Link>
                </Typography>
            </Card>
        </Box>
    );
};

export default Footer;
