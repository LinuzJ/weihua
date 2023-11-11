import { useContext, useEffect, useState } from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import PocketBase from "pocketbase";
import RecordingPage from "./recording";
import { PageContext } from "../context/PageContext";
import Leaderboard from "../components/Leaderboard";

// interface LandingProps {
//   pb: PocketBase;
// }

export interface RefVideo {
  id: string;
  collectionId: string;
  tier: string;
  video: string;
}

enum Tier {
  Tier1 = 1,
  Tier2 = 2,
  Tier3 = 3,
  Tier4 = 4,
  Tier5 = 5,
}

const pb = new PocketBase("https://junctionb.nyman.dev");

const LandingPage = () => {
  const page = useContext(PageContext);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [refVideos, setRefVideos] = useState<RefVideo[]>([]);

  useEffect(() => {
    const getRefVideos = async () => {
      const videos = await pb
        .collection("source_videos")
        .getFullList<RefVideo>();
      setRefVideos(videos);
    };
    getRefVideos();
  }, []);

  const handleButtonClick = (tier: Tier) => {
    setSelectedTier(tier);
  };

  return (
    <>
      {page === "home" ? (
        <>
          {selectedTier ? (
            <RecordingPage
              refVideo={refVideos.find(
                (video) => video.tier === selectedTier.toString(),
              )}
            />
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
                  <Typography variant="h2" color="info" gutterBottom>
                    Ur fat!
                  </Typography>
                  <Typography variant="subtitle1" color="info">
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
              </Grid>
            </Container>
          )}
        </>
      ) : (
        <Leaderboard />
      )}
    </>
  );
};

export default LandingPage;
