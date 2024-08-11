"use client";

import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { SendIcon, SquareIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";


export function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/chat",
    });

  return (
    <div className="flex flex-col h-[90vh] w-full max-w-[800px] mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl shadow-2xl border border-transparent">
      <div className="flex-1 overflow-auto p-8 bg-white/80 backdrop-blur-md rounded-t-xl">
        {messages.length === 0 && (
          <div className="flex flex-col justify-center items-center h-full">
            <Image src="/ai1.jpg" alt="AI" width={120} height={120} />
            <p className="text-lg text-gray-700 mt-4">
               Start a conversation!
            </p>
          </div>
        )}
        <div className="flex flex-col gap-5">
          {messages.map((message) =>
            message.role === "assistant" ? (
              <div key={message.id} className="flex items-start gap-4">
                <div className="p-3 bg-indigo-600 rounded-full">
                  <Image src="/ai1.jpg" alt="AI" width={30} height={30} />
                </div>
                <div className="bg-indigo-100 rounded-lg p-4 max-w-[100%] shadow-md">
                  <Markdown className="text-sm text-gray-800">
                    {message.content}
                  </Markdown>
                </div>
              </div>
            ) : (
              <div key={message.id} className="flex justify-end">
                <div className="bg-purple-600 rounded-lg p-4 max-w-[75%] shadow-md">
                  <p className="text-sm text-white">{message.content}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md px-6 py-4 flex items-center gap-3 rounded-b-xl"
      >
        <div className="relative flex-1">
          <Textarea
            placeholder="Type your message..."
            className="rounded-lg pr-16 min-h-[72px] bg-white text-gray-900 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            rows={1}
            value={input}
            onChange={handleInputChange}
          />

          {!isLoading ? (
            <Button
              type="submit"
              size="icon"
              disabled={!input || isLoading}
              className="absolute bottom-3 right-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <SendIcon className="w-6 h-6 text-white" />
              <span className="sr-only">Send</span>
            </Button>
          ) : (
            <Button
              type="button"
              size="icon"
              disabled={!isLoading}
              onClick={stop}
              className="absolute bottom-3 right-3 rounded-full bg-red-600 hover:bg-red-700"
            >
              <SquareIcon className="w-6 h-6 text-white" />
              <span className="sr-only">Stop</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
