import { ref, computed, Ref } from 'vue';
import { IChatLog } from "@/types/Interfaces";

export default function useSocket() {
  const WS_BASE_URL = `${process.env.VUE_APP_WS_HOST}/ws`;
  const connection = ref<WebSocket | null>(null);

  const connect = (url: string) => {
    connection.value = new WebSocket(url);
  };
  const close = () => {
    if (connection.value == null) return;
    connection.value.close();  
  };

  const messageArea = ref<HTMLElement | null>(null);
  const scrollDown = () => {
    if (messageArea.value == null) return;
    messageArea.value.scrollTop = messageArea.value.scrollHeight;

  };

  const wsState = ref<number | null>(null);
  const wsStateStr = computed(() => {
    if (wsState.value === 1) {
      return 'Open';
    } else if (wsState.value === 3) {
      // close
      return 'Closed';
    }
    return null
  });
  
  const prepareWs = (url: string, chatLogRef: Ref<IChatLog[]>, onMessageCallback?: Function) => {
    connect(url);
    wsState.value == 0;
    if (connection.value == null) return;
    connection.value.onopen = (ev) => {
      if (connection.value == null) return;
      // connection.value.send('hoge');
      console.log('on open');
      wsState.value = connection.value.OPEN;
      
    };
    connection.value.onmessage = (ev: MessageEvent) => {
      console.log('message ' + ev.data);
      const messageJson = JSON.parse(ev.data);
      
      const newMessage = {
        id: 1,
        ...messageJson
      };
      chatLogRef.value.push(newMessage);
      window.setTimeout(() => {
        scrollDown()
      }, 100);
      // scrollDown();
      if (onMessageCallback != null) {
        onMessageCallback(messageJson)
      }
    };
    connection.value.onclose = (ev: CloseEvent) => {
      console.log('on close')
      if (connection.value == null) return;
      wsState.value = connection.value.CLOSED;
    };
    connection.value.onerror = (ev: Event) => {
      console.log('on error')
      console.log(ev)
      if (connection.value == null) return;
      
    };
    
  };
  
  const message = ref<string>('');
  
  return {
    WS_BASE_URL,
    connection,
    connect,
    close,
    messageArea,
    scrollDown,
    wsState,
    wsStateStr,
    message,
    prepareWs
    // disconnect,
  }
}