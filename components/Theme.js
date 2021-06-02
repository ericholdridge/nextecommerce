import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const SwitchMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode} p="0" h={8} w={8}>
      {" "}
      {colorMode === "light" ? (
        <MoonIcon w={4} h={4} />
      ) : (
        <SunIcon color="yellow.300" w={4} h={4} />
      )}
    </Button>
  );
};

export default SwitchMode;
