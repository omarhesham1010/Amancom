import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  color: #003366;
  font-size: 1.7rem;
  margin-bottom: 1rem;
`;

export default function Subscriptions() {
  return (
    <div>
      <Title>Subscriptions</Title>
      <p>Manage your subscriptions here.</p>
    </div>
  );
} 