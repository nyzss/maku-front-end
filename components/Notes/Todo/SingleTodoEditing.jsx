import { useState } from "react";
import { useMutation } from "react-query";

import {
  Input,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  IconButton,
  FormControl,
  FormLabel,
  Box,
  Button,
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";

const SingleTodoEditing = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const updateEditingData = async ({ title, description, todoId }) => {
    const editingData = await axios({
      method: "PUT",
      url: "http://localhost:5000/todo/edit",
      data: {
        title,
        description,
        todoId,
      },
    });
  };

  const {
    mutateAsync: mutateEdit,
    isLoading: editIsLoading,
    data,
  } = useMutation(updateEditingData);

  const handleEdit = (e) => {
    e.preventDefault();

    const editedTodo = {
      title,
      description,
      todoId: todoData._id,
    };

    mutateEdit(editedTodo).then(() => {
      setTitle("");
      setDescription("");
      onClose();
    });
  };

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="auto"
      >
        <PopoverTrigger>
          <IconButton size="sm" icon={<EditIcon />} />
        </PopoverTrigger>

        <PopoverContent bgColor="gray.700" shadow="xl" p={5}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Box as="form" onSubmit={handleEdit}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Edit the todo title"
                value={title}
                bgColor="gray.800"
                focusBorderColor="red.300"
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Edit the todo description"
                value={description}
                bgColor="gray.800"
                focusBorderColor="red.300"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <Button mt="4" color="red.300" type="submit">
              Update
            </Button>
          </Box>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SingleTodoEditing;
