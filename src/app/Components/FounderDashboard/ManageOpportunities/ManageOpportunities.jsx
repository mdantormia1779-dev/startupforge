"use client";
import React, { useEffect, useState } from "react";
import {
  Edit2,
  Trash2,
  Briefcase,
  Clock,
  PlusCircle,
  Loader2,
} from "lucide-react";
import DeleteModal from "../DeleteModal/DeleteModal";
import AddOpportunity from "../AddOpportunity/AddOpportunity";
import ManageOpportunityEdit from "../ManageStartupEdit/ManageStartupEdit";
import { authClient } from "@/lib/auth-client";

const API = process.env.NEXT_PUBLIC_API_URL;

const ManageOpportunities = () => {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOp, setSelectedOp] = useState(null);
  const [modalMode, setModalMode] = useState("add");

  // ✅ correct fetch
  useEffect(() => {
    if (!userId) return;

    const fetchOpportunities = async () => {
      try {
        const res = await fetch(
          `${API}/startups/by-owner/${userId}`
        );

        const data = await res.json();

        // 👉 backend থেকে opportunities নিচ্ছি
        setOpportunities(data.opportunities || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, [userId]);

  const openModal = (mode, op = null) => {
    setModalMode(mode);
    setSelectedOp(op);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`${API}/opportunities/${selectedOp._id}`, {
        method: "DELETE",
      });

      setOpportunities((prev) =>
        prev.filter((op) => op._id !== selectedOp._id)
      );

      setIsDeleteModalOpen(false);
      setSelectedOp(null);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (!userId) {
    return <p className="p-8">Authenticating...</p>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Manage Opportunities
          </h1>
          <p className="text-gray-500">
            View and manage your posted roles.
          </p>
        </div>

        <button
          onClick={() => openModal("add")}
          className="bg-black text-white px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <PlusCircle size={16} /> Add New Role
        </button>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center p-10">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : opportunities.length === 0 ? (
        <p className="text-gray-500">No opportunities found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {opportunities.map((op) => (
            <div
              key={op._id}
              className="bg-background p-6 rounded-2xl border shadow-sm"
            >
              <div className="flex justify-between mb-4">
                <Briefcase />

                <div className="flex gap-2">
                  <button onClick={() => openModal("edit", op)}>
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedOp(op);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-lg">
                {op.roleTitle}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                {op.requiredSkills}
              </p>

              <div className="flex gap-4 text-xs text-gray-400">
                <span>{op.workType}</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {op.deadline}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        startupName={selectedOp?.roleTitle || ""}
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {modalMode === "add"
                ? "Add Opportunity"
                : "Edit Opportunity"}
            </h2>

            {modalMode === "add" ? (
              <AddOpportunity />
            ) : (
              <ManageOpportunityEdit
                opportunity={selectedOp}
                onClose={() => setIsModalOpen(false)}
              />
            )}

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-4 border p-3 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOpportunities;