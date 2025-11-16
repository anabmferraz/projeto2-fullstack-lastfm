import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import { Logout, Refresh } from "@mui/icons-material";
import { useAuth } from "../contexts/authContext";
import { useData } from "../contexts/dataContext";
import { searchService } from "../services/api";
import UserProfile from "../components/userProfile";
import RecentTrack from "../components/recentTrack";
import TopArtists from "../components/topArtists";
import InsertForm from "../components/insertForm";

const dashboard = () => {
  const { user, logout } = useAuth();
  const { setLoading, setError, setData, hasSearched, loading } = useData();
  const [currentTab, setCurrentTab] = useState(0);

  // Busca inicial
  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchService.search();
      setData(data.user, data.recentTrack, data.topArtists);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao buscar dados");
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🎧 Last.fm Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.username}
          </Typography>
          <IconButton color="inherit" onClick={logout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
          <Tabs value={currentTab} onChange={(e, v) => setCurrentTab(v)}>
            <Tab label="Dashboard" />
            <Tab label="Inserir Dados" />
          </Tabs>

          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleSearch}
            disabled={loading}
          >
            Atualizar
          </Button>
        </Box>

        {currentTab === 0 ? (
          hasSearched && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <UserProfile />
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <RecentTrack />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TopArtists />
                </Box>
              </Box>
            </Box>
          )
        ) : (
          <InsertForm onSuccess={handleSearch} />
        )}
      </Container>
    </>
  );
};

export default dashboard;
