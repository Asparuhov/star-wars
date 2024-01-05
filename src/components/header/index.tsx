import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  Avatar,
  MenuItem,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "assets/logo.png";
import { headerOptions } from "utils/headerOptions";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

const dataArray = headerOptions as Array<{
  name: string;
  link: string;
  icon: any;
}>;

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 1065px)");
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const handleMenuItemClick = (link: string) => {
    navigate(link);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          height: "62px",
        }}
      >
        <Toolbar>
          <Avatar
            variant={"rounded"}
            alt="The image"
            src={Logo}
            style={{
              width: 100,
              height: 50,
            }}
          />
          {!isMobile &&
            dataArray.map((option) => (
              <MenuItem
                key={option.name}
                onClick={() => handleMenuItemClick(option.link)}
              >
                <Typography textAlign="center">{option.name}</Typography>
              </MenuItem>
            ))}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={() => setDrawerOpen(!isDrawerOpen)}
              style={{ marginLeft: "auto" }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "&.MuiDrawer-root .MuiDrawer-paper": {
            marginTop: "62px",
          },
        }}
        slotProps={{ backdrop: { invisible: true } }}
      >
        <DrawerContainer>
          <DrawerList>
            {dataArray.map((option) => (
              <DrawerListItem
                key={option.name}
                onClick={() => handleMenuItemClick(option.link)}
              >
                {React.createElement(option.icon, { fontSize: "small" })}
                <Typography textAlign="center" sx={{ marginLeft: "8px" }}>
                  {option.name}
                </Typography>
              </DrawerListItem>
            ))}
          </DrawerList>
        </DrawerContainer>
      </Drawer>
    </Box>
  );
};

const DrawerContainer = styled("div")(({ theme }) => ({
  width: 250,
  backgroundColor: theme.palette.background.paper,
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const DrawerList = styled(List)(() => ({
  flexGrow: 1,
  backgroundColor: "#186EC4",
}));

const DrawerListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.5),
  },
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
}));
