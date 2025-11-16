import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Chip,
} from "@mui/material";
import { Person, PlayArrow } from "@mui/icons-material";
import { useData } from "../contexts/dataContext";

const UserProfile = () => {
  const { user } = useData();

  if (!user) return null;

  const getUserImage = () => {
    const largeImage = user.image?.find(
      (img) => img.size === "large" || img.size === "extralarge"
    );
    return largeImage?.["#text"] || "";
  };

  const formatScrobbles = (count) => {
    const num = parseInt(count);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar src={getUserImage()} sx={{ width: 80, height: 80 }}>
            <Person sx={{ fontSize: 40 }} />
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" component="h2">
              {user.realname || user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              @{user.name}
            </Typography>

            <Chip
              icon={<PlayArrow />}
              label={`${formatScrobbles(user.playcount)} scrobbles`}
              color="primary"
              size="small"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
