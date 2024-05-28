import React from "react"
//import Navbar from "@/components/base/Navbar"
import { Box, Container } from "@mui/material"
import { Outlet } from "react-router-dom"

export function CustomerLayout() {
    return (
      <>
        <Container>
          <Box component="main" py={3}>
            <Outlet />
          </Box>
        </Container>
      </>
    )
  }
  
export default CustomerLayout