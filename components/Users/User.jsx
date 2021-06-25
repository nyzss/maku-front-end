import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Icon,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormHelperText,
  Slide,
  Circle,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";

import dayjs from "dayjs";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useMutation } from "react-query";

import GetCurrentUser from "./GetCurrentUser";

import SuccessAlert from "../Alert/SuccessAlert";

import { api } from "../../utils/api";

const User = ({ userData }) => {
  const [editing, setEditing] = useState(false);

  const [newImageUrl, setNewImageUrl] = useState(`${userData.avatarUrl}`);
  const [newBio, setNewBio] = useState(`${userData.bio}`);

  const [successAlert, setSuccessAlert] = useState(false);

  const editUserData = async ({ bio, avatarUrl }) => {
    const postUserData = await axios({
      method: "PUT",
      url: `${api}/api/users/edit`,
      data: {
        bio,
        avatarUrl,
      },
    }).catch((err) => {
      console.log(err);
    });

    return postUserData.data;
  };
  const { mutateAsync: mutateEdit, isLoading, status, data } = useMutation(
    editUserData
  );

  const handleEdit = (e) => {
    e.preventDefault();

    const changedData = {
      bio: newBio,
      avatarUrl: newImageUrl,
    };

    mutateEdit(changedData).then(() => {
      setSuccessAlert(true);
      setEditing(false);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
    });
  };

  return (
    <>
      {status === "success" && <GetCurrentUser />}
      <Flex
        p={{ base: 4, md: 24, lg: 40 }}
        pt={{ base: 24, md: 48 }}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          rounded="lg"
          shadow="md"
          bg={useColorModeValue("gray.200", "gray.700")}
          width="4xl"
          maxW="6xl"
        >
          <Image
            roundedTop="lg"
            w="auto"
            h="auto"
            fit="cover"
            src={userData.avatarUrl}
            fallbackSrc="https://source.unsplash.com/1600x900/?japan"
            alt="background image"
          />

          <Box p={6}>
            <Box>
              <Text
                as="span"
                fontSize="xs"
                color={useColorModeValue("gray.700", "gray.200")}
              >
                {userData._id}
              </Text>

              <Flex justifyContent="end">
                <Icon
                  onClick={() => setEditing(!editing)}
                  cursor="pointer"
                  as={FaEdit}
                  fontSize="xl"
                />
              </Flex>

              {!editing && (
                <>
                  <Text
                    display="block"
                    color={useColorModeValue("red.300", "red.300")}
                    fontWeight="bold"
                    fontSize="4xl"
                    mt={2}
                  >
                    {userData.username}
                  </Text>

                  <Text
                    as="p"
                    mt={2}
                    color={useColorModeValue("gray.600", "gray.400")}
                  >
                    {userData.bio}
                  </Text>
                </>
              )}
              {editing && (
                <Box as="form" onSubmit={handleEdit}>
                  <FormControl>
                    <FormLabel>New avatar</FormLabel>
                    <Input
                      borderColor="red.300"
                      placeholder="https://imgur.com/a/Jd5XjhQ"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      focusBorderColor="red.300"
                      _hover={{ borderColor: "gray.700" }}
                    />
                    <FormHelperText>
                      If the image you see is not the one you uploaded, that
                      means your image url is invalid!
                    </FormHelperText>
                    <FormLabel>Bio</FormLabel>
                    <Textarea
                      _hover={{ borderColor: "gray.700" }}
                      focusBorderColor="red.300"
                      borderColor="red.300"
                      placeholder="Write something about yourself!"
                      value={newBio}
                      onChange={(e) => setNewBio(e.target.value)}
                    />

                    <Button
                      isLoading={isLoading}
                      type="submit"
                      bgColor="red.300"
                      mt="4"
                      disabled={!newBio}
                    >
                      Submit changes
                    </Button>
                  </FormControl>
                </Box>
              )}
            </Box>

            <Box mt={4}>
              <Flex alignItems="center">
                <Text
                  as="span"
                  mx={1}
                  fontSize="sm"
                  color={useColorModeValue("gray.600", "gray.300")}
                >
                  Account creation date:{" "}
                  <Text as="span" color="red.300">
                    {dayjs(userData.createdAt).format("DD MMMM YYYY")}
                  </Text>
                </Text>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Flex>
      <Slide direction="bottom" in={successAlert} style={{ zIndex: 10 }}>
        <div onClick={() => setSuccessAlert(false)}>
          <SuccessAlert successMessage={data} />
        </div>
      </Slide>
    </>
  );
};

export default User;
