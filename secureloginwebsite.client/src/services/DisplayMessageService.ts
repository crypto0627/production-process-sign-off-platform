export function displayMessage(message: string) {
  const messageEl = document.querySelector('.message')
  if (messageEl) {
    messageEl.innerHTML = message
  }
}
