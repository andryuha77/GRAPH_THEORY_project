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

### Neo4j

Neo4j is a graph database management system developed by Neo Technology, Inc. Described by its developers as an ACID-compliant transactional database with native graph storage and processing, Neo4j is the most popular graph database according to db-engines.com.

## Architecture
### Neo4j Fundamentals:

Neo4j store any kind of data using the following graph concepts:

* **Node**: Graph data records
* **Relationship**: Connect nodes (has direction and a type)
* **Relationship types**: mandatory on all relationships and is used to navigate the graph
* **Property**: Stores data in key-value pair in nodes and relationships
* **Label**: Groups nodes and relationships (optional)

---

### In my project I planning to store following data:

* **Days of week**:  save as nodes 
* **Time**:  save as nodes
* **Room**: save as nodes
* **Subject name**: save as nodes
* **Students_roups**:  save as nodes
* **lecturer**: save as nodes
##### Relationships between nodes:
* stude



#### How I obtained the data in your prototype database.
http://timetable.gmit.ie/

### How to run the application

### Reference
Neo4j: https://en.wikipedia.org/wiki/Neo4j




#### Data Representation and Querying Project 2016

### Project Overview
I have created a Single-Page Web Application (SPA) that lets users calculate BMI.
This application was selected after some deliberation.
Initially, I considered three different applications:

1. A [Power supply calculator](http://outervision.com/power-supply-calculator) alternative.
2. A [BMI calculator](http://www.bmicalculator.ie/) alternative.
3. A [Yelp](https://www.yelp.ie/) alternative.
