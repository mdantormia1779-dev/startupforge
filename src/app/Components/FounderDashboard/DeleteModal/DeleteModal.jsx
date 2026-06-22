import React from "react";
import { AlertTriangle } from "lucide-react";

const DeleteModal = ({ isOpen, onClose, onConfirm, startupName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
      <div className="bg-white dark:bg-card p-6 rounded-3xl w-full max-w-sm text-center border border-border shadow-2xl">
        {/* Icon Container */}
        <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-950/50 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="text-red-500" size={24} />
        </div>
        
        {/* Content */}
        <h3 className="text-lg font-bold mb-2 text-foreground">Delete Item?</h3>
        <p className="text-muted-foreground text-sm mb-6">
          Are you sure you want to delete <span className="font-semibold text-foreground">{startupName}</span>? This action cannot be undone.
        </p>
        
        {/* Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-background font-semibold hover:bg-gray-200 dark:hover:bg-accent text-foreground transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;