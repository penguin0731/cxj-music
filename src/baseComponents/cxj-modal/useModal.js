
export default function({emit}) {
  const cancel = e => {
    emit('cancel', e)
  }

  const ok = e => {
    emit('ok', e)
  }
  return {
    cancel,
    ok
  }
}