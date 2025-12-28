import { clearAllCookies, delay, setCookie, UserAPIRest } from "../helpers";
import type { WidgetService } from "./widget-service";
import widgetServiceInstance from "./widget-service";

interface AppCredentials {
  userId: string;
  commerceId: string;
}

export class FreshChatUseCase {
  widgetService: WidgetService;
  constructor(widgetService: WidgetService) {
    this.widgetService = widgetService;
  }
  private async getUserConfig(credentials: AppCredentials) {
    console.log('obteniendo datos del usuario');
    
    const userConfig = await UserAPIRest.getUserInfo(credentials.userId);
    return userConfig;
  }


  async changeUser(credentials: AppCredentials) {
    this.destroy()
    const config = await this.getUserConfig(credentials);
    if (config.enabled) {
      this.widgetService.initializeFreshChatWidget({
        externalId: config.userId,
        restoreId: config.restoreId,
      });
      return;
    }
    if (!config.enabled) {
      alert("usuario no habilitado para chat");
      this.destroy();
    }
  }
  destroy() {
    if (window.fcWidget) {
      
      window.fcWidget.destroy()
      console.log("Chat destruido", this.constructor.name);
    }

  }
}

export const freschatUseCases = new FreshChatUseCase(widgetServiceInstance);
