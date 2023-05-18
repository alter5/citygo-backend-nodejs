CREATE TABLE cities(
  id INT NOT NULL AUTO_INCREMENT,
  cityName varchar(50),
  state varchar(50),
  population int,
  latitude decimal(10, 6),
  longitude decimal(10, 6),
  PRIMARY KEY (id)
);
