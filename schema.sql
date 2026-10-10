create table if not exists loans (
  id uuid primary key default gen_random_uuid(),
  member_name text not null,
  book_title text not null,
  borrow_date date not null,
  due_date date not null,
  status text not null default 'Dipinjam'
);
