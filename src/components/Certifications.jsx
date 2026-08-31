import React, { useState } from 'react';
import { Award, ExternalLink, Eye, CheckCircle2, ShieldCheck, X, FileText } from 'lucide-react';
import { certificatesData } from '../data/portfolioData';

export default function Certifications() {
  const [filter, setFilter] = useState('ALL'); // 'ALL', 'HIGH_VALUE', 'RELEVANT'
  const [selectedCert, setSelectedCert] = useState(null);

  const filteredCerts = certificatesData.filter(cert => {
    if (filter === 'HIGH_VALUE') return cert.category === 'HIGH_VALUE';
    if (filter === 'RELEVANT') return cert.category === 'RELEVANT';
    return true;
  });

  const handleViewCertificate = (cert) => {
    // Open the actual PDF certificate file directly in a new browser tab
    window.open(cert.certificateFile, '_blank', 'noopener,noreferrer');
    // Also open modal preview
    setSelectedCert(cert);
  };

  return (
    <section id="certifications" className="section-padding bg-white border-b border-slate-200">
      <div className="site-container space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-accentOrange font-extrabold">
              Verified Technical Qualifications
            </span>
            <h2 className="section-title font-extrabold text-textPrimary tracking-tight mt-1">
              Certifications & Credentials
            </h2>
            <p className="text-sm text-textSecondary mt-1 max-w-2xl">
              Authentic certifications earned across Meta, IIT Bombay, Coursera, IBM, Red Hat, MongoDB, NPTEL, and Saylor Academy.
            </p>
            <div className="w-12 h-1 bg-accentOrange rounded-full mt-3" />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto text-xs font-semibold">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'ALL'
                  ? 'bg-white text-textPrimary shadow-sm border border-slate-200 font-bold'
                  : 'text-textSecondary hover:text-textPrimary'
              }`}
            >
              All ({certificatesData.length})
            </button>

            <button
              onClick={() => setFilter('HIGH_VALUE')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'HIGH_VALUE'
                  ? 'bg-orange-500 text-white shadow-sm font-bold'
                  : 'text-textSecondary hover:text-textPrimary'
              }`}
            >
              High Value ({certificatesData.filter(c => c.category === 'HIGH_VALUE').length})
            </button>

            <button
              onClick={() => setFilter('RELEVANT')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'RELEVANT'
                  ? 'bg-slate-900 text-white shadow-sm font-bold'
                  : 'text-textSecondary hover:text-textPrimary'
              }`}
            >
              Relevant ({certificatesData.filter(c => c.category === 'RELEVANT').length})
            </button>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="light-card p-5 sm:p-6 flex flex-col justify-between space-y-4 bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                {/* Header Badge & Date */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full ${
                    cert.category === 'HIGH_VALUE'
                      ? 'bg-orange-50 text-orange-700 border border-orange-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {cert.badge || cert.issuer}
                  </span>
                  <span className="text-[11px] font-mono text-textSecondary font-semibold">
                    {cert.date}
                  </span>
                </div>

                {/* Title & Issuer */}
                <div>
                  <h3 className="text-base font-extrabold text-textPrimary leading-snug group-hover:text-accentOrange transition-colors break-words">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-textSecondary font-semibold mt-1">
                    Issued by: <span className="text-textPrimary">{cert.issuer}</span>
                  </p>
                </div>

                {/* Credential ID if present */}
                {cert.credentialId && (
                  <div className="text-[11px] font-mono text-slate-600 bg-slate-50 p-2 rounded-md border border-slate-100 flex items-center justify-between">
                    <span className="truncate">ID: <strong className="text-slate-800">{cert.credentialId}</strong></span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />
                  </div>
                )}

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(cert.skills || []).slice(0, 4).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                  {(cert.skills || []).length > 4 && (
                    <span className="text-[10px] text-slate-400 font-mono self-center">
                      +{(cert.skills || []).length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                {/* View Certificate Button (Opens PDF in New Tab + Modal Preview) */}
                <button
                  onClick={() => handleViewCertificate(cert)}
                  className="btn-secondary-light flex-1 text-xs py-2 justify-center"
                  title="Open Certificate PDF in New Tab"
                >
                  <Eye className="w-3.5 h-3.5 text-accentOrange" />
                  <span>View Certificate</span>
                </button>

                {/* Genuine Verify Certificate Button ONLY when URL exists */}
                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-orange-50 text-accentOrange border border-orange-200 hover:bg-accentOrange hover:text-white transition-all shrink-0"
                    title="Verify Genuine Certificate Credential"
                    aria-label="Verify Certificate"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* CERTIFICATE VIEWER MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50 gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-accentOrange">
                    {selectedCert.issuer}
                  </span>
                  {selectedCert.credentialId && (
                    <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                      ID: {selectedCert.credentialId}
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-textPrimary leading-snug break-words">
                  {selectedCert.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-lg hover:bg-slate-200 text-slate-600 transition-colors shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Certificate Viewer (PDF Object Embed with Fallback) */}
            <div className="flex-1 bg-slate-100 p-2 sm:p-4 overflow-auto min-h-[320px] sm:min-h-[450px] flex justify-center items-center">
              <object
                data={selectedCert.certificateFile}
                type="application/pdf"
                className="w-full h-full min-h-[350px] sm:min-h-[500px] rounded-lg border border-slate-300 bg-white"
              >
                <div className="p-6 sm:p-8 text-center space-y-4">
                  <FileText className="w-12 h-12 text-slate-400 mx-auto" />
                  <p className="text-sm text-textSecondary">
                    Preview rendered in separate tab or window.
                  </p>
                  <a
                    href={selectedCert.certificateFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-orange text-xs py-2 px-4 inline-flex"
                  >
                    <span>Open Certificate PDF</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </object>
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white text-xs font-mono">
              <div className="flex items-center gap-2 text-textSecondary font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Recipient: {personalInfo.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedCert.certificateFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-light text-xs py-2 px-3"
                >
                  <Eye className="w-3.5 h-3.5 text-accentOrange" />
                  <span>Open Full PDF</span>
                </a>

                {selectedCert.verificationUrl && (
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-orange text-xs py-2 px-3"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
