"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

const ManageStartUpEdit = ({ startup, onClose, onUpdate }) => {
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    description: "",
    logoUrl: "",
  });

  useEffect(() => {
    if (!startup) return;

    const timeout = setTimeout(() => {
      setFormData({
        name: startup.name || "",
        industry: startup.industry || "",
        description: startup.description || "",
        logoUrl: startup.logoUrl || "",
      });
    }, 0);

    return () => clearTimeout(timeout);
  }, [startup]);

  const handleSave = async () => {
    setSaving(true);

    try {
      const res = await fetch(`${API}/startups/${startup._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        onUpdate?.(); // refresh list
        onClose?.(); // close modal
      }
    } catch (err) {
      console.log(err);
    }

    setSaving(false);
  };

  return (
    <div className="space-y-4">
      <input
        className="w-full p-2 border rounded"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Startup Name"
      />

      <input
        className="w-full p-2 border rounded"
        value={formData.industry}
        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
        placeholder="Industry"
      />

      <textarea
        className="w-full p-2 border rounded"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Description"
      />

      <input
        className="w-full p-2 border rounded"
        value={formData.logoUrl}
        onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
        placeholder="Logo URL"
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-black text-white p-2 rounded"
      >
        {saving ? <Loader2 className="animate-spin" /> : "Save Changes"}
      </button>
    </div>
  );
};

export default ManageStartUpEdit;
