create table if not exists sighting (
	id serial primary key,
	brand_id text,
	model_id text,
	image text,
	description text
);