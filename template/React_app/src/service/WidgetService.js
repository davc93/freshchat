class WidgetService {
    constructor() {
        // super(); // add super if extends from another class
        this.freshChatEvents = this.freshChatEvents.bind(this);
        this.initWidget = this.initWidget.bind(this);
    }
    getCookie(name) { // this is for testing purpose
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    freshChatEvents() {
        console.log('widget:loaded******', this.getCookie('externalId'));
        window.fcWidget.on('user:created', (resp) => {
            var status = resp && resp.status,
            data = resp && resp.data;
            console.log("user:created******")
            if (status === 200) {
                if (data.restoreId) {
                    console.log("user:created*****restoreId******", data.restoreId)
                    // Update restoreId in your database
                }
            }
        });
        window.fcWidget.on('user:cleared', (resp) => {
            console.log("user:cleared******", resp)
            window.fcWidget.destroy();
            console.log("user is cleared so destroying widget");
        });
        window.fcWidget.on('widget:destroyed', (resp) => {
            window.fwcrm.off('widget:loaded', this.freshChatEvents);
            console.log("Widget is destroyed so reinit the widget");
            var scriptToRemove = document.getElementById('freshchatScript');
            var head = document.head || document.getElementsByTagName('head')[0];
            if (scriptToRemove) {
                head.removeChild(scriptToRemove);
            }
            console.log("Before re init Need to remove one JS script from head tag");
            this.initWidget({
                externalId: this.getCookie('externalId'),      // user's id unique to your system
                restoreId: this.getCookie('restoreId') || null,
                firstName: this.getCookie('externalId'),
                email: this.getCookie('externalId'),
            });
        });
    }
    initWidget(fcWidgetMessengerConfig){
        window.fcWidgetMessengerConfig = {
           ...fcWidgetMessengerConfig
        };
    	var freshchatScript = document.createElement('script');
		freshchatScript.src = '//fm-staging-us-app-cdnjs.s3.amazonaws.com/crm/200126301/99800.js';
		freshchatScript.setAttribute('chat', 'true');
		//freshchatScript.setAttribute('widgetId', 'dc244634-dcfd-4ea9-ac19-77b0ba35bcb9');
		freshchatScript.id = 'freshchatScript'; // Assign an id to the script
        freshchatScript.onload = () => {
        	window.fwcrm.on('widget:loaded',this.freshChatEvents); 
        }
		// Append the script to the head of the document
		var head = document.head || document.getElementsByTagName('head')[0];
		head.insertBefore(freshchatScript, head.firstChild);
    }
	initializeFreshChatWidget() {
        if(window.fcWidget && window.fcWidget.isInitialized() == true){
         	window.fcWidget.user.isExists().then((data) => {
            	if(data.data && data.success){
                	console.log("user is availabel so clear the user");
					window.fcWidget.user.clear(); 
				} else {
                	window.fcWidget.destroy(); 
                	console.log("user is not availabel so destroying widget");
            	}
    		}, () => {
    			console.log("Error fetching user");
    		});
        } else {
            this.initWidget({
                externalId: this.getCookie('externalId'),      // user's id unique to your system
                restoreId: this.getCookie('restoreId') || null,
                firstName: this.getCookie('externalId'),
                email: this.getCookie('externalId'),
            });
        }
    }
}


const widgetServiceInstance = new WidgetService();
export default widgetServiceInstance;