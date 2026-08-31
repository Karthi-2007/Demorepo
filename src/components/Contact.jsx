import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Linkedin, Github, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import LeetCodeIcon from './LeetCodeIcon';

export default function Contact() {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
    successMessage: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.error) {
      setStatus(prev => ({ ...prev, error: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validate fields
    const nameTrimmed = formData.from_name.trim();
    const emailTrimmed = formData.from_email.trim();
    const messageTrimmed = formData.message.trim();

    if (!nameTrimmed || !emailTrimmed || !messageTrimmed) {
      setStatus(prev => ({ ...prev, error: 'Please complete all required fields.' }));
      return;
    }

    // 2. Validate email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      setStatus(prev => ({ ...prev, error: 'Please enter a valid email address.' }));
      return;
    }

    // 3. Read environment variables dynamically
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        submitting: false,
        submitted: false,
        error: 'Email service configuration is incomplete in environment variables.',
        successMessage: null
      });
      return;
    }

    // 4. Set loading state & disable button
    setStatus({ submitting: true, submitted: false, error: null, successMessage: null });

    const templateParams = {
      from_name: nameTrimmed,
      from_email: emailTrimmed,
      message: messageTrimmed,
      to_name: personalInfo.name
    };

    try {
      // 5. Send via EmailJS SDK
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (response.status === 200 || response.text === 'OK') {
        setFormData({ from_name: '', from_email: '', message: '' });
        setStatus({
          submitting: false,
          submitted: true,
          error: null,
          successMessage: "✓ Message sent successfully! I'll get back to you soon."
        });
      } else {
        throw new Error(`EmailJS status code ${response.status}`);
      }
    } catch (err) {
      console.error('EmailJS Submission Error:', err);
      // Keep entered form data intact
      setStatus({
        submitting: false,
        submitted: false,
        error: '✕ Message could not be sent. Please try again or contact me directly by email.',
        successMessage: null
      });
    }
  };

  return (
    <section id="contact" className="section-padding bg-white border-b border-slate-200">
      <div className="site-container space-y-10">
        
        {/* Section Title */}
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-accentOrange font-extrabold">
            Get In Touch
          </span>
          <h2 className="section-title font-extrabold text-textPrimary tracking-tight mt-1">
            Let's build something together.
          </h2>
          <div className="w-12 h-1 bg-accentOrange rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Developer Profiles Section */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <h3 className="text-lg font-extrabold text-textPrimary">Developer Profiles</h3>
              <p className="text-xs text-slate-600 font-mono mt-0.5">
                Explore my coding activity and professional profiles.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              
              {/* CARD 1: GitHub */}
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[76px] p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-400 hover:-translate-y-0.5 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-slate-900 group-hover:text-accentOrange transition-colors">
                      GitHub
                    </h4>
                    <p className="text-sm text-slate-600 font-mono font-medium">
                      @Karthi-2007
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-accentOrange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* CARD 2: LeetCode */}
              <a
                href={personalInfo.socialLinks.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[76px] p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-400 hover:-translate-y-0.5 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
                    <LeetCodeIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">
                      LeetCode
                    </h4>
                    <p className="text-sm text-slate-600 font-mono font-medium">
                      @AfgkZ9Jo50
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-amber-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* CARD 3: LinkedIn */}
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[76px] p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-400 hover:-translate-y-0.5 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                      LinkedIn
                    </h4>
                    <p className="text-sm text-slate-600 font-mono font-medium">
                      @karthikeyan-s
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-sky-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* CARD 4: Email */}
              <a
                href={`mailto:${personalInfo.socialLinks.email}`}
                className="w-full min-h-[76px] p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-400 hover:-translate-y-0.5 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200 text-accentOrange flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-semibold text-slate-900 group-hover:text-accentOrange transition-colors">
                      Email
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-mono font-medium truncate">
                      {personalInfo.socialLinks.email}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-accentOrange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 ml-2" />
              </a>

            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="light-card p-6 space-y-4 bg-white">
              <h3 className="text-lg font-extrabold text-textPrimary">Send Me a Message</h3>

              {status.submitted && status.successMessage ? (
                <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-3 text-center animate-fade-in">
                  <CheckCircle2 className="w-7 h-7 mx-auto text-emerald-600" />
                  <p className="font-extrabold text-sm sm:text-base text-emerald-900">{status.successMessage}</p>
                  <button
                    onClick={() => setStatus({ submitting: false, submitted: false, error: null, successMessage: null })}
                    className="btn-secondary-light text-xs mt-2 py-1.5 px-4"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs" noValidate>
                  
                  {status.error && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2.5 leading-relaxed">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                      <span>{status.error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="from_name" className="block text-slate-700 font-mono mb-1 font-bold">
                        Name <span className="text-accentOrange">*</span>
                      </label>
                      <input
                        type="text"
                        id="from_name"
                        name="from_name"
                        autoComplete="name"
                        value={formData.from_name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        disabled={status.submitting}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-accentOrange focus:bg-white text-xs transition-all disabled:opacity-50"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="from_email" className="block text-slate-700 font-mono mb-1 font-bold">
                        Email <span className="text-accentOrange">*</span>
                      </label>
                      <input
                        type="email"
                        id="from_email"
                        name="from_email"
                        autoComplete="email"
                        value={formData.from_email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        disabled={status.submitting}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-accentOrange focus:bg-white text-xs transition-all disabled:opacity-50"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-slate-700 font-mono mb-1 font-bold">
                      Message <span className="text-accentOrange">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      autoComplete="off"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or opportunity..."
                      disabled={status.submitting}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-accentOrange focus:bg-white text-xs transition-all resize-none disabled:opacity-50"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="btn-primary-orange w-full py-3 justify-center text-xs font-extrabold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status.submitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5 text-white" />
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
