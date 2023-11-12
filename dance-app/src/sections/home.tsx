import { Container, Typography, Button, Grid } from "@mui/material";
import RecordingPage from "./recording";
import { useEffect, useState } from "react";
import pb from "../pocketBase";

export interface RefVideo {
  id: string;
  collectionId: string;
  tier: string;
  video: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export enum Tier {
  Tier1 = 1,
  Tier2 = 2,
  Tier3 = 3,
  Tier4 = 4,
  Tier5 = 5,
}

interface HomeSectionProps {
  setConfetti: (c: boolean) => void;
}

const HomeSection = ({ setConfetti }: HomeSectionProps) => {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const handleButtonClick = (tier: Tier) => setSelectedTier(tier);
  const [refVideos, setRefVideos] = useState<RefVideo[]>([]);

  useEffect(() => {
    pb.collection("source_videos")
      .getFullList<RefVideo>()
      .then((videos) => setRefVideos(videos));
  }, []);

  return (
    <>
      {selectedTier ? (
        <RecordingPage
          refVideo={refVideos.find(
            (video) => video.tier === selectedTier.toString(),
          )}
          tier={selectedTier}
          pb={pb}
          goBack={setSelectedTier}
          setConfetti={setConfetti}
        />
      ) : (
        <Container maxWidth="md">
          <Grid
            container
            spacing={3}
            alignContent="center"
            justifyContent="center"
            style={{ height: "100dvh" }}
          >
            <Grid
              container
              item
              xs={12}
              alignContent="start"
              justifyContent="center"
            >
              <Typography variant="h2" color="info" gutterBottom>
                Daily challenges!
              </Typography>
              <Typography variant="subtitle1" color="info">
                Start with Tier 1 and challenge yourself with the harder ones!
              </Typography>
            </Grid>
            <Grid item xs={8} md={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleButtonClick(Tier.Tier1)}
              >
                Tier 1
              </Button>
            </Grid>
            <Grid item xs={8} md={4}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => handleButtonClick(Tier.Tier2)}
              >
                Tier 2
              </Button>
            </Grid>
            <Grid item xs={8} md={4}>
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
  );
};

export default HomeSection;
