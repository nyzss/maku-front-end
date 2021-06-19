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
          placeholder="todo title"
          bgColor={useColorModeValue("gray.100", "gray.700")}
        />
        <Textarea
          placeholder="short description"
          bgColor={useColorModeValue("gray.100", "gray.700")}
          resize="none"
        />
        <Button w="25%" bgColor="red.300">
          Add todo
        </Button>
      </Stack>
    </>
  );
};

export default AddTodo;
