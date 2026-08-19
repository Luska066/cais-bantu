# Design System & Identidade Visual — Instituto Bantu (bantu-api)

Este documento descreve a identidade visual, o conceito do design **Azul e Amarelo**, a tabela completa de cores padrão e a arquitetura e estilização da barra lateral esquerda (**Aside / Left Sidebar**) do projeto.

---

## 1. Conceito do Design: Azul & Amarelo

A identidade visual do **Instituto Bantu** combina a solidez e a seriedade institucional com a energia e o calor cultural africano:

* **Azul Escuro / Deep Navy (`#0D1640`)**: Transmite autoridade, segurança, estabilidade e elegância. É a cor dominante de fundo da Sidebar e do texto em alto contraste no tema claro.
* **Azul Real / Primary Cobalt (`#1A4FD6`)**: Representa dinamismo, tecnologia e modernidade. Usado em botões de ação principal, links, focos de inputs e elementos de interação.
* **Amarelo Dourado / Bantu Accent (`#FFBE00`)**: Simboliza energia, prosperidade, iluminação e identidade comunitária. É a cor de maior destaque (accent), usada no logotipo "IB", no item ativo da navegação lateral, em badges de status e em destaques visuais.
* **Azul Gelo Suave (`#F2F5FF`)**: Fundo geral da aplicação, que substitui o branco puro por um tom frio e agradável aos olhos, reduzindo o cansaço visual e elevando o acabamento estético.

---

## 2. Paleta de Cores Padrão do Projeto

### 2.1 Tabela de Cores Principais

| Token | Hex / Valor | CSS Variable | Aplicação e Significado |
| :--- | :--- | :--- | :--- |
| **Primary** | `#1A4FD6` | `--primary` | Botões primários, links ativos, indicadores de foco |
| **Primary Foreground** | `#FFFFFF` | `--primary-foreground` | Texto sobre botões e fundos primários |
| **Accent (Amarelo)** | `#FFBE00` | `--accent` | Item ativo da Sidebar, logotipo, destaques, gráficos |
| **Accent Foreground** | `#0D1640` | `--accent-foreground` | Texto escuro sobre fundos amarelos de destaque |
| **Background (Light)** | `#F2F5FF` | `--background` | Fundo geral de todas as páginas da aplicação |
| **Foreground (Texto)** | `#0D1640` | `--foreground` | Títulos, cabeçalhos e texto com contraste total |
| **Card (Light)** | `#FFFFFF` | `--card` | Fundo de cartões, formulários, modais e tabelas |
| **Secondary** | `#E8EEFF` | `--secondary` | Fundo de ícones, badges secundários e chips |
| **Secondary Foreground**| `#1A4FD6` | `--secondary-foreground` | Texto e ícones sobre fundos secundários |
| **Muted (Cinza Azul)** | `#5B6589` | `--muted-foreground` | Subtítulos, descrições, placeholders, labels secundários |
| **Muted Background** | `#EEF0F8` | `--muted` | Fundos de campos desabilitados e divisores suaves |
| **Border** | `rgba(26, 79, 214, 0.12)` | `--border` | Bordas de cards, tabelas e inputs |
| **Input Focus Ring** | `#1A4FD6` / `rgba(26,79,214,0.15)` | `--input` / `--ring` | Bordas e anel de foco de formulários |
| **Destructive** | `#DC2626` | `--destructive` | Alertas de erro, saídas financeiras, exclusão |
| **Success** | `#22C55E` | `--chart-3` | Confirmações, entradas financeiras, status ativo |
| **Warning / Orange** | `#F97316` | `--chart-4` | Alertas intermediários, pendências |

---

### 2.2 Tokens do Modo Escuro (Dark Mode)

| Token | Hex / Valor | Descrição |
| :--- | :--- | :--- |
| **Dark Background** | `#0D1640` | Fundo principal da aplicação em modo escuro |
| **Dark Card / Popover**| `#131F53` | Fundo elevado de cartões e modais |
| **Dark Secondary** | `#1E2D6D` | Containers secundários e badges no modo escuro |
| **Dark Foreground** | `#FFFFFF` | Texto principal em branco |
| **Dark Muted Text** | `#A0AEC0` | Texto secundário em cinza suave |
| **Dark Border** | `rgba(255, 255, 255, 0.1)` | Linhas de divisão e contornos sutis |

---

## 3. Tipografia Oficial

* **Display & Títulos:** `Lexend Deca, sans-serif` (Bold / Semi-bold) — usada em títulos de páginas, valores numéricos de destaque, logotipo e botões ativos.
* **Corpo de Texto & UI:** `DM Sans, sans-serif` (Regular / Medium) — usada em parágrafos, tabelas, formulários, labels e descrições gerais.

---

## 4. Estrutura do Aside / Left Sidebar (`AppSidebar`)

A barra lateral esquerda (`AppSidebar`) é o elemento central de navegação do painel administrativo. Ela está implementada no componente `resources/js/components/app-sidebar.tsx`.

### 4.1 Características Estruturais e Visuais

* **Largura:** `w-64` (256px de largura fixa em desktop).
* **Fundo:** `#0D1640` (Azul Marinho Profundo institucional).
* **Borda Lateral:** `border-r border-white/10` (linha divisória translúcida refinada).
* **Comportamento Colapsável:** Suporta colapso para modo ícone (`collapsible="icon"`).

