import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { dataSources } from '../data/mockData';
import {
  FileText, Smartphone, Link, Users, Zap, Droplets, Wifi, Phone,
  FileCheck, Landmark, Truck, ShoppingBag, Building2, Upload,
  Check, Loader, ArrowRight, CloudUpload
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  FileText, Smartphone, Link, Users, Zap, Droplets, Wifi, Phone,
  FileCheck, Landmark, Truck, ShoppingBag, Building2, Upload,
};

type SourceStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export default function DataConnectionPage() {
  const navigate = useNavigate();
  const [sources, setSources] = useState(dataSources.map(s => ({ ...s, status: s.status as SourceStatus })));
  const [dragOver, setDragOver] = useState(false);

  const connect = useCallback((id: string) => {
    setSources(prev => prev.map(s => s.id === id ? { ...s, status: 'connecting' as SourceStatus } : s));
    const delay = 1500 + Math.random() * 2000;
    setTimeout(() => {
      setSources(prev => prev.map(s => s.id === id ? {
        ...s, status: 'connected' as SourceStatus,
        records: Math.floor(Math.random() * 5000) + 500
      } : s));
    }, delay);
  }, []);

  const connectAll = () => {
    sources.forEach((s, i) => {
      if (s.status === 'disconnected') {
        setTimeout(() => connect(s.id), i * 400);
      }
    });
  };

  const connected = sources.filter(s => s.status === 'connected').length;
  const progress = (connected / sources.length) * 100;

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <Header title="Data Connection" />
        <div className="page-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <div>
              <h2 style={{ marginBottom: 8 }}>Connect Data Sources</h2>
              <p>Link alternate data sources to generate a comprehensive financial profile</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary" onClick={connectAll}>Connect All</button>
              {connected >= 3 && (
                <button className="btn btn-primary" onClick={() => navigate('/ingestion')}>
                  Proceed to Analysis <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="card" style={{ marginBottom: 32, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                Connection Progress — {connected}/{sources.length} sources
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }} className="text-gradient">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            {connected < 3 && (
              <p style={{ fontSize: '0.8125rem', marginTop: 10, color: 'var(--warning)' }}>
                ⚡ Connect at least 3 sources to proceed with AI analysis
              </p>
            )}
          </div>

          {/* Source Grid */}
          <div className="grid grid-4" style={{ marginBottom: 32 }}>
            {sources.filter(s => s.id !== 'csv').map((source, i) => {
              const Icon = iconMap[source.icon] || FileText;
              const isConnecting = source.status === 'connecting';
              const isConnected = source.status === 'connected';
              return (
                <div key={source.id} className="card" style={{
                  cursor: isConnected ? 'default' : 'pointer',
                  borderColor: isConnected ? 'rgba(16,185,129,0.3)' : isConnecting ? 'rgba(245,130,32,0.3)' : undefined,
                  animation: `fadeIn 0.4s ease ${i * 0.05}s both`,
                }} onClick={() => !isConnected && !isConnecting && connect(source.id)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12,
                      background: isConnected ? 'rgba(16,185,129,0.1)' : 'var(--bg-glass-strong)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={20} style={{ color: isConnected ? '#10B981' : 'var(--text-secondary)' }} />
                    </div>
                    {isConnected && <span className="badge badge-success"><Check size={10} /> Connected</span>}
                    {isConnecting && <span className="badge badge-warning"><Loader size={10} className="animate-spin" /> Syncing</span>}
                  </div>
                  <h4 style={{ fontSize: '0.9375rem', marginBottom: 4 }}>{source.name}</h4>
                  {isConnected && (
                    <p style={{ fontSize: '0.8125rem', color: 'var(--success)' }}>
                      {source.records.toLocaleString()} records synced
                    </p>
                  )}
                  {!isConnected && !isConnecting && (
                    <p style={{ fontSize: '0.8125rem' }}>Click to connect</p>
                  )}
                  {isConnecting && (
                    <div className="progress-bar" style={{ marginTop: 8 }}>
                      <div className="progress-fill" style={{ width: '60%', animation: 'shimmer 1.5s infinite' }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CSV Upload */}
          <div className="card" style={{
            border: dragOver ? '2px dashed var(--idbi-orange)' : '2px dashed var(--border-medium)',
            background: dragOver ? 'rgba(245,130,32,0.03)' : 'var(--bg-card)',
            textAlign: 'center', padding: '48px 24px', cursor: 'pointer',
            transition: 'all 250ms',
          }}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); connect('csv'); }}
            onClick={() => connect('csv')}
          >
            <CloudUpload size={40} style={{ color: 'var(--text-tertiary)', marginBottom: 16 }} />
            <h4 style={{ marginBottom: 8 }}>Upload CSV / Excel Data</h4>
            <p style={{ fontSize: '0.875rem' }}>
              Drag and drop files here, or click to browse.
              Supports .csv, .xlsx, .json formats
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
