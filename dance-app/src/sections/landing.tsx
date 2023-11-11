import { Container, Typography, Button, Grid } from "@mui/material";
import { useState } from "react";
import RecordingPage from "./recording";

// interface LandingProps {
//   pb: PocketBase;
// }

enum Tier {
  Tier1 = 1,
  Tier2 = 2,
  Tier3 = 3,
  Tier4 = 4,
  Tier5 = 5,
}

const LandingPage = () => {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);

  const handleButtonClick = (tier: Tier) => {
    setSelectedTier(tier);
  };

  return (
    <>
      {selectedTier ? (
        <RecordingPage />
      ) : (
        <Container maxWidth="md">
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
            style={{ height: "100vh" }}
          >
            <Grid item xs={12}>
              <Typography variant="h2" gutterBottom>
                Ur fat!
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Explore our amazing features!
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleButtonClick(Tier.Tier1)}
              >
                Tier 1
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => handleButtonClick(Tier.Tier2)}
              >
                Tier 2
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                color="info"
                fullWidth
                onClick={() => handleButtonClick(Tier.Tier3)}
              >
                Tier 3
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="textSecondary">
                Selected Tier: {selectedTier || "None"}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default LandingPage;
