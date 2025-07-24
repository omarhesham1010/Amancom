import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  color: #003366;
  font-size: 1.7rem;
  margin-bottom: 1rem;
`;

export default function Devices() {
  return (
    <div>
      <Title>Devices</Title>
      <p>Manage your GPS devices here.</p>
    </div>
  );
} 