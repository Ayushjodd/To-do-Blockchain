import React from "react";

export default function ViewTask() {
  const [task, setTask] = useState([]);
  const viewtask = async (e) => {
    try {
      e.preventDefault();
      const taskID = document.querySelector("#taskID").value;
      const res = await fetch(
        `http://localhost:3000/api/ethereum/view-task/${taskID}`,
        {
          method: "GET",
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <form onSubmit={viewtask}>
        <label>
          ID:
          <input id="taskID" />
        </label>
        <button type="submit">view task</button>
      </form>
    </>
  );
}
