import { EditIcon } from "../../../assets/icons";

function ProfileField({
  label,
  value,
  editing,
  disabled,
  saving,
  onChange,
  onToggle,
  onSave,
  onCancel,
  inputRef,
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "0.5px solid rgba(0,0,0,0.12)",
        borderRadius: 12,
        padding: "12px 14px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: editing ? 8 : 0,
        }}
      >
        <span style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>
          {label}
        </span>
        {!disabled && !editing && (
          <button
            onClick={onToggle}
            style={{
              background: "none",
              border: "none",
              color: "#888",
              padding: 4,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <EditIcon />
          </button>
        )}
      </div>

      {editing ? (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            disabled={saving}
            style={{
              flex: 1,
              fontSize: 14,
              padding: "10px 12px",
              border: "0.5px solid rgba(0,0,0,0.2)",
              borderRadius: 8,
              outline: "none",
            }}
          />
          <button
            onClick={onSave}
            disabled={saving}
            style={{
              background: "#eaf3de",
              border: "none",
              borderRadius: 8,
              padding: 8,
              display: "flex",
              alignItems: "center",
              color: "#3b6d11",
              cursor: "pointer",
            }}
          >
            <IconCheck />
          </button>
          <button
            onClick={onCancel}
            style={{
              background: "#fcebeb",
              border: "none",
              borderRadius: 8,
              padding: 8,
              display: "flex",
              alignItems: "center",
              color: "#a32d2d",
              cursor: "pointer",
            }}
          >
            <IconXMark />
          </button>
        </div>
      ) : (
        <p
          style={{
            fontSize: 15,
            marginTop: 2,
            color: disabled ? "#aaa" : "#1c1c1e",
          }}
        >
          {value || "—"}
        </p>
      )}
    </div>
  );
}

export default ProfileField;
