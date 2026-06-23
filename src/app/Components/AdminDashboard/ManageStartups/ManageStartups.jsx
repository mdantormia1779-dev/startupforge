"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Loader2, Building2, Edit2 } from "lucide-react";
import { toast } from "react-toastify";
import DeleteModal from "../../FounderDashboard/DeleteModal/DeleteModal";
import ManageStartUpEdit from "../../FounderDashboard/ManageStartupEdit/ManageStartupEdit";

const API = process.env.NEXT_PUBLIC_API_URL;

const ManageStartups = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);

  // useEffect এর ভেতরেই ফাংশন ডিফাইন করায় ক্যাসকেডিং রেন্ডার এরর হবে না
  useEffect(() => {
    const fetchStartups = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/startups`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        
        setStartups(data);
      } catch (err) {
        console.error("Error fetching startups:", err);
        toast.error("Failed to load startups");
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []); // ডিপেন্ডেন্সি এরে খালি রাখা হয়েছে

  // Delete সিস্টেম
  const confirmDelete = async () => {
    try {
      const res = await fetch(`${API}/startups/${selectedStartup._id}`, { method: "DELETE" });
      if (res.ok) {
        setStartups(startups.filter((s) => s._id !== selectedStartup._id));
        setIsDeleteOpen(false);
        setSelectedStartup(null);
        toast.success("Startup deleted successfully");
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary" size={40}/></div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Manage Startups</h2>

      <div className="grid gap-6">
        {startups.map((s) => (
          <div key={s._id} className="bg-background p-6 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-indigo-500/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border">
                {s.logoUrl ? <Image src={s.logoUrl} alt={s.name} fill className="object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gray-100"><Building2 size={24} /></div>}
              </div>
              <div>
                <h3 className="font-bold text-lg">{s.name}</h3>
                <p className="text-sm text-gray-500">{s.industry} • {s.fundingStage}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* শুধু Edit এবং Delete বাটন */}
              <button onClick={() => { setSelectedStartup(s); setIsEditOpen(true); }} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                <Edit2 size={18} />
              </button>

              <button onClick={() => { setSelectedStartup(s); setIsDeleteOpen(true); }} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <DeleteModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onConfirm={confirmDelete} startupName={selectedStartup?.name} />

      {isEditOpen && selectedStartup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background p-6 rounded-2xl w-full max-w-lg shadow-xl">
            <ManageStartUpEdit 
              startup={selectedStartup} 
              onClose={() => setIsEditOpen(false)} 
              onUpdate={async () => {
                // আপডেট করার পর পুনরায় ডাটা ফেচ করবে
                const res = await fetch(`${API}/startups`);
                const data = await res.json();
                setStartups(data);
                setIsEditOpen(false);
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStartups;