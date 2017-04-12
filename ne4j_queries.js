//Create Time Tree with Day Depth
WITH range(2016, 2017) AS years, range(1,12) AS months, range(9,17) AS hours
FOREACH(year IN years |
  CREATE (y:Year {value: year})
  FOREACH(month IN months |
    CREATE (m:Month {value: month})
    MERGE (y)-[:CONTAINS]->(m)
    FOREACH(day IN (CASE
                      WHEN month IN [1,3,5,7,8,10,12] THEN range(1,31)
                      WHEN month = 2 THEN
                        CASE
                          WHEN year % 4 <> 0 THEN range(1,28)
                          WHEN year % 100 = 0 AND year % 400 = 0 THEN range(1,29)
                          ELSE range(1,28)
                        END
                      ELSE range(1,30)
                    END) |
      CREATE (d:Day {value: day})
      MERGE (m)-[:CONTAINS]->(d)
	FOREACH(hour IN hours |
    CREATE (h:Hour {value: hour})
    MERGE (d)-[:CONTAINS]->(h)))))
	  

	  
//Connect Years Sequentially
MATCH (year:Year)
WITH year
ORDER BY year.value
WITH collect(year) AS years
FOREACH(i in RANGE(0, length(years)-2) |
    FOREACH(year1 in [years[i]] |
        FOREACH(year2 in [years[i+1]] |
            CREATE UNIQUE (year1)-[:NEXT]->(year2))));	  
	  
	  
//Connect Months Sequentially
MATCH (year:Year)-[:CONTAINS]->(month)
WITH year, month
ORDER BY year.value, month.value
WITH collect(month) AS months
FOREACH(i in RANGE(0, length(months)-2) |
    FOREACH(month1 in [months[i]] |
        FOREACH(month2 in [months[i+1]] |
            CREATE UNIQUE (month1)-[:NEXT]->(month2))));	  
			
			
//Connect Days Sequentially			
MATCH (year:Year)-[:CONTAINS]->(month)-[:CONTAINS]->(day)
WITH year, month, day
ORDER BY year.value, month.value, day.value
WITH collect(day) AS days
FOREACH(i in RANGE(0, length(days)-2) |
    FOREACH(day1 in [days[i]] |
        FOREACH(day2 in [days[i+1]] |
            CREATE UNIQUE (day1)-[:NEXT]->(day2))));

//Connect Hours Sequentially
MATCH (year:Year)-[:CONTAINS]->(month)-[:CONTAINS]->(day)-[:CONTAINS]->(hour)
WITH year, month, day, hour
ORDER BY year.value, month.value, day.value, hour.value
WITH collect(hour) AS hours
FOREACH(i in RANGE(0, length(hours)-2) |
    FOREACH(hour1 in [hours[i]] |
        FOREACH(hour2 in [hours[i+1]] |
            CREATE UNIQUE (hour1)-[:NEXT]->(hour2))));		


			


//Lookup Time Tree example with Year, Month and Day Showing Next Relationship Across Months
MATCH (y:Year) WHERE y.value = 2014 OR y.value = 2015 WITH y
MATCH (y)-[:CONTAINS]->(m:Month) WHERE m.value = 1 OR m.value = 12 WITH y, m
MATCH (m)-[:CONTAINS]->(d)
RETURN y, m, d;	



MATCH (n) where id(n)in [15841] RETURN n

MATCH (n) where id(n) in [while(15841+70)] RETURN n	

MATCH (n) where id(n) in [15841] for( i=0,i<1,I++){15841+70}  RETURN n 	

http://neo4j.com/docs/developer-manual/current/cypher/functions/list/#functions-range
//to add dayName labale to days		
MATCH (year:Year)-[:CONTAINS]->(month)-[:CONTAINS]->(day)
WITH year, month, day
ORDER BY year.value, month.value, day.value
WITH collect(day) AS days
FOREACH(i in RANGE(3, length(days)-2, 7) |
    FOREACH(day1 in [days[i]] |
        FOREACH(day2 in [days[i+1]] |
            SET day2: Tuesday )));
	
	
			SET day2: Saturday ));
		
		
		
		
			SET day2:Friday )));
			
            CREATE UNIQUE (day1)-[:NEXT]->(day2))));
			
//delete			
MATCH (n)
WHERE n:Day:Friday
REMOVE n:Friday			
	


