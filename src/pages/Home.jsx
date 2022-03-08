import React, { useState } from "react";

// Chakra UI
import { Box, Input, Text, Button, Flex, useToast } from "@chakra-ui/react";

// Components
import Layout from "../components/Layout";
import TodoList from "../components/TodoList";

// Firebase
import { setDoc, doc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const Home = ({ currentUserUid }) => {
  const [todo, setTodo] = useState();
  const [btnDis, setBtnDis] = useState(false);

  const toast = useToast();

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (todo !== "") {
      setBtnDis(true);
      const key = doc(collection(db, "users")).id;
      const currentDate = new Date().getTime();

      await setDoc(doc(db, "todos", key), {
        name: todo,
        currentDate,
        key,
        userId: currentUserUid,
      });
      setBtnDis(false);

      setTodo("");
      toast({
        title: "Added",
        description: "Todo Added Succesfully",
        status: "success",
        variant: "subtle",
        duration: 4000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <Box
        width={"3xl"}
        marginX={"auto"}
        marginTop="20"
        padding={6}
        borderRadius={10}
        boxShadow={"2xl"}
      >
        <Text fontSize={"2xl"} fontWeight={500} textAlign="center">
          TODOS
        </Text>

        <form onSubmit={addTodo}>
          <Flex marginTop={8}>
            <Input
              placeholder="Enter Todos.."
              value={todo}
              onChange={handleChange}
            />
            {btnDis ? (
              <Button variant="outline" marginX={2} isLoading>
                Add
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                variant="outline"
                marginX={2}
                type="submit"
              >
                Add
              </Button>
            )}
          </Flex>
        </form>
        <Box marginTop={8}>
          <Text fontSize={"xl"} fontWeight={500} textAlign="center">
            Todo List
          </Text>
          <TodoList currentUserUid={currentUserUid} />
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
