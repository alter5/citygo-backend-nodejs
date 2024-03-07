CREATE TABLE trips(
  id serial primary key,
  city_id int not null REFERENCES cities(id),
  title varchar(255) not null,
  destinations jsonb,
  description text,
  price_range int,
  duration int
);
