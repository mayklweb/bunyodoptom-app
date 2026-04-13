import { useEffect, useRef, useState } from "react";
import ProfileField from "../ProfileField";
import { useLogout, useProfile } from "../../../auth/hooks/useAuthUser";

const MOCK_USER = {
  name: "Alisher Toshmatov",
  phone: "+998 90 123 45 67",
  id: "USR-0042",
};

function PersonalInfo({}) {
  const [fields, setFields] = useState({
    name: MOCK_USER.name,
    phone: MOCK_USER.phone,
  });


  const { data: user } = useProfile();

  console.log(user);
  

  const logout = useLogout();
  const [draft, setDraft] = useState({ ...user });
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
    setDraft((prev) => ({ ...prev, [key]: user[key] }));
    setEditing(null);
  };

  const fieldConfig = [
    { key: "name", label: "Ism familiya", disabled: false },
    { key: "phone", label: "Telefon raqam", disabled: false },
    { key: "id", label: "Foydalanuvchi ID", disabled: true },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {fieldConfig.map(({ key, label, disabled }) => (
        <ProfileField
          key={key}
          label={label}
          disabled={disabled}
          value={editing === key ? draft[key] : user?.[key]}
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
        onClick={logout}
        className="text-base text-red mt-6 p-3.5 font-medium rounded-[14px] bg-red/10 border border-red/40"
      >
        Hisobdan chiqish
      </button>
    </div>
  );
}

export default PersonalInfo;
