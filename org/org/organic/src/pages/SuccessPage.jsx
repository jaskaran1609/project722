import { Box, Divider, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { FaCheck, FaCross } from 'react-icons/fa'
import { HiOutlineShieldExclamation } from 'react-icons/hi'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import NotFound from './NotFound/NotFound'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../slices/cartSlice'

const SuccessPage = () => {
    const [seacrhParams, setSearchParams] = useSearchParams()
    let result = seacrhParams.get("success")
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userState)



    useEffect(() => {
        if (result === "true") {
            dispatch(clearCart({
                token: user?.token
            }))
        }

        return undefined
    }, [seacrhParams])


    if (!result) {
        return <NotFound />
    }
    else if (!(result === "true") && !(result === "false")) {
        return <NotFound />

    }

    // console.log(result)

    return (
        <Box py={"70px"} bgcolor="#f8f6f3">
            <Box maxWidth={"1200px"} mx={"auto"}>
                <Box>
                    <Box>
                        <Typography variant="h2">Success</Typography>
                    </Box>
                </Box>
                <Box>
                    <Box mt={3}>
                        <Divider
                            sx={{
                                borderColor: "green.main",
                                borderBottomWidth: "medium",
                            }}
                        />
                    </Box>
                </Box>
                <Box textAlign={"center"} padding={"40px 0"} background={"#EBF0F5"}>
                    <Box sx={{
                        backgroundColor: "white",
                        padding: "60px",
                        borderRadius: "4px",
                        boxShadow: "0 2px 3px #C8D0D8",
                        margin: "0 auto",
                        display: "inline-block"

                    }}>
                        <Box sx={{
                            marginInline: "auto",
                            display: "grid",
                            placeContent: "center",
                            borderRadius: "115px",
                            height: "200px",
                            width: "200px",
                            background: "#F8FAF5",

                        }}>
                            {
                                result === "true" ? (<FaCheck color="#9ABC66" fontSize={"100px"} sx={{
                                    marginRight: "15px",
                                    lineheight: ""

                                }} />) :
                                    (<HiOutlineShieldExclamation color="#ff0000" fontSize={"100px"} sx={{

                                        marginRight: "15px",
                                        lineheight: ""

                                    }} />)
                            }

                        </Box>
                        <Box mt={"14px"}>
                            <Typography variant='h1' color={"#88B04B"} fontSize={"40px"} marginBottom={"10px"} fontWeight={"900"}>
                                {
                                    result === "true" ? "Success" : "Failed"
                                }
                            </Typography>
                            <Typography variant='body1'
                                color={"#404FSE"}
                                fontSize={"20px"}
                                margin={0}
                            >
                                {
                                    result === "true" ? "You have successfully made an Order" : "Oops! Some error occured while placing your order"
                                }
                            </Typography>
                            {
                                result === "true" && <Typography variant='body1' > - Congrate on making your Purchase</Typography>
                            }
                        </Box>

                    </Box>

                </Box>
            </Box>
        </Box>
    )
}

export default SuccessPage