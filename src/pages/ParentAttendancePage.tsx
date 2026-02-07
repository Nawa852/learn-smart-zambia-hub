import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, XCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

const monthDays = Array.from({ length: 30 }, (_, i) => {
  const statuses = ['present', 'present', 'present', 'present', 'late', 'absent', 'present'];
  return { day: i + 1, status: i >= 28 ? 'future' : statuses[i % 7] };
});

const statusColors: Record<string, string> = {
  present: 'bg-green-500',
  late: 'bg-yellow-500',
  absent: 'bg-red-500',
  future: 'bg-muted',
};

const ParentAttendancePage = () => {
  const stats = { present: 22, late: 3, absent: 3, total: 28 };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Calendar className="w-8 h-8 text-primary" />
          Attendance Tracker
        </h1>
        <p className="text-muted-foreground mt-1">Monitor your children's school attendance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Present', value: stats.present, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Late', value: stats.late, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Absent', value: stats.absent, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Rate', value: `${Math.round((stats.present / stats.total) * 100)}%`, icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
        ].map((s, i) => (
          <Card key={i}>
            <CardContent className="p-5 text-center">
              <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center mx-auto mb-3`}>
                <s.icon className={`w-6 h-6 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardHeader>
          <CardTitle>January 2026 — Brighton Mwamba</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-1">{d}</div>
            ))}
            {monthDays.map((d) => (
              <div
                key={d.day}
                className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all hover:scale-105 cursor-default
                  ${d.status === 'present' ? 'bg-green-100 text-green-800' : ''}
                  ${d.status === 'late' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${d.status === 'absent' ? 'bg-red-100 text-red-800' : ''}
                  ${d.status === 'future' ? 'bg-muted text-muted-foreground' : ''}
                `}
              >
                {d.day}
              </div>
            ))}
          </div>
          <div className="flex gap-4 justify-center text-sm">
            {[{ l: 'Present', c: 'bg-green-500' }, { l: 'Late', c: 'bg-yellow-500' }, { l: 'Absent', c: 'bg-red-500' }].map(x => (
              <div key={x.l} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${x.c}`} />
                <span className="text-muted-foreground">{x.l}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600" />Recent Alerts</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { msg: "Brighton was 15 min late on Monday", type: "warning" },
            { msg: "Sarah had perfect attendance this week! 🎉", type: "success" },
            { msg: "Brighton missed Wednesday — illness reported", type: "alert" },
          ].map((a, i) => (
            <div key={i} className={`p-3 rounded-lg border-l-4 ${a.type === 'success' ? 'border-green-500 bg-green-50' : a.type === 'warning' ? 'border-yellow-500 bg-yellow-50' : 'border-red-500 bg-red-50'}`}>
              <p className="text-sm font-medium">{a.msg}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentAttendancePage;
