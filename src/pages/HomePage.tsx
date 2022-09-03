import { Box } from "@mui/material";
import usePageData from "hooks/usePageData";
// import { Container } from "@mui/material";
// import ContactBox from "components/Reusable/ContactBox";
// import usePageData from "hooks/usePageData";
// import ISectionHeaderStrapi from "utils/types/ISectionHeader";

export type HomePagePropsType = {};

const HomePage: React.FC<HomePagePropsType> = () => {
  const { pageData } = usePageData("landing-data");

  const {} = pageData ?? {};

  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        bgcolor: "common.black",
      }}
    >
      {/* {contactBoxHeader && (
        <Container
          sx={{
            pt: [3, 3, 7],
          }}
        >
          <ContactBox header={contactBoxHeader as ISectionHeaderStrapi} />
        </Container>
      )} */}
    </Box>
  );
};

export default HomePage;
