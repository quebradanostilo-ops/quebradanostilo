# Quebrada no Stilo — site completo

Projeto baseado nos arquivos de planejamento e execução fornecidos para o projeto.

## Stack

- Next.js + React + TypeScript
- Tailwind CSS
- Supabase Postgres
- Supabase Auth
- Supabase Storage
- API routes protegidas
- Sem checkout/pagamento online

## 1. Instalar

No terminal do VS Code, dentro da pasta:

```bash
npm install
```

## 2. Criar o Supabase

1. Crie um projeto no Supabase.
2. Abra o SQL Editor.
3. Execute o conteúdo de `supabase/migrations/001_initial.sql`.
4. Em Authentication > Users, crie o usuário que será administrador.
5. Copie o UUID desse usuário.
6. Execute:

```sql
insert into public.admins (id, email)
values ('UUID_DO_USUARIO', 'EMAIL_DO_USUARIO');
```

A senha fica exclusivamente no Supabase Auth; não existe senha em texto puro na tabela `admins`.

## 3. Variáveis de ambiente

Copie `.env.local.example` para `.env.local` e preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Esses valores ficam em Project Settings > API no Supabase.

Não coloque `service_role` no frontend e não commite `.env.local`.

## 4. Rodar

```bash
npm run dev
```

Abra:

http://localhost:3000

Admin:

http://localhost:3000/admin

## 5. Fluxo

Público:
Home → Catálogo → Produto → Tamanho/Cor → WhatsApp ou Instagram.

WhatsApp usa o número salvo em Configurações.

Instagram copia a mensagem e abre o perfil quando não houver mecanismo confiável de Direct pré-preenchido.

## 6. Imagens

O admin envia JPG, PNG ou WebP de até 5 MB para o bucket `product-images`.

As imagens ficam persistidas no Supabase Storage e suas URLs ficam registradas no banco.

## 7. Deploy

Depois de testar localmente:

```bash
git init
git add .
git commit -m "primeira versão"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

Depois importe o repositório na Vercel e configure as mesmas variáveis de ambiente.

## Observações

Os dados comerciais iniciais usados pelo projeto são somente:

- Nome: Quebrada no Stilo
- Instagram: @quebrada_no_stiloo
- Segmento: streetwear / moda urbana

Endereço, telefone, horário, WhatsApp e logo começam vazios e podem ser preenchidos pelo painel.

O visual usa uma identidade provisória urbana em preto/branco com um acento neon, fácil de trocar em `app/globals.css`.
