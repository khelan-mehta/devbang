"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Textarea } from "./ui/textarea";

const SearchBox = ({sendDataToParent}:any) => {
  const [prompt, setPrompt] = useState("");
  const handlePromptSearch = () => {
    sendDataToParent(prompt);
  }
  return (
    <div className="flex w-full gap-2 mt-[-22vh]">
      <Textarea
        style={{ resize: "none", maxHeight: "40px" }}
        className="p-2 max-h-[30px] pt-6 text-[18px] w-[57vw]"
        placeholder=" What kind of Nutrients are in your mind?"
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      />
      <Button className="bg-[#86BA94] h-full hover:bg-[#86BA94]" onClick={handlePromptSearch}>
        <Search />
      </Button>
    </div>
  );
};

export default SearchBox;
