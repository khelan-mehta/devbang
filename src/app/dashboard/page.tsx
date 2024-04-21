"use client";
import { Icons } from "@/components/icons";
import { useUser } from "@clerk/nextjs";
import "./style.css";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import "../../../public/Preview.svg";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navbar from "@/components/Navbar";
import SearchBox from "@/components/SearchBox";
import { PieChart, Pie, Cell } from "recharts";
import nlp from "compromise";
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
import { Drumstick, Undo, VeganIcon } from "lucide-react";
import axios from "axios";

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
  const extractFoodName = (input: string): string => {
    const doc = nlp(input.trim().toLowerCase());
    const foodName = doc.nouns().out("array").join(" ");
    return foodName;
  };
  const { isSignedIn, user, isLoaded } = useUser();
  if (isSignedIn) {
    console.log("Tu Hai");
  } else {
    console.log("Tu Nikal");
    redirect("/signin");
  }
  const [prompt, setPrompt] = useState<string>("");
  const handlePromptSearch = async (promptFromBox: string) => {
    setPrompt(promptFromBox);
    const updatedArray = [
      ...messageArray,
      { message: promptFromBox, timeStamp: currentTime, author: false },
    ]; // Modify this line to update the array as needed
    setMessageArray(updatedArray);
    sessionStorage.setItem("dataArray", JSON.stringify(updatedArray));

    const foodName = extractFoodName(prompt);
    console.log("Extracted food name:", foodName);

    await axios.get(`http://localhost:5000/${promptFromBox}`).then((r) => {
      if (r.status === 200) {
        const totalData = r.data;
        console.log(totalData);
        
      }
    });
  };
  const [currentStat, setCurrentStat] = useState(foodArray[0]);
  const [visible, setVisible] = useState(false);
  const data = [
    { name: "Protein", value: currentStat.proteinPercentage },
    { name: "Carbs", value: currentStat.carbsPercentage },
    { name: "Fiber", value: currentStat.fiberPercentage },
  ];
  const [currentTime, setCurrentTime] = useState<string>("");
  useEffect(() => {
    const storedData = sessionStorage.getItem("dataArray");
    if (storedData) {
      setMessageArray(JSON.parse(storedData));
    }
    const getCurrentTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    // Call getCurrentTime initially and then every minute
    getCurrentTime();
    const intervalId = setInterval(getCurrentTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (currentStat !== foodArray[0]) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [currentStat]);

  const [messageArray, setMessageArray] = useState([
    {
      message:
        "Welcome! 🌱 Ready to discover tasty, nutritious recipes and expert tips for a healthier, happier you? Let's get started!",
      timeStamp: currentTime,
      author: true,
    },
  ]);

  return (
    <div className="flex flex-col justify-between  h-screen bg-white p-8">
      <Navbar />
      <div className="flex bg-[#F3F3F3] mr-[1vw] text-center justify-center self-end p-2 mt-[-20px] rounded-lg w-[250px]">
        <RadioGroup defaultValue="All" className="flex gap-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="All" id="r1" />
            <Label htmlFor="r1">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2" className="flex">
              Veg
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3" className="flex">
              Non Veg
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex justify-around ">
        <div className="w-[60vw] h-[70vh] mt-[-16vh] flex flex-col">
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
          <div className="overflow-y-scroll customScrollBar">
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
        <div className="w-[30vw] h-[75vh] mt-[-40px] ml-[5vw] overflow-y-scroll customScrollBar m-3 z-20 shadow-lg rounded-[10px] bg-[white]">
          <div className="flex  rounded-t-[10px] bg-[#f4f4f4] ">
            <Icons.Robot />
            <p className="ml-1 self-center font-bold"> Kiyo</p>
          </div>
          <div className="messages flex flex-col p-2 ">
            {messageArray.map((message, index) => {
              return (
                <div
                  className={
                    message.author
                      ? "flex max-w-[60%] flex-col self-start rounded-lg   bg-yellow-100 p-2 m-1 text-[16px]"
                      : "flex max-w-[60%] flex-col self-end rounded-lg  bg-green-100 p-2 m-1 text-[16px]"
                  }
                >
                  <p>{message.message}</p>
                  <p
                    className={
                      message.author
                        ? "text-[12px] mt-[-10px] p-1 rounded-lg bg-white self-end "
                        : "text-[12px] p-1 rounded-lg bg-white self-end "
                    }
                  >
                    {currentTime}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <SearchBox sendDataToParent={handlePromptSearch} />
    </div>
  );
};

export default page;
