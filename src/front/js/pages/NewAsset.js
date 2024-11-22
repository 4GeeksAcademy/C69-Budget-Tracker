import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/header";
import Form from "../component/form";



import { BackendURL } from "../component/backendURL";
import { Context } from "../store/appContext";

export default function NewAsset() {
  const [category, setCategory] = useState()
  const [description, setDescription] = useState()
  const [amount, setAmount] = useState()
  const [backendURL, setBackendURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const url = process.env.BACKEND_URL || "";
    setBackendURL(url);
    console.log("BACKEND_URL:", url);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !description || !amount) {
      alert("Please fill in all fields");
      return;
    }

    if (!backendURL) {
      alert("BACKEND_URL is not set. Please configure your environment variables.");
      return;
    }

    console.log("Submitting assets:", { category, description, amount });

    try {
      setIsLoading(true);
      const fullURL = `${backendURL}/api/create-asset`;
      console.log("Full request URL:", fullURL);

      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      const response = await fetch(fullURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ category, description, amount: parseFloat(amount) }),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized. Please log in again.");
        } else if (response.status === 404) {
          throw new Error("User not found. Please log in again.");
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to add asset");
        }
      }

      const data = await response.json();
      console.log("Response data:", data);

      // Add the new liability to the store
      actions.addAssetToStore(data);

      alert("Asset added successfully");
      setCategory("");
      setDescription("");
      setAmount("");

      navigate("/assets");
    } catch (error) {
      console.error("Error adding asset:", error);
      alert(`An error occurred while adding the asset: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="text-center">
      <Header back={<i className="fa-solid fa-chevron-left"></i>} page={"Add New Asset"} showBackButton />
      <Form label={"Category"} setValue={setCategory} form={"Choose a category..."} />
      <Form label={"Description"} setValue={setDescription} form={"Input a short description"} />
      <Form
        label={"Amount"}
        value={amount}
        setValue={setAmount}
        type={"number"}
        form={"$0.00"}
        showButton
        buttonText={"Add Asset"}
        onButtonClick={handleSubmit}
      />
      {/* <Form
        onButtonClick={handleSubmit}
        disabled={isLoading}
      /> */}
    </div>
  );
}
