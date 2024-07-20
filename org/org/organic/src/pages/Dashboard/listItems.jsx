import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";

import { MdLocalMall } from "react-icons/md";

export const mainListItems = (
    <React.Fragment>
        <Link to="products" style={{
            color: "black",
            textDecoration: "none"
        }}>
            <ListItemButton>
                <ListItemIcon>
                    <FaShoppingCart />
                </ListItemIcon>
                <ListItemText sx={{ fontFamily: "'Jost', sans-serif", }} primary="Products" />
            </ListItemButton>
        </Link>
        <Link to="orders" style={{
            color: "black",
            textDecoration: "none"

        }}>
            <ListItemButton>
                <ListItemIcon>
                    <MdLocalMall />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItemButton>
        </Link>
        <Link to="users" style={{
            color: "black",
            textDecoration: "none"
        }}>
            <ListItemButton>
                <ListItemIcon>
                    <BsFillPeopleFill />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItemButton>
        </Link>
        {/* <ListItemButton>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
        </ListItemButton> */}
        {/* <ListItemButton>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
        </ListItemButton> */}
    </React.Fragment>
);

// export const secondaryListItems = (
//     <React.Fragment>
//         <ListSubheader component="div" inset>
//             Saved reports
//         </ListSubheader>
//         <ListItemButton>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Current month" />
//         </ListItemButton>
//         <ListItemButton>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Last quarter" />
//         </ListItemButton>
//         <ListItemButton>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Year-end sale" />
//         </ListItemButton>
//     </React.Fragment>
// );