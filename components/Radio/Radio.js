import { HStack } from "@chakra-ui/layout";
import { useRadioGroup } from "@chakra-ui/radio";
import RadioCard from "./RadioCard";

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
function Radio({ options, setSize }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "",
    defaultValue: "",
    onChange: setSize,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options?.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio} setSize={setSize}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}

export default Radio;
