// @ts-nocheck
import { Head } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { router } from '@inertiajs/react';

/**
 * Team administration page.
 * Displays a list of team members fetched by TeamAdminController.
 */
export default function TeamAdminIndex({ team }) {
  const [editingMember, setEditingMember] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({
    name: '',
    role: '',
    description: '',
    photo: '',
    order: 0,
    active: true,
  });

  const openCreate = () => {
    setForm({ name: '', role: '', description: '', photo: '', order: 0, active: true });
    setIsCreating(true);
    setEditingMember(null);
  };

  const openEdit = (member) => {
    setForm({
      name: member.name,
      role: member.role,
      description: member.description,
      photo: member.photo || '',
      order: member.order,
      active: member.active,
    });
    setEditingMember(member);
    setIsCreating(false);
  };

  const closeModal = () => {
    setIsCreating(false);
    setEditingMember(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (isCreating) {
      router.post('/admin/team', payload, { preserveScroll: true, onSuccess: closeModal });
    } else if (editingMember) {
      router.patch(`/admin/team/${editingMember.id}`, payload, { preserveScroll: true, onSuccess: closeModal });
    }
  };

  const handleDelete = (id) => {
    if (confirm('Deseja excluir este membro da equipe?')) {
      router.delete(`/admin/team/${id}`, { preserveScroll: true });
    }
  };

  return (
    <>
      <Head title="Equipe – CAIS BANTU" />
      <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Educadores &amp; Equipe
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gerencie os educadores e membros da equipe exibidos na página de aterrissagem.
            </p>
          </div>
          <Button onClick={openCreate} className="bg-[#1A4FD6] hover:bg-[#1540B5] text-white font-bold">
            + Criar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <Card key={member.id} className="border transition-all flex flex-col justify-between p-6">
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="size-5 text-primary" />
                <CardTitle className="text-lg font-semibold">{member.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground mb-4">{member.description}</p>
                <Badge variant={member.active ? 'default' : 'secondary'}>
                  {member.active ? 'Ativo' : 'Inativo'}
                </Badge>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEdit(member)}>
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(member.id)}>
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal for create / edit */}
      <Dialog open={isCreating || !!editingMember} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isCreating ? 'Criar Membro' : 'Editar Membro'}</DialogTitle>
            <DialogDescription>Preencha os campos abaixo.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-bold text-sm">Nome</label>
              <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="font-bold text-sm">Cargo</label>
              <Input required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </div>
            <div>
              <label className="font-bold text-sm">Descrição</label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div>
              <label className="font-bold text-sm">Foto (URL)</label>
              <Input value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} />
            </div>
            <div>
              <label className="font-bold text-sm">Ordem</label>
              <Input type="number" required value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
            </div>
            <div className="flex items-center space-x-2">
              <Switch checked={form.active} onCheckedChange={(checked) => setForm({ ...form, active: checked })} />
              <span className="text-sm">Ativo</span>
            </div>
            <Button type="submit" className="bg-[#1A4FD6] text-white">
              {isCreating ? 'Criar' : 'Salvar'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
