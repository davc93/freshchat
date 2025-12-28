// import { FRESHCHAT_WIDGET_URL, LEAP_TEACHER_FRESHCHAT_TOPIC } from 'constants/api';

type UnreadCountChangeCallback = (resp: { count: number }) => void;
interface InitializeFreshChatWidgetParams {
  externalId: string;
  restoreId: string;
  onUnreadCountChange: UnreadCountChangeCallback;
}
interface MessengerConfig {
  externalId: string;
  restoreId: string;
}

class WidgetService {
  externalId: string | null = null;
  restoreId: string | null = null;
  handleUnreadCountChange: UnreadCountChangeCallback = () => null;

  freshChatEvents = () => {
    window.fcWidget.on('user:cleared', () => {
      window.fcWidget.destroy();
    });

    window.fcWidget.on('unreadCount:notify', (resp: { count: number }) => {
      this.handleUnreadCountChange(resp);
    });

    window.fcWidget.on('widget:destroyed', () => {
      const scriptToRemove = document.getElementById('freshchatScript');
      const head = document.head || document.getElementsByTagName('head')[0];

      if (scriptToRemove) {
        head.removeChild(scriptToRemove);
      }

      this.externalId = null;
      this.restoreId = null;
    });
  };

  initWidget = (messengerConfig: MessengerConfig) => {
    window.fcWidgetMessengerConfig = {
    //   tags: [LEAP_TEACHER_FRESHCHAT_TOPIC],
      config: {
        eagerLoad: true,
        headerProperty: {
          hideChatButton: true,
        },
      },
      ...messengerConfig,
    };
    const freshchatScript = document.createElement('script');

    freshchatScript.src = FRESHCHAT_WIDGET_URL;
    freshchatScript.setAttribute('chat', 'true');
    freshchatScript.id = 'freshchatScript';
    freshchatScript.onload = () => {
      window.fwcrm.on('widget:loaded', this.freshChatEvents);
    };
    const head = document.head || document.getElementsByTagName('head')[0];

    head.insertBefore(freshchatScript, head.firstChild);
  };

  initializeFreshChatWidget = ({
    externalId,
    restoreId,
    onUnreadCountChange,
  }: InitializeFreshChatWidgetParams) => {
    this.externalId = externalId;
    this.restoreId = restoreId;
    this.handleUnreadCountChange = onUnreadCountChange;

    if (window.fcWidget && window.fcWidget.isInitialized() === true) {
      window.fcWidget.user.isExists().then(
        (data: { data: any; success: boolean }) => {
          if (data.data && data.success) {
            window.fcWidget.user.clear();
          } else {
            window.fcWidget.destroy();
          }
        },
        () => null,
      );
    } else {
      this.initWidget({
        externalId,
        restoreId,
      });
    }
  };

  clearUser = () => {
    if (window.fcWidget) {
      window.fcWidget.user.clear();
    }
  };

  isWidgetLoaded = () => {
    return !!window.fcWidget && window.fcWidget.isLoaded();
  };

  isWidgetOpen = () => {
    return !!window.fcWidget && window.fcWidget?.isOpen();
  };

  openWidget = () => {
    if (window.fcWidget) {
      window.fcWidget.open();
    }
  };

  closeWidget = () => {
    if (window.fcWidget && this.isWidgetOpen()) {
      window.fcWidget.close();
    }
  };
}

const widgetServiceInstance = new WidgetService();

export default widgetServiceInstance;