//https://www.graphgrid.com/modeling-time-series-data-with-neo4j/
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


			


//Lookup Time Tree example with Year, Month Day and Hour Showing Next Relationship Across Months
MATCH (y:Year) WHERE y.value = 2016 OR y.value = 2017 WITH y
MATCH (y)-[:CONTAINS]->(m:Month) WHERE m.value = 1 OR m.value = 12 WITH y, m
MATCH (m)-[:CONTAINS]->(d)
MATCH (d)-[:CONTAINS]->(h) Where h.value = 10 OR h.value =16
match (r)
RETURN y, m, d, h, r;	



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


			
//delete 			
MATCH (n)
WHERE n:Day:Friday
REMOVE n:Friday			
	
//crv
LOAD CSV WITH HEADERS FROM "https://neo4j.com/docs/developer-manual/3.1/csv/import/persons.csv" AS csvLine
CREATE (p:Person { id: toInt(csvLine.id), name: csvLine.name })


CREATE (n:Room {rNum: "G0837", capacity: 81})
CREATE (n:Room {rNum: "G0402", rName: "Biochemistry Lab",capacity: 18})

//match all mondays in 2017 month 9-12 room g0994, Sybject , Teacher and Student Programm
MATCH (y:Year) WHERE y.value = 2017 WITH y
MATCH (y)-[:CONTAINS]->(m:Month) WHERE m.value in [1,2,3,4] WITH y, m
MATCH (m)-[:CONTAINS]->(d:Monday)
MATCH (d)-[:CONTAINS]->(h:Hour) Where h.value = 10
match (r:Room) Where r.rNum = "G0994"
match (s:Subject) Where s.subName = "Database Management"
match (t:Teacher) Where t.tachName = "Deirdre ODonovan"
match (t:Teacher) Where t.tachName = "Deirdre ODonovan"
match (z:StudProgram) Where z.spNum = "G-KSOFG73"
//CREATE (s)-[:taught_AT]->(h)
//CREATE (t)-[:teaches_AT]->(h)
//CREATE (z)-[:Attends]->(h)
RETURN y, m, d, h, r, s, t, z;		
	

////match all mondays in 2017 month 9-12 , room g0994 , relation betwen room and hour.....
MATCH (y:Year) WHERE y.value = 2017 WITH y
MATCH (y)-[:CONTAINS]->(m:Month) WHERE m.value in [1,2,3,4] WITH y, m
MATCH (m)-[:CONTAINS]->(d:Monday)
MATCH (d)-[:CONTAINS]->(h:Hour) Where h.value = 10
match (r:Room) Where r.rNum = "G0994"
match (s:Subject) Where s.subName = "Database Management"
match (t:Teacher) Where t.tachName = "Deirdre ODonovan"
match (t:Teacher) Where t.tachName = "Deirdre ODonovan"
match (z:StudProgram) Where z.spNum = "G-KSOFG73"
CREATE (s)-[:taught_AT]->(h)
CREATE (t)-[:teaches_AT]->(h)
CREATE (z)-[:Attends]->(h)
RETURN y, m, d, h, r, s, t, z;	

//create students Programs
CREATE (n:StudProgram {spNum: "G-KBDIG72", spName: "BSc in Business Computing &amp; Digital Media", spLevel: 7, spYear: 2, spSemester: 4}

//create subjects
CREATE (n:Subject {subNum: 41879, subName: "Data Centric Rad"})
CREATE (a:Subject {subNum: 41883, subName: "Graphics Programming"})
CREATE (b:Subject {subNum: 41889, subName: "Mobile Applications Development 2"})
CREATE (c:Subject {subNum: 41891, subName: "Professional Practice in IT"})
CREATE (d:Subject {subNum: 41895, subName: "Server Side Rad"})
CREATE (f:Subject {subNum: 41911, subName: "Software Quality Management"})
CREATE (g:Subject {subNum: 47197, subName: "Software Testing"})
CREATE (h:Subject {subNum: 48898, subName: "Data Representation and Querying"})
CREATE (j:Subject {subNum: 48901, subName: "Graph Theory"})
CREATE (k:Subject {subNum: 50457, subName: "Object Oriented Programming"})

//create Teachers
CREATE (n:Teacher {tachName: "Damien Costello", email: "Damien.Costello@gmit.ie"})
CREATE (a:Teacher {tachName: "Daniel Cregg", email: "Daniel.Cregg@gmit.ie"})
CREATE (b:Teacher {tachName: "Gerard Harrison", email: "Gerard.Harrison@gmit.ie"})
CREATE (c:Teacher {tachName: "John Healy", email: "John.Healy@gmit.ie"})
CREATE (d:Teacher {tachName: "Martin Hynes", email: "Martin.Hynes@gmit.ie"})
CREATE (f:Teacher {tachName: "Martin Kenirons", email: "Martin.Kenirons@gmit.ie"})
CREATE (g:Teacher {tachName: "Patrick Mannion", email: "Patrick.Mannion@gmit.ie"})
CREATE (h:Teacher {tachName: "Brian McGinley", email: "Brian.McGinley@gmit.ie"})
CREATE (j:Teacher {tachName: "Ian McLoughlin", email: "Ian.McLoughlin@gmit.ie"})
CREATE (k:Teacher {tachName: "Kevin OBrien", email: "Kevin.OBrien@gmit.ie"})
CREATE (m:Teacher {tachName: "Deirdre ODonovan", email: "Deirdre.ODonovan@gmit.ie"})
CREATE (z:Teacher {tachName: "Joseph McGinley", email: "Joseph.McGinley@gmit.ie"})
