'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

const STAGES = [
  { key: 'new', label: 'New', color: '#6366f1' },
  { key: 'contacted', label: 'Contacted', color: '#f59e0b' },
  { key: 'replied', label: 'Replied', color: '#3b82f6' },
  { key: 'qualified', label: 'Qualified', color: '#8b5cf6' },
  { key: 'proposal', label: 'Proposal', color: '#ec4899' },
  { key: 'won', label: 'Won', color: '#10b981' },
  { key: 'lost', label: 'Lost', color: '#ef4444' },
  ]

export default function LeadsPage() {
    const [leads, setLeads] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState<any>(null)
    const [saving, setSaving] = useState(false)

  useEffect(() => { fetchLeads() }, [])

  async function fetchLeads() {
        const { data } = await supabase.from('crm_leads').select('*').order('created_at', { ascending: false })
        setLeads(data || [])
        setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
        await supabase.from('crm_leads').update({ status }).eq('id', id)
        setLeads(leads.map(l => l.id === id ? { ...l, status } : l))
        if (selected?.id === id) setSelected({ ...selected, status })
  }

  async function saveNotes() {
        if (!selected) return
        setSaving(true)
        await supabase.from('crm_leads').update({ notes: selected.notes }).eq('id', selected.id)
        setLeads(leads.map(l => l.id === selected.id ? { ...l, notes: selected.notes } : l))
        setSaving(false)
  }

  const filtered = leads.filter(l => {
        const matchStatus = filter === 'all' || l.status === filter
        const matchSearch = !search || l.business_name?.toLowerCase().includes(search.toLowerCase()) || l.suburb?.toLowerCase().includes(search.toLowerCase()) || l.industry?.toLowerCase().includes(search.toLowerCase())
        return matchStatus && matchSearch
  })

  const getStage = (key: string) => STAGES.find(s => s.key === key)

  return (
        <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#e2e8f0', fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", display: 'flex', flexDirection: 'column' }}>
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', flexShrink: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                      <Link href="/crm" style={{ color: '#64748b', textDecoration: 'none', fontSize: 13 }}>← Dashboard</Link>Link>
                                      <span style={{ fontWeight: 600, fontSize: 15 }}>All Leads <span style={{ color: '#6366f1' }}>({leads.length})</span>span></span>span>
                          </div>div>
                          <input placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '7px 14px', color: '#e2e8f0', fontSize: 13, width: 220, outline: 'none' }} />
                </div>div>
                <div style={{ display: 'flex', gap: 4, padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
                  {[{ key: 'all', label: 'All' }, ...STAGES].map((s: any) => (
                    <button key={s.key} onClick={() => setFilter(s.key)} style={{ padding: '5px 12px', borderRadius: 6, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: filter === s.key ? (s.color || '#6366f1') : 'rgba(255,255,255,0.04)', color: filter === s.key ? '#fff' : '#64748b' }}>
                      {s.label} <span style={{ opacity: 0.7, fontSize: 11 }}>{s.key === 'all' ? leads.length : leads.filter(l => l.status === s.key).length}</span>span>
                    </button>button>
                  ))}
                </div>div>
                <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                          <div style={{ flex: selected ? '0 0 60%' : '1', overflowY: 'auto', borderRight: selected ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                    <thead style={{ position: 'sticky', top: 0, background: '#0a0a0f', zIndex: 10 }}>
                                                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                                                      {['Business', 'Suburb', 'Contact', 'Status', 'Score', 'Notes'].map(h => (
                            <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>th>
                          ))}
                                                                    </tr>tr>
                                                    </thead>thead>
                                                    <tbody>
                                                      {filtered.map((lead, i) => {
                          const stage = getStage(lead.status)
                                            const isSel = selected?.id === lead.id
                                                              return (
                                                                                  <tr key={lead.id} onClick={() => setSelected(isSel ? null : lead)} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', background: isSel ? 'rgba(99,102,241,0.08)' : 'transparent' }}>
                                                                                                      <td style={{ padding: '11px 16px' }}>
                                                                                                                            <div style={{ fontSize: 13, fontWeight: 600 }}>{lead.business_name}</div>div>
                                                                                                        {lead.industry && <div style={{ fontSize: 11, color: '#475569', marginTop: 1 }}>{lead.industry}</div>div>}
                                                                                                        </td>td>
                                                                                                      <td style={{ padding: '11px 16px', fontSize: 12, color: '#64748b' }}>{lead.suburb || '—'}</td>td>
                                                                                                      <td style={{ padding: '11px 16px', fontSize: 12 }}>
                                                                                                        {lead.email && <span title={lead.email}>✉️ </span>span>}
                                                                                                        {lead.phone && <span title={lead.phone}>📞</span>span>}
                                                                                                        {!lead.email && !lead.phone && <span style={{ color: '#334155' }}>—</span>span>}
                                                                                                        </td>td>
                                                                                                      <td style={{ padding: '11px 16px' }}>
                                                                                                                            <select value={lead.status} onChange={e => { e.stopPropagation(); updateStatus(lead.id, e.target.value) }} onClick={e => e.stopPropagation()} style={{ background: `${stage?.color}18`, color: stage?.color, border: `1px solid ${stage?.color}40`, borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 600, cursor: 'pointer', outline: 'none' }}>
                                                                                                                              {STAGES.map(s => <option key={s.key} value={s.key} style={{ background: '#1e293b', color: '#e2e8f0' }}>{s.label}</option>option>)}
                                                                                                                              </select>select>
                                                                                                        </td>td>
                                                                                                      <td style={{ padding: '11px 16px', fontSize: 13, fontWeight: 700 }}>
                                                                                                        {lead.ai_score ? <span style={{ color: lead.ai_score >= 7 ? '#10b981' : '#f59e0b' }}>{lead.ai_score}/10</span>span> : <span style={{ color: '#334155' }}>—</span>span>}
                                                                                                        </td>td>
                                                                                                      <td style={{ padding: '11px 16px', fontSize: 11, color: '#475569', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.notes || '—'}</td>td>
                                                                                    </tr>tr>
                                                                                )
                                                      })}
                                                      {filtered.length === 0 && <tr><td colSpan={6} style={{ padding: '48px', textAlign: 'center', color: '#334155', fontSize: 13 }}>No leads found</td>td></tr>tr>}
                                                    </tbody>tbody>
                                      </table>table>
                          </div>div>
                  {selected && (
                    <div style={{ flex: '0 0 40%', overflowY: 'auto', padding: '24px', background: 'rgba(255,255,255,0.01)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                              <div>
                                                              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{selected.business_name}</h2>h2>
                                                              <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{selected.industry}{selected.suburb ? ` · ${selected.suburb}` : ''}</p>p>
                                              </div>div>
                                              <button onClick={() => setSelected(null)} style={{ background:</tbody>
