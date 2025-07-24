import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  color: #003366;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export default function Dashboard() {
  return (
    <Card>
      <Title>Welcome to Amancom Dashboard</Title>
      <p>This is your GPS management system overview.</p>
    </Card>
  );
} 