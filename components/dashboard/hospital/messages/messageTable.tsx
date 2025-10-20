"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import MessageModal from "./messageModal";

const MessageTable = () => {
    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState({});
  // Sample message data
  const messages = [
    {
      id: 1,
      name: "Zainab Ahmed",
      phone: "+234 812 345 6789",
      email: "zainab.ahmed@example.com",
      subject: "Appointment Request",
      preview: "Hello, I’d like to schedule a consultation for next week...",
    },
    {
      id: 2,
      name: "Emmanuel Johnson",
      phone: "+234 901 234 5678",
      email: "emmanuel.j@example.com",
      subject: "Payment Issue",
      preview: "I made a payment yesterday, but it hasn’t reflected yet...",
    },
  ];

  const hasMessages = messages.length > 0;

  return (
    <Card className="mt-6">
      <CardContent>
        {hasMessages ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">S/N</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Message Preview</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {messages.map((message, index) => (
                <TableRow key={message.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.phone}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>{message.subject}</TableCell>
                  <TableCell className="truncate max-w-[220px] text-gray-600">
                    {message.preview}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => {
                        setMessage(message);
                        setOpenMessage(true)
                    }}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-20 space-y-2 w-full">
            <Image
              src="/empty-messages.png"
              alt="No Messages"
              width={84}
              height={84}
              className="mx-auto"
            />
            <h2 className="text-[18px] font-semibold">No Messages Yet</h2>
            <p className="w-[300px] mx-auto text-[14px] font-light text-[#717171]">
              You haven’t received any messages yet. Messages from patients or
              clients will appear here once they contact you.
            </p>
          </div>
        )}
      </CardContent>
      <MessageModal openMessage={openMessage} setOpenMessage={setOpenMessage} message={message} />
    </Card>
  );
};

export default MessageTable;
