import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GitHubIcon from "@mui/icons-material/GitHub";
import BugReportIcon from "@mui/icons-material/BugReport";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

function SettingsInfo() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          mb: 4,
        }}
      >
        <img
          src="/logoBig.png"
          alt="PerPlexed Logo"
          style={{
            width: "50%",
            height: "auto",
            filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))",
          }}
        />
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          bgcolor: "rgba(18, 18, 22, 0.9)",
          color: "text.primary",
        }}
      >
        <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
          Welcome to the Nevu Family!
        </Typography>

        <Typography variant="body1" paragraph>
          Hey there! Thanks for joining us on this journey to elevate your Plex
          experience. Nevu is crafted with passion by{" "}
          <a
            href="https://ipmake.dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#6366F1",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Ipmake
          </a>{" "}
          and a community of amazing open-source contributors just like you!
        </Typography>

        <Typography variant="body1" paragraph>
          We're on a mission to supercharge your media library with smart
          features, beautiful interfaces, and thoughtful enhancements that make
          managing and enjoying your content a breeze.
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4, mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<GitHubIcon />}
            href="https://github.com/Ipmake/Nevu"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontWeight: "bold" }}
          >
            Visit GitHub Repository
          </Button>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<BugReportIcon />}
            href="https://github.com/Ipmake/Nevu/issues"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontWeight: "bold" }}
          >
            Report an Issue
          </Button>
        </Box>

        <Paper
          elevation={2}
          sx={{
            mt: 5,
            p: 3,
            bgcolor: "rgba(99, 102, 241, 0.08)",
            borderRadius: 2,
            border: "1px solid rgba(99, 102, 241, 0.2)",
            textAlign: "center",
          }}
        >
          <VolunteerActivismIcon
            sx={{ fontSize: 40, color: "secondary.main", mb: 2 }}
          />

          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Fuel the Future of Nevu
          </Typography>

          <Typography variant="body1" paragraph>
            Your support makes all the difference! Every contribution helps us
            build new features, improve performance, and keep this project
            thriving for the entire community.
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<FavoriteIcon />}
            href="https://g.ipmake.dev/perplexed"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontWeight: "bold", py: 1, px: 3 }}
          >
            Become a Supporter
          </Button>
        </Paper>
      </Paper>
    </>
  );
}

export default SettingsInfo;