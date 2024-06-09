import Navbar from "../components/base/Navbar"
import {Box, Container} from "@mui/material"
import {Outlet} from "react-router-dom"

export function MainLayout() {
    return (
        <>
            <Navbar/>
            <Container>
                <Box component="main" py={3}>
                    <Outlet/>
                </Box>
            </Container>
        </>
    )
}

export default MainLayout