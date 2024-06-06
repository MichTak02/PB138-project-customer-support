import TextField from "@mui/material/TextField"
import "./send-message.css"
import {Button} from "@mui/material";

export const SendMessage = () => {
    return (
        <div className="send-message">
            <TextField sx={{width: "80%", textWrap: "wrap"}}></TextField>
            <Button variant="contained" sx={{width: "20%"}}>Send</Button>
        </div>
    )
}
