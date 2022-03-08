import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// Chakra UI
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Image,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";

// Icons
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { async } from "@firebase/util";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const navigate = useNavigate();

  const password = useRef();
  password.current = watch("password", "");
  const [btnDis, setBtnDis] = useState(false);

  const onSubmit = (data) => {
    setBtnDis(true);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          fullName: `${data.fname} ${data.lname}`,
          email: data.email,
          uid: user.uid,
        });

        navigate("/");

        toast({
          title: "Successful",
          description: "Your account created successfully",
          status: "success",
          variant: "subtle",
          duration: 9000,
          position: "top-right",
          isClosable: true,
        });
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

        // ..
      });
  };

  // Show Password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"4xl"} fontWeight="bold">
            Sign up
          </Heading>

          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <HStack marginBottom={4}>
                <Box width={"full"}>
                  <FormControl isInvalid={errors.fname}>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter First name"
                      {...register("fname", {
                        required: {
                          value: true,
                          message: "First Name is required",
                        },
                      })}
                    />
                    {errors.fname && (
                      <FormErrorMessage>
                        {errors.fname.message}.
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
                <Box width={"full"}>
                  <FormControl isInvalid={errors.lname}>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter Last name"
                      {...register("lname", {
                        required: {
                          value: true,
                          message: "Last Name is required",
                        },
                      })}
                    />
                    {errors.lname && (
                      <FormErrorMessage>
                        {errors.lname.message}.
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
              </HStack>
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
                    type={showPassword ? "text" : "password"}
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
                      onClick={handleClickShowPassword}
                      backgroundColor="transparent"
                    >
                      {showPassword ? (
                        <BsEyeFill fontSize={20} />
                      ) : (
                        <BsEyeSlashFill fontSize={20} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <FormErrorMessage>
                    {errors.password.message}.
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl marginBottom={4} isInvalid={errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      validate: (value) =>
                        value === password.current ||
                        "The passwords do not match",
                    })}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleClickShowConfirmPassword}
                      backgroundColor="transparent"
                    >
                      {showConfirmPassword ? (
                        <BsEyeFill fontSize={20} />
                      ) : (
                        <BsEyeSlashFill fontSize={20} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.confirmPassword && (
                  <FormErrorMessage>
                    {errors.confirmPassword.message}.
                  </FormErrorMessage>
                )}
              </FormControl>
              <Stack spacing={10} pt={2}>
                {btnDis ? (
                  <Button isLoading size="lg">
                    Sign up
                  </Button>
                ) : (
                  <Button size="lg" colorScheme={"blue"} type="submit">
                    Sign up
                  </Button>
                )}
              </Stack>
            </form>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?
                <Link to={"/"} style={{ color: "#2FA4FF", marginLeft: "5px" }}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
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

export default Register;
