# Nueva Librería (Adaptador) Freshchat

El objetivo de este proyecto es generar una **librería** más amigable para Freshchat, que tiene una librería muy complicada de usar. La idea es que esta nueva librería esté basada en **casos de uso** más cotidianos, con métodos como `login`, `logout`, `changeUser`, en vez de los métodos complejos y viejos con los que actualmente cuenta.

De esta manera, creando una nueva librería debería ser más fácil implementar en otros proyectos o frameworks que es lo mas importante y lo que se busca finalmente.

## Directorios

- **freshchat-app** (directorio donde se desarrollará la nueva librería)
- **template** (directorio de ejemplo con un caso de uso similar obtenido desde [aquí](https://community.freshworks.dev/t/integration-of-freshchat-with-react-web/11153/12))

# Ideas de estructura de la librería

## Idea 1

```ts
interface LoginParams {
  externalId: string;
  restoreId: string;
}

export class FreshChatWidget {
  login(params: LoginParams) {}
  logout() {}
}
```

## Idea 2 (lo mismo, pero aprovechar clase ya existente)

```ts
import type { WidgetService } from "./widget-service";

interface LoginParams {
  externalId: string;
  restoreId: string;
}

export class FreshChatWidget {
  widgetService: WidgetService;
  constructor(widgetService: WidgetService) {
    this.widgetService = widgetService;
  }
  login(params: LoginParams) {}
  logout() {}
}
```