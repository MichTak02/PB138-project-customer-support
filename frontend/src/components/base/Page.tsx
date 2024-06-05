import { Typography } from "@mui/material"
import { PropsWithChildren } from "react"

export interface PageProps extends PropsWithChildren {
  title: string;
}

export function Page({ title, children } : PageProps) {
    return (
      <>
        <Typography component="h1" variant="h4" color="primary.main" mb={2}>{title}</Typography>
        {children}
      </>
    )
  }
  
export default Page