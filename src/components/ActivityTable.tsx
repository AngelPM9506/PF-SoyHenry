import {
  Avatar,
  Badge,
  Button,
  Flex,
  FormControl,
  Input,
  Select,
  Td,
  Text,
  Tr,
  useColorModeValue,
  useToast,
  Link,
} from "@chakra-ui/react";
import { Select as ReactSelect } from "chakra-react-select";
import React, { SetStateAction, useState } from "react";
import {
  deleteActivity,
  deleteComment,
  editActivity,
  editComment,
  getActivitiesId,
  patchActivity,
} from "src/utils/activities";
import { Activity } from "src/utils/interface";
import NextLink from "next/link";
import { ModalTextarea } from "./ModalEditableTextarea";
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import Reviews from "./Reviews";
import { ModalReviews } from "./ModalReviews";
import Loading from "./LoadingWithoutLayout";
type Props = {
  activity: Activity;
};

export function ActivityTable({ activity }: Props) {
  const textColor = useColorModeValue("#151f21", "#f4f4f4");
  const bg = useColorModeValue("#f4f4f4", "#151f21");
  const { data: actData, isLoading } = useQuery(["editActivity"], async () => {
    const id = activity.id;
    const actDetail = await getActivitiesId(id);

    return {
      activity: actDetail,
      id: id,
    };
  });

  const queryClient = useQueryClient();
  const mutatesubmit = useMutation(patchActivity, {
    onSuccess: () => {
      queryClient.resetQueries(["editActivity"]);
    },
  });
  const mutateedit = useMutation(editComment, {
    onSuccess: () => {
      queryClient.resetQueries(["editActivity"]);
    },
  });
  const mutatedelete = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.resetQueries(["editActivity"]);
    },
  });
  const mutateActivity = useMutation(editActivity, {
    onSuccess: () => {
      queryClient.resetQueries(["editActivity"]);
    },
  });

  const toast = useToast();
  const avaFormated = activity.availability.map((d) => ({
    value: d,
    label: d,
  }));
  const [data, setData] = useState({ ...activity });
  const [value, setValue] = useState(avaFormated);
  const [changed, setChanged] = useState("false");
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleActive = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({
      ...data,
      active: e.target.value === "true" ? true : false,
    });
  };

  const handleAvailability = (
    option: SetStateAction<{ value: string; label: string }[]>
  ) => {
    setValue(option);
  };

  const availability = [
    { value: "Monday", label: "Monday", color: "#FF8B00" },
    { value: "Tuesday", label: "Tuesday", color: "#FF8B00" },
    { value: "Wednesday", label: "Wednesday", color: "#FF8B00" },
    { value: "Thursday", label: "Thursday", color: "#FF8B00" },
    { value: "Friday", label: "Friday", color: "#FF8B00" },
    { value: "Saturday", label: "Saturday", color: "#FF8B00" },
    { value: "Sunday", label: "Sunday", color: "#FF8B00" },
  ];

  const handleEdit = async () => {
    const avaValue = value.map((a) => a.value);
    await editActivity({ ...data, availability: avaValue });
    return toast({
      title: "Successful change",
      description: "State changed successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDelete = async () => {
    await deleteActivity(data.id);
    return toast({
      title: "Successful delete",
      description: "Activity deleted successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Tr key={changed}>
      <Td minWidth={{ base: "300px", sm: "200px" }}>
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar
            src={activity.image as string}
            w="50px"
            borderRadius="12px"
            me="18px"
          />
          <Flex direction="column">
            <NextLink href={`/activities/${activity.id}`}>
              <Link>
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  minWidth="100%"
                >
                  {activity.name}
                </Text>
              </Link>
            </NextLink>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {activity.city.name}, {activity.city.country}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td>
        <Flex direction="column">
          <Input
            w={100}
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            name={"price"}
            value={data.price}
            onChange={(e) => handleChange(e)}
          />
        </Flex>
      </Td>
      <Td>
        <Flex direction="column">
          <FormControl>
            <ReactSelect
              id="availability"
              name="availability"
              options={availability}
              closeMenuOnSelect={false}
              size="sm"
              onChange={(e: any) => handleAvailability(e)}
              value={value}
              colorScheme={"blue"}
              isMulti
            />
          </FormControl>
        </Flex>
      </Td>
      <Td>
        <Badge
          bg={data.active === true ? "green.400" : "#e63946"}
          color={data.active === true ? "white" : "#e63946"}
          fontSize="16px"
          borderRadius="8px"
        >
          <Flex direction="column">
            <Select
              fontSize="sm"
              color="white"
              fontWeight="bold"
              name={"active"}
              value={data.active.toString()}
              borderColor={"transparent"}
              onChange={(e) => handleActive(e)}
              w={100}
            >
              <option value={"true"}>Active</option>
              <option value={"false"}>Inactive</option>
            </Select>
          </Flex>
        </Badge>
      </Td>
      <Td>
        <Flex direction="column">
          {/* <Textarea
            fontSize="sm"
            color="black"
            name={"description"}
            value={data.description}
            onChange={(e) => handleChange(e)}
            bg={"white"}
          ></Textarea> */}
          <ModalTextarea
            title={"Description"}
            name={"description"}
            value={data.description}
            handler={setData}
          />
        </Flex>
      </Td>
      <Td>
        <Flex direction="column">
          <ModalReviews
            data={actData}
            mutatesubmit={mutatesubmit}
            mutateedit={mutateedit}
            mutatedelete={mutatedelete}
          />
        </Flex>
      </Td>
      <Td>
        <Button
          bg={textColor}
          color={textColor}
          rounded={"md"}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
          onClick={() => handleEdit()}
        >
          <Text fontSize="md" color={bg} fontWeight="bold" cursor="pointer">
            Save
          </Text>
        </Button>
      </Td>
    </Tr>
  );
}
