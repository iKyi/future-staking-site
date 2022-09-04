import { Card, Button, CardContent, CardHeader } from "@mui/material";
import { Link } from "react-router-dom";

export type FourOhFourCompPropsType = {
  children?: any;
};

const FourOhFourComp: React.VFC<FourOhFourCompPropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return (
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
  );
};

export default FourOhFourComp;
