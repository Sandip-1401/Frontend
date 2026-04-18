import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDepartments, getAllDoctors } from "@/features/general/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, useInView } from "framer-motion";
import { Activity, User, Calendar, Star, Shield, FileText, CreditCard, ChevronRight,     Heart, Stethoscope, Brain, Eye, Bone, Baby, Zap, Clock, CheckCircle, QrCode, ArrowRight, Twitter, Linkedin, Github, Phone, Mail, MapPin, Sparkles, TrendingUp, Users, Award, ClipboardList, Pill, DollarSign, Smartphone
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Department {
  id: string;
  name: string;
  description?: string;
}

interface DoctorDataType {
  id: string;
  name: string;
  specialization?: string;
  experience?: number;
  department?: { name: string };
  isAvailable?: boolean;
  rating?: number;
  user?: { profileImage?: string };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const departmentIcons: Record<string, React.ReactNode> = {
  Cardiology: <Heart className="w-6 h-6" />,
  Neurology: <Brain className="w-6 h-6" />,
  Orthopedics: <Bone className="w-6 h-6" />,
  Ophthalmology: <Eye className="w-6 h-6" />,
  Pediatrics: <Baby className="w-6 h-6" />,
  General: <Stethoscope className="w-6 h-6" />,
  default: <Activity className="w-6 h-6" />,
};

const getDeptIcon = (name: string) =>
  departmentIcons[name] ?? departmentIcons.default;

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Section Wrapper ─────────────────────────────────────────────────────────
const Section = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HeroSection = ({ onNavigate }: { onNavigate: (p: string) => void }) => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f0f6ff]">
    {/* Animated blobs */}
    <motion.div
      animate={{ scale: [1, 1.15, 1], rotate: [0, 20, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-400/30 to-cyan-300/20 blur-3xl"
    />
    <motion.div
      animate={{ scale: [1, 1.2, 1], rotate: [0, -15, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-indigo-400/25 to-blue-300/20 blur-3xl"
    />
    <motion.div
      animate={{ y: [0, 30, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-cyan-400/10 blur-2xl"
    />

    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center py-24">
      {/* Left */}
      <div>
        <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Healthcare Reimagined
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
          className="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight text-slate-900 mb-6"
          style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}
        >
          Smart Health,
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Simpler Life
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="visible"
          className="text-lg text-slate-500 max-w-md mb-10 leading-relaxed"
        >
          Book appointments, access medical records, and pay bills — all in one elegant platform built for modern healthcare.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4 mb-12"
        >
          <Button
            onClick={() => onNavigate("/register")}
            className="px-8 py-6 text-base font-semibold rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all duration-300 hover:scale-[1.03]"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button
            onClick={() => onNavigate("/login")}
            variant="outline"
            className="px-8 py-6 text-base font-semibold rounded-2xl border-2 border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300"
          >
            Sign In
          </Button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-3"
        >
          {[
            { icon: <Users className="w-3.5 h-3.5" />, text: "10,000+ Patients" },
            { icon: <Stethoscope className="w-3.5 h-3.5" />, text: "200+ Doctors" },
            { icon: <Shield className="w-3.5 h-3.5" />, text: "HIPAA Compliant" },
            { icon: <Clock className="w-3.5 h-3.5" />, text: "24/7 Support" },
          ].map((b) => (
            <span
              key={b.text}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-slate-100 text-slate-600 text-xs font-medium shadow-sm"
            >
              <span className="text-blue-500">{b.icon}</span>
              {b.text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Right: Floating Dashboard Preview */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="hidden lg:block relative"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {/* Main card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-100 border border-white/60 p-6 max-w-sm ml-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs text-slate-400 font-medium">Welcome back</p>
                <p className="font-bold text-slate-800">Dr. Sarah Chen</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                SC
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "Today's Appts", value: "8", color: "bg-blue-50 text-blue-600" },
                { label: "Pending", value: "3", color: "bg-amber-50 text-amber-600" },
                { label: "Completed", value: "124", color: "bg-green-50 text-green-600" },
                { label: "Revenue", value: "$2.4k", color: "bg-purple-50 text-purple-600" },
              ].map((s) => (
                <div key={s.label} className={`rounded-xl p-3 ${s.color}`}>
                  <p className="text-xs opacity-70">{s.label}</p>
                  <p className="text-xl font-bold">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {["10:00 AM — John Doe", "11:30 AM — Priya Patel", "2:00 PM — Mark Wilson"].map((a) => (
                <div key={a} className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* Floating notification */}
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -left-10 top-16 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 flex items-center gap-3 w-52"
          >
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700">Appointment Confirmed</p>
              <p className="text-[10px] text-slate-400">Just now</p>
            </div>
          </motion.div>

          {/* Floating QR */}
          <motion.div
            animate={{ x: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -right-6 bottom-10 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 text-center w-28"
          >
            <QrCode className="w-10 h-10 text-blue-500 mx-auto mb-1" />
            <p className="text-[10px] font-semibold text-slate-600">Scan to Pay</p>
            <p className="text-[10px] text-green-500 font-bold">₹1,200</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// ─── Flow Section ─────────────────────────────────────────────────────────────
const FlowSection = () => {
  const steps = [
    { icon: <User className="w-7 h-7" />, title: "Register", desc: "Create your account in under 2 minutes", color: "from-blue-500 to-blue-600" },
    { icon: <Calendar className="w-7 h-7" />, title: "Book Appointment", desc: "Choose a doctor and pick your time slot", color: "from-cyan-500 to-cyan-600" },
    { icon: <Stethoscope className="w-7 h-7" />, title: "Consultation", desc: "Meet your doctor in-person or online", color: "from-teal-500 to-teal-600" },
    { icon: <Pill className="w-7 h-7" />, title: "Get Prescription", desc: "Receive digital prescriptions instantly", color: "from-indigo-500 to-indigo-600" },
    { icon: <ClipboardList className="w-7 h-7" />, title: "Bill Generated", desc: "Transparent itemized billing", color: "from-violet-500 to-violet-600" },
    { icon: <QrCode className="w-7 h-7" />, title: "Pay via QR", desc: "Scan and pay in seconds", color: "from-purple-500 to-purple-600" },
  ];

  return (
    <Section className="py-28 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
          <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">Patient Journey</span>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            How It Works
          </h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto">From registration to payment — a seamless end-to-end healthcare experience</p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-14 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 z-0" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={scaleIn}
                custom={i}
                className="flex flex-col items-center text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.12, y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}
                >
                  {step.icon}
                </motion.div>
                <span className="text-[10px] font-bold text-slate-300 mb-1">STEP {i + 1}</span>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

// ─── Departments ──────────────────────────────────────────────────────────────
const DepartmentSection = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  const { data: departments, isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await getDepartments();
      return res.success ? res.data : [];
    },
  });

  const fallback = [
    { id: "1", name: "Cardiology" },
    { id: "2", name: "Neurology" },
    { id: "3", name: "Orthopedics" },
    { id: "4", name: "Ophthalmology" },
    { id: "5", name: "Pediatrics" },
    { id: "6", name: "General Medicine" },
  ];

  const items = (departments && departments.length > 0 ? departments : fallback) as Department[];

  const colors = [
    "from-red-50 to-red-100 border-red-100 hover:border-red-300 [&_svg]:text-red-500",
    "from-purple-50 to-purple-100 border-purple-100 hover:border-purple-300 [&_svg]:text-purple-500",
    "from-orange-50 to-orange-100 border-orange-100 hover:border-orange-300 [&_svg]:text-orange-500",
    "from-cyan-50 to-cyan-100 border-cyan-100 hover:border-cyan-300 [&_svg]:text-cyan-500",
    "from-pink-50 to-pink-100 border-pink-100 hover:border-pink-300 [&_svg]:text-pink-500",
    "from-blue-50 to-blue-100 border-blue-100 hover:border-blue-300 [&_svg]:text-blue-500",
    "from-green-50 to-green-100 border-green-100 hover:border-green-300 [&_svg]:text-green-500",
    "from-indigo-50 to-indigo-100 border-indigo-100 hover:border-indigo-300 [&_svg]:text-indigo-500",
  ];

  return (
    <Section className="py-28 bg-gradient-to-b from-slate-50 to-white px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-14">
          <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">Specializations</span>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            Our Departments
          </h2>
          <p className="text-slate-500 mt-3 max-w-md mx-auto">World-class specialists across every medical discipline</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-2xl" />
              ))
            : items.slice(0, 8).map((dep, i) => (
                <motion.div key={dep.id} variants={scaleIn} custom={i}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`bg-gradient-to-br ${colors[i % colors.length]} border rounded-2xl p-6 cursor-pointer transition-all duration-300 h-40 flex flex-col justify-between group`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center shadow-sm">
                      {getDeptIcon(dep.name)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm mb-2">{dep.name}</h3>
                      <button
                        onClick={() => onNavigate("/register")}
                        className="text-xs font-semibold text-slate-500 group-hover:text-blue-600 flex items-center gap-1 transition-colors"
                      >
                        Explore Doctors <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
        </div>
      </div>
    </Section>
  );
};

// ─── Doctor Section ───────────────────────────────────────────────────────────
const DoctorSection = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  const { data: doctors, isLoading } = useQuery({
    queryKey: ["doctors-landing"],
    queryFn: async () => {
      const res = await getAllDoctors("", "", "", "");
      return res.success ? res.data : [];
    },
  });

  const fallbackDoctors: DoctorDataType[] = [
    { id: "1", name: "Dr. Sarah Chen", department: { name: "Cardiology" }, experience: 12, isAvailable: true, rating: 4.9 },
    { id: "2", name: "Dr. Michael Ross", department: { name: "Neurology" }, experience: 8, isAvailable: true, rating: 4.8 },
    { id: "3", name: "Dr. Priya Sharma", department: { name: "Pediatrics" }, experience: 15, isAvailable: false, rating: 4.7 },
    { id: "4", name: "Dr. James Wilson", department: { name: "Orthopedics" }, experience: 10, isAvailable: true, rating: 4.9 },
    { id: "5", name: "Dr. Aisha Patel", department: { name: "Ophthalmology" }, experience: 6, isAvailable: true, rating: 4.6 },
    { id: "6", name: "Dr. Raj Kumar", department: { name: "General Medicine" }, experience: 20, isAvailable: false, rating: 4.8 },
  ];

  const items = doctors && doctors.length > 0 ? doctors : fallbackDoctors;

  return (
    <Section className="py-28 bg-slate-900 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-14">
          <span className="text-cyan-400 text-sm font-bold uppercase tracking-widest">Our Team</span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mt-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            Top Physicians
          </h2>
          <p className="text-slate-400 mt-3 max-w-md mx-auto">Board-certified specialists dedicated to your health</p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-2xl bg-slate-800" />
            ))}
          </div>
        ) : (
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {items.map((doc, i) => (
                <CarouselItem key={doc.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <motion.div variants={scaleIn} custom={i}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-4 mb-5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-2xl font-black text-blue-400 border border-blue-500/20">
                          {doc.name.charAt(3).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-sm">{doc.name}</h3>
                          <p className="text-slate-400 text-xs mt-0.5">{doc.department?.name ?? "General"}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star
                                key={j}
                                className={`w-3 h-3 ${j < Math.round(doc.rating ?? 4.8) ? "text-amber-400 fill-amber-400" : "text-slate-600"}`}
                              />
                            ))}
                            <span className="text-xs text-slate-400 ml-1">{doc.rating ?? "4.8"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mb-5">
                        <span className="text-xs bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">
                          {doc.experience ?? 8}+ yrs exp
                        </span>
                        <Badge
                          className={`text-xs px-2.5 py-1 rounded-full border-0 ${
                            doc.isAvailable !== false
                              ? "bg-green-500/15 text-green-400"
                              : "bg-red-500/15 text-red-400"
                          }`}
                        >
                          {doc.isAvailable !== false ? "Available" : "Busy"}
                        </Badge>
                      </div>

                      <Button
                        onClick={() => onNavigate("/register")}
                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-sm py-5 shadow-lg shadow-blue-900/30 group-hover:shadow-blue-900/50 transition-all"
                      >
                        <Calendar className="mr-2 w-4 h-4" />
                        Book Appointment
                      </Button>
                    </motion.div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-3 mt-8">
              <CarouselPrevious className="relative static translate-y-0 bg-slate-800 border-slate-700 text-white hover:bg-slate-700 rounded-xl" />
              <CarouselNext className="relative static translate-y-0 bg-slate-800 border-slate-700 text-white hover:bg-slate-700 rounded-xl" />
            </div>
          </Carousel>
        )}
      </div>
    </Section>
  );
};

// ─── Features Tabs ────────────────────────────────────────────────────────────
const FeatureTabs = () => {
  const tabs = [
    {
      id: "records",
      label: "Digital Records",
      icon: <FileText className="w-4 h-4" />,
      heading: "Complete Medical History",
      desc: "All your medical records, lab results, diagnoses, and treatment history in one secure, searchable location. Share instantly with any doctor.",
      features: ["Lifetime health history", "Lab & imaging results", "Secure doctor sharing", "PDF export"],
      color: "from-blue-500 to-cyan-400",
      bg: "bg-blue-50",
    },
    {
      id: "billing",
      label: "Smart Billing",
      icon: <CreditCard className="w-4 h-4" />,
      heading: "Transparent Billing & Payments",
      desc: "Auto-generated itemized bills from prescriptions. Pay instantly with QR code scanning. Full payment history and receipts.",
      features: ["Auto bill generation", "QR code payments", "Insurance integration", "Digital receipts"],
      color: "from-violet-500 to-purple-400",
      bg: "bg-violet-50",
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: <Calendar className="w-4 h-4" />,
      heading: "Effortless Scheduling",
      desc: "Book, reschedule, or cancel appointments in seconds. See real-time doctor availability and get instant confirmations.",
      features: ["Real-time availability", "Smart reminders", "One-click rescheduling", "Video consultations"],
      color: "from-teal-500 to-emerald-400",
      bg: "bg-teal-50",
    },
  ];

  return (
    <Section className="py-28 bg-white px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-14">
          <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">Platform Features</span>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            Everything You Need
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} custom={1}>
          <Tabs defaultValue="records" className="w-full flex flex-col">
            <TabsList className="grid grid-cols-3 bg-slate-100 rounded-2xl p-1.5 mb-10 h-auto">
              {tabs.map((t) => (
                <TabsTrigger
                  key={t.id}
                  value={t.id}
                  className="rounded-xl py-3 text-sm font-semibold flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
                >
                  {t.icon}
                  <span className="hidden sm:block">{t.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((t) => (
              <TabsContent key={t.id} value={t.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`${t.bg} rounded-3xl p-8 lg:p-10 grid lg:grid-cols-2 gap-10 items-center`}
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white mb-5 shadow-lg`}>
                      {t.icon}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
                      {t.heading}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6">{t.desc}</p>
                    <ul className="space-y-2.5">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-slate-700 text-sm font-medium">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Visual card */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                    <div className={`h-2 rounded-full bg-gradient-to-r ${t.color} mb-5`} />
                    <div className="space-y-3">
                      {[80, 60, 90, 45].map((w, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                            <div className={`w-3 h-3 rounded-sm bg-gradient-to-br ${t.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${w}%` }}
                                transition={{ duration: 1, delay: i * 0.15 }}
                                className={`h-full rounded-full bg-gradient-to-r ${t.color}`}
                              />
                            </div>
                          </div>
                          <span className="text-xs font-bold text-slate-500">{w}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </Section>
  );
};

// ─── Billing + QR ─────────────────────────────────────────────────────────────
const BillingSection = () => (
  <Section className="py-28 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-6 overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <motion.div variants={fadeUp} custom={0} className="text-center mb-14">
        <span className="text-cyan-400 text-sm font-bold uppercase tracking-widest">Payments</span>
        <h2 className="text-4xl lg:text-5xl font-black text-white mt-2" style={{ fontFamily: "'Sora', sans-serif" }}>
          Billing Made Easy
        </h2>
        <p className="text-slate-400 mt-3 max-w-md mx-auto">From prescription to payment in three simple steps</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {[
          {
            step: "01",
            icon: <ClipboardList className="w-6 h-6" />,
            title: "Prescription Generated",
            desc: "Doctor creates digital prescription after consultation",
            color: "border-blue-500/30 bg-blue-500/5",
            accent: "text-blue-400",
          },
          {
            step: "02",
            icon: <DollarSign className="w-6 h-6" />,
            title: "Bill Auto-Generated",
            desc: "Itemized bill created instantly from prescription details",
            color: "border-violet-500/30 bg-violet-500/5",
            accent: "text-violet-400",
          },
          {
            step: "03",
            icon: <Smartphone className="w-6 h-6" />,
            title: "Pay via QR",
            desc: "Scan QR code and complete payment from any UPI app",
            color: "border-cyan-500/30 bg-cyan-500/5",
            accent: "text-cyan-400",
          },
        ].map((item, i) => (
          <motion.div key={item.step} variants={scaleIn} custom={i}>
            <div className={`border ${item.color} rounded-2xl p-7 h-full relative overflow-hidden`}>
              <span className="absolute top-5 right-5 text-5xl font-black text-white/5">{item.step}</span>
              <div className={`w-12 h-12 rounded-xl border ${item.color} flex items-center justify-center ${item.accent} mb-5`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* QR Demo */}
      <motion.div variants={fadeUp} custom={3} className="mt-10">
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-4 shadow-2xl">
            <div className="w-28 h-28 grid grid-cols-7 gap-0.5">
              {Array.from({ length: 49 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-[1px] ${
                    [0,1,2,3,4,5,6,7,13,14,20,21,27,28,34,35,41,42,43,44,45,46,48].includes(i)
                      ? "bg-slate-900"
                      : "bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="text-center md:text-left">
            <p className="text-white font-bold text-xl mb-1">₹ 2,400.00</p>
            <p className="text-slate-400 text-sm mb-4">Scan with any UPI app to pay</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                <span key={app} className="text-xs bg-white/10 text-white px-3 py-1.5 rounded-full font-medium">
                  {app}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </Section>
);

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Riya Mehta",
      role: "Patient",
      avatar: "RM",
      text: "Booking my appointment took less than 2 minutes. The QR payment at the end was seamless. This is the future of healthcare.",
      rating: 5,
    },
    {
      name: "Dr. Arjun Nair",
      role: "Cardiologist",
      avatar: "AN",
      text: "The doctor dashboard is incredibly intuitive. Managing schedules, prescriptions, and patient records has never been easier.",
      rating: 5,
    },
    {
      name: "Sunita Rao",
      role: "Patient",
      avatar: "SR",
      text: "I love how all my medical records are in one place. My specialist could access my history instantly during the consultation.",
      rating: 5,
    },
    {
      name: "Dr. Fatima Khan",
      role: "Pediatrician",
      avatar: "FK",
      text: "The prescription-to-billing automation saves me hours every week. The system just works beautifully.",
      rating: 5,
    },
    {
      name: "Vikram Singh",
      role: "Patient",
      avatar: "VS",
      text: "Got real-time notifications for my appointment and a digital bill with QR code. Absolutely impressed.",
      rating: 5,
    },
  ];

  return (
    <Section className="py-28 bg-slate-50 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-14">
          <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">Reviews</span>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            Loved by Thousands
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} custom={1}>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {testimonials.map((t, i) => (
                <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                        <p className="text-xs text-slate-400">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-3 mt-8">
              <CarouselPrevious className="relative static translate-y-0 bg-white border-slate-200 hover:bg-slate-50 rounded-xl" />
              <CarouselNext className="relative static translate-y-0 bg-white border-slate-200 hover:bg-slate-50 rounded-xl" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </Section>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQSection = () => {
  const faqs = [
    {
      q: "How do I book an appointment?",
      a: "Register or log in, browse our doctors by specialty, select an available time slot, and confirm. You'll receive an instant confirmation notification.",
    },
    {
      q: "Are my medical records secure?",
      a: "Absolutely. We use bank-grade AES-256 encryption and are fully HIPAA compliant. Only you and your authorized doctors can access your records.",
    },
    {
      q: "How does QR payment work?",
      a: "After your consultation, a bill is auto-generated from your prescription. Scan the QR code with any UPI app (GPay, PhonePe, Paytm, BHIM) to pay instantly.",
    },
    {
      q: "Can I cancel or reschedule an appointment?",
      a: "Yes, you can cancel or reschedule up to 2 hours before your appointment from the Patient Dashboard with no cancellation fees.",
    },
    {
      q: "How do doctors get verified on the platform?",
      a: "Every doctor goes through a rigorous verification process including medical license validation, credentials check, and admin approval before they can accept patients.",
    },
    {
      q: "Is there a mobile app available?",
      a: "Our platform is fully responsive and works perfectly on all devices. A dedicated mobile app for iOS and Android is coming soon.",
    },
  ];

  return (
    <Section className="py-28 bg-white px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-14">
          <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">FAQ</span>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            Common Questions
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} custom={1}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-slate-100 rounded-2xl px-6 shadow-sm data-[state=open]:border-blue-200 data-[state=open]:shadow-blue-50 transition-all"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-blue-600 hover:no-underline py-5 text-sm">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </Section>
  );
};

// ─── CTA ──────────────────────────────────────────────────────────────────────
const CTASection = ({ onNavigate }: { onNavigate: (p: string) => void }) => (
  <Section className="py-28 px-6">
    <div className="max-w-4xl mx-auto">
      <motion.div
        variants={scaleIn}
        className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"
        />

        <div className="relative z-10">
          <motion.div variants={fadeUp} custom={0}>
            <Zap className="w-10 h-10 text-cyan-200 mx-auto mb-5" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-4xl lg:text-5xl font-black text-white mb-5"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Start Your Health Journey Today
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of patients and doctors already using our platform for smarter, simpler healthcare.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => onNavigate("/register")}
              className="px-10 py-6 text-base font-bold rounded-2xl bg-white text-blue-700 hover:bg-blue-50 shadow-xl hover:scale-[1.03] transition-all"
            >
              Create Free Account
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              onClick={() => onNavigate("/login")}
              variant="outline"
              className="px-10 py-6 text-base font-bold rounded-2xl border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all"
            >
              Sign In
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </Section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = ({ onNavigate }: { onNavigate: (p: string) => void }) => (
  <footer className="bg-slate-900 border-t border-slate-800 px-6 py-14">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-black text-white text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>
              HealthCare
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Modern healthcare management platform connecting patients with world-class physicians.
          </p>
          <div className="flex gap-3 mt-5">
            {[Twitter, Linkedin, Github].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
          <ul className="space-y-2.5">
            {[
              { label: "Register", path: "/register" },
              { label: "Login", path: "/login" },
              { label: "Forgot Password", path: "/forgot-password" },
            ].map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => onNavigate(link.path)}
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
          <ul className="space-y-2.5">
            {[
              { icon: <Phone className="w-3.5 h-3.5" />, text: "+91 98765 43210" },
              { icon: <Mail className="w-3.5 h-3.5" />, text: "support@healthcare.io" },
              { icon: <MapPin className="w-3.5 h-3.5" />, text: "Mumbai, India" },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                <span className="text-blue-400">{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-slate-500 text-xs">© 2026 HealthCare Platform. All rights reserved.</p>
        <div className="flex gap-5">
          {["Privacy Policy", "Terms of Service", "HIPAA Compliance"].map((t) => (
            <span key={t} className="text-slate-500 hover:text-slate-300 text-xs cursor-pointer transition-colors">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-xl shadow-md border-b border-slate-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-black text-slate-900 text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>
            HealthCare
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {["Departments", "Doctors", "Features"].map((item) => (
            <button
              key={item}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-all"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => onNavigate("/login")}
            variant="ghost"
            className="text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-xl"
          >
            Sign In
          </Button>
          <Button
            onClick={() => onNavigate("/register")}
            className="px-5 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-md shadow-blue-200 hover:scale-[1.03] transition-all"
          >
            Get Started
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

// ─── Stats Banner ─────────────────────────────────────────────────────────────
const StatsBanner = () => {
  const stats = [
    { icon: <Users className="w-5 h-5" />, value: "10,000+", label: "Patients Served" },
    { icon: <Stethoscope className="w-5 h-5" />, value: "200+", label: "Verified Doctors" },
    { icon: <Award className="w-5 h-5" />, value: "50+", label: "Departments" },
    { icon: <TrendingUp className="w-5 h-5" />, value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <Section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} variants={scaleIn} custom={i} className="text-center">
            <div className="flex justify-center text-blue-100 mb-2">{s.icon}</div>
            <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>
              {s.value}
            </div>
            <div className="text-blue-100 text-sm font-medium">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    if (token && role) {
      if (role === "ADMIN") navigate("/admin/all-users");
      else if (role === "DOCTOR") navigate("/doctors/my-profile");
      else navigate("/patients/my-profile");
    }
  }, [navigate]);

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden" style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}>
      <Navbar onNavigate={navigate} />
      <HeroSection onNavigate={navigate} />
      <StatsBanner />
      <FlowSection />
      <DepartmentSection onNavigate={navigate} />
      <DoctorSection onNavigate={navigate} />
      <FeatureTabs />
      <BillingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection onNavigate={navigate} />
      <Footer onNavigate={navigate} />
    </div>
  );
}