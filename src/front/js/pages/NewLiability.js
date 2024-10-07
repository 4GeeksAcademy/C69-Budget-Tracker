import React from "react";
import Header from "../component/header";
import Form from "../component/form";

export default function NewLiability() {

  return (
    <div className="text-center">
      <Header back={<i className="fa-solid fa-chevron-left"></i>} page={"Add New Liability"} showBackButton={true} />
      <Form label={"Category"} form={""} />
      <Form label={"Description"} form={""} />
      <Form label={"Amount"} form={""} />
    </div>
  );
}