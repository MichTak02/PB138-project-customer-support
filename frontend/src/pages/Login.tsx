import Page from '../components/base/Page';
import {Typography, TextField, Button, Box} from '@mui/material';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginDto} from "../models/auth.ts";
import {loginSchema} from "../validationSchemas/forms.ts";
import useLogin from "../hooks/useLogin.ts";

export function Login() {
    const {
        handleSubmit, formState: {errors}, register
    } = useForm<LoginDto>({
        resolver: zodResolver(loginSchema),
    });
    const { login, isPending, isError } = useLogin({ redirect: "/auth/dashboard" });

    const onSubmit = async (data: LoginDto) => {
        await login(data);
    };

    return (
        <Page title="Login">
            <Typography component="p" variant="h5">
                Please log in to continue.
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 2}}>
                <TextField
                    {...register("email")}
                    error={typeof errors.email !== 'undefined'}
                    helperText={errors.email?.message}
                    disabled={isPending}
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    {...register("password")}
                    error={typeof errors.password !== 'undefined'}
                    helperText={errors.password?.message}
                    disabled={isPending}
                    label="Password"
                    type="password"
                    fullWidth
                    required
                    margin="normal"
                />
                <Button onClick={handleSubmit(onSubmit)} type="submit" variant="contained" color="primary" fullWidth sx={{mt: 2}}>
                    Log In
                </Button>
                {isError && <Typography color="error" sx={{ mt: 2 }}>Login failed. Please try again.</Typography>}
            </Box>
        </Page>
    );
}

export default Login;
