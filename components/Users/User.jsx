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
  Slide,
  FormHelperText,
} from "@chakra-ui/react";
import axios from "axios";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useMutation } from "react-query";

import { useRouter } from "next/router";

import GetCurrentUser from "./GetCurrentUser";

import SuccessAlert from "../Alert/SuccessAlert";

const User = ({ userData, loggedIn, getLoggedIn }) => {
  const router = useRouter();

  const [editing, setEditing] = useState(false);

  const [newImageUrl, setNewImageUrl] = useState(`${userData.avatarUrl}`);
  const [newBio, setNewBio] = useState(`${userData.bio}`);

  const [succesAlert, setSuccesAlert] = useState(false);

  const editUserData = async ({ bio, avatarUrl }) => {
    const postUserData = await axios({
      method: "PUT",
      url: "http://localhost:5000/users/edit",
      data: {
        bio,
        avatarUrl,
      },
    }).catch((err) => {
      console.log(err);
    });

    return postUserData.data;
  };
  const {
    mutateAsync: mutateEdit,
    isLoading,
    status,
    data,
  } = useMutation(editUserData);

  useEffect(() => {
    getLoggedIn();

    if (!loggedIn) {
      router.push("/");
    }
  }, [userData]);

  const handleEdit = (e) => {
    e.preventDefault();

    const changedData = {
      bio: newBio,
      avatarUrl: newImageUrl,
    };

    mutateEdit(changedData).then(() => {
      setEditing(false);
      setSuccesAlert(true);
      setTimeout(() => {
        setSuccesAlert(false);
      }, 3000);
      console.log(data);
    });
  };

  return (
    <>
      {status === "success" && <GetCurrentUser />}
      <Flex p={50} w="full" alignItems="center" justifyContent="center">
        <Box
          mx="auto"
          rounded="lg"
          shadow="md"
          bg={useColorModeValue("gray.200", "gray.700")}
          width="2xl"
          maxW="4xl"
        >
          <Image
            roundedTop="lg"
            w="full"
            h={64}
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
      {/* <Slide direction="bottom" in={succesAlert} style={{ zIndex: 10 }}>
        <SuccessAlert succesMessage={data} />
      </Slide> */}
    </>
  );
};

export default User;
