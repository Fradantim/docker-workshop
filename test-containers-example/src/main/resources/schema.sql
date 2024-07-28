create table if not exists name (
	id serial primary key,
	value text unique not null
);
