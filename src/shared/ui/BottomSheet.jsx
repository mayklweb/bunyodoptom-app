import { CloseIcon } from "../../assets/icons";

function BottomSheet({ title, open, onClose, children }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 40,
          opacity: open ? 1 : 0,
          transition: "opacity 0.35s ease",
          pointerEvents: open ? "auto" : "none",
          backdropFilter: open ? "blur(4px)" : "blur(0px)",
        }}
      />

      {/* Sheet */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          background: "#fff",
          boxShadow: "0 -4px 32px rgba(0,0,0,0.12)",
          borderRadius: "16px 16px 0 0",
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.35s ease",
          maxHeight: "92svh",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "12px 16px 10px",
            borderBottom: "0.5px solid rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              border: "none",
              background: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              color: "#666",
              cursor: "pointer",
            }}
          >
            <CloseIcon/>
          </button>
          <span style={{ fontSize: 20, fontWeight: 500 }}>{title}</span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {children}
        </div>
      </div>
    </>
  );
}

export default BottomSheet;
