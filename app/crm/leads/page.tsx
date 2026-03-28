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

const TEMPLATES = [
  { label: 'No Website Intro', subject: 'Quick question about your online presence', body: 'Hi,\n\nI came across your business and noticed you may not have a website yet.\n\nAt Capital Intelligence Group, we build affordable professional websites for local Australian businesses starting from $599 AUD.\n\nWould you be open to a quick 10-minute chat?\n\nBest regards,\nStefano Disanto\nCapital Intelligence Group\nsales@intelligentaisystem.com' },
  { label: 'Follow Up', subject: 'Following up — Capital Intelligence Group', body: 'Hi,\n\nI reached out last week about building a website and wanted to follow up.\n\nWe specialise in fast, affordable websites that help local businesses get found on Google.\n\nHappy to send examples if interested.\n\nBest,\nStefano Disanto\nCapital Intelligence Group' },
  { label: 'SEO Offer', subject: 'Get more customers finding your business on Google', body: 'Hi,\n\nI help local Australian businesses get found on Google through SEO-optimised websites and blog content.\n\nMost clients see measurable traffic improvements within 60-90 days. Monthly plans start from $119/month.\n\nAre you free for a quick call this week?\n\nStefano Disanto\nCapital Intelligence Group\nintelligentaisystem.com' },
]

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [emailModal, setEmailModal] = useState(false)
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [sending, setSending] = useState(false)

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

  async function sendEmail() {
    if (!selected || !emailSubject || !emailBody) return
    setSending(true)
    const res = await fetch('/api/send-crm-mail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId: selected.id, subject: emailSubject, body: emailBody }),
    })
    setSending(false)
    if (res.ok) {
      setEmailModal(false)
      setEmailSubject('')
      setEmailBody('')
      fetchLeads()
    } else {
      const { error } = await res.json()
      alert(error || 'Failed to send email')
    }
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
          <Link href="/crm" style={{ color: '#64748b', textDecoration: 'none', fontSize: 13 }}>← Dashboard</Link>
          <span style={{ fontWeight: 600, fontSize: 15 }}>All Leads <span style={{ color: '#6366f1' }}>({leads.length})</span></span>
        </div>
        <input placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '7px 14px', color: '#e2e8f0', fontSize: 13, width: 220, outline: 'none' }} />
      </div>
      <div style={{ display: 'flex', gap: 4, padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        {[{ key: 'all', label: 'All' }, ...STAGES].map((s: any) => (
          <button key={s.key} onClick={() => setFilter(s.key)} style={{ padding: '5px 12px', borderRadius: 6, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: filter === s.key ? (s.color || '#6366f1') : 'rgba(255,255,255,0.04)', color: filter === s.key ? '#fff' : '#64748b' }}>
            {s.label} <span style={{ opacity: 0.7, fontSize: 11 }}>{s.key === 'all' ? leads.length : leads.filter(l => l.status === s.key).length}</span>
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ flex: selected ? '0 0 60%' : '1', overflowY: 'auto', borderRight: selected ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
        {selected && (
          <div style={{ flex: '0 0 40%', overflowY: 'auto', padding: '24px', background: 'rgba(255,255,255,0.01)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{selected.business_name}</h2>
                <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{selected.industry}{selected.suburb ? ` · ${selected.suburb}` : ''}</p>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, color: '#64748b', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: '4px 10px' }}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {selected.email && <div style={{ fontSize: 13 }}>✉️ <a href={`mailto:${selected.email}`} style={{ color: '#6366f1' }}>{selected.email}</a></div>}
              {selected.phone && <div style={{ fontSize: 13 }}>📞 {selected.phone}</div>}
              {selected.website && <div style={{ fontSize: 13 }}>🌐 <a href={selected.website} target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1' }}>{selected.website}</a></div>}
            </div>
            {selected.email && !selected.unsubscribed && (
              <button onClick={() => setEmailModal(true)} style={{ width: '100%', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
                ✉️ Send Email
              </button>
            )}
            {selected.unsubscribed && <div style={{ fontSize: 12, color: '#ef4444', marginBottom: 16 }}>⛔ Unsubscribed</div>}
            {selected.outreach_count > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Outreach History</div>
                {(selected.outreach_history || []).map((h: any, i: number) => (
                  <div key={i} style={{ fontSize: 12, color: '#64748b', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 6, marginBottom: 6 }}>
                    <div style={{ fontWeight: 600, marginBottom: 2 }}>{h.subject}</div>
                    <div style={{ color: '#475569' }}>{new Date(h.sent_at).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Notes</div>
              <textarea value={selected.notes || ''} onChange={e => setSelected({ ...selected, notes: e.target.value })} rows={5} style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#e2e8f0', fontSize: 13, padding: '10px 12px', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
              <button onClick={saveNotes} disabled={saving} style={{ marginTop: 8, background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                {saving ? 'Saving…' : 'Save Notes'}
              </button>
            </div>
          </div>
        )}
      </div>
      {emailModal && selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 28, width: 540, maxWidth: '95vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Send Email to {selected.business_name}</h3>
              <button onClick={() => setEmailModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 20 }}>×</button>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Templates</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {TEMPLATES.map(t => (
                  <button key={t.label} onClick={() => { setEmailSubject(t.subject); setEmailBody(t.body) }} style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 6, color: '#a5b4fc', fontSize: 11, fontWeight: 600, cursor: 'pointer', padding: '4px 10px' }}>{t.label}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Subject</div>
              <input value={emailSubject} onChange={e => setEmailSubject(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '8px 12px', color: '#e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Body</div>
              <textarea value={emailBody} onChange={e => setEmailBody(e.target.value)} rows={10} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '8px 12px', color: '#e2e8f0', fontSize: 13, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={() => setEmailModal(false)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#64748b', cursor: 'pointer', padding: '8px 18px', fontSize: 13 }}>Cancel</button>
              <button onClick={sendEmail} disabled={sending || !emailSubject || !emailBody} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', opacity: (sending || !emailSubject || !emailBody) ? 0.6 : 1 }}>
                {sending ? 'Sending…' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
