CREATE TABLE cities(
  id serial primary key,
  city_name varchar(50),
  state varchar(50),
  state_abbreviation varchar(20),
  population integer,
  latitude numeric(10, 6),
  longitude numeric(10, 6)
);
