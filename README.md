# GRAPH THEORY 2017 project
Neo4j database for use in a timetabling system for Graph Theory project.
The module is taught to undergraduate students at [GMIT](http://www.gmit.ie) in the Department of Computer Science and Applied Physics.
The lecturer is [Ian McLoughlin](https://ianmcloughlin.github.io).

---

# Instructions for Project 2017 for Graph Theory.
Design and prototype a Neo4j database for use
in a timetabling system for a third level institute like [GMIT](http://www.gmit.ie). The database
should store information about student groups, classrooms, lecturers, and
work hours – just like the currently used timetabling system at GMIT

---

## What is a Graph?

A graph is composed of two elements: a node and a relationship.

Each node represents an entity (a person, place, thing, category or other piece of data), and each relationship represents how two nodes are associated. This general-purpose structure allows you to model all kinds of scenarios – from a system of roads, to a network of devices, to a population’s medical history or anything else defined by relationships.

### What is a Graph Database?

A graph database is an online database management system with Create, Read, Update and Delete (CRUD) operations working on a graph data model.

Unlike other databases, relationships take first priority in graph databases. This means your application doesn’t have to infer data connections using things like foreign keys or out-of-band processing, such as MapReduce.

The data model for a graph database is also significantly simpler and more expressive than those of relational or other NoSQL databases.

Graph databases are built for use with transactional (OLTP) systems and are engineered with transactional integrity and operational availability in mind.

---

### Neo4j

Neo4j is a graph database management system developed by Neo Technology, Inc. Described by its developers as an ACID-compliant transactional database with native graph storage and processing, Neo4j is the most popular graph database according to db-engines.com.

### Why Neo4j?

 Easy to Learn
* Mature UI with intuitive interaction and built-in learning
* Time-tested training ecosystem to meet your needs
* A wealth of training materials bringing years of deployment experience to your desktop
* Expert-authored books for in-depth learning

Easy to Use

Choose Cypher, the world’s most powerful and productive graph query language, or the native Java API for writing custom special-purpose extensions. Pick from APIs and drivers for all major languages, and enjoy the other numerous developer productivity enhancements in Neo4j’s intuitive user interface.

Easier than Ever to Load Your Data into Neo4j

* Staggering loading speed of huge data sizes, with very low memory footprint
* Choose how much and which data to import, without worrying about volume

### Neo4j Fundamentals:

Neo4j store any kind of data using the following graph concepts:

* **Node**: Graph data records
* **Relationship**: Connect nodes (has direction and a type)
* **Relationship types**: mandatory on all relationships and is used to navigate the graph
* **Property**: Stores data in key-value pair in nodes and relationships
* **Label**: Groups nodes and relationships (optional)

![](https://neo4j.com/docs/2.1.8/images/graphdb-nodes-overview.svg)
---

## Current Time Table system in GMIT.

Current [Time Table](http://timetable.gmit.ie/) system in GMIT represented by 3 main Sections:
* Programme Timetables – most used by me and other students, where user can generate time table by selecting his Program name. 
* Location Timetables – section where user can select specific room and generate time table for that room. Might be handy for someone who looking for free lab or cleaning staff.
* Staff Timetables – this section probably created for lecturers where they can generate own time-table depending on their staff ID 

### How it can be improved?
I my opinion current GMIT time-table is well implemented, of course there is always some confusion in start of the year but it is acceptable as it many constraints must be taken in consideration like resource constraints (expressing that only one course can be taught by an instructor or in a particular room at the same time), and group constraints (expressing relations between several classes, e.g., that two sections of the same lecture cannot be taught at the same time, or that some classes have to be taught one immediately after another).
But anything can be improved, for example by adding another section to GMIT time-table like “Subject” where user can generate time table for specific subject.

## Design

### List my Questions.

First, I start by listing my questions that I want to answer about time table.
* What time starts college on Monday for Software Development group year 3?
* What subject will I have on Thursday 12:00?
*	Who is the lecturer for lab on Friday 9:00?
*	What room lecture take place on Wednesday 14:00?

From these questions, I can identify the attributes that must belong to entities within time table .


### In my project I planning to store following data:

* **Day&Time**:  save as nodes
* **Room**: save as nodes
* **Subject name**: save as nodes
* **Students_GRP**:  save as nodes
* **lecturer**: save as nodes
##### Relationships between nodes:
* Students_GRP -[:Attends]-> Day&Time
* Room -[:Room_For]-> Day&Time
* lecturer -[:teaches_AT]-> Day&Time
* Subject -[:taught_AT]-> Day&Time

>I planning to create a calendar using this [example](http://www.markhneedham.com/blog/2014/04/19/neo4j-cypher-creating-a-time-tree-down-to-the-day/) in neo4j, add hours and then connect other nodes (rooms, groups ex.) to it. 

## Implementation

#### How I obtained the data in my prototype database.

To obtain data for my prototype database I navigate to page with desired data for example page with [“Programs” in Galway Campus – Dept. of Science & Applied Physics](http://timetable.gmit.ie/sws1617/(S(rwrgvynib4m3ja45vt2p40iw))/default.aspx), then right click on page select “View page source”  copied needed data to notepad++ end remove unwanted data by using f+Ctrl to find unwanted text and replaced it with space.

[Notepad vertical selection](http://stackoverflow.com/questions/1802616/how-to-select-columns-in-editors-atom-notepad-kate-vim-sublime-textpad-et) also very handy to use: in Notepad++ , you can select a particular columnholding ctrl + alt + shift and then left click mouse button and drag to select. Go to left top of the page. hold "shift key Now use right arrow key to select column. Now click "down arrow" key.

#### Examples of used queries.

12/04/2017 Calendar created with addition of hours and Labels with day names added to day nodes.

Query I use to add dayName label  to days:	
```javascript
MATCH (year:Year)-[:CONTAINS]->(month)-[:CONTAINS]->(day)
WITH year, month, day
ORDER BY year.value, month.value, day.value
WITH collect(day) AS days
FOREACH(i in RANGE(3, length(days)-2, 7) |
    FOREACH(day1 in [days[i]] |
        FOREACH(day2 in [days[i+1]] |
            SET day2: Tuesday )));
```

```mysql
//create students Programs
CREATE (n:StudProgram {spNum: "G-KBDIG72", spName: "BSc in Business Computing &amp; Digital Media", spLevel: 7, spYear: 2, spSemester: 4, spGr: "A"})

//create subjects
CREATE (n:Subject {subNum: 41879, subName: "Data Centric Rad"})
CREATE (k:Subject {subNum: 50457, subName: "Object Oriented Programming"})

//create Teachers
CREATE (n:Teacher {tachName: "Damien Costello", email: "Damien.Costello@gmit.ie"})
CREATE (j:Teacher {tachName: "Ian McLoughlin", email: "Ian.McLoughlin@gmit.ie"})

```
Also I included in my database all GMIT campus rooms with room capacity.
```javascript
CREATE (n:Room {rNum: "G0402", rName: "Biochemistry Lab",capacity: 18})
```
In my database I recreate my year curent timetable and time-tabele of other groups(A, B and C)

Image of my cuurent time table: 

<img src="https://github.com/andryuha77/GRAPH_THEORY_project/blob/master/TimeTable_LI.jpg?raw=true" 
alt="IMAGE ALT TEXT HERE" width="720" height="540" border="10" />

To do that and to create 4 relations between the nodes I used code below:
```javascript
//match all mondays in 2017 month 9-12 , Hour = 10 , room G0995 ,Subject ,
//Teacher and generate relations between them 
MATCH (y:Year) WHERE y.value = 2017 WITH y
MATCH (y)-[:CONTAINS]->(m:Month) WHERE m.value in [1,2,3,4] WITH y, m
MATCH (m)-[:CONTAINS]->(d:Wednesday)
MATCH (d)-[:CONTAINS]->(h:Hour) Where h.value = 10
match (r:Room) Where r.rNum = "G0995"
match (s:Subject) Where s.subName = "Database Management"
match (t:Teacher) Where t.tachName = "Deirdre ODonovan"
match (z:StudProgram) Where z.spNum = "G-KSOFG73"
CREATE (s)-[:taught_AT]->(h)
CREATE (t)-[:teaches_AT]->(h)
CREATE (z)-[:Attends]->(h)
CREATE (r)-[:Room_For]->(h)
RETURN y, m, d, h, r, s, t, z;	
```
Result of this Query presented in image below: 

![](https://github.com/andryuha77/GRAPH_THEORY_project/blob/master/Deirdre_Monday_at_10.PNG?raw=true)

More used queries included in  [ne4j_queries file](https://github.com/andryuha77/GRAPH_THEORY_project/blob/master/ne4j_queries.js)

### How to run the application
Simply download [neo4j](https://neo4j.com/download/), unzip [GMIT_time.zip](https://github.com/andryuha77/GRAPH_THEORY_project/blob/master/GMIT_time.zip) archive to your machine. 

Start neo4j with previously selected GMIT_time project, open project in your browser.

user: neo4j 

password:gmit

### References:
Neo4j: https://en.wikipedia.org/wiki/Neo4j

neo4j.com: https://neo4j.com/why-graph-databases/

unitime.org: http://www.unitime.org/uct_description.php

Notepad vertical selection: http://stackoverflow.com/questions/1802616/how-to-select-columns-in-editors-atom-notepad-kate-vim-sublime-textpad-et

Calendar example: http://www.markhneedham.com/blog/2014/04/19/neo4j-cypher-creating-a-time-tree-down-to-the-day/
