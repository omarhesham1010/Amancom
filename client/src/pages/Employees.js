import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  color: #003366;
  font-size: 1.7rem;
  margin-bottom: 1rem;
`;

export default function Employees() {
  return (
    <div>
      <Title>Employees</Title>
      <p>Manage your employees here.</p>
    </div>
  );
} 