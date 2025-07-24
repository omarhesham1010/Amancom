import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const Wrapper = styled.div`
  min-height: 100vh;
  background: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07);
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  color: #003366;
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: #fafbfc;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: #003366;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s;
  &:hover {
    background: #002244;
  }
`;

const ErrorMsg = styled.div`
  color: #D32F2F;
  margin-bottom: 1rem;
  font-size: 0.98rem;
  text-align: center;
`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <Wrapper>
      <Card>
        <Logo src={logo} alt="Amancom Logo" />
        <Title>Login to Amancom</Title>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
        </form>
      </Card>
    </Wrapper>
  );
} 