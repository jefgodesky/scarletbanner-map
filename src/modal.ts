const initModal = (id: string) => {
  const modal = document.getElementById(id)
  if (modal) {
    const close = modal.querySelector('button.close')
    if (close) {
      close.addEventListener('click', () => {
        modal.classList.remove('open')
      })
    }
  }
  return modal
}

export default initModal
