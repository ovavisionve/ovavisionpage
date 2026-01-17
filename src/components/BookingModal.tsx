"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const CAL_COM_URL = "https://cal.com/ova-vision-lvxwzg";

interface BookingModalProps {
  children?: React.ReactNode;
}

const BookingModal = ({ children }: BookingModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="hero" size="xl" className="w-full sm:w-auto">
            <Calendar className="w-5 h-5" />
            Agenda tu reunión gratuita
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Agenda tu reunión gratuita con OVA VISION
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 h-full px-6 pb-6">
          <iframe
            src={CAL_COM_URL}
            className="w-full h-full min-h-[500px] rounded-lg border border-border"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
