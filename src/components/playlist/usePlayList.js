import { ref } from 'vue';

export default function({emit}) {
  const hideList = () => {
    emit('hide');
  }
  return {
    hideList,
  }
}