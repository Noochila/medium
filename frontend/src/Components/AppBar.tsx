import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const CustomAppBar = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/signin');
        handleClose();
    };

    const handleMyPosts = () => {
        navigate('/myposts');
        handleClose();
    };

    const handlePublish = () => {
        navigate('/editor');
        handleClose();
    };

    const stringAvatar = (name: string) => {
        return { children: `${name.split(' ')[0][0]}${name.split(' ')[1] ? name.split(' ')[1][0] : ''}` };
    };

    return (
        <AppBar position="sticky" color="default" elevation={0} sx={{ backgroundColor: '#f5f5f5' }}>
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap component="div" sx={{ flexGrow: 1 }}>
                    <Button color="inherit" onClick={() => navigate('/')} style={{ fontWeight: 'bold' }}>
                        Medium
                    </Button>
                </Typography>
                <div>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Avatar sx={{ bgcolor: '#FFD700' }} {...stringAvatar(localStorage.getItem("userName") || "User")} />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom', // Changed from 'top' to 'bottom'
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top', // Changed from 'top' to 'bottom'
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleMyPosts}>My Posts</MenuItem>
                        <MenuItem onClick={handlePublish}>Publish</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;

