export {}
declare global {
  interface FCWidget {
    open: () => void;
    close: () => void;
    show: () => void;
    hide: () => void;
    setExternalId: (id: string) => void;
    user: {
      setFirstName: (name: string) => void;
      setLastName: (name: string) => void;
      setEmail: (email: string) => void;
      setProperties: (props: Record<string, unknown>) => void;
    };
    track: (event: string, data?: Record<string, unknown>) => void;
  }

  interface Window {
    fcWidget?: any;
    fwcrm?:any
    fcWidgetMessengerConfig:any
  }
}