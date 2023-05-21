import { Stack, Text } from "@chakra-ui/react";
import { FaRegQuestionCircle } from "react-icons/fa";
import ContentWrapper from "../dashboard/ContentWrapper";

function HelpPage() {
  return (
    <ContentWrapper title="Bantuan" icon={FaRegQuestionCircle}>
      <Stack
        spacing="12"
        maxW="3xl"
        mx="auto"
        my={{ base: 0, lg: 5 }}
        borderRadius={{ base: 0, lg: 10 }}
        py="10"
        px={{ base: 5, lg: 10 }}
        bg="white"
        borderWidth={{ base: 0, lg: 1 }}
        borderColor="gray.200"
      >
        <Text>adasda</Text>
      </Stack>
    </ContentWrapper>
  );
}

export default HelpPage;
