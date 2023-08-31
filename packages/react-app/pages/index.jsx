import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import NextLink from "next/link";
import {
  Box,
  HStack,
  Heading,
  Text,
  Link,
  Image,
  chakra,
  Container,
  Button,
  Spinner,
  Flex,
  useColorModeValue,
  useColorMode,
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react";
import BuilderFunctionList from "../components/BuilderFunctionList";
import { SERVER_URL } from "../constants";
import { USER_FUNCTIONS } from "../helpers/constants";
import MetaSeo from "../components/MetaSeo";
import { getAllBuilders } from "../data/api/builder";
import { getAllBuilds, getAllEvents } from "../data/api";
import { EVENT_TYPES } from "../helpers/events";
import moment from "moment";

const buildersToShow = ["fullstack", "frontend", "damageDealer", "advisor", "artist", "support"];

const StatBox = ({ value, monthlyValue, title, link }) => (
  <Flex
    border="1px solid"
    borderColor="gray.300"
    p="20px"
    direction="column"
    justify="center"
    align="center"
    minW="140px"
    minH="120px"
  >
    <Text fontSize="2xl" fontWeight="bold" whiteSpace="nowrap">
      {link ? (
        <NextLink href={link} passHref>
          <LinkOverlay>{value}</LinkOverlay>
        </NextLink>
      ) : (
        <>{value}</>
      )}
    </Text>
    <Text color="gray.400">{title}</Text>
    <Text fontSize="xs" color="green.500">
      ▲ {monthlyValue}
    </Text>
  </Flex>
);

/* eslint-disable jsx-a11y/accessible-emoji */
export default function Index({ bgStats }) {
  const [builders, setBuilders] = useState([]);
  const [isLoadingBuilders, setIsLoadingBuilders] = useState(false);

  const streamSection = useRef(null);

  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const heroBg = useColorModeValue("#FCFBF8", "gray.800");
  const scaffoldEthBg = useColorModeValue("#fbf7f6", "whiteAlpha.300");

  useEffect(() => {
    async function fetchBuilders() {
      setIsLoadingBuilders(true);
      const fetchedBuilders = await axios.get(`${SERVER_URL}/builders`);

      setBuilders(fetchedBuilders.data);
      setIsLoadingBuilders(false);
    }

    fetchBuilders();
  }, []);

  const smoothScroll = ref => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <MetaSeo
        title="New Players Cooperative"
        description="A group of builders, artists and dreamers using ERC-6551 and AI to enrich the web3 ecosytem."
        image="/assets/bg_teaser.png"
      />
      <Flex bgColor={heroBg} alignItems="center" direction={{ base: "column-reverse", lg: "row" }}>
        <Box w={{ base: "100%", lg: "50%" }} pl={{ base: "50px", lg: "15%" }} pr="50px" py="50px">
          <Box maxW="500px" margin={{ base: "auto", lg: "0" }} textAlign={{ base: "center", lg: "left" }}>
            <Heading as="h1" mb="10px">
              New Players Cooperative
            </Heading>
            <Text mb="25px" maxW="470px">
            A group of builders, artists and dreamers using <strong>ERC-6551 and AI</strong>. Our mission is to build a better world with the new players in the game of life.
            </Text>
            <Text mb="10px">👉  
            <Link
                  href="https://drive.google.com/file/d/1AlIeO6PrUPa2orDKpQlO4edmWl6l_nVV/view?usp=sharing"
                  fontWeight="700"
                  color="teal.500"
                  isExternal
                >
                  🔎The New Players Brief
                </Link>{" "}
                👈
            </Text>
            {/*Builds / Builders / ETH distributed Ξ*/}
            {/*
            <Box d="inline-block">
              <HStack mt="50px" justifyContent={{ base: "center", lg: "initial" }}>
                <LinkBox>
                  <StatBox
                    value={bgStats.builderCount}
                    monthlyValue={bgStats.buildersCountMonth}
                    title="builders"
                    link="/builders"
                  />
                </LinkBox>
                <LinkBox>
                  <StatBox
                    value={bgStats.buildCount}
                    monthlyValue={bgStats.buildCountMonth}
                    title="builds"
                    link="/builds"
                  />
                </LinkBox>
                <LinkBox onClick={() => smoothScroll(streamSection)} cursor="pointer">
                  <StatBox
                    value={`Ξ ${bgStats.streamedEth.toFixed(2)}`}
                    monthlyValue={`Ξ ${bgStats.streamedEthMonth.toFixed(2)}`}
                    title="streamed"
                  />
                </LinkBox>
              </HStack>
              <HStack mt="5px" justifyContent={{ base: "center", lg: "center" }}>
                <Text fontSize="xs" color="green.500">
                  ▲ Monthly change
                </Text>
              </HStack>
            </Box>
            */}
          </Box>
        </Box>

        <Box w={{ base: "100%", lg: "50%" }} mt={{ base: "50px", lg: "0" }}>
          <Image
            src="assets/bg_castle.png"
            p={{ base: "0", lg: "80px" }}
            m="auto"
            maxW={{ base: "200px", lg: "100%" }}
          />
        </Box>
      </Flex>

      <Box bgColor={scaffoldEthBg} p="45px 0">
        <Container maxW="container.md" centerContent>
          <Flex alignItems="center" flexDirection={{ base: "column", lg: "row" }}>
            <Image
              src="assets/scaffold-eth.jpeg"
              pb={{ base: "25px", lg: "0" }}
              m="auto"
              maxW="200px"
              filter={isDarkMode ? "grayscale(1)" : "auto"}
            />
            <Box pl={{ base: "0", lg: "80px" }}>
              <Text fontSize={{ base: "xl", lg: "2xl" }} fontWeight="bold">
                <Link
                  href="https://github.com/scaffold-eth/scaffold-eth-2"
                  fontWeight="700"
                  color="teal.500"
                  isExternal
                >
                  🏗 Scaffold-ETH 2
                </Link>{" "}
                is our tool of choice.
              </Text>
              <Text fontSize={{ base: "md", lg: "lg" }} mt="8px">
                🔧 We actively maintain it and build with it.
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.md" centerContent>
        <Box textAlign="center" mt="128px">
          <Heading as="h3" color="#CBD5E0" mb="10px">
            0.
          </Heading>
          <Text>
            👋 Are you a <b>developer</b> onboarding into web3?
          </Text>
          <Text mt="18px">
            ⚔️ Take on the challenges over at{" "}
            <Link href="https://speedrunethereum.com" color="teal.500" isExternal>
              SpeedRunEthereum.com
            </Link>
            !
          </Text>
        </Box>

        <Box textAlign="center" mt="128px">
          <Heading as="h3" color="#CBD5E0" mb="10px">
            1.
          </Heading>
          <Text>
            🏭 So you can crush Solidity and you're looking for{" "}
            <Link
              href="https://twitter.com/austingriffith/status/1478760479275175940?s=20&t=0zGF8M_7Hoeuy-D6LDoFpA"
              color="teal.500"
              isExternal
            >
              next steps
            </Link>
            ?
          </Text>
          <Text mt="18px">
            🧫 Filter by{" "}
            <Link
              href="https://github.com/scaffold-eth/scaffold-eth-examples/branches/active"
              color="teal.500"
              isExternal
            >
              active
            </Link>{" "}
            in the{" "}
            <Link href="https://github.com/scaffold-eth/scaffold-eth-examples" color="teal.500" isExternal>
              scaffold-eth-examples
            </Link>{" "}
            branch...
          </Text>
          <Text mt="18px">
            🧑‍🚀 contribute to an interesting build or{" "}
            <Link href="https://github.com/scaffold-eth/scaffold-eth#-scaffold-eth" color="teal.500" isExternal>
              fork
            </Link>{" "}
            something new!
          </Text>
        </Box>

        <Box textAlign="center" mt="128px">
          <Heading as="h3" color="#CBD5E0" mb="10px">
            2.
          </Heading>
          <Text>
            🏹 Are you <b>building</b> forkable components with 🏗 scaffold-eth?
          </Text>
          <Text mt="18px">
            ⚖️ Shill your wares at the{" "}
            <Link color="teal.500" href="/builds">
              🏰 BuidlGuidl
            </Link>
          </Text>
        </Box>

        <Box textAlign="center" mt="128px">
          <Heading as="h3" color="#CBD5E0" mb="10px">
            3.
          </Heading>
          <Text>
            💬 Chat with fellow builders in the{" "}
            <Link color="teal.500" isExternal href="https://t.me/+PXu_P6pps5I5ZmUx">
              🏰 BuidlGuidl 📣 Townhall
            </Link>{" "}
            telegram!
          </Text>
        </Box>

        <Box textAlign="center" mt="64px">
          <Text>-</Text>
        </Box>

        <Box textAlign="center" mt="64px">
          <Text mb="25px">
            💰 a{" "}
            <Link href="https://fund.buidlguidl.com/funding" fontWeight="700" color="teal.500" isExternal>
              yolo
            </Link>{" "}
            to 🏰BuidlGuidl.eth is a{" "}
            <Link href="https://fund.buidlguidl.com/funding" fontWeight="700" color="teal.500" isExternal>
              yolo
            </Link>{" "}
            to high leverage web3 devs.
          </Text>
        </Box>

        <Box textAlign="center" mt="64px">
          <Text>-</Text>
        </Box>

        <Heading as="h2" size="md" my="64px" color="gray.500" ref={streamSection}>
          Active 🏰 BuidlGuidl members:
        </Heading>

        {buildersToShow.map(builderFunction => (
          <Box mb="144px" key={builderFunction}>
            <HStack justifyContent="center" mb="25px" spacing="24px">
              <Image src={`/assets/${USER_FUNCTIONS[builderFunction]?.graphic}`} boxSize="200px" />
              <Heading as="h3" color="gray.500" w="160px">
                {USER_FUNCTIONS[builderFunction]?.pluralLabel}
              </Heading>
            </HStack>
            {isLoadingBuilders ? (
              <Flex justifyContent="center">
                <Spinner />
              </Flex>
            ) : (
              <BuilderFunctionList
                builders={builders.filter(
                  builder => builder.function === builderFunction && !builder?.graduated?.status,
                )}
              />
            )}
          </Box>
        ))}

        <Box>
          <NextLink href="/builders" passHref>
            <Button as={Link} colorScheme="blue">
              View all Builders
            </Button>
          </NextLink>
        </Box>

        <Box mt="128px" mb="25px">
          🏰<b>BuidlGuidl</b> is a registered 🤠{" "}
          <Link href="https://dao.buidlguidl.com/" fontWeight="700" color="teal.500" isExternal>
            Wyoming DAO LLC
          </Link>
        </Box>
      </Container>
    </>
  );
}

