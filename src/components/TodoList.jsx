import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Modal } from "react-responsive-modal";
import { useForm } from "react-hook-form";
import moment from "moment";

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  useColorMode,
  background,
  useToast,
} from "@chakra-ui/react";

// Icons
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import PerfectScrollbar from "react-perfect-scrollbar";

// Firebase
import {
  onSnapshot,
  query,
  where,
  collection,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { async } from "@firebase/util";

const TodoList = ({ currentUserUid }) => {
  const [todoList, setTodoList] = useState([]);
  const [rowKey, setRowKey] = useState("");
  const [btnDis, setBtnDis] = useState(false);
  const toast = useToast();

  const { colorMode } = useColorMode();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState(false);

  const onOpenModal = (v) => {
    setRowKey(v.key);
    setOpen(true);
    setValue("todoName", v.name);
  };

  const onCloseModal = () => setOpen(false);

  const onSubmit = async (data) => {
    const reference = doc(db, "todos", rowKey);
    setBtnDis(true);

    await updateDoc(reference, {
      name: data.todoName,
    });

    toast({
      title: "Updated",
      description: "Todo Updated Succesfully",
      status: "success",
      variant: "subtle",
      duration: 4000,
      position: "top-right",
      isClosable: true,
    });

    setOpen(false);
    setBtnDis(false);
  };

  const handleDelete = (key) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await deleteDoc(doc(db, "todos", key));

        toast({
          title: "Updated",
          description: "Todo Updated Succesfully",
          status: "success",
          variant: "subtle",
          duration: 4000,
          position: "top-right",
          isClosable: true,
        });
      }
    });
  };

  useEffect(() => {
    const q = query(
      collection(db, "todos"),
      where("userId", "==", currentUserUid)
      //   orderBy("currentDate", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      setTodoList([]);
      querySnapshot.forEach((doc) => {
        setTodoList((pre) => [...pre, doc.data()]);
      });
    });
  }, []);

  return (
    <PerfectScrollbar>
      <Box height={"40vh"}>
        <Table variant="striped" marginTop={4}>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todoList.map((v, i) => (
              <Tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{v.name}</Td>
                <Td>{moment(v.currentDate).subtract(10, "days").calendar()}</Td>
                <Td>
                  <Button
                    variant={"outline"}
                    border="transparent"
                    onClick={() => onOpenModal(v)}
                    colorScheme="blue"
                  >
                    <FiEdit fontSize={18} />
                  </Button>
                  <Button
                    variant={"outline"}
                    border="transparent"
                    marginStart={2}
                    onClick={() => handleDelete(v.key)}
                    colorScheme="red"
                  >
                    <AiOutlineDelete fontSize={18} />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Modal open={open} onClose={onCloseModal} center>
        <Text fontSize={"2xl"} color="black" fontWeight={500}>
          Update Todos
        </Text>
        <Box marginTop={10} width="md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.todoName} marginBottom={4}>
              <FormLabel color="black">Name</FormLabel>
              <Input
                border={2}
                borderColor={"blue"}
                color="black"
                {...register("todoName", {
                  required: {
                    value: true,
                    message: "Todo is required",
                  },
                })}
              />
              {errors.todoName && (
                <FormErrorMessage>{errors.todoName.message}.</FormErrorMessage>
              )}
            </FormControl>
            {btnDis ? (
              <Button
                variant={"solid"}
                isLoading
                backgroundColor="blue.400"
                _hover={{ bgColor: "blue.400" }}
                width="full"
              >
                Update
              </Button>
            ) : (
              <Button
                variant={"solid"}
                backgroundColor="blue.400"
                type="submit"
                color="white"
                width="full"
                _hover={{ backgroundColor: "blue.500" }}
              >
                Update
              </Button>
            )}
          </form>
        </Box>
      </Modal>
    </PerfectScrollbar>
  );
};

export default TodoList;
