import React, { useState, useEffect } from 'react';
import { 
  Send, 
  ShieldCheck, 
  Mail, 
  User, 
  Briefcase, 
  TableProperties, 
  Trash2, 
  CheckCircle2, 
  Archive, 
  Filter, 
  RefreshCw, 
  CheckCircle,
  Inbox
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  sendGmailMessage, 
  appendRowToSheets,
  addInquiryToFirestore,
  updateInquiryStatusInFirestore,
  deleteInquiryFromFirestore,
  subscribeToInquiries,
  InquiryData
} from '../lib/firebase';

interface InteractiveFormProps {
  onOpenToast: (text: string, type: 'success' | 'error') => void;
}

export default function InteractiveForm({ onOpenToast }: InteractiveFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [gmailUser, setGmailUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(
    localStorage.getItem('portfolio_spreadsheet_id')
  );
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminClickCount, setAdminClickCount] = useState(0);
  
  // Inquiries management states
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Reviewed' | 'Archived'>('All');
  const [isUpdatingStatusId, setIsUpdatingStatusId] = useState<string | null>(null);

  useEffect(() => {
    if (window.location.search.includes('admin=true') || window.location.hash.includes('admin')) {
      setIsAdminMode(true);
    }
  }, []);

  const handleAdminClick = () => {
    setAdminClickCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setIsAdminMode(curr => !curr);
        onOpenToast(isAdminMode ? "Admin settings panel hidden." : "Admin settings panel activated!", "success");
        return 0;
      }
      return next;
    });
  };

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, userToken) => {
        setGmailUser(user);
        setToken(userToken);
      },
      () => {
        setGmailUser(null);
        setToken(null);
      }
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Listen to inquiries in admin mode
  useEffect(() => {
    if (!isAdminMode) return;
    
    const unsubscribe = subscribeToInquiries(
      (data) => {
        setInquiries(data);
      },
      (err) => {
        console.error("Firestore listening error:", err);
        onOpenToast("Notice: Elevate credentials to fetch inquiries from Firestore.", "error");
      }
    );
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isAdminMode]);

  const handleConnectGmail = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setGmailUser(result.user);
        setToken(result.accessToken);
        onOpenToast("Google Account (Gmail & Sheets) integrated successfully!", "success");
      }
    } catch (error: any) {
      console.error("Google integration error:", error);
      onOpenToast("Failed to connect Google Account. Please try again.", "error");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleDisconnectGmail = async () => {
    try {
      await logout();
      setGmailUser(null);
      setToken(null);
      onOpenToast("Google account disconnected.", "success");
    } catch (error: any) {
      console.error("Gmail disconnect error:", error);
      onOpenToast("Error disconnecting Gmail.", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      onOpenToast("Please input a valid contact name.", "error");
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      onOpenToast("Please input a valid email coordinate.", "error");
      return;
    }
    if (!message.trim() || message.length < 3) {
      onOpenToast("Please provide a brief message about your project (min 3 characters).", "error");
      return;
    }

    setSubmitting(true);

    try {
      // 1. Persist submission durably to Firestore (Master Source of Truth)
      await addInquiryToFirestore(name.trim(), email.trim(), message.trim());
      
      // 2. Submit to Formspree for reliable email delivery to your inbox
      let formspreeSucceeded = false;
      try {
        const formspreeResponse = await fetch('https://formspree.io/f/xkodgenq', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            _subject: `New Portfolio Inquiry from ${name.trim()}`
          })
        });
        if (formspreeResponse.ok) {
          formspreeSucceeded = true;
        }
      } catch (fErr) {
        console.error("Formspree submit error:", fErr);
      }

      // 3. Try Google Workspace notifications if connected
      let gmailSucceeded = false;
      let sheetsSucceeded = false;
      let sheetErr = '';
      const hasActiveToken = !!gmailUser && !!token;

      if (hasActiveToken) {
        // Send Gmail notification
        try {
          await sendGmailMessage(gmailUser.email || 'me', name, email, message);
          gmailSucceeded = true;
        } catch (err: any) {
          console.error("Gmail send error:", err);
        }

        // Append to Google Sheets
        try {
          const sheetResult = await appendRowToSheets(name, email, message);
          sheetsSucceeded = true;
          if (sheetResult?.spreadsheetId) {
            setSpreadsheetId(sheetResult.spreadsheetId);
          }
        } catch (err: any) {
          console.error("Sheets append error:", err);
          sheetErr = err.message || String(err);
        }
      }

      setSubmitting(false);
      setName('');
      setEmail('');
      setMessage('');

      if (hasActiveToken) {
        if (gmailSucceeded && sheetsSucceeded) {
          onOpenToast(
            `Inquiry saved to Firestore, sent via Formspree, and recorded in Google Sheets!`,
            "success"
          );
        } else {
          onOpenToast(
            `Inquiry saved & sent successfully via Formspree! Google Sheet sync failed: ${sheetErr || 'Unknown error'}`,
            "success"
          );
        }
      } else {
        if (formspreeSucceeded) {
          onOpenToast(
            `Thank you ${name}! Your inquiry has been sent to my inbox and saved securely in the database.`,
            "success"
          );
        } else {
          onOpenToast(
            `Thank you ${name}! Your inquiry has been saved securely to Firestore database.`,
            "success"
          );
        }
      }
    } catch (err: any) {
      console.error("Inquiry submission error:", err);
      setSubmitting(false);
      onOpenToast("Failed to save inquiry. Please try again or use direct email shortcut.", "error");
    }
  };

  const handleUpdateStatus = async (id: string, nextStatus: 'Pending' | 'Reviewed' | 'Archived') => {
    setIsUpdatingStatusId(id);
    try {
      await updateInquiryStatusInFirestore(id, nextStatus);
      onOpenToast(`Inquiry status updated to ${nextStatus}`, "success");
    } catch (err: any) {
      console.error("Failed to update status:", err);
      onOpenToast("Permission Denied: Only verified administrator can edit state.", "error");
    } finally {
      setIsUpdatingStatusId(null);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this inquiry from the database?")) {
      return;
    }
    try {
      await deleteInquiryFromFirestore(id);
      onOpenToast("Inquiry deleted from database.", "success");
    } catch (err: any) {
      console.error("Failed to delete:", err);
      onOpenToast("Permission Denied: Only verified administrator can delete entries.", "error");
    }
  };

  const filteredInquiries = inquiries.filter(item => {
    if (statusFilter === 'All') return true;
    return item.status === statusFilter;
  });

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0C0C0C] border-b border-white/5 relative overflow-hidden text-[#FAF6F0]">
      {/* Decorative background light */}
      <div className="absolute top-1/2 left-1/3 w-[450px] h-[450px] rounded-full bg-white/2 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        {/* Info Column */}
        <div className="space-y-8 flex flex-col items-center w-full">
          <div className="space-y-4 text-center">
            <motion.span
              initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/50 flex items-center justify-center gap-2"
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Direct Bookings
            </motion.span>
            
            <motion.h2
              initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="text-4xl sm:text-5xl font-sans font-black tracking-tight text-white leading-tight"
            >
              Let's construct <br />
              <span className="italic font-light text-stone-400 opacity-95">your design system.</span>
            </motion.h2>
          </div>
          
          <motion.p
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-white/70 text-sm sm:text-base text-center leading-relaxed font-light font-sans max-w-xl"
          >
            Reach out to me directly or fill out the strategic inquiry form below to schedule a private design consultation or custom branding brief.
          </motion.p>

          {/* Form wrapper */}
          <motion.form
            id="portfolio-contact-form"
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            onSubmit={handleSubmit}
            className="w-full max-w-lg liquid-glass p-8 border border-white/10 bg-white/2 rounded-3xl space-y-6 text-left mt-8"
          >
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-wider text-white/50 font-bold flex items-center gap-2">
                <User className="w-3.5 h-3.5" />
                Your Coordinate Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jacqueline Vance"
                className="w-full bg-[#121212] border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-[#FAF6F0] focus:outline-none focus:border-white/30 placeholder-stone-500 transition-all font-sans"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-wider text-white/50 font-bold flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. j.vance@studio.com"
                className="w-full bg-[#121212] border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-[#FAF6F0] focus:outline-none focus:border-white/30 placeholder-stone-500 transition-all font-sans"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-wider text-white/50 font-bold flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5" />
                Brief description of your project
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your brand vision, core objectives, and timeline constraints..."
                rows={4}
                className="w-full bg-[#121212] border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-[#FAF6F0] focus:outline-none focus:border-white/30 placeholder-stone-500 transition-all font-sans resize-none"
              />
            </div>

            {/* Google Workspace Integration Status (Admin Only) */}
            {isAdminMode && (
              <div className="pt-4 pb-4 px-5 rounded-2xl bg-white/2 border border-white/5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${gmailUser && token ? 'bg-emerald-500 animate-pulse' : 'bg-stone-500'}`} />
                    <span className="text-[10px] font-sans font-medium text-white/70 uppercase tracking-wider">
                      {gmailUser && token ? 'Google Workspace Active' : gmailUser ? 'Workspace Offline (Reconnect)' : 'Google Workspace Offline'}
                    </span>
                  </div>
                  {gmailUser && token ? (
                    <button
                      type="button"
                      onClick={handleDisconnectGmail}
                      className="text-[9px] uppercase tracking-wider text-stone-400 hover:text-white underline transition-colors cursor-pointer"
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleConnectGmail}
                      disabled={isLoggingIn}
                      className="text-[9px] uppercase tracking-wider text-white hover:text-white/80 font-bold underline transition-colors cursor-pointer"
                    >
                      {isLoggingIn ? 'Connecting...' : gmailUser ? 'Reconnect' : 'Connect'}
                    </button>
                  )}
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed font-sans font-light">
                  {gmailUser && token 
                    ? `Submissions will send real email notifications to ${gmailUser.email} and instantly log them in your connected Google Sheet.`
                    : 'Connect your Google account to automatically receive email notifications AND log inquiries directly to a Google Sheet.'
                  }
                </p>
                {gmailUser && spreadsheetId && (
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-white/50">Tracking Spreadsheet:</span>
                    <a
                      href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <TableProperties className="w-3.5 h-3.5" />
                      Open Google Sheet
                    </a>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full group flex items-center justify-center gap-3 bg-white text-stone-950 hover:bg-white/90 font-bold tracking-[0.2em] text-[10px] uppercase py-4 rounded-full transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? 'Transmitting Inquiries...' : 'Send Consultation Request'}
              <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.form>

          {/* Secure Live Inquiries Panel (Admin Only) */}
          <AnimatePresence>
            {isAdminMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full mt-12 pt-12 border-t border-white/10 space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
                      <Inbox className="w-5 h-5 text-orange-500" />
                      Inbound Client Inquiries
                      <span className="text-xs bg-white/10 text-stone-300 px-2 py-0.5 rounded-full font-mono font-medium">
                        {inquiries.length}
                      </span>
                    </h3>
                    <p className="text-xs text-stone-400 font-light">
                      Live data stream secured by Firestore attribute-based access controls.
                    </p>
                  </div>

                  {/* Filter Toolbar */}
                  <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 p-1 rounded-full">
                    {(['All', 'Pending', 'Reviewed', 'Archived'] as const).map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setStatusFilter(filter)}
                        className={`text-[9px] uppercase tracking-wider px-3 py-1.5 rounded-full font-bold transition-all ${
                          statusFilter === filter
                            ? 'bg-white text-stone-950 shadow-sm'
                            : 'text-stone-400 hover:text-white'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inquiry Cards Grid */}
                {filteredInquiries.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl text-stone-500 text-xs">
                    No client inquiries found matching filter: "{statusFilter}"
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredInquiries.map((inquiry) => (
                      <motion.div
                        key={inquiry.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-5 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between gap-4 relative group"
                      >
                        <div className="space-y-2">
                          {/* Header row */}
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="text-sm font-semibold text-white font-sans tracking-tight">
                                {inquiry.name}
                              </h4>
                              <a 
                                href={`mailto:${inquiry.email}`}
                                className="text-[10px] text-stone-400 underline hover:text-stone-200 transition-colors block"
                              >
                                {inquiry.email}
                              </a>
                            </div>

                            {/* Status Pill */}
                            <span className={`text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-full border font-bold ${
                              inquiry.status === 'Pending'
                                ? 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                                : inquiry.status === 'Reviewed'
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                : 'bg-stone-500/10 text-stone-400 border-white/10'
                            }`}>
                              {inquiry.status}
                            </span>
                          </div>

                          {/* Message */}
                          <p className="text-xs text-stone-300 font-light leading-relaxed line-clamp-4">
                            {inquiry.message}
                          </p>
                        </div>

                        {/* Footer details & Action Buttons */}
                        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[9px] text-stone-500">
                          <span>
                            {new Date(inquiry.timestamp).toLocaleString()}
                          </span>

                          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            {inquiry.status === 'Pending' && (
                              <button
                                type="button"
                                disabled={isUpdatingStatusId === inquiry.id}
                                onClick={() => handleUpdateStatus(inquiry.id, 'Reviewed')}
                                className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-all border border-emerald-500/10 cursor-pointer"
                                title="Mark as Reviewed"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {inquiry.status === 'Reviewed' && (
                              <button
                                type="button"
                                disabled={isUpdatingStatusId === inquiry.id}
                                onClick={() => handleUpdateStatus(inquiry.id, 'Archived')}
                                className="p-1.5 rounded-lg bg-stone-500/10 text-stone-400 hover:bg-white/10 transition-all border border-white/10 cursor-pointer"
                                title="Archive inquiry"
                              >
                                <Archive className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleDeleteInquiry(inquiry.id)}
                              className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all border border-red-500/10 cursor-pointer"
                              title="Delete permanently"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Direct coordinate shortcuts */}
          <div className="space-y-4 pt-12 border-t border-white/10 w-full max-w-md text-center">
            <h4 
              onClick={handleAdminClick}
              className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/50 cursor-pointer select-none hover:text-white/80 transition-colors"
            >
              Direct Channels
            </h4>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-xs">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white/30" />
                <a href="mailto:preciousogunleye07@gmail.com" className="text-white hover:text-white/80 font-bold underline transition-colors">
                  preciousogunleye07@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-white/30" />
                <span className="text-white/60">Hours: 09:00 - 18:00 (GMT+1)</span>
              </p>
            </div>
          </div>

          {/* Privacy note */}
          <div className="flex gap-3 items-center justify-center text-white/40 text-[11px] font-sans pt-4">
            <ShieldCheck className="w-4 h-4 text-white/30" />
            <span>All requests remain fully confidential.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
export { InteractiveForm };
