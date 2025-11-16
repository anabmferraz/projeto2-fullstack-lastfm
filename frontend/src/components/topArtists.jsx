import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Box,
} from "@mui/material";
import { Stars, Person } from "@mui/icons-material";
import { useData } from "../contexts/dataContext";

const TopArtists = () => {
  const { topArtists } = useData();

  if (!topArtists || topArtists.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
          >
            <Stars /> Top 5 Artistas
          </Typography>
          <Typography color="text.secondary">
            Nenhum artista encontrado
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const getArtistImage = (artist) => {
    return artist.image || "";
  };

  const formatPlaycount = (count) => {
    const num = parseInt(count);
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
        >
          <Stars /> Top 5 Artistas
        </Typography>

        <List disablePadding>
          {topArtists.map((artist, index) => (
            <ListItem
              key={artist._id || artist.name}
              sx={{
                px: 0,
                py: 1,
                borderBottom:
                  index < topArtists.length - 1
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "none",
              }}
            >
              <ListItemAvatar>
                <Box sx={{ position: "relative" }}>
                  <Avatar src={getArtistImage(artist)}>
                    <Person />
                  </Avatar>
                  <Chip
                    label={`#${index + 1}`}
                    size="small"
                    color="primary"
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      minWidth: "24px",
                      height: "20px",
                      fontSize: "0.75rem",
                    }}
                  />
                </Box>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {artist.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {formatPlaycount(artist.playcount)} plays
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TopArtists;
