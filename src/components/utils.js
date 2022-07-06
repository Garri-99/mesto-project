export function renderLoading(isLoading, btnSubmit, text = "Сохрнить", laoadingText = 'Сохранение...') {
  if (isLoading) {
    btnSubmit.value = laoadingText;
  } else {
    btnSubmit.value = text;
  }
}
