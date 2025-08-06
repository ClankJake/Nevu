import {
  AppBar as MuiAppBar,
  AppBarProps,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useUserSession } from "states/UserSession";
import { useMemo, useState } from "react";
import {
  Menu as MenuIcon,
  Home,
  Explore,
  VideoLibrary,
  Search,
  Settings,
  Logout,
} from "@mui/icons-material";

// Componente para o menu lateral em dispositivos móveis
const MobileDrawer = ({
  pages,
  onClose,
  open,
  location,
}: {
  pages: { name: string; path: string; icon: JSX.Element }[];
  onClose: () => void;
  open: boolean;
  location: any;
}) => (
  <Drawer anchor="left" open={open} onClose={onClose}>
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ color: "text.primary" }}>
          Nevu
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem key={page.name} disablePadding>
            <ListItemButton
              component={Link}
              to={page.path}
              selected={location.pathname === page.path}
            >
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  </Drawer>
);

const AppBar = (props: AppBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user, server } = useUserSession();
  const location = useLocation();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const pages = useMemo(
    () => [
      { name: "Home", path: "/", icon: <Home /> },
      { name: "Browse", path: "/browse", icon: <Explore /> },
      { name: "Library", path: "/library", icon: <VideoLibrary /> },
      { name: "Search", path: "/search", icon: <Search /> },
      { name: "Settings", path: "/settings", icon: <Settings /> },
    ],
    []
  );

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Lógica de logout aqui
    handleCloseUserMenu();
  };

  return (
    <MuiAppBar {...props}>
      <Toolbar>
        {isMobile && (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <MobileDrawer
              pages={pages}
              open={drawerOpen}
              onClose={handleDrawerToggle}
              location={location}
            />
          </>
        )}
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            display: { xs: isMobile ? "flex" : "none", md: "flex" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Nevu
        </Typography>

        {!isMobile && (
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  ...(location.pathname === page.path && {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }),
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={user?.title} src={user?.thumb} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem>
              <Typography textAlign="center">
                {user?.title}@{server?.name}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
