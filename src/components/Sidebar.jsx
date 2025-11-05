import React, { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

/**
 * Recorrido para saber si un nodo contiene la ruta activa
 */
const nodeContainsPath = (node, pathname) => {
  if (node.path === pathname) return true;
  return node.children?.some((c) => nodeContainsPath(c, pathname));
};

const Item = ({ node, level, pathname }) => {
  const isActiveBranch = useMemo(
    () => nodeContainsPath(node, pathname),
    [node, pathname]
  );
  const [open, setOpen] = useState(isActiveBranch || level === 0);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="sb-item" style={{ paddingLeft: 12 + level * 12 }}>
      <div className="sb-row">
        {hasChildren && (
          <button
            className={`sb-caret ${open ? "open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="toggle"
          />
        )}

        {node.path ? (
          <NavLink
            to={node.path}
            className={({ isActive }) =>
              "sb-link" + (isActive ? " active" : "")
            }
            end
          >
            {node.title}
          </NavLink>
        ) : (
          <span className="sb-label">{node.title}</span>
        )}
      </div>

      {hasChildren && open && (
        <div className="sb-children">
          {node.children.map((child) => (
            <Item
              key={`${node.title}-${child.title}`}
              node={child}
              level={level + 1}
              pathname={pathname}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar = ({ tree }) => {
  const { pathname } = useLocation();
  return (
    <aside className="sidebar">
      <div className="sidebar-header">Menú</div>
      <nav className="sb-list">
        {tree.root.children.map((n) => (
          <Item key={n.title} node={n} level={0} pathname={pathname} />
        ))}
      </nav>
    </aside>
  );
};
