import { Box } from "@chakra-ui/layout";
import { useRadio } from "@chakra-ui/radio";

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="sm"
        _checked={{
          bg: "#6B46C1",
          color: "white",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default RadioCard;
