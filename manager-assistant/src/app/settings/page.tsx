"use client";

import { useState } from "react";
import { TopNav } from "@/components/top-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const [notifications, setNotifications] = useState({
    email: true,
    desktop: true,
    weeklyDigest: false,
    teamUpdates: true,
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col font-[family-name:var(--font-sans)]">
      <TopNav />

      {/* Page header */}
      <div className="px-10 pt-8 pb-5 border-b border-white/[0.06]">
        <p className="text-[11px] text-white/35 tracking-[0.2em] uppercase mb-1.5">Settings</p>
        <p className="text-[13px] font-medium text-white/50 tracking-[0.08em] uppercase">
          Account &amp; Preferences
        </p>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-10 py-8">
        <div className="max-w-2xl flex flex-col gap-6">

          {/* ── Profile ── */}
          <Card className="bg-white/[0.04] ring-white/[0.08]">
            <CardHeader>
              <CardTitle className="text-[13px] font-semibold text-white/80 tracking-wide">
                Profile
              </CardTitle>
              <CardDescription className="text-[12px] text-white/35">
                Your personal information visible to the assistant.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">

              {/* Avatar row */}
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14">
                  <AvatarFallback
                    className="text-[18px] font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, #4f6ef7 0%, #7c3aed 100%)" }}
                  >
                    B
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/[0.12] bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white text-[12px] h-8"
                  >
                    Change photo
                  </Button>
                  <p className="text-[11px] text-white/30">JPG, PNG up to 2 MB</p>
                </div>
              </div>

              <Separator className="bg-white/[0.06]" />

              {/* Name row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="first-name" className="text-[12px] text-white/50">
                    First name
                  </Label>
                  <Input
                    id="first-name"
                    defaultValue="Brandon"
                    className="bg-white/[0.04] border-white/[0.1] text-white text-[13px]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="last-name" className="text-[12px] text-white/50">
                    Last name
                  </Label>
                  <Input
                    id="last-name"
                    defaultValue="Herdrick"
                    className="bg-white/[0.04] border-white/[0.1] text-white text-[13px]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-[12px] text-white/50">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="brandon.herdrick@nordic.com"
                  className="bg-white/[0.04] border-white/[0.1] text-white text-[13px]"
                />
              </div>

              {/* Role / Department */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="role" className="text-[12px] text-white/50">
                    Job title
                  </Label>
                  <Input
                    id="role"
                    defaultValue="Engineering Manager"
                    className="bg-white/[0.04] border-white/[0.1] text-white text-[13px]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="department" className="text-[12px] text-white/50">
                    Department
                  </Label>
                  <Select defaultValue="engineering">
                    <SelectTrigger
                      id="department"
                      className="bg-white/[0.04] border-white/[0.1] text-white text-[13px]"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1e2030] border-white/[0.1] text-white">
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="bio" className="text-[12px] text-white/50">
                  Bio <span className="text-white/25">(optional)</span>
                </Label>
                <Textarea
                  id="bio"
                  placeholder="A short note about you that helps the assistant understand your context…"
                  className="bg-white/[0.04] border-white/[0.1] text-white text-[13px] placeholder:text-white/25 resize-none min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* ── Notifications ── */}
          <Card className="bg-white/[0.04] ring-white/[0.08]">
            <CardHeader>
              <CardTitle className="text-[13px] font-semibold text-white/80 tracking-wide">
                Notifications
              </CardTitle>
              <CardDescription className="text-[12px] text-white/35">
                Choose how and when the assistant reaches out.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-0">
              {[
                { id: "email", label: "Email notifications", description: "Receive summaries and action items by email" },
                { id: "desktop", label: "Desktop notifications", description: "Browser push alerts for urgent items" },
                { id: "weeklyDigest", label: "Weekly digest", description: "A Monday morning overview of your team" },
                { id: "teamUpdates", label: "Team updates", description: "Notified when a team member's status changes" },
              ].map(({ id, label, description }, i, arr) => (
                <div key={id}>
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-[13px] text-white/80">{label}</p>
                      <p className="text-[12px] text-white/35 mt-0.5">{description}</p>
                    </div>
                    <Switch
                      checked={notifications[id as keyof typeof notifications]}
                      onCheckedChange={(v) =>
                        setNotifications((prev) => ({ ...prev, [id]: v }))
                      }
                      className="data-[state=checked]:bg-[#2563eb]"
                    />
                  </div>
                  {i < arr.length - 1 && <Separator className="bg-white/[0.05]" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* ── Preferences ── */}
          <Card className="bg-white/[0.04] ring-white/[0.08]">
            <CardHeader>
              <CardTitle className="text-[13px] font-semibold text-white/80 tracking-wide">
                Preferences
              </CardTitle>
              <CardDescription className="text-[12px] text-white/35">
                Customize how the assistant behaves for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-[12px] text-white/50">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="bg-white/[0.04] border-white/[0.1] text-white text-[13px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1e2030] border-white/[0.1] text-white">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="da">Danish</SelectItem>
                      <SelectItem value="no">Norwegian</SelectItem>
                      <SelectItem value="sv">Swedish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-[12px] text-white/50">Timezone</Label>
                  <Select defaultValue="cet">
                    <SelectTrigger className="bg-white/[0.04] border-white/[0.1] text-white text-[13px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1e2030] border-white/[0.1] text-white">
                      <SelectItem value="cet">CET — Copenhagen</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">EST — New York</SelectItem>
                      <SelectItem value="pst">PST — Los Angeles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Danger zone ── */}
          <Card className="bg-[rgba(239,68,68,0.04)] ring-[rgba(239,68,68,0.2)]">
            <CardHeader>
              <CardTitle className="text-[13px] font-semibold text-red-400 tracking-wide">
                Danger zone
              </CardTitle>
              <CardDescription className="text-[12px] text-white/35">
                Irreversible actions — proceed carefully.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-[13px] text-white/70">Delete account</p>
                <p className="text-[12px] text-white/30 mt-0.5">
                  Permanently remove your data and preferences
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-red-500/30 text-red-400 bg-red-500/[0.06] hover:bg-red-500/[0.12] hover:text-red-300 text-[12px] h-8"
              >
                Delete account
              </Button>
            </CardContent>
          </Card>

          {/* ── Save bar ── */}
          <div className="flex items-center justify-between pt-2 pb-6">
            <p className="text-[12px] text-white/30">
              Changes are saved to your profile immediately.
            </p>
            <div className="flex gap-3 items-center">
              {saved && (
                <Badge className="bg-[rgba(74,222,128,0.12)] text-[#4ade80] border border-[rgba(74,222,128,0.25)] text-[11px]">
                  ✓ Saved
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                className="border-white/[0.12] bg-transparent text-white/50 hover:text-white hover:bg-white/[0.06] text-[12px] h-8"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[12px] h-8 px-5 border-none"
              >
                Save changes
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
