a'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

const STAGES = [
  { key: 'new', label: 'New', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
  { key: 'contacted', label: 'Contacted', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  { key: 'replied', label: 'Replied', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  { key: 'qualified', label: 'Qualified', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  { key: 'proposal', label: 'Proposal', color: '#ec4899', bg: 'rgba(236,72,153,0.1)' },
  { key: 'won', label: 'Won', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  { key: 'lost', label: 'Lost', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  ]

export default function CRMDashboard() {
    const [leads, setLeads] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

  useEffect(() => { fetchLeads() }, [])

  async function fetchLeads() {
        const { data } = await supabase.from('crm_leads').select('*').order('created_at', { ascending: false })
        setLeads(data || [])
        setLoading(false)
  }

  const byStatus = (status: string) => leads.filter(l => l.status === status)
    const totalWithEmail = leads.filter(l => l.email).length
    const totalWithPhone = leads.filter(l => l.phone).length
    const wonLeads = byStatus('won').length

  return (
        <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#e2e8f0', fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>CI</div>div>
                                      <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.02em' }}>Capital Intelligence <span style={{ color: '#6366f1' }}>CRM</span>span></span>span>
                          </div>div>
                          <Link href="/crm/leads" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>View All Leads →</Link>Link>
                </div>div>
                <div style={{ padding: '32px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
                            {[{ label: 'Total Leads', value: leads.length, icon: '👥' }, { label: 'With Email', value: totalWithEmail, icon: '✉️' }, { label: 'With Phone', value: totalWithPhone, icon: '📞' }, { label: 'Clients Won', value: wonLeads, icon: '🏆' }].map(stat => (
                      <div key={stat.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '20px 24px' }}>
                                      <div style={{ fontSize: 22, marginBottom: 8 }}>{stat.icon}</div>div>
                                      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>{loading ? '—' : stat.value}</div>div>
                                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 4, fontWeight: 500 }}>{stat.label}</div>div>
                      </div>div>
                    ))}
                          </div>div>
                          <h2 style={{ fontSize: 13, fontWeight: 600, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Pipeline</h2>h2>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12 }}>
                            {STAGES.map(stage => {
                      const stageLeads = byStatus(stage.key)
                      return (
                                      <div key={stage.key} style={{ background: stage.bg, border: `1px solid ${stage.color}30`, borderRadius: 12, padding: '16px', minHeight: 120 }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                                                            <span style={{ fontSize: 11, fontWeight: 700, color: stage.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stage.label}</span>span>
                                                                            <span style={{ background: stage.color, color: '#fff', borderRadius: 20, padding: '1px 7px', fontSize: 11, fontWeight: 700 }}>{stageLeads.length}</span>span>
                                                        </div>div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                                          {stageLeads.slice(0, 3).map(lead => (
                                                            <Link key={lead.id} href="/crm/leads" style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 6, padding: '6px 8px', fontSize: 11, color: '#cbd5e1', textDecoration: 'none', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lead.business_name}</Link>Link>
                                                          ))}
                                                          {stageLeads.length > 3 && <span style={{ fontSize: 10, color: '#475569', paddingLeft: 8 }}>+{stageLeads.length - 3} more</span>span>}
                                                        </div>div>
                                      </div>div>
                                    )
                            })}
                          </div>div>
                          <div style={{ marginTop: 32 }}>
                                      <h2 style={{ fontSize: 13, fontWeight: 600, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Recent Leads</h2>h2>
                                      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden' }}>
                                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                                    <thead>
                                                                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                                                                      {['Business', 'Industry', 'Suburb', 'Contact', 'Status', 'Score'].map(h => (
                              <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>th>
                            ))}
                                                                                      </tr>tr>
                                                                    </thead>thead>
                                                                  <tbody>
                                                                    {leads.slice(0, 8).map((lead, i) => {
                            const stage = STAGES.find(s => s.key === lead.status)
                                                return (
                                                                      <tr key={lead.id} style={{ borderBottom: i < 7 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                                                                                            <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600 }}>{lead.business_name}</td>td>
                                                                                            <td style={{ padding: '12px 16px', fontSize: 12, color: '#64748b' }}>{lead.industry || '—'}</td>td>
                                                                                            <td style={{ padding: '12px 16px', fontSize: 12, color: '#64748b' }}>{lead.suburb || '—'}</td>td>
                                                                                            <td style={{ padding: '12px 16px', fontSize: 12 }}>{lead.email ? '✉️' : ''}{lead.phone ? '📞' : ''}{!lead.email && !lead.phone ? <span style={{ color: '#475569' }}>—</span>span> : ''}</td>td>
                                                                                            <td style={{ padding: '12px 16px' }}><span style={{ background: stage?.bg, color: stage?.color, border: `1px solid ${stage?.color}40`, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{stage?.label}</span>span></td>td>
                                                                                            <td style={{ padding: '12px 16px', fontSize: 13 }}>{lead.ai_score ? <span style={{ color: lead.ai_score >= 7 ? '#10b981' : '#f59e0b', fontWeight: 700 }}>{lead.ai_score}/10</span>span> : '—'}</td>td>
                                                                      </tr>tr>
                                                                    )
                                                                    })}
                                                                    {leads.length === 0 && !loading && <tr><td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: '#475569', fontSize: 13 }}>No leads yet</td>td></tr>tr>}
                                                                  </tbody>tbody>
                                                    </table>table>
                                      </div>div>
                          </div>div>
                </div>div>
        </div>div>
      )
}</thead>
