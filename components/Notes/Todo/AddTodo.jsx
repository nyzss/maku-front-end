import {
  Stack,
  Button,
  Input,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";

const AddTodo = () => {
  return (
    <>
      <Stack spacing="4" p="4" borderRadius="xl" shadow="2xl">
        <Input
          placeholder="Add todo"
          bgColor={useColorModeValue("gray.100", "gray.700")}
          color={useColorModeValue("gray.800", "gray.800")}
        />
        <Textarea
          placeholder="todo content"
          bgColor={useColorModeValue("gray.100", "gray.700")}
        />
        <Button w="25%" bgColor="red.300">
          Add todo
        </Button>
      </Stack>
    </>
  );
};

export default AddTodo;
