import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        if (!email || !email.includes("@")) {
            setError("Please provide a valid email address.");
            return;
        }
        if (!password || password.length < 6 || password.length > 12) {
            setError("Password must be between 6 to 12 characters long.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/admin/login", {
                email,
                password
            });

            // Assuming your backend returns the token directly
            const token = response.data;
            localStorage.setItem("authToken", token);
            navigate("/register");
        } catch (err) {

            //console.log(err);
            setError(err.response?.data?.message || "An error occurred during login.");
            setSuccess(null);
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: "400px" }}>
            <h2 className="text-center">Admin Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default AdminLogin;