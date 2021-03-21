import { ref } from "@vue/reactivity"

export default function() {
  let volumePercent = ref(0);
  return {
    volumePercent,
  }
}