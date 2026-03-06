import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, UserPlus, Search, Mail, Shield, MoreHorizontal, ArrowLeft, CheckCircle2, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const mockUsers = [
  { id: '1', name: 'Dr. Mwansa Kapila', email: 'mwansa@school.zm', role: 'teacher', department: 'Science', status: 'active', joined: '2024-01-15' },
  { id: '2', name: 'Mr. Joseph Banda', email: 'banda@school.zm', role: 'teacher', department: 'Mathematics', status: 'active', joined: '2024-02-01' },
  { id: '3', name: 'Ms. Grace Phiri', email: 'phiri@school.zm', role: 'teacher', department: 'English', status: 'active', joined: '2024-01-20' },
  { id: '4', name: 'Mr. Peter Zulu', email: 'zulu@school.zm', role: 'admin', department: 'Administration', status: 'active', joined: '2023-09-01' },
  { id: '5', name: 'Mrs. Mary Tembo', email: 'tembo@school.zm', role: 'teacher', department: 'Social Studies', status: 'inactive', joined: '2024-03-10' },
  { id: '6', name: 'Mr. David Mumba', email: 'mumba@school.zm', role: 'teacher', department: 'Science', status: 'active', joined: '2024-04-05' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const AdminUserManagementPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'teacher', department: '' });

  const filtered = mockUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleAddUser = () => {
    toast.success(`Invitation sent to ${newUser.email}`);
    setAddDialogOpen(false);
    setNewUser({ name: '', email: '', role: 'teacher', department: '' });
  };

  const stats = [
    { label: 'Total Staff', value: '124', icon: Users, gradient: 'from-primary/20 to-accent/10', iconColor: 'text-primary' },
    { label: 'Teachers', value: '98', icon: CheckCircle2, gradient: 'from-green-500/15 to-emerald-500/10', iconColor: 'text-green-600' },
    { label: 'Admins', value: '12', icon: Shield, gradient: 'from-purple-500/15 to-violet-500/10', iconColor: 'text-purple-600' },
    { label: 'Pending Invites', value: '5', icon: Mail, gradient: 'from-amber-500/15 to-orange-500/10', iconColor: 'text-amber-600' },
  ];

  const roleColors: Record<string, string> = {
    teacher: 'bg-primary/10 text-primary border-primary/20',
    admin: 'bg-accent/10 text-accent-foreground border-accent/20',
    support: 'bg-muted text-muted-foreground border-border',
  };

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage staff, teachers, and administrators</p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-xl shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-primary to-accent text-primary-foreground">
              <UserPlus className="w-4 h-4" />Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><UserCog className="w-5 h-5 text-primary" />Add New Staff Member</DialogTitle>
              <DialogDescription>Send an invitation to join the platform.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Full Name" className="rounded-xl" value={newUser.name} onChange={e => setNewUser(p => ({ ...p, name: e.target.value }))} />
              <Input placeholder="Email Address" type="email" className="rounded-xl" value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))} />
              <Select value={newUser.role} onValueChange={v => setNewUser(p => ({ ...p, role: v }))}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="support">Support Staff</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Department" className="rounded-xl" value={newUser.department} onChange={e => setNewUser(p => ({ ...p, department: e.target.value }))} />
            </div>
            <DialogFooter>
              <Button variant="outline" className="rounded-xl" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
              <Button className="rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground" onClick={handleAddUser}>Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
            <CardContent className="p-5 relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                  <s.icon className={`w-6 h-6 ${s.iconColor}`} />
                </div>
                <div>
                  <p className="text-3xl font-extrabold tracking-tight">{s.value}</p>
                  <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Search & Filter */}
      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name or email..." className="pl-10 rounded-xl bg-card border-border/60 focus:border-primary/40" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-40 rounded-xl"><SelectValue placeholder="Filter role" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="teacher">Teachers</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* User Cards */}
      <motion.div variants={itemVariants} className="grid gap-3">
        {filtered.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card className="border-border/40 hover:border-primary/30 hover:shadow-md transition-all duration-300 group">
              <CardContent className="p-4 flex items-center gap-4">
                <Avatar className="h-11 w-11 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-sm">
                    {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <Badge variant="outline" className={`capitalize text-[10px] px-2 rounded-lg ${roleColors[user.role] || ''}`}>
                  {user.role}
                </Badge>
                <div className="hidden md:block text-sm text-muted-foreground w-28 text-center">{user.department}</div>
                <Badge
                  variant={user.status === 'active' ? 'default' : 'secondary'}
                  className={`capitalize text-[10px] px-2 rounded-lg ${
                    user.status === 'active' ? 'bg-green-500/15 text-green-700 border-green-500/20' : ''
                  }`}
                >
                  {user.status}
                </Badge>
                <span className="hidden lg:block text-xs text-muted-foreground w-24 text-right">{user.joined}</span>
                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AdminUserManagementPage;
