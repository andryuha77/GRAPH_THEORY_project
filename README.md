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

### References:
Neo4j: https://en.wikipedia.org/wiki/Neo4j

neo4j.com: https://neo4j.com/why-graph-databases/


