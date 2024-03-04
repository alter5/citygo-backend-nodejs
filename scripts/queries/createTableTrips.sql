CREATE TABLE trips(
  id serial,
  city_id int not null REFERENCES cities(id),
  title varchar(255) not null,
  destinations text,
  description text,
  price_range int,
  duration int
);
