import { Card, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
// import {Link} from 'react-router-dom'
const Footer = () => {
    return (
        <Box
            pb={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
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
    );
};

export default Footer;
