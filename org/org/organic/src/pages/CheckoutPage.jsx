import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaRegCalendar, FaRupeeSign } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import { useSelector } from "react-redux";
import axios from "axios";
// import * as Yup from 'yup';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}/;

let labelStyle = {
  fontSize: "14px",
  fontFamily: "'Open Sans', sans-serif",
  fontWeight: "700",
  color: "#333",
  mb: "5px",
};

let inputStyle = {
  "& > div": {
    borderRadius: "0",
    bgcolor: "white",
  },
  "& > div > input": {
    padding: "12px",
  },
};


const CheckoutPage = () => {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.userState)
  const { cart, totalAmount } = useSelector(state => state.cartState)
  const [checkoutData, setCheckoutData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    pin: "",
    phone: "",
    email: "",
  })
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    !user && navigate("/login")
    user && cart?.items?.length < 1 && navigate("/")
  }, [user, cart])


  console.log(paymentMethod)

  const validateData = (value) => {
    let errors = {};
    if (!value.firstName) {
      errors.firstName = "FirstName is required";
    } else if (value.firstName.length < 4) {
      errors.firstName = "first name must be 15 character or long"

    }

    else if (!value.lastName) {
      errors.lastName = "LastName is required";
    } else if (value.lastName.length < 2) {
      errors.lastName = "Last Name must be 10 character or long"

    }
    // else if (!value.company) {
    //   errors.company = "company is required";
    // } else if (value.company.length < 8) {
    //   errors.company = "Company Name  must be 8 character or long"

    // }
    else if (!value.street) {
      errors.street = "street is required"
    }
    // else if (!value.apartment) {
    //   errors.apartment = "apartment is required"
    // }
    else if (!value.state) {
      errors.state = "state is required"
    }
    else if (!value.city) {
      errors.city = "city is required"

    }
    else if (!value.pin) {
      errors.pin = "pinCode is required"
    } else if (!/^\d{6}$/.test(value.pin)) {
      errors.pin = "Pin-Code must be 6 character or long"
    }
    else if (!value.phone) {
      errors.phone = "Enter a valid phone number"

    } else if (!/^\d{10}$/.test(value.phone)) {
      errors.phone = "PhoneNumber  must be 10 character"

    }
    else if (!emailRegex.test(value.email)) {
      errors.email = "Enter a valid email address"

    }

    return errors

  }
  const handleFormChange = (e) => {
    setCheckoutData({
      ...checkoutData,
      [e.target.name]: e.target.value
    })
  }

  console.log(checkoutData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = validateData(checkoutData);
    setErrors(result);
    if (Object.keys(errors).length === 0) {
      if (!paymentMethod) {
        alert("Please choose atleast one payment method")
        return
      } else {
        let itemsToSend = cart.items.map((item) => {
          return { productId: item.productId, qty: item.qty };
        });

        if (paymentMethod === "cod") {

          try {
            let { data } = await axios.post(
              `http://localhost:8080/api/v1/order/create`,
              {
                items: itemsToSend,
                shipping: {
                  ...checkoutData
                },
              },
              {
                headers: {
                  authorization: `Bearer ${user?.token}`,
                },
              }
            );
            navigate(data.url);

          } catch (error) {
            console.log(error.message);
          }
          return
        } else {
          // place stripe order
          try {
            let { data } = await axios.post(
              `http://localhost:8080/api/v1/stripe/create-checkout-session`,
              {
                items: itemsToSend,
                shipping: {
                  ...checkoutData
                },
              },
              {
                headers: {
                  authorization: `Bearer ${user?.token}`,
                },
              }
            );

            window.location.href = data.url;
          } catch (error) {
            console.log(error.message);
          }


        }
      }
    }
  }


  let total = totalAmount + (totalAmount * 0.18)

  return (
    <Box py={"70px"} bgcolor="#f8f6f3">
      <Box
        maxWidth={"1200px"}
        mx={"auto"}
        sx={{
          px: {
            xs: "20px",
            lg: 0,
          },
        }}
      >
        <Box>
          <Box>
            <Typography variant="h2">Checkout</Typography>
          </Box>
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
              <Typography variant="body1" color="#515151">
                Please Enter All your details to checkout.
              </Typography>
            </Box>
          </Box>
          <Box mt={5}>
            <Grid container>
              <Grid item xs={12} md={6} lg={7}>
                <Box py={2} borderBottom={"2px solid #e2e2e2"}>
                  <Typography variant="h4">Billing Details</Typography>
                </Box>
                <Box mt={3} component={"form"} onChange={handleFormChange} >
                  <Grid container>
                    <Grid item xs={12} md={6} pr={2}>
                      <InputLabel sx={labelStyle}>First Name</InputLabel>
                      <TextField
                        sx={inputStyle}
                        type="text"
                        name="firstName"
                        fullWidth
                        value={checkoutData.firstName}

                      />
                      {errors.firstName && (
                        <Box my={"8px"}>
                          <Alert severity="error">{errors.firstName}</Alert>
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12} md={6} pl={2}>
                      <InputLabel sx={labelStyle}>Last Name</InputLabel>
                      <TextField
                        sx={inputStyle}
                        type="text"
                        name="lastName"
                        fullWidth
                        value={checkoutData.lastName}

                      />
                      {errors.lastName && (
                        <Box my={"8px"}>
                          <Alert severity="error">{errors.lastName}</Alert>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container mt={3}>
                    <Grid item xs={12}>
                      <InputLabel sx={labelStyle}>
                        Company Name(optional)
                      </InputLabel>
                      <TextField
                        sx={inputStyle}
                        type="text"
                        name="company"
                        value={checkoutData.company}

                        fullWidth
                      />
                      {errors.company && (
                        <Box my={"8px"}>
                          <Alert severity="error">{errors.company}</Alert>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container mt={3}>
                    <Grid item xs={12}>
                      <FormControl fullWidth sx={inputStyle}>
                        <InputLabel sx={labelStyle}>
                          Country / Region
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Country / Region"
                          name="country"
                          value={checkoutData.country}
                          onChange={(e) => setCheckoutData({
                            ...checkoutData,
                            country: e.target.value
                          })}

                        >
                          <MenuItem value={"IN"}>India</MenuItem>
                        </Select>
                      </FormControl>
                      {errors.country && (
                        <Box my={"8px"}>
                          <Alert severity="error">{errors.country}</Alert>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container mt={3}>
                    <Grid item xs={12}>
                      <InputLabel sx={labelStyle}>Street Address</InputLabel>
                      <TextField
                        sx={[inputStyle, { mb: "8px" }]}
                        type="text"
                        name="street"
                        placeholder="House Number and Street name"
                        fullWidth
                        value={checkoutData.street}

                      />
                      {errors.street && (
                        <Box my={"8px"}>
                          <Alert severity="error">{errors.street}</Alert>
                        </Box>
                      )}
                      <TextField
                        sx={inputStyle}
                        type="text"
                        name="apartment"
                        placeholder="Apartment, suite, unit, etc. (optional)"
                        fullWidth
                        value={checkoutData.apartment}

                      />
                      {errors.apartment && (
                        <Box my={"8px"}>
                          <Alert severity="error">{errors.apartment}</Alert>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container mt={3}>
                    <Grid item xs={12}>
                      <FormControl fullWidth sx={inputStyle}>
                        <InputLabel sx={labelStyle}>State</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="State"
                          name="state"
                          value={checkoutData.state}
                          onChange={(e) => setCheckoutData({
                            ...checkoutData,
                            state: e.target.value
                          })}

                        >
                          <MenuItem value={""}>Select a State</MenuItem>
                          {State.getStatesOfCountry("IN").map((state) => (
                            <MenuItem key={state.isoCode} value={state.isoCode}>
                              {state.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {errors.state && (
                        <Box my={"8px"}>
                          <Alert severity="error">{errors.state}</Alert>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container mt={3}>
                    <Grid item xs={12}>
                      <FormControl fullWidth sx={inputStyle} disabled={!checkoutData.state}>
                        <InputLabel sx={labelStyle}>Town / City</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Town / City"
                          name="city"
                          value={checkoutData.city}
                          onChange={(e) => setCheckoutData({
                            ...checkoutData,
                            city: e.target.value
                          })}
                        >
                          {City.getCitiesOfState("IN", checkoutData.state).map((state) => (
                            <MenuItem key={state.name} value={state.name}>
                              {state.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {errors.city && (
                        <Box my={"8px"}>
                          <Alert severity="error">{errors.city}</Alert>
                        </Box>
                      )}
                    </Grid>
                  </Grid>

                  <Grid container mt={3}>
                    <Grid item xs={12}>
                      <InputLabel sx={labelStyle}>PIN Code</InputLabel>
                      <TextField
                        sx={inputStyle}
                        type="text"
                        name="pin"
                        value={checkoutData.pin}

                        fullWidth
                      />
                      {errors.pin && (
                        <Box my={"8px"}>
                          <Alert severity="error">{errors.pin}</Alert>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container mt={3}>
                    <Grid item xs={12}>
                      <InputLabel sx={labelStyle}>Phone</InputLabel>
                      <TextField
                        sx={inputStyle}
                        type="text"
                        name="phone"
                        fullWidth
                        value={checkoutData.phone}

                      />
                      {errors.phone && (
                        <Box my={"8px"}>
                          <Alert severity="error">{errors.phone}</Alert>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container mt={3}>
                    <Grid item xs={12}>
                      <InputLabel sx={labelStyle}>Email Address</InputLabel>
                      <TextField
                        sx={inputStyle}
                        type="text"
                        name="email"
                        value={checkoutData.email}

                        fullWidth
                      />
                      {errors.email && (
                        <Box my={"8px"}>
                          <Alert severity="error">{errors.email}</Alert>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={5} px={4}>
                <Box border={"2px solid #ddd"} p={3}>
                  <Typography variant="h4">Your Order</Typography>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    mt={3}
                    borderBottom={"1px solid #e2e2e2"}
                    pb={2}
                  >
                    <Typography variant="body1" color="#333" fontWeight={"700"}>
                      Product
                    </Typography>
                    <Typography variant="body1" color="#333" fontWeight={"700"}>
                      Subtotal
                    </Typography>
                  </Box>
                  <Box
                    // display={"flex"}
                    // justifyContent={"space-between"}
                    mt={2}
                    borderBottom={"1px solid #e2e2e2"}
                    pb={2}
                  >
                    {
                      cart?.items?.map(item => {
                        return <Box display={"flex"} justifyContent={"space-between"} my={"10px"}>
                          <Typography variant="body1" color="#333" fontWeight={"400"}>
                            {item.name} x {item.qty}
                          </Typography>
                          <Typography variant="body1" color="#333" fontWeight={"400"}>
                            <FaRupeeSign />{(item.price).toLocaleString("en-IN")}
                          </Typography>
                        </Box>
                      })
                    }
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    mt={2}
                    borderBottom={"1px solid #e2e2e2"}
                    pb={2}
                  >
                    <Typography variant="body1" color="#333" fontWeight={"400"}>
                      Subtotal
                    </Typography>
                    <Typography variant="body1" color="#333" fontWeight={"400"}>
                      <FaRupeeSign />{totalAmount.toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    mt={2}
                    borderBottom={"1px solid #e2e2e2"}
                    pb={2}
                  >
                    <Typography variant="body1" color="#333" fontWeight={"400"}>
                      Total (GST 18%)
                    </Typography>
                    <Typography variant="body1" color="#333" fontWeight={"400"}>
                      <FaRupeeSign />{total.toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                  <Box>
                    <FormControl sx={{ mt: "20px" }}>
                      <FormLabel id="demo-radio-buttons-group-label">Choose Payment Method</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={paymentMethod}
                        onChange={(e) => {
                          setPaymentMethod(e.target.value)
                        }}
                      >
                        <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
                        <FormControlLabel value="online" control={<Radio />} label="Pay Online" />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    mt={3}
                    pb={2}
                  >
                    <Button variant="contained" sx={{ color: "white" }} fullWidth size="large" disabled={!paymentMethod} onClick={handleSubmit}>Place Order</Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
