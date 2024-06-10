import Page from '../components/base/Page';
import {Typography, TextField, Button, Box} from '@mui/material';
import {useForm} from "react-hook-form";
import {RegisterDto} from "../models/auth.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema} from "../validationSchemas/forms.ts";
import {useNavigate} from "react-router-dom";
import useRegister from "../hooks/useRegister.ts";


export function Register() {
    const {
        handleSubmit, formState: {errors}, register
    } = useForm<RegisterDto>({
        resolver: zodResolver(registerSchema),
    });
    const navigate = useNavigate();
    const { mutateAsync: registerFunc, isError } = useRegister();

    const onSubmit = async (data: RegisterDto) => {
        await registerFunc(data);
        navigate("/login")
    };

    return (
        <Page title="Register">
            <Typography component="p" variant="h5">
                Please register to continue.
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 2}}>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    margin="normal"

                    {...register("email")}
                    error={typeof errors.email !== 'undefined'}
                    helperText={errors.email?.message}
                />
                <TextField
                    label="Display Name"
                    type="text"
                    fullWidth
                    required
                    margin="normal"

                    {...register("displayName")}
                    error={typeof errors.displayName !== 'undefined'}
                    helperText={errors.displayName?.message}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    required
                    margin="normal"

                    {...register("password")}
                    error={typeof errors.password !== 'undefined'}
                    helperText={errors.password?.message}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    required
                    margin="normal"

                    {...register("confirmPassword")}
                    error={typeof errors.confirmPassword !== 'undefined'}
                    helperText={errors.confirmPassword?.message}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt: 2}}>
                    Register
                </Button>
            </Box>
            {isError && <Typography color="error" sx={{ mt: 2 }}>Registration failed. Please try again.</Typography>}
            <Typography color="blue" sx={{ mt: 2 }} onClick={() => navigate("/login")}>
                Already have an account? Click here to login!
            </Typography>
        </Page>
    );
}

export default Register;
