"use client";
import React, { useEffect, useState, useCallback } from "react";
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
import { authClient } from "@/lib/auth-client";
import ManageOpportunityEdit from "../ManageOpportunityEdit/ManageOpportunityEdit";

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

  // useCallback ব্যবহার করা হয়েছে যাতে চাইল্ড কম্পোনেন্ট থেকে এটি কল করলে রি-রেন্ডার সমস্যা না হয়
  const fetchOpportunities = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/startups/by-owner/${userId}`);
      const data = await res.json();
      setOpportunities(data.opportunities || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // useEffect এর ভেতরেই ফাংশনটি লিখুন
  useEffect(() => {
    if (!userId) return;

    // সরাসরি ইফেক্টের ভেতর async ফাংশন তৈরি করুন
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/startups/by-owner/${userId}`);
        const data = await res.json();
        setOpportunities(data.opportunities || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]); // এখানে শুধুমাত্র userId নির্ভরতা থাকবে

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
        prev.filter((op) => op._id !== selectedOp._id),
      );
      setIsDeleteModalOpen(false);
      setSelectedOp(null);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (!userId) {
    return <p className="p-8 text-center">Authenticating...</p>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Manage Opportunities
          </h1>
          <p className="text-muted-foreground">
            View and manage your posted roles.
          </p>
        </div>

        <button
          onClick={() => openModal("add")}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-xl flex items-center gap-2 hover:opacity-90"
        >
          <PlusCircle size={16} /> Add New Role
        </button>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="flex justify-center p-10">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : opportunities.length === 0 ? (
        <p className="text-muted-foreground text-center">
          No opportunities found
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {opportunities.map((op) => (
            <div
              key={op._id}
              className="bg-card p-6 rounded-2xl border border-border shadow-sm"
            >
              <div className="flex justify-between mb-4">
                <Briefcase className="text-primary" />
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal("edit", op)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedOp(op);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-lg text-card-foreground">
                {op.roleTitle}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {op.requiredSkills}
              </p>

              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>{op.workType}</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {op.deadline}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        startupName={selectedOp?.roleTitle || ""}
      />

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-card p-6 rounded-2xl w-full max-w-lg border border-border">
            <h2 className="text-xl font-bold mb-4 text-card-foreground">
              {modalMode === "add" ? "Add Opportunity" : "Edit Opportunity"}
            </h2>

            {modalMode === "add" ? (
              <AddOpportunity />
            ) : (
              <ManageOpportunityEdit
                opportunity={selectedOp}
                onClose={() => setIsModalOpen(false)}
                onUpdate={fetchOpportunities}
              />
            )}

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-4 border border-border p-3 rounded-xl text-muted-foreground hover:bg-muted"
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
