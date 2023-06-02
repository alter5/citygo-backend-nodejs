CREATE TABLE cities(
  id serial not null primary key,
  city_name varchar(50),
  state varchar(50),
  population integer,
  latitude numeric(10, 6),
  longitude numeric(10, 6)
);
