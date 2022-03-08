import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// Chakra UI
import {
  Button,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";

// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

// Icons
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const navigate = useNavigate();

  const [btnDis, setBtnDis] = useState(false);

  const onSubmit = (data) => {
    setBtnDis(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setBtnDis(false);

        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          variant: "subtle",
          duration: 9000,
          position: "top-right",
          isClosable: true,
        });
      });
  };
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"4xl"} fontWeight="bold">
            Sign in
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.email} marginBottom={4}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email Address in required",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid Email address",
                  },
                })}
              />
              {errors.email && (
                <FormErrorMessage>{errors.email.message}.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.password} marginBottom={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleClick}
                    backgroundColor="transparent"
                  >
                    {show ? (
                      <BsEyeFill fontSize={20} />
                    ) : (
                      <BsEyeSlashFill fontSize={20} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <FormErrorMessage>{errors.password.message}.</FormErrorMessage>
              )}
            </FormControl>
            <Stack spacing={6}>
              <Stack direction={"row"} align={"start"} justify={"flex-end"}>
                <Link to="/reset-password" style={{ color: "#2FA4FF" }}>
                  Forgot password?
                </Link>
              </Stack>

              {btnDis ? (
                <Button isLoading>Sign in</Button>
              ) : (
                <Button colorScheme={"blue"} variant={"solid"} type="submit">
                  Sign in
                </Button>
              )}
              <Stack pt={6}>
                <Text align={"center"}>
                  New User?{" "}
                  <Link
                    to={"/register"}
                    style={{ color: "#2FA4FF", marginLeft: "5px" }}
                  >
                    Register
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1} display={{ base: "none", md: "flex" }}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
};

export default Login;
