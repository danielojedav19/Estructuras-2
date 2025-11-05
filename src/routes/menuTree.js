import React from "react";
import { Page } from "../components/Page";
import { NNode, NTree } from "../ds/NaryTree";

// Construye el árbol N-ario con títulos, paths y componentes
export const makeMenuTree = () => {
  const root = new NNode({ title: "root" });

  // Nivel 1
  const profile = root.addChild(
    new NNode({ title: "Profile", path: "/profile", element: <Page title="Profile">Tu perfil de usuario.</Page> })
  );

  const messages = root.addChild(
    new NNode({ title: "Messages", path: "/messages", element: <Page title="Messages">Bandeja de mensajes.</Page> })
  );

  const settings = root.addChild(new NNode({ title: "Settings" })); // contenedor

  const help = root.addChild(new NNode({ title: "Help" })); // contenedor

  root.addChild(
    new NNode({ title: "Logout", path: "/logout", element: <Page title="Logout">Sesión cerrada (demo).</Page> })
  );

  // Settings (nivel 2)
  settings.addChild(
    new NNode({ title: "Account", path: "/settings/account", element: <Page title="Account">Preferencias de cuenta.</Page> })
  );
  settings.addChild(
    new NNode({ title: "Emails", path: "/settings/emails", element: <Page title="Emails">Gestión de correos.</Page> })
  );

  const sec = settings.addChild(new NNode({ title: "Security & Privacy" }));
  settings.addChild(
    new NNode({ title: "Password", path: "/settings/password", element: <Page title="Password">Cambio de contraseña.</Page> })
  );
  settings.addChild(
    new NNode({ title: "Notification", path: "/settings/notifications", element: <Page title="Notification">Alertas y notificaciones.</Page> })
  );

  // Security & Privacy (nivel 3)
  sec.addChild(
    new NNode({ title: "2FA", path: "/settings/security/2fa", element: <Page title="Two-Factor Auth (2FA)">Configura 2FA.</Page> })
  );
  sec.addChild(
    new NNode({ title: "Devices", path: "/settings/security/devices", element: <Page title="Devices">Dispositivos confiables.</Page> })
  );
  sec.addChild(
    new NNode({ title: "Privacy", path: "/settings/security/privacy", element: <Page title="Privacy">Preferencias de privacidad.</Page> })
  );

  // Help (nivel 2)
  help.addChild(
    new NNode({ title: "FAQs", path: "/help/faqs", element: <Page title="FAQs">Preguntas frecuentes.</Page> })
  );
  help.addChild(
    new NNode({ title: "Submit a Ticket", path: "/help/ticket", element: <Page title="Submit a Ticket">Envío de ticket.</Page> })
  );
  help.addChild(
    new NNode({ title: "Network Status", path: "/help/status", element: <Page title="Network Status">Estado de red.</Page> })
  );

  return new NTree(root);
};

// Utilidad: aplanar el árbol para generar rutas
export const flattenRoutes = (tree) => {
  const routes = [];
  tree.dfs((node) => {
    if (node.path && node.element) {
      routes.push({ path: node.path, element: node.element });
    }
  });
  return routes;
};
