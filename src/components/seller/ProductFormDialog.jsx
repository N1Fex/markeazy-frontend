import React, {useEffect, useMemo, useState} from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography
} from "@mui/material";

const emptyForm = {
  title: "",
  description: "",
  price: "",
  discount: "",
  amount: "",
  image: null,
};

const ProductFormDialog = ({open, mode = "create", product = null, isSubmitting = false, onClose, onSubmit}) => {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setForm(emptyForm);
      setError("");
      return;
    }

    setForm({
      title: product?.title ?? "",
      description: product?.description ?? "",
      price: product?.price ?? "",
      discount: product?.discount ?? "",
      amount: product?.amount ?? "",
      image: null,
    });
    setError("");
  }, [open, product]);

  const imageName = useMemo(() => {
    if (form.image) {
      return form.image.name;
    }
    if (mode === "edit" && product?.url) {
      return "Текущее изображение";
    }
    return "Файл не выбран";
  }, [form.image, mode, product]);

  const handleFieldChange = (field) => (event) => {
    const value = event.target.value;
    setForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setForm((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const handleSubmit = () => {
    const trimmedTitle = form.title.trim();
    const trimmedDescription = form.description.trim();
    const price = Number(form.price);
    const discount = Number(form.discount);
    const amount = Number(form.amount);
    const isImageMissing = mode === "create" && !form.image;

    if (!trimmedTitle || !trimmedDescription) {
      setError("Заполните название и описание товара.");
      return;
    }

    if ([price, discount, amount].some((value) => Number.isNaN(value))) {
      setError("Цена, скидка и количество должны быть числами.");
      return;
    }

    if (price < 0 || discount < 0 || amount < 0) {
      setError("Числовые поля не могут быть отрицательными.");
      return;
    }

    if (discount > 100) {
      setError("Скидка не может быть больше 100.");
      return;
    }

    if (isImageMissing) {
      setError("Добавьте изображение товара в формате PNG или JPG.");
      return;
    }

    setError("");
    onSubmit?.({
      title: trimmedTitle,
      description: trimmedDescription,
      price,
      discount,
      amount,
      image: form.image,
    });
  };

  return (
      <Dialog open={open} onClose={isSubmitting ? undefined : onClose} fullWidth maxWidth="sm">
        <DialogTitle>{mode === "edit" ? "Изменить товар" : "Добавить товар"}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.25} sx={{pt: 0.5}}>
            {error ? <Alert severity="warning">{error}</Alert> : null}

            <TextField
                label="Название"
                value={form.title}
                onChange={handleFieldChange("title")}
                fullWidth
                disabled={isSubmitting}
            />
            <TextField
                label="Описание"
                value={form.description}
                onChange={handleFieldChange("description")}
                fullWidth
                multiline
                minRows={4}
                disabled={isSubmitting}
            />
            <Stack direction={{sm: "row", xs: "column"}} spacing={2}>
              <TextField
                  label="Цена"
                  type="number"
                  value={form.price}
                  onChange={handleFieldChange("price")}
                  fullWidth
                  disabled={isSubmitting}
              />
              <TextField
                  label="Скидка"
                  type="number"
                  value={form.discount}
                  onChange={handleFieldChange("discount")}
                  fullWidth
                  disabled={isSubmitting}
              />
              <TextField
                  label="Количество"
                  type="number"
                  value={form.amount}
                  onChange={handleFieldChange("amount")}
                  fullWidth
                  disabled={isSubmitting}
              />
            </Stack>

            <Stack spacing={1}>
              <Button
                  component="label"
                  variant="outlined"
                  disabled={isSubmitting}
                  sx={{alignSelf: "flex-start", textTransform: "none"}}
              >
                Выбрать изображение
                <input
                    type="file"
                    hidden
                    accept="image/png,image/jpeg"
                    onChange={handleImageChange}
                />
              </Button>
              <Typography variant="body2" color="text.secondary">
                {imageName}
              </Typography>
              {mode === "edit" && product?.url ? (
                  <Box
                      component="img"
                      src={product.url}
                      alt={product.title}
                      sx={{
                        width: 110,
                        height: 110,
                        objectFit: "contain",
                        bgcolor: "#fff",
                        borderRadius: 3,
                        border: "1px solid #d9e3f0",
                        p: 1,
                      }}
                  />
              ) : null}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{px: 3, py: 2}}>
          <Button onClick={onClose} disabled={isSubmitting}>Отмена</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting}>
            {mode === "edit" ? "Сохранить" : "Добавить"}
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default ProductFormDialog;
