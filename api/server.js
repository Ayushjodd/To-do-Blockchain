const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const ABI = require("./ABI.json");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("server started at http://localhost:3000");
});

// Get your provider URL from crimson
const provider = new ethers.providers.JsonRpcProvider("/");
const contractAddress = ""; // Paste your contract address here
const contract = new ethers.Contract(contractAddress, ABI, provider);

const dateclashCheck = async (taskDate) => {
  const tasks = await contract.allTask();
  const foundTask = tasks.find((task) => task.date === taskDate);

  if (foundTask) {
    return foundTask.name;
  }
  return "No Task Found";
};

const priorityCheck = async (id) => {
  const tasks = await contract.allTask();
  const result = tasks[id - 1].name.includes("priority");
  return result;
};

app.post("/api/ethereum/create-task", async (req, res) => {
  const { taskDate } = req.body;
  const task = await dateclashCheck(taskDate);
  try {
    if (task !== "No Task Found") {
      res
        .status(409)
        .json({ status: 409, message: "Date clash: Task cannot be added" });
    } else {
      res.status(200).json({ status: 200, message: "Task can be added" });
    }
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/ethereum/view-task/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await contract.viewTask(taskId);
    const { id, name, date } = task;
    const numId = Number(id);
    const taskObj = {
      numId,
      name,
      date,
    };
    res.status(200).json({ status: 200, taskObj, message: "Task Exists" });
  } catch (error) {
    res.status(404).json({ status: 500, message: "Task does not exist" });
    console.error(error);
  }
});

app.get("/api/ethereum/view-all-task", async (req, res) => {
  try {
    const tasks = await contract.allTask();
    if (tasks.length === 0) {
      res
        .status(404)
        .json({ status: 404, message: "Task list does not exist" });
    } else {
      const taskList = tasks.map(({ id, name, date }) => {
        const taskId = Number(id);
        return { taskId, name, date };
      });
      res.status(200).json({ status: 200, taskList, message: "Tasks Exist" });
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/api/ethereum/update-task", async (req, res) => {
  const { taskDate } = req.body;
  const task = await dateclashCheck(taskDate);
  try {
    if (task !== "No Task Found") {
      res
        .status(409)
        .json({ status: 409, message: "Date clash: Task cannot be updated" });
    } else {
      res.status(200).json({ status: 200, message: "Task can be updated" });
    }
  } catch (error) {
    console.error(error);
  }
});

app.delete("/api/ethereum/delete-task/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const isTrue = await priorityCheck(taskId);
    if (isTrue) {
      res.status(403).json({ status: 403, message: "Task cannot be deleted" });
    } else {
      res.status(200).json({ status: 200, message: "Task can be deleted" });
    }
  } catch (error) {
    console.error(error);
  }
});
