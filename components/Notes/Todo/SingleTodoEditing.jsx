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
  FormHelperText,
  useColorModeValue,
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";

import axios from "axios";

import { useQueryClient } from "react-query";

import { api } from "../../../utils/api";

const SingleTodoEditing = ({ todoData }) => {
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(`${todoData.title}`);
  const [description, setDescription] = useState(`${todoData.description}`);

  const updateEditingData = async ({ title, description, todoId }) => {
    const editingData = await axios({
      method: "PUT",
      url: `${api}/api/todo/edit`,
      data: {
        title,
        description,
        todoId,
      },
    });

    return editingData.data;
  };

  const { mutateAsync: mutateEdit } = useMutation(updateEditingData);

  const handleEdit = (e) => {
    e.preventDefault();

    const editedTodo = {
      title,
      description,
      todoId: todoData._id,
    };

    mutateEdit(editedTodo).then(() => {
      onClose();
      queryClient.invalidateQueries("getAllTodos");
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

        <PopoverContent
          borderColor="red.300"
          bgColor={useColorModeValue("white", "gray.700")}
          shadow="2xl"
          p={5}
        >
          <PopoverArrow />
          <PopoverCloseButton />
          <Box as="form" onSubmit={handleEdit}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Edit the todo title"
                value={title}
                bgColor={useColorModeValue("gray.100", "gray.800")}
                focusBorderColor="red.300"
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Edit the todo description"
                value={description}
                bgColor={useColorModeValue("gray.100", "gray.800")}
                focusBorderColor="red.300"
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormHelperText>
                If you do not intend to edit a field, leave it as it is.
              </FormHelperText>
            </FormControl>
            <Button
              // disabled={!title}
              mt="4"
              color="red.300"
              type="submit"
            >
              Update
            </Button>
          </Box>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SingleTodoEditing;
