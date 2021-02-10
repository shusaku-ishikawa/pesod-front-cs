import { ref } from 'vue';


export default function useSocket() {
  const connection = ref<WebSocket | null>(null);
  const connect = (url: string) => {
    connection.value = new WebSocket(url);
  };
  return {
    connection,
    connect,
    // disconnect,
  }
}