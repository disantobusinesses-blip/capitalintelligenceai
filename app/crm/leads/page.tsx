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
      <style>{`
        .crm-leads-header { padding: 12px 16px; flex-wrap: wrap; gap: 8px; }
        .crm-leads-search { width: 100%; }
        .crm-leads-filters { overflow-x: auto; -webkit-overflow-scrolling: touch; flex-wrap: nowrap; }
        .crm-leads-filters::-webkit-scrollbar { display: none; }
        .crm-leads-list { flex: 1; overflow-y: auto; }
        .crm-leads-list.has-detail { display: none; }
        .crm-leads-detail {
          position: fixed;
          inset: 0;
          z-index: 50;
          background: #0a0a0f;
          overflow-y: auto;
          padding: 20px 16px;
        }
        @media (min-width: 768px) {
          .crm-leads-header { padding: 16px 24px; flex-wrap: nowrap; }
          .crm-leads-search { width: 220px; }
          .crm-leads-filters { overflow-x: visible; flex-wrap: wrap; }
          .crm-leads-list.has-detail { display: block; flex: 0 0 60%; border-right: 1px solid rgba(255,255,255,0.06); }
          .crm-leads-detail {
            position: static;
            flex: 0 0 40%;
            padding: 24px;
            background: rgba(255,255,255,0.01);
          }
        }
      `}</style>
      <div className="crm-leads-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/crm" style={{ color: '#64748b', textDecoration: 'none', fontSize: 13 }}>← Dashboard</Link>
          <span style={{ fontWeight: 600, fontSize: 15 }}>All Leads <span style={{ color: '#6366f1' }}>({leads.length})</span></span>
        </div>
        <input className="crm-leads-search" placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '7px 14px', color: '#e2e8f0', fontSize: 13, outline: 'none' }} />
      </div>
      <div className="crm-leads-filters" style={{ display: 'flex', gap: 4, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        {[{ key: 'all', label: 'All' }, ...STAGES].map((s: any) => (
          <button key={s.key} onClick={() => setFilter(s.key)} style={{ padding: '5px 12px', borderRadius: 6, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: filter === s.key ? (s.color || '#6366f1') : 'rgba(255,255,255,0.04)', color: filter === s.key ? '#fff' : '#64748b', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {s.label} <span style={{ opacity: 0.7, fontSize: 11 }}>{s.key === 'all' ? leads.length : leads.filter(l => l.status === s.key).length}</span>
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div className={`crm-leads-list${selected ? ' has-detail' : ''}`} style={{ overflowY: 'auto' }}>
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
            <table style={{ width: '100%', minWidth: 540, borderCollapse: 'collapse' }}>
              <thead style={{ position: 'sticky', top: 0, background: '#0a0a0f', zIndex: 10 }}>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Business', 'Suburb', 'Contact', 'Status', 'Score', 'Notes'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => {
                  const stage = getStage(lead.status)
                  const isSel = selected?.id === lead.id
                  return (
                    <tr key={lead.id} onClick={() => setSelected(isSel ? null : lead)} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', background: isSel ? 'rgba(99,102,241,0.08)' : 'transparent' }}>
                      <td style={{ padding: '11px 16px' }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{lead.business_name}</div>
                        {lead.industry && <div style={{ fontSize: 11, color: '#475569', marginTop: 1 }}>{lead.industry}</div>}
                      </td>
                      <td style={{ padding: '11px 16px', fontSize: 12, color: '#64748b' }}>{lead.suburb || '—'}</td>
                      <td style={{ padding: '11px 16px', fontSize: 12 }}>
                        {lead.email && <span title={lead.email}>✉️ </span>}
                        {lead.phone && <span title={lead.phone}>📞</span>}
                        {!lead.email && !lead.phone && <span style={{ color: '#334155' }}>—</span>}
                      </td>
                      <td style={{ padding: '11px 16px' }}>
                        <select value={lead.status} onChange={e => { e.stopPropagation(); updateStatus(lead.id, e.target.value) }} onClick={e => e.stopPropagation()} style={{ background: `${stage?.color}18`, color: stage?.color, border: `1px solid ${stage?.color}40`, borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 600, cursor: 'pointer', outline: 'none' }}>
                          {STAGES.map(s => <option key={s.key} value={s.key} style={{ background: '#1e293b', color: '#e2e8f0' }}>{s.label}</option>)}
                        </select>
                      </td>
                      <td style={{ padding: '11px 16px', fontSize: 13, fontWeight: 700 }}>
                        {lead.ai_score ? <span style={{ color: lead.ai_score >= 7 ? '#10b981' : '#f59e0b' }}>{lead.ai_score}/10</span> : <span style={{ color: '#334155' }}>—</span>}
                      </td>
                      <td style={{ padding: '11px 16px', fontSize: 11, color: '#475569', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.notes || '—'}</td>
                    </tr>
                  )
                })}
                {filtered.length === 0 && <tr><td colSpan={6} style={{ padding: '48px', textAlign: 'center', color: '#334155', fontSize: 13 }}>No leads found</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
        {selected && (
          <div className="crm-leads-detail">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{selected.business_name}</h2>
                <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{selected.industry}{selected.suburb ? ` · ${selected.suburb}` : ''}</p>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, color: '#64748b', cursor: 'pointer', padding: '6px 10px', fontSize: 12 }}>✕</button>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: '#475569', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Status</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {STAGES.map(s => (
                  <button key={s.key} onClick={() => updateStatus(selected.id, s.key)} style={{ padding: '5px 12px', borderRadius: 6, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: selected.status === s.key ? s.color : 'rgba(255,255,255,0.04)', color: selected.status === s.key ? '#fff' : '#64748b' }}>{s.label}</button>
                ))}
              </div>
            </div>
            {selected.email && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: '#475569', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</div>
                <a href={`mailto:${selected.email}`} style={{ color: '#6366f1', fontSize: 13, textDecoration: 'none' }}>{selected.email}</a>
              </div>
            )}
            {selected.phone && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: '#475569', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Phone</div>
                <a href={`tel:${selected.phone}`} style={{ color: '#6366f1', fontSize: 13, textDecoration: 'none' }}>{selected.phone}</a>
              </div>
            )}
            {selected.ai_score && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: '#475569', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>AI Score</div>
                <span style={{ fontSize: 22, fontWeight: 700, color: selected.ai_score >= 7 ? '#10b981' : '#f59e0b' }}>{selected.ai_score}/10</span>
              </div>
            )}
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: '#475569', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Notes</div>
              <textarea value={selected.notes || ''} onChange={e => setSelected({ ...selected, notes: e.target.value })} rows={6} style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 13, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} placeholder="Add notes..." />
            </div>
            <button onClick={saveNotes} disabled={saving} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>{saving ? 'Saving...' : 'Save Notes'}</button>
          </div>
        )}
      </div>
    </div>
  )
}
