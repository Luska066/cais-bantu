// @ts-nocheck
import { Head, router } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Upload, Image as ImageIcon, X, Trash2, Edit3, Plus, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useState, useRef } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Educadores & Equipe',
    href: '/admin/team',
  },
];

/**
 * Team administration page with real photo file uploads and live preview.
 */
export default function TeamAdminIndex({ team = [] }) {
  const [editingMember, setEditingMember] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    role: '',
    description: '',
    photo: null,
    order: 1,
    active: true,
  });

  const openCreate = () => {
    setForm({
      name: '',
      role: '',
      description: '',
      photo: null,
      order: team.length + 1,
      active: true,
    });
    setPhotoPreview(null);
    setRemovePhoto(false);
    setIsCreating(true);
    setEditingMember(null);
  };

  const openEdit = (member) => {
    const existingPhoto = member.photo_url || (member.photo ? (member.photo.startsWith('http') || member.photo.startsWith('/') ? member.photo : `/storage/${member.photo}`) : null);

    setForm({
      name: member.name,
      role: member.role,
      description: member.description || '',
      photo: null,
      order: member.order || 1,
      active: Boolean(member.active),
    });
    setPhotoPreview(existingPhoto);
    setRemovePhoto(false);
    setEditingMember(member);
    setIsCreating(false);
  };

  const closeModal = () => {
    setIsCreating(false);
    setEditingMember(null);
    setPhotoPreview(null);
    setRemovePhoto(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
      setRemovePhoto(false);
    }
  };

  const handleClearPhoto = () => {
    setForm((prev) => ({ ...prev, photo: null }));
    setPhotoPreview(null);
    setRemovePhoto(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('role', form.role);
    formData.append('description', form.description || '');
    formData.append('order', String(form.order));
    formData.append('active', form.active ? '1' : '0');

    if (form.photo instanceof File) {
      formData.append('photo', form.photo);
    }

    if (removePhoto) {
      formData.append('remove_photo', '1');
    }

    if (isCreating) {
      router.post('/admin/team', formData, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          setSubmitting(false);
          closeModal();
        },
        onError: () => setSubmitting(false),
      });
    } else if (editingMember) {
      formData.append('_method', 'PATCH');
      router.post(`/admin/team/${editingMember.id}`, formData, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          setSubmitting(false);
          closeModal();
        },
        onError: () => setSubmitting(false),
      });
    }
  };

  const handleDelete = (id, name) => {
    if (confirm(`Deseja realmente excluir ${name || 'este membro'} da equipe?`)) {
      router.delete(`/admin/team/${id}`, { preserveScroll: true });
    }
  };

  return (
    <>
      <Head title="Equipe & Diretoria – Painel Administrativo" />
      <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Educadores &amp; Equipe CAIS BANTU
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Cadastre, edite fotos e ordene os membros da equipe exibidos na página principal.
            </p>
          </div>
          <Button
            onClick={openCreate}
            className="bg-[#1A4FD6] hover:bg-[#1540B5] text-white font-bold gap-2 shadow-md"
          >
            <Plus className="size-4" />
            <span>Novo Membro</span>
          </Button>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map((member) => {
            const photoSrc = member.photo_url || (member.photo ? (member.photo.startsWith('http') || member.photo.startsWith('/') ? member.photo : `/storage/${member.photo}`) : null);

            return (
              <Card
                key={member.id}
                className="border transition-all hover:border-primary/40 flex flex-col justify-between p-5 rounded-2xl shadow-xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#1A4FD6] font-display text-xl font-bold text-white shadow-md overflow-hidden ring-2 ring-primary/20">
                      {photoSrc ? (
                        <img
                          src={photoSrc}
                          alt={member.name}
                          className="size-full object-cover rounded-2xl"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.parentElement?.querySelector('.avatar-fallback');
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <span className={`avatar-fallback ${photoSrc ? 'hidden' : 'flex'} items-center justify-center size-full`}>
                        {member.name?.charAt(0) || 'B'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] font-bold">
                        #{member.order}
                      </Badge>
                      <Badge variant={member.active ? 'default' : 'secondary'} className="text-[10px]">
                        {member.active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                  </div>

                  <CardTitle className="text-base font-bold text-foreground leading-snug">
                    {member.name}
                  </CardTitle>
                  <p className="text-xs font-semibold text-primary mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                    {member.description || 'Sem descrição cadastrada.'}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-border/80 flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(member)}
                    className="w-full gap-1.5 font-semibold text-xs"
                  >
                    <Edit3 className="size-3.5" />
                    <span>Editar</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(member.id, member.name)}
                    className="gap-1.5 text-xs px-3"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Modal for create / edit */}
      <Dialog open={isCreating || !!editingMember} onOpenChange={closeModal}>
        <DialogContent className="max-w-lg p-6 rounded-3xl border-border bg-card">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-bold">
              {isCreating ? 'Cadastrar Novo Membro' : `Editar: ${editingMember?.name}`}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Envie a foto e preencha as informações do membro da equipe.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {/* Foto Upload & Preview */}
            <div className="space-y-2">
              <label className="font-bold text-xs uppercase tracking-wider text-muted-foreground block">
                Foto do Membro
              </label>

              <div className="flex items-center gap-4 p-3 rounded-2xl bg-muted/50 border border-border">
                <div className="relative flex size-20 shrink-0 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground overflow-hidden border border-border shadow-xs">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Prévia"
                      className="size-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="size-8 text-muted-foreground" />
                  )}
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="team-photo-file"
                  />
                  <label
                    htmlFor="team-photo-file"
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 cursor-pointer transition-colors shadow-xs"
                  >
                    <Upload className="size-3.5" />
                    <span>{photoPreview ? 'Trocar Foto' : 'Selecionar Arquivo de Foto'}</span>
                  </label>

                  {photoPreview && (
                    <button
                      type="button"
                      onClick={handleClearPhoto}
                      className="inline-flex items-center justify-center gap-1.5 text-xs text-destructive hover:underline cursor-pointer font-medium"
                    >
                      <X className="size-3.5" />
                      <span>Remover foto</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Nome */}
            <div className="space-y-1">
              <label className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                Nome Completo *
              </label>
              <Input
                required
                placeholder="Ex: Edielson Miranda (Mestre Roxinho)"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl"
              />
            </div>

            {/* Cargo */}
            <div className="space-y-1">
              <label className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                Cargo / Função *
              </label>
              <Input
                required
                placeholder="Ex: Diretor Geral & Fundador"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="rounded-xl"
              />
            </div>

            {/* Descrição */}
            <div className="space-y-1">
              <label className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                Descrição / Mini Biografia
              </label>
              <textarea
                rows={3}
                placeholder="Ex: Educador social, mestre de Capoeira Angola e ativista dos direitos humanos."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-xl border border-border bg-background p-2.5 text-xs sm:text-sm focus:border-primary outline-none resize-none"
              />
            </div>

            {/* Ordem & Ativo */}
            <div className="grid grid-cols-2 gap-4 items-center pt-1">
              <div className="space-y-1">
                <label className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                  Ordem de Exibição
                </label>
                <Input
                  type="number"
                  min="1"
                  required
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  className="rounded-xl"
                />
              </div>

              <div className="flex items-center space-x-3 pt-5">
                <Switch
                  id="member-active-switch"
                  checked={form.active}
                  onCheckedChange={(checked) => setForm({ ...form, active: checked })}
                />
                <label htmlFor="member-active-switch" className="text-sm font-semibold cursor-pointer">
                  Exibir na Landing Page
                </label>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={closeModal}
                className="rounded-xl"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-[#1A4FD6] hover:bg-[#1540B5] text-white font-bold rounded-xl shadow-md"
              >
                {submitting ? 'Salvando...' : isCreating ? 'Cadastrar Membro' : 'Salvar Alterações'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

