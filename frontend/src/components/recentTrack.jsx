import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import { MusicNote, AccessTime } from "@mui/icons-material";
import { useData } from "../contexts/dataContext";

const RecentTrack = () => {
  const { recentTrack } = useData();

  if (!recentTrack) {
    return (
      <Card>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
          >
            <MusicNote /> Última Música
          </Typography>
          <Typography color="text.secondary">
            Nenhuma música encontrada
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const getTrackImage = () => {
    return recentTrack.image || "";
  };

  const isNowPlaying = recentTrack["@attr"]?.nowplaying === "true";

  const formatDate = () => {
    if (isNowPlaying) return "Tocando agora";
    if (!recentTrack.playedAt) return "";

    const date = new Date(recentTrack.playedAt);
    return date.toLocaleString("pt-BR");
  };

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
        >
          <MusicNote /> Última Música
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={getTrackImage()}
            variant="rounded"
            sx={{ width: 60, height: 60 }}
          >
            <MusicNote />
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {recentTrack.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {recentTrack.artist}
            </Typography>

            <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
              {isNowPlaying ? (
                <Chip label="🎵 Tocando agora" color="primary" size="small" />
              ) : (
                <Chip
                  icon={<AccessTime />}
                  label={formatDate()}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentTrack;
