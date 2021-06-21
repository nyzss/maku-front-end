import { Progress } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const TodoProgress = ({ todoData }) => {
  const [completedTodos, setCompletedTodos] = useState(0);

  useEffect(() => {
    const completed = [];

    todoData &&
      todoData.forEach((data) => {
        if (data.completed === true) {
          completed.push(data.completed);
        }
      });

    setCompletedTodos(completed.length);
  }, [completedTodos, todoData]);

  return (
    <>
      <Progress
        colorScheme="pink"
        size="sm"
        value={completedTodos}
        max={todoData.length}
      />
    </>
  );
};

export default TodoProgress;
