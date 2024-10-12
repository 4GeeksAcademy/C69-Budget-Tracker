import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/header";
import Form from "../component/form";
import { BackendURL } from "../component/backendURL";
import { Context } from "../store/appContext";

export default function NewLiability() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [backendURL, setBackendURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { actions } = useContext(Context);

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

    console.log("Submitting liability:", { category, description, amount });

    try {
      setIsLoading(true);
      const fullURL = `${backendURL}/api/create-liability`;
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
          throw new Error(errorData.message || "Failed to add liability");
        }
      }

      const data = await response.json();
      console.log("Response data:", data);

      alert("Liability added successfully");
      setCategory("");
      setDescription("");
      setAmount("");
      
      // Fetch updated liabilities
      await actions.fetchLiabilities();
      
      navigate("/liabilities");
    } catch (error) {
      console.error("Error adding liability:", error);
      alert(`An error occurred while adding the liability: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!backendURL) {
    return <BackendURL />;
  }

  return (
    <div className="text-center">
      <Header back={<i className="fa-solid fa-chevron-left"></i>} page={"Add New Liability"} showBackButton />
      <Form label={"Category"} value={category} setValue={setCategory} form={"Choose a category..."} />
      <Form label={"Description"} value={description} setValue={setDescription} form={"Input a short description"} />
      <Form 
        label={"Amount"} 
        value={amount} 
        setValue={setAmount} 
        type={"number"} 
        form={"$0.00"} 
        showButton 
        buttonText={isLoading ? "Adding..." : "Add Liability"}
        onButtonClick={handleSubmit}
        disabled={isLoading}
      />
    </div>
  );
}
