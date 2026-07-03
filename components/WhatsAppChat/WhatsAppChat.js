"use client";

import { useState } from "react";
import ChatButton from "./ChatButton";
import ChatPopup from "./ChatPopup";

export default function WhatsAppChat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-2.5 sm:right-6 z-50">

      <div className="flex items-center gap-2">

        {!open && (
          <span className="bg-[#f7f9fc] px-3 py-2 rounded-lg text-xs shadow">
            Need Help? Chat with Us
          </span>
        )}

        <ChatButton
          open={open}
          setOpen={setOpen}
        />

      </div>

      <ChatPopup open={open} />

    </div>
  );
}