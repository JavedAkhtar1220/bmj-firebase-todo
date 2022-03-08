import React from "react";

// Chakra UI
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  Box,
} from "@chakra-ui/react";

// Components
import Layout from "../components/Layout";
// import { SmallCloseIcon } from "@chakra-ui/icons";

const ProfilePage = ({ userDetail }) => {
  console.log(userDetail);
  return (
    <Layout>
      <Flex
        minH={"60vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
        >
          <Heading
            lineHeight={1.1}
            textAlign="center"
            fontSize={{ base: "2xl", sm: "3xl" }}
          >
            User Profile Edit
          </Heading>
          <Box marginTop={10}></Box>

          <FormControl id="userName" isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              value={userDetail.fullName}
              defaultValue={userDetail.fullName}
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl isReadOnly>
            <FormLabel>Email</FormLabel>
            <Input
              defaultValue={userDetail.email}
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
            >
              Update
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default ProfilePage;
