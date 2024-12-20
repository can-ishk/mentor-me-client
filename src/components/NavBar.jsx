import { useTheme } from "@emotion/react";
import {
    Button,
    IconButton,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "react-icons/ai";
import {
    AiFillBulb,
    AiFillHome,
    AiFillMessage,
    AiOutlineSearch
} from "react-icons/ai";
import "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logOutUser } from "../helpers/authHelper";
import Avatar from "./Avatar";
import HorizontalStack from "./util/HorizontalStack";
import { deepOrange } from "@mui/material/colors";

export default function NavBar() {
    const navigate = useNavigate();
    const user = isLoggedIn();
    const theme = useTheme();
    const username = user && isLoggedIn().username;
    const [search, setSearch] = useState("");
    const [searchIcon, setSearchIcon] = useState(false);
    const [width, setWindowWidth] = useState(0);

    useEffect(() => {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const mobile = width < 500;
    const navbarWidth = width < 600;

    const updateDimensions = () => {
        const width = window.innerWidth;
        setWindowWidth(width);
    };

    const handleLogout = async (e) => {
        logOutUser();
        navigate("/login");
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/search?" + new URLSearchParams({ search }));
    };

    const handleSearchIcon = (e) => {
        setSearchIcon(!searchIcon);
    };

    return (
        <Stack mb={2} sx={{
            // backgroundColor: '#161b22',
            // paddingX: 2
        }}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    pt: 2,
                    pb: 0,

                }}
                spacing={!mobile ? 2 : 0}
            >
                <HorizontalStack>
                    <AiFillBulb
                        size={33}
                        color={theme.palette.primary.main}
                        onClick={() => navigate("/")}
                    />
                    {/* <AiOutlineBulb
                        size={33}
                        color={theme.palette.primary.main}
                        onClick={() => navigate("/")}
                    /> */}
                    <Typography
                        sx={{ display: mobile ? "none" : "block" }}
                        variant={navbarWidth ? "h6" : "h4"}
                        mr={1}
                        color={theme.palette.primary.main}
                    >
                        {/* <Link to="/" color="inherit"> */}
                        MentorMe
                        {/* </Link> */}
                    </Typography>
                </HorizontalStack>

                {!navbarWidth && (
                    <Box component="form" onSubmit={handleSubmit}>

                        <TextField
                            size="small"
                            // label="Search"
                            inputProps={{ style: { textAlign: 'center' } }}
                            placeholder="What are you looking for?"
                            sx={{
                                flexGrow: 1, width: 600, '& fieldset': {
                                    paddingLeft: (theme) => theme.spacing(2.5),
                                    borderRadius: '20px',
                                },
                            }}
                            onChange={handleChange}
                            value={search}
                        />
                    </Box>
                )}

                <HorizontalStack>
                    {mobile && (
                        <IconButton onClick={handleSearchIcon}>
                            <AiOutlineSearch />
                        </IconButton>
                    )}

                    <IconButton component={Link} to={"/"}>
                        <AiFillHome color={deepOrange[500]}/>
                    </IconButton>
                    {user ? (
                        <>
                            {/*<IconButton component={Link} to={"/chat"}>
                                <AiFillMessage />
                            </IconButton>*/}
                            {(window.location.href.split('/')[3]==="users"&&window.location.href.split('/')[4]!==user.username) ? (
                                <IconButton
                                    component={Link}
                                    to={"/users/" + username}
                                    reloadDocument
                                >
                                    <Avatar width={30} height={30} username={user.username} />
                                </IconButton>
                            ) : (
                                <IconButton
                                    component={Link}
                                    to={"/users/" + username}
                                >
                                    <Avatar width={30} height={30} username={user.username} />
                                </IconButton>
                            )}

                            <Button onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button variant="text" sx={{ minWidth: 80 }} href="/signup">
                                Sign Up
                            </Button>
                            <Button variant="text" sx={{ minWidth: 65 }} href="/login">
                                Login
                            </Button>
                        </>
                    )}
                </HorizontalStack>
            </Stack>
            {navbarWidth && searchIcon && (
                <Box component="form" onSubmit={handleSubmit} mt={2}>
                    <TextField
                        size="small"
                        label="Search"
                        fullWidth
                        onChange={handleChange}
                        value={search}
                    />
                </Box>
            )}
        </Stack>
    );
};
