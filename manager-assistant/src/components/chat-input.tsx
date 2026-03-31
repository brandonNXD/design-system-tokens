import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export function ChatInput() {
  return (
    <div className="px-8 pt-[21px] pb-6 border-t border-border shrink-0">
      <div className="flex items-center gap-3 bg-foreground/[0.05] border border-border rounded-xl px-[17px] py-px h-[58px]">
        <Input
          placeholder="Ask me anything about your team..."
          readOnly
          className="flex-1 bg-transparent border-none shadow-none text-[13.5px] text-foreground placeholder:text-foreground focus-visible:ring-0 focus-visible:border-transparent px-0 h-auto rounded-none"
        />
        <Button
          size="icon"
          className="w-8 h-8 bg-chat-user hover:bg-blue-700 rounded-lg shrink-0 text-[14px] border-none text-white"
        >
          <ArrowUp size={14} strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}
