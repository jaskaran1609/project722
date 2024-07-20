import React from "react";
import logo from "../../assets/store_logo.svg";
import { Link, useNavigate } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FaRegHeart, FaShoppingBasket, FaUserAlt } from "react-icons/fa";

import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/userSlice";
const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { totalItems } = useSelector((state) => state.cartState);
  const { user } = useSelector((state) => state.userState);
  const { wishlist } = useSelector((state) => state.wishListState);
  const isMobile = useMediaQuery("(max-width:920px)");
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/")
  };

  return (
    <Box
      px={"40px"}
      py={2}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={"40px"}
      >
        <Box>
          <Link to="/">
            <img src={logo} style={{ height: "70px" }} alt="" />
          </Link>
        </Box>
        {!isMobile && (
          <Box
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            gap={"30px"}
          >
            <Typography
              variant="body1"
              color={"grey.main"}
              sx={{ textDecoration: "none" }}
              component={Link}
              to={"/everything"}
            >
              Everything
            </Typography>
            <Typography
              variant="body1"
              color={"grey.main"}
              sx={{ textDecoration: "none" }}
              component={Link}
              to={"product-category/Groceries"}
            >
              Groceries
            </Typography>
            <Typography
              variant="body1"
              sx={{ textDecoration: "none" }}
              color={"grey.main"}
              component={Link}
              to={"/product-category/Juices"}
            >
              Juices
            </Typography>
          </Box>
        )}
      </Box>

      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={`${isMobile ? "20px" : "40px"}`}
      >
        {!isMobile && (
          <Box
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            gap={"30px"}
          >
            {
              user?.role === "admin" && <Typography
                variant="body1"
                sx={{ textDecoration: "none" }}
                color={"grey.main"}
                component={Link}
                to={"/dashboard"}
              >
                Dashbaord
              </Typography>
            }
            <Typography
              variant="body1"
              sx={{ textDecoration: "none" }}
              color={"grey.main"}
              component={Link}
              to={"/about"}
            >
              About
            </Typography>
            <Typography
              variant="body1"
              sx={{ textDecoration: "none" }}
              color={"grey.main"}
              component={Link}
              to={"/contact"}
            >
              Contact
            </Typography>
          </Box>
        )}
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={"30px"}
        >
          <Typography
            variant="body1"
            sx={{ textDecoration: "none" }}
            color={"grey.main"}
            component={Link}
            to={"/wishlist"}
          >
            <Badge
              badgeContent={wishlist?.items?.length || 0}
              color="green"
              sx={{ color: "white" }}
            >
              <FaRegHeart
                style={{ color: "#8bc34a", fontSize: "22px" }}
              />
            </Badge>
          </Typography>
          <Typography
            variant="body1"
            sx={{ textDecoration: "none" }}
            color={"grey.main"}
            component={Link}
            to={"/cart"}
          >
            <Badge
              badgeContent={user && totalItems || 0}
              color="green"
              sx={{ color: "white" }}
            >
              <FaShoppingBasket
                style={{ color: "#8bc34a", fontSize: "22px" }}
              />
            </Badge>
          </Typography>
          {!user && (
            <Typography
              variant="body1"
              sx={{ textDecoration: "none", height: "24px" }}
              color={"grey.main"}
              component={Link}
              to={"/login"}
            >
              <FaUserAlt />
            </Typography>
          )}
          {user && (
            <Button
              variant="contained"
              sx={{ color: "white" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Box>
        {isMobile && (
          <Box
            sx={{
              height: "38px",
              bgcolor: "green.main",
              p: "7px",
              color: "white",
            }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </Box>
        )}
      </Box>

      {isMobile && (
        <Drawer
          anchor={"left"}
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            "&  .css-4t3x6l-MuiPaper-root-MuiDrawer-paper": {
              width: "250px",
              padding: "50px 0px",
            },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              textDecoration: "none",
              display: "block",
              p: "20px 10px",
              borderBottom: "1px solid #dddddd",
            }}
            color={"grey.main"}
            component={Link}
            to={"/everything"}
          >
            Everything
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textDecoration: "none",
              display: "block",
              p: "20px 10px",
              borderBottom: "1px solid #dddddd",
            }}
            color={"grey.main"}
            component={Link}
            to={"/product-category/Groceries"}
          >
            Groceries
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textDecoration: "none",
              display: "block",
              p: "20px 10px",
              borderBottom: "1px solid #dddddd",
            }}
            color={"grey.main"}
            component={Link}
            to={"/product-category/Juice"}
          >
            Juice
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textDecoration: "none",
              display: "block",
              p: "20px 10px",
              borderBottom: "1px solid #dddddd",
            }}
            color={"grey.main"}
            component={Link}
            to={"/about"}
          >
            About
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textDecoration: "none",
              display: "block",
              p: "20px 10px",
              borderBottom: "1px solid #dddddd",
            }}
            color={"grey.main"}
            component={Link}
            to={"/contact"}
          >
            Contact
          </Typography>
        </Drawer>
      )}
    </Box>
  );
};

export default Header;
