import './Sidebar.css'

const Sidebar = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <div className="sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          {/* Put a header image here like in figma */}
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

