import React, { useState } from "react";
import Header from "../component/header";
import Form from "../component/form";

export default function NewLiability() {
  const[category, setCategory] = useState()
  const[description, setDescription] = useState()
  const[Amount, setAmount] = useState()

  return (

    <div className="text-center">
      <Header back={<i className="fa-solid fa-chevron-left"></i>} page={"Add New Liability"} showBackButton />
      <Form label={"Category"} setValue={setCategory} form={"Choose a category..."} />
      <Form label={"Description"} setValue={setDescription} form={"Input a short description"} />
      <Form label={"Amount"} setValue={setAmount} type={"number"} form={"$0.00"} showButton buttonText={"Add Liability"} />
    </div>
  );
}