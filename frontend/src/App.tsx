import {
  AppBar as MuiAppBar,
  AppBarProps,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useUserSession } from "../states/UserSession";
import { useMemo, useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";

// Componente para o menu lateral em dispositivos móveis
const MobileDrawer = ({
  pages,
  onClose,
  open,
}: {
  pages: { name: string; path: string }[];
  onClose: () => void;
  open: boolean;
}) => (
  <Drawer anchor="left" open={open} onClose={onClose}>
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <List>
        {pages.map((page) => (
          <ListItem key={page.name} disablePadding>
            <ListItemButton component={Link} to={page.path}>
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

  const pages = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "Browse", path: "/browse" },
      { name: "Library", path: "/library" },
      { name: "Search", path: "/search" },
      { name: "Settings", path: "/settings" },
    ],
    []
  );

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <MuiAppBar {...props}>
      <Toolbar>
        {isMobile ? (
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
            />
          </>
        ) : null}
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            flexGrow: isMobile ? 1 : 0,
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
          <Typography>
            {user?.title}@{server?.name}
          </Typography>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
