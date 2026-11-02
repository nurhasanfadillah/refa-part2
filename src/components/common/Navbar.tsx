import React, { useState } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import {
  RotateCcw,
  Database,
  Calendar,
  Layers,
  ChevronDown,
  Trash2
} from 'lucide-react';
import { DateFilter } from '../../types';
import { ClearDataModal } from './ClearDataModal';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    dateFilter,
    setDateFilter,
    resetToDemoData
  } = useFinancial();

  const [showDataMenu, setShowDataMenu] = useState(false);
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showResetDemoNotice, setShowResetDemoNotice] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Ringkasan' },
    { id: 'sales', label: 'Penjualan' },
    { id: 'expenses', label: 'Pengeluaran' },
    { id: 'inventory', label: 'Persediaan' },
    { id: 'finance', label: 'Keuangan' },
    { id: 'opname', label: 'Opname' },
    { id: 'reports', label: 'Laporan' },
    { id: 'master', label: 'Master Data' }
  ];

  const handleDatePreset = (preset: DateFilter['preset']) => {
    setDateFilter({
      preset,
      startDate: '',
      endDate: ''
    });
    setShowDateMenu(false);
  };

  const getDateLabel = () => {
    switch (dateFilter.preset) {
      case 'today':
        return 'Hari Ini';
      case 'this_month':
        return 'Bulan Ini';
      case 'this_year':
        return 'Tahun Ini';
      case 'custom':
        return 'Kustom';
      default:
        return 'Semua Periode';
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-14">
            {/* Zone 1: Single text element wordmark */}
            <button
              onClick={() => setActiveView('dashboard')}
              className="text-base font-bold tracking-tight text-slate-100 hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <span className="font-mono text-amber-500 tracking-tighter">◈</span>
              <span>REDONE FINANCE</span>
            </button>

            {/* Zone 2: Clean single-line text navigation links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-400">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                    activeView === item.id
                      ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                      : 'hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Zone 3: 1 primary action area */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Period Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDateMenu(!showDateMenu)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-md transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{getDateLabel()}</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </button>

                {showDateMenu && (
                  <div className="absolute right-0 mt-1 w-44 bg-slate-900 border border-slate-800 rounded-md shadow-xl py-1 z-50 text-xs">
                    <button
                      onClick={() => handleDatePreset('all')}
                      className="w-full text-left px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-amber-400 cursor-pointer"
                    >
                      Semua Periode (All)
                    </button>
                    <button
                      onClick={() => handleDatePreset('this_month')}
                      className="w-full text-left px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-amber-400 cursor-pointer"
                    >
                      Bulan Berjalan (Okt/Nov 2026)
                    </button>
                    <button
                      onClick={() => handleDatePreset('this_year')}
                      className="w-full text-left px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-amber-400 cursor-pointer"
                    >
                      Tahun 2026
                    </button>
                    <button
                      onClick={() => handleDatePreset('today')}
                      className="w-full text-left px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-amber-400 cursor-pointer"
                    >
                      Hari Ini Saja
                    </button>
                  </div>
                )}
              </div>

              {/* Direct Kosongkan Data Trigger */}
              <button
                onClick={() => setShowClearModal(true)}
                title="Buka Fitur Kosongkan Data"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/60 border border-red-900/40 rounded-md transition-colors whitespace-nowrap cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kosongkan Data</span>
              </button>

              {/* Quick Demo Data Manager */}
              <div className="relative">
                <button
                  onClick={() => setShowDataMenu(!showDataMenu)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Opsi Data</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {showDataMenu && (
                  <div className="absolute right-0 mt-1 w-56 bg-slate-900 border border-slate-800 rounded-md shadow-xl py-1 z-50 text-xs">
                    <div className="px-3 py-2 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                      MANAJEMEN DATABASE
                    </div>
                    <button
                      onClick={() => {
                        resetToDemoData();
                        setShowDataMenu(false);
                        setShowResetDemoNotice(true);
                        setTimeout(() => setShowResetDemoNotice(false), 3000);
                      }}
                      className="w-full text-left px-3 py-2 text-slate-200 hover:bg-slate-800 hover:text-amber-400 flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      Reset ke Demo Indonesia
                    </button>
                    <button
                      onClick={() => {
                        setShowDataMenu(false);
                        setShowClearModal(true);
                      }}
                      className="w-full text-left px-3 py-2 text-red-400 hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      Kosongkan Data (Mulai Baru)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Toast Notification for Reset Demo */}
      {showResetDemoNotice && (
        <div className="fixed top-16 right-4 z-50 p-3 bg-emerald-950 border border-emerald-500/40 text-emerald-300 rounded-md text-xs shadow-xl animate-fade-in flex items-center gap-2">
          <span>Dataset simulasi bisnis Indonesia berhasil dimuat ulang!</span>
        </div>
      )}

      {/* Modal Kosongkan Data */}
      <ClearDataModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
      />
    </>
  );
};

