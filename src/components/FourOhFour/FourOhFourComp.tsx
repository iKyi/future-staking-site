import { Card, Button, CardContent, CardHeader } from "@mui/material";
import { Box } from "@mui/system";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { centerFlex } from "utils/sxUtils";

export type FourOhFourCompPropsType = {
  children?: any;
};

const FourOhFourComp: React.VFC<FourOhFourCompPropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        height: "100%",
        ...(centerFlex as CSSProperties),
      }}
    >
      <Card
        sx={{
          width: "400px",
          maxWidth: "100%",
          mx: "auto",
        }}
      >
        <CardHeader title={`We're sorry, this page was not found.`} />
        <CardContent>
          <Button
            sx={{ my: 4, width: "100%" }}
            fullWidth
            color="primary"
            variant="fsl"
            component={Link}
            to="/"
          >
            Go Home
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FourOhFourComp;
