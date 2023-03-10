import React, {FC} from 'react';
import useWindowSize from '../../hooks/useResizeHook';
import {headerLinks as links, IHeaderLink} from "../../data/header.data";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";

import {AppBar,Box,Toolbar,IconButton,Typography} from '@mui/material';
import {Menu,Container,Button,MenuItem,ButtonGroup} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

import {useNavigate} from "react-router-dom";
import {logoutUser, userData} from "../../redux/slices/authSlice";

interface Props { }

const Header:FC<Props> = () => {
    const size = useWindowSize();
    const navigator = useNavigate();

    const dispatch = useAppDispatch();

    const isAuth = useAppSelector(userData);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = (path: string) => {
        if (path) {
            navigator(path);
        }
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            userSelect: 'none',
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {size?.width > 575 &&
                          <>SHOP</>
                        }
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >

                            {links?.map((link: IHeaderLink, idx: number) => (
                                <MenuItem key={link.id} onClick={() => handleCloseNavMenu(link.path)}>
                                    <Typography textAlign="center">
                                        {link.title}
                                    </Typography>
                                </MenuItem>
                            ))}

                            {isAuth &&
                              <MenuItem key={links?.length + 1} onClick={() => handleCloseNavMenu('/add-product')}>
                                <Typography textAlign="center">
                                    Add product
                                </Typography>
                              </MenuItem>
                            }

                        </Menu>
                    </Box>
                    {size?.width > 575 && <>
                        <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            SHOP
                        </Typography>
                    </>
                    }

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>

                        {links?.map((link:IHeaderLink, idx: number) => (

                            <Button
                                key={link.id}
                                onClick={() => handleCloseNavMenu(link.path)}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {link.title}
                            </Button>
                        ))}


                        {isAuth &&
                          <Button
                            key={links?.length + 1}
                            onClick={() => handleCloseNavMenu('/add-product')}
                            sx={{my: 2, color: 'white', display: 'block'}}
                          >
                            Add product
                          </Button>
                        }
                    </Box>

                    <Box sx={{flexGrow: 0}}>

                            {isAuth &&
                              <ButtonGroup variant="outlined" aria-label="text button group">
                                <Button variant="contained"
                                        color="secondary"
                                        onClick={() => navigator('/profile')}
                                        sx={{mr: '15px', textTransform: 'none', fontSize: '15px'}}>
                                  Profile
                                </Button>
                                <Button variant="contained"
                                        color="info"
                                        sx={{textTransform: 'none', fontSize: '15px'}}
                                        onClick={() => {
                                            localStorage.removeItem('token');
                                            dispatch(logoutUser());
                                            navigator('/') ;
                                        }}
                                >
                                  Log out
                                </Button>
                              </ButtonGroup>
                            }

                            {!isAuth &&
                              <ButtonGroup variant="outlined" aria-label="text button group">
                                <Button onClick={() => navigator('/auth')} variant="contained" color="secondary"
                                        sx={{mr: '15px', textTransform: 'none', fontSize: '15px'}}>Log in</Button>
                                <Button onClick={() => navigator('/registry')} variant="contained" color="info" sx={{textTransform: 'none', fontSize: '15px'}}>
                                  Sign up</Button>
                              </ButtonGroup>
                            }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;