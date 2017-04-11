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

## Architecture

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

#### How I obtained the data in your prototype database.
http://timetable.gmit.ie/

### How to run the application

### References:
Neo4j: https://en.wikipedia.org/wiki/Neo4j

neo4j.com: https://neo4j.com/why-graph-databases/

unitime.org: http://www.unitime.org/uct_description.php
