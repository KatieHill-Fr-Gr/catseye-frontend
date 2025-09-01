

const Sidebar = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <div className="sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <h2>{title}</h2>
          <button onClick={onClose}>×</button>
        </div>
        <div className="sidebar-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar

