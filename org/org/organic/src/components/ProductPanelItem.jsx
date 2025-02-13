import React, { useState } from "react";
import {
    Box,
    Pagination,
    Typography,
    Modal,
    Button,
    TextField,
    Switch,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, updateProduct } from "../slices/productSlice";

const ProductPanelItem = ({ product }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userState);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useState({
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description,
        image: product.image,
        countInStock: product.countInStock,
    });

    const handleUpdate = () => {
        dispatch(
            updateProduct({
                formData,
                token: user?.token,
                productId: product?._id,
            })
        );
        handleClose();
    };

    return (
        <div>
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                height={"150px"}
                overflow={"hidden"}
                borderBottom={"1px solid #e2e2e2"}
                marginBottom={1}
            >
                <Box
                    display={"flex"}
                    height={"100%"}
                    width={"65%"}
                    alignItems={"center"}
                    overflow={"hidden"}
                    py={2.2}
                >
                    <Box width={"180px"} px={"20px"} alignSelf={"flex-start"}>
                        <img
                            src={product.image}
                            width={"140px"}
                            height={"100px"}
                            style={{ objectFit: "contain", objectPosition: "top" }}
                            alt={product.name}
                        />
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        justifyItems={"flex-start"}
                        height={"100%"}
                        //   py={2}
                        gap={1}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: "13px",
                                fontWeight: "500",
                                fontFamily: "'Jost', sans-serif",
                                lineHeight: "1.11",
                                wordWrap: "break-word",
                                color: "#A0A0A0",
                            }}
                        >
                            Category : {product.category}
                        </Typography>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: "18px",
                                fontWeight: "500",
                                fontFamily: "'Jost', sans-serif",
                                lineHeight: "1.33",
                                wordWrap: "break-word",
                                color: "#4B3049",
                            }}
                        >
                            {product.name}
                        </Typography>
                        <Box display={"flex"}>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                    fontFamily: "'Jost', sans-serif",
                                    lineHeight: "1.11",
                                    wordWrap: "break-word",
                                    color: "#000000",
                                }}
                            >
                                Price : Rs. {product.price} | Count In Stock :{" "}
                                {product.countInStock}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    py={2.2}
                    height={"100%"}
                    px={3}
                    width={"35%"}
                    textAlign={"right"}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={2}
                    alignItems={"flex-end"}
                >
                    <Button
                        variant="contained"
                        onClick={() =>
                            dispatch(
                                deleteProduct({
                                    token: user?.token,
                                    productId: product?._id,
                                })
                            )
                        }
                        sx={{
                            width: "30%",
                            bgcolor: "#8bc34a",
                            color: "white",
                            "&:hover": {
                                bgcolor: "#6a9739"
                            }
                        }}
                    >
                        Delete
                    </Button>
                    <Button variant="contained" onClick={handleOpen} sx={{
                        width: "30%",
                        bgcolor: "#8bc34a",
                        color: "white",
                        "&:hover": {
                            bgcolor: "#6a9739"
                        }
                    }}>
                        Update
                    </Button>
                </Box>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    component={"form"}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "700px",
                        bgcolor: "#F4EDF2",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: "24px",
                            fontFamily: "'Jost', sans-serif",
                            fontWeight: "500",
                            textAlign: "center",
                            mb: 4,
                        }}
                    >
                        Update Product
                    </Typography>
                    <Box display={"flex"} gap={3} mb={2}>
                        <TextField
                            variant="outlined"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            size="small"
                            sx={{
                                width: "50%",
                            }}
                        />
                        <TextField
                            variant="outlined"
                            placeholder="Product Image"
                            value={formData.image}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    image: e.target.value,
                                })
                            }
                            size="small"
                            sx={{
                                width: "50%",
                            }}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            variant="outlined"
                            placeholder="Product Description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            size="small"
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </Box>
                    <Box display={"flex"} gap={3} mb={2}>
                        <TextField
                            variant="outlined"
                            value={formData.price}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    price: e.target.value,
                                })
                            }
                            type="number"
                            placeholder="Product Price"
                            size="small"
                            sx={{
                                width: "50%",
                            }}
                        />
                        <TextField
                            variant="outlined"
                            value={formData.countInStock}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    countInStock: e.target.value,
                                })
                            }
                            type="number"
                            placeholder="Count In Stock"
                            size="small"
                            sx={{
                                width: "50%",
                            }}
                        />
                    </Box>
                    <Box display={"flex"} gap={3} mb={2}>
                        {/* <TextField
              variant="outlined"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
              placeholder="Product Category"
              size="small"
              sx={{
                width: "50%",
              }}
            /> */}
                        <FormControl sx={{ width: "50%" }} size="small">
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={formData.category}
                                label="Category"
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        category: e.target.value,
                                    })
                                }}
                            >
                                {/* "Mobile Phones", "PCs and Laptops", "Watches", "Cameras" */}
                                <MenuItem value={"Groceries"}>Groceries</MenuItem>
                                <MenuItem value={"Juices"}>Juices</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>
                    <Button variant="contained" onClick={handleUpdate} sx={{
                        bgcolor: "#8bc34a",
                        color: "white",
                        "&:hover": {
                            bgcolor: "#6a9739"
                        }
                    }}>
                        Update
                    </Button>
                    <Button
                        onClick={handleClose}
                        sx={{
                            marginLeft: "30px",
                            bgcolor: "#8bc34a",
                            color: "white",
                            "&:hover": {
                                bgcolor: "#6a9739"
                            }
                        }}
                        variant="contained"
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default ProductPanelItem;