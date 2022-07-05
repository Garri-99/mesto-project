export function renderLoading(isLoading, btnSubmit, text = "Сохрнить") {
  if (isLoading) {
    btnSubmit.value = "Сохранение...";
  } else {
    btnSubmit.value = text;
  }
}
