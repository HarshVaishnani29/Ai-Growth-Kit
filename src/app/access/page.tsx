'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Folder,
  FolderPlus,
  UploadCloud,
  Download,
  Trash2,
  Search,
  FileText,
  FileSpreadsheet,
  FileArchive,
  FileCode,
  FileCheck,
  FileQuestion,
  MoreVertical,
  Check,
  Copy,
  Clock,
  ShieldCheck,
  Lock,
  Unlock,
  AlertTriangle,
  RefreshCw,
  HardDrive,
  CheckSquare,
  Square,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  X,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FileItem {
  id: string;
  name: string;
  isFolder: boolean;
  size: number;
  formattedSize: string;
  date: string;
  formattedDate: string;
  extension: string;
  fileType: string;
  downloadUrl: string | null;
  isPrimary?: boolean;
}

interface StorageStats {
  usedBytes: number;
  usedFormatted: string;
  maxBytes: number;
  maxFormatted: string;
  freeFormatted: string;
  usedPercentage: number;
  storageMethod: string;
}

function AccessFileManagerContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get('code') || '';
  const initialEmail = searchParams.get('email') || '';

  // Auth & Passcode State
  const [code, setCode] = useState(initialCode);
  const [email, setEmail] = useState(initialEmail);
  const [isVerifying, setIsVerifying] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(600);
  const [copiedLicense, setCopiedLicense] = useState(false);

  // File Manager State
  const [files, setFiles] = useState<FileItem[]>([]);
  const [storage, setStorage] = useState<StorageStats | null>(null);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Modals State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-dismiss notification after 4s
  useEffect(() => {
    if (actionNotice) {
      const t = setTimeout(() => setActionNotice(null), 4000);
      return () => clearTimeout(t);
    }
  }, [actionNotice]);

  // Verify access code
  const handleVerify = async (codeToVerify?: string, emailToVerify?: string) => {
    const targetCode = (codeToVerify || code).trim().toUpperCase();
    const targetEmail = (emailToVerify || email).trim();

    if (!targetCode) {
      setAuthError('Please enter your 10-minute access passcode.');
      return;
    }

    setIsVerifying(true);
    setAuthError('');

    try {
      const res = await fetch('/api/access/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: targetCode, email: targetEmail }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Verification failed');
      }

      setIsUnlocked(true);
      setOrder(data.order);
      setSecondsLeft(data.order?.remainingSeconds || 600);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      fetchFiles();
    } catch (err: any) {
      setAuthError(err.message || 'Invalid or expired access code.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Auto-verify if code query parameter exists
  useEffect(() => {
    if (initialCode) {
      handleVerify(initialCode, initialEmail);
    }
  }, [initialCode]);

  // Countdown timer for 10-minute validity
  useEffect(() => {
    if (!isUnlocked || secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isUnlocked, secondsLeft]);

  // Fetch file list & storage stats from backend
  const fetchFiles = async (subPath = currentPath) => {
    setIsLoadingFiles(true);
    try {
      const res = await fetch(`/api/files?path=${encodeURIComponent(subPath)}`);
      const data = await res.json();
      if (data.success) {
        setFiles(data.items || []);
        setStorage(data.storage);
        setSelectedItems([]);
      }
    } catch (e) {
      console.error('Failed to fetch files:', e);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  // Trigger file fetch once unlocked
  useEffect(() => {
    if (isUnlocked) {
      fetchFiles(currentPath);
    }
  }, [isUnlocked, currentPath]);

  // Format timer
  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Toggle selection
  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredFiles.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredFiles.map((f) => f.id));
    }
  };

  // Handle delete
  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return;
    const confirm = window.confirm(
      `Are you sure you want to delete ${selectedItems.length} selected item(s)?`
    );
    if (!confirm) return;

    try {
      const res = await fetch('/api/files', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ names: selectedItems, path: currentPath }),
      });
      const data = await res.json();
      if (data.success) {
        setActionNotice(`Deleted ${data.deleted.length} item(s)`);
        fetchFiles(currentPath);
      } else {
        alert(data.message || 'Failed to delete');
      }
    } catch (e: any) {
      alert(e.message || 'Error deleting files');
    }
  };

  // Handle create folder
  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    try {
      const res = await fetch('/api/files/folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderName: newFolderName.trim(), path: currentPath }),
      });
      const data = await res.json();
      if (data.success) {
        setActionNotice(`Folder "${data.folderName}" created successfully.`);
        setShowFolderModal(false);
        setNewFolderName('');
        fetchFiles(currentPath);
      } else {
        alert(data.message || 'Failed to create folder');
      }
    } catch (e: any) {
      alert(e.message || 'Error creating folder');
    }
  };

  // Handle 50MB file upload
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      setUploadError('Please select a file to upload.');
      return;
    }

    if (uploadFile.size > 50 * 1024 * 1024) {
      setUploadError('File exceeds 50 MB free limit. Please choose a file under 50 MB.');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('path', currentPath);

      const res = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to upload file');
      }

      setActionNotice(`Uploaded "${data.file.name}" (${data.file.formattedSize})`);
      setShowUploadModal(false);
      setUploadFile(null);
      fetchFiles(currentPath);
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  // Copy license
  const handleCopyLicense = () => {
    if (order?.licenseKey) {
      navigator.clipboard.writeText(order.licenseKey);
      setCopiedLicense(true);
      setTimeout(() => setCopiedLicense(false), 2000);
    }
  };

  // Get file icon based on type
  const renderFileIcon = (type: string, isFolder: boolean) => {
    if (isFolder) {
      return (
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'rgba(99, 102, 241, 0.15)',
          color: '#818cf8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Folder size={18} fill="#818cf8" fillOpacity={0.2} />
        </div>
      );
    }

    switch (type) {
      case 'word':
        return (
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(37, 99, 235, 0.18)',
            color: '#60a5fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileText size={18} />
          </div>
        );
      case 'pdf':
        return (
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#f87171',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileCheck size={18} />
          </div>
        );
      case 'excel':
        return (
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#34d399',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileSpreadsheet size={18} />
          </div>
        );
      case 'archive':
        return (
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(245, 158, 11, 0.15)',
            color: '#fbbf24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileArchive size={18} />
          </div>
        );
      default:
        return (
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(148, 163, 184, 0.15)',
            color: '#cbd5e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileQuestion size={18} />
          </div>
        );
    }
  };

  // Filter files by search
  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      minHeight: '90vh',
      backgroundColor: '#0c0e18',
      color: '#e2e8f0',
      padding: '40px 16px 80px 16px',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>

        {/* Global Toast Notification */}
        {actionNotice && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            border: '1px solid #f97316',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            fontWeight: 700
          }}>
            <Check size={18} color="#f97316" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Top Navbar Return Link */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: '#94a3b8',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'color 0.2s'
            }}
          >
            <ArrowLeft size={16} />
            <span>Return to Homepage</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              color: '#10b981',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '4px 12px',
              borderRadius: '999px',
              fontWeight: 800
            }}>
              <ShieldCheck size={13} />
              <span>10-Minute Anti-Piracy Secure Vault</span>
            </div>
          </div>
        </div>

        {/* STATE 1: LOCKED PASSCODE VERIFICATION */}
        {!isUnlocked && (
          <div style={{
            background: '#131627',
            borderRadius: '20px',
            border: '1px solid rgba(249, 115, 22, 0.35)',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8)',
            maxWidth: '560px',
            margin: '40px auto',
            padding: '44px 32px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              boxShadow: '0 10px 30px rgba(249, 115, 22, 0.4)'
            }}>
              <Lock size={32} />
            </div>

            <h1 style={{ fontSize: '26px', fontWeight: 900, marginBottom: '8px', color: '#fff' }}>
              Member Digital Access Vault
            </h1>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '28px' }}>
              Enter your unique <b>10-minute access passcode</b> to authenticate your license and unlock the full File Manager and Gujarati Master Kit.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleVerify();
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#f97316', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  10-MINUTE PASSCODE *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BDH-630434"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  style={{
                    width: '100%',
                    background: '#0a0d18',
                    border: '2px solid rgba(249, 115, 22, 0.35)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    color: '#f97316',
                    fontSize: '18px',
                    fontWeight: 900,
                    letterSpacing: '0.12em',
                    fontFamily: 'monospace',
                    outline: 'none',
                    textAlign: 'center'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  REGISTERED EMAIL (OPTIONAL)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0a0d18',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    color: '#fff',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>

              {authError && (
                <div style={{
                  padding: '12px 14px',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  color: '#fca5a5',
                  fontSize: '12px',
                  lineHeight: 1.5
                }}>
                  <AlertTriangle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying || !code.trim()}
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '15px',
                  fontWeight: 900,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  color: '#fff',
                  border: 'none',
                  cursor: isVerifying ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 25px rgba(249, 115, 22, 0.4)',
                  marginTop: '8px'
                }}
              >
                {isVerifying ? (
                  <span>Authenticating Security Code...</span>
                ) : (
                  <>
                    <Unlock size={18} />
                    <span>Unlock & Open File Manager</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setCode('BDH-DEMO');
                  handleVerify('BDH-DEMO', email || 'harsh@businessdatahub.com');
                }}
                style={{
                  width: '100%',
                  padding: '11px',
                  background: 'rgba(249, 115, 22, 0.1)',
                  border: '1px dashed rgba(249, 115, 22, 0.45)',
                  borderRadius: '10px',
                  color: '#f97316',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'background 0.2s'
                }}
              >
                <Sparkles size={14} />
                <span>1-Click Test Demo Access (BDH-DEMO)</span>
              </button>
            </form>

            <div style={{
              marginTop: '24px',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px dashed rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              fontSize: '11px',
              color: '#64748b',
              lineHeight: 1.5
            }}>
              🔒 <b>Anti-Piracy Policy:</b> Passcodes strictly expire in 10 minutes from creation to protect course integrity and prevent illegal sharing.
            </div>
          </div>
        )}

        {/* STATE 2: AWESOME FILE MANAGER INTERFACE */}
        {isUnlocked && order && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Top License & Timer Bar */}
            <div style={{
              background: '#131627',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '18px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: '#34d399',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Unlock size={20} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}>
                      Licensed to: {order.customerName}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      background: 'rgba(16, 185, 129, 0.2)',
                      color: '#34d399',
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}>
                      VERIFIED BUYER
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>License: <code style={{ color: '#f97316' }}>{order.licenseKey}</code></span>
                    <button
                      type="button"
                      onClick={handleCopyLicense}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '2px',
                        fontSize: '10px'
                      }}
                    >
                      {copiedLicense ? <Check size={11} color="#10b981" /> : <Copy size={11} />}
                      <span>{copiedLicense ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Countdown Timer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: secondsLeft > 60 ? 'rgba(249, 115, 22, 0.12)' : 'rgba(239, 68, 68, 0.2)',
                border: `1px solid ${secondsLeft > 60 ? 'rgba(249, 115, 22, 0.35)' : 'rgba(239, 68, 68, 0.4)'}`,
                padding: '8px 16px',
                borderRadius: '10px'
              }}>
                <Clock size={16} color={secondsLeft > 60 ? '#f97316' : '#f87171'} />
                <div>
                  <div style={{ fontSize: '9px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Active 10-Min Session
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 900, color: secondsLeft > 60 ? '#f97316' : '#f87171', fontFamily: 'monospace' }}>
                    {formatTimer(secondsLeft)} Remaining
                  </div>
                </div>
              </div>
            </div>

            {/* Awesome File Manager Container */}
            <div style={{
              background: '#131627',
              borderRadius: '18px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)'
            }}>

              {/* Header Title Section (matching user image) */}
              <div style={{
                padding: '24px 28px 16px 28px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(249, 115, 22, 0.35)'
                  }}>
                    <Folder size={24} fill="#fff" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', margin: 0 }}>
                      File Manager
                    </h2>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0 0' }}>
                      Browse, download, and manage your course documents & digital assets.
                    </p>
                  </div>
                </div>

                {/* Storage Quota Bar */}
                {storage && (
                  <div style={{
                    background: '#0d101d',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '10px 16px',
                    minWidth: '240px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px' }}>
                      <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <HardDrive size={13} color="#f97316" />
                        Free Storage (50 MB Limit)
                      </span>
                      <span style={{ color: '#fff', fontWeight: 700 }}>
                        {storage.usedFormatted} / {storage.maxFormatted}
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '999px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${Math.max(4, storage.usedPercentage)}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #10b981 0%, #f97316 100%)',
                        borderRadius: '999px'
                      }} />
                    </div>
                    <div style={{ fontSize: '10px', color: '#10b981', marginTop: '4px', fontWeight: 600 }}>
                      ✓ {storage.freeFormatted} available • 100% Free Storage Engine
                    </div>
                  </div>
                )}
              </div>

              {/* Sub-Header Toolbar (matching user image layout) */}
              <div style={{
                padding: '16px 28px',
                background: '#0f1222',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                {/* Left: Breadcrumbs & Selection */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={toggleSelectAll}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: selectedItems.length > 0 ? '#f97316' : '#64748b',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 0
                    }}
                    title="Select All"
                  >
                    {selectedItems.length > 0 && selectedItems.length === filteredFiles.length ? (
                      <CheckSquare size={18} />
                    ) : (
                      <Square size={18} />
                    )}
                  </button>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    color: '#94a3b8',
                    fontFamily: 'monospace'
                  }}>
                    <span
                      onClick={() => setCurrentPath('')}
                      style={{ cursor: 'pointer', color: currentPath ? '#f97316' : '#cbd5e1', fontWeight: 600 }}
                    >
                      / home
                    </span>
                    <span>/</span>
                    <span
                      onClick={() => setCurrentPath('')}
                      style={{ cursor: 'pointer', color: currentPath ? '#f97316' : '#cbd5e1', fontWeight: 600 }}
                    >
                      container
                    </span>
                    {currentPath && (
                      <>
                        <span>/</span>
                        <span style={{ color: '#fff', fontWeight: 700 }}>{currentPath}</span>
                      </>
                    )}
                    <span>/</span>
                  </div>
                </div>

                {/* Right: Search & Action Buttons (matching screenshot) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  {/* Search bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#1a1e36',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '8px 14px',
                    width: '220px'
                  }}>
                    <Search size={15} color="#94a3b8" />
                    <input
                      type="text"
                      placeholder="Search files..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        fontSize: '12px',
                        outline: 'none',
                        width: '100%'
                      }}
                    />
                  </div>

                  {/* Red Delete Button (active if items selected) */}
                  <button
                    type="button"
                    onClick={handleDeleteSelected}
                    disabled={selectedItems.length === 0}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: selectedItems.length > 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      border: selectedItems.length > 0 ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: selectedItems.length > 0 ? '#ef4444' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: selectedItems.length > 0 ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s'
                    }}
                    title={`Delete Selected (${selectedItems.length})`}
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* New Folder Button */}
                  <button
                    type="button"
                    onClick={() => setShowFolderModal(true)}
                    style={{
                      height: '38px',
                      padding: '0 12px',
                      borderRadius: '10px',
                      background: 'rgba(249, 115, 22, 0.15)',
                      border: '1px solid rgba(249, 115, 22, 0.4)',
                      color: '#f97316',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    title="Create New Folder"
                  >
                    <FolderPlus size={16} />
                    <span>New Folder</span>
                  </button>

                  {/* Orange Upload Button (50MB Engine) */}
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(true)}
                    style={{
                      height: '38px',
                      padding: '0 14px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                      border: 'none',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(249, 115, 22, 0.35)',
                      transition: 'all 0.2s'
                    }}
                    title="Upload File (up to 50MB)"
                  >
                    <UploadCloud size={16} />
                    <span>Upload</span>
                  </button>

                  {/* Orange Direct Master Download */}
                  <a
                    href="/api/access/download?asset=all"
                    download="AI_Business_Growth_Kit_Gujarati.docx"
                    style={{
                      height: '38px',
                      padding: '0 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    title="Download All Toolkit Assets"
                  >
                    <Download size={16} color="#34d399" />
                    <span>Master Download</span>
                  </a>

                  {/* Refresh */}
                  <button
                    type="button"
                    onClick={() => fetchFiles(currentPath)}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    title="Refresh List"
                  >
                    <RefreshCw size={15} className={isLoadingFiles ? 'animate-spin' : ''} />
                  </button>
                </div>
              </div>

              {/* Primary Feature Banner: AI_Business_Growth_Kit_Gujarati.docx */}
              <div style={{
                margin: '20px 28px 10px 28px',
                padding: '16px 20px',
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(249, 115, 22, 0.12) 100%)',
                border: '1px solid rgba(249, 115, 22, 0.35)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)'
                  }}>
                    <FileText size={22} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: '#fff' }}>
                        AI_Business_Growth_Kit_Gujarati.docx
                      </span>
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        background: '#f97316',
                        color: '#fff',
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}>
                        PRIMARY MASTER FILE
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                      Official Gujarati Master Edition Document (44 KB) • Full Business & Instagram AI Playbook
                    </div>
                  </div>
                </div>

                <a
                  href="/api/access/download?asset=gujarati_docx"
                  download="AI_Business_Growth_Kit_Gujarati.docx"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 6px 20px rgba(249, 115, 22, 0.4)'
                  }}
                >
                  <Download size={16} />
                  <span>Download Gujarati Kit (.docx)</span>
                </a>
              </div>

              {/* File List Table (matching user screenshot) */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  textAlign: 'left',
                  fontSize: '13px'
                }}>
                  <thead>
                    <tr style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#64748b',
                      fontSize: '11px',
                      textTransform: 'lowercase',
                      letterSpacing: '0.04em'
                    }}>
                      <th style={{ padding: '14px 18px', width: '40px' }}>
                        <Square size={16} style={{ visibility: 'hidden' }} />
                      </th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>
                        name ↓
                      </th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, width: '120px' }}>
                        size ↓
                      </th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, width: '220px' }}>
                        date ↓
                      </th>
                      <th style={{ padding: '14px 18px', textAlign: 'right', width: '100px' }}>
                        actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {isLoadingFiles && (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                          Loading files from secure storage...
                        </td>
                      </tr>
                    )}

                    {!isLoadingFiles && filteredFiles.length === 0 && (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                          No files found. Click <b>Upload</b> above to add files up to 50MB for free!
                        </td>
                      </tr>
                    )}

                    {!isLoadingFiles && filteredFiles.map((file) => {
                      const isSelected = selectedItems.includes(file.id);
                      const isGujaratiMaster = file.name.toLowerCase().includes('gujarati');

                      return (
                        <tr
                          key={file.id}
                          style={{
                            borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                            background: isSelected
                              ? 'rgba(249, 115, 22, 0.08)'
                              : isGujaratiMaster
                              ? 'rgba(37, 99, 235, 0.04)'
                              : 'transparent',
                            transition: 'background 0.15s'
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.background = isGujaratiMaster ? 'rgba(37, 99, 235, 0.04)' : 'transparent';
                            }
                          }}
                        >
                          {/* Checkbox Column */}
                          <td style={{ padding: '14px 18px' }}>
                            <button
                              type="button"
                              onClick={() => toggleSelectItem(file.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: isSelected ? '#f97316' : '#475569',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                padding: 0
                              }}
                            >
                              {isSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                            </button>
                          </td>

                          {/* Name Column */}
                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              {renderFileIcon(file.fileType, file.isFolder)}
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  {file.isFolder ? (
                                    <span
                                      onClick={() => setCurrentPath(file.name)}
                                      style={{
                                        color: '#fff',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        textDecoration: 'none'
                                      }}
                                    >
                                      {file.name}
                                    </span>
                                  ) : (
                                    <a
                                      href={file.downloadUrl || `/api/access/download?file=${encodeURIComponent(file.name)}`}
                                      download={file.name}
                                      style={{
                                        color: isGujaratiMaster ? '#60a5fa' : '#fff',
                                        fontWeight: 700,
                                        textDecoration: 'none'
                                      }}
                                    >
                                      {file.name}
                                    </a>
                                  )}

                                  {isGujaratiMaster && (
                                    <span style={{
                                      fontSize: '9px',
                                      fontWeight: 800,
                                      background: 'rgba(37, 99, 235, 0.2)',
                                      color: '#60a5fa',
                                      border: '1px solid rgba(37, 99, 235, 0.4)',
                                      padding: '1px 6px',
                                      borderRadius: '4px'
                                    }}>
                                      GUJARATI
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Size Column */}
                          <td style={{ padding: '14px 18px', color: '#94a3b8', fontFamily: 'monospace', fontSize: '12px' }}>
                            {file.formattedSize}
                          </td>

                          {/* Date Column */}
                          <td style={{ padding: '14px 18px', color: '#64748b', fontSize: '12px' }}>
                            {file.formattedDate}
                          </td>

                          {/* Actions Column */}
                          <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', position: 'relative' }}>
                              {!file.isFolder && (
                                <a
                                  href={file.downloadUrl || `/api/access/download?file=${encodeURIComponent(file.name)}`}
                                  download={file.name}
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '8px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: '#cbd5e1',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s'
                                  }}
                                  title="Download"
                                >
                                  <Download size={14} />
                                </a>
                              )}

                              <button
                                type="button"
                                onClick={() => setOpenDropdownId(openDropdownId === file.id ? null : file.id)}
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '8px',
                                  background: 'none',
                                  border: 'none',
                                  color: '#64748b',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <MoreVertical size={16} />
                              </button>

                              {/* Three-dot dropdown menu */}
                              {openDropdownId === file.id && (
                                <div style={{
                                  position: 'absolute',
                                  right: 0,
                                  top: '36px',
                                  zIndex: 50,
                                  background: '#1a1e36',
                                  border: '1px solid rgba(255, 255, 255, 0.12)',
                                  borderRadius: '10px',
                                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)',
                                  minWidth: '150px',
                                  padding: '6px',
                                  textAlign: 'left'
                                }}>
                                  {!file.isFolder && (
                                    <a
                                      href={file.downloadUrl || `/api/access/download?file=${encodeURIComponent(file.name)}`}
                                      download={file.name}
                                      onClick={() => setOpenDropdownId(null)}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '8px 10px',
                                        fontSize: '12px',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        borderRadius: '6px',
                                        transition: 'background 0.15s'
                                      }}
                                    >
                                      <Download size={13} color="#10b981" />
                                      <span>Download</span>
                                    </a>
                                  )}

                                  <button
                                    type="button"
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        window.location.origin + (file.downloadUrl || `/files/${file.name}`)
                                      );
                                      setActionNotice(`Direct link copied for ${file.name}`);
                                      setOpenDropdownId(null);
                                    }}
                                    style={{
                                      width: '100%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '8px',
                                      padding: '8px 10px',
                                      fontSize: '12px',
                                      color: '#94a3b8',
                                      background: 'none',
                                      border: 'none',
                                      textAlign: 'left',
                                      cursor: 'pointer',
                                      borderRadius: '6px'
                                    }}
                                  >
                                    <Copy size={13} />
                                    <span>Copy Link</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={async () => {
                                      setOpenDropdownId(null);
                                      if (window.confirm(`Delete ${file.name}?`)) {
                                        await fetch('/api/files', {
                                          method: 'DELETE',
                                          headers: { 'Content-Type': 'application/json' },
                                          body: JSON.stringify({ names: [file.name], path: currentPath }),
                                        });
                                        fetchFiles(currentPath);
                                      }
                                    }}
                                    style={{
                                      width: '100%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '8px',
                                      padding: '8px 10px',
                                      fontSize: '12px',
                                      color: '#f87171',
                                      background: 'none',
                                      border: 'none',
                                      textAlign: 'left',
                                      cursor: 'pointer',
                                      borderRadius: '6px'
                                    }}
                                  >
                                    <Trash2 size={13} color="#ef4444" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Bonus & Toolkit Modules Section */}
            <div style={{
              background: '#131627',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '24px 28px'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="#f97316" />
                <span>Instant Canva Links & VIP Cloud Access</span>
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '14px'
              }}>
                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 700, textTransform: 'uppercase' }}>
                      CANVA EDITABLE TEMPLATES
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginTop: '4px' }}>
                      50+ Canva Viral Reel & Carousel Templates
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                      Free Canva account compatible. Instant 1-click edit.
                    </div>
                  </div>
                  <a
                    href="https://www.canva.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#fff',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    <span>Open Canva Editor</span>
                    <ExternalLink size={13} />
                  </a>
                </div>

                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 700, textTransform: 'uppercase' }}>
                      VIP BONUS TRAINING
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginTop: '4px' }}>
                      Hook Writing & 3-Second Retention Masterclass
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                      Exclusive HD Video Training on Indian viral patterns.
                    </div>
                  </div>
                  <a
                    href="/api/access/download?asset=bonus3"
                    download="Bonus_Hook_Writing_Masterclass_Access.txt"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      background: 'rgba(249, 115, 22, 0.15)',
                      color: '#f97316',
                      border: '1px solid rgba(249, 115, 22, 0.35)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    <Download size={13} />
                    <span>Download Masterclass Key</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* MODAL 1: 50MB FILE UPLOAD MODAL */}
        {showUploadModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}>
            <div style={{
              background: '#131627',
              border: '1px solid rgba(249, 115, 22, 0.4)',
              borderRadius: '18px',
              maxWidth: '500px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
              position: 'relative'
            }}>
              <button
                type="button"
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadError('');
                  setUploadFile(null);
                }}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <UploadCloud size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0 }}>
                    Upload File
                  </h3>
                  <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>
                    ✓ 50 MB Free Storage Engine • 0 Cloud Costs
                  </div>
                </div>
              </div>

              <form onSubmit={handleUploadSubmit}>
                {/* Drag & Drop Area */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: '2px dashed rgba(249, 115, 22, 0.4)',
                    borderRadius: '14px',
                    padding: '32px 20px',
                    textAlign: 'center',
                    background: 'rgba(249, 115, 22, 0.03)',
                    cursor: 'pointer',
                    marginBottom: '16px'
                  }}
                >
                  <UploadCloud size={36} color="#f97316" style={{ margin: '0 auto 10px auto' }} />
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>
                    {uploadFile ? uploadFile.name : 'Click or Drag file here to upload'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                    {uploadFile
                      ? `${(uploadFile.size / (1024 * 1024)).toFixed(2)} MB selected`
                      : 'Supports .docx, .pdf, .zip, .xlsx, .png, .mp4 (Max 50 MB)'}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadFile(e.target.files[0]);
                        setUploadError('');
                      }
                    }}
                    style={{ display: 'none' }}
                  />
                </div>

                {uploadError && (
                  <div style={{
                    padding: '10px 14px',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    borderRadius: '8px',
                    color: '#fca5a5',
                    fontSize: '12px',
                    marginBottom: '16px'
                  }}>
                    {uploadError}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#fff',
                      border: 'none',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isUploading || !uploadFile}
                    style={{
                      flex: 2,
                      padding: '12px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                      color: '#fff',
                      border: 'none',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: isUploading ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    {isUploading ? (
                      <span>Uploading to Storage...</span>
                    ) : (
                      <>
                        <UploadCloud size={16} />
                        <span>Confirm Upload (50MB Max)</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: CREATE NEW FOLDER MODAL */}
        {showFolderModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}>
            <div style={{
              background: '#131627',
              border: '1px solid rgba(249, 115, 22, 0.4)',
              borderRadius: '18px',
              maxWidth: '440px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
              position: 'relative'
            }}>
              <button
                type="button"
                onClick={() => setShowFolderModal(false)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'rgba(249, 115, 22, 0.15)',
                  color: '#f97316',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FolderPlus size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0 }}>
                    Create Folder
                  </h3>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    Organize your toolkit files & bonus assets
                  </div>
                </div>
              </div>

              <form onSubmit={handleCreateFolder}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#cbd5e1', marginBottom: '6px' }}>
                    FOLDER NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gujarati_Video_Reels"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0a0d18',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setShowFolderModal(false)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#fff',
                      border: 'none',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                      color: '#fff',
                      border: 'none',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function AccessPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316', background: '#0c0e18' }}>
        Loading Secure File Manager...
      </div>
    }>
      <AccessFileManagerContent />
    </Suspense>
  );
}
