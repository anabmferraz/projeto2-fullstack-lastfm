import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { MusicNote, Person } from "@mui/icons-material";
import { insertService } from "../services/api";

const insertForm = ({ onSuccess }) => {
  const [type, setType] = useState("track");
  const [formData, setFormData] = useState({
    name: "",
    artist: "",
    playcount: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Preencha o nome");
      return;
    }

    if (type === "track" && !formData.artist.trim()) {
      setError("Preencha o nome do artista");
      return;
    }

    setLoading(true);

    try {
      if (type === "track") {
        await insertService.insertTrack({
          name: formData.name,
          artist: formData.artist,
          image: formData.image,
        });
        setSuccess("Música adicionada com sucesso!");
      } else {
        await insertService.insertArtist({
          name: formData.name,
          playcount: parseInt(formData.playcount) || 0,
          image: formData.image,
        });
        setSuccess("Artista adicionado com sucesso!");
      }

      setFormData({ name: "", artist: "", playcount: "", image: "" });

      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao inserir");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Inserir Novos Dados
        </Typography>

        <Box sx={{ mb: 3 }}>
          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={(e, v) => v && setType(v)}
            fullWidth
          >
            <ToggleButton value="track">
              <MusicNote sx={{ mr: 1 }} /> Música
            </ToggleButton>
            <ToggleButton value="artist">
              <Person sx={{ mr: 1 }} /> Artista
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={type === "track" ? "Nome da Música" : "Nome do Artista"}
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            disabled={loading}
          />

          {type === "track" && (
            <TextField
              fullWidth
              label="Artista"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              margin="normal"
              disabled={loading}
            />
          )}

          {type === "artist" && (
            <TextField
              fullWidth
              label="Playcount"
              name="playcount"
              type="number"
              value={formData.playcount}
              onChange={handleChange}
              margin="normal"
              disabled={loading}
            />
          )}

          <TextField
            fullWidth
            label="URL da Imagem (opcional)"
            name="image"
            value={formData.image}
            onChange={handleChange}
            margin="normal"
            disabled={loading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Adicionando..." : "Adicionar"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default insertForm;
