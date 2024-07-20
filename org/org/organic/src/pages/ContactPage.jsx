import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
// import { Link } from 'react-router-dom'
import leaf from "../assets/small_leaf.png";
import { FaPhone, FaRegEnvelope, FaMapMarkerAlt } from "react-icons/fa"

const ContactPage = () => {
    return (
        <Box pb={"70px"}>
            <Box bgcolor={"#f8f6f3"} py={"110px"}>
                <Typography variant='h1' textAlign={"center"}>
                    Get In Touch
                </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"} mt={"-26px"}>
                <img style={{ height: "70px" }} src={leaf} alt="" />
            </Box>
            <Box >
                <Box display={"flex"} alignItems={"center"} maxWidth={"1200px"} p={"60px 0 120px"} marginRight={"auto"} marginLeft={"auto"}>
                    <Box width={"600px"} p={"10px"}>
                        <Box
                            border={"1px solid rgba(122,122,122,.25)"}
                            m={"10px"}
                            borderRadius={"3px"}>
                            <Box p={"10px"} >
                                <FaPhone fontSize={"18px"} color='#8bc34a' />

                            </Box>
                            <Box p={"8px"} mb={"25px"}>
                                <Typography variant='body1'> +234-456-9870</Typography>
                                <Typography variant='body1'> +234-456-9870</Typography>
                            </Box>

                        </Box>
                        <Box border={"1px solid rgba(122,122,122,.25)"} m={"10px"} borderRadius={"3px"}>
                            <Box p={"10px"} >
                                <FaRegEnvelope fontSize={"20px"} color='#8bc34a' />

                            </Box>
                            <Box p={"8px"} mb={"25px"}>
                                <Typography variant='body1'> ishu@example.com</Typography>
                                <Typography variant='body1'>support@example.com</Typography>
                            </Box>
                        </Box>
                        <Box border={"1px solid rgba(122,122,122,.25)"} m={"10px"} borderRadius={"3px"}>
                            <Box p={"10px"} >
                                <FaMapMarkerAlt fontSize={"20px"} color='#8bc34a' />

                            </Box>
                            <Box p={"8px"} mb={"25px"}>
                                <Typography variant='body1'> Chandigarh,</Typography>
                                <Typography variant='body1'> Mohali</Typography>
                            </Box>
                        </Box>


                    </Box>
                    <Box p={"10px"}>
                        <Grid item xs={12} md={5} py={2} color="black"  >
                            <Typography variant="h3" sx={{
                                fontFamily: "'Jost', sans-serif",
                                fontWeight: "800",
                                fontSize: "30px",
                                color: "primary.main",
                                mb: "15px"
                            }}
                            >
                                Leave Us A Message
                            </Typography>
                            <Typography variant='body1' sx={{ fontFamily: "'Jost', sans-serif", fontWeight: "500", color: "black", fontSize: "13px" }}>
                                Want us to contact You? Fill Out The details and we'll contact your as soon as possible.
                            </Typography>
                            <TextField type='text' label="Name" fullWidth sx={{
                                my: "15px"
                            }}> </TextField>
                            <TextField type='email' label="Email" fullWidth sx={{
                                my: "15px"
                            }}> </TextField>
                            <TextField type='text' label="Subject" fullWidth sx={{
                                my: "15px"
                            }}>  </TextField>
                            <TextField type='text' label="Message" multiline rows={4} fullWidth sx={{
                                my: "15px"
                            }}> </TextField>
                            <Button variant='contained' fullWidth sx={{
                                mt: 3,
                                bgcolor: "green.idle"
                            }} size='large'  >
                                Submit Now
                            </Button>

                        </Grid>
                    </Box>
                </Box>
            </Box>


        </Box>


    )
}

export default ContactPage

{/* <Box py={"150px"}>
            <Box maxWidth={"800px"} mx={"auto"}>
                <Typography variant='h1' textAlign={"center"}>
                    Oops! You must be Lost.
                </Typography>
                <Typography variant='h5' component={Link} sx={{ display: "block", mt: "20px", color: "inherit" }} to="/" textAlign={"center"}>
                    Go Back Home
                </Typography>
            </Box>
        </Box> */}