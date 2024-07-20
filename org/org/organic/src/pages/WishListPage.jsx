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
import { deleteFromWishlist } from "../slices/wishListSlice";


const WishlistPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { wishlist } = useSelector((state) => state.wishListState);
    const { user } = useSelector((state) => state.userState);
    // const [qty, setQty] = useState()


    const handleDeleteFromWishlist = (e, productId) => {
        e.preventDefault();
        dispatch(deleteFromWishlist({
            token: user.token,
            productId: productId
        }))
    }
    console.log(wishlist)
    return (
        <Box py={"70px"} bgcolor="#f8f6f3">
            <Box maxWidth={"1200px"} mx={"auto"}>
                <Box>
                    <Box>
                        <Typography variant="h2">Wishlist</Typography>
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
                                        You are logged in. Log In / Register first to access wishlist. <Link to={"/login"} style={{
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
                        ) : user && wishlist?.items?.length < 1 ? (
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
                                        Your Wishlist is currently empty.
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
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {wishlist?.items?.map((item) => (
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
                                                            onClick={(e) => handleDeleteFromWishlist(e, item.productId)}
                                                        >
                                                            <FaTrash />
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


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        )
                    }


                </Box>
            </Box>
        </Box>
    );
};

export default WishlistPage;
