"use client";
import { Button } from "@/components/button/Button";
import { INPUT_FIELD_TYPES } from "@/components/field/Field";
import { FlexGrid, FlexRow } from "@/components/flex-grid/FlexGrid";
import { Form } from "@/components/form/Form";
import * as React from "react";

export default function Login() {
  const [values, setValues] = React.useState({ email: "", password: "" });

  const handleSetValue = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };
  const signINUrl = "/api/signin";

  const formData = new FormData();
  formData.append("email", values.email);
  formData.append("password", values.password);
  const handleSubmit = async () => {
    try {
      await fetch(signINUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getTemplates = async () => {
    try {
      await fetch("api/templates", {
        method: "GET",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fields = [
    {
      name: "email",
      label: "Email",
      type: INPUT_FIELD_TYPES.EMAIL,
      required: true,
      value: values.email,
      onChange: handleSetValue,
    },
    {
      name: "password",
      label: "Password",
      type: INPUT_FIELD_TYPES.PASSWORD,
      required: true,
      value: values.password,
      onChange: handleSetValue,
    },
  ];
  return (
    <FlexGrid direction="column">
      <FlexRow grow={0}>
        <Form fields={fields} fieldLayout="stacked" />
      </FlexRow>
      <FlexRow grow={0}>
        <Button onClick={handleSubmit}>Signin</Button>
        <Button onClick={getTemplates}>Settings</Button>
      </FlexRow>
    </FlexGrid>
  );
}