/*
export async function getStaticProps() {
  const builders = await getAllBuilders();
  const builds = await getAllBuilds();
  const depositEvents = await getAllEvents(EVENT_TYPES.STREAM_DEPOSIT);

  const streamedEth = depositEvents.reduce((prevValue, currentValue) => {
    return prevValue + parseFloat(currentValue?.payload?.amount ?? 0.0);
  }, 0.0);

  const timestampOneMonthAgo = moment().subtract(1, "months").valueOf();
  const buildersMonth = builders.filter(builder => builder.creationTimestamp > timestampOneMonthAgo);
  const buildsMonth = builds.filter(build => build.submittedTimestamp > timestampOneMonthAgo);
  const depositEventsMonth = depositEvents.filter(event => event.timestamp > timestampOneMonthAgo);
  const streamedEthMonth = depositEventsMonth.reduce((prevValue, currentValue) => {
    return prevValue + parseFloat(currentValue?.payload?.amount ?? 0.0);
  }, 0.0);

  return {
    props: {
      bgStats: {
        builderCount: builders.length,
        buildCount: builds.length,
        streamedEth,
        buildersCountMonth: buildersMonth.length,
        buildCountMonth: buildsMonth.length,
        streamedEthMonth,
      },
    },
    // 6 hours refresh.
    revalidate: 21600,
  };
}
*/