// pages/index.tsx
"use client";
import axios from "axios";
import React, { useState } from "react";

const AddDataForm = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const dataRecived = await axios.post("/api/user", data).then((res) => {
      console.log(res.data.message);
    });
  };

  return (
    <form>
      <label htmlFor="data">Enter Data:</label>
      <input
        type="text"
        id="data"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddDataForm;
