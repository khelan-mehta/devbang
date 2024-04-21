"use client";
import { Icons } from "@/components/icons";
import { UserButton, redirectToSignIn, useUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import "../../../public/Preview.svg";
import Chatbox from "@/components/dabba";
import Navbar from "@/components/Navbar";
import SearchBox from "@/components/SearchBox";
import { PieChart, Pie, Cell, Legend } from "recharts";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Undo } from "lucide-react";

const foodArray = [
  {
    food: "Chicken Breast",
    proteinPercentage: 31,
    carbsPercentage: 42,
    fiberPercentage: 27,
    price: 5.99,
  },
  {
    food: "Salmon",
    proteinPercentage: 25,
    carbsPercentage: 0,
    fiberPercentage: 0,
    price: 10.99,
  },
  {
    food: "Paneer",
    proteinPercentage: 18,
    carbsPercentage: 2,
    fiberPercentage: 0,
    price: 7.99,
  },
  {
    food: "Tofu",
    proteinPercentage: 15,
    carbsPercentage: 2,
    fiberPercentage: 1,
    price: 4.99,
  },
  {
    food: "Black Beans",
    proteinPercentage: 21,
    carbsPercentage: 24,
    fiberPercentage: 8,
    price: 2.99,
  },
  {
    food: "Greek Yogurt",
    proteinPercentage: 10,
    carbsPercentage: 4,
    fiberPercentage: 0,
    price: 3.99,
  },
  {
    food: "Eggs",
    proteinPercentage: 13,
    carbsPercentage: 1,
    fiberPercentage: 0,
    price: 2.49,
  },
  {
    food: "Beef",
    proteinPercentage: 26,
    carbsPercentage: 0,
    fiberPercentage: 0,
    price: 8.99,
  },
  {
    food: "Lentils",
    proteinPercentage: 9,
    carbsPercentage: 20,
    fiberPercentage: 8,
    price: 1.99,
  },
  {
    food: "Almonds",
    proteinPercentage: 21,
    carbsPercentage: 22,
    fiberPercentage: 12,
    price: 6.99,
  },
  {
    food: "Quinoa",
    proteinPercentage: 14,
    carbsPercentage: 64,
    fiberPercentage: 7,
    price: 3.49,
  },
  {
    food: "Cottage Cheese",
    proteinPercentage: 12,
    carbsPercentage: 4,
    fiberPercentage: 0,
    price: 4.49,
  },
  {
    food: "Peanuts",
    proteinPercentage: 25,
    carbsPercentage: 16,
    fiberPercentage: 8,
    price: 3.79,
  },
  {
    food: "Turkey Breast",
    proteinPercentage: 29,
    carbsPercentage: 0,
    fiberPercentage: 0,
    price: 6.49,
  },
  {
    food: "Soybeans",
    proteinPercentage: 36,
    carbsPercentage: 30,
    fiberPercentage: 9,
    price: 5.99,
  },
];

// Sorting the array by protein percentage in descending order
foodArray.sort((a, b) => b.proteinPercentage - a.proteinPercentage);

const COLORS = ["#263238", "#86BA94", "#39E75F"];
const page = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  if (isSignedIn) {
    console.log("Tu Hai");
  } else {
    console.log("Tu Nikal");
    redirect("/signin");
  }
  const [prompt, setPrompt] = useState<string>("");
  const handlePromptSearch = (promptFromBox: string) => {
    setPrompt(promptFromBox);
  };
  const [currentStat, setCurrentStat] = useState(foodArray[0]);
  const [visible, setVisible] = useState(false);
  const data = [
    { name: "Protein", value: currentStat.proteinPercentage },
    { name: "Carbs", value: currentStat.carbsPercentage },
    { name: "Fiber", value: currentStat.fiberPercentage },
  ];

  useEffect(() => {
    if (currentStat !== foodArray[0]) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [currentStat]);

  return (
    <div className="flex flex-col justify-between  h-screen bg-white p-8">
      <Navbar />
      <div className="flex justify-around">
        <div className="w-[60vw] h-[70vh]    flex flex-col">
          <div className="flex justify-around m-4">
            <div className="w-[25vw] flex flex-col h-[33vh] cursor-pointer  rounded-lg bg-[#F3F3F3] border-solid">
              <p className="m-4 cursor-pointer text-[#86BA94] font-bold text-[18px]">
                <span className="font-bold text-black mr-2">
                  {visible ? "" : "#1"}
                </span>
                {currentStat.food}
              </p>
              {visible ? (
                <Button className="w-[40px] p-0 ml-2">
                  <Undo
                    size={20}
                    onClick={() => setCurrentStat(foodArray[0])}
                  />
                </Button>
              ) : (
                <></>
              )}

              <div className="chart cursor-pointer">
                <PieChart
                  width={400}
                  height={400}
                  className="mt-[-140px] ml-[50px]"
                >
                  <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <div
                className={
                  visible
                    ? "m-4 cursor-pointer w-[150px] p-2 bg-white rounded-lg  mt-[-160px]"
                    : "m-4 cursor-pointer w-[150px] p-2 bg-white rounded-lg  mt-[-140px]"
                }
              >
                Price/g : {currentStat.price}
              </div>
            </div>
            <div className="w-[25vw] flex  h-[33vh] cursor-pointer  rounded-lg bg-[#F3F3F3]">
              <div className="flex flex-col self-center justify-center align-middle">
                {foodArray.slice(1, 4).map((food, index) => {
                  return (
                    <div
                      className="flex text-[10px]  justify-between ml-10  bg-white m-2 p-3 rounded-lg"
                      onClick={() => setCurrentStat(food)}
                    >
                      <p className="ml-2 font-bold">#{index + 2} </p>
                      <p className="ml-2 font-bold">{food.food}</p>
                      <p className="ml-2 flex">
                        Carbs : {food.carbsPercentage}{" "}
                      </p>
                      <p className="ml-2 flex">
                        Fiber : {food.fiberPercentage}{" "}
                      </p>
                      <p className="ml-2 flex">
                        Protein : {food.proteinPercentage}{" "}
                      </p>
                      <p className="ml-2 bg-black text-white p-1 rounded-lg">
                        {food.price}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="overflow-y-scroll">
            <Table className="w-[55vw] ml-10">
              <TableCaption>A list of Recommended Searches</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead className="w-[100px]">Food Item</TableHead>
                  <TableHead>Carbs Percentage</TableHead>
                  <TableHead>Fiber Percentage</TableHead>
                  <TableHead>Protein Percentage</TableHead>
                  <TableHead>Price/g</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {foodArray.slice(5, foodArray.length - 1).map((food, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-bold mr-2">
                      #{index + 5}
                    </TableCell>
                    <TableCell
                      className="font-bold"
                      onClick={() => {
                        setCurrentStat(food);
                      }}
                    >
                      {food.food}
                    </TableCell>
                    <TableCell>{food.carbsPercentage}</TableCell>
                    <TableCell>{food.fiberPercentage}</TableCell>
                    <TableCell>{food.proteinPercentage}</TableCell>
                    <TableCell className="text-right">{food.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="w-[30vw] h-[85vh] border-2 border-black border-solid "></div>
      </div>
      <SearchBox sendDataToParent={handlePromptSearch} />
    </div>
  );
};

export default page;
