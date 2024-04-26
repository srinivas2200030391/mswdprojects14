import React, { useState } from "react";
import styled from "styled-components";
import config from "../../config";
import axios from "axios";
const PasswordChangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 8px;
  border: none;
  margin-top: 50px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.6rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = localStorage.getItem("Admin");
    const id = JSON.parse(user)[0]._id;
    await axios.put(`${config.baseURL}/changepassword`, {
      id: id,
      password: currentPassword,
      newpassword: newPassword,
    });
  };

  return (
    <div>
      <h2 style={{ transform: "translateX(350pt)", marginTop: "70pt" }}>
        Change Password
      </h2>
      <PasswordChangeContainer>
        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Button type="submit">Change Password</Button>
        </form>
      </PasswordChangeContainer>
    </div>
  );
};

export default PasswordChange;
