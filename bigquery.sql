-- Task 1

-- Calculate the average trip duration for each year available in the dataset.
SELECT
  EXTRACT(YEAR FROM start_time) AS date_year,
  ROUND(AVG(duration_minutes), 2) AS average_duration
FROM
  `bigquery-public-data.austin_bikeshare.bikeshare_trips`
GROUP BY
  date_year
ORDER BY
  date_year ASC

-- Task 2 - Data analytical queries

-- Show most popular CLOSED stations and its average trip duration
SELECT
  a.start_station_id,
  a.end_station_id,
  a.start_station_name,
  a.end_station_name,
  ROUND(AVG(a.duration_minutes), 2) AS average_duration,
  COUNT(*) as trip_count
FROM
  `bigquery-public-data.austin_bikeshare.bikeshare_trips` AS a
JOIN
  `bigquery-public-data.austin_bikeshare.bikeshare_stations` AS b
ON
  b.station_id = a.start_station_id
WHERE
  b.status = 'closed'
GROUP BY
  a.start_station_id,
  a.end_station_id,
  a.start_station_name,
  a.end_station_name
ORDER BY
  trip_count DESC
LIMIT
  10

-- Show most popular power type of stations
SELECT
  b.power_type,
  COUNT(*) as trip_count,
  ROUND(AVG(a.duration_minutes), 2) as average_duration
FROM
  `bigquery-public-data.austin_bikeshare.bikeshare_trips` AS a
JOIN
  `bigquery-public-data.austin_bikeshare.bikeshare_stations` AS b
ON
  b.station_id = a.start_station_id
GROUP BY
  power_type
ORDER BY
  trip_count DESC
LIMIT
  100

-- Most stolen or missing bikes start from this stations
SELECT
  start_station_id as station_id,
  start_station_name as station_name,
  COUNT(*) as stolen_missing_count
FROM
  `bigquery-public-data.austin_bikeshare.bikeshare_trips`
WHERE end_station_name = 'Missing' OR end_station_name = 'Stolen'
GROUP BY
  station_id,
  station_name
ORDER BY
  stolen_missing_count DESC
LIMIT
  10

-- Some basic stats for each bike in trip
SELECT
  bikeid,
  COUNT(*) AS trip_count,
  MAX(duration_minutes) AS longest_duration,
  SUM(duration_minutes) AS total_duration,
  ROUND(AVG(duration_minutes), 2) AS average_duration
FROM
  `bigquery-public-data.austin_bikeshare.bikeshare_trips`
GROUP BY
  bikeid
ORDER BY
  trip_count DESC
LIMIT
  100