```
+---------------------------------------------------------+
| [ IB ]  Instituto Bantu                                 | <- Header (AppLogo)
|         Gestão Comunitária                              |
+---------------------------------------------------------+
|  Navegação Principal                                    |
|  [>] Dashboard                                          |
|  [>] Hotéis                                             |
|                                                         |
|  GESTÃO HOTELEIRA (#FFBE00)                             | <- Seção Dourada
|  [>] Painel Hotel                                       |
|  [>] Categorias de Quartos                              |
|  [*] Quartos (ITEM ATIVO -> Fundo Amarelo #FFBE00)      |
|  [>] Categorias de Produtos                             |
|  [>] Produtos                                           |
|  [>] Estoque de Produtos                                |
|  [>] Clientes                                           |
|  [>] Hóspedes                                           |
|  [>] Reservas                                           |
|  [>] Contas Pagar/Receber                               |
|                                                         |
|  CONFIGURAÇÕES (#9AA5C4)                                | <- Seção Suave
|  [>] Perfil de Usuário                                  |
|  [>] Segurança & Senha                                  |
|  [>] Aparência                                          |
+---------------------------------------------------------+
|  [Avatar] Administrador                                 | <- Footer
|           admin@bantu.ao                                |
|  [->] Sair da conta                                     |
+---------------------------------------------------------+
```

---

### 4.2 Detalhamento das Camadas da Sidebar

#### A. Header com Logotipo (`AppLogo`)
* **Badge do Logo:** Círculo `w-12 h-12 rounded-full` com fundo amarelo `#FFBE00` e tipografia `Lexend Deca` bold com as letras `"IB"` em `#0D1640`.
* **Texto Principal:** `"Instituto Bantu"` em branco (`text-white font-bold text-base`).
* **Subtítulo:** `"Gestão Comunitária"` em tom acinzentado suave (`#8C98B6`).
* **Divisor:** `border-b border-white/10` com padding `p-5`.

#### B. Itens de Navegação (Menu Links)
* **Item Ativo (Página Atual):**
  * Fundo: Amarelo vibrante `#FFBE00`
  * Texto: Azul escuro `#0D1640` com `font-bold`
  * Ícone: `#0D1640`
  * Sombra: `shadow-md shadow-[#FFBE00]/20`
  * Borda / Shape: `rounded-2xl` (ou 12px de border-radius)
  * Altura: `h-11` a `h-12` com padding `px-4`
* **Item Inativo:**
  * Texto: Cinza azulado `#9AA5C4`
  * Ícone: `#9AA5C4`
  * Hover: Transição suave para texto branco (`hover:text-white`) e fundo translúcido (`hover:bg-white/10`).

#### C. Agrupamentos e Rótulos de Seção
1. **Menu Principal:** Acesso rápido ao *Dashboard* e *Hotéis*.
2. **Gestão Hoteleira:** Rótulo em amarelo `#FFBE00` (`text-xs uppercase font-semibold tracking-wider`). Agrupa todas as operações de quartos, categorias, produtos, estoque, reservas, hóspedes e financeiro.
3. **Configurações:** Rótulo em cinza azulado `#9AA5C4` (`text-xs uppercase font-semibold tracking-wider`). Agrupa perfil, segurança e aparência.

#### D. Rodapé (`SidebarFooter`)
* **Card do Usuário:** Bloco arredondado (`rounded-xl`) com fundo `bg-white/5` e borda `border-white/10`:
  * Avatar circular com fundo `#1A4FD6` e inicial do usuário em branco.
  * Nome do usuário em branco `text-white font-semibold text-xs`.
  * Email em `text-white/40 text-[11px]`.
* **Ação de Logout:** Botão estilizado com ícone `LogOut`, texto `text-rose-300` e hover de alerta `hover:text-white hover:bg-rose-500/20`.

---

## 5. Padrões de Componentes de Interface

| Componente | Especificações Visuais |
| :--- | :--- |
| **Botão Primário** | Fundo `#1A4FD6`, texto branco, altura `48px`, `rounded-xl` (12px), sombra `0 8px 24px rgba(26,79,214,0.25)`, hover `#1540B5`. |
| **Botão Amarelo / Destaque** | Fundo `#FFBE00`, texto `#0D1640 font-bold`, altura `48px`, `rounded-xl`, hover `#E5AB00`. |
| **Inputs & Formulários** | Fundo `#FFFFFF` (ou `#EEF0F8`), altura `48px`, borda `rgba(26,79,214,0.15)`, foco com borda e ring `#1A4FD6`. |
| **Cards & Containers** | Fundo `#FFFFFF`, `rounded-2xl` (16px), borda sutil `border-[rgba(26,79,214,0.08)]`, sombra suave `shadow-sm`. |
| **Cards Escuros de Saldo** | Fundo `#0D1640`, texto branco, sombras profundas e detalhes com badges `#FFBE00`. |
| **Scrollbar Customizada** | Largura de `6px`, thumb em `rgba(26, 79, 214, 0.25)` com hover em `rgba(26, 79, 214, 0.5)`. |
