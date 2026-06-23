"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Edit2, Trash2 } from "lucide-react";
import DeleteModal from "../DeleteModal/DeleteModal";
import ManageStartupEdit from "../ManageStartupEdit/ManageStartupEdit";
import { authClient } from "@/lib/auth-client";

const API = process.env.NEXT_PUBLIC_API_URL;

const ManageStartup = () => {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    if (!userId) return; // ✅ user না থাকলে fetch করবো না

    const fetchStartup = async () => {
      try {
        const res = await fetch(
          `${API}/startups/by-owner/${userId}`
        );

        const data = await res.json();

        // 👉 backend যদি {startups, opportunities} দেয়
        setStartups(data.startups || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStartup();
  }, [userId]); // ✅ dependency add

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${API}/startups/${selectedStartup._id}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        setStartups((prev) =>
          prev.filter((s) => s._id !== selectedStartup._id)
        );
        setIsDeleteOpen(false);
        setSelectedStartup(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <p className="p-8 text-gray-500">Loading...</p>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Manage Startups</h1>

      {startups.length === 0 ? (
        <p className="text-gray-500">No startups found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {startups.map((startup) => (
            <div
              key={startup._id}
              className="bg-background border rounded-2xl p-6"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4 items-center">
                  <div className="relative w-16 h-16">
                    <Image
                      src={startup.logoUrl}
                      alt="logo"
                      fill
                      className="rounded-xl object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      {startup.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {startup.industry}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedStartup(startup);
                      setIsUpdateOpen(true);
                    }}
                  >
                    <Edit2 />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedStartup(startup);
                      setIsDeleteOpen(true);
                    }}
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>

              <p className="mt-4 text-gray-600">
                {startup.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* DELETE */}
      {selectedStartup && (
        <DeleteModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDelete}
          startupName={selectedStartup.name}
        />
      )}

      {/* UPDATE */}
      {isUpdateOpen && selectedStartup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-background p-6 rounded-2xl w-full max-w-lg">
            <ManageStartupEdit
              startup={selectedStartup}
              onClose={() => setIsUpdateOpen(false)}
            />

            <button
              onClick={() => setIsUpdateOpen(false)}
              className="mt-4 w-full border p-3 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStartup;