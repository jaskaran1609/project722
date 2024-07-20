import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  Divider,
  TableBody,
  TableFooter,
  TextField,
} from "@mui/material";
import { FaRegCalendar, FaRupeeSign, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../slices/cartSlice";



const CartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cart, totalAmount } = useSelector((state) => state.cartState);
  const { user } = useSelector((state) => state.userState);
  const [qty, setQty] = useState()




  const handleDeleteFromCart = (e, productId) => {
    e.preventDefault();
    dispatch(deleteFromCart({
      token: user.token,
      productId: productId
    }))
  }

  const handleCheckout = () => {
    if (user) {
      navigate("/checkout")
    } else {
      navigate("/login")
    }
  }

  return (
    <Box py={"70px"} bgcolor="#f8f6f3">
      <Box maxWidth={"1200px"} mx={"auto"}>
        <Box>
          <Box>
            <Typography variant="h2">Cart</Typography>
          </Box>
          {
            !user ? (
              <Box>
                <Box mt={4}>
                  <Divider
                    sx={{
                      borderColor: "green.main",
                      borderBottomWidth: "medium",
                    }}
                  />
                </Box>
                <Box mt={2} display={"flex"} gap={3} alignItems={"center"}>
                  <FaRegCalendar style={{ color: "#8bc34a" }} />
                  <Typography variant="body1">
                    You are logged in. Log In / Register first to access cart. <Link to={"/login"} style={{
                      color: "#8bc34a"
                    }}>Login</Link>.
                  </Typography>
                </Box>
                <Box mt={4}>
                  <Link to="/everything">
                    <Button
                      size="large"
                      variant="contained"
                      sx={{
                        bgcolor: "green.idle",
                        "&:hover": {
                          bgcolor: "green.main",
                        },
                      }}
                    >
                      Return to Shop
                    </Button>
                  </Link>
                </Box>
              </Box>
            ) : user && cart?.items.length < 1 ? (
              <Box>
                <Box mt={4}>
                  <Divider
                    sx={{
                      borderColor: "green.main",
                      borderBottomWidth: "medium",
                    }}
                  />
                </Box>
                <Box mt={2} display={"flex"} gap={3} alignItems={"center"}>
                  <FaRegCalendar style={{ color: "#8bc34a" }} />
                  <Typography variant="body1">
                    Your cart is currently empty.
                  </Typography>
                </Box>
                <Box mt={4}>
                  <Link to="/everything">
                    <Button
                      size="large"
                      variant="contained"
                      sx={{
                        bgcolor: "green.idle",
                        "&:hover": {
                          bgcolor: "green.main",
                        },
                      }}
                    >
                      Return to Shop
                    </Button>
                  </Link>
                </Box>
              </Box>
            ) : (
              <Box mt={4}>
                <TableContainer>
                  <Table sx={{ border: "1px solid #e2e2e2" }}>
                    <TableHead sx={{ bgcolor: "white" }}>
                      <TableRow sx={{ borderBottom: "1px solid #e2e2e2" }}>
                        <TableCell
                          sx={{
                            border: "0",
                            fontWeight: "700",
                            fontSize: "16px",
                          }}
                        ></TableCell>
                        <TableCell
                          sx={{
                            border: "0",
                            fontWeight: "700",
                            fontSize: "16px",
                          }}
                        ></TableCell>
                        <TableCell
                          sx={{
                            border: "0",
                            fontWeight: "700",
                            fontSize: "16px",
                          }}
                        >
                          Product
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "0",
                            fontWeight: "700",
                            fontSize: "16px",
                          }}
                        >
                          Price
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "0",
                            fontWeight: "700",
                            fontSize: "16px",
                          }}
                        >
                          Quantity
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "0",
                            fontWeight: "700",
                            fontSize: "16px",
                          }}
                        >
                          Subtotal
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cart?.items?.map((item) => (
                        <TableRow key={item.productId}>
                          <TableCell align="center">
                            <Box
                              sx={{
                                border: "1px solid #ada5a5",
                                borderRadius: "50%",
                                height: "25px",
                                width: "25px",
                                mx: "auto",
                                display: "grid",
                                placeContent: "center",
                                cursor: "pointer",
                              }}
                              onClick={(e) => handleDeleteFromCart(e, item.productId)}
                            >
                              <FaTrash color="#8bc34a" />
                            </Box>
                          </TableCell>
                          <TableCell align="center" sx={{}}>
                            <img
                              style={{ maxWidth: "70px", height: "auto" }}
                              src={item.image}
                              alt=""
                            />
                          </TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>
                            {" "}
                            <FaRupeeSign style={{
                              marginTop: "5px"
                            }} />
                            {item.price}
                          </TableCell>
                          <TableCell>
                            {/* <input type="number" name="qty" value={item.qty} style={{
                            border : "1px solid lightgray",
                            padding : "8px 5px 8px 10px",
                            width : "50px",
                            outline : "none"
                          }} /> */}
                            {item.qty}
                          </TableCell>
                          <TableCell>
                            {" "}
                            <FaRupeeSign />
                            {item.price * item.qty}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    {/* <TableFooter>
                      <TableRow>
                        <TableCell colSpan={6} sx={{ textAlign: "right" }}>
                          <Button
                            sx={{
                              bgcolor: "green.idle",
                              "&:hover": {
                                bgcolor: "green.main",
                              },
                            }}
                            variant="contained"
                          >
                            Update Cart
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableFooter> */}
                  </Table>
                </TableContainer>
              </Box>
            )
          }


        </Box>
        {/* Checkout Box */}
        {
          user && cart?.items.length > 0 && (
            <Box mt={5}>
              <Box maxWidth={"600px"} ml={"auto"} border={"1px solid #e2e2e2"}>
                <Box
                  px={3}
                  py={"14px"}
                  bgcolor="white"
                  borderBottom={"1px solid #e2e2e2"}
                >
                  <Typography variant="h3">Cart Totals</Typography>
                </Box>
                <Box px={3} py={"20px"}>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    px={3}
                    py={"14px"}
                    borderBottom={"1px solid #e2e2e2"}
                  >
                    <Typography sx={{ width: "50%" }} variant="body1">
                      Subtotal
                    </Typography>
                    <Typography sx={{ width: "50%" }} variant="body1">
                      {" "}
                      <FaRupeeSign style={{
                        marginTop: "5px",
                        fontSize: "13px"
                      }} />{totalAmount}
                    </Typography>
                  </Box>

                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    px={3}
                    py={"14px"}
                    borderBottom={"1px solid #e2e2e2"}
                  >
                    <Typography sx={{ width: "50%" }} variant="body1">
                      Total
                    </Typography>
                    <Typography sx={{ width: "50%" }} variant="body1">
                      {" "}
                      <FaRupeeSign style={{
                        marginTop: "5px",
                        fontSize: "13px"
                      }} /> {totalAmount} + GST (18%)
                    </Typography>
                  </Box>
                  <Button
                    onClick={handleCheckout}
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      mt: "20px ",
                      color: "white",
                      bgcolor: "green.idle",
                      "&:hover": {
                        bgcolor: "green.main",
                      },
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </Box>
              </Box>
            </Box>
          )
        }

      </Box>
    </Box>
  );
};

export default CartPage;
