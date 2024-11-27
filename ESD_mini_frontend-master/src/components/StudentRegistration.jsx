import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import HttpUtils from "../utils/httpsutils";  // Utility to make API requests
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentRegistration = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cgpa, setCgpa] = useState("");
    const [totalCredits, setTotalCredits] = useState("");
    const [graduationYear, setGraduationYear] = useState("");
    const [domain, setDomain] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [placement, setPlacement] = useState("");
    const [photograph, setPhotograph] = useState(null); // Track the photograph file
    const [domains, setDomains] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [placements, setPlacements] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    //const [IsAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all domains, specializations, and placements
        // const validateToken = async () => {
        //     try {
        //         const tokenToValidate = localStorage.getItem("authToken");

        //         if (!tokenToValidate) {
        //             setIsAuthenticated(false);
        //             navigate("/");
        //             return;
        //         }
        //         const res = await axios.post("http://localhost:8080/students/validate", {}, {
        //             headers: {
        //                 'Authorization': tokenToValidate
        //             }
        //         })
        //         if (res === false) setIsAuthenticated(true);
        //         else {
        //             navigate("/");
        //         }
        //     }
        //     catch (err) {
        //         console.log(err);
        //     }
        // }

        const fetchDomains = async () => {
            try {
                const res = await HttpUtils.getDomains();
                setDomains(res);
            } catch (err) {
                setError("Failed to fetch domains.");
            }
        };

        const fetchSpecializations = async () => {
            try {
                const res = await HttpUtils.getSpecializations();
                setSpecializations(res);
            } catch (err) {
                setError("Failed to fetch specializations.");
            }
        };

        const fetchPlacements = async () => {
            try {
                const res = await HttpUtils.getPlacements();
                setPlacements(res);
            } catch (err) {
                setError("Failed to fetch placements.");
            }
        };

        fetchDomains();
        fetchSpecializations();
        fetchPlacements();

        //validateToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !cgpa || !totalCredits || !graduationYear || !domain || !specialization || !placement) {
            setError("All fields are required.");
            return;
        }

        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", email);
        formData.append("cgpa", cgpa);
        formData.append("totalCredits", totalCredits);
        formData.append("graduationYear", graduationYear);
        formData.append("domain_id", domain);
        formData.append("specialization_id", specialization);
        formData.append("placement_id", placement);
        formData.append("photograph", photograph);

        try {
            const token = localStorage.getItem("authToken");
            console.log(token);

            const response = await axios.post("http://localhost:8080/students/register", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setSuccess("Student Registered Succesfully");
            setError(null);
            // alert(response);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Error registering student.";
            console.log(errorMessage);
            setError(errorMessage);
            if (errorMessage.slice(0, 14) === "JWT expired at") {
                navigate("/");
            }
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: "600px" }}>
            <h2 className="text-center">Student Registration</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFirstName" className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formLastName" className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formCgpa" className="mb-3">
                    <Form.Label>CGPA</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter CGPA"
                        value={cgpa}
                        onChange={(e) => setCgpa(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formTotalCredits" className="mb-3">
                    <Form.Label>Total Credits</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter total credits"
                        value={totalCredits}
                        onChange={(e) => setTotalCredits(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formGraduationYear" className="mb-3">
                    <Form.Label>Graduation Year</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter graduation year"
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDomain" className="mb-3">
                    <Form.Label>Domain</Form.Label>
                    <Form.Control
                        as="select"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        required
                    >
                        <option value="">Select domain</option>
                        {domains.map((domain) => (
                            <option key={domain.domainId} value={domain.domainId}>
                                {domain.program}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formSpecialization" className="mb-3">
                    <Form.Label>Specialization</Form.Label>
                    <Form.Control
                        as="select"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        required
                    >
                        <option value="">Select specialization</option>
                        {specializations.map((spec) => (
                            <option key={spec.specializationId} value={spec.specializationId}>
                                {spec.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formPlacement" className="mb-3">
                    <Form.Label>Placement</Form.Label>
                    <Form.Control
                        as="select"
                        value={placement}
                        onChange={(e) => setPlacement(e.target.value)}
                        required
                    >
                        <option value="">Select placement</option>
                        {placements.map((placement) => (
                            <option key={placement.id} value={placement.id}>
                                {placement.organization.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formPhotograph" className="mb-3">
                    <Form.Label>Photograph</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e) => setPhotograph(e.target.files[0])}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Register
                </Button>
            </Form>
        </Container>
    );
};

export default StudentRegistration;
//eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNAZ21haWwuY29tIiwiaWF0IjoxNzMyNzMxMzA2LCJleHAiOjE3MzI3MzE5MDZ9.rKb14nCAq--XaUu846N57O8cIL0V7FRhHes6Oo7J9jQ