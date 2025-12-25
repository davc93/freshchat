import type { WidgetService } from "./widget-service";

interface LoginParams {
    externalId:string,
    restoreId:string
}


export class FreshChatWidget {
    widgetService:WidgetService
    constructor(widgetService:WidgetService){
        this.widgetService = widgetService
    }    
    login(params:LoginParams){

    }
    logout(){

    }


}

