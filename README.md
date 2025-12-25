# FreshChat Widget Adapter

## Motivación

Freshchat provee una librería oficial para la integración de su widget en aplicaciones web. Sin embargo, su API resulta poco intuitiva y difícil de usar en escenarios comunes, ya que expone métodos antiguos, verbosos y poco alineados con los casos de uso más habituales de una aplicación moderna.

Esto genera fricción al momento de implementar funcionalidades simples como iniciar sesión, cerrar sesión o cambiar el usuario activo.

## Objetivo

El objetivo de este proyecto es crear una librería adaptadora que abstraiga la complejidad de la API oficial de Freshchat y exponga una interfaz más simple, clara y orientada a casos de uso cotidianos.

La nueva API estará basada en métodos como:

- `login`

- `logout`

- `changeUser`

En lugar de los métodos complejos y poco claros que ofrece actualmente la librería oficial.

De esta manera, la integración de Freshchat será más sencilla, reutilizable y fácil de mantener en distintos proyectos o frameworks.

## Uso básico

Ejemplo de uso básico del adaptador:

```ts
import { FreshChatWidget } from "freshchat-widget-adapter";

const widget = new FreshChatWidget();

widget.login({
  externalId: "user-123",
  restoreId: "restore-abc",
});
```

Para cerrar sesión:

```ts
widget.logout();
```

## Estructura del proyecto

```txt
.
├── freshchat-app
│   └── Código fuente de la librería
│
├── template
│   └── Proyecto de ejemplo basado en un caso real de uso
│       obtenido desde la comunidad de Freshworks (https://community.freshworks.dev/t/integration-of-freshchat-with-react-web/11153/12)

```
# Arquitectura (ideas iniciales)

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

## Idea 2 (lo mismo, pero aprovechando clase ya existente)

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
