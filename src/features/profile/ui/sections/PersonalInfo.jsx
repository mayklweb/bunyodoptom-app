import { useEffect, useRef, useState } from "react";
import ProfileField from "../ProfileField";

const MOCK_USER = {
  name: "Alisher Toshmatov",
  phone: "+998 90 123 45 67",
  id: "USR-0042",
};


function PersonalInfo({ onLogout, loggingOut }) {
  const [fields, setFields] = useState({
    name: MOCK_USER.name,
    phone: MOCK_USER.phone,
    id: MOCK_USER.id,
  });
  const [draft, setDraft] = useState({ ...fields });
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const inputRefs = useRef({});

  useEffect(() => {
    if (editing) inputRefs.current[editing]?.focus();
  }, [editing]);

  const handleSave = (key) => {
    setSaving(true);
    // Replace this setTimeout with your real API call (e.g. updateMe)
    setTimeout(() => {
      setFields((prev) => ({ ...prev, [key]: draft[key] }));
      setEditing(null);
      setSaving(false);
    }, 600);
  };

  const handleCancel = (key) => {
    setDraft((prev) => ({ ...prev, [key]: fields[key] }));
    setEditing(null);
  };

  const fieldConfig = [
    { key: "name", label: "Ism familiya", disabled: false },
    { key: "phone", label: "Telefon raqam", disabled: false },
    { key: "id", label: "Foydalanuvchi ID", disabled: true },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: 4 }}>
        Shaxsiy ma'lumotlar
      </h2>

      {fieldConfig.map(({ key, label, disabled }) => (
        <ProfileField
          key={key}
          label={label}
          disabled={disabled}
          value={editing === key ? draft[key] : fields[key]}
          editing={editing === key}
          saving={saving && editing === key}
          onChange={(e) =>
            setDraft((prev) => ({ ...prev, [key]: e.target.value }))
          }
          onToggle={() => setEditing(key)}
          onSave={() => handleSave(key)}
          onCancel={() => handleCancel(key)}
          inputRef={(el) => {
            inputRefs.current[key] = el;
          }}
        />
      ))}

      <button
        onClick={onLogout}
        disabled={loggingOut}
        style={{
          marginTop: 6,
          padding: 12,
          borderRadius: 12,
          border: "0.5px solid rgba(220,50,50,0.35)",
          background: "none",
          color: "#c0392b",
          fontSize: 14,
          fontWeight: 500,
          opacity: loggingOut ? 0.5 : 1,
          cursor: "pointer",
        }}
      >
        {loggingOut ? "Chiqilmoqda..." : "Hisobdan chiqish"}
      </button>
    </div>
  );
}

export default PersonalInfo;
